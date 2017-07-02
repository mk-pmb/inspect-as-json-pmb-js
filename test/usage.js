/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

require('usnam-pmb');
var eq = require('equal-pmb'), knownGood;

knownGood = (function () {
  var kg = require('read-resolved-file-sync')(require
    )('./expect/usage.json').split(/\n,"(\S*)",\s/);
  return function (s) { return (kg[kg.indexOf(s) + 1] || false); };
}());

(function readmeDemo(expectEqual) {
  //#u
  var inspectAsJSON = require('inspect-as-json-pmb'), words, obj, dump;

  words = String(inspectAsJSON).match(/\b[a-z]{6,}/g);
  dump = inspectAsJSON(words, { maxKeys: 7 });
  expectEqual.lines(dump, knownGood('words'));

  obj = {
    words: words,
    ellipPosTest: {
      letterKeys: {},
      digitKeys: {},
      alnumKeys: {},
    },
    learn: function foo(w, i) {
      var et = obj.ellipPosTest;
      // test proper ellipsis position for several types of keys:
      et.letterKeys[w.slice(0, 3)] = w.slice(-2);
      et.digitKeys[i] = w.slice(0, 2);
      et.alnumKeys[w[0] + i] = i;
    },
  };
  obj.anonFunc = function () { return; };
  words.forEach(obj.learn);
  dump = inspectAsJSON(obj, { maxKeys: 5 });
  expectEqual.lines(dump, knownGood('obj'));
  //#r
}(eq));









console.log("+OK usage test passed.");    //= "+OK usage test passed."
