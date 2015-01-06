/**
 * aozora-ruby-html.js
 *
 * Copyright 2014 USAMI Kenta <tadsan@zonu.me>
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
(function(global) {
    "use strict";

    function AozoraRubyHTMLConverter(open_rp, close_rp) {
        if (typeof open_rp  === "undefined") open_rp  = "(";
        if (typeof close_rp === "undefined") close_rp = ")";
        this.open_rp  = "<rp>" + open_rp  + "</rp>";
        this.close_rp = "<rp>" + close_rp + "</rp>";
    };

    AozoraRubyHTMLConverter["prototype"]["text"] = text;
    AozoraRubyHTMLConverter["prototype"]["ruby"] = ruby;
    AozoraRubyHTMLConverter["prototype"]["newpage"] = newpage;

    function text(node) {
        return node.text;
    }

    function ruby(node) {
        return "<ruby><rb>" + node.text + "</rb>" +
            this.open_rp + "<rt>" + node.rt + "</rt>" +
            this.close_rp + "</ruby>";
    }

    function newpage(node) {
        return "<hr>";
    }

    global["AozoraRubyHTMLConverter"] = AozoraRubyHTMLConverter;
})((this || 0).self || global);
