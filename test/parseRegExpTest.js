var assert = require("assert");
var aozora = require('../src/aozora-ruby-parser.js');

describe("AozoraRubyParser", function() {
    describe("#parserRegExp", function() {
        function assertNodes(expected, src) {
            var parser = new aozora(src);

            parser.parseRegExp();
            assert.deepEqual(expected, parser.nodes);
        }

        it("空文字列入力", function() {
            var src = "";
            var expected = [];
            assertNodes(expected, src);
        });
        it("棒ルビで英文にまとめてルビがつけられる", function() {
            var src = "彼は ｜Au revoir《さらば》 と、";
            var expected = [
                { text: '彼は ' },
                { text: 'Au revoir', rt: 'さらば' },
                { text: ' と、' },
            ];
            assertNodes(expected, src);
        });
        it("半角棒ルビで英文にまとめてルビがつけられる", function() {
            var src = "彼は |Au revoir《さらば》 と、";
            var expected = [
                { text: '彼は ' },
                { text: 'Au revoir', rt: 'さらば' },
                { text: ' と、' },
            ];
            assertNodes(expected, src);
        });
        it("一行に漢字のみルビと棒ルビが両方ある", function() {
            var src = "お前は今日から｜愛飢男《あいうえお》だ。いいな、柿公家子《かきくけこ》";
            var expected = [
                { text: 'お前は今日から' },
                { text: '愛飢男', rt: 'あいうえお' },
                { text: 'だ。いいな、' },
                { text: '柿公家子', rt: 'かきくけこ' }
            ];
            assertNodes(expected, src);
        });
        it("ルビではない棒がある", function() {
            var src = "｜・｜・｜｜棒《ぼう》｜・｜・｜";
            var expected = [
                { text: '｜・｜・｜' },
                { text: '棒', rt: 'ぼう' },
                { text: '｜・｜・｜' },
            ];
            assertNodes(expected, src);
        });
        it("ASCIIのみルビが空白区切りでみっつ並ぶ", function() {
            var src = "“Kosinski《コジンスキイ》 soll《ゾル》 leben《レエベン》 !” ";
            var expected = [
                { text: '“' },
                { text: 'Kosinski', rt: 'コジンスキイ' },
                { text: ' ' },
                { text: 'soll', rt: 'ゾル' },
                { text: ' ' },
                { text: 'leben', rt: 'レエベン' },
                { text: ' !” ' }
            ];
            assertNodes(expected, src);
        });
        it("ASCIIのみルビが全角空白区切りでみっつ並ぶ", function() {
            var src = "“Kosinski《コジンスキイ》　soll《ゾル》　leben《レエベン》 !” ";
            var expected = [
                { text: '“' },
                { text: 'Kosinski', rt: 'コジンスキイ' },
                { text: '　' },
                { text: 'soll', rt: 'ゾル' },
                { text: '　' },
                { text: 'leben', rt: 'レエベン' },
                { text: ' !” ' }
            ];
            assertNodes(expected, src);
        });
        it("行をまたいだルビは機能しない", function() {
            var src = "昼行灯\n《ひるあんどん》";
            var expected = [
                { text: '昼行灯\n《ひるあんどん》' },
            ];
            assertNodes(expected, src);
        });
        it("ひらがなにルビは振られない", function() {
            var src = "くんかくんか《呼吸音》";
            var expected = [
                { text: "くんかくんか《呼吸音》" },
            ];
            assertNodes(expected, src);
        });
        it("FullWidth英字にルビが振られる", function() {
            var src = "おのれＫＧＢ《ｶｰｹﾞｰﾍﾞｰ》の手先め！";
            var expected = [
                { text: "おのれ" },
                { text: 'ＫＧＢ', rt: 'ｶｰｹﾞｰﾍﾞｰ' },
                { text: "の手先め！" },
            ];
            assertNodes(expected, src);
        });
        it("棒でひらがなにルビを振れる", function() {
            var src = "｜くんかくんか《呼吸音》";
            var expected = [
                { text: 'くんかくんか', rt: '呼吸音' },
            ];
            assertNodes(expected, src);
        });
        it("棒は｜をまたがない", function() {
            var src = "あなたのこと嫌いじゃないわ｜嘘じゃないわ｜本当《ほんと》よ";
            var expected = [
                { text: 'あなたのこと嫌いじゃないわ｜嘘じゃないわ'},
                { text: '本当', rt: 'ほんと' },
                { text: 'よ'}
            ];
            assertNodes(expected, src);
        });
        it("棒は《》をまたがない", function() {
            var src = "｜エターナルフォースブリーザード《永久絶対究極氷結風斬》… 本当《マジ》か…";
            var expected = [
                { text: 'エターナルフォースブリーザード', rt: '永久絶対究極氷結風斬' },
                { text: '… '},
                { text: '本当', rt: 'マジ' },
                { text: 'か…'}
            ];
            assertNodes(expected, src);
        });
        it("［＃改ページ］タグのみ", function() {
            var src = "［＃改ページ］";
            var expected = [
                { },
            ];
            assertNodes(expected, src);
        });
        it("［＃改ページ］から始まる", function() {
            var src = "［＃改ページ］あいうえお";
            var expected = [
                { },
                { text: "あいうえお" },
            ];
            assertNodes(expected, src);
        });
        it("［＃改ページ］で終る", function() {
            var src = "あいうえお［＃改ページ］";
            var expected = [
                { text: "あいうえお" },
                { },
            ];
            assertNodes(expected, src);
        });
        it("ルビ対象の中に［＃改ページ］", function() {
            var src = "｜［＃改ページ］《ふりがな》";
            var expected = [
                { text: "［＃改ページ］", rt: "ふりがな" },
            ];
            assertNodes(expected, src);
        });
        it("ルビ読みの中に［＃改ページ］", function() {
            var src = "漢字《［＃改ページ］》";
            var expected = [
                { text: "漢字", rt: "［＃改ページ］" },
            ];
            assertNodes(expected, src);
        });
        it("ルビと改ページ", function() {
            var src = "漢字《かんじ》［＃改ページ］ひらがな［＃改ページ］カタカナ、そして漢字《かんじ》再《ふたた》び";
            var expected = [
                { text: "漢字", rt: "かんじ" },
                { },
                { text: "ひらがな" },
                { },
                { text: "カタカナ、そして" },
                { text: "漢字", rt: "かんじ" },
                { text: "再", rt: "ふたた" },
                { text: "び" },
            ];
            assertNodes(expected, src);
        });

        it("サロゲートペア文字列のみ", function() {
            var src = "𝄞";
            var expected = [
                { text: "𝄞" },
            ];
            assertNodes(expected, src);
        });

        it("サロゲートペア文字列のルビのみ", function() {
            var src = "|𝄞《𝄞》";
            var expected = [
                { text: "𝄞", rt: "𝄞" },
            ];
            assertNodes(expected, src);
        });

        it("サロゲートペア文字列のルビの前に非サロゲートペア", function() {
            var src = "あ|𝄞《𝄞》";
            var expected = [
                { text: "あ" },
                { text: "𝄞", rt: "𝄞" },
            ];
            assertNodes(expected, src);
        });

        it("サロゲートペア文字列のルビの後に非サロゲートペア", function() {
            var src = "|𝄞《𝄞》あ";
            var expected = [
                { text: "𝄞", rt: "𝄞" },
                { text: "あ" },
            ];
            assertNodes(expected, src);
        });

        it("サロゲートペア文字列のルビの前後に非サロゲートペア", function() {
            var src = "あ|𝄞《𝄞》あ";
            var expected = [
                { text: "あ" },
                { text: "𝄞", rt: "𝄞" },
                { text: "あ" },
            ];
            assertNodes(expected, src);
        });

        it("サロゲートペア文字列のルビの複雑な組合せ", function() {
            var src = "𝄞あ𝄞あ|𝄞《𝄞》あ漢字《𝄞》|𝄞《ああ𝄞あ》ああ𝄞あ|あいう《𝄞》漢字𝄞あ";
            var expected = [
                { text: "𝄞あ𝄞あ" },
                { text: "𝄞", rt: "𝄞" },
                { text: "あ" },
                { text: "漢字", rt: "𝄞" },
                { text: "𝄞", rt: "ああ𝄞あ" },
                { text: "ああ𝄞あ" },
                { text: "あいう", rt: "𝄞" },
                { text: "漢字𝄞あ" },
            ];
            assertNodes(expected, src);
        });
    });
});
