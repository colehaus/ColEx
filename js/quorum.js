!function(t){function e(e){for(var o,i,l=e[0],s=e[1],c=e[2],h=0,f=[];h<l.length;h++)i=l[h],a[i]&&f.push(a[i][0]),a[i]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o]);for(u&&u(e);f.length;)f.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],o=!0,l=1;l<n.length;l++){var s=n[l];0!==a[s]&&(o=!1)}o&&(r.splice(e--,1),t=i(i.s=n[0]))}return t}var o={},a={4:0},r=[];function i(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=o,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:n})},i.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var l=window.webpackJsonp=window.webpackJsonp||[],s=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var u=s;r.push([155,0,2]),n()}({155:function(t,e,n){"use strict";n.r(e);n(157);var o=n(1),a=n.n(o),r=n(15),i=n.n(r);let l={hue:["#b5bae6","#d1abe6","#e6abd0","#e6bcb5","#dee2b5","#b5e2b5","#b5e2df"],chroma:["#d7d6e6","#b5bbe6","#919fe6","#6d84e6","#4769e6","#1d4de6"],value:["#b5bbe6","#9090b8","#6b6688","#443c56","#18121e"],bodyBack:"#eee"};l.bodyBackAlt=l.value[0],l.inactive=l.value[2],l.lightText=l.value[3],l.bodyText=l.value[4],l.noteBack=l.hue[4],l.menu=l.hue[5];var s,c,u,h=l,f=function(t){var e=t.length,n=i.a.min(t),o=i.a.max(t),a=Math.ceil(Math.sqrt(e)),r=(o-n)/a;if(o-n==0)return[[t[0],e]];for(var l=[],s=0;s<a;s++)l.push([n+s*r+r/2,0]);for(s=0;s<e;s++){l[t[s]===o?a-1:Math.floor((t[s]-n)/r)][1]++}for(s=0;s<a;s++)l[s][1]=l[s][1]/e/r;return l},p=function(t,e){for(var n=[],o=0,a=t.length;o<a;o++)n.push(t[o][e]);return n},d={twoDArrayCol:p,histogramCounts:f,sampleFunc:function(t,e,n){for(var o=(e-t)/200,a=[],r=t;r<e;r+=o)a.push([r,n(r)]);return a.push([e,n(e)]),a},xHistLims:function(t){var e=[].concat.apply([],t);return[i.a.min(e),i.a.max(e)]},yHistLims:function(t){for(var e=[],n=0,o=t.length;n<o;n++)e=e.concat(p(f(t[n]),1));return[.8*i.a.min(e),1.2*i.a.max(e)]},getHeight:function(t,e){for(var n=0;!(t>e[n][0]&&t<e[n+1][0]);)n++;return e[n][1]}},m=[-1,1],v=function(t,e,n,o){var a=o[0],r=(t-a)/(o[1]-a);return i.a.beta.pdf(r,e,n)},g=function(t){for(var e,n,o=t.length,a=[],r=0;r<10;r++){var i=t[(e=0,n=o,Math.floor(Math.random()*(n-e))+e)];a.push(d.sampleFunc(-1,1,function(t){return v(t,i[0],i[1],m)}))}return a},b=function(t,e,n,o,a){var r=function(t){f.burn(500),t>0?(o(.45*(1-500*t/n)),s=setTimeout(function(){r(t-1)},0)):(c=f.n_samples_asynch(e,50),l())},l=function(){if(f.running_asynch()){var t=1-f.samples_left()/e;o(.45+.45*t),u=setTimeout(l,0)}else a(f.chain())};clearTimeout(s),clearTimeout(c),clearTimeout(u);var h,f=function(t,n){for(var o=t.length,a=0,r=[],l=t,s=[],c=[],u=0;u<o;u++)s[u]=0,c[u]=0;var h=function(){var t;r.push(l.concat((t=l,m[0]+i.a.beta.mean(t[0],t[1])*(m[1]-m[0]))));for(var e=0;e<o;e++){var u=i.a.normal.sample(l[e],Math.exp(s[e])),h=l.slice();h[e]=u,Math.exp(n(h)-n(l))>Math.random()&&(c[e]++,l=h)}if(r.length%50==0)for(a++,e=0;e<o;e++)c[e]/50>.44?s[e]+=Math.min(.01,1/Math.sqrt(a)):c[e]/50<.44&&(s[e]-=Math.min(.01,1/Math.sqrt(a))),c[e]=0;return l},f=function(t){for(var e=0;e<t-1;e++)h();return h()},p=!1,d=e,v=function(t,e){return d=t,t>0?(p=!0,f(e),setTimeout(function(){v(t-e,e)},0)):(p=!1,null)};return{chain:function(){return r},running_asynch:function(){return p},burn:function(t){var e=r.slice();f(t),r=e},n_samples:f,samples_left:function(){return d},n_samples_asynch:v}}([1,1],(h=t,function(t){var e=t[0],n=t[1],o=0;o+=Math.log(i.a.exponential.pdf(e,1)),o+=Math.log(i.a.exponential.pdf(n,1));for(var a=0,r=h.length;a<r;a++)o+=Math.log(v(h[a],e,n,m));return o}));r(Math.ceil(n/500))};const x={font:{size:8},shadowSize:0,yaxis:{tickLength:5},xaxis:{tickLength:5},legend:{backgroundColor:"rgba(0, 0, 0, 0)",color:h.bodyText},grid:{backgroundColor:null,color:h.bodyText},colors:h.chroma.slice(1)},y=[-1,1],w=(t,e,n,o=[])=>{let r,l=a.a.extend(!0,{},x);const s=[];if(!0===n.log){const t={ticks:[0,.01,.1,1,10,100],transform:t=>Math.log(t+.001),inverseTransform:t=>Math.exp(t),tickDecimals:2};a.a.extend(l.xaxis,t),a.a.extend(l.yaxis,t)}const c=([t,e])=>!0===n.log?{min:t/2,max:2*e}:{min:t,max:e};if("object"==typeof n.xlims&&null!==n.xlims&&a.a.extend(l.xaxis,c(n.xlims)),"object"==typeof n.ylims&&null!==n.ylims&&a.a.extend(l.yaxis,c(n.ylims)),0!==o.length&&(o.forEach(t=>{s.push({data:t,color:"rgba(165, 170, 204, 0.7)"})}),s[0].label="Posterior Prediction"),0!==e.length){const t=(r=d.histogramCounts(e)).length>1?r[1][0]-r[0][0]:.05;s.push({data:r,bars:{show:!0,align:"center",barWidth:t},color:1})}if("number"==typeof n.compValue){const t=((t,e)=>{const n=i.a.mean(i.a.map(e,e=>e>=t?1:0));return[1-n,n]})(n.compValue,e);s.push({data:[[n.compValue,0],[n.compValue,1/0]],label:(100*t[0]).toPrecision(3)+"% < "+n.compValue+" < "+(100*t[1]).toPrecision(3)+"%",lines:{lineWidth:2},color:2})}if(void 0!==n.di&&null!==n.di){const t=(t,[e,o])=>{s.push({data:[[e,d.getHeight(e===y[0]?o:e,r)],[o,d.getHeight(o===y[1]?e:o,r)]],label:t.toPrecision(2).slice(2)+"% "+n.di+" ("+e.toPrecision(3)+", "+o.toPrecision(3)+")",lines:{lineWidth:5},color:3})};"BI"===n.di?[.95,.99].forEach(n=>{t(n,((t,e)=>{e=e.sort((t,e)=>t-e);const n=Math.floor(e.length*t),o=[e[e.length-1-n],y[1]],a=[y[0],e[n]];return-o[0]<a[1]?o:a})(n,e))}):[.95].forEach(n=>{t(n,((t,e)=>{e=e.sort((t,e)=>t-e);const n=Math.floor(e.length*t);let o,[a,r]=[i.a.min(e),i.a.max(e)];for(let t=0,i=e.length-n;t<i;t++)(o=e[t+n]-e[t])<r-a&&([a,r]=[e[t],e[t+n]]);return[a,r]})(n,e))})}if(void 0!==e.length&&0!==e.length){const t=i.a.mean(e);s.push({data:[[t,0]],label:"Mean: "+t.toPrecision(3),points:{show:!0},color:4})}return a.a.plot(t,s,l)},M=t=>{const e=t.length,n=e-1;if(e<30)return void alert("We need at least 30 votes for this calculation. You need at least "+(30-e)+" more.");const o=i.a.mean(t),r=i.a.stdev(t),l=d.sampleFunc(-1,1,t=>i.a.studentt.pdf((o-t)/r*Math.sqrt(e),n)),s=[{data:l,lines:{show:!0},color:1},{data:[[o,0]],label:"Mean: "+o.toPrecision(3),points:{show:!0},color:4}];[.95,.99].forEach(t=>{const[a,l,c]=(t=>{const a=i.a.studentt.inv(t,n)*r/Math.sqrt(e),l=i.a.studentt.pdf(i.a.studentt.inv(t,n),n);return o>0?[l,o-a,1/0]:[l,-1/0,o+a]})(t);s.push({data:[[l,a],[c,a]],label:t.toPrecision(2).slice(2)+"% CI ("+l.toPrecision(3)+", "+c.toPrecision(3)+")",lines:{lineWidth:5},color:3})}),a()("#stat-out").show(),a.a.plot(a()("#freq > div"),s,x),a()("progress").attr("value",1)},P=t=>{const e=t=>(t=t.replace(/[^-1234567890.]+$/,"").replace(/^[^-1234567890.]+/,""),i.a.map(t.split(/[^-1234567890.]+/),t=>{const e=parseFloat(t);if(isNaN(e))throw Error("NaN");return e<=0?.001:e>=1?.999:e}));let n,o;try{n=e(a()("#data1").val()),o=e(a()("#data2").val())}catch(t){return alert("ERROR: Data not supplied for both groups or not formatted correctly."),null}const r=o.length-n.length;if(0!==r&&!0===t){const t=" Since we're supposed to pair data, that's bad.";return r>0?(alert("You have "+r+" more data points for Proposal 2 than for Proposal 1."+t),null):(alert("You have "+-r+" more data points for Proposal 1 than for Proposal 2."+t),null)}const l=[],s=Math.min(n.length,o.length);for(let t=0;t<s;t++)l.push(o[t]-n[t]);return[n,o,l]},k=t=>{const e=P();if(void 0===e)return;const n=d.yHistLims(e);w(a()("#preview1 > div"),e[0],{xlims:[0,1],ylims:n}),w(a()("#preview2 > div"),e[1],{xlims:[0,1],ylims:n}),w(a()("#diff > div"),e[2],{xlims:[-1,1]},t)};a()(()=>{a()(".act > .analyze").click(()=>{const t=P(!0);void 0!==t&&(a()("#best").parent().hasClass("open")?(t=>{const e=t=>{a()("progress").attr("value",t)};a()(".analyze").html("Re-analyze"),b(t,2e4,2e4,e,t=>{k(g(t)),e(.925),a()("#stat-out").show(),w(a()("#mean > div"),d.twoDArrayCol(t,2),{di:"BI",comp:0,xlims:[-1,1]}),e(.95);const n=d.twoDArrayCol(t,0),o=d.twoDArrayCol(t,1),r=d.xHistLims([n,o]),i=d.yHistLims([n,o]);w(a()("#alpha > div"),n,{di:"HDI",xlims:r,ylims:i,log:!0}),e(.975),w(a()("#beta > div"),o,{di:"HDI",xlims:r,ylims:i,log:!0}),e(1)})})(t[2]):M(t[2]))}),a()(".preview").click(()=>{k()}),setTimeout(function(){k()});const t={grid:{show:!1},colors:[h.value[3]]};a.a.plot(a()("#non-norm"),[{bars:{show:!0},data:[[-2,4],[-1,1],[0,0],[1,1],[2,4]]}],t),a.a.plot(a()("#sym1"),[{bars:{show:!0},data:[[-2,1],[-1,0],[0,0],[1,2],[2,0]]}],t),a.a.plot(a()("#sym2"),[{bars:{show:!0},data:[[-2,0],[-1,0],[0,3],[1,0],[2,0]]}],t)})}});