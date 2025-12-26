---
title: 나만의 독서 환경 만들기
aliases:
description:
permalink:
classification: blog
tags:
  - ebook
  - drm
draft: false
published: 2025-11-16
created: 2025-11-16T21:30
updated: 2025-12-26T13:32
---

세상에는 책보다 자극적이고 재미있는 것들이 너무 많아져, 예전처럼 자연스럽게 독서에 몰입하기가 점점 어려워지고 있다.

그래도 꾸준히 읽고 싶다는 마음은 늘 있었고, 나만의 지속 가능성 유지를 위한 방법을 계속 찾아왔다.

자연스럽게 ‘어떤 환경에서 읽어야 오래 이어갈 수 있을까’라는 고민이 생겼다.

읽기 자체를 방해하지 않고, 상황에 따라 부담 없이 책을 펼칠 수 있는 방식은 무엇인지, 나에게 맞는 독서 환경을 어떻게 구성해야 하는지 생각했다.

종이책과 전자책을 모두 사용해보며 장단점을 다시 비교하게 되었고, 결국 지금의 읽기 방식과 생활 패턴에 잘 맞는 환경을 직접 만들어가게 되었다.

## 종이책과 전자책 비교

![](https://i.imgur.com/CXGeG2o.png)

### 종이책

pros
- 종이 질감이 주는 감촉과 아날로그 특유의 집중감
- 구매 후 소유권이 명확하며 대여·양도·판매 가능
- 페이지를 넘기는 행위가 주는 독서 리듬과 몰입
- 표지·제본·종이색 등 디자인 요소를 온전히 감상할 수 있음
- 눈부심이 없어 장시간 읽어도 비교적 눈이 편안함

cons
- 부피와 무게가 커서 휴대하기 어려움
- 보관 공간이 필요하고 시간이 지나면 훼손 가능
- 검색·하이라이트·백업 기능이 없어 기록 측면이 비효율적
- 여러 권을 병렬로 읽거나 즉시 접근하기 어렵고 상황 제약이 큼
- 외출 중 갑자기 필요할 때 즉시 확인 불가

### 전자책

pros
- 기기 하나로 읽을 수 있는 높은 휴대성과 접근성
- 검색, 하이라이트, 노트 등 구조적 독서 기능 제공
- 구입 즉시 읽기 가능하며 지역 제한 없이 해외 도서 접근 가능
- 글자 크기·줄 간격·색상 등 개인화 설정 폭이 넓음
- 보관 공간이 필요 없고 물리적 훼손이 없음

cons
- 플랫폼, 계정에 종속되고, 소유보다는 무제한 대여에 가까움
- 여러 플랫폼에서 구매하면 책이 흩어져 관리가 어려움
- PDF·EPUB 변환이 제한되거나 불가능한 경우가 있음
- 서비스 종료나 정책 변경 시 접근권이 사라질 위험
- 화면 기반이라 장시간 읽기 시 눈 피로가 발생할 수 있음

위와 같은 장단점을 고려한 결과 종이책을 여전히 좋아하고 전혀 읽지 않는 것은 아니지만, 대부분 전자책을 구매하고 있다.
전자책을 PDF나 EPUB으로 변환해 한 플랫폼에서 읽고 백업해두면서, 그동안 아쉬웠던 단점들도 어느 정도 보완할 수 있었다.

---

## 전차책을 PDF, EPUB로 변환하는 방법

>[!Warning]
> 개인적인 이용·보관 목적을 제외한 **공유, 무단 배포, 상업적 활용은 저작권 문제가 발생할 수 있습니다.**

### Google Play Book

구글 플레이 북은 타 플랫폼과 달리 아래와 같은 방법으로 DRM 해제가 가능하다.

1. [Adobe digital edition](https://www.adobe.com/kr/solutions/ebook/digital-editions/download.html) 설치
	- `brew install --cask adobe-digital-editions`
2. [Calibre](https://calibre-ebook.com/) 설치
	- `brew install --cask calibre`
3. [DeDRM](https://github.com/noDRM/DeDRM_tools) 설치
4. Calibre에 DeDRM plugin 등록
	- appearance - plugin - 파일에서 플러그인 불러오기 - DeDRM_plugin.zip

5. Google play Books 라이브러리 책 내보내기
![[Pasted image 20240204110550.png]]

6. acsm 파일 ADE로 열기
	- acsm 파일이 자동으로 pdf 또는 epub 파일로 변경된다.
7. ADE 기본 저장소(`/Users/hayoung/Documents/Digital Editions`)의 epub 파일을 Clibre로 열기
	- DeDRM 플러그인이 설치되어 있으면 자동으로 DRM이 해제된다.
8. EPUB 또는 PDF 등 원하는 형식 변환

### 일반 전자책 플랫폼

DRM 해제가 불가능해 스크린 캡쳐 후 PDF 또는 EPUB로 변환해야 한다.

#### GUI

1. [cleanshotX](https://cleanshot.com/) 와 [BetterTouchTool](https://folivora.ai/) 로 스크린샷 자동화
2. [Clop](https://lowtechguys.com/clop/)으로 이미지 용량 최적화
3. Mac 미리보기로 png 파일들을 pdf 파일로 변환
4. [OwlOCR](https://www.owlocr.com/) 로 OCR 진행
5. [Readwise Reader](https://readwise.io/read) 업로드 및 iCloud 백업

#### CLI

[ImageMagick](https://imagemagick.org/)
- png to pdf

```
magick -density 600 *.png \
  -auto-orient \
  -colorspace sRGB \
  -contrast-stretch 1%x1% \
  -level 5%,95% \
  -compress JPEG -quality 80 \
  output_raw.pdf
```

[Ghostscript](https://ghostscript.com/)
- optimize pdf

```
gs -sDEVICE=pdfwrite \
   -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/default \
   -dDownsampleColorImages=false \
   -dDownsampleGrayImages=false \
   -dDownsampleMonoImages=false \
   -dNOPAUSE -dQUIET -dBATCH \
   -sOutputFile=output_opt.pdf \
   output_raw.pdf
```

[OCRmyPDF](https://github.com/ocrmypdf/OCRmyPDF)
- ocr pdf

```
ocrmypdf --optimize 3 --fast-web-view 1 \
  -l kor+eng \
  output_opt.pdf output_final.pdf
```
