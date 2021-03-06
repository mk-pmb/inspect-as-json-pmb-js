﻿/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, isAry = Array.isArray;


EX = function inspectAsJSON(x, opt) {
  opt = (opt || false);
  var maxKeys = (+opt.maxKeys || 16), objEllip = EX.makeObjEllip(maxKeys);
  x = JSON.stringify(x, function (t, v) {
    t = (v && typeof v);
    if (t === 'function') { return { 'ƒunc': (v.name || null) }; }
    if (t === 'object') { return objEllip(v); }
    return v;
  }, 2);
  x = x.replace(/()(\{\n\s*"ƒunc":[ -~]+\n *\})/g, EX.mergeSpace2);

  // fold space before first non-bracket in a container:
  x = x.replace(/(^|\n *)([\x5B\x7B]\n *)(?=[!-Z_-z])/g, EX.mergeSpace2);

  // merge space between multiple opening array brackets:
  x = x.replace(/()(\x5B(?:\n *\x5B)+)(?=\n *\x5B)/g, EX.mergeSpace2);

  // fold space before closing brackets:
  x = x.replace(/([!-Z_-z])(\n *[\x5D\x7D])/g, EX.mergeSpace2);
  x = x.replace(/(\n *)([\x5D\x7D](?:\s*[\x5D\x7D])+)/g, EX.mergeSpace2);
  return x + '\n';
};


EX.mergeSpace2 = function (m, a, b) { return a + b.replace(/\s+/g, ' ', m); };


EX.makeObjEllip = function (l) {
  l = (+l || 16);
  var h = Math.ceil(l / 2), t = l - h;
  return function (o) {
    var k = (isAry(o) ? 0 : Object.keys(o)), n = (k || o).length, r;
    if (l > n) { return o; }
    n = '(… +' + (n - l) + ' …)';
    if (!k) { return o.slice(0, h).concat([ n ]).concat(o.slice(-t)); }
    r = {};
    function c(p) { r[p] = o[p]; }
    k.slice(0, h).forEach(c);
    r[k[h]] = n;
    k.slice(-t).forEach(c);
    return r;
  };
};























module.exports = EX;
