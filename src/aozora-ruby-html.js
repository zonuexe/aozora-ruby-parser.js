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

    /** AozoraRubyHTMLConverter#rt(node:object):string */
    AozoraRubyHTMLConverter["prototype"]["rt"] = rt;

    function rt(node) {
        return "<ruby>" + node.text +this.open_rp +
            "<rt>" + node.rt + "</rt>" +
            this.close_rp + "</ruby>";
    }

    global["AozoraRubyHTMLConverter"] = AozoraRubyHTMLConverter;
})((this || 0).self || global);
