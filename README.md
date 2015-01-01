# aozora-ruby-parser

[![Build Status](https://travis-ci.org/zonuexe/aozora-ruby-parser.js.svg)](https://travis-ci.org/zonuexe/aozora-ruby-parser.js)

青空文庫っぽい記法のルビを解釈するよ

## オンラインデモ

続きはウェブで

[![Screen shot](http://zonuexe.github.io/aozora-ruby-parser.js/screenshot.png)](http://zonuexe.github.io/aozora-ruby-parser.js/)

## 文法

[青空文庫工作員作業マニュアル 2.入力-1](http://www.aozora.gr.jp/KOSAKU/MANUAL_2.html)にある仕様のうち、ルビのみをサポートします。その他の記法(見出しや傍点など)は、何も加工しません。

実際のところ、このライブラリは青空文庫の記法に厳格に従ったものではありません。JIS漢字コード (JIS X 0201, JIS X 0208, JIS X 0213) を前提とする青空文庫に対して、入出力に Unicode を許容すると、その性質上、「文字種」の定義が煩雑になるからです。

そのため、本ライブラリでルビの始点指示`｜`なしで利用できるのは漢字とASCIIの範囲のアルファベットと数字、全角アルファベットと数字のみです。一部の処理系との互換性のため、ひらがなカタカナを始点指示`｜`なしでルビに分解することはありません。

## 出力形式

パースに成功すると、オブジェクトの配列を返します。オブジェクトは`TextNode`と`RubyNode`の二種類です。ノードの種類は`type`プロパティの文字列`text|ruby`で判定することができます。

`TextNode`は`text`プロパティを、`RubyNode`は`text`プロパティ及び`rt`プロパティを持ちます。(すべてのノードの`text`プロパティを結合することで、原文からふりがなを省いたテキストを得ることができます)

## 著作権

```
aozora-ruby-parser.js
Copyright 2014 USAMI Kenta <tadsan@zonu.me>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
