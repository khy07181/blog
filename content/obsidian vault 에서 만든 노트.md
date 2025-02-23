---
title: obsidian vault 에서 작성한 글
aliases: 
classification: 
tags: 
created: 2025-02-23T02:02
updated: 2025-02-23T09:23
draft: false
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
