(function(global) {
    "use strict";

    function AozoraRuby_pixivConverter() {
    };

    function exports(nodes) {
        var text = "";

        for (var i = 0; i < nodes.length ; i++) {
            var node = nodes[i];
            switch (node.type) {
            case "text":
                text += node.text;
                break;
            case "ruby":
                text += "[[rb:" + node.text + " > " + node.rt + "]]";
                break;
            default:
                break;
            }
        }

        return text;
    }

    /** AozoraRubyParser#export():void */
    AozoraRuby_pixivConverter["prototype"]["exports"] = exports;

    global["AozoraRuby_pixivConverter"] = AozoraRuby_pixivConverter;
})((this || 0).self || global);
