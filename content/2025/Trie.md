---
title: Trie
aliases:
  - 트라이
description:
permalink:
classification:
tags:
draft: false
published: 2025-08-03
created: 2024-08-26T22:43
updated: 2025-12-01T16:33
---

문자열을 효율적으로 저장하고 검색하는 데 사용되는 트리 기반의 자료구조

사전과 같은 단어 검색, 자동 완성, 접두사 매칭 등에 유용하다.

Pros
- 불완전한 해시 함수를 사용하는 해시테이블과 비교할 때, 자료에 접근할 때 최악의 경우 더 더 유리한 시간복잡도를 갖는다. m이 탐색할 문자열의 길이일 때 시간복잡도는 O(m)이다. 보통 해시테이블은 탐색 시간이 O(1)이고 해시 함수 평가 시간이 O(m)이지만, 불완전한 해시 테이블은 키 충돌이 일어날 수 있으므로, O(N)이 될 수 있다.
- 트라이에서는 키 충돌이 일어나지 않는다.
- 여러 값이 하나의 키와 연관되어 있지 않는 한 버킷이 필요 없다.
- 해시 함수가 없어도 된다. 키가 늘어날 때 해시 함수를 변경할 필요도 없다.
- 모든 항목이 키에 따라 사전순으로 정렬되어 있다.

Cons
- 조회는 해시 테이블보다 느릴 수 있다. 특히 주 메모리에 비해 임의 접근 비용이 큰 하드 디스크 드라이브와 같은 보조 기억장치에서 직접 읽는다면 더욱 그렇다
- 부동소수점과 같이 문자열로 장황하게 표시되는 자료의 경우 무의미하게 길게 늘어진 접두사와 노드를 가질 수 있다.
	- 표준 IEEE 부동소수점 수는 비트 트라이로 처리할 수는 있다.
- 트라이가 메모리를 더 소비할 수 있다. 대부분의 해시 테이블에서는 전체 항목을 하나의 메모리 청크에 올리곤 하지만, 트라이에서는 검색 문자열의 각 문자마다 메모리가 할당될 수 있다.

### Insert

![|1000](https://i.imgur.com/NFx4o9U.png)
- 루트 노드에서 시작해 문자열의 각 문자를 트리의 깊이를 따라가며 노트를 추가한다.
- 문자열의 각 문자에 대해 자식 노드가 없으면 새로운 노드를 추가하고, 있으면 기존 노드를 따라간다.
- 문자열의 끝에 도달하면 해당 노드에 endOfWord를 true로 표시한다

### Search

![|1000](https://i.imgur.com/VGdtQqu.png)
- 루트 노드에서 시작해 문자를 따라가다 모든 문자가 트리에서 일치하면 마지막 노드가 endOfWord 를 가지고 있는지 확인한다.
	- endOfWord를 가지고 있지 않다면 존재하지 않는 문자열이다

### Delete

![|1000](https://i.imgur.com/WXweTBB.png)
- 먼저 문자열이 존재하는지 확인한다.
- 존재한다면 마지막 노드인 endOfWord를 false로 변경한다. 마지막 노드의 자식이 있다면 나머지 노드들을 삭제하지 않고 없다면 다른 자식 노드가 없을 때 까지 상위 노드로 이동하며 노드를 삭제한다.

### Code

```java
public class Trie {

    private class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        boolean isEndOfWord;

        public TrieNode() {
            this.isEndOfWord = false;
        }
    }

    private final TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    // insert
    public void insert(String word) {
        TrieNode current = root;
        for (char ch : word.toCharArray()) {
            current = current.children.computeIfAbsent(ch, c -> new TrieNode());
        }
        current.isEndOfWord = true;
    }

    // search
    public boolean search(String word) {
        TrieNode current = root;
        for (char ch : word.toCharArray()) {
            current = current.children.get(ch);
            if (current == null) {
                return false;
            }
        }
        return current.isEndOfWord;
    }

    // delete
    public void delete(String word) {
        delete(root, word, 0);
    }

    private boolean delete(TrieNode current, String word, int index) {
        if (index == word.length()) {
            if (!current.isEndOfWord) {
                return false;
            }
            current.isEndOfWord = false;
            return current.children.isEmpty();
        }
        char ch = word.charAt(index);
        TrieNode node = current.children.get(ch);
        if (node == null) {
            return false;
        }
        boolean shouldDeleteCurrentNode = delete(node, word, index + 1);

        if (shouldDeleteCurrentNode) {
            current.children.remove(ch);
            return current.children.isEmpty() && !current.isEndOfWord;
        }
        return false;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();

        trie.insert("hello");
        trie.insert("helium");

        System.out.println(trie.search("hello")); // true
        System.out.println(trie.search("helix")); // false

        trie.delete("hello");
        System.out.println(trie.search("hello")); // false
        System.out.println(trie.search("helium")); // true
    }
}
```

### Links

[Trie](https://ko.wikipedia.org/wiki/%ED%8A%B8%EB%9D%BC%EC%9D%B4_(%EC%BB%B4%ED%93%A8%ED%8C%85))

[트라이(Trie) 개념, 직접 구현하기](https://innovation123.tistory.com/116#%EC%82%AD%EC%A0%9C%EB%A9%94%EC%84%9C%EB%93%9C-1)
