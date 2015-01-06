# aozora-ruby-parser

[![Build Status](https://travis-ci.org/zonuexe/aozora-ruby-parser.js.svg)](https://travis-ci.org/zonuexe/aozora-ruby-parser.js)

青空文庫っぽい記法のルビを解釈するよ

## オンラインデモ

続きはウェブで

[![Screen shot](http://zonuexe.github.io/aozora-ruby-parser.js/screenshot.png)](http://zonuexe.github.io/aozora-ruby-parser.js/)

## 文法

[青空文庫工作員作業マニュアル 2.入力-1](http://www.aozora.gr.jp/KOSAKU/MANUAL_2.html)にある仕様のうち、ルビと`［改ページ］`タグのみをサポートします。その他の記法(見出しや傍点など)は、何も加工しません。

実際のところ、このライブラリは青空文庫の記法に厳格に従ったものではありません。JIS漢字コード (JIS X 0201, JIS X 0208, JIS X 0213) を前提とする青空文庫に対して、入出力に Unicode を許容すると、その性質上、「文字種」の定義が煩雑になるからです。

そのため、本ライブラリでルビの始点指示`｜`なしで利用できるのは漢字とASCIIの範囲のアルファベットと数字、全角アルファベットと数字のみです。一部の処理系との互換性のため、ひらがなカタカナを始点指示`｜`なしでルビに分解することはありません。

このパーサーが保証する入力と出力は[`test/parseRegExpTest.js`](https://github.com/zonuexe/aozora-ruby-parser.js/blob/master/test/parseRegExpTest.js)を参照してください。

## API

* `parser = new AozoraRubyParser(input_text: string)`
  * パーサーオブジェクトを生成します
* `parser.perse()`
  * パース処理を実行します。<br>
    副作用として`parse.nodes`にパースされたオブジェクトの配列がセットされます
* `parser.render(template: object): string`
  * `template`で渡されたオブジェクトに実装されたメソッドを利用してノードを文字列化して一つの文字列に結合します

## 出力

パースに成功すると、オブジェクトの配列を生成します。オブジェクトは`TextNode`と`RubyNode`と`NewpageNode`の三種類です。ノードの種類は`type`プロパティの文字列`text|ruby|newline`で判定することができます。

全ての種類のノードは`text`プロパティを持ちます。また、`RubyNode`は`rt`プロパティを持ちます。すべてのノードの`text`プロパティを結合することで、原文からふりがなを省いたテキストを得ることができます。

### フォーマットを追加する

`node.type`と同じ名前のメソッドを持ったオブジェクト(変換器)を `parser.render()` に渡してやることで、独自のフォーマットに変換することができます。

このライブラリに付属する変換器は拡張性を持たせるために`new AozoraRubyHTMLConverter`のように初期化しますが、単純な変換器は以下のようにシンプルな実装で十分です。

```
var simple_converter = {
    text: function(node){ return node.text; },
    ruby: function(node){ return node.text + "(" + node.rt + ")"; },
    newpage: function(node){ return "\n\n"; }
}
var output = parser.render(simple_converter));
```

## インストール

### Bower

```
bower install aozora-ruby-parser
```

### npm

Node.js でちゃんと動くかはよくわかんない

```
npm install aozora-ruby-parser
```

## 著作権

本リポジトリに含まれるファイルは以下の条件に基き配布されます。 (後述の`sim2ruby.css`を除く)

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

### sim2ruby.css

`sim2ruby.css` は http://roheisen.net/dl/sim2ruby.css を改変したものです。

> #### 名称
>
> <ruby><rb>sim2ruby.css</rb><rp> | </rp><rt>シム・トゥ・ルビー・シーエスエス</rt></ruby>
>
> `sim2ruby.css` = a cascading style sheet to simulate simple ruby.
>
> #### 機能概要
>
> IE以外のブラウザでもルビタグ（振り仮名表示機能）を同じように機能させるCSSです。
> “simulate simple ruby”の名前の通り、rtcやrbcなどの複雑ルビには未対応です。
>
> #### 著作概要
>
> * 作者 : <ruby><rb>MMZK</rb><rp> | </rp><rt>みみずく</rt></ruby>
> * 所属 : <ruby><rb>銑鉄計画</rb><rp> | </rp><rt>ローアイゼン・プロイェクト</rt></ruby>
> * 拠点 : <a href="http://roheisen.net/"><ruby><rb>銑鉄網</rb><rp> | </rp><rt>ローアイゼン・ネッツ</rt></ruby></a>
> * 版 : 皇紀2671年04月26日版 ver.1.0.4
>
> #### 使用条件
>
> 個人・法人・営利・非営利問わずご自由にお使いください。
> 邪魔ならここの枠を丸ごと消してしまっても結構です。
> ただし、虚偽の著作主張だけはご勘弁願います。
