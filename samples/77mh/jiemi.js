function decode(p, a, c, k, e, d) {
  e = function (c) {
    return (
      (c < a ? "" : e(parseInt(c / a))) +
      ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    );
  };
  if (!"".replace(/^/, String)) {
    while (c--) {
      d[e(c)] = k[c] || e(c);
    }
    k = [
      function (e) {
        return d[e];
      },
    ];
    e = function () {
      return "\\w+";
    };
    c = 1;
  }
  while (c--) {
    if (k[c]) {
      p = p.replace(new RegExp("\\b" + e(c) + "\\b", "g"), k[c]);
    }
  }
  return p;
}

const result = decode(
  "4 U=\"o\";4 p='0/14/q.3|0/14/r.3|0/14/s.3|0/14/t.3|0/14/n.3|0/14/u.3|0/14/w.3|0/14/x.3|0/14/y.3|0/14/z.3|0/14/A.3|0/14/B.3|0/14/C.3|0/14/m.3|0/14/k.3|0/14/6.3|0/14/7.3|0/14/8.3|0/14/9.3|0/14/a.3|0/14/b.3|0/14/d.3|0/14/c.3|0/14/e.3|0/14/f.3|0/14/g.3|0/14/h.3|0/14/i.3|0/14/j.3|0/14/v.3|0/14/E.3|0/14/F.3|0/14/D.3|0/14/W.3|0/14/X.3|0/14/Y.3|0/14/Z.3|0/14/10.3|0/14/11.3|0/14/12.3|0/14/13.3|0/14/15.3|0/14/16.3|0/14/17.3|0/14/18.3|0/14/19.3|0/14/V.3|0/14/T.3';4 S=R;4 Q=P;4 O='';4 N='';4 M='/0/L.5';4 K='第2.1话';4 J='第I话';4 H='/G.5';4 l='时停杀手伪装成我的妻子';",
  62,
  72,
  "202010|||jpg|var|html|15531645915|15531684716|15531668017|15531684918|15531674519|15531628420|15531620422|15531675021|15531667623|15531633224|15531635525|15531696026|15531697527|15531688728|15531622414|linkn_z|15531688113|1553161484|gn|msg|1553166200|1553164511|1553165002|1553168743|1553168395|15531672929|1553167326|1553163237|1553162138|1553161499|15531613110|15531619711|15531657512|15531664332|15531645630|15531696831|colist_245895|link_z|01|linkname|nextName_b|467851|nextLink_b|preName_b|preLink_b|61|img_s|48|maxPage|15531683847|atsvr|15531616446|15531660233|15531690434|15531640035|15531681636|15531691037|15531633038|15531658539|15531678540||15531655441|15531681042|15531681843|15531656644|15531690245".split(
    "|"
  ),
  0,
  {}
);

console.log(result);
/* 结果（已加换行在分号后;）
 var atsvr="gn"; // 取地址必须获得此参数
 var msg='202010/14/1553166200.jpg|202010/14/1553164511.jpg|202010/14/1553165002.jpg|202010/14/1553168743.jpg|202010/14/1553161484.jpg|202010/14/1553168395.jpg|202010/14/1553167326.jpg|202010/14/1553163237.jpg|202010/14/1553162138.jpg|202010/14/1553161499.jpg|202010/14/15531613110.jpg|202010/14/15531619711.jpg|202010/14/15531657512.jpg|202010/14/15531688113.jpg|202010/14/15531622414.jpg|202010/14/15531645915.jpg|202010/14/15531684716.jpg|202010/14/15531668017.jpg|202010/14/15531684918.jpg|202010/14/15531674519.jpg|202010/14/15531628420.jpg|202010/14/15531675021.jpg|202010/14/15531620422.jpg|202010/14/15531667623.jpg|202010/14/15531633224.jpg|202010/14/15531635525.jpg|202010/14/15531696026.jpg|202010/14/15531697527.jpg|202010/14/15531688728.jpg|202010/14/15531672929.jpg|202010/14/15531645630.jpg|202010/14/15531696831.jpg|202010/14/15531664332.jpg|202010/14/15531660233.jpg|202010/14/15531690434.jpg|202010/14/15531640035.jpg|202010/14/15531681636.jpg|202010/14/15531691037.jpg|202010/14/15531633038.jpg|202010/14/15531658539.jpg|202010/14/15531678540.jpg|202010/14/15531655441.jpg|202010/14/15531681042.jpg|202010/14/15531681843.jpg|202010/14/15531656644.jpg|202010/14/15531690245.jpg|202010/14/15531616446.jpg|202010/14/15531683847.jpg';
 var maxPage=48;
 var img_s=61; /// 取地址必须获得此参数
 var preLink_b='';
 var preName_b='';
 var nextLink_b='/202010/467851.html';
 var nextName_b='第2.1话';
 var linkname='第01话';
 var link_z='/colist_245895.html'; /// 取地址必须获得此参数
 var linkn_z='时停杀手伪装成我的妻子';
*/

/*
成功的地址：https://a16d.gdbyhtl.net:64443/h61/202010/14/1553166200.jpg
*/