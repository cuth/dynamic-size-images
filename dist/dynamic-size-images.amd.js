/*  dynamic-size-images
 *  version: 1.0.3
 *  https://github.com/cuth/dynamic-size-images
 *  @preserve
 */

define(['jquery'], function ($) {

'use strict';

var defaults = {
    measure: 'width',
    operator: '<=',
    debounceTime: 150,
    checkOnWinLoad: false
};

var devicePixelRatio = devicePixelRatio || 1;

var operators = {
    '<': function (a, b) { return a < b; },
    '<=': function (a, b) { return a <= b; },
    '>': function (a, b) { return a > b; },
    '>=': function (a, b) { return a >= b; }
};

var setSrc = function ($img, attr) {
    if ($img.is('img')) {
        $img.attr('src', $img.attr(attr));
    } else {
        $img.css('background-image', 'url("' + $img.attr(attr) + '")');
    }
};

var runCheck = function () {
    var self = this,
        isHeight = (this.opts.measure === 'height');
    this.$images.each(function () {
        var $img = $(this),
            measurement = (isHeight) ? $img.height() : $img.width(),
            x,
            setLength = self.set.length;
        measurement *= devicePixelRatio;
        for (x = 0; x < setLength; x += 1) {
            if (!self.set[x].size) {
                setSrc.call(self, $img, self.set[x].attrName);
                return;
            }
            if (operators[self.opts.operator](measurement, self.set[x].size)) {
                setSrc.call(self, $img, self.set[x].attrName);
                return;
            }
        }
    });
};

// This debounce function is taken from _underscore
var debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
        context = this;
        args = arguments;
        timestamp = new Date();
        var later = function() {
            var last = (new Date()) - timestamp;
            if (last < wait) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) result = func.apply(context, args);
            }
        };
        var callNow = immediate && !timeout;
        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) result = func.apply(context, args);
        return result;
    };
};

var bindEvents = function () {
    var self = this,
        $w = $(window);
    $w.on('resize', debounce(function () {
        runCheck.call(self);
    }, this.opts.debounceTime));
    if (this.opts.checkOnWinLoad) {
        $w.on('load', function () {
            runCheck.call(self);
        });
    }
};

var init = function (images, set, options) {
    if (!images || !set || !set.length) return false;
    this.$images = $(images);
    if (!this.$images.length) return false;
    this.set = set;
    this.opts = $.extend({}, defaults, options);
    bindEvents.call(this);
    runCheck.call(this);
    return true;
};

var DynamicSizeImages = function (images, set, options) {
    this.result = init.call(this, images, set, options);
};

DynamicSizeImages.prototype.runCheck = runCheck;

$.fn.DynamicSizeImages = function (set, options) {
    return new MediaQueryImages(this, set, options);
};

return MediaQueryImages;

});