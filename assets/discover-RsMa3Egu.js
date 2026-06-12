import{t as e}from"./book-open-CW3qOU16.js";import{t}from"./chevron-down-dyud3AjA.js";import{n,r,t as i}from"./zoom-out-CJnaGvp1.js";import{t as a}from"./rotate-ccw-CnGD96wH.js";import{Z as o,_t as s,ct as c,f as l,it as u,m as d,mt as f,ot as p,p as m,st as h}from"./index-BquSFSTI.js";import{t as g}from"./head-seo-C0SUNIBK.js";import{t as _}from"./stagger-animation-CtmSniQA.js";var v=s(f(),1),y=class{gridScale;gridWidth;gridHeight;canvasWidth;canvasHeight;data;stride;sat;satStride;totalOccupied=0;mipScale;mipData=null;mipWidth=0;mipHeight=0;mipStride=0;constructor(e,t,n=3,r=4){this.gridScale=n,this.canvasWidth=e,this.canvasHeight=t,this.mipScale=r,this.gridWidth=Math.ceil(e/n),this.gridHeight=Math.ceil(t/n),this.stride=Math.ceil(this.gridWidth/32),this.data=new Uint32Array(this.stride*this.gridHeight),this.satStride=this.gridWidth+1,this.sat=new Uint32Array(this.satStride*(this.gridHeight+1)),this.gridWidth>=r&&this.gridHeight>=r&&(this.mipWidth=Math.ceil(this.gridWidth/r),this.mipHeight=Math.ceil(this.gridHeight/r),this.mipStride=Math.ceil(this.mipWidth/32),this.mipData=new Uint32Array(this.mipStride*this.mipHeight))}clear(){this.data.fill(0),this.sat.fill(0),this.totalOccupied=0,this.mipData?.fill(0)}toGrid(e,t){return[Math.floor(e/this.gridScale),Math.floor(t/this.gridScale)]}markOccupied(e,t,n,r){let[i,a]=this.toGrid(e-n,t-r),[o,s]=this.toGrid(e+n,t+r),c=Math.max(0,i),l=Math.max(0,a),u=Math.min(this.gridWidth-1,o),d=Math.min(this.gridHeight-1,s);new Uint32Array(this.stride);for(let e=l;e<=d;e++){let t=e*this.stride,n=Math.floor(c/32),r=Math.floor(u/32);if(n===r)this.data[t+n]|=(1<<u-c+1)-1<<(c&31);else{this.data[t+n]|=~((1<<(c&31))-1);for(let e=n+1;e<r;e++)this.data[t+e]=4294967295;this.data[t+r]|=(1<<(u&31)+1)-1}}if(this.rebuildSat(l,d),this.mipData){let e=Math.floor(c/this.mipScale),t=Math.floor(u/this.mipScale),n=Math.floor(l/this.mipScale),r=Math.floor(d/this.mipScale);for(let i=n;i<=r;i++){let n=i*this.mipStride;for(let r=e;r<=t;r++){let e=n+Math.floor(r/32);this.mipData[e]|=1<<(r&31)}}}this.totalOccupied+=(u-c+1)*(d-l+1)}rebuildSat(e,t){let n=Math.max(0,e-1);for(let e=n;e<=t;e++){let t=e*this.stride,n=(e+1)*this.satStride,r=e*this.satStride,i=0;for(let e=0;e<this.gridWidth;e++){let a=this.data[t+Math.floor(e/32)]>>(e&31)&1;i+=a,this.sat[n+e+1]=this.sat[r+e+1]+i}}}satQuery(e,t,n,r){let i=Math.max(0,e),a=Math.max(0,t),o=Math.min(this.gridWidth-1,n),s=Math.min(this.gridHeight-1,r);if(i>o||a>s)return 0;let c=this.sat[a*this.satStride+i],l=this.sat[a*this.satStride+(o+1)],u=this.sat[(s+1)*this.satStride+i];return this.sat[(s+1)*this.satStride+(o+1)]-l-u+c}densityAt(e,t,n){let[r,i]=this.toGrid(e,t),a=Math.ceil(n/this.gridScale),o=r-a,s=i-a,c=r+a,l=i+a,u=this.satQuery(o,s,c,l),d=(Math.min(this.gridWidth-1,c)-Math.max(0,o)+1)*(Math.min(this.gridHeight-1,l)-Math.max(0,s)+1);return d>0?u/d:0}checkCollision(e,t,n,r){let[i,a]=this.toGrid(e-n,t-r),[o,s]=this.toGrid(e+n,t+r);if(i<0||o>=this.gridWidth||a<0||s>=this.gridHeight)return!0;let c=Math.floor(i/32),l=Math.floor(o/32);for(let e=a;e<=s;e++){let t=e*this.stride;if(c===l){let e=(1<<o-i+1)-1<<(i&31);if(this.data[t+c]&e)return!0}else{let e=~((1<<(i&31))-1);if(this.data[t+c]&e)return!0;for(let e=c+1;e<l;e++)if(this.data[t+e])return!0;let n=(1<<(o&31)+1)-1;if(this.data[t+l]&n)return!0}}return!1}mipBlockOccupied(e,t){if(!this.mipData)return!1;let n=Math.floor(e/this.mipScale),r=Math.floor(t/this.mipScale);if(n<0||n>=this.mipWidth||r<0||r>=this.mipHeight)return!0;let i=r*this.mipStride+Math.floor(n/32);return(this.mipData[i]&1<<(n&31))!=0}get freeCells(){return this.gridWidth*this.gridHeight-this.totalOccupied}get totalCells(){return this.gridWidth*this.gridHeight}estimateMaxFreeArea(){if(!this.mipData)return this.freeCells*this.gridScale*this.gridScale;let e=0;for(let t=0;t<this.mipData.length;t++)e+=32-b(this.mipData[t]);return e*this.mipScale*this.mipScale*this.gridScale*this.gridScale}};function b(e){return e-=e>>>1&1431655765,e=(e&858993459)+(e>>>2&858993459),e=e+(e>>>4)&252645135,e*16843009>>>24}function x(e,t,n){switch(n){case`circle`:return Math.sqrt(e*e+t*t)-1;case`heart`:{let n=e*1.2,r=-t*1.1,i=n*n+r*r-1,a=i*i*i-n*n*r*r*r,o=i*i,s=6*n*o-2*n*r*r*r,c=6*r*o-3*n*n*r*r,l=Math.sqrt(s*s+c*c);return l<1e-8?Math.sqrt(n*n+r*r)-.9:a/(l*1.15)}case`star`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return-1;let r=Math.atan2(t,e),i=Math.PI*2/5,a=(r%i+i)%i,o=Math.PI/5;return n-(a<o?.42+a/o*.58:1-.58*((a-o)/o))}case`diamond`:return Math.abs(e)+Math.abs(t)-1;case`cloud`:{let n=[[0,0,.48],[-.38,.12,.4],[.38,.12,.4],[-.22,-.28,.44],[.22,-.28,.44],[0,.32,.34]],r=1/0;for(let[i,a,o]of n){let n=Math.sqrt((e-i)**2+(t-a)**2)-o;n<r&&(r=n)}return r}case`hexagon`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return-1;let r=(Math.atan2(t,e)%(Math.PI/3)+Math.PI/3)%(Math.PI/3);return n-Math.cos(Math.PI/6)/Math.cos(r-Math.PI/6)}}}function S(e,t,n){switch(n){case`circle`:return e*e+t*t<=1;case`heart`:{let n=e*1.2,r=-t*1.1,i=n*n+r*r-1;return i*i*i-n*n*r*r*r<=.04}case`star`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return!0;let r=Math.atan2(t,e),i=Math.PI*2/5,a=(r%i+i)%i,o=Math.PI/5;return n<=(a<o?.42+a/o*.58:1-.58*((a-o)/o))}case`diamond`:return Math.abs(e)+Math.abs(t)<=1;case`cloud`:for(let[n,r,i]of[[0,0,.48],[-.38,.12,.4],[.38,.12,.4],[-.22,-.28,.44],[.22,-.28,.44],[0,.32,.34]])if((e-n)**2+(t-r)**2<=i*i)return!0;return!1;case`hexagon`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return!0;let r=(Math.atan2(t,e)%(Math.PI/3)+Math.PI/3)%(Math.PI/3);return n<=Math.cos(Math.PI/6)/Math.cos(r-Math.PI/6)}}}function C(e,t,n){return S(e,t,n)}function w(e,t,n){return x(e,t,n)}function T(e,t){let n=e*1.2,r=-t*1.1,i=n*n+r*r-1,a=i*i,o=6*n*a-2*n*r*r*r,s=6*r*a-3*n*n*r*r;if(Math.sqrt(o*o+s*s)<1e-8){let e=Math.sqrt(n*n+r*r)||1;return[-n/e,-r/e]}let c=o*1.2,l=-s*1.1,u=Math.sqrt(c*c+l*l);return[c/u,l/u]}function E(e,t){let n=Math.sqrt(e*e+t*t);if(n<.001)return[-1,0];let r=Math.atan2(t,e),i=Math.PI*2/5,a=(r%i+i)%i,o=Math.PI/5,s=a<o?.58/o:-.58/o,c=e/n-s*(-t/(n*n)),l=t/n-s*(e/(n*n)),u=Math.sqrt(c*c+l*l);return u<1e-8?[-e/n,-t/n]:[c/u,l/u]}function D(e,t,n){if(n===`heart`)return T(e,t);if(n===`star`)return E(e,t);let r=x(e,t,n),i=Math.max(.001,Math.abs(r)*.01),a=x(e+i,t,n)-r,o=x(e,t+i,n)-r,s=Math.sqrt(a*a+o*o);if(s<1e-8){let n=Math.sqrt(e*e+t*t)||1;return[-e/n,-t/n]}return[a/s,o/s]}function O(e,t,n){if(n!==`heart`)return 0;let r=.005,i=x(e,t,n),a=x(e+r,t,n),o=x(e-r,t,n),s=x(e,t+r,n),c=x(e,t-r,n),l=(a-2*i+o)/(r*r),u=(s-2*i+c)/(r*r);return Math.abs(l)+Math.abs(u)}function k(e,t,n){if(n!==`heart`)return 1;let r=O(e,t,n),i=x(e,t,n);return r>80&&i>-.15?.65:r>50&&i>-.1?.75:r>30&&i>-.05?.85:1}function A(e,t,n){let[r,i]=D(e,t,n);return Math.atan2(-i,r)}function j(e,t,n,r,i,a,o,s){let c=(e-i)/o,l=(t-a)/o,u=n/o,d=r/o;if(s===`circle`){let e=x(c,l,s),t=Math.sqrt(u*u+d*d);if(e>t)return{fits:!1,zone:`outside`};if(e<-t)return{fits:!0,zone:`deep`};let n=[[c,l],[c-u,l-d],[c+u,l-d],[c-u,l+d],[c+u,l+d]];for(let[e,t]of n)if(!S(e,t,s))return{fits:!1,zone:`edge`};return{fits:!0,zone:`edge`}}let f=s===`heart`?4:3,p=[[c,l],[c-u,l-d],[c+u,l-d],[c-u,l+d],[c+u,l+d]],m=0;for(let[e,t]of p)S(e,t,s)&&m++;return m>=f?{fits:!0,zone:m>=5?`deep`:`edge`}:{fits:!1,zone:`edge`}}function M(e,t,n,r,i,a,o,s,c=5){let l=e,u=t;for(let e=0;e<c;e++){let e=(l-i)/o,t=(u-a)/o,c=x(e,t,s);if(c<=0){if(j(l,u,n,r,i,a,o,s).fits)return[l,u];let[c,d]=D(e,t,s);l-=c*n*.3,u-=d*r*.3;continue}let[d,f]=D(e,t,s),p=Math.abs(c)*o;l-=d*p,u-=f*p}return[l,u]}function N(e,t,n,r,i,a,o,s,c,l,u){let d=x((e-n)/i,(t-r)/i,a);if(d<-.3)return c;let f=Math.max(l,u)/i;if(d>f)return s;if(a===`heart`){let e=(d+f*.3)/(f*1.3);return Math.max(s,Math.min(c,o-Math.max(0,Math.min(1,e))*(o-s)*.5))}let p=(d+f)/(2*f);return Math.max(s,Math.min(c,o-Math.max(0,Math.min(1,p))*(o-s)))}function P(e){switch(e){case`heart`:return[[-.35,-.28],[.35,-.28],[0,.55],[-.18,-.08],[.18,-.08],[0,-.12],[-.5,.15],[.5,.15]];case`star`:{let e=[];for(let t=0;t<5;t++){let n=t/5*Math.PI*2-Math.PI/2,r=n+Math.PI/5;e.push([Math.cos(n)*.85,Math.sin(n)*.85]),e.push([Math.cos(r)*.35,Math.sin(r)*.35]);let i=n+Math.PI/10;e.push([Math.cos(i)*.55,Math.sin(i)*.55])}return e.push([0,0]),e}case`diamond`:return[[0,-.85],[0,.85],[-.85,0],[.85,0],[-.4,-.4],[.4,-.4],[-.4,.4],[.4,.4]];case`cloud`:return[[0,-.35],[-.38,-.12],[.38,-.12],[-.22,.28],[.22,.28],[0,.05]];case`hexagon`:{let e=[];for(let t=0;t<6;t++){let n=t/6*Math.PI*2-Math.PI/6;e.push([Math.cos(n)*.85,Math.sin(n)*.85])}return e.push([0,0]),e}case`circle`:return[[0,0]]}}function F(e,t){if(e===`circle`)return[[0,0]];let n=P(e),r=[];for(let i of n){if(r.length>=t)break;S(i[0],i[1],e)&&r.push([i[0],i[1]])}if(r.length<t){let n=[];for(let t=0;t<60;t++)for(let r=0;r<60;r++){let i=t/59*2-1,a=r/59*2-1;S(i,a,e)&&n.push({x:i,y:a,sdf:x(i,a,e)})}n.sort((e,t)=>e.sdf-t.sdf);for(let e of n){if(r.length>=t)break;let n=!1;for(let[t,i]of r)if((e.x-t)**2+(e.y-i)**2<.03){n=!0;break}n||r.push([e.x,e.y])}}return r}function*I(e,t,n=.06,r=.02){if(e===`circle`){let e=1+t;if(e<=0)return;let r=Math.ceil(2*Math.PI/n),i=Array.from({length:r},(e,t)=>t);for(let e=i.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[i[e],i[t]]=[i[t],i[e]]}for(let t of i){let n=t/r*2*Math.PI;yield[e*Math.cos(n),e*Math.sin(n)]}return}let i=Math.ceil(2*Math.PI/n),a=n*.4,o=[];for(let n=0;n<i;n++){let s=n/i*2*Math.PI+(Math.random()-.5)*a,c=.35+Math.abs(t)*.6,l=c*Math.cos(s),u=c*Math.sin(s),d=!1;for(let n=0;n<15;n++){let n=x(l,u,e)-t;if(Math.abs(n)<.001){d=!0;break}let[r,i]=D(l,u,e),a=r*r+i*i;if(a<1e-10)break;let o=n/a;l-=r*o,u-=i*o;let s=Math.sqrt(l*l+u*u);s>1.5&&(l*=1.5/s,u*=1.5/s)}if(d&&e===`heart`){let[t,n]=D(l,u,e);if(t*t+n*n<r*r)continue}x(l,u,e)<.02&&o.push([l,u])}if(o.length<10&&n>.02){yield*I(e,t,n*.5,r);return}for(let e=o.length-1;e>0;e--){let t=Math.floor(Math.random()*(e+1));[o[e],o[t]]=[o[t],o[e]]}for(let e of o)yield e}function L(e,t,n,r,i){let a=Math.max(e,t)/n;return r===`heart`&&i!==void 0?i>-.06?a>.1?.06:.03:i>-.2?a>.1?.08:.04:a>.15?.12:.06:r===`star`||r===`cloud`?a>.15?.14:a>.08?.1:.06:a>.15?.12:a>.08?.08:.05}function R(e,t,n,r){let i=x(e,t,n);return Math.abs(i)*r*.7}function z(e,t,n,r,i,a){let o=R(e,t,i,a);return n>o||r>o}var ee={circle:{icon:`●`,label:`圆形`},heart:{icon:`♥`,label:`心形`},star:{icon:`★`,label:`星形`},diamond:{icon:`◆`,label:`菱形`},cloud:{icon:`☁`,label:`云形`},hexagon:{icon:`⬡`,label:`六边形`}},te=[`circle`,`heart`,`star`,`diamond`,`cloud`,`hexagon`],B={width:800,height:600,shape:`circle`,minFontSize:11,maxFontSize:42,padding:3,gridScale:3,rotationSteps:0,fontFamily:`sans-serif`,fontWeight:`bold`},V=.12,H=.4,U=2e4,W=[1,.75,.5625,.421875],G=/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/;function K(e){let t=0;for(let n of e)G.test(n)&&t++;return t>e.length*.5}function q(e,t,n,r){return t<=0?n:n+(r-n)*Math.sqrt(e/t)}function ne(e,t,n=64){let r=0;for(let t=0;t<n;t++)for(let i=0;i<n;i++)C(t/(n-1)*2-1,i/(n-1)*2-1,e)&&r++;return 2*t*(2*t)*(r/(n*n))}function re(e,t,n,r,i,a,o,s,c,l){let u=n*(c===`circle`?.65:.5),d=0;for(let n of e){let e=q(n.weight,t,r,i);l.font=`${s} ${e}px ${o}`;let c=l.measureText(n.text).width+a*2,u=(K(n.text)?e:e*1.2)+a*2;d+=c*u}if(d<=u)return 1;let f=Math.sqrt(u/d);return Math.max(.3,f)}function ie(e,t){return F(e,8).map(([n,r])=>{let i=w(n,r,e);return{nx:n,ny:r,clearance:Math.abs(i)*t*2,used:!1}}).sort((e,t)=>t.clearance-e.clearance)}function J(e){switch(e){case`heart`:return[[-.25,-.15],[.25,-.15],[0,.25]];case`star`:{let e=[[0,0]];for(let t=0;t<5;t++){let n=t/5*Math.PI*2-Math.PI/2;e.push([Math.cos(n)*.5,Math.sin(n)*.5])}return e}case`cloud`:return[[0,0],[-.2,-.1],[.2,-.1],[0,.15]];default:return[[0,0]]}}function Y(e,t,n,r,i,a,o,s,c,l,u,d,f=0){let p=u??r,m=d??i,h=Math.random()*Math.PI*2,g=0,_=null,v=Math.sqrt(t*t+n*n)*.5,y=e.gridScale;for(let u=0;u<U;u++){let u=p+g*Math.cos(h),d=m+g*Math.sin(h);if(u-t<0||u+t>=s||d-n<0||d+n>=c){h+=V,g+=H*V;continue}let b=w((u-r)/a,(d-i)/a,o);if(b>.15+f){g+=Math.abs(b)*a*.8+v,h+=V;continue}if(e.mipBlockOccupied(Math.floor(u/y),Math.floor(d/y))){g+=2*H*V,h+=V;continue}let[x,S]=[u,d];if(!j(x,S,t,n,r,i,a,o).fits){let[e,s]=M(x,S,t,n,r,i,a,o,4);if(!j(e,s,t,n,r,i,a,o).fits){h+=V,g+=H*V;continue}x=e,S=s}if(!e.checkCollision(x,S,t,n)){let r=e.densityAt(x,S,Math.max(t,n)*1.5);if((_===null||r<_.score)&&(_={x,y:S,score:r,rotated:!1},r<.08))break}if(l){let[l,u]=[n,t];if(x-l>=0&&x+l<s&&S-u>=0&&S+u<c&&j(x,S,l,u,r,i,a,o).fits&&!e.checkCollision(x,S,l,u)){let t=e.densityAt(x,S,Math.max(l,u)*1.5);if((_===null||t<_.score)&&(_={x,y:S,score:t,rotated:!0},t<.08))break}}h+=V,g+=H*V}return _}var ae=[-.45,-.55,-.35,-.25,-.18,-.12,-.08,-.05,-.03,-.02],oe=[-.02,-.03,-.05,-.08,-.12,-.18,-.25,-.35,-.45,-.55];function se(e,t,n,r,i,a,o,s,c,l,u,d=0){let f=e.gridScale,p=u<.25?ae:oe,m=null,h=0;for(let u=0;u<p.length;u++){let d=p[u],g=L(t,n,a,o,d);for(let[p,_]of I(o,d,g)){let d=r+p*a,g=i+_*a;if(d-t<0||d+t>=s||g-n<0||g+n>=c||e.mipBlockOccupied(Math.floor(d/f),Math.floor(g/f))||o!==`circle`&&z(p,_,t,n,o,a))continue;let[v,y]=[d,g];if(!j(v,y,t,n,r,i,a,o).fits){let[e,s]=M(v,y,t,n,r,i,a,o,3);if(!j(e,s,t,n,r,i,a,o).fits)continue;v=e,y=s}let b=(v-r)/a,x=(y-i)/a,S=w(b,x,o),C=Math.max(t,n)/a,T=S>-C&&S<=C*1.5;if(!e.checkCollision(v,y,t,n)){let r=e.densityAt(v,y,Math.max(t,n)*1.5);if((m===null||r<m.score)&&(m={x:v,y,score:r,rotated:!1},h=u,r<.03))return m}if(T&&l){let l=A(b,x,o);for(let d of[l,l+Math.PI/2]){let l=Math.abs(Math.cos(d))<.3,[f,p]=l?[n,t]:[t,n];if(v-f>=0&&v+f<s&&y-p>=0&&y+p<c&&j(v,y,f,p,r,i,a,o).fits&&!e.checkCollision(v,y,f,p)){let t=e.densityAt(v,y,Math.max(f,p)*1.5);if((m===null||t<m.score)&&(m={x:v,y,score:t,rotated:l},h=u,t<.03))return m}}}if(l){let[l,d]=[n,t];if(v-l>=0&&v+l<s&&y-d>=0&&y+d<c&&j(v,y,l,d,r,i,a,o).fits&&!e.checkCollision(v,y,l,d)){let t=e.densityAt(v,y,Math.max(l,d)*1.5);if((m===null||t<m.score)&&(m={x:v,y,score:t,rotated:!0},h=u,t<.03))return m}}}if(m&&m.score<.08&&h<=u)return m}if(m)return m;let g=J(o);for(let[u,f]of g){let p=Y(e,t,n,r,i,a,o,s,c,l,r+u*a,i+f*a,d);if(p)return p}return null}function ce(e,t,n,r,i,a,o,s,c,l,u,d=0){return o===`circle`?Y(e,t,n,r,i,a,o,s,c,l,void 0,void 0,d):se(e,t,n,r,i,a,o,s,c,l,u,d)}function le(e,t,n,r,i,a,o,s,c,l,u){let d=a+t*s,f=o+n*s;return d-r<0||d+r>=l||f-i<0||f+i>=u||!j(d,f,r,i,a,o,s,c).fits||e.checkCollision(d,f,r,i)?null:{x:d,y:f,rotated:!1}}function ue(e,t){let n=t.estimateMaxFreeArea();return e<=n*.3?0:e<=n*.8?1:e<=n*1.5?2:3}function de(e,t={}){let n={...B,...t};if(e.length===0)return{words:[],placedCount:0,totalCount:0,fillRate:0};let{width:r,height:i,shape:a,minFontSize:o,maxFontSize:s,padding:c,gridScale:l,rotationSteps:u,fontFamily:d,fontWeight:f}=n,p=[...e].sort((e,t)=>t.weight-e.weight),m=Math.max(...p.map(e=>e.weight),1),h=r/2,g=i/2,_=Math.min(r,i)/2*.85,v=document.createElement(`canvas`).getContext(`2d`),b=()=>v,x=s*re(p,m,ne(a,_),o,s,c,d,String(f),a,b()),S=new y(r,i,l),C=[],w=u>=1,T=[];a!==`circle`&&(T=ie(a,_));for(let e=0;e<p.length;e++){let t=p[e],n=e/p.length,s=n>.85?.02:0,l=q(t.weight,m,o,x),u,v;b().font=`${f} ${l}px ${d}`,u=b().measureText(t.text).width+c*2,v=(K(t.text)?l:l*1.2)+c*2;let y=ue(u*v,S),E=null;if(a!==`circle`&&e<Math.ceil(p.length*.1)){let e=Math.max(u,v),t=null,n=-1;for(let r=0;r<T.length;r++){let i=T[r];i.used||e<=i.clearance*.9&&(!t||i.clearance<t.clearance)&&(t=i,n=r)}if(t){let e=u/2,s=v/2;for(let[c,d]of[[0,0],[.06,0],[-.06,0],[0,.06],[0,-.06]]){let f=le(S,t.nx+c,t.ny+d,e,s,h,g,_,a,r,i);if(f){let t=N(f.x,f.y,h,g,_,a,x,o,l,e,s),r=u,i=v;if(t<l){let e=t/l;r=u*e,i=v*e}E={x:f.x,y:f.y,fs:t,rotated:f.rotated,actualW:r,actualH:i},T[n].used=!0;break}}E||(T[n].used=!0)}}if(!E)for(let e=y;e<4;e++){if(e>y){let n=W[e];l=Math.max(o,q(t.weight,m,o,x)*n),b().font=`${f} ${l}px ${d}`,u=b().measureText(t.text).width+c*2,v=(K(t.text)?l:l*1.2)+c*2}let p=u/2,C=v/2,T=ce(S,p,C,h,g,_,a,r,i,w,n,s);if(T){let e=l,t=k((T.x-h)/_,(T.y-g)/_,a);t<1&&(e=Math.max(o,e*t));let n=N(T.x,T.y,h,g,_,a,x,o,e,p,C),r=u,i=v;if(n<l){let e=n/l;r=u*e,i=v*e}E={x:T.x,y:T.y,fs:n,rotated:T.rotated,actualW:r,actualH:i};break}}if(!E){let e=o;b().font=`${f} ${e}px ${d}`;let n=b().measureText(t.text).width+c*2,s=(K(t.text)?e:e*1.2)+c*2,l=J(a);for(let[t,o]of l){let c=Y(S,n/2,s/2,h,g,_,a,r,i,w,h+t*_,g+o*_,.04);if(c){E={x:c.x,y:c.y,fs:e,rotated:c.rotated,actualW:n,actualH:s};break}}if(!E){let t=Y(S,n/2,s/2,h,g,_,a,r,i,w,h,g,.06);t&&(E={x:t.x,y:t.y,fs:e,rotated:t.rotated,actualW:n,actualH:s})}}if(!E)continue;let D={id:t.id,text:t.text,x:E.x,y:E.y,fontSize:E.fs,width:E.actualW??u,height:E.actualH??v,rotated:E.rotated};C.push(D);let O=E.actualW??u,A=E.actualH??v;S.markOccupied(E.x,E.y,E.rotated?A/2:O/2,E.rotated?O/2:A/2)}let E=0;for(let e of C)E+=e.width*e.height;let D=r*i>0?E/(r*i):0;return{words:C,placedCount:C.length,totalCount:e.length,fillRate:D}}var fe=8,pe=3e4;function me(e,t={},n={}){let{timeout:r=pe}=n,i=ge();return new Promise((n,a)=>{let o=new Blob([i],{type:`application/javascript`}),s=URL.createObjectURL(o),c=new Worker(s,{type:`classic`}),l=setTimeout(()=>{c.terminate(),URL.revokeObjectURL(s),a(Error(`WordCloud worker timed out`))},r);c.onmessage=e=>{if(clearTimeout(l),c.terminate(),URL.revokeObjectURL(s),e.data.type===`SUCCESS`){let{buffer:t,texts:r,placedCount:i,totalCount:a,fillRate:o}=e.data;n({words:he(t,r),placedCount:i,totalCount:a,fillRate:o})}else e.data.type===`ERROR`?a(Error(e.data.error)):a(Error(`Unknown worker response`))},c.onerror=e=>{clearTimeout(l),c.terminate(),URL.revokeObjectURL(s),a(Error(e.message))},c.postMessage({type:`compute`,words:e,config:t})})}function he(e,t){let n=e.length/fe,r=[];for(let i=0;i<n;i++){let n=i*fe,a=e[n+7];r.push({id:e[n],x:e[n+1],y:e[n+2],fontSize:e[n+3],width:e[n+4],height:e[n+5],rotated:e[n+6]!==0,text:t[a]||``})}return r}function ge(){return`
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
/*  Inlined: shapes.ts v9 — analytic SDF, adaptive, push-to-edge      */
/*  v9: heart Y-flip, tangent field, feature anchors, curvature        */
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

function starAnalyticGradient(nx, ny) {
  var d = Math.sqrt(nx * nx + ny * ny)
  if (d < 0.001) return [-1, 0]
  var rawAngle = Math.atan2(ny, nx)
  var sector = Math.PI * 2 / 5
  var a = ((rawAngle % sector) + sector) % sector
  var hs = Math.PI / 5
  var dInnerR_da = a < hs ? 0.58 / hs : -0.58 / hs
  var gx = nx / d - dInnerR_da * (-ny / (d * d))
  var gy = ny / d - dInnerR_da * (nx / (d * d))
  var mag = Math.sqrt(gx * gx + gy * gy)
  if (mag < 1e-8) return [-nx / d, -ny / d]
  return [gx / mag, gy / mag]
}

function sdfGradient(nx, ny, shape) {
  if (shape === "heart") return heartAnalyticGradient(nx, ny)
  if (shape === "star") return starAnalyticGradient(nx, ny)
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

function walkIsocontour(shape, targetSdf, angleStep, minGradientMag) {
  if (angleStep === void 0) { angleStep = 0.06 }
  if (minGradientMag === void 0) { minGradientMag = 0.02 }
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
    for (var iter = 0; iter < 15; iter++) {
      var sdf = analyticSdf(nx, ny, shape), err = sdf - targetSdf
      if (Math.abs(err) < 0.001) break
      var g = sdfGradient(nx, ny, shape), mag2 = g[0] * g[0] + g[1] * g[1]
      if (mag2 < 1e-10) break
      var step = err / mag2
      nx -= g[0] * step; ny -= g[1] * step
      var d = Math.sqrt(nx * nx + ny * ny)
      if (d > 1.5) { nx *= 1.5 / d; ny *= 1.5 / d }
    }
    if (shape === "heart") {
      var g2 = sdfGradient(nx, ny, shape)
      if (g2[0] * g2[0] + g2[1] * g2[1] >= (minGradientMag * minGradientMag) && analyticSdf(nx, ny, shape) < 0.02) points.push([nx, ny])
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
    var wordSize = Math.max(halfW, halfH) / shapeRadius
    if (targetSdf > -0.06) return wordSize > 0.1 ? 0.06 : 0.03
    if (targetSdf > -0.2) return wordSize > 0.1 ? 0.08 : 0.04
    return wordSize > 0.15 ? 0.12 : 0.06
  }
  if (shape === "star" || shape === "cloud") {
    var wordSize = Math.max(halfW, halfH) / shapeRadius
    if (wordSize > 0.15) return 0.14
    if (wordSize > 0.08) return 0.10
    return 0.06
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

/* v8: Tangent field, curvature, boundary alignment */
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
  if (shape !== "heart") return 1.0
  var curvature = getSdfCurvature(nx, ny, shape)
  var sdf = analyticSdf(nx, ny, shape)
  if (curvature > 80 && sdf > -0.15) return 0.65
  if (curvature > 50 && sdf > -0.1) return 0.75
  if (curvature > 30 && sdf > -0.05) return 0.85
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

/* ================================================================== */
/*  v9: Global Area Budgeter — guarantee words fit in shape            */
/* ================================================================== */

function estimateShapeArea(shape, shapeRadius, sampleRes) {
  if (sampleRes === void 0) { sampleRes = 64 }
  var insideCount = 0
  for (var i = 0; i < sampleRes; i++) {
    for (var j = 0; j < sampleRes; j++) {
      var nx = (i / (sampleRes - 1)) * 2 - 1
      var ny = (j / (sampleRes - 1)) * 2 - 1
      if (isInShape(nx, ny, shape)) insideCount++
    }
  }
  var boundingArea = (2 * shapeRadius) * (2 * shapeRadius)
  var fillRatio = insideCount / (sampleRes * sampleRes)
  return boundingArea * fillRatio
}

function computeGlobalScale(sorted, maxWeight, shapeArea, minFontSize, maxFontSize, padding, fontFamily, fontWeight, shape) {
  var packingEfficiency = shape === "circle" ? 0.65 : 0.50
  var maxUsableArea = shapeArea * packingEfficiency
  var totalWordArea = 0
  for (var i = 0; i < sorted.length; i++) {
    var word = sorted[i]
    var fs = mapFontSize(word.weight, maxWeight, minFontSize, maxFontSize)
    var charW = fs * 0.6
    var w = word.text.length * charW + padding * 2
    var h = (isCJK(word.text) ? fs : fs * 1.2) + padding * 2
    totalWordArea += w * h
  }
  if (totalWordArea <= maxUsableArea) return 1.0
  var k = Math.sqrt(maxUsableArea / totalWordArea)
  return Math.max(0.3, k)
}

/* ================================================================== */
/*  v9: Size-Aware Anchor — match word size to anchor SDF clearance    */
/* ================================================================== */

function computeAnchorSlots(shape, shapeRadius) {
  var anchors = computeSkeletonAnchors(shape, 8)
  var slots = []
  for (var i = 0; i < anchors.length; i++) {
    var nx = anchors[i][0], ny = anchors[i][1]
    var sdf = analyticSdf(nx, ny, shape)
    var clearancePx = Math.abs(sdf) * shapeRadius * 2
    slots.push({ nx: nx, ny: ny, clearance: clearancePx, used: false })
  }
  slots.sort(function(a, b) { return b.clearance - a.clearance })
  return slots
}

/* ================================================================== */
/*  v9: Multi-Source Search Origins                                     */
/* ================================================================== */

function getSearchOrigins(shape) {
  switch (shape) {
    case "heart":
      return [[-0.25, -0.15], [0.25, -0.15], [0, 0.25]]
    case "star": {
      var origins = [[0, 0]]
      for (var i = 0; i < 5; i++) {
        var angle = (i / 5) * Math.PI * 2 - Math.PI / 2
        origins.push([Math.cos(angle) * 0.5, Math.sin(angle) * 0.5])
      }
      return origins
    }
    case "cloud":
      return [[0, 0], [-0.2, -0.1], [0.2, -0.1], [0, 0.15]]
    default:
      return [[0, 0]]
  }
}

function findPlacementSpiral(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation, originX, originY, overflowTolerance) {
  var ox = originX !== undefined ? originX : shapeCenterX
  var oy = originY !== undefined ? originY : shapeCenterY
  if (overflowTolerance === undefined) { overflowTolerance = 0 }
  var angle = Math.random() * Math.PI * 2, radius = 0
  var bestCandidate = null
  var jumpUnit = Math.sqrt(halfW * halfW + halfH * halfH) * 0.5
  var gridScale = grid.gridScale
  for (var iter = 0; iter < MAX_SPIRAL_ITERATIONS; iter++) {
    var tx = ox + radius * Math.cos(angle), ty = oy + radius * Math.sin(angle)
    if (tx - halfW < 0 || tx + halfW >= canvasW || ty - halfH < 0 || ty + halfH >= canvasH) {
      angle += SPIRAL_ANGLE_STEP; radius += SPIRAL_RADIUS_GROWTH * SPIRAL_ANGLE_STEP; continue
    }
    var nx = (tx - shapeCenterX) / shapeRadius, ny = (ty - shapeCenterY) / shapeRadius
    var sdf = analyticSdf(nx, ny, shape)
    // v9: overflow tolerance allows slight boundary violation
    if (sdf > 0.15 + overflowTolerance) {
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

var ISO_LEVELS_DEEP_FIRST = [-0.45, -0.55, -0.35, -0.25, -0.18, -0.12, -0.08, -0.05, -0.03, -0.02]
var ISO_LEVELS_BOUNDARY_FIRST = [-0.02, -0.03, -0.05, -0.08, -0.12, -0.18, -0.25, -0.35, -0.45, -0.55]

function findPlacementIsocontour(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation, wordRankPct, overflowTolerance) {
  if (overflowTolerance === undefined) { overflowTolerance = 0 }
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
      if (shape !== "circle" && wordTooLargeForRegion(nx, ny, halfW, halfH, shape, shapeRadius)) { iterResult = walker.next(); continue }
      var sx = tx, sy = ty
      var shapeResult = wordFitsInShapeAdaptive(sx, sy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape)
      if (!shapeResult.fits) {
        var pe = pushToEdge(sx, sy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, 3)
        sx = pe[0]; sy = pe[1]
        if (!wordFitsInShapeAdaptive(sx, sy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape).fits) { iterResult = walker.next(); continue }
      }
      // v8: Boundary tangent alignment in edge zone
      var nxs = (sx - shapeCenterX) / shapeRadius, nys = (sy - shapeCenterY) / shapeRadius
      var sdfAt = analyticSdf(nxs, nys, shape)
      var rMax = Math.max(halfW, halfH) / shapeRadius
      var inEdgeZone = sdfAt > -rMax && sdfAt <= rMax * 1.5
      if (!grid.checkCollision(sx, sy, halfW, halfH)) {
        var density = grid.densityAt(sx, sy, Math.max(halfW, halfH) * 1.5)
        if (!bestCandidate || density < bestCandidate.score) {
          bestCandidate = { x: sx, y: sy, score: density, rotated: false }
          bestLevel = li
          if (density < 0.03) return bestCandidate
        }
      }
      // v8: Tangent-aligned rotation in edge zone
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

  // v9: Multi-source spiral fallback — try from each search origin
  var origins = getSearchOrigins(shape)
  for (var oi = 0; oi < origins.length; oi++) {
    var result = findPlacementSpiral(
      grid, halfW, halfH,
      shapeCenterX, shapeCenterY, shapeRadius, shape,
      canvasW, canvasH, allowRotation,
      shapeCenterX + origins[oi][0] * shapeRadius,
      shapeCenterY + origins[oi][1] * shapeRadius,
      overflowTolerance
    )
    if (result) return result
  }

  return null
}

function tryPlaceAt(grid, nx, ny, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH) {
  var tx = shapeCenterX + nx * shapeRadius, ty = shapeCenterY + ny * shapeRadius
  if (tx - halfW < 0 || tx + halfW >= canvasW || ty - halfH < 0 || ty + halfH >= canvasH) return null
  if (!wordFitsInShapeAdaptive(tx, ty, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape).fits) return null
  if (grid.checkCollision(tx, ty, halfW, halfH)) return null
  return { x: tx, y: ty, rotated: false }
}

function findPlacement(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation, wordRankPct, overflowTolerance) {
  if (shape === "circle") {
    return findPlacementSpiral(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation, undefined, undefined, overflowTolerance)
  }
  return findPlacementIsocontour(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation, wordRankPct, overflowTolerance)
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
  var fontFamily = cfg.fontFamily, fontWeight = cfg.fontWeight

  var sorted = words.slice().sort(function(a, b) { return b.weight - a.weight })
  var maxWeight = Math.max.apply(null, sorted.map(function(w) { return w.weight }).concat([1]))

  var shapeCenterX = canvasW / 2, shapeCenterY = canvasH / 2
  var shapeRadius = (Math.min(canvasW, canvasH) / 2) * 0.85

  // ================================================================
  // v9: Global Area Budgeter — auto-scale if words exceed shape area
  // ================================================================
  var shapeArea = estimateShapeArea(shape, shapeRadius)
  var globalScale = computeGlobalScale(
    sorted, maxWeight, shapeArea,
    minFontSize, maxFontSize, padding, fontFamily, String(fontWeight), shape
  )
  var effectiveMaxFs = maxFontSize * globalScale

  // Binary occupancy grid
  var grid = new BinaryGrid(canvasW, canvasH, gridScale)
  var placed = [], allowRotation = rotationSteps >= 1

  // ================================================================
  // v9: Size-Aware Anchor Slots
  // ================================================================
  var anchorSlots = []
  if (shape !== "circle") {
    anchorSlots = computeAnchorSlots(shape, shapeRadius)
  }

  // ================================================================
  // Main placement loop
  // ================================================================
  for (var i = 0; i < sorted.length; i++) {
    var word = sorted[i]
    var wordRankPct = i / sorted.length
    // v9: tail words (last 15%) get overflow tolerance
    var overflowTolerance = wordRankPct > 0.85 ? 0.02 : 0

    var fontSize = mapFontSize(word.weight, maxWeight, minFontSize, effectiveMaxFs)

    // Measure text
    var w, h
    if (word.width !== undefined && word.height !== undefined) {
      w = word.width + padding * 2; h = word.height + padding * 2
    } else {
      w = word.text.length * fontSize * 0.6 + padding * 2
      h = (isCJK(word.text) ? fontSize : fontSize * 1.2) + padding * 2
    }

    var startLevel = getStartLevel(w * h, grid)
    var bestResult = null

    // ==============================================================
    // Phase 1: Size-Aware Anchor Placement
    // v9: match word size to anchor SDF clearance
    // ==============================================================
    if (shape !== "circle" && i < Math.ceil(sorted.length * 0.10)) {
      var wordMaxDim = Math.max(w, h)
      // Find best unused anchor that fits this word
      var bestSlot = null, bestSlotIdx = -1
      for (var si = 0; si < anchorSlots.length; si++) {
        var slot = anchorSlots[si]
        if (slot.used) continue
        // Word must fit within the anchor's clearance
        if (wordMaxDim <= slot.clearance * 0.9) {
          if (!bestSlot || slot.clearance < bestSlot.clearance) {
            // Pick the tightest-fitting anchor (smallest clearance that still fits)
            bestSlot = slot
            bestSlotIdx = si
          }
        }
      }

      if (bestSlot) {
        var halfW = w / 2, halfH = h / 2
        var offsets = [[0, 0], [0.06, 0], [-0.06, 0], [0, 0.06], [0, -0.06]]
        for (var oi = 0; oi < offsets.length; oi++) {
          var placement = tryPlaceAt(
            grid, bestSlot.nx + offsets[oi][0], bestSlot.ny + offsets[oi][1],
            halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape,
            canvasW, canvasH
          )
          if (placement) {
            var cappedFs = edgeCappedFontSize(placement.x, placement.y, shapeCenterX, shapeCenterY, shapeRadius, shape, effectiveMaxFs, minFontSize, fontSize, halfW, halfH)
            var actualW = w, actualH = h
            if (cappedFs < fontSize) { var r = cappedFs / fontSize; actualW = w * r; actualH = h * r }
            bestResult = { x: placement.x, y: placement.y, fs: cappedFs, rotated: placement.rotated, actualW: actualW, actualH: actualH }
            anchorSlots[bestSlotIdx].used = true
            break
          }
        }
        // If anchor failed, mark as used anyway to avoid retrying
        if (!bestResult) anchorSlots[bestSlotIdx].used = true
      }
    }

    // ==============================================================
    // Phase 2: Normal placement
    // ==============================================================
    if (!bestResult) {
      for (var level = startLevel; level < 4; level++) {
        if (level > startLevel) {
          fontSize = Math.max(minFontSize, mapFontSize(word.weight, maxWeight, minFontSize, effectiveMaxFs) * SIZE_RATIOS[level])
          if (word.width !== undefined && word.height !== undefined) {
            w = word.width * SIZE_RATIOS[level] + padding * 2
            h = word.height * SIZE_RATIOS[level] + padding * 2
          } else {
            w = word.text.length * fontSize * 0.6 + padding * 2
            h = (isCJK(word.text) ? fontSize : fontSize * 1.2) + padding * 2
          }
        }
        var placement = findPlacement(
          grid, w/2, h/2, shapeCenterX, shapeCenterY, shapeRadius, shape,
          canvasW, canvasH, allowRotation, wordRankPct, overflowTolerance
        )
        if (placement) {
          var finalFs = fontSize
          var npx = (placement.x - shapeCenterX) / shapeRadius
          var npy = (placement.y - shapeCenterY) / shapeRadius
          var curvSuppress = curvatureSizeSuppression(npx, npy, shape)
          if (curvSuppress < 1.0) finalFs = Math.max(minFontSize, finalFs * curvSuppress)

          var cappedFs = edgeCappedFontSize(placement.x, placement.y, shapeCenterX, shapeCenterY, shapeRadius, shape, effectiveMaxFs, minFontSize, finalFs, w/2, h/2)
          var actualW = w, actualH = h
          if (cappedFs < fontSize) { var r = cappedFs / fontSize; actualW = w * r; actualH = h * r }
          bestResult = { x: placement.x, y: placement.y, fs: cappedFs, rotated: placement.rotated, actualW: actualW, actualH: actualH }; break
        }
      }
    }

    // ==============================================================
    // v9 Phase 3: Guaranteed placement — shrink to minFontSize + overflow
    // ==============================================================
    if (!bestResult) {
      // Last resort: try at absolute minimum size with overflow tolerance
      var emergencyFs = minFontSize
      if (word.width !== undefined && word.height !== undefined) {
        w = word.width + padding * 2
        h = word.height + padding * 2
      } else {
        w = word.text.length * emergencyFs * 0.6 + padding * 2
        h = (isCJK(word.text) ? emergencyFs : emergencyFs * 1.2) + padding * 2
      }

      // Try multi-source spiral with maximum overflow tolerance
      var origins = getSearchOrigins(shape)
      for (var oi = 0; oi < origins.length; oi++) {
        var result = findPlacementSpiral(
          grid, w / 2, h / 2,
          shapeCenterX, shapeCenterY, shapeRadius, shape,
          canvasW, canvasH, allowRotation,
          shapeCenterX + origins[oi][0] * shapeRadius,
          shapeCenterY + origins[oi][1] * shapeRadius,
          0.04 // Allow 4px overflow in normalized coords
        )
        if (result) {
          bestResult = { x: result.x, y: result.y, fs: emergencyFs, rotated: result.rotated, actualW: w, actualH: h }
          break
        }
      }

      // Absolute last resort: center of shape
      if (!bestResult) {
        var result = findPlacementSpiral(
          grid, w / 2, h / 2,
          shapeCenterX, shapeCenterY, shapeRadius, shape,
          canvasW, canvasH, allowRotation,
          shapeCenterX, shapeCenterY,
          0.06 // Maximum overflow
        )
        if (result) {
          bestResult = { x: result.x, y: result.y, fs: emergencyFs, rotated: result.rotated, actualW: w, actualH: h }
        }
      }
    }

    if (!bestResult) continue

    var pw = {
      id: word.id, text: word.text,
      x: bestResult.x, y: bestResult.y,
      fontSize: bestResult.fs,
      width: bestResult.actualW !== undefined ? bestResult.actualW : w,
      height: bestResult.actualH !== undefined ? bestResult.actualH : h,
      rotated: bestResult.rotated
    }
    placed.push(pw)

    var gridW = bestResult.actualW !== undefined ? bestResult.actualW : w
    var gridH = bestResult.actualH !== undefined ? bestResult.actualH : h
    grid.markOccupied(bestResult.x, bestResult.y,
      bestResult.rotated ? gridH / 2 : gridW / 2,
      bestResult.rotated ? gridW / 2 : gridH / 2)
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
`}function _e(e,t={}){let n=performance.now(),r=de(e,t),i=performance.now()-n;return i>50&&console.debug(`[wordcloud] computeSync took ${i.toFixed(1)}ms for ${e.length} words`),r}function ve(e,t={}){return e.length>100?me(e,t):_e(e,t)}var X=p(),ye=`"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`,be=1e3,xe=2400,Se=.25,Ce=4,Z=.15;function Q(e,t,n){let r=t/100,i=n/100,a=r*Math.min(i,1-i),o=t=>{let n=(t+e/30)%12;return i-a*Math.max(-1,Math.min(n-3,9-n,1))},s=Math.max(0,Math.min(255,Math.round(o(0)*255))),c=Math.max(0,Math.min(255,Math.round(o(8)*255))),l=Math.max(0,Math.min(255,Math.round(o(4)*255)));return`#${s.toString(16).padStart(2,`0`)}${c.toString(16).padStart(2,`0`)}${l.toString(16).padStart(2,`0`)}`}function we(e,t,n){let r=document.createElement(`canvas`).getContext(`2d`);if(!r)return{inputs:[],colors:new Map,totalArea:0};let i=[...e].sort((e,t)=>t.articleCount-e.articleCount),a=new Map,o=0;return{inputs:i.map((e,i)=>{let s=e.articleCount/t,c=11+31*Math.sqrt(s);r.font=`bold ${c}px ${ye}`;let l=r.measureText(e.name),u=i*137.508%360,d=n?68:42;a.set(e.id,[u,70,d]);let f=l.width+6,p=c+6;return o+=f*p,{id:e.id,text:e.name,weight:e.articleCount,width:l.width,height:c}}),colors:a,totalArea:o}}function Te(e,t,n,r,i,a,o){let s=window.devicePixelRatio||1;e.width=t*s,e.height=n*s,e.style.width=t+`px`,e.style.height=n+`px`;let c=e.getContext(`2d`);if(c){c.scale(s,s),c.clearRect(0,0,t,n);for(let e=0;e<r.length;e++){let t=r[e],n=e===a,s=i.get(t.id);if(!s)continue;let[l,u,d]=s,f=n?Math.min(d+18,90):d;c.save(),c.font=`bold ${t.fontSize}px ${ye}`,c.textAlign=`center`,c.textBaseline=`middle`;let p=c.createLinearGradient(t.x-t.width/2,t.y-t.height/2,t.x-t.width/2,t.y+t.height/2);p.addColorStop(0,Q(l,u,Math.min(f+8,95))),p.addColorStop(.5,Q(l,u,f)),p.addColorStop(1,Q(l,u,Math.max(f-6,5))),c.fillStyle=p,c.shadowColor=o?`rgba(0,0,0,0.5)`:`rgba(0,0,0,0.18)`,c.shadowBlur=n?8:3,c.shadowOffsetX=1,c.shadowOffsetY=1,c.fillText(t.text,t.x,t.y),c.restore()}}}function Ee({tags:e,shape:t=`circle`,onShapeChange:r}){let o=(0,v.useRef)(null),s=(0,v.useRef)(null),l=c(),[u,d]=(0,v.useState)(1),[f,p]=(0,v.useState)(0),[m,h]=(0,v.useState)(0),[g,_]=(0,v.useState)(!1),y=(0,v.useRef)({x:0,y:0,px:0,py:0}),[b,x]=(0,v.useState)(null),[S,C]=(0,v.useState)({x:0,y:0}),[w,T]=(0,v.useState)(!1),[E,D]=(0,v.useState)(()=>window.matchMedia(`(prefers-color-scheme: dark)`).matches);(0,v.useEffect)(()=>{let e=window.matchMedia(`(prefers-color-scheme: dark)`),t=e=>D(e.matches);return e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]);let O=(0,v.useMemo)(()=>Math.max(...e.map(e=>e.articleCount),1),[e]),{inputs:k,colors:A,totalArea:j}=(0,v.useMemo)(()=>we(e,O,E),[e,O,E]),M=(0,v.useMemo)(()=>{let e=j/.6,t=Math.ceil(Math.sqrt(e)*1.15);return Math.max(be,Math.min(xe,t))},[j]),N=M,P=M,[F,I]=(0,v.useState)({w:800,h:500});(0,v.useEffect)(()=>{let e=o.current;if(!e)return;let t=()=>{let t=e.clientWidth;I({w:t,h:Math.min(t*.78,600)})};t();let n=new ResizeObserver(()=>t());return n.observe(e),()=>n.disconnect()},[]);let[L,R]=(0,v.useState)([]);(0,v.useEffect)(()=>{if(k.length===0||N===0){R([]);return}let e=!1,n=ve(k,{width:N,height:P,shape:t,minFontSize:11,maxFontSize:42,padding:3,gridScale:3});return n instanceof Promise?n.then(t=>{e||(R(t.words),z(t.words,N,P))}):(R(n.words),z(n.words,N,P)),()=>{e=!0}},[k,t,N,P]);let z=(0,v.useCallback)((e,t,n)=>{if(e.length===0)return;let r=o.current;if(!r)return;let i=1/0,a=1/0,s=-1/0,c=-1/0;for(let t of e)i=Math.min(i,t.x-t.width/2),a=Math.min(a,t.y-t.height/2),s=Math.max(s,t.x+t.width/2),c=Math.max(c,t.y+t.height/2);let l=s-i,u=c-a,f=(i+s)/2,m=(a+c)/2,g=r.clientWidth,_=Math.min(g*.78,600),v=(g-32)/l,y=(_-32)/u,b=Math.min(v,y,1.5);d(Math.max(.25,b)),p(g/(2*Math.max(.25,b))-f),h(_/(2*Math.max(.25,b))-m)},[]),B=(0,v.useCallback)(()=>{if(L.length===0){d(1),p(0),h(0);return}let e=o.current;if(!e)return;let t=1/0,n=1/0,r=-1/0,i=-1/0;for(let e of L)t=Math.min(t,e.x-e.width/2),n=Math.min(n,e.y-e.height/2),r=Math.max(r,e.x+e.width/2),i=Math.max(i,e.y+e.height/2);let a=r-t,s=i-n,c=(t+r)/2,l=(n+i)/2,u=e.clientWidth,f=Math.min(u*.78,600),m=(u-32)/a,g=(f-32)/s,_=Math.min(m,g,1.5);d(Math.max(.25,_)),p(u/(2*Math.max(.25,_))-c),h(f/(2*Math.max(.25,_))-l)},[L]),V=(0,v.useCallback)(()=>d(e=>Math.min(Ce,e+Z)),[]),H=(0,v.useCallback)(()=>d(e=>Math.max(Se,e-Z)),[]),U=(0,v.useCallback)(e=>{e.preventDefault();let t=o.current.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=-Math.sign(e.deltaY)*Z,a=Math.max(Se,Math.min(Ce,u+i)),s=a/u;p(e=>n-s*(n-e)),h(e=>r-s*(r-e)),d(a)},[u]),W=(0,v.useCallback)(e=>{e.button===0&&(_(!0),y.current={x:e.clientX,y:e.clientY,px:f,py:m})},[f,m]);(0,v.useEffect)(()=>{if(!g)return;let e=e=>{let t=(e.clientX-y.current.x)/u,n=(e.clientY-y.current.y)/u;p(y.current.px+t),h(y.current.py+n)},t=()=>_(!1);return window.addEventListener(`mousemove`,e),window.addEventListener(`mouseup`,t),()=>{window.removeEventListener(`mousemove`,e),window.removeEventListener(`mouseup`,t)}},[g,u]);let G=(0,v.useDeferredValue)(b),K=(0,v.useRef)(()=>{});(0,v.useEffect)(()=>{K.current=()=>{let e=s.current;e&&Te(e,N,P,L,A,G,E)}},[L,A,G,E,N,P]),(0,v.useEffect)(()=>{let e=requestAnimationFrame(()=>K.current());return()=>cancelAnimationFrame(e)},[L,G,E]);let q=(0,v.useCallback)((e,t)=>{let n=s.current;if(!n)return null;let r=n.getBoundingClientRect(),i=(e-r.left)/u,a=(t-r.top)/u;for(let e=L.length-1;e>=0;e--){let t=L[e];if(i>=t.x-t.width/2&&i<=t.x+t.width/2&&a>=t.y-t.height/2&&a<=t.y+t.height/2)return e}return null},[L,u,f,m]),ne=(0,v.useCallback)(e=>{let t=q(e.clientX,e.clientY);if(t!==b&&x(t),t!==null){let t=o.current.getBoundingClientRect();C({x:e.clientX-t.left,y:e.clientY-t.top}),T(!0)}else T(!1)},[q,b]),re=(0,v.useCallback)(()=>{x(null),T(!1)},[]),ie=(0,v.useCallback)(t=>{let n=Math.abs(t.clientX-y.current.x),r=Math.abs(t.clientY-y.current.y);if(n>3||r>3)return;let i=q(t.clientX,t.clientY);if(i!==null){let t=L[i],n=e.find(e=>e.id===t.id);n&&l(`/tags/${n.slug}`)}},[q,l,L,e]);if(e.length===0)return(0,X.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,X.jsx)(`span`,{className:`text-4xl text-muted-foreground/30 mb-4`,children:`🏷️`}),(0,X.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无标签`}),(0,X.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`标签正在整理中`})]});let J=b===null?null:L[b],Y=J?e.find(e=>e.id===J.id):null;return(0,X.jsxs)(`div`,{ref:o,className:`w-full`,children:[(0,X.jsxs)(`div`,{className:`flex items-center justify-between mb-4 flex-wrap gap-2`,children:[(0,X.jsx)(`div`,{className:`flex items-center gap-1.5`,children:te.map(e=>(0,X.jsx)(`button`,{type:`button`,onClick:()=>r?.(e),title:ee[e].label,className:[`inline-flex items-center justify-center w-9 h-9 rounded-lg text-lg transition-all duration-200 select-none`,e===t?`bg-primary text-primary-foreground shadow-sm scale-110`:`text-muted-foreground hover:text-foreground hover:bg-accent`].join(` `),children:ee[e].icon},e))}),(0,X.jsxs)(`div`,{className:`flex items-center gap-1`,children:[(0,X.jsx)(`button`,{type:`button`,onClick:H,title:`缩小`,className:`inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors`,children:(0,X.jsx)(i,{className:`h-4 w-4`})}),(0,X.jsxs)(`span`,{className:`text-xs text-muted-foreground font-mono w-12 text-center select-none`,children:[Math.round(u*100),`%`]}),(0,X.jsx)(`button`,{type:`button`,onClick:V,title:`放大`,className:`inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors`,children:(0,X.jsx)(n,{className:`h-4 w-4`})}),(0,X.jsx)(`button`,{type:`button`,onClick:B,title:`重置视图`,className:`inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ml-1`,children:(0,X.jsx)(a,{className:`h-3.5 w-3.5`})})]})]}),(0,X.jsxs)(`div`,{className:`relative overflow-hidden rounded-lg border border-border bg-background select-none`,style:{width:`100%`,height:F.h||500},onWheel:U,children:[(0,X.jsx)(`div`,{className:`absolute top-0 left-0 origin-top-left`,style:{transform:`translate(${f*u}px, ${m*u}px) scale(${u})`,width:N,height:P},children:(0,X.jsx)(`canvas`,{ref:s,className:`block cursor-grab active:cursor-grabbing`,style:{touchAction:`none`,width:N,height:P},onMouseMove:ne,onMouseLeave:re,onMouseDown:W,onClick:ie})}),w&&Y&&(0,X.jsxs)(`div`,{className:`absolute pointer-events-none px-2.5 py-1.5 rounded-md text-xs font-medium shadow-md border border-border bg-popover text-popover-foreground whitespace-nowrap transition-opacity duration-150 z-10`,style:{left:S.x+14,top:S.y-10,transform:`translateY(-100%)`},children:[Y.name,(0,X.jsxs)(`span`,{className:`ml-1.5 text-muted-foreground font-normal`,children:[`(`,Y.articleCount,` 篇)`]})]})]}),L.length<e.length&&(0,X.jsxs)(`p`,{className:`mt-2 text-center text-xs text-muted-foreground`,children:[`已显示 `,L.length,`/`,e.length,` 个标签 （部分标签因形状空间不足未显示）`]})]})}function $(e){let t=e.articleCount||0;if(e.children)for(let n of e.children)t+=$(n);return t}function De(e){return[...e].sort((e,t)=>{let n=$(e);return $(t)-n}).map(e=>({...e,children:e.children?De(e.children):void 0}))}var Oe=(0,v.memo)(function e({node:n,depth:r=0}){let[i,a]=(0,v.useState)(r<1),s=n.children&&n.children.length>0,c=(0,v.useMemo)(()=>$(n),[n]);return(0,X.jsxs)(`div`,{children:[(0,X.jsxs)(`div`,{className:`group flex items-center gap-2`,style:{paddingLeft:r*20},children:[s?(0,X.jsx)(`button`,{onClick:()=>a(!i),className:`flex-shrink-0 h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors`,children:i?(0,X.jsx)(t,{className:`h-4 w-4`}):(0,X.jsx)(u,{className:`h-4 w-4`})}):(0,X.jsx)(`span`,{className:`flex-shrink-0 w-6`}),(0,X.jsxs)(h,{to:`/categories/${n.slug}`,className:`flex-1 flex items-center justify-between rounded-lg px-3 py-2.5 transition-all hover:bg-accent group-hover:text-primary`,children:[(0,X.jsxs)(`div`,{className:`flex items-center gap-2 min-w-0`,children:[(0,X.jsx)(o,{className:`h-4 w-4 text-primary flex-shrink-0`}),(0,X.jsx)(`span`,{className:`font-medium text-foreground truncate`,children:n.name}),n.description&&(0,X.jsxs)(`span`,{className:`text-xs text-muted-foreground truncate hidden sm:inline`,children:[`— `,n.description]})]}),(0,X.jsxs)(`span`,{className:`flex-shrink-0 ml-2 font-mono text-xs text-muted-foreground`,children:[c,` 篇`]})]})]}),s&&i&&(0,X.jsx)(`div`,{className:`mt-0.5`,children:n.children.map(t=>(0,X.jsx)(e,{node:t,depth:r+1},t.id))})]})});function ke(){let[t,n]=(0,v.useState)(`categories`),[i,a]=(0,v.useState)(`circle`),{data:s,isLoading:c}=d(`/categories`,m,l),{data:u,isLoading:f}=d(`/tags`,m,l),{data:p,isLoading:y}=d(`/columns`,m,l),b=(Array.isArray(s)?s:s?.list)||[],x=(Array.isArray(u)?u:u?.list)||[],S=(Array.isArray(p)?p:p?.list)||[],C=(0,v.useMemo)(()=>De(b),[b]);return(0,X.jsxs)(`div`,{className:`space-y-8`,children:[(0,X.jsx)(g,{title:`发现`,description:`按分类、专栏或标签探索文章。`}),(0,X.jsxs)(`div`,{children:[(0,X.jsx)(`span`,{className:`font-mono text-xs font-semibold text-primary tracking-widest uppercase`,children:`探索内容`}),(0,X.jsx)(`h1`,{className:`mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl`,children:`发现`}),(0,X.jsx)(`p`,{className:`mt-4 max-w-2xl text-muted-foreground leading-relaxed`,children:`按分类、专栏或标签探索文章，找到你感兴趣的内容。`})]}),(0,X.jsxs)(`div`,{className:`flex items-center gap-2 flex-wrap`,children:[(0,X.jsxs)(`button`,{onClick:()=>n(`categories`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`categories`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,X.jsx)(o,{className:`h-4 w-4`}),` 分类`]}),(0,X.jsxs)(`button`,{onClick:()=>n(`columns`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`columns`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,X.jsx)(e,{className:`h-4 w-4`}),` 专栏`]}),(0,X.jsxs)(`button`,{onClick:()=>n(`tags`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`tags`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,X.jsx)(r,{className:`h-4 w-4`}),` 标签`]})]}),t===`categories`?c?(0,X.jsx)(`div`,{className:`space-y-3`,children:Array.from({length:6}).map((e,t)=>(0,X.jsx)(`div`,{className:`animate-pulse rounded-lg border border-border bg-card p-4`,children:(0,X.jsx)(`div`,{className:`h-5 w-32 rounded bg-muted`})},t))}):C.length===0?(0,X.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,X.jsx)(o,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,X.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无分类`}),(0,X.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`分类正在整理中`})]}):(0,X.jsx)(_,{className:`rounded-xl border border-border bg-card p-4 md:p-6`,children:C.map(e=>(0,X.jsx)(Oe,{node:e},e.id))}):t===`columns`?y?(0,X.jsx)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`,children:Array.from({length:4}).map((e,t)=>(0,X.jsx)(`div`,{className:`animate-pulse rounded-xl border border-border bg-card p-5`,children:(0,X.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,X.jsx)(`div`,{className:`h-10 w-10 shrink-0 rounded-lg bg-muted`}),(0,X.jsxs)(`div`,{className:`min-w-0 flex-1 space-y-2`,children:[(0,X.jsx)(`div`,{className:`h-5 w-24 rounded bg-muted`}),(0,X.jsx)(`div`,{className:`h-4 w-full rounded bg-muted`})]})]})},t))}):S.length===0?(0,X.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,X.jsx)(e,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,X.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无专栏`}),(0,X.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`专栏正在整理中`})]}):(0,X.jsx)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`,children:S.map(t=>(0,X.jsx)(h,{to:`/categories/${t.slug}`,className:`group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm`,children:(0,X.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,X.jsx)(`div`,{className:`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary`,children:(0,X.jsx)(e,{className:`h-5 w-5`})}),(0,X.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,X.jsx)(`h3`,{className:`font-semibold text-foreground group-hover:text-primary transition-colors`,children:t.name}),(0,X.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground leading-relaxed`,children:t.description})]})]})},t.id))}):f?(0,X.jsx)(`div`,{className:`flex flex-wrap gap-3`,children:Array.from({length:12}).map((e,t)=>(0,X.jsx)(`div`,{className:`animate-pulse rounded-lg bg-muted px-4 py-2`,children:(0,X.jsx)(`div`,{className:`h-4 w-16 rounded bg-muted-foreground/10`})},t))}):x.length===0?(0,X.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,X.jsx)(r,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,X.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无标签`}),(0,X.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`标签正在整理中`})]}):(0,X.jsx)(`div`,{className:`rounded-xl border border-border bg-card p-4 md:p-6`,children:(0,X.jsx)(Ee,{tags:x,shape:i,onShapeChange:a})})]})}export{ke as default};