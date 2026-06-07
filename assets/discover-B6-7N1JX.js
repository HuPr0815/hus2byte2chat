import{t as e}from"./book-open-BkPQRABt.js";import{t}from"./chevron-down-plwWVWDw.js";import{t as n}from"./rotate-ccw-DLkaC1Mi.js";import{n as r,t as i}from"./zoom-out-CfM5EFvl.js";import{D as a,F as o,I as s,K as c,L as l,P as u,R as d,U as f,c as p,l as m,s as h}from"./index-1ZQ3uITP.js";import{t as g}from"./head-seo-DadFUQit.js";import{t as _}from"./stagger-animation-CZsBgAp1.js";var v=o(`hash`,[[`line`,{x1:`4`,x2:`20`,y1:`9`,y2:`9`,key:`4lhtct`}],[`line`,{x1:`4`,x2:`20`,y1:`15`,y2:`15`,key:`vyu0kd`}],[`line`,{x1:`10`,x2:`8`,y1:`3`,y2:`21`,key:`1ggp8o`}],[`line`,{x1:`16`,x2:`14`,y1:`3`,y2:`21`,key:`weycgp`}]]),y=c(f(),1),b=class{gridScale;gridWidth;gridHeight;canvasWidth;canvasHeight;data;stride;sat;satStride;totalOccupied=0;mipScale;mipData=null;mipWidth=0;mipHeight=0;mipStride=0;constructor(e,t,n=3,r=4){this.gridScale=n,this.canvasWidth=e,this.canvasHeight=t,this.mipScale=r,this.gridWidth=Math.ceil(e/n),this.gridHeight=Math.ceil(t/n),this.stride=Math.ceil(this.gridWidth/32),this.data=new Uint32Array(this.stride*this.gridHeight),this.satStride=this.gridWidth+1,this.sat=new Uint32Array(this.satStride*(this.gridHeight+1)),this.gridWidth>=r&&this.gridHeight>=r&&(this.mipWidth=Math.ceil(this.gridWidth/r),this.mipHeight=Math.ceil(this.gridHeight/r),this.mipStride=Math.ceil(this.mipWidth/32),this.mipData=new Uint32Array(this.mipStride*this.mipHeight))}clear(){this.data.fill(0),this.sat.fill(0),this.totalOccupied=0,this.mipData?.fill(0)}toGrid(e,t){return[Math.floor(e/this.gridScale),Math.floor(t/this.gridScale)]}markOccupied(e,t,n,r){let[i,a]=this.toGrid(e-n,t-r),[o,s]=this.toGrid(e+n,t+r),c=Math.max(0,i),l=Math.max(0,a),u=Math.min(this.gridWidth-1,o),d=Math.min(this.gridHeight-1,s);new Uint32Array(this.stride);for(let e=l;e<=d;e++){let t=e*this.stride,n=Math.floor(c/32),r=Math.floor(u/32);if(n===r)this.data[t+n]|=(1<<u-c+1)-1<<(c&31);else{this.data[t+n]|=~((1<<(c&31))-1);for(let e=n+1;e<r;e++)this.data[t+e]=4294967295;this.data[t+r]|=(1<<(u&31)+1)-1}}if(this.rebuildSat(l,d),this.mipData){let e=Math.floor(c/this.mipScale),t=Math.floor(u/this.mipScale),n=Math.floor(l/this.mipScale),r=Math.floor(d/this.mipScale);for(let i=n;i<=r;i++){let n=i*this.mipStride;for(let r=e;r<=t;r++){let e=n+Math.floor(r/32);this.mipData[e]|=1<<(r&31)}}}this.totalOccupied+=(u-c+1)*(d-l+1)}rebuildSat(e,t){let n=Math.max(0,e-1);for(let e=n;e<=t;e++){let t=e*this.stride,n=(e+1)*this.satStride,r=e*this.satStride,i=0;for(let e=0;e<this.gridWidth;e++){let a=this.data[t+Math.floor(e/32)]>>(e&31)&1;i+=a,this.sat[n+e+1]=this.sat[r+e+1]+i}}}satQuery(e,t,n,r){let i=Math.max(0,e),a=Math.max(0,t),o=Math.min(this.gridWidth-1,n),s=Math.min(this.gridHeight-1,r);if(i>o||a>s)return 0;let c=this.sat[a*this.satStride+i],l=this.sat[a*this.satStride+(o+1)],u=this.sat[(s+1)*this.satStride+i];return this.sat[(s+1)*this.satStride+(o+1)]-l-u+c}densityAt(e,t,n){let[r,i]=this.toGrid(e,t),a=Math.ceil(n/this.gridScale),o=r-a,s=i-a,c=r+a,l=i+a,u=this.satQuery(o,s,c,l),d=(Math.min(this.gridWidth-1,c)-Math.max(0,o)+1)*(Math.min(this.gridHeight-1,l)-Math.max(0,s)+1);return d>0?u/d:0}checkCollision(e,t,n,r){let[i,a]=this.toGrid(e-n,t-r),[o,s]=this.toGrid(e+n,t+r);if(i<0||o>=this.gridWidth||a<0||s>=this.gridHeight)return!0;let c=Math.floor(i/32),l=Math.floor(o/32);for(let e=a;e<=s;e++){let t=e*this.stride;if(c===l){let e=(1<<o-i+1)-1<<(i&31);if(this.data[t+c]&e)return!0}else{let e=~((1<<(i&31))-1);if(this.data[t+c]&e)return!0;for(let e=c+1;e<l;e++)if(this.data[t+e])return!0;let n=(1<<(o&31)+1)-1;if(this.data[t+l]&n)return!0}}return!1}mipBlockOccupied(e,t){if(!this.mipData)return!1;let n=Math.floor(e/this.mipScale),r=Math.floor(t/this.mipScale);if(n<0||n>=this.mipWidth||r<0||r>=this.mipHeight)return!0;let i=r*this.mipStride+Math.floor(n/32);return(this.mipData[i]&1<<(n&31))!=0}get freeCells(){return this.gridWidth*this.gridHeight-this.totalOccupied}get totalCells(){return this.gridWidth*this.gridHeight}estimateMaxFreeArea(){if(!this.mipData)return this.freeCells*this.gridScale*this.gridScale;let e=0;for(let t=0;t<this.mipData.length;t++)e+=32-x(this.mipData[t]);return e*this.mipScale*this.mipScale*this.gridScale*this.gridScale}};function x(e){return e-=e>>>1&1431655765,e=(e&858993459)+(e>>>2&858993459),e=e+(e>>>4)&252645135,e*16843009>>>24}function S(e,t,n){switch(n){case`circle`:return e*e+t*t<=1;case`heart`:{let n=e*1.2,r=(t+.22)*1.1,i=n*n+r*r-1;return i*i*i-n*n*r*r*r<=.04}case`star`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return!0;let r=(Math.atan2(t,e)%(2*Math.PI/5)+2*Math.PI/5)%(2*Math.PI/5),i=Math.PI/5;return n<=(r<i?.42+r/i*.58:1-.58*((r-i)/i))}case`diamond`:return Math.abs(e)+Math.abs(t)<=1;case`cloud`:for(let[n,r,i]of[[0,0,.48],[-.38,.12,.4],[.38,.12,.4],[-.22,-.28,.44],[.22,-.28,.44],[0,.32,.34]])if((e-n)**2+(t-r)**2<=i*i)return!0;return!1;case`hexagon`:{let n=Math.sqrt(e*e+t*t);if(n<.001)return!0;let r=(Math.atan2(t,e)%(Math.PI/3)+Math.PI/3)%(Math.PI/3);return n<=Math.cos(Math.PI/6)/Math.cos(r-Math.PI/6)}}}function C(e,t,n){return S(e,t,n)}function w(e,t,n,r,i,a,o,s){let c=[[e,t],[e-n,t-r],[e+n,t-r],[e-n,t+r],[e+n,t+r]],l=0;for(let[e,t]of c)C((e-i)/o,(t-a)/o,s)&&l++;return l>=3}function T(e,t,n,r,i,a,o=10){let s=e,c=t;for(let e=0;e<o;e++){if(C((s-n)/i,(c-r)/i,a))return[s,c];s+=(n-s)*.15,c+=(r-c)*.15}return[s,c]}var E={circle:{icon:`●`,label:`圆形`},heart:{icon:`♥`,label:`心形`},star:{icon:`★`,label:`星形`},diamond:{icon:`◆`,label:`菱形`},cloud:{icon:`☁`,label:`云形`},hexagon:{icon:`⬡`,label:`六边形`}},ee=[`circle`,`heart`,`star`,`diamond`,`cloud`,`hexagon`],D={width:800,height:600,shape:`circle`,minFontSize:11,maxFontSize:42,padding:3,gridScale:3,rotationSteps:0,fontFamily:`sans-serif`,fontWeight:`bold`},O=.12,k=.4,A=2e4,j=/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/;function M(e){let t=0;for(let n of e)j.test(n)&&t++;return t>e.length*.5}function N(e,t,n,r){return t<=0?n:n+(r-n)*Math.sqrt(e/t)}function P(e,t,n,r,i,a,o,s,c,l){let u=Math.random()*Math.PI*2,d=0,f=null;for(let p=0;p<A;p++){let p=r+d*Math.cos(u),m=i+d*Math.sin(u);if(p-t<0||p+t>=s||m-n<0||m+n>=c){u+=O,d+=k*O;continue}if(e.mipBlockOccupied(Math.floor(p/e.gridScale),Math.floor(m/e.gridScale))){d+=2*k*O,u+=O;continue}let[h,g]=[p,m];if(!w(h,g,t,n,r,i,a,o))if(C((h-r)/a,(g-i)/a,o)){if([h,g]=T(h,g,r,i,a,o,3),!w(h,g,t,n,r,i,a,o)){u+=O,d+=k*O;continue}}else{u+=O,d+=k*O;continue}if(!e.checkCollision(h,g,t,n)){let r=e.densityAt(h,g,Math.max(t,n)*1.5);if((f===null||r<f.score)&&(f={x:h,y:g,score:r,rotated:!1},r<.08))break}if(l){let[l,u]=[n,t];if(h-l>=0&&h+l<s&&g-u>=0&&g+u<c&&w(h,g,l,u,r,i,a,o)&&!e.checkCollision(h,g,l,u)){let t=e.densityAt(h,g,Math.max(l,u)*1.5);if((f===null||t<f.score)&&(f={x:h,y:g,score:t,rotated:!0},t<.08))break}}u+=O,d+=k*O}return f}function F(e,t,n){let r=t.estimateMaxFreeArea();return e<=r*.3?0:e<=r*.8?1:e<=r*1.5?2:3}var te=[1,.75,.5625,.421875];function I(e,t={}){let n={...D,...t};if(e.length===0)return{words:[],placedCount:0,totalCount:0,fillRate:0};let{width:r,height:i,shape:a,minFontSize:o,maxFontSize:s,padding:c,gridScale:l,rotationSteps:u,fontFamily:d,fontWeight:f}=n,p=[...e].sort((e,t)=>t.weight-e.weight),m=Math.max(...p.map(e=>e.weight),1),h=r/2,g=i/2,_=Math.min(r,i)/2*.85,v=new b(r,i,l),y=null,x=()=>(y||=document.createElement(`canvas`).getContext(`2d`),y),S=[],C=u>=1;for(let e=0;e<p.length;e++){let t=p[e],n=N(t.weight,m,o,s),u,y;if(t.width!==void 0&&t.height!==void 0)u=t.width+c*2,y=t.height+c*2;else{let e=x();if(!e)break;e.font=`${f} ${n}px ${d}`,u=e.measureText(t.text).width+c*2,y=(M(t.text)?n:n*1.2)+c*2}let b=F(u*y,v,l),w=null;for(let e=b;e<4;e++){if(e>b){let r=te[e];n=Math.max(o,N(t.weight,m,o,s)*r);let i=x();if(!i)break;i.font=`${f} ${n}px ${d}`,u=i.measureText(t.text).width+c*2,y=(M(t.text)?n:n*1.2)+c*2}let l=P(v,u/2,y/2,h,g,_,a,r,i,C);if(l){w={x:l.x,y:l.y,fs:n,rotated:l.rotated};break}}if(!w)continue;let T={id:t.id,text:t.text,x:w.x,y:w.y,fontSize:w.fs,width:u,height:y,rotated:w.rotated};S.push(T),v.markOccupied(w.x,w.y,w.rotated?y/2:u/2,w.rotated?u/2:y/2)}let w=0;for(let e of S)w+=e.width*e.height;let T=r*i>0?w/(r*i):0;return{words:S,placedCount:S.length,totalCount:e.length,fillRate:T}}var L=8,R=3e4;function z(e,t={},n={}){let{timeout:r=R}=n,i=V();return new Promise((n,a)=>{let o=new Blob([i],{type:`application/javascript`}),s=URL.createObjectURL(o),c=new Worker(s,{type:`classic`}),l=setTimeout(()=>{c.terminate(),URL.revokeObjectURL(s),a(Error(`WordCloud worker timed out`))},r);c.onmessage=e=>{if(clearTimeout(l),c.terminate(),URL.revokeObjectURL(s),e.data.type===`SUCCESS`){let{buffer:t,texts:r,placedCount:i,totalCount:a,fillRate:o}=e.data;n({words:B(t,r),placedCount:i,totalCount:a,fillRate:o})}else e.data.type===`ERROR`?a(Error(e.data.error)):a(Error(`Unknown worker response`))},c.onerror=e=>{clearTimeout(l),c.terminate(),URL.revokeObjectURL(s),a(Error(e.message))},c.postMessage({type:`compute`,words:e,config:t})})}function B(e,t){let n=e.length/L,r=[];for(let i=0;i<n;i++){let n=i*L,a=e[n+7];r.push({id:e[n],x:e[n+1],y:e[n+2],fontSize:e[n+3],width:e[n+4],height:e[n+5],rotated:e[n+6]!==0,text:t[a]||``})}return r}function V(){return`
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

// Shape containment — direct analytic formulas, no SDF LUT
function isInShape(nx, ny, shape) { return analyticIsInShape(nx, ny, shape) }

function wordFitsInShape(cx, cy, halfW, halfH, shapeCenterX, shapeCenterY, shapeRadius, shape) {
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
    // Move toward shape center
    x += (shapeCenterX - x) * 0.15; y += (shapeCenterY - y) * 0.15
  }
  return [x, y]
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
`}function H(e,t={}){let n=performance.now(),r=I(e,t),i=performance.now()-n;return i>50&&console.debug(`[wordcloud] computeSync took ${i.toFixed(1)}ms for ${e.length} words`),r}function ne(e,t={}){return e.length>100?z(e,t):H(e,t)}var U=s(),W=`"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`,re=1e3,ie=2400,G=.25,K=4,q=.15;function J(e,t,n){let r=t/100,i=n/100,a=r*Math.min(i,1-i),o=t=>{let n=(t+e/30)%12;return i-a*Math.max(-1,Math.min(n-3,9-n,1))},s=Math.max(0,Math.min(255,Math.round(o(0)*255))),c=Math.max(0,Math.min(255,Math.round(o(8)*255))),l=Math.max(0,Math.min(255,Math.round(o(4)*255)));return`#${s.toString(16).padStart(2,`0`)}${c.toString(16).padStart(2,`0`)}${l.toString(16).padStart(2,`0`)}`}function ae(e,t,n){let r=document.createElement(`canvas`).getContext(`2d`);if(!r)return{inputs:[],colors:new Map,totalArea:0};let i=[...e].sort((e,t)=>t.articleCount-e.articleCount),a=new Map,o=0;return{inputs:i.map((e,i)=>{let s=e.articleCount/t,c=11+31*Math.sqrt(s);r.font=`bold ${c}px ${W}`;let l=r.measureText(e.name),u=i*137.508%360,d=n?68:42;a.set(e.id,[u,70,d]);let f=l.width+6,p=c+6;return o+=f*p,{id:e.id,text:e.name,weight:e.articleCount,width:l.width,height:c}}),colors:a,totalArea:o}}function oe(e,t,n,r,i,a,o){let s=window.devicePixelRatio||1;e.width=t*s,e.height=n*s,e.style.width=t+`px`,e.style.height=n+`px`;let c=e.getContext(`2d`);if(c){c.scale(s,s),c.clearRect(0,0,t,n);for(let e=0;e<r.length;e++){let t=r[e],n=e===a,s=i.get(t.id);if(!s)continue;let[l,u,d]=s,f=n?Math.min(d+18,90):d;c.save(),c.font=`bold ${t.fontSize}px ${W}`,c.textAlign=`center`,c.textBaseline=`middle`;let p=c.createLinearGradient(t.x-t.width/2,t.y-t.height/2,t.x-t.width/2,t.y+t.height/2);p.addColorStop(0,J(l,u,Math.min(f+8,95))),p.addColorStop(.5,J(l,u,f)),p.addColorStop(1,J(l,u,Math.max(f-6,5))),c.fillStyle=p,c.shadowColor=o?`rgba(0,0,0,0.5)`:`rgba(0,0,0,0.18)`,c.shadowBlur=n?8:3,c.shadowOffsetX=1,c.shadowOffsetY=1,c.fillText(t.text,t.x,t.y),c.restore()}}}function Y({tags:e,shape:t=`circle`,onShapeChange:a}){let o=(0,y.useRef)(null),s=(0,y.useRef)(null),c=d(),[l,u]=(0,y.useState)(1),[f,p]=(0,y.useState)(0),[m,h]=(0,y.useState)(0),[g,_]=(0,y.useState)(!1),v=(0,y.useRef)({x:0,y:0,px:0,py:0}),[b,x]=(0,y.useState)(null),[S,C]=(0,y.useState)({x:0,y:0}),[w,T]=(0,y.useState)(!1),[D,O]=(0,y.useState)(()=>window.matchMedia(`(prefers-color-scheme: dark)`).matches);(0,y.useEffect)(()=>{let e=window.matchMedia(`(prefers-color-scheme: dark)`),t=e=>O(e.matches);return e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]);let k=(0,y.useMemo)(()=>Math.max(...e.map(e=>e.articleCount),1),[e]),{inputs:A,colors:j,totalArea:M}=(0,y.useMemo)(()=>ae(e,k,D),[e,k,D]),N=(0,y.useMemo)(()=>{let e=M/.6,t=Math.ceil(Math.sqrt(e)*1.15);return Math.max(re,Math.min(ie,t))},[M]),P=N,F=N,[te,I]=(0,y.useState)({w:800,h:500});(0,y.useEffect)(()=>{let e=o.current;if(!e)return;let t=()=>{let t=e.clientWidth;I({w:t,h:Math.min(t*.78,600)})};t();let n=new ResizeObserver(()=>t());return n.observe(e),()=>n.disconnect()},[]);let[L,R]=(0,y.useState)([]);(0,y.useEffect)(()=>{if(A.length===0||P===0){R([]);return}let e=!1,n=ne(A,{width:P,height:F,shape:t,minFontSize:11,maxFontSize:42,padding:3,gridScale:3});return n instanceof Promise?n.then(t=>{e||(R(t.words),z(t.words,P,F))}):(R(n.words),z(n.words,P,F)),()=>{e=!0}},[A,t,P,F]);let z=(0,y.useCallback)((e,t,n)=>{if(e.length===0)return;let r=o.current;if(!r)return;let i=r.clientWidth,a=Math.min(i*.78,600),s=i/t,c=a/n;u(Math.min(s,c,1.5)),p(0),h(0)},[]),B=(0,y.useCallback)(()=>{u(1),p(0),h(0)},[]),V=(0,y.useCallback)(()=>u(e=>Math.min(K,e+q)),[]),H=(0,y.useCallback)(()=>u(e=>Math.max(G,e-q)),[]),W=(0,y.useCallback)(e=>{e.preventDefault();let t=o.current.getBoundingClientRect(),n=e.clientX-t.left,r=e.clientY-t.top,i=-Math.sign(e.deltaY)*q,a=Math.max(G,Math.min(K,l+i)),s=a/l;p(e=>n-s*(n-e)),h(e=>r-s*(r-e)),u(a)},[l]),J=(0,y.useCallback)(e=>{e.button===0&&(_(!0),v.current={x:e.clientX,y:e.clientY,px:f,py:m})},[f,m]);(0,y.useEffect)(()=>{if(!g)return;let e=e=>{let t=(e.clientX-v.current.x)/l,n=(e.clientY-v.current.y)/l;p(v.current.px+t),h(v.current.py+n)},t=()=>_(!1);return window.addEventListener(`mousemove`,e),window.addEventListener(`mouseup`,t),()=>{window.removeEventListener(`mousemove`,e),window.removeEventListener(`mouseup`,t)}},[g,l]);let Y=(0,y.useDeferredValue)(b),X=(0,y.useRef)(()=>{});(0,y.useEffect)(()=>{X.current=()=>{let e=s.current;e&&oe(e,P,F,L,j,Y,D)}},[L,j,Y,D,P,F]),(0,y.useEffect)(()=>{let e=requestAnimationFrame(()=>X.current());return()=>cancelAnimationFrame(e)},[L,Y,D]);let Z=(0,y.useCallback)((e,t)=>{let n=s.current;if(!n)return null;let r=n.getBoundingClientRect(),i=(e-r.left)/l-f,a=(t-r.top)/l-m;for(let e=L.length-1;e>=0;e--){let t=L[e];if(i>=t.x-t.width/2&&i<=t.x+t.width/2&&a>=t.y-t.height/2&&a<=t.y+t.height/2)return e}return null},[L,l,f,m]),Q=(0,y.useCallback)(e=>{let t=Z(e.clientX,e.clientY);if(t!==b&&x(t),t!==null){let t=o.current.getBoundingClientRect();C({x:e.clientX-t.left,y:e.clientY-t.top}),T(!0)}else T(!1)},[Z,b]),se=(0,y.useCallback)(()=>{x(null),T(!1)},[]),ce=(0,y.useCallback)(t=>{let n=Math.abs(t.clientX-v.current.x),r=Math.abs(t.clientY-v.current.y);if(n>3||r>3)return;let i=Z(t.clientX,t.clientY);if(i!==null){let t=L[i],n=e.find(e=>e.id===t.id);n&&c(`/tags/${n.slug}`)}},[Z,c,L,e]);if(e.length===0)return(0,U.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,U.jsx)(`span`,{className:`text-4xl text-muted-foreground/30 mb-4`,children:`🏷️`}),(0,U.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无标签`}),(0,U.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`标签正在整理中`})]});let le=b===null?null:L[b],$=le?e.find(e=>e.id===le.id):null;return(0,U.jsxs)(`div`,{ref:o,className:`w-full`,children:[(0,U.jsxs)(`div`,{className:`flex items-center justify-between mb-4 flex-wrap gap-2`,children:[(0,U.jsx)(`div`,{className:`flex items-center gap-1.5`,children:ee.map(e=>(0,U.jsx)(`button`,{type:`button`,onClick:()=>a?.(e),title:E[e].label,className:[`inline-flex items-center justify-center w-9 h-9 rounded-lg text-lg transition-all duration-200 select-none`,e===t?`bg-primary text-primary-foreground shadow-sm scale-110`:`text-muted-foreground hover:text-foreground hover:bg-accent`].join(` `),children:E[e].icon},e))}),(0,U.jsxs)(`div`,{className:`flex items-center gap-1`,children:[(0,U.jsx)(`button`,{type:`button`,onClick:H,title:`缩小`,className:`inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors`,children:(0,U.jsx)(i,{className:`h-4 w-4`})}),(0,U.jsxs)(`span`,{className:`text-xs text-muted-foreground font-mono w-12 text-center select-none`,children:[Math.round(l*100),`%`]}),(0,U.jsx)(`button`,{type:`button`,onClick:V,title:`放大`,className:`inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors`,children:(0,U.jsx)(r,{className:`h-4 w-4`})}),(0,U.jsx)(`button`,{type:`button`,onClick:B,title:`重置视图`,className:`inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors ml-1`,children:(0,U.jsx)(n,{className:`h-3.5 w-3.5`})})]})]}),(0,U.jsxs)(`div`,{className:`relative overflow-hidden rounded-lg border border-border bg-background select-none`,style:{width:`100%`,height:te.h||500},onWheel:W,children:[(0,U.jsx)(`div`,{className:`absolute top-0 left-0 origin-top-left`,style:{transform:`translate(${f*l}px, ${m*l}px) scale(${l})`,width:P,height:F},children:(0,U.jsx)(`canvas`,{ref:s,className:`block cursor-grab active:cursor-grabbing`,style:{touchAction:`none`,width:P,height:F},onMouseMove:Q,onMouseLeave:se,onMouseDown:J,onClick:ce})}),w&&$&&(0,U.jsxs)(`div`,{className:`absolute pointer-events-none px-2.5 py-1.5 rounded-md text-xs font-medium shadow-md border border-border bg-popover text-popover-foreground whitespace-nowrap transition-opacity duration-150 z-10`,style:{left:S.x+14,top:S.y-10,transform:`translateY(-100%)`},children:[$.name,(0,U.jsxs)(`span`,{className:`ml-1.5 text-muted-foreground font-normal`,children:[`(`,$.articleCount,` 篇)`]})]})]}),L.length<e.length&&(0,U.jsxs)(`p`,{className:`mt-2 text-center text-xs text-muted-foreground`,children:[`已显示 `,L.length,`/`,e.length,` 个标签 （部分标签因形状空间不足未显示）`]})]})}function X(e){let t=e.articleCount||0;if(e.children)for(let n of e.children)t+=X(n);return t}function Z(e){return[...e].sort((e,t)=>{let n=X(e);return X(t)-n}).map(e=>({...e,children:e.children?Z(e.children):void 0}))}var Q=(0,y.memo)(function e({node:n,depth:r=0}){let[i,o]=(0,y.useState)(r<1),s=n.children&&n.children.length>0,c=(0,y.useMemo)(()=>X(n),[n]);return(0,U.jsxs)(`div`,{children:[(0,U.jsxs)(`div`,{className:`group flex items-center gap-2`,style:{paddingLeft:r*20},children:[s?(0,U.jsx)(`button`,{onClick:()=>o(!i),className:`flex-shrink-0 h-6 w-6 flex items-center justify-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors`,children:i?(0,U.jsx)(t,{className:`h-4 w-4`}):(0,U.jsx)(u,{className:`h-4 w-4`})}):(0,U.jsx)(`span`,{className:`flex-shrink-0 w-6`}),(0,U.jsxs)(l,{to:`/categories/${n.slug}`,className:`flex-1 flex items-center justify-between rounded-lg px-3 py-2.5 transition-all hover:bg-accent group-hover:text-primary`,children:[(0,U.jsxs)(`div`,{className:`flex items-center gap-2 min-w-0`,children:[(0,U.jsx)(a,{className:`h-4 w-4 text-primary flex-shrink-0`}),(0,U.jsx)(`span`,{className:`font-medium text-foreground truncate`,children:n.name}),n.description&&(0,U.jsxs)(`span`,{className:`text-xs text-muted-foreground truncate hidden sm:inline`,children:[`— `,n.description]})]}),(0,U.jsxs)(`span`,{className:`flex-shrink-0 ml-2 font-mono text-xs text-muted-foreground`,children:[c,` 篇`]})]})]}),s&&i&&(0,U.jsx)(`div`,{className:`mt-0.5`,children:n.children.map(t=>(0,U.jsx)(e,{node:t,depth:r+1},t.id))})]})});function se(){let[t,n]=(0,y.useState)(`categories`),[r,i]=(0,y.useState)(`circle`),{data:o,isLoading:s}=m(`/categories`,p,h),{data:c,isLoading:u}=m(`/tags`,p,h),{data:d,isLoading:f}=m(`/columns`,p,h),b=(Array.isArray(o)?o:o?.list)||[],x=(Array.isArray(c)?c:c?.list)||[],S=(Array.isArray(d)?d:d?.list)||[],C=(0,y.useMemo)(()=>Z(b),[b]);return(0,U.jsxs)(`div`,{className:`space-y-8`,children:[(0,U.jsx)(g,{title:`发现`,description:`按分类、专栏或标签探索文章。`}),(0,U.jsxs)(`div`,{children:[(0,U.jsx)(`span`,{className:`font-mono text-xs font-semibold text-primary tracking-widest uppercase`,children:`探索内容`}),(0,U.jsx)(`h1`,{className:`mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl`,children:`发现`}),(0,U.jsx)(`p`,{className:`mt-4 max-w-2xl text-muted-foreground leading-relaxed`,children:`按分类、专栏或标签探索文章，找到你感兴趣的内容。`})]}),(0,U.jsxs)(`div`,{className:`flex items-center gap-2 flex-wrap`,children:[(0,U.jsxs)(`button`,{onClick:()=>n(`categories`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`categories`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,U.jsx)(a,{className:`h-4 w-4`}),` 分类`]}),(0,U.jsxs)(`button`,{onClick:()=>n(`columns`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`columns`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,U.jsx)(e,{className:`h-4 w-4`}),` 专栏`]}),(0,U.jsxs)(`button`,{onClick:()=>n(`tags`),className:`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${t===`tags`?`bg-primary text-primary-foreground`:`border border-border text-muted-foreground hover:bg-accent hover:text-foreground`}`,children:[(0,U.jsx)(v,{className:`h-4 w-4`}),` 标签`]})]}),t===`categories`?s?(0,U.jsx)(`div`,{className:`space-y-3`,children:Array.from({length:6}).map((e,t)=>(0,U.jsx)(`div`,{className:`animate-pulse rounded-lg border border-border bg-card p-4`,children:(0,U.jsx)(`div`,{className:`h-5 w-32 rounded bg-muted`})},t))}):C.length===0?(0,U.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,U.jsx)(a,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,U.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无分类`}),(0,U.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`分类正在整理中`})]}):(0,U.jsx)(_,{className:`rounded-xl border border-border bg-card p-4 md:p-6`,children:C.map(e=>(0,U.jsx)(Q,{node:e},e.id))}):t===`columns`?f?(0,U.jsx)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`,children:Array.from({length:4}).map((e,t)=>(0,U.jsx)(`div`,{className:`animate-pulse rounded-xl border border-border bg-card p-5`,children:(0,U.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,U.jsx)(`div`,{className:`h-10 w-10 shrink-0 rounded-lg bg-muted`}),(0,U.jsxs)(`div`,{className:`min-w-0 flex-1 space-y-2`,children:[(0,U.jsx)(`div`,{className:`h-5 w-24 rounded bg-muted`}),(0,U.jsx)(`div`,{className:`h-4 w-full rounded bg-muted`})]})]})},t))}):S.length===0?(0,U.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,U.jsx)(e,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,U.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无专栏`}),(0,U.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`专栏正在整理中`})]}):(0,U.jsx)(`div`,{className:`grid grid-cols-1 sm:grid-cols-2 gap-4`,children:S.map(t=>(0,U.jsx)(l,{to:`/categories/${t.slug}`,className:`group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm`,children:(0,U.jsxs)(`div`,{className:`flex items-start gap-4`,children:[(0,U.jsx)(`div`,{className:`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary`,children:(0,U.jsx)(e,{className:`h-5 w-5`})}),(0,U.jsxs)(`div`,{className:`min-w-0 flex-1`,children:[(0,U.jsx)(`h3`,{className:`font-semibold text-foreground group-hover:text-primary transition-colors`,children:t.name}),(0,U.jsx)(`p`,{className:`mt-1 text-sm text-muted-foreground leading-relaxed`,children:t.description})]})]})},t.id))}):u?(0,U.jsx)(`div`,{className:`flex flex-wrap gap-3`,children:Array.from({length:12}).map((e,t)=>(0,U.jsx)(`div`,{className:`animate-pulse rounded-lg bg-muted px-4 py-2`,children:(0,U.jsx)(`div`,{className:`h-4 w-16 rounded bg-muted-foreground/10`})},t))}):x.length===0?(0,U.jsxs)(`div`,{className:`flex flex-col items-center justify-center py-16 text-center`,children:[(0,U.jsx)(v,{className:`h-12 w-12 text-muted-foreground/30 mb-4`}),(0,U.jsx)(`p`,{className:`text-lg font-medium text-foreground`,children:`暂无标签`}),(0,U.jsx)(`p`,{className:`mt-2 text-sm text-muted-foreground`,children:`标签正在整理中`})]}):(0,U.jsx)(`div`,{className:`rounded-xl border border-border bg-card p-4 md:p-6`,children:(0,U.jsx)(Y,{tags:x,shape:r,onShapeChange:i})})]})}export{se as default};