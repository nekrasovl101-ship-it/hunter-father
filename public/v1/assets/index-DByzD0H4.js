(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Lc="170",Qd=0,yl=1,kd=2,Pc=1,Od=2,Fn=3,qn=0,Ge=1,Ke=2,ri=0,ns=1,Oa=2,Il=3,Cl=4,Gd=5,_i=100,zd=101,Hd=102,Vd=103,Wd=104,qd=200,Xd=201,Yd=202,Jd=203,Ga=204,za=205,Kd=206,jd=207,Zd=208,$d=209,tf=210,ef=211,nf=212,sf=213,rf=214,Ha=0,Va=1,Wa=2,os=3,qa=4,Xa=5,Ya=6,Ja=7,Uc=0,of=1,af=2,oi=0,cf=1,lf=2,hf=3,lu=4,uf=5,df=6,ff=7,Ml="attached",Af="detached",hu=300,yi=301,as=302,Ka=303,ja=304,wo=306,Ii=1e3,Gn=1001,ao=1002,ze=1003,uu=1004,ks=1005,De=1006,eo=1007,mn=1008,Se=1009,du=1010,fu=1011,$s=1012,Nc=1013,Ci=1014,Le=1015,sn=1016,Fc=1017,Qc=1018,cs=1020,Au=35902,pu=1021,gu=1022,ye=1023,mu=1024,_u=1025,is=1026,ls=1027,ii=1028,kc=1029,xi=1030,Oc=1031,Gc=1033,no=33776,zs=33777,io=33778,Hs=33779,co=35840,Za=35841,lo=35842,$a=35843,ho=36196,uo=37492,fo=37496,tr=37808,tc=37809,ec=37810,nc=37811,er=37812,ic=37813,sc=37814,rc=37815,oc=37816,ac=37817,cc=37818,lc=37819,hc=37820,uc=37821,Vs=36492,dc=36494,Ao=36495,Eu=36283,fc=36284,Ac=36285,pc=36286,xu=2200,pf=2201,gf=2202,nr=2300,ir=2301,Oo=2302,ji=2400,Zi=2401,po=2402,zc=2500,mf=2501,_f=0,vu=1,gc=2,Ef=3200,xf=3201,Hc=0,vf=1,pn="",pe="srgb",Pe="srgb-linear",Bo="linear",re="srgb",Ri=7680,Sl=519,yf=512,If=513,Cf=514,yu=515,Mf=516,Sf=517,wf=518,Bf=519,mc=35044,go=35048,wl="300 es",zn=2e3,mo=2001;class Bi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const s=i.indexOf(e);s!==-1&&i.splice(s,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,t);t.target=null}}}const be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Bl=1234567;const Ws=Math.PI/180,hs=180/Math.PI;function on(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(be[r&255]+be[r>>8&255]+be[r>>16&255]+be[r>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]).toLowerCase()}function ve(r,t,e){return Math.max(t,Math.min(e,r))}function Vc(r,t){return(r%t+t)%t}function Tf(r,t,e,n,i){return n+(r-t)*(i-n)/(e-t)}function bf(r,t,e){return r!==t?(e-r)/(t-r):0}function qs(r,t,e){return(1-e)*r+e*t}function Rf(r,t,e,n){return qs(r,t,1-Math.exp(-e*n))}function Df(r,t=1){return t-Math.abs(Vc(r,t*2)-t)}function Lf(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*(3-2*r))}function Pf(r,t,e){return r<=t?0:r>=e?1:(r=(r-t)/(e-t),r*r*r*(r*(r*6-15)+10))}function Uf(r,t){return r+Math.floor(Math.random()*(t-r+1))}function Nf(r,t){return r+Math.random()*(t-r)}function Ff(r){return r*(.5-Math.random())}function Qf(r){r!==void 0&&(Bl=r);let t=Bl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function kf(r){return r*Ws}function Of(r){return r*hs}function Gf(r){return(r&r-1)===0&&r!==0}function zf(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Hf(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Vf(r,t,e,n,i){const s=Math.cos,o=Math.sin,a=s(e/2),c=o(e/2),l=s((t+n)/2),h=o((t+n)/2),u=s((t-n)/2),d=o((t-n)/2),f=s((n-t)/2),A=o((n-t)/2);switch(i){case"XYX":r.set(a*h,c*u,c*d,a*l);break;case"YZY":r.set(c*d,a*h,c*u,a*l);break;case"ZXZ":r.set(c*u,c*d,a*h,a*l);break;case"XZX":r.set(a*h,c*A,c*f,a*l);break;case"YXY":r.set(c*f,a*h,c*A,a*l);break;case"ZYZ":r.set(c*A,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function gn(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function se(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const _o={DEG2RAD:Ws,RAD2DEG:hs,generateUUID:on,clamp:ve,euclideanModulo:Vc,mapLinear:Tf,inverseLerp:bf,lerp:qs,damp:Rf,pingpong:Df,smoothstep:Lf,smootherstep:Pf,randInt:Uf,randFloat:Nf,randFloatSpread:Ff,seededRandom:Qf,degToRad:kf,radToDeg:Of,isPowerOfTwo:Gf,ceilPowerOfTwo:zf,floorPowerOfTwo:Hf,setQuaternionFromProperEuler:Vf,normalize:se,denormalize:gn};class tt{constructor(t=0,e=0){tt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),s=this.x-t.x,o=this.y-t.y;return this.x=s*n-o*i+t.x,this.y=s*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(t,e,n,i,s,o,a,c,l){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l)}set(t,e,n,i,s,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=s,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],A=n[8],m=i[0],g=i[3],p=i[6],x=i[1],E=i[4],_=i[7],T=i[2],S=i[5],M=i[8];return s[0]=o*m+a*x+c*T,s[3]=o*g+a*E+c*S,s[6]=o*p+a*_+c*M,s[1]=l*m+h*x+u*T,s[4]=l*g+h*E+u*S,s[7]=l*p+h*_+u*M,s[2]=d*m+f*x+A*T,s[5]=d*g+f*E+A*S,s[8]=d*p+f*_+A*M,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*s*h+n*a*c+i*s*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*s,f=l*s-o*c,A=e*u+n*d+i*f;if(A===0)return this.set(0,0,0,0,0,0,0,0,0);const m=1/A;return t[0]=u*m,t[1]=(i*l-h*n)*m,t[2]=(a*n-i*o)*m,t[3]=d*m,t[4]=(h*e-i*c)*m,t[5]=(i*s-a*e)*m,t[6]=f*m,t[7]=(n*c-l*e)*m,t[8]=(o*e-n*s)*m,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Go.makeScale(t,e)),this}rotate(t){return this.premultiply(Go.makeRotation(-t)),this}translate(t,e){return this.premultiply(Go.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Go=new Gt;function Iu(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function sr(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Wf(){const r=sr("canvas");return r.style.display="block",r}const Tl={};function Os(r){r in Tl||(Tl[r]=!0,console.warn(r))}function qf(r,t,e){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:n()}}setTimeout(s,e)})}function Xf(r){const t=r.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Yf(r){const t=r.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Xt={enabled:!0,workingColorSpace:Pe,spaces:{},convert:function(r,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===re&&(r.r=Wn(r.r),r.g=Wn(r.g),r.b=Wn(r.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(r.applyMatrix3(this.spaces[t].toXYZ),r.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===re&&(r.r=ss(r.r),r.g=ss(r.g),r.b=ss(r.b))),r},fromWorkingColorSpace:function(r,t){return this.convert(r,this.workingColorSpace,t)},toWorkingColorSpace:function(r,t){return this.convert(r,t,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===pn?Bo:this.spaces[r].transfer},getLuminanceCoefficients:function(r,t=this.workingColorSpace){return r.fromArray(this.spaces[t].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,t,e){return r.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function Wn(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ss(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const bl=[.64,.33,.3,.6,.15,.06],Rl=[.2126,.7152,.0722],Dl=[.3127,.329],Ll=new Gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pl=new Gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Xt.define({[Pe]:{primaries:bl,whitePoint:Dl,transfer:Bo,toXYZ:Ll,fromXYZ:Pl,luminanceCoefficients:Rl,workingColorSpaceConfig:{unpackColorSpace:pe},outputColorSpaceConfig:{drawingBufferColorSpace:pe}},[pe]:{primaries:bl,whitePoint:Dl,transfer:re,toXYZ:Ll,fromXYZ:Pl,luminanceCoefficients:Rl,outputColorSpaceConfig:{drawingBufferColorSpace:pe}}});let Di;class Jf{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Di===void 0&&(Di=sr("canvas")),Di.width=t.width,Di.height=t.height;const n=Di.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Di}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=sr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Wn(s[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Wn(e[n]/255)*255):e[n]=Wn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Kf=0;class Cu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=on(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(zo(i[o].image)):s.push(zo(i[o]))}else s=zo(i);n.url=s}return e||(t.images[this.uuid]=n),n}}function zo(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Jf.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jf=0;class xe extends Bi{constructor(t=xe.DEFAULT_IMAGE,e=xe.DEFAULT_MAPPING,n=Gn,i=Gn,s=De,o=mn,a=ye,c=Se,l=xe.DEFAULT_ANISOTROPY,h=pn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=on(),this.name="",this.source=new Cu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new tt(0,0),this.repeat=new tt(1,1),this.center=new tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ii:t.x=t.x-Math.floor(t.x);break;case Gn:t.x=t.x<0?0:1;break;case ao:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ii:t.y=t.y-Math.floor(t.y);break;case Gn:t.y=t.y<0?0:1;break;case ao:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}xe.DEFAULT_IMAGE=null;xe.DEFAULT_MAPPING=hu;xe.DEFAULT_ANISOTROPY=1;class jt{constructor(t=0,e=0,n=0,i=1){jt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,s;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],A=c[9],m=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-m)<.01&&Math.abs(A-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+m)<.1&&Math.abs(A+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,_=(f+1)/2,T=(p+1)/2,S=(h+d)/4,M=(u+m)/4,b=(A+g)/4;return E>_&&E>T?E<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(E),i=S/n,s=M/n):_>T?_<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(_),n=S/i,s=b/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=M/s,i=b/s),this.set(n,i,s,e),this}let x=Math.sqrt((g-A)*(g-A)+(u-m)*(u-m)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-A)/x,this.y=(u-m)/x,this.z=(d-h)/x,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Zf extends Bi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new jt(0,0,t,e),this.scissorTest=!1,this.viewport=new jt(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:De,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new xe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Cu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ai extends Zf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Mu extends xe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ze,this.minFilter=ze,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Su extends xe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=ze,this.minFilter=ze,this.wrapR=Gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class an{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,s,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],f=s[o+1],A=s[o+2],m=s[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=A,t[e+3]=m;return}if(u!==m||c!==d||l!==f||h!==A){let g=1-a;const p=c*d+l*f+h*A+u*m,x=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const T=Math.sqrt(E),S=Math.atan2(T,p*x);g=Math.sin(g*S)/T,a=Math.sin(a*S)/T}const _=a*x;if(c=c*g+d*_,l=l*g+f*_,h=h*g+A*_,u=u*g+m*_,g===1-a){const T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,s,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],A=s[o+3];return t[e]=a*A+h*u+c*f-l*d,t[e+1]=c*A+h*d+l*u-a*f,t[e+2]=l*A+h*f+a*d-c*u,t[e+3]=h*A-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,s=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(s/2),d=c(n/2),f=c(i/2),A=c(s/2);switch(o){case"XYZ":this._x=d*h*u+l*f*A,this._y=l*f*u-d*h*A,this._z=l*h*A+d*f*u,this._w=l*h*u-d*f*A;break;case"YXZ":this._x=d*h*u+l*f*A,this._y=l*f*u-d*h*A,this._z=l*h*A-d*f*u,this._w=l*h*u+d*f*A;break;case"ZXY":this._x=d*h*u-l*f*A,this._y=l*f*u+d*h*A,this._z=l*h*A+d*f*u,this._w=l*h*u-d*f*A;break;case"ZYX":this._x=d*h*u-l*f*A,this._y=l*f*u+d*h*A,this._z=l*h*A-d*f*u,this._w=l*h*u+d*f*A;break;case"YZX":this._x=d*h*u+l*f*A,this._y=l*f*u+d*h*A,this._z=l*h*A-d*f*u,this._w=l*h*u-d*f*A;break;case"XZY":this._x=d*h*u-l*f*A,this._y=l*f*u-d*h*A,this._z=l*h*A+d*f*u,this._w=l*h*u+d*f*A;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],s=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ve(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,s=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-s*c,this._y=i*h+o*c+s*a-n*l,this._z=s*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-s*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+s*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(t=0,e=0,n=0){B.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Ul.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Ul.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6]*i,this.y=s[1]*e+s[4]*n+s[7]*i,this.z=s[2]*e+s[5]*n+s[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,s=t.elements,o=1/(s[3]*e+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*e+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*e+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*e+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,s=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-s*i),u=2*(s*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-s*u,this.z=i+c*u+s*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,s=t.elements;return this.x=s[0]*e+s[4]*n+s[8]*i,this.y=s[1]*e+s[5]*n+s[9]*i,this.z=s[2]*e+s[6]*n+s[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,s=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-s*a,this.y=s*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ho.copy(this).projectOnVector(t),this.sub(Ho)}reflect(t){return this.sub(Ho.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ho=new B,Ul=new an;class qe{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const s=n.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,dn):dn.fromBufferAttribute(s,o),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),mr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),mr.copy(n.boundingBox)),mr.applyMatrix4(t.matrixWorld),this.union(mr)}const i=t.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Cs),_r.subVectors(this.max,Cs),Li.subVectors(t.a,Cs),Pi.subVectors(t.b,Cs),Ui.subVectors(t.c,Cs),Jn.subVectors(Pi,Li),Kn.subVectors(Ui,Pi),li.subVectors(Li,Ui);let e=[0,-Jn.z,Jn.y,0,-Kn.z,Kn.y,0,-li.z,li.y,Jn.z,0,-Jn.x,Kn.z,0,-Kn.x,li.z,0,-li.x,-Jn.y,Jn.x,0,-Kn.y,Kn.x,0,-li.y,li.x,0];return!Vo(e,Li,Pi,Ui,_r)||(e=[1,0,0,0,1,0,0,0,1],!Vo(e,Li,Pi,Ui,_r))?!1:(Er.crossVectors(Jn,Kn),e=[Er.x,Er.y,Er.z],Vo(e,Li,Pi,Ui,_r))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(bn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const bn=[new B,new B,new B,new B,new B,new B,new B,new B],dn=new B,mr=new qe,Li=new B,Pi=new B,Ui=new B,Jn=new B,Kn=new B,li=new B,Cs=new B,_r=new B,Er=new B,hi=new B;function Vo(r,t,e,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){hi.fromArray(r,s);const a=i.x*Math.abs(hi.x)+i.y*Math.abs(hi.y)+i.z*Math.abs(hi.z),c=t.dot(hi),l=e.dot(hi),h=n.dot(hi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const $f=new qe,Ms=new B,Wo=new B;class vn{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):$f.setFromPoints(t).getCenter(n);let i=0;for(let s=0,o=t.length;s<o;s++)i=Math.max(i,n.distanceToSquared(t[s]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ms.subVectors(t,this.center);const e=Ms.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ms,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Wo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ms.copy(t.center).add(Wo)),this.expandByPoint(Ms.copy(t.center).sub(Wo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Rn=new B,qo=new B,xr=new B,jn=new B,Xo=new B,vr=new B,Yo=new B;class To{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Rn.copy(this.origin).addScaledVector(this.direction,e),Rn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){qo.copy(t).add(e).multiplyScalar(.5),xr.copy(e).sub(t).normalize(),jn.copy(this.origin).sub(qo);const s=t.distanceTo(e)*.5,o=-this.direction.dot(xr),a=jn.dot(this.direction),c=-jn.dot(xr),l=jn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,A;if(h>0)if(u=o*c-a,d=o*a-c,A=s*h,u>=0)if(d>=-A)if(d<=A){const m=1/h;u*=m,d*=m,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-A?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l):d<=A?(u=0,d=Math.min(Math.max(-s,-c),s),f=d*(d+2*c)+l):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-c),s),f=-u*u+d*(d+2*c)+l);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(qo).addScaledVector(xr,d),f}intersectSphere(t,e){Rn.subVectors(t.center,this.origin);const n=Rn.dot(this.direction),i=Rn.dot(Rn)-n*n,s=t.radius*t.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(s=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Rn)!==null}intersectTriangle(t,e,n,i,s){Xo.subVectors(e,t),vr.subVectors(n,t),Yo.crossVectors(Xo,vr);let o=this.direction.dot(Yo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;jn.subVectors(this.origin,t);const c=a*this.direction.dot(vr.crossVectors(jn,vr));if(c<0)return null;const l=a*this.direction.dot(Xo.cross(jn));if(l<0||c+l>o)return null;const h=-a*jn.dot(Yo);return h<0?null:this.at(h/o,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pt{constructor(t,e,n,i,s,o,a,c,l,h,u,d,f,A,m,g){Pt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,s,o,a,c,l,h,u,d,f,A,m,g)}set(t,e,n,i,s,o,a,c,l,h,u,d,f,A,m,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=A,p[11]=m,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ni.setFromMatrixColumn(t,0).length(),s=1/Ni.setFromMatrixColumn(t,1).length(),o=1/Ni.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*s,e[5]=n[5]*s,e[6]=n[6]*s,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,s=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=o*h,f=o*u,A=a*h,m=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+A*l,e[5]=d-m*l,e[9]=-a*c,e[2]=m-d*l,e[6]=A+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,A=l*h,m=l*u;e[0]=d+m*a,e[4]=A*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-A,e[6]=m+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,A=l*h,m=l*u;e[0]=d-m*a,e[4]=-o*u,e[8]=A+f*a,e[1]=f+A*a,e[5]=o*h,e[9]=m-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,A=a*h,m=a*u;e[0]=c*h,e[4]=A*l-f,e[8]=d*l+m,e[1]=c*u,e[5]=m*l+d,e[9]=f*l-A,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,A=a*c,m=a*l;e[0]=c*h,e[4]=m-d*u,e[8]=A*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+A,e[10]=d-m*u}else if(t.order==="XZY"){const d=o*c,f=o*l,A=a*c,m=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+m,e[5]=o*h,e[9]=f*u-A,e[2]=A*u-f,e[6]=a*h,e[10]=m*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(tA,t,eA)}lookAt(t,e,n){const i=this.elements;return Ye.subVectors(t,e),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),Zn.crossVectors(n,Ye),Zn.lengthSq()===0&&(Math.abs(n.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),Zn.crossVectors(n,Ye)),Zn.normalize(),yr.crossVectors(Ye,Zn),i[0]=Zn.x,i[4]=yr.x,i[8]=Ye.x,i[1]=Zn.y,i[5]=yr.y,i[9]=Ye.y,i[2]=Zn.z,i[6]=yr.z,i[10]=Ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,s=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],A=n[2],m=n[6],g=n[10],p=n[14],x=n[3],E=n[7],_=n[11],T=n[15],S=i[0],M=i[4],b=i[8],I=i[12],v=i[1],D=i[5],Q=i[9],N=i[13],z=i[2],q=i[6],H=i[10],W=i[14],O=i[3],it=i[7],lt=i[11],At=i[15];return s[0]=o*S+a*v+c*z+l*O,s[4]=o*M+a*D+c*q+l*it,s[8]=o*b+a*Q+c*H+l*lt,s[12]=o*I+a*N+c*W+l*At,s[1]=h*S+u*v+d*z+f*O,s[5]=h*M+u*D+d*q+f*it,s[9]=h*b+u*Q+d*H+f*lt,s[13]=h*I+u*N+d*W+f*At,s[2]=A*S+m*v+g*z+p*O,s[6]=A*M+m*D+g*q+p*it,s[10]=A*b+m*Q+g*H+p*lt,s[14]=A*I+m*N+g*W+p*At,s[3]=x*S+E*v+_*z+T*O,s[7]=x*M+E*D+_*q+T*it,s[11]=x*b+E*Q+_*H+T*lt,s[15]=x*I+E*N+_*W+T*At,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],s=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],A=t[3],m=t[7],g=t[11],p=t[15];return A*(+s*c*u-i*l*u-s*a*d+n*l*d+i*a*f-n*c*f)+m*(+e*c*f-e*l*d+s*o*d-i*o*f+i*l*h-s*c*h)+g*(+e*l*u-e*a*f-s*o*u+n*o*f+s*a*h-n*l*h)+p*(-i*a*h-e*c*u+e*a*d+i*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],s=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],A=t[12],m=t[13],g=t[14],p=t[15],x=u*g*l-m*d*l+m*c*f-a*g*f-u*c*p+a*d*p,E=A*d*l-h*g*l-A*c*f+o*g*f+h*c*p-o*d*p,_=h*m*l-A*u*l+A*a*f-o*m*f-h*a*p+o*u*p,T=A*u*c-h*m*c-A*a*d+o*m*d+h*a*g-o*u*g,S=e*x+n*E+i*_+s*T;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const M=1/S;return t[0]=x*M,t[1]=(m*d*s-u*g*s-m*i*f+n*g*f+u*i*p-n*d*p)*M,t[2]=(a*g*s-m*c*s+m*i*l-n*g*l-a*i*p+n*c*p)*M,t[3]=(u*c*s-a*d*s-u*i*l+n*d*l+a*i*f-n*c*f)*M,t[4]=E*M,t[5]=(h*g*s-A*d*s+A*i*f-e*g*f-h*i*p+e*d*p)*M,t[6]=(A*c*s-o*g*s-A*i*l+e*g*l+o*i*p-e*c*p)*M,t[7]=(o*d*s-h*c*s+h*i*l-e*d*l-o*i*f+e*c*f)*M,t[8]=_*M,t[9]=(A*u*s-h*m*s-A*n*f+e*m*f+h*n*p-e*u*p)*M,t[10]=(o*m*s-A*a*s+A*n*l-e*m*l-o*n*p+e*a*p)*M,t[11]=(h*a*s-o*u*s-h*n*l+e*u*l+o*n*f-e*a*f)*M,t[12]=T*M,t[13]=(h*m*i-A*u*i+A*n*d-e*m*d-h*n*g+e*u*g)*M,t[14]=(A*a*i-o*m*i-A*n*c+e*m*c+o*n*g-e*a*g)*M,t[15]=(o*u*i-h*a*i+h*n*c-e*u*c-o*n*d+e*a*d)*M,this}scale(t){const e=this.elements,n=t.x,i=t.y,s=t.z;return e[0]*=n,e[4]*=i,e[8]*=s,e[1]*=n,e[5]*=i,e[9]*=s,e[2]*=n,e[6]*=i,e[10]*=s,e[3]*=n,e[7]*=i,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),s=1-n,o=t.x,a=t.y,c=t.z,l=s*o,h=s*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,s*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,s,o){return this.set(1,n,s,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,s=e._x,o=e._y,a=e._z,c=e._w,l=s+s,h=o+o,u=a+a,d=s*l,f=s*h,A=s*u,m=o*h,g=o*u,p=a*u,x=c*l,E=c*h,_=c*u,T=n.x,S=n.y,M=n.z;return i[0]=(1-(m+p))*T,i[1]=(f+_)*T,i[2]=(A-E)*T,i[3]=0,i[4]=(f-_)*S,i[5]=(1-(d+p))*S,i[6]=(g+x)*S,i[7]=0,i[8]=(A+E)*M,i[9]=(g-x)*M,i[10]=(1-(d+m))*M,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let s=Ni.set(i[0],i[1],i[2]).length();const o=Ni.set(i[4],i[5],i[6]).length(),a=Ni.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),t.x=i[12],t.y=i[13],t.z=i[14],fn.copy(this);const l=1/s,h=1/o,u=1/a;return fn.elements[0]*=l,fn.elements[1]*=l,fn.elements[2]*=l,fn.elements[4]*=h,fn.elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=u,fn.elements[9]*=u,fn.elements[10]*=u,e.setFromRotationMatrix(fn),n.x=s,n.y=o,n.z=a,this}makePerspective(t,e,n,i,s,o,a=zn){const c=this.elements,l=2*s/(e-t),h=2*s/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,A;if(a===zn)f=-(o+s)/(o-s),A=-2*o*s/(o-s);else if(a===mo)f=-o/(o-s),A=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=A,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,s,o,a=zn){const c=this.elements,l=1/(e-t),h=1/(n-i),u=1/(o-s),d=(e+t)*l,f=(n+i)*h;let A,m;if(a===zn)A=(o+s)*u,m=-2*u;else if(a===mo)A=s*u,m=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=m,c[14]=-A,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ni=new B,fn=new Pt,tA=new B(0,0,0),eA=new B(1,1,1),Zn=new B,yr=new B,Ye=new B,Nl=new Pt,Fl=new an;class En{constructor(t=0,e=0,n=0,i=En.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,s=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ve(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(ve(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-ve(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ve(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Nl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Nl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Fl.setFromEuler(this),this.setFromQuaternion(Fl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}En.DEFAULT_ORDER="XYZ";class wu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let nA=0;const Ql=new B,Fi=new an,Dn=new Pt,Ir=new B,Ss=new B,iA=new B,sA=new an,kl=new B(1,0,0),Ol=new B(0,1,0),Gl=new B(0,0,1),zl={type:"added"},rA={type:"removed"},Qi={type:"childadded",child:null},Jo={type:"childremoved",child:null};class de extends Bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nA++}),this.uuid=on(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=de.DEFAULT_UP.clone();const t=new B,e=new En,n=new an,i=new B(1,1,1);function s(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Pt},normalMatrix:{value:new Gt}}),this.matrix=new Pt,this.matrixWorld=new Pt,this.matrixAutoUpdate=de.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Fi.setFromAxisAngle(t,e),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(t,e){return Fi.setFromAxisAngle(t,e),this.quaternion.premultiply(Fi),this}rotateX(t){return this.rotateOnAxis(kl,t)}rotateY(t){return this.rotateOnAxis(Ol,t)}rotateZ(t){return this.rotateOnAxis(Gl,t)}translateOnAxis(t,e){return Ql.copy(t).applyQuaternion(this.quaternion),this.position.add(Ql.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(kl,t)}translateY(t){return this.translateOnAxis(Ol,t)}translateZ(t){return this.translateOnAxis(Gl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ir.copy(t):Ir.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ss.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(Ss,Ir,this.up):Dn.lookAt(Ir,Ss,this.up),this.quaternion.setFromRotationMatrix(Dn),i&&(Dn.extractRotation(i.matrixWorld),Fi.setFromRotationMatrix(Dn),this.quaternion.premultiply(Fi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(zl),Qi.child=t,this.dispatchEvent(Qi),Qi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(rA),Jo.child=t,this.dispatchEvent(Jo),Jo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Dn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(zl),Qi.child=t,this.dispatchEvent(Qi),Qi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,t,iA),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ss,sA,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(t.shapes,u)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(t.materials,this.material[c]));i.material=a}else i.material=s(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(s(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),A=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),A.length>0&&(n.nodes=A)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}de.DEFAULT_UP=new B(0,1,0);de.DEFAULT_MATRIX_AUTO_UPDATE=!0;de.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const An=new B,Ln=new B,Ko=new B,Pn=new B,ki=new B,Oi=new B,Hl=new B,jo=new B,Zo=new B,$o=new B,ta=new jt,ea=new jt,na=new jt;class en{constructor(t=new B,e=new B,n=new B){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),An.subVectors(t,e),i.cross(An);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(t,e,n,i,s){An.subVectors(i,e),Ln.subVectors(n,e),Ko.subVectors(t,e);const o=An.dot(An),a=An.dot(Ln),c=An.dot(Ko),l=Ln.dot(Ln),h=Ln.dot(Ko),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,A=(o*h-a*c)*d;return s.set(1-f-A,A,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(t,e,n,i,s,o,a,c){return this.getBarycoord(t,e,n,i,Pn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Pn.x),c.addScaledVector(o,Pn.y),c.addScaledVector(a,Pn.z),c)}static getInterpolatedAttribute(t,e,n,i,s,o){return ta.setScalar(0),ea.setScalar(0),na.setScalar(0),ta.fromBufferAttribute(t,e),ea.fromBufferAttribute(t,n),na.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(ta,s.x),o.addScaledVector(ea,s.y),o.addScaledVector(na,s.z),o}static isFrontFacing(t,e,n,i){return An.subVectors(n,e),Ln.subVectors(t,e),An.cross(Ln).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return An.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),An.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return en.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return en.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,s){return en.getInterpolation(t,this.a,this.b,this.c,e,n,i,s)}containsPoint(t){return en.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return en.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,s=this.c;let o,a;ki.subVectors(i,n),Oi.subVectors(s,n),jo.subVectors(t,n);const c=ki.dot(jo),l=Oi.dot(jo);if(c<=0&&l<=0)return e.copy(n);Zo.subVectors(t,i);const h=ki.dot(Zo),u=Oi.dot(Zo);if(h>=0&&u<=h)return e.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(ki,o);$o.subVectors(t,s);const f=ki.dot($o),A=Oi.dot($o);if(A>=0&&f<=A)return e.copy(s);const m=f*l-c*A;if(m<=0&&l>=0&&A<=0)return a=l/(l-A),e.copy(n).addScaledVector(Oi,a);const g=h*A-f*u;if(g<=0&&u-h>=0&&f-A>=0)return Hl.subVectors(s,i),a=(u-h)/(u-h+(f-A)),e.copy(i).addScaledVector(Hl,a);const p=1/(g+m+d);return o=m*p,a=d*p,e.copy(n).addScaledVector(ki,o).addScaledVector(Oi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$n={h:0,s:0,l:0},Cr={h:0,s:0,l:0};function ia(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class yt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Xt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=Xt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Xt.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=Xt.workingColorSpace){if(t=Vc(t,1),e=ve(e,0,1),n=ve(n,0,1),e===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+e):n+e-n*e,o=2*n-s;this.r=ia(o,s,t+1/3),this.g=ia(o,s,t),this.b=ia(o,s,t-1/3)}return Xt.toWorkingColorSpace(this,i),this}setStyle(t,e=pe){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=pe){const n=Bu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Wn(t.r),this.g=Wn(t.g),this.b=Wn(t.b),this}copyLinearToSRGB(t){return this.r=ss(t.r),this.g=ss(t.g),this.b=ss(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pe){return Xt.fromWorkingColorSpace(Re.copy(this),t),Math.round(ve(Re.r*255,0,255))*65536+Math.round(ve(Re.g*255,0,255))*256+Math.round(ve(Re.b*255,0,255))}getHexString(t=pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Xt.workingColorSpace){Xt.fromWorkingColorSpace(Re.copy(this),e);const n=Re.r,i=Re.g,s=Re.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-s)/u+(i<s?6:0);break;case i:c=(s-n)/u+2;break;case s:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Xt.workingColorSpace){return Xt.fromWorkingColorSpace(Re.copy(this),e),t.r=Re.r,t.g=Re.g,t.b=Re.b,t}getStyle(t=pe){Xt.fromWorkingColorSpace(Re.copy(this),t);const e=Re.r,n=Re.g,i=Re.b;return t!==pe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL($n),this.setHSL($n.h+t,$n.s+e,$n.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL($n),t.getHSL(Cr);const n=qs($n.h,Cr.h,e),i=qs($n.s,Cr.s,e),s=qs($n.l,Cr.l,e);return this.setHSL(n,i,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,s=t.elements;return this.r=s[0]*e+s[3]*n+s[6]*i,this.g=s[1]*e+s[4]*n+s[7]*i,this.b=s[2]*e+s[5]*n+s[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Re=new yt;yt.NAMES=Bu;let oA=0;class cn extends Bi{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:oA++}),this.uuid=on(),this.name="",this.blending=ns,this.side=qn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ga,this.blendDst=za,this.blendEquation=_i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Sl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ns&&(n.blending=this.blending),this.side!==qn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ga&&(n.blendSrc=this.blendSrc),this.blendDst!==za&&(n.blendDst=this.blendDst),this.blendEquation!==_i&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==os&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Sl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(e){const s=i(t.textures),o=i(t.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=e[s].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Hn extends cn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Mr=aA();function aA(){const r=new ArrayBuffer(4),t=new Float32Array(r),e=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){const l=c-127;l<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,i[c]=-l-1,i[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,i[c]=13,i[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}const s=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;(l&8388608)===0;)l<<=1,h-=8388608;l&=-8388609,h+=947912704,s[c]=l|h}for(let c=1024;c<2048;++c)s[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:t,uint32View:e,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:o,offsetTable:a}}function cA(r){Math.abs(r)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),r=ve(r,-65504,65504),Mr.floatView[0]=r;const t=Mr.uint32View[0],e=t>>23&511;return Mr.baseTable[e]+((t&8388607)>>Mr.shiftTable[e])}const lA={toHalfFloat:cA},Ee=new B,Sr=new tt;class fe{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=mc,this.updateRanges=[],this.gpuType=Le,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Sr.fromBufferAttribute(this,e),Sr.applyMatrix3(t),this.setXY(e,Sr.x,Sr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix3(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyMatrix4(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.applyNormalMatrix(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ee.fromBufferAttribute(this,e),Ee.transformDirection(t),this.setXYZ(e,Ee.x,Ee.y,Ee.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),i=se(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t*=this.itemSize,this.normalized&&(e=se(e,this.array),n=se(n,this.array),i=se(i,this.array),s=se(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==mc&&(t.usage=this.usage),t}}class Tu extends fe{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class bu extends fe{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Zt extends fe{constructor(t,e,n){super(new Float32Array(t),e,n)}}let hA=0;const $e=new Pt,sa=new de,Gi=new B,Je=new qe,ws=new qe,Me=new B;class Ae extends Bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hA++}),this.uuid=on(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Iu(t)?bu:Tu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Gt().getNormalMatrix(t);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return $e.makeRotationFromQuaternion(t),this.applyMatrix4($e),this}rotateX(t){return $e.makeRotationX(t),this.applyMatrix4($e),this}rotateY(t){return $e.makeRotationY(t),this.applyMatrix4($e),this}rotateZ(t){return $e.makeRotationZ(t),this.applyMatrix4($e),this}translate(t,e,n){return $e.makeTranslation(t,e,n),this.applyMatrix4($e),this}scale(t,e,n){return $e.makeScale(t,e,n),this.applyMatrix4($e),this}lookAt(t){return sa.lookAt(t),sa.updateMatrix(),this.applyMatrix4(sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,s=t.length;i<s;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(n,3))}else{for(let n=0,i=e.count;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qe);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const s=e[n];Je.setFromBufferAttribute(s),this.morphTargetsRelative?(Me.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Me),Me.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Me)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){const n=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let s=0,o=e.length;s<o;s++){const a=e[s];ws.setFromBufferAttribute(a),this.morphTargetsRelative?(Me.addVectors(Je.min,ws.min),Je.expandByPoint(Me),Me.addVectors(Je.max,ws.max),Je.expandByPoint(Me)):(Je.expandByPoint(ws.min),Je.expandByPoint(ws.max))}Je.getCenter(n);let i=0;for(let s=0,o=t.count;s<o;s++)Me.fromBufferAttribute(t,s),i=Math.max(i,n.distanceToSquared(Me));if(e)for(let s=0,o=e.length;s<o;s++){const a=e[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Me.fromBufferAttribute(a,l),c&&(Gi.fromBufferAttribute(t,l),Me.add(Gi)),i=Math.max(i,n.distanceToSquared(Me))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new fe(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let b=0;b<n.count;b++)a[b]=new B,c[b]=new B;const l=new B,h=new B,u=new B,d=new tt,f=new tt,A=new tt,m=new B,g=new B;function p(b,I,v){l.fromBufferAttribute(n,b),h.fromBufferAttribute(n,I),u.fromBufferAttribute(n,v),d.fromBufferAttribute(s,b),f.fromBufferAttribute(s,I),A.fromBufferAttribute(s,v),h.sub(l),u.sub(l),f.sub(d),A.sub(d);const D=1/(f.x*A.y-A.x*f.y);isFinite(D)&&(m.copy(h).multiplyScalar(A.y).addScaledVector(u,-f.y).multiplyScalar(D),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-A.x).multiplyScalar(D),a[b].add(m),a[I].add(m),a[v].add(m),c[b].add(g),c[I].add(g),c[v].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let b=0,I=x.length;b<I;++b){const v=x[b],D=v.start,Q=v.count;for(let N=D,z=D+Q;N<z;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const E=new B,_=new B,T=new B,S=new B;function M(b){T.fromBufferAttribute(i,b),S.copy(T);const I=a[b];E.copy(I),E.sub(T.multiplyScalar(T.dot(I))).normalize(),_.crossVectors(S,I);const D=_.dot(c[b])<0?-1:1;o.setXYZW(b,E.x,E.y,E.z,D)}for(let b=0,I=x.length;b<I;++b){const v=x[b],D=v.start,Q=v.count;for(let N=D,z=D+Q;N<z;N+=3)M(t.getX(N+0)),M(t.getX(N+1)),M(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new fe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new B,s=new B,o=new B,a=new B,c=new B,l=new B,h=new B,u=new B;if(t)for(let d=0,f=t.count;d<f;d+=3){const A=t.getX(d+0),m=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,A),s.fromBufferAttribute(e,m),o.fromBufferAttribute(e,g),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,A),c.fromBufferAttribute(n,m),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(A,a.x,a.y,a.z),n.setXYZ(m,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Me.fromBufferAttribute(t,e),Me.normalize(),t.setXYZ(e,Me.x,Me.y,Me.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,A=0;for(let m=0,g=c.length;m<g;m++){a.isInterleavedBufferAttribute?f=c[m]*a.data.stride+a.offset:f=c[m]*h;for(let p=0;p<h;p++)d[A++]=l[f++]}return new fe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ae,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,s=!0)}s&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const s=t.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vl=new Pt,ui=new To,wr=new vn,Wl=new B,Br=new B,Tr=new B,br=new B,ra=new B,Rr=new B,ql=new B,Dr=new B;class ue extends de{constructor(t=new Ae,e=new Hn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(s&&a){Rr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(ra.fromBufferAttribute(u,t),o?Rr.addScaledVector(ra,h):Rr.addScaledVector(ra.sub(e),h))}e.add(Rr)}return e}raycast(t,e){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(s),ui.copy(t.ray).recast(t.near),!(wr.containsPoint(ui.origin)===!1&&(ui.intersectSphere(wr,Wl)===null||ui.origin.distanceToSquared(Wl)>(t.far-t.near)**2))&&(Vl.copy(s).invert(),ui.copy(t.ray).applyMatrix4(Vl),!(n.boundingBox!==null&&ui.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ui)))}_computeIntersections(t,e,n){let i;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let A=0,m=d.length;A<m;A++){const g=d[A],p=o[g.materialIndex],x=Math.max(g.start,f.start),E=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let _=x,T=E;_<T;_+=3){const S=a.getX(_),M=a.getX(_+1),b=a.getX(_+2);i=Lr(this,p,t,n,l,h,u,S,M,b),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const A=Math.max(0,f.start),m=Math.min(a.count,f.start+f.count);for(let g=A,p=m;g<p;g+=3){const x=a.getX(g),E=a.getX(g+1),_=a.getX(g+2);i=Lr(this,o,t,n,l,h,u,x,E,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let A=0,m=d.length;A<m;A++){const g=d[A],p=o[g.materialIndex],x=Math.max(g.start,f.start),E=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let _=x,T=E;_<T;_+=3){const S=_,M=_+1,b=_+2;i=Lr(this,p,t,n,l,h,u,S,M,b),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const A=Math.max(0,f.start),m=Math.min(c.count,f.start+f.count);for(let g=A,p=m;g<p;g+=3){const x=g,E=g+1,_=g+2;i=Lr(this,o,t,n,l,h,u,x,E,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function uA(r,t,e,n,i,s,o,a){let c;if(t.side===Ge?c=n.intersectTriangle(o,s,i,!0,a):c=n.intersectTriangle(i,s,o,t.side===qn,a),c===null)return null;Dr.copy(a),Dr.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(Dr);return l<e.near||l>e.far?null:{distance:l,point:Dr.clone(),object:r}}function Lr(r,t,e,n,i,s,o,a,c,l){r.getVertexPosition(a,Br),r.getVertexPosition(c,Tr),r.getVertexPosition(l,br);const h=uA(r,t,e,n,Br,Tr,br,ql);if(h){const u=new B;en.getBarycoord(ql,Br,Tr,br,u),i&&(h.uv=en.getInterpolatedAttribute(i,a,c,l,u,new tt)),s&&(h.uv1=en.getInterpolatedAttribute(s,a,c,l,u,new tt)),o&&(h.normal=en.getInterpolatedAttribute(o,a,c,l,u,new B),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new B,materialIndex:0};en.getNormal(Br,Tr,br,d.normal),h.face=d,h.barycoord=u}return h}class ke extends Ae{constructor(t=1,e=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;A("z","y","x",-1,-1,n,e,t,o,s,0),A("z","y","x",1,-1,n,e,-t,o,s,1),A("x","z","y",1,1,t,n,e,i,o,2),A("x","z","y",1,-1,t,n,-e,i,o,3),A("x","y","z",1,-1,t,e,n,i,s,4),A("x","y","z",-1,-1,t,e,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(u,2));function A(m,g,p,x,E,_,T,S,M,b,I){const v=_/M,D=T/b,Q=_/2,N=T/2,z=S/2,q=M+1,H=b+1;let W=0,O=0;const it=new B;for(let lt=0;lt<H;lt++){const At=lt*D-N;for(let Rt=0;Rt<q;Rt++){const Vt=Rt*v-Q;it[m]=Vt*x,it[g]=At*E,it[p]=z,l.push(it.x,it.y,it.z),it[m]=0,it[g]=0,it[p]=S>0?1:-1,h.push(it.x,it.y,it.z),u.push(Rt/M),u.push(1-lt/b),W+=1}}for(let lt=0;lt<b;lt++)for(let At=0;At<M;At++){const Rt=d+At+q*lt,Vt=d+At+q*(lt+1),Y=d+(At+1)+q*(lt+1),st=d+(At+1)+q*lt;c.push(Rt,Vt,st),c.push(Vt,Y,st),O+=6}a.addGroup(f,O,I),f+=O,d+=W}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ke(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function us(r){const t={};for(const e in r){t[e]={};for(const n in r[e]){const i=r[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Qe(r){const t={};for(let e=0;e<r.length;e++){const n=us(r[e]);for(const i in n)t[i]=n[i]}return t}function dA(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function Ru(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Xt.workingColorSpace}const Du={clone:us,merge:Qe};var fA=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,AA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class xn extends cn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=fA,this.fragmentShader=AA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=us(t.uniforms),this.uniformsGroups=dA(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Lu extends de{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pt,this.projectionMatrix=new Pt,this.projectionMatrixInverse=new Pt,this.coordinateSystem=zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ti=new B,Xl=new tt,Yl=new tt;class Oe extends Lu{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=hs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ws*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return hs*2*Math.atan(Math.tan(Ws*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ti.x,ti.y).multiplyScalar(-t/ti.z),ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ti.x,ti.y).multiplyScalar(-t/ti.z)}getViewSize(t,e){return this.getViewBounds(t,Xl,Yl),e.subVectors(Yl,Xl)}setViewOffset(t,e,n,i,s,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ws*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(s+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const zi=-90,Hi=1;class pA extends de{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Oe(zi,Hi,t,e);i.layers=this.layers,this.add(i);const s=new Oe(zi,Hi,t,e);s.layers=this.layers,this.add(s);const o=new Oe(zi,Hi,t,e);o.layers=this.layers,this.add(o);const a=new Oe(zi,Hi,t,e);a.layers=this.layers,this.add(a);const c=new Oe(zi,Hi,t,e);c.layers=this.layers,this.add(c);const l=new Oe(zi,Hi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,s,o,a,c]=e;for(const l of e)this.remove(l);if(t===zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===mo)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),A=t.xr.enabled;t.xr.enabled=!1;const m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,s),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=m,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=A,n.texture.needsPMREMUpdate=!0}}class Pu extends xe{constructor(t,e,n,i,s,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:yi,super(t,e,n,i,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class gA extends ai{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Pu(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:De}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new ke(5,5,5),s=new xn({name:"CubemapFromEquirect",uniforms:us(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ge,blending:ri});s.uniforms.tEquirect.value=e;const o=new ue(i,s),a=e.minFilter;return e.minFilter===mn&&(e.minFilter=De),new pA(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const s=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(s)}}const oa=new B,mA=new B,_A=new Gt;class gi{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=oa.subVectors(n,e).cross(mA.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(oa),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:e.copy(t.start).addScaledVector(n,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||_A.getNormalMatrix(t),i=this.coplanarPoint(oa).applyMatrix4(t),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const di=new vn,Pr=new B;class bo{constructor(t=new gi,e=new gi,n=new gi,i=new gi,s=new gi,o=new gi){this.planes=[t,e,n,i,s,o]}set(t,e,n,i,s,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=zn){const n=this.planes,i=t.elements,s=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],A=i[9],m=i[10],g=i[11],p=i[12],x=i[13],E=i[14],_=i[15];if(n[0].setComponents(c-s,d-l,g-f,_-p).normalize(),n[1].setComponents(c+s,d+l,g+f,_+p).normalize(),n[2].setComponents(c+o,d+h,g+A,_+x).normalize(),n[3].setComponents(c-o,d-h,g-A,_-x).normalize(),n[4].setComponents(c-a,d-u,g-m,_-E).normalize(),e===zn)n[5].setComponents(c+a,d+u,g+m,_+E).normalize();else if(e===mo)n[5].setComponents(a,u,m,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(t){return di.center.set(0,0,0),di.radius=.7071067811865476,di.applyMatrix4(t.matrixWorld),this.intersectsSphere(di)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Pr.x=i.normal.x>0?t.max.x:t.min.x,Pr.y=i.normal.y>0?t.max.y:t.min.y,Pr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Pr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Uu(){let r=null,t=!1,e=null,n=null;function i(s,o){e(s,o),n=r.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=r.requestAnimationFrame(i),t=!0)},stop:function(){r.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function EA(r){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=r.createBuffer();r.bindBuffer(c,d),r.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=r.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=r.SHORT;else if(l instanceof Uint32Array)f=r.UNSIGNED_INT;else if(l instanceof Int32Array)f=r.INT;else if(l instanceof Int8Array)f=r.BYTE;else if(l instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(r.bindBuffer(l,a),u.length===0)r.bufferSubData(l,0,h);else{u.sort((f,A)=>f.start-A.start);let d=0;for(let f=1;f<u.length;f++){const A=u[d],m=u[f];m.start<=A.start+A.count+1?A.count=Math.max(A.count,m.start+m.count-A.start):(++d,u[d]=m)}u.length=d+1;for(let f=0,A=u.length;f<A;f++){const m=u[f];r.bufferSubData(l,m.start*h.BYTES_PER_ELEMENT,h,m.start,m.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(r.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:s,update:o}}class Mi extends Ae{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const s=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,d=e/c,f=[],A=[],m=[],g=[];for(let p=0;p<h;p++){const x=p*d-o;for(let E=0;E<l;E++){const _=E*u-s;A.push(_,-x,0),m.push(0,0,1),g.push(E/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<a;x++){const E=x+l*p,_=x+l*(p+1),T=x+1+l*(p+1),S=x+1+l*p;f.push(E,_,S),f.push(_,T,S)}this.setIndex(f),this.setAttribute("position",new Zt(A,3)),this.setAttribute("normal",new Zt(m,3)),this.setAttribute("uv",new Zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mi(t.width,t.height,t.widthSegments,t.heightSegments)}}var xA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vA=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,yA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,IA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,CA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,MA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,SA=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,wA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,BA=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,TA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,RA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,DA=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,LA=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,PA=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,UA=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,NA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,FA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,QA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,kA=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,OA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,GA=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zA=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,HA=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,VA=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,WA=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,qA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,XA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,YA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,JA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,KA="gl_FragColor = linearToOutputTexel( gl_FragColor );",jA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ZA=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,$A=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,tp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,ep=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,np=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ip=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,sp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,rp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,op=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ap=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,cp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,hp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,up=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,dp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,fp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ap=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,pp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,gp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,mp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,_p=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ep=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,xp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,vp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ip=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,wp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Tp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Dp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Up=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Np=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Qp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,kp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Op=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Hp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,qp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Xp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Yp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Jp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Kp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,jp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$p=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,tg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,eg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,ng=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ig=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,sg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,rg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,og=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ag=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,cg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,hg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ug=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,fg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Ag=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_g=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Eg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,wg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Bg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Dg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Pg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ug=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ng=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Qg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Og=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Gg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ht={alphahash_fragment:xA,alphahash_pars_fragment:vA,alphamap_fragment:yA,alphamap_pars_fragment:IA,alphatest_fragment:CA,alphatest_pars_fragment:MA,aomap_fragment:SA,aomap_pars_fragment:wA,batching_pars_vertex:BA,batching_vertex:TA,begin_vertex:bA,beginnormal_vertex:RA,bsdfs:DA,iridescence_fragment:LA,bumpmap_pars_fragment:PA,clipping_planes_fragment:UA,clipping_planes_pars_fragment:NA,clipping_planes_pars_vertex:FA,clipping_planes_vertex:QA,color_fragment:kA,color_pars_fragment:OA,color_pars_vertex:GA,color_vertex:zA,common:HA,cube_uv_reflection_fragment:VA,defaultnormal_vertex:WA,displacementmap_pars_vertex:qA,displacementmap_vertex:XA,emissivemap_fragment:YA,emissivemap_pars_fragment:JA,colorspace_fragment:KA,colorspace_pars_fragment:jA,envmap_fragment:ZA,envmap_common_pars_fragment:$A,envmap_pars_fragment:tp,envmap_pars_vertex:ep,envmap_physical_pars_fragment:dp,envmap_vertex:np,fog_vertex:ip,fog_pars_vertex:sp,fog_fragment:rp,fog_pars_fragment:op,gradientmap_pars_fragment:ap,lightmap_pars_fragment:cp,lights_lambert_fragment:lp,lights_lambert_pars_fragment:hp,lights_pars_begin:up,lights_toon_fragment:fp,lights_toon_pars_fragment:Ap,lights_phong_fragment:pp,lights_phong_pars_fragment:gp,lights_physical_fragment:mp,lights_physical_pars_fragment:_p,lights_fragment_begin:Ep,lights_fragment_maps:xp,lights_fragment_end:vp,logdepthbuf_fragment:yp,logdepthbuf_pars_fragment:Ip,logdepthbuf_pars_vertex:Cp,logdepthbuf_vertex:Mp,map_fragment:Sp,map_pars_fragment:wp,map_particle_fragment:Bp,map_particle_pars_fragment:Tp,metalnessmap_fragment:bp,metalnessmap_pars_fragment:Rp,morphinstance_vertex:Dp,morphcolor_vertex:Lp,morphnormal_vertex:Pp,morphtarget_pars_vertex:Up,morphtarget_vertex:Np,normal_fragment_begin:Fp,normal_fragment_maps:Qp,normal_pars_fragment:kp,normal_pars_vertex:Op,normal_vertex:Gp,normalmap_pars_fragment:zp,clearcoat_normal_fragment_begin:Hp,clearcoat_normal_fragment_maps:Vp,clearcoat_pars_fragment:Wp,iridescence_pars_fragment:qp,opaque_fragment:Xp,packing:Yp,premultiplied_alpha_fragment:Jp,project_vertex:Kp,dithering_fragment:jp,dithering_pars_fragment:Zp,roughnessmap_fragment:$p,roughnessmap_pars_fragment:tg,shadowmap_pars_fragment:eg,shadowmap_pars_vertex:ng,shadowmap_vertex:ig,shadowmask_pars_fragment:sg,skinbase_vertex:rg,skinning_pars_vertex:og,skinning_vertex:ag,skinnormal_vertex:cg,specularmap_fragment:lg,specularmap_pars_fragment:hg,tonemapping_fragment:ug,tonemapping_pars_fragment:dg,transmission_fragment:fg,transmission_pars_fragment:Ag,uv_pars_fragment:pg,uv_pars_vertex:gg,uv_vertex:mg,worldpos_vertex:_g,background_vert:Eg,background_frag:xg,backgroundCube_vert:vg,backgroundCube_frag:yg,cube_vert:Ig,cube_frag:Cg,depth_vert:Mg,depth_frag:Sg,distanceRGBA_vert:wg,distanceRGBA_frag:Bg,equirect_vert:Tg,equirect_frag:bg,linedashed_vert:Rg,linedashed_frag:Dg,meshbasic_vert:Lg,meshbasic_frag:Pg,meshlambert_vert:Ug,meshlambert_frag:Ng,meshmatcap_vert:Fg,meshmatcap_frag:Qg,meshnormal_vert:kg,meshnormal_frag:Og,meshphong_vert:Gg,meshphong_frag:zg,meshphysical_vert:Hg,meshphysical_frag:Vg,meshtoon_vert:Wg,meshtoon_frag:qg,points_vert:Xg,points_frag:Yg,shadow_vert:Jg,shadow_frag:Kg,sprite_vert:jg,sprite_frag:Zg},ct={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},envMapRotation:{value:new Gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}}},In={basic:{uniforms:Qe([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:Qe([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new yt(0)}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:Qe([ct.common,ct.specularmap,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,ct.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:Qe([ct.common,ct.envmap,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.roughnessmap,ct.metalnessmap,ct.fog,ct.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:Qe([ct.common,ct.aomap,ct.lightmap,ct.emissivemap,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.gradientmap,ct.fog,ct.lights,{emissive:{value:new yt(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:Qe([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,ct.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:Qe([ct.points,ct.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:Qe([ct.common,ct.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:Qe([ct.common,ct.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:Qe([ct.common,ct.bumpmap,ct.normalmap,ct.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:Qe([ct.sprite,ct.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Gt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distanceRGBA:{uniforms:Qe([ct.common,ct.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distanceRGBA_vert,fragmentShader:Ht.distanceRGBA_frag},shadow:{uniforms:Qe([ct.lights,ct.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};In.physical={uniforms:Qe([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt},anisotropyVector:{value:new tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Gt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const Ur={r:0,b:0,g:0},fi=new En,$g=new Pt;function tm(r,t,e,n,i,s,o){const a=new yt(0);let c=s===!0?0:1,l,h,u=null,d=0,f=null;function A(x){let E=x.isScene===!0?x.background:null;return E&&E.isTexture&&(E=(x.backgroundBlurriness>0?e:t).get(E)),E}function m(x){let E=!1;const _=A(x);_===null?p(a,c):_&&_.isColor&&(p(_,1),E=!0);const T=r.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(x,E){const _=A(E);_&&(_.isCubeTexture||_.mapping===wo)?(h===void 0&&(h=new ue(new ke(1,1,1),new xn({name:"BackgroundCubeMaterial",uniforms:us(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:Ge,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,S,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),fi.copy(E.backgroundRotation),fi.x*=-1,fi.y*=-1,fi.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(fi.y*=-1,fi.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($g.makeRotationFromEuler(fi)),h.material.toneMapped=Xt.getTransfer(_.colorSpace)!==re,(u!==_||d!==_.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=r.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ue(new Mi(2,2),new xn({name:"BackgroundMaterial",uniforms:us(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:qn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Xt.getTransfer(_.colorSpace)!==re,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==r.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,f=r.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function p(x,E){x.getRGB(Ur,Ru(r)),n.buffers.color.setClear(Ur.r,Ur.g,Ur.b,E,o)}return{getClearColor:function(){return a},setClearColor:function(x,E=1){a.set(x),c=E,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(x){c=x,p(a,c)},render:m,addToRenderList:g}}function em(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=d(null);let s=i,o=!1;function a(v,D,Q,N,z){let q=!1;const H=u(N,Q,D);s!==H&&(s=H,l(s.object)),q=f(v,N,Q,z),q&&A(v,N,Q,z),z!==null&&t.update(z,r.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,_(v,D,Q,N),z!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return r.createVertexArray()}function l(v){return r.bindVertexArray(v)}function h(v){return r.deleteVertexArray(v)}function u(v,D,Q){const N=Q.wireframe===!0;let z=n[v.id];z===void 0&&(z={},n[v.id]=z);let q=z[D.id];q===void 0&&(q={},z[D.id]=q);let H=q[N];return H===void 0&&(H=d(c()),q[N]=H),H}function d(v){const D=[],Q=[],N=[];for(let z=0;z<e;z++)D[z]=0,Q[z]=0,N[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:Q,attributeDivisors:N,object:v,attributes:{},index:null}}function f(v,D,Q,N){const z=s.attributes,q=D.attributes;let H=0;const W=Q.getAttributes();for(const O in W)if(W[O].location>=0){const lt=z[O];let At=q[O];if(At===void 0&&(O==="instanceMatrix"&&v.instanceMatrix&&(At=v.instanceMatrix),O==="instanceColor"&&v.instanceColor&&(At=v.instanceColor)),lt===void 0||lt.attribute!==At||At&&lt.data!==At.data)return!0;H++}return s.attributesNum!==H||s.index!==N}function A(v,D,Q,N){const z={},q=D.attributes;let H=0;const W=Q.getAttributes();for(const O in W)if(W[O].location>=0){let lt=q[O];lt===void 0&&(O==="instanceMatrix"&&v.instanceMatrix&&(lt=v.instanceMatrix),O==="instanceColor"&&v.instanceColor&&(lt=v.instanceColor));const At={};At.attribute=lt,lt&&lt.data&&(At.data=lt.data),z[O]=At,H++}s.attributes=z,s.attributesNum=H,s.index=N}function m(){const v=s.newAttributes;for(let D=0,Q=v.length;D<Q;D++)v[D]=0}function g(v){p(v,0)}function p(v,D){const Q=s.newAttributes,N=s.enabledAttributes,z=s.attributeDivisors;Q[v]=1,N[v]===0&&(r.enableVertexAttribArray(v),N[v]=1),z[v]!==D&&(r.vertexAttribDivisor(v,D),z[v]=D)}function x(){const v=s.newAttributes,D=s.enabledAttributes;for(let Q=0,N=D.length;Q<N;Q++)D[Q]!==v[Q]&&(r.disableVertexAttribArray(Q),D[Q]=0)}function E(v,D,Q,N,z,q,H){H===!0?r.vertexAttribIPointer(v,D,Q,z,q):r.vertexAttribPointer(v,D,Q,N,z,q)}function _(v,D,Q,N){m();const z=N.attributes,q=Q.getAttributes(),H=D.defaultAttributeValues;for(const W in q){const O=q[W];if(O.location>=0){let it=z[W];if(it===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(it=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(it=v.instanceColor)),it!==void 0){const lt=it.normalized,At=it.itemSize,Rt=t.get(it);if(Rt===void 0)continue;const Vt=Rt.buffer,Y=Rt.type,st=Rt.bytesPerElement,vt=Y===r.INT||Y===r.UNSIGNED_INT||it.gpuType===Nc;if(it.isInterleavedBufferAttribute){const ot=it.data,Tt=ot.stride,Ft=it.offset;if(ot.isInstancedInterleavedBuffer){for(let Ut=0;Ut<O.locationSize;Ut++)p(O.location+Ut,ot.meshPerAttribute);v.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let Ut=0;Ut<O.locationSize;Ut++)g(O.location+Ut);r.bindBuffer(r.ARRAY_BUFFER,Vt);for(let Ut=0;Ut<O.locationSize;Ut++)E(O.location+Ut,At/O.locationSize,Y,lt,Tt*st,(Ft+At/O.locationSize*Ut)*st,vt)}else{if(it.isInstancedBufferAttribute){for(let ot=0;ot<O.locationSize;ot++)p(O.location+ot,it.meshPerAttribute);v.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let ot=0;ot<O.locationSize;ot++)g(O.location+ot);r.bindBuffer(r.ARRAY_BUFFER,Vt);for(let ot=0;ot<O.locationSize;ot++)E(O.location+ot,At/O.locationSize,Y,lt,At*st,At/O.locationSize*ot*st,vt)}}else if(H!==void 0){const lt=H[W];if(lt!==void 0)switch(lt.length){case 2:r.vertexAttrib2fv(O.location,lt);break;case 3:r.vertexAttrib3fv(O.location,lt);break;case 4:r.vertexAttrib4fv(O.location,lt);break;default:r.vertexAttrib1fv(O.location,lt)}}}}x()}function T(){b();for(const v in n){const D=n[v];for(const Q in D){const N=D[Q];for(const z in N)h(N[z].object),delete N[z];delete D[Q]}delete n[v]}}function S(v){if(n[v.id]===void 0)return;const D=n[v.id];for(const Q in D){const N=D[Q];for(const z in N)h(N[z].object),delete N[z];delete D[Q]}delete n[v.id]}function M(v){for(const D in n){const Q=n[D];if(Q[v.id]===void 0)continue;const N=Q[v.id];for(const z in N)h(N[z].object),delete N[z];delete Q[v.id]}}function b(){I(),o=!0,s!==i&&(s=i,l(s.object))}function I(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:b,resetDefaultState:I,dispose:T,releaseStatesOfGeometry:S,releaseStatesOfProgram:M,initAttributes:m,enableAttribute:g,disableUnusedAttributes:x}}function nm(r,t,e){let n;function i(l){n=l}function s(l,h){r.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(r.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let A=0;A<u;A++)f+=h[A];e.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let A=0;A<l.length;A++)o(l[A],h[A],d[A]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let A=0;for(let m=0;m<u;m++)A+=h[m]*d[m];e.update(A,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function im(r,t,e,n){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const M=t.get("EXT_texture_filter_anisotropic");i=r.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(M){return!(M!==ye&&n.convert(M)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(M){const b=M===sn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(M!==Se&&n.convert(M)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&M!==Le&&!b)}function c(M){if(M==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),A=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),x=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),E=r.getParameter(r.MAX_VARYING_VECTORS),_=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),T=A>0,S=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:A,maxTextureSize:m,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:x,maxVaryings:E,maxFragmentUniforms:_,vertexTextures:T,maxSamples:S}}function sm(r){const t=this;let e=null,n=0,i=!1,s=!1;const o=new gi,a=new Gt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const A=u.clippingPlanes,m=u.clipIntersection,g=u.clipShadows,p=r.get(u);if(!i||A===null||A.length===0||s&&!g)s?h(null):l();else{const x=s?0:n,E=x*4;let _=p.clippingState||null;c.value=_,_=h(A,d,E,f);for(let T=0;T!==E;++T)_[T]=e[T];p.clippingState=_,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,A){const m=u!==null?u.length:0;let g=null;if(m!==0){if(g=c.value,A!==!0||g===null){const p=f+m*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<p)&&(g=new Float32Array(p));for(let E=0,_=f;E!==m;++E,_+=4)o.copy(u[E]).applyMatrix4(x,a),o.normal.toArray(g,_),g[_+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=m,t.numIntersection=0,g}}function rm(r){let t=new WeakMap;function e(o,a){return a===Ka?o.mapping=yi:a===ja&&(o.mapping=as),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ka||a===ja)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new gA(c.height);return l.fromEquirectangularTexture(r,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function s(){t=new WeakMap}return{get:n,dispose:s}}class Ro extends Lu{constructor(t=-1,e=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const $i=4,Jl=[.125,.215,.35,.446,.526,.582],Ei=20,aa=new Ro,Kl=new yt;let ca=null,la=0,ha=0,ua=!1;const mi=(1+Math.sqrt(5))/2,Vi=1/mi,jl=[new B(-mi,Vi,0),new B(mi,Vi,0),new B(-Vi,0,mi),new B(Vi,0,mi),new B(0,mi,-Vi),new B(0,mi,Vi),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class Zl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){ca=this._renderer.getRenderTarget(),la=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(t,n,i,s),e>0&&this._blur(s,0,0,e),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=eh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=th(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ca,la,ha),this._renderer.xr.enabled=ua,t.scissorTest=!1,Nr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===yi||t.mapping===as?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ca=this._renderer.getRenderTarget(),la=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),ua=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:De,minFilter:De,generateMipmaps:!1,type:sn,format:ye,colorSpace:Pe,depthBuffer:!1},i=$l(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$l(t,e,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=om(s)),this._blurMaterial=am(s,t,e)}return i}_compileMaterial(t){const e=new ue(this._lodPlanes[0],t);this._renderer.compile(e,aa)}_sceneToCubeUV(t,e,n,i){const a=new Oe(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Kl),h.toneMapping=oi,h.autoClear=!1;const f=new Hn({name:"PMREM.Background",side:Ge,depthWrite:!1,depthTest:!1}),A=new ue(new ke,f);let m=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,m=!0):(f.color.copy(Kl),m=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):x===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const E=this._cubeSize;Nr(i,x*E,p>2?E:0,E,E),h.setRenderTarget(i),m&&h.render(A,a),h.render(t,a)}A.geometry.dispose(),A.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===yi||t.mapping===as;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=eh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=th());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new ue(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=t;const c=this._cubeSize;Nr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,aa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=jl[(i-s-1)%jl.length];this._blur(t,s-1,s,o,a)}e.autoClear=n}_blur(t,e,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",s),this._halfBlur(o,t,n,n,i,"longitudinal",s)}_halfBlur(t,e,n,i,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ue(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,A=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ei-1),m=s/A,g=isFinite(s)?1+Math.floor(h*m):Ei;g>Ei&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ei}`);const p=[];let x=0;for(let M=0;M<Ei;++M){const b=M/m,I=Math.exp(-b*b/2);p.push(I),M===0?x+=I:M<g&&(x+=2*I)}for(let M=0;M<p.length;M++)p[M]=p[M]/x;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:E}=this;d.dTheta.value=A,d.mipInt.value=E-n;const _=this._sizeLods[i],T=3*_*(i>E-$i?i-E+$i:0),S=4*(this._cubeSize-_);Nr(e,T,S,3*_,2*_),c.setRenderTarget(e),c.render(u,aa)}}function om(r){const t=[],e=[],n=[];let i=r;const s=r-$i+1+Jl.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>r-$i?c=Jl[o-r+$i-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,A=6,m=3,g=2,p=1,x=new Float32Array(m*A*f),E=new Float32Array(g*A*f),_=new Float32Array(p*A*f);for(let S=0;S<f;S++){const M=S%3*2/3-1,b=S>2?0:-1,I=[M,b,0,M+2/3,b,0,M+2/3,b+1,0,M,b,0,M+2/3,b+1,0,M,b+1,0];x.set(I,m*A*S),E.set(d,g*A*S);const v=[S,S,S,S,S,S];_.set(v,p*A*S)}const T=new Ae;T.setAttribute("position",new fe(x,m)),T.setAttribute("uv",new fe(E,g)),T.setAttribute("faceIndex",new fe(_,p)),t.push(T),i>$i&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function $l(r,t,e){const n=new ai(r,t,e);return n.texture.mapping=wo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Nr(r,t,e,n,i){r.viewport.set(t,e,n,i),r.scissor.set(t,e,n,i)}function am(r,t,e){const n=new Float32Array(Ei),i=new B(0,1,0);return new xn({name:"SphericalGaussianBlur",defines:{n:Ei,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Wc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function th(){return new xn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function eh(){return new xn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ri,depthTest:!1,depthWrite:!1})}function Wc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function cm(r){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ka||c===ja,h=c===yi||c===as;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Zl(r)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Zl(r)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function lm(r){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Os("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function hm(r,t,e,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const A in d.attributes)t.remove(d.attributes[A]);for(const A in d.morphAttributes){const m=d.morphAttributes[A];for(let g=0,p=m.length;g<p;g++)t.remove(m[g])}d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const A in d)t.update(d[A],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const A in f){const m=f[A];for(let g=0,p=m.length;g<p;g++)t.update(m[g],r.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,A=u.attributes.position;let m=0;if(f!==null){const x=f.array;m=f.version;for(let E=0,_=x.length;E<_;E+=3){const T=x[E+0],S=x[E+1],M=x[E+2];d.push(T,S,S,M,M,T)}}else if(A!==void 0){const x=A.array;m=A.version;for(let E=0,_=x.length/3-1;E<_;E+=3){const T=E+0,S=E+1,M=E+2;d.push(T,S,S,M,M,T)}}else return;const g=new(Iu(d)?bu:Tu)(d,1);g.version=m;const p=s.get(u);p&&t.remove(p),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function um(r,t,e){let n;function i(d){n=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function c(d,f){r.drawElements(n,f,s,d*o),e.update(f,n,1)}function l(d,f,A){A!==0&&(r.drawElementsInstanced(n,f,s,d*o,A),e.update(f,n,A))}function h(d,f,A){if(A===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,s,d,0,A);let g=0;for(let p=0;p<A;p++)g+=f[p];e.update(g,n,1)}function u(d,f,A,m){if(A===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],m[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,s,d,0,m,0,A);let p=0;for(let x=0;x<A;x++)p+=f[x]*m[x];e.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function dm(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(e.calls++,o){case r.TRIANGLES:e.triangles+=a*(s/3);break;case r.LINES:e.lines+=a*(s/2);break;case r.LINE_STRIP:e.lines+=a*(s-1);break;case r.LINE_LOOP:e.lines+=a*s;break;case r.POINTS:e.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function fm(r,t,e){const n=new WeakMap,i=new jt;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let v=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",v)};var f=v;d!==void 0&&d.texture.dispose();const A=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,g=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],x=a.morphAttributes.normal||[],E=a.morphAttributes.color||[];let _=0;A===!0&&(_=1),m===!0&&(_=2),g===!0&&(_=3);let T=a.attributes.position.count*_,S=1;T>t.maxTextureSize&&(S=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const M=new Float32Array(T*S*4*u),b=new Mu(M,T,S,u);b.type=Le,b.needsUpdate=!0;const I=_*4;for(let D=0;D<u;D++){const Q=p[D],N=x[D],z=E[D],q=T*S*4*D;for(let H=0;H<Q.count;H++){const W=H*I;A===!0&&(i.fromBufferAttribute(Q,H),M[q+W+0]=i.x,M[q+W+1]=i.y,M[q+W+2]=i.z,M[q+W+3]=0),m===!0&&(i.fromBufferAttribute(N,H),M[q+W+4]=i.x,M[q+W+5]=i.y,M[q+W+6]=i.z,M[q+W+7]=0),g===!0&&(i.fromBufferAttribute(z,H),M[q+W+8]=i.x,M[q+W+9]=i.y,M[q+W+10]=i.z,M[q+W+11]=z.itemSize===4?i.w:1)}}d={count:u,texture:b,size:new tt(T,S)},n.set(a,d),a.addEventListener("dispose",v)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",o.morphTexture,e);else{let A=0;for(let g=0;g<l.length;g++)A+=l[g];const m=a.morphTargetsRelative?1:1-A;c.getUniforms().setValue(r,"morphTargetBaseInfluence",m),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Am(r,t,e,n){let i=new WeakMap;function s(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,r.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,r.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:s,dispose:o}}class Nu extends xe{constructor(t,e,n,i,s,o,a,c,l,h=is){if(h!==is&&h!==ls)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===is&&(n=Ci),n===void 0&&h===ls&&(n=cs),super(null,i,s,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ze,this.minFilter=c!==void 0?c:ze,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Fu=new xe,nh=new Nu(1,1),Qu=new Mu,ku=new Su,Ou=new Pu,ih=[],sh=[],rh=new Float32Array(16),oh=new Float32Array(9),ah=new Float32Array(4);function _s(r,t,e){const n=r[0];if(n<=0||n>0)return r;const i=t*e;let s=ih[i];if(s===void 0&&(s=new Float32Array(i),ih[i]=s),t!==0){n.toArray(s,0);for(let o=1,a=0;o!==t;++o)a+=e,r[o].toArray(s,a)}return s}function Ie(r,t){if(r.length!==t.length)return!1;for(let e=0,n=r.length;e<n;e++)if(r[e]!==t[e])return!1;return!0}function Ce(r,t){for(let e=0,n=t.length;e<n;e++)r[e]=t[e]}function Do(r,t){let e=sh[t];e===void 0&&(e=new Int32Array(t),sh[t]=e);for(let n=0;n!==t;++n)e[n]=r.allocateTextureUnit();return e}function pm(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function gm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;r.uniform2fv(this.addr,t),Ce(e,t)}}function mm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ie(e,t))return;r.uniform3fv(this.addr,t),Ce(e,t)}}function _m(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;r.uniform4fv(this.addr,t),Ce(e,t)}}function Em(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Ie(e,n))return;ah.set(n),r.uniformMatrix2fv(this.addr,!1,ah),Ce(e,n)}}function xm(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Ie(e,n))return;oh.set(n),r.uniformMatrix3fv(this.addr,!1,oh),Ce(e,n)}}function vm(r,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ie(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Ie(e,n))return;rh.set(n),r.uniformMatrix4fv(this.addr,!1,rh),Ce(e,n)}}function ym(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Im(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;r.uniform2iv(this.addr,t),Ce(e,t)}}function Cm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;r.uniform3iv(this.addr,t),Ce(e,t)}}function Mm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;r.uniform4iv(this.addr,t),Ce(e,t)}}function Sm(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function wm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ie(e,t))return;r.uniform2uiv(this.addr,t),Ce(e,t)}}function Bm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ie(e,t))return;r.uniform3uiv(this.addr,t),Ce(e,t)}}function Tm(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ie(e,t))return;r.uniform4uiv(this.addr,t),Ce(e,t)}}function bm(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(nh.compareFunction=yu,s=nh):s=Fu,e.setTexture2D(t||s,i)}function Rm(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||ku,i)}function Dm(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Ou,i)}function Lm(r,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Qu,i)}function Pm(r){switch(r){case 5126:return pm;case 35664:return gm;case 35665:return mm;case 35666:return _m;case 35674:return Em;case 35675:return xm;case 35676:return vm;case 5124:case 35670:return ym;case 35667:case 35671:return Im;case 35668:case 35672:return Cm;case 35669:case 35673:return Mm;case 5125:return Sm;case 36294:return wm;case 36295:return Bm;case 36296:return Tm;case 35678:case 36198:case 36298:case 36306:case 35682:return bm;case 35679:case 36299:case 36307:return Rm;case 35680:case 36300:case 36308:case 36293:return Dm;case 36289:case 36303:case 36311:case 36292:return Lm}}function Um(r,t){r.uniform1fv(this.addr,t)}function Nm(r,t){const e=_s(t,this.size,2);r.uniform2fv(this.addr,e)}function Fm(r,t){const e=_s(t,this.size,3);r.uniform3fv(this.addr,e)}function Qm(r,t){const e=_s(t,this.size,4);r.uniform4fv(this.addr,e)}function km(r,t){const e=_s(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function Om(r,t){const e=_s(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function Gm(r,t){const e=_s(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function zm(r,t){r.uniform1iv(this.addr,t)}function Hm(r,t){r.uniform2iv(this.addr,t)}function Vm(r,t){r.uniform3iv(this.addr,t)}function Wm(r,t){r.uniform4iv(this.addr,t)}function qm(r,t){r.uniform1uiv(this.addr,t)}function Xm(r,t){r.uniform2uiv(this.addr,t)}function Ym(r,t){r.uniform3uiv(this.addr,t)}function Jm(r,t){r.uniform4uiv(this.addr,t)}function Km(r,t,e){const n=this.cache,i=t.length,s=Do(e,i);Ie(n,s)||(r.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Fu,s[o])}function jm(r,t,e){const n=this.cache,i=t.length,s=Do(e,i);Ie(n,s)||(r.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||ku,s[o])}function Zm(r,t,e){const n=this.cache,i=t.length,s=Do(e,i);Ie(n,s)||(r.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Ou,s[o])}function $m(r,t,e){const n=this.cache,i=t.length,s=Do(e,i);Ie(n,s)||(r.uniform1iv(this.addr,s),Ce(n,s));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||Qu,s[o])}function t0(r){switch(r){case 5126:return Um;case 35664:return Nm;case 35665:return Fm;case 35666:return Qm;case 35674:return km;case 35675:return Om;case 35676:return Gm;case 5124:case 35670:return zm;case 35667:case 35671:return Hm;case 35668:case 35672:return Vm;case 35669:case 35673:return Wm;case 5125:return qm;case 36294:return Xm;case 36295:return Ym;case 36296:return Jm;case 35678:case 36198:case 36298:case 36306:case 35682:return Km;case 35679:case 36299:case 36307:return jm;case 35680:case 36300:case 36308:case 36293:return Zm;case 36289:case 36303:case 36311:case 36292:return $m}}class e0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Pm(e.type)}}class n0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=t0(e.type)}}class i0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(t,e[a.id],n)}}}const da=/(\w+)(\])?(\[|\.)?/g;function ch(r,t){r.seq.push(t),r.map[t.id]=t}function s0(r,t,e){const n=r.name,i=n.length;for(da.lastIndex=0;;){const s=da.exec(n),o=da.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){ch(e,l===void 0?new e0(a,r,t):new n0(a,r,t));break}else{let u=e.map[a];u===void 0&&(u=new i0(a),ch(e,u)),e=u}}}class so{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=t.getActiveUniform(e,i),o=t.getUniformLocation(e,s.name);s0(s,o,this)}}setValue(t,e,n,i){const s=this.map[e];s!==void 0&&s.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let s=0,o=e.length;s!==o;++s){const a=e[s],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,s=t.length;i!==s;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function lh(r,t,e){const n=r.createShader(t);return r.shaderSource(n,e),r.compileShader(n),n}const r0=37297;let o0=0;function a0(r,t){const e=r.split(`
`),n=[],i=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const hh=new Gt;function c0(r){Xt._getMatrix(hh,Xt.workingColorSpace,r);const t=`mat3( ${hh.elements.map(e=>e.toFixed(4))} )`;switch(Xt.getTransfer(r)){case Bo:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function uh(r,t,e){const n=r.getShaderParameter(t,r.COMPILE_STATUS),i=r.getShaderInfoLog(t).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return e.toUpperCase()+`

`+i+`

`+a0(r.getShaderSource(t),o)}else return i}function l0(r,t){const e=c0(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function h0(r,t){let e;switch(t){case cf:e="Linear";break;case lf:e="Reinhard";break;case hf:e="Cineon";break;case lu:e="ACESFilmic";break;case df:e="AgX";break;case ff:e="Neutral";break;case uf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Fr=new B;function u0(){Xt.getLuminanceCoefficients(Fr);const r=Fr.x.toFixed(4),t=Fr.y.toFixed(4),e=Fr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function d0(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Gs).join(`
`)}function f0(r){const t=[];for(const e in r){const n=r[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function A0(r,t){const e={},n=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(t,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),e[o]={type:s.type,location:r.getAttribLocation(t,o),locationSize:a}}return e}function Gs(r){return r!==""}function dh(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function fh(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const p0=/^[ \t]*#include +<([\w\d./]+)>/gm;function _c(r){return r.replace(p0,m0)}const g0=new Map;function m0(r,t){let e=Ht[t];if(e===void 0){const n=g0.get(t);if(n!==void 0)e=Ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return _c(e)}const _0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ah(r){return r.replace(_0,E0)}function E0(r,t,e,n){let i="";for(let s=parseInt(t);s<parseInt(e);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function ph(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function x0(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Pc?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Od?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Fn&&(t="SHADOWMAP_TYPE_VSM"),t}function v0(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case yi:case as:t="ENVMAP_TYPE_CUBE";break;case wo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function y0(r){let t="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case as:t="ENVMAP_MODE_REFRACTION";break}return t}function I0(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Uc:t="ENVMAP_BLENDING_MULTIPLY";break;case of:t="ENVMAP_BLENDING_MIX";break;case af:t="ENVMAP_BLENDING_ADD";break}return t}function C0(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function M0(r,t,e,n){const i=r.getContext(),s=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=x0(e),l=v0(e),h=y0(e),u=I0(e),d=C0(e),f=d0(e),A=f0(s),m=i.createProgram();let g,p,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A].filter(Gs).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A].filter(Gs).join(`
`),p.length>0&&(p+=`
`)):(g=[ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),p=[ph(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,A,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==oi?"#define TONE_MAPPING":"",e.toneMapping!==oi?Ht.tonemapping_pars_fragment:"",e.toneMapping!==oi?h0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,l0("linearToOutputTexel",e.outputColorSpace),u0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Gs).join(`
`)),o=_c(o),o=dh(o,e),o=fh(o,e),a=_c(a),a=dh(a,e),a=fh(a,e),o=Ah(o),a=Ah(a),e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===wl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===wl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=x+g+o,_=x+p+a,T=lh(i,i.VERTEX_SHADER,E),S=lh(i,i.FRAGMENT_SHADER,_);i.attachShader(m,T),i.attachShader(m,S),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function M(D){if(r.debug.checkShaderErrors){const Q=i.getProgramInfoLog(m).trim(),N=i.getShaderInfoLog(T).trim(),z=i.getShaderInfoLog(S).trim();let q=!0,H=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(q=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,T,S);else{const W=uh(i,T,"vertex"),O=uh(i,S,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Q+`
`+W+`
`+O)}else Q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Q):(N===""||z==="")&&(H=!1);H&&(D.diagnostics={runnable:q,programLog:Q,vertexShader:{log:N,prefix:g},fragmentShader:{log:z,prefix:p}})}i.deleteShader(T),i.deleteShader(S),b=new so(i,m),I=A0(i,m)}let b;this.getUniforms=function(){return b===void 0&&M(this),b};let I;this.getAttributes=function(){return I===void 0&&M(this),I};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=i.getProgramParameter(m,r0)),v},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=o0++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=T,this.fragmentShader=S,this}let S0=0;class w0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new B0(t),e.set(t,n)),n}}class B0{constructor(t){this.id=S0++,this.code=t,this.usedTimes=0}}function T0(r,t,e,n,i,s,o){const a=new wu,c=new w0,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const A={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(I){return l.add(I),I===0?"uv":`uv${I}`}function g(I,v,D,Q,N){const z=Q.fog,q=N.geometry,H=I.isMeshStandardMaterial?Q.environment:null,W=(I.isMeshStandardMaterial?e:t).get(I.envMap||H),O=W&&W.mapping===wo?W.image.height:null,it=A[I.type];I.precision!==null&&(f=i.getMaxPrecision(I.precision),f!==I.precision&&console.warn("THREE.WebGLProgram.getParameters:",I.precision,"not supported, using",f,"instead."));const lt=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,At=lt!==void 0?lt.length:0;let Rt=0;q.morphAttributes.position!==void 0&&(Rt=1),q.morphAttributes.normal!==void 0&&(Rt=2),q.morphAttributes.color!==void 0&&(Rt=3);let Vt,Y,st,vt;if(it){const ne=In[it];Vt=ne.vertexShader,Y=ne.fragmentShader}else Vt=I.vertexShader,Y=I.fragmentShader,c.update(I),st=c.getVertexShaderID(I),vt=c.getFragmentShaderID(I);const ot=r.getRenderTarget(),Tt=r.state.buffers.depth.getReversed(),Ft=N.isInstancedMesh===!0,Ut=N.isBatchedMesh===!0,Jt=!!I.map,j=!!I.matcap,nt=!!W,R=!!I.aoMap,wt=!!I.lightMap,$=!!I.bumpMap,_t=!!I.normalMap,at=!!I.displacementMap,Dt=!!I.emissiveMap,gt=!!I.metalnessMap,w=!!I.roughnessMap,y=I.anisotropy>0,F=I.clearcoat>0,X=I.dispersion>0,Z=I.iridescence>0,J=I.sheen>0,It=I.transmission>0,ht=y&&!!I.anisotropyMap,mt=F&&!!I.clearcoatMap,qt=F&&!!I.clearcoatNormalMap,et=F&&!!I.clearcoatRoughnessMap,Et=Z&&!!I.iridescenceMap,Lt=Z&&!!I.iridescenceThicknessMap,Nt=J&&!!I.sheenColorMap,xt=J&&!!I.sheenRoughnessMap,Yt=!!I.specularMap,zt=!!I.specularColorMap,oe=!!I.specularIntensityMap,L=It&&!!I.transmissionMap,ut=It&&!!I.thicknessMap,V=!!I.gradientMap,K=!!I.alphaMap,pt=I.alphaTest>0,dt=!!I.alphaHash,kt=!!I.extensions;let me=oi;I.toneMapped&&(ot===null||ot.isXRRenderTarget===!0)&&(me=r.toneMapping);const Te={shaderID:it,shaderType:I.type,shaderName:I.name,vertexShader:Vt,fragmentShader:Y,defines:I.defines,customVertexShaderID:st,customFragmentShaderID:vt,isRawShaderMaterial:I.isRawShaderMaterial===!0,glslVersion:I.glslVersion,precision:f,batching:Ut,batchingColor:Ut&&N._colorsTexture!==null,instancing:Ft,instancingColor:Ft&&N.instanceColor!==null,instancingMorph:Ft&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ot===null?r.outputColorSpace:ot.isXRRenderTarget===!0?ot.texture.colorSpace:Pe,alphaToCoverage:!!I.alphaToCoverage,map:Jt,matcap:j,envMap:nt,envMapMode:nt&&W.mapping,envMapCubeUVHeight:O,aoMap:R,lightMap:wt,bumpMap:$,normalMap:_t,displacementMap:d&&at,emissiveMap:Dt,normalMapObjectSpace:_t&&I.normalMapType===vf,normalMapTangentSpace:_t&&I.normalMapType===Hc,metalnessMap:gt,roughnessMap:w,anisotropy:y,anisotropyMap:ht,clearcoat:F,clearcoatMap:mt,clearcoatNormalMap:qt,clearcoatRoughnessMap:et,dispersion:X,iridescence:Z,iridescenceMap:Et,iridescenceThicknessMap:Lt,sheen:J,sheenColorMap:Nt,sheenRoughnessMap:xt,specularMap:Yt,specularColorMap:zt,specularIntensityMap:oe,transmission:It,transmissionMap:L,thicknessMap:ut,gradientMap:V,opaque:I.transparent===!1&&I.blending===ns&&I.alphaToCoverage===!1,alphaMap:K,alphaTest:pt,alphaHash:dt,combine:I.combine,mapUv:Jt&&m(I.map.channel),aoMapUv:R&&m(I.aoMap.channel),lightMapUv:wt&&m(I.lightMap.channel),bumpMapUv:$&&m(I.bumpMap.channel),normalMapUv:_t&&m(I.normalMap.channel),displacementMapUv:at&&m(I.displacementMap.channel),emissiveMapUv:Dt&&m(I.emissiveMap.channel),metalnessMapUv:gt&&m(I.metalnessMap.channel),roughnessMapUv:w&&m(I.roughnessMap.channel),anisotropyMapUv:ht&&m(I.anisotropyMap.channel),clearcoatMapUv:mt&&m(I.clearcoatMap.channel),clearcoatNormalMapUv:qt&&m(I.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:et&&m(I.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&m(I.iridescenceMap.channel),iridescenceThicknessMapUv:Lt&&m(I.iridescenceThicknessMap.channel),sheenColorMapUv:Nt&&m(I.sheenColorMap.channel),sheenRoughnessMapUv:xt&&m(I.sheenRoughnessMap.channel),specularMapUv:Yt&&m(I.specularMap.channel),specularColorMapUv:zt&&m(I.specularColorMap.channel),specularIntensityMapUv:oe&&m(I.specularIntensityMap.channel),transmissionMapUv:L&&m(I.transmissionMap.channel),thicknessMapUv:ut&&m(I.thicknessMap.channel),alphaMapUv:K&&m(I.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(_t||y),vertexColors:I.vertexColors,vertexAlphas:I.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!q.attributes.uv&&(Jt||K),fog:!!z,useFog:I.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:I.flatShading===!0,sizeAttenuation:I.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Tt,skinning:N.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:At,morphTextureStride:Rt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:I.dithering,shadowMapEnabled:r.shadowMap.enabled&&D.length>0,shadowMapType:r.shadowMap.type,toneMapping:me,decodeVideoTexture:Jt&&I.map.isVideoTexture===!0&&Xt.getTransfer(I.map.colorSpace)===re,decodeVideoTextureEmissive:Dt&&I.emissiveMap.isVideoTexture===!0&&Xt.getTransfer(I.emissiveMap.colorSpace)===re,premultipliedAlpha:I.premultipliedAlpha,doubleSided:I.side===Ke,flipSided:I.side===Ge,useDepthPacking:I.depthPacking>=0,depthPacking:I.depthPacking||0,index0AttributeName:I.index0AttributeName,extensionClipCullDistance:kt&&I.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(kt&&I.extensions.multiDraw===!0||Ut)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:I.customProgramCacheKey()};return Te.vertexUv1s=l.has(1),Te.vertexUv2s=l.has(2),Te.vertexUv3s=l.has(3),l.clear(),Te}function p(I){const v=[];if(I.shaderID?v.push(I.shaderID):(v.push(I.customVertexShaderID),v.push(I.customFragmentShaderID)),I.defines!==void 0)for(const D in I.defines)v.push(D),v.push(I.defines[D]);return I.isRawShaderMaterial===!1&&(x(v,I),E(v,I),v.push(r.outputColorSpace)),v.push(I.customProgramCacheKey),v.join()}function x(I,v){I.push(v.precision),I.push(v.outputColorSpace),I.push(v.envMapMode),I.push(v.envMapCubeUVHeight),I.push(v.mapUv),I.push(v.alphaMapUv),I.push(v.lightMapUv),I.push(v.aoMapUv),I.push(v.bumpMapUv),I.push(v.normalMapUv),I.push(v.displacementMapUv),I.push(v.emissiveMapUv),I.push(v.metalnessMapUv),I.push(v.roughnessMapUv),I.push(v.anisotropyMapUv),I.push(v.clearcoatMapUv),I.push(v.clearcoatNormalMapUv),I.push(v.clearcoatRoughnessMapUv),I.push(v.iridescenceMapUv),I.push(v.iridescenceThicknessMapUv),I.push(v.sheenColorMapUv),I.push(v.sheenRoughnessMapUv),I.push(v.specularMapUv),I.push(v.specularColorMapUv),I.push(v.specularIntensityMapUv),I.push(v.transmissionMapUv),I.push(v.thicknessMapUv),I.push(v.combine),I.push(v.fogExp2),I.push(v.sizeAttenuation),I.push(v.morphTargetsCount),I.push(v.morphAttributeCount),I.push(v.numDirLights),I.push(v.numPointLights),I.push(v.numSpotLights),I.push(v.numSpotLightMaps),I.push(v.numHemiLights),I.push(v.numRectAreaLights),I.push(v.numDirLightShadows),I.push(v.numPointLightShadows),I.push(v.numSpotLightShadows),I.push(v.numSpotLightShadowsWithMaps),I.push(v.numLightProbes),I.push(v.shadowMapType),I.push(v.toneMapping),I.push(v.numClippingPlanes),I.push(v.numClipIntersection),I.push(v.depthPacking)}function E(I,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),I.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),I.push(a.mask)}function _(I){const v=A[I.type];let D;if(v){const Q=In[v];D=Du.clone(Q.uniforms)}else D=I.uniforms;return D}function T(I,v){let D;for(let Q=0,N=h.length;Q<N;Q++){const z=h[Q];if(z.cacheKey===v){D=z,++D.usedTimes;break}}return D===void 0&&(D=new M0(r,v,I,s),h.push(D)),D}function S(I){if(--I.usedTimes===0){const v=h.indexOf(I);h[v]=h[h.length-1],h.pop(),I.destroy()}}function M(I){c.remove(I)}function b(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:T,releaseProgram:S,releaseShaderCache:M,programs:h,dispose:b}}function b0(){let r=new WeakMap;function t(o){return r.has(o)}function e(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,c){r.get(o)[a]=c}function s(){r=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:s}}function R0(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function gh(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function mh(){const r=[];let t=0;const e=[],n=[],i=[];function s(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,A,m,g){let p=r[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:A,renderOrder:u.renderOrder,z:m,group:g},r[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=A,p.renderOrder=u.renderOrder,p.z=m,p.group=g),t++,p}function a(u,d,f,A,m,g){const p=o(u,d,f,A,m,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function c(u,d,f,A,m,g){const p=o(u,d,f,A,m,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||R0),n.length>1&&n.sort(d||gh),i.length>1&&i.sort(d||gh)}function h(){for(let u=t,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:s,push:a,unshift:c,finish:h,sort:l}}function D0(){let r=new WeakMap;function t(n,i){const s=r.get(n);let o;return s===void 0?(o=new mh,r.set(n,[o])):i>=s.length?(o=new mh,s.push(o)):o=s[i],o}function e(){r=new WeakMap}return{get:t,dispose:e}}function L0(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new yt};break;case"SpotLight":e={position:new B,direction:new B,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":e={color:new yt,position:new B,halfWidth:new B,halfHeight:new B};break}return r[t.id]=e,e}}}function P0(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let U0=0;function N0(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function F0(r){const t=new L0,e=P0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new B);const i=new B,s=new Pt,o=new Pt;function a(l){let h=0,u=0,d=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let f=0,A=0,m=0,g=0,p=0,x=0,E=0,_=0,T=0,S=0,M=0;l.sort(N0);for(let I=0,v=l.length;I<v;I++){const D=l[I],Q=D.color,N=D.intensity,z=D.distance,q=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=Q.r*N,u+=Q.g*N,d+=Q.b*N;else if(D.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(D.sh.coefficients[H],N);M++}else if(D.isDirectionalLight){const H=t.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const W=D.shadow,O=e.get(D);O.shadowIntensity=W.intensity,O.shadowBias=W.bias,O.shadowNormalBias=W.normalBias,O.shadowRadius=W.radius,O.shadowMapSize=W.mapSize,n.directionalShadow[f]=O,n.directionalShadowMap[f]=q,n.directionalShadowMatrix[f]=D.shadow.matrix,x++}n.directional[f]=H,f++}else if(D.isSpotLight){const H=t.get(D);H.position.setFromMatrixPosition(D.matrixWorld),H.color.copy(Q).multiplyScalar(N),H.distance=z,H.coneCos=Math.cos(D.angle),H.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),H.decay=D.decay,n.spot[m]=H;const W=D.shadow;if(D.map&&(n.spotLightMap[T]=D.map,T++,W.updateMatrices(D),D.castShadow&&S++),n.spotLightMatrix[m]=W.matrix,D.castShadow){const O=e.get(D);O.shadowIntensity=W.intensity,O.shadowBias=W.bias,O.shadowNormalBias=W.normalBias,O.shadowRadius=W.radius,O.shadowMapSize=W.mapSize,n.spotShadow[m]=O,n.spotShadowMap[m]=q,_++}m++}else if(D.isRectAreaLight){const H=t.get(D);H.color.copy(Q).multiplyScalar(N),H.halfWidth.set(D.width*.5,0,0),H.halfHeight.set(0,D.height*.5,0),n.rectArea[g]=H,g++}else if(D.isPointLight){const H=t.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),H.distance=D.distance,H.decay=D.decay,D.castShadow){const W=D.shadow,O=e.get(D);O.shadowIntensity=W.intensity,O.shadowBias=W.bias,O.shadowNormalBias=W.normalBias,O.shadowRadius=W.radius,O.shadowMapSize=W.mapSize,O.shadowCameraNear=W.camera.near,O.shadowCameraFar=W.camera.far,n.pointShadow[A]=O,n.pointShadowMap[A]=q,n.pointShadowMatrix[A]=D.shadow.matrix,E++}n.point[A]=H,A++}else if(D.isHemisphereLight){const H=t.get(D);H.skyColor.copy(D.color).multiplyScalar(N),H.groundColor.copy(D.groundColor).multiplyScalar(N),n.hemi[p]=H,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ct.LTC_FLOAT_1,n.rectAreaLTC2=ct.LTC_FLOAT_2):(n.rectAreaLTC1=ct.LTC_HALF_1,n.rectAreaLTC2=ct.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const b=n.hash;(b.directionalLength!==f||b.pointLength!==A||b.spotLength!==m||b.rectAreaLength!==g||b.hemiLength!==p||b.numDirectionalShadows!==x||b.numPointShadows!==E||b.numSpotShadows!==_||b.numSpotMaps!==T||b.numLightProbes!==M)&&(n.directional.length=f,n.spot.length=m,n.rectArea.length=g,n.point.length=A,n.hemi.length=p,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=_+T-S,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=M,b.directionalLength=f,b.pointLength=A,b.spotLength=m,b.rectAreaLength=g,b.hemiLength=p,b.numDirectionalShadows=x,b.numPointShadows=E,b.numSpotShadows=_,b.numSpotMaps=T,b.numLightProbes=M,n.version=U0++)}function c(l,h){let u=0,d=0,f=0,A=0,m=0;const g=h.matrixWorldInverse;for(let p=0,x=l.length;p<x;p++){const E=l[p];if(E.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),u++}else if(E.isSpotLight){const _=n.spot[f];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(g),f++}else if(E.isRectAreaLight){const _=n.rectArea[A];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(g),o.identity(),s.copy(E.matrixWorld),s.premultiply(g),o.extractRotation(s),_.halfWidth.set(E.width*.5,0,0),_.halfHeight.set(0,E.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),A++}else if(E.isPointLight){const _=n.point[d];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(g),d++}else if(E.isHemisphereLight){const _=n.hemi[m];_.direction.setFromMatrixPosition(E.matrixWorld),_.direction.transformDirection(g),m++}}}return{setup:a,setupView:c,state:n}}function _h(r){const t=new F0(r),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function s(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Q0(r){let t=new WeakMap;function e(i,s=0){const o=t.get(i);let a;return o===void 0?(a=new _h(r),t.set(i,[a])):s>=o.length?(a=new _h(r),o.push(a)):a=o[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class k0 extends cn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ef,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class O0 extends cn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const G0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,z0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function H0(r,t,e){let n=new bo;const i=new tt,s=new tt,o=new jt,a=new k0({depthPacking:xf}),c=new O0,l={},h=e.maxTextureSize,u={[qn]:Ge,[Ge]:qn,[Ke]:Ke},d=new xn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new tt},radius:{value:4}},vertexShader:G0,fragmentShader:z0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const A=new Ae;A.setAttribute("position",new fe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const m=new ue(A,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pc;let p=this.type;this.render=function(S,M,b){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const I=r.getRenderTarget(),v=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),Q=r.state;Q.setBlending(ri),Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const N=p!==Fn&&this.type===Fn,z=p===Fn&&this.type!==Fn;for(let q=0,H=S.length;q<H;q++){const W=S[q],O=W.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",W,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;i.copy(O.mapSize);const it=O.getFrameExtents();if(i.multiply(it),s.copy(O.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/it.x),i.x=s.x*it.x,O.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/it.y),i.y=s.y*it.y,O.mapSize.y=s.y)),O.map===null||N===!0||z===!0){const At=this.type!==Fn?{minFilter:ze,magFilter:ze}:{};O.map!==null&&O.map.dispose(),O.map=new ai(i.x,i.y,At),O.map.texture.name=W.name+".shadowMap",O.camera.updateProjectionMatrix()}r.setRenderTarget(O.map),r.clear();const lt=O.getViewportCount();for(let At=0;At<lt;At++){const Rt=O.getViewport(At);o.set(s.x*Rt.x,s.y*Rt.y,s.x*Rt.z,s.y*Rt.w),Q.viewport(o),O.updateMatrices(W,At),n=O.getFrustum(),_(M,b,O.camera,W,this.type)}O.isPointLightShadow!==!0&&this.type===Fn&&x(O,b),O.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(I,v,D)};function x(S,M){const b=t.update(m);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new ai(i.x,i.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,r.setRenderTarget(S.mapPass),r.clear(),r.renderBufferDirect(M,null,b,d,m,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,r.setRenderTarget(S.map),r.clear(),r.renderBufferDirect(M,null,b,f,m,null)}function E(S,M,b,I){let v=null;const D=b.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(D!==void 0)v=D;else if(v=b.isPointLight===!0?c:a,r.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){const Q=v.uuid,N=M.uuid;let z=l[Q];z===void 0&&(z={},l[Q]=z);let q=z[N];q===void 0&&(q=v.clone(),z[N]=q,M.addEventListener("dispose",T)),v=q}if(v.visible=M.visible,v.wireframe=M.wireframe,I===Fn?v.side=M.shadowSide!==null?M.shadowSide:M.side:v.side=M.shadowSide!==null?M.shadowSide:u[M.side],v.alphaMap=M.alphaMap,v.alphaTest=M.alphaTest,v.map=M.map,v.clipShadows=M.clipShadows,v.clippingPlanes=M.clippingPlanes,v.clipIntersection=M.clipIntersection,v.displacementMap=M.displacementMap,v.displacementScale=M.displacementScale,v.displacementBias=M.displacementBias,v.wireframeLinewidth=M.wireframeLinewidth,v.linewidth=M.linewidth,b.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const Q=r.properties.get(v);Q.light=b}return v}function _(S,M,b,I,v){if(S.visible===!1)return;if(S.layers.test(M.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&v===Fn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,S.matrixWorld);const N=t.update(S),z=S.material;if(Array.isArray(z)){const q=N.groups;for(let H=0,W=q.length;H<W;H++){const O=q[H],it=z[O.materialIndex];if(it&&it.visible){const lt=E(S,it,I,v);S.onBeforeShadow(r,S,M,b,N,lt,O),r.renderBufferDirect(b,null,N,lt,S,O),S.onAfterShadow(r,S,M,b,N,lt,O)}}}else if(z.visible){const q=E(S,z,I,v);S.onBeforeShadow(r,S,M,b,N,q,null),r.renderBufferDirect(b,null,N,q,S,null),S.onAfterShadow(r,S,M,b,N,q,null)}}const Q=S.children;for(let N=0,z=Q.length;N<z;N++)_(Q[N],M,b,I,v)}function T(S){S.target.removeEventListener("dispose",T);for(const b in l){const I=l[b],v=S.target.uuid;v in I&&(I[v].dispose(),delete I[v])}}}const V0={[Ha]:Va,[Wa]:Ya,[qa]:Ja,[os]:Xa,[Va]:Ha,[Ya]:Wa,[Ja]:qa,[Xa]:os};function W0(r,t){function e(){let L=!1;const ut=new jt;let V=null;const K=new jt(0,0,0,0);return{setMask:function(pt){V!==pt&&!L&&(r.colorMask(pt,pt,pt,pt),V=pt)},setLocked:function(pt){L=pt},setClear:function(pt,dt,kt,me,Te){Te===!0&&(pt*=me,dt*=me,kt*=me),ut.set(pt,dt,kt,me),K.equals(ut)===!1&&(r.clearColor(pt,dt,kt,me),K.copy(ut))},reset:function(){L=!1,V=null,K.set(-1,0,0,0)}}}function n(){let L=!1,ut=!1,V=null,K=null,pt=null;return{setReversed:function(dt){if(ut!==dt){const kt=t.get("EXT_clip_control");ut?kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.ZERO_TO_ONE_EXT):kt.clipControlEXT(kt.LOWER_LEFT_EXT,kt.NEGATIVE_ONE_TO_ONE_EXT);const me=pt;pt=null,this.setClear(me)}ut=dt},getReversed:function(){return ut},setTest:function(dt){dt?ot(r.DEPTH_TEST):Tt(r.DEPTH_TEST)},setMask:function(dt){V!==dt&&!L&&(r.depthMask(dt),V=dt)},setFunc:function(dt){if(ut&&(dt=V0[dt]),K!==dt){switch(dt){case Ha:r.depthFunc(r.NEVER);break;case Va:r.depthFunc(r.ALWAYS);break;case Wa:r.depthFunc(r.LESS);break;case os:r.depthFunc(r.LEQUAL);break;case qa:r.depthFunc(r.EQUAL);break;case Xa:r.depthFunc(r.GEQUAL);break;case Ya:r.depthFunc(r.GREATER);break;case Ja:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}K=dt}},setLocked:function(dt){L=dt},setClear:function(dt){pt!==dt&&(ut&&(dt=1-dt),r.clearDepth(dt),pt=dt)},reset:function(){L=!1,V=null,K=null,pt=null,ut=!1}}}function i(){let L=!1,ut=null,V=null,K=null,pt=null,dt=null,kt=null,me=null,Te=null;return{setTest:function(ne){L||(ne?ot(r.STENCIL_TEST):Tt(r.STENCIL_TEST))},setMask:function(ne){ut!==ne&&!L&&(r.stencilMask(ne),ut=ne)},setFunc:function(ne,hn,Bn){(V!==ne||K!==hn||pt!==Bn)&&(r.stencilFunc(ne,hn,Bn),V=ne,K=hn,pt=Bn)},setOp:function(ne,hn,Bn){(dt!==ne||kt!==hn||me!==Bn)&&(r.stencilOp(ne,hn,Bn),dt=ne,kt=hn,me=Bn)},setLocked:function(ne){L=ne},setClear:function(ne){Te!==ne&&(r.clearStencil(ne),Te=ne)},reset:function(){L=!1,ut=null,V=null,K=null,pt=null,dt=null,kt=null,me=null,Te=null}}}const s=new e,o=new n,a=new i,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,f=[],A=null,m=!1,g=null,p=null,x=null,E=null,_=null,T=null,S=null,M=new yt(0,0,0),b=0,I=!1,v=null,D=null,Q=null,N=null,z=null;const q=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,W=0;const O=r.getParameter(r.VERSION);O.indexOf("WebGL")!==-1?(W=parseFloat(/^WebGL (\d)/.exec(O)[1]),H=W>=1):O.indexOf("OpenGL ES")!==-1&&(W=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),H=W>=2);let it=null,lt={};const At=r.getParameter(r.SCISSOR_BOX),Rt=r.getParameter(r.VIEWPORT),Vt=new jt().fromArray(At),Y=new jt().fromArray(Rt);function st(L,ut,V,K){const pt=new Uint8Array(4),dt=r.createTexture();r.bindTexture(L,dt),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let kt=0;kt<V;kt++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(ut,0,r.RGBA,1,1,K,0,r.RGBA,r.UNSIGNED_BYTE,pt):r.texImage2D(ut+kt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,pt);return dt}const vt={};vt[r.TEXTURE_2D]=st(r.TEXTURE_2D,r.TEXTURE_2D,1),vt[r.TEXTURE_CUBE_MAP]=st(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),vt[r.TEXTURE_2D_ARRAY]=st(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),vt[r.TEXTURE_3D]=st(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ot(r.DEPTH_TEST),o.setFunc(os),$(!1),_t(yl),ot(r.CULL_FACE),R(ri);function ot(L){h[L]!==!0&&(r.enable(L),h[L]=!0)}function Tt(L){h[L]!==!1&&(r.disable(L),h[L]=!1)}function Ft(L,ut){return u[L]!==ut?(r.bindFramebuffer(L,ut),u[L]=ut,L===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ut),L===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ut),!0):!1}function Ut(L,ut){let V=f,K=!1;if(L){V=d.get(ut),V===void 0&&(V=[],d.set(ut,V));const pt=L.textures;if(V.length!==pt.length||V[0]!==r.COLOR_ATTACHMENT0){for(let dt=0,kt=pt.length;dt<kt;dt++)V[dt]=r.COLOR_ATTACHMENT0+dt;V.length=pt.length,K=!0}}else V[0]!==r.BACK&&(V[0]=r.BACK,K=!0);K&&r.drawBuffers(V)}function Jt(L){return A!==L?(r.useProgram(L),A=L,!0):!1}const j={[_i]:r.FUNC_ADD,[zd]:r.FUNC_SUBTRACT,[Hd]:r.FUNC_REVERSE_SUBTRACT};j[Vd]=r.MIN,j[Wd]=r.MAX;const nt={[qd]:r.ZERO,[Xd]:r.ONE,[Yd]:r.SRC_COLOR,[Ga]:r.SRC_ALPHA,[tf]:r.SRC_ALPHA_SATURATE,[Zd]:r.DST_COLOR,[Kd]:r.DST_ALPHA,[Jd]:r.ONE_MINUS_SRC_COLOR,[za]:r.ONE_MINUS_SRC_ALPHA,[$d]:r.ONE_MINUS_DST_COLOR,[jd]:r.ONE_MINUS_DST_ALPHA,[ef]:r.CONSTANT_COLOR,[nf]:r.ONE_MINUS_CONSTANT_COLOR,[sf]:r.CONSTANT_ALPHA,[rf]:r.ONE_MINUS_CONSTANT_ALPHA};function R(L,ut,V,K,pt,dt,kt,me,Te,ne){if(L===ri){m===!0&&(Tt(r.BLEND),m=!1);return}if(m===!1&&(ot(r.BLEND),m=!0),L!==Gd){if(L!==g||ne!==I){if((p!==_i||_!==_i)&&(r.blendEquation(r.FUNC_ADD),p=_i,_=_i),ne)switch(L){case ns:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Oa:r.blendFunc(r.ONE,r.ONE);break;case Il:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Cl:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case ns:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Oa:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Il:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Cl:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}x=null,E=null,T=null,S=null,M.set(0,0,0),b=0,g=L,I=ne}return}pt=pt||ut,dt=dt||V,kt=kt||K,(ut!==p||pt!==_)&&(r.blendEquationSeparate(j[ut],j[pt]),p=ut,_=pt),(V!==x||K!==E||dt!==T||kt!==S)&&(r.blendFuncSeparate(nt[V],nt[K],nt[dt],nt[kt]),x=V,E=K,T=dt,S=kt),(me.equals(M)===!1||Te!==b)&&(r.blendColor(me.r,me.g,me.b,Te),M.copy(me),b=Te),g=L,I=!1}function wt(L,ut){L.side===Ke?Tt(r.CULL_FACE):ot(r.CULL_FACE);let V=L.side===Ge;ut&&(V=!V),$(V),L.blending===ns&&L.transparent===!1?R(ri):R(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const K=L.stencilWrite;a.setTest(K),K&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Dt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ot(r.SAMPLE_ALPHA_TO_COVERAGE):Tt(r.SAMPLE_ALPHA_TO_COVERAGE)}function $(L){v!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),v=L)}function _t(L){L!==Qd?(ot(r.CULL_FACE),L!==D&&(L===yl?r.cullFace(r.BACK):L===kd?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):Tt(r.CULL_FACE),D=L}function at(L){L!==Q&&(H&&r.lineWidth(L),Q=L)}function Dt(L,ut,V){L?(ot(r.POLYGON_OFFSET_FILL),(N!==ut||z!==V)&&(r.polygonOffset(ut,V),N=ut,z=V)):Tt(r.POLYGON_OFFSET_FILL)}function gt(L){L?ot(r.SCISSOR_TEST):Tt(r.SCISSOR_TEST)}function w(L){L===void 0&&(L=r.TEXTURE0+q-1),it!==L&&(r.activeTexture(L),it=L)}function y(L,ut,V){V===void 0&&(it===null?V=r.TEXTURE0+q-1:V=it);let K=lt[V];K===void 0&&(K={type:void 0,texture:void 0},lt[V]=K),(K.type!==L||K.texture!==ut)&&(it!==V&&(r.activeTexture(V),it=V),r.bindTexture(L,ut||vt[L]),K.type=L,K.texture=ut)}function F(){const L=lt[it];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function X(){try{r.compressedTexImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{r.compressedTexImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{r.texSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function It(){try{r.texSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ht(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function mt(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function qt(){try{r.texStorage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function et(){try{r.texStorage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Et(){try{r.texImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Lt(){try{r.texImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Nt(L){Vt.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),Vt.copy(L))}function xt(L){Y.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),Y.copy(L))}function Yt(L,ut){let V=l.get(ut);V===void 0&&(V=new WeakMap,l.set(ut,V));let K=V.get(L);K===void 0&&(K=r.getUniformBlockIndex(ut,L.name),V.set(L,K))}function zt(L,ut){const K=l.get(ut).get(L);c.get(ut)!==K&&(r.uniformBlockBinding(ut,K,L.__bindingPointIndex),c.set(ut,K))}function oe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},it=null,lt={},u={},d=new WeakMap,f=[],A=null,m=!1,g=null,p=null,x=null,E=null,_=null,T=null,S=null,M=new yt(0,0,0),b=0,I=!1,v=null,D=null,Q=null,N=null,z=null,Vt.set(0,0,r.canvas.width,r.canvas.height),Y.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ot,disable:Tt,bindFramebuffer:Ft,drawBuffers:Ut,useProgram:Jt,setBlending:R,setMaterial:wt,setFlipSided:$,setCullFace:_t,setLineWidth:at,setPolygonOffset:Dt,setScissorTest:gt,activeTexture:w,bindTexture:y,unbindTexture:F,compressedTexImage2D:X,compressedTexImage3D:Z,texImage2D:Et,texImage3D:Lt,updateUBOMapping:Yt,uniformBlockBinding:zt,texStorage2D:qt,texStorage3D:et,texSubImage2D:J,texSubImage3D:It,compressedTexSubImage2D:ht,compressedTexSubImage3D:mt,scissor:Nt,viewport:xt,reset:oe}}function Eh(r,t,e,n){const i=q0(n);switch(e){case pu:return r*t;case mu:return r*t;case _u:return r*t*2;case ii:return r*t/i.components*i.byteLength;case kc:return r*t/i.components*i.byteLength;case xi:return r*t*2/i.components*i.byteLength;case Oc:return r*t*2/i.components*i.byteLength;case gu:return r*t*3/i.components*i.byteLength;case ye:return r*t*4/i.components*i.byteLength;case Gc:return r*t*4/i.components*i.byteLength;case no:case zs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case io:case Hs:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Za:case $a:return Math.max(r,16)*Math.max(t,8)/4;case co:case lo:return Math.max(r,8)*Math.max(t,8)/2;case ho:case uo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case fo:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case tr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case tc:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case ec:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case nc:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case er:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case ic:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case sc:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case rc:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case oc:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case ac:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case cc:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case lc:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case hc:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case uc:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Vs:case dc:case Ao:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Eu:case fc:return Math.ceil(r/4)*Math.ceil(t/4)*8;case Ac:case pc:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function q0(r){switch(r){case Se:case du:return{byteLength:1,components:1};case $s:case fu:case sn:return{byteLength:2,components:1};case Fc:case Qc:return{byteLength:2,components:4};case Ci:case Nc:case Le:return{byteLength:4,components:1};case Au:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function X0(r,t,e,n,i,s,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new tt,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function A(w,y){return f?new OffscreenCanvas(w,y):sr("canvas")}function m(w,y,F){let X=1;const Z=gt(w);if((Z.width>F||Z.height>F)&&(X=F/Math.max(Z.width,Z.height)),X<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const J=Math.floor(X*Z.width),It=Math.floor(X*Z.height);u===void 0&&(u=A(J,It));const ht=y?A(J,It):u;return ht.width=J,ht.height=It,ht.getContext("2d").drawImage(w,0,0,J,It),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+J+"x"+It+")."),ht}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),w;return w}function g(w){return w.generateMipmaps}function p(w){r.generateMipmap(w)}function x(w){return w.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?r.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function E(w,y,F,X,Z=!1){if(w!==null){if(r[w]!==void 0)return r[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let J=y;if(y===r.RED&&(F===r.FLOAT&&(J=r.R32F),F===r.HALF_FLOAT&&(J=r.R16F),F===r.UNSIGNED_BYTE&&(J=r.R8)),y===r.RED_INTEGER&&(F===r.UNSIGNED_BYTE&&(J=r.R8UI),F===r.UNSIGNED_SHORT&&(J=r.R16UI),F===r.UNSIGNED_INT&&(J=r.R32UI),F===r.BYTE&&(J=r.R8I),F===r.SHORT&&(J=r.R16I),F===r.INT&&(J=r.R32I)),y===r.RG&&(F===r.FLOAT&&(J=r.RG32F),F===r.HALF_FLOAT&&(J=r.RG16F),F===r.UNSIGNED_BYTE&&(J=r.RG8)),y===r.RG_INTEGER&&(F===r.UNSIGNED_BYTE&&(J=r.RG8UI),F===r.UNSIGNED_SHORT&&(J=r.RG16UI),F===r.UNSIGNED_INT&&(J=r.RG32UI),F===r.BYTE&&(J=r.RG8I),F===r.SHORT&&(J=r.RG16I),F===r.INT&&(J=r.RG32I)),y===r.RGB_INTEGER&&(F===r.UNSIGNED_BYTE&&(J=r.RGB8UI),F===r.UNSIGNED_SHORT&&(J=r.RGB16UI),F===r.UNSIGNED_INT&&(J=r.RGB32UI),F===r.BYTE&&(J=r.RGB8I),F===r.SHORT&&(J=r.RGB16I),F===r.INT&&(J=r.RGB32I)),y===r.RGBA_INTEGER&&(F===r.UNSIGNED_BYTE&&(J=r.RGBA8UI),F===r.UNSIGNED_SHORT&&(J=r.RGBA16UI),F===r.UNSIGNED_INT&&(J=r.RGBA32UI),F===r.BYTE&&(J=r.RGBA8I),F===r.SHORT&&(J=r.RGBA16I),F===r.INT&&(J=r.RGBA32I)),y===r.RGB&&F===r.UNSIGNED_INT_5_9_9_9_REV&&(J=r.RGB9_E5),y===r.RGBA){const It=Z?Bo:Xt.getTransfer(X);F===r.FLOAT&&(J=r.RGBA32F),F===r.HALF_FLOAT&&(J=r.RGBA16F),F===r.UNSIGNED_BYTE&&(J=It===re?r.SRGB8_ALPHA8:r.RGBA8),F===r.UNSIGNED_SHORT_4_4_4_4&&(J=r.RGBA4),F===r.UNSIGNED_SHORT_5_5_5_1&&(J=r.RGB5_A1)}return(J===r.R16F||J===r.R32F||J===r.RG16F||J===r.RG32F||J===r.RGBA16F||J===r.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function _(w,y){let F;return w?y===null||y===Ci||y===cs?F=r.DEPTH24_STENCIL8:y===Le?F=r.DEPTH32F_STENCIL8:y===$s&&(F=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Ci||y===cs?F=r.DEPTH_COMPONENT24:y===Le?F=r.DEPTH_COMPONENT32F:y===$s&&(F=r.DEPTH_COMPONENT16),F}function T(w,y){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==ze&&w.minFilter!==De?Math.log2(Math.max(y.width,y.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?y.mipmaps.length:1}function S(w){const y=w.target;y.removeEventListener("dispose",S),b(y),y.isVideoTexture&&h.delete(y)}function M(w){const y=w.target;y.removeEventListener("dispose",M),v(y)}function b(w){const y=n.get(w);if(y.__webglInit===void 0)return;const F=w.source,X=d.get(F);if(X){const Z=X[y.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&I(w),Object.keys(X).length===0&&d.delete(F)}n.remove(w)}function I(w){const y=n.get(w);r.deleteTexture(y.__webglTexture);const F=w.source,X=d.get(F);delete X[y.__cacheKey],o.memory.textures--}function v(w){const y=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(y.__webglFramebuffer[X]))for(let Z=0;Z<y.__webglFramebuffer[X].length;Z++)r.deleteFramebuffer(y.__webglFramebuffer[X][Z]);else r.deleteFramebuffer(y.__webglFramebuffer[X]);y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer[X])}else{if(Array.isArray(y.__webglFramebuffer))for(let X=0;X<y.__webglFramebuffer.length;X++)r.deleteFramebuffer(y.__webglFramebuffer[X]);else r.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&r.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&r.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let X=0;X<y.__webglColorRenderbuffer.length;X++)y.__webglColorRenderbuffer[X]&&r.deleteRenderbuffer(y.__webglColorRenderbuffer[X]);y.__webglDepthRenderbuffer&&r.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const F=w.textures;for(let X=0,Z=F.length;X<Z;X++){const J=n.get(F[X]);J.__webglTexture&&(r.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(F[X])}n.remove(w)}let D=0;function Q(){D=0}function N(){const w=D;return w>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+i.maxTextures),D+=1,w}function z(w){const y=[];return y.push(w.wrapS),y.push(w.wrapT),y.push(w.wrapR||0),y.push(w.magFilter),y.push(w.minFilter),y.push(w.anisotropy),y.push(w.internalFormat),y.push(w.format),y.push(w.type),y.push(w.generateMipmaps),y.push(w.premultiplyAlpha),y.push(w.flipY),y.push(w.unpackAlignment),y.push(w.colorSpace),y.join()}function q(w,y){const F=n.get(w);if(w.isVideoTexture&&at(w),w.isRenderTargetTexture===!1&&w.version>0&&F.__version!==w.version){const X=w.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(F,w,y);return}}e.bindTexture(r.TEXTURE_2D,F.__webglTexture,r.TEXTURE0+y)}function H(w,y){const F=n.get(w);if(w.version>0&&F.__version!==w.version){Y(F,w,y);return}e.bindTexture(r.TEXTURE_2D_ARRAY,F.__webglTexture,r.TEXTURE0+y)}function W(w,y){const F=n.get(w);if(w.version>0&&F.__version!==w.version){Y(F,w,y);return}e.bindTexture(r.TEXTURE_3D,F.__webglTexture,r.TEXTURE0+y)}function O(w,y){const F=n.get(w);if(w.version>0&&F.__version!==w.version){st(F,w,y);return}e.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+y)}const it={[Ii]:r.REPEAT,[Gn]:r.CLAMP_TO_EDGE,[ao]:r.MIRRORED_REPEAT},lt={[ze]:r.NEAREST,[uu]:r.NEAREST_MIPMAP_NEAREST,[ks]:r.NEAREST_MIPMAP_LINEAR,[De]:r.LINEAR,[eo]:r.LINEAR_MIPMAP_NEAREST,[mn]:r.LINEAR_MIPMAP_LINEAR},At={[yf]:r.NEVER,[Bf]:r.ALWAYS,[If]:r.LESS,[yu]:r.LEQUAL,[Cf]:r.EQUAL,[wf]:r.GEQUAL,[Mf]:r.GREATER,[Sf]:r.NOTEQUAL};function Rt(w,y){if(y.type===Le&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===De||y.magFilter===eo||y.magFilter===ks||y.magFilter===mn||y.minFilter===De||y.minFilter===eo||y.minFilter===ks||y.minFilter===mn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(w,r.TEXTURE_WRAP_S,it[y.wrapS]),r.texParameteri(w,r.TEXTURE_WRAP_T,it[y.wrapT]),(w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY)&&r.texParameteri(w,r.TEXTURE_WRAP_R,it[y.wrapR]),r.texParameteri(w,r.TEXTURE_MAG_FILTER,lt[y.magFilter]),r.texParameteri(w,r.TEXTURE_MIN_FILTER,lt[y.minFilter]),y.compareFunction&&(r.texParameteri(w,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(w,r.TEXTURE_COMPARE_FUNC,At[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===ze||y.minFilter!==ks&&y.minFilter!==mn||y.type===Le&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");r.texParameterf(w,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function Vt(w,y){let F=!1;w.__webglInit===void 0&&(w.__webglInit=!0,y.addEventListener("dispose",S));const X=y.source;let Z=d.get(X);Z===void 0&&(Z={},d.set(X,Z));const J=z(y);if(J!==w.__cacheKey){Z[J]===void 0&&(Z[J]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,F=!0),Z[J].usedTimes++;const It=Z[w.__cacheKey];It!==void 0&&(Z[w.__cacheKey].usedTimes--,It.usedTimes===0&&I(y)),w.__cacheKey=J,w.__webglTexture=Z[J].texture}return F}function Y(w,y,F){let X=r.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(X=r.TEXTURE_2D_ARRAY),y.isData3DTexture&&(X=r.TEXTURE_3D);const Z=Vt(w,y),J=y.source;e.bindTexture(X,w.__webglTexture,r.TEXTURE0+F);const It=n.get(J);if(J.version!==It.__version||Z===!0){e.activeTexture(r.TEXTURE0+F);const ht=Xt.getPrimaries(Xt.workingColorSpace),mt=y.colorSpace===pn?null:Xt.getPrimaries(y.colorSpace),qt=y.colorSpace===pn||ht===mt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt);let et=m(y.image,!1,i.maxTextureSize);et=Dt(y,et);const Et=s.convert(y.format,y.colorSpace),Lt=s.convert(y.type);let Nt=E(y.internalFormat,Et,Lt,y.colorSpace,y.isVideoTexture);Rt(X,y);let xt;const Yt=y.mipmaps,zt=y.isVideoTexture!==!0,oe=It.__version===void 0||Z===!0,L=J.dataReady,ut=T(y,et);if(y.isDepthTexture)Nt=_(y.format===ls,y.type),oe&&(zt?e.texStorage2D(r.TEXTURE_2D,1,Nt,et.width,et.height):e.texImage2D(r.TEXTURE_2D,0,Nt,et.width,et.height,0,Et,Lt,null));else if(y.isDataTexture)if(Yt.length>0){zt&&oe&&e.texStorage2D(r.TEXTURE_2D,ut,Nt,Yt[0].width,Yt[0].height);for(let V=0,K=Yt.length;V<K;V++)xt=Yt[V],zt?L&&e.texSubImage2D(r.TEXTURE_2D,V,0,0,xt.width,xt.height,Et,Lt,xt.data):e.texImage2D(r.TEXTURE_2D,V,Nt,xt.width,xt.height,0,Et,Lt,xt.data);y.generateMipmaps=!1}else zt?(oe&&e.texStorage2D(r.TEXTURE_2D,ut,Nt,et.width,et.height),L&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,et.width,et.height,Et,Lt,et.data)):e.texImage2D(r.TEXTURE_2D,0,Nt,et.width,et.height,0,Et,Lt,et.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){zt&&oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ut,Nt,Yt[0].width,Yt[0].height,et.depth);for(let V=0,K=Yt.length;V<K;V++)if(xt=Yt[V],y.format!==ye)if(Et!==null)if(zt){if(L)if(y.layerUpdates.size>0){const pt=Eh(xt.width,xt.height,y.format,y.type);for(const dt of y.layerUpdates){const kt=xt.data.subarray(dt*pt/xt.data.BYTES_PER_ELEMENT,(dt+1)*pt/xt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,V,0,0,dt,xt.width,xt.height,1,Et,kt)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,V,0,0,0,xt.width,xt.height,et.depth,Et,xt.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,V,Nt,xt.width,xt.height,et.depth,0,xt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else zt?L&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,V,0,0,0,xt.width,xt.height,et.depth,Et,Lt,xt.data):e.texImage3D(r.TEXTURE_2D_ARRAY,V,Nt,xt.width,xt.height,et.depth,0,Et,Lt,xt.data)}else{zt&&oe&&e.texStorage2D(r.TEXTURE_2D,ut,Nt,Yt[0].width,Yt[0].height);for(let V=0,K=Yt.length;V<K;V++)xt=Yt[V],y.format!==ye?Et!==null?zt?L&&e.compressedTexSubImage2D(r.TEXTURE_2D,V,0,0,xt.width,xt.height,Et,xt.data):e.compressedTexImage2D(r.TEXTURE_2D,V,Nt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):zt?L&&e.texSubImage2D(r.TEXTURE_2D,V,0,0,xt.width,xt.height,Et,Lt,xt.data):e.texImage2D(r.TEXTURE_2D,V,Nt,xt.width,xt.height,0,Et,Lt,xt.data)}else if(y.isDataArrayTexture)if(zt){if(oe&&e.texStorage3D(r.TEXTURE_2D_ARRAY,ut,Nt,et.width,et.height,et.depth),L)if(y.layerUpdates.size>0){const V=Eh(et.width,et.height,y.format,y.type);for(const K of y.layerUpdates){const pt=et.data.subarray(K*V/et.data.BYTES_PER_ELEMENT,(K+1)*V/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,K,et.width,et.height,1,Et,Lt,pt)}y.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,Et,Lt,et.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,Nt,et.width,et.height,et.depth,0,Et,Lt,et.data);else if(y.isData3DTexture)zt?(oe&&e.texStorage3D(r.TEXTURE_3D,ut,Nt,et.width,et.height,et.depth),L&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,Et,Lt,et.data)):e.texImage3D(r.TEXTURE_3D,0,Nt,et.width,et.height,et.depth,0,Et,Lt,et.data);else if(y.isFramebufferTexture){if(oe)if(zt)e.texStorage2D(r.TEXTURE_2D,ut,Nt,et.width,et.height);else{let V=et.width,K=et.height;for(let pt=0;pt<ut;pt++)e.texImage2D(r.TEXTURE_2D,pt,Nt,V,K,0,Et,Lt,null),V>>=1,K>>=1}}else if(Yt.length>0){if(zt&&oe){const V=gt(Yt[0]);e.texStorage2D(r.TEXTURE_2D,ut,Nt,V.width,V.height)}for(let V=0,K=Yt.length;V<K;V++)xt=Yt[V],zt?L&&e.texSubImage2D(r.TEXTURE_2D,V,0,0,Et,Lt,xt):e.texImage2D(r.TEXTURE_2D,V,Nt,Et,Lt,xt);y.generateMipmaps=!1}else if(zt){if(oe){const V=gt(et);e.texStorage2D(r.TEXTURE_2D,ut,Nt,V.width,V.height)}L&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,Et,Lt,et)}else e.texImage2D(r.TEXTURE_2D,0,Nt,Et,Lt,et);g(y)&&p(X),It.__version=J.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function st(w,y,F){if(y.image.length!==6)return;const X=Vt(w,y),Z=y.source;e.bindTexture(r.TEXTURE_CUBE_MAP,w.__webglTexture,r.TEXTURE0+F);const J=n.get(Z);if(Z.version!==J.__version||X===!0){e.activeTexture(r.TEXTURE0+F);const It=Xt.getPrimaries(Xt.workingColorSpace),ht=y.colorSpace===pn?null:Xt.getPrimaries(y.colorSpace),mt=y.colorSpace===pn||It===ht?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,y.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,y.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const qt=y.isCompressedTexture||y.image[0].isCompressedTexture,et=y.image[0]&&y.image[0].isDataTexture,Et=[];for(let K=0;K<6;K++)!qt&&!et?Et[K]=m(y.image[K],!0,i.maxCubemapSize):Et[K]=et?y.image[K].image:y.image[K],Et[K]=Dt(y,Et[K]);const Lt=Et[0],Nt=s.convert(y.format,y.colorSpace),xt=s.convert(y.type),Yt=E(y.internalFormat,Nt,xt,y.colorSpace),zt=y.isVideoTexture!==!0,oe=J.__version===void 0||X===!0,L=Z.dataReady;let ut=T(y,Lt);Rt(r.TEXTURE_CUBE_MAP,y);let V;if(qt){zt&&oe&&e.texStorage2D(r.TEXTURE_CUBE_MAP,ut,Yt,Lt.width,Lt.height);for(let K=0;K<6;K++){V=Et[K].mipmaps;for(let pt=0;pt<V.length;pt++){const dt=V[pt];y.format!==ye?Nt!==null?zt?L&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,pt,0,0,dt.width,dt.height,Nt,dt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,pt,Yt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):zt?L&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,pt,0,0,dt.width,dt.height,Nt,xt,dt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,pt,Yt,dt.width,dt.height,0,Nt,xt,dt.data)}}}else{if(V=y.mipmaps,zt&&oe){V.length>0&&ut++;const K=gt(Et[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,ut,Yt,K.width,K.height)}for(let K=0;K<6;K++)if(et){zt?L&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Et[K].width,Et[K].height,Nt,xt,Et[K].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Yt,Et[K].width,Et[K].height,0,Nt,xt,Et[K].data);for(let pt=0;pt<V.length;pt++){const kt=V[pt].image[K].image;zt?L&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,pt+1,0,0,kt.width,kt.height,Nt,xt,kt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,pt+1,Yt,kt.width,kt.height,0,Nt,xt,kt.data)}}else{zt?L&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Nt,xt,Et[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Yt,Nt,xt,Et[K]);for(let pt=0;pt<V.length;pt++){const dt=V[pt];zt?L&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,pt+1,0,0,Nt,xt,dt.image[K]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+K,pt+1,Yt,Nt,xt,dt.image[K])}}}g(y)&&p(r.TEXTURE_CUBE_MAP),J.__version=Z.version,y.onUpdate&&y.onUpdate(y)}w.__version=y.version}function vt(w,y,F,X,Z,J){const It=s.convert(F.format,F.colorSpace),ht=s.convert(F.type),mt=E(F.internalFormat,It,ht,F.colorSpace),qt=n.get(y),et=n.get(F);if(et.__renderTarget=y,!qt.__hasExternalTextures){const Et=Math.max(1,y.width>>J),Lt=Math.max(1,y.height>>J);Z===r.TEXTURE_3D||Z===r.TEXTURE_2D_ARRAY?e.texImage3D(Z,J,mt,Et,Lt,y.depth,0,It,ht,null):e.texImage2D(Z,J,mt,Et,Lt,0,It,ht,null)}e.bindFramebuffer(r.FRAMEBUFFER,w),_t(y)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,X,Z,et.__webglTexture,0,$(y)):(Z===r.TEXTURE_2D||Z>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,X,Z,et.__webglTexture,J),e.bindFramebuffer(r.FRAMEBUFFER,null)}function ot(w,y,F){if(r.bindRenderbuffer(r.RENDERBUFFER,w),y.depthBuffer){const X=y.depthTexture,Z=X&&X.isDepthTexture?X.type:null,J=_(y.stencilBuffer,Z),It=y.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ht=$(y);_t(y)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ht,J,y.width,y.height):F?r.renderbufferStorageMultisample(r.RENDERBUFFER,ht,J,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,J,y.width,y.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,It,r.RENDERBUFFER,w)}else{const X=y.textures;for(let Z=0;Z<X.length;Z++){const J=X[Z],It=s.convert(J.format,J.colorSpace),ht=s.convert(J.type),mt=E(J.internalFormat,It,ht,J.colorSpace),qt=$(y);F&&_t(y)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,qt,mt,y.width,y.height):_t(y)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,qt,mt,y.width,y.height):r.renderbufferStorage(r.RENDERBUFFER,mt,y.width,y.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Tt(w,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,w),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const X=n.get(y.depthTexture);X.__renderTarget=y,(!X.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),q(y.depthTexture,0);const Z=X.__webglTexture,J=$(y);if(y.depthTexture.format===is)_t(y)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Z,0);else if(y.depthTexture.format===ls)_t(y)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function Ft(w){const y=n.get(w),F=w.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==w.depthTexture){const X=w.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),X){const Z=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,X.removeEventListener("dispose",Z)};X.addEventListener("dispose",Z),y.__depthDisposeCallback=Z}y.__boundDepthTexture=X}if(w.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Tt(y.__webglFramebuffer,w)}else if(F){y.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(e.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer[X]),y.__webglDepthbuffer[X]===void 0)y.__webglDepthbuffer[X]=r.createRenderbuffer(),ot(y.__webglDepthbuffer[X],w,!1);else{const Z=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,J=y.__webglDepthbuffer[X];r.bindRenderbuffer(r.RENDERBUFFER,J),r.framebufferRenderbuffer(r.FRAMEBUFFER,Z,r.RENDERBUFFER,J)}}else if(e.bindFramebuffer(r.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=r.createRenderbuffer(),ot(y.__webglDepthbuffer,w,!1);else{const X=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Z=y.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Z),r.framebufferRenderbuffer(r.FRAMEBUFFER,X,r.RENDERBUFFER,Z)}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Ut(w,y,F){const X=n.get(w);y!==void 0&&vt(X.__webglFramebuffer,w,w.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),F!==void 0&&Ft(w)}function Jt(w){const y=w.texture,F=n.get(w),X=n.get(y);w.addEventListener("dispose",M);const Z=w.textures,J=w.isWebGLCubeRenderTarget===!0,It=Z.length>1;if(It||(X.__webglTexture===void 0&&(X.__webglTexture=r.createTexture()),X.__version=y.version,o.memory.textures++),J){F.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[ht]=[];for(let mt=0;mt<y.mipmaps.length;mt++)F.__webglFramebuffer[ht][mt]=r.createFramebuffer()}else F.__webglFramebuffer[ht]=r.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let ht=0;ht<y.mipmaps.length;ht++)F.__webglFramebuffer[ht]=r.createFramebuffer()}else F.__webglFramebuffer=r.createFramebuffer();if(It)for(let ht=0,mt=Z.length;ht<mt;ht++){const qt=n.get(Z[ht]);qt.__webglTexture===void 0&&(qt.__webglTexture=r.createTexture(),o.memory.textures++)}if(w.samples>0&&_t(w)===!1){F.__webglMultisampledFramebuffer=r.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ht=0;ht<Z.length;ht++){const mt=Z[ht];F.__webglColorRenderbuffer[ht]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,F.__webglColorRenderbuffer[ht]);const qt=s.convert(mt.format,mt.colorSpace),et=s.convert(mt.type),Et=E(mt.internalFormat,qt,et,mt.colorSpace,w.isXRRenderTarget===!0),Lt=$(w);r.renderbufferStorageMultisample(r.RENDERBUFFER,Lt,Et,w.width,w.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ht,r.RENDERBUFFER,F.__webglColorRenderbuffer[ht])}r.bindRenderbuffer(r.RENDERBUFFER,null),w.depthBuffer&&(F.__webglDepthRenderbuffer=r.createRenderbuffer(),ot(F.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(J){e.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture),Rt(r.TEXTURE_CUBE_MAP,y);for(let ht=0;ht<6;ht++)if(y.mipmaps&&y.mipmaps.length>0)for(let mt=0;mt<y.mipmaps.length;mt++)vt(F.__webglFramebuffer[ht][mt],w,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ht,mt);else vt(F.__webglFramebuffer[ht],w,y,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);g(y)&&p(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(It){for(let ht=0,mt=Z.length;ht<mt;ht++){const qt=Z[ht],et=n.get(qt);e.bindTexture(r.TEXTURE_2D,et.__webglTexture),Rt(r.TEXTURE_2D,qt),vt(F.__webglFramebuffer,w,qt,r.COLOR_ATTACHMENT0+ht,r.TEXTURE_2D,0),g(qt)&&p(r.TEXTURE_2D)}e.unbindTexture()}else{let ht=r.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(ht=w.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ht,X.__webglTexture),Rt(ht,y),y.mipmaps&&y.mipmaps.length>0)for(let mt=0;mt<y.mipmaps.length;mt++)vt(F.__webglFramebuffer[mt],w,y,r.COLOR_ATTACHMENT0,ht,mt);else vt(F.__webglFramebuffer,w,y,r.COLOR_ATTACHMENT0,ht,0);g(y)&&p(ht),e.unbindTexture()}w.depthBuffer&&Ft(w)}function j(w){const y=w.textures;for(let F=0,X=y.length;F<X;F++){const Z=y[F];if(g(Z)){const J=x(w),It=n.get(Z).__webglTexture;e.bindTexture(J,It),p(J),e.unbindTexture()}}}const nt=[],R=[];function wt(w){if(w.samples>0){if(_t(w)===!1){const y=w.textures,F=w.width,X=w.height;let Z=r.COLOR_BUFFER_BIT;const J=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,It=n.get(w),ht=y.length>1;if(ht)for(let mt=0;mt<y.length;mt++)e.bindFramebuffer(r.FRAMEBUFFER,It.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,It.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,It.__webglMultisampledFramebuffer),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let mt=0;mt<y.length;mt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(Z|=r.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(Z|=r.STENCIL_BUFFER_BIT)),ht){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,It.__webglColorRenderbuffer[mt]);const qt=n.get(y[mt]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,qt,0)}r.blitFramebuffer(0,0,F,X,0,0,F,X,Z,r.NEAREST),c===!0&&(nt.length=0,R.length=0,nt.push(r.COLOR_ATTACHMENT0+mt),w.depthBuffer&&w.resolveDepthBuffer===!1&&(nt.push(J),R.push(J),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,R)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,nt))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ht)for(let mt=0;mt<y.length;mt++){e.bindFramebuffer(r.FRAMEBUFFER,It.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.RENDERBUFFER,It.__webglColorRenderbuffer[mt]);const qt=n.get(y[mt]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,It.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+mt,r.TEXTURE_2D,qt,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,It.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const y=w.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[y])}}}function $(w){return Math.min(i.maxSamples,w.samples)}function _t(w){const y=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function at(w){const y=o.render.frame;h.get(w)!==y&&(h.set(w,y),w.update())}function Dt(w,y){const F=w.colorSpace,X=w.format,Z=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||F!==Pe&&F!==pn&&(Xt.getTransfer(F)===re?(X!==ye||Z!==Se)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),y}function gt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=Q,this.setTexture2D=q,this.setTexture2DArray=H,this.setTexture3D=W,this.setTextureCube=O,this.rebindTextures=Ut,this.setupRenderTarget=Jt,this.updateRenderTargetMipmap=j,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=_t}function Y0(r,t){function e(n,i=pn){let s;const o=Xt.getTransfer(i);if(n===Se)return r.UNSIGNED_BYTE;if(n===Fc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Qc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Au)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===du)return r.BYTE;if(n===fu)return r.SHORT;if(n===$s)return r.UNSIGNED_SHORT;if(n===Nc)return r.INT;if(n===Ci)return r.UNSIGNED_INT;if(n===Le)return r.FLOAT;if(n===sn)return r.HALF_FLOAT;if(n===pu)return r.ALPHA;if(n===gu)return r.RGB;if(n===ye)return r.RGBA;if(n===mu)return r.LUMINANCE;if(n===_u)return r.LUMINANCE_ALPHA;if(n===is)return r.DEPTH_COMPONENT;if(n===ls)return r.DEPTH_STENCIL;if(n===ii)return r.RED;if(n===kc)return r.RED_INTEGER;if(n===xi)return r.RG;if(n===Oc)return r.RG_INTEGER;if(n===Gc)return r.RGBA_INTEGER;if(n===no||n===zs||n===io||n===Hs)if(o===re)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===no)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===zs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===io)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Hs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===no)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===zs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===io)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Hs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===co||n===Za||n===lo||n===$a)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===co)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Za)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===lo)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===$a)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ho||n===uo||n===fo)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ho||n===uo)return o===re?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===fo)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===tr||n===tc||n===ec||n===nc||n===er||n===ic||n===sc||n===rc||n===oc||n===ac||n===cc||n===lc||n===hc||n===uc)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(n===tr)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===tc)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ec)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===nc)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===er)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ic)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===sc)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===rc)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===oc)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ac)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===cc)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===lc)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===hc)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===uc)return o===re?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Vs||n===dc||n===Ao)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(n===Vs)return o===re?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===dc)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ao)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Eu||n===fc||n===Ac||n===pc)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(n===Vs)return s.COMPRESSED_RED_RGTC1_EXT;if(n===fc)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ac)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===pc)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===cs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:e}}class J0 extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Be extends de{constructor(){super(),this.isGroup=!0,this.type="Group"}}const K0={type:"move"};class fa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Be,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Be,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Be,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const m of t.hand.values()){const g=e.getJointPose(m,n),p=this._getHandJoint(l,m);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,A=.005;l.inputState.pinching&&d>f+A?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-A&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(K0)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Be;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const j0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Z0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class $0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new xe,s=t.properties.get(i);s.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new xn({vertexShader:j0,fragmentShader:Z0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ue(new Mi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class t_ extends Bi{constructor(t,e){super();const n=this;let i=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,A=null;const m=new $0,g=e.getContextAttributes();let p=null,x=null;const E=[],_=[],T=new tt;let S=null;const M=new Oe;M.viewport=new jt;const b=new Oe;b.viewport=new jt;const I=[M,b],v=new J0;let D=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let st=E[Y];return st===void 0&&(st=new fa,E[Y]=st),st.getTargetRaySpace()},this.getControllerGrip=function(Y){let st=E[Y];return st===void 0&&(st=new fa,E[Y]=st),st.getGripSpace()},this.getHand=function(Y){let st=E[Y];return st===void 0&&(st=new fa,E[Y]=st),st.getHandSpace()};function N(Y){const st=_.indexOf(Y.inputSource);if(st===-1)return;const vt=E[st];vt!==void 0&&(vt.update(Y.inputSource,Y.frame,l||o),vt.dispatchEvent({type:Y.type,data:Y.inputSource}))}function z(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",q);for(let Y=0;Y<E.length;Y++){const st=_[Y];st!==null&&(_[Y]=null,E[Y].disconnect(st))}D=null,Q=null,m.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,x=null,Vt.stop(),n.isPresenting=!1,t.setPixelRatio(S),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){s=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return A},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",z),i.addEventListener("inputsourceschange",q),g.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(T),i.renderState.layers===void 0){const st={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,e,st),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new ai(f.framebufferWidth,f.framebufferHeight,{format:ye,type:Se,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let st=null,vt=null,ot=null;g.depth&&(ot=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=g.stencil?ls:is,vt=g.stencil?cs:Ci);const Tt={colorFormat:e.RGBA8,depthFormat:ot,scaleFactor:s};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Tt),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),x=new ai(d.textureWidth,d.textureHeight,{format:ye,type:Se,depthTexture:new Nu(d.textureWidth,d.textureHeight,vt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),Vt.setContext(i),Vt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function q(Y){for(let st=0;st<Y.removed.length;st++){const vt=Y.removed[st],ot=_.indexOf(vt);ot>=0&&(_[ot]=null,E[ot].disconnect(vt))}for(let st=0;st<Y.added.length;st++){const vt=Y.added[st];let ot=_.indexOf(vt);if(ot===-1){for(let Ft=0;Ft<E.length;Ft++)if(Ft>=_.length){_.push(vt),ot=Ft;break}else if(_[Ft]===null){_[Ft]=vt,ot=Ft;break}if(ot===-1)break}const Tt=E[ot];Tt&&Tt.connect(vt)}}const H=new B,W=new B;function O(Y,st,vt){H.setFromMatrixPosition(st.matrixWorld),W.setFromMatrixPosition(vt.matrixWorld);const ot=H.distanceTo(W),Tt=st.projectionMatrix.elements,Ft=vt.projectionMatrix.elements,Ut=Tt[14]/(Tt[10]-1),Jt=Tt[14]/(Tt[10]+1),j=(Tt[9]+1)/Tt[5],nt=(Tt[9]-1)/Tt[5],R=(Tt[8]-1)/Tt[0],wt=(Ft[8]+1)/Ft[0],$=Ut*R,_t=Ut*wt,at=ot/(-R+wt),Dt=at*-R;if(st.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Dt),Y.translateZ(at),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),Tt[10]===-1)Y.projectionMatrix.copy(st.projectionMatrix),Y.projectionMatrixInverse.copy(st.projectionMatrixInverse);else{const gt=Ut+at,w=Jt+at,y=$-Dt,F=_t+(ot-Dt),X=j*Jt/w*gt,Z=nt*Jt/w*gt;Y.projectionMatrix.makePerspective(y,F,X,Z,gt,w),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function it(Y,st){st===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(st.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let st=Y.near,vt=Y.far;m.texture!==null&&(m.depthNear>0&&(st=m.depthNear),m.depthFar>0&&(vt=m.depthFar)),v.near=b.near=M.near=st,v.far=b.far=M.far=vt,(D!==v.near||Q!==v.far)&&(i.updateRenderState({depthNear:v.near,depthFar:v.far}),D=v.near,Q=v.far),M.layers.mask=Y.layers.mask|2,b.layers.mask=Y.layers.mask|4,v.layers.mask=M.layers.mask|b.layers.mask;const ot=Y.parent,Tt=v.cameras;it(v,ot);for(let Ft=0;Ft<Tt.length;Ft++)it(Tt[Ft],ot);Tt.length===2?O(v,M,b):v.projectionMatrix.copy(M.projectionMatrix),lt(Y,v,ot)};function lt(Y,st,vt){vt===null?Y.matrix.copy(st.matrixWorld):(Y.matrix.copy(vt.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(st.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(st.projectionMatrix),Y.projectionMatrixInverse.copy(st.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=hs*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(v)};let At=null;function Rt(Y,st){if(h=st.getViewerPose(l||o),A=st,h!==null){const vt=h.views;f!==null&&(t.setRenderTargetFramebuffer(x,f.framebuffer),t.setRenderTarget(x));let ot=!1;vt.length!==v.cameras.length&&(v.cameras.length=0,ot=!0);for(let Ft=0;Ft<vt.length;Ft++){const Ut=vt[Ft];let Jt=null;if(f!==null)Jt=f.getViewport(Ut);else{const nt=u.getViewSubImage(d,Ut);Jt=nt.viewport,Ft===0&&(t.setRenderTargetTextures(x,nt.colorTexture,d.ignoreDepthValues?void 0:nt.depthStencilTexture),t.setRenderTarget(x))}let j=I[Ft];j===void 0&&(j=new Oe,j.layers.enable(Ft),j.viewport=new jt,I[Ft]=j),j.matrix.fromArray(Ut.transform.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale),j.projectionMatrix.fromArray(Ut.projectionMatrix),j.projectionMatrixInverse.copy(j.projectionMatrix).invert(),j.viewport.set(Jt.x,Jt.y,Jt.width,Jt.height),Ft===0&&(v.matrix.copy(j.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ot===!0&&v.cameras.push(j)}const Tt=i.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")){const Ft=u.getDepthInformation(vt[0]);Ft&&Ft.isValid&&Ft.texture&&m.init(t,Ft,i.renderState)}}for(let vt=0;vt<E.length;vt++){const ot=_[vt],Tt=E[vt];ot!==null&&Tt!==void 0&&Tt.update(ot,st,l||o)}At&&At(Y,st),st.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:st}),A=null}const Vt=new Uu;Vt.setAnimationLoop(Rt),this.setAnimationLoop=function(Y){At=Y},this.dispose=function(){}}}const Ai=new En,e_=new Pt;function n_(r,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Ru(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,x,E,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,_)):p.isMeshMatcapMaterial?(s(g,p),A(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),m(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,x,E):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Ge&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Ge&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const x=t.get(p),E=x.envMap,_=x.envMapRotation;E&&(g.envMap.value=E,Ai.copy(_),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),g.envMapRotation.value.setFromMatrix4(e_.makeRotationFromEuler(Ai)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,x,E){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*x,g.scale.value=E*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,x){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ge&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function A(g,p){p.matcap&&(g.matcap.value=p.matcap)}function m(g,p){const x=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function i_(r,t,e,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,E){const _=E.program;n.uniformBlockBinding(x,_)}function l(x,E){let _=i[x.id];_===void 0&&(A(x),_=h(x),i[x.id]=_,x.addEventListener("dispose",g));const T=E.program;n.updateUBOMapping(x,T);const S=t.render.frame;s[x.id]!==S&&(d(x),s[x.id]=S)}function h(x){const E=u();x.__bindingPointIndex=E;const _=r.createBuffer(),T=x.__size,S=x.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,T,S),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,E,_),_}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const E=i[x.id],_=x.uniforms,T=x.__cache;r.bindBuffer(r.UNIFORM_BUFFER,E);for(let S=0,M=_.length;S<M;S++){const b=Array.isArray(_[S])?_[S]:[_[S]];for(let I=0,v=b.length;I<v;I++){const D=b[I];if(f(D,S,I,T)===!0){const Q=D.__offset,N=Array.isArray(D.value)?D.value:[D.value];let z=0;for(let q=0;q<N.length;q++){const H=N[q],W=m(H);typeof H=="number"||typeof H=="boolean"?(D.__data[0]=H,r.bufferSubData(r.UNIFORM_BUFFER,Q+z,D.__data)):H.isMatrix3?(D.__data[0]=H.elements[0],D.__data[1]=H.elements[1],D.__data[2]=H.elements[2],D.__data[3]=0,D.__data[4]=H.elements[3],D.__data[5]=H.elements[4],D.__data[6]=H.elements[5],D.__data[7]=0,D.__data[8]=H.elements[6],D.__data[9]=H.elements[7],D.__data[10]=H.elements[8],D.__data[11]=0):(H.toArray(D.__data,z),z+=W.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,Q,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(x,E,_,T){const S=x.value,M=E+"_"+_;if(T[M]===void 0)return typeof S=="number"||typeof S=="boolean"?T[M]=S:T[M]=S.clone(),!0;{const b=T[M];if(typeof S=="number"||typeof S=="boolean"){if(b!==S)return T[M]=S,!0}else if(b.equals(S)===!1)return b.copy(S),!0}return!1}function A(x){const E=x.uniforms;let _=0;const T=16;for(let M=0,b=E.length;M<b;M++){const I=Array.isArray(E[M])?E[M]:[E[M]];for(let v=0,D=I.length;v<D;v++){const Q=I[v],N=Array.isArray(Q.value)?Q.value:[Q.value];for(let z=0,q=N.length;z<q;z++){const H=N[z],W=m(H),O=_%T,it=O%W.boundary,lt=O+it;_+=it,lt!==0&&T-lt<W.storage&&(_+=T-lt),Q.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),Q.__offset=_,_+=W.storage}}}const S=_%T;return S>0&&(_+=T-S),x.__size=_,x.__cache={},this}function m(x){const E={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(E.boundary=4,E.storage=4):x.isVector2?(E.boundary=8,E.storage=8):x.isVector3||x.isColor?(E.boundary=16,E.storage=12):x.isVector4?(E.boundary=16,E.storage=16):x.isMatrix3?(E.boundary=48,E.storage=48):x.isMatrix4?(E.boundary=64,E.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),E}function g(x){const E=x.target;E.removeEventListener("dispose",g);const _=o.indexOf(E.__bindingPointIndex);o.splice(_,1),r.deleteBuffer(i[E.id]),delete i[E.id],delete s[E.id]}function p(){for(const x in i)r.deleteBuffer(i[x]);o=[],i={},s={}}return{bind:c,update:l,dispose:p}}class s_{constructor(t={}){const{canvas:e=Wf(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const A=new Uint32Array(4),m=new Int32Array(4);let g=null,p=null;const x=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pe,this.toneMapping=oi,this.toneMappingExposure=1;const _=this;let T=!1,S=0,M=0,b=null,I=-1,v=null;const D=new jt,Q=new jt;let N=null;const z=new yt(0);let q=0,H=e.width,W=e.height,O=1,it=null,lt=null;const At=new jt(0,0,H,W),Rt=new jt(0,0,H,W);let Vt=!1;const Y=new bo;let st=!1,vt=!1;const ot=new Pt,Tt=new Pt,Ft=new B,Ut=new jt,Jt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let j=!1;function nt(){return b===null?O:1}let R=n;function wt(C,P){return e.getContext(C,P)}try{const C={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Lc}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",pt,!1),e.addEventListener("webglcontextcreationerror",dt,!1),R===null){const P="webgl2";if(R=wt(P,C),R===null)throw wt(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let $,_t,at,Dt,gt,w,y,F,X,Z,J,It,ht,mt,qt,et,Et,Lt,Nt,xt,Yt,zt,oe,L;function ut(){$=new lm(R),$.init(),zt=new Y0(R,$),_t=new im(R,$,t,zt),at=new W0(R,$),_t.reverseDepthBuffer&&d&&at.buffers.depth.setReversed(!0),Dt=new dm(R),gt=new b0,w=new X0(R,$,at,gt,_t,zt,Dt),y=new rm(_),F=new cm(_),X=new EA(R),oe=new em(R,X),Z=new hm(R,X,Dt,oe),J=new Am(R,Z,X,Dt),Nt=new fm(R,_t,w),et=new sm(gt),It=new T0(_,y,F,$,_t,oe,et),ht=new n_(_,gt),mt=new D0,qt=new Q0($),Lt=new tm(_,y,F,at,J,f,c),Et=new H0(_,J,_t),L=new i_(R,Dt,_t,at),xt=new nm(R,$,Dt),Yt=new um(R,$,Dt),Dt.programs=It.programs,_.capabilities=_t,_.extensions=$,_.properties=gt,_.renderLists=mt,_.shadowMap=Et,_.state=at,_.info=Dt}ut();const V=new t_(_,R);this.xr=V,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const C=$.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=$.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(C){C!==void 0&&(O=C,this.setSize(H,W,!1))},this.getSize=function(C){return C.set(H,W)},this.setSize=function(C,P,k=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=C,W=P,e.width=Math.floor(C*O),e.height=Math.floor(P*O),k===!0&&(e.style.width=C+"px",e.style.height=P+"px"),this.setViewport(0,0,C,P)},this.getDrawingBufferSize=function(C){return C.set(H*O,W*O).floor()},this.setDrawingBufferSize=function(C,P,k){H=C,W=P,O=k,e.width=Math.floor(C*k),e.height=Math.floor(P*k),this.setViewport(0,0,C,P)},this.getCurrentViewport=function(C){return C.copy(D)},this.getViewport=function(C){return C.copy(At)},this.setViewport=function(C,P,k,G){C.isVector4?At.set(C.x,C.y,C.z,C.w):At.set(C,P,k,G),at.viewport(D.copy(At).multiplyScalar(O).round())},this.getScissor=function(C){return C.copy(Rt)},this.setScissor=function(C,P,k,G){C.isVector4?Rt.set(C.x,C.y,C.z,C.w):Rt.set(C,P,k,G),at.scissor(Q.copy(Rt).multiplyScalar(O).round())},this.getScissorTest=function(){return Vt},this.setScissorTest=function(C){at.setScissorTest(Vt=C)},this.setOpaqueSort=function(C){it=C},this.setTransparentSort=function(C){lt=C},this.getClearColor=function(C){return C.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor.apply(Lt,arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha.apply(Lt,arguments)},this.clear=function(C=!0,P=!0,k=!0){let G=0;if(C){let U=!1;if(b!==null){const rt=b.texture.format;U=rt===Gc||rt===Oc||rt===kc}if(U){const rt=b.texture.type,ft=rt===Se||rt===Ci||rt===$s||rt===cs||rt===Fc||rt===Qc,Ct=Lt.getClearColor(),Mt=Lt.getClearAlpha(),Qt=Ct.r,Ot=Ct.g,St=Ct.b;ft?(A[0]=Qt,A[1]=Ot,A[2]=St,A[3]=Mt,R.clearBufferuiv(R.COLOR,0,A)):(m[0]=Qt,m[1]=Ot,m[2]=St,m[3]=Mt,R.clearBufferiv(R.COLOR,0,m))}else G|=R.COLOR_BUFFER_BIT}P&&(G|=R.DEPTH_BUFFER_BIT),k&&(G|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",pt,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),mt.dispose(),qt.dispose(),gt.dispose(),y.dispose(),F.dispose(),J.dispose(),oe.dispose(),L.dispose(),It.dispose(),V.dispose(),V.removeEventListener("sessionstart",Al),V.removeEventListener("sessionend",pl),ci.stop()};function K(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function pt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const C=Dt.autoReset,P=Et.enabled,k=Et.autoUpdate,G=Et.needsUpdate,U=Et.type;ut(),Dt.autoReset=C,Et.enabled=P,Et.autoUpdate=k,Et.needsUpdate=G,Et.type=U}function dt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function kt(C){const P=C.target;P.removeEventListener("dispose",kt),me(P)}function me(C){Te(C),gt.remove(C)}function Te(C){const P=gt.get(C).programs;P!==void 0&&(P.forEach(function(k){It.releaseProgram(k)}),C.isShaderMaterial&&It.releaseShaderCache(C))}this.renderBufferDirect=function(C,P,k,G,U,rt){P===null&&(P=Jt);const ft=U.isMesh&&U.matrixWorld.determinant()<0,Ct=Ud(C,P,k,G,U);at.setMaterial(G,ft);let Mt=k.index,Qt=1;if(G.wireframe===!0){if(Mt=Z.getWireframeAttribute(k),Mt===void 0)return;Qt=2}const Ot=k.drawRange,St=k.attributes.position;let Kt=Ot.start*Qt,ae=(Ot.start+Ot.count)*Qt;rt!==null&&(Kt=Math.max(Kt,rt.start*Qt),ae=Math.min(ae,(rt.start+rt.count)*Qt)),Mt!==null?(Kt=Math.max(Kt,0),ae=Math.min(ae,Mt.count)):St!=null&&(Kt=Math.max(Kt,0),ae=Math.min(ae,St.count));const ce=ae-Kt;if(ce<0||ce===1/0)return;oe.setup(U,G,Ct,k,Mt);let He,$t=xt;if(Mt!==null&&(He=X.get(Mt),$t=Yt,$t.setIndex(He)),U.isMesh)G.wireframe===!0?(at.setLineWidth(G.wireframeLinewidth*nt()),$t.setMode(R.LINES)):$t.setMode(R.TRIANGLES);else if(U.isLine){let Bt=G.linewidth;Bt===void 0&&(Bt=1),at.setLineWidth(Bt*nt()),U.isLineSegments?$t.setMode(R.LINES):U.isLineLoop?$t.setMode(R.LINE_LOOP):$t.setMode(R.LINE_STRIP)}else U.isPoints?$t.setMode(R.POINTS):U.isSprite&&$t.setMode(R.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)$t.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if($.get("WEBGL_multi_draw"))$t.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Bt=U._multiDrawStarts,Tn=U._multiDrawCounts,te=U._multiDrawCount,un=Mt?X.get(Mt).bytesPerElement:1,bi=gt.get(G).currentProgram.getUniforms();for(let Xe=0;Xe<te;Xe++)bi.setValue(R,"_gl_DrawID",Xe),$t.render(Bt[Xe]/un,Tn[Xe])}else if(U.isInstancedMesh)$t.renderInstances(Kt,ce,U.count);else if(k.isInstancedBufferGeometry){const Bt=k._maxInstanceCount!==void 0?k._maxInstanceCount:1/0,Tn=Math.min(k.instanceCount,Bt);$t.renderInstances(Kt,ce,Tn)}else $t.render(Kt,ce)};function ne(C,P,k){C.transparent===!0&&C.side===Ke&&C.forceSinglePass===!1?(C.side=Ge,C.needsUpdate=!0,gr(C,P,k),C.side=qn,C.needsUpdate=!0,gr(C,P,k),C.side=Ke):gr(C,P,k)}this.compile=function(C,P,k=null){k===null&&(k=C),p=qt.get(k),p.init(P),E.push(p),k.traverseVisible(function(U){U.isLight&&U.layers.test(P.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),C!==k&&C.traverseVisible(function(U){U.isLight&&U.layers.test(P.layers)&&(p.pushLight(U),U.castShadow&&p.pushShadow(U))}),p.setupLights();const G=new Set;return C.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const rt=U.material;if(rt)if(Array.isArray(rt))for(let ft=0;ft<rt.length;ft++){const Ct=rt[ft];ne(Ct,k,U),G.add(Ct)}else ne(rt,k,U),G.add(rt)}),E.pop(),p=null,G},this.compileAsync=function(C,P,k=null){const G=this.compile(C,P,k);return new Promise(U=>{function rt(){if(G.forEach(function(ft){gt.get(ft).currentProgram.isReady()&&G.delete(ft)}),G.size===0){U(C);return}setTimeout(rt,10)}$.get("KHR_parallel_shader_compile")!==null?rt():setTimeout(rt,10)})};let hn=null;function Bn(C){hn&&hn(C)}function Al(){ci.stop()}function pl(){ci.start()}const ci=new Uu;ci.setAnimationLoop(Bn),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(C){hn=C,V.setAnimationLoop(C),C===null?ci.stop():ci.start()},V.addEventListener("sessionstart",Al),V.addEventListener("sessionend",pl),this.render=function(C,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(P),P=V.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,P,b),p=qt.get(C,E.length),p.init(P),E.push(p),Tt.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),Y.setFromProjectionMatrix(Tt),vt=this.localClippingEnabled,st=et.init(this.clippingPlanes,vt),g=mt.get(C,x.length),g.init(),x.push(g),V.enabled===!0&&V.isPresenting===!0){const rt=_.xr.getDepthSensingMesh();rt!==null&&ko(rt,P,-1/0,_.sortObjects)}ko(C,P,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(it,lt),j=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,j&&Lt.addToRenderList(g,C),this.info.render.frame++,st===!0&&et.beginShadows();const k=p.state.shadowsArray;Et.render(k,C,P),st===!0&&et.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=g.opaque,U=g.transmissive;if(p.setupLights(),P.isArrayCamera){const rt=P.cameras;if(U.length>0)for(let ft=0,Ct=rt.length;ft<Ct;ft++){const Mt=rt[ft];ml(G,U,C,Mt)}j&&Lt.render(C);for(let ft=0,Ct=rt.length;ft<Ct;ft++){const Mt=rt[ft];gl(g,C,Mt,Mt.viewport)}}else U.length>0&&ml(G,U,C,P),j&&Lt.render(C),gl(g,C,P);b!==null&&(w.updateMultisampleRenderTarget(b),w.updateRenderTargetMipmap(b)),C.isScene===!0&&C.onAfterRender(_,C,P),oe.resetDefaultState(),I=-1,v=null,E.pop(),E.length>0?(p=E[E.length-1],st===!0&&et.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,x.pop(),x.length>0?g=x[x.length-1]:g=null};function ko(C,P,k,G){if(C.visible===!1)return;if(C.layers.test(P.layers)){if(C.isGroup)k=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(P);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||Y.intersectsSprite(C)){G&&Ut.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Tt);const ft=J.update(C),Ct=C.material;Ct.visible&&g.push(C,ft,Ct,k,Ut.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||Y.intersectsObject(C))){const ft=J.update(C),Ct=C.material;if(G&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ut.copy(C.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),Ut.copy(ft.boundingSphere.center)),Ut.applyMatrix4(C.matrixWorld).applyMatrix4(Tt)),Array.isArray(Ct)){const Mt=ft.groups;for(let Qt=0,Ot=Mt.length;Qt<Ot;Qt++){const St=Mt[Qt],Kt=Ct[St.materialIndex];Kt&&Kt.visible&&g.push(C,ft,Kt,k,Ut.z,St)}}else Ct.visible&&g.push(C,ft,Ct,k,Ut.z,null)}}const rt=C.children;for(let ft=0,Ct=rt.length;ft<Ct;ft++)ko(rt[ft],P,k,G)}function gl(C,P,k,G){const U=C.opaque,rt=C.transmissive,ft=C.transparent;p.setupLightsView(k),st===!0&&et.setGlobalState(_.clippingPlanes,k),G&&at.viewport(D.copy(G)),U.length>0&&pr(U,P,k),rt.length>0&&pr(rt,P,k),ft.length>0&&pr(ft,P,k),at.buffers.depth.setTest(!0),at.buffers.depth.setMask(!0),at.buffers.color.setMask(!0),at.setPolygonOffset(!1)}function ml(C,P,k,G){if((k.isScene===!0?k.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new ai(1,1,{generateMipmaps:!0,type:$.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float")?sn:Se,minFilter:mn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Xt.workingColorSpace}));const rt=p.state.transmissionRenderTarget[G.id],ft=G.viewport||D;rt.setSize(ft.z,ft.w);const Ct=_.getRenderTarget();_.setRenderTarget(rt),_.getClearColor(z),q=_.getClearAlpha(),q<1&&_.setClearColor(16777215,.5),_.clear(),j&&Lt.render(k);const Mt=_.toneMapping;_.toneMapping=oi;const Qt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),st===!0&&et.setGlobalState(_.clippingPlanes,G),pr(C,k,G),w.updateMultisampleRenderTarget(rt),w.updateRenderTargetMipmap(rt),$.has("WEBGL_multisampled_render_to_texture")===!1){let Ot=!1;for(let St=0,Kt=P.length;St<Kt;St++){const ae=P[St],ce=ae.object,He=ae.geometry,$t=ae.material,Bt=ae.group;if($t.side===Ke&&ce.layers.test(G.layers)){const Tn=$t.side;$t.side=Ge,$t.needsUpdate=!0,_l(ce,k,G,He,$t,Bt),$t.side=Tn,$t.needsUpdate=!0,Ot=!0}}Ot===!0&&(w.updateMultisampleRenderTarget(rt),w.updateRenderTargetMipmap(rt))}_.setRenderTarget(Ct),_.setClearColor(z,q),Qt!==void 0&&(G.viewport=Qt),_.toneMapping=Mt}function pr(C,P,k){const G=P.isScene===!0?P.overrideMaterial:null;for(let U=0,rt=C.length;U<rt;U++){const ft=C[U],Ct=ft.object,Mt=ft.geometry,Qt=G===null?ft.material:G,Ot=ft.group;Ct.layers.test(k.layers)&&_l(Ct,P,k,Mt,Qt,Ot)}}function _l(C,P,k,G,U,rt){C.onBeforeRender(_,P,k,G,U,rt),C.modelViewMatrix.multiplyMatrices(k.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),U.onBeforeRender(_,P,k,G,C,rt),U.transparent===!0&&U.side===Ke&&U.forceSinglePass===!1?(U.side=Ge,U.needsUpdate=!0,_.renderBufferDirect(k,P,G,U,C,rt),U.side=qn,U.needsUpdate=!0,_.renderBufferDirect(k,P,G,U,C,rt),U.side=Ke):_.renderBufferDirect(k,P,G,U,C,rt),C.onAfterRender(_,P,k,G,U,rt)}function gr(C,P,k){P.isScene!==!0&&(P=Jt);const G=gt.get(C),U=p.state.lights,rt=p.state.shadowsArray,ft=U.state.version,Ct=It.getParameters(C,U.state,rt,P,k),Mt=It.getProgramCacheKey(Ct);let Qt=G.programs;G.environment=C.isMeshStandardMaterial?P.environment:null,G.fog=P.fog,G.envMap=(C.isMeshStandardMaterial?F:y).get(C.envMap||G.environment),G.envMapRotation=G.environment!==null&&C.envMap===null?P.environmentRotation:C.envMapRotation,Qt===void 0&&(C.addEventListener("dispose",kt),Qt=new Map,G.programs=Qt);let Ot=Qt.get(Mt);if(Ot!==void 0){if(G.currentProgram===Ot&&G.lightsStateVersion===ft)return xl(C,Ct),Ot}else Ct.uniforms=It.getUniforms(C),C.onBeforeCompile(Ct,_),Ot=It.acquireProgram(Ct,Mt),Qt.set(Mt,Ot),G.uniforms=Ct.uniforms;const St=G.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(St.clippingPlanes=et.uniform),xl(C,Ct),G.needsLights=Fd(C),G.lightsStateVersion=ft,G.needsLights&&(St.ambientLightColor.value=U.state.ambient,St.lightProbe.value=U.state.probe,St.directionalLights.value=U.state.directional,St.directionalLightShadows.value=U.state.directionalShadow,St.spotLights.value=U.state.spot,St.spotLightShadows.value=U.state.spotShadow,St.rectAreaLights.value=U.state.rectArea,St.ltc_1.value=U.state.rectAreaLTC1,St.ltc_2.value=U.state.rectAreaLTC2,St.pointLights.value=U.state.point,St.pointLightShadows.value=U.state.pointShadow,St.hemisphereLights.value=U.state.hemi,St.directionalShadowMap.value=U.state.directionalShadowMap,St.directionalShadowMatrix.value=U.state.directionalShadowMatrix,St.spotShadowMap.value=U.state.spotShadowMap,St.spotLightMatrix.value=U.state.spotLightMatrix,St.spotLightMap.value=U.state.spotLightMap,St.pointShadowMap.value=U.state.pointShadowMap,St.pointShadowMatrix.value=U.state.pointShadowMatrix),G.currentProgram=Ot,G.uniformsList=null,Ot}function El(C){if(C.uniformsList===null){const P=C.currentProgram.getUniforms();C.uniformsList=so.seqWithValue(P.seq,C.uniforms)}return C.uniformsList}function xl(C,P){const k=gt.get(C);k.outputColorSpace=P.outputColorSpace,k.batching=P.batching,k.batchingColor=P.batchingColor,k.instancing=P.instancing,k.instancingColor=P.instancingColor,k.instancingMorph=P.instancingMorph,k.skinning=P.skinning,k.morphTargets=P.morphTargets,k.morphNormals=P.morphNormals,k.morphColors=P.morphColors,k.morphTargetsCount=P.morphTargetsCount,k.numClippingPlanes=P.numClippingPlanes,k.numIntersection=P.numClipIntersection,k.vertexAlphas=P.vertexAlphas,k.vertexTangents=P.vertexTangents,k.toneMapping=P.toneMapping}function Ud(C,P,k,G,U){P.isScene!==!0&&(P=Jt),w.resetTextureUnits();const rt=P.fog,ft=G.isMeshStandardMaterial?P.environment:null,Ct=b===null?_.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Pe,Mt=(G.isMeshStandardMaterial?F:y).get(G.envMap||ft),Qt=G.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,Ot=!!k.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),St=!!k.morphAttributes.position,Kt=!!k.morphAttributes.normal,ae=!!k.morphAttributes.color;let ce=oi;G.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(ce=_.toneMapping);const He=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,$t=He!==void 0?He.length:0,Bt=gt.get(G),Tn=p.state.lights;if(st===!0&&(vt===!0||C!==v)){const Ze=C===v&&G.id===I;et.setState(G,C,Ze)}let te=!1;G.version===Bt.__version?(Bt.needsLights&&Bt.lightsStateVersion!==Tn.state.version||Bt.outputColorSpace!==Ct||U.isBatchedMesh&&Bt.batching===!1||!U.isBatchedMesh&&Bt.batching===!0||U.isBatchedMesh&&Bt.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Bt.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Bt.instancing===!1||!U.isInstancedMesh&&Bt.instancing===!0||U.isSkinnedMesh&&Bt.skinning===!1||!U.isSkinnedMesh&&Bt.skinning===!0||U.isInstancedMesh&&Bt.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Bt.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Bt.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Bt.instancingMorph===!1&&U.morphTexture!==null||Bt.envMap!==Mt||G.fog===!0&&Bt.fog!==rt||Bt.numClippingPlanes!==void 0&&(Bt.numClippingPlanes!==et.numPlanes||Bt.numIntersection!==et.numIntersection)||Bt.vertexAlphas!==Qt||Bt.vertexTangents!==Ot||Bt.morphTargets!==St||Bt.morphNormals!==Kt||Bt.morphColors!==ae||Bt.toneMapping!==ce||Bt.morphTargetsCount!==$t)&&(te=!0):(te=!0,Bt.__version=G.version);let un=Bt.currentProgram;te===!0&&(un=gr(G,P,U));let bi=!1,Xe=!1,ys=!1;const le=un.getUniforms(),yn=Bt.uniforms;if(at.useProgram(un.program)&&(bi=!0,Xe=!0,ys=!0),G.id!==I&&(I=G.id,Xe=!0),bi||v!==C){at.buffers.depth.getReversed()?(ot.copy(C.projectionMatrix),Xf(ot),Yf(ot),le.setValue(R,"projectionMatrix",ot)):le.setValue(R,"projectionMatrix",C.projectionMatrix),le.setValue(R,"viewMatrix",C.matrixWorldInverse);const Xn=le.map.cameraPosition;Xn!==void 0&&Xn.setValue(R,Ft.setFromMatrixPosition(C.matrixWorld)),_t.logarithmicDepthBuffer&&le.setValue(R,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&le.setValue(R,"isOrthographic",C.isOrthographicCamera===!0),v!==C&&(v=C,Xe=!0,ys=!0)}if(U.isSkinnedMesh){le.setOptional(R,U,"bindMatrix"),le.setOptional(R,U,"bindMatrixInverse");const Ze=U.skeleton;Ze&&(Ze.boneTexture===null&&Ze.computeBoneTexture(),le.setValue(R,"boneTexture",Ze.boneTexture,w))}U.isBatchedMesh&&(le.setOptional(R,U,"batchingTexture"),le.setValue(R,"batchingTexture",U._matricesTexture,w),le.setOptional(R,U,"batchingIdTexture"),le.setValue(R,"batchingIdTexture",U._indirectTexture,w),le.setOptional(R,U,"batchingColorTexture"),U._colorsTexture!==null&&le.setValue(R,"batchingColorTexture",U._colorsTexture,w));const Is=k.morphAttributes;if((Is.position!==void 0||Is.normal!==void 0||Is.color!==void 0)&&Nt.update(U,k,un),(Xe||Bt.receiveShadow!==U.receiveShadow)&&(Bt.receiveShadow=U.receiveShadow,le.setValue(R,"receiveShadow",U.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(yn.envMap.value=Mt,yn.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&P.environment!==null&&(yn.envMapIntensity.value=P.environmentIntensity),Xe&&(le.setValue(R,"toneMappingExposure",_.toneMappingExposure),Bt.needsLights&&Nd(yn,ys),rt&&G.fog===!0&&ht.refreshFogUniforms(yn,rt),ht.refreshMaterialUniforms(yn,G,O,W,p.state.transmissionRenderTarget[C.id]),so.upload(R,El(Bt),yn,w)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(so.upload(R,El(Bt),yn,w),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&le.setValue(R,"center",U.center),le.setValue(R,"modelViewMatrix",U.modelViewMatrix),le.setValue(R,"normalMatrix",U.normalMatrix),le.setValue(R,"modelMatrix",U.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Ze=G.uniformsGroups;for(let Xn=0,Yn=Ze.length;Xn<Yn;Xn++){const vl=Ze[Xn];L.update(vl,un),L.bind(vl,un)}}return un}function Nd(C,P){C.ambientLightColor.needsUpdate=P,C.lightProbe.needsUpdate=P,C.directionalLights.needsUpdate=P,C.directionalLightShadows.needsUpdate=P,C.pointLights.needsUpdate=P,C.pointLightShadows.needsUpdate=P,C.spotLights.needsUpdate=P,C.spotLightShadows.needsUpdate=P,C.rectAreaLights.needsUpdate=P,C.hemisphereLights.needsUpdate=P}function Fd(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(C,P,k){gt.get(C.texture).__webglTexture=P,gt.get(C.depthTexture).__webglTexture=k;const G=gt.get(C);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=k===void 0,G.__autoAllocateDepthBuffer||$.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,P){const k=gt.get(C);k.__webglFramebuffer=P,k.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(C,P=0,k=0){b=C,S=P,M=k;let G=!0,U=null,rt=!1,ft=!1;if(C){const Mt=gt.get(C);if(Mt.__useDefaultFramebuffer!==void 0)at.bindFramebuffer(R.FRAMEBUFFER,null),G=!1;else if(Mt.__webglFramebuffer===void 0)w.setupRenderTarget(C);else if(Mt.__hasExternalTextures)w.rebindTextures(C,gt.get(C.texture).__webglTexture,gt.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const St=C.depthTexture;if(Mt.__boundDepthTexture!==St){if(St!==null&&gt.has(St)&&(C.width!==St.image.width||C.height!==St.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(C)}}const Qt=C.texture;(Qt.isData3DTexture||Qt.isDataArrayTexture||Qt.isCompressedArrayTexture)&&(ft=!0);const Ot=gt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ot[P])?U=Ot[P][k]:U=Ot[P],rt=!0):C.samples>0&&w.useMultisampledRTT(C)===!1?U=gt.get(C).__webglMultisampledFramebuffer:Array.isArray(Ot)?U=Ot[k]:U=Ot,D.copy(C.viewport),Q.copy(C.scissor),N=C.scissorTest}else D.copy(At).multiplyScalar(O).floor(),Q.copy(Rt).multiplyScalar(O).floor(),N=Vt;if(at.bindFramebuffer(R.FRAMEBUFFER,U)&&G&&at.drawBuffers(C,U),at.viewport(D),at.scissor(Q),at.setScissorTest(N),rt){const Mt=gt.get(C.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+P,Mt.__webglTexture,k)}else if(ft){const Mt=gt.get(C.texture),Qt=P||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,Mt.__webglTexture,k||0,Qt)}I=-1},this.readRenderTargetPixels=function(C,P,k,G,U,rt,ft){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ct=gt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ft!==void 0&&(Ct=Ct[ft]),Ct){at.bindFramebuffer(R.FRAMEBUFFER,Ct);try{const Mt=C.texture,Qt=Mt.format,Ot=Mt.type;if(!_t.textureFormatReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=C.width-G&&k>=0&&k<=C.height-U&&R.readPixels(P,k,G,U,zt.convert(Qt),zt.convert(Ot),rt)}finally{const Mt=b!==null?gt.get(b).__webglFramebuffer:null;at.bindFramebuffer(R.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(C,P,k,G,U,rt,ft){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ct=gt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ft!==void 0&&(Ct=Ct[ft]),Ct){const Mt=C.texture,Qt=Mt.format,Ot=Mt.type;if(!_t.textureFormatReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(P>=0&&P<=C.width-G&&k>=0&&k<=C.height-U){at.bindFramebuffer(R.FRAMEBUFFER,Ct);const St=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,St),R.bufferData(R.PIXEL_PACK_BUFFER,rt.byteLength,R.STREAM_READ),R.readPixels(P,k,G,U,zt.convert(Qt),zt.convert(Ot),0);const Kt=b!==null?gt.get(b).__webglFramebuffer:null;at.bindFramebuffer(R.FRAMEBUFFER,Kt);const ae=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await qf(R,ae,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,St),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,rt),R.deleteBuffer(St),R.deleteSync(ae),rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,P=null,k=0){C.isTexture!==!0&&(Os("WebGLRenderer: copyFramebufferToTexture function signature has changed."),P=arguments[0]||null,C=arguments[1]);const G=Math.pow(2,-k),U=Math.floor(C.image.width*G),rt=Math.floor(C.image.height*G),ft=P!==null?P.x:0,Ct=P!==null?P.y:0;w.setTexture2D(C,0),R.copyTexSubImage2D(R.TEXTURE_2D,k,0,0,ft,Ct,U,rt),at.unbindTexture()},this.copyTextureToTexture=function(C,P,k=null,G=null,U=0){C.isTexture!==!0&&(Os("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,C=arguments[1],P=arguments[2],U=arguments[3]||0,k=null);let rt,ft,Ct,Mt,Qt,Ot,St,Kt,ae;const ce=C.isCompressedTexture?C.mipmaps[U]:C.image;k!==null?(rt=k.max.x-k.min.x,ft=k.max.y-k.min.y,Ct=k.isBox3?k.max.z-k.min.z:1,Mt=k.min.x,Qt=k.min.y,Ot=k.isBox3?k.min.z:0):(rt=ce.width,ft=ce.height,Ct=ce.depth||1,Mt=0,Qt=0,Ot=0),G!==null?(St=G.x,Kt=G.y,ae=G.z):(St=0,Kt=0,ae=0);const He=zt.convert(P.format),$t=zt.convert(P.type);let Bt;P.isData3DTexture?(w.setTexture3D(P,0),Bt=R.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(w.setTexture2DArray(P,0),Bt=R.TEXTURE_2D_ARRAY):(w.setTexture2D(P,0),Bt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,P.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,P.unpackAlignment);const Tn=R.getParameter(R.UNPACK_ROW_LENGTH),te=R.getParameter(R.UNPACK_IMAGE_HEIGHT),un=R.getParameter(R.UNPACK_SKIP_PIXELS),bi=R.getParameter(R.UNPACK_SKIP_ROWS),Xe=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,ce.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ce.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Mt),R.pixelStorei(R.UNPACK_SKIP_ROWS,Qt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ot);const ys=C.isDataArrayTexture||C.isData3DTexture,le=P.isDataArrayTexture||P.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const yn=gt.get(C),Is=gt.get(P),Ze=gt.get(yn.__renderTarget),Xn=gt.get(Is.__renderTarget);at.bindFramebuffer(R.READ_FRAMEBUFFER,Ze.__webglFramebuffer),at.bindFramebuffer(R.DRAW_FRAMEBUFFER,Xn.__webglFramebuffer);for(let Yn=0;Yn<Ct;Yn++)ys&&R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,gt.get(C).__webglTexture,U,Ot+Yn),C.isDepthTexture?(le&&R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,gt.get(P).__webglTexture,U,ae+Yn),R.blitFramebuffer(Mt,Qt,rt,ft,St,Kt,rt,ft,R.DEPTH_BUFFER_BIT,R.NEAREST)):le?R.copyTexSubImage3D(Bt,U,St,Kt,ae+Yn,Mt,Qt,rt,ft):R.copyTexSubImage2D(Bt,U,St,Kt,ae+Yn,Mt,Qt,rt,ft);at.bindFramebuffer(R.READ_FRAMEBUFFER,null),at.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else le?C.isDataTexture||C.isData3DTexture?R.texSubImage3D(Bt,U,St,Kt,ae,rt,ft,Ct,He,$t,ce.data):P.isCompressedArrayTexture?R.compressedTexSubImage3D(Bt,U,St,Kt,ae,rt,ft,Ct,He,ce.data):R.texSubImage3D(Bt,U,St,Kt,ae,rt,ft,Ct,He,$t,ce):C.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,U,St,Kt,rt,ft,He,$t,ce.data):C.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,U,St,Kt,ce.width,ce.height,He,ce.data):R.texSubImage2D(R.TEXTURE_2D,U,St,Kt,rt,ft,He,$t,ce);R.pixelStorei(R.UNPACK_ROW_LENGTH,Tn),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,te),R.pixelStorei(R.UNPACK_SKIP_PIXELS,un),R.pixelStorei(R.UNPACK_SKIP_ROWS,bi),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Xe),U===0&&P.generateMipmaps&&R.generateMipmap(Bt),at.unbindTexture()},this.copyTextureToTexture3D=function(C,P,k=null,G=null,U=0){return C.isTexture!==!0&&(Os("WebGLRenderer: copyTextureToTexture3D function signature has changed."),k=arguments[0]||null,G=arguments[1]||null,C=arguments[2],P=arguments[3],U=arguments[4]||0),Os('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,P,k,G,U)},this.initRenderTarget=function(C){gt.get(C).__webglFramebuffer===void 0&&w.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?w.setTextureCube(C,0):C.isData3DTexture?w.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?w.setTexture2DArray(C,0):w.setTexture2D(C,0),at.unbindTexture()},this.resetState=function(){S=0,M=0,b=null,at.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Xt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Xt._getUnpackColorSpace()}}class qc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new yt(t),this.near=e,this.far=n}clone(){return new qc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Gu extends de{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new En,this.environmentIntensity=1,this.environmentRotation=new En,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class zu{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=mc,this.updateRanges=[],this.version=0,this.uuid=on()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,s=this.stride;i<s;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=on()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=on()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ue=new B;class rr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyMatrix4(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.applyNormalMatrix(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ue.fromBufferAttribute(this,e),Ue.transformDirection(t),this.setXYZ(e,Ue.x,Ue.y,Ue.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=se(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=se(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),i=se(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=se(e,this.array),n=se(n,this.array),i=se(i,this.array),s=se(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return new fe(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new rr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Xc extends cn{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new yt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Wi;const Bs=new B,qi=new B,Xi=new B,Yi=new tt,Ts=new tt,Hu=new Pt,Qr=new B,bs=new B,kr=new B,xh=new tt,Aa=new tt,vh=new tt;class Vu extends de{constructor(t=new Xc){if(super(),this.isSprite=!0,this.type="Sprite",Wi===void 0){Wi=new Ae;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new zu(e,5);Wi.setIndex([0,1,2,0,2,3]),Wi.setAttribute("position",new rr(n,3,0,!1)),Wi.setAttribute("uv",new rr(n,2,3,!1))}this.geometry=Wi,this.material=t,this.center=new tt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),qi.setFromMatrixScale(this.matrixWorld),Hu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Xi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&qi.multiplyScalar(-Xi.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const o=this.center;Or(Qr.set(-.5,-.5,0),Xi,o,qi,i,s),Or(bs.set(.5,-.5,0),Xi,o,qi,i,s),Or(kr.set(.5,.5,0),Xi,o,qi,i,s),xh.set(0,0),Aa.set(1,0),vh.set(1,1);let a=t.ray.intersectTriangle(Qr,bs,kr,!1,Bs);if(a===null&&(Or(bs.set(-.5,.5,0),Xi,o,qi,i,s),Aa.set(0,1),a=t.ray.intersectTriangle(Qr,kr,bs,!1,Bs),a===null))return;const c=t.ray.origin.distanceTo(Bs);c<t.near||c>t.far||e.push({distance:c,point:Bs.clone(),uv:en.getInterpolation(Bs,Qr,bs,kr,xh,Aa,vh,new tt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Or(r,t,e,n,i,s){Yi.subVectors(r,e).addScalar(.5).multiply(n),i!==void 0?(Ts.x=s*Yi.x-i*Yi.y,Ts.y=i*Yi.x+s*Yi.y):Ts.copy(Yi),r.copy(t),r.x+=Ts.x,r.y+=Ts.y,r.applyMatrix4(Hu)}const yh=new B,Ih=new jt,Ch=new jt,r_=new B,Mh=new Pt,Gr=new B,pa=new vn,Sh=new Pt,ga=new To;class Wu extends ue{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ml,this.bindMatrix=new Pt,this.bindMatrixInverse=new Pt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new qe),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Gr),this.boundingBox.expandByPoint(Gr)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new vn),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,Gr),this.boundingSphere.expandByPoint(Gr)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),pa.copy(this.boundingSphere),pa.applyMatrix4(i),t.ray.intersectsSphere(pa)!==!1&&(Sh.copy(i).invert(),ga.copy(t.ray).applyMatrix4(Sh),!(this.boundingBox!==null&&ga.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,ga)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new jt,e=this.geometry.attributes.skinWeight;for(let n=0,i=e.count;n<i;n++){t.fromBufferAttribute(e,n);const s=1/t.manhattanLength();s!==1/0?t.multiplyScalar(s):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Ml?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Af?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,i=this.geometry;Ih.fromBufferAttribute(i.attributes.skinIndex,t),Ch.fromBufferAttribute(i.attributes.skinWeight,t),yh.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let s=0;s<4;s++){const o=Ch.getComponent(s);if(o!==0){const a=Ih.getComponent(s);Mh.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(r_.copy(yh).applyMatrix4(Mh),o)}}return e.applyMatrix4(this.bindMatrixInverse)}}class qu extends de{constructor(){super(),this.isBone=!0,this.type="Bone"}}class dr extends xe{constructor(t=null,e=1,n=1,i,s,o,a,c,l=ze,h=ze,u,d){super(null,o,a,c,l,h,i,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const wh=new Pt,o_=new Pt;class Yc{constructor(t=[],e=[]){this.uuid=on(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Pt)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new Pt;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=t.length;s<o;s++){const a=t[s]?t[s].matrixWorld:o_;wh.multiplyMatrices(a,e[s]),wh.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Yc(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new dr(e,t,t,ye,Le);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const i=this.bones[e];if(i.name===t)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,i=t.bones.length;n<i;n++){const s=t.bones[n];let o=e[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new qu),this.bones.push(o),this.boneInverses.push(new Pt().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let i=0,s=e.length;i<s;i++){const o=e[i];t.bones.push(o.uuid);const a=n[i];t.boneInverses.push(a.toArray())}return t}}class Eo extends fe{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ji=new Pt,Bh=new Pt,zr=[],Th=new qe,a_=new Pt,Rs=new ue,Ds=new vn;class ts extends ue{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Eo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,a_)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new qe),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ji),Th.copy(t.boundingBox).applyMatrix4(Ji),this.boundingBox.union(Th)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new vn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ji),Ds.copy(t.boundingSphere).applyMatrix4(Ji),this.boundingSphere.union(Ds)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=t*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Rs.geometry=this.geometry,Rs.material=this.material,Rs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ds.copy(this.boundingSphere),Ds.applyMatrix4(n),t.ray.intersectsSphere(Ds)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ji),Bh.multiplyMatrices(n,Ji),Rs.matrixWorld=Bh,Rs.raycast(t,zr);for(let o=0,a=zr.length;o<a;o++){const c=zr[o];c.instanceId=s,c.object=this,e.push(c)}zr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Eo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new dr(new Float32Array(i*this.count),i,this.count,ii,Le));const s=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=i*t;s[c]=a,s.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Xu extends cn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const xo=new B,vo=new B,bh=new Pt,Ls=new To,Hr=new vn,ma=new B,Rh=new B;class Jc extends de{constructor(t=new Ae,e=new Xu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,s=e.count;i<s;i++)xo.fromBufferAttribute(e,i-1),vo.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=xo.distanceTo(vo);t.setAttribute("lineDistance",new Zt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(i),Hr.radius+=s,t.ray.intersectsSphere(Hr)===!1)return;bh.copy(i).invert(),Ls.copy(t.ray).applyMatrix4(bh);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,o.start),A=Math.min(h.count,o.start+o.count);for(let m=f,g=A-1;m<g;m+=l){const p=h.getX(m),x=h.getX(m+1),E=Vr(this,t,Ls,c,p,x);E&&e.push(E)}if(this.isLineLoop){const m=h.getX(A-1),g=h.getX(f),p=Vr(this,t,Ls,c,m,g);p&&e.push(p)}}else{const f=Math.max(0,o.start),A=Math.min(d.count,o.start+o.count);for(let m=f,g=A-1;m<g;m+=l){const p=Vr(this,t,Ls,c,m,m+1);p&&e.push(p)}if(this.isLineLoop){const m=Vr(this,t,Ls,c,A-1,f);m&&e.push(m)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Vr(r,t,e,n,i,s){const o=r.geometry.attributes.position;if(xo.fromBufferAttribute(o,i),vo.fromBufferAttribute(o,s),e.distanceSqToSegment(xo,vo,ma,Rh)>n)return;ma.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(ma);if(!(c<t.near||c>t.far))return{distance:c,point:Rh.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}const Dh=new B,Lh=new B;class c_ extends Jc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let i=0,s=e.count;i<s;i+=2)Dh.fromBufferAttribute(e,i),Lh.fromBufferAttribute(e,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Dh.distanceTo(Lh);t.setAttribute("lineDistance",new Zt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class l_ extends Jc{constructor(t,e){super(t,e),this.isLineLoop=!0,this.type="LineLoop"}}class Kc extends cn{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Ph=new Pt,Ec=new To,Wr=new vn,qr=new B;class Yu extends de{constructor(t=new Ae,e=new Kc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,s=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Wr.copy(n.boundingSphere),Wr.applyMatrix4(i),Wr.radius+=s,t.ray.intersectsSphere(Wr)===!1)return;Ph.copy(i).invert(),Ec.copy(t.ray).applyMatrix4(Ph);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let A=d,m=f;A<m;A++){const g=l.getX(A);qr.fromBufferAttribute(u,g),Uh(qr,g,c,i,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let A=d,m=f;A<m;A++)qr.fromBufferAttribute(u,A),Uh(qr,A,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Uh(r,t,e,n,i,s,o){const a=Ec.distanceSqToPoint(r);if(a<e){const c=new B;Ec.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Lo extends xe{constructor(t,e,n,i,s,o,a,c,l,h,u,d){super(null,o,a,c,l,h,i,s,u,d),this.isCompressedTexture=!0,this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}}class h_ extends Lo{constructor(t,e,n,i,s,o){super(t,e,n,s,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=Gn,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class u_ extends Lo{constructor(t,e,n){super(void 0,t[0].width,t[0].height,e,n,yi),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=t}}class Po extends xe{constructor(t,e,n,i,s,o,a,c,l){super(t,e,n,i,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Mn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),s=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),s+=n.distanceTo(i),e.push(s),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const s=n.length;let o;e?o=e:o=t*n[s-1];let a=0,c=s-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(s-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(s-1)}getTangent(t,e){let i=t-1e-4,s=t+1e-4;i<0&&(i=0),s>1&&(s=1);const o=this.getPoint(i),a=this.getPoint(s),c=e||(o.isVector2?new tt:new B);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new B,i=[],s=[],o=[],a=new B,c=new Pt;for(let f=0;f<=t;f++){const A=f/t;i[f]=this.getTangentAt(A,new B)}s[0]=new B,o[0]=new B;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],a),o[0].crossVectors(i[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const A=Math.acos(ve(i[f-1].dot(i[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(a,A))}o[f].crossVectors(i[f],s[f])}if(e===!0){let f=Math.acos(ve(s[0].dot(s[t]),-1,1));f/=t,i[0].dot(a.crossVectors(s[0],s[t]))>0&&(f=-f);for(let A=1;A<=t;A++)s[A].applyMatrix4(c.makeRotationAxis(i[A],f*A)),o[A].crossVectors(i[A],s[A])}return{tangents:i,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class jc extends Mn{constructor(t=0,e=0,n=1,i=1,s=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new tt){const n=e,i=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(o?s=0:s=i),this.aClockwise===!0&&!o&&(s===i?s=-i:s=s-i);const a=this.aStartAngle+t*s;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class d_ extends jc{constructor(t,e,n,i,s,o){super(t,e,n,n,i,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Zc(){let r=0,t=0,e=0,n=0;function i(s,o,a,c){r=s,t=a,e=-3*s+3*o-2*a-c,n=2*s-2*o+a+c}return{initCatmullRom:function(s,o,a,c,l){i(o,a,l*(a-s),l*(c-o))},initNonuniformCatmullRom:function(s,o,a,c,l,h,u){let d=(o-s)/l-(a-s)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(s){const o=s*s,a=o*s;return r+t*s+e*o+n*a}}}const Xr=new B,_a=new Zc,Ea=new Zc,xa=new Zc;class f_ extends Mn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new B){const n=e,i=this.points,s=i.length,o=(s-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:c===0&&a===s-1&&(a=s-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%s]:(Xr.subVectors(i[0],i[1]).add(i[0]),l=Xr);const u=i[a%s],d=i[(a+1)%s];if(this.closed||a+2<s?h=i[(a+2)%s]:(Xr.subVectors(i[s-1],i[s-2]).add(i[s-1]),h=Xr),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let A=Math.pow(l.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);m<1e-4&&(m=1),A<1e-4&&(A=m),g<1e-4&&(g=m),_a.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,A,m,g),Ea.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,A,m,g),xa.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,A,m,g)}else this.curveType==="catmullrom"&&(_a.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Ea.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),xa.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(_a.calc(c),Ea.calc(c),xa.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new B().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Nh(r,t,e,n,i){const s=(n-t)*.5,o=(i-e)*.5,a=r*r,c=r*a;return(2*e-2*n+s+o)*c+(-3*e+3*n-2*s-o)*a+s*r+e}function A_(r,t){const e=1-r;return e*e*t}function p_(r,t){return 2*(1-r)*r*t}function g_(r,t){return r*r*t}function Xs(r,t,e,n){return A_(r,t)+p_(r,e)+g_(r,n)}function m_(r,t){const e=1-r;return e*e*e*t}function __(r,t){const e=1-r;return 3*e*e*r*t}function E_(r,t){return 3*(1-r)*r*r*t}function x_(r,t){return r*r*r*t}function Ys(r,t,e,n,i){return m_(r,t)+__(r,e)+E_(r,n)+x_(r,i)}class Ju extends Mn{constructor(t=new tt,e=new tt,n=new tt,i=new tt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new tt){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Ys(t,i.x,s.x,o.x,a.x),Ys(t,i.y,s.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class v_ extends Mn{constructor(t=new B,e=new B,n=new B,i=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new B){const n=e,i=this.v0,s=this.v1,o=this.v2,a=this.v3;return n.set(Ys(t,i.x,s.x,o.x,a.x),Ys(t,i.y,s.y,o.y,a.y),Ys(t,i.z,s.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ku extends Mn{constructor(t=new tt,e=new tt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new tt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new tt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class y_ extends Mn{constructor(t=new B,e=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new B){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new B){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ju extends Mn{constructor(t=new tt,e=new tt,n=new tt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new tt){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Xs(t,i.x,s.x,o.x),Xs(t,i.y,s.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class I_ extends Mn{constructor(t=new B,e=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new B){const n=e,i=this.v0,s=this.v1,o=this.v2;return n.set(Xs(t,i.x,s.x,o.x),Xs(t,i.y,s.y,o.y),Xs(t,i.z,s.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Zu extends Mn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new tt){const n=e,i=this.points,s=(i.length-1)*t,o=Math.floor(s),a=s-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Nh(a,c.x,l.x,h.x,u.x),Nh(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new tt().fromArray(i))}return this}}var xc=Object.freeze({__proto__:null,ArcCurve:d_,CatmullRomCurve3:f_,CubicBezierCurve:Ju,CubicBezierCurve3:v_,EllipseCurve:jc,LineCurve:Ku,LineCurve3:y_,QuadraticBezierCurve:ju,QuadraticBezierCurve3:I_,SplineCurve:Zu});class C_ extends Mn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new xc[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let s=0;for(;s<i.length;){if(i[s]>=n){const o=i[s]-n,a=this.curves[s],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}s++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,s=this.curves;i<s.length;i++){const o=s[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new xc[i.type]().fromJSON(i))}return this}}class Fh extends C_{constructor(t){super(),this.type="Path",this.currentPoint=new tt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ku(this.currentPoint.clone(),new tt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const s=new ju(this.currentPoint.clone(),new tt(t,e),new tt(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,s,o){const a=new Ju(this.currentPoint.clone(),new tt(t,e),new tt(n,i),new tt(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Zu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,s,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,s,o),this}absarc(t,e,n,i,s,o){return this.absellipse(t,e,n,n,i,s,o),this}ellipse(t,e,n,i,s,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,s,o,a,c),this}absellipse(t,e,n,i,s,o,a,c){const l=new jc(t,e,n,i,s,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class we extends Ae{constructor(t=1,e=1,n=1,i=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let A=0;const m=[],g=n/2;let p=0;x(),o===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Zt(u,3)),this.setAttribute("normal",new Zt(d,3)),this.setAttribute("uv",new Zt(f,2));function x(){const _=new B,T=new B;let S=0;const M=(e-t)/n;for(let b=0;b<=s;b++){const I=[],v=b/s,D=v*(e-t)+t;for(let Q=0;Q<=i;Q++){const N=Q/i,z=N*c+a,q=Math.sin(z),H=Math.cos(z);T.x=D*q,T.y=-v*n+g,T.z=D*H,u.push(T.x,T.y,T.z),_.set(q,M,H).normalize(),d.push(_.x,_.y,_.z),f.push(N,1-v),I.push(A++)}m.push(I)}for(let b=0;b<i;b++)for(let I=0;I<s;I++){const v=m[I][b],D=m[I+1][b],Q=m[I+1][b+1],N=m[I][b+1];(t>0||I!==0)&&(h.push(v,D,N),S+=3),(e>0||I!==s-1)&&(h.push(D,Q,N),S+=3)}l.addGroup(p,S,0),p+=S}function E(_){const T=A,S=new tt,M=new B;let b=0;const I=_===!0?t:e,v=_===!0?1:-1;for(let Q=1;Q<=i;Q++)u.push(0,g*v,0),d.push(0,v,0),f.push(.5,.5),A++;const D=A;for(let Q=0;Q<=i;Q++){const z=Q/i*c+a,q=Math.cos(z),H=Math.sin(z);M.x=I*H,M.y=g*v,M.z=I*q,u.push(M.x,M.y,M.z),d.push(0,v,0),S.x=q*.5+.5,S.y=H*.5*v+.5,f.push(S.x,S.y),A++}for(let Q=0;Q<i;Q++){const N=T+Q,z=D+Q;_===!0?h.push(z,z+1,N):h.push(z+1,z,N),b+=3}l.addGroup(p,b,_===!0?1:2),p+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new we(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $c extends Ae{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const s=[],o=[];a(i),l(n),h(),this.setAttribute("position",new Zt(s,3)),this.setAttribute("normal",new Zt(s.slice(),3)),this.setAttribute("uv",new Zt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const E=new B,_=new B,T=new B;for(let S=0;S<e.length;S+=3)f(e[S+0],E),f(e[S+1],_),f(e[S+2],T),c(E,_,T,x)}function c(x,E,_,T){const S=T+1,M=[];for(let b=0;b<=S;b++){M[b]=[];const I=x.clone().lerp(_,b/S),v=E.clone().lerp(_,b/S),D=S-b;for(let Q=0;Q<=D;Q++)Q===0&&b===S?M[b][Q]=I:M[b][Q]=I.clone().lerp(v,Q/D)}for(let b=0;b<S;b++)for(let I=0;I<2*(S-b)-1;I++){const v=Math.floor(I/2);I%2===0?(d(M[b][v+1]),d(M[b+1][v]),d(M[b][v])):(d(M[b][v+1]),d(M[b+1][v+1]),d(M[b+1][v]))}}function l(x){const E=new B;for(let _=0;_<s.length;_+=3)E.x=s[_+0],E.y=s[_+1],E.z=s[_+2],E.normalize().multiplyScalar(x),s[_+0]=E.x,s[_+1]=E.y,s[_+2]=E.z}function h(){const x=new B;for(let E=0;E<s.length;E+=3){x.x=s[E+0],x.y=s[E+1],x.z=s[E+2];const _=g(x)/2/Math.PI+.5,T=p(x)/Math.PI+.5;o.push(_,1-T)}A(),u()}function u(){for(let x=0;x<o.length;x+=6){const E=o[x+0],_=o[x+2],T=o[x+4],S=Math.max(E,_,T),M=Math.min(E,_,T);S>.9&&M<.1&&(E<.2&&(o[x+0]+=1),_<.2&&(o[x+2]+=1),T<.2&&(o[x+4]+=1))}}function d(x){s.push(x.x,x.y,x.z)}function f(x,E){const _=x*3;E.x=t[_+0],E.y=t[_+1],E.z=t[_+2]}function A(){const x=new B,E=new B,_=new B,T=new B,S=new tt,M=new tt,b=new tt;for(let I=0,v=0;I<s.length;I+=9,v+=6){x.set(s[I+0],s[I+1],s[I+2]),E.set(s[I+3],s[I+4],s[I+5]),_.set(s[I+6],s[I+7],s[I+8]),S.set(o[v+0],o[v+1]),M.set(o[v+2],o[v+3]),b.set(o[v+4],o[v+5]),T.copy(x).add(E).add(_).divideScalar(3);const D=g(T);m(S,v+0,x,D),m(M,v+2,E,D),m(b,v+4,_,D)}}function m(x,E,_,T){T<0&&x.x===1&&(o[E]=x.x-1),_.x===0&&_.z===0&&(o[E]=T/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $c(t.vertices,t.indices,t.radius,t.details)}}class $u extends Fh{constructor(t){super(t),this.uuid=on(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Fh().fromJSON(i))}return this}}const M_={triangulate:function(r,t,e=2){const n=t&&t.length,i=n?t[0]*e:r.length;let s=td(r,0,i,e,!0);const o=[];if(!s||s.next===s.prev)return o;let a,c,l,h,u,d,f;if(n&&(s=b_(r,t,s,e)),r.length>80*e){a=l=r[0],c=h=r[1];for(let A=e;A<i;A+=e)u=r[A],d=r[A+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return or(s,o,e,a,c,f,0),o}};function td(r,t,e,n,i){let s,o;if(i===G_(r,t,e,n)>0)for(s=t;s<e;s+=n)o=Qh(s,r[s],r[s+1],o);else for(s=e-n;s>=t;s-=n)o=Qh(s,r[s],r[s+1],o);return o&&Uo(o,o.next)&&(cr(o),o=o.next),o}function Si(r,t){if(!r)return r;t||(t=r);let e=r,n;do if(n=!1,!e.steiner&&(Uo(e,e.next)||ge(e.prev,e,e.next)===0)){if(cr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function or(r,t,e,n,i,s,o){if(!r)return;!o&&s&&U_(r,n,i,s);let a=r,c,l;for(;r.prev!==r.next;){if(c=r.prev,l=r.next,s?w_(r,n,i,s):S_(r)){t.push(c.i/e|0),t.push(r.i/e|0),t.push(l.i/e|0),cr(r),r=l.next,a=l.next;continue}if(r=l,r===a){o?o===1?(r=B_(Si(r),t,e),or(r,t,e,n,i,s,2)):o===2&&T_(r,t,e,n,i,s):or(Si(r),t,e,n,i,s,1);break}}}function S_(r){const t=r.prev,e=r,n=r.next;if(ge(t,e,n)>=0)return!1;const i=t.x,s=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=i<s?i<o?i:o:s<o?s:o,u=a<c?a<l?a:l:c<l?c:l,d=i>s?i>o?i:o:s>o?s:o,f=a>c?a>l?a:l:c>l?c:l;let A=n.next;for(;A!==t;){if(A.x>=h&&A.x<=d&&A.y>=u&&A.y<=f&&es(i,a,s,c,o,l,A.x,A.y)&&ge(A.prev,A,A.next)>=0)return!1;A=A.next}return!0}function w_(r,t,e,n){const i=r.prev,s=r,o=r.next;if(ge(i,s,o)>=0)return!1;const a=i.x,c=s.x,l=o.x,h=i.y,u=s.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,A=h<u?h<d?h:d:u<d?u:d,m=a>c?a>l?a:l:c>l?c:l,g=h>u?h>d?h:d:u>d?u:d,p=vc(f,A,t,e,n),x=vc(m,g,t,e,n);let E=r.prevZ,_=r.nextZ;for(;E&&E.z>=p&&_&&_.z<=x;){if(E.x>=f&&E.x<=m&&E.y>=A&&E.y<=g&&E!==i&&E!==o&&es(a,h,c,u,l,d,E.x,E.y)&&ge(E.prev,E,E.next)>=0||(E=E.prevZ,_.x>=f&&_.x<=m&&_.y>=A&&_.y<=g&&_!==i&&_!==o&&es(a,h,c,u,l,d,_.x,_.y)&&ge(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;E&&E.z>=p;){if(E.x>=f&&E.x<=m&&E.y>=A&&E.y<=g&&E!==i&&E!==o&&es(a,h,c,u,l,d,E.x,E.y)&&ge(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;_&&_.z<=x;){if(_.x>=f&&_.x<=m&&_.y>=A&&_.y<=g&&_!==i&&_!==o&&es(a,h,c,u,l,d,_.x,_.y)&&ge(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function B_(r,t,e){let n=r;do{const i=n.prev,s=n.next.next;!Uo(i,s)&&ed(i,n,n.next,s)&&ar(i,s)&&ar(s,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(s.i/e|0),cr(n),cr(n.next),n=r=s),n=n.next}while(n!==r);return Si(n)}function T_(r,t,e,n,i,s){let o=r;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Q_(o,a)){let c=nd(o,a);o=Si(o,o.next),c=Si(c,c.next),or(o,t,e,n,i,s,0),or(c,t,e,n,i,s,0);return}a=a.next}o=o.next}while(o!==r)}function b_(r,t,e,n){const i=[];let s,o,a,c,l;for(s=0,o=t.length;s<o;s++)a=t[s]*n,c=s<o-1?t[s+1]*n:r.length,l=td(r,a,c,n,!1),l===l.next&&(l.steiner=!0),i.push(F_(l));for(i.sort(R_),s=0;s<i.length;s++)e=D_(i[s],e);return e}function R_(r,t){return r.x-t.x}function D_(r,t){const e=L_(r,t);if(!e)return t;const n=nd(e,r);return Si(n,n.next),Si(e,e.next)}function L_(r,t){let e=t,n=-1/0,i;const s=r.x,o=r.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=s&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===s))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,c=i.x,l=i.y;let h=1/0,u;e=i;do s>=e.x&&e.x>=c&&s!==e.x&&es(o<l?s:n,o,c,l,o<l?n:s,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(s-e.x),ar(e,r)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&P_(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function P_(r,t){return ge(r.prev,r,t.prev)<0&&ge(t.next,r,r.next)<0}function U_(r,t,e,n){let i=r;do i.z===0&&(i.z=vc(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==r);i.prevZ.nextZ=null,i.prevZ=null,N_(i)}function N_(r){let t,e,n,i,s,o,a,c,l=1;do{for(e=r,r=null,s=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,c--),s?s.nextZ=i:r=i,i.prevZ=s,s=i;e=n}s.nextZ=null,l*=2}while(o>1);return r}function vc(r,t,e,n,i){return r=(r-e)*i|0,t=(t-n)*i|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,r|t<<1}function F_(r){let t=r,e=r;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==r);return e}function es(r,t,e,n,i,s,o,a){return(i-o)*(t-a)>=(r-o)*(s-a)&&(r-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(s-a)>=(i-o)*(n-a)}function Q_(r,t){return r.next.i!==t.i&&r.prev.i!==t.i&&!k_(r,t)&&(ar(r,t)&&ar(t,r)&&O_(r,t)&&(ge(r.prev,r,t.prev)||ge(r,t.prev,t))||Uo(r,t)&&ge(r.prev,r,r.next)>0&&ge(t.prev,t,t.next)>0)}function ge(r,t,e){return(t.y-r.y)*(e.x-t.x)-(t.x-r.x)*(e.y-t.y)}function Uo(r,t){return r.x===t.x&&r.y===t.y}function ed(r,t,e,n){const i=Jr(ge(r,t,e)),s=Jr(ge(r,t,n)),o=Jr(ge(e,n,r)),a=Jr(ge(e,n,t));return!!(i!==s&&o!==a||i===0&&Yr(r,e,t)||s===0&&Yr(r,n,t)||o===0&&Yr(e,r,n)||a===0&&Yr(e,t,n))}function Yr(r,t,e){return t.x<=Math.max(r.x,e.x)&&t.x>=Math.min(r.x,e.x)&&t.y<=Math.max(r.y,e.y)&&t.y>=Math.min(r.y,e.y)}function Jr(r){return r>0?1:r<0?-1:0}function k_(r,t){let e=r;do{if(e.i!==r.i&&e.next.i!==r.i&&e.i!==t.i&&e.next.i!==t.i&&ed(e,e.next,r,t))return!0;e=e.next}while(e!==r);return!1}function ar(r,t){return ge(r.prev,r,r.next)<0?ge(r,t,r.next)>=0&&ge(r,r.prev,t)>=0:ge(r,t,r.prev)<0||ge(r,r.next,t)<0}function O_(r,t){let e=r,n=!1;const i=(r.x+t.x)/2,s=(r.y+t.y)/2;do e.y>s!=e.next.y>s&&e.next.y!==e.y&&i<(e.next.x-e.x)*(s-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==r);return n}function nd(r,t){const e=new yc(r.i,r.x,r.y),n=new yc(t.i,t.x,t.y),i=r.next,s=t.prev;return r.next=t,t.prev=r,e.next=i,i.prev=e,n.next=e,e.prev=n,s.next=n,n.prev=s,n}function Qh(r,t,e,n){const i=new yc(r,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function cr(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function yc(r,t,e){this.i=r,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function G_(r,t,e,n){let i=0;for(let s=t,o=e-n;s<e;s+=n)i+=(r[o]-r[s])*(r[s+1]+r[o+1]),o=s;return i}class Js{static area(t){const e=t.length;let n=0;for(let i=e-1,s=0;s<e;i=s++)n+=t[i].x*t[s].y-t[s].x*t[i].y;return n*.5}static isClockWise(t){return Js.area(t)<0}static triangulateShape(t,e){const n=[],i=[],s=[];kh(t),Oh(n,t);let o=t.length;e.forEach(kh);for(let c=0;c<e.length;c++)i.push(o),o+=e[c].length,Oh(n,e[c]);const a=M_.triangulate(n,i);for(let c=0;c<a.length;c+=3)s.push(a.slice(c,c+3));return s}}function kh(r){const t=r.length;t>2&&r[t-1].equals(r[0])&&r.pop()}function Oh(r,t){for(let e=0;e<t.length;e++)r.push(t[e].x),r.push(t[e].y)}class tl extends Ae{constructor(t=new $u([new tt(.5,.5),new tt(-.5,.5),new tt(-.5,-.5),new tt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],s=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new Zt(i,3)),this.setAttribute("uv",new Zt(s,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,A=e.bevelSize!==void 0?e.bevelSize:f-.1,m=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,x=e.UVGenerator!==void 0?e.UVGenerator:z_;let E,_=!1,T,S,M,b;p&&(E=p.getSpacedPoints(h),_=!0,d=!1,T=p.computeFrenetFrames(h,!1),S=new B,M=new B,b=new B),d||(g=0,f=0,A=0,m=0);const I=a.extractPoints(l);let v=I.shape;const D=I.holes;if(!Js.isClockWise(v)){v=v.reverse();for(let j=0,nt=D.length;j<nt;j++){const R=D[j];Js.isClockWise(R)&&(D[j]=R.reverse())}}const N=Js.triangulateShape(v,D),z=v;for(let j=0,nt=D.length;j<nt;j++){const R=D[j];v=v.concat(R)}function q(j,nt,R){return nt||console.error("THREE.ExtrudeGeometry: vec does not exist"),j.clone().addScaledVector(nt,R)}const H=v.length,W=N.length;function O(j,nt,R){let wt,$,_t;const at=j.x-nt.x,Dt=j.y-nt.y,gt=R.x-j.x,w=R.y-j.y,y=at*at+Dt*Dt,F=at*w-Dt*gt;if(Math.abs(F)>Number.EPSILON){const X=Math.sqrt(y),Z=Math.sqrt(gt*gt+w*w),J=nt.x-Dt/X,It=nt.y+at/X,ht=R.x-w/Z,mt=R.y+gt/Z,qt=((ht-J)*w-(mt-It)*gt)/(at*w-Dt*gt);wt=J+at*qt-j.x,$=It+Dt*qt-j.y;const et=wt*wt+$*$;if(et<=2)return new tt(wt,$);_t=Math.sqrt(et/2)}else{let X=!1;at>Number.EPSILON?gt>Number.EPSILON&&(X=!0):at<-Number.EPSILON?gt<-Number.EPSILON&&(X=!0):Math.sign(Dt)===Math.sign(w)&&(X=!0),X?(wt=-Dt,$=at,_t=Math.sqrt(y)):(wt=at,$=Dt,_t=Math.sqrt(y/2))}return new tt(wt/_t,$/_t)}const it=[];for(let j=0,nt=z.length,R=nt-1,wt=j+1;j<nt;j++,R++,wt++)R===nt&&(R=0),wt===nt&&(wt=0),it[j]=O(z[j],z[R],z[wt]);const lt=[];let At,Rt=it.concat();for(let j=0,nt=D.length;j<nt;j++){const R=D[j];At=[];for(let wt=0,$=R.length,_t=$-1,at=wt+1;wt<$;wt++,_t++,at++)_t===$&&(_t=0),at===$&&(at=0),At[wt]=O(R[wt],R[_t],R[at]);lt.push(At),Rt=Rt.concat(At)}for(let j=0;j<g;j++){const nt=j/g,R=f*Math.cos(nt*Math.PI/2),wt=A*Math.sin(nt*Math.PI/2)+m;for(let $=0,_t=z.length;$<_t;$++){const at=q(z[$],it[$],wt);ot(at.x,at.y,-R)}for(let $=0,_t=D.length;$<_t;$++){const at=D[$];At=lt[$];for(let Dt=0,gt=at.length;Dt<gt;Dt++){const w=q(at[Dt],At[Dt],wt);ot(w.x,w.y,-R)}}}const Vt=A+m;for(let j=0;j<H;j++){const nt=d?q(v[j],Rt[j],Vt):v[j];_?(M.copy(T.normals[0]).multiplyScalar(nt.x),S.copy(T.binormals[0]).multiplyScalar(nt.y),b.copy(E[0]).add(M).add(S),ot(b.x,b.y,b.z)):ot(nt.x,nt.y,0)}for(let j=1;j<=h;j++)for(let nt=0;nt<H;nt++){const R=d?q(v[nt],Rt[nt],Vt):v[nt];_?(M.copy(T.normals[j]).multiplyScalar(R.x),S.copy(T.binormals[j]).multiplyScalar(R.y),b.copy(E[j]).add(M).add(S),ot(b.x,b.y,b.z)):ot(R.x,R.y,u/h*j)}for(let j=g-1;j>=0;j--){const nt=j/g,R=f*Math.cos(nt*Math.PI/2),wt=A*Math.sin(nt*Math.PI/2)+m;for(let $=0,_t=z.length;$<_t;$++){const at=q(z[$],it[$],wt);ot(at.x,at.y,u+R)}for(let $=0,_t=D.length;$<_t;$++){const at=D[$];At=lt[$];for(let Dt=0,gt=at.length;Dt<gt;Dt++){const w=q(at[Dt],At[Dt],wt);_?ot(w.x,w.y+E[h-1].y,E[h-1].x+R):ot(w.x,w.y,u+R)}}}Y(),st();function Y(){const j=i.length/3;if(d){let nt=0,R=H*nt;for(let wt=0;wt<W;wt++){const $=N[wt];Tt($[2]+R,$[1]+R,$[0]+R)}nt=h+g*2,R=H*nt;for(let wt=0;wt<W;wt++){const $=N[wt];Tt($[0]+R,$[1]+R,$[2]+R)}}else{for(let nt=0;nt<W;nt++){const R=N[nt];Tt(R[2],R[1],R[0])}for(let nt=0;nt<W;nt++){const R=N[nt];Tt(R[0]+H*h,R[1]+H*h,R[2]+H*h)}}n.addGroup(j,i.length/3-j,0)}function st(){const j=i.length/3;let nt=0;vt(z,nt),nt+=z.length;for(let R=0,wt=D.length;R<wt;R++){const $=D[R];vt($,nt),nt+=$.length}n.addGroup(j,i.length/3-j,1)}function vt(j,nt){let R=j.length;for(;--R>=0;){const wt=R;let $=R-1;$<0&&($=j.length-1);for(let _t=0,at=h+g*2;_t<at;_t++){const Dt=H*_t,gt=H*(_t+1),w=nt+wt+Dt,y=nt+$+Dt,F=nt+$+gt,X=nt+wt+gt;Ft(w,y,F,X)}}}function ot(j,nt,R){c.push(j),c.push(nt),c.push(R)}function Tt(j,nt,R){Ut(j),Ut(nt),Ut(R);const wt=i.length/3,$=x.generateTopUV(n,i,wt-3,wt-2,wt-1);Jt($[0]),Jt($[1]),Jt($[2])}function Ft(j,nt,R,wt){Ut(j),Ut(nt),Ut(wt),Ut(nt),Ut(R),Ut(wt);const $=i.length/3,_t=x.generateSideWallUV(n,i,$-6,$-3,$-2,$-1);Jt(_t[0]),Jt(_t[1]),Jt(_t[3]),Jt(_t[1]),Jt(_t[2]),Jt(_t[3])}function Ut(j){i.push(c[j*3+0]),i.push(c[j*3+1]),i.push(c[j*3+2])}function Jt(j){s.push(j.x),s.push(j.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return H_(e,n,t)}static fromJSON(t,e){const n=[];for(let s=0,o=t.shapes.length;s<o;s++){const a=e[t.shapes[s]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new xc[i.type]().fromJSON(i)),new tl(n,t.options)}}const z_={generateTopUV:function(r,t,e,n,i){const s=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new tt(s,o),new tt(a,c),new tt(l,h)]},generateSideWallUV:function(r,t,e,n,i,s){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],A=t[i*3+2],m=t[s*3],g=t[s*3+1],p=t[s*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new tt(o,1-c),new tt(l,1-u),new tt(d,1-A),new tt(m,1-p)]:[new tt(a,1-c),new tt(h,1-u),new tt(f,1-A),new tt(g,1-p)]}};function H_(r,t,e){if(e.shapes=[],Array.isArray(r))for(let n=0,i=r.length;n<i;n++){const s=r[n];e.shapes.push(s.uuid)}else e.shapes.push(r.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class No extends $c{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new No(t.radius,t.detail)}}class fr extends Ae{constructor(t=1,e=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new B,d=new B,f=[],A=[],m=[],g=[];for(let p=0;p<=n;p++){const x=[],E=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let T=0;T<=e;T++){const S=T/e;u.x=-t*Math.cos(i+S*s)*Math.sin(o+E*a),u.y=t*Math.cos(o+E*a),u.z=t*Math.sin(i+S*s)*Math.sin(o+E*a),A.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),g.push(S+_,1-E),x.push(l++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<e;x++){const E=h[p][x+1],_=h[p][x],T=h[p+1][x],S=h[p+1][x+1];(p!==0||o>0)&&f.push(E,_,S),(p!==n-1||c<Math.PI)&&f.push(_,T,S)}this.setIndex(f),this.setAttribute("position",new Zt(A,3)),this.setAttribute("normal",new Zt(m,3)),this.setAttribute("uv",new Zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fr(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class el extends Ae{constructor(t=1,e=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new B,u=new B,d=new B;for(let f=0;f<=n;f++)for(let A=0;A<=i;A++){const m=A/i*s,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(m),u.y=(t+e*Math.cos(g))*Math.sin(m),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(m),h.y=t*Math.sin(m),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(A/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let A=1;A<=i;A++){const m=(i+1)*f+A-1,g=(i+1)*(f-1)+A-1,p=(i+1)*(f-1)+A,x=(i+1)*f+A;o.push(m,g,x),o.push(g,p,x)}this.setIndex(o),this.setAttribute("position",new Zt(a,3)),this.setAttribute("normal",new Zt(c,3)),this.setAttribute("uv",new Zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new el(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class ln extends cn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hc,this.normalScale=new tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Sn extends ln{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new tt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ve(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new yt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new yt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new yt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class nl extends cn{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Hc,this.normalScale=new tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new En,this.combine=Uc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}function Kr(r,t,e){return!r||!e&&r.constructor===t?r:typeof t.BYTES_PER_ELEMENT=="number"?new t(r):Array.prototype.slice.call(r)}function V_(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function W_(r){function t(i,s){return r[i]-r[s]}const e=r.length,n=new Array(e);for(let i=0;i!==e;++i)n[i]=i;return n.sort(t),n}function Gh(r,t,e){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=e[s]*t;for(let c=0;c!==t;++c)i[o++]=r[a+c]}return i}function id(r,t,e,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(t.push(s.time),e.push.apply(e,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(t.push(s.time),o.toArray(e,e.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(t.push(s.time),e.push(o)),s=r[i++];while(s!==void 0)}class Ar{constructor(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){const e=this.parameterPositions;let n=this._cachedIndex,i=e[n],s=e[n-1];t:{e:{let o;n:{i:if(!(t<i)){for(let a=n+2;;){if(i===void 0){if(t<s)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=e[++n],t<i)break e}o=e.length;break n}if(!(t>=s)){const a=e[1];t<a&&(n=2,s=a);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=e[--n-1],t>=s)break e}o=n,n=0;break n}break t}for(;n<o;){const a=n+o>>>1;t<e[a]?o=a:n=a+1}if(i=e[n],s=e[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,t,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i;for(let o=0;o!==i;++o)e[o]=n[s+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class q_ extends Ar{constructor(t,e,n,i){super(t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ji,endingEnd:ji}}intervalChanged_(t,e,n){const i=this.parameterPositions;let s=t-2,o=t+1,a=i[s],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Zi:s=t,a=2*e-n;break;case po:s=i.length-2,a=e+i[s]-i[s+1];break;default:s=t,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Zi:o=t,c=2*n-e;break;case po:o=1,c=n+i[1]-i[0];break;default:o=t-1,c=e}const l=(n-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,A=(n-e)/(i-e),m=A*A,g=m*A,p=-d*g+2*d*m-d*A,x=(1+d)*g+(-1.5-2*d)*m+(-.5+d)*A+1,E=(-1-f)*g+(1.5+f)*m+.5*A,_=f*g-f*m;for(let T=0;T!==a;++T)s[T]=p*o[h+T]+x*o[l+T]+E*o[c+T]+_*o[u+T];return s}}class sd extends Ar{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(n-e)/(i-e),u=1-h;for(let d=0;d!==a;++d)s[d]=o[l+d]*u+o[c+d]*h;return s}}class X_ extends Ar{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t){return this.copySampleValue_(t-1)}}class wn{constructor(t,e,n,i){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Kr(e,this.TimeBufferType),this.values=Kr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(t){const e=t.constructor;let n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Kr(t.times,Array),values:Kr(t.values,Array)};const i=t.getInterpolation();i!==t.DefaultInterpolation&&(n.interpolation=i)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new X_(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new sd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new q_(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case nr:e=this.InterpolantFactoryMethodDiscrete;break;case ir:e=this.InterpolantFactoryMethodLinear;break;case Oo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return nr;case this.InterpolantFactoryMethodLinear:return ir;case this.InterpolantFactoryMethodSmooth:return Oo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]+=t}return this}scale(t){if(t!==1){const e=this.times;for(let n=0,i=e.length;n!==i;++n)e[n]*=t}return this}trim(t,e){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<t;)++s;for(;o!==-1&&n[o]>e;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let t=!0;const e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==s;a++){const c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(i!==void 0&&V_(i))for(let a=0,c=i.length;a!==c;++a){const l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){const t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Oo,s=t.length-1;let o=1;for(let a=1;a<s;++a){let c=!1;const l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(i)c=!0;else{const u=a*n,d=u-n,f=u+n;for(let A=0;A!==n;++A){const m=e[u+A];if(m!==e[d+A]||m!==e[f+A]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(s>0){t[o]=t[s];for(let a=s*n,c=o*n,l=0;l!==n;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){const t=this.times.slice(),e=this.values.slice(),n=this.constructor,i=new n(this.name,t,e);return i.createInterpolant=this.createInterpolant,i}}wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=ir;class Es extends wn{constructor(t,e,n){super(t,e,n)}}Es.prototype.ValueTypeName="bool";Es.prototype.ValueBufferType=Array;Es.prototype.DefaultInterpolation=nr;Es.prototype.InterpolantFactoryMethodLinear=void 0;Es.prototype.InterpolantFactoryMethodSmooth=void 0;class rd extends wn{}rd.prototype.ValueTypeName="color";class ds extends wn{}ds.prototype.ValueTypeName="number";class Y_ extends Ar{constructor(t,e,n,i){super(t,e,n,i)}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-e)/(i-e);let l=t*a;for(let h=l+a;l!==h;l+=4)an.slerpFlat(s,0,o,l-a,o,l,c);return s}}class fs extends wn{InterpolantFactoryMethodLinear(t){return new Y_(this.times,this.values,this.getValueSize(),t)}}fs.prototype.ValueTypeName="quaternion";fs.prototype.InterpolantFactoryMethodSmooth=void 0;class xs extends wn{constructor(t,e,n){super(t,e,n)}}xs.prototype.ValueTypeName="string";xs.prototype.ValueBufferType=Array;xs.prototype.DefaultInterpolation=nr;xs.prototype.InterpolantFactoryMethodLinear=void 0;xs.prototype.InterpolantFactoryMethodSmooth=void 0;class As extends wn{}As.prototype.ValueTypeName="vector";class Ic{constructor(t="",e=-1,n=[],i=zc){this.name=t,this.tracks=n,this.duration=e,this.blendMode=i,this.uuid=on(),this.duration<0&&this.resetDuration()}static parse(t){const e=[],n=t.tracks,i=1/(t.fps||1);for(let o=0,a=n.length;o!==a;++o)e.push(K_(n[o]).scale(i));const s=new this(t.name,t.duration,e,t.blendMode);return s.uuid=t.uuid,s}static toJSON(t){const e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e,uuid:t.uuid,blendMode:t.blendMode};for(let s=0,o=n.length;s!==o;++s)e.push(wn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(t,e,n,i){const s=e.length,o=[];for(let a=0;a<s;a++){let c=[],l=[];c.push((a+s-1)%s,a,(a+1)%s),l.push(0,1,0);const h=W_(c);c=Gh(c,1,h),l=Gh(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),o.push(new ds(".morphTargetInfluences["+e[a].name+"]",c,l).scale(1/n))}return new this(t,-1,o)}static findByName(t,e){let n=t;if(!Array.isArray(t)){const i=t;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===e)return n[i];return null}static CreateClipsFromMorphTargetSequences(t,e,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,c=t.length;a<c;a++){const l=t[a],h=l.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(l)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],e,n));return o}static parseAnimation(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,A,m){if(f.length!==0){const g=[],p=[];id(f,g,p,A),g.length!==0&&m.push(new u(d,g,p))}},i=[],s=t.name||"default",o=t.fps||30,a=t.blendMode;let c=t.length||-1;const l=t.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let A;for(A=0;A<d.length;A++)if(d[A].morphTargets)for(let m=0;m<d[A].morphTargets.length;m++)f[d[A].morphTargets[m]]=-1;for(const m in f){const g=[],p=[];for(let x=0;x!==d[A].morphTargets.length;++x){const E=d[A];g.push(E.time),p.push(E.morphTarget===m?1:0)}i.push(new ds(".morphTargetInfluence["+m+"]",g,p))}c=f.length*o}else{const f=".bones["+e[u].name+"]";n(As,f+".position",d,"pos",i),n(fs,f+".quaternion",d,"rot",i),n(As,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,c,i,a)}resetDuration(){const t=this.tracks;let e=0;for(let n=0,i=t.length;n!==i;++n){const s=this.tracks[n];e=Math.max(e,s.times[s.times.length-1])}return this.duration=e,this}trim(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this}validate(){let t=!0;for(let e=0;e<this.tracks.length;e++)t=t&&this.tracks[e].validate();return t}optimize(){for(let t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}clone(){const t=[];for(let e=0;e<this.tracks.length;e++)t.push(this.tracks[e].clone());return new this.constructor(this.name,this.duration,t,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function J_(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ds;case"vector":case"vector2":case"vector3":case"vector4":return As;case"color":return rd;case"quaternion":return fs;case"bool":case"boolean":return Es;case"string":return xs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function K_(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const t=J_(r.type);if(r.times===void 0){const e=[],n=[];id(r.keys,e,n,"value"),r.times=e,r.values=n}return t.parse!==void 0?t.parse(r):new t(r.name,r.times,r.values,r.interpolation)}const si={enabled:!1,files:{},add:function(r,t){this.enabled!==!1&&(this.files[r]=t)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class j_{constructor(t,e,n){const i=this;let s=!1,o=0,a=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],A=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return A}return null}}}const Z_=new j_;class Ti{constructor(t){this.manager=t!==void 0?t:Z_,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,s){n.load(t,i,e,s)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}Ti.DEFAULT_MATERIAL_NAME="__DEFAULT";const Un={};class $_ extends Error{constructor(t,e){super(t),this.response=e}}class Ks extends Ti{constructor(t){super(t)}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=si.get(t);if(s!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(s),this.manager.itemEnd(t)},0),s;if(Un[t]!==void 0){Un[t].push({onLoad:e,onProgress:n,onError:i});return}Un[t]=[],Un[t].push({onLoad:e,onProgress:n,onError:i});const o=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Un[t],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,A=f!==0;let m=0;const g=new ReadableStream({start(p){x();function x(){u.read().then(({done:E,value:_})=>{if(E)p.close();else{m+=_.byteLength;const T=new ProgressEvent("progress",{lengthComputable:A,loaded:m,total:f});for(let S=0,M=h.length;S<M;S++){const b=h[S];b.onProgress&&b.onProgress(T)}p.enqueue(_),x()}},E=>{p.error(E)})}}});return new Response(g)}else throw new $_(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(A=>f.decode(A))}}}).then(l=>{si.add(t,l);const h=Un[t];delete Un[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Un[t];if(h===void 0)throw this.manager.itemError(t),l;delete Un[t];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}}class tE extends Ti{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=si.get(t);if(o!==void 0)return s.manager.itemStart(t),setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o;const a=sr("img");function c(){h(),si.add(t,this),e&&e(this),s.manager.itemEnd(t)}function l(u){h(),i&&i(u),s.manager.itemError(t),s.manager.itemEnd(t)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(t),a.src=t,a}}class od extends Ti{constructor(t){super(t)}load(t,e,n,i){const s=new xe,o=new tE(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){s.image=a,s.needsUpdate=!0,e!==void 0&&e(s)},n,i),s}}class Fo extends de{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class ad extends Fo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.groundColor=new yt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const va=new Pt,zh=new B,Hh=new B;class il{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new tt(512,512),this.map=null,this.mapPass=null,this.matrix=new Pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new bo,this._frameExtents=new tt(1,1),this._viewportCount=1,this._viewports=[new jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;zh.setFromMatrixPosition(t.matrixWorld),e.position.copy(zh),Hh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Hh),e.updateMatrixWorld(),va.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(va),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(va)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class eE extends il{constructor(){super(new Oe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){const e=this.camera,n=hs*2*t.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=t.distance||e.far;(n!==e.fov||i!==e.aspect||s!==e.far)&&(e.fov=n,e.aspect=i,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class nE extends Fo{constructor(t,e,n=0,i=Math.PI/3,s=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new eE}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const Vh=new Pt,Ps=new B,ya=new B;class iE extends il{constructor(){super(new Oe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new tt(4,2),this._viewportCount=6,this._viewports=[new jt(2,1,1,1),new jt(0,1,1,1),new jt(3,1,1,1),new jt(1,1,1,1),new jt(3,0,1,1),new jt(1,0,1,1)],this._cubeDirections=[new B(1,0,0),new B(-1,0,0),new B(0,0,1),new B(0,0,-1),new B(0,1,0),new B(0,-1,0)],this._cubeUps=[new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,1,0),new B(0,0,1),new B(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,s=t.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Ps.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ps),ya.copy(n.position),ya.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(ya),n.updateMatrixWorld(),i.makeTranslation(-Ps.x,-Ps.y,-Ps.z),Vh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vh)}}class sE extends Fo{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new iE}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class rE extends il{constructor(){super(new Ro(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class sl extends Fo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(de.DEFAULT_UP),this.updateMatrix(),this.target=new de,this.shadow=new rE}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class js{static decodeText(t){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(t);let e="";for(let n=0,i=t.length;n<i;n++)e+=String.fromCharCode(t[n]);try{return decodeURIComponent(escape(e))}catch{return e}}static extractUrlBase(t){const e=t.lastIndexOf("/");return e===-1?"./":t.slice(0,e+1)}static resolveURL(t,e){return typeof t!="string"||t===""?"":(/^https?:\/\//i.test(e)&&/^\//.test(t)&&(e=e.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(t)||/^data:.*,.*$/i.test(t)||/^blob:.*$/i.test(t)?t:e+t)}}class oE extends Ae{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class aE extends Ti{constructor(t){super(t),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(t){return this.options=t,this}load(t,e,n,i){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const s=this,o=si.get(t);if(o!==void 0){if(s.manager.itemStart(t),o.then){o.then(l=>{e&&e(l),s.manager.itemEnd(t)}).catch(l=>{i&&i(l)});return}return setTimeout(function(){e&&e(o),s.manager.itemEnd(t)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const c=fetch(t,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(l){return si.add(t,l),e&&e(l),s.manager.itemEnd(t),l}).catch(function(l){i&&i(l),si.remove(t),s.manager.itemError(t),s.manager.itemEnd(t)});si.add(t,c),s.manager.itemStart(t)}}class cE{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Wh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Wh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Wh(){return performance.now()}class lE{constructor(t,e,n){this.binding=t,this.valueSize=n;let i,s,o;switch(e){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(t,e){const n=this.buffer,i=this.valueSize,s=t*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=e}else{o+=e;const a=e/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(t){const e=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(e,i,0,t,n),this.cumulativeWeightAdditive+=t}apply(t){const e=this.valueSize,n=this.buffer,i=t*e+e,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=e*this._origIndex;this._mixBufferRegion(n,i,c,1-s,e)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*e,1,e);for(let c=e,l=e+e;c!==l;++c)if(n[c]!==n[c+e]){a.setValue(n,i);break}}saveOriginalState(){const t=this.binding,e=this.buffer,n=this.valueSize,i=n*this._origIndex;t.getValue(e,i);for(let s=n,o=i;s!==o;++s)e[s]=e[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const t=this.valueSize*3;this.binding.setValue(this.buffer,t)}_setAdditiveIdentityNumeric(){const t=this._addIndex*this.valueSize,e=t+this.valueSize;for(let n=t;n<e;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const t=this._origIndex*this.valueSize,e=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[e+n]=this.buffer[t+n]}_select(t,e,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)t[e+o]=t[n+o]}_slerp(t,e,n,i){an.slerpFlat(t,e,t,e,t,n,i)}_slerpAdditive(t,e,n,i,s){const o=this._workIndex*s;an.multiplyQuaternionsFlat(t,o,t,e,t,n),an.slerpFlat(t,e,t,e,t,o,i)}_lerp(t,e,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const c=e+a;t[c]=t[c]*o+t[n+a]*i}}_lerpAdditive(t,e,n,i,s){for(let o=0;o!==s;++o){const a=e+o;t[a]=t[a]+t[n+o]*i}}}const rl="\\[\\]\\.:\\/",hE=new RegExp("["+rl+"]","g"),ol="[^"+rl+"]",uE="[^"+rl.replace("\\.","")+"]",dE=/((?:WC+[\/:])*)/.source.replace("WC",ol),fE=/(WCOD+)?/.source.replace("WCOD",uE),AE=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ol),pE=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ol),gE=new RegExp("^"+dE+fE+AE+pE+"$"),mE=["material","materials","bones","map"];class _E{constructor(t,e,n){const i=n||ee.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}getValue(t,e){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(t,e)}setValue(t,e){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(t,e)}bind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){const t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}class ee{constructor(t,e,n){this.path=e,this.parsedPath=n||ee.parseTrackName(e),this.node=ee.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new ee.Composite(t,e,n):new ee(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(hE,"")}static parseTrackName(t){const e=gE.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);const n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);mE.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){const n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===e||a.uuid===e)return a;const c=n(a.children);if(c)return c}return null},i=n(t.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)t[e++]=n[i]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++]}_setValue_array_setNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node;const e=this.parsedPath,n=e.objectName,i=e.propertyName;let s=e.propertyIndex;if(t||(t=ee.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}const o=t[i];if(o===void 0){const l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[s]!==void 0&&(s=t.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}ee.Composite=_E;ee.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ee.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ee.prototype.GetterByBindingType=[ee.prototype._getValue_direct,ee.prototype._getValue_array,ee.prototype._getValue_arrayElement,ee.prototype._getValue_toArray];ee.prototype.SetterByBindingTypeAndVersioning=[[ee.prototype._setValue_direct,ee.prototype._setValue_direct_setNeedsUpdate,ee.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_array,ee.prototype._setValue_array_setNeedsUpdate,ee.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_arrayElement,ee.prototype._setValue_arrayElement_setNeedsUpdate,ee.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ee.prototype._setValue_fromArray,ee.prototype._setValue_fromArray_setNeedsUpdate,ee.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class EE{constructor(t,e,n=null,i=e.blendMode){this._mixer=t,this._clip=e,this._localRoot=n,this.blendMode=i;const s=e.tracks,o=s.length,a=new Array(o),c={endingStart:ji,endingEnd:ji};for(let l=0;l!==o;++l){const h=s[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=pf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(t){return this._startTime=t,this}setLoop(t,e){return this.loop=t,this.repetitions=e,this}setEffectiveWeight(t){return this.weight=t,this._effectiveWeight=this.enabled?t:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(t){return this._scheduleFading(t,0,1)}fadeOut(t){return this._scheduleFading(t,1,0)}crossFadeFrom(t,e,n){if(t.fadeOut(e),this.fadeIn(e),n){const i=this._clip.duration,s=t._clip.duration,o=s/i,a=i/s;t.warp(1,o,e),this.warp(a,1,e)}return this}crossFadeTo(t,e,n){return t.crossFadeFrom(this,e,n)}stopFading(){const t=this._weightInterpolant;return t!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}setEffectiveTimeScale(t){return this.timeScale=t,this._effectiveTimeScale=this.paused?0:t,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(t){return this.timeScale=this._clip.duration/t,this.stopWarping()}syncWith(t){return this.time=t.time,this.timeScale=t.timeScale,this.stopWarping()}halt(t){return this.warp(this._effectiveTimeScale,0,t)}warp(t,e,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const c=a.parameterPositions,l=a.sampleValues;return c[0]=s,c[1]=s+n,l[0]=t/o,l[1]=e/o,this}stopWarping(){const t=this._timeScaleInterpolant;return t!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(t)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(t,e,n,i){if(!this.enabled){this._updateWeight(t);return}const s=this._startTime;if(s!==null){const c=(t-s)*n;c<0||n===0?e=0:(this._startTime=null,e=n*c)}e*=this._updateTimeScale(t);const o=this._updateTime(e),a=this._updateWeight(t);if(a>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case mf:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case zc:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(i,a)}}}_updateWeight(t){let e=0;if(this.enabled){e=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=e,e}_updateTimeScale(t){let e=0;if(!this.paused){e=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(t)[0];e*=i,t>n.parameterPositions[1]&&(this.stopWarping(),e===0?this.paused=!0:this.timeScale=e)}}return this._effectiveTimeScale=e,e}_updateTime(t){const e=this._clip.duration,n=this.loop;let i=this.time+t,s=this._loopCount;const o=n===gf;if(t===0)return s===-1?i:o&&(s&1)===1?e-i:i;if(n===xu){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));t:{if(i>=e)i=e;else if(i<0)i=0;else{this.time=i;break t}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t<0?-1:1})}}else{if(s===-1&&(t>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=e||i<0){const a=Math.floor(i/e);i-=e*a,s+=Math.abs(a);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=t>0?e:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:t>0?1:-1});else{if(c===1){const l=t<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return e-i}return i}_setEndings(t,e,n){const i=this._interpolantSettings;n?(i.endingStart=Zi,i.endingEnd=Zi):(t?i.endingStart=this.zeroSlopeAtStart?Zi:ji:i.endingStart=po,e?i.endingEnd=this.zeroSlopeAtEnd?Zi:ji:i.endingEnd=po)}_scheduleFading(t,e,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,c=o.sampleValues;return a[0]=s,c[0]=e,a[1]=s+t,c[1]=n,this}}const xE=new Float32Array(1);class vE extends Bi{constructor(t){super(),this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(t,e){const n=t._localRoot||this._root,i=t._clip.tracks,s=i.length,o=t._propertyBindings,a=t._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let A=h[f];if(A!==void 0)++A.referenceCount,o[u]=A;else{if(A=o[u],A!==void 0){A._cacheIndex===null&&(++A.referenceCount,this._addInactiveBinding(A,c,f));continue}const m=e&&e._propertyBindings[u].binding.parsedPath;A=new lE(ee.create(n,f,m),d.ValueTypeName,d.getValueSize()),++A.referenceCount,this._addInactiveBinding(A,c,f),o[u]=A}a[u].resultBuffer=A.buffer}}_activateAction(t){if(!this._isActiveAction(t)){if(t._cacheIndex===null){const n=(t._localRoot||this._root).uuid,i=t._clip.uuid,s=this._actionsByClip[i];this._bindAction(t,s&&s.knownActions[0]),this._addInactiveAction(t,i,n)}const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(t)}}_deactivateAction(t){if(this._isActiveAction(t)){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(t)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const t=this;this.stats={actions:{get total(){return t._actions.length},get inUse(){return t._nActiveActions}},bindings:{get total(){return t._bindings.length},get inUse(){return t._nActiveBindings}},controlInterpolants:{get total(){return t._controlInterpolants.length},get inUse(){return t._nActiveControlInterpolants}}}}_isActiveAction(t){const e=t._cacheIndex;return e!==null&&e<this._nActiveActions}_addInactiveAction(t,e,n){const i=this._actions,s=this._actionsByClip;let o=s[e];if(o===void 0)o={knownActions:[t],actionByRoot:{}},t._byClipCacheIndex=0,s[e]=o;else{const a=o.knownActions;t._byClipCacheIndex=a.length,a.push(t)}t._cacheIndex=i.length,i.push(t),o.actionByRoot[n]=t}_removeInactiveAction(t){const e=this._actions,n=e[e.length-1],i=t._cacheIndex;n._cacheIndex=i,e[i]=n,e.pop(),t._cacheIndex=null;const s=t._clip.uuid,o=this._actionsByClip,a=o[s],c=a.knownActions,l=c[c.length-1],h=t._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),t._byClipCacheIndex=null;const u=a.actionByRoot,d=(t._localRoot||this._root).uuid;delete u[d],c.length===0&&delete o[s],this._removeInactiveBindingsForAction(t)}_removeInactiveBindingsForAction(t){const e=t._propertyBindings;for(let n=0,i=e.length;n!==i;++n){const s=e[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(t){const e=this._actions,n=t._cacheIndex,i=this._nActiveActions++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackAction(t){const e=this._actions,n=t._cacheIndex,i=--this._nActiveActions,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_addInactiveBinding(t,e,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[e];o===void 0&&(o={},i[e]=o),o[n]=t,t._cacheIndex=s.length,s.push(t)}_removeInactiveBinding(t){const e=this._bindings,n=t.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],c=e[e.length-1],l=t._cacheIndex;c._cacheIndex=l,e[l]=c,e.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(t){const e=this._bindings,n=t._cacheIndex,i=this._nActiveBindings++,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_takeBackBinding(t){const e=this._bindings,n=t._cacheIndex,i=--this._nActiveBindings,s=e[i];t._cacheIndex=i,e[i]=t,s._cacheIndex=n,e[n]=s}_lendControlInterpolant(){const t=this._controlInterpolants,e=this._nActiveControlInterpolants++;let n=t[e];return n===void 0&&(n=new sd(new Float32Array(2),new Float32Array(2),1,xE),n.__cacheIndex=e,t[e]=n),n}_takeBackControlInterpolant(t){const e=this._controlInterpolants,n=t.__cacheIndex,i=--this._nActiveControlInterpolants,s=e[i];t.__cacheIndex=i,e[i]=t,s.__cacheIndex=n,e[n]=s}clipAction(t,e,n){const i=e||this._root,s=i.uuid;let o=typeof t=="string"?Ic.findByName(i,t):t;const a=o!==null?o.uuid:t,c=this._actionsByClip[a];let l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=zc),c!==void 0){const u=c.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;const h=new EE(this,o,e,n);return this._bindAction(h,l),this._addInactiveAction(h,a,s),h}existingAction(t,e){const n=e||this._root,i=n.uuid,s=typeof t=="string"?Ic.findByName(n,t):t,o=s?s.uuid:t,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const t=this._actions,e=this._nActiveActions;for(let n=e-1;n>=0;--n)t[n].stop();return this}update(t){t*=this.timeScale;const e=this._actions,n=this._nActiveActions,i=this.time+=t,s=Math.sign(t),o=this._accuIndex^=1;for(let l=0;l!==n;++l)e[l]._update(i,t,s,o);const a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(t){this.time=0;for(let e=0;e<this._actions.length;e++)this._actions[e].time=0;return this.update(t)}getRoot(){return this._root}uncacheClip(t){const e=this._actions,n=t.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,c=o.length;a!==c;++a){const l=o[a];this._deactivateAction(l);const h=l._cacheIndex,u=e[e.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,e[h]=u,e.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(t){const e=t.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,c=a[e];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,s=i[e];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(t,e){const n=this.existingAction(t,e);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Lc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Lc);const yo={low:{label:"Низкая",pixelRatio:1,antialias:!1,shadows:!1,shadowMap:512,terrainSeg:160,normalMaps:!1,grass:6e3,grassDist:24,treeHi:40,viewDist:190,shadowDist:0},medium:{label:"Средняя",pixelRatio:1.5,antialias:!1,shadows:!0,shadowMap:1024,terrainSeg:224,normalMaps:!0,grass:1e4,grassDist:32,treeHi:65,viewDist:270,shadowDist:45},high:{label:"Высокая",pixelRatio:2,antialias:!0,shadows:!0,shadowMap:2048,terrainSeg:320,normalMaps:!0,grass:32e3,grassDist:50,treeHi:100,viewDist:380,shadowDist:70}},Ki=new URLSearchParams(location.search).has("touch")||matchMedia("(pointer: coarse)").matches||"ontouchstart"in window,yE=/iPhone|iPad|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,cd="hf_settings_v1",qh={quality:yE?"medium":"high",timeOfDay:"day",sensitivity:1,showFps:!0,nick:""};function IE(){try{return{...qh,...JSON.parse(localStorage.getItem(cd)||"{}")}}catch{return{...qh}}}function Ia(r){try{localStorage.setItem(cd,JSON.stringify(r))}catch{}}const Us={idle:["Idle","Idle_2"],walk:["Walk"],run:["Gallop","Run"],eat:["Eating","Idle_Headlow","Idle_2_HeadLow"],death:["Death"],attack:["Attack","Attack_Headbutt","Headbutt"]},al={deer:{url:"models/deer.glb",height:1.75,yaw:0,flatten:!0,anims:Us},stag:{url:"models/stag.glb",height:2.35,yaw:0,flatten:!0,anims:Us},wolf:{url:"models/wolf.glb",height:1.05,yaw:0,flatten:!0,anims:Us},fox:{url:"models/fox.glb",height:.62,yaw:0,flatten:!0,anims:Us},boar:{url:"models/boar.glb",height:.95,yaw:0,tint:6047284,anims:{...Us,eat:["Idle_Eating","Eating"],attack:["Headbutt","Attack"]},tusks:!0},hare:{url:"models/hare.glb",height:.45,yaw:0,hop:!0,anims:{}},hunter:{url:"models/hunter.glb",height:1.8,yaw:0,anims:{idle:["Idle_Gun","Idle"],walk:["Walk"],run:["Run"],aim:["Idle_Gun_Pointing"],shoot:["Idle_Gun_Shoot","Gun_Shoot"],death:["Death"]},rifle:{bone:"WristR",pos:[0,.08,.02],rot:[0,0,-Math.PI/2]}}},CE={rover:{url:"models/rover.glb",name:"Внедорожник",length:4.7,yaw:0,wheels:/^Tire[1-4]$/,maxSpeed:26,accel:8,seat:new B(.38,1.55,.15)},pickup:{url:"models/pickup.glb",name:"Пикап",length:5.4,yaw:0,wheels:/Wheel/i,maxSpeed:29,accel:7.5,seat:new B(.42,1.6,.4)}};class ME{constructor(t=4){this.pool=t,this.queue=[],this.workers=[],this.workersResolve=[],this.workerStatus=0}_initWorker(t){if(!this.workers[t]){const e=this.workerCreator();e.addEventListener("message",this._onMessage.bind(this,t)),this.workers[t]=e}}_getIdleWorker(){for(let t=0;t<this.pool;t++)if(!(this.workerStatus&1<<t))return t;return-1}_onMessage(t,e){const n=this.workersResolve[t];if(n&&n(e),this.queue.length){const{resolve:i,msg:s,transfer:o}=this.queue.shift();this.workersResolve[t]=i,this.workers[t].postMessage(s,o)}else this.workerStatus^=1<<t}setWorkerCreator(t){this.workerCreator=t}setWorkerLimit(t){this.pool=t}postMessage(t,e){return new Promise(n=>{const i=this._getIdleWorker();i!==-1?(this._initWorker(i),this.workerStatus|=1<<i,this.workersResolve[i]=n,this.workers[i].postMessage(t,e)):this.queue.push({resolve:n,msg:t,transfer:e})})}dispose(){this.workers.forEach(t=>t.terminate()),this.workersResolve.length=0,this.workers.length=0,this.queue.length=0,this.workerStatus=0}}const SE=0,Xh=2,wE=1,Yh=2,BE=0,TE=1,bE=10,RE=0,ld=9,hd=15,ud=16,dd=22,fd=37,Ad=43,pd=76,gd=83,md=97,_d=100,Ed=103,xd=109,vd=165,yd=166,cl=1000066e3;class DE{constructor(){this.vkFormat=0,this.typeSize=1,this.pixelWidth=0,this.pixelHeight=0,this.pixelDepth=0,this.layerCount=0,this.faceCount=1,this.supercompressionScheme=0,this.levels=[],this.dataFormatDescriptor=[{vendorId:0,descriptorType:0,descriptorBlockSize:0,versionNumber:2,colorModel:0,colorPrimaries:1,transferFunction:2,flags:0,texelBlockDimension:[0,0,0,0],bytesPlane:[0,0,0,0,0,0,0,0],samples:[]}],this.keyValue={},this.globalData=null}}class Ns{constructor(t,e,n,i){this._dataView=void 0,this._littleEndian=void 0,this._offset=void 0,this._dataView=new DataView(t.buffer,t.byteOffset+e,n),this._littleEndian=i,this._offset=0}_nextUint8(){const t=this._dataView.getUint8(this._offset);return this._offset+=1,t}_nextUint16(){const t=this._dataView.getUint16(this._offset,this._littleEndian);return this._offset+=2,t}_nextUint32(){const t=this._dataView.getUint32(this._offset,this._littleEndian);return this._offset+=4,t}_nextUint64(){const t=this._dataView.getUint32(this._offset,this._littleEndian)+4294967296*this._dataView.getUint32(this._offset+4,this._littleEndian);return this._offset+=8,t}_nextInt32(){const t=this._dataView.getInt32(this._offset,this._littleEndian);return this._offset+=4,t}_nextUint8Array(t){const e=new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+this._offset,t);return this._offset+=t,e}_skip(t){return this._offset+=t,this}_scan(t,e){e===void 0&&(e=0);const n=this._offset;let i=0;for(;this._dataView.getUint8(this._offset)!==e&&i<t;)i++,this._offset++;return i<t&&this._offset++,new Uint8Array(this._dataView.buffer,this._dataView.byteOffset+n,i)}}const Ne=[171,75,84,88,32,50,48,187,13,10,26,10];function Jh(r){return new TextDecoder().decode(r)}function LE(r){const t=new Uint8Array(r.buffer,r.byteOffset,Ne.length);if(t[0]!==Ne[0]||t[1]!==Ne[1]||t[2]!==Ne[2]||t[3]!==Ne[3]||t[4]!==Ne[4]||t[5]!==Ne[5]||t[6]!==Ne[6]||t[7]!==Ne[7]||t[8]!==Ne[8]||t[9]!==Ne[9]||t[10]!==Ne[10]||t[11]!==Ne[11])throw new Error("Missing KTX 2.0 identifier.");const e=new DE,n=17*Uint32Array.BYTES_PER_ELEMENT,i=new Ns(r,Ne.length,n,!0);e.vkFormat=i._nextUint32(),e.typeSize=i._nextUint32(),e.pixelWidth=i._nextUint32(),e.pixelHeight=i._nextUint32(),e.pixelDepth=i._nextUint32(),e.layerCount=i._nextUint32(),e.faceCount=i._nextUint32();const s=i._nextUint32();e.supercompressionScheme=i._nextUint32();const o=i._nextUint32(),a=i._nextUint32(),c=i._nextUint32(),l=i._nextUint32(),h=i._nextUint64(),u=i._nextUint64(),d=new Ns(r,Ne.length+n,3*s*8,!0);for(let W=0;W<s;W++)e.levels.push({levelData:new Uint8Array(r.buffer,r.byteOffset+d._nextUint64(),d._nextUint64()),uncompressedByteLength:d._nextUint64()});const f=new Ns(r,o,a,!0),A={vendorId:f._skip(4)._nextUint16(),descriptorType:f._nextUint16(),versionNumber:f._nextUint16(),descriptorBlockSize:f._nextUint16(),colorModel:f._nextUint8(),colorPrimaries:f._nextUint8(),transferFunction:f._nextUint8(),flags:f._nextUint8(),texelBlockDimension:[f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8()],bytesPlane:[f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8()],samples:[]},m=(A.descriptorBlockSize/4-6)/4;for(let W=0;W<m;W++){const O={bitOffset:f._nextUint16(),bitLength:f._nextUint8(),channelType:f._nextUint8(),samplePosition:[f._nextUint8(),f._nextUint8(),f._nextUint8(),f._nextUint8()],sampleLower:-1/0,sampleUpper:1/0};64&O.channelType?(O.sampleLower=f._nextInt32(),O.sampleUpper=f._nextInt32()):(O.sampleLower=f._nextUint32(),O.sampleUpper=f._nextUint32()),A.samples[W]=O}e.dataFormatDescriptor.length=0,e.dataFormatDescriptor.push(A);const g=new Ns(r,c,l,!0);for(;g._offset<l;){const W=g._nextUint32(),O=g._scan(W),it=Jh(O);if(e.keyValue[it]=g._nextUint8Array(W-O.byteLength-1),it.match(/^ktx/i)){const lt=Jh(e.keyValue[it]);e.keyValue[it]=lt.substring(0,lt.lastIndexOf("\0"))}g._skip(W%4?4-W%4:0)}if(u<=0)return e;const p=new Ns(r,h,u,!0),x=p._nextUint16(),E=p._nextUint16(),_=p._nextUint32(),T=p._nextUint32(),S=p._nextUint32(),M=p._nextUint32(),b=[];for(let W=0;W<s;W++)b.push({imageFlags:p._nextUint32(),rgbSliceByteOffset:p._nextUint32(),rgbSliceByteLength:p._nextUint32(),alphaSliceByteOffset:p._nextUint32(),alphaSliceByteLength:p._nextUint32()});const I=h+p._offset,v=I+_,D=v+T,Q=D+S,N=new Uint8Array(r.buffer,r.byteOffset+I,_),z=new Uint8Array(r.buffer,r.byteOffset+v,T),q=new Uint8Array(r.buffer,r.byteOffset+D,S),H=new Uint8Array(r.buffer,r.byteOffset+Q,M);return e.globalData={endpointCount:x,selectorCount:E,imageDescs:b,endpointsData:N,selectorsData:z,tablesData:q,extendedData:H},e}let Ca,Qn,Cc;const Ma={env:{emscripten_notify_memory_growth:function(r){Cc=new Uint8Array(Qn.exports.memory.buffer)}}};class PE{init(){return Ca||(Ca=typeof fetch<"u"?fetch("data:application/wasm;base64,"+Kh).then(t=>t.arrayBuffer()).then(t=>WebAssembly.instantiate(t,Ma)).then(this._init):WebAssembly.instantiate(Buffer.from(Kh,"base64"),Ma).then(this._init),Ca)}_init(t){Qn=t.instance,Ma.env.emscripten_notify_memory_growth(0)}decode(t,e=0){if(!Qn)throw new Error("ZSTDDecoder: Await .init() before decoding.");const n=t.byteLength,i=Qn.exports.malloc(n);Cc.set(t,i),e=e||Number(Qn.exports.ZSTD_findDecompressedSize(i,n));const s=Qn.exports.malloc(e),o=Qn.exports.ZSTD_decompress(s,e,i,n),a=Cc.slice(s,s+o);return Qn.exports.free(i),Qn.exports.free(s),a}}const Kh="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IAMNACAEQQNxBEADQCACRQ0FIAAgAkF/aiICaiIDIAEgAmotAAA6AAAgA0EDcQ0ACwsgAkEDTQ0AA0AgACACQXxqIgJqIAEgAmooAgA2AgAgAkEDSw0ACwsgAkUNAgNAIAAgAkF/aiICaiABIAJqLQAAOgAAIAINAAsMAgsgAkEDTQ0AIAIhBANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIARBfGoiBEEDSw0ACyACQQNxIQILIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8wICAn8BfgJAIAJFDQAgACACaiIDQX9qIAE6AAAgACABOgAAIAJBA0kNACADQX5qIAE6AAAgACABOgABIANBfWogAToAACAAIAE6AAIgAkEHSQ0AIANBfGogAToAACAAIAE6AAMgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIEayICQSBJDQAgAa0iBUIghiAFhCEFIAMgBGohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkFgaiICQR9LDQALCyAACy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAIajYCACADCy8BAn8gACgCBCAAKAIAQQJ0aiICLQACIQMgACACLwEAIAEgAi0AAxAFajYCACADCx8AIAAgASACKAIEEAg2AgAgARAEGiAAIAJBCGo2AgQLCAAgAGdBH3MLugUBDX8jAEEQayIKJAACfyAEQQNNBEAgCkEANgIMIApBDGogAyAEEAsaIAAgASACIApBDGpBBBAVIgBBbCAAEAMbIAAgACAESxsMAQsgAEEAIAEoAgBBAXRBAmoQECENQVQgAygAACIGQQ9xIgBBCksNABogAiAAQQVqNgIAIAMgBGoiAkF8aiEMIAJBeWohDiACQXtqIRAgAEEGaiELQQQh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ASIDNgLE4AEgACgCvOABIQQgACABNgK84AEgACABIAJqNgK44AEgACABIAQgA2tqNgLA4AELpgEBAX8gACAAKALs4QEQFjYCyOABIABCADcD+OABIABCADcDuOABIABBwOABakIANwMAIABBqNAAaiIBQYyAgOAANgIAIABBADYCmOIBIABCADcDiOEBIABCAzcDgOEBIABBrNABakHgEikCADcCACAAQbTQAWpB6BIoAgA2AgAgACABNgIMIAAgAEGYIGo2AgggACAAQaAwajYCBCAAIABBEGo2AgALYQEBf0G4fyEDAkAgAUEDSQ0AIAIgABAhIgFBA3YiADYCCCACIAFBAXE2AgQgAiABQQF2QQNxIgM2AgACQCADQX9qIgFBAksNAAJAIAFBAWsOAgEAAgtBbA8LIAAhAwsgAwsMACAAIAEgAkEAEC4LiAQCA38CfiADEBYhBCAAQQBBKBAQIQAgBCACSwRAIAQPCyABRQRAQX8PCwJAAkAgA0EBRg0AIAEoAAAiBkGo6r5pRg0AQXYhAyAGQXBxQdDUtMIBRw0BQQghAyACQQhJDQEgAEEAQSgQECEAIAEoAAQhASAAQQE2AhQgACABrTcDAEEADwsgASACIAMQLyIDIAJLDQAgACADNgIYQXIhAyABIARqIgVBf2otAAAiAkEIcQ0AIAJBIHEiBkUEQEFwIQMgBS0AACIFQacBSw0BIAVBB3GtQgEgBUEDdkEKaq2GIgdCA4h+IAd8IQggBEEBaiEECyACQQZ2IQMgAkECdiEFAkAgAkEDcUF/aiICQQJLBEBBACECDAELAkACQAJAIAJBAWsOAgECAAsgASAEai0AACECIARBAWohBAwCCyABIARqLwAAIQIgBEECaiEEDAELIAEgBGooAAAhAiAEQQRqIQQLIAVBAXEhBQJ+AkACQAJAIANBf2oiA0ECTQRAIANBAWsOAgIDAQtCfyAGRQ0DGiABIARqMQAADAMLIAEgBGovAACtQoACfAwCCyABIARqKAAArQwBCyABIARqKQAACyEHIAAgBTYCICAAIAI2AhwgACAHNwMAQQAhAyAAQQA2AhQgACAHIAggBhsiBzcDCCAAIAdCgIAIIAdCgIAIVBs+AhALIAMLWwEBf0G4fyEDIAIQFiICIAFNBH8gACACakF/ai0AACIAQQNxQQJ0QaAeaigC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C0Egak8NAQsgByAHKQNoNwMQIAcgBykDYDcDCCAEIA0gB0EIaiAHQdwAaiAPIA4gESAQEB4hCwwBCyACIARqIQggBCAKEAcgAkERTwRAIARBEGohAgNAIAIgCkEQaiIKEAcgAkEQaiICIAhJDQALCyAIIAlrIQIgByATNgJcIAkgCCAOa0sEQCAJIAggEWtLBEBBbCELDAILIBAgAiAOayICaiIKIANqIBBNBEAgCCAKIAMQDxoMAgsgCCAKQQAgAmsQDyEIIAcgAiADaiIDNgJkIAggAmshCCAOIQILIAlBEE8EQCADIAhqIQMDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALDAELAkAgCUEHTQRAIAggAi0AADoAACAIIAItAAE6AAEgCCACLQACOgACIAggAi0AAzoAAyAIQQRqIAIgCUECdCIDQcAeaigCAGoiAhAXIAIgA0HgHmooAgBrIQIgBygCZCEDDAELIAggAhAMCyADQQlJDQAgAyAIaiEDIAhBCGoiCCACQQhqIgJrQQ9MBEADQCAIIAIQDCACQQhqIQIgCEEIaiIIIANJDQAMAgALAAsDQCAIIAIQByACQRBqIQIgCEEQaiIIIANJDQALCyAHQRhqEAQaIAsgDCALEAMiAhshDCAEIAQgC2ogAhshBCAFQX9qIgUNAAsgDBADDQFBbCEMIAdBGGoQBEECSQ0BQQAhCANAIAhBA0cEQCAAIAhBAnQiAmpBrNABaiACIAdqKAJENgIAIAhBAWohCAwBCwsgBygCXCEIC0G6fyEMIA8gCGsiACANIARrSw0AIAQEfyAEIAggABALIABqBUEACyABayEMCyAHQfAAaiQAIAwLkRcCFn8FfiMAQdABayIHJAAgByAAKALw4QEiCDYCvAEgASACaiESIAggACgCgOIBaiETAkACQCAFRQRAIAEhAwwBCyAAKALE4AEhESAAKALA4AEhFSAAKAK84AEhDyAAQQE2AozhAUEAIQgDQCAIQQNHBEAgByAIQQJ0IgJqIAAgAmpBrNABaigCADYCVCAIQQFqIQgMAQsLIAcgETYCZCAHIA82AmAgByABIA9rNgJoQWwhECAHQShqIAMgBBAGEAMNASAFQQQgBUEESBshFyAHQTxqIAdBKGogACgCABATIAdBxABqIAdBKGogACgCCBATIAdBzABqIAdB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IAdB0AFqJAAgEAslACAAQgA3AgAgAEEAOwEIIABBADoACyAAIAE2AgwgACACOgAKC7QFAQN/IwBBMGsiBCQAIABB/wFqIgVBfWohBgJAIAMvAQIEQCAEQRhqIAEgAhAGIgIQAw0BIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahASOgAAIAMgBEEIaiAEQRhqEBI6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0FIAEgBEEQaiAEQRhqEBI6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBSABIARBCGogBEEYahASOgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEjoAACABIAJqIABrIQIMAwsgAyAEQRBqIARBGGoQEjoAAiADIARBCGogBEEYahASOgADIANBBGohAwwAAAsACyAEQRhqIAEgAhAGIgIQAw0AIARBEGogBEEYaiADEBwgBEEIaiAEQRhqIAMQHCAAIQMDQAJAIARBGGoQBCADIAZPckUEQCADIARBEGogBEEYahAROgAAIAMgBEEIaiAEQRhqEBE6AAEgBEEYahAERQ0BIANBAmohAwsgBUF+aiEFAn8DQEG6fyECIAMiASAFSw0EIAEgBEEQaiAEQRhqEBE6AAAgAUEBaiEDIARBGGoQBEEDRgRAQQIhAiAEQQhqDAILIAMgBUsNBCABIARBCGogBEEYahAROgABIAFBAmohA0EDIQIgBEEYahAEQQNHDQALIARBEGoLIQUgAyAFIARBGGoQEToAACABIAJqIABrIQIMAgsgAyAEQRBqIARBGGoQEToAAiADIARBCGogBEEYahAROgADIANBBGohAwwAAAsACyAEQTBqJAAgAgtpAQF/An8CQAJAIAJBB00NACABKAAAQbfIwuF+Rw0AIAAgASgABDYCmOIBQWIgAEEQaiABIAIQPiIDEAMNAhogAEKBgICAEDcDiOEBIAAgASADaiACIANrECoMAQsgACABIAIQKgtBAAsLrQMBBn8jAEGAAWsiAyQAQWIhCAJAIAJBCUkNACAAQZjQAGogAUEIaiIEIAJBeGogAEGY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wOABCwutAgIEfwF+IwBBQGoiBCQAAkACQCACQQhJDQAgASgAAEFwcUHQ1LTCAUcNACABIAIQIiEBIABCADcDCCAAQQA2AgQgACABNgIADAELIARBGGogASACEC0iAxADBEAgACADEBoMAQsgAwRAIABBuH8QGgwBCyACIAQoAjAiA2shAiABIANqIQMDQAJAIAAgAyACIARBCGoQLCIFEAMEfyAFBSACIAVBA2oiBU8NAUG4fwsQGgwCCyAGQQFqIQYgAiAFayECIAMgBWohAyAEKAIMRQ0ACyAEKAI4BEAgAkEDTQRAIABBuH8QGgwCCyADQQRqIQMLIAQoAighAiAEKQMYIQcgAEEANgIEIAAgAyABazYCACAAIAIgBmytIAcgB0J/URs3AwgLIARBQGskAAslAQF/IwBBEGsiAiQAIAIgACABEFEgAigCACEAIAJBEGokACAAC30BBH8jAEGQBGsiBCQAIARB/wE2AggCQCAEQRBqIARBCGogBEEMaiABIAIQFSIGEAMEQCAGIQUMAQtBVCEFIAQoAgwiB0EGSw0AIAMgBEEQaiAEKAIIIAcQQSIFEAMNACAAIAEgBmogAiAGayADEDwhBQsgBEGQBGokACAFC4cBAgJ/An5BABAWIQMCQANAIAEgA08EQAJAIAAoAABBcHFB0NS0wgFGBEAgACABECIiAhADRQ0BQn4PCyAAIAEQVSIEQn1WDQMgBCAFfCIFIARUIQJCfiEEIAINAyAAIAEQUiICEAMNAwsgASACayEBIAAgAmohAAwBCwtCfiAFIAEbIQQLIAQLPwIBfwF+IwBBMGsiAiQAAn5CfiACQQhqIAAgARAtDQAaQgAgAigCHEEBRg0AGiACKQMICyEDIAJBMGokACADC40BAQJ/IwBBMGsiASQAAkAgAEUNACAAKAKI4gENACABIABB/OEBaigCADYCKCABIAApAvThATcDICAAEDAgACgCqOIBIQIgASABKAIoNgIYIAEgASkDIDcDECACIAFBEGoQGyAAQQA2AqjiASABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALKgECfyMAQRBrIgAkACAAQQA2AgggAEIANwMAIAAQWCEBIABBEGokACABC4cBAQN/IwBBEGsiAiQAAkAgACgCAEUgACgCBEVzDQAgAiAAKAIINgIIIAIgACkCADcDAAJ/IAIoAgAiAQRAIAIoAghBqOMJIAERBQAMAQtBqOMJECgLIgFFDQAgASAAKQIANwL04QEgAUH84QFqIAAoAgg2AgAgARBZIAEhAwsgAkEQaiQAIAMLywEBAn8jAEEgayIBJAAgAEGBgIDAADYCtOIBIABBADYCiOIBIABBADYC7OEBIABCADcDkOIBIABBADYCpOMJIABBADYC3OIBIABCADcCzOIBIABBADYCvOIBIABBADYCxOABIABCADcCnOIBIABBpOIBakIANwIAIABBrOIBakEANgIAIAFCADcCECABQgA3AhggASABKQMYNwMIIAEgASkDEDcDACABKAIIQQh2QQFxIQIgAEEANgLg4gEgACACNgKM4gEgAUEgaiQAC3YBA38jAEEwayIBJAAgAARAIAEgAEHE0AFqIgIoAgA2AiggASAAKQK80AE3AyAgACgCACEDIAEgAigCADYCGCABIAApArzQATcDECADIAFBEGoQGyABIAEoAig2AgggASABKQMgNwMAIAAgARAbCyABQTBqJAALzAEBAX8gACABKAK00AE2ApjiASAAIAEoAgQiAjYCwOABIAAgAjYCvOABIAAgAiABKAIIaiICNgK44AEgACACNgLE4AEgASgCuNABBEAgAEKBgICAEDcDiOEBIAAgAUGk0ABqNgIMIAAgAUGUIGo2AgggACABQZwwajYCBCAAIAFBDGo2AgAgAEGs0AFqIAFBqNABaigCADYCACAAQbDQAWogAUGs0AFqKAIANgIAIABBtNABaiABQbDQAWooAgA2AgAPCyAAQgA3A4jhAQs7ACACRQRAQbp/DwsgBEUEQEFsDwsgAiAEEGAEQCAAIAEgAiADIAQgBRBhDwsgACABIAIgAyAEIAUQZQtGAQF/IwBBEGsiBSQAIAVBCGogBBAOAn8gBS0ACQRAIAAgASACIAMgBBAyDAELIAAgASACIAMgBBA0CyEAIAVBEGokACAACzQAIAAgAyAEIAUQNiIFEAMEQCAFDwsgBSAESQR/IAEgAiADIAVqIAQgBWsgABA1BUG4fwsLRgEBfyMAQRBrIgUkACAFQQhqIAQQDgJ/IAUtAAkEQCAAIAEgAiADIAQQYgwBCyAAIAEgAiADIAQQNQshACAFQRBqJAAgAAtZAQF/QQ8hAiABIABJBEAgAUEE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",UE="display-p3",NE="display-p3-linear",Sa=new WeakMap;let wa=0,Ba;class nn extends Ti{constructor(t){super(t),this.transcoderPath="",this.transcoderBinary=null,this.transcoderPending=null,this.workerPool=new ME,this.workerSourceURL="",this.workerConfig=null,typeof MSC_TRANSCODER<"u"&&console.warn('THREE.KTX2Loader: Please update to latest "basis_transcoder". "msc_basis_transcoder" is no longer supported in three.js r125+.')}setTranscoderPath(t){return this.transcoderPath=t,this}setWorkerLimit(t){return this.workerPool.setWorkerLimit(t),this}async detectSupportAsync(t){return this.workerConfig={astcSupported:await t.hasFeatureAsync("texture-compression-astc"),astcHDRSupported:!1,etc1Supported:await t.hasFeatureAsync("texture-compression-etc1"),etc2Supported:await t.hasFeatureAsync("texture-compression-etc2"),dxtSupported:await t.hasFeatureAsync("texture-compression-bc"),bptcSupported:await t.hasFeatureAsync("texture-compression-bptc"),pvrtcSupported:await t.hasFeatureAsync("texture-compression-pvrtc")},this}detectSupport(t){return t.isWebGPURenderer===!0?this.workerConfig={astcSupported:t.hasFeature("texture-compression-astc"),astcHDRSupported:!1,etc1Supported:t.hasFeature("texture-compression-etc1"),etc2Supported:t.hasFeature("texture-compression-etc2"),dxtSupported:t.hasFeature("texture-compression-bc"),bptcSupported:t.hasFeature("texture-compression-bptc"),pvrtcSupported:t.hasFeature("texture-compression-pvrtc")}:this.workerConfig={astcSupported:t.extensions.has("WEBGL_compressed_texture_astc"),astcHDRSupported:t.extensions.has("WEBGL_compressed_texture_astc")&&t.extensions.get("WEBGL_compressed_texture_astc").getSupportedProfiles().includes("hdr"),etc1Supported:t.extensions.has("WEBGL_compressed_texture_etc1"),etc2Supported:t.extensions.has("WEBGL_compressed_texture_etc"),dxtSupported:t.extensions.has("WEBGL_compressed_texture_s3tc"),bptcSupported:t.extensions.has("EXT_texture_compression_bptc"),pvrtcSupported:t.extensions.has("WEBGL_compressed_texture_pvrtc")||t.extensions.has("WEBKIT_WEBGL_compressed_texture_pvrtc")},this}init(){if(!this.transcoderPending){const t=new Ks(this.manager);t.setPath(this.transcoderPath),t.setWithCredentials(this.withCredentials);const e=t.loadAsync("basis_transcoder.js"),n=new Ks(this.manager);n.setPath(this.transcoderPath),n.setResponseType("arraybuffer"),n.setWithCredentials(this.withCredentials);const i=n.loadAsync("basis_transcoder.wasm");this.transcoderPending=Promise.all([e,i]).then(([s,o])=>{const a=nn.BasisWorker.toString(),c=["/* constants */","let _EngineFormat = "+JSON.stringify(nn.EngineFormat),"let _EngineType = "+JSON.stringify(nn.EngineType),"let _TranscoderFormat = "+JSON.stringify(nn.TranscoderFormat),"let _BasisFormat = "+JSON.stringify(nn.BasisFormat),"/* basis_transcoder.js */",s,"/* worker */",a.substring(a.indexOf("{")+1,a.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([c])),this.transcoderBinary=o,this.workerPool.setWorkerCreator(()=>{const l=new Worker(this.workerSourceURL),h=this.transcoderBinary.slice(0);return l.postMessage({type:"init",config:this.workerConfig,transcoderBinary:h},[h]),l})}),wa>0&&console.warn("THREE.KTX2Loader: Multiple active KTX2 loaders may cause performance issues. Use a single KTX2Loader instance, or call .dispose() on old instances."),wa++}return this.transcoderPending}load(t,e,n,i){if(this.workerConfig===null)throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");const s=new Ks(this.manager);s.setResponseType("arraybuffer"),s.setWithCredentials(this.withCredentials),s.load(t,o=>{this.parse(o,e,i)},n,i)}parse(t,e,n){if(this.workerConfig===null)throw new Error("THREE.KTX2Loader: Missing initialization with `.detectSupport( renderer )`.");if(Sa.has(t))return Sa.get(t).promise.then(e).catch(n);this._createTexture(t).then(i=>e?e(i):null).catch(n)}_createTextureFrom(t,e){const{type:n,error:i,data:{faces:s,width:o,height:a,format:c,type:l,dfdFlags:h}}=t;if(n==="error")return Promise.reject(i);let u;if(e.faceCount===6)u=new u_(s,c,l);else{const d=s[0].mipmaps;u=e.layerCount>1?new h_(d,o,a,e.layerCount,c,l):new Lo(d,o,a,c,l)}return u.minFilter=s[0].mipmaps.length===1?De:mn,u.magFilter=De,u.generateMipmaps=!1,u.needsUpdate=!0,u.colorSpace=Id(e),u.premultiplyAlpha=!!(h&wE),u}async _createTexture(t,e={}){const n=LE(new Uint8Array(t)),i=n.vkFormat===cl&&n.dataFormatDescriptor[0].colorModel===167;if(!(n.vkFormat===RE||i&&!this.workerConfig.astcHDRSupported))return QE(n);const o=e,a=this.init().then(()=>this.workerPool.postMessage({type:"transcode",buffer:t,taskConfig:o},[t])).then(c=>this._createTextureFrom(c.data,n));return Sa.set(t,{promise:a}),a}dispose(){return this.workerPool.dispose(),this.workerSourceURL&&URL.revokeObjectURL(this.workerSourceURL),wa--,this}}nn.BasisFormat={ETC1S:0,UASTC:1,UASTC_HDR:2};nn.TranscoderFormat={ETC1:0,ETC2:1,BC1:2,BC3:3,BC4:4,BC5:5,BC7_M6_OPAQUE_ONLY:6,BC7_M5:7,PVRTC1_4_RGB:8,PVRTC1_4_RGBA:9,ASTC_4x4:10,ATC_RGB:11,ATC_RGBA_INTERPOLATED_ALPHA:12,RGBA32:13,RGB565:14,BGR565:15,RGBA4444:16,BC6H:22,RGB_HALF:24,RGBA_HALF:25};nn.EngineFormat={RGBAFormat:ye,RGBA_ASTC_4x4_Format:tr,RGB_BPTC_UNSIGNED_Format:Ao,RGBA_BPTC_Format:Vs,RGBA_ETC2_EAC_Format:fo,RGBA_PVRTC_4BPPV1_Format:lo,RGBA_S3TC_DXT5_Format:Hs,RGB_ETC1_Format:ho,RGB_ETC2_Format:uo,RGB_PVRTC_4BPPV1_Format:co,RGBA_S3TC_DXT1_Format:zs};nn.EngineType={UnsignedByteType:Se,HalfFloatType:sn,FloatType:Le};nn.BasisWorker=function(){let r,t,e;const n=_EngineFormat,i=_EngineType,s=_TranscoderFormat,o=_BasisFormat;self.addEventListener("message",function(A){const m=A.data;switch(m.type){case"init":r=m.config,a(m.transcoderBinary);break;case"transcode":t.then(()=>{try{const{faces:g,buffers:p,width:x,height:E,hasAlpha:_,format:T,type:S,dfdFlags:M}=c(m.buffer);self.postMessage({type:"transcode",id:m.id,data:{faces:g,width:x,height:E,hasAlpha:_,format:T,type:S,dfdFlags:M}},p)}catch(g){console.error(g),self.postMessage({type:"error",id:m.id,error:g.message})}});break}});function a(A){t=new Promise(m=>{e={wasmBinary:A,onRuntimeInitialized:m},BASIS(e)}).then(()=>{e.initializeBasis(),e.KTX2File===void 0&&console.warn("THREE.KTX2Loader: Please update Basis Universal transcoder.")})}function c(A){const m=new e.KTX2File(new Uint8Array(A));function g(){m.close(),m.delete()}if(!m.isValid())throw g(),new Error("THREE.KTX2Loader:	Invalid or unsupported .ktx2 file");let p;if(m.isUASTC())p=o.UASTC;else if(m.isETC1S())p=o.ETC1S;else if(m.isHDR())p=o.UASTC_HDR;else throw new Error("THREE.KTX2Loader: Unknown Basis encoding");const x=m.getWidth(),E=m.getHeight(),_=m.getLayers()||1,T=m.getLevels(),S=m.getFaces(),M=m.getHasAlpha(),b=m.getDFDFlags(),{transcoderFormat:I,engineFormat:v,engineType:D}=u(p,x,E,M);if(!x||!E||!T)throw g(),new Error("THREE.KTX2Loader:	Invalid texture");if(!m.startTranscoding())throw g(),new Error("THREE.KTX2Loader: .startTranscoding failed");const Q=[],N=[];for(let z=0;z<S;z++){const q=[];for(let H=0;H<T;H++){const W=[];let O,it;for(let At=0;At<_;At++){const Rt=m.getImageLevelInfo(H,At,z);z===0&&H===0&&At===0&&(Rt.origWidth%4!==0||Rt.origHeight%4!==0)&&console.warn("THREE.KTX2Loader: ETC1S and UASTC textures should use multiple-of-four dimensions."),T>1?(O=Rt.origWidth,it=Rt.origHeight):(O=Rt.width,it=Rt.height);let Vt=new Uint8Array(m.getImageTranscodedSizeInBytes(H,At,0,I));const Y=m.transcodeImage(Vt,H,At,z,I,0,-1,-1);if(D===i.HalfFloatType&&(Vt=new Uint16Array(Vt.buffer,Vt.byteOffset,Vt.byteLength/Uint16Array.BYTES_PER_ELEMENT)),!Y)throw g(),new Error("THREE.KTX2Loader: .transcodeImage failed.");W.push(Vt)}const lt=f(W);q.push({data:lt,width:O,height:it}),N.push(lt.buffer)}Q.push({mipmaps:q,width:x,height:E,format:v,type:D})}return g(),{faces:Q,buffers:N,width:x,height:E,hasAlpha:M,dfdFlags:b,format:v,type:D}}const l=[{if:"astcSupported",basisFormat:[o.UASTC],transcoderFormat:[s.ASTC_4x4,s.ASTC_4x4],engineFormat:[n.RGBA_ASTC_4x4_Format,n.RGBA_ASTC_4x4_Format],engineType:[i.UnsignedByteType],priorityETC1S:1/0,priorityUASTC:1,needsPowerOfTwo:!1},{if:"bptcSupported",basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[s.BC7_M5,s.BC7_M5],engineFormat:[n.RGBA_BPTC_Format,n.RGBA_BPTC_Format],engineType:[i.UnsignedByteType],priorityETC1S:3,priorityUASTC:2,needsPowerOfTwo:!1},{if:"dxtSupported",basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[s.BC1,s.BC3],engineFormat:[n.RGBA_S3TC_DXT1_Format,n.RGBA_S3TC_DXT5_Format],engineType:[i.UnsignedByteType],priorityETC1S:4,priorityUASTC:5,needsPowerOfTwo:!1},{if:"etc2Supported",basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[s.ETC1,s.ETC2],engineFormat:[n.RGB_ETC2_Format,n.RGBA_ETC2_EAC_Format],engineType:[i.UnsignedByteType],priorityETC1S:1,priorityUASTC:3,needsPowerOfTwo:!1},{if:"etc1Supported",basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[s.ETC1],engineFormat:[n.RGB_ETC1_Format],engineType:[i.UnsignedByteType],priorityETC1S:2,priorityUASTC:4,needsPowerOfTwo:!1},{if:"pvrtcSupported",basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[s.PVRTC1_4_RGB,s.PVRTC1_4_RGBA],engineFormat:[n.RGB_PVRTC_4BPPV1_Format,n.RGBA_PVRTC_4BPPV1_Format],engineType:[i.UnsignedByteType],priorityETC1S:5,priorityUASTC:6,needsPowerOfTwo:!0},{if:"bptcSupported",basisFormat:[o.UASTC_HDR],transcoderFormat:[s.BC6H],engineFormat:[n.RGB_BPTC_UNSIGNED_Format],engineType:[i.HalfFloatType],priorityHDR:1,needsPowerOfTwo:!1},{basisFormat:[o.ETC1S,o.UASTC],transcoderFormat:[s.RGBA32,s.RGBA32],engineFormat:[n.RGBAFormat,n.RGBAFormat],engineType:[i.UnsignedByteType,i.UnsignedByteType],priorityETC1S:100,priorityUASTC:100,needsPowerOfTwo:!1},{basisFormat:[o.UASTC_HDR],transcoderFormat:[s.RGBA_HALF],engineFormat:[n.RGBAFormat],engineType:[i.HalfFloatType],priorityHDR:100,needsPowerOfTwo:!1}],h={[o.ETC1S]:l.filter(A=>A.basisFormat.includes(o.ETC1S)).sort((A,m)=>A.priorityUASTC-m.priorityUASTC),[o.UASTC]:l.filter(A=>A.basisFormat.includes(o.UASTC)).sort((A,m)=>A.priorityUASTC-m.priorityUASTC),[o.UASTC_HDR]:l.filter(A=>A.basisFormat.includes(o.UASTC_HDR)).sort((A,m)=>A.priorityHDR-m.priorityHDR)};function u(A,m,g,p){const x=h[A];for(let E=0;E<x.length;E++){const _=x[E];if(_.if&&!r[_.if]||!_.basisFormat.includes(A)||p&&_.transcoderFormat.length<2||_.needsPowerOfTwo&&!(d(m)&&d(g)))continue;const T=_.transcoderFormat[p?1:0],S=_.engineFormat[p?1:0],M=_.engineType[0];return{transcoderFormat:T,engineFormat:S,engineType:M}}throw new Error("THREE.KTX2Loader: Failed to identify transcoding target.")}function d(A){return A<=2?!0:(A&A-1)===0&&A!==0}function f(A){if(A.length===1)return A[0];let m=0;for(let x=0;x<A.length;x++){const E=A[x];m+=E.byteLength}const g=new Uint8Array(m);let p=0;for(let x=0;x<A.length;x++){const E=A[x];g.set(E,p),p+=E.byteLength}return g}};const FE=new Set([ye,xi,ii]),Ta={[xd]:ye,[md]:ye,[fd]:ye,[Ad]:ye,[Ed]:xi,[gd]:xi,[ud]:xi,[dd]:xi,[_d]:ii,[pd]:ii,[hd]:ii,[ld]:ii,[cl]:tr,[yd]:er,[vd]:er},ba={[xd]:Le,[md]:sn,[fd]:Se,[Ad]:Se,[Ed]:Le,[gd]:sn,[ud]:Se,[dd]:Se,[_d]:Le,[pd]:sn,[hd]:Se,[ld]:Se,[cl]:sn,[yd]:Se,[vd]:Se};async function QE(r){const{vkFormat:t}=r;if(Ta[t]===void 0)throw new Error("THREE.KTX2Loader: Unsupported vkFormat.");let e;r.supercompressionScheme===Xh&&(Ba||(Ba=new Promise(async s=>{const o=new PE;await o.init(),s(o)})),e=await Ba);const n=[];for(let s=0;s<r.levels.length;s++){const o=Math.max(1,r.pixelWidth>>s),a=Math.max(1,r.pixelHeight>>s),c=r.pixelDepth?Math.max(1,r.pixelDepth>>s):0,l=r.levels[s];let h;if(r.supercompressionScheme===SE)h=l.levelData;else if(r.supercompressionScheme===Xh)h=e.decode(l.levelData,l.uncompressedByteLength);else throw new Error("THREE.KTX2Loader: Unsupported supercompressionScheme.");let u;ba[t]===Le?u=new Float32Array(h.buffer,h.byteOffset,h.byteLength/Float32Array.BYTES_PER_ELEMENT):ba[t]===sn?u=new Uint16Array(h.buffer,h.byteOffset,h.byteLength/Uint16Array.BYTES_PER_ELEMENT):u=h,n.push({data:u,width:o,height:a,depth:c})}let i;if(FE.has(Ta[t]))i=r.pixelDepth===0?new dr(n[0].data,r.pixelWidth,r.pixelHeight):new Su(n[0].data,r.pixelWidth,r.pixelHeight,r.pixelDepth);else{if(r.pixelDepth>0)throw new Error("THREE.KTX2Loader: Unsupported pixelDepth.");i=new Lo(n,r.pixelWidth,r.pixelHeight)}return i.mipmaps=n,i.type=ba[t],i.format=Ta[t],i.colorSpace=Id(r),i.needsUpdate=!0,Promise.resolve(i)}function Id(r){const t=r.dataFormatDescriptor[0];return t.colorPrimaries===TE?t.transferFunction===Yh?pe:Pe:t.colorPrimaries===bE?t.transferFunction===Yh?UE:NE:(t.colorPrimaries===BE||console.warn(`THREE.KTX2Loader: Unsupported color primaries, "${t.colorPrimaries}"`),pn)}const kE={grass:"grass004",meadow:"leafy_grass",forest:"forest_ground_04",mud:"brown_mud_leaves_01",rock:"rock_boulder_dry",bark:"pine_bark",moss:"moss002",barkBroad:"bark_brown_02",logs:"wood_trunk_wall",roof:"roof_planks",planks:"wood_planks"},OE=new od;let Mc=null,Sc=null;async function GE(r){try{const t=await fetch("textures/manifest.json");t.ok&&(Sc=await t.json())}catch{}Sc?.ktx2&&(Mc=new nn().setTranscoderPath("basis/").detectSupport(r))}function Ra(r,t,e){const n=Mc&&Sc.ktx2.includes(r),i=`textures/${r}.${n?"ktx2":"jpg"}`;return new Promise(s=>{const o=a=>{a.wrapS=a.wrapT=Ii,a.colorSpace=t?pe:pn,a.anisotropy=e,s(a)};(n?Mc:OE).load(i,o,void 0,()=>{console.warn("texture failed",i);const a=new dr(new Uint8Array([128,128,255,255]),1,1);a.needsUpdate=!0,s(a)})})}function jh(r){return new Promise((t,e)=>{const n=new Image;n.onload=()=>t(n),n.onerror=e,n.src=r})}async function zE(r,{normal:t=!0,anisotropy:e=4}={}){const n=kE[r],[i,s,o]=await Promise.all([Ra(`${n}_albedo`,!0,e),t?Ra(`${n}_normal`,!1,e):null,Ra(`${n}_rough`,!1,e)]);return{albedo:i,normal:s,rough:o}}class HE{constructor(t,e,n){this.canvas=t,this.settings=n,this.move={x:0,y:0},this.look={x:0,y:0},this.sprint=!1,this.aim=!1,this.fireHeld=!1,this._edges=new Set,this.keys=new Set,this.enabled=!1,this.locked=!1,this.onLockChange=null,addEventListener("keydown",i=>{i.repeat||(this.keys.add(i.code),i.code==="KeyR"&&this._edges.add("reload"),i.code==="Space"&&this._edges.add("jump"),i.code==="KeyH"&&this._edges.add("debug"),(i.code==="KeyF"||i.code==="KeyE")&&this._edges.add("use"),(i.code==="KeyV"||i.code==="KeyC")&&this._edges.add("view"))}),addEventListener("keyup",i=>this.keys.delete(i.code)),addEventListener("blur",()=>{this.keys.clear(),this.fireHeld=!1,this.aim=!1}),t.addEventListener("mousedown",i=>{if(this.enabled){if(!this.locked&&!this.dragLook){this.requestLock();return}i.button===0&&(this.dragLook&&!this.locked?this._down={x:i.clientX,y:i.clientY}:(this.fireHeld=!0,this._edges.add("fire"))),i.button===2&&(this.aim=!0)}}),addEventListener("mouseup",i=>{i.button===0&&this._down&&(Math.hypot(i.clientX-this._down.x,i.clientY-this._down.y)<6&&this._edges.add("fire"),this._down=null),i.button===0&&(this.fireHeld=!1),i.button===2&&(this.aim=!1)}),t.addEventListener("contextmenu",i=>i.preventDefault()),addEventListener("mousemove",i=>{!this.locked&&!(this.dragLook&&i.buttons)||(this.look.x+=i.movementX,this.look.y+=i.movementY)}),document.addEventListener("pointerlockchange",()=>{this.locked=document.pointerLockElement===t,this.locked||(this.aim=!1,this.fireHeld=!1),this.onLockChange?.(this.locked)}),e&&this._setupTouch(e)}requestLock(){if(!(this.isTouch||this.dragLook))try{const t=this.canvas.requestPointerLock?.();t?.catch&&t.catch(()=>{this.dragLook=!0})}catch{this.dragLook=!0}}consume(t){const e=this._edges.has(t);return this._edges.delete(t),e}poll(){if(!this.isTouch||this.keys.size){const t=this.keys,e=(t.has("KeyD")||t.has("ArrowRight")?1:0)-(t.has("KeyA")||t.has("ArrowLeft")?1:0),n=(t.has("KeyW")||t.has("ArrowUp")?1:0)-(t.has("KeyS")||t.has("ArrowDown")?1:0);if(!this._joyActive){const i=Math.hypot(e,n)||1;this.move.x=e/i,this.move.y=n/i,this.sprint=t.has("ShiftLeft")||t.has("ShiftRight")}this._jumpTouch||(this.jumpHeld=t.has("Space"))}}takeLook(){const t=this.settings.sensitivity,e={x:this.look.x*t,y:this.look.y*t};return this.look.x=this.look.y=0,e}_setupTouch(t){this.isTouch=!0;const e=t.querySelector("#joy"),n=t.querySelector("#joy-knob"),i=t.querySelector("#look-zone"),s=t.querySelector("#btn-fire"),o=new Map,a=55,c=(m,g)=>{n.style.transform=`translate(${m}px, ${g}px)`},l=(m,g,p)=>{m.preventDefault();for(const x of m.changedTouches){const E={kind:g,x:x.clientX,y:x.clientY,ox:x.clientX,oy:x.clientY};if(g==="joy"){const _=e.getBoundingClientRect();E.ox=_.left+_.width/2,E.oy=_.top+_.height/2,this._joyActive=!0}o.set(x.identifier,E),g==="fire"&&(this.fireHeld=!0,this._edges.add("fire"),p.classList.add("down")),g==="joy"&&h(E,x)}},h=(m,g)=>{let p=g.clientX-m.ox,x=g.clientY-m.oy;const E=Math.hypot(p,x);E>a&&(p*=a/E,x*=a/E),c(p,x),this.move.x=p/a,this.move.y=-x/a,this.sprint=E>a*1.15},u=m=>{for(const g of m.changedTouches){const p=o.get(g.identifier);p&&(m.preventDefault(),p.kind==="joy"?h(p,g):(p.kind==="look"||p.kind==="fire")&&(this.look.x+=(g.clientX-p.x)*2.2,this.look.y+=(g.clientY-p.y)*2.2),p.x=g.clientX,p.y=g.clientY)}},d=m=>{for(const g of m.changedTouches){const p=o.get(g.identifier);p&&(o.delete(g.identifier),p.kind==="joy"&&(this._joyActive=!1,this.move.x=this.move.y=0,this.sprint=!1,c(0,0)),p.kind==="fire"&&(this.fireHeld=!1,s.classList.remove("down")))}};e.addEventListener("touchstart",m=>l(m,"joy",e),{passive:!1}),i.addEventListener("touchstart",m=>l(m,"look",i),{passive:!1}),s.addEventListener("touchstart",m=>l(m,"fire",s),{passive:!1}),addEventListener("touchmove",u,{passive:!1}),addEventListener("touchend",d),addEventListener("touchcancel",d);const f=(m,g)=>t.querySelector(m).addEventListener("touchstart",p=>{p.preventDefault(),p.stopPropagation(),g(p.currentTarget)},{passive:!1});f("#btn-aim",m=>{this.aim=!this.aim,m.classList.toggle("on",this.aim)}),f("#btn-reload",()=>this._edges.add("reload"));const A=t.querySelector("#btn-jump");A.addEventListener("touchstart",m=>{m.preventDefault(),m.stopPropagation(),this._edges.add("jump"),this.jumpHeld=!0,this._jumpTouch=!0},{passive:!1}),A.addEventListener("touchend",()=>{this.jumpHeld=!1,this._jumpTouch=!1}),f("#btn-use",()=>this._edges.add("use")),f("#btn-view",()=>this._edges.add("view")),f("#btn-pause",()=>this._edges.add("pause")),this.syncAimButton=()=>t.querySelector("#btn-aim").classList.toggle("on",this.aim)}}class VE{constructor(){this.ctx=null}unlock(){if(this.ctx){this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const e=this.ctx=new t;this.master=e.createGain(),this.master.gain.value=.8,this.master.connect(e.destination),this.echo=e.createDelay(2),this.echo.delayTime.value=.42;const n=e.createGain();n.gain.value=.32;const i=e.createBiquadFilter();i.type="lowpass",i.frequency.value=900,this.echo.connect(i),i.connect(n),n.connect(this.echo),i.connect(this.master),this.noiseBuf=e.createBuffer(1,e.sampleRate*2,e.sampleRate);const s=this.noiseBuf.getChannelData(0);for(let o=0;o<s.length;o++)s[o]=Math.random()*2-1;this._ambient()}_noise(t,{freq:e=1e3,q:n=.7,type:i="lowpass",gain:s=1,attack:o=.002,decay:a=t,when:c=0,echo:l=0,dest:h}={}){const u=this.ctx;if(!u)return;const d=u.currentTime+c,f=u.createBufferSource();f.buffer=this.noiseBuf;const A=u.createBiquadFilter();A.type=i,A.frequency.value=e,A.Q.value=n;const m=u.createGain();if(m.gain.setValueAtTime(0,d),m.gain.linearRampToValueAtTime(s,d+o),m.gain.exponentialRampToValueAtTime(1e-4,d+a),f.connect(A),A.connect(m),m.connect(h||this.master),l){const g=u.createGain();g.gain.value=l,m.connect(g),g.connect(this.echo)}return f.start(d,Math.random()),f.stop(d+t+.05),A}shot(t=0){const e=this.ctx;if(!e)return;const n=1/(1+t/40),i=Math.min(1,t/300),s=this._noise(1.4,{freq:5200-i*4e3,gain:1.6*n,decay:.9,echo:.6});s&&s.frequency.exponentialRampToValueAtTime(400,e.currentTime+.5);const o=e.currentTime,a=e.createOscillator();a.type="sine",a.frequency.setValueAtTime(110,o),a.frequency.exponentialRampToValueAtTime(38,o+.25);const c=e.createGain();c.gain.setValueAtTime(1.2*n,o),c.gain.exponentialRampToValueAtTime(.001,o+.35),a.connect(c),c.connect(this.master),a.start(o),a.stop(o+.4)}click(t=0,e=3e3,n=.35){this._noise(.05,{freq:e,q:3,type:"bandpass",gain:n,decay:.04,when:t})}bolt(){this.click(.05,1800,.5),this.click(.22,2600,.45),this.click(.42,1500,.5)}reloadRound(t){this.click(t*.42+.3,2200,.4),this.click(t*.42+.38,1200,.3)}dry(){this.click(0,4e3,.3)}step(t){this._noise(.15,{freq:t?900:500,q:.6,gain:t?.22:.12,decay:.12})}hit(){this._noise(.12,{freq:300,q:1,gain:.5,decay:.1,when:.08})}engineStart(){const t=this.ctx;if(!t||this.eng)return;const e=t.createGain();e.gain.value=0;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=600,n.Q.value=2;const i=t.createOscillator();i.type="sawtooth";const s=t.createOscillator();s.type="square",i.connect(n),s.connect(n),n.connect(e),e.connect(this.master),i.start(),s.start(),this.eng={g:e,f:n,o1:i,o2:s},e.gain.linearRampToValueAtTime(.09,t.currentTime+.4),this.click(0,900,.5),this.click(.08,700,.4)}engineUpdate(t,e){if(!this.eng)return;const n=this.ctx.currentTime,i=38+t*120;this.eng.o1.frequency.setTargetAtTime(i,n,.08),this.eng.o2.frequency.setTargetAtTime(i*.5+1.5,n,.08),this.eng.f.frequency.setTargetAtTime(350+t*900+Math.abs(e)*500,n,.1),this.eng.g.gain.setTargetAtTime(.06+Math.abs(e)*.05+t*.04,n,.1)}engineStop(){if(!this.eng)return;const{g:t,o1:e,o2:n}=this.eng;t.gain.setTargetAtTime(0,this.ctx.currentTime,.15),setTimeout(()=>{e.stop(),n.stop()},800),this.eng=null}crash(t){this._noise(.5,{freq:700,q:.5,gain:Math.min(1.2,.3+t*.06),decay:.4})}bite(){this._noise(.15,{freq:1600,q:2,type:"bandpass",gain:.6,decay:.12}),this._noise(.3,{freq:300,gain:.5,decay:.25,when:.03})}_ambient(){const t=this.ctx,e=t.createBufferSource();e.buffer=this.noiseBuf,e.loop=!0;const n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=380;const i=t.createGain();i.gain.value=.05;const s=t.createOscillator();s.frequency.value=.07;const o=t.createGain();o.gain.value=.035,s.connect(o),o.connect(i.gain),s.start(),e.connect(n),n.connect(i),i.connect(this.master),e.start();const a=()=>{const c=t.currentTime,l=2+Math.floor(Math.random()*4),h=2200+Math.random()*2200;for(let u=0;u<l;u++){const d=t.createOscillator();d.type="sine";const f=c+u*(.12+Math.random()*.08);d.frequency.setValueAtTime(h,f),d.frequency.exponentialRampToValueAtTime(h*(.7+Math.random()*.8),f+.09);const A=t.createGain();A.gain.setValueAtTime(0,f),A.gain.linearRampToValueAtTime(.025,f+.02),A.gain.linearRampToValueAtTime(0,f+.1),d.connect(A),A.connect(this.master),d.start(f),d.stop(f+.12)}setTimeout(a,2500+Math.random()*7e3)};setTimeout(a,3e3)}}const vi=800,_e=vi/2,rn=_e-45,lr=0,_n=6,WE=-1.3,qE=1337;function jr(r,t,e){let n=Math.imul(r,374761393)+Math.imul(t,668265263)+Math.imul(e,2654435761)|0;return n=Math.imul(n^n>>>13,1274126177),n^=n>>>16,(n>>>0)/4294967295}function Io(r,t,e){const n=Math.floor(r),i=Math.floor(t),s=r-n,o=t-i,a=s*s*(3-2*s),c=o*o*(3-2*o),l=jr(n,i,e),h=jr(n+1,i,e),u=jr(n,i+1,e),d=jr(n+1,i+1,e);return l+(h-l)*a+(u-l)*c+(l-h-u+d)*a*c}function ps(r,t,e,n=qE){let i=0,s=.5,o=1,a=0;for(let c=0;c<e;c++)i+=s*Io(r*o,t*o,n+c*17),a+=s,o*=2.03,s*=.5;return i/a}function Vn(r,t,e){const n=Math.min(1,Math.max(0,(e-r)/(t-r)));return n*n*(3-2*n)}const wc=(r,t,e)=>r+(t-r)*e;function ll(r){return 70+55*Math.sin(r*.0062)+28*Math.sin(r*.0171+1.3)}function XE(r){return 55*.0062*Math.cos(r*.0062)+28*.0171*Math.cos(r*.0171+1.3)}function wi(r,t){const e=XE(t);return Math.abs(r-ll(t))/Math.sqrt(1+e*e)}function Qo(r,t){const e=ps(r*.0055+50,t*.0055-30,4,99);return Vn(.47,.58,e)}function YE(r,t){const e=ps(r*.0042,t*.0042,5),n=ps(r*.0016+100,t*.0016,3,7);let i=3+e*26+n*n*38;const s=Math.max(Math.abs(r),Math.abs(t));if(s>_e-70){const o=Math.min(1.5,(s-(_e-70))/70);i+=o*o*50}return i}function Cd(r,t){const e=wi(r,t),n=YE(r,t),i=Vn(_n,_n+130,e),s=wc(2.4,n,i);return wc(WE,s,Vn(_n-1,_n+9,e))}const JE=[{x:-14,z:30,rot:Math.PI+.15,type:"lodge"},{x:8,z:38,rot:Math.PI-.1,type:"shed"},{x:-170,z:-120,rot:.8,type:"cabin"},{x:215,z:150,rot:-2.2,type:"cabin"},{x:-240,z:210,rot:2.6,type:"cabin"},{x:165,z:-235,rot:-.6,type:"cabin"},{x:-60,z:-285,rot:.3,type:"cabin"},{x:265,z:-55,rot:1.6,type:"shed"},{x:-285,z:-10,rot:-1.2,type:"cabin"}],hl={lodge:[11,8],cabin:[7,6],shed:[4,3.5]},je=JE.map(r=>{let{x:t,z:e}=r;for(let a=0;a<20&&wi(t,e)<40;a++)t+=t>ll(e)?6:-6;const[n,i]=hl[r.type],s=Math.hypot(n,i)/2+3;let o=0;for(const[a,c]of[[0,0],[s,0],[-s,0],[0,s],[0,-s]])o+=Cd(t+a,e+c);return{...r,x:t,z:e,h:o/5,r:s}});for(const r of je)r!==je[0]&&Math.hypot(r.x-je[0].x,r.z-je[0].z)<40&&(r.h=je[0].h);function KE(){const r=je[0],t=[];for(const e of je.slice(1)){if(e.type==="shed"&&Math.hypot(e.x-r.x,e.z-r.z)<30)continue;const n=[],i=10,s=e.x-r.x,o=e.z-r.z,a=Math.hypot(s,o),c=-o/a,l=s/a;for(let h=0;h<=i;h++){const u=h/i,d=Math.sin(u*Math.PI)*(Io(e.x*.01,e.z*.01,41)-.5)*a*.35+Math.sin(u*Math.PI*3)*(Io(e.z*.02,e.x*.02,43)-.5)*30*Math.sin(u*Math.PI);n.push([r.x+s*u+c*d,r.z+o*u+l*d])}t.push(n)}return t}const jE=KE(),hr=2.2;function gs(r,t){let e=1/0;for(const n of jE)for(let i=0;i<n.length-1;i++){const[s,o]=n[i],[a,c]=n[i+1];if(r<Math.min(s,a)-20||r>Math.max(s,a)+20||t<Math.min(o,c)-20||t>Math.max(o,c)+20)continue;const l=a-s,h=c-o,u=Math.max(0,Math.min(1,((r-s)*l+(t-o)*h)/(l*l+h*h))),d=Math.hypot(r-s-l*u,t-o-h*u);d<e&&(e=d)}return e}function ur(r,t){let e=1/0;for(const n of je)e=Math.min(e,Math.hypot(r-n.x,t-n.z)-n.r);return e}function We(r,t){let e=Cd(r,t);for(const n of je){const i=Math.hypot(r-n.x,t-n.z);i<n.r+18&&(e=wc(n.h,e,Vn(n.r,n.r+18,i)))}return e}function ms(r,t){const n=We(r+1.5,t)-We(r-1.5,t),i=We(r,t+1.5)-We(r,t-1.5);return Math.sqrt(n*n+i*i)/(2*1.5)}function ZE(r,t,e,n){const i=wi(r,t),s=Io(r*.2,t*.2,5)-.5,o=1-Vn(_n+3,_n+11,i+s*4),a=1-Vn(hr-.6,hr+1.4,gs(r,t)+s*1.5),c=1-Vn(-2,6,ur(r,t)+s*4),l=Math.max(o,a,c*.85),h=Vn(.55,.85,n)*(1-l*.5),u=Qo(r,t)*(1-l)*(1-h),d=ps(r*.03,t*.03,2,3);return[u,l,h,d]}function $E(r,t,e){const[n,i,s]=e,o=Vn(.25,.5,ps(r*.05,t*.05,2,11));return Math.max(0,(1-n*.7)*(1-i)*(1-s*1.2)*(.45+.55*o))}function Md(r,t){return We(r,t)<lr-.15}class tx{constructor(t){this.seg=t,this.step=vi/t;const e=t+1;this.h=new Float32Array(e*e);for(let n=0;n<e;n++)for(let i=0;i<e;i++)this.h[n*e+i]=We(-_e+i*this.step,-_e+n*this.step)}sample(t,e){const n=this.seg+1,i=Math.min(this.seg-1e-4,Math.max(0,(t+_e)/this.step)),s=Math.min(this.seg-1e-4,Math.max(0,(e+_e)/this.step)),o=Math.floor(i),a=Math.floor(s),c=i-o,l=s-a,h=a*n+o,u=this.h[h],d=this.h[h+1],f=this.h[h+n],A=this.h[h+n+1];return c+l<=1?u+(d-u)*c+(f-u)*l:A+(f-A)*(1-c)+(d-A)*(1-l)}}const ex=`
uniform sampler2D tForestA, tMudA, tRockA, tMeadowA;
uniform sampler2D tGrassR, tForestR, tMudR, tRockR;
#ifdef USE_NORMALMAP
uniform sampler2D tForestN, tMudN, tRockN;
#endif
varying vec4 vSplat;
varying vec3 vTerrWorld;
vec4 splatBase() {
  vec3 s = clamp(vSplat.xyz, 0.0, 1.0);
  return vec4(max(0.0, 1.0 - s.x - s.y - s.z), s);
}
// смешивание с учётом «высоты» текстуры: камешки и комья пробиваются сквозь траву
vec4 heightBlend(vec4 w, vec4 h) {
  vec4 k = w * (0.35 + h);
  float m = max(max(k.x, k.y), max(k.z, k.w)) - 0.18;
  k = max(k - m, 0.0);
  return k / max(dot(k, vec4(1.0)), 1e-4);
}
void main() {`,nx=`
vec2 wuv = vMapUv;
float camDist = length(vTerrWorld - cameraPosition);
// две частоты для травы и леса — убирают видимый повтор текстуры
vec2 uvG = wuv * 0.9, uvF = wuv * 0.75, uvM = wuv * 0.9, uvR = wuv * 0.45;
vec3 colG = texture2D(map, uvG).rgb;
vec3 colG2 = texture2D(map, uvG * 0.173 + 0.31).rgb;
vec3 meadow = texture2D(tMeadowA, uvG * 0.61).rgb;
float macro = vSplat.w;
colG = mix(colG, colG2, 0.35 + 0.3 * smoothstep(20.0, 120.0, camDist));
// сухие пятна поляны
float dry = smoothstep(0.45, 0.8, macro);
colG = mix(colG, meadow * vec3(1.05, 1.0, 0.8), dry * 0.55);
vec3 colF = texture2D(tForestA, uvF).rgb;
vec3 colM = texture2D(tMudA, uvM).rgb;
vec3 colR = texture2D(tRockA, uvR).rgb;
vec4 lum = vec4(dot(colG, vec3(0.33)), dot(colF, vec3(0.33)), dot(colM, vec3(0.33)), dot(colR, vec3(0.33)));
vec4 sw = heightBlend(splatBase(), lum * 1.6);
vec3 alb = colG * sw.x + colF * sw.y + colM * sw.z + colR * sw.w;
alb *= 0.82 + 0.36 * macro;
diffuseColor.rgb *= alb;
`,ix=`
float roughnessFactor = roughness * (texture2D(tGrassR, uvG).g * sw.x + texture2D(tForestR, uvF).g * sw.y
  + texture2D(tMudR, uvM).g * sw.z + texture2D(tRockR, uvR).g * sw.w);
`,sx="(texture2D(normalMap, uvG) * sw.x + texture2D(tForestN, uvF) * sw.y + texture2D(tMudN, uvM) * sw.z + texture2D(tRockN, uvR) * sw.w)";function rx(r,t){const e=r.terrainSeg,n=new tx(e),i=new Mi(vi,vi,e,e);i.rotateX(-Math.PI/2);const s=i.attributes.position,o=i.attributes.uv,a=e+1,c=new Float32Array(a*a*4),l=new Uint16Array(a*a*4),h=lA.toHalfFloat;for(let x=0;x<s.count;x++){const E=s.getX(x),_=s.getZ(x),T=n.h[x];s.setY(x,T),o.setXY(x,E/4,_/4);const S=ZE(E,_,T,ms(E,_));c.set(S,x*4),l[x*4]=h(T),l[x*4+1]=h($E(E,_,S)),l[x*4+2]=h(S[0]),l[x*4+3]=h(S[3])}i.setAttribute("splat",new fe(c,4)),i.computeVertexNormals();const u=new dr(l,a,a,ye,sn);u.magFilter=u.minFilter=De,u.needsUpdate=!0;const d=new ln({map:t.grass.albedo,normalMap:r.normalMaps?t.grass.normal:null,roughness:1,metalness:0});r.normalMaps&&d.normalScale.set(.9,.9),d.onBeforeCompile=x=>{Object.assign(x.uniforms,{tMeadowA:{value:t.meadow.albedo},tForestA:{value:t.forest.albedo},tMudA:{value:t.mud.albedo},tRockA:{value:t.rock.albedo},tGrassR:{value:t.grass.rough},tForestR:{value:t.forest.rough},tMudR:{value:t.mud.rough},tRockR:{value:t.rock.rough},tForestN:{value:t.forest.normal},tMudN:{value:t.mud.normal},tRockN:{value:t.rock.normal}}),x.vertexShader=x.vertexShader.replace("#include <common>",`#include <common>
attribute vec4 splat;
varying vec4 vSplat;
varying vec3 vTerrWorld;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vSplat = splat;
vTerrWorld = (modelMatrix * vec4(position, 1.0)).xyz;`),x.fragmentShader=x.fragmentShader.replace("void main() {",ex).replace("#include <map_fragment>",nx).replace("#include <roughnessmap_fragment>",ix).replaceAll("texture2D( normalMap, vNormalMapUv )",sx)};const f=new ue(i,d);f.receiveShadow=r.shadows,f.matrixAutoUpdate=!1;const A=new Mi(vi*3,vi*3,72,72);A.rotateX(-Math.PI/2);const m=A.attributes.position;for(let x=0;x<m.count;x++){const E=m.getX(x),_=m.getZ(x),T=Math.max(Math.abs(E),Math.abs(_))<_e-10;m.setY(x,T?-30:We(E,_)-1)}A.computeVertexNormals();const g=new nl({color:5069363}),p=new ue(A,g);return p.matrixAutoUpdate=!1,{mesh:f,far:p,ground:n,heightTex:u}}function ox(){const r=[],t=[],e=_n+6;let n=0;for(let a=-_e*1.6;a<=_e*1.6;a+=4,n++){const c=ll(a);if(r.push(c-e,lr,a,c+e,lr,a),n>0){const l=(n-1)*2,h=l+1,u=l+2,d=l+3;t.push(l,u,h,h,u,d)}}const i=new Ae;i.setAttribute("position",new Zt(r,3)),i.setIndex(t);const s=new xn({transparent:!0,fog:!0,uniforms:Du.merge([ct.fog,{uTime:{value:0},uSunDir:{value:new B(0,1,0)},uSunColor:{value:new yt(1,1,1)},uSkyColor:{value:new yt(.6,.75,.9)},uDeep:{value:new yt(928298)}}]),vertexShader:`
      #include <common>
      #include <fog_pars_vertex>
      varying vec3 vWorld;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorld = wp.xyz;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,fragmentShader:`
      #include <common>
      #include <fog_pars_fragment>
      uniform float uTime;
      uniform vec3 uSunDir, uSunColor, uSkyColor, uDeep;
      varying vec3 vWorld;
      float wave(vec2 p, vec2 d, float f, float s) { return sin(dot(p, d) * f + uTime * s); }
      void main() {
        vec2 p = vWorld.xz;
        p.y -= uTime * 1.2; // течение
        float e = 0.05;
        vec2 grad = vec2(0.0);
        grad += vec2(0.6, 0.8) * cos(dot(p, vec2(0.6, 0.8)) * 1.3 + uTime * 1.7) * 0.10;
        grad += vec2(-0.7, 0.5) * cos(dot(p, vec2(-0.7, 0.5)) * 2.7 + uTime * 2.3) * 0.06;
        grad += vec2(0.2, -0.9) * cos(dot(p, vec2(0.2, -0.9)) * 5.1 + uTime * 3.1) * 0.035;
        vec3 n = normalize(vec3(-grad.x, 1.0, -grad.y));
        vec3 v = normalize(cameraPosition - vWorld);
        float fres = pow(1.0 - max(dot(n, v), 0.0), 4.0) * 0.85 + 0.12;
        vec3 h = normalize(uSunDir + v);
        float spec = pow(max(dot(n, h), 0.0), 180.0) * 2.5;
        vec3 col = mix(uDeep, uSkyColor, fres) + uSunColor * spec;
        gl_FragColor = vec4(col, 0.82 + fres * 0.15);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
        #include <fog_fragment>
      }`}),o=new ue(i,s);return o.renderOrder=2,o}function Cn(r){let t=r>>>0;return function(){t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}const kn=16,ei=Math.ceil(_e*2/kn);class ax{constructor(t=4242){var i;this.trees=[],this.rocks=[],this.grid=new Array(ei*ei),this.buildings=[];const e=Cn(t);for(const s of je){const[o,a]=hl[s.type],c={x:s.x,z:s.z,y0:s.h-.5,y1:s.h+(s.type==="shed"?3.2:5.5),hw:o/2,hd:a/2,rot:s.rot,c:Math.cos(s.rot),s:Math.sin(s.rot),r:Math.hypot(o,a)/2,type:s.type};this.buildings.push(c);for(let l=-c.r;l<=c.r;l+=kn/2)for(let h=-c.r;h<=c.r;h+=kn/2){const u=this._cellIndex(c.x+l,c.z+h);u>=0&&!((i=this.grid)[u]||(i[u]=[])).some(d=>d.o===c)&&this.grid[u].push({o:c,kind:"box"})}}const n=6.5;for(let s=-_e+20;s<_e-20;s+=n)for(let o=-_e+20;o<_e-20;o+=n){const a=o+(e()-.5)*n*.9,c=s+(e()-.5)*n*.9,l=e(),u=Qo(a,c)*.8+.02;if(l>u||wi(a,c)<_n+7||Math.hypot(a,c)<12||ur(a,c)<8||gs(a,c)<hr+2.5||ms(a,c)>.75)continue;const f=ps(a*.01,c*.01,2,21),A=e()<f*1.4?0:1,m=.75+e()*.6,g={x:a,z:c,y:We(a,c)-.2,s:m,rot:e()*Math.PI*2,type:A,r:(A===0?.32:.38)*m};this.trees.push(g),this._add(g,"tree")}for(let s=0;s<520;s++){const o=(e()*2-1)*(_e-25),a=(e()*2-1)*(_e-25);if(Math.hypot(o,a)<10||ur(o,a)<6||gs(o,a)<hr+1.5)continue;const c=ms(o,a),l=wi(o,a)<_n+14;if(!(c>.35||l||e()<.35))continue;const h=l?.4+e()*.8:.5+Math.pow(e(),2)*2.4,u={x:o,z:a,y:We(o,a)-.25*h,s:h,rot:e()*Math.PI*2,r:.85*h};this.rocks.push(u),this._add(u,"rock")}}_cellIndex(t,e){const n=Math.floor((t+_e)/kn),i=Math.floor((e+_e)/kn);return n<0||i<0||n>=ei||i>=ei?-1:i*ei+n}_add(t,e){var i;const n=this._cellIndex(t.x,t.z);n<0||((i=this.grid)[n]||(i[n]=[])).push({o:t,kind:e})}near(t,e,n=[]){n.length=0;const i=Math.floor((t+_e)/kn),s=Math.floor((e+_e)/kn);for(let o=-1;o<=1;o++)for(let a=-1;a<=1;a++){const c=i+a,l=s+o;if(c<0||l<0||c>=ei||l>=ei)continue;const h=this.grid[l*ei+c];if(h)for(const u of h)n.push(u)}return n}collide(t,e){const n=this.near(t.x,t.z,this._tmp||(this._tmp=[]));for(const{o:i,kind:s}of n){if(s==="box"){cx(t,e,i);continue}const o=t.x-i.x,a=t.z-i.z,c=i.r+e,l=o*o+a*a;if(l<c*c&&l>1e-6){const h=Math.sqrt(l);t.x=i.x+o/h*c,t.z=i.z+a/h*c}}t.x=Math.max(-rn,Math.min(rn,t.x)),t.z=Math.max(-rn,Math.min(rn,t.z))}raycastStatic(t,e,n,i,s,o,a){let c=1/0,l=!0;for(let d=.5;d<a;d+=.75){const f=t+i*d,A=e+s*d,m=n+o*d,g=A>We(f,m);if(!g&&l){c=d;break}l=g}const h=new Set,u=Math.min(c,a);for(let d=0;d<u+kn;d+=kn*.5){const f=t+i*d,A=n+o*d;for(const m of this.near(f,A)){if(h.has(m.o))continue;h.add(m.o);const g=m.kind==="box"?lx(t,e,n,i,s,o,m.o):m.kind==="tree"?hx(t,e,n,i,s,o,m.o.x,m.o.z,m.o.r*1.1,m.o.y,m.o.y+9*m.o.s):Sd(t,e,n,i,s,o,m.o.x,m.o.y+.5*m.o.s,m.o.z,m.o.r);g<c&&(c=g)}}return c}}function cx(r,t,e){const n=r.x-e.x,i=r.z-e.z,s=n*e.c-i*e.s,o=n*e.s+i*e.c,a=Math.max(-e.hw,Math.min(e.hw,s)),c=Math.max(-e.hd,Math.min(e.hd,o));let l=s-a,h=o-c;const u=l*l+h*h;if(u>=t*t)return!1;let d,f;if(u>1e-8){const A=Math.sqrt(u);d=a+l/A*t,f=c+h/A*t}else{const A=e.hw-Math.abs(s),m=e.hd-Math.abs(o);A<m?(d=Math.sign(s||1)*(e.hw+t),f=o):(d=s,f=Math.sign(o||1)*(e.hd+t))}return r.x=e.x+d*e.c+f*e.s,r.z=e.z-d*e.s+f*e.c,!0}function lx(r,t,e,n,i,s,o){const a=r-o.x,c=e-o.z,l=a*o.c-c*o.s,h=a*o.s+c*o.c,u=n*o.c-s*o.s,d=n*o.s+s*o.c;let f=0,A=1/0;for(const[m,g,p,x]of[[l,u,-o.hw,o.hw],[t,i,o.y0,o.y1],[h,d,-o.hd,o.hd]]){if(Math.abs(g)<1e-9){if(m<p||m>x)return 1/0;continue}let E=(p-m)/g,_=(x-m)/g;if(E>_&&([E,_]=[_,E]),f=Math.max(f,E),A=Math.min(A,_),f>A)return 1/0}return f>0?f:1/0}function Sd(r,t,e,n,i,s,o,a,c,l){const h=r-o,u=t-a,d=e-c,f=h*n+u*i+d*s,A=h*h+u*u+d*d-l*l,m=f*f-A;if(m<0)return 1/0;const g=-f-Math.sqrt(m);return g>0?g:1/0}function hx(r,t,e,n,i,s,o,a,c,l,h){const u=r-o,d=e-a,f=n*n+s*s;if(f<1e-8)return 1/0;const A=u*n+d*s,m=u*u+d*d-c*c,g=A*A-f*m;if(g<0)return 1/0;const p=(-A-Math.sqrt(g))/f;if(p<=0)return 1/0;const x=t+i*p;return x>=l&&x<=h?p:1/0}function ux(r,t){const e=[],n=[],i=[];for(let o=0;o<t;o++){const a=(r()-.5)*.45,c=(r()-.5)*.45,l=r()*Math.PI*2,h=Math.cos(l),u=Math.sin(l),d=.02+r()*.016,f=.3+r()*.4,A=.08+r()*.22,m=e.length/3,g=[[0,1],[.4,.88],[.75,.55]];for(const[x,E]of g){const _=-u*A*x*x,T=h*A*x*x;for(const S of[-1,1])e.push(a+_+h*d*E*S,x*f,c+T+u*d*E*S),n.push(x,S*.5+.5,r())}e.push(a-u*A,f,c+h*A),n.push(1,.5,r());const p=m;i.push(p,p+1,p+2,p+1,p+3,p+2,p+2,p+3,p+4,p+3,p+5,p+4,p+4,p+5,p+6)}const s=new Ae;return s.setAttribute("position",new Zt(e,3)),s.setAttribute("color",new Zt(n,3)),s.setIndex(i),s}function dx(){const r=[],t=[],e=[];r.push(-.006,0,0,.006,0,0,-.006,.42,0,.006,.42,0),t.push(0,0,0,0,1,0,.9,0,0,.9,1,0),e.push(0,1,2,1,3,2);const s=r.length/3;r.push(0,.42+.01,0),t.push(1,2,0);for(let a=0;a<=6;a++){const c=a/6*Math.PI*2;r.push(Math.cos(c)*.06,.42+Math.sin(c)*.06*.5,Math.sin(c)*.06*.6),t.push(1,2,0),a>0&&e.push(s,s+a,s+a+1)}const o=new Ae;return o.setAttribute("position",new Zt(r,3)),o.setAttribute("color",new Zt(t,3)),o.setIndex(e),o}function Zh(r,t,e,n,i,s,o,a){const c=new oE;c.index=r.index,c.setAttribute("position",r.attributes.position),c.setAttribute("color",r.attributes.color);const l=new Float32Array(t*4);for(let f=0;f<t;f++)l[f*4]=o(),l[f*4+1]=o(),l[f*4+2]=o()*Math.PI*2,l[f*4+3]=o();c.setAttribute("aOff",new Eo(l,4)),c.instanceCount=t;const h={uHeight:{value:i},uCenter:{value:new tt},uPlayer:{value:new B},uTile:{value:e},uDist:{value:n},uWorld:{value:vi},uHalf:{value:_e},uTime:s.uTime},u=new nl({side:Ke});u.onBeforeCompile=f=>{Object.assign(f.uniforms,h),f.vertexShader=f.vertexShader.replace("#include <common>",`#include <common>
        attribute vec4 aOff;
        attribute vec3 color;
        uniform sampler2D uHeight;
        uniform vec2 uCenter;
        uniform vec3 uPlayer;
        uniform float uTile, uDist, uWorld, uHalf, uTime;
        varying vec3 vGrassCol;`).replace("#include <beginnormal_vertex>","vec3 objectNormal = vec3(0.0, 1.0, 0.0);").replace("#include <begin_vertex>",`
        vec2 origin = uCenter - uTile * 0.5;
        vec2 wp = origin + mod(aOff.xy * uTile - origin, uTile);
        vec4 hs = texture2D(uHeight, (wp + uHalf) / uWorld);
        float d = distance(wp, uCenter);
        float fade = 1.0 - smoothstep(uDist * 0.55, uDist, d);
        float dens = ${a?"hs.g * (1.0 - hs.b) * smoothstep(0.35, 0.6, hs.a) * 0.5":"hs.g"};
        float sc = step(aOff.w, dens) * fade * (0.65 + 0.6 * fract(aOff.w * 7.31));
        float c = cos(aOff.z), s = sin(aOff.z);
        vec3 transformed = position;
        transformed.xz = mat2(c, -s, s, c) * transformed.xz;
        transformed *= sc;
        float t = color.r;
        float bend = t * t;
        // ветер: крупные порывы + мелкая дрожь
        float gust = sin(uTime * 0.9 + wp.x * 0.05 + wp.y * 0.03) * 0.5 + 0.5;
        float w = sin(uTime * 2.1 + wp.x * 0.35 + wp.y * 0.21) * 0.35 + gust * 0.6;
        transformed.x += bend * w * 0.18 * sc;
        transformed.z += bend * w * 0.09 * sc;
        // примятие под ногами
        vec2 away = wp - uPlayer.xz;
        float pl = 1.0 - smoothstep(0.3, 1.3, length(away));
        transformed.xz += normalize(away + 1e-4) * pl * bend * 0.35 * sc;
        transformed.y *= 1.0 - pl * 0.4;
        transformed.xz += wp;
        transformed.y += hs.r - 0.03;
        // цвет: сочная зелень ↔ сухая трава, по тем же пятнам, что и земля
        float dry = smoothstep(0.45, 0.8, hs.a) * 0.75 + fract(aOff.w * 13.7) * 0.25;
        vec3 baseC = vec3(0.025, 0.05, 0.012);
        vec3 tipLush = vec3(0.13, 0.22, 0.04);
        vec3 tipDry = vec3(0.30, 0.27, 0.10);
        vec3 tip = mix(tipLush, tipDry, dry * 0.8) * (0.8 + 0.4 * fract(aOff.w * 31.1));
        vGrassCol = mix(baseC, tip, smoothstep(0.0, 0.9, t)) * mix(1.0, 0.7, hs.b);
        ${a?`
        if (color.g > 1.5) {
          float k = fract(aOff.w * 97.3);
          vGrassCol = k < 0.4 ? vec3(0.9, 0.88, 0.8) : k < 0.7 ? vec3(0.85, 0.65, 0.05) : vec3(0.42, 0.2, 0.6);
        } else vGrassCol = mix(vec3(0.03, 0.06, 0.015), vec3(0.08, 0.14, 0.03), t);`:""}`),f.fragmentShader=f.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vGrassCol;`).replace("#include <color_fragment>",`#include <color_fragment>
diffuseColor.rgb = vGrassCol;`).replace("#include <normal_fragment_begin>",`float faceDirection = 1.0;
vec3 normal = normalize(vNormal);
vec3 nonPerturbedNormal = normal;`)};const d=new ue(c,u);return d.frustumCulled=!1,d.matrixAutoUpdate=!1,d.uniforms=h,d}function fx(r,t,e){const n=Cn(777),i=new Be,s=r.grassDist*2.1,o=Zh(ux(n,7),r.grass,s,r.grassDist,t,e,n,!1),a=Zh(dx(),Math.round(r.grass*.12),s,r.grassDist*.8,t,e,n,!0);return i.add(o,a),i.update=(c,l)=>{for(const h of[o,a])h.uniforms.uCenter.value.set(c.x,c.z),h.uniforms.uPlayer.value.copy(l)},i}function vs(r,t=!1){const e=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},o={},a=r[0].morphTargetsRelative,c=new Ae;let l=0;for(let h=0;h<r.length;++h){const u=r[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const u=[];for(let d=0;d<r.length;++d){const f=r[d].index;for(let A=0;A<f.count;++A)u.push(f.getX(A)+h);h+=r[d].attributes.position.count}c.setIndex(u)}for(const h in s){const u=$h(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let m=0;m<o[h].length;++m)f.push(o[h][m][d]);const A=$h(f);if(!A)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(A)}}return c}function $h(r){let t,e,n,i=-1,s=0;for(let l=0;l<r.length;++l){const h=r[l];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}const o=new t(s),a=new fe(o,e,n);let c=0;for(let l=0;l<r.length;++l){const h=r[l];if(h.isInterleavedBufferAttribute){const u=c/e;for(let d=0,f=h.count;d<f;d++)for(let A=0;A<e;A++){const m=h.getComponent(d,A);a.setComponent(d+u,A,m)}}else o.set(h.array,c);c+=h.count*e}return i!==void 0&&(a.gpuType=i),a}function tu(r,t){if(t===_f)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(t===gc||t===vu){let e=r.getIndex();if(e===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let c=0;c<a.count;c++)o.push(c);r.setIndex(o),e=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=e.count-2,i=[];if(t===gc)for(let o=1;o<=n;o++)i.push(e.getX(0)),i.push(e.getX(o)),i.push(e.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(e.getX(o)),i.push(e.getX(o+1)),i.push(e.getX(o+2))):(i.push(e.getX(o+2)),i.push(e.getX(o+1)),i.push(e.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",t),r}function Ax(r,t,e){const n=r.attributes.position,i=new Map;for(let s=0;s<n.count;s++){const o=`${n.getX(s).toFixed(3)},${n.getY(s).toFixed(3)},${n.getZ(s).toFixed(3)}`;let a=i.get(o);a||(a=[(e()-.5)*t,(e()-.5)*t,(e()-.5)*t],i.set(o,a)),n.setXYZ(s,n.getX(s)+a[0],n.getY(s)+a[1],n.getZ(s)+a[2])}return r}class Bc{constructor(t,e,n,i,s,o){Object.assign(this,{items:t,matrices:e,hi:n,lo:i,hiDist:s,farDist:o}),this.last=new B(1e9,0,0)}update(t,e=!1){if(!e&&this.last.distanceToSquared(t)<9)return;this.last.copy(t);const n=this.hiDist*this.hiDist,i=this.farDist*this.farDist;let s=0,o=0;const a=this.hi[0].instanceMatrix.count,c=this.lo?this.lo.instanceMatrix.count:0,l=this.hi.map(u=>u.instanceMatrix.array),h=this.lo?.instanceMatrix.array;for(let u=0;u<this.items.length;u++){const d=this.items[u],f=d.x-t.x,A=d.z-t.z,m=f*f+A*A;if(m<n&&s<a){const g=this.matrices.subarray(u*16,u*16+16);for(const p of l)p.set(g,s*16);s++}else m<i&&this.lo&&o<c&&(h.set(this.matrices.subarray(u*16,u*16+16),o*16),o++)}for(const u of this.hi)u.count=s,u.instanceMatrix.needsUpdate=!0;this.lo&&(this.lo.count=o,this.lo.instanceMatrix.needsUpdate=!0)}}function Tc(r,t=0){const e=new Pt,n=new an,i=new B,s=new B,o=new B(0,1,0),a=new Float32Array(r.length*16);return r.forEach((c,l)=>{n.setFromAxisAngle(o,c.rot+t),i.set(c.x,c.y,c.z),s.setScalar(c.s),c.squash&&(s.y*=c.squash),e.compose(i,n,s).toArray(a,l*16)}),a}function px(r,t,e,n){const i=Cn(9),s=new No(1,2);Ax(s,.35,i),s.scale(1.1,.7,1),s.computeVertexNormals();const o=new ln({map:e.albedo,normalMap:t.normalMaps?e.normal:null,roughnessMap:e.rough,roughness:1,metalness:0});o.onBeforeCompile=u=>{u.uniforms.tMoss={value:n.albedo},u.vertexShader=u.vertexShader.replace("#include <common>",`#include <common>
varying float vUp;
varying vec2 vMossUv;`).replace("#include <worldpos_vertex>",`#include <worldpos_vertex>
        vec3 wn = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * objectNormal);
        vUp = wn.y;
        vec4 wpm = modelMatrix * instanceMatrix * vec4(transformed, 1.0);
        vMossUv = wpm.xz * 0.35;`),u.fragmentShader=u.fragmentShader.replace("#include <common>",`#include <common>
uniform sampler2D tMoss;
varying float vUp;
varying vec2 vMossUv;`).replace("#include <map_fragment>",`#include <map_fragment>
        vec3 moss = texture2D(tMoss, vMossUv).rgb;
        float mk = smoothstep(0.45, 0.8, vUp + (moss.g - 0.15));
        diffuseColor.rgb = mix(diffuseColor.rgb, moss, mk);`)};const a=r.rocks.map(u=>({...u,squash:1})),c=Tc(a),l=new ts(s,o,a.length);l.frustumCulled=!1,l.castShadow=t.shadows,l.receiveShadow=t.shadows,l.instanceMatrix.setUsage(go);const h=new Bc(a,c,[l],null,t.viewDist*.8,t.viewDist);return l.update=(u,d)=>h.update(u,d),l}function gx(){const e=document.createElement("canvas");e.width=256,e.height=512;const n=e.getContext("2d");n.fillStyle="rgba(30,48,22,0)",n.fillRect(0,0,256,512);const i=Cn(31),s=()=>{const c=55+i()*45,l=22+i()*22,h=18+i()*18;return`rgb(${l|0},${c|0},${h|0})`},o=(c,l,h,u,d)=>{const f=c+Math.cos(h)*u,A=l+Math.sin(h)*u;n.strokeStyle="rgb(60,42,28)",n.lineWidth=d,n.beginPath(),n.moveTo(c,l),n.lineTo(f,A),n.stroke();const m=Math.floor(u/2.2);for(let g=0;g<m;g++){const p=g/m,x=c+(f-c)*p,E=l+(A-l)*p,_=(9+i()*7)*(1-p*.45);for(const T of[-1,1]){const S=h+T*(.9+i()*.4)-.25;n.strokeStyle=s(),n.lineWidth=1.6,n.beginPath(),n.moveTo(x,E),n.lineTo(x+Math.cos(S)*_,E+Math.sin(S)*_),n.stroke()}}};o(256/2,508,-Math.PI/2,492,4);for(let c=472;c>40;c-=22+i()*10){const l=1-c/512,h=256*.46*(1-l*.6)*(.8+i()*.3);o(256/2,c,-Math.PI/2-.9-i()*.3,h,2),o(256/2,c-8,-Math.PI/2+.9+i()*.3,h,2)}const a=new Po(e);return a.colorSpace=pe,a.anisotropy=4,a}async function mx(){const[r,t]=await Promise.all([jh("textures/foliage/leafset009_color.png"),jh("textures/foliage/leafset009_opacity.png")]),e=r.width,n=document.createElement("canvas");n.width=e,n.height=r.height;const i=n.getContext("2d");i.drawImage(t,0,0);const s=i.getImageData(0,0,n.width,n.height);i.drawImage(r,0,0);const o=i.getImageData(0,0,n.width,n.height);for(let A=0;A<o.data.length;A+=4)o.data[A+3]=s.data[A];i.putImageData(o,0,0);const a=512,c=document.createElement("canvas");c.width=c.height=a;const l=c.getContext("2d"),h=Cn(77);l.strokeStyle="rgb(70,52,36)",l.lineCap="round";for(let A=0;A<7;A++){l.lineWidth=3+h()*2,l.beginPath(),l.moveTo(a/2,a/2);const m=h()*Math.PI*2,g=a*(.25+h()*.2);l.lineTo(a/2+Math.cos(m)*g,a/2+Math.sin(m)*g),l.stroke()}const u=n.width/3,d=n.height/2;for(let A=0;A<70;A++){const m=Math.floor(h()*6),g=Math.sqrt(h())*a*.42,p=h()*Math.PI*2,x=a/2+Math.cos(p)*g,E=a/2+Math.sin(p)*g,_=a*(.12+h()*.07);l.save(),l.translate(x,E),l.rotate(p+Math.PI/2+(h()-.5)*1.2),l.globalAlpha=1,l.drawImage(n,m%3*u,Math.floor(m/3)*d,u,d,-_/2,-_/2,_,_*(d/u)),h()<.4&&(l.globalCompositeOperation="source-atop",l.fillStyle="rgba(10,20,5,0.35)",l.fillRect(-_/2,-_/2,_,_),l.globalCompositeOperation="source-over"),l.restore()}const f=new Po(c);return f.colorSpace=pe,f.anisotropy=4,f}function Co(r,t,e,n,i,s,o,a=[0,0,1,1]){const c=r.pos.length/3,l=n.clone().multiplyScalar(s/2),h=t.clone().addScaledVector(e,i);for(const u of[t.clone().sub(l),t.clone().add(l),h.clone().sub(l),h.clone().add(l)])r.pos.push(u.x,u.y,u.z);for(let u=0;u<4;u++)r.nrm.push(o.x,o.y,o.z);r.uv.push(a[0],a[1],a[2],a[1],a[0],a[3],a[2],a[3]),r.idx.push(c,c+1,c+2,c+1,c+3,c+2)}function ul(r){const t=new Ae;return t.setAttribute("position",new Zt(r.pos,3)),t.setAttribute("normal",new Zt(r.nrm,3)),t.setAttribute("uv",new Zt(r.uv,2)),t.setIndex(r.idx),t}function bc(r,t,e,n,i){const s=new we(r,t,e,n,3,!0);s.translate(0,e/2,0);const o=s.attributes.uv;for(let a=0;a<o.count;a++)o.setXY(a,o.getX(a)*i[0],o.getY(a)*i[1]);return s}function _x(r){const e={pos:[],nrm:[],uv:[],idx:[]},n=new B(0,1,0);for(let i=1.8;i<14-1.2;i+=.42+r()*.12){const s=(i-1.8)/11,o=3.1*Math.pow(1-s,.85)+.45,a=5+Math.floor(r()*3),c=r()*Math.PI*2;for(let l=0;l<a;l++){const h=c+l/a*Math.PI*2+(r()-.5)*.5,u=new B(Math.cos(h),0,Math.sin(h)),d=-.25-r()*.3+s*.25,f=u.clone().multiplyScalar(Math.cos(d)).add(new B(0,Math.sin(d),0)).normalize(),A=(r()-.5)*1.4,g=new B().crossVectors(n,f).normalize().applyAxisAngle(f,A),p=u.clone().multiplyScalar(.75).add(n.clone().multiplyScalar(.65)).normalize();Co(e,new B(0,i,0).addScaledVector(u,.05),f,g,o,o*.75,p)}}for(const i of[0,Math.PI/2]){const s=new B(Math.cos(i),0,Math.sin(i));Co(e,new B(0,14-1.6,0),n,s,2.2,1.1,n)}return{trunk:bc(.04,.3,14-.5,8,[2,7]),crown:ul(e),height:14+.6,width:7.5}}function Ex(r){const t={pos:[],nrm:[],uv:[],idx:[]},e=new B(0,7.6,0),n=new B(3.1,2.7,3.1),i=new B;for(let o=0;o<64;o++){const a=r()*2-1,c=r()*Math.PI*2,l=.55+r()*.45,h=new B(Math.sqrt(1-a*a)*Math.cos(c),a,Math.sqrt(1-a*a)*Math.sin(c)),u=e.clone().add(h.clone().multiply(n).multiplyScalar(l)),d=h.clone().add(i.set(r()-.5,r()-.5,r()-.5).multiplyScalar(1.2)).normalize(),f=new B().crossVectors(d,Math.abs(d.y)>.9?new B(1,0,0):new B(0,1,0)).normalize(),A=new B().crossVectors(d,f).normalize(),m=1.9+r()*1,g=h.clone().multiplyScalar(.8).add(new B(0,.5,0)).normalize();Co(t,u.clone().addScaledVector(A,-m/2),A,f,m,m,g)}const s=[bc(.13,.32,7.2,8,[2,4])];for(let o=0;o<5;o++){const a=o/5*Math.PI*2+r(),c=2.4+r()*1.4,l=bc(.03,.09,c,5,[1,1]);l.rotateZ(-(.5+r()*.4)),l.rotateY(a),l.translate(0,4.6+r()*1.6,0),s.push(l)}return{trunk:vs(s),crown:ul(t),height:11.2,width:7.4}}function eu(r,t,e,n){const i=new nl({map:r,alphaTest:.42,side:Ke});return i.alphaToCoverage=!!e.antialias,i.onBeforeCompile=s=>{s.uniforms.uTime=t.uTime,s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;`).replace("#include <begin_vertex>",`#include <begin_vertex>
        #ifdef USE_INSTANCING
        vec3 ip = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
        #else
        vec3 ip = vec3(0.0);
        #endif
        float sw = max(0.0, position.y - 2.0) * 0.012;
        float ph = uTime * 1.2 + ip.x * 0.11 + ip.z * 0.13;
        transformed.x += sin(ph) * sw;
        transformed.z += sin(ph * 0.8 + 1.3) * sw * 0.6;
        transformed += sin(uTime * 4.0 + position.x * 3.1 + position.y * 2.3 + ip.x) * ${n.toFixed(3)} * step(2.0, position.y);`).replace("#include <beginnormal_vertex>","#include <beginnormal_vertex>"),s.fragmentShader=s.fragmentShader.replace("#include <normal_fragment_begin>",`float faceDirection = 1.0;
vec3 normal = normalize(vNormal);
vec3 nonPerturbedNormal = normal;`)},i}function xx(r,t,e,n,i,s,o){const a=new ai(256,512,{colorSpace:pe});a.texture.generateMipmaps=!0,a.texture.minFilter=mn;const c=new Gu;c.add(new ad(13162736,4868650,1));const l=new sl(16774368,2.4);l.position.set(.4,1,1),c.add(l);const h=new Be;h.add(new ue(t,n),new ue(e,i)),c.add(h);const u=new Ro(-o/2,o/2,s,0,-50,50);u.position.set(0,0,10);const d=r.getRenderTarget(),f=r.getClearColor(new yt),A=r.getClearAlpha(),m=r.toneMapping;return r.setRenderTarget(a),r.setClearColor(2767386,0),r.clear(),r.render(c,u),r.setRenderTarget(d),r.setClearColor(f,A),r.toneMapping=m,a.texture}function vx(r,t){const e=[];for(const s of[0,Math.PI/2]){const o=new Mi(r,t);o.translate(0,t/2,0),o.rotateY(s),e.push(o)}const n=vs(e),i=n.attributes.normal;for(let s=0;s<i.count;s++)i.setXYZ(s,0,1,0);return n}async function yx(r,t,e,n,i,s){const o=Cn(5),a=gx(),c=await mx(),l=[_x(o),Ex(o)],h=[e,n].map(_=>new ln({map:_.albedo,normalMap:t.normalMaps?_.normal:null,roughnessMap:_.rough,roughness:1,metalness:0})),u=[eu(a,i,t,.01),eu(c,i,t,.03)];u[1].color.set(8227426);const d=new Be,f=[],A=[];for(const _ of[0,1]){const T=l[_],S=r.trees.filter(z=>z.type===_),M=Tc(S),b=Math.min(S.length,700),I=new ts(T.trunk,h[_],b),v=new ts(T.crown,u[_],b),D=xx(s,T.trunk,T.crown,h[_],u[_],T.height,T.width),Q=new Hn({map:D,alphaTest:.4,side:Ke});A.push(Q);const N=new ts(vx(T.width,T.height),Q,S.length);for(const z of[I,v,N])z.frustumCulled=!1,z.count=0,z.instanceMatrix.setUsage(go),d.add(z);I.castShadow=v.castShadow=t.shadows,I.receiveShadow=v.receiveShadow=t.shadows,f.push(new Bc(S,M,[I,v],N,t.treeHi,t.viewDist))}const m=[],g=Cn(12);for(let _=0;_<5200&&m.length<2600;_++){const T=(g()*2-1)*(rn-10),S=(g()*2-1)*(rn-10),M=Qo(T,S);g()>M*.8+.08||wi(T,S)<_n+4||gs(T,S)<4||ur(T,S)<4||ms(T,S)>.7||m.push({x:T,z:S,y:We(T,S)-.1,s:.6+g()*.7,rot:g()*6.28})}const p={pos:[],nrm:[],uv:[],idx:[]},x=new B(0,.55,0);for(let _=0;_<16;_++){const T=o()*.9+.1,S=o()*Math.PI*2,M=new B(Math.sqrt(1-T*T)*Math.cos(S),T,Math.sqrt(1-T*T)*Math.sin(S)),b=x.clone().add(M.clone().multiply(new B(.75,.45,.75)).multiplyScalar(.4+o()*.6)),I=M.clone().add(new B(o()-.5,o()-.5,o()-.5)).normalize(),v=new B().crossVectors(I,new B(0,1,0)).normalize();v.lengthSq()<.1&&v.set(1,0,0);const D=new B().crossVectors(I,v).normalize(),Q=.8+o()*.5,N=M.clone().add(new B(0,.7,0)).normalize();Co(p,b.clone().addScaledVector(D,-Q/2),D,v,Q,Q,N)}const E=new ts(ul(p),u[1],Math.min(m.length,900));return E.frustumCulled=!1,E.count=0,E.instanceMatrix.setUsage(go),E.castShadow=!1,E.receiveShadow=t.shadows,d.add(E),f.push(new Bc(m,Tc(m),[E],null,Math.min(70,t.viewDist*.4),0)),d.update=(_,T)=>f.forEach(S=>S.update(_,T)),d.setLight=_=>A.forEach(T=>T.color.setScalar(_)),d}function Ix(r,t=.5,e=!1){r=r.index?r.toNonIndexed():r;const n=r.attributes.position,i=r.attributes.normal,s=new Float32Array(n.count*2);for(let o=0;o<n.count;o++){const a=Math.abs(i.getX(o)),c=Math.abs(i.getY(o)),l=Math.abs(i.getZ(o));let h,u;c>=a&&c>=l?(h=n.getX(o),u=n.getZ(o)):a>=l?(h=n.getZ(o),u=n.getY(o)):(h=n.getX(o),u=n.getY(o)),e&&([h,u]=[u,h]),s[o*2]=h*t,s[o*2+1]=u*t}return r.setAttribute("uv",new fe(s,2)),r}const he=(r,t,e,n,i,s)=>new ke(r,t,e).translate(n,i,s);class ro{constructor(){this.parts={}}add(t,e,n=.5){var i;((i=this.parts)[t]||(i[t]=[])).push(Ix(e,n))}commit(t,e,n,i,s){var a;const o=new Pt().makeRotationY(s).setPosition(e,n,i);for(const[c,l]of Object.entries(t.parts))for(const h of l)((a=this.parts)[c]||(a[c]=[])).push(h.clone().applyMatrix4(o))}}function Cx(r,t){const e=new ro,[n,i]=hl[r],s=r==="shed",o=s?2.6:r==="lodge"?3.3:3,a=.32,c=s?"planks":"logs";if(e.add("stone",he(n+.35,.9,i+.35,0,-.35,0),.6),e.add(c,he(n,o,a,0,o/2,i/2-a/2)),e.add(c,he(n,o,a,0,o/2,-i/2+a/2)),e.add(c,he(a,o,i-2*a,n/2-a/2,o/2,0)),e.add(c,he(a,o,i-2*a,-n/2+a/2,o/2,0)),!s)for(const m of[-1,1])for(const g of[-1,1])for(let p=.15;p<o;p+=.3){const x=new we(.15,.15,.7,7).rotateZ(Math.PI/2).translate(m*(n/2+.05),p,g*(i/2-.15));e.add("bark",x,1);const E=new we(.15,.15,.7,7).rotateX(Math.PI/2).translate(m*(n/2-.15),p+.15,g*(i/2+.05));e.add("bark",E,1)}const l=s?.42:.6,h=.55,u=i/2*Math.tan(l),d=(i/2+h)/Math.cos(l);for(const m of[1,-1]){const g=new ke(n+2*h,.14,d);g.rotateX(m*l),g.translate(0,o+u/2-h*Math.tan(l)/2+.08,m*(i/2+h)/2-m*0),e.add("roof",g,.5)}e.add("planks",he(n+2*h,.18,.22,0,o+u+.12,0),.5);for(const m of[1,-1]){const g=new $u([new tt(-i/2,0),new tt(i/2,0),new tt(0,u)]),p=new tl(g,{depth:a,bevelEnabled:!1});p.rotateY(Math.PI/2).translate(m*(n/2)-(m>0?a:0),o,0),e.add("planks",p,.5)}const f=s?0:-n*.22;e.add("door",he(s?1.8:1,2.05,.08,f,1.03,i/2+.03),.6);for(const m of[-1,1])e.add("planks",he(.12,2.25,.14,f+m*(s?.96:.56),1.12,i/2+.05),1);e.add("planks",he(s?2.1:1.25,.14,.14,f,2.2,i/2+.05),1);const A=[];s||(A.push([n*.22,i/2+.03,0],[-n*.2,-i/2-.03,Math.PI],[n*.2,-i/2-.03,Math.PI]),A.push([n/2+.03,0,Math.PI/2],[-n/2-.03,0,-Math.PI/2]),r==="lodge"&&A.push([n*.42,i/2+.03,0]));for(const[m,g,p]of A){const x=[["glass",he(.95,.85,.04,0,1.55,0)],["planks",he(1.15,.1,.1,0,2.02,.03)],["planks",he(1.15,.1,.12,0,1.08,.04)],["planks",he(.08,.95,.1,-.53,1.55,.03)],["planks",he(.08,.95,.1,.53,1.55,.03)],["planks",he(.05,.85,.06,0,1.55,.03)],["door",he(.5,.95,.05,-.85,1.55,.05)],["door",he(.5,.95,.05,.85,1.55,.05)]],E=new Pt().makeRotationY(p).setPosition(m,0,g);for(const[_,T]of x)e.add(_,T.applyMatrix4(E),1)}if(!s){e.add("planks",he(n*.9,.16,2.2,0,.32,i/2+2.2/2),.7),e.add("planks",he(1.2,.16,.5,f,.12,i/2+2.2+.25),.7);for(const p of[-n*.43,0,n*.43])e.add("bark",new we(.1,.12,o-.3,7).translate(p,(o-.3)/2+.3,i/2+2.2-.15),1);const g=new ke(n*.95,.1,2.2+.5).rotateX(.22).translate(0,o+.02,i/2+2.2/2+.1);e.add("roof",g,.5),e.add("planks",he(n*.9,.08,.08,0,1,i/2+2.2-.12),1)}return s||e.add("stone",he(.85,o+u+1.4,.85,n/2-1,(o+u+1.4)/2,-i*.2),.6),e}function nu(r,t,e,n){const i=new Pt().makeRotationY(n).setPosition(t,0,e);for(let s=0;s<4;s++)for(let o=0;o<6-s;o++){const a=new we(.14,.14,1.6,7).rotateX(Math.PI/2).translate((o-(5-s)/2)*.29,.14+s*.25,0).applyMatrix4(i);r.add("bark",a,1)}}function Mx(r,t,e,n){for(let i=0;i<10;i++){const s=i/10*Math.PI*2;r.add("stone",new No(.22+n()*.08,0).scale(1,.7,1).translate(t+Math.cos(s)*.8,.08,e+Math.sin(s)*.8),1)}for(let i=0;i<3;i++)r.add("bark",new we(.07,.07,.9,6).rotateZ(Math.PI/2).rotateY(i*2.1).translate(t,.1,e),1)}const wd=4.5;function Sx(r){const t=wd,e=1;for(const n of[-1,1])for(const i of[-1,1])r.add("bark",new we(.09,.12,t+2.2,6).translate(n*e,(t+2.2)/2,i*e),1);for(const n of[-1,1]){const i=new we(.05,.05,Math.hypot(2*e,t*.7),5).rotateX(Math.atan2(2*e,t*.7)).translate(n*e,t*.4,0);r.add("bark",i,1)}r.add("planks",he(2*e+.4,.12,2*e+.4,0,t,0),.7);for(const[n,i,s,o]of[[2.4,.08,0,1.15],[2.4,.08,0,-1.15],[.08,2.4,1.15,0],[.08,2.4,-1.15,0]])r.add("planks",he(n,.1,i,s,t+.9,o),1),r.add("planks",he(n,.5,i,s,t+.3,o),.7);r.add("roof",he(2.8,.1,2.8,0,t+2.25,0),.5);for(const n of[-.3,.3])r.add("bark",new we(.05,.05,t+.6,5).rotateX(-.25).translate(n,(t+.6)/2-.1,e+.7),1);for(let n=.4;n<t;n+=.4)r.add("bark",new we(.035,.035,.6,5).rotateZ(Math.PI/2).translate(0,n,e+.7+(t/2-n)*.255-t*.13+.55),1)}function wx(){const r=Cn(2024),t=[],e=[];for(let n=0;n<600;n++){const i=(r()*2-1)*(rn-40),s=(r()*2-1)*(rn-40),o=Qo(i,s);o<.05||o>.4||wi(i,s)<_n+15||gs(i,s)<6||ur(i,s)<10||ms(i,s)>.25||e.push({x:i,z:s,d0:Math.hypot(i,s)})}e.sort((n,i)=>n.d0-i.d0);for(const n of e)if(!(t.length===0&&n.d0<35)&&(t.every(i=>Math.hypot(i.x-n.x,i.z-n.z)>170)&&t.push({...n,y:We(n.x,n.z),rot:Math.atan2(-n.x,-n.z)+Math.PI}),t.length>=6))break;return t}function Bx(r,t,e){const n=Cn(8),i=new ro;for(const u of je)i.commit(Cx(u.type),u.x,u.h,u.z,u.rot);const s=je[0],o=new ro;nu(o,6.5,2,.3),nu(o,6.5,3.2,.3),Mx(o,-2,10,n),i.commit(o,s.x,s.h,s.z,s.rot);const a=wx();for(const u of a){const d=new ro;Sx(d),i.commit(d,u.x,u.y-.1,u.z,u.rot)}const c=(u,d={})=>new ln({map:u.albedo,normalMap:t.normalMaps?u.normal:null,roughnessMap:u.rough,roughness:1,metalness:0,...d}),l={logs:c(e.logs),planks:c(e.planks),door:c(e.planks,{color:8018496}),roof:c(e.roof,{color:11577496}),stone:c(e.rock),bark:c(e.bark),glass:new ln({color:1712680,roughness:.08,metalness:.6,emissive:16752704,emissiveIntensity:0})},h=new Be;for(const[u,d]of Object.entries(i.parts)){const f=vs(d.map(m=>{m=m.index?m.toNonIndexed():m;for(const g of Object.keys(m.attributes))["position","normal","uv"].includes(g)||m.deleteAttribute(g);return m})),A=new ue(f,l[u]);A.castShadow=t.shadows,A.receiveShadow=t.shadows,A.matrixAutoUpdate=!1,h.add(A)}return h.towers=a,h.setEvening=u=>{l.glass.emissiveIntensity=u*1.6},h}const Zr=[{t:0,elev:1,zen:4161488,hor:12178666,sun:16774368,si:2.6,hs:12375792,hg:4868650,hi:1},{t:.5,elev:.38,zen:4880568,hor:15127208,sun:16767392,si:2.3,hs:13159640,hg:5062952,hi:1},{t:1,elev:.1,zen:2834286,hor:15764042,sun:16751184,si:2,hs:11575488,hg:5914672,hi:1.15}];class Tx{constructor(t,e){this.scene=t,this.preset=e,this.t=0,this.azimuth=.9,this.sunDir=new B,this.uniforms={uZenith:{value:new yt},uHorizon:{value:new yt},uSunDir:{value:this.sunDir},uSunColor:{value:new yt},uTime:{value:0}};const n=new xn({uniforms:this.uniforms,side:Ge,depthWrite:!1,fog:!1,vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_Position = p.xyww;
        }`,fragmentShader:`
        uniform vec3 uZenith, uHorizon, uSunDir, uSunColor;
        uniform float uTime;
        varying vec3 vDir;
        float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float vn(vec2 p) {
          vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
          return mix(mix(h21(i), h21(i + vec2(1, 0)), f.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), f.x), f.y);
        }
        float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * vn(p); p *= 2.03; a *= 0.5; } return s; }
        void main() {
          vec3 d = normalize(vDir);
          float h = max(d.y, 0.0);
          vec3 col = mix(uHorizon, uZenith, smoothstep(0.03, 0.7, h));
          col = mix(col, uHorizon * 0.8, smoothstep(0.0, -0.2, d.y));
          float s = max(dot(d, uSunDir), 0.0);
          col += uSunColor * (pow(s, 900.0) * 6.0 + pow(s, 12.0) * 0.35 + pow(s, 3.0) * 0.12);
          // облака: проекция на «потолок», дрейф по ветру
          if (d.y > 0.02) {
            vec2 cp = d.xz / (d.y + 0.08) * 1.4 + vec2(uTime * 0.012, uTime * 0.004);
            float n = fbm(cp);
            float cov = smoothstep(0.48, 0.78, n) * smoothstep(0.02, 0.25, d.y);
            float shade = fbm(cp + uSunDir.xz * 0.15);
            vec3 cloudCol = mix(uHorizon * 1.05, vec3(1.0) * 0.95 + uSunColor * 0.25, 0.55 + (n - shade) * 2.0);
            cloudCol += uSunColor * pow(s, 6.0) * 0.6;
            col = mix(col, cloudCol, cov * 0.92);
          }
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`});if(this.dome=new ue(new fr(1e3,24,12),n),this.dome.frustumCulled=!1,this.dome.renderOrder=-1,t.add(this.dome),this.hemi=new ad,t.add(this.hemi),this.sun=new sl,this.sun.castShadow=e.shadows,e.shadows){const i=this.sun.shadow;i.mapSize.set(e.shadowMap,e.shadowMap);const s=e.shadowDist;Object.assign(i.camera,{left:-s,right:s,top:s,bottom:-s,near:1,far:400}),i.bias=-4e-4,i.normalBias=.6,i.camera.updateProjectionMatrix()}t.add(this.sun,this.sun.target),t.fog=new qc(16777215,30,e.viewDist),this.set(0)}set(t){this.t=t;let e=Zr[0],n=Zr[1];t>.5&&(e=Zr[1],n=Zr[2]);const i=(t-e.t)/(n.t-e.t),s=(l,h)=>new yt(l).lerp(new yt(h),i),o=e.elev+(n.elev-e.elev)*i;this.sunDir.set(Math.cos(o)*Math.sin(this.azimuth),Math.sin(o),Math.cos(o)*Math.cos(this.azimuth)).normalize();const a=s(e.hor,n.hor);this.uniforms.uZenith.value.copy(s(e.zen,n.zen)),this.uniforms.uHorizon.value.copy(a);const c=s(e.sun,n.sun);this.uniforms.uSunColor.value.copy(c),this.sun.color.copy(c),this.sun.intensity=e.si+(n.si-e.si)*i,this.hemi.color.copy(s(e.hs,n.hs)),this.hemi.groundColor.copy(s(e.hg,n.hg)),this.hemi.intensity=e.hi+(n.hi-e.hi)*i,this.scene.fog.color.copy(a),this.scene.fog.near=20+(1-t)*20}farMaterial(t){return new xn({uniforms:{...this.uniforms,uFogColor:{value:this.scene.fog.color},uNear:{value:t*.9},uFar:{value:t*2.2}},vertexShader:`
        varying vec3 vW; varying vec3 vN;
        void main() { vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; vN = normal; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`
        uniform vec3 uZenith, uHorizon, uSunDir, uSunColor, uFogColor;
        uniform float uNear, uFar;
        varying vec3 vW; varying vec3 vN;
        void main() {
          vec3 d = normalize(vW - cameraPosition);
          float dist = length(vW - cameraPosition);
          vec3 sky = mix(uHorizon, uZenith, smoothstep(0.03, 0.7, max(d.y, 0.0)));
          float lit = 0.75 + 0.25 * max(dot(normalize(vN), uSunDir), 0.0);
          vec3 haze = sky * mix(0.72, 0.9, smoothstep(uNear, uFar * 1.5, dist)) * lit;
          vec3 col = mix(uFogColor, haze, smoothstep(uNear, uFar, dist));
          gl_FragColor = vec4(col, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }`})}update(t,e=0){this.uniforms.uTime.value=e,this.dome.position.copy(t);const n=this.preset.shadowDist*2/(this.preset.shadowMap||1),i=Math.round(t.x/n)*n,s=Math.round(t.z/n)*n;this.sun.target.position.set(i,t.y,s),this.sun.position.copy(this.sun.target.position).addScaledVector(this.sunDir,200),this.sun.target.updateMatrixWorld()}}class bx{constructor(t){this.N=120,this.pos=new Float32Array(this.N*3),this.vel=new Float32Array(this.N*3),this.life=new Float32Array(this.N),this.col=new Float32Array(this.N*3);const e=new Ae;e.setAttribute("position",new fe(this.pos,3).setUsage(go)),e.setAttribute("color",new fe(this.col,3)),this.points=new Yu(e,new Kc({size:.09,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1})),this.points.frustumCulled=!1,t.add(this.points),this.i=0}spawn(t,e=7035456,n=14){const i=new yt(e);for(let s=0;s<n;s++){const o=this.i++%this.N;this.pos.set([t.x,t.y,t.z],o*3),this.vel.set([(Math.random()-.5)*3,Math.random()*3+1,(Math.random()-.5)*3],o*3),this.col.set([i.r,i.g,i.b],o*3),this.life[o]=.6+Math.random()*.4}this.points.geometry.attributes.color.needsUpdate=!0}update(t){for(let e=0;e<this.N;e++){if(this.life[e]<=0){this.pos[e*3+1]=-1e4;continue}this.life[e]-=t,this.vel[e*3+1]-=9*t;for(let n=0;n<3;n++)this.pos[e*3+n]+=this.vel[e*3+n]*t}this.points.geometry.attributes.position.needsUpdate=!0}}const Rx=1.68,Dx=22;class Lx{constructor(t,e,n,i){Object.assign(this,{camera:t,ground:e,world:n,sound:i}),this.pos=new B(0,0,0),this.pos.y=e.sample(0,0),this.vel=new B,this.yaw=0,this.pitch=0,this.recoil=0,this.onGround=!0,this.speed=0,this.stepT=0,this.baseFov=t.fov,this.health=100,this.platform=null}update(t,e,n){const i=e.takeLook(),o=.0022*_o.lerp(1,.22,n);this.yaw-=i.x*o,this.pitch-=i.y*o,this.pitch=Math.max(-1.45,Math.min(1.45,this.pitch));const a=this.recoil*Math.min(1,t*12);this.pitch+=a,this.recoil-=a;const c=this.pos.y<lr-.4;let l=e.sprint&&n<.3?7.2:4.3;n>.5&&(l=2.2),c&&(l*=.45);const h=e.move.y,u=e.move.x,d=Math.sin(this.yaw),f=Math.cos(this.yaw),A=(-d*h+f*u)*l,m=(-f*h-d*u)*l,g=this.onGround?12:2;if(this.vel.x+=(A-this.vel.x)*Math.min(1,t*g),this.vel.z+=(m-this.vel.z)*Math.min(1,t*g),e.consume("jump")&&this.onGround&&!c&&(this.vel.y=6.5,this.onGround=!1),this.vel.y-=Dx*t,this.pos.x+=this.vel.x*t,this.pos.z+=this.vel.z*t,this.platform){const _=this.platform,T=this.pos.x-_.x,S=this.pos.z-_.z,M=Math.hypot(T,S);M>_.r&&(this.pos.x=_.x+T/M*_.r,this.pos.z=_.z+S/M*_.r)}else this.world.collide(this.pos,.35);this.pos.y+=this.vel.y*t;const p=this.platform?this.platform.y:this.ground.sample(this.pos.x,this.pos.z);this.pos.y<=p?(this.pos.y=p,this.vel.y=0,this.onGround=!0):this.pos.y>p+.3?this.onGround=!1:this.onGround&&(this.pos.y=p),this.speed=Math.hypot(this.vel.x,this.vel.z),this.onGround&&this.speed>1&&(this.stepT+=t*this.speed*.55,this.stepT>1&&(this.stepT=0,this.sound.step(c)));const x=this.onGround?Math.sin(performance.now()*.001*(4+this.speed*1.4))*Math.min(this.speed,7)*.012*(1-n):0;this.camera.position.set(this.pos.x,this.pos.y+Rx+x,this.pos.z),this.camera.rotation.set(this.pitch,this.yaw,0,"YXZ");const E=_o.lerp(this.baseFov,14,n*n);Math.abs(E-this.camera.fov)>.01&&(this.camera.fov=E,this.camera.updateProjectionMatrix())}addRecoil(t){this.recoil+=t}}class dl extends Ti{constructor(t){super(t),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Qx(e)}),this.register(function(e){return new kx(e)}),this.register(function(e){return new Yx(e)}),this.register(function(e){return new Jx(e)}),this.register(function(e){return new Kx(e)}),this.register(function(e){return new Gx(e)}),this.register(function(e){return new zx(e)}),this.register(function(e){return new Hx(e)}),this.register(function(e){return new Vx(e)}),this.register(function(e){return new Fx(e)}),this.register(function(e){return new Wx(e)}),this.register(function(e){return new Ox(e)}),this.register(function(e){return new Xx(e)}),this.register(function(e){return new qx(e)}),this.register(function(e){return new Ux(e)}),this.register(function(e){return new jx(e)}),this.register(function(e){return new Zx(e)})}load(t,e,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const l=js.extractUrlBase(t);o=js.resolveURL(l,this.path)}else o=js.extractUrlBase(t);this.manager.itemStart(t);const a=function(l){i?i(l):console.error(l),s.manager.itemError(t),s.manager.itemEnd(t)},c=new Ks(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(t,function(l){try{s.parse(l,o,function(h){e(h),s.manager.itemEnd(t)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(t){return this.dracoLoader=t,this}setKTX2Loader(t){return this.ktx2Loader=t,this}setMeshoptDecoder(t){return this.meshoptDecoder=t,this}register(t){return this.pluginCallbacks.indexOf(t)===-1&&this.pluginCallbacks.push(t),this}unregister(t){return this.pluginCallbacks.indexOf(t)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(t),1),this}parse(t,e,n,i){let s;const o={},a={},c=new TextDecoder;if(typeof t=="string")s=JSON.parse(t);else if(t instanceof ArrayBuffer)if(c.decode(new Uint8Array(t,0,4))===Bd){try{o[Wt.KHR_BINARY_GLTF]=new $x(t)}catch(u){i&&i(u);return}s=JSON.parse(o[Wt.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(t));else s=t;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new dv(s,{path:e||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Wt.KHR_MATERIALS_UNLIT:o[u]=new Nx;break;case Wt.KHR_DRACO_MESH_COMPRESSION:o[u]=new tv(s,this.dracoLoader);break;case Wt.KHR_TEXTURE_TRANSFORM:o[u]=new ev;break;case Wt.KHR_MESH_QUANTIZATION:o[u]=new nv;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(o),l.setPlugins(a),l.parse(n,i)}parseAsync(t,e){const n=this;return new Promise(function(i,s){n.parse(t,e,i,s)})}}function Px(){let r={};return{get:function(t){return r[t]},add:function(t,e){r[t]=e},remove:function(t){delete r[t]},removeAll:function(){r={}}}}const Wt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Ux{constructor(t){this.parser=t,this.name=Wt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const t=this.parser,e=this.parser.json.nodes||[];for(let n=0,i=e.length;n<i;n++){const s=e[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&t._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(t){const e=this.parser,n="light:"+t;let i=e.cache.get(n);if(i)return i;const s=e.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[t];let l;const h=new yt(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Pe);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new sl(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new sE(h),l.distance=u;break;case"spot":l=new nE(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,On(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=e.createUniqueName(c.name||"light_"+t),i=Promise.resolve(l),e.cache.add(n,i),i}getDependency(t,e){if(t==="light")return this._loadLight(e)}createNodeAttachment(t){const e=this,n=this.parser,s=n.json.nodes[t],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(c){return n._getNodeRef(e.cache,a,c)})}}class Nx{constructor(){this.name=Wt.KHR_MATERIALS_UNLIT}getMaterialType(){return Hn}extendParams(t,e,n){const i=[];t.color=new yt(1,1,1),t.opacity=1;const s=e.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;t.color.setRGB(o[0],o[1],o[2],Pe),t.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(t,"map",s.baseColorTexture,pe))}return Promise.all(i)}}class Fx{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(e.emissiveIntensity=s),Promise.resolve()}}class Qx{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_CLEARCOAT}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(e.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(e.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(e,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;e.clearcoatNormalScale=new tt(a,a)}return Promise.all(s)}}class kx{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_DISPERSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return e.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class Ox{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(e.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(e.iridescenceIOR=o.iridescenceIor),e.iridescenceThicknessRange===void 0&&(e.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(e.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(e.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(e,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class Gx{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_SHEEN}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];e.sheenColor=new yt(0,0,0),e.sheenRoughness=0,e.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;e.sheenColor.setRGB(a[0],a[1],a[2],Pe)}return o.sheenRoughnessFactor!==void 0&&(e.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(e,"sheenColorMap",o.sheenColorTexture,pe)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(e,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class zx{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_TRANSMISSION}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(e.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(e,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Hx{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_VOLUME}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];e.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(e,"thicknessMap",o.thicknessTexture)),e.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return e.attenuationColor=new yt().setRGB(a[0],a[1],a[2],Pe),Promise.all(s)}}class Vx{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_IOR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const i=this.parser.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return e.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class Wx{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_SPECULAR}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];e.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(e,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return e.specularColor=new yt().setRGB(a[0],a[1],a[2],Pe),o.specularColorTexture!==void 0&&s.push(n.assignTexture(e,"specularColorMap",o.specularColorTexture,pe)),Promise.all(s)}}class qx{constructor(t){this.parser=t,this.name=Wt.EXT_MATERIALS_BUMP}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return e.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(e,"bumpMap",o.bumpTexture)),Promise.all(s)}}class Xx{constructor(t){this.parser=t,this.name=Wt.KHR_MATERIALS_ANISOTROPY}getMaterialType(t){const n=this.parser.json.materials[t];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(t,e){const n=this.parser,i=n.json.materials[t];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(e.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(e.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(e,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class Yx{constructor(t){this.parser=t,this.name=Wt.KHR_TEXTURE_BASISU}loadTexture(t){const e=this.parser,n=e.json,i=n.textures[t];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=e.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return e.loadTextureImage(t,s.source,o)}}class Jx{constructor(t){this.parser=t,this.name=Wt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;const o=s.extensions[e],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class Kx{constructor(t){this.parser=t,this.name=Wt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(t){const e=this.name,n=this.parser,i=n.json,s=i.textures[t];if(!s.extensions||!s.extensions[e])return null;const o=s.extensions[e],a=i.images[o.source];let c=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(t,o.source,c);if(i.extensionsRequired&&i.extensionsRequired.indexOf(e)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(t)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(t){const e=new Image;e.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",e.onload=e.onerror=function(){t(e.height===1)}})),this.isSupported}}class jx{constructor(t){this.name=Wt.EXT_MESHOPT_COMPRESSION,this.parser=t}loadBufferView(t){const e=this.parser.json,n=e.bufferViews[t];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(e.extensionsRequired&&e.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,c,l);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class Zx{constructor(t){this.name=Wt.EXT_MESH_GPU_INSTANCING,this.parser=t}createNodeMesh(t){const e=this.parser.json,n=e.nodes[t];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=e.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==tn.TRIANGLES&&l.mode!==tn.TRIANGLE_STRIP&&l.mode!==tn.TRIANGLE_FAN&&l.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],c={};for(const l in o)a.push(this.parser.getDependency("accessor",o[l]).then(h=>(c[l]=h,c[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(t)),Promise.all(a).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const A of u){const m=new Pt,g=new B,p=new an,x=new B(1,1,1),E=new ts(A.geometry,A.material,d);for(let _=0;_<d;_++)c.TRANSLATION&&g.fromBufferAttribute(c.TRANSLATION,_),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,_),c.SCALE&&x.fromBufferAttribute(c.SCALE,_),E.setMatrixAt(_,m.compose(g,p,x));for(const _ in c)if(_==="_COLOR_0"){const T=c[_];E.instanceColor=new Eo(T.array,T.itemSize,T.normalized)}else _!=="TRANSLATION"&&_!=="ROTATION"&&_!=="SCALE"&&A.geometry.setAttribute(_,c[_]);de.prototype.copy.call(E,A),this.parser.assignFinalMaterial(E),f.push(E)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Bd="glTF",Fs=12,iu={JSON:1313821514,BIN:5130562};class $x{constructor(t){this.name=Wt.KHR_BINARY_GLTF,this.content=null,this.body=null;const e=new DataView(t,0,Fs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(t.slice(0,4))),version:e.getUint32(4,!0),length:e.getUint32(8,!0)},this.header.magic!==Bd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Fs,s=new DataView(t,Fs);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const c=s.getUint32(o,!0);if(o+=4,c===iu.JSON){const l=new Uint8Array(t,Fs+o,a);this.content=n.decode(l)}else if(c===iu.BIN){const l=Fs+o;this.body=t.slice(l,l+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class tv{constructor(t,e){if(!e)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Wt.KHR_DRACO_MESH_COMPRESSION,this.json=t,this.dracoLoader=e,this.dracoLoader.preload()}decodePrimitive(t,e){const n=this.json,i=this.dracoLoader,s=t.extensions[this.name].bufferView,o=t.extensions[this.name].attributes,a={},c={},l={};for(const h in o){const u=Rc[h]||h.toLowerCase();a[u]=o[h]}for(const h in t.attributes){const u=Rc[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[t.attributes[h]],f=rs[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return e.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const A in f.attributes){const m=f.attributes[A],g=c[A];g!==void 0&&(m.normalized=g)}u(f)},a,l,Pe,d)})})}}class ev{constructor(){this.name=Wt.KHR_TEXTURE_TRANSFORM}extendTexture(t,e){return(e.texCoord===void 0||e.texCoord===t.channel)&&e.offset===void 0&&e.rotation===void 0&&e.scale===void 0||(t=t.clone(),e.texCoord!==void 0&&(t.channel=e.texCoord),e.offset!==void 0&&t.offset.fromArray(e.offset),e.rotation!==void 0&&(t.rotation=e.rotation),e.scale!==void 0&&t.repeat.fromArray(e.scale),t.needsUpdate=!0),t}}class nv{constructor(){this.name=Wt.KHR_MESH_QUANTIZATION}}class Td extends Ar{constructor(t,e,n,i){super(t,e,n,i)}copySampleValue_(t){const e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=t*i*3+i;for(let o=0;o!==i;o++)e[o]=n[s+o];return e}interpolate_(t,e,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=a*2,l=a*3,h=i-e,u=(n-e)/h,d=u*u,f=d*u,A=t*l,m=A-l,g=-2*f+3*d,p=f-d,x=1-g,E=p-d+u;for(let _=0;_!==a;_++){const T=o[m+_+a],S=o[m+_+c]*h,M=o[A+_+a],b=o[A+_]*h;s[_]=x*T+E*S+g*M+p*b}return s}}const iv=new an;class sv extends Td{interpolate_(t,e,n,i){const s=super.interpolate_(t,e,n,i);return iv.fromArray(s).normalize().toArray(s),s}}const tn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},rs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},su={9728:ze,9729:De,9984:uu,9985:eo,9986:ks,9987:mn},ru={33071:Gn,33648:ao,10497:Ii},Da={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Rc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ni={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},rv={CUBICSPLINE:void 0,LINEAR:ir,STEP:nr},La={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function ov(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new ln({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qn})),r.DefaultMaterial}function pi(r,t,e){for(const n in e.extensions)r[n]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[n]=e.extensions[n])}function On(r,t){t.extras!==void 0&&(typeof t.extras=="object"?Object.assign(r.userData,t.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function av(r,t,e){let n=!1,i=!1,s=!1;for(let l=0,h=t.length;l<h;l++){const u=t[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],c=[];for(let l=0,h=t.length;l<h;l++){const u=t[l];if(n){const d=u.POSITION!==void 0?e.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?e.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?e.getDependency("accessor",u.COLOR_0):r.attributes.color;c.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function cv(r,t){if(r.updateMorphTargets(),t.weights!==void 0)for(let e=0,n=t.weights.length;e<n;e++)r.morphTargetInfluences[e]=t.weights[e];if(t.extras&&Array.isArray(t.extras.targetNames)){const e=t.extras.targetNames;if(r.morphTargetInfluences.length===e.length){r.morphTargetDictionary={};for(let n=0,i=e.length;n<i;n++)r.morphTargetDictionary[e[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function lv(r){let t;const e=r.extensions&&r.extensions[Wt.KHR_DRACO_MESH_COMPRESSION];if(e?t="draco:"+e.bufferView+":"+e.indices+":"+Pa(e.attributes):t=r.indices+":"+Pa(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)t+=":"+Pa(r.targets[n]);return t}function Pa(r){let t="";const e=Object.keys(r).sort();for(let n=0,i=e.length;n<i;n++)t+=e[n]+":"+r[e[n]]+";";return t}function Dc(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function hv(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const uv=new Pt;class dv{constructor(t={},e={}){this.json=t,this.extensions={},this.plugins={},this.options=e,this.cache=new Px,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const c=a.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new od(this.options.manager):this.textureLoader=new aE(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ks(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(t){this.extensions=t}setPlugins(t){this.plugins=t}parse(t,e){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return pi(s,a,i),On(a,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(a)})).then(function(){for(const c of a.scenes)c.updateMatrixWorld();t(a)})}).catch(e)}_markDefs(){const t=this.json.nodes||[],e=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=e.length;i<s;i++){const o=e[i].joints;for(let a=0,c=o.length;a<c;a++)t[o[a]].isBone=!0}for(let i=0,s=t.length;i<s;i++){const o=t[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(t,e){e!==void 0&&(t.refs[e]===void 0&&(t.refs[e]=t.uses[e]=0),t.refs[e]++)}_getNodeRef(t,e,n){if(t.refs[e]<=1)return n;const i=n.clone(),s=(o,a)=>{const c=this.associations.get(o);c!=null&&this.associations.set(a,c);for(const[l,h]of o.children.entries())s(h,a.children[l])};return s(n,i),i.name+="_instance_"+t.uses[e]++,i}_invokeOne(t){const e=Object.values(this.plugins);e.push(this);for(let n=0;n<e.length;n++){const i=t(e[n]);if(i)return i}return null}_invokeAll(t){const e=Object.values(this.plugins);e.unshift(this);const n=[];for(let i=0;i<e.length;i++){const s=t(e[i]);s&&n.push(s)}return n}getDependency(t,e){const n=t+":"+e;let i=this.cache.get(n);if(!i){switch(t){case"scene":i=this.loadScene(e);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(e)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(e)});break;case"accessor":i=this.loadAccessor(e);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(e)});break;case"buffer":i=this.loadBuffer(e);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(e)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(e)});break;case"skin":i=this.loadSkin(e);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(e)});break;case"camera":i=this.loadCamera(e);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(t,e)}),!i)throw new Error("Unknown type: "+t);break}this.cache.add(n,i)}return i}getDependencies(t){let e=this.cache.get(t);if(!e){const n=this,i=this.json[t+(t==="mesh"?"es":"s")]||[];e=Promise.all(i.map(function(s,o){return n.getDependency(t,o)})),this.cache.add(t,e)}return e}loadBuffer(t){const e=this.json.buffers[t],n=this.fileLoader;if(e.type&&e.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+e.type+" buffer type is not supported.");if(e.uri===void 0&&t===0)return Promise.resolve(this.extensions[Wt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(js.resolveURL(e.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+e.uri+'".'))})})}loadBufferView(t){const e=this.json.bufferViews[t];return this.getDependency("buffer",e.buffer).then(function(n){const i=e.byteLength||0,s=e.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(t){const e=this,n=this.json,i=this.json.accessors[t];if(i.bufferView===void 0&&i.sparse===void 0){const o=Da[i.type],a=rs[i.componentType],c=i.normalized===!0,l=new a(i.count*o);return Promise.resolve(new fe(l,o,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],c=Da[i.type],l=rs[i.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,A=i.normalized===!0;let m,g;if(f&&f!==u){const p=Math.floor(d/f),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let E=e.cache.get(x);E||(m=new l(a,p*f,i.count*f/h),E=new zu(m,f/h),e.cache.add(x,E)),g=new rr(E,c,d%f/h,A)}else a===null?m=new l(i.count*c):m=new l(a,d,i.count*c),g=new fe(m,c,A);if(i.sparse!==void 0){const p=Da.SCALAR,x=rs[i.sparse.indices.componentType],E=i.sparse.indices.byteOffset||0,_=i.sparse.values.byteOffset||0,T=new x(o[1],E,i.sparse.count*p),S=new l(o[2],_,i.sparse.count*c);a!==null&&(g=new fe(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let M=0,b=T.length;M<b;M++){const I=T[M];if(g.setX(I,S[M*c]),c>=2&&g.setY(I,S[M*c+1]),c>=3&&g.setZ(I,S[M*c+2]),c>=4&&g.setW(I,S[M*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=A}return g})}loadTexture(t){const e=this.json,n=this.options,s=e.textures[t].source,o=e.images[s];let a=this.textureLoader;if(o.uri){const c=n.manager.getHandler(o.uri);c!==null&&(a=c)}return this.loadTextureImage(t,s,a)}loadTextureImage(t,e,n){const i=this,s=this.json,o=s.textures[t],a=s.images[e],c=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(e,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=su[d.magFilter]||De,h.minFilter=su[d.minFilter]||mn,h.wrapS=ru[d.wrapS]||Ii,h.wrapT=ru[d.wrapT]||Ii,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==ze&&h.minFilter!==De,i.associations.set(h,{textures:t}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(t,e){const n=this,i=this.json,s=this.options;if(this.sourceCache[t]!==void 0)return this.sourceCache[t].then(u=>u.clone());const o=i.images[t],a=self.URL||self.webkitURL;let c=o.uri||"",l=!1;if(o.bufferView!==void 0)c=n.getDependency("bufferView",o.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:o.mimeType});return c=a.createObjectURL(d),c});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+t+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let A=d;e.isImageBitmapLoader===!0&&(A=function(m){const g=new xe(m);g.needsUpdate=!0,d(g)}),e.load(js.resolveURL(u,s.path),A,void 0,f)})}).then(function(u){return l===!0&&a.revokeObjectURL(c),On(u,o),u.userData.mimeType=o.mimeType||hv(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[t]=h,h}assignTexture(t,e,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Wt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Wt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const c=s.associations.get(o);o=s.extensions[Wt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,c)}}return i!==void 0&&(o.colorSpace=i),t[e]=o,o})}assignFinalMaterial(t){const e=t.geometry;let n=t.material;const i=e.attributes.tangent===void 0,s=e.attributes.color!==void 0,o=e.attributes.normal===void 0;if(t.isPoints){const a="PointsMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Kc,cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(a,c)),n=c}else if(t.isLine){const a="LineBasicMaterial:"+n.uuid;let c=this.cache.get(a);c||(c=new Xu,cn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(a,c)),n=c}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let c=this.cache.get(a);c||(c=n.clone(),s&&(c.vertexColors=!0),o&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(a,c),this.associations.set(c,this.associations.get(n))),n=c}t.material=n}getMaterialType(){return ln}loadMaterial(t){const e=this,n=this.json,i=this.extensions,s=n.materials[t];let o;const a={},c=s.extensions||{},l=[];if(c[Wt.KHR_MATERIALS_UNLIT]){const u=i[Wt.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),l.push(u.extendParams(a,s,e))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new yt(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Pe),a.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(e.assignTexture(a,"map",u.baseColorTexture,pe)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(e.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),l.push(e.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(t)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(t,a)})))}s.doubleSided===!0&&(a.side=Ke);const h=s.alphaMode||La.OPAQUE;if(h===La.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===La.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Hn&&(l.push(e.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new tt(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==Hn&&(l.push(e.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Hn){const u=s.emissiveFactor;a.emissive=new yt().setRGB(u[0],u[1],u[2],Pe)}return s.emissiveTexture!==void 0&&o!==Hn&&l.push(e.assignTexture(a,"emissiveMap",s.emissiveTexture,pe)),Promise.all(l).then(function(){const u=new o(a);return s.name&&(u.name=s.name),On(u,s),e.associations.set(u,{materials:t}),s.extensions&&pi(i,u,s),u})}createUniqueName(t){const e=ee.sanitizeNodeName(t||"");return e in this.nodeNamesUsed?e+"_"+ ++this.nodeNamesUsed[e]:(this.nodeNamesUsed[e]=0,e)}loadGeometries(t){const e=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Wt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,e).then(function(c){return ou(c,a,e)})}const o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a],h=lv(l),u=i[h];if(u)o.push(u.promise);else{let d;l.extensions&&l.extensions[Wt.KHR_DRACO_MESH_COMPRESSION]?d=s(l):d=ou(new Ae,l,e),i[h]={primitive:l,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(t){const e=this,n=this.json,i=this.extensions,s=n.meshes[t],o=s.primitives,a=[];for(let c=0,l=o.length;c<l;c++){const h=o[c].material===void 0?ov(this.cache):this.getDependency("material",o[c].material);a.push(h)}return a.push(e.loadGeometries(o)),Promise.all(a).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,A=h.length;f<A;f++){const m=h[f],g=o[f];let p;const x=l[f];if(g.mode===tn.TRIANGLES||g.mode===tn.TRIANGLE_STRIP||g.mode===tn.TRIANGLE_FAN||g.mode===void 0)p=s.isSkinnedMesh===!0?new Wu(m,x):new ue(m,x),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===tn.TRIANGLE_STRIP?p.geometry=tu(p.geometry,vu):g.mode===tn.TRIANGLE_FAN&&(p.geometry=tu(p.geometry,gc));else if(g.mode===tn.LINES)p=new c_(m,x);else if(g.mode===tn.LINE_STRIP)p=new Jc(m,x);else if(g.mode===tn.LINE_LOOP)p=new l_(m,x);else if(g.mode===tn.POINTS)p=new Yu(m,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&cv(p,s),p.name=e.createUniqueName(s.name||"mesh_"+t),On(p,s),g.extensions&&pi(i,p,g),e.assignFinalMaterial(p),u.push(p)}for(let f=0,A=u.length;f<A;f++)e.associations.set(u[f],{meshes:t,primitives:f});if(u.length===1)return s.extensions&&pi(i,u[0],s),u[0];const d=new Be;s.extensions&&pi(i,d,s),e.associations.set(d,{meshes:t});for(let f=0,A=u.length;f<A;f++)d.add(u[f]);return d})}loadCamera(t){let e;const n=this.json.cameras[t],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?e=new Oe(_o.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(e=new Ro(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(e.name=this.createUniqueName(n.name)),On(e,n),Promise.resolve(e)}loadSkin(t){const e=this.json.skins[t],n=[];for(let i=0,s=e.joints.length;i<s;i++)n.push(this._loadNodeShallow(e.joints[i]));return e.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",e.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],c=[];for(let l=0,h=o.length;l<h;l++){const u=o[l];if(u){a.push(u);const d=new Pt;s!==null&&d.fromArray(s.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',e.joints[l])}return new Yc(a,c)})}loadAnimation(t){const e=this.json,n=this,i=e.animations[t],s=i.name?i.name:"animation_"+t,o=[],a=[],c=[],l=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],A=i.samplers[f.sampler],m=f.target,g=m.node,p=i.parameters!==void 0?i.parameters[A.input]:A.input,x=i.parameters!==void 0?i.parameters[A.output]:A.output;m.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",x)),l.push(A),h.push(m))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],A=u[2],m=u[3],g=u[4],p=[];for(let x=0,E=d.length;x<E;x++){const _=d[x],T=f[x],S=A[x],M=m[x],b=g[x];if(_===void 0)continue;_.updateMatrix&&_.updateMatrix();const I=n._createAnimationTracks(_,T,S,M,b);if(I)for(let v=0;v<I.length;v++)p.push(I[v])}return new Ic(s,void 0,p)})}createNodeMesh(t){const e=this.json,n=this,i=e.nodes[t];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let c=0,l=i.weights.length;c<l;c++)a.morphTargetInfluences[c]=i.weights[c]}),o})}loadNode(t){const e=this.json,n=this,i=e.nodes[t],s=n._loadNodeShallow(t),o=[],a=i.children||[];for(let l=0,h=a.length;l<h;l++)o.push(n.getDependency("node",a[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,uv)});for(let f=0,A=u.length;f<A;f++)h.add(u[f]);return h})}_loadNodeShallow(t){const e=this.json,n=this.extensions,i=this;if(this.nodeCache[t]!==void 0)return this.nodeCache[t];const s=e.nodes[t],o=s.name?i.createUniqueName(s.name):"",a=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(t)});return c&&a.push(c),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(t)}).forEach(function(l){a.push(l)}),this.nodeCache[t]=Promise.all(a).then(function(l){let h;if(s.isBone===!0?h=new qu:l.length>1?h=new Be:l.length===1?h=l[0]:h=new de,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(s.name&&(h.userData.name=s.name,h.name=o),On(h,s),s.extensions&&pi(n,h,s),s.matrix!==void 0){const u=new Pt;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=t,h}),this.nodeCache[t]}loadScene(t){const e=this.extensions,n=this.json.scenes[t],i=this,s=new Be;n.name&&(s.name=i.createUniqueName(n.name)),On(s,n),n.extensions&&pi(e,s,n);const o=n.nodes||[],a=[];for(let c=0,l=o.length;c<l;c++)a.push(i.getDependency("node",o[c]));return Promise.all(a).then(function(c){for(let h=0,u=c.length;h<u;h++)s.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof cn||d instanceof xe)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=l(s),s})}_createAnimationTracks(t,e,n,i,s){const o=[],a=t.name?t.name:t.uuid,c=[];ni[s.path]===ni.weights?t.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(a);let l;switch(ni[s.path]){case ni.weights:l=ds;break;case ni.rotation:l=fs;break;case ni.position:case ni.scale:l=As;break;default:switch(n.itemSize){case 1:l=ds;break;case 2:case 3:default:l=As;break}break}const h=i.interpolation!==void 0?rv[i.interpolation]:ir,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const A=new l(c[d]+"."+ni[s.path],e.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(A),o.push(A)}return o}_getArrayFromAccessor(t){let e=t.array;if(t.normalized){const n=Dc(e.constructor),i=new Float32Array(e.length);for(let s=0,o=e.length;s<o;s++)i[s]=e[s]*n;e=i}return e}_createCubicSplineTrackInterpolant(t){t.createInterpolant=function(n){const i=this instanceof fs?sv:Td;return new i(this.times,this.values,this.getValueSize()/3,n)},t.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function fv(r,t,e){const n=t.attributes,i=new qe;if(n.POSITION!==void 0){const a=e.json.accessors[n.POSITION],c=a.min,l=a.max;if(c!==void 0&&l!==void 0){if(i.set(new B(c[0],c[1],c[2]),new B(l[0],l[1],l[2])),a.normalized){const h=Dc(rs[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=t.targets;if(s!==void 0){const a=new B,c=new B;for(let l=0,h=s.length;l<h;l++){const u=s[l];if(u.POSITION!==void 0){const d=e.json.accessors[u.POSITION],f=d.min,A=d.max;if(f!==void 0&&A!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(A[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(A[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(A[2]))),d.normalized){const m=Dc(rs[d.componentType]);c.multiplyScalar(m)}a.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new vn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function ou(r,t,e){const n=t.attributes,i=[];function s(o,a){return e.getDependency("accessor",o).then(function(c){r.setAttribute(a,c)})}for(const o in n){const a=Rc[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(t.indices!==void 0&&!r.index){const o=e.getDependency("accessor",t.indices).then(function(a){r.setIndex(a)});i.push(o)}return Xt.workingColorSpace!==Pe&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Xt.workingColorSpace}" not supported.`),On(r,t),fv(r,t,e),Promise.all(i).then(function(){return t.targets!==void 0?av(r,t.targets,e):r})}const Ua={url:"models/rifle/bolt_action_rifle.gltf",yaw:Math.PI/2,offset:[0,-.035,-.22]};function Fe(r,t,e,n,i,s=0){s&&r.rotateX(s),r.translate(e,n,i),r=r.index?r.toNonIndexed():r,r.deleteAttribute("uv");const o=new yt(t),a=new Float32Array(r.attributes.position.count*3);for(let c=0;c<a.length;c+=3)a[c]=o.r,a[c+1]=o.g,a[c+2]=o.b;return r.setAttribute("color",new fe(a,3)),r}function bd(){const i=Math.PI/2,s=[Fe(new ke(.048,.1,.32),7027228,0,-.035,.17),Fe(new ke(.05,.03,.06),1118740,0,-.03,.34),Fe(new ke(.04,.05,.12),4859922,0,-.005,0),Fe(new ke(.044,.045,.38),7027228,0,0,-.25),Fe(new ke(.036,.04,.2),2763822,0,.035,-.06),Fe(new we(.011,.013,.6,8),2763822,0,.035,-.5,i),Fe(new we(.016,.016,.03,8),1118740,0,.035,-.79,i),Fe(new we(.017,.017,.24,10),1118740,0,.088,-.07,i),Fe(new we(.026,.019,.07,10),1118740,0,.088,-.215,i),Fe(new we(.019,.022,.05,10),1118740,0,.088,.07,i),Fe(new ke(.012,.03,.02),2763822,0,.065,-.13),Fe(new ke(.012,.03,.02),2763822,0,.065,0),Fe(new we(.006,.006,.06,6).rotateZ(i*.9),2763822,.035,.04,.02),Fe(new fr(.012,6,6),2763822,.065,.035,.02),Fe(new el(.022,.004,4,8,Math.PI).rotateX(Math.PI).rotateY(i),2763822,0,-.03,-.01)],o=vs(s);return o.computeVertexNormals(),o}function Av(){const r=document.createElement("canvas");r.width=r.height=64;const t=r.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(255,250,220,1)"),e.addColorStop(.25,"rgba(255,200,90,0.9)"),e.addColorStop(1,"rgba(255,120,20,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),new Po(r)}const oo=5;class pv{constructor(t,e){this.sound=e,this.mesh=new ue(bd(),new ln({vertexColors:!0,roughness:.55,metalness:.25})),this.mesh.renderOrder=10,this.root=new Be,this.root.add(this.mesh),t.add(this.root),this.flash=new Vu(new Xc({map:Av(),blending:Oa,depthWrite:!1,transparent:!0})),this.flash.scale.setScalar(.22),this.flash.position.set(0,.035,-.86),this.flash.visible=!1,this.mesh.add(this.flash),this.ammo=oo,this.reserve=25,this.state="ready",this.timer=0,this.aimT=0,this.kick=0,this.bobT=0,this.flashT=0,this.reloadStep=0,this.hip=new B(.17,-.2,-.36),this._loadModel(),this.ads=new B(0,-.088,-.22)}_loadModel(){new dl().load(Ua.url,t=>{const e=t.scene;e.rotation.y=Ua.yaw,e.position.set(...Ua.offset),e.traverse(n=>{n.isMesh&&(n.renderOrder=10,/bullet/i.test(n.name)&&(n.visible=!1))}),this.bolt=e.getObjectByName("bolt_action_rifle_7_62_bolt_b"),this.bolt2=e.getObjectByName("bolt_action_rifle_7_62_bolt_a"),this.bolt&&(this.boltBase=this.bolt.position.x),this.mesh.geometry.dispose(),this.mesh.geometry=new Ae,this.flash.position.set(0,-.005,-.86),this.mesh.add(e)},void 0,()=>console.warn("rifle model failed, using procedural"))}canFire(){return this.state==="ready"&&this.ammo>0}fire(){return this.state==="reloading"&&this.ammo>0&&(this.state="ready"),this.canFire()?(this.ammo--,this.kick=1,this.flashT=.05,this.flash.material.rotation=Math.random()*Math.PI,this.state="cycling",this.timer=.95,this.sound.shot(0),setTimeout(()=>this.ammo>=0&&this.sound.bolt(),250),!0):(this.state==="ready"&&this.ammo===0&&(this.sound.dry(),this.reserve>0&&this.reload()),!1)}reload(){this.state!=="ready"||this.ammo>=oo||this.reserve<=0||(this.state="reloading",this.timer=.45,this.reloadStep=0)}update(t,e,n){this.timer-=t,this.state==="cycling"&&this.timer<=0&&(this.state="ready"),this.state==="reloading"&&this.timer<=0&&(this.ammo<oo&&this.reserve>0?(this.ammo++,this.reserve--,this.sound.reloadRound(0),this.timer=.42):(this.state="ready",this.sound.bolt()));const i=e&&this.state!=="reloading";this.aimT+=((i?1:0)-this.aimT)*Math.min(1,t*10),this.kick=Math.max(0,this.kick-t*5),this.flashT-=t,this.flash.visible=this.flashT>0,this.bobT+=t*(2+n*1.4);const s=Math.min(n,7)*.004*(1-this.aimT*.85),o=this.root.position.copy(this.hip).lerp(this.ads,this.aimT);o.x+=Math.cos(this.bobT)*s,o.y+=Math.abs(Math.sin(this.bobT))*s-this.kick*.015,o.z+=this.kick*.09;let a=this.kick*.18,c=0,l=0;if(this.state==="cycling"&&this.timer<.75){const h=Math.sin(Math.min(1,(.75-this.timer)/.6)*Math.PI);c=h*.25,a-=h*.05}if(this.state==="reloading"&&(c=.6,a=-.25,l=.2,o.y-=.05),this.bolt){let h=0;this.state==="cycling"&&this.timer<.75&&(h=Math.sin(Math.min(1,(.75-this.timer)/.6)*Math.PI)),this.state==="reloading"&&(h=1),this.bolt.position.x=this.boltBase-h*.09,this.bolt2&&(this.bolt2.position.x=this.bolt.position.x)}this.rot=this.rot||new B,this.rot.x+=(a-this.rot.x)*Math.min(1,t*14),this.rot.y+=(l-this.rot.y)*Math.min(1,t*10),this.rot.z+=(c-this.rot.z)*Math.min(1,t*10),this.root.rotation.set(this.rot.x,this.rot.y,this.rot.z),this.root.visible=this.aimT<.92}}const gv=new dl,Na=new Map,au=18;async function mv(r){if(Na.has(r))return Na.get(r);const t=CE[r],e=gv.loadAsync(t.url).then(n=>{const i=n.scene,s=new Be;s.add(i),s.rotation.y=t.yaw||0,s.updateMatrixWorld(!0);let o=new qe().setFromObject(s),a=o.getSize(new B);const c=t.length/Math.max(a.x,a.z);s.scale.setScalar(c),s.updateMatrixWorld(!0),o=new qe().setFromObject(s);const l=o.getCenter(new B);s.position.set(-l.x,-o.min.y,-l.z);const h=new Be;h.add(s),h.updateMatrixWorld(!0);const u=new Map,d=[];i.traverse(f=>{if(!f.isMesh||t.wheels.test(f.name)&&!/spare/i.test(f.name))return;const A=f.geometry.clone().applyMatrix4(f.matrixWorld);for(const g of Object.keys(A.attributes))["position","normal","uv"].includes(g)||A.deleteAttribute(g);A.attributes.uv||A.setAttribute("uv",new fe(new Float32Array(A.attributes.position.count*2),2));const m=f.material.uuid;u.has(m)||u.set(m,{mat:f.material,list:[]}),u.get(m).list.push(A.index?A.toNonIndexed():A),d.push(f)});for(const f of d)f.parent.remove(f);for(const{mat:f,list:A}of u.values()){const m=new ue(vs(A),f);h.add(m)}return h.traverse(f=>{if(!f.isMesh)return;f.castShadow=!0,f.receiveShadow=!0;const A=f.material;A&&/glass/i.test(A.name)?(A.transparent=!0,A.opacity=.55,A.roughness=.05,A.metalness=.8):A&&!A.userData.tuned&&(A.roughness=Math.min(A.roughness??1,.55),A.metalness=Math.max(A.metalness??0,.15),A.userData.tuned=!0)}),{root:h,cfg:t,size:new qe().setFromObject(h).getSize(new B)}});return Na.set(r,e),e}class fl{static async create(t,e,n,i,s,o){const a=await mv(t);return new fl(a,e,n,i,s,o)}constructor(t,e,n,i,s,o){Object.assign(this,{world:e,ground:n,cfg:t.cfg}),this.root=t.root.clone(!0),this.size=t.size,this.pos=new B(i,n.sample(i,s),s),this.heading=o,this.speed=0,this.vy=0,this.pitch=0,this.roll=0,this.steer=0,this.airborne=!1,this.driver=null,this.rpm=0,this.throttle=0,this.root.updateMatrixWorld(!0);const a=[];this.root.traverse(l=>{l.isMesh&&this.cfg.wheels.test(l.name)&&!/spare/i.test(l.name)&&a.push(l)}),this.wheels=a.map(l=>{const h=new qe().setFromObject(l),u=h.getCenter(new B),d=new Be;d.position.copy(u),this.root.add(d);const f=new Be;return d.add(f),f.updateMatrixWorld(!0),f.attach(l),{steerPivot:d,spin:f,front:u.z>0,base:u.clone(),radius:Math.max(.25,(h.max.y-h.min.y)/2)}});const c=this.wheels.map(l=>l.base.z);this.wheelbase=c.length?Math.max(2,Math.max(...c)-Math.min(...c)):this.size.z*.6,this.track=Math.max(1.4,this.size.x*.82),this.frontZ=this.wheelbase/2,this.radius=this.wheels[0]?.radius||.4,this._place()}get forward(){return new B(Math.sin(this.heading),0,Math.cos(this.heading))}update(t,e){const n=this.cfg,i=e||{throttle:0,steer:0,handbrake:!1};this.throttle=i.throttle;const s=this.forward,o=this.ground.sample(this.pos.x,this.pos.z)<lr-.4,a=gs(this.pos.x,this.pos.z)<hr+.8,c=n.maxSpeed*(o?.3:a?1:.85),l=.6/(1+Math.abs(this.speed)*.07);if(this.steer+=(i.steer*l-this.steer)*Math.min(1,t*5),!this.airborne){if(i.throttle>.05)this.speed<-.5?this.speed+=16*i.throttle*t:this.speed+=n.accel*i.throttle*Math.max(0,1-this.speed/c)*t;else if(i.throttle<-.05)this.speed>.5?this.speed+=16*i.throttle*t:this.speed+=n.accel*.7*i.throttle*Math.max(0,1+this.speed/(n.maxSpeed*.3))*t;else{const b=(o?4:1.2)*t;this.speed=Math.abs(this.speed)<b?0:this.speed-Math.sign(this.speed)*b}i.handbrake&&(this.speed*=Math.max(0,1-t*2.5)),this.speed-=this.speed*(o?1.2:.05)*t,this.speed-=au*.55*Math.sin(this.pitch)*t;const M=this.speed*Math.tan(this.steer)/this.wheelbase*(i.handbrake?1.5:1);this.heading-=M*t}const h=this.pos.clone();this.pos.x+=s.x*this.speed*t,this.pos.z+=s.z*this.speed*t;const u=this.track/2+.15,d=[];for(const M of[1,-1]){const b={x:this.pos.x+s.x*this.frontZ*M,z:this.pos.z+s.z*this.frontZ*M},I={...b};this.world.collide(b,u),(b.x!==I.x||b.z!==I.z)&&d.push([b.x-I.x,b.z-I.z])}if(d.length){for(const[b,I]of d)this.pos.x+=b,this.pos.z+=I;const M=Math.abs(this.speed);this.speed*=-.25,this.onCrash?.(M)}const f=new B(-s.z,0,s.x),A=[];for(const[M,b]of[[1,-1],[1,1],[-1,-1],[-1,1]]){const I=this.pos.x+s.x*this.frontZ*M+f.x*b*this.track/2,v=this.pos.z+s.z*this.frontZ*M+f.z*b*this.track/2;A.push(this.ground.sample(I,v))}const m=(A[0]+A[1])/2,g=(A[2]+A[3])/2,p=(A[0]+A[2])/2,x=(A[1]+A[3])/2,E=(m+g)/2,_=Math.atan2(m-g,this.wheelbase),T=Math.atan2(p-x,this.track),S=this.pos.y+this.vy*t;S>E+.12?(this.airborne=!0,this.vy-=au*t,this.pos.y=S,this.pitch+=(_*.3-this.pitch)*Math.min(1,t*1.5)):(this.airborne&&this.vy<-6&&this.onLand?.(-this.vy),this.airborne=!1,this.vy=Math.min(8,Math.max(-8,(E-h.y)/Math.max(t,.001))),this.pos.y=E,this.pitch+=(_-this.pitch)*Math.min(1,t*10),this.roll+=(T-this.roll)*Math.min(1,t*10)),this.wheels.forEach(M=>{M.spin.rotation.x+=this.speed/M.radius*t,M.front&&(M.steerPivot.rotation.y=this.steer*-1);const b=M.front?1:-1,I=M.base.x>0,v=(M.front?0:2)+(I?0:1),D=E+Math.sin(_)*this.frontZ*b+Math.sin(T)*(I?1:-1)*this.track/2,Q=this.airborne?-.12:Math.max(-.15,Math.min(.15,A[v]-D));M.steerPivot.position.y+=(M.base.y+Q-M.steerPivot.position.y)*Math.min(1,t*15)}),this.rpm+=(Math.abs(this.speed)/n.maxSpeed*.8+Math.abs(i.throttle)*.25-this.rpm)*Math.min(1,t*4),this._place()}applyRemote(t,e){const[n,i,s,o,a,c,l,h]=e,u=Math.min(1,t*10);this.pos.x+=(n-this.pos.x)*u,this.pos.y+=(i-this.pos.y)*u,this.pos.z+=(s-this.pos.z)*u;let d=o-this.heading;d=Math.atan2(Math.sin(d),Math.cos(d)),this.heading+=d*u,this.pitch+=(a-this.pitch)*u,this.roll+=(c-this.roll)*u,this.speed=l,this.steer=h;for(const f of this.wheels)f.spin.rotation.x+=l/f.radius*t,f.front&&(f.steerPivot.rotation.y=-h);this.rpm+=(Math.abs(l)/this.cfg.maxSpeed*.8-this.rpm)*Math.min(1,t*4),this._place()}netState(){const t=e=>Math.round(e*100)/100;return[t(this.pos.x),t(this.pos.y),t(this.pos.z),t(this.heading),t(this.pitch),t(this.roll),t(this.speed),t(this.steer)]}_place(){this.root.position.copy(this.pos),this.root.rotation.set(0,0,0),this.root.rotateY(this.heading),this.root.rotateX(-this.pitch),this.root.rotateZ(this.roll)}seatWorld(t=new B){return t.copy(this.cfg.seat).applyMatrix4(this.root.matrixWorld)}exitPoint(){const t=this.forward,e=new B(t.z,0,-t.x);for(const n of[1,-1]){const i={x:this.pos.x+e.x*n*(this.track/2+1.2),z:this.pos.z+e.z*n*(this.track/2+1.2)},s={...i};if(this.world.collide(i,.4),Math.hypot(i.x-s.x,i.z-s.z)<.3)return i}return{x:this.pos.x+t.x*(this.size.z/2+1.5),z:this.pos.z+t.z*(this.size.z/2+1.5)}}}class _v{constructor(t){this.camera=t,this.pos=new B,this.yawOff=0,this.pitchOff=.12,this.firstPerson=!1,this.idle=0,this._look=new B}reset(t){this.pos.copy(t.pos).addScaledVector(t.forward,-8).add(new B(0,3,0)),this.yawOff=0}update(t,e,n){const i=this.camera;if(n.x||n.y?(this.idle=0,this.yawOff-=n.x*.004,this.pitchOff=Math.max(-.3,Math.min(.9,this.pitchOff+n.y*.003))):(this.idle+=t,this.idle>1.5&&!this.firstPerson&&(this.yawOff*=Math.max(0,1-t*2))),this.firstPerson){e.root.updateMatrixWorld(!0),e.seatWorld(i.position),i.rotation.set(0,0,0,"YXZ"),i.rotation.y=e.heading+Math.PI+this.yawOff,i.rotation.x=-e.pitch-(this.pitchOff-.12)*.8,i.rotation.z=-e.roll*.5;return}const s=e.heading+this.yawOff,o=6.8+Math.min(2.5,Math.abs(e.speed)*.05),a=new B(e.pos.x-Math.sin(s)*o*Math.cos(this.pitchOff),e.pos.y+1.6+Math.sin(this.pitchOff)*o,e.pos.z-Math.cos(s)*o*Math.cos(this.pitchOff)),c=e.ground.sample(a.x,a.z)+.8;a.y<c&&(a.y=c),this.pos.lerp(a,1-Math.exp(-t*7)),i.position.copy(this.pos),this._look.copy(e.pos).add(new B(0,1.3,0)),i.lookAt(this._look)}}function Qs({bh:r,bl:t,br:e,hy:n,hz:i,hr:s}){return[{part:"head",x:0,y:n,z:i,r:s,dmg:999},{part:"neck",x:0,y:(n+r)/2+e*.15,z:(i+t*.8)/2,r:s*.9,dmg:120},{part:"vitals",x:0,y:r,z:t*.45,r:e*.58,dmg:150},{part:"body",x:0,y:r,z:t*.4,r:e,dmg:55},{part:"body",x:0,y:r,z:-t*.5,r:e,dmg:55},{part:"legs",x:0,y:r*.42,z:0,r:r*.38,dmg:25}]}const Ve={deer:{name:"Олень",hp:100,walk:1.5,run:10.5,turn:2.6,radius:.55,hearing:170,sight:30,score:100,herd:[2,5],count:16,hitboxes:Qs({bh:.95,bl:.7,br:.38,hy:1.5,hz:.75,hr:.2})},stag:{name:"Благородный олень",hp:150,walk:1.5,run:10,turn:2.4,radius:.65,hearing:180,sight:32,score:220,herd:[1,1],count:4,hitboxes:Qs({bh:1.12,bl:.8,br:.45,hy:1.75,hz:.88,hr:.24})},boar:{name:"Кабан",hp:170,walk:1.2,run:7.5,turn:3,radius:.5,hearing:130,sight:22,score:150,herd:[2,4],count:9,aggressive:"wounded",damage:22,attackRange:1.7,attackCd:1.3,hitboxes:Qs({bh:.5,bl:.5,br:.32,hy:.5,hz:.68,hr:.18})},hare:{name:"Заяц",hp:25,walk:1.2,run:12,turn:5,radius:.2,hearing:120,sight:16,score:40,herd:[1,1],count:9,zigzag:!0,hop:!0,hitboxes:[{part:"head",x:0,y:.32,z:.2,r:.08,dmg:999},{part:"body",x:0,y:.2,z:-.02,r:.16,dmg:60}]},fox:{name:"Лиса",hp:40,walk:1.3,run:9.5,turn:4,radius:.3,hearing:140,sight:20,score:70,herd:[1,1],count:4,hitboxes:Qs({bh:.38,bl:.35,br:.17,hy:.48,hz:.45,hr:.11})},wolf:{name:"Волк",hp:95,walk:1.6,run:10.5,turn:3.4,radius:.45,hearing:200,sight:50,score:180,herd:[3,4],count:7,aggressive:"predator",damage:8,attackRange:1.9,attackCd:1.5,hitboxes:Qs({bh:.66,bl:.55,br:.27,hy:.85,hz:.72,hr:.16})}},Zs=Math.PI*2,Fa=r=>((r+Math.PI)%Zs+Zs)%Zs-Math.PI;function $r(r,t){return Math.abs(r)>rn-4||Math.abs(t)>rn-4||Md(r,t)?!0:ms(r,t)>.95}class Ev{constructor(t,e=99){this.world=t,this.rnd=Cn(e),this.animals=[],this.nextId=1,this.nextGroup=1,this.events=[],this.respawnT=0}spawn(t,e,n,i=this.rnd()*Zs,s=0){const o=Ve[t],a={id:this.nextId++,type:t,x:e,z:n,y:We(e,n),heading:i,group:s,state:"idle",anim:"idle",timer:1+this.rnd()*3,hp:o.hp,speed:0,tx:e,tz:n,fx:0,fz:0,deadTime:0,avoid:0,avoidT:0,target:null,attackT:0,wounded:!1,lod:0};return this.animals.push(a),a}spawnGroup(t,e,n){const i=Ve[t],s=i.herd[0]+Math.floor(this.rnd()*(i.herd[1]-i.herd[0]+1)),o=this.nextGroup++,a=this.rnd()*Zs;let c=0;for(let l=0;l<s*4&&c<s;l++){const h=e+(this.rnd()-.5)*14,u=n+(this.rnd()-.5)*14;$r(h,u)||(this.spawn(t,h,u,a+(this.rnd()-.5),o),c++)}return c}findSpawnPoint(t,e=140){for(let n=0;n<40;n++){const i=(this.rnd()*2-1)*(rn-30),s=(this.rnd()*2-1)*(rn-30);if(!$r(i,s)&&!t.some(o=>Math.hypot(o.x-i,o.z-s)<e))return[i,s]}return null}populate(t=[]){for(const[e,n]of Object.entries(Ve)){let i=0;for(;i<n.count;){const s=this.findSpawnPoint(t,e==="wolf"?160:60);if(!s)break;const o=this.spawnGroup(e,s[0],s[1]);o&&(i+=o)}}}remove(t){const e=this.animals.indexOf(t);e>=0&&this.animals.splice(e,1)}noise(t,e,n=1){for(const i of this.animals){if(i.state==="dead"||i.state==="chase"||i.state==="attack")continue;Math.hypot(i.x-t,i.z-e)<Ve[i.type].hearing*n&&this._flee(i,t,e,7+this.rnd()*6)}}_flee(t,e,n,i){if(t.state!=="flee"&&this.events.push({type:"flee",id:t.id}),t.state="flee",t.anim="run",t.fx=e,t.fz=n,t.timer=Math.max(t.timer,i),t.group)for(const s of this.animals)s.group===t.group&&s!==t&&s.state!=="dead"&&s.state!=="flee"&&s.state!=="chase"&&(s.state="flee",s.anim="run",s.fx=e,s.fz=n,s.timer=i)}_chase(t,e){t.state="chase",t.anim="run",t.target=e.id,t.timer=25}_pickWanderTarget(t){let e=0,n=0,i=0;if(t.group)for(const s of this.animals)s.group===t.group&&s.state!=="dead"&&(e+=s.x,n+=s.z,i++);for(let s=0;s<8;s++){const o=t.heading+(this.rnd()-.5)*2.4,a=6+this.rnd()*20;let c=t.x+Math.sin(o)*a,l=t.z+Math.cos(o)*a;if(i>1&&(c=c*.6+e/i*.4,l=l*.6+n/i*.4),!$r(c,l))return t.tx=c,t.tz=l,!0}return!1}update(t,e=[]){for(const n of this.animals){let i=1/0;for(const o of e)i=Math.min(i,Math.hypot(o.x-n.x,o.z-n.z));n.lod+=t;const s=i<200?0:i<320?.1:.3;n.lod<s||(this._updateOne(n,n.lod,e),n.lod=0)}if(this.respawnT+=t,this.respawnT>5){this.respawnT=0;for(const n of[...this.animals])n.state==="dead"&&n.deadTime>90&&this.remove(n);for(const[n,i]of Object.entries(Ve))if(this.animals.filter(o=>o.type===n&&o.state!=="dead").length<=i.count-i.herd[1]){const o=this.findSpawnPoint(e,180);o&&this.spawnGroup(n,o[0],o[1])}}}_updateOne(t,e,n){const i=Ve[t.type];if(t.state==="dead"){t.deadTime+=e;return}if(t.attackT-=e,t.state!=="flee"&&t.state!=="chase"&&t.state!=="attack")for(const l of n){if(l.alive===!1)continue;const h=Math.hypot(l.x-t.x,l.z-t.z);if(i.aggressive==="predator"&&!l.inVehicle&&t.hp>i.hp*.4){if(h<i.sight*(l.speed>4.5?1:.7)){for(const f of this.animals)f.group===t.group&&f.state!=="dead"&&this._chase(f,l);break}continue}const u=l.inVehicle?l.speed>2?1.6:.6:1,d=(l.speed>4.5?i.sight:l.speed>.5?i.sight*.5:i.sight*.25)*u;if(h<d){this._flee(t,l.x,l.z,6+this.rnd()*4);break}}t.timer-=e;let s=t.heading,o=0;switch(t.state){case"idle":case"graze":t.timer<=0&&(this.rnd()<.55&&this._pickWanderTarget(t)?(t.state="walk",t.anim="walk",t.timer=25):t.state==="idle"?(t.state="graze",t.anim="eat",t.timer=4+this.rnd()*8):(t.state="idle",t.anim="idle",t.timer=2+this.rnd()*4));break;case"walk":{const l=t.tx-t.x,h=t.tz-t.z;if(l*l+h*h<2||t.timer<=0){t.state="graze",t.anim="eat",t.timer=4+this.rnd()*8;break}s=Math.atan2(l,h),o=i.walk;break}case"flee":{if(t.timer<=0){t.state="walk",t.anim="walk",this._pickWanderTarget(t),t.timer=15;break}s=Math.atan2(t.x-t.fx,t.z-t.fz),i.zigzag&&(s+=Math.sin(t.timer*5+t.id)*.7),o=i.run;break}case"chase":case"attack":{const l=n.find(f=>f.id===t.target);if(!l||l.alive===!1||l.inVehicle||t.timer<=0||t.hp<i.hp*.4){t.hp<i.hp*.4&&l?this._flee(t,l.x,l.z,20):(t.state="walk",t.anim="walk",this._pickWanderTarget(t),t.timer=10),t.target=null;break}const h=l.x-t.x,u=l.z-t.z,d=Math.hypot(h,u);s=Math.atan2(h,u),d<i.attackRange?(t.state="attack",t.anim="attack",o=0,t.attackT<=0&&(t.attackT=i.attackCd,this.events.push({type:"attack",id:t.id,species:t.type,target:l.id,dmg:i.damage}))):(t.state="chase",t.anim="run",t.type==="wolf"&&d>6&&(s+=(t.id%3-1)*.5),o=d>4?i.run:i.walk*2);break}}if(o>0){if(t.avoidT-=e,t.avoidT<=0){t.avoidT=.25;const l=o>3?7:3;t.avoid=null;for(const h of[0,.5,-.5,1,-1,1.6,-1.6,2.4,-2.4,Math.PI]){const u=s+h;if(!$r(t.x+Math.sin(u)*l,t.z+Math.cos(u)*l)){t.avoid=h;break}}}t.avoid===null?t.state==="walk"&&(t.state="idle",t.anim="idle",t.timer=1,o=0):s+=t.avoid}const a=Fa(s-t.heading),c=i.turn*(o>3?1.6:1)*e;if(t.heading=Fa(t.heading+Math.max(-c,Math.min(c,a))),t.speed+=(o-t.speed)*Math.min(1,e*(o>t.speed?2.5:4)),t.speed>.01){const l=t.x+Math.sin(t.heading)*t.speed*e,h=t.z+Math.cos(t.heading)*t.speed*e;if(Md(l,h))t.heading=Fa(t.heading+Math.PI*.5);else{const u={x:l,z:h};this.world.collide(u,i.radius),t.x=u.x,t.z=u.z}}t.y=We(t.x,t.z)}shoot(t,e,n,i,s,o,a,c){const l=this.world.raycastStatic(t,e,n,i,s,o,a);let h=null;for(const A of this.animals){if(A.state==="dead")continue;const m=A.x-t,g=A.z-n;if(m*m+g*g>(a+3)**2)continue;const p=Ve[A.type],x=Math.cos(A.heading),E=Math.sin(A.heading),_=[];let T=1/0;for(const M of p.hitboxes){const b=A.x+M.x*x+M.z*E,I=A.z-M.x*E+M.z*x,v=Sd(t,e,n,i,s,o,b,A.y+M.y,I,M.r);v<l&&(_.push({hb:M,t:v}),T=Math.min(T,v))}if(!_.length||h&&T>=h.dist)continue;let S=null;for(const M of _)M.t<T+.6&&(!S||M.hb.dmg>S.hb.dmg)&&(S=M);h={animal:A,part:S.hb.part,dmg:S.hb.dmg,dist:T}}if(!h)return{wallDist:l};const u=h.animal,d=Ve[u.type];u.hp-=h.dmg;const f=u.hp<=0;if(f){u.state="dead",u.anim="death",u.speed=0,u.deadTime=0;const A=Math.round(d.score*(h.part==="head"?1.5:h.part==="vitals"?1.25:1));if(this.events.push({type:"kill",id:u.id,species:u.type,part:h.part,by:c,score:A,dist:h.dist}),h.score=A,u.group)for(const m of this.animals)m.group===u.group&&m!==u&&m.state!=="dead"&&(d.aggressive!=="predator"||this.rnd()<.7)&&(m.state="idle",m.target=null,this._flee(m,t,n,14))}else this.events.push({type:"hit",id:u.id,part:h.part,by:c}),d.aggressive==="wounded"||d.aggressive==="predator"&&u.hp>d.hp*.4?(u.state!=="chase"&&u.state!=="attack"&&this._chase(u,{id:c}),u.timer=20):this._flee(u,t,n,15);return h.killed=f,h.wallDist=l,h}}function xv(r){const t=new Map,e=new Map,n=r.clone();return Rd(r,n,function(i,s){t.set(s,i),e.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=t.get(i),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(c){return e.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Rd(r,t,e){e(r,t);for(let n=0;n<r.children.length;n++)Rd(r.children[n],t.children[n],e)}const vv=new dl,Qa=new Map;function yv(r){const t=new Map;r.traverse(e=>{e.isSkinnedMesh&&!e.material.map&&(t.has(e.skeleton)||t.set(e.skeleton,[]),t.get(e.skeleton).push(e))});for(const[e,n]of t){if(n.length<2)continue;const i=n.map(l=>{const h=l.geometry.clone();for(const f of Object.keys(h.attributes))["position","normal","skinIndex","skinWeight"].includes(f)||h.deleteAttribute(f);const u=l.material.color,d=new Float32Array(h.attributes.position.count*3);for(let f=0;f<d.length;f+=3)d[f]=u.r,d[f+1]=u.g,d[f+2]=u.b;return h.setAttribute("color",new fe(d,3)),h.morphAttributes={},h.index,h}),s=i.every(l=>l.index),o=vs(s?i:i.map(l=>l.index?l.toNonIndexed():l));if(!o)continue;const a=n[0],c=new Wu(o,new ln({vertexColors:!0,roughness:.85,metalness:0}));c.name=a.name,c.position.copy(a.position),c.quaternion.copy(a.quaternion),c.scale.copy(a.scale),a.parent.add(c),c.bind(e,a.bindMatrix);for(const l of n)l.parent.remove(l)}r.traverse(e=>{if(!e.isMesh||!Array.isArray(e.material)||e.material.some(a=>a.map))return;const n=e.geometry,i=n.attributes.position.count,s=new Float32Array(i*3),o=n.index;for(const a of n.groups){const c=e.material[a.materialIndex].color;for(let l=a.start;l<a.start+a.count;l++){const h=o?o.getX(l):l;s[h*3]=c.r,s[h*3+1]=c.g,s[h*3+2]=c.b}}n.setAttribute("color",new fe(s,3)),n.clearGroups(),e.material=new ln({vertexColors:!0,roughness:.85,metalness:0})})}function Iv(r,t){r.traverse(e=>{if(!e.isMesh)return;const n=e.material.clone();n.roughness=.9,n.onBeforeCompile=i=>{i.uniforms.uTint={value:t},i.fragmentShader=i.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 uTint;`).replace("#include <map_fragment>",`#include <map_fragment>
float lumT = dot(diffuseColor.rgb, vec3(0.3, 0.59, 0.11));
diffuseColor.rgb = uTint * (0.55 + lumT * 1.4);`)},e.material=n})}function Cv(r,t){for(const e of t){const n=r.find(s=>s.name===e);if(n)return n;const i=r.find(s=>s.name.endsWith("|"+e));if(i)return i}return null}async function Mo(r){if(Qa.has(r))return Qa.get(r);const t=al[r],e=vv.loadAsync(t.url).then(n=>{const i=n.scene;i.traverse(l=>{if(l.isMesh)for(const h of[].concat(l.material))h.metalnessMap||(h.metalness=0,h.roughness=Math.max(h.roughness??1,.6))}),t.flatten&&yv(i),t.tint&&Iv(i,new yt(t.tint)),i.updateMatrixWorld(!0);const s=new qe().setFromObject(i,!0),o=s.getSize(new B),a=t.height/o.y,c={};for(const[l,h]of Object.entries(t.anims||{}))c[l]=Cv(n.animations,h);return{scene:i,scale:a,minY:s.min.y,clips:c,cfg:t,size:o}});return Qa.set(r,e),e}class Dd{constructor(t,e){this.asset=t;const n=xv(t.scene);n.scale.setScalar(t.scale),n.position.y=-t.minY*t.scale,n.rotation.y=t.cfg.yaw||0,n.traverse(i=>{i.isMesh&&(i.castShadow=e,i.frustumCulled=!1)}),this.root=new Be,this.root.add(n),this.mixer=new vE(n),this.actions={},this.current=null}play(t,e=.3){if(this.currentName===t)return;const n=this.asset.clips[t]||this.asset.clips.idle;if(!n)return;let i=this.actions[t];i||(i=this.actions[t]=this.mixer.clipAction(n),t==="death"&&(i.setLoop(xu,1),i.clampWhenFinished=!0)),i.reset().play(),this.current&&this.current.crossFadeTo(i,e,!1),this.current=i,this.currentName=t}update(t){this.mixer.update(t)}}class Mv{constructor(t,e,n){Object.assign(this,{scene:t,ground:e,preset:n}),this.views=new Map,this.debug=!1,this._frustum=new bo,this._m=new Pt,this._sphere=new vn}async preload(t){await Promise.all(t.map(e=>Mo(e)))}_create(t){const e={id:t.id,type:t.type,x:t.x,z:t.z,heading:t.heading,model:null,hit:null};this.views.set(t.id,e);const n=al[t.type]?t.type:"deer";return Mo(n).then(i=>{this.views.has(t.id)&&(e.model=new Dd(i,this.preset.shadows),this.scene.add(e.model.root),e.model.play(t.anim),e.model.mixer.setTime(Math.random()*3))}),e}_hitDebug(t){const e=new Be,n=new Hn({color:16724016,wireframe:!0});for(const i of Ve[t.type].hitboxes){const s=new ue(new fr(i.r,8,6),n);s.position.set(i.x,i.y,i.z),e.add(s)}return e}_hop(t,e,n){const i=t.model.root.children[0];if(t.hopT=(t.hopT||0)+n*(e.speed>.3?2+e.speed*.45:0),e.state==="dead"){t.deadRoll=Math.min(Math.PI/2,(t.deadRoll||0)+n*6),t.model.root.rotateZ(t.deadRoll);return}const s=t.hopT*Math.PI,o=Math.min(.35,e.speed*.04),a=-t.model.asset.minY*t.model.asset.scale;i.position.y=a+Math.abs(Math.sin(s))*o,i.rotation.x=Math.cos(s)*o*.9,e.speed<.3&&(i.rotation.x=Math.sin(performance.now()*.003+e.id)*.04)}sync(t,e,n){const i=new Set;n.updateMatrixWorld(),this._frustum.setFromProjectionMatrix(this._m.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse));const s=n.position,o=this.preset.viewDist*this.preset.viewDist;for(const a of t){i.add(a.id);const c=this.views.get(a.id)||this._create(a),l=Math.min(1,e*12);c.x+=(a.x-c.x)*l,c.z+=(a.z-c.z)*l;let h=a.heading-c.heading;if(h=Math.atan2(Math.sin(h),Math.cos(h)),c.heading+=h*l,!c.model)continue;const u=c.model.root,d=this.ground.sample(c.x,c.z);u.position.set(c.x,d,c.z),u.rotation.y=c.heading;const f=(c.x-s.x)**2+(c.z-s.z)**2;if(this._sphere.center.set(c.x,d+1,c.z),this._sphere.radius=2,u.visible=f<o&&this._frustum.intersectsSphere(this._sphere),c.model.play(a.anim),c.model.asset.cfg.hop&&this._hop(c,a,e),c.model.current){const m=Ve[a.type];a.anim==="walk"?c.model.current.timeScale=Math.max(.4,a.speed/m.walk):a.anim==="run"?c.model.current.timeScale=Math.max(.5,a.speed/(m.run*.85)):c.model.current.timeScale=1}c.acc=(c.acc||0)+e;const A=u.visible?f>6400?1/20:0:.5;c.acc>=A&&(c.model.update(c.acc),c.acc=0),this.debug&&!c.hit&&(c.hit=this._hitDebug(c),u.add(c.hit)),c.hit&&(c.hit.visible=this.debug)}for(const[a,c]of this.views)i.has(a)||(c.model&&this.scene.remove(c.model.root),this.views.delete(a))}}const Nn=r=>document.querySelector(r);class Sv{constructor(){this.el=Nn("#hud"),this.ammo=Nn("#ammo"),this.score=Nn("#score"),this.fps=Nn("#fps"),this.msg=Nn("#messages"),this.scope=Nn("#scope"),this.cross=Nn("#crosshair"),this.hitmark=Nn("#hitmark"),this.compass=Nn("#compass-strip"),this.frames=0,this.acc=0,this._buildCompass()}_buildCompass(){const t=["С","","СВ","","В","","ЮВ","","Ю","","ЮЗ","","З","","СЗ",""];let e="";for(let n=0;n<3;n++)for(let i=0;i<16;i++)e+=`<span class="${t[i]?"major":""}">${t[i]||"·"}</span>`;this.compass.innerHTML=e}show(t){this.el.classList.toggle("hidden",!t)}update(t,{gun:e,yaw:n,score:i,kills:s,showFps:o}){const a="▮".repeat(e.ammo)+"▯".repeat(oo-e.ammo),c=e.state==="reloading"?" <small>перезарядка…</small>":"";this.ammo.innerHTML=`<b>${a}</b> <span>${e.reserve}</span>${c}`,this.score.innerHTML=`Добыча: <b>${s}</b> · Очки: <b>${i}</b>`,this.scope.classList.toggle("on",e.aimT>.92),this.cross.style.opacity=e.aimT>.5?0:1;let l=-n*180/Math.PI%360;l<0&&(l+=360);const h=40;this.compass.style.transform=`translateX(${-(16*h+l/22.5*h)+this.compass.parentElement.clientWidth/2-h/2}px)`,this.frames++,this.acc+=t,this.acc>.5&&(this.fps.textContent=o?`${Math.round(this.frames/this.acc)} fps`:"",this.frames=0,this.acc=0)}message(t,e=""){const n=document.createElement("div");n.className="msg "+e,n.innerHTML=t,this.msg.appendChild(n),setTimeout(()=>n.classList.add("out"),2600),setTimeout(()=>n.remove(),3200)}hitMarker(t){this.hitmark.className=t?"kill":"hit",this.hitmark.offsetWidth,this.hitmark.classList.add("show")}}const Ld="https://hunter-father.nekrasovl101.workers.dev".replace(/\/$/,"");async function Pd(r,t){const e=await fetch(Ld+r,t);if(!e.ok)throw new Error(`HTTP ${e.status}`);return e.json()}const wv=()=>Pd("/api/rooms",{method:"POST"}),Bv=()=>Pd("/api/leaderboard"),Tv={4001:"Комната заполнена (максимум 8 охотников)",4004:"Комната не найдена",4008:"Соединение потеряно (тайм-аут)"};class bv{constructor(){this.ws=null,this.id=0,this.handlers={},this.rtt=120,this.connected=!1}on(t,e){return this.handlers[t]=e,this}connect(t,e){return this.code=t,new Promise((n,i)=>{const s=Ld.replace(/^http/,"ws")+"/ws/"+encodeURIComponent(t),o=this.ws=new WebSocket(s);let a=!1;o.onopen=()=>o.send(JSON.stringify({t:"hello",nick:e})),o.onmessage=c=>{let l;try{l=JSON.parse(c.data)}catch{return}l.t==="welcome"&&(a=!0,this.connected=!0,this.id=l.id,this.code=l.code,this._pinger=setInterval(()=>this.send({t:"ping",c:performance.now()}),2e3),n(l)),l.t==="pong"&&(this.rtt=this.rtt*.7+(performance.now()-l.c)*.3),this.handlers[l.t]?.(l)},o.onclose=c=>{clearInterval(this._pinger),this.connected=!1;const l=Tv[c.code]||c.reason||"Нет связи с сервером";a?this.handlers.close?.(l):i(new Error(l))},o.onerror=()=>{a||i(new Error("Сервер недоступен. Запущен ли он (npm run dev в папке server)?"))}})}send(t){this.ws?.readyState===1&&this.ws.send(JSON.stringify(t))}close(){try{this.ws?.close()}catch{}}}function Rv(r){const t=document.createElement("canvas");t.width=256,t.height=64;const e=t.getContext("2d");e.font="bold 30px -apple-system, Segoe UI, Roboto, sans-serif";const n=Math.min(248,e.measureText(r).width+24);e.fillStyle="rgba(15,18,12,0.65)",e.beginPath(),e.roundRect((256-n)/2,10,n,44,12),e.fill(),e.fillStyle="#f0e6cc",e.textAlign="center",e.textBaseline="middle",e.fillText(r,128,33);const i=new Po(t);i.colorSpace=pe;const s=new Vu(new Xc({map:i,depthWrite:!1,transparent:!0}));return s.scale.set(1.6,.4,1),s.renderOrder=20,s}class Dv{constructor(t,e,n){Object.assign(this,{scene:t,ground:e,preset:n}),this.list=new Map,this.rifleGeo=bd(),this.rifleMat=new ln({vertexColors:!0,roughness:.6,metalness:.2}),Mo("hunter")}add(t,e){if(this.list.has(t)){this.list.get(t).nick=e;return}const n={id:t,nick:e,x:0,y:0,z:0,yaw:0,model:null,label:Rv(e),target:null,flashT:0};this.list.set(t,n),Mo("hunter").then(i=>{if(!this.list.has(t))return;n.model=new Dd(i,this.preset.shadows),n.model.play("idle");const s=al.hunter.rifle,o=n.model.root.getObjectByName(s.bone);if(o){n.model.root.updateMatrixWorld(!0);const a=o.getWorldScale(new B),c=new ue(this.rifleGeo,this.rifleMat);c.scale.set(1/a.x,1/a.y,1/a.z),c.position.set(s.pos[0]/a.x,s.pos[1]/a.y,s.pos[2]/a.z),c.rotation.set(...s.rot),c.castShadow=this.preset.shadows,o.add(c),n.rifle=c}n.model.root.add(n.label),n.label.position.y=2.15,this.scene.add(n.model.root)})}remove(t){const e=this.list.get(t);e?.model&&this.scene.remove(e.model.root),this.list.delete(t)}sync(t,e,n,i){for(const s of t){const[o,a,c,l,h,,u,d,f,A]=s;if(o===e)continue;const m=this.list.get(o);if(!m)continue;const g=m.target===null;m.target={x:a,y:c,z:l,yaw:h,speed:u,veh:d,alive:f,aim:A},g&&(m.x=a,m.y=c,m.z=l,m.yaw=h)}for(const s of this.list.values()){if(!s.model||!s.target)continue;const o=s.target,a=Math.min(1,n*10);s.x+=(o.x-s.x)*a,s.y+=(o.y-s.y)*a,s.z+=(o.z-s.z)*a;let c=o.yaw-s.yaw;c=Math.atan2(Math.sin(c),Math.cos(c)),s.yaw+=c*a;const l=s.model.root;l.visible=!o.veh,l.position.set(s.x,s.y,s.z),l.rotation.y=s.yaw+Math.PI;let h=o.speed>4.6?"run":o.speed>.4?"walk":o.aim?"aim":"idle";o.alive||(h="death"),s.flashT>0&&(s.flashT-=n,o.speed||(h="shoot")),s.model.play(h,.2),s.model.current&&h==="walk"&&(s.model.current.timeScale=Math.max(.6,o.speed/1.6)),s.model.update(n);const u=Math.hypot(s.x-i.x,s.z-i.z),d=Math.max(1,u/12);s.label.scale.set(1.6*d,.4*d,1),s.label.position.y=2.1+(d-1)*.2}}shotFrom(t){const e=this.list.get(t);return e&&(e.flashT=.6),e}}const Lv=8,Pv=100,Uv=Object.keys(Ve),Nv=["idle","walk","run","eat","death","attack"],ka=5,to=je[0],cu=[{id:1,key:"rover",x:to.x+8,z:15,heading:Math.PI},{id:2,key:"pickup",x:to.x+17,z:16,heading:Math.PI},{id:3,key:"rover",x:to.x+26,z:17,heading:Math.PI},{id:4,key:"pickup",x:to.x+2,z:11,heading:Math.PI}],bt=r=>document.querySelector(r),So=r=>String(r).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),ie=IE();class Fv{constructor(t=null,e=null){this.net=t,this.welcome=e,this.netAnimals=new Map,this.snap=null,this.sendT=0,this.roster=new Map,this.scores={list:[],best:[]},this.sound=new VE,this.score=0,this.kills=0,this.running=!1,this.paused=!1,this.clock=new cE,this.shared={uTime:{value:0}},this.vehicles=[],this.driving=null,this.damageT=0}async init(t){const e=this.preset=yo[ie.quality]||yo.medium,n=bt("#game"),i=this.renderer=new s_({canvas:n,antialias:e.antialias,powerPreference:"high-performance"});i.setPixelRatio(Math.min(devicePixelRatio,e.pixelRatio)),i.setSize(innerWidth,innerHeight),i.toneMapping=lu,i.toneMappingExposure=1,i.shadowMap.enabled=e.shadows,i.shadowMap.type=Pc;const s=this.scene=new Gu,o=this.camera=new Oe(72,innerWidth/innerHeight,.1,1500);s.add(o),t(.05,"Текстуры…"),await GE(i);const a=Math.min(i.capabilities.getMaxAnisotropy(),e.antialias?8:4),c=e.normalMaps,l=["grass","meadow","forest","mud","rock","bark","moss","barkBroad","logs","roof","planks"],h=await Promise.all(l.map(A=>zE(A,{normal:c&&!["meadow","moss"].includes(A),anisotropy:["grass","meadow","forest","mud","rock"].includes(A)?a:2}))),u=Object.fromEntries(l.map((A,m)=>[A,h[m]]));t(.35,"Генерация леса…"),await new Promise(A=>setTimeout(A,0)),this.world=new ax;const d=rx(e,u);if(this.ground=d.ground,s.add(d.mesh,d.far),this.water=ox(),s.add(this.water),this.grass=fx(e,d.heightTex,this.shared),s.add(this.grass),this.sky=new Tx(s,e),d.far.material=this.sky.farMaterial(e.viewDist),t(.5,"Деревья…"),this.trees=await yx(this.world,e,u.bark,u.barkBroad,this.shared,i),s.add(this.trees),this.rocks=px(this.world,e,u.rock,u.moss),s.add(this.rocks),t(.6,"Избушки…"),this.buildings=Bx(this.world,e,u),s.add(this.buildings),this.towers=this.buildings.towers,this.impacts=new bx(s),t(.7,"Животные и машины…"),this.input=new HE(n,Ki?bt("#touch"):null,ie),this.input.onLockChange=A=>{!A&&this.running&&!Ki&&this.pause(!0)},addEventListener("keydown",A=>{A.code==="Escape"&&this.input.dragLook&&this.running&&this.pause(!this.paused)}),this.player=new Lx(o,this.ground,this.world,this.sound),this.gun=new pv(o,this.sound),this.vcam=new _v(o),this.views=new Mv(s,this.ground,e),await this.views.preload(Object.keys(Ve)),this.net){this.sim=null,this.hunters=new Dv(s,this.ground,e);for(const A of this.welcome.players)this.roster.set(A.id,A.nick),A.id!==this.net.id&&this.hunters.add(A.id,A.nick);this._bindNet()}else this.sim=new Ev(this.world,Math.random()*1e9|0),this.sim.spawnGroup("deer",0,-70),this.sim.populate([{x:0,z:0}]);const f=this.net?cu:cu.slice(0,2);for(const A of f){const m=await fl.create(A.key,this.world,this.ground,A.x,A.z,A.heading);m.netId=A.id,m.remoteDriver=this.net&&this.welcome.vehicles.find(g=>g.id===A.id)?.driver||0,m.onCrash=g=>{g>3&&this.sound.crash(g)},m.onLand=g=>this.sound.crash(g*.3),this.vehicles.push(m),s.add(m.root)}this.hud=new Sv,addEventListener("resize",()=>this.resize()),this.resize(),this.player.update(0,this.input,0),this.trees.update(o.position,!0),this.rocks.update(o.position,!0),i.compile(s,o),t(1,"Готово")}resize(){this.camera.aspect=innerWidth/innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(innerWidth,innerHeight)}start(){this.running=!0,this.hud.show(!0),this.net&&(bt("#room-tag").classList.remove("hidden"),bt("#btn-board").classList.remove("hidden"),this.renderBoard()),addEventListener("keydown",t=>{t.code==="Tab"&&this.net&&(t.preventDefault(),bt("#board").classList.toggle("hidden"))}),bt("#touch").classList.toggle("hidden",!Ki),this.clock.start(),this.renderer.setAnimationLoop(()=>this.frame()),this.input.enabled=!0,this.input.requestLock()}pause(t){this.paused=t,bt("#pause").classList.toggle("hidden",!t),t||this.input.requestLock()}shoot(){if(!this.gun.fire())return;const t=this.camera,e=new B;t.getWorldDirection(e);const n=_o.lerp(.035+Math.min(this.player.speed,7)*.006,.0015,this.gun.aimT);e.x+=(Math.random()-.5)*n*2,e.y+=(Math.random()-.5)*n*2,e.z+=(Math.random()-.5)*n*2,e.normalize();const i=t.position;if(this.player.addRecoil(.03+.03*(1-this.gun.aimT)),this.net){this._lastShot={o:i.clone(),dir:e.clone()},this.net.send({t:"shot",o:[i.x,i.y,i.z],d:[e.x,e.y,e.z],lag:Math.round(this.net.rtt/2+90)});return}const s=this.sim.shoot(i.x,i.y,i.z,e.x,e.y,e.z,450,"me");this.sim.noise(i.x,i.z,1),this.showShotResult(s,i,e)}showShotResult(t,e,n){if(t&&t.animal){const i=e.clone().addScaledVector(n,t.dist);this.impacts.spawn(i,7999504,10),this.sound.hit(),this.hud.hitMarker(t.killed);const s=Ve[t.animal.type];if(t.killed){this.net||(this.kills++,this.score+=t.score);const o={head:" · в голову!",vitals:" · в сердце",neck:" · в шею"}[t.part]||"";this.hud.message(`${s.name}: добыча! <b>+${t.score}</b>${o} · ${Math.round(t.dist)} м`,"good")}else s.aggressive?this.hud.message(`${s.name} ранен и бросается на вас!`,"warn"):this.hud.message("Ранен — зверь убегает","warn")}else t&&t.wallDist<450&&this.impacts.spawn(e.clone().addScaledVector(n,t.wallDist-.05),7035456,12)}nearestVehicle(){let t=null,e=4.2;for(const n of this.vehicles){const i=Math.hypot(n.pos.x-this.player.pos.x,n.pos.z-this.player.pos.z);i<e&&(e=i,t=n)}return t}nearestTower(){for(const t of this.towers){const e=Math.hypot(t.x-this.player.pos.x,t.z-this.player.pos.z);if(this.player.platform===t.platform&&this.player.platform||e<2.8)return t}return null}requestVehicle(t){if(!this.net){this.enterVehicle(t);return}if(t.remoteDriver){this.hud.message("Машина занята");return}this.net.send({t:"enter",id:t.netId})}enterVehicle(t){this.driving=t,t.driver="me",this.gun.root.visible=!1,this.input.aim=!1,this.vcam.reset(t),this.vcam.firstPerson=!1,this.sound.engineStart(),document.body.classList.add("driving"),this.hud.message(`${t.cfg.name}: W/S — газ/тормоз, A/D — руль, Space — ручник, V — камера, F — выйти`)}exitVehicle(){const t=this.driving;if(Math.abs(t.speed)>4){this.hud.message("Сначала остановитесь");return}const e=t.exitPoint();this.player.pos.set(e.x,this.ground.sample(e.x,e.z),e.z),this.player.vel.set(0,0,0),this.player.yaw=t.heading+Math.PI,this.player.pitch=0,t.driver=null,t.speed=0,this.driving=null,this.net&&(this.net.send({t:"exit",id:t.netId}),t.remoteDriver=0),this.sound.engineStop(),document.body.classList.remove("driving"),this.camera.fov=this.player.baseFov,this.camera.updateProjectionMatrix()}useAction(){if(this.driving){this.exitVehicle();return}if(this.player.platform){const n=this.towers.find(o=>o.platform===this.player.platform);this.player.platform=null;const i=Math.sin(n.rot)*2.4,s=Math.cos(n.rot)*2.4;this.player.pos.set(n.x+i,this.ground.sample(n.x+i,n.z+s),n.z+s);return}const t=this.nearestVehicle();if(t){this.requestVehicle(t);return}const e=this.nearestTower();e&&(e.platform||(e.platform={x:e.x,z:e.z,y:e.y-.1+wd+.06,r:.85}),this.player.platform=e.platform,this.player.pos.set(e.x,e.platform.y,e.z),this.player.vel.set(0,0,0),this.hud.message("Вы на вышке. F — спуститься"))}_bindNet(){const t=this.net;t.on("snap",e=>{this.snap=e}).on("join",e=>{this.roster.set(e.id,e.nick),this.hunters.add(e.id,e.nick),this.hud?.message(`${e.nick} присоединился к охоте`)}).on("leave",e=>{this.hud?.message(`${this.roster.get(e.id)||"Охотник"} ушёл`),this.roster.delete(e.id),this.hunters.remove(e.id)}).on("scores",e=>{this.scores=e;const n=e.list.find(i=>i.id===t.id);n&&(this.score=n.score,this.kills=n.kills),this.renderBoard()}).on("dmg",e=>this.damage(e.dmg,e.species)).on("hit",e=>{const n=this._lastShot;if(!n)return;const i=e.aid?{animal:{type:e.species},part:e.part,dist:e.dist,killed:e.killed,score:e.score}:{wallDist:e.wall<0?1/0:e.wall};this.showShotResult(i,n.o,n.dir,!0)}).on("kill",e=>{e.by!==t.id&&this.hud.message(`${e.nick}: ${Ve[e.species].name.toLowerCase()} — добыча! +${e.score}`)}).on("shot",e=>{const n=Math.hypot(e.o[0]-this.camera.position.x,e.o[2]-this.camera.position.z);this.sound.shot(n),this.hunters.shotFrom(e.id)}).on("enter",e=>{const n=this.vehicles.find(i=>i.netId===e.id);n&&(n.remoteDriver=e.by,e.by===t.id&&this.enterVehicle(n))}).on("exit",e=>{const n=this.vehicles.find(i=>i.netId===e.id);n&&e.by!==t.id&&(n.remoteDriver=0)}).on("deny",()=>this.hud.message("Машина занята")).on("close",e=>{this.hud.message(`Связь потеряна: ${e}. Переподключаемся…`,"warn"),bt("#room-tag").textContent="нет связи — переподключение…",this._reconnect(0)})}async _reconnect(t){if(t>15){this.hud.message("Не удалось переподключиться. Вернитесь в меню.","warn");return}await new Promise(e=>setTimeout(e,Math.min(5e3,1e3+t*500)));try{const e=await this.net.connect(this.net.code,ie.nick);this.driving&&(this.driving.driver=null,this.driving.speed=0,this.driving=null,this.sound.engineStop(),document.body.classList.remove("driving"));for(const n of[...this.hunters.list.keys()])this.hunters.remove(n);this.roster.clear();for(const n of e.players)this.roster.set(n.id,n.nick),n.id!==this.net.id&&this.hunters.add(n.id,n.nick);this._tag="",this.hud.message("Связь восстановлена")}catch(e){if(/не найдена|заполнена/.test(e.message)){this.hud.message(e.message,"warn");return}this._reconnect(t+1)}}netFrame(t){const e=this.net,n=this.player.pos;if(this.sendT-=t*1e3,this.sendT<=0){this.sendT=Pv;const s={t:"st",p:[+n.x.toFixed(2),+n.y.toFixed(2),+n.z.toFixed(2)],yaw:+this.player.yaw.toFixed(2),pitch:+this.player.pitch.toFixed(2),sp:+this.player.speed.toFixed(1),a:this.player.health>0?1:0,ai:this.gun.aimT>.5?1:0,g:+this.ground.sample(n.x,n.z).toFixed(1)};this.driving&&(s.vs=this.driving.netState()),e.send(s)}const i=this.snap;if(i){const s=new Set;for(const[o,a,c,l,h,u,d]of i.a){let f=this.netAnimals.get(o);f||(f={id:o},this.netAnimals.set(o,f)),f.type=Uv[a],f.x=c,f.z=l,f.heading=h,f.anim=Nv[u],f.speed=d,f.state=f.anim==="death"?"dead":"alive",s.add(o)}for(const o of this.netAnimals.keys())s.has(o)||this.netAnimals.delete(o);for(const o of i.v){const a=this.vehicles.find(c=>c.netId===o[0]);!a||a===this.driving||(a.remoteDriver=o[9],o[9]&&o[9]!==e.id?a.applyRemote(t,o.slice(1,9)):!o[9]&&(Math.abs(a.pos.x-o[1])>.5||Math.abs(a.pos.z-o[3])>.5)?a.applyRemote(t,[...o.slice(1,7),0,0]):a.update(t,null))}this.hunters.sync(i.p,e.id,t,this.camera.position)}this.views.sync([...this.netAnimals.values()],t,this.camera)}renderBoard(){const t=bt("#board-list");if(!t)return;const e=this.scores.list.map((i,s)=>`<tr class="${i.id===this.net?.id?"me":""}"><td>${s+1}</td><td>${So(i.nick)}</td><td>${i.kills}</td><td>${i.score}</td></tr>`).join(""),n=this.scores.best.map((i,s)=>`<tr><td>${s+1}</td><td>${So(i.nick)}</td><td>${i.kills}</td><td>${i.score}</td></tr>`).join("");t.innerHTML=`<h3>Охотники в комнате</h3><table><tr><th>#</th><th>Ник</th><th>Добыча</th><th>Очки</th></tr>${e}</table>`+(n?`<h3>Рекорды комнаты</h3><table><tr><th>#</th><th>Ник</th><th>Добыча</th><th>Очки</th></tr>${n}</table>`:"")}damage(t,e){this.player.health<=0||(this.player.health=Math.max(0,this.player.health-t),this.damageT=.35,this.sound.bite(),this.player.addRecoil(-.03),this.player.health<=0&&(this.hud.message(`Вас загрыз${e==="boar"?" кабан":"ли волки"}… Возвращение на базу`,"warn"),this.score=Math.max(0,this.score-100),setTimeout(()=>{this.player.health=100,this.player.platform=null,this.player.pos.set(0,this.ground.sample(0,0),0),this.player.vel.set(0,0,0)},1500)))}frame(){const t=Math.min(.05,this.clock.getDelta()),e=this.input;if(e.poll(),e.consume("pause")&&this.pause(!this.paused),this.paused){this.renderer.render(this.scene,this.camera);return}this.shared.uTime.value+=t;const n=this.shared.uTime.value,i=ie.timeOfDay==="sunset"?.92:ie.timeOfDay==="cycle"?.5-.5*Math.cos(n/300*Math.PI*2):0;Math.abs(i-this.sky.t)>.002&&(this.sky.set(i),this.trees.setLight(1-i*.3),this.buildings.setEvening(Math.max(0,(i-.6)/.4))),e.consume("use")&&this.useAction(),e.consume("debug")&&(this.views.debug=!this.views.debug);const s=this.player.pos;if(this.driving){const a=this.driving;e.consume("fire"),e.consume("reload"),e.consume("jump"),e.consume("view")&&(this.vcam.firstPerson=!this.vcam.firstPerson),a.update(t,{throttle:e.move.y,steer:e.move.x,handbrake:e.jumpHeld}),s.set(a.pos.x,a.pos.y,a.pos.z),this.player.speed=Math.abs(a.speed),this.vcam.update(t,a,e.takeLook()),this.sound.engineUpdate(a.rpm,a.throttle),this.sim&&Math.abs(a.speed)>3&&Math.random()<t*2&&this.sim.noise(a.pos.x,a.pos.z,.35)}else e.consume("view"),e.consume("fire")&&this.player.health>0&&this.shoot(),e.consume("reload")&&this.gun.reload(),this.gun.update(t,e.aim,this.player.speed),this.player.update(t,e,this.gun.aimT);const o=this.camera.position;if(this.net)this.netFrame(t);else{for(const a of this.vehicles)a!==this.driving&&a.update(t,null);this.sim.update(t,[{id:"me",x:s.x,y:s.y,z:s.z,speed:this.player.speed,inVehicle:!!this.driving||!!this.player.platform,alive:this.player.health>0}]);for(const a of this.sim.events)a.type==="attack"&&a.target==="me"&&this.damage(a.dmg,a.species);this.sim.events.length=0,this.views.sync(this.sim.animals,t,this.camera)}this.grass.update(o,s),this.trees.update(o),this.rocks.update(o),this.sky.update(o,n),this.water.material.uniforms.uTime.value=n,this.water.material.uniforms.uSunDir.value.copy(this.sky.sunDir),this.water.material.uniforms.uSunColor.value.copy(this.sky.sun.color),this.water.material.uniforms.uSkyColor.value.copy(this.sky.uniforms.uHorizon.value),this.impacts.update(t),this.renderer.render(this.scene,this.camera),this.updateHud(t)}updateHud(t){const e=this.hud;if(e.update(t,{gun:this.gun,yaw:this.driving?this.driving.heading+Math.PI:this.player.yaw,score:this.score,kills:this.kills,showFps:ie.showFps}),ie.showFps&&(e.fps.textContent=e.fps.textContent.replace(/ ·.*$/,"")+` · ${this.renderer.info.render.calls} dc`),bt("#health-bar").style.width=`${this.player.health}%`,this.net){const a=`Комната <b>${this.net.code}</b> · ${this.roster.size}/${Lv} · ${Math.round(this.net.rtt)} мс`;a!==this._tag&&(bt("#room-tag").innerHTML=a,this._tag=a)}this.damageT-=t,bt("#damage").classList.toggle("on",this.damageT>0);let n="",i=!1;const s=Ki?"🚙":"F";if(this.driving)i=!0;else if(this.player.platform)n=`<b>${s}</b> — спуститься с вышки`,i=!0;else{const a=this.nearestVehicle(),c=!a&&this.nearestTower();a?(n=`<b>${s}</b> — сесть: ${a.cfg.name}`,i=!0):c&&(n=`<b>${s}</b> — подняться на вышку`,i=!0)}n!==this._prompt&&(bt("#prompt").innerHTML=n,this._prompt=n),Ki&&(bt("#btn-use").classList.toggle("hidden",!i),bt("#btn-view").classList.toggle("hidden",!this.driving));const o=this.driving?`${Math.round(Math.abs(this.driving.speed)*3.6)}<small>км/ч</small>`:"";o!==this._speed&&(bt("#speedo").innerHTML=o,this._speed=o)}}function Qv(){const r=bt("#nick"),t=bt("#quality"),e=bt("#tod");r.value=ie.nick;for(const[d,f]of Object.entries(yo))t.add(new Option(f.label,d,!1,d===ie.quality));e.value=ie.timeOfDay,bt("#sens").value=ie.sensitivity,bt("#controls-help").innerHTML=Ki?"Левый джойстик — ходьба (до упора — бег) · свайп справа — камера · кнопки: выстрел, прицел, перезарядка, прыжок":"WASD — ходьба · Shift — бег · мышь — камера · ЛКМ — выстрел · ПКМ — оптика · R — перезарядка · Space — прыжок · F — машина/вышка · V — вид в машине · Esc — пауза";const n=()=>{ie.nick=r.value.trim().slice(0,16),ie.quality=t.value,ie.timeOfDay=e.value,ie.sensitivity=parseFloat(bt("#sens").value),Ia(ie)};let i=null;const s=(d,f=!1)=>{const A=bt("#net-status");A.textContent=d,A.classList.toggle("err",f)};async function o(d=null,f=null){bt("#menu").classList.add("hidden"),bt("#loading").classList.remove("hidden"),i=new Fv(d,f),i.sound.unlock(),window.__game=i;try{await i.init((A,m)=>{bt("#load-bar").style.width=`${A*100}%`,bt("#load-label").textContent=m})}catch(A){console.error(A),bt("#load-label").textContent="Ошибка: "+A.message;return}bt("#loading").classList.add("hidden"),i.start(),i.hud.message(d?`Комната <b>${d.code}</b> — передайте код друзьям. Tab — таблица очков.`:`Удачной охоты, ${So(ie.nick)}! Стадо оленей — впереди, к северу. Машины — у базы за спиной.`)}const a=()=>(n(),ie.nick?!1:(r.focus(),r.classList.add("err"),!0));async function c(d){const f=new bv;s("Подключение…");try{const A=await f.connect(d,ie.nick).catch(async m=>{if(/не найдена|заполнена/.test(m.message))throw m;return await new Promise(g=>setTimeout(g,1200)),f.connect(d,ie.nick)});await o(f,A)}catch(A){s(A.message,!0)}}bt("#btn-solo").addEventListener("click",()=>{a()||o()}),bt("#btn-create").addEventListener("click",async()=>{if(!a()){s("Создаём комнату…");try{const{code:d}=await wv();bt("#room-code").value=d,await c(d)}catch{s("Сервер недоступен. Запустите его: npm run dev в папке server",!0)}}});const l=()=>{if(a())return;const d=bt("#room-code").value.trim().toUpperCase();if(d.length!==ka){s(`Код — ${ka} символов`,!0);return}c(d)};bt("#btn-join").addEventListener("click",l),bt("#room-code").addEventListener("keydown",d=>{d.key==="Enter"&&l()});const h=new URLSearchParams(location.search).get("room");h&&(bt("#room-code").value=h.toUpperCase().slice(0,ka)),bt("#btn-board").addEventListener("click",()=>bt("#board").classList.toggle("hidden")),bt("#btn-board").addEventListener("touchstart",d=>{d.preventDefault(),bt("#board").classList.toggle("hidden")},{passive:!1}),Bv().then(({top:d})=>{d?.length&&(bt("#lb").innerHTML=d.slice(0,10).map(f=>`<li><b>${So(f.nick)}</b> — ${f.score} очк., добыча: ${f.kills}</li>`).join(""),bt("#lb-wrap").classList.remove("hidden"))}).catch(()=>{}),bt("#btn-resume").addEventListener("click",()=>i?.pause(!1)),bt("#btn-apply").addEventListener("click",()=>{ie.quality=bt("#quality-pause").value,ie.timeOfDay=bt("#tod-pause").value,ie.sensitivity=parseFloat(bt("#sens-pause").value),Ia(ie),location.reload()}),bt("#btn-menu").addEventListener("click",()=>location.reload());const u=bt("#quality-pause");for(const[d,f]of Object.entries(yo))u.add(new Option(f.label,d,!1,d===ie.quality));bt("#tod-pause").value=ie.timeOfDay,bt("#sens-pause").value=ie.sensitivity,bt("#sens-pause").addEventListener("input",d=>{ie.sensitivity=parseFloat(d.target.value),Ia(ie)})}document.addEventListener("gesturestart",r=>r.preventDefault());Qv();
