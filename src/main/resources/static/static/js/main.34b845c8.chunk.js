(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{20:function(e,t,n){},21:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var c=n(2),s=n.n(c),i=n(13),o=n.n(i),r=(n(20),n(21),n(4)),a=n(14);n(15);function u(e){var t=new EventSource("http://127.0.0.1:8080/api/specialists");t.onerror=function(){2===t.readyState&&setTimeout(u,300)},t.onmessage=function(t){console.log(t);var n=JSON.parse(t.data);e(n)}}var l=n(0);function d(e){Object(a.a)(e);var t=Object(c.useState)(void 0),n=Object(r.a)(t,2),s=n[0],i=n[1],o=Object(c.useState)(void 0),d=Object(r.a)(o,2),j=d[0],b=d[1];return console.log(s),console.log(j),Object(c.useEffect)((function(){!function(e){var t=new EventSource("http://127.0.0.1:8080/api/customers");t.onerror=function(){2===t.readyState&&setTimeout(u,300)},t.onmessage=function(t){console.log(t);var n=JSON.parse(t.data);e(n)}}(i),u(b)}),[]),Object(l.jsxs)("div",{children:[s?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{children:"waiting customers:"}),s.length&&s.map((function(e,t){return Object(l.jsx)("p",{children:e.customerId},t)}))]}):"loading customers",Object(l.jsx)("div",{children:j?Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("div",{children:"available specialists:"}),j&&j.length?j.map((function(e,t){return Object(l.jsx)("p",{children:e.specialistId},t)})):j.length]}):"loading specialists"})]})}var j=function(){return Object(l.jsx)("div",{className:"App",children:Object(l.jsx)(d,{})})},b=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,42)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),c(e),s(e),i(e),o(e)}))};o.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(j,{})}),document.getElementById("root")),b()}},[[41,1,2]]]);
//# sourceMappingURL=main.34b845c8.chunk.js.map