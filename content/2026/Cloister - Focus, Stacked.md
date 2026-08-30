---
title: |-
  Cloister — A quiet Cloister
  for focused work
aliases:
  - Cloister 소개글
cover_image: ""
description: 직접 만든 macOS용 local-first focus timer Cloister 소개
permalink: cloister-focus-stacked
classification: blog
category:
  - productivity
  - tool
tags:
  - cloister
  - productivity
  - focus
  - timer
  - macos
  - dochi-garden
draft: false
published: 2026-08-30T21:30:00
lang: ko
created: 2026-08-30T15:30
updated: 2026-08-30T21:14
---

나는 뽀모도로 타이머를 사용해 의자에 1시간 이상 앉기 전에 일어나려고 하는 편이다.

타이머 앱은 이미 많다. 그러나 직접 써보면 시간을 재는 데만 충실한 타이머거나, project, tag, task까지 관리해야 하는 커다란 생산성 도구였다. 전자는 지나간 시간이 잘 남지 않았고, 후자는 관리할 것이 많아 본질에 집중하기 어려웠다.

내가 원한 것은 그 사이에 있는 도구였다. 얼마나 집중했는지 돌아볼 수 있고, 몇 달이나 몇 년 뒤에도 계속 쓸 수 있는 타이머.

[Cloister](https://dochigarden.com/cloister/)는 내가 만든 macOS용 focus timer다. 뽀모도로 타이머처럼 집중을 시작하고, 집중 시간과 휴식시간을 끝낸 시간을 기록한다.

**Cloister**라는 이름은 수도원의 안뜰을 둘러싼 조용한 [회랑](https://en.wikipedia.org/wiki/Cloister)을 뜻한다. 바깥의 소음에서 잠시 떨어져 집중하고, 한 바퀴를 돌아 다시 제자리로 오는 공간이다.

Focus와 Break가 하나의 cycle을 이루고, 그 cycle이 Stack으로 남는 앱의 모습과 잘 어울리는 이름이라고 생각했다.

![Cloister — Focus, Stacked](https://dochigarden.com/cloister/og.png)

---

## Focus와 Break가 모여 하나의 Stack이 된다

Cloister에서는 Focus와 Break를 모두 마친 한 cycle을 Stack이라고 부른다.

집중 시간만 끝냈다고 Stack이 생기지는 않는다. Focus 뒤의 Break까지 마쳐야 하나가 쌓인다. Break를 건너뛰면 Stack은 완성되지 않는다. 쉬는 시간을 집중하지 않은 시간이나 다음 일을 시작하기 전의 빈틈이 아니라, 오래 집중하기 위해 필요한 과정으로 보기 때문이다.

이 규칙은 stack을 많이 쌓기 위한 것보다 지속 가능한 리듬을 만드는 것에 의미를 두고 싶어 만들었다.
preset을 만들어 50분을 집중하고 10분 쉬어도 되고, 30분을 집중하고 30분을 쉬어도 된다.
몇 번의 cycle마다 긴 휴식을 넣거나, Focus가 끝나면 Break를 자동으로 시작하게 설정할 수도 있다. 중요한 것은 길이가 아니라, 집중과 회복을 한 묶음으로 완결하는 것이다.

`Focus → Break → Stack`

단순한 규칙이지만 Cloister의 기록과 화면은 모두 이 개념을 중심으로 이어진다.

---

## 지난 집중을 돌아보는 방법

Cloister는 완료한 Stack을 오늘의 목표, streak, History, Insights와 1년 단위 heatmap으로 보여준다.

heatmap에서는 하루하루의 집중이 작은 칸으로 남는다. 어느 날 많이 집중했는지뿐 아니라, 어느 시기에 꾸준했고 언제 리듬이 끊겼는지도 한눈에 볼 수 있다. History에서는 특정 날짜에 진행한 cycle과 정확한 Focus·Break 시간대를 확인할 수 있고, Insights에서는 주간 변화와 누적 집중 시간을 조금 더 긴 범위로 살펴볼 수 있다.

![Cloister Insights](https://dochigarden.com/cloister/images/insights-light.png)

기록을 보여주는 목적은 빈칸을 죄책감으로 채우는 데 있지 않다. 오늘 집중한 시간이 사라지지 않고 남아 있다는 것, 작은 반복이 실제로 쌓이고 있다는 것을 보여주는 데 있다.
GitHub contribution graph를 보며 작업한 날들을 확인할 수 있듯이, Cloister의 heatmap도 내가 집중했던 시간을 보여준다.

---

## 기록은 내 Mac에 남는다

Cloister는 local-first로 만들었다. timer를 쓰기 위해 계정을 만들 필요가 없고, Cloister가 운영하는 서버로 세션을 전송하지도 않는다. 기본 기록은 Mac의 로컬 데이터베이스에 저장되며 analytics나 tracker도 넣지 않았다.

집중 기록은 그리 민감한 데이터는 아니지만. 계정을 만들고 서버에 기록을 맡기고 싶지는 않았다. 앱을 켜면 바로 쓸 수 있고, 필요할 때 기록을 바깥으로 가져갈 선택지도 있어야 했다.

Pro에서는 CSV와 JSON으로 데이터를 내보내거나 다시 가져올 수 있다. 여러 Mac에서 같은 기록을 쓰고 싶다면 자신의 iCloud를 통한 sync도 선택할 수 있고, 기본 사용에는 cloud나 Cloister 계정이 필요하지 않다.

---

## 단순한 timer 안의 복잡한 문제들

겉으로 보면 timer는 숫자가 1초씩 줄어드는 앱이다. 직접 만들어보니 어려운 부분은 숫자를 줄이는 일이 아니라, 시간이 흐르는 동안 어떤 일이 생겨도 같은 결과를 내는 것이었다.

Mac이 잠들었다가 예정 시간을 지나 깨어나면 어떻게 해야 할까. Focus 도중 앱이 종료되었다면 꺼져 있던 시간을 집중한 시간으로 계산해야 할까. 밤 11시 50분에 시작한 cycle이 자정을 넘겨 끝났다면 어느 날의 기록이어야 할까. 사용하던 preset의 시간을 나중에 바꾸면 과거 기록도 함께 바뀌어야 할까.

Cloister에서는 이런 상황을 가능한 한 명시적인 규칙으로 정했다.

- cycle은 끝난 날이 아니라 Focus를 시작한 날짜에 속한다.
- preset 설정은 cycle을 시작할 때 기록에 함께 보관해서, 나중에 설정을 바꿔도 과거가 달라지지 않는다.
- 앱이 예기치 않게 종료된 시간은 자동으로 집중 시간에 더하지 않는다.
- 취소되거나 중단된 기록도 삭제하지 않고 그 상태로 남긴다.
- Mac이 sleep에서 깨어나거나 앱이 다시 열리면, 현재 시각을 기준으로 timer 상태를 다시 맞춘다.

사용자는 이 규칙을 외울 필요가 없다. 그저 잠들기 전과 깨어난 뒤, 설정을 바꾸기 전과 바꾼 뒤의 기록이 납득할 수 있게 이어지면 된다. 예상 밖의 상황에서도 놀라운 결과를 만들지 않는 것이 Cloister를 만들며 가장 중요하게 생각한 부분 중 하나였다.

---

## 마무리

Cloister는 더 많은 집중을 돕는 도구이기도 하지만, 현재 집중하는 시간을 남기는 것에 더 무게를 둔 도구다. 시작할 때는 조용하고, 사용하는 동안에는 흐름을 방해하지 않으면서, 시간이 지난 뒤에는 내가 해온 일이 사라지지 않았으면 했다.

직접 사용해보고 싶은 사람은 [Cloister 공식 페이지](https://dochigarden.com/cloister/)에서 무료로 시작할 수 있다. 내가 필요해서 만들기 시작한 도구지만, 다른 사람의 집중에도 도움이 되는 앱으로도 방향을 넓혀가고 있다.

---

### Links

- [Cloister](https://dochigarden.com/cloister/)
