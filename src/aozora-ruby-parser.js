/**
 * aozora-ruby-parser.js
 *
 * Copyright 2014 USAMI Kenta <tadsan@zonu.me>
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
(function(global) {
    "use strict";

    function AozoraRubyParser(src_text) {
        this.src_text = src_text;
    };

    function TextNode(text) {
        this.text = text;
    }
    TextNode["prototype"]["type"] = "text";

    function RubyNode(rb, rt) {
        this.text = rb;
        this.rt = rt;
    }
    RubyNode["prototype"]["type"] = "ruby";

    function NewpageNode() {}
    NewpageNode["prototype"]["text"] = "";
    NewpageNode["prototype"]["type"] = "newpage";

    /** AozoraRubyParser#parse():void */
    AozoraRubyParser["prototype"]["parse"] = parseRegExp;
    /** AozoraRubyParser#parseRegex():void */
    AozoraRubyParser["prototype"]["parseRegExp"] = parseRegExp;
    /** AozoraRubyParser#splitNewpage():void */
    AozoraRubyParser["prototype"]["splitNewpage"] = splitNewpage;
    /** AozoraRubyParser#render(template:object):string */
    AozoraRubyParser["prototype"]["render"] = render;

    AozoraRubyParser["TextNode"] = TextNode;
    AozoraRubyParser["RubyNode"] = RubyNode;
    AozoraRubyParser["NewpageNode"] = NewpageNode;

    var pattern = '(?:((?:[一-龠々仝〆〇ヶ]|[-_@0-9a-zA-Z]|[—―＿＠０-９Ａ-Ｚａ-ｚ])+)|[|｜]([^｜《》\n\r]+))《([^｜《》\n\r]+)》';
    function parseRegExp() {
        var re = new RegExp(pattern, 'g');
        var nodes = [];
        var match, delta, text;
        var last_node = 0;

        while ((match = re.exec(this.src_text)) !== null) {
            var rb = match[1] || match[2];
            var rt = match[3];
            delta = match.index - last_node;
            if (delta > 0) {
                text = this.src_text.substring(last_node, match.index);
                splitNewpage(text, nodes);
            }
            nodes.push(new RubyNode(rb, rt));
            last_node = match.index + match[0].length;
        }

        delta = this.src_text.length - last_node;
        if (delta > 0) {
            text = this.src_text.substring(last_node, this.src_text.length);
            splitNewpage(text, nodes);
        }

        this.nodes = nodes;
    }

    var tag_newpage = '［＃改ページ］';
    function splitNewpage(text, nodes) {
        var texts = text.split(tag_newpage);
        if (typeof nodes === "undefined") {
            nodes = [];
        }
        var t;

        for (var i = 0; i < texts.length; i++) {
            t = texts[i];
            if (t !== "") {
                nodes.push(new TextNode(t));
            }

            if (i !== texts.length - 1) {
                nodes.push(new NewpageNode);
            }
        }

        return nodes;
    }

    function render(template) {
        var node;
        var text = "";

        for (var i = 0; i < this.nodes.length ; i++) {
            node = this.nodes[i];
            text += template[node.type](node);
        }

        return text;
    }

    if ("process" in global) {
        module["exports"] = AozoraRubyParser;
    }
    global["AozoraRubyParser"] = AozoraRubyParser;
})((this || 0).self || global);
