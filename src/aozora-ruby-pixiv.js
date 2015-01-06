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

    AozoraRuby_pixivConverter["prototype"]["text"] = text;
    AozoraRuby_pixivConverter["prototype"]["ruby"] = ruby;
    AozoraRuby_pixivConverter["prototype"]["newpage"] = newpage;

    function text(node) {
        return node.text;
    }

    function ruby(node) {
        return "[[rb:" + node.text + " > " + node.rt + "]]";
    }

    function newpage(node) {
        return "[newpage]";
    }

    global["AozoraRuby_pixivConverter"] = AozoraRuby_pixivConverter;
})((this || 0).self || global);
