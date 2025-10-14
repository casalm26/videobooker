#!/usr/bin/env bash
set -euo pipefail

PREVIEW_ID="$1"

if [[ -z "${RENDER_API_KEY:-}" ]]; then
  echo "RENDER_API_KEY is required" >&2
  exit 1
fi

echo "Deploying Render preview ${PREVIEW_ID}" >&2
# TODO: call Render API to create/update preview deployment once blueprint is defined.
