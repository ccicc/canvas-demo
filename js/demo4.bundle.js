!function(t){function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var e={};n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=78)}({78:function(t,n,e){"use strict";function r(){function t(t){t.strokeStyle=s,t.strokeRect(f,f,l,a)}function n(t,n){var e=l*n/100;t.fillStyle=s,t.fillRect(f,f,e,a)}function e(t){var n=t/100;return n>=100?100:n}function r(t,n){t.fillStyle=d,t.font="30px serif",t.textAlign="center",t.fillText(Math.floor(n)+"%",300,150)}function o(t){t.clearRect(0,0,u,c)}function i(u){return function(c){var f=e(c);o(u),t(u),n(u,f),r(u,f),f>=100||window.requestAnimationFrame(i(u))}}var u=void 0,c=void 0,f=50,l=500,a=50,s="#066",d="#666";!function(t){var n=document.getElementById(t),e=n.getContext("2d");u=n.width,c=n.height,window.requestAnimationFrame(i(e))}("canvas")}window.onload=r}});