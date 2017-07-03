/*jslint indent: 2, maxlen: 80, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

require('usnam-pmb');
var eq = require('equal-pmb'),
  rrfs = require('read-resolved-file-sync')(require),
  knownGood = rrfs.frag('./expect/usage.json');


(function readmeDemo(expectEqual) {
  //#u
  var inspectAsJSON = require('inspect-as-json-pmb'), words, obj, dump;

  obj = [[[[ 1, 2, 3 ]]]];
  dump = inspectAsJSON(obj);
  expectEqual.lines(dump, knownGood('deep_array:123'));

  obj = [[[[ ]]]];
  dump = inspectAsJSON(obj);
  expectEqual.lines(dump, knownGood('deep_array:empty'));

  words = String(inspectAsJSON).replace(/\n *\/{2}[ -~]+/g,
    '').match(/\b[a-z]{6,}/g);
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
