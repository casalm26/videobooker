import { Button, Stack } from '@videobooker/ui';

import { useBusiness } from '../lib/hooks/useBusiness';

export default function HomePage() {
  const { activeBusinessId, setActiveBusinessId } = useBusiness();

  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <Stack gap="md">
        <h1>VideoBooker</h1>
        <p>Frontend placeholder – wire shared packages before building features.</p>
        <p>Active business: {activeBusinessId ?? 'None selected'}</p>
        <Button onClick={() => setActiveBusinessId(activeBusinessId ? null : 'demo-business')}>
          {activeBusinessId ? 'Clear selection' : 'Set demo business'}
        </Button>
      </Stack>
    </main>
  );
}
