/**
 * aozora-ruby-pixiv.js
 *
 * Copyright 2014 USAMI Kenta <tadsan@zonu.me>
 * @license http://www.apache.org/licenses/LICENSE-2.0
 */
(function(global) {
    "use strict";

    function AozoraRuby_pixivConverter() {
    };

    /** AozoraRubyParser#rt(node:object) */
    AozoraRuby_pixivConverter["prototype"]["rt"] = rt;

    function rt(node) {
        return "[[rb:" + node.text + " > " + node.rt + "]]";
    }

    global["AozoraRuby_pixivConverter"] = AozoraRuby_pixivConverter;
})((this || 0).self || global);
