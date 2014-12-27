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

    /** AozoraRubyParser#parse():void */
    AozoraRubyParser["prototype"]["parse"] = parseRegExp;
    /** AozoraRubyParser#parseRegex():void */
    AozoraRubyParser["prototype"]["parseRegExp"] = parseRegExp;
    /** AozoraRubyParser#render(template:object):string */
    AozoraRubyParser["prototype"]["render"] = render;

    AozoraRubyParser["TextNode"] = TextNode;
    AozoraRubyParser["RubyNode"] = RubyNode;

    var pattern = '(?:((?:[一-龠々仝〆〇ヶ]|[-_@0-9a-zA-Z]|[—―＿＠０-９Ａ-Ｚａ-ｚ])+)|｜([^｜《》\n\r]+))《([^｜《》\n\r]+)》';
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
                nodes.push(new TextNode(text));
            }
            nodes.push(new RubyNode(rb, rt));
            last_node = match.index + match[0].length;
        }

        delta = this.src_text.length - last_node;
        if (delta > 0) {
            text = this.src_text.substring(last_node, this.src_text.length);
            nodes.push(new TextNode(text));
        }

        this.nodes = nodes;
    }

    function render(template) {
        var node;
        var text = "";

        for (var i = 0; i < this.nodes.length ; i++) {
            node = this.nodes[i];
            switch (node.type) {
            case "text":
                text += node.text;
                break;
            case "ruby":
                text += template.rt(node);
                break;
            default:
                break;
            }
        }

        return text;
    }

    if ("process" in global) {
        module["exports"] = AozoraRubyParser;
    }
    global["AozoraRubyParser"] = AozoraRubyParser;
})((this || 0).self || global);
