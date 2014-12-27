var assert = require("assert");
var aozora = require('../src/aozora-ruby-parser.js');

describe("AozoraRubyParser", function() {
    describe("#parserRegExp", function() {
        it("空文字列入力", function() {
            var src = "";
            var parser = new aozora(src);
            var expected = [];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
        it("棒ルビで英文にまとめてルビがつけられる", function() {
            var src = "彼は ｜Au revoir《さらば》 と、";
            var parser = new aozora(src);
            var expected = [
                { text: '彼は ' },
                { text: 'Au revoir', rt: 'さらば' },
                { text: ' と、' },
            ];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
        it("一行に漢字のみルビと棒ルビが両方ある", function() {
            var src = "お前は今日から｜愛飢男《あいうえお》だ。いいな、柿公家子《かきくけこ》";
            var parser = new aozora(src);
            var expected = [
                { text: 'お前は今日から' },
                { text: '愛飢男', rt: 'あいうえお' },
                { text: 'だ。いいな、' },
                { text: '柿公家子', rt: 'かきくけこ' }
            ];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
        it("ルビではない棒がある", function() {
            var src = "｜・｜・｜｜棒《ぼう》｜・｜・｜";
            var parser = new aozora(src);
            var expected = [
                { text: '｜・｜・｜' },
                { text: '棒', rt: 'ぼう' },
                { text: '｜・｜・｜' },
            ];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
        it("ASCIIのみルビが空白区切りでみっつ並ぶ", function() {
            var src = "“Kosinski《コジンスキイ》 soll《ゾル》 leben《レエベン》 !” ";
            var parser = new aozora(src);
            var expected = [
                { text: '“' },
                { text: 'Kosinski', rt: 'コジンスキイ' },
                { text: ' ' },
                { text: 'soll', rt: 'ゾル' },
                { text: ' ' },
                { text: 'leben', rt: 'レエベン' },
                { text: ' !” ' }
            ];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
        it("ASCIIのみルビが全角空白区切りでみっつ並ぶ", function() {
            var src = "“Kosinski《コジンスキイ》　soll《ゾル》　leben《レエベン》 !” ";
            var parser = new aozora(src);
            var expected = [
                { text: '“' },
                { text: 'Kosinski', rt: 'コジンスキイ' },
                { text: '　' },
                { text: 'soll', rt: 'ゾル' },
                { text: '　' },
                { text: 'leben', rt: 'レエベン' },
                { text: ' !” ' }
            ];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
        it("行をまたいだルビは機能しない", function() {
            var src = "昼行灯\n《ひるあんどん》";
            var parser = new aozora(src);
            var expected = [
                { text: '昼行灯\n《ひるあんどん》' },
            ];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
        it("ひらがなにルビは振られない", function() {
            var src = "くんかくんか《呼吸音》";
            var parser = new aozora(src);
            var expected = [
                { text: "くんかくんか《呼吸音》" },
            ];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
        it("FullWidth英字にルビが振られる", function() {
            var src = "おのれＫＧＢ《ｶｰｹﾞｰﾍﾞｰ》の手先め！";
            var parser = new aozora(src);
            var expected = [
                { text: "おのれ" },
                { text: 'ＫＧＢ', rt: 'ｶｰｹﾞｰﾍﾞｰ' },
                { text: "の手先め！" },
            ];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
        it("棒でひらがなにルビを振れる", function() {
            var src = "｜くんかくんか《呼吸音》";
            var parser = new aozora(src);
            var expected = [
                { text: 'くんかくんか', rt: '呼吸音' },
            ];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
        it("棒は｜をまたがない", function() {
            var src = "あなたのこと嫌いじゃないわ｜嘘じゃないわ｜本当《ほんと》よ";
            var parser = new aozora(src);
            var expected = [
                { text: 'あなたのこと嫌いじゃないわ｜嘘じゃないわ'},
                { text: '本当', rt: 'ほんと' },
                { text: 'よ'}
            ];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
        it("棒は《》をまたがない", function() {
            var src = "｜エターナルフォースブリーザード《永久絶対究極氷結風斬》… 本当《マジ》か…";
            var parser = new aozora(src);
            var expected = [
                { text: 'エターナルフォースブリーザード', rt: '永久絶対究極氷結風斬' },
                { text: '… '},
                { text: '本当', rt: 'マジ' },
                { text: 'か…'}
            ];

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        });
    });
});
