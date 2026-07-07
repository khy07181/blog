#!/usr/bin/env bash
#
# publish.sh — Obsidian vault의 블로그 글을 v5 브랜치로 발행/미리보기합니다.
#
# 배경: 배포는 GitHub Actions가 "커밋된 content"를 빌드하므로, content는
# git에 실제 파일로 있어야 합니다(심링크 불가). 이 스크립트는 iCloud
# Obsidian vault의 글을 repo/content로 복사(실제 파일)합니다.
#
# 사용법:
#   ./publish.sh            발행: vault→content 동기화 → 커밋 → v5 push → CI 배포
#   ./publish.sh preview    미리보기: vault 반영 후 `quartz build --serve` (커밋·푸시 안 함)
#   ./publish.sh sync       동기화만: vault→content (커밋·푸시 안 함)
#
# vault 경로 재정의:  BLOG_VAULT=/path/to/content ./publish.sh
#
set -euo pipefail

MODE="${1:-publish}"

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VAULT="${BLOG_VAULT:-/Users/hayoung/Library/Mobile Documents/iCloud~md~obsidian/Documents/vault/blog/content}"
BRANCH="v5"

cd "$REPO"

# content가 심링크면 중단 (심링크는 CI 배포와 충돌하고 vault를 덮을 위험)
if [ -L content ]; then
  echo "✗ content가 심링크입니다. 심링크를 제거하고 실제 디렉토리로 두세요." >&2
  exit 1
fi

# vault 존재 확인
if [ ! -d "$VAULT" ]; then
  echo "✗ vault 경로를 찾을 수 없습니다: $VAULT" >&2
  exit 1
fi

# vault → repo/content 미러링 (내용 기준, v5의 .gitkeep 보존, Obsidian 잡파일 제외)
sync_vault() {
  rsync -a --checksum --delete \
    --exclude '.git' \
    --exclude '.gitkeep' \
    --exclude '.DS_Store' \
    --exclude '.obsidian' \
    --exclude '.trash' \
    "$VAULT/" content/
}

case "$MODE" in
  preview)
    sync_vault
    echo "▶ 미리보기: vault를 content에 반영했습니다(미커밋). http://localhost:8080"
    echo "  종료(Ctrl-C) 후 발행하려면 ./publish.sh, 되돌리려면 git checkout -- content"
    exec npx quartz build --serve
    ;;

  sync)
    sync_vault
    echo "✓ vault→content 동기화 완료 (미커밋). 발행: ./publish.sh"
    git status --short -- content | head
    ;;

  publish)
    # v5로 전환 + 원격과 동기화
    git switch "$BRANCH"
    git fetch origin "$BRANCH" --quiet
    git merge --ff-only "origin/$BRANCH" 2>/dev/null || true

    sync_vault

    git add -A content
    if git diff --cached --quiet -- content; then
      echo "변경 없음 — 발행 생략"
      exit 0
    fi

    echo "=== 발행될 변경 ==="
    git diff --cached --stat -- content

    git commit -m "publish: sync notes from vault ($(date '+%Y-%m-%d %H:%M'))"
    git push origin "$BRANCH"
    echo "✓ 발행 완료 → GitHub Actions가 v5를 빌드·배포합니다 (1~2분)"
    ;;

  *)
    echo "사용법: ./publish.sh [publish|preview|sync]" >&2
    exit 1
    ;;
esac
