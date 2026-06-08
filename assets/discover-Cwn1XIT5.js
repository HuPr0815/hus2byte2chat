import{t as e}from"./book-open-DfBQt6Ni.js";import{t}from"./chevron-down-Cnrmbd1D.js";import{t as n}from"./rotate-ccw-Cy_lV6de.js";import{n as r,t as i}from"./zoom-out-CX1UDC1w.js";import{D as a,F as o,I as s,K as c,L as l,P as u,R as d,U as f,c as p,l as m,s as h}from"./index-DafvNKBf.js";import{t as g}from"./head-seo-MYOtiNLk.js";import{t as _}from"./stagger-animation-CFHf6ZO0.js";var v=o(`hash`,[[`line`,{x1:`4`,x2:`20`,y1:`9`,y2:`9`,key:`4lhtct`}],[`line`,{x1:`4`,x2:`20`,y1:`15`,y2:`15`,key:`vyu0kd`}],[`line`,{x1:`10`,x2:`8`,y1:`3`,y2:`21`,key:`1ggp8o`}],[`line`,{x1:`16`,x2:`14`,y1:`3`,y2:`21`,key:`weycgp`}]]),y=c(f(),1),b=class{gridScale;gridWidth;gridHeight;canvasWidth;canvasHeight;data;stride;sat;satStride;totalOccupied=0;mipScale;mipData=null;mipWidth=0;mipHeight=0;mipStride=0;constructor(e,t,n=3,r=4){this.gridScale=n,this.canvasWidth=e,this.canvasHeight=t,this.mipScale=r,this.gridWidth=Math.ceil(e/n),this.gridHeight=Math.ceil(t/n),this.stride=Math.ceil(this.gridWidth/32),this.data=new Uint32Array(this.stride*this.gridHeight),this.satStride=this.gridWidth+1,this.sat=new Uint32Array(this.satStride*(this.gridHeight+1)),this.gridWidth>=r&&this.gridHeight>=r&&(this.mipWidth=Math.ceil(this.gridWidth/r),this.mipHeight=Math.ceil(this.gridHeight/r),this.mipStride=Math.ceil(this.mipWidth/32),this.mipData=new Uint32Array(this.mipStride*this.mipHeight))}clear(){this.data.fill(0),this.sat.fill(0),this.totalOccupied=0,this.mipData?.fill(0)}toGrid(e,t){return[Math.floor(e/this.gridScale),Math.floor(t/this.gridScale)]}markOccupied(e,t,n,r){let[i,a]=this.toGrid(e-n,t-r),[o,s]=this.toGrid(e+n,t+r),c=Math.max(0,i),l=Math.max(0,a),u=Math.min(this.gridWidth-1,o),d=Math.min(this.gridHeight-1,s);new Uint32Array(this.stride);for(let e=l;e<=d;e++){let t=e*this.stride,n=Math.floor(c/32),r=Math.floor(u/32);if(n===r)this.data[t+n]|=(1<<u-c+1)-1<<(c&31);else{this.data[t+n]|=~((1<<(c&31))-1);for(let e=n+1;e<r;e++)this.data[t+e]=4294967295;this.data[t+r]|=(1<<(u&31)+1)-1}}if(this.rebuildSat(l,d),this.mipData){let e=Math.floor(c/this.mipScale),t=Math.floor(u/this.mipScale),n=Math.floor(l/this.mipScale),r=Math.floor(d/this.mipScale);for(let i=n;i<=r;i++){let n=i*this.mipStride;for(let r=e;r<=t;r++){let e=n+Math.floor(r/32);this.mipData[e]|=1<<(r&31)}}}this.totalOccupied+=(u-c+1)*(d-l+1)}rebuildSat(e,t){let n=Math.max(0,e-1);for(let e=n;e<=t;e++){let t=e*this.stride,n=(e+1)*this.satStride,r=e*this.satStride,i=0;for(let e=0;e<this.gridWidth;e++){let a=this.data[t+Math.floor(e/32)]>>(e&31)&1;i+=a,this.sat[n+e+1]=this.sat[r+e+1]+i}}}satQuery(e,t,n,r){let i=Math.max(0,e),a=Math.max(0,t),o=Math.min(this.gridWidth-1,n),s=Math.min(this.gridHeight-1,r);if(i>o||a>s)return 0;let c=this.sat[a*this.satStride+i],l=this.sat[a*this.satStride+(o+1)],u=this.sat[(s+1)*this.satStride+i];return this.sat[(s+1)*this.satStride+(o+1)]-l-u+c}densityAt(e,t,n){let[r,i]=this.toGrid(e,t),a=Math.ceil(n/this.gridScale),o=r-a,s=i-a,c=r+a,l=i+a,u=this.satQuery(o,s,c,l),d=(Math.min(this.gridWidth-1,c)-Math.max(0,o)+1)*(Math.min(this.gridHeight-1,l)-Math.max(0,s)+1);return d>0?u/d:0}checkCollision(e,t,n,r){let[i,a]=this.toGrid(e-n,t-r),[o,s]=this.toGrid(e+n,t+r);if(i<0||o>=this.gridWidth||a<0||s>=this.gridHeight)return!0;let c=Math.floor(i/32),l=Math.floor(o/32);for(let e=a;e<=s;e++){let t=e*this.stride;if(c===l){let e=(1<<o-i+1)-1<<(i&31);if(this.data[t+c]&e)return!0}else{let e=~((1<<(i&31))-1);if(this.data[t+c]&e)return!0;for(let e=c+1;e<l;e++)if(this.data[t+e])return!0;let n=(1<<(o&31)+1)-1;if(this.data[t+l]&n)return!0}}return!1}mipBlockOccupied(e,t){if(!this.mipData)return!1;let n=Math.floor(e/this.mipScale),r=Math.floor(t/this.mipScale);if(n<0||n>=this.mipWidth||r<0||r>=this.mipHeight)return!0;let i=r*this.mipStride+Math.floor(n/32);return(this.mipData[i]&1<<(n&31))!=0}get freeCells(){return this.gridWidth*this.gridHeight-this.totalOccupied}get totalCells(){return this.gridWidth*this.gridHeight}estimateMaxFreeArea(){if(!this.mipData)return this.freeCells*this.gridScale*this.gridScale;let e=0;for(let t=0;t<this.mipData.length;t++)e+=32-x(this.mipData[t]);return e*this.mipScale*this.mipScale*this.gridScale*this.gridScale}};function x(e){return e-=e>>>1&1431655765,e=(e&858993459)+(e>>>2&858993459),e=e+(e>>>4)&252645135,e*16843009>>>24}function S(e,t,n){switch(n){case`circle`:return Math.sqrt(e*e+t*t)-1;case`heart`:{let n=e*1.2,r=-t*1.1,i=n*n+r*r-1,a=i*i*i-n*n*r*r*r,o=i*i,s=6*n*o-2*n*r*r*r,c=6*r*o-3*n*n*r*r,l=Math.sqrt(s*s+c*c);return l<1e-8?Math.sqrt(n*n+r*r)-.9:a/(l*1.15)}case`star`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return-1;let r=(Math.atan2(t,e)%(2*Math.PI/5)+2*Math.PI/5)%(2*Math.PI/5),i=Math.PI/5;return n-(r<i?.42+r/i*.58:1-.58*((r-i)/i))}case`diamond`:return Math.abs(e)+Math.abs(t)-1;case`cloud`:{let n=[[0,0,.48],[-.38,.12,.4],[.38,.12,.4],[-.22,-.28,.44],[.22,-.28,.44],[0,.32,.34]],r=1/0;for(let[i,a,o]of n){let n=Math.sqrt((e-i)**2+(t-a)**2)-o;n<r&&(r=n)}return r}case`hexagon`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return-1;let r=(Math.atan2(t,e)%(Math.PI/3)+Math.PI/3)%(Math.PI/3);return n-Math.cos(Math.PI/6)/Math.cos(r-Math.PI/6)}}}function C(e,t,n){switch(n){case`circle`:return e*e+t*t<=1;case`heart`:{let n=e*1.2,r=-t*1.1,i=n*n+r*r-1;return i*i*i-n*n*r*r*r<=.04}case`star`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return!0;let r=(Math.atan2(t,e)%(2*Math.PI/5)+2*Math.PI/5)%(2*Math.PI/5),i=Math.PI/5;return n<=(r<i?.42+r/i*.58:1-.58*((r-i)/i))}case`diamond`:return Math.abs(e)+Math.abs(t)<=1;case`cloud`:for(let[n,r,i]of[[0,0,.48],[-.38,.12,.4],[.38,.12,.4],[-.22,-.28,.44],[.22,-.28,.44],[0,.32,.34]])if((e-n)**2+(t-r)**2<=i*i)return!0;return!1;case`hexagon`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return!0;let r=(Math.atan2(t,e)%(Math.PI/3)+Math.PI/3)%(Math.PI/3);return n<=Math.cos(Math.PI/6)/Math.cos(r-Math.PI/6)}}}function w(e,t,n){return S(e,t,n)}function T(e,t){let n=e*1.2,r=-t*1.1,i=n*n+r*r-1,a=i*i,o=6*n*a-2*n*r*r*r,s=6*r*a-3*n*n*r*r;if(Math.sqrt(o*o+s*s)<1e-8){let e=Math.sqrt(n*n+r*r)||1;return[-n/e,-r/e]}let c=o*1.2,l=-s*1.1,u=Math.sqrt(c*c+l*l);return[c/u,l/u]}function E(e,t,n){if(n===`heart`)return T(e,t);let r=S(e,t,n),i=Math.max(.001,Math.abs(r)*.01),a=S(e+i,t,n)-r,o=S(e,t+i,n)-r,s=Math.sqrt(a*a+o*o);if(s<1e-8){let n=Math.sqrt(e*e+t*t)||1;return[-e/n,-t/n]}return[a/s,o/s]}function D(e,t,n){let r=.005,i=S(e,t,n),a=S(e+r,t,n),o=S(e-r,t,n),s=S(e,t+r,n),c=S(e,t-r,n),l=(a-2*i+o)/(r*r),u=(s-2*i+c)/(r*r);return Math.abs(l)+Math.abs(u)}function O(e,t,n,r,i,a,o,s){let c=(e-i)/o,l=(t-a)/o,u=n/o,d=r/o;if(s===`circle`){let e=S(c,l,s),t=Math.sqrt(u*u+d*d);if(e>t)return{fits:!1,zone:`outside`};if(e<-t)return{fits:!0,zone:`deep`};let i=n*2*(r*2)>800?[[c,l],[c,l-d],[c,l+d],[c-u,l],[c+u,l],[c-u,l-d],[c+u,l-d],[c-u,l+d],[c+u,l+d]]:[[c,l],[c-u,l-d],[c+u,l-d],[c-u,l+d],[c+u,l+d]];for(let[e,t]of i)if(!C(e,t,s))return{fits:!1,zone:`edge`};return{fits:!0,zone:`edge`}}let f=s===`heart`?4:3,p=[[c,l],[c-u,l-d],[c+u,l-d],[c-u,l+d],[c+u,l+d]],m=0;for(let[e,t]of p)C(e,t,s)&&m++;return m>=f?{fits:!0,zone:m>=5?`deep`:`edge`}:{fits:!1,zone:`edge`}}function k(e,t,n,r,i,a,o,s,c=5){let l=e,u=t;for(let e=0;e<c;e++){let e=(l-i)/o,t=(u-a)/o,c=S(e,t,s);if(c<=0){if(O(l,u,n,r,i,a,o,s).fits)return[l,u];let[c,d]=E(e,t,s);l-=c*n*.3,u-=d*r*.3;continue}let[d,f]=E(e,t,s),p=Math.abs(c)*o;l-=d*p,u-=f*p}return[l,u]}function A(e,t,n,r,i,a,o,s,c,l,u){let d=S((e-n)/i,(t-r)/i,a);if(d<-.3)return c;let f=Math.max(l,u)/i;if(d>f)return s;if(a===`heart`){let e=(d+f*.3)/(f*1.3);return Math.max(s,Math.min(c,o-Math.max(0,Math.min(1,e))*(o-s)*.5))}let p=(d+f)/(2*f);return Math.max(s,Math.min(c,o-Math.max(0,Math.min(1,p))*(o-s)))}function j(e){switch(e){case`heart`:return[[-.35,-.28],[.35,-.28],[0,.55],[-.18,-.08],[.18,-.08],[0,-.12],[-.5,.15],[.5,.15]];case`star`:{let e=[];for(let t=0;t<5;t++){let n=t/5*Math.PI*2-Math.PI/2,r=n+Math.PI/5;e.push([Math.cos(n)*.95,Math.sin(n)*.95]),e.push([Math.cos(r)*.4,Math.sin(r)*.4])}return e}case`diamond`:return[[0,-.85],[0,.85],[-.85,0],[.85,0],[-.4,-.4],[.4,-.4],[-.4,.4],[.4,.4]];case`cloud`:return[[0,-.35],[-.38,-.12],[.38,-.12],[-.22,.28],[.22,.28],[0,.05]];case`hexagon`:{let e=[];for(let t=0;t<6;t++){let n=t/6*Math.PI*2-Math.PI/6;e.push([Math.cos(n)*.9,Math.sin(n)*.9])}return e.push([0,0]),e}case`circle`:return[[0,0]]}}function M(e,t){if(e===`circle`)return[[0,0]];let n=j(e),r=[];for(let i of n){if(r.length>=t)break;C(i[0],i[1],e)&&r.push([i[0],i[1]])}if(r.length<t){let n=[];for(let t=0;t<60;t++)for(let r=0;r<60;r++){let i=t/59*2-1,a=r/59*2-1;C(i,a,e)&&n.push({x:i,y:a,sdf:S(i,a,e)})}n.sort((e,t)=>e.sdf-t.sdf);for(let e of n){if(r.length>=t)break;let n=!1;for(let[t,i]of r)if((e.x-t)**2+(e.y-i)**2<.03){n=!0;break}n||r.push([e.x,e.y])}}return r}function*N(e,t,n=.06,r=.02){if(e===`circle`){let e=1+t;if(e<=0)return;let r=Math.ceil(2*Math.PI/n),i=Array.from({length:r},(e,t)=>t);for(let e=i.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[i[e],i[t]]=[i[t],i[e]]}for(let t of i){let n=t/r*2*Math.PI;yield[e*Math.cos(n),e*Math.sin(n)]}return}let i=Math.ceil(2*Math.PI/n),a=n*.4,o=[];for(let n=0;n<i;n++){let s=n/i*2*Math.PI+(Math.random()-.5)*a,c=.35+Math.abs(t)*.6,l=c*Math.cos(s),u=c*Math.sin(s),d=!1;for(let n=0;n<20;n++){let n=S(l,u,e)-t;if(Math.abs(n)<5e-4){d=!0;break}let[r,i]=E(l,u,e),a=r*r+i*i;if(a<1e-10)break;let o=n/a;l-=r*o,u-=i*o;let s=Math.sqrt(l*l+u*u);s>1.5&&(l*=1.5/s,u*=1.5/s)}if(d&&e===`heart`){let[t,n]=E(l,u,e);if(t*t+n*n<r*r)continue}S(l,u,e)<.02&&o.push([l,u])}if(o.length<10&&n>.02){yield*N(e,t,n*.5,r);return}for(let e=o.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[o[e],o[t]]=[o[t],o[e]]}for(let e of o)yield e}function P(e,t,n,r,i){let a=Math.max(e,t)/n;return r===`heart`&&i!==void 0?i>-.06?a>.1?.06:.03:i>-.2?a>.1?.08:.04:a>.15?.12:.06:a>.15?.12:a>.08?.08:.05}function ee(e,t,n,r){let i=S(e,t,n);return Math.abs(i)*r*.7}function F(e,t,n,r,i,a){let o=ee(e,t,i,a);return n>o||r>o}function I(e,t,n){let r=D(e,t,n),i=S(e,t,n);return r>80&&i>-.15?.4:r>50&&i>-.1?.5:r>30&&i>-.05?.65:r>15?.8:1}function L(e,t,n){let[r,i]=E(e,t,n);return Math.atan2(-i,r)}var te={circle:{icon:`●`,label:`圆形`},heart:{icon:`♥`,label:`心形`},star:{icon:`★`,label:`星形`},diamond:{icon:`◆`,label:`菱形`},cloud:{icon:`☁`,label:`云形`},hexagon:{icon:`⬡`,label:`六边形`}},ne=[`circle`,`heart`,`star`,`diamond`,`cloud`,`hexagon`],R={width:800,height:600,shape:`circle`,minFontSize:11,maxFontSize:42,padding:3,gridScale:3,rotationSteps:0,fontFamily:`sans-serif`,fontWeight:`bold`},z=.12,B=.4,re=2e4,V=[1,.75,.5625,.421875],H=/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/;function U(e){let t=0;for(let n of e)H.test(n)&&t++;return t>e.length*.5}function W(e,t,n,r){return t<=0?n:n+(r-n)*Math.sqrt(e/t)}function G(e,t,n,r,i,a,o,s,c,l){let u=Math.random()*Math.PI*2,d=0,f=null,p=Math.sqrt(t*t+n*n)*.5,m=e.gridScale;for(let h=0;h<re;h++){let h=r+d*Math.cos(u),g=i+d*Math.sin(u);if(h-t<0||h+t>=s||g-n<0||g+n>=c){u+=z,d+=B*z;continue}let _=w((h-r)/a,(g-i)/a,o);if(_>.15){d+=Math.abs(_)*a*.8+p,u+=z;continue}if(e.mipBlockOccupied(Math.floor(h/m),Math.floor(g/m))){d+=2*B*z,u+=z;continue}let[v,y]=[h,g];if(!O(v,y,t,n,r,i,a,o).fits){let[e,s]=k(v,y,t,n,r,i,a,o,4);if(!O(e,s,t,n,r,i,a,o).fits){u+=z,d+=B*z;continue}v=e,y=s}if(!e.checkCollision(v,y,t,n)){let r=e.densityAt(v,y,Math.max(t,n)*1.5);if((f===null||r<f.score)&&(f={x:v,y,score:r,rotated:!1},r<.08))break}if(l){let[l,u]=[n,t];if(v-l>=0&&v+l<s&&y-u>=0&&y+u<c&&O(v,y,l,u,r,i,a,o).fits&&!e.checkCollision(v,y,l,u)){let t=e.densityAt(v,y,Math.max(l,u)*1.5);if((f===null||t<f.score)&&(f={x:v,y,score:t,rotated:!0},t<.08))break}}u+=z,d+=B*z}return f}var ie=[-.4,-.5,-.62,-.32,-.26,-.2,-.16,-.12,-.09,-.06,-.04,-.02],K=[-.02,-.04,-.06,-.09,-.12,-.16,-.2,-.26,-.32,-.4,-.5,-.62];function q(e,t,n,r,i,a,o,s,c,l,u){let d=e.gridScale,f=u<.25?ie:K,p=null,m=0;for(let u=0;u<f.length;u++){let h=f[u],g=P(t,n,a,o,h);for(let[f,_]of N(o,h,g)){let h=r+f*a,g=i+_*a;if(h-t<0||h+t>=s||g-n<0||g+n>=c||e.mipBlockOccupied(Math.floor(h/d),Math.floor(g/d))||o===`heart`&&F(f,_,t,n,o,a))continue;let[v,y]=[h,g];if(!O(v,y,t,n,r,i,a,o).fits){let[e,s]=k(v,y,t,n,r,i,a,o,3);if(!O(e,s,t,n,r,i,a,o).fits)continue;v=e,y=s}let b=(v-r)/a,x=(y-i)/a,S=w(b,x,o),C=Math.max(t,n)/a,T=S>0&&S<=C*1.5;if(!e.checkCollision(v,y,t,n)){let r=e.densityAt(v,y,Math.max(t,n)*1.5);if((p===null||r<p.score)&&(p={x:v,y,score:r,rotated:!1},m=u,r<.03))return p}if(T&&l){let l=L(b,x,o);for(let d of[l,l+Math.PI/2]){let l=Math.abs(Math.cos(d))<.3,[f,h]=l?[n,t]:[t,n];if(v-f>=0&&v+f<s&&y-h>=0&&y+h<c&&O(v,y,f,h,r,i,a,o).fits&&!e.checkCollision(v,y,f,h)){let t=e.densityAt(v,y,Math.max(f,h)*1.5);if((p===null||t<p.score)&&(p={x:v,y,score:t,rotated:l},m=u,t<.03))return p}}}if(l){let[l,d]=[n,t];if(v-l>=0&&v+l<s&&y-d>=0&&y+d<c&&O(v,y,l,d,r,i,a,o).fits&&!e.checkCollision(v,y,l,d)){let t=e.densityAt(v,y,Math.max(l,d)*1.5);if((p===null||t<p.score)&&(p={x:v,y,score:t,rotated:!0},m=u,t<.03))return p}}}if(p&&p.score<.08&&m<=u)return p}return p||(u>.7?G(e,t,n,r,i,a,o,s,c,l):null)}function J(e,t,n,r,i,a,o,s,c,l,u,d){let f=a+t*s,p=o+n*s;return f-r<0||f+r>=l||p-i<0||p+i>=u||!O(f,p,r,i,a,o,s,c).fits||e.checkCollision(f,p,r,i)?null:{x:f,y:p,rotated:!1}}function Y(e,t,n,r,i,a,o,s,c,l,u){return o===`circle`?G(e,t,n,r,i,a,o,s,c,l):q(e,t,n,r,i,a,o,s,c,l,u)}function ae(e,t){let n=t.estimateMaxFreeArea();return e<=n*.3?0:e<=n*.8?1:e<=n*1.5?2:3}function oe(e,t={}){let n={...R,...t};if(e.length===0)return{words:[],placedCount:0,totalCount:0,fillRate:0};let{width:r,height:i,shape:a,minFontSize:o,maxFontSize:s,padding:c,gridScale:l,rotationSteps:u,fontFamily:d,fontWeight:f}=n,p=[...e].sort((e,t)=>t.weight-e.weight),m=Math.max(...p.map(e=>e.weight),1),h=r/2,g=i/2,_=Math.min(r,i)/2*.85,v=new b(r,i,l),y=null,x=()=>(y||=document.createElement(`canvas`).getContext(`2d`),y),S=[],C=u>=1,w=[],T=0;a!==`circle`&&(w=M(a,Math.max(2,Math.min(8,Math.ceil(p.length*.08)))));for(let e=0;e<p.length;e++){let t=p[e],n=W(t.weight,m,o,s),l,u;if(t.width!==void 0&&t.height!==void 0)l=t.width+c*2,u=t.height+c*2;else{let e=x();if(!e)break;e.font=`${f} ${n}px ${d}`,l=e.measureText(t.text).width+c*2,u=(U(t.text)?n:n*1.2)+c*2}let y=ae(l*u,v),b=null;if(a!==`circle`&&T<w.length&&e<Math.ceil(p.length*.15)){for(let e=y;e<4;e++){if(e>y){let r=V[e];n=Math.max(o,W(t.weight,m,o,s)*r);let i=x();if(!i)break;i.font=`${f} ${n}px ${d}`,l=i.measureText(t.text).width+c*2,u=(U(t.text)?n:n*1.2)+c*2}let p=l/2,S=u/2,[E,D]=w[T],O=[[0,0],[.08,0],[-.08,0],[0,.08],[0,-.08]],k=!1;for(let[e,t]of O){let c=J(v,E+e,D+t,p,S,h,g,_,a,r,i,C);if(c){let e=A(c.x,c.y,h,g,_,a,s,o,n,p,S);b={x:c.x,y:c.y,fs:e,rotated:c.rotated},k=!0;break}}if(k)break}T++}if(!b)for(let S=y;S<4;S++){if(S>y){let e=V[S];n=Math.max(o,W(t.weight,m,o,s)*e);let r=x();if(!r)break;r.font=`${f} ${n}px ${d}`,l=r.measureText(t.text).width+c*2,u=(U(t.text)?n:n*1.2)+c*2}let w=l/2,T=u/2,E=Y(v,w,T,h,g,_,a,r,i,C,e/p.length);if(E){let e=n,t=I((E.x-h)/_,(E.y-g)/_,a);t<1&&(e=Math.max(o,e*t));let r=A(E.x,E.y,h,g,_,a,s,o,e,w,T);b={x:E.x,y:E.y,fs:r,rotated:E.rotated};break}}if(!b)for(let e=y;e<4;e++){let n=V[e]*.6,l=Math.max(o,W(t.weight,m,o,s)*n),u=x();if(!u)break;u.font=`${f} ${l}px ${d}`;let p=(u.measureText(t.text).width+c*2)/2,y=((U(t.text)?l:l*1.2)+c*2)/2;for(let e of K){let t=P(p,y,_,a,e);for(let[n,o]of N(a,e,t,.01)){let e=h+n*_,t=g+o*_;if(!(e-p<0||e+p>=r||t-y<0||t+y>=i)&&O(e,t,p,y,h,g,_,a).fits){if(v.checkCollision(e,t,p,y)){let[r,i]=E(n,o,a),s=e-r*2,c=t-i*2;if(O(s,c,p,y,h,g,_,a).fits&&!v.checkCollision(s,c,p,y)){b={x:s,y:c,fs:l,rotated:!1};break}continue}b={x:e,y:t,fs:l,rotated:!1};break}}if(b)break}if(b)break}if(!b)continue;let D={id:t.id,text:t.text,x:b.x,y:b.y,fontSize:b.fs,width:l,height:u,rotated:b.rotated};S.push(D),v.markOccupied(b.x,b.y,b.rotated?u/2:l/2,b.rotated?l/2:u/2)}let D=0;for(let e of S)D+=e.width*e.height;let k=r*i>0?D/(r*i):0;return{words:S,placedCount:S.length,totalCount:e.length,fillRate:k}}var se=8,ce=3e4;function le(e,t={},n={}){let{timeout:r=ce}=n,i=de();return new Promise((n,a)=>{let o=new Blob([i],{type:`application/javascript`}),s=URL.createObjectURL(o),c=new Worker(s,{type:`classic`}),l=setTimeout(()=>{c.terminate(),URL.revokeObjectURL(s),a(Error(`WordCloud worker timed out`))},r);c.onmessage=e=>{if(clearTimeout(l),c.terminate(),URL.revokeObjectURL(s),e.data.type===`SUCCESS`){let{buffer:t,texts:r,placedCount:i,totalCount:a,fillRate:o}=e.data;n({words:ue(t,r),placedCount:i,totalCount:a,fillRate:o})}else e.data.type===`ERROR`?a(Error(e.data.error)):a(Error(`Unknown worker response`))},c.onerror=e=>{clearTimeout(l),c.terminate(),URL.revokeObjectURL(s),a(Error(e.message))},c.postMessage({type:`compute`,words:e,config:t})})}function ue(e,t){let n=e.length/se,r=[];for(let i=0;i<n;i++){let n=i*se,a=e[n+7];r.push({id:e[n],x:e[n+1],y:e[n+2],fontSize:e[n+3],width:e[n+4],height:e[n+5],rotated:e[n+6]!==0,text:t[a]||``})}return r}function de(){return`
/* ================================================================== */
/*  Inlined: grid.ts — BinaryGrid v2                                   */
/* ================================================================== */

function popcount(n) {
  n = n - ((n >>> 1) & 0x55555555)
  n = (n & 0x33333333) + ((n >>> 2) & 0x33333333)
  n = (n + (n >>> 4)) & 0x0F0F0F0F
  return (n * 0x01010101) >>> 24
}

var BinaryGrid = (function() {
  function BinaryGrid(canvasWidth, canvasHeight, gridScale, mipScale) {
    if (gridScale === void 0) { gridScale = 3; }
    if (mipScale === void 0) { mipScale = 4; }
    this.totalOccupied = 0
    this.mipData = null
    this.mipWidth = 0
    this.mipHeight = 0
    this.mipStride = 0
    this.gridScale = gridScale
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.mipScale = mipScale
    this.gridWidth = Math.ceil(canvasWidth / gridScale)
    this.gridHeight = Math.ceil(canvasHeight / gridScale)
    this.stride = Math.ceil(this.gridWidth / 32)
    this.data = new Uint32Array(this.stride * this.gridHeight)
    this.satStride = this.gridWidth + 1
    this.sat = new Uint32Array(this.satStride * (this.gridHeight + 1))
    if (this.gridWidth >= mipScale && this.gridHeight >= mipScale) {
      this.mipWidth = Math.ceil(this.gridWidth / mipScale)
      this.mipHeight = Math.ceil(this.gridHeight / mipScale)
      this.mipStride = Math.ceil(this.mipWidth / 32)
      this.mipData = new Uint32Array(this.mipStride * this.mipHeight)
    }
  }
  BinaryGrid.prototype.toGrid = function(px, py) {
    return [Math.floor(px / this.gridScale), Math.floor(py / this.gridScale)]
  }
  BinaryGrid.prototype.markOccupied = function(x, y, halfW, halfH) {
    var _a = this.toGrid(x - halfW, y - halfH), minCx = _a[0], minCy = _a[1]
    var _b = this.toGrid(x + halfW, y + halfH), maxCx = _b[0], maxCy = _b[1]
    var cx0 = Math.max(0, minCx), cy0 = Math.max(0, minCy)
    var cx1 = Math.min(this.gridWidth - 1, maxCx), cy1 = Math.min(this.gridHeight - 1, maxCy)
    for (var cy = cy0; cy <= cy1; cy++) {
      var rowBase = cy * this.stride
      var sElem = Math.floor(cx0 / 32), eElem = Math.floor(cx1 / 32)
      if (sElem === eElem) {
        this.data[rowBase + sElem] |= ((1 << (cx1 - cx0 + 1)) - 1) << (cx0 & 31)
      } else {
        this.data[rowBase + sElem] |= ~((1 << (cx0 & 31)) - 1)
        for (var e = sElem + 1; e < eElem; e++) this.data[rowBase + e] = 0xFFFFFFFF
        this.data[rowBase + eElem] |= (1 << ((cx1 & 31) + 1)) - 1
      }
    }
    this.rebuildSat(cy0, cy1)
    if (this.mipData) {
      var mc0 = Math.floor(cx0 / this.mipScale), mc1 = Math.floor(cx1 / this.mipScale)
      var mr0 = Math.floor(cy0 / this.mipScale), mr1 = Math.floor(cy1 / this.mipScale)
      for (var mr = mr0; mr <= mr1; mr++) {
        var mipRowBase = mr * this.mipStride
        for (var mc = mc0; mc <= mc1; mc++) {
          this.mipData[mipRowBase + Math.floor(mc / 32)] |= (1 << (mc & 31))
        }
      }
    }
    this.totalOccupied += (cx1 - cx0 + 1) * (cy1 - cy0 + 1)
  }
  BinaryGrid.prototype.rebuildSat = function(cy0, cy1) {
    var startRow = Math.max(0, cy0 - 1)
    for (var cy = startRow; cy <= cy1; cy++) {
      var rowBase = cy * this.stride
      var satRow = (cy + 1) * this.satStride
      var satPrevRow = cy * this.satStride
      var rowSum = 0
      for (var cx = 0; cx < this.gridWidth; cx++) {
        var bit = (this.data[rowBase + Math.floor(cx / 32)] >> (cx & 31)) & 1
        rowSum += bit
        this.sat[satRow + cx + 1] = this.sat[satPrevRow + cx + 1] + rowSum
      }
    }
  }
  BinaryGrid.prototype.satQuery = function(cx0, cy0, cx1, cy1) {
    var x0 = Math.max(0, cx0), y0 = Math.max(0, cy0)
    var x1 = Math.min(this.gridWidth - 1, cx1), y1 = Math.min(this.gridHeight - 1, cy1)
    if (x0 > x1 || y0 > y1) return 0
    var a = this.sat[(y0) * this.satStride + (x0)]
    var b = this.sat[(y0) * this.satStride + (x1 + 1)]
    var c = this.sat[(y1 + 1) * this.satStride + (x0)]
    var d = this.sat[(y1 + 1) * this.satStride + (x1 + 1)]
    return d - b - c + a
  }
  BinaryGrid.prototype.densityAt = function(x, y, radius) {
    var _a = this.toGrid(x, y), cx = _a[0], cy = _a[1]
    var r = Math.ceil(radius / this.gridScale)
    var occupied = this.satQuery(cx - r, cy - r, cx + r, cy + r)
    var total = (Math.min(this.gridWidth - 1, cx + r) - Math.max(0, cx - r) + 1)
              * (Math.min(this.gridHeight - 1, cy + r) - Math.max(0, cy - r) + 1)
    return total > 0 ? occupied / total : 0
  }
  BinaryGrid.prototype.checkCollision = function(x, y, halfW, halfH) {
    var _a = this.toGrid(x - halfW, y - halfH), minCx = _a[0], minCy = _a[1]
    var _b = this.toGrid(x + halfW, y + halfH), maxCx = _b[0], maxCy = _b[1]
    if (minCx < 0 || maxCx >= this.gridWidth || minCy < 0 || maxCy >= this.gridHeight) return true
    var startElem = Math.floor(minCx / 32), endElem = Math.floor(maxCx / 32)
    for (var cy = minCy; cy <= maxCy; cy++) {
      var rowBase = cy * this.stride
      if (startElem === endElem) {
        var mask = ((1 << (maxCx - minCx + 1)) - 1) << (minCx & 31)
        if (this.data[rowBase + startElem] & mask) return true
      } else {
        var firstMask = ~((1 << (minCx & 31)) - 1)
        if (this.data[rowBase + startElem] & firstMask) return true
        for (var e = startElem + 1; e < endElem; e++) {
          if (this.data[rowBase + e]) return true
        }
        var lastMask = (1 << ((maxCx & 31) + 1)) - 1
        if (this.data[rowBase + endElem] & lastMask) return true
      }
    }
    return false
  }
  BinaryGrid.prototype.mipBlockOccupied = function(cx, cy) {
    if (!this.mipData) return false
    var mc = Math.floor(cx / this.mipScale), mr = Math.floor(cy / this.mipScale)
    if (mc < 0 || mc >= this.mipWidth || mr < 0 || mr >= this.mipHeight) return true
    return (this.mipData[mr * this.mipStride + Math.floor(mc / 32)] & (1 << (mc & 31))) !== 0
  }
  Object.defineProperty(BinaryGrid.prototype, "freeCells", {
    get: function() { return this.gridWidth * this.gridHeight - this.totalOccupied },
    enumerable: false, configurable: true
  })
  BinaryGrid.prototype.estimateMaxFreeArea = function() {
    if (!this.mipData) return this.freeCells * this.gridScale * this.gridScale
    var freeBlocks = 0
    for (var i = 0; i < this.mipData.length; i++) {
      freeBlocks += 32 - popcount(this.mipData[i])
    }
    return freeBlocks * this.mipScale * this.mipScale * this.gridScale * this.gridScale
  }
  return BinaryGrid
})()

/* ================================================================== */
/*  Inlined: shapes.ts v6 — analytic SDF, adaptive, push-to-edge      */
/*  v6: heart Y-flip, tangent field, feature anchors, curvature        */
/* ================================================================== */
function analyticIsInShape(nx, ny, shape) {
  switch (shape) {
    case "circle": return nx * nx + ny * ny <= 1
    case "heart": {
      var hx = nx * 1.2, hy = -ny * 1.1, v = hx * hx + hy * hy - 1
      return v * v * v - hx * hx * hy * hy * hy <= 0.04
    }
    case "star": {
      var d = Math.sqrt(nx * nx + ny * ny)
      if (d < 0.001) return true
      var a = ((Math.atan2(ny, nx) % (2 * Math.PI / 5)) + (2 * Math.PI / 5)) % (2 * Math.PI / 5)
      return d <= (a < Math.PI / 5 ? 0.42 + 0.58 * (a / (Math.PI / 5)) : 1 - 0.58 * ((a - Math.PI / 5) / (Math.PI / 5)))
    }
    case "diamond": return Math.abs(nx) + Math.abs(ny) <= 1
    case "cloud": {
      var cc = [[0,0,0.48],[-0.38,0.12,0.4],[0.38,0.12,0.4],[-0.22,-0.28,0.44],[0.22,-0.28,0.44],[0,0.32,0.34]]
      for (var i = 0; i < cc.length; i++) {
        if ((nx-cc[i][0])*(nx-cc[i][0])+(ny-cc[i][1])*(ny-cc[i][1]) <= cc[i][2]*cc[i][2]) return true
      }
      return false
    }
    case "hexagon": {
      var d = Math.sqrt(nx * nx + ny * ny)
      if (d < 0.001) return true
      var a = ((Math.atan2(ny, nx) % (Math.PI / 3)) + (Math.PI / 3)) % (Math.PI / 3)
      return d <= Math.cos(Math.PI / 6) / Math.cos(a - Math.PI / 6)
    }
    default: return nx * nx + ny * ny <= 1
  }
}

function isInShape(nx, ny, shape) { return analyticIsInShape(nx, ny, shape) }

/** Analytic SDF for all shapes. < 0 = inside, > 0 = outside. */
function analyticSdf(nx, ny, shape) {
  switch (shape) {
    case "circle": return Math.sqrt(nx * nx + ny * ny) - 1
    case "heart": {
      var hx = nx * 1.2, hy = -ny * 1.1, v = hx * hx + hy * hy - 1
      var f = v * v * v - hx * hx * hy * hy * hy, v2 = v * v
      var dfx = 6 * hx * v2 - 2 * hx * hy * hy * hy, dfy = 6 * hy * v2 - 3 * hx * hx * hy * hy
      var gradMag = Math.sqrt(dfx * dfx + dfy * dfy)
      if (gradMag < 1e-8) return Math.sqrt(hx * hx + hy * hy) - 0.9
      return f / (gradMag * 1.15)
    }
    case "star": {
      var d = Math.sqrt(nx * nx + ny * ny)
      if (d < 0.001) return -1
      var a = ((Math.atan2(ny, nx) % (2 * Math.PI / 5)) + (2 * Math.PI / 5)) % (2 * Math.PI / 5)
      var hs = Math.PI / 5
      var innerR = a < hs ? 0.42 + 0.58 * (a / hs) : 1 - 0.58 * ((a - hs) / hs)
      return d - innerR
    }
    case "diamond": return Math.abs(nx) + Math.abs(ny) - 1
    case "cloud": {
      var cc = [[0,0,0.48],[-0.38,0.12,0.4],[0.38,0.12,0.4],[-0.22,-0.28,0.44],[0.22,-0.28,0.44],[0,0.32,0.34]]
      var minD = 1e9
      for (var i = 0; i < cc.length; i++) {
        var d = Math.sqrt((nx-cc[i][0])*(nx-cc[i][0])+(ny-cc[i][1])*(ny-cc[i][1])) - cc[i][2]
        if (d < minD) minD = d
      }
      return minD
    }
    case "hexagon": {
      var d = Math.sqrt(nx * nx + ny * ny)
      if (d < 0.001) return -1
      var a = ((Math.atan2(ny, nx) % (Math.PI / 3)) + (Math.PI / 3)) % (Math.PI / 3)
      var r = Math.cos(Math.PI / 6) / Math.cos(a - Math.PI / 6)
      return d - r
    }
    default: return Math.sqrt(nx * nx + ny * ny) - 1
  }
}

/** SDF gradient (normalized). */
function heartAnalyticGradient(nx, ny) {
  var hx = nx * 1.2, hy = -ny * 1.1, v = hx * hx + hy * hy - 1, v2 = v * v
  var dfx = 6 * hx * v2 - 2 * hx * hy * hy * hy, dfy = 6 * hy * v2 - 3 * hx * hx * hy * hy
  var mag = Math.sqrt(dfx * dfx + dfy * dfy)
  if (mag < 1e-8) { var dm = Math.sqrt(hx * hx + hy * hy) || 1; return [-hx / dm, -hy / dm] }
  var gx = dfx * 1.2, gy = -dfy * 1.1, gmag = Math.sqrt(gx * gx + gy * gy)
  return [gx / gmag, gy / gmag]
}

function sdfGradient(nx, ny, shape) {
  if (shape === "heart") return heartAnalyticGradient(nx, ny)
  var d0 = analyticSdf(nx, ny, shape)
  var eps = Math.max(0.001, Math.abs(d0) * 0.01)
  var gx = analyticSdf(nx + eps, ny, shape) - d0
  var gy = analyticSdf(nx, ny + eps, shape) - d0
  var mag = Math.sqrt(gx * gx + gy * gy)
  if (mag < 1e-8) {
    var dm = Math.sqrt(nx * nx + ny * ny) || 1
    return [-nx / dm, -ny / dm]
  }
  return [gx / mag, gy / mag]
}

/** Adaptive multi-point shape check with bounding sphere early exit. */
function wordFitsInShapeAdaptive(cx, cy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape) {
  var nx = (cx - shapeCenterX) / shapeRadius
  var ny = (cy - shapeCenterY) / shapeRadius
  var halfWn = halfW / shapeRadius, halfHn = halfH / shapeRadius

  // For circle: exact SDF, use bounding sphere fast accept/reject
  if (shape === "circle") {
    var sdf = analyticSdf(nx, ny, shape)
    var rMax = Math.sqrt(halfWn * halfWn + halfHn * halfHn)
    if (sdf > rMax) return { fits: false, zone: "outside" }
    if (sdf < -rMax) return { fits: true, zone: "deep" }
    var wordArea = (halfW * 2) * (halfH * 2)
    var use8Point = wordArea > 800
    var pts = use8Point
      ? [[nx, ny], [nx, ny - halfHn], [nx, ny + halfHn], [nx - halfWn, ny], [nx + halfWn, ny],
         [nx - halfWn, ny - halfHn], [nx + halfWn, ny - halfHn], [nx - halfWn, ny + halfHn], [nx + halfWn, ny + halfHn]]
      : [[nx, ny], [nx - halfWn, ny - halfHn], [nx + halfWn, ny - halfHn], [nx - halfWn, ny + halfHn], [nx + halfWn, ny + halfHn]]
    for (var i = 0; i < pts.length; i++) {
      if (!analyticIsInShape(pts[i][0], pts[i][1], shape)) return { fits: false, zone: "edge" }
    }
    return { fits: true, zone: "edge" }
  }

  // Non-circle: permissive check — 4/5 for heart, 3/5 for others
  var threshold = shape === "heart" ? 4 : 3
  var pts2 = [[nx, ny], [nx - halfWn, ny - halfHn], [nx + halfWn, ny - halfHn], [nx - halfWn, ny + halfHn], [nx + halfWn, ny + halfHn]]
  var inside = 0
  for (var j = 0; j < 5; j++) { if (analyticIsInShape(pts2[j][0], pts2[j][1], shape)) inside++ }
  if (inside >= threshold) return { fits: true, zone: inside >= 5 ? "deep" : "edge" }
  return { fits: false, zone: "edge" }
}

function wordFitsInShape(cx, cy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape) {
  return wordFitsInShapeAdaptive(cx, cy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape).fits
}

/** Precise SDF gradient push-to-edge displacement. */
function pushToEdge(cx, cy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, maxIter) {
  if (maxIter === void 0) { maxIter = 5 }
  var x = cx, y = cy
  for (var iter = 0; iter < maxIter; iter++) {
    var nx = (x - shapeCenterX) / shapeRadius, ny = (y - shapeCenterY) / shapeRadius
    var sdf = analyticSdf(nx, ny, shape)
    if (sdf <= 0) {
      if (wordFitsInShapeAdaptive(x, y, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape).fits) {
        return [x, y]
      }
      var g = sdfGradient(nx, ny, shape)
      x -= g[0] * halfW * 0.3; y -= g[1] * halfH * 0.3
      continue
    }
    var g2 = sdfGradient(nx, ny, shape)
    var dispPx = Math.abs(sdf) * shapeRadius
    x -= g2[0] * dispPx; y -= g2[1] * dispPx
  }
  return [x, y]
}

/** Edge font size suppression. */
function edgeCappedFontSize(cx, cy, shapeCenterX, shapeCenterY, shapeRadius, shape, maxFontSize, minFontSize, fontSize, halfW, halfH) {
  var nx = (cx - shapeCenterX) / shapeRadius, ny = (cy - shapeCenterY) / shapeRadius
  var sdf = analyticSdf(nx, ny, shape)
  if (sdf < -0.3) return fontSize
  var rMax = Math.max(halfW, halfH) / shapeRadius
  if (sdf > rMax) return minFontSize
  if (shape === "heart") {
    var t = (sdf + rMax * 0.3) / (rMax * 1.3)
    var clamped = Math.max(0, Math.min(1, t))
    return Math.max(minFontSize, Math.min(fontSize, maxFontSize - clamped * (maxFontSize - minFontSize) * 0.5))
  }
  var t = (sdf + rMax) / (2 * rMax)
  var clamped = Math.max(0, Math.min(1, t))
  return Math.max(minFontSize, Math.min(fontSize, maxFontSize - clamped * (maxFontSize - minFontSize)))
}

/* ================================================================== */
/*  v4: Skeleton anchors + isocontour walk                              */
/* ================================================================== */

function computeSkeletonAnchors(shape, count) {
  if (shape === "circle") return [[0, 0]]
  if (shape === "heart") return computeHeartLobeAnchors(count)
  var gridRes = 60, candidates = []
  for (var i = 0; i < gridRes; i++) {
    for (var j = 0; j < gridRes; j++) {
      var nx = (i / (gridRes - 1)) * 2 - 1, ny = (j / (gridRes - 1)) * 2 - 1
      if (!analyticIsInShape(nx, ny, shape)) continue
      var sdf = analyticSdf(nx, ny, shape)
      candidates.push({ x: nx, y: ny, sdf: sdf })
    }
  }
  candidates.sort(function(a, b) { return a.sdf - b.sdf })
  var anchors = [], minDist2 = 0.03
  for (var k = 0; k < candidates.length; k++) {
    if (anchors.length >= count) break
    var c = candidates[k], tooClose = false
    for (var m = 0; m < anchors.length; m++) {
      if ((c.x - anchors[m][0]) * (c.x - anchors[m][0]) + (c.y - anchors[m][1]) * (c.y - anchors[m][1]) < minDist2) { tooClose = true; break }
    }
    if (!tooClose) anchors.push([c.x, c.y])
  }
  return anchors
}

function computeHeartLobeAnchors(count) {
  var lobeCenters = [[-0.35, -0.28], [0.35, -0.28], [0, 0.55], [-0.18, -0.08], [0.18, -0.08], [0, -0.12], [-0.5, 0.15], [0.5, 0.15]]
  var anchors = [], perLobe = Math.max(1, Math.ceil(count / lobeCenters.length))
  for (var li = 0; li < lobeCenters.length; li++) {
    var lcx = lobeCenters[li][0], lcy = lobeCenters[li][1], added = 0
    for (var dr = 0; dr < 0.35 && added < perLobe && anchors.length < count; dr += 0.05) {
      for (var a = 0; a < 8 && added < perLobe && anchors.length < count; a++) {
        var angle = (a / 8) * Math.PI * 2 + Math.random() * 0.3
        var nx = lcx + dr * Math.cos(angle), ny = lcy + dr * Math.sin(angle)
        if (!analyticIsInShape(nx, ny, "heart")) continue
        var tooClose = false
        for (var m = 0; m < anchors.length; m++) {
          if ((nx - anchors[m][0]) * (nx - anchors[m][0]) + (ny - anchors[m][1]) * (ny - anchors[m][1]) < 0.02) { tooClose = true; break }
        }
        if (!tooClose) { anchors.push([nx, ny]); added++ }
      }
    }
  }
  if (anchors.length < count) {
    var gridRes = 50, candidates = []
    for (var i = 0; i < gridRes; i++) {
      for (var j = 0; j < gridRes; j++) {
        var nx = (i / (gridRes - 1)) * 2 - 1, ny = (j / (gridRes - 1)) * 2 - 1
        if (!analyticIsInShape(nx, ny, "heart")) continue
        candidates.push({ x: nx, y: ny, sdf: analyticSdf(nx, ny, "heart") })
      }
    }
    candidates.sort(function(a, b) { return a.sdf - b.sdf })
    for (var k = 0; k < candidates.length; k++) {
      if (anchors.length >= count) break
      var c = candidates[k], tooClose = false
      for (var m = 0; m < anchors.length; m++) {
        if ((c.x - anchors[m][0]) * (c.x - anchors[m][0]) + (c.y - anchors[m][1]) * (c.y - anchors[m][1]) < 0.02) { tooClose = true; break }
      }
      if (!tooClose) anchors.push([c.x, c.y])
    }
  }
  return anchors
}

function walkIsocontour(shape, targetSdf, angleStep) {
  if (angleStep === void 0) { angleStep = 0.06 }
  if (shape === "circle") {
    var r = 1 + targetSdf
    if (r <= 0) return { next: function() { return { done: true } }, [Symbol.iterator]: function() { return this } }
  }
  var count = Math.ceil((2 * Math.PI) / angleStep), jitter = angleStep * 0.4
  // Pre-compute all points, then shuffle
  var points = []
  for (var i = 0; i < count; i++) {
    var angle = (i / count) * 2 * Math.PI + (Math.random() - 0.5) * jitter
    var r = 0.35 + Math.abs(targetSdf) * 0.6
    var nx = r * Math.cos(angle), ny = r * Math.sin(angle)
    for (var iter = 0; iter < 20; iter++) {
      var sdf = analyticSdf(nx, ny, shape), err = sdf - targetSdf
      if (Math.abs(err) < 0.0005) break
      var g = sdfGradient(nx, ny, shape), mag2 = g[0] * g[0] + g[1] * g[1]
      if (mag2 < 1e-10) break
      var step = err / mag2
      nx -= g[0] * step; ny -= g[1] * step
      var d = Math.sqrt(nx * nx + ny * ny)
      if (d > 1.5) { nx *= 1.5 / d; ny *= 1.5 / d }
    }
    if (shape === "heart") {
      var g2 = sdfGradient(nx, ny, shape)
      if (g2[0] * g2[0] + g2[1] * g2[1] >= 0.0004 && analyticSdf(nx, ny, shape) < 0.02) points.push([nx, ny])
    } else if (analyticSdf(nx, ny, shape) < 0.02) {
      points.push([nx, ny])
    }
  }
  // Fisher-Yates shuffle
  for (var j = points.length - 1; j > 0; j--) {
    var k = Math.floor(Math.random() * (j + 1))
    var tmp = points[j]; points[j] = points[k]; points[k] = tmp
  }
  var idx = 0
  return {
    next: function() {
      if (idx < points.length) { var p = points[idx]; idx++; return { value: [p[0], p[1]], done: false } }
      return { done: true }
    },
    [Symbol.iterator]: function() { return this }
  }
}

function isocontourAngleStep(halfW, halfH, shapeRadius, shape, targetSdf) {
  if (shape === "heart" && targetSdf !== void 0) {
    if (targetSdf > -0.06) return wordSize > 0.1 ? 0.06 : 0.03
    if (targetSdf > -0.2) return wordSize > 0.1 ? 0.08 : 0.04
    return wordSize > 0.15 ? 0.12 : 0.06
  }
  var wordSize = Math.max(halfW, halfH) / shapeRadius
  if (wordSize > 0.15) return 0.12
  if (wordSize > 0.08) return 0.08
  return 0.05
}

function regionMaxWordSize(nx, ny, shape, shapeRadius) {
  var sdf = analyticSdf(nx, ny, shape)
  return Math.abs(sdf) * shapeRadius * 0.7
}

function wordTooLargeForRegion(nx, ny, halfW, halfH, shape, shapeRadius) {
  var maxW = regionMaxWordSize(nx, ny, shape, shapeRadius)
  return halfW > maxW || halfH > maxW
}

/* v6: Tangent field, curvature, boundary alignment */
function getSdfTangentVector(nx, ny, shape) {
  var g = sdfGradient(nx, ny, shape)
  return [-g[1], g[0]]
}

function getSdfCurvature(nx, ny, shape) {
  var eps = 0.005
  var d0 = analyticSdf(nx, ny, shape)
  var dxp = analyticSdf(nx + eps, ny, shape)
  var dxm = analyticSdf(nx - eps, ny, shape)
  var dyp = analyticSdf(nx, ny + eps, shape)
  var dym = analyticSdf(nx, ny - eps, shape)
  var dxx = (dxp - 2 * d0 + dxm) / (eps * eps)
  var dyy = (dyp - 2 * d0 + dym) / (eps * eps)
  return Math.abs(dxx) + Math.abs(dyy)
}

function curvatureSizeSuppression(nx, ny, shape) {
  var curvature = getSdfCurvature(nx, ny, shape)
  var sdf = analyticSdf(nx, ny, shape)
  if (curvature > 80 && sdf > -0.15) return 0.4
  if (curvature > 50 && sdf > -0.1) return 0.5
  if (curvature > 30 && sdf > -0.05) return 0.65
  if (curvature > 15) return 0.8
  return 1.0
}

function boundaryTangentAngle(nx, ny, shape) {
  var g = sdfGradient(nx, ny, shape)
  return Math.atan2(-g[1], g[0])
}

var CJK_REGEX = /[\\u4e00-\\u9fff\\u3040-\\u309f\\u30a0-\\u30ff\\uac00-\\ud7af]/
function isCJK(text) {
  var cjkCount = 0
  for (var i = 0; i < text.length; i++) { if (CJK_REGEX.test(text[i])) cjkCount++ }
  return cjkCount > text.length * 0.5
}

var SPIRAL_ANGLE_STEP = 0.12, SPIRAL_RADIUS_GROWTH = 0.4, MAX_SPIRAL_ITERATIONS = 20000
var SIZE_RATIOS = [1.0, 0.75, 0.5625, 0.421875]

function mapFontSize(weight, maxWeight, minFs, maxFs) {
  if (maxWeight <= 0) return minFs
  return minFs + (maxFs - minFs) * Math.sqrt(weight / maxWeight)
}

function findPlacementSpiral(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation) {
  var angle = Math.random() * Math.PI * 2, radius = 0
  var bestCandidate = null
  var jumpUnit = Math.sqrt(halfW * halfW + halfH * halfH) * 0.5
  var gridScale = grid.gridScale
  for (var iter = 0; iter < MAX_SPIRAL_ITERATIONS; iter++) {
    var tx = shapeCenterX + radius * Math.cos(angle), ty = shapeCenterY + radius * Math.sin(angle)
    if (tx - halfW < 0 || tx + halfW >= canvasW || ty - halfH < 0 || ty + halfH >= canvasH) {
      angle += SPIRAL_ANGLE_STEP; radius += SPIRAL_RADIUS_GROWTH * SPIRAL_ANGLE_STEP; continue
    }
    var nx = (tx - shapeCenterX) / shapeRadius, ny = (ty - shapeCenterY) / shapeRadius
    var sdf = analyticSdf(nx, ny, shape)
    if (sdf > 0.15) {
      radius += Math.abs(sdf) * shapeRadius * 0.8 + jumpUnit
      angle += SPIRAL_ANGLE_STEP; continue
    }
    if (grid.mipBlockOccupied(Math.floor(tx / gridScale), Math.floor(ty / gridScale))) {
      radius += 2 * SPIRAL_RADIUS_GROWTH * SPIRAL_ANGLE_STEP; angle += SPIRAL_ANGLE_STEP; continue
    }
    var sx = tx, sy = ty
    var shapeResult = wordFitsInShapeAdaptive(sx, sy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape)
    if (!shapeResult.fits) {
      var pe = pushToEdge(sx, sy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, 4)
      sx = pe[0]; sy = pe[1]
      if (!wordFitsInShapeAdaptive(sx, sy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape).fits) {
        angle += SPIRAL_ANGLE_STEP; radius += SPIRAL_RADIUS_GROWTH * SPIRAL_ANGLE_STEP; continue
      }
    }
    if (!grid.checkCollision(sx, sy, halfW, halfH)) {
      var density = grid.densityAt(sx, sy, Math.max(halfW, halfH) * 1.5)
      if (!bestCandidate || density < bestCandidate.score) {
        bestCandidate = { x: sx, y: sy, score: density, rotated: false }
        if (density < 0.08) break
      }
    }
    if (allowRotation) {
      var rw = halfH, rh = halfW
      if (sx - rw >= 0 && sx + rw < canvasW && sy - rh >= 0 && sy + rh < canvasH &&
          wordFitsInShapeAdaptive(sx, sy, rw, rh, shapeCenterX, shapeCenterY, shapeRadius, shape).fits &&
          !grid.checkCollision(sx, sy, rw, rh)) {
        var rd = grid.densityAt(sx, sy, Math.max(rw, rh) * 1.5)
        if (!bestCandidate || rd < bestCandidate.score) {
          bestCandidate = { x: sx, y: sy, score: rd, rotated: true }
          if (rd < 0.08) break
        }
      }
    }
    angle += SPIRAL_ANGLE_STEP; radius += SPIRAL_RADIUS_GROWTH * SPIRAL_ANGLE_STEP
  }
  return bestCandidate
}

var ISO_LEVELS_DEEP_FIRST = [-0.40, -0.50, -0.62, -0.32, -0.26, -0.20, -0.16, -0.12, -0.09, -0.06, -0.04, -0.02]
var ISO_LEVELS_BOUNDARY_FIRST = [-0.02, -0.04, -0.06, -0.09, -0.12, -0.16, -0.20, -0.26, -0.32, -0.40, -0.50, -0.62]

function findPlacementIsocontour(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation, wordRankPct) {
  var gridScale = grid.gridScale
  var isoLevels = wordRankPct < 0.25 ? ISO_LEVELS_DEEP_FIRST : ISO_LEVELS_BOUNDARY_FIRST
  var bestCandidate = null, bestLevel = 0
  for (var li = 0; li < isoLevels.length; li++) {
    var sdfLevel = isoLevels[li]
    var angleStep = isocontourAngleStep(halfW, halfH, shapeRadius, shape, sdfLevel)
    var walker = walkIsocontour(shape, sdfLevel, angleStep)
    var iterResult = walker.next()
    while (!iterResult.done) {
      var nx = iterResult.value[0], ny = iterResult.value[1]
      var tx = shapeCenterX + nx * shapeRadius, ty = shapeCenterY + ny * shapeRadius
      if (tx - halfW < 0 || tx + halfW >= canvasW || ty - halfH < 0 || ty + halfH >= canvasH) { iterResult = walker.next(); continue }
      if (grid.mipBlockOccupied(Math.floor(tx / gridScale), Math.floor(ty / gridScale))) { iterResult = walker.next(); continue }
      if (shape === "heart" && wordTooLargeForRegion(nx, ny, halfW, halfH, shape, shapeRadius)) { iterResult = walker.next(); continue }
      var sx = tx, sy = ty
      var shapeResult = wordFitsInShapeAdaptive(sx, sy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape)
      if (!shapeResult.fits) {
        var pe = pushToEdge(sx, sy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, 3)
        sx = pe[0]; sy = pe[1]
        if (!wordFitsInShapeAdaptive(sx, sy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape).fits) { iterResult = walker.next(); continue }
      }
      // v6: Boundary tangent alignment in edge zone
      var nxs = (sx - shapeCenterX) / shapeRadius, nys = (sy - shapeCenterY) / shapeRadius
      var sdfAt = analyticSdf(nxs, nys, shape)
      var rMax = Math.max(halfW, halfH) / shapeRadius
      var inEdgeZone = sdfAt > 0 && sdfAt <= rMax * 1.5
      if (!grid.checkCollision(sx, sy, halfW, halfH)) {
        var density = grid.densityAt(sx, sy, Math.max(halfW, halfH) * 1.5)
        if (!bestCandidate || density < bestCandidate.score) {
          bestCandidate = { x: sx, y: sy, score: density, rotated: false }
          bestLevel = li
          if (density < 0.03) return bestCandidate
        }
      }
      // v6: Tangent-aligned rotation in edge zone
      if (inEdgeZone && allowRotation) {
        var tangentAngle = boundaryTangentAngle(nxs, nys, shape)
        var rotAngles = [tangentAngle, tangentAngle + Math.PI / 2]
        for (var ra = 0; ra < rotAngles.length; ra++) {
          var isVertical = Math.abs(Math.cos(rotAngles[ra])) < 0.3
          var rw = isVertical ? halfH : halfW, rh = isVertical ? halfW : halfH
          if (sx - rw >= 0 && sx + rw < canvasW && sy - rh >= 0 && sy + rh < canvasH &&
              wordFitsInShapeAdaptive(sx, sy, rw, rh, shapeCenterX, shapeCenterY, shapeRadius, shape).fits &&
              !grid.checkCollision(sx, sy, rw, rh)) {
            var rd = grid.densityAt(sx, sy, Math.max(rw, rh) * 1.5)
            if (!bestCandidate || rd < bestCandidate.score) {
              bestCandidate = { x: sx, y: sy, score: rd, rotated: isVertical }
              bestLevel = li
              if (rd < 0.03) return bestCandidate
            }
          }
        }
      }
      if (allowRotation) {
        var rw = halfH, rh = halfW
        if (sx - rw >= 0 && sx + rw < canvasW && sy - rh >= 0 && sy + rh < canvasH &&
            wordFitsInShapeAdaptive(sx, sy, rw, rh, shapeCenterX, shapeCenterY, shapeRadius, shape).fits &&
            !grid.checkCollision(sx, sy, rw, rh)) {
          var rd = grid.densityAt(sx, sy, Math.max(rw, rh) * 1.5)
          if (!bestCandidate || rd < bestCandidate.score) {
            bestCandidate = { x: sx, y: sy, score: rd, rotated: true }
            bestLevel = li
            if (rd < 0.03) return bestCandidate
          }
        }
      }
      iterResult = walker.next()
    }
    if (bestCandidate && bestCandidate.score < 0.08 && bestLevel <= li) return bestCandidate
  }
  if (bestCandidate) return bestCandidate
  if (wordRankPct > 0.7) {
    return findPlacementSpiral(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation)
  }
  return null
}

function tryPlaceAt(grid, nx, ny, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation) {
  var tx = shapeCenterX + nx * shapeRadius, ty = shapeCenterY + ny * shapeRadius
  if (tx - halfW < 0 || tx + halfW >= canvasW || ty - halfH < 0 || ty + halfH >= canvasH) return null
  if (!wordFitsInShapeAdaptive(tx, ty, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape).fits) return null
  if (grid.checkCollision(tx, ty, halfW, halfH)) return null
  return { x: tx, y: ty, rotated: false }
}

function findPlacement(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation, wordRankPct) {
  if (shape === "circle") {
    return findPlacementSpiral(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation)
  }
  return findPlacementIsocontour(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation, wordRankPct)
}

function getStartLevel(wordArea, grid) {
  var maxFreeArea = grid.estimateMaxFreeArea()
  if (wordArea <= maxFreeArea * 0.3) return 0
  if (wordArea <= maxFreeArea * 0.8) return 1
  if (wordArea <= maxFreeArea * 1.5) return 2
  return 3
}

var DEFAULT_CONFIG = {
  width: 800, height: 600, shape: "circle",
  minFontSize: 11, maxFontSize: 42, padding: 3,
  gridScale: 3, rotationSteps: 0,
  fontFamily: "sans-serif", fontWeight: "bold",
}

function computeLayout(words, config) {
  if (config === void 0) { config = {} }
  var cfg = {}
  for (var k in DEFAULT_CONFIG) { cfg[k] = config[k] !== undefined ? config[k] : DEFAULT_CONFIG[k] }
  if (words.length === 0) return { words: [], placedCount: 0, totalCount: 0, fillRate: 0 }
  var canvasW = cfg.width, canvasH = cfg.height, shape = cfg.shape
  var minFontSize = cfg.minFontSize, maxFontSize = cfg.maxFontSize
  var padding = cfg.padding, gridScale = cfg.gridScale, rotationSteps = cfg.rotationSteps

  var sorted = words.slice().sort(function(a, b) { return b.weight - a.weight })
  var maxWeight = Math.max.apply(null, sorted.map(function(w) { return w.weight }).concat([1]))

  var shapeCenterX = canvasW / 2, shapeCenterY = canvasH / 2
  var shapeRadius = (Math.min(canvasW, canvasH) / 2) * 0.85
  var grid = new BinaryGrid(canvasW, canvasH, gridScale)
  var placed = [], allowRotation = rotationSteps >= 1

  // Phase 1: Skeleton anchoring for non-circular shapes
  var skeletonAnchors = []
  var skeletonAnchorIdx = 0
  if (shape !== "circle") {
    var anchorCount = Math.max(2, Math.min(8, Math.ceil(sorted.length * 0.08)))
    skeletonAnchors = computeSkeletonAnchors(shape, anchorCount)
  }

  for (var i = 0; i < sorted.length; i++) {
    var word = sorted[i]
    var fontSize = mapFontSize(word.weight, maxWeight, minFontSize, maxFontSize)
    var w, h
    if (word.width !== undefined && word.height !== undefined) {
      w = word.width + padding * 2; h = word.height + padding * 2
    } else {
      w = word.text.length * fontSize * 0.6 + padding * 2
      h = (isCJK(word.text) ? fontSize : fontSize * 1.2) + padding * 2
    }

    var startLevel = getStartLevel(w * h, grid)
    var bestResult = null

    // Phase 1: Try skeleton anchoring first (for non-circular shapes)
    if (shape !== "circle" && skeletonAnchorIdx < skeletonAnchors.length && i < Math.ceil(sorted.length * 0.15)) {
      for (var level = startLevel; level < 4; level++) {
        if (level > startLevel) {
          fontSize = Math.max(minFontSize, mapFontSize(word.weight, maxWeight, minFontSize, maxFontSize) * SIZE_RATIOS[level])
          if (word.width !== undefined && word.height !== undefined) {
            w = word.width * SIZE_RATIOS[level] + padding * 2
            h = word.height * SIZE_RATIOS[level] + padding * 2
          } else {
            w = word.text.length * fontSize * 0.6 + padding * 2
            h = (isCJK(word.text) ? fontSize : fontSize * 1.2) + padding * 2
          }
        }
        var halfW = w / 2, halfH = h / 2
        var anx = skeletonAnchors[skeletonAnchorIdx][0], any = skeletonAnchors[skeletonAnchorIdx][1]
        var offsets = [[0, 0], [0.08, 0], [-0.08, 0], [0, 0.08], [0, -0.08]]
        var didPlace = false
        for (var oi = 0; oi < offsets.length; oi++) {
          var placement = tryPlaceAt(grid, anx + offsets[oi][0], any + offsets[oi][1], halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation)
          if (placement) {
            var cappedFs = edgeCappedFontSize(placement.x, placement.y, shapeCenterX, shapeCenterY, shapeRadius, shape, maxFontSize, minFontSize, fontSize, halfW, halfH)
            bestResult = { x: placement.x, y: placement.y, fs: cappedFs, rotated: placement.rotated }
            didPlace = true; break
          }
        }
        if (didPlace) break
      }
      skeletonAnchorIdx++
    }

    // Phase 2: Normal placement (isocontour or spiral) with v6 enhancements
    if (!bestResult) {
      for (var level = startLevel; level < 4; level++) {
        if (level > startLevel) {
          fontSize = Math.max(minFontSize, mapFontSize(word.weight, maxWeight, minFontSize, maxFontSize) * SIZE_RATIOS[level])
          if (word.width !== undefined && word.height !== undefined) {
            w = word.width * SIZE_RATIOS[level] + padding * 2
            h = word.height * SIZE_RATIOS[level] + padding * 2
          } else {
            w = word.text.length * fontSize * 0.6 + padding * 2
            h = (isCJK(word.text) ? fontSize : fontSize * 1.2) + padding * 2
          }
        }
        var placement = findPlacement(grid, w/2, h/2, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation, i / sorted.length)
        if (placement) {
          var npx = (placement.x - shapeCenterX) / shapeRadius
          var npy = (placement.y - shapeCenterY) / shapeRadius
          var curvSuppress = curvatureSizeSuppression(npx, npy, shape)
          var finalFs = fontSize
          if (curvSuppress < 1.0) {
            finalFs = Math.max(minFontSize, finalFs * curvSuppress)
          }
          var cappedFs = edgeCappedFontSize(placement.x, placement.y, shapeCenterX, shapeCenterY, shapeRadius, shape, maxFontSize, minFontSize, finalFs, w/2, h/2)
          bestResult = { x: placement.x, y: placement.y, fs: cappedFs, rotated: placement.rotated }; break
        }
      }
    }
    // v6: Micro-slip retry — last-ditch effort in boundary zone
    if (!bestResult) {
      for (var level = startLevel; level < 4; level++) {
        var ratio = SIZE_RATIOS[level] * 0.6
        var microFs = Math.max(minFontSize, mapFontSize(word.weight, maxWeight, minFontSize, maxFontSize) * ratio)
        if (word.width !== undefined && word.height !== undefined) {
          w = word.width * ratio + padding * 2
          h = word.height * ratio + padding * 2
        } else {
          w = word.text.length * microFs * 0.6 + padding * 2
          h = (isCJK(word.text) ? microFs : microFs * 1.2) + padding * 2
        }
        var mw = w / 2, mh = h / 2
        var found = false
        for (var sdfLevel of ISO_LEVELS_BOUNDARY_FIRST) {
          var angleStep = isocontourAngleStep(mw, mh, shapeRadius, shape, sdfLevel)
          var walker = walkIsocontour(shape, sdfLevel, angleStep, 0.01)
          var iterResult = walker.next()
          while (!iterResult.done && !found) {
            var nx = iterResult.value[0], ny = iterResult.value[1]
            var tx = shapeCenterX + nx * shapeRadius, ty = shapeCenterY + ny * shapeRadius
            if (tx - mw < 0 || tx + mw >= canvasW || ty - mh < 0 || ty + mh >= canvasH) { iterResult = walker.next(); continue }
            if (!wordFitsInShapeAdaptive(tx, ty, mw, mh, shapeCenterX, shapeCenterY, shapeRadius, shape).fits) { iterResult = walker.next(); continue }
            if (grid.checkCollision(tx, ty, mw, mh)) {
              // Micro-slip: push inward along gradient by 2px
          var g = sdfGradient(nx, ny, shape)
          var slipX = tx - g[0] * 2
          var slipY = ty - g[1] * 2
              if (wordFitsInShapeAdaptive(slipX, slipY, mw, mh, shapeCenterX, shapeCenterY, shapeRadius, shape).fits &&
                  !grid.checkCollision(slipX, slipY, mw, mh)) {
                bestResult = { x: slipX, y: slipY, fs: microFs, rotated: false }
                found = true
                break
              }
              iterResult = walker.next(); continue
            }
            bestResult = { x: tx, y: ty, fs: microFs, rotated: false }
            found = true
            break
          }
          if (found) break
        }
        if (bestResult) break
      }
    }
    if (!bestResult) continue

    placed.push({
      id: word.id, text: word.text, x: bestResult.x, y: bestResult.y,
      fontSize: bestResult.fs, width: w, height: h, rotated: bestResult.rotated
    })
    grid.markOccupied(bestResult.x, bestResult.y,
      bestResult.rotated ? h / 2 : w / 2,
      bestResult.rotated ? w / 2 : h / 2)
  }

  var totalArea = 0
  for (var j = 0; j < placed.length; j++) totalArea += placed[j].width * placed[j].height
  var fillRate = canvasW * canvasH > 0 ? totalArea / (canvasW * canvasH) : 0
  return { words: placed, placedCount: placed.length, totalCount: words.length, fillRate: fillRate }
}

var FLOATS_PER_WORD = 8

self.onmessage = function(e) {
  if (e.data.type !== "compute") return
  var words = e.data.words, config = e.data.config
  try {
    var result = computeLayout(words, config)
    var buf = new Float32Array(result.words.length * FLOATS_PER_WORD)
    var texts = [], textIndexMap = new Map()
    for (var i = 0; i < result.words.length; i++) {
      var pw = result.words[i], offset = i * FLOATS_PER_WORD
      var textIdx = textIndexMap.get(pw.text)
      if (textIdx === undefined) { textIdx = texts.length; texts.push(pw.text); textIndexMap.set(pw.text, textIdx) }
      buf[offset] = typeof pw.id === "number" ? pw.id : 0
      buf[offset + 1] = pw.x; buf[offset + 2] = pw.y; buf[offset + 3] = pw.fontSize
      buf[offset + 4] = pw.width; buf[offset + 5] = pw.height
      buf[offset + 6] = pw.rotated ? 1 : 0; buf[offset + 7] = textIdx
    }
    self.postMessage({ type: "SUCCESS", buffer: buf, texts: texts, placedCount: result.placedCount, totalCount: result.totalCount, fillRate: result.fillRate }, [buf.buffer])
  } catch (err) {
    self.postMessage({ type: "ERROR", error: err.message || String(err) })
  }
}
`}function fe(e,t={}){let n=performance.now(),r=oe(e,t),i=performance.now()-n;return i>50&&console.debug(`[wordcloud] computeSync took ${i.toFixed(1)}ms for ${e.length} words`),r}function pe(e,t={}){return e.length>100?le(e,t):fe(e,t)}var X=s(),me=`"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`,he=1e3,ge=2400,_e=.25,ve=4,Z=.15;function Q(e,t,n){let r=t/100,i=n/100,a=r*Math.min(i,1-i),o=t=>{let n=(t+e/30)%12;return i-a*Math.max(-1,Math.min(n-3,9-n,1))},s=Math.max(0,Math.min(255,Math.round(o(0)*255))),c=Math.max(0,Math.min(255,Math.round(o(8)*255))),l=Math.max(0,Math.min(255,Math.round(o(4)*255)));return`#${s.toString(16).padStart(2,`0`)}${c.toString(16).padStart(2,`0`)}${l.toString(16).padStart(2,`0`)}`}function ye(e,t,n){let r=document.createElement(`canvas`).getContext(`2d`);if(!r)return{inputs:[],colors:new Map,totalArea:0};let i=[...e].sort((e,t)=>t.articleCount-e.articleCount),a=new Map,o=0;return{inputs:i.map((e,i)=>{let s=e.articleCount/t,c=11+31*Math.sqrt(s);r.font=`bold ${c}px ${me}`;let l=r.measureText(e.name),u=i*137.508%360,d=n?68:42;a.set(e.id,[u,70,d]);let f=l.width+6,p=c+6;return o+=f*p,{id:e.id,text:e.name,weight:e.articleCount,width:l.width,height:c}}),colors:a,totalArea:o}}function be(e,t,n,r,i,a,o){let s=window.devicePixelRatio||1;e.width=t*s,e.height=n*s,e.style.width=t+`px`,e.style.height=n+`px`;let c=e.getContext(`2d`);if(c){c.scale(s,s),c.clearRect(0,0,t,n);for(let e=0;e<r.length;e++){let t=r[e],n=e===a,s=i.get(t.id);if(!s)continue;let[l,u,d]=s,f=n?Math.min(d+18,90):d;c.save(),c.font=`bold ${t.fontSize}px ${me}`,c.textAlign=`center`,c.textBaseline=`middle`;let p=c.createLinearGradient(t.x-t.width/2,t.y-t.height/2,t.x-t.width/2,t.y+t.height/2);p.addColorStop(0,Q(l,u,Math.min(f+8,95))),p.addColorStop(.5,Q(l,u,f)),p.addColorStop(1,Q(l,u,Math.max(f-6,5))),c.fillStyle=p,c.shadowColor=o?`rgba(0,0,0,0.5)`:`rgba(0,0,0,0.18)`,c.shadowBlur=n?8:3,c.shadowOffsetX=1,c.shadowOffsetY=1,c.fillText(t.text,t.x,t.y),c.restore()}}}function xe({tags:e,shape:t=`circle`,onShapeChange:a}){let o=(0,y.useRef)(null),s=(0,y.useRef)(null),c=d(),[l,u]=(0,y.useState)(1),[f,p]=(0,y.useState)(0),[m,h]=(0,y.useState)(0),[g,_]=(0,y.useState)(!1),v=(0,y.useRef)({x:0,y:0,px:0,py:0}),[b,x]=(0,y.useState)(null),[S,C]=(0,y.useState)({x:0,y:0}),[w,T]=(0,y.useState)(!1),[E,D]=(0,y.useState)(()=>window.matchMedia(`(prefers-color-scheme: dark)`).matches);(0,y.useEffect)(()=>{let e=window.matchMedia(`(prefers-color-scheme: dark)`),t=e=>D(e.matches);return e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]);let O=(0,y.useMemo)(()=>Math.max(...e.map(e=>e.articleCount),1),[e]),{inputs:k,colors:A,totalArea:j}=(0,y.useMemo)(()=>ye(e,O,E),[e,O,E]),M=(0,y.useMemo)(()=>{let e=j/.6,t=Math.ceil(Math.sqrt(e)*1.15);return Math.max(he,Math.min(ge,t))},[j]),N=M,P=M,[ee,F]=(0,y.useState)({w:800,h:500});(0,y.useEffect)(()=>{let e=o.current;if(!e)return;let t=()=>{let t=e.clientWidth;F({w:t,h:Math.min(t*.78,600)})};t();let n=new ResizeObserver(()=>t());return n.observe(e),()=>n.disconnect()},[]);let[I,L]=(0,y.useState)([]);(0,y.useEffect)(()=>{if(k.length===0||N===0){L([]);return}let e=!1,n=pe(k,{width:N,height:P,shape:t,minFontSize:11,maxFontSize:42,padding:3,gridScale:3});return n instanceof Promise?n.then(t=>{e||(L(t.words),R(t.words,N,P))}):(L(n.words),R(n.words,N,P)),()=>{e=!0}},[k,t,N,P]);let R=(0,y.useCallback)((e,t,n)=>{if(e.length===0)return;let r=o.current;if(!r)return;let i=r.clientWidth,a=Math.min(i*.78,600),s=i/t,c=a/n;u(Math.min(s,c,1.5)),p(0),h(0)},[]),z=(0,y.useCallback)(()=>{u(1),p(0),h(0)},[]),B=(0,y.useCallback)(()=>u(e=>Math.min(ve,e+Z)),[]),re=(0,y.useCallback)(()=>u(e=>Math.max(_e,e-Z)),[]),V=(0,y.useCallback)(e=>{e.preventDefault();let t=o.current.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=-Math.sign(e.deltaY)*Z,a=Math.max(_e,Math.min(ve,l+i)),s=a/l;p(e=>n-s*(n-e)),h(e=>r-s*(r-e)),u(a)},[l]),H=(0,y.useCallback)(e=>{e.button===0&&(_(!0),v.current={x:e.clientX,y:e.clientY,px:f,py:m})},[f,m]);(0,y.useEffect)(()=>{if(!g)return;let e=e=>{let t=(e.clientX-v.current.x)/l,n=(e.clientY-v.current.y)/l;p(v.current.px+t),h(v.current.py+n)},t=()=>_(!1);return window.addEventListener(`mousemove`,e),window.addEventListener(`mouseup`,t),()=>{window.removeEventListener(`mousemove`,e),window.removeEventListener(`mouseup`,t)}},[g,l]);let U=(0,y.useDeferredValue)(b),W=(0,y.useRef)(()=>{});(0,y.useEffect)(()=>{W.current=()=>{let e=s.current;e&&be(e,N,P,I,A,U,E)}},[I,A,U,E,N,P]),(0,y.useEffect)(()=>{let e=requestAnimationFrame(()=>W.current());return()=>cancelAnimationFrame(e)},[I,U,E]);let G=(0,y.useCallback)((e,t)=>{let n=s.current;if(!n)return null;let r=n.getBoundingClientRect(),i=(e-r.left)/l,a=(t-r.top)/l;for(let e=I.length-1;e>=0;e--){let t=I[e];if(i>=t.x-t.width/2&&i<=t.x+t.width/2&&a>=t.y-t.height/2&&a<=t.y+t.height/2)return e}return null},[I,l,f,m]),ie=(0,y.useCallback)(e=>{let t=G(e.clientX,e.clientY);if(t!==b&&x(t),t!==null){let t=o.current.getBoundingClientRect();C({x:e.clientX-t.left,y:e.clientY-t.top}),T(!0)}else T(!1)},[G,b]),K=(0,y.useCallback)(()=>{x(null),T(!1)},[]),q=(0,y.useCallback)(t=>{let n=Math.abs(t.clientX-v.current.x),r=Math.abs(t.clientY-v.current.y);if(n>3||r>3)return;let i=G(t.clientX,t.clientY);if(i!==null){let t=I[i],n=e.find(e=>e.id===t.id);n&&c(`/tags/${n.slug}`)}},[G,c,I,e]);if(e.length===0)return(0,X.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,X.jsx)(`span`,{className:`text-4xl text-muted-foreground/30 mb-4`,children:`🏷️`}),(0,X.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无标签`}),(0,X.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`标签正在整理中`})]});let J=b===null?null:I[b],Y=J?e.find(e=>e.id===J.id):null;return(0,X.jsxs)(`div`,{ref:o,className:`w-full`,children:[(0,X.jsxs)(`div`,{className:`flex items-center justify-between mb-4 flex-wrap gap-2`,children:[(0,X.jsx)(`div`,{className:`flex items-center gap-1.5`,children:ne.map(e=>(0,X.jsx)(`button`,{type:`button`,onClick:()=>a?.(e),title:te[e].label,className:[`inline-flex items-center justify-center w-9 h-9 rounded-lg text-lg transition-all duration-200 select-none`,e===t?`bg-primary text-primary-foreground shadow-sm scale-110`:`text-muted-foreground hover:text-foreground hover:bg-accent`].join(` `),children:te[e].icon},e))}),(0,X.jsxs)(`div`,{className:`flex items-center gap-1`,children:[(0,X.jsx)(`button`,{type:`button`,onClick:re,title:`缩小`,className:`inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors`,children:(0,X.jsx)(i,{className:`h-4 w-4`})}),(0,X.jsxs)(`span`,{className:`text-xs text-muted-foreground font-mono w-12 text-center select-none`,children:[Math.round(l*100),`%`]}),(0,X.jsx)(`button`,{type:`button`,onClick:B,title:`放大`,className:`inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors`,children:(0,X.jsx)(r,{className:`h-4 w-4`})}),(0,X.jsx)(`button`,{type:`button`,onClick:z,title:`重置视图`,className:`inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ml-1`,children:(0,X.jsx)(n,{className:`h-3.5 w-3.5`})})]})]}),(0,X.jsxs)(`div`,{className:`relative overflow-hidden rounded-lg border border-border bg-background select-none`,style:{width:`100%`,height:ee.h||500},onWheel:V,children:[(0,X.jsx)(`div`,{className:`absolute top-0 left-0 origin-top-left`,style:{transform:`translate(${f*l}px, ${m*l}px) scale(${l})`,width:N,height:P},children:(0,X.jsx)(`canvas`,{ref:s,className:`block cursor-grab active:cursor-grabbing`,style:{touchAction:`none`,width:N,height:P},onMouseMove:ie,onMouseLeave:K,onMouseDown:H,onClick:q})}),w&&Y&&(0,X.jsxs)(`div`,{className:`absolute pointer-events-none px-2.5 py-1.5 rounded-md text-xs font-medium shadow-md border border-border bg-popover text-popover-foreground whitespace-nowrap transition-opacity duration-150 z-10`,style:{left:S.x+14,top:S.y-10,transform:`translateY(-100%)`},children:[Y.name,(0,X.jsxs)(`span`,{className:`ml-1.5 text-muted-foreground font-normal`,children:[`(`,Y.articleCount,` 篇)`]})]})]}),I.length<e.length&&(0,X.jsxs)(`p`,{className:`mt-2 text-center text-xs text-muted-foreground`,children:[`已显示 `,I.length,`/`,e.length,` 个标签 （部分标签因形状空间不足未显示）`]})]})}function $(e){let t=e.articleCount||0;if(e.children)for(let n of e.children)t+=$(n);return t}function Se(e){return[...e].sort((e,t)=>{let n=$(e);return $(t)-n}).map(e=>({...e,children:e.children?Se(e.children):void 0}))}var Ce=(0,y.memo)(function e({node:n,depth:r=0}){let[i,o]=(0,y.useState)(r<1),s=n.children&&n.children.length>0,c=(0,y.useMemo)(()=>$(n),[n]);return(0,X.jsxs)(`div`,{children:[(0,X.jsxs)(`div`,{className:`group flex items-center gap-2`,style:{paddingLeft:r*20},children:[s?(0,X.jsx)(`button`,{onClick:()=>o(!i),className:`flex-shrink-0 h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors`,children:i?(0,X.jsx)(t,{className:`h-4 w-4`}):(0,X.jsx)(u,{className:`h-4 w-4`})}):(0,X.jsx)(`span`,{className:`flex-shrink-0 w-6`}),(0,X.jsxs)(l,{to:`/categories/${n.slug}`,className:`flex-1 flex items-center justify-between rounded-lg px-3 py-2.5 transition-all hover:bg-accent group-hover:text-primary`,children:[(0,X.jsxs)(`div`,{className:`flex items-center gap-2 min-w-0`,children:[(0,X.jsx)(a,{className:`h-4 w-4 text-primary flex-shrink-0`}),(0,X.jsx)(`span`,{className:`font-medium text-foreground truncate`,children:n.name}),n.description&&(0,X.jsxs)(`span`,{className:`text-xs text-muted-foreground truncate hidden sm:inline`,children:[`— `,n.description]})]}),(0,X.jsxs)(`span`,{className:`flex-shrink-0 ml-2 font-mono text-xs text-muted-foreground`,children:[c,` 篇`]})]})]}),s&&i&&(0,X.jsx)(`div`,{className:`mt-0.5`,children:n.children.map(t=>(0,X.jsx)(e,{node:t,depth:r+1},t.id))})]})});function we(){let[t,n]=(0,y.useState)(`categories`),[r,i]=(0,y.useState)(`circle`),{data:o,isLoading:s}=m(`/categories`,p,h),{data:c,isLoading:u}=m(`/tags`,p,h),{data:d,isLoading:f}=m(`/columns`,p,h),b=(Array.isArray(o)?o:o?.list)||[],x=(Array.isArray(c)?c:c?.list)||[],S=(Array.isArray(d)?d:d?.list)||[],C=(0,y.useMemo)(()=>Se(b),[b]);return(0,X.jsxs)(`div`,{className:`space-y-8`,children:[(0,X.jsx)(g,{title:`发现`,description:`按分类、专栏或标签探索文章。`}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`span`,{className:`font-mono text-xs font-semibold text-primary tracking-widest uppercase`,children:`探索内容`}),(0,X.jsx)(`h1`,{className:`mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl`,children:`发现`}),(0,X.jsx)(`p`,{className:`mt-4 max-w-2xl text-muted-foreground leading-relaxed`,children:`按分类、专栏或标签探索文章，找到你感兴趣的内容。`})]}),(0,X.jsxs)(`div`,{className:`flex items-center gap-2 flex-wrap`,children:[(0,X.jsxs)(`button`,{onClick:()=>n(`categories`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`categories`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,X.jsx)(a,{className:`h-4 w-4`}),` 分类`]}),(0,X.jsxs)(`button`,{onClick:()=>n(`columns`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`columns`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,X.jsx)(e,{className:`h-4 w-4`}),` 专栏`]}),(0,X.jsxs)(`button`,{onClick:()=>n(`tags`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`tags`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,X.jsx)(v,{className:`h-4 w-4`}),` 标签`]})]}),t===`categories`?s?(0,X.jsx)(`div`,{className:`space-y-3`,children:Array.from({length:6}).map((e,t)=>(0,X.jsx)(`div`,{className:`animate-pulse rounded-lg border border-border bg-card p-4`,children:(0,X.jsx)(`div`,{className:`h-5 w-32 rounded bg-muted`})},t))}):C.length===0?(0,X.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,X.jsx)(a,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,X.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无分类`}),(0,X.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`分类正在整理中`})]}):(0,X.jsx)(_,{className:`rounded-xl border border-border bg-card p-4 md:p-6`,children:C.map(e=>(0,X.jsx)(Ce,{node:e},e.id))}):t===`columns`?f?(0,X.jsx)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`,children:Array.from({length:4}).map((e,t)=>(0,X.jsx)(`div`,{className:`animate-pulse rounded-xl border border-border bg-card p-5`,children:(0,X.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,X.jsx)(`div`,{className:`h-10 w-10 shrink-0 rounded-lg bg-muted`}),(0,X.jsxs)(`div`,{className:`min-w-0 flex-1 space-y-2`,children:[(0,X.jsx)(`div`,{className:`h-5 w-24 rounded bg-muted`}),(0,X.jsx)(`div`,{className:`h-4 w-full rounded bg-muted`})]})]})},t))}):S.length===0?(0,X.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,X.jsx)(e,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,X.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无专栏`}),(0,X.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`专栏正在整理中`})]}):(0,X.jsx)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`,children:S.map(t=>(0,X.jsx)(l,{to:`/categories/${t.slug}`,className:`group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm`,children:(0,X.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,X.jsx)(`div`,{className:`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary`,children:(0,X.jsx)(e,{className:`h-5 w-5`})}),(0,X.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,X.jsx)(`h3`,{className:`font-semibold text-foreground group-hover:text-primary transition-colors`,children:t.name}),(0,X.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground leading-relaxed`,children:t.description})]})]})},t.id))}):u?(0,X.jsx)(`div`,{className:`flex flex-wrap gap-3`,children:Array.from({length:12}).map((e,t)=>(0,X.jsx)(`div`,{className:`animate-pulse rounded-lg bg-muted px-4 py-2`,children:(0,X.jsx)(`div`,{className:`h-4 w-16 rounded bg-muted-foreground/10`})},t))}):x.length===0?(0,X.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,X.jsx)(v,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,X.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无标签`}),(0,X.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`标签正在整理中`})]}):(0,X.jsx)(`div`,{className:`rounded-xl border border-border bg-card p-4 md:p-6`,children:(0,X.jsx)(xe,{tags:x,shape:r,onShapeChange:i})})]})}export{we as default};