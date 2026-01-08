# 개인 블로그

> Obsidian vault를 활용한 개인 지식 베이스 및 블로그 저장소

## 소개

이 저장소는 [Obsidian](https://obsidian.md/)에서 작성한 개인 노트와 글들을 [Quartz v4](https://quartz.jzhao.xyz/)를 통해 정적 웹사이트로 변환하여 게시하는 블로그입니다.

Obsidian의 강력한 지식 관리 기능과 Quartz의 아름다운 웹 퍼블리싱을 결합하여, 생각을 정리하고 공유하는 공간으로 활용하고 있습니다.

**🔗 블로그 방문하기: [https://khy07181.github.io/](https://khy07181.github.io/)**

## 특징

### 📝 Obsidian 기반 콘텐츠 작성
- Obsidian vault와 심볼릭 링크로 연결된 `content` 디렉토리
- [[wikilink]] 스타일 내부 링크 지원
- Obsidian-flavored Markdown 완벽 호환

### 🎨 커스터마이징
- **댓글 시스템**: giscus를 통한 GitHub 기반 댓글
- **분석**: Google Analytics 통합
- **테마**: 라이트/다크 모드 지원
- **폰트**: Schibsted Grotesk (헤더), Source Sans Pro (본문), IBM Plex Mono (코드)
- **커스텀 컴포넌트**: 인덱스 페이지 전용 최근 게시물 표시

### ⚡ Quartz v4
- Markdown → HTML 정적 사이트 생성
- 빠른 페이지 로드와 SEO 최적화
- GitHub Pages 자동 배포

## 기술 스택

- **콘텐츠 작성**: [Obsidian](https://obsidian.md/)
- **정적 사이트 생성**: [Quartz v4](https://quartz.jzhao.xyz/)
- **프레임워크**: Preact (정적 렌더링)
- **빌드 도구**: esbuild, Lightning CSS
- **배포**: GitHub Pages
- **댓글**: giscus
- **분석**: Google Analytics

## 저장소 구조

```
blog/
├── content/              # Obsidian vault 심볼릭 링크 (콘텐츠)
├── quartz/              # Quartz 프레임워크 코어
│   ├── components/      # UI 컴포넌트
│   ├── plugins/         # transformers, filters, emitters
│   └── ...
├── quartz.config.ts     # 사이트 설정
├── quartz.layout.ts     # 페이지 레이아웃
└── public/              # 빌드 결과물 (배포용)
```

## 라이선스

이 저장소의 콘텐츠(`content/` 디렉토리)는 저작권이 보호됩니다.

Quartz 프레임워크 코드는 원 프로젝트의 라이선스를 따릅니다.
