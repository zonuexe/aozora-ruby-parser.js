(function(global) {
    "use strict";

    function AozoraRubyHTMLConverter(open_rp, close_rp) {
        if (typeof open_rp  === "undefined") open_rp  = "(";
        if (typeof close_rp === "undefined") close_rp = ")";
        this.open_rp  = "<rp>" + open_rp  + "</rp>";
        this.close_rp = "<rp>" + close_rp + "</rp>";
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
                text +=  "<ruby>" + node.text +
                    this.open_rp + node.rt + this.close_rp + "</ruby>";
                break;
            default:
                break;
            }
        }

        return text;
    }

    /** AozoraRubyHTMLConverter#export():void */
    AozoraRubyHTMLConverter["prototype"]["exports"] = exports;

    global["AozoraRubyHTMLConverter"] = AozoraRubyHTMLConverter;
})((this || 0).self || global);
