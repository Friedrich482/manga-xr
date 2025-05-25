#!/bin/bash

set -e

docker compose -f compose.dev-services.yaml up -d

cleanup() {
  echo "Stopping dev services..."
  docker compose -f compose.dev-services.yaml down
}
trap cleanup EXIT

next dev --turbopack
