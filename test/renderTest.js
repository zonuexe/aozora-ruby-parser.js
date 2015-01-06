var assert = require("assert");
var aozora = require('../src/aozora-ruby-parser.js');

describe("AozoraRubyParser", function() {
    describe("#render", function() {
        var simple_converter = {
            text: function(node){ return node.text; },
            ruby: function(node){ return node.text + "(" + node.rt + ")"; },
            newpage: function(node){ return "\n\n"; }
        };

        function assertRender(expected, src) {
            var parser = new aozora("");
            parser.nodes = src;

            assert.equal(expected, parser.render(simple_converter));
        }

        it("空配列を入力", function(){
            var expected = "";
            var src = [];

            assertRender(expected, src);
        });

        it("textノードのみ", function(){
            var expected = "ふー";
            var src = [
                new aozora.TextNode("ふー")
            ];

            assertRender(expected, src);
        });

        it("rubyノードのみ", function(){
            var expected = "ほげ(ふが)";
            var src = [
                new aozora.RubyNode("ほげ", "ふが")
            ];

            assertRender(expected, src);
        });

        it("rubyノードとtextノード", function(){
            var expected = "それは私(わたし)のおいなりさんだ";
            var src = [
                new aozora.TextNode("それは"),
                new aozora.RubyNode("私", "わたし"),
                new aozora.TextNode("のおいなりさんだ"),
            ];

            assertRender(expected, src);
        });

        it("newpageノードのみ", function(){
            var expected = "\n\n";
            var src = [
                new aozora.NewpageNode
            ];

            assertRender(expected, src);
        });
    });
});
