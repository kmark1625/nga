H.util.eval("function Kk(a,b){return new Oh(a.x-b.x,a.y-b.y)}var Lk={};function Mk(a){var b=a.ownerDocument,b=b.documentElement||b.body.parentNode||b.body;a=a.getBoundingClientRect();return{x:a.left+(\"number\"===typeof window.pageXOffset?window.pageXOffset:b.scrollLeft),y:a.top+(\"number\"===typeof window.pageYOffset?window.pageYOffset:b.scrollTop)}}var Nk=/Edge\\/\\d+/.test(navigator.appVersion),Ok=Function(\"return this\")();function Pk(a,b,c,d,e,f,g){Pk.A.constructor.call(this,a);this.pointers=b;this.changedPointers=c;this.targetPointers=d;this.currentPointer=e;this.originalEvent=g;this.target=f}v(Pk,ad);q(\"H.mapevents.Event\",Pk);function Qk(a,b,c,d,e,f){if(isNaN(a))throw Error(\"x needs to be a number\");if(isNaN(b))throw Error(\"y needs to be a number\");if(isNaN(c))throw Error(\"pointer must have an id\");this.viewportX=a;this.viewportY=b;this.target=null;this.id=c;this.type=d;this.dragTarget=null;this.a=this.button=e!==A?e:-1;this.buttons=f!==A?f:0}q(\"H.mapevents.Pointer\",Qk);\nfunction Rk(a,b,c){if(isNaN(b))throw Error(\"x needs to be a number\");if(isNaN(c))throw Error(\"y needs to be a number\");a.viewportX=b;a.viewportY=c}Qk.prototype.c=function(){return this.a};Qk.prototype.getLastChangedButton=Qk.prototype.c;function Sk(a,b){a.a=b;a.buttons|=Qk.prototype.b[+b]||0}function Tk(a,b){a.a=b;a.buttons&=~(Qk.prototype.b[+b]||0)}Qk.prototype.b=[1,4,2];var Uk={NONE:-1,LEFT:0,MIDDLE:1,RIGHT:2};Qk.Button=Uk;function Vk(a){this.a=a instanceof Array?a.slice(0):[]}function Wk(a){a.a.splice(0,a.a.length)}n=Vk.prototype;n.length=function(){return this.a.length};n.indexOf=function(a){for(var b=this.a.length;b--;)if(this.a[b].id===a)return b;return-1};function Xk(a,b){var c=a.indexOf(b);return-1!==c?a.a[c]:null}n.remove=function(a){a=this.indexOf(a);return-1!==a?this.a.splice(a,1)[0]:null};function Yk(a,b){for(var c=a.a.length,d=[];c--;)a.a[c].type!==b&&d.push(a.a[c]);a.a=d}\nfunction Zk(a,b){for(var c=a.a.length;c--;)if(a.a[c].dragTarget===b)return!0;return!1}n.push=function(a){if(a instanceof Qk)return this.a.push(a);throw Error(\"list needs a pointer\");};n.clone=function(){return new Vk(this.a)};function $k(a,b,c){c=c||{};if(!(a instanceof R))throw Error(\"events: map instance required\");if(!(b instanceof Array))throw Error(\"events: map array required\");Yc.call(this);this.M=c.Oi||300;this.N=c.Ni||50;this.ga=c.Ri||50;this.ia=c.Si||500;this.I=c.Qi||900;this.U=c.Pi||50;this.map=a;this.l=this.map.la;this.j=this.l.element;this.B=b;this.b=new Vk;this.c=new Vk;this.i={};this.f=null;this.s=!0;this.m={};this.v={};this.o=null;this.cd=z(this.cd,this);this.O={pointerdown:this.yh,pointermove:this.zh,pointerup:this.Ah,\npointercancel:this.xh};al(this)}v($k,Yc);function al(a,b){for(var c,d,e=0,f=a.B.length,e=0;e<f;e++)d=a.B[e],c=d.listener,\"function\"===typeof c&&(b?(d.target||a.j).removeEventListener(d.Ia,c):(d.target||a.j).addEventListener(d.Ia,c))}\nfunction bl(a,b,c){var d,e=a.O[b],f,g;if(\"function\"===typeof e)for(\"pointermove\"!==b&&(a.s=!0),f=0,g=a.c.length();f<g;f++)b=a.c.a[f],a.j.contains(c.target)?(d=a,d=d.f===b?b.target:0<=b.viewportX&&b.viewportX<d.l.width&&0<=b.viewportY&&b.viewportY<d.l.height?d.map.v(b.viewportX,b.viewportY)||d.map:null):d=null,cl(b.id,a.m),e.call(a,b,d,c);Wk(a.c)}n=$k.prototype;\nn.Ah=function(a,b,c){a.target=b;dl(this,a,c);el(this,b,\"pointerup\",c,a);\"mouse\"!==a.type&&el(this,b,\"pointerleave\",c,a);b=this.i[a.id];var d={x:a.viewportX,y:a.viewportY},e=c.timeStamp,f=a.target,g=this.o;b&&b.target===f&&b.Ce.distance(d)<this.ga&&e-b.Ef<this.ia?(el(this,f,\"tap\",c,a),g&&g.target===f&&e-g.Ef<this.M?g.Ce.distance({x:a.viewportX,y:a.viewportY})<this.N&&(el(this,f,\"dbltap\",c,a),this.o=null):this.o={target:f,Ce:new L(a.viewportX,a.viewportY),Ef:c.timeStamp}):this.o=null;this.i={};cl(a.id,\nthis.v)};function dl(a,b,c){b===a.f&&(el(a,b.dragTarget,\"dragend\",c,b),a.f=null,cl(b.id,a.m));b.dragTarget=null}n.cd=function(a,b){var c=this;el(this,a.dragTarget,\"drag\",b,a);cl(a.id,this.m);this.m[a.id]=setTimeout(function(){c.cd(a,b)},150)};function cl(a,b){b[a]&&(clearTimeout(b[a]),delete b[a])}\nfunction fl(a,b,c){var d=b.target,e=new L(b.viewportX,b.viewportY),f=b.id;cl(f,a.v);a.v[f]=setTimeout(function(){d&&d===b.target&&e.distance({x:b.viewportX,y:b.viewportY})<a.U&&(el(a,d,\"longpress\",c,b),delete a.i[b.id])},a.I)}\nn.zh=function(a,b,c){var d=a.dragTarget,e=a.id,f;f=a.target;a.target=b;f!==b&&(el(this,f,\"pointerleave\",c,a),el(this,b,\"pointerenter\",c,a));d?this.f?this.cd(a,c):this.s?this.s=!1:(this.f=a,el(this,d,\"dragstart\",c,a),this.cd(a,c),delete this.i[e],this.s=!0):(!this.f||this.f&&this.f.dragTarget!==b&&this.f.dragTarget!==this.map)&&el(this,b,\"pointermove\",c,a)};\nn.yh=function(a,b,c){var d=!(/^(?:mouse|pen)$/.test(a.type)&&0!==c.button),e;b&&(a.target=b,this.i[a.id]={Ce:new L(a.viewportX,a.viewportY),target:a.target,Ef:c.timeStamp},\"mouse\"!==a.type&&el(this,b,\"pointerenter\",c,a),e=el(this,b,\"pointerdown\",c,a),!this.f&&d&&(b.draggable&&!Zk(this.b,b)?a.dragTarget=b:!this.map.draggable||e.defaultPrevented||Zk(this.b,this.map)||(a.dragTarget=this.map)),fl(this,a,c))};\nn.xh=function(a,b,c){a.target=null;b?(el(this,b,\"pointerleave\",c,a),el(this,b,\"pointercancel\",c,a)):el(this,this.map,\"pointercancel\",c,a);dl(this,a,c);this.i={};cl(a.id,this.v)};function el(a,b,c,d,e){var f;if(b&&\"function\"===typeof b.dispatchEvent){f=Pk;var g=a.b.a,h=a.c.a;a=a.b;var k,l=a.a.length,m=[];for(k=0;k<l;k++)a.a[k].target===b&&m.push(a.a[k]);f=new f(c,g,h,m,e,b,d);e.button=/^(?:longpress|(?:dbl)?tap|pointer(?:down|up))$/.test(c)?e.a:Uk.NONE;b.dispatchEvent(f)}return f}\nn.D=function(){al(this,!0);Wk(this.b);Wk(this.c);var a=this.m,b;for(b in a)cl(b,a);var a=this.v,c;for(c in a)cl(c,a);this.f=this.i=this.o=this.map=this.c=this.b=this.B=this.a=null;Yc.prototype.D.call(this)};function gl(a){this.g=z(this.g,this);$k.call(this,a,[{Ia:\"touchstart\",listener:this.g},{Ia:\"touchmove\",listener:this.g},{Ia:\"touchend\",listener:this.g},{Ia:\"touchcancel\",listener:this.g}]);this.F={touchstart:\"pointerdown\",touchmove:\"pointermove\",touchend:\"pointerup\",touchcancel:\"pointercancel\"};this.u=(a=(a=a.j)?a.a:null)?Array.prototype.slice.call(a.querySelectorAll(\"a\"),0):[]}v(gl,$k);\ngl.prototype.g=function(a){var b=a.touches,c=this.b.length(),d;if(\"touchstart\"===a.type&&c>=b.length){c=this.b.clone();for(d=b.length;d--;)c.remove(b[d].identifier);for(d=c.length();d--;)this.b.remove(c.a[d].id);this.c=c;bl(this,\"pointercancel\",a);Wk(this.c)}if(this.F[a.type]){b=Mk(this.l.element);c=a.type;d=a.changedTouches;var e=d.length,f,g,h,k,l,m;Wk(this.c);for(m=0;m<e;m++)if(h=d[m],l=Xk(this.b,h.identifier),f=h.pageX-b.x,g=h.pageY-b.y,l)if(\"touchmove\"===c){if(h=Math.abs(l.viewportX-f),k=Math.abs(l.viewportY-\ng),1<h||1<k||1===h&&1===k)Rk(l,f,g),this.c.push(l)}else\"touchend\"===c&&(this.b.remove(l.id),this.c.push(l),Tk(l,Uk.LEFT));else l=new Qk(f,g,h.identifier,\"touch\",Uk.LEFT,1),this.b.push(l),this.c.push(l);bl(this,this.F[a.type],a);-1===this.u.indexOf(a.target)&&a.preventDefault()}};gl.prototype.D=function(){this.u=null;$k.prototype.D.call(this)};function hl(a){var b=[],b=il(this);(navigator.pointerEnabled||navigator.msPointerEnabled)&&b.push({Ia:\"MSHoldVisual\",listener:\"prevent\"});$k.call(this,a,b)}v(hl,$k);function il(a){var b=navigator.pointerEnabled,c,d,e=[];a.g=z(a.g,a);\"MSPointerDown MSPointerMove MSPointerUp MSPointerCancel MSPointerOut MSPointerOver\".split(\" \").forEach(function(f){c=f.toLowerCase().replace(/ms/g,\"\");d=b?c:f;e.push({Ia:d,listener:a.g,target:\"MSPointerUp\"===f||\"MSPointerMove\"===f?window:null})});return e}\nvar jl={2:\"touch\",3:\"pen\",4:\"mouse\"};\nhl.prototype.g=function(a){var b=navigator.li?a.type:a.type.toLowerCase().replace(/ms/g,\"\"),c=Mk(this.j),d=Xk(this.b,a.pointerId),e=a.pageX-c.x,c=a.pageY-c.y,f=jl[a.pointerType]||a.pointerType;Nk&&\"rtl\"===w.getComputedStyle(this.l.element).direction&&(e-=(w.devicePixelRatio-1)*this.l.width);if(!(d||b in{pointerup:1,pointerout:1,pointercancel:1}||\"touch\"===f&&\"pointerdown\"!==b)){var d={x:e,y:c},g=a.pointerType;\"number\"===typeof g&&(g=jl[g]);d=new Qk(d.x,d.y,a.pointerId,g,a.button,a.buttons);this.b.push(d)}d&&\n(b in{pointerup:1,pointercancel:1}?(\"touch\"===f&&this.b.remove(d.id),Tk(d,a.button)):\"pointerdown\"===b&&(\"touch\"===a.pointerType&&(Yk(this.b,\"mouse\"),Yk(this.b,\"pen\")),Sk(d,a.button)),this.c.push(d),\"pointermove\"!==b?(Rk(d,e,c),bl(this,\"pointerout\"===b||\"pointerover\"===b?\"pointermove\":b,a)):d.viewportX===e&&d.viewportY===c||a.target===document.documentElement||(Rk(d,e,c),bl(this,b,a)));Wk(this.c)};function kl(a,b,c,d){kl.A.constructor.call(this,\"contextmenu\");this.items=[];this.viewportX=a;this.viewportY=b;this.target=c;this.originalEvent=d}v(kl,ad);q(\"H.mapevents.ContextMenuEvent\",kl);function ll(a){this.Le=z(this.Le,this);this.Ne=z(this.Ne,this);this.Me=z(this.Me,this);this.u=!1;this.g=-1;this.F=0;ll.A.constructor.call(this,a,[{Ia:\"contextmenu\",listener:this.Le},{target:a,Ia:\"longpress\",listener:this.Ne},{target:a,Ia:\"dbltap\",listener:this.Me}])}v(ll,$k);n=ll.prototype;n.Ne=function(a){var b=a.currentPointer;\"touch\"===b.type&&1===a.pointers.length&&ml(this,b.viewportX,b.viewportY,a.originalEvent,a.target)};n.Me=function(a){\"touch\"===a.currentPointer.type&&(this.F=Date.now())};\nn.Le=function(a){var b=this;-1===this.g?this.g=setTimeout(function(){var c=Mk(b.j),d=a.pageX-c.x,c=a.pageY-c.y;b.g=-1;ml(b,d,c,a)},this.M):(clearInterval(this.g),this.g=-1);a.preventDefault()};function ml(a,b,c,d,e){var f=a.map;e=e||f.v(b,c)||f;var g=Date.now()-a.F;!a.u&&g>a.I&&(a.u=!0,e.dispatchEvent(new kl(b,c,e,d)),lh(f.a,a.Mf,a.Zf,!1,a))}n.Mf=[\"mousedown\",\"touchstart\",\"pointerdown\",\"wheel\"];n.Zf=function(){this.u&&(this.u=!1,this.map.dispatchEvent(new ad(\"contextmenuclose\",this.map)))};\nn.D=function(){var a=this.map.a;clearInterval(this.g);a&&nh(a,this.Mf,this.Zf,!1,this);$k.prototype.D.call(this)};function nl(a,b,c,d,e){nl.A.constructor.call(this,\"wheel\");this.delta=a;this.viewportX=b;this.viewportY=c;this.target=d;this.originalEvent=e}v(nl,ad);q(\"H.mapevents.WheelEvent\",nl);function ol(a){var b=\"onwheel\"in document;this.L=b;this.F=(b?\"d\":\"wheelD\")+\"elta\";this.g=z(this.g,this);ol.A.constructor.call(this,a,[{Ia:(b?\"\":\"mouse\")+\"wheel\",listener:this.g}]);this.u=this.map.la}v(ol,$k);\nol.prototype.g=function(a){var b=Mk(this.j),c;c=a.pageX-b.x;var b=a.pageY-b.y,d=this.F,e=a[d+(d+\"Y\"in a?\"Y\":\"\")],f,g,h;Nk&&\"rtl\"===w.getComputedStyle(this.u.element).direction&&(c-=(w.devicePixelRatio-1)*this.u.width);e&&(h=Math.abs,f=h(e),e=(!(g=a[d+\"X\"])||3<=f/h(g))&&(!(g=a[d+\"Z\"])||3<=f/h(g))?((0<e)-(0>e))*(this.L?1:-1):0);a=new nl(e,c,b,null,a);a.delta&&((a.target=c=this.map.Ea(a.viewportX,a.viewportY)[0])&&la(c.dispatchEvent)&&c.dispatchEvent(a),a.defaultPrevented||this.map.dispatchEvent(a))};function pl(a){var b=window;this.g=z(this.g,this);$k.call(this,a,[{Ia:\"mousedown\",listener:this.g},{Ia:\"mousemove\",listener:this.g,target:b},{Ia:\"mouseup\",listener:this.g,target:b},{Ia:\"mouseover\",listener:this.g},{Ia:\"mouseout\",listener:this.g},{Ia:\"dragstart\",listener:this.u}])}v(pl,$k);\npl.prototype.g=function(a){var b=a.type,c=Mk(this.j),c={x:a.pageX-c.x,y:a.pageY-c.y},d;(d=this.b.a[0])||(d=new Qk(c.x,c.y,1,\"mouse\"),this.b.push(d));this.c.push(d);Rk(d,c.x,c.y);/^mouse(?:move|over|out)$/.test(b)?bl(this,\"pointermove\",a):(/^mouse(down|up)$/.test(b)&&(c=a.which-1,\"up\"===Ok.RegExp.$1?Tk(d,c):Sk(d,c)),bl(this,b.replace(\"mouse\",\"pointer\"),a));Wk(this.c)};pl.prototype.u=function(a){a.preventDefault()};function ql(a){var b=a.la.element.style;if(-1!==rl.indexOf(a))throw Error(\"InvalidArgument: map is already in use\");this.G=a;rl.push(a);b.msTouchAction=b.touchAction=\"none\";this.c=this.f=this.a=this.b=null;navigator.msPointerEnabled||navigator.pointerEnabled?this.b=new hl(this.G):(this.b=new gl(this.G),this.a=new pl(this.G));this.f=new ol(this.G);this.c=new ll(this.G);this.G.S(this.J,this);Yc.call(this)}v(ql,Yc);q(\"H.mapevents.MapEvents\",ql);var rl=[];\nql.prototype.J=function(){this.G=null;this.b.J();this.f.J();this.c.J();this.a&&this.a.J();rl.splice(rl.indexOf(this.G),1);Yc.prototype.J.call(this)};ql.prototype.dispose=ql.prototype.J;ql.prototype.g=function(){return this.G};ql.prototype.getAttachedMap=ql.prototype.g;function sl(a,b){if(-1!==tl.indexOf(a))throw Error(\"InvalidArgument: events are already used\");var c=b||{},d;Yc.call(this);this.G=d=a.G;this.s=a;tl.push(a);d.draggable=!0;this.F=c.zoomDuration||300;this.c=c.kinetics||{duration:600,power:1,ease:Hi};this.v=7;this.enable(c.enabled||this.v);c=R.EngineType;this.b=d.la;this.f=this.b.element;this.u=d.b;this.m=c.P2D;this.o=c.P3D;this.j=null;this.ge=this.ge.bind(this);d.addEventListener(\"dragstart\",this.tg,!1,this);d.addEventListener(\"drag\",this.Jg,!1,this);\nd.addEventListener(\"dragend\",this.Kg,!1,this);d.addEventListener(\"wheel\",this.ge,!1,this);d.addEventListener(\"dbltap\",this.Ig,!1,this);d.addEventListener(\"tap\",this.Lg,!1,this);d.addEventListener(\"pointermove\",this.Pg,!1,this);mh(this.f,\"contextmenu\",this.Hg,!1,this);a.S(this.J,this)}v(sl,Yc);q(\"H.mapevents.Behavior\",sl);var tl=[];sl.prototype.a=0;sl.DRAGGING=1;sl.WHEELZOOM=2;sl.DBLTAPZOOM=4;var ul=2*Pa/180;\nfunction vl(a,b){var c=b.pointers,d=c[0],e=c[1]||{},f=a.b;if(1===c.length)b.originalEvent.shiftKey?f.startInteraction(Fi.HEADING+Fi.TILT,a.c):f.startInteraction(Fi.COORD+Fi.ZOOM+Fi.HEADING,a.c),f.interaction(d.viewportX,d.viewportY,e.viewportX,e.viewportY);else if(a.i===A){var c=a.g[0],f=a.g[1],g=new Oh(d.viewportX,d.viewportY),h=new Oh(e.viewportX,e.viewportY),k=new Oh((c.x+f.x)/2,(c.y+f.y)/2),l=new Oh((g.x+h.x)/2,(g.y+h.y)/2),m=Kk(c,l),p=Kk(f,l),e=Kk(g,l),d=Kk(h,l);if(c=1<Ba(k.y-l.y)&&4>Ba(Ph(Kk(f,\nc))-Ph(Kk(h,g))))c=Kk(p,m),f=Kk(d,e),c=Na(c.x*f.y-f.x*c.y,c.a(f)),c=Ba(c)<ul;a.i=c;a.i?a.b.startInteraction(Fi.TILT,a.c):a.b.startInteraction(Fi.COORD+Fi.ZOOM+Fi.HEADING,a.c)}}n=sl.prototype;n.tg=function(a){var b=a.pointers,c=b[0];if(this.a&1&&(1===b.length&&vl(this,a),this.a&2&&2!==this.G.f().type)){a=c.viewportX;var c=c.viewportY,d;this.l&&(b=this.G.getZoom(),d=wl(b,this.l),b!==d&&(this.zoom(b,d,a,c),this.l=null))}};\nn.Jg=function(a){var b=a.pointers[0],c=a.pointers[1]||Lk;this.a&1&&(1===a.pointers.length?this.b.interaction(b.viewportX,b.viewportY,c.viewportX,c.viewportY):(this.g!==A&&(vl(this,a),this.i?this.b.interaction((b.viewportX+c.viewportX)/2,(b.viewportY+c.viewportY)/2):this.b.interaction(b.viewportX,b.viewportY,c.viewportX,c.viewportY)),this.g=[new Oh(b.viewportX,b.viewportY),new Oh(c.viewportX,c.viewportY)]),a.originalEvent.preventDefault())};\nn.Kg=function(){this.a&1&&(this.b.endInteraction(!this.c),this.u.endControl(),this.i=this.g=A)};\nn.zoom=function(a,b,c,d){var e=this.G,f=+b-+a,g=e.b;if(isNaN(+a))throw Error(\"start zoom needs to be a number\");if(isNaN(+b))throw Error(\"to zoom needs to be a number\");0!==f&&(a=e.f(),a.type===this.o?(g.startControl(null,c,d),g.control(0,0,.006*(0>f?-1:1),0,0,0),this.j&&w.clearTimeout(this.j),this.j=w.setTimeout(function(){g.endControl()},this.F)):(g.startControl(null,c,d),g.control(0,0,.006,0,0,0),g.endControl(!0,function(a){a.zoom=b})))};\nn.ge=function(a){var b,c,d,e,f;this.a&2&&(b=a.delta,c=this.G.getZoom(),f=wl(c-b,b),d=this.G,e=d.f(),e.type===this.m||e.type===this.o?(this.zoom(c,f,a.viewportX,a.viewportY),this.l=b):(c=this.G.b.a(),c.fov+=16*b,d.b.b(c)),a.originalEvent.preventDefault())};n.Lg=function(a){a=a.currentPointer;1===this.G.f().type&&(a=this.G.ob(a.viewportX,a.viewportY),this.G.b.b(a))};n.Pg=function(a){a=a.currentPointer;this.G.f().Ec(a.viewportX,a.viewportY)};\nn.Ig=function(a){var b=a.currentPointer,c=this.G.getZoom(),d=a.currentPointer.type,e=this.G.f();if(this.m===e.type||this.o===e.type)a=\"mouse\"===d?0===a.originalEvent.button?-1:1:0<a.pointers.length?1:-1,a=wl(c-a,a),this.a&4&&this.zoom(c,a,b.viewportX,b.viewportY)};function wl(a,b){var c=Math.round(a);1E-5>Math.abs(a-c)&&(a=c);return Math[0>b?\"ceil\":\"floor\"](a)}n.Hg=function(a){return this.a&4?(a.preventDefault(),!1):!0};\nn.J=function(){var a=this.G;a&&(a.draggable=!1,a.removeEventListener(\"dragstart\",this.tg,!1,this),a.removeEventListener(\"drag\",this.Jg,!1,this),a.removeEventListener(\"dragend\",this.Kg,!1,this),a.removeEventListener(\"wheel\",this.ge,!1,this),a.removeEventListener(\"tap\",this.Lg,!1,this),a.removeEventListener(\"dbltap\",this.Ig,!1,this),a.removeEventListener(\"pointermove\",this.Pg,!1,this),this.G=null);this.f&&(this.f.style.msTouchAction=\"\",nh(this.f,\"contextmenu\",this.Hg,!1,this),this.f=null);this.c=this.b=\nnull;tl.splice(tl.indexOf(this.s),1);Yc.prototype.J.call(this)};sl.prototype.dispose=sl.prototype.J;sl.prototype.disable=function(a){this.b.endInteraction(!0);a?this.a&a&&(this.a-=a,a&1&&(this.G.draggable=!1)):(this.a=0,this.G.draggable=!1)};sl.prototype.disable=sl.prototype.disable;sl.prototype.enable=function(a){a?this.a&a||(this.a+=a,a&1&&(this.G.draggable=!0)):(this.a=this.v,this.G.draggable=!0)};sl.prototype.enable=sl.prototype.enable;\nsl.prototype.B=function(a){if(isNaN(a))throw Error(\"behavior: number required\");return!!(this.a&a)};sl.prototype.isEnabled=sl.prototype.B;q(\"H.mapevents.buildInfo\",function(){return rg(\"mapsjs-mapevents\",\"1.0.0\",\"4eb0b44\")});\n");