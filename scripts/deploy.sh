#!/usr/bin/env bash
# 构建课程站并发布到 ECS（neoroll-ecs）：
#   1) https://agent.skwang.uk/        （Caddy 127.0.0.1:8105 -> cloudflared 隧道）
#   2) https://47.97.41.141.sslip.io/agent-learning/ （ECS Caddy 直连入口）
# 每次发布一个新 release 目录并原子切换 current 软链；保留最近 5 个版本便于回滚。
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="${ECS_HOST:-neoroll-ecs}"
BASE="${ECS_BASE:-/opt/agent-learning}"
PUBLIC_HOST="${PUBLIC_HOST:-agent.skwang.uk}"
DIRECT_URL="${DIRECT_URL:-https://47.97.41.141.sslip.io/agent-learning/}"

npx eslint src/data src/sections src/App.tsx
npm run build

ts=$(date -u +%Y%m%dT%H%M%SZ)
COPYFILE_DISABLE=1 tar -czf - --no-xattrs -C dist . | ssh -o BatchMode=yes "$HOST" "set -e
d=$BASE/releases/$ts
mkdir -p \"\$d\"
tar -xzf - -C \"\$d\" --no-same-owner
find \"\$d\" -type d -exec chmod 755 {} +
find \"\$d\" -type f -exec chmod 644 {} +
ln -sfn \"\$d\" \"$BASE/current\"
ls -1dt \"$BASE/releases\"/* | tail -n +6 | xargs -r rm -rf
curl -fsS -o /dev/null http://127.0.0.1:8105/
echo \"released \$d\""

curl -fsS -o /dev/null -w "https://${PUBLIC_HOST}/ -> %{http_code}\n" --max-time 20 "https://${PUBLIC_HOST}/"
curl -fsS -o /dev/null -w "${DIRECT_URL} -> %{http_code}\n" --max-time 20 "${DIRECT_URL}"
