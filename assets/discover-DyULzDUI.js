import{t as e}from"./book-open-DT839SU_.js";import{t}from"./chevron-down-BWy080ao.js";import{D as n,F as r,I as i,K as a,L as o,P as s,R as c,U as l,c as u,l as d,s as f}from"./index-CLeKNg2N.js";import{t as p}from"./head-seo-BNEWkIDk.js";import{t as m}from"./stagger-animation-ejEozRY_.js";var h=r(`hash`,[[`line`,{x1:`4`,x2:`20`,y1:`9`,y2:`9`,key:`4lhtct`}],[`line`,{x1:`4`,x2:`20`,y1:`15`,y2:`15`,key:`vyu0kd`}],[`line`,{x1:`10`,x2:`8`,y1:`3`,y2:`21`,key:`1ggp8o`}],[`line`,{x1:`16`,x2:`14`,y1:`3`,y2:`21`,key:`weycgp`}]]),g=a(l(),1),_=class{gridScale;gridWidth;gridHeight;canvasWidth;canvasHeight;data;stride;sat;satStride;totalOccupied=0;mipScale;mipData=null;mipWidth=0;mipHeight=0;mipStride=0;constructor(e,t,n=3,r=4){this.gridScale=n,this.canvasWidth=e,this.canvasHeight=t,this.mipScale=r,this.gridWidth=Math.ceil(e/n),this.gridHeight=Math.ceil(t/n),this.stride=Math.ceil(this.gridWidth/32),this.data=new Uint32Array(this.stride*this.gridHeight),this.satStride=this.gridWidth+1,this.sat=new Uint32Array(this.satStride*(this.gridHeight+1)),this.gridWidth>=r&&this.gridHeight>=r&&(this.mipWidth=Math.ceil(this.gridWidth/r),this.mipHeight=Math.ceil(this.gridHeight/r),this.mipStride=Math.ceil(this.mipWidth/32),this.mipData=new Uint32Array(this.mipStride*this.mipHeight))}clear(){this.data.fill(0),this.sat.fill(0),this.totalOccupied=0,this.mipData?.fill(0)}toGrid(e,t){return[Math.floor(e/this.gridScale),Math.floor(t/this.gridScale)]}markOccupied(e,t,n,r){let[i,a]=this.toGrid(e-n,t-r),[o,s]=this.toGrid(e+n,t+r),c=Math.max(0,i),l=Math.max(0,a),u=Math.min(this.gridWidth-1,o),d=Math.min(this.gridHeight-1,s);new Uint32Array(this.stride);for(let e=l;e<=d;e++){let t=e*this.stride,n=Math.floor(c/32),r=Math.floor(u/32);if(n===r)this.data[t+n]|=(1<<u-c+1)-1<<(c&31);else{this.data[t+n]|=~((1<<(c&31))-1);for(let e=n+1;e<r;e++)this.data[t+e]=4294967295;this.data[t+r]|=(1<<(u&31)+1)-1}}if(this.rebuildSat(l,d),this.mipData){let e=Math.floor(c/this.mipScale),t=Math.floor(u/this.mipScale),n=Math.floor(l/this.mipScale),r=Math.floor(d/this.mipScale);for(let i=n;i<=r;i++){let n=i*this.mipStride;for(let r=e;r<=t;r++){let e=n+Math.floor(r/32);this.mipData[e]|=1<<(r&31)}}}this.totalOccupied+=(u-c+1)*(d-l+1)}rebuildSat(e,t){let n=Math.max(0,e-1);for(let e=n;e<=t;e++){let t=e*this.stride,n=(e+1)*this.satStride,r=e*this.satStride,i=0;for(let e=0;e<this.gridWidth;e++){let a=this.data[t+Math.floor(e/32)]>>(e&31)&1;i+=a,this.sat[n+e+1]=this.sat[r+e+1]+i}}}satQuery(e,t,n,r){let i=Math.max(0,e),a=Math.max(0,t),o=Math.min(this.gridWidth-1,n),s=Math.min(this.gridHeight-1,r);if(i>o||a>s)return 0;let c=this.sat[a*this.satStride+i],l=this.sat[a*this.satStride+(o+1)],u=this.sat[(s+1)*this.satStride+i];return this.sat[(s+1)*this.satStride+(o+1)]-l-u+c}densityAt(e,t,n){let[r,i]=this.toGrid(e,t),a=Math.ceil(n/this.gridScale),o=r-a,s=i-a,c=r+a,l=i+a,u=this.satQuery(o,s,c,l),d=(Math.min(this.gridWidth-1,c)-Math.max(0,o)+1)*(Math.min(this.gridHeight-1,l)-Math.max(0,s)+1);return d>0?u/d:0}checkCollision(e,t,n,r){let[i,a]=this.toGrid(e-n,t-r),[o,s]=this.toGrid(e+n,t+r);if(i<0||o>=this.gridWidth||a<0||s>=this.gridHeight)return!0;let c=Math.floor(i/32),l=Math.floor(o/32);for(let e=a;e<=s;e++){let t=e*this.stride;if(c===l){let e=(1<<o-i+1)-1<<(i&31);if(this.data[t+c]&e)return!0}else{let e=~((1<<(i&31))-1);if(this.data[t+c]&e)return!0;for(let e=c+1;e<l;e++)if(this.data[t+e])return!0;let n=(1<<(o&31)+1)-1;if(this.data[t+l]&n)return!0}}return!1}mipBlockOccupied(e,t){if(!this.mipData)return!1;let n=Math.floor(e/this.mipScale),r=Math.floor(t/this.mipScale);if(n<0||n>=this.mipWidth||r<0||r>=this.mipHeight)return!0;let i=r*this.mipStride+Math.floor(n/32);return(this.mipData[i]&1<<(n&31))!=0}get freeCells(){return this.gridWidth*this.gridHeight-this.totalOccupied}get totalCells(){return this.gridWidth*this.gridHeight}estimateMaxFreeArea(){if(!this.mipData)return this.freeCells*this.gridScale*this.gridScale;let e=0;for(let t=0;t<this.mipData.length;t++)e+=32-v(this.mipData[t]);return e*this.mipScale*this.mipScale*this.gridScale*this.gridScale}};function v(e){return e-=e>>>1&1431655765,e=(e&858993459)+(e>>>2&858993459),e=e+(e>>>4)&252645135,e*16843009>>>24}var y={width:800,height:600,shape:`circle`,minFontSize:11,maxFontSize:42,padding:3,gridScale:3,rotationSteps:0,fontFamily:`sans-serif`,fontWeight:`bold`};function b(e,t,n){switch(n){case`circle`:return e*e+t*t<=1;case`heart`:{let n=e*1.2,r=(t+.22)*1.1,i=n*n+r*r-1;return i*i*i-n*n*r*r*r<=.04}case`star`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return!0;let r=(Math.atan2(t,e)%(2*Math.PI/5)+2*Math.PI/5)%(2*Math.PI/5),i=Math.PI/5;return n<=(r<i?.42+r/i*.58:1-.58*((r-i)/i))}case`diamond`:return Math.abs(e)+Math.abs(t)<=1;case`cloud`:for(let[n,r,i]of[[0,0,.48],[-.38,.12,.4],[.38,.12,.4],[-.22,-.28,.44],[.22,-.28,.44],[0,.32,.34]])if((e-n)**2+(t-r)**2<=i*i)return!0;return!1;case`hexagon`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return!0;let r=(Math.atan2(t,e)%(Math.PI/3)+Math.PI/3)%(Math.PI/3);return n<=Math.cos(Math.PI/6)/Math.cos(r-Math.PI/6)}}}var x=class{data;size;scale;constructor(e,t=128){this.size=t,this.scale=2/(t-1),this.data=new Int16Array(t*t);for(let n=0;n<t;n++){let r=-1+n*this.scale;for(let i=0;i<t;i++){let a=-1+i*this.scale,o=b(a,r,e),s=o?-999:999;for(let t=0;t<20;t++){let n=t/20*Math.PI*2;for(let t=1;t<=40;t++)if(b(a+Math.cos(n)*t*.005,r+Math.sin(n)*t*.005,e)!==o){let e=t*.005;s=o?Math.max(s,-e):Math.min(s,e);break}}this.data[n*t+i]=Math.round(s*1e4)}}}query(e,t){let n=(e+1)/this.scale,r=(t+1)/this.scale,i=Math.max(0,Math.min(this.size-2,Math.floor(n))),a=Math.max(0,Math.min(this.size-2,Math.floor(r))),o=i+1,s=a+1,c=n-i,l=r-a,u=this.data[a*this.size+i],d=this.data[a*this.size+o],f=this.data[s*this.size+i],p=this.data[s*this.size+o],m=u+(d-u)*c;return(m+(f+(p-f)*c-m)*l)/1e4}},S=new Map;function C(e){let t=S.get(e);return t||(t=new x(e),S.set(e,t)),t}function w(e,t,n){return C(n).query(e,t)<=0}function T(e,t,n){return C(n).query(e,t)}function E(e,t,n){let r=.002,i=T(e,t,n),a=T(e+r,t,n),o=T(e,t+r,n),s=(a-i)/r,c=(o-i)/r,l=Math.sqrt(s*s+c*c);return l<1e-6?[0,0]:[s/l,c/l]}function D(e,t,n,r,i,a,o,s){let c=(e-i)/o,l=(t-a)/o,u=Math.sqrt(n*n+r*r)/o;Math.min(n,r)/o;let d=T(c,l,s);if(d<-u)return!0;if(d>u)return!1;let f=[[e,t],[e-n,t-r],[e+n,t-r],[e-n,t+r],[e+n,t+r]],p=0;for(let[e,t]of f)w((e-i)/o,(t-a)/o,s)&&p++;return p>=3}function O(e,t,n,r,i,a,o=10){let s=e,c=t;for(let e=0;e<o;e++){let e=(s-n)/i,t=(c-r)/i;if(w(e,t,a))return[s,c];let[o,l]=E(e,t,a);s+=o*i*.15,c+=l*i*.15}return[s,c]}var k={circle:{icon:`●`,label:`圆形`},heart:{icon:`♥`,label:`心形`},star:{icon:`★`,label:`星形`},diamond:{icon:`◆`,label:`菱形`},cloud:{icon:`☁`,label:`云形`},hexagon:{icon:`⬡`,label:`六边形`}},A=[`circle`,`heart`,`star`,`diamond`,`cloud`,`hexagon`],j=.12,M=.4,ee=1500,N=/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/;function P(e){let t=0;for(let n of e)N.test(n)&&t++;return t>e.length*.5}function F(e,t,n,r){return t<=0?n:n+(r-n)*Math.sqrt(e/t)}function I(e,t,n,r,i,a,o,s,c,l){let u=Math.random()*Math.PI*2,d=0,f=null;for(let p=0;p<ee;p++){let p=r+d*Math.cos(u),m=i+d*Math.sin(u);if(p-t<0||p+t>=s||m-n<0||m+n>=c){u+=j,d+=M*j;continue}if(e.mipBlockOccupied(Math.floor(p/e.gridScale),Math.floor(m/e.gridScale))){d+=2*M*j,u+=j;continue}let[h,g]=[p,m];if(!D(h,g,t,n,r,i,a,o))if(w((h-r)/a,(g-i)/a,o)){if([h,g]=O(h,g,r,i,a,o,3),!D(h,g,t,n,r,i,a,o)){u+=j,d+=M*j;continue}}else{u+=j,d+=M*j;continue}if(!e.checkCollision(h,g,t,n)){let r=e.densityAt(h,g,Math.max(t,n)*1.5);if((f===null||r<f.score)&&(f={x:h,y:g,score:r,rotated:!1},r<.08))break}if(l){let[l,u]=[n,t];if(h-l>=0&&h+l<s&&g-u>=0&&g+u<c&&D(h,g,l,u,r,i,a,o)&&!e.checkCollision(h,g,l,u)){let t=e.densityAt(h,g,Math.max(l,u)*1.5);if((f===null||t<f.score)&&(f={x:h,y:g,score:t,rotated:!0},t<.08))break}}u+=j,d+=M*j}return f}function L(e,t,n){let r=t.estimateMaxFreeArea();return e<=r*.3?0:e<=r*.8?1:e<=r*1.5?2:3}var R=[1,.75,.5625,.421875];function z(e,t={}){let n={...y,...t};if(e.length===0)return{words:[],placedCount:0,totalCount:0,fillRate:0};let{width:r,height:i,shape:a,minFontSize:o,maxFontSize:s,padding:c,gridScale:l,rotationSteps:u,fontFamily:d,fontWeight:f}=n,p=[...e].sort((e,t)=>t.weight-e.weight),m=Math.max(...p.map(e=>e.weight),1),h=r/2,g=i/2,v=Math.min(r,i)/2*.85,b=new _(r,i,l),x=null,S=()=>(x||=document.createElement(`canvas`).getContext(`2d`),x),C=[],w=u>=1;for(let e=0;e<p.length;e++){let t=p[e],n=F(t.weight,m,o,s),u,_;if(t.width!==void 0&&t.height!==void 0)u=t.width+c*2,_=t.height+c*2;else{let e=S();if(!e)break;e.font=`${f} ${n}px ${d}`,u=e.measureText(t.text).width+c*2,_=(P(t.text)?n:n*1.2)+c*2}let y=L(u*_,b,l),x=null;for(let e=y;e<4;e++){if(e>y){let r=R[e];n=Math.max(o,F(t.weight,m,o,s)*r);let i=S();if(!i)break;i.font=`${f} ${n}px ${d}`,u=i.measureText(t.text).width+c*2,_=(P(t.text)?n:n*1.2)+c*2}let l=I(b,u/2,_/2,h,g,v,a,r,i,w);if(l){x={x:l.x,y:l.y,fs:n,rotated:l.rotated};break}}if(!x)continue;let T={id:t.id,text:t.text,x:x.x,y:x.y,fontSize:x.fs,width:u,height:_,rotated:x.rotated};C.push(T),b.markOccupied(x.x,x.y,x.rotated?_/2:u/2,x.rotated?u/2:_/2)}let T=0;for(let e of C)T+=e.width*e.height;let E=r*i>0?T/(r*i):0;return{words:C,placedCount:C.length,totalCount:e.length,fillRate:E}}var B=8,V=3e4;function H(e,t={},n={}){let{timeout:r=V}=n,i=W();return new Promise((n,a)=>{let o=new Blob([i],{type:`application/javascript`}),s=URL.createObjectURL(o),c=new Worker(s,{type:`classic`}),l=setTimeout(()=>{c.terminate(),URL.revokeObjectURL(s),a(Error(`WordCloud worker timed out`))},r);c.onmessage=e=>{if(clearTimeout(l),c.terminate(),URL.revokeObjectURL(s),e.data.type===`SUCCESS`){let{buffer:t,texts:r,placedCount:i,totalCount:a,fillRate:o}=e.data;n({words:U(t,r),placedCount:i,totalCount:a,fillRate:o})}else e.data.type===`ERROR`?a(Error(e.data.error)):a(Error(`Unknown worker response`))},c.onerror=e=>{clearTimeout(l),c.terminate(),URL.revokeObjectURL(s),a(Error(e.message))},c.postMessage({type:`compute`,words:e,config:t})})}function U(e,t){let n=e.length/B,r=[];for(let i=0;i<n;i++){let n=i*B,a=e[n+7];r.push({id:e[n],x:e[n+1],y:e[n+2],fontSize:e[n+3],width:e[n+4],height:e[n+5],rotated:e[n+6]!==0,text:t[a]||``})}return r}function W(){return`
/* ------------------------------------------------------------------ */
/*  @hus2/hus2wordcloud — Web Worker (inlined)                         */
/* ------------------------------------------------------------------ */

var SDF_LUT_SIZE = 128

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

function analyticIsInShape(nx, ny, shape) {
  switch (shape) {
    case "circle": return nx * nx + ny * ny <= 1
    case "heart": {
      var hx = nx * 1.2, hy = (ny + 0.22) * 1.1, v = hx * hx + hy * hy - 1
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

var SdfLut = (function() {
  function SdfLut(shape, size) {
    if (size === void 0) { size = SDF_LUT_SIZE; }
    this.size = size
    this.scale = 2 / (size - 1)
    this.data = new Int16Array(size * size)
    for (var iy = 0; iy < size; iy++) {
      var ny = -1 + iy * this.scale
      for (var ix = 0; ix < size; ix++) {
        var nx = -1 + ix * this.scale
        var inside = analyticIsInShape(nx, ny, shape)
        var minDist = inside ? -999 : 999
        for (var p = 0; p < 20; p++) {
          var angle = (p / 20) * Math.PI * 2
          for (var step = 1; step <= 40; step++) {
            var pnx = nx + Math.cos(angle) * step * 0.005
            var pny = ny + Math.sin(angle) * step * 0.005
            var pInside = analyticIsInShape(pnx, pny, shape)
            if (pInside !== inside) {
              var dist = step * 0.005
              if (inside) minDist = Math.max(minDist, -dist)
              else minDist = Math.min(minDist, dist)
              break
            }
          }
        }
        this.data[iy * size + ix] = Math.round(minDist * 10000)
      }
    }
  }
  SdfLut.prototype.query = function(nx, ny) {
    var fx = (nx + 1) / this.scale, fy = (ny + 1) / this.scale
    var ix0 = Math.max(0, Math.min(this.size - 2, Math.floor(fx)))
    var iy0 = Math.max(0, Math.min(this.size - 2, Math.floor(fy)))
    var ix1 = ix0 + 1, iy1 = iy0 + 1
    var tx = fx - ix0, ty = fy - iy0
    var v00 = this.data[iy0 * this.size + ix0], v10 = this.data[iy0 * this.size + ix1]
    var v01 = this.data[iy1 * this.size + ix0], v11 = this.data[iy1 * this.size + ix1]
    return ((v00 + (v10 - v00) * tx) + ((v01 + (v11 - v01) * tx) - (v00 + (v10 - v00) * tx)) * ty) / 10000
  }
  return SdfLut
})()

var lutCache = new Map()
function getLut(shape) {
  var lut = lutCache.get(shape)
  if (!lut) { lut = new SdfLut(shape); lutCache.set(shape, lut) }
  return lut
}
function isInShape(nx, ny, shape) { return getLut(shape).query(nx, ny) <= 0 }
function signedDistance(nx, ny, shape) { return getLut(shape).query(nx, ny) }
function sdfGradient(nx, ny, shape) {
  var eps = 0.002
  var d0 = signedDistance(nx, ny, shape)
  var gx = (signedDistance(nx + eps, ny, shape) - d0) / eps
  var gy = (signedDistance(nx, ny + eps, shape) - d0) / eps
  var mag = Math.sqrt(gx * gx + gy * gy)
  if (mag < 1e-6) return [0, 0]
  return [gx / mag, gy / mag]
}
function wordFitsInShape(cx, cy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape) {
  var nx = (cx - shapeCenterX) / shapeRadius, ny = (cy - shapeCenterY) / shapeRadius
  var Rmax = Math.sqrt(halfW * halfW + halfH * halfH) / shapeRadius
  var dist = signedDistance(nx, ny, shape)
  if (dist < -Rmax) return true
  if (dist > Rmax) return false
  var pts = [[cx,cy],[cx-halfW,cy-halfH],[cx+halfW,cy-halfH],[cx-halfW,cy+halfH],[cx+halfW,cy+halfH]]
  var inside = 0
  for (var i = 0; i < 5; i++) {
    if (isInShape((pts[i][0]-shapeCenterX)/shapeRadius, (pts[i][1]-shapeCenterY)/shapeRadius, shape)) inside++
  }
  return inside >= 3
}
function kickIntoShape(px, py, shapeCenterX, shapeCenterY, shapeRadius, shape, maxSteps) {
  if (maxSteps === void 0) { maxSteps = 10 }
  var x = px, y = py
  for (var i = 0; i < maxSteps; i++) {
    var nx = (x - shapeCenterX) / shapeRadius, ny = (y - shapeCenterY) / shapeRadius
    if (isInShape(nx, ny, shape)) return [x, y]
    var _a = sdfGradient(nx, ny, shape), gx = _a[0], gy = _a[1]
    x += gx * shapeRadius * 0.15; y += gy * shapeRadius * 0.15
  }
  return [x, y]
}

var CJK_REGEX = /[\\u4e00-\\u9fff\\u3040-\\u309f\\u30a0-\\u30ff\\uac00-\\ud7af]/
function isCJK(text) {
  var cjkCount = 0
  for (var i = 0; i < text.length; i++) { if (CJK_REGEX.test(text[i])) cjkCount++ }
  return cjkCount > text.length * 0.5
}

var SPIRAL_ANGLE_STEP = 0.12, SPIRAL_RADIUS_GROWTH = 0.4, MAX_SPIRAL_ITERATIONS = 1500
var SIZE_RATIOS = [1.0, 0.75, 0.5625, 0.421875]

function mapFontSize(weight, maxWeight, minFs, maxFs) {
  if (maxWeight <= 0) return minFs
  return minFs + (maxFs - minFs) * Math.sqrt(weight / maxWeight)
}

function findPlacement(grid, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation) {
  var angle = Math.random() * Math.PI * 2, radius = 0
  var bestCandidate = null
  for (var iter = 0; iter < MAX_SPIRAL_ITERATIONS; iter++) {
    var tx = shapeCenterX + radius * Math.cos(angle), ty = shapeCenterY + radius * Math.sin(angle)
    if (tx - halfW < 0 || tx + halfW >= canvasW || ty - halfH < 0 || ty + halfH >= canvasH) {
      angle += SPIRAL_ANGLE_STEP; radius += SPIRAL_RADIUS_GROWTH * SPIRAL_ANGLE_STEP; continue
    }
    if (grid.mipBlockOccupied(Math.floor(tx / grid.gridScale), Math.floor(ty / grid.gridScale))) {
      radius += 2 * SPIRAL_RADIUS_GROWTH * SPIRAL_ANGLE_STEP; angle += SPIRAL_ANGLE_STEP; continue
    }
    var sx = tx, sy = ty
    if (!wordFitsInShape(sx, sy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape)) {
      var nx = (sx - shapeCenterX) / shapeRadius, ny = (sy - shapeCenterY) / shapeRadius
      if (isInShape(nx, ny, shape)) {
        var ks = kickIntoShape(sx, sy, shapeCenterX, shapeCenterY, shapeRadius, shape, 3)
        sx = ks[0]; sy = ks[1]
        if (!wordFitsInShape(sx, sy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape)) {
          angle += SPIRAL_ANGLE_STEP; radius += SPIRAL_RADIUS_GROWTH * SPIRAL_ANGLE_STEP; continue
        }
      } else { angle += SPIRAL_ANGLE_STEP; radius += SPIRAL_RADIUS_GROWTH * SPIRAL_ANGLE_STEP; continue }
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
          wordFitsInShape(sx, sy, rw, rh, shapeCenterX, shapeCenterY, shapeRadius, shape) &&
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

function getStartLevel(wordArea, grid, gridScale) {
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

    var startLevel = getStartLevel(w * h, grid, gridScale)
    var bestResult = null

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
      var placement = findPlacement(grid, w/2, h/2, shapeCenterX, shapeCenterY, shapeRadius, shape, canvasW, canvasH, allowRotation)
      if (placement) { bestResult = { x: placement.x, y: placement.y, fs: fontSize, rotated: placement.rotated }; break }
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
`}function G(e,t={}){let n=performance.now(),r=z(e,t),i=performance.now()-n;return i>50&&console.debug(`[wordcloud] computeSync took ${i.toFixed(1)}ms for ${e.length} words`),r}function K(e,t={}){return e.length>100?H(e,t):G(e,t)}var q=i(),J=`"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`;function Y(e,t,n){let r=t/100,i=n/100,a=r*Math.min(i,1-i),o=t=>{let n=(t+e/30)%12;return i-a*Math.max(-1,Math.min(n-3,9-n,1))},s=Math.max(0,Math.min(255,Math.round(o(0)*255))),c=Math.max(0,Math.min(255,Math.round(o(8)*255))),l=Math.max(0,Math.min(255,Math.round(o(4)*255)));return`#${s.toString(16).padStart(2,`0`)}${c.toString(16).padStart(2,`0`)}${l.toString(16).padStart(2,`0`)}`}function X(e,t,n){let r=document.createElement(`canvas`).getContext(`2d`);if(!r)return{inputs:[],colors:new Map};let i=[...e].sort((e,t)=>t.articleCount-e.articleCount),a=new Map;return{inputs:i.map((e,i)=>{let o=e.articleCount/t,s=11+31*Math.sqrt(o);r.font=`bold ${s}px ${J}`;let c=r.measureText(e.name),l=i*137.508%360,u=n?68:42;return a.set(e.id,[l,70,u]),{id:e.id,text:e.name,weight:e.articleCount,width:c.width,height:s}}),colors:a}}function Z(e,t,n,r,i){let a=window.devicePixelRatio||1,o=e.getBoundingClientRect(),s=o.width,c=o.height;if(s===0||c===0)return;e.width=s*a,e.height=c*a,e.style.width=s+`px`,e.style.height=c+`px`;let l=e.getContext(`2d`);if(l){l.scale(a,a),l.clearRect(0,0,s,c);for(let e=0;e<t.length;e++){let a=t[e],o=e===r,s=n.get(a.id);if(!s)continue;let[c,u,d]=s,f=o?Math.min(d+18,90):d;l.save(),l.font=`bold ${a.fontSize}px ${J}`,l.textAlign=`center`,l.textBaseline=`middle`;let p=l.createLinearGradient(a.x-a.width/2,a.y-a.height/2,a.x-a.width/2,a.y+a.height/2);p.addColorStop(0,Y(c,u,Math.min(f+8,95))),p.addColorStop(.5,Y(c,u,f)),p.addColorStop(1,Y(c,u,Math.max(f-6,5))),l.fillStyle=p,l.shadowColor=i?`rgba(0,0,0,0.5)`:`rgba(0,0,0,0.18)`,l.shadowBlur=o?8:3,l.shadowOffsetX=1,l.shadowOffsetY=1,l.fillText(a.text,a.x,a.y),l.restore()}}}function te({tags:e,shape:t=`circle`,onShapeChange:n}){let r=(0,g.useRef)(null),i=(0,g.useRef)(null),a=c(),[o,s]=(0,g.useState)({w:0,h:0}),[l,u]=(0,g.useState)(null),[d,f]=(0,g.useState)({x:0,y:0}),[p,m]=(0,g.useState)(!1),[h,_]=(0,g.useState)(()=>window.matchMedia(`(prefers-color-scheme: dark)`).matches);(0,g.useEffect)(()=>{let e=window.matchMedia(`(prefers-color-scheme: dark)`),t=e=>_(e.matches);return e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]),(0,g.useEffect)(()=>{let e=r.current;if(!e)return;let t=()=>{let t=e.clientWidth;s({w:t,h:Math.min(t*.78,580)})};t();let n=new ResizeObserver(()=>t());return n.observe(e),()=>n.disconnect()},[]);let v=(0,g.useMemo)(()=>Math.max(...e.map(e=>e.articleCount),1),[e]),{inputs:y,colors:b}=(0,g.useMemo)(()=>X(e,v,h),[e,v,h]),[x,S]=(0,g.useState)([]);(0,g.useEffect)(()=>{if(y.length===0||o.w===0){S([]);return}let e=!1,n=K(y,{width:o.w,height:o.h,shape:t,minFontSize:11,maxFontSize:42,padding:3,gridScale:3});return n instanceof Promise?n.then(t=>{e||S(t.words)}):S(n.words),()=>{e=!0}},[y,t,o.w,o.h]);let C=(0,g.useDeferredValue)(l),w=(0,g.useRef)(()=>{});(0,g.useEffect)(()=>{w.current=()=>{let e=i.current;e&&Z(e,x,b,C,h)}},[x,b,C,h]),(0,g.useEffect)(()=>{let e=requestAnimationFrame(()=>w.current());return()=>cancelAnimationFrame(e)},[x,C,h]);let T=(0,g.useCallback)((e,t)=>{let n=i.current;if(!n)return null;let r=n.getBoundingClientRect(),a=e-r.left,o=t-r.top;for(let e=x.length-1;e>=0;e--){let t=x[e];if(a>=t.x-t.width/2&&a<=t.x+t.width/2&&o>=t.y-t.height/2&&o<=t.y+t.height/2)return e}return null},[x]),E=(0,g.useCallback)(e=>{let t=T(e.clientX,e.clientY);if(t!==l&&u(t),t!==null){let t=i.current.getBoundingClientRect();f({x:e.clientX-t.left,y:e.clientY-t.top}),m(!0)}else m(!1)},[T,l]),D=(0,g.useCallback)(()=>{u(null),m(!1)},[]),O=(0,g.useCallback)(t=>{let n=T(t.clientX,t.clientY);if(n!==null){let t=x[n],r=e.find(e=>e.id===t.id);r&&a(`/tags/${r.slug}`)}},[T,a,x,e]);if(e.length===0)return(0,q.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,q.jsx)(`span`,{className:`text-4xl text-muted-foreground/30 mb-4`,children:`🏷️`}),(0,q.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无标签`}),(0,q.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`标签正在整理中`})]});let j=l===null?null:x[l],M=j?e.find(e=>e.id===j.id):null;return(0,q.jsxs)(`div`,{ref:r,className:`w-full`,children:[(0,q.jsx)(`div`,{className:`flex items-center justify-center gap-1.5 mb-4 flex-wrap`,children:A.map(e=>(0,q.jsx)(`button`,{type:`button`,onClick:()=>n?.(e),title:k[e].label,className:[`inline-flex items-center justify-center w-9 h-9 rounded-lg text-lg transition-all duration-200 select-none`,e===t?`bg-primary text-primary-foreground shadow-sm scale-110`:`text-muted-foreground hover:text-foreground hover:bg-accent`].join(` `),children:k[e].icon},e))}),(0,q.jsxs)(`div`,{className:`relative`,style:{width:`100%`,height:o.h||400},children:[(0,q.jsx)(`canvas`,{ref:i,className:`w-full h-full cursor-pointer block`,style:{touchAction:`none`},onMouseMove:E,onMouseLeave:D,onClick:O}),p&&M&&(0,q.jsxs)(`div`,{className:`absolute pointer-events-none px-2.5 py-1.5 rounded-md text-xs font-medium shadow-md border border-border bg-popover text-popover-foreground whitespace-nowrap transition-opacity duration-150 z-10`,style:{left:d.x+14,top:d.y-10,transform:`translateY(-100%)`},children:[M.name,(0,q.jsxs)(`span`,{className:`ml-1.5 text-muted-foreground font-normal`,children:[`(`,M.articleCount,` 篇)`]})]})]}),x.length<e.length&&(0,q.jsxs)(`p`,{className:`mt-2 text-center text-xs text-muted-foreground`,children:[`已显示 `,x.length,`/`,e.length,` 个标签 （部分标签因形状空间不足未显示）`]})]})}function Q(e){let t=e.articleCount||0;if(e.children)for(let n of e.children)t+=Q(n);return t}function $(e){return[...e].sort((e,t)=>{let n=Q(e);return Q(t)-n}).map(e=>({...e,children:e.children?$(e.children):void 0}))}var ne=(0,g.memo)(function e({node:r,depth:i=0}){let[a,c]=(0,g.useState)(i<1),l=r.children&&r.children.length>0,u=(0,g.useMemo)(()=>Q(r),[r]);return(0,q.jsxs)(`div`,{children:[(0,q.jsxs)(`div`,{className:`group flex items-center gap-2`,style:{paddingLeft:i*20},children:[l?(0,q.jsx)(`button`,{onClick:()=>c(!a),className:`flex-shrink-0 h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors`,children:a?(0,q.jsx)(t,{className:`h-4 w-4`}):(0,q.jsx)(s,{className:`h-4 w-4`})}):(0,q.jsx)(`span`,{className:`flex-shrink-0 w-6`}),(0,q.jsxs)(o,{to:`/categories/${r.slug}`,className:`flex-1 flex items-center justify-between rounded-lg px-3 py-2.5 transition-all hover:bg-accent group-hover:text-primary`,children:[(0,q.jsxs)(`div`,{className:`flex items-center gap-2 min-w-0`,children:[(0,q.jsx)(n,{className:`h-4 w-4 text-primary flex-shrink-0`}),(0,q.jsx)(`span`,{className:`font-medium text-foreground truncate`,children:r.name}),r.description&&(0,q.jsxs)(`span`,{className:`text-xs text-muted-foreground truncate hidden sm:inline`,children:[`— `,r.description]})]}),(0,q.jsxs)(`span`,{className:`flex-shrink-0 ml-2 font-mono text-xs text-muted-foreground`,children:[u,` 篇`]})]})]}),l&&a&&(0,q.jsx)(`div`,{className:`mt-0.5`,children:r.children.map(t=>(0,q.jsx)(e,{node:t,depth:i+1},t.id))})]})});function re(){let[t,r]=(0,g.useState)(`categories`),[i,a]=(0,g.useState)(`circle`),{data:s,isLoading:c}=d(`/categories`,u,f),{data:l,isLoading:_}=d(`/tags`,u,f),{data:v,isLoading:y}=d(`/columns`,u,f),b=(Array.isArray(s)?s:s?.list)||[],x=(Array.isArray(l)?l:l?.list)||[],S=(Array.isArray(v)?v:v?.list)||[],C=(0,g.useMemo)(()=>$(b),[b]);return(0,q.jsxs)(`div`,{className:`space-y-8`,children:[(0,q.jsx)(p,{title:`发现`,description:`按分类、专栏或标签探索文章。`}),(0,q.jsxs)(`div`,{children:[(0,q.jsx)(`span`,{className:`font-mono text-xs font-semibold text-primary tracking-widest uppercase`,children:`探索内容`}),(0,q.jsx)(`h1`,{className:`mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl`,children:`发现`}),(0,q.jsx)(`p`,{className:`mt-4 max-w-2xl text-muted-foreground leading-relaxed`,children:`按分类、专栏或标签探索文章，找到你感兴趣的内容。`})]}),(0,q.jsxs)(`div`,{className:`flex items-center gap-2 flex-wrap`,children:[(0,q.jsxs)(`button`,{onClick:()=>r(`categories`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`categories`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,q.jsx)(n,{className:`h-4 w-4`}),` 分类`]}),(0,q.jsxs)(`button`,{onClick:()=>r(`columns`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`columns`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,q.jsx)(e,{className:`h-4 w-4`}),` 专栏`]}),(0,q.jsxs)(`button`,{onClick:()=>r(`tags`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`tags`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,q.jsx)(h,{className:`h-4 w-4`}),` 标签`]})]}),t===`categories`?c?(0,q.jsx)(`div`,{className:`space-y-3`,children:Array.from({length:6}).map((e,t)=>(0,q.jsx)(`div`,{className:`animate-pulse rounded-lg border border-border bg-card p-4`,children:(0,q.jsx)(`div`,{className:`h-5 w-32 rounded bg-muted`})},t))}):C.length===0?(0,q.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,q.jsx)(n,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,q.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无分类`}),(0,q.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`分类正在整理中`})]}):(0,q.jsx)(m,{className:`rounded-xl border border-border bg-card p-4 md:p-6`,children:C.map(e=>(0,q.jsx)(ne,{node:e},e.id))}):t===`columns`?y?(0,q.jsx)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`,children:Array.from({length:4}).map((e,t)=>(0,q.jsx)(`div`,{className:`animate-pulse rounded-xl border border-border bg-card p-5`,children:(0,q.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,q.jsx)(`div`,{className:`h-10 w-10 shrink-0 rounded-lg bg-muted`}),(0,q.jsxs)(`div`,{className:`min-w-0 flex-1 space-y-2`,children:[(0,q.jsx)(`div`,{className:`h-5 w-24 rounded bg-muted`}),(0,q.jsx)(`div`,{className:`h-4 w-full rounded bg-muted`})]})]})},t))}):S.length===0?(0,q.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,q.jsx)(e,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,q.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无专栏`}),(0,q.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`专栏正在整理中`})]}):(0,q.jsx)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`,children:S.map(t=>(0,q.jsx)(o,{to:`/categories/${t.slug}`,className:`group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm`,children:(0,q.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,q.jsx)(`div`,{className:`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary`,children:(0,q.jsx)(e,{className:`h-5 w-5`})}),(0,q.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,q.jsx)(`h3`,{className:`font-semibold text-foreground group-hover:text-primary transition-colors`,children:t.name}),(0,q.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground leading-relaxed`,children:t.description})]})]})},t.id))}):_?(0,q.jsx)(`div`,{className:`flex flex-wrap gap-3`,children:Array.from({length:12}).map((e,t)=>(0,q.jsx)(`div`,{className:`animate-pulse rounded-lg bg-muted px-4 py-2`,children:(0,q.jsx)(`div`,{className:`h-4 w-16 rounded bg-muted-foreground/10`})},t))}):x.length===0?(0,q.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,q.jsx)(h,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,q.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无标签`}),(0,q.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`标签正在整理中`})]}):(0,q.jsx)(`div`,{className:`rounded-xl border border-border bg-card p-4 md:p-6`,children:(0,q.jsx)(te,{tags:x,shape:i,onShapeChange:a})})]})}export{re as default};