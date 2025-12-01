---
title: TEST 글
aliases:
description:
permalink:
classification: blog
tags:
  - test
draft: true
published: 2025-02-23
created: 2025-02-23T21:18
updated: 2025-12-01T16:33
---

### 제목 제목

작성 작성

obsidian wiki link test

[[다른 글|다른 글]]

>[!info]
>callout test

### 이미지 테스트

local image

![[Pasted image 20250223092544.png]]

imgur image
![](https://i.imgur.com/0MQtKSP.png)

code block

```ts
export function trimPathSuffix(fp: string): string {
  fp = clientSideSlug(fp)
  let [cleanPath, anchor] = fp.split("#", 2)
  anchor = anchor === undefined ? "" : "#" + anchor

  return cleanPath + anchor
}
```

mp4

![[blog/content/img/ep03-righit-click.mp4]]
