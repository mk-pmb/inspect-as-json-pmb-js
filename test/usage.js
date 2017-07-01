/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

require('usnam-pmb');
var eq = require('equal-pmb');

(function readmeDemo(expectEqual) {
  //#u
  var inspectAsJSON = require('inspect-as-json-pmb'), words, obj;

  words = String(inspectAsJSON).match(/\b[a-z]{6,}/g);
  expectEqual.lines(inspectAsJSON(words, { maxKeys: 7 }), [
    '[ "function",',
    '  "inspect",',
    '  "stringify",',
    '  "function",',
    '  "(… +8 …)",',
    '  "replace",',
    '  "replace",',
    '  "return"',
    ']',
    '']);

  obj = { words: words, wordEnds: {},
    learn: function foo(w) { obj.wordEnds[w.slice(0, 2)] = w.slice(-2); },
    };
  obj.anonFunc = function () { return; };
  words.forEach(obj.learn);
  expectEqual.lines(inspectAsJSON(obj, { maxKeys: 5 }), [
    '{ "words": [',
    '    "function",',
    '    "inspect",',
    '    "stringify",',
    '    "(… +10 …)",',
    '    "replace",',
    '    "return"',
    '  ],',
    '  "wordEnds": {',
    '    "fu": "on",',
    '    "in": "ct",',
    '    "st": "fy",',
    '    "(…)": "(… +1 …)",',
    '    "re": "rn",',
    '    "ob": "ct"',
    '  },',
    '  "learn": { "ƒunc": "foo" },',
    '  "anonFunc": { "ƒunc": null }',
    '}',
    '']);
  //#r
}(eq));









console.log("+OK usage test passed.");    //= "+OK usage test passed."
