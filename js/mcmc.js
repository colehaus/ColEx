var mcmc=function(n,t){"use strict";var r,a,e,u=[-1,1],o=function(t,r,a,e){var u=e[0],o=(t-u)/(e[1]-u);return n.beta.pdf(o,r,a)};return{posterior_predictive_check:function(n){for(var r,a,e=n.length,i=[],c=0;c<10;c++){var f=n[(r=0,a=e,Math.floor(Math.random()*(a-r))+r)];i.push(t.sampleFunc(-1,1,function(n){return o(n,f[0],f[1],u)}))}return i},run_BEST:function(t,i,c,f,l){var s=function(n){p.burn(500),n>0?(f(.45*(1-500*n/c)),r=setTimeout(function(){s(n-1)},0)):(a=p.n_samples_asynch(i,50),h())},h=function(){if(p.running_asynch()){var n=1-p.samples_left()/i;f(.45+.45*n),e=setTimeout(h,0)}else l(p.chain())};clearTimeout(r),clearTimeout(a),clearTimeout(e);var m,p=function(t,r){for(var a=t.length,e=0,o=[],c=t,f=[],l=[],s=0;s<a;s++)f[s]=0,l[s]=0;var h=function(){var t;o.push(c.concat((t=c,u[0]+n.beta.mean(t[0],t[1])*(u[1]-u[0]))));for(var i=0;i<a;i++){var s=n.normal.sample(c[i],Math.exp(f[i])),h=c.slice();h[i]=s,Math.exp(r(h)-r(c))>Math.random()&&(l[i]++,c=h)}if(o.length%50==0)for(e++,i=0;i<a;i++)l[i]/50>.44?f[i]+=Math.min(.01,1/Math.sqrt(e)):l[i]/50<.44&&(f[i]-=Math.min(.01,1/Math.sqrt(e))),l[i]=0;return c},m=function(n){for(var t=0;t<n-1;t++)h();return h()},p=!1,v=i,M=function(n,t){return v=n,n>0?(p=!0,m(t),setTimeout(function(){M(n-t,t)},0)):(p=!1,null)};return{chain:function(){return o},running_asynch:function(){return p},burn:function(n){var t=o.slice();m(n),o=t},n_samples:m,samples_left:function(){return v},n_samples_asynch:M}}([1,1],(m=t,function(t){var r=t[0],a=t[1],e=0;e+=Math.log(n.exponential.pdf(r,1)),e+=Math.log(n.exponential.pdf(a,1));for(var i=0,c=m.length;i<c;i++)e+=Math.log(o(m[i],r,a,u));return e}));s(Math.ceil(c/500))}}}(jStat,plot);