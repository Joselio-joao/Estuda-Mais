#!/usr/bin/env bash
set -euo pipefail

# Cria um arquivo do código e da documentação para o proprietário.
# Não inclui segredos, dependências instaladas, caches, ficheiros de sessão ou dados de produção.

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUTPUT="${1:-$ROOT/../estudamais-owner-bundle-${STAMP}.tar.gz}"

tar \
  --exclude='./node_modules' \
  --exclude='./.expo' \
  --exclude='./.git' \
  --exclude='./.manus' \
  --exclude='./.manus-logs' \
  --exclude='./.project-config.json' \
  --exclude='./dist' \
  --exclude='./coverage' \
  --exclude='./.env' \
  --exclude='./.env.*' \
  --exclude='./scripts/export-owner-bundle.sh' \
  -C "$ROOT" -czf "$OUTPUT" .

echo "Pacote de transferência criado em: $OUTPUT"
