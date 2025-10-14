import { loadEnv } from '@videobooker/shared/config';

type AirtableConfig = {
  apiKey: string;
  baseId: string;
  tableName: string;
};

type AirtableRecord<TFields extends Record<string, unknown>> = {
  id: string;
  fields: TFields;
};

type AirtableListResponse<TFields extends Record<string, unknown>> = {
  records: AirtableRecord<TFields>[];
};

type AirtableUserFields = {
  Email: string;
  Provider: string;
  ProviderAccountId: string;
  LastLoginAt: string;
  Name?: string;
  Image?: string;
};

type AirtableUserUpsertInput = {
  email: string;
  name?: string | null;
  image?: string | null;
  provider: string;
  providerAccountId: string;
};

let resolvedConfig: AirtableConfig | null = null;

function resolveConfig(): AirtableConfig {
  if (resolvedConfig) {
    return resolvedConfig;
  }

  const env = loadEnv();
  const config: Partial<AirtableConfig> = {
    apiKey: env.AIRTABLE_API_KEY ?? undefined,
    baseId: env.AIRTABLE_BASE_ID ?? undefined,
    tableName: env.AIRTABLE_USERS_TABLE ?? undefined,
  };

  if (!config.apiKey || !config.baseId || !config.tableName) {
    throw new Error(
      'Missing Airtable configuration. Ensure AIRTABLE_API_KEY, AIRTABLE_BASE_ID, and AIRTABLE_USERS_TABLE are set.',
    );
  }

  resolvedConfig = config as AirtableConfig;
  return resolvedConfig;
}

function escapeFormulaValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

async function airtableRequest<TResponse>(
  method: 'GET' | 'POST' | 'PATCH',
  {
    searchParams,
    body,
  }: {
    searchParams?: URLSearchParams;
    body?: unknown;
  } = {},
): Promise<TResponse> {
  const { apiKey, baseId, tableName } = resolveConfig();
  const url = new URL(`https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`);

  if (searchParams) {
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
  }

  const response = await fetch(url.toString(), {
    method,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });

  if (!response.ok) {
    let message = `Airtable request failed with status ${response.status}`;

    try {
      const errorBody = (await response.json()) as { error?: { message?: string } };
      if (errorBody?.error?.message) {
        message = errorBody.error.message;
      }
    } catch (error) {
      // Ignore JSON parse errors and fall back to generic message.
    }

    throw new Error(message);
  }

  return (await response.json()) as TResponse;
}

async function findUserRecordByEmail(email: string): Promise<AirtableRecord<AirtableUserFields> | null> {
  const normalizedEmail = email.trim().toLowerCase();
  const filter = `LOWER({Email}) = "${escapeFormulaValue(normalizedEmail)}"`;
  const searchParams = new URLSearchParams({
    filterByFormula: filter,
    maxRecords: '1',
  });

  const response = await airtableRequest<AirtableListResponse<AirtableUserFields>>('GET', {
    searchParams,
  });

  return response.records[0] ?? null;
}

function buildUserFields(input: AirtableUserUpsertInput): AirtableUserFields {
  const fields: AirtableUserFields = {
    Email: input.email,
    Provider: input.provider,
    ProviderAccountId: input.providerAccountId,
    LastLoginAt: new Date().toISOString(),
  };

  if (input.name) {
    fields.Name = input.name;
  }

  if (input.image) {
    fields.Image = input.image;
  }

  return fields;
}

export async function upsertAirtableUser(input: AirtableUserUpsertInput): Promise<void> {
  const existingRecord = await findUserRecordByEmail(input.email);
  const fields = buildUserFields(input);

  if (existingRecord) {
    await airtableRequest('PATCH', {
      body: {
        records: [
          {
            id: existingRecord.id,
            fields,
          },
        ],
        typecast: true,
      },
    });
    return;
  }

  await airtableRequest('POST', {
    body: {
      records: [
        {
          fields,
        },
      ],
      typecast: true,
    },
  });
}
