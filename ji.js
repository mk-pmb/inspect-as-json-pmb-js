/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
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
  x = x.replace(/()([\x5B\x7B]\n(?:\s*[\x5B\x7B])+)/g, EX.mergeSpace2);
  x = x.replace(/(^|\n *)([\x5B\x7B]\n *)/g, EX.mergeSpace2);
  x = x.replace(/(\n *)([\x5D\x7D](?:\s*[\x5D\x7D])+)/g, EX.mergeSpace2);
  return x + '\n';
};


EX.mergeSpace2 = function (m, a, b) {
  return (m && a) + b.replace(/\s+/g, ' ');
};


EX.makeObjEllip = function (l) {
  l = (+l || 16);
  var h = Math.ceil(l / 2), t = l - h;
  return function (o) {
    var k = (isAry(o) ? 0 : Object.keys(o)), n = (k || o).length, r;
    if (n <= l) { return o; }
    n = '(… +' + (n - l) + ' …)';
    if (!k) { return o.slice(0, h).concat([ n ]).concat(o.slice(-t)); }
    r = {};
    function c(p) { r[p] = o[p]; }
    k.slice(0, h).forEach(c);
    r['(…)'] = n;
    k.slice(-t).forEach(c);
    return r;
  };
};























module.exports = EX;
