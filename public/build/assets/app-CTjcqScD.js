var top="top",bottom="bottom",right="right",left="left",auto="auto",basePlacements=[top,bottom,right,left],start="start",end="end",clippingParents="clippingParents",viewport="viewport",popper="popper",reference="reference",variationPlacements=basePlacements.reduce(function(n,e){return n.concat([e+"-"+start,e+"-"+end])},[]),placements=[].concat(basePlacements,[auto]).reduce(function(n,e){return n.concat([e,e+"-"+start,e+"-"+end])},[]),beforeRead="beforeRead",read="read",afterRead="afterRead",beforeMain="beforeMain",main="main",afterMain="afterMain",beforeWrite="beforeWrite",write="write",afterWrite="afterWrite",modifierPhases=[beforeRead,read,afterRead,beforeMain,main,afterMain,beforeWrite,write,afterWrite];function getNodeName(n){return n?(n.nodeName||"").toLowerCase():null}function getWindow(n){if(n==null)return window;if(n.toString()!=="[object Window]"){var e=n.ownerDocument;return e&&e.defaultView||window}return n}function isElement$1(n){var e=getWindow(n).Element;return n instanceof e||n instanceof Element}function isHTMLElement(n){var e=getWindow(n).HTMLElement;return n instanceof e||n instanceof HTMLElement}function isShadowRoot(n){if(typeof ShadowRoot>"u")return!1;var e=getWindow(n).ShadowRoot;return n instanceof e||n instanceof ShadowRoot}function applyStyles(n){var e=n.state;Object.keys(e.elements).forEach(function(t){var s=e.styles[t]||{},i=e.attributes[t]||{},l=e.elements[t];!isHTMLElement(l)||!getNodeName(l)||(Object.assign(l.style,s),Object.keys(i).forEach(function(o){var r=i[o];r===!1?l.removeAttribute(o):l.setAttribute(o,r===!0?"":r)}))})}function effect$2(n){var e=n.state,t={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,t.popper),e.styles=t,e.elements.arrow&&Object.assign(e.elements.arrow.style,t.arrow),function(){Object.keys(e.elements).forEach(function(s){var i=e.elements[s],l=e.attributes[s]||{},o=Object.keys(e.styles.hasOwnProperty(s)?e.styles[s]:t[s]),r=o.reduce(function(c,Q){return c[Q]="",c},{});!isHTMLElement(i)||!getNodeName(i)||(Object.assign(i.style,r),Object.keys(l).forEach(function(c){i.removeAttribute(c)}))})}}const applyStyles$1={name:"applyStyles",enabled:!0,phase:"write",fn:applyStyles,effect:effect$2,requires:["computeStyles"]};function getBasePlacement(n){return n.split("-")[0]}var max=Math.max,min=Math.min,round=Math.round;function getUAString(){var n=navigator.userAgentData;return n!=null&&n.brands&&Array.isArray(n.brands)?n.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function isLayoutViewport(){return!/^((?!chrome|android).)*safari/i.test(getUAString())}function getBoundingClientRect(n,e,t){e===void 0&&(e=!1),t===void 0&&(t=!1);var s=n.getBoundingClientRect(),i=1,l=1;e&&isHTMLElement(n)&&(i=n.offsetWidth>0&&round(s.width)/n.offsetWidth||1,l=n.offsetHeight>0&&round(s.height)/n.offsetHeight||1);var o=isElement$1(n)?getWindow(n):window,r=o.visualViewport,c=!isLayoutViewport()&&t,Q=(s.left+(c&&r?r.offsetLeft:0))/i,a=(s.top+(c&&r?r.offsetTop:0))/l,B=s.width/i,F=s.height/l;return{width:B,height:F,top:a,right:Q+B,bottom:a+F,left:Q,x:Q,y:a}}function getLayoutRect(n){var e=getBoundingClientRect(n),t=n.offsetWidth,s=n.offsetHeight;return Math.abs(e.width-t)<=1&&(t=e.width),Math.abs(e.height-s)<=1&&(s=e.height),{x:n.offsetLeft,y:n.offsetTop,width:t,height:s}}function contains(n,e){var t=e.getRootNode&&e.getRootNode();if(n.contains(e))return!0;if(t&&isShadowRoot(t)){var s=e;do{if(s&&n.isSameNode(s))return!0;s=s.parentNode||s.host}while(s)}return!1}function getComputedStyle$1(n){return getWindow(n).getComputedStyle(n)}function isTableElement(n){return["table","td","th"].indexOf(getNodeName(n))>=0}function getDocumentElement(n){return((isElement$1(n)?n.ownerDocument:n.document)||window.document).documentElement}function getParentNode(n){return getNodeName(n)==="html"?n:n.assignedSlot||n.parentNode||(isShadowRoot(n)?n.host:null)||getDocumentElement(n)}function getTrueOffsetParent(n){return!isHTMLElement(n)||getComputedStyle$1(n).position==="fixed"?null:n.offsetParent}function getContainingBlock(n){var e=/firefox/i.test(getUAString()),t=/Trident/i.test(getUAString());if(t&&isHTMLElement(n)){var s=getComputedStyle$1(n);if(s.position==="fixed")return null}var i=getParentNode(n);for(isShadowRoot(i)&&(i=i.host);isHTMLElement(i)&&["html","body"].indexOf(getNodeName(i))<0;){var l=getComputedStyle$1(i);if(l.transform!=="none"||l.perspective!=="none"||l.contain==="paint"||["transform","perspective"].indexOf(l.willChange)!==-1||e&&l.willChange==="filter"||e&&l.filter&&l.filter!=="none")return i;i=i.parentNode}return null}function getOffsetParent(n){for(var e=getWindow(n),t=getTrueOffsetParent(n);t&&isTableElement(t)&&getComputedStyle$1(t).position==="static";)t=getTrueOffsetParent(t);return t&&(getNodeName(t)==="html"||getNodeName(t)==="body"&&getComputedStyle$1(t).position==="static")?e:t||getContainingBlock(n)||e}function getMainAxisFromPlacement(n){return["top","bottom"].indexOf(n)>=0?"x":"y"}function within(n,e,t){return max(n,min(e,t))}function withinMaxClamp(n,e,t){var s=within(n,e,t);return s>t?t:s}function getFreshSideObject(){return{top:0,right:0,bottom:0,left:0}}function mergePaddingObject(n){return Object.assign({},getFreshSideObject(),n)}function expandToHashMap(n,e){return e.reduce(function(t,s){return t[s]=n,t},{})}var toPaddingObject=function(e,t){return e=typeof e=="function"?e(Object.assign({},t.rects,{placement:t.placement})):e,mergePaddingObject(typeof e!="number"?e:expandToHashMap(e,basePlacements))};function arrow(n){var e,t=n.state,s=n.name,i=n.options,l=t.elements.arrow,o=t.modifiersData.popperOffsets,r=getBasePlacement(t.placement),c=getMainAxisFromPlacement(r),Q=[left,right].indexOf(r)>=0,a=Q?"height":"width";if(!(!l||!o)){var B=toPaddingObject(i.padding,t),F=getLayoutRect(l),I=c==="y"?top:left,g=c==="y"?bottom:right,u=t.rects.reference[a]+t.rects.reference[c]-o[c]-t.rects.popper[a],d=o[c]-t.rects.reference[c],U=getOffsetParent(l),m=U?c==="y"?U.clientHeight||0:U.clientWidth||0:0,E=u/2-d/2,C=B[I],b=m-F[a]-B[g],p=m/2-F[a]/2+E,h=within(C,p,b),A=c;t.modifiersData[s]=(e={},e[A]=h,e.centerOffset=h-p,e)}}function effect$1(n){var e=n.state,t=n.options,s=t.element,i=s===void 0?"[data-popper-arrow]":s;i!=null&&(typeof i=="string"&&(i=e.elements.popper.querySelector(i),!i)||contains(e.elements.popper,i)&&(e.elements.arrow=i))}const arrow$1={name:"arrow",enabled:!0,phase:"main",fn:arrow,effect:effect$1,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function getVariation(n){return n.split("-")[1]}var unsetSides={top:"auto",right:"auto",bottom:"auto",left:"auto"};function roundOffsetsByDPR(n,e){var t=n.x,s=n.y,i=e.devicePixelRatio||1;return{x:round(t*i)/i||0,y:round(s*i)/i||0}}function mapToStyles(n){var e,t=n.popper,s=n.popperRect,i=n.placement,l=n.variation,o=n.offsets,r=n.position,c=n.gpuAcceleration,Q=n.adaptive,a=n.roundOffsets,B=n.isFixed,F=o.x,I=F===void 0?0:F,g=o.y,u=g===void 0?0:g,d=typeof a=="function"?a({x:I,y:u}):{x:I,y:u};I=d.x,u=d.y;var U=o.hasOwnProperty("x"),m=o.hasOwnProperty("y"),E=left,C=top,b=window;if(Q){var p=getOffsetParent(t),h="clientHeight",A="clientWidth";if(p===getWindow(t)&&(p=getDocumentElement(t),getComputedStyle$1(p).position!=="static"&&r==="absolute"&&(h="scrollHeight",A="scrollWidth")),p=p,i===top||(i===left||i===right)&&l===end){C=bottom;var G=B&&p===b&&b.visualViewport?b.visualViewport.height:p[h];u-=G-s.height,u*=c?1:-1}if(i===left||(i===top||i===bottom)&&l===end){E=right;var V=B&&p===b&&b.visualViewport?b.visualViewport.width:p[A];I-=V-s.width,I*=c?1:-1}}var x=Object.assign({position:r},Q&&unsetSides),W=a===!0?roundOffsetsByDPR({x:I,y:u},getWindow(t)):{x:I,y:u};if(I=W.x,u=W.y,c){var Z;return Object.assign({},x,(Z={},Z[C]=m?"0":"",Z[E]=U?"0":"",Z.transform=(b.devicePixelRatio||1)<=1?"translate("+I+"px, "+u+"px)":"translate3d("+I+"px, "+u+"px, 0)",Z))}return Object.assign({},x,(e={},e[C]=m?u+"px":"",e[E]=U?I+"px":"",e.transform="",e))}function computeStyles(n){var e=n.state,t=n.options,s=t.gpuAcceleration,i=s===void 0?!0:s,l=t.adaptive,o=l===void 0?!0:l,r=t.roundOffsets,c=r===void 0?!0:r,Q={placement:getBasePlacement(e.placement),variation:getVariation(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:i,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,mapToStyles(Object.assign({},Q,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:o,roundOffsets:c})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,mapToStyles(Object.assign({},Q,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:c})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}const computeStyles$1={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:computeStyles,data:{}};var passive={passive:!0};function effect(n){var e=n.state,t=n.instance,s=n.options,i=s.scroll,l=i===void 0?!0:i,o=s.resize,r=o===void 0?!0:o,c=getWindow(e.elements.popper),Q=[].concat(e.scrollParents.reference,e.scrollParents.popper);return l&&Q.forEach(function(a){a.addEventListener("scroll",t.update,passive)}),r&&c.addEventListener("resize",t.update,passive),function(){l&&Q.forEach(function(a){a.removeEventListener("scroll",t.update,passive)}),r&&c.removeEventListener("resize",t.update,passive)}}const eventListeners={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect,data:{}};var hash$1={left:"right",right:"left",bottom:"top",top:"bottom"};function getOppositePlacement(n){return n.replace(/left|right|bottom|top/g,function(e){return hash$1[e]})}var hash={start:"end",end:"start"};function getOppositeVariationPlacement(n){return n.replace(/start|end/g,function(e){return hash[e]})}function getWindowScroll(n){var e=getWindow(n),t=e.pageXOffset,s=e.pageYOffset;return{scrollLeft:t,scrollTop:s}}function getWindowScrollBarX(n){return getBoundingClientRect(getDocumentElement(n)).left+getWindowScroll(n).scrollLeft}function getViewportRect(n,e){var t=getWindow(n),s=getDocumentElement(n),i=t.visualViewport,l=s.clientWidth,o=s.clientHeight,r=0,c=0;if(i){l=i.width,o=i.height;var Q=isLayoutViewport();(Q||!Q&&e==="fixed")&&(r=i.offsetLeft,c=i.offsetTop)}return{width:l,height:o,x:r+getWindowScrollBarX(n),y:c}}function getDocumentRect(n){var e,t=getDocumentElement(n),s=getWindowScroll(n),i=(e=n.ownerDocument)==null?void 0:e.body,l=max(t.scrollWidth,t.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),o=max(t.scrollHeight,t.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),r=-s.scrollLeft+getWindowScrollBarX(n),c=-s.scrollTop;return getComputedStyle$1(i||t).direction==="rtl"&&(r+=max(t.clientWidth,i?i.clientWidth:0)-l),{width:l,height:o,x:r,y:c}}function isScrollParent(n){var e=getComputedStyle$1(n),t=e.overflow,s=e.overflowX,i=e.overflowY;return/auto|scroll|overlay|hidden/.test(t+i+s)}function getScrollParent(n){return["html","body","#document"].indexOf(getNodeName(n))>=0?n.ownerDocument.body:isHTMLElement(n)&&isScrollParent(n)?n:getScrollParent(getParentNode(n))}function listScrollParents(n,e){var t;e===void 0&&(e=[]);var s=getScrollParent(n),i=s===((t=n.ownerDocument)==null?void 0:t.body),l=getWindow(s),o=i?[l].concat(l.visualViewport||[],isScrollParent(s)?s:[]):s,r=e.concat(o);return i?r:r.concat(listScrollParents(getParentNode(o)))}function rectToClientRect(n){return Object.assign({},n,{left:n.x,top:n.y,right:n.x+n.width,bottom:n.y+n.height})}function getInnerBoundingClientRect(n,e){var t=getBoundingClientRect(n,!1,e==="fixed");return t.top=t.top+n.clientTop,t.left=t.left+n.clientLeft,t.bottom=t.top+n.clientHeight,t.right=t.left+n.clientWidth,t.width=n.clientWidth,t.height=n.clientHeight,t.x=t.left,t.y=t.top,t}function getClientRectFromMixedType(n,e,t){return e===viewport?rectToClientRect(getViewportRect(n,t)):isElement$1(e)?getInnerBoundingClientRect(e,t):rectToClientRect(getDocumentRect(getDocumentElement(n)))}function getClippingParents(n){var e=listScrollParents(getParentNode(n)),t=["absolute","fixed"].indexOf(getComputedStyle$1(n).position)>=0,s=t&&isHTMLElement(n)?getOffsetParent(n):n;return isElement$1(s)?e.filter(function(i){return isElement$1(i)&&contains(i,s)&&getNodeName(i)!=="body"}):[]}function getClippingRect(n,e,t,s){var i=e==="clippingParents"?getClippingParents(n):[].concat(e),l=[].concat(i,[t]),o=l[0],r=l.reduce(function(c,Q){var a=getClientRectFromMixedType(n,Q,s);return c.top=max(a.top,c.top),c.right=min(a.right,c.right),c.bottom=min(a.bottom,c.bottom),c.left=max(a.left,c.left),c},getClientRectFromMixedType(n,o,s));return r.width=r.right-r.left,r.height=r.bottom-r.top,r.x=r.left,r.y=r.top,r}function computeOffsets(n){var e=n.reference,t=n.element,s=n.placement,i=s?getBasePlacement(s):null,l=s?getVariation(s):null,o=e.x+e.width/2-t.width/2,r=e.y+e.height/2-t.height/2,c;switch(i){case top:c={x:o,y:e.y-t.height};break;case bottom:c={x:o,y:e.y+e.height};break;case right:c={x:e.x+e.width,y:r};break;case left:c={x:e.x-t.width,y:r};break;default:c={x:e.x,y:e.y}}var Q=i?getMainAxisFromPlacement(i):null;if(Q!=null){var a=Q==="y"?"height":"width";switch(l){case start:c[Q]=c[Q]-(e[a]/2-t[a]/2);break;case end:c[Q]=c[Q]+(e[a]/2-t[a]/2);break}}return c}function detectOverflow(n,e){e===void 0&&(e={});var t=e,s=t.placement,i=s===void 0?n.placement:s,l=t.strategy,o=l===void 0?n.strategy:l,r=t.boundary,c=r===void 0?clippingParents:r,Q=t.rootBoundary,a=Q===void 0?viewport:Q,B=t.elementContext,F=B===void 0?popper:B,I=t.altBoundary,g=I===void 0?!1:I,u=t.padding,d=u===void 0?0:u,U=mergePaddingObject(typeof d!="number"?d:expandToHashMap(d,basePlacements)),m=F===popper?reference:popper,E=n.rects.popper,C=n.elements[g?m:F],b=getClippingRect(isElement$1(C)?C:C.contextElement||getDocumentElement(n.elements.popper),c,a,o),p=getBoundingClientRect(n.elements.reference),h=computeOffsets({reference:p,element:E,placement:i}),A=rectToClientRect(Object.assign({},E,h)),G=F===popper?A:p,V={top:b.top-G.top+U.top,bottom:G.bottom-b.bottom+U.bottom,left:b.left-G.left+U.left,right:G.right-b.right+U.right},x=n.modifiersData.offset;if(F===popper&&x){var W=x[i];Object.keys(V).forEach(function(Z){var R=[right,bottom].indexOf(Z)>=0?1:-1,S=[top,bottom].indexOf(Z)>=0?"y":"x";V[Z]+=W[S]*R})}return V}function computeAutoPlacement(n,e){e===void 0&&(e={});var t=e,s=t.placement,i=t.boundary,l=t.rootBoundary,o=t.padding,r=t.flipVariations,c=t.allowedAutoPlacements,Q=c===void 0?placements:c,a=getVariation(s),B=a?r?variationPlacements:variationPlacements.filter(function(g){return getVariation(g)===a}):basePlacements,F=B.filter(function(g){return Q.indexOf(g)>=0});F.length===0&&(F=B);var I=F.reduce(function(g,u){return g[u]=detectOverflow(n,{placement:u,boundary:i,rootBoundary:l,padding:o})[getBasePlacement(u)],g},{});return Object.keys(I).sort(function(g,u){return I[g]-I[u]})}function getExpandedFallbackPlacements(n){if(getBasePlacement(n)===auto)return[];var e=getOppositePlacement(n);return[getOppositeVariationPlacement(n),e,getOppositeVariationPlacement(e)]}function flip(n){var e=n.state,t=n.options,s=n.name;if(!e.modifiersData[s]._skip){for(var i=t.mainAxis,l=i===void 0?!0:i,o=t.altAxis,r=o===void 0?!0:o,c=t.fallbackPlacements,Q=t.padding,a=t.boundary,B=t.rootBoundary,F=t.altBoundary,I=t.flipVariations,g=I===void 0?!0:I,u=t.allowedAutoPlacements,d=e.options.placement,U=getBasePlacement(d),m=U===d,E=c||(m||!g?[getOppositePlacement(d)]:getExpandedFallbackPlacements(d)),C=[d].concat(E).reduce(function(v,N){return v.concat(getBasePlacement(N)===auto?computeAutoPlacement(e,{placement:N,boundary:a,rootBoundary:B,padding:Q,flipVariations:g,allowedAutoPlacements:u}):N)},[]),b=e.rects.reference,p=e.rects.popper,h=new Map,A=!0,G=C[0],V=0;V<C.length;V++){var x=C[V],W=getBasePlacement(x),Z=getVariation(x)===start,R=[top,bottom].indexOf(W)>=0,S=R?"width":"height",L=detectOverflow(e,{placement:x,boundary:a,rootBoundary:B,altBoundary:F,padding:Q}),f=R?Z?right:left:Z?bottom:top;b[S]>p[S]&&(f=getOppositePlacement(f));var _=getOppositePlacement(f),y=[];if(l&&y.push(L[W]<=0),r&&y.push(L[f]<=0,L[_]<=0),y.every(function(v){return v})){G=x,A=!1;break}h.set(x,y)}if(A)for(var H=g?3:1,w=function(N){var Y=C.find(function(k){var X=h.get(k);if(X)return X.slice(0,N).every(function(M){return M})});if(Y)return G=Y,"break"},D=H;D>0;D--){var J=w(D);if(J==="break")break}e.placement!==G&&(e.modifiersData[s]._skip=!0,e.placement=G,e.reset=!0)}}const flip$1={name:"flip",enabled:!0,phase:"main",fn:flip,requiresIfExists:["offset"],data:{_skip:!1}};function getSideOffsets(n,e,t){return t===void 0&&(t={x:0,y:0}),{top:n.top-e.height-t.y,right:n.right-e.width+t.x,bottom:n.bottom-e.height+t.y,left:n.left-e.width-t.x}}function isAnySideFullyClipped(n){return[top,right,bottom,left].some(function(e){return n[e]>=0})}function hide(n){var e=n.state,t=n.name,s=e.rects.reference,i=e.rects.popper,l=e.modifiersData.preventOverflow,o=detectOverflow(e,{elementContext:"reference"}),r=detectOverflow(e,{altBoundary:!0}),c=getSideOffsets(o,s),Q=getSideOffsets(r,i,l),a=isAnySideFullyClipped(c),B=isAnySideFullyClipped(Q);e.modifiersData[t]={referenceClippingOffsets:c,popperEscapeOffsets:Q,isReferenceHidden:a,hasPopperEscaped:B},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":a,"data-popper-escaped":B})}const hide$1={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:hide};function distanceAndSkiddingToXY(n,e,t){var s=getBasePlacement(n),i=[left,top].indexOf(s)>=0?-1:1,l=typeof t=="function"?t(Object.assign({},e,{placement:n})):t,o=l[0],r=l[1];return o=o||0,r=(r||0)*i,[left,right].indexOf(s)>=0?{x:r,y:o}:{x:o,y:r}}function offset(n){var e=n.state,t=n.options,s=n.name,i=t.offset,l=i===void 0?[0,0]:i,o=placements.reduce(function(a,B){return a[B]=distanceAndSkiddingToXY(B,e.rects,l),a},{}),r=o[e.placement],c=r.x,Q=r.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=c,e.modifiersData.popperOffsets.y+=Q),e.modifiersData[s]=o}const offset$1={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:offset};function popperOffsets(n){var e=n.state,t=n.name;e.modifiersData[t]=computeOffsets({reference:e.rects.reference,element:e.rects.popper,placement:e.placement})}const popperOffsets$1={name:"popperOffsets",enabled:!0,phase:"read",fn:popperOffsets,data:{}};function getAltAxis(n){return n==="x"?"y":"x"}function preventOverflow(n){var e=n.state,t=n.options,s=n.name,i=t.mainAxis,l=i===void 0?!0:i,o=t.altAxis,r=o===void 0?!1:o,c=t.boundary,Q=t.rootBoundary,a=t.altBoundary,B=t.padding,F=t.tether,I=F===void 0?!0:F,g=t.tetherOffset,u=g===void 0?0:g,d=detectOverflow(e,{boundary:c,rootBoundary:Q,padding:B,altBoundary:a}),U=getBasePlacement(e.placement),m=getVariation(e.placement),E=!m,C=getMainAxisFromPlacement(U),b=getAltAxis(C),p=e.modifiersData.popperOffsets,h=e.rects.reference,A=e.rects.popper,G=typeof u=="function"?u(Object.assign({},e.rects,{placement:e.placement})):u,V=typeof G=="number"?{mainAxis:G,altAxis:G}:Object.assign({mainAxis:0,altAxis:0},G),x=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,W={x:0,y:0};if(p){if(l){var Z,R=C==="y"?top:left,S=C==="y"?bottom:right,L=C==="y"?"height":"width",f=p[C],_=f+d[R],y=f-d[S],H=I?-A[L]/2:0,w=m===start?h[L]:A[L],D=m===start?-A[L]:-h[L],J=e.elements.arrow,v=I&&J?getLayoutRect(J):{width:0,height:0},N=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:getFreshSideObject(),Y=N[R],k=N[S],X=within(0,h[L],v[L]),M=E?h[L]/2-H-X-Y-V.mainAxis:w-X-Y-V.mainAxis,oe=E?-h[L]/2+H+X+k+V.mainAxis:D+X+k+V.mainAxis,z=e.elements.arrow&&getOffsetParent(e.elements.arrow),re=z?C==="y"?z.clientTop||0:z.clientLeft||0:0,P=(Z=x==null?void 0:x[C])!=null?Z:0,ae=f+M-P-re,ce=f+oe-P,j=within(I?min(_,ae):_,f,I?max(y,ce):y);p[C]=j,W[C]=j-f}if(r){var $,Qe=C==="x"?top:left,Be=C==="x"?bottom:right,T=p[b],O=b==="y"?"height":"width",q=T+d[Qe],ee=T-d[Be],K=[top,left].indexOf(U)!==-1,te=($=x==null?void 0:x[b])!=null?$:0,ne=K?q:T-h[O]-A[O]-te+V.altAxis,se=K?T+h[O]+A[O]-te-V.altAxis:ee,ie=I&&K?withinMaxClamp(ne,T,se):within(I?ne:q,T,I?se:ee);p[b]=ie,W[b]=ie-T}e.modifiersData[s]=W}}const preventOverflow$1={name:"preventOverflow",enabled:!0,phase:"main",fn:preventOverflow,requiresIfExists:["offset"]};function getHTMLElementScroll(n){return{scrollLeft:n.scrollLeft,scrollTop:n.scrollTop}}function getNodeScroll(n){return n===getWindow(n)||!isHTMLElement(n)?getWindowScroll(n):getHTMLElementScroll(n)}function isElementScaled(n){var e=n.getBoundingClientRect(),t=round(e.width)/n.offsetWidth||1,s=round(e.height)/n.offsetHeight||1;return t!==1||s!==1}function getCompositeRect(n,e,t){t===void 0&&(t=!1);var s=isHTMLElement(e),i=isHTMLElement(e)&&isElementScaled(e),l=getDocumentElement(e),o=getBoundingClientRect(n,i,t),r={scrollLeft:0,scrollTop:0},c={x:0,y:0};return(s||!s&&!t)&&((getNodeName(e)!=="body"||isScrollParent(l))&&(r=getNodeScroll(e)),isHTMLElement(e)?(c=getBoundingClientRect(e,!0),c.x+=e.clientLeft,c.y+=e.clientTop):l&&(c.x=getWindowScrollBarX(l))),{x:o.left+r.scrollLeft-c.x,y:o.top+r.scrollTop-c.y,width:o.width,height:o.height}}function order(n){var e=new Map,t=new Set,s=[];n.forEach(function(l){e.set(l.name,l)});function i(l){t.add(l.name);var o=[].concat(l.requires||[],l.requiresIfExists||[]);o.forEach(function(r){if(!t.has(r)){var c=e.get(r);c&&i(c)}}),s.push(l)}return n.forEach(function(l){t.has(l.name)||i(l)}),s}function orderModifiers(n){var e=order(n);return modifierPhases.reduce(function(t,s){return t.concat(e.filter(function(i){return i.phase===s}))},[])}function debounce(n){var e;return function(){return e||(e=new Promise(function(t){Promise.resolve().then(function(){e=void 0,t(n())})})),e}}function mergeByName(n){var e=n.reduce(function(t,s){var i=t[s.name];return t[s.name]=i?Object.assign({},i,s,{options:Object.assign({},i.options,s.options),data:Object.assign({},i.data,s.data)}):s,t},{});return Object.keys(e).map(function(t){return e[t]})}var DEFAULT_OPTIONS={placement:"bottom",modifiers:[],strategy:"absolute"};function areValidElements(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];return!e.some(function(s){return!(s&&typeof s.getBoundingClientRect=="function")})}function popperGenerator(n){n===void 0&&(n={});var e=n,t=e.defaultModifiers,s=t===void 0?[]:t,i=e.defaultOptions,l=i===void 0?DEFAULT_OPTIONS:i;return function(r,c,Q){Q===void 0&&(Q=l);var a={placement:"bottom",orderedModifiers:[],options:Object.assign({},DEFAULT_OPTIONS,l),modifiersData:{},elements:{reference:r,popper:c},attributes:{},styles:{}},B=[],F=!1,I={state:a,setOptions:function(U){var m=typeof U=="function"?U(a.options):U;u(),a.options=Object.assign({},l,a.options,m),a.scrollParents={reference:isElement$1(r)?listScrollParents(r):r.contextElement?listScrollParents(r.contextElement):[],popper:listScrollParents(c)};var E=orderModifiers(mergeByName([].concat(s,a.options.modifiers)));return a.orderedModifiers=E.filter(function(C){return C.enabled}),g(),I.update()},forceUpdate:function(){if(!F){var U=a.elements,m=U.reference,E=U.popper;if(areValidElements(m,E)){a.rects={reference:getCompositeRect(m,getOffsetParent(E),a.options.strategy==="fixed"),popper:getLayoutRect(E)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach(function(V){return a.modifiersData[V.name]=Object.assign({},V.data)});for(var C=0;C<a.orderedModifiers.length;C++){if(a.reset===!0){a.reset=!1,C=-1;continue}var b=a.orderedModifiers[C],p=b.fn,h=b.options,A=h===void 0?{}:h,G=b.name;typeof p=="function"&&(a=p({state:a,options:A,name:G,instance:I})||a)}}}},update:debounce(function(){return new Promise(function(d){I.forceUpdate(),d(a)})}),destroy:function(){u(),F=!0}};if(!areValidElements(r,c))return I;I.setOptions(Q).then(function(d){!F&&Q.onFirstUpdate&&Q.onFirstUpdate(d)});function g(){a.orderedModifiers.forEach(function(d){var U=d.name,m=d.options,E=m===void 0?{}:m,C=d.effect;if(typeof C=="function"){var b=C({state:a,name:U,instance:I,options:E}),p=function(){};B.push(b||p)}})}function u(){B.forEach(function(d){return d()}),B=[]}return I}}var createPopper$2=popperGenerator(),defaultModifiers$1=[eventListeners,popperOffsets$1,computeStyles$1,applyStyles$1],createPopper$1=popperGenerator({defaultModifiers:defaultModifiers$1}),defaultModifiers=[eventListeners,popperOffsets$1,computeStyles$1,applyStyles$1,offset$1,flip$1,preventOverflow$1,arrow$1,hide$1],createPopper=popperGenerator({defaultModifiers});const Popper=Object.freeze(Object.defineProperty({__proto__:null,afterMain,afterRead,afterWrite,applyStyles:applyStyles$1,arrow:arrow$1,auto,basePlacements,beforeMain,beforeRead,beforeWrite,bottom,clippingParents,computeStyles:computeStyles$1,createPopper,createPopperBase:createPopper$2,createPopperLite:createPopper$1,detectOverflow,end,eventListeners,flip:flip$1,hide:hide$1,left,main,modifierPhases,offset:offset$1,placements,popper,popperGenerator,popperOffsets:popperOffsets$1,preventOverflow:preventOverflow$1,read,reference,right,start,top,variationPlacements,viewport,write},Symbol.toStringTag,{value:"Module"}));/*!
  * Bootstrap v5.3.6 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */const elementMap=new Map,Data={set(n,e,t){elementMap.has(n)||elementMap.set(n,new Map);const s=elementMap.get(n);if(!s.has(e)&&s.size!==0){console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(s.keys())[0]}.`);return}s.set(e,t)},get(n,e){return elementMap.has(n)&&elementMap.get(n).get(e)||null},remove(n,e){if(!elementMap.has(n))return;const t=elementMap.get(n);t.delete(e),t.size===0&&elementMap.delete(n)}},MAX_UID=1e6,MILLISECONDS_MULTIPLIER=1e3,TRANSITION_END="transitionend",parseSelector=n=>(n&&window.CSS&&window.CSS.escape&&(n=n.replace(/#([^\s"#']+)/g,(e,t)=>`#${CSS.escape(t)}`)),n),toType=n=>n==null?`${n}`:Object.prototype.toString.call(n).match(/\s([a-z]+)/i)[1].toLowerCase(),getUID=n=>{do n+=Math.floor(Math.random()*MAX_UID);while(document.getElementById(n));return n},getTransitionDurationFromElement=n=>{if(!n)return 0;let{transitionDuration:e,transitionDelay:t}=window.getComputedStyle(n);const s=Number.parseFloat(e),i=Number.parseFloat(t);return!s&&!i?0:(e=e.split(",")[0],t=t.split(",")[0],(Number.parseFloat(e)+Number.parseFloat(t))*MILLISECONDS_MULTIPLIER)},triggerTransitionEnd=n=>{n.dispatchEvent(new Event(TRANSITION_END))},isElement=n=>!n||typeof n!="object"?!1:(typeof n.jquery<"u"&&(n=n[0]),typeof n.nodeType<"u"),getElement=n=>isElement(n)?n.jquery?n[0]:n:typeof n=="string"&&n.length>0?document.querySelector(parseSelector(n)):null,isVisible=n=>{if(!isElement(n)||n.getClientRects().length===0)return!1;const e=getComputedStyle(n).getPropertyValue("visibility")==="visible",t=n.closest("details:not([open])");if(!t)return e;if(t!==n){const s=n.closest("summary");if(s&&s.parentNode!==t||s===null)return!1}return e},isDisabled=n=>!n||n.nodeType!==Node.ELEMENT_NODE||n.classList.contains("disabled")?!0:typeof n.disabled<"u"?n.disabled:n.hasAttribute("disabled")&&n.getAttribute("disabled")!=="false",findShadowRoot=n=>{if(!document.documentElement.attachShadow)return null;if(typeof n.getRootNode=="function"){const e=n.getRootNode();return e instanceof ShadowRoot?e:null}return n instanceof ShadowRoot?n:n.parentNode?findShadowRoot(n.parentNode):null},noop$1=()=>{},reflow=n=>{n.offsetHeight},getjQuery=()=>window.jQuery&&!document.body.hasAttribute("data-bs-no-jquery")?window.jQuery:null,DOMContentLoadedCallbacks=[],onDOMContentLoaded=n=>{document.readyState==="loading"?(DOMContentLoadedCallbacks.length||document.addEventListener("DOMContentLoaded",()=>{for(const e of DOMContentLoadedCallbacks)e()}),DOMContentLoadedCallbacks.push(n)):n()},isRTL=()=>document.documentElement.dir==="rtl",defineJQueryPlugin=n=>{onDOMContentLoaded(()=>{const e=getjQuery();if(e){const t=n.NAME,s=e.fn[t];e.fn[t]=n.jQueryInterface,e.fn[t].Constructor=n,e.fn[t].noConflict=()=>(e.fn[t]=s,n.jQueryInterface)}})},execute=(n,e=[],t=n)=>typeof n=="function"?n.call(...e):t,executeAfterTransition=(n,e,t=!0)=>{if(!t){execute(n);return}const i=getTransitionDurationFromElement(e)+5;let l=!1;const o=({target:r})=>{r===e&&(l=!0,e.removeEventListener(TRANSITION_END,o),execute(n))};e.addEventListener(TRANSITION_END,o),setTimeout(()=>{l||triggerTransitionEnd(e)},i)},getNextActiveElement=(n,e,t,s)=>{const i=n.length;let l=n.indexOf(e);return l===-1?!t&&s?n[i-1]:n[0]:(l+=t?1:-1,s&&(l=(l+i)%i),n[Math.max(0,Math.min(l,i-1))])},namespaceRegex=/[^.]*(?=\..*)\.|.*/,stripNameRegex=/\..*/,stripUidRegex=/::\d+$/,eventRegistry={};let uidEvent=1;const customEvents={mouseenter:"mouseover",mouseleave:"mouseout"},nativeEvents=new Set(["click","dblclick","mouseup","mousedown","contextmenu","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","selectstart","selectend","keydown","keypress","keyup","orientationchange","touchstart","touchmove","touchend","touchcancel","pointerdown","pointermove","pointerup","pointerleave","pointercancel","gesturestart","gesturechange","gestureend","focus","blur","change","reset","select","submit","focusin","focusout","load","unload","beforeunload","resize","move","DOMContentLoaded","readystatechange","error","abort","scroll"]);function makeEventUid(n,e){return e&&`${e}::${uidEvent++}`||n.uidEvent||uidEvent++}function getElementEvents(n){const e=makeEventUid(n);return n.uidEvent=e,eventRegistry[e]=eventRegistry[e]||{},eventRegistry[e]}function bootstrapHandler(n,e){return function t(s){return hydrateObj(s,{delegateTarget:n}),t.oneOff&&EventHandler.off(n,s.type,e),e.apply(n,[s])}}function bootstrapDelegationHandler(n,e,t){return function s(i){const l=n.querySelectorAll(e);for(let{target:o}=i;o&&o!==this;o=o.parentNode)for(const r of l)if(r===o)return hydrateObj(i,{delegateTarget:o}),s.oneOff&&EventHandler.off(n,i.type,e,t),t.apply(o,[i])}}function findHandler(n,e,t=null){return Object.values(n).find(s=>s.callable===e&&s.delegationSelector===t)}function normalizeParameters(n,e,t){const s=typeof e=="string",i=s?t:e||t;let l=getTypeEvent(n);return nativeEvents.has(l)||(l=n),[s,i,l]}function addHandler(n,e,t,s,i){if(typeof e!="string"||!n)return;let[l,o,r]=normalizeParameters(e,t,s);e in customEvents&&(o=(g=>function(u){if(!u.relatedTarget||u.relatedTarget!==u.delegateTarget&&!u.delegateTarget.contains(u.relatedTarget))return g.call(this,u)})(o));const c=getElementEvents(n),Q=c[r]||(c[r]={}),a=findHandler(Q,o,l?t:null);if(a){a.oneOff=a.oneOff&&i;return}const B=makeEventUid(o,e.replace(namespaceRegex,"")),F=l?bootstrapDelegationHandler(n,t,o):bootstrapHandler(n,o);F.delegationSelector=l?t:null,F.callable=o,F.oneOff=i,F.uidEvent=B,Q[B]=F,n.addEventListener(r,F,l)}function removeHandler(n,e,t,s,i){const l=findHandler(e[t],s,i);l&&(n.removeEventListener(t,l,!!i),delete e[t][l.uidEvent])}function removeNamespacedHandlers(n,e,t,s){const i=e[t]||{};for(const[l,o]of Object.entries(i))l.includes(s)&&removeHandler(n,e,t,o.callable,o.delegationSelector)}function getTypeEvent(n){return n=n.replace(stripNameRegex,""),customEvents[n]||n}const EventHandler={on(n,e,t,s){addHandler(n,e,t,s,!1)},one(n,e,t,s){addHandler(n,e,t,s,!0)},off(n,e,t,s){if(typeof e!="string"||!n)return;const[i,l,o]=normalizeParameters(e,t,s),r=o!==e,c=getElementEvents(n),Q=c[o]||{},a=e.startsWith(".");if(typeof l<"u"){if(!Object.keys(Q).length)return;removeHandler(n,c,o,l,i?t:null);return}if(a)for(const B of Object.keys(c))removeNamespacedHandlers(n,c,B,e.slice(1));for(const[B,F]of Object.entries(Q)){const I=B.replace(stripUidRegex,"");(!r||e.includes(I))&&removeHandler(n,c,o,F.callable,F.delegationSelector)}},trigger(n,e,t){if(typeof e!="string"||!n)return null;const s=getjQuery(),i=getTypeEvent(e),l=e!==i;let o=null,r=!0,c=!0,Q=!1;l&&s&&(o=s.Event(e,t),s(n).trigger(o),r=!o.isPropagationStopped(),c=!o.isImmediatePropagationStopped(),Q=o.isDefaultPrevented());const a=hydrateObj(new Event(e,{bubbles:r,cancelable:!0}),t);return Q&&a.preventDefault(),c&&n.dispatchEvent(a),a.defaultPrevented&&o&&o.preventDefault(),a}};function hydrateObj(n,e={}){for(const[t,s]of Object.entries(e))try{n[t]=s}catch{Object.defineProperty(n,t,{configurable:!0,get(){return s}})}return n}function normalizeData(n){if(n==="true")return!0;if(n==="false")return!1;if(n===Number(n).toString())return Number(n);if(n===""||n==="null")return null;if(typeof n!="string")return n;try{return JSON.parse(decodeURIComponent(n))}catch{return n}}function normalizeDataKey(n){return n.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}const Manipulator={setDataAttribute(n,e,t){n.setAttribute(`data-bs-${normalizeDataKey(e)}`,t)},removeDataAttribute(n,e){n.removeAttribute(`data-bs-${normalizeDataKey(e)}`)},getDataAttributes(n){if(!n)return{};const e={},t=Object.keys(n.dataset).filter(s=>s.startsWith("bs")&&!s.startsWith("bsConfig"));for(const s of t){let i=s.replace(/^bs/,"");i=i.charAt(0).toLowerCase()+i.slice(1),e[i]=normalizeData(n.dataset[s])}return e},getDataAttribute(n,e){return normalizeData(n.getAttribute(`data-bs-${normalizeDataKey(e)}`))}};class Config{static get Default(){return{}}static get DefaultType(){return{}}static get NAME(){throw new Error('You have to implement the static method "NAME", for each component!')}_getConfig(e){return e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e}_mergeConfigObj(e,t){const s=isElement(t)?Manipulator.getDataAttribute(t,"config"):{};return{...this.constructor.Default,...typeof s=="object"?s:{},...isElement(t)?Manipulator.getDataAttributes(t):{},...typeof e=="object"?e:{}}}_typeCheckConfig(e,t=this.constructor.DefaultType){for(const[s,i]of Object.entries(t)){const l=e[s],o=isElement(l)?"element":toType(l);if(!new RegExp(i).test(o))throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${o}" but expected type "${i}".`)}}}const VERSION$2="5.3.6";class BaseComponent extends Config{constructor(e,t){super(),e=getElement(e),e&&(this._element=e,this._config=this._getConfig(t),Data.set(this._element,this.constructor.DATA_KEY,this))}dispose(){Data.remove(this._element,this.constructor.DATA_KEY),EventHandler.off(this._element,this.constructor.EVENT_KEY);for(const e of Object.getOwnPropertyNames(this))this[e]=null}_queueCallback(e,t,s=!0){executeAfterTransition(e,t,s)}_getConfig(e){return e=this._mergeConfigObj(e,this._element),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}static getInstance(e){return Data.get(getElement(e),this.DATA_KEY)}static getOrCreateInstance(e,t={}){return this.getInstance(e)||new this(e,typeof t=="object"?t:null)}static get VERSION(){return VERSION$2}static get DATA_KEY(){return`bs.${this.NAME}`}static get EVENT_KEY(){return`.${this.DATA_KEY}`}static eventName(e){return`${e}${this.EVENT_KEY}`}}const getSelector=n=>{let e=n.getAttribute("data-bs-target");if(!e||e==="#"){let t=n.getAttribute("href");if(!t||!t.includes("#")&&!t.startsWith("."))return null;t.includes("#")&&!t.startsWith("#")&&(t=`#${t.split("#")[1]}`),e=t&&t!=="#"?t.trim():null}return e?e.split(",").map(t=>parseSelector(t)).join(","):null},SelectorEngine={find(n,e=document.documentElement){return[].concat(...Element.prototype.querySelectorAll.call(e,n))},findOne(n,e=document.documentElement){return Element.prototype.querySelector.call(e,n)},children(n,e){return[].concat(...n.children).filter(t=>t.matches(e))},parents(n,e){const t=[];let s=n.parentNode.closest(e);for(;s;)t.push(s),s=s.parentNode.closest(e);return t},prev(n,e){let t=n.previousElementSibling;for(;t;){if(t.matches(e))return[t];t=t.previousElementSibling}return[]},next(n,e){let t=n.nextElementSibling;for(;t;){if(t.matches(e))return[t];t=t.nextElementSibling}return[]},focusableChildren(n){const e=["a","button","input","textarea","select","details","[tabindex]",'[contenteditable="true"]'].map(t=>`${t}:not([tabindex^="-"])`).join(",");return this.find(e,n).filter(t=>!isDisabled(t)&&isVisible(t))},getSelectorFromElement(n){const e=getSelector(n);return e&&SelectorEngine.findOne(e)?e:null},getElementFromSelector(n){const e=getSelector(n);return e?SelectorEngine.findOne(e):null},getMultipleElementsFromSelector(n){const e=getSelector(n);return e?SelectorEngine.find(e):[]}},enableDismissTrigger=(n,e="hide")=>{const t=`click.dismiss${n.EVENT_KEY}`,s=n.NAME;EventHandler.on(document,t,`[data-bs-dismiss="${s}"]`,function(i){if(["A","AREA"].includes(this.tagName)&&i.preventDefault(),isDisabled(this))return;const l=SelectorEngine.getElementFromSelector(this)||this.closest(`.${s}`);n.getOrCreateInstance(l)[e]()})},NAME$f="alert",DATA_KEY$a="bs.alert",EVENT_KEY$b=`.${DATA_KEY$a}`,EVENT_CLOSE=`close${EVENT_KEY$b}`,EVENT_CLOSED=`closed${EVENT_KEY$b}`,CLASS_NAME_FADE$5="fade",CLASS_NAME_SHOW$8="show";class Alert extends BaseComponent{static get NAME(){return NAME$f}close(){if(EventHandler.trigger(this._element,EVENT_CLOSE).defaultPrevented)return;this._element.classList.remove(CLASS_NAME_SHOW$8);const t=this._element.classList.contains(CLASS_NAME_FADE$5);this._queueCallback(()=>this._destroyElement(),this._element,t)}_destroyElement(){this._element.remove(),EventHandler.trigger(this._element,EVENT_CLOSED),this.dispose()}static jQueryInterface(e){return this.each(function(){const t=Alert.getOrCreateInstance(this);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e](this)}})}}enableDismissTrigger(Alert,"close");defineJQueryPlugin(Alert);const NAME$e="button",DATA_KEY$9="bs.button",EVENT_KEY$a=`.${DATA_KEY$9}`,DATA_API_KEY$6=".data-api",CLASS_NAME_ACTIVE$3="active",SELECTOR_DATA_TOGGLE$5='[data-bs-toggle="button"]',EVENT_CLICK_DATA_API$6=`click${EVENT_KEY$a}${DATA_API_KEY$6}`;class Button extends BaseComponent{static get NAME(){return NAME$e}toggle(){this._element.setAttribute("aria-pressed",this._element.classList.toggle(CLASS_NAME_ACTIVE$3))}static jQueryInterface(e){return this.each(function(){const t=Button.getOrCreateInstance(this);e==="toggle"&&t[e]()})}}EventHandler.on(document,EVENT_CLICK_DATA_API$6,SELECTOR_DATA_TOGGLE$5,n=>{n.preventDefault();const e=n.target.closest(SELECTOR_DATA_TOGGLE$5);Button.getOrCreateInstance(e).toggle()});defineJQueryPlugin(Button);const NAME$d="swipe",EVENT_KEY$9=".bs.swipe",EVENT_TOUCHSTART=`touchstart${EVENT_KEY$9}`,EVENT_TOUCHMOVE=`touchmove${EVENT_KEY$9}`,EVENT_TOUCHEND=`touchend${EVENT_KEY$9}`,EVENT_POINTERDOWN=`pointerdown${EVENT_KEY$9}`,EVENT_POINTERUP=`pointerup${EVENT_KEY$9}`,POINTER_TYPE_TOUCH="touch",POINTER_TYPE_PEN="pen",CLASS_NAME_POINTER_EVENT="pointer-event",SWIPE_THRESHOLD=40,Default$c={endCallback:null,leftCallback:null,rightCallback:null},DefaultType$c={endCallback:"(function|null)",leftCallback:"(function|null)",rightCallback:"(function|null)"};class Swipe extends Config{constructor(e,t){super(),this._element=e,!(!e||!Swipe.isSupported())&&(this._config=this._getConfig(t),this._deltaX=0,this._supportPointerEvents=!!window.PointerEvent,this._initEvents())}static get Default(){return Default$c}static get DefaultType(){return DefaultType$c}static get NAME(){return NAME$d}dispose(){EventHandler.off(this._element,EVENT_KEY$9)}_start(e){if(!this._supportPointerEvents){this._deltaX=e.touches[0].clientX;return}this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX)}_end(e){this._eventIsPointerPenTouch(e)&&(this._deltaX=e.clientX-this._deltaX),this._handleSwipe(),execute(this._config.endCallback)}_move(e){this._deltaX=e.touches&&e.touches.length>1?0:e.touches[0].clientX-this._deltaX}_handleSwipe(){const e=Math.abs(this._deltaX);if(e<=SWIPE_THRESHOLD)return;const t=e/this._deltaX;this._deltaX=0,t&&execute(t>0?this._config.rightCallback:this._config.leftCallback)}_initEvents(){this._supportPointerEvents?(EventHandler.on(this._element,EVENT_POINTERDOWN,e=>this._start(e)),EventHandler.on(this._element,EVENT_POINTERUP,e=>this._end(e)),this._element.classList.add(CLASS_NAME_POINTER_EVENT)):(EventHandler.on(this._element,EVENT_TOUCHSTART,e=>this._start(e)),EventHandler.on(this._element,EVENT_TOUCHMOVE,e=>this._move(e)),EventHandler.on(this._element,EVENT_TOUCHEND,e=>this._end(e)))}_eventIsPointerPenTouch(e){return this._supportPointerEvents&&(e.pointerType===POINTER_TYPE_PEN||e.pointerType===POINTER_TYPE_TOUCH)}static isSupported(){return"ontouchstart"in document.documentElement||navigator.maxTouchPoints>0}}const NAME$c="carousel",DATA_KEY$8="bs.carousel",EVENT_KEY$8=`.${DATA_KEY$8}`,DATA_API_KEY$5=".data-api",ARROW_LEFT_KEY$1="ArrowLeft",ARROW_RIGHT_KEY$1="ArrowRight",TOUCHEVENT_COMPAT_WAIT=500,ORDER_NEXT="next",ORDER_PREV="prev",DIRECTION_LEFT="left",DIRECTION_RIGHT="right",EVENT_SLIDE=`slide${EVENT_KEY$8}`,EVENT_SLID=`slid${EVENT_KEY$8}`,EVENT_KEYDOWN$1=`keydown${EVENT_KEY$8}`,EVENT_MOUSEENTER$1=`mouseenter${EVENT_KEY$8}`,EVENT_MOUSELEAVE$1=`mouseleave${EVENT_KEY$8}`,EVENT_DRAG_START=`dragstart${EVENT_KEY$8}`,EVENT_LOAD_DATA_API$3=`load${EVENT_KEY$8}${DATA_API_KEY$5}`,EVENT_CLICK_DATA_API$5=`click${EVENT_KEY$8}${DATA_API_KEY$5}`,CLASS_NAME_CAROUSEL="carousel",CLASS_NAME_ACTIVE$2="active",CLASS_NAME_SLIDE="slide",CLASS_NAME_END="carousel-item-end",CLASS_NAME_START="carousel-item-start",CLASS_NAME_NEXT="carousel-item-next",CLASS_NAME_PREV="carousel-item-prev",SELECTOR_ACTIVE=".active",SELECTOR_ITEM=".carousel-item",SELECTOR_ACTIVE_ITEM=SELECTOR_ACTIVE+SELECTOR_ITEM,SELECTOR_ITEM_IMG=".carousel-item img",SELECTOR_INDICATORS=".carousel-indicators",SELECTOR_DATA_SLIDE="[data-bs-slide], [data-bs-slide-to]",SELECTOR_DATA_RIDE='[data-bs-ride="carousel"]',KEY_TO_DIRECTION={[ARROW_LEFT_KEY$1]:DIRECTION_RIGHT,[ARROW_RIGHT_KEY$1]:DIRECTION_LEFT},Default$b={interval:5e3,keyboard:!0,pause:"hover",ride:!1,touch:!0,wrap:!0},DefaultType$b={interval:"(number|boolean)",keyboard:"boolean",pause:"(string|boolean)",ride:"(boolean|string)",touch:"boolean",wrap:"boolean"};class Carousel extends BaseComponent{constructor(e,t){super(e,t),this._interval=null,this._activeElement=null,this._isSliding=!1,this.touchTimeout=null,this._swipeHelper=null,this._indicatorsElement=SelectorEngine.findOne(SELECTOR_INDICATORS,this._element),this._addEventListeners(),this._config.ride===CLASS_NAME_CAROUSEL&&this.cycle()}static get Default(){return Default$b}static get DefaultType(){return DefaultType$b}static get NAME(){return NAME$c}next(){this._slide(ORDER_NEXT)}nextWhenVisible(){!document.hidden&&isVisible(this._element)&&this.next()}prev(){this._slide(ORDER_PREV)}pause(){this._isSliding&&triggerTransitionEnd(this._element),this._clearInterval()}cycle(){this._clearInterval(),this._updateInterval(),this._interval=setInterval(()=>this.nextWhenVisible(),this._config.interval)}_maybeEnableCycle(){if(this._config.ride){if(this._isSliding){EventHandler.one(this._element,EVENT_SLID,()=>this.cycle());return}this.cycle()}}to(e){const t=this._getItems();if(e>t.length-1||e<0)return;if(this._isSliding){EventHandler.one(this._element,EVENT_SLID,()=>this.to(e));return}const s=this._getItemIndex(this._getActive());if(s===e)return;const i=e>s?ORDER_NEXT:ORDER_PREV;this._slide(i,t[e])}dispose(){this._swipeHelper&&this._swipeHelper.dispose(),super.dispose()}_configAfterMerge(e){return e.defaultInterval=e.interval,e}_addEventListeners(){this._config.keyboard&&EventHandler.on(this._element,EVENT_KEYDOWN$1,e=>this._keydown(e)),this._config.pause==="hover"&&(EventHandler.on(this._element,EVENT_MOUSEENTER$1,()=>this.pause()),EventHandler.on(this._element,EVENT_MOUSELEAVE$1,()=>this._maybeEnableCycle())),this._config.touch&&Swipe.isSupported()&&this._addTouchEventListeners()}_addTouchEventListeners(){for(const s of SelectorEngine.find(SELECTOR_ITEM_IMG,this._element))EventHandler.on(s,EVENT_DRAG_START,i=>i.preventDefault());const t={leftCallback:()=>this._slide(this._directionToOrder(DIRECTION_LEFT)),rightCallback:()=>this._slide(this._directionToOrder(DIRECTION_RIGHT)),endCallback:()=>{this._config.pause==="hover"&&(this.pause(),this.touchTimeout&&clearTimeout(this.touchTimeout),this.touchTimeout=setTimeout(()=>this._maybeEnableCycle(),TOUCHEVENT_COMPAT_WAIT+this._config.interval))}};this._swipeHelper=new Swipe(this._element,t)}_keydown(e){if(/input|textarea/i.test(e.target.tagName))return;const t=KEY_TO_DIRECTION[e.key];t&&(e.preventDefault(),this._slide(this._directionToOrder(t)))}_getItemIndex(e){return this._getItems().indexOf(e)}_setActiveIndicatorElement(e){if(!this._indicatorsElement)return;const t=SelectorEngine.findOne(SELECTOR_ACTIVE,this._indicatorsElement);t.classList.remove(CLASS_NAME_ACTIVE$2),t.removeAttribute("aria-current");const s=SelectorEngine.findOne(`[data-bs-slide-to="${e}"]`,this._indicatorsElement);s&&(s.classList.add(CLASS_NAME_ACTIVE$2),s.setAttribute("aria-current","true"))}_updateInterval(){const e=this._activeElement||this._getActive();if(!e)return;const t=Number.parseInt(e.getAttribute("data-bs-interval"),10);this._config.interval=t||this._config.defaultInterval}_slide(e,t=null){if(this._isSliding)return;const s=this._getActive(),i=e===ORDER_NEXT,l=t||getNextActiveElement(this._getItems(),s,i,this._config.wrap);if(l===s)return;const o=this._getItemIndex(l),r=I=>EventHandler.trigger(this._element,I,{relatedTarget:l,direction:this._orderToDirection(e),from:this._getItemIndex(s),to:o});if(r(EVENT_SLIDE).defaultPrevented||!s||!l)return;const Q=!!this._interval;this.pause(),this._isSliding=!0,this._setActiveIndicatorElement(o),this._activeElement=l;const a=i?CLASS_NAME_START:CLASS_NAME_END,B=i?CLASS_NAME_NEXT:CLASS_NAME_PREV;l.classList.add(B),reflow(l),s.classList.add(a),l.classList.add(a);const F=()=>{l.classList.remove(a,B),l.classList.add(CLASS_NAME_ACTIVE$2),s.classList.remove(CLASS_NAME_ACTIVE$2,B,a),this._isSliding=!1,r(EVENT_SLID)};this._queueCallback(F,s,this._isAnimated()),Q&&this.cycle()}_isAnimated(){return this._element.classList.contains(CLASS_NAME_SLIDE)}_getActive(){return SelectorEngine.findOne(SELECTOR_ACTIVE_ITEM,this._element)}_getItems(){return SelectorEngine.find(SELECTOR_ITEM,this._element)}_clearInterval(){this._interval&&(clearInterval(this._interval),this._interval=null)}_directionToOrder(e){return isRTL()?e===DIRECTION_LEFT?ORDER_PREV:ORDER_NEXT:e===DIRECTION_LEFT?ORDER_NEXT:ORDER_PREV}_orderToDirection(e){return isRTL()?e===ORDER_PREV?DIRECTION_LEFT:DIRECTION_RIGHT:e===ORDER_PREV?DIRECTION_RIGHT:DIRECTION_LEFT}static jQueryInterface(e){return this.each(function(){const t=Carousel.getOrCreateInstance(this,e);if(typeof e=="number"){t.to(e);return}if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e]()}})}}EventHandler.on(document,EVENT_CLICK_DATA_API$5,SELECTOR_DATA_SLIDE,function(n){const e=SelectorEngine.getElementFromSelector(this);if(!e||!e.classList.contains(CLASS_NAME_CAROUSEL))return;n.preventDefault();const t=Carousel.getOrCreateInstance(e),s=this.getAttribute("data-bs-slide-to");if(s){t.to(s),t._maybeEnableCycle();return}if(Manipulator.getDataAttribute(this,"slide")==="next"){t.next(),t._maybeEnableCycle();return}t.prev(),t._maybeEnableCycle()});EventHandler.on(window,EVENT_LOAD_DATA_API$3,()=>{const n=SelectorEngine.find(SELECTOR_DATA_RIDE);for(const e of n)Carousel.getOrCreateInstance(e)});defineJQueryPlugin(Carousel);const NAME$b="collapse",DATA_KEY$7="bs.collapse",EVENT_KEY$7=`.${DATA_KEY$7}`,DATA_API_KEY$4=".data-api",EVENT_SHOW$6=`show${EVENT_KEY$7}`,EVENT_SHOWN$6=`shown${EVENT_KEY$7}`,EVENT_HIDE$6=`hide${EVENT_KEY$7}`,EVENT_HIDDEN$6=`hidden${EVENT_KEY$7}`,EVENT_CLICK_DATA_API$4=`click${EVENT_KEY$7}${DATA_API_KEY$4}`,CLASS_NAME_SHOW$7="show",CLASS_NAME_COLLAPSE="collapse",CLASS_NAME_COLLAPSING="collapsing",CLASS_NAME_COLLAPSED="collapsed",CLASS_NAME_DEEPER_CHILDREN=`:scope .${CLASS_NAME_COLLAPSE} .${CLASS_NAME_COLLAPSE}`,CLASS_NAME_HORIZONTAL="collapse-horizontal",WIDTH="width",HEIGHT="height",SELECTOR_ACTIVES=".collapse.show, .collapse.collapsing",SELECTOR_DATA_TOGGLE$4='[data-bs-toggle="collapse"]',Default$a={parent:null,toggle:!0},DefaultType$a={parent:"(null|element)",toggle:"boolean"};class Collapse extends BaseComponent{constructor(e,t){super(e,t),this._isTransitioning=!1,this._triggerArray=[];const s=SelectorEngine.find(SELECTOR_DATA_TOGGLE$4);for(const i of s){const l=SelectorEngine.getSelectorFromElement(i),o=SelectorEngine.find(l).filter(r=>r===this._element);l!==null&&o.length&&this._triggerArray.push(i)}this._initializeChildren(),this._config.parent||this._addAriaAndCollapsedClass(this._triggerArray,this._isShown()),this._config.toggle&&this.toggle()}static get Default(){return Default$a}static get DefaultType(){return DefaultType$a}static get NAME(){return NAME$b}toggle(){this._isShown()?this.hide():this.show()}show(){if(this._isTransitioning||this._isShown())return;let e=[];if(this._config.parent&&(e=this._getFirstLevelChildren(SELECTOR_ACTIVES).filter(r=>r!==this._element).map(r=>Collapse.getOrCreateInstance(r,{toggle:!1}))),e.length&&e[0]._isTransitioning||EventHandler.trigger(this._element,EVENT_SHOW$6).defaultPrevented)return;for(const r of e)r.hide();const s=this._getDimension();this._element.classList.remove(CLASS_NAME_COLLAPSE),this._element.classList.add(CLASS_NAME_COLLAPSING),this._element.style[s]=0,this._addAriaAndCollapsedClass(this._triggerArray,!0),this._isTransitioning=!0;const i=()=>{this._isTransitioning=!1,this._element.classList.remove(CLASS_NAME_COLLAPSING),this._element.classList.add(CLASS_NAME_COLLAPSE,CLASS_NAME_SHOW$7),this._element.style[s]="",EventHandler.trigger(this._element,EVENT_SHOWN$6)},o=`scroll${s[0].toUpperCase()+s.slice(1)}`;this._queueCallback(i,this._element,!0),this._element.style[s]=`${this._element[o]}px`}hide(){if(this._isTransitioning||!this._isShown()||EventHandler.trigger(this._element,EVENT_HIDE$6).defaultPrevented)return;const t=this._getDimension();this._element.style[t]=`${this._element.getBoundingClientRect()[t]}px`,reflow(this._element),this._element.classList.add(CLASS_NAME_COLLAPSING),this._element.classList.remove(CLASS_NAME_COLLAPSE,CLASS_NAME_SHOW$7);for(const i of this._triggerArray){const l=SelectorEngine.getElementFromSelector(i);l&&!this._isShown(l)&&this._addAriaAndCollapsedClass([i],!1)}this._isTransitioning=!0;const s=()=>{this._isTransitioning=!1,this._element.classList.remove(CLASS_NAME_COLLAPSING),this._element.classList.add(CLASS_NAME_COLLAPSE),EventHandler.trigger(this._element,EVENT_HIDDEN$6)};this._element.style[t]="",this._queueCallback(s,this._element,!0)}_isShown(e=this._element){return e.classList.contains(CLASS_NAME_SHOW$7)}_configAfterMerge(e){return e.toggle=!!e.toggle,e.parent=getElement(e.parent),e}_getDimension(){return this._element.classList.contains(CLASS_NAME_HORIZONTAL)?WIDTH:HEIGHT}_initializeChildren(){if(!this._config.parent)return;const e=this._getFirstLevelChildren(SELECTOR_DATA_TOGGLE$4);for(const t of e){const s=SelectorEngine.getElementFromSelector(t);s&&this._addAriaAndCollapsedClass([t],this._isShown(s))}}_getFirstLevelChildren(e){const t=SelectorEngine.find(CLASS_NAME_DEEPER_CHILDREN,this._config.parent);return SelectorEngine.find(e,this._config.parent).filter(s=>!t.includes(s))}_addAriaAndCollapsedClass(e,t){if(e.length)for(const s of e)s.classList.toggle(CLASS_NAME_COLLAPSED,!t),s.setAttribute("aria-expanded",t)}static jQueryInterface(e){const t={};return typeof e=="string"&&/show|hide/.test(e)&&(t.toggle=!1),this.each(function(){const s=Collapse.getOrCreateInstance(this,t);if(typeof e=="string"){if(typeof s[e]>"u")throw new TypeError(`No method named "${e}"`);s[e]()}})}}EventHandler.on(document,EVENT_CLICK_DATA_API$4,SELECTOR_DATA_TOGGLE$4,function(n){(n.target.tagName==="A"||n.delegateTarget&&n.delegateTarget.tagName==="A")&&n.preventDefault();for(const e of SelectorEngine.getMultipleElementsFromSelector(this))Collapse.getOrCreateInstance(e,{toggle:!1}).toggle()});defineJQueryPlugin(Collapse);const NAME$a="dropdown",DATA_KEY$6="bs.dropdown",EVENT_KEY$6=`.${DATA_KEY$6}`,DATA_API_KEY$3=".data-api",ESCAPE_KEY$2="Escape",TAB_KEY$1="Tab",ARROW_UP_KEY$1="ArrowUp",ARROW_DOWN_KEY$1="ArrowDown",RIGHT_MOUSE_BUTTON=2,EVENT_HIDE$5=`hide${EVENT_KEY$6}`,EVENT_HIDDEN$5=`hidden${EVENT_KEY$6}`,EVENT_SHOW$5=`show${EVENT_KEY$6}`,EVENT_SHOWN$5=`shown${EVENT_KEY$6}`,EVENT_CLICK_DATA_API$3=`click${EVENT_KEY$6}${DATA_API_KEY$3}`,EVENT_KEYDOWN_DATA_API=`keydown${EVENT_KEY$6}${DATA_API_KEY$3}`,EVENT_KEYUP_DATA_API=`keyup${EVENT_KEY$6}${DATA_API_KEY$3}`,CLASS_NAME_SHOW$6="show",CLASS_NAME_DROPUP="dropup",CLASS_NAME_DROPEND="dropend",CLASS_NAME_DROPSTART="dropstart",CLASS_NAME_DROPUP_CENTER="dropup-center",CLASS_NAME_DROPDOWN_CENTER="dropdown-center",SELECTOR_DATA_TOGGLE$3='[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',SELECTOR_DATA_TOGGLE_SHOWN=`${SELECTOR_DATA_TOGGLE$3}.${CLASS_NAME_SHOW$6}`,SELECTOR_MENU=".dropdown-menu",SELECTOR_NAVBAR=".navbar",SELECTOR_NAVBAR_NAV=".navbar-nav",SELECTOR_VISIBLE_ITEMS=".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",PLACEMENT_TOP=isRTL()?"top-end":"top-start",PLACEMENT_TOPEND=isRTL()?"top-start":"top-end",PLACEMENT_BOTTOM=isRTL()?"bottom-end":"bottom-start",PLACEMENT_BOTTOMEND=isRTL()?"bottom-start":"bottom-end",PLACEMENT_RIGHT=isRTL()?"left-start":"right-start",PLACEMENT_LEFT=isRTL()?"right-start":"left-start",PLACEMENT_TOPCENTER="top",PLACEMENT_BOTTOMCENTER="bottom",Default$9={autoClose:!0,boundary:"clippingParents",display:"dynamic",offset:[0,2],popperConfig:null,reference:"toggle"},DefaultType$9={autoClose:"(boolean|string)",boundary:"(string|element)",display:"string",offset:"(array|string|function)",popperConfig:"(null|object|function)",reference:"(string|element|object)"};class Dropdown extends BaseComponent{constructor(e,t){super(e,t),this._popper=null,this._parent=this._element.parentNode,this._menu=SelectorEngine.next(this._element,SELECTOR_MENU)[0]||SelectorEngine.prev(this._element,SELECTOR_MENU)[0]||SelectorEngine.findOne(SELECTOR_MENU,this._parent),this._inNavbar=this._detectNavbar()}static get Default(){return Default$9}static get DefaultType(){return DefaultType$9}static get NAME(){return NAME$a}toggle(){return this._isShown()?this.hide():this.show()}show(){if(isDisabled(this._element)||this._isShown())return;const e={relatedTarget:this._element};if(!EventHandler.trigger(this._element,EVENT_SHOW$5,e).defaultPrevented){if(this._createPopper(),"ontouchstart"in document.documentElement&&!this._parent.closest(SELECTOR_NAVBAR_NAV))for(const s of[].concat(...document.body.children))EventHandler.on(s,"mouseover",noop$1);this._element.focus(),this._element.setAttribute("aria-expanded",!0),this._menu.classList.add(CLASS_NAME_SHOW$6),this._element.classList.add(CLASS_NAME_SHOW$6),EventHandler.trigger(this._element,EVENT_SHOWN$5,e)}}hide(){if(isDisabled(this._element)||!this._isShown())return;const e={relatedTarget:this._element};this._completeHide(e)}dispose(){this._popper&&this._popper.destroy(),super.dispose()}update(){this._inNavbar=this._detectNavbar(),this._popper&&this._popper.update()}_completeHide(e){if(!EventHandler.trigger(this._element,EVENT_HIDE$5,e).defaultPrevented){if("ontouchstart"in document.documentElement)for(const s of[].concat(...document.body.children))EventHandler.off(s,"mouseover",noop$1);this._popper&&this._popper.destroy(),this._menu.classList.remove(CLASS_NAME_SHOW$6),this._element.classList.remove(CLASS_NAME_SHOW$6),this._element.setAttribute("aria-expanded","false"),Manipulator.removeDataAttribute(this._menu,"popper"),EventHandler.trigger(this._element,EVENT_HIDDEN$5,e),this._element.focus()}}_getConfig(e){if(e=super._getConfig(e),typeof e.reference=="object"&&!isElement(e.reference)&&typeof e.reference.getBoundingClientRect!="function")throw new TypeError(`${NAME$a.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);return e}_createPopper(){if(typeof Popper>"u")throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");let e=this._element;this._config.reference==="parent"?e=this._parent:isElement(this._config.reference)?e=getElement(this._config.reference):typeof this._config.reference=="object"&&(e=this._config.reference);const t=this._getPopperConfig();this._popper=createPopper(e,this._menu,t)}_isShown(){return this._menu.classList.contains(CLASS_NAME_SHOW$6)}_getPlacement(){const e=this._parent;if(e.classList.contains(CLASS_NAME_DROPEND))return PLACEMENT_RIGHT;if(e.classList.contains(CLASS_NAME_DROPSTART))return PLACEMENT_LEFT;if(e.classList.contains(CLASS_NAME_DROPUP_CENTER))return PLACEMENT_TOPCENTER;if(e.classList.contains(CLASS_NAME_DROPDOWN_CENTER))return PLACEMENT_BOTTOMCENTER;const t=getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()==="end";return e.classList.contains(CLASS_NAME_DROPUP)?t?PLACEMENT_TOPEND:PLACEMENT_TOP:t?PLACEMENT_BOTTOMEND:PLACEMENT_BOTTOM}_detectNavbar(){return this._element.closest(SELECTOR_NAVBAR)!==null}_getOffset(){const{offset:e}=this._config;return typeof e=="string"?e.split(",").map(t=>Number.parseInt(t,10)):typeof e=="function"?t=>e(t,this._element):e}_getPopperConfig(){const e={placement:this._getPlacement(),modifiers:[{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"offset",options:{offset:this._getOffset()}}]};return(this._inNavbar||this._config.display==="static")&&(Manipulator.setDataAttribute(this._menu,"popper","static"),e.modifiers=[{name:"applyStyles",enabled:!1}]),{...e,...execute(this._config.popperConfig,[void 0,e])}}_selectMenuItem({key:e,target:t}){const s=SelectorEngine.find(SELECTOR_VISIBLE_ITEMS,this._menu).filter(i=>isVisible(i));s.length&&getNextActiveElement(s,t,e===ARROW_DOWN_KEY$1,!s.includes(t)).focus()}static jQueryInterface(e){return this.each(function(){const t=Dropdown.getOrCreateInstance(this,e);if(typeof e=="string"){if(typeof t[e]>"u")throw new TypeError(`No method named "${e}"`);t[e]()}})}static clearMenus(e){if(e.button===RIGHT_MOUSE_BUTTON||e.type==="keyup"&&e.key!==TAB_KEY$1)return;const t=SelectorEngine.find(SELECTOR_DATA_TOGGLE_SHOWN);for(const s of t){const i=Dropdown.getInstance(s);if(!i||i._config.autoClose===!1)continue;const l=e.composedPath(),o=l.includes(i._menu);if(l.includes(i._element)||i._config.autoClose==="inside"&&!o||i._config.autoClose==="outside"&&o||i._menu.contains(e.target)&&(e.type==="keyup"&&e.key===TAB_KEY$1||/input|select|option|textarea|form/i.test(e.target.tagName)))continue;const r={relatedTarget:i._element};e.type==="click"&&(r.clickEvent=e),i._completeHide(r)}}static dataApiKeydownHandler(e){const t=/input|textarea/i.test(e.target.tagName),s=e.key===ESCAPE_KEY$2,i=[ARROW_UP_KEY$1,ARROW_DOWN_KEY$1].includes(e.key);if(!i&&!s||t&&!s)return;e.preventDefault();const l=this.matches(SELECTOR_DATA_TOGGLE$3)?this:SelectorEngine.prev(this,SELECTOR_DATA_TOGGLE$3)[0]||SelectorEngine.next(this,SELECTOR_DATA_TOGGLE$3)[0]||SelectorEngine.findOne(SELECTOR_DATA_TOGGLE$3,e.delegateTarget.parentNode),o=Dropdown.getOrCreateInstance(l);if(i){e.stopPropagation(),o.show(),o._selectMenuItem(e);return}o._isShown()&&(e.stopPropagation(),o.hide(),l.focus())}}EventHandler.on(document,EVENT_KEYDOWN_DATA_API,SELECTOR_DATA_TOGGLE$3,Dropdown.dataApiKeydownHandler);EventHandler.on(document,EVENT_KEYDOWN_DATA_API,SELECTOR_MENU,Dropdown.dataApiKeydownHandler);EventHandler.on(document,EVENT_CLICK_DATA_API$3,Dropdown.clearMenus);EventHandler.on(document,EVENT_KEYUP_DATA_API,Dropdown.clearMenus);EventHandler.on(document,EVENT_CLICK_DATA_API$3,SELECTOR_DATA_TOGGLE$3,function(n){n.preventDefault(),Dropdown.getOrCreateInstance(this).toggle()});defineJQueryPlugin(Dropdown);const NAME$9="backdrop",CLASS_NAME_FADE$4="fade",CLASS_NAME_SHOW$5="show",EVENT_MOUSEDOWN=`mousedown.bs.${NAME$9}`,Default$8={className:"modal-backdrop",clickCallback:null,isAnimated:!1,isVisible:!0,rootElement:"body"},DefaultType$8={className:"string",clickCallback:"(function|null)",isAnimated:"boolean",isVisible:"boolean",rootElement:"(element|string)"};class Backdrop extends Config{constructor(e){super(),this._config=this._getConfig(e),this._isAppended=!1,this._element=null}static get Default(){return Default$8}static get DefaultType(){return DefaultType$8}static get NAME(){return NAME$9}show(e){if(!this._config.isVisible){execute(e);return}this._append();const t=this._getElement();this._config.isAnimated&&reflow(t),t.classList.add(CLASS_NAME_SHOW$5),this._emulateAnimation(()=>{execute(e)})}hide(e){if(!this._config.isVisible){execute(e);return}this._getElement().classList.remove(CLASS_NAME_SHOW$5),this._emulateAnimation(()=>{this.dispose(),execute(e)})}dispose(){this._isAppended&&(EventHandler.off(this._element,EVENT_MOUSEDOWN),this._element.remove(),this._isAppended=!1)}_getElement(){if(!this._element){const e=document.createElement("div");e.className=this._config.className,this._config.isAnimated&&e.classList.add(CLASS_NAME_FADE$4),this._element=e}return this._element}_configAfterMerge(e){return e.rootElement=getElement(e.rootElement),e}_append(){if(this._isAppended)return;const e=this._getElement();this._config.rootElement.append(e),EventHandler.on(e,EVENT_MOUSEDOWN,()=>{execute(this._config.clickCallback)}),this._isAppended=!0}_emulateAnimation(e){executeAfterTransition(e,this._getElement(),this._config.isAnimated)}}const NAME$8="focustrap",DATA_KEY$5="bs.focustrap",EVENT_KEY$5=`.${DATA_KEY$5}`,EVENT_FOCUSIN$2=`focusin${EVENT_KEY$5}`,EVENT_KEYDOWN_TAB=`keydown.tab${EVENT_KEY$5}`,TAB_KEY="Tab",TAB_NAV_FORWARD="forward",TAB_NAV_BACKWARD="backward",Default$7={autofocus:!0,trapElement:null},DefaultType$7={autofocus:"boolean",trapElement:"element"};class FocusTrap extends Config{constructor(e){super(),this._config=this._getConfig(e),this._isActive=!1,this._lastTabNavDirection=null}static get Default(){return Default$7}static get DefaultType(){return DefaultType$7}static get NAME(){return NAME$8}activate(){this._isActive||(this._config.autofocus&&this._config.trapElement.focus(),EventHandler.off(document,EVENT_KEY$5),EventHandler.on(document,EVENT_FOCUSIN$2,e=>this._handleFocusin(e)),EventHandler.on(document,EVENT_KEYDOWN_TAB,e=>this._handleKeydown(e)),this._isActive=!0)}deactivate(){this._isActive&&(this._isActive=!1,EventHandler.off(document,EVENT_KEY$5))}_handleFocusin(e){const{trapElement:t}=this._config;if(e.target===document||e.target===t||t.contains(e.target))return;const s=SelectorEngine.focusableChildren(t);s.length===0?t.focus():this._lastTabNavDirection===TAB_NAV_BACKWARD?s[s.length-1].focus():s[0].focus()}_handleKeydown(e){e.key===TAB_KEY&&(this._lastTabNavDirection=e.shiftKey?TAB_NAV_BACKWARD:TAB_NAV_FORWARD)}}const SELECTOR_FIXED_CONTENT=".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",SELECTOR_STICKY_CONTENT=".sticky-top",PROPERTY_PADDING="padding-right",PROPERTY_MARGIN="margin-right";class ScrollBarHelper{constructor(){this._element=document.body}getWidth(){const e=document.documentElement.clientWidth;return Math.abs(window.innerWidth-e)}hide(){const e=this.getWidth();this._disableOverFlow(),this._setElementAttributes(this._element,PROPERTY_PADDING,t=>t+e),this._setElementAttributes(SELECTOR_FIXED_CONTENT,PROPERTY_PADDING,t=>t+e),this._setElementAttributes(SELECTOR_STICKY_CONTENT,PROPERTY_MARGIN,t=>t-e)}reset(){this._resetElementAttributes(this._element,"overflow"),this._resetElementAttributes(this._element,PROPERTY_PADDING),this._resetElementAttributes(SELECTOR_FIXED_CONTENT,PROPERTY_PADDING),this._resetElementAttributes(SELECTOR_STICKY_CONTENT,PROPERTY_MARGIN)}isOverflowing(){return this.getWidth()>0}_disableOverFlow(){this._saveInitialAttribute(this._element,"overflow"),this._element.style.overflow="hidden"}_setElementAttributes(e,t,s){const i=this.getWidth(),l=o=>{if(o!==this._element&&window.innerWidth>o.clientWidth+i)return;this._saveInitialAttribute(o,t);const r=window.getComputedStyle(o).getPropertyValue(t);o.style.setProperty(t,`${s(Number.parseFloat(r))}px`)};this._applyManipulationCallback(e,l)}_saveInitialAttribute(e,t){const s=e.style.getPropertyValue(t);s&&Manipulator.setDataAttribute(e,t,s)}_resetElementAttributes(e,t){const s=i=>{const l=Manipulator.getDataAttribute(i,t);if(l===null){i.style.removeProperty(t);return}Manipulator.removeDataAttribute(i,t),i.style.setProperty(t,l)};this._applyManipulationCallback(e,s)}_applyManipulationCallback(e,t){if(isElement(e)){t(e);return}for(const s of SelectorEngine.find(e,this._element))t(s)}}const NAME$7="modal",DATA_KEY$4="bs.modal",EVENT_KEY$4=`.${DATA_KEY$4}`,DATA_API_KEY$2=".data-api",ESCAPE_KEY$1="Escape",EVENT_HIDE$4=`hide${EVENT_KEY$4}`,EVENT_HIDE_PREVENTED$1=`hidePrevented${EVENT_KEY$4}`,EVENT_HIDDEN$4=`hidden${EVENT_KEY$4}`,EVENT_SHOW$4=`show${EVENT_KEY$4}`,EVENT_SHOWN$4=`shown${EVENT_KEY$4}`,EVENT_RESIZE$1=`resize${EVENT_KEY$4}`,EVENT_CLICK_DISMISS=`click.dismiss${EVENT_KEY$4}`,EVENT_MOUSEDOWN_DISMISS=`mousedown.dismiss${EVENT_KEY$4}`,EVENT_KEYDOWN_DISMISS$1=`keydown.dismiss${EVENT_KEY$4}`,EVENT_CLICK_DATA_API$2=`click${EVENT_KEY$4}${DATA_API_KEY$2}`,CLASS_NAME_OPEN="modal-open",CLASS_NAME_FADE$3="fade",CLASS_NAME_SHOW$4="show",CLASS_NAME_STATIC="modal-static",OPEN_SELECTOR$1=".modal.show",SELECTOR_DIALOG=".modal-dialog",SELECTOR_MODAL_BODY=".modal-body",SELECTOR_DATA_TOGGLE$2='[data-bs-toggle="modal"]',Default$6={backdrop:!0,focus:!0,keyboard:!0},DefaultType$6={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class Modal extends BaseComponent{constructor(e,t){super(e,t),this._dialog=SelectorEngine.findOne(SELECTOR_DIALOG,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new ScrollBarHelper,this._addEventListeners()}static get Default(){return Default$6}static get DefaultType(){return DefaultType$6}static get NAME(){return NAME$7}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){this._isShown||this._isTransitioning||EventHandler.trigger(this._element,EVENT_SHOW$4,{relatedTarget:e}).defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(CLASS_NAME_OPEN),this._adjustDialog(),this._backdrop.show(()=>this._showElement(e)))}hide(){!this._isShown||this._isTransitioning||EventHandler.trigger(this._element,EVENT_HIDE$4).defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(CLASS_NAME_SHOW$4),this._queueCallback(()=>this._hideModal(),this._element,this._isAnimated()))}dispose(){EventHandler.off(window,EVENT_KEY$4),EventHandler.off(this._dialog,EVENT_KEY$4),this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new Backdrop({isVisible:!!this._config.backdrop,isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new FocusTrap({trapElement:this._element})}_showElement(e){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const t=SelectorEngine.findOne(SELECTOR_MODAL_BODY,this._dialog);t&&(t.scrollTop=0),reflow(this._element),this._element.classList.add(CLASS_NAME_SHOW$4);const s=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,EventHandler.trigger(this._element,EVENT_SHOWN$4,{relatedTarget:e})};this._queueCallback(s,this._dialog,this._isAnimated())}_addEventListeners(){EventHandler.on(this._element,EVENT_KEYDOWN_DISMISS$1,e=>{if(e.key===ESCAPE_KEY$1){if(this._config.keyboard){this.hide();return}this._triggerBackdropTransition()}}),EventHandler.on(window,EVENT_RESIZE$1,()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()}),EventHandler.on(this._element,EVENT_MOUSEDOWN_DISMISS,e=>{EventHandler.one(this._element,EVENT_CLICK_DISMISS,t=>{if(!(this._element!==e.target||this._element!==t.target)){if(this._config.backdrop==="static"){this._triggerBackdropTransition();return}this._config.backdrop&&this.hide()}})})}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide(()=>{document.body.classList.remove(CLASS_NAME_OPEN),this._resetAdjustments(),this._scrollBar.reset(),EventHandler.trigger(this._element,EVENT_HIDDEN$4)})}_isAnimated(){return this._element.classList.contains(CLASS_NAME_FADE$3)}_triggerBackdropTransition(){if(EventHandler.trigger(this._element,EVENT_HIDE_PREVENTED$1).defaultPrevented)return;const t=this._element.scrollHeight>document.documentElement.clientHeight,s=this._element.style.overflowY;s==="hidden"||this._element.classList.contains(CLASS_NAME_STATIC)||(t||(this._element.style.overflowY="hidden"),this._element.classList.add(CLASS_NAME_STATIC),this._queueCallback(()=>{this._element.classList.remove(CLASS_NAME_STATIC),this._queueCallback(()=>{this._element.style.overflowY=s},this._dialog)},this._dialog),this._element.focus())}_adjustDialog(){const e=this._element.scrollHeight>document.documentElement.clientHeight,t=this._scrollBar.getWidth(),s=t>0;if(s&&!e){const i=isRTL()?"paddingLeft":"paddingRight";this._element.style[i]=`${t}px`}if(!s&&e){const i=isRTL()?"paddingRight":"paddingLeft";this._element.style[i]=`${t}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(e,t){return this.each(function(){const s=Modal.getOrCreateInstance(this,e);if(typeof e=="string"){if(typeof s[e]>"u")throw new TypeError(`No method named "${e}"`);s[e](t)}})}}EventHandler.on(document,EVENT_CLICK_DATA_API$2,SELECTOR_DATA_TOGGLE$2,function(n){const e=SelectorEngine.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&n.preventDefault(),EventHandler.one(e,EVENT_SHOW$4,i=>{i.defaultPrevented||EventHandler.one(e,EVENT_HIDDEN$4,()=>{isVisible(this)&&this.focus()})});const t=SelectorEngine.findOne(OPEN_SELECTOR$1);t&&Modal.getInstance(t).hide(),Modal.getOrCreateInstance(e).toggle(this)});enableDismissTrigger(Modal);defineJQueryPlugin(Modal);const NAME$6="offcanvas",DATA_KEY$3="bs.offcanvas",EVENT_KEY$3=`.${DATA_KEY$3}`,DATA_API_KEY$1=".data-api",EVENT_LOAD_DATA_API$2=`load${EVENT_KEY$3}${DATA_API_KEY$1}`,ESCAPE_KEY="Escape",CLASS_NAME_SHOW$3="show",CLASS_NAME_SHOWING$1="showing",CLASS_NAME_HIDING="hiding",CLASS_NAME_BACKDROP="offcanvas-backdrop",OPEN_SELECTOR=".offcanvas.show",EVENT_SHOW$3=`show${EVENT_KEY$3}`,EVENT_SHOWN$3=`shown${EVENT_KEY$3}`,EVENT_HIDE$3=`hide${EVENT_KEY$3}`,EVENT_HIDE_PREVENTED=`hidePrevented${EVENT_KEY$3}`,EVENT_HIDDEN$3=`hidden${EVENT_KEY$3}`,EVENT_RESIZE=`resize${EVENT_KEY$3}`,EVENT_CLICK_DATA_API$1=`click${EVENT_KEY$3}${DATA_API_KEY$1}`,EVENT_KEYDOWN_DISMISS=`keydown.dismiss${EVENT_KEY$3}`,SELECTOR_DATA_TOGGLE$1='[data-bs-toggle="offcanvas"]',Default$5={backdrop:!0,keyboard:!0,scroll:!1},DefaultType$5={backdrop:"(boolean|string)",keyboard:"boolean",scroll:"boolean"};class Offcanvas extends BaseComponent{constructor(e,t){super(e,t),this._isShown=!1,this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._addEventListeners()}static get Default(){return Default$5}static get DefaultType(){return DefaultType$5}static get NAME(){return NAME$6}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){if(this._isShown||EventHandler.trigger(this._element,EVENT_SHOW$3,{relatedTarget:e}).defaultPrevented)return;this._isShown=!0,this._backdrop.show(),this._config.scroll||new ScrollBarHelper().hide(),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.classList.add(CLASS_NAME_SHOWING$1);const s=()=>{(!this._config.scroll||this._config.backdrop)&&this._focustrap.activate(),this._element.classList.add(CLASS_NAME_SHOW$3),this._element.classList.remove(CLASS_NAME_SHOWING$1),EventHandler.trigger(this._element,EVENT_SHOWN$3,{relatedTarget:e})};this._queueCallback(s,this._element,!0)}hide(){if(!this._isShown||EventHandler.trigger(this._element,EVENT_HIDE$3).defaultPrevented)return;this._focustrap.deactivate(),this._element.blur(),this._isShown=!1,this._element.classList.add(CLASS_NAME_HIDING),this._backdrop.hide();const t=()=>{this._element.classList.remove(CLASS_NAME_SHOW$3,CLASS_NAME_HIDING),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._config.scroll||new ScrollBarHelper().reset(),EventHandler.trigger(this._element,EVENT_HIDDEN$3)};this._queueCallback(t,this._element,!0)}dispose(){this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}_initializeBackDrop(){const e=()=>{if(this._config.backdrop==="static"){EventHandler.trigger(this._element,EVENT_HIDE_PREVENTED);return}this.hide()},t=!!this._config.backdrop;return new Backdrop({className:CLASS_NAME_BACKDROP,isVisible:t,isAnimated:!0,rootElement:this._element.parentNode,clickCallback:t?e:null})}_initializeFocusTrap(){return new FocusTrap({trapElement:this._element})}_addEventListeners(){EventHandler.on(this._element,EVENT_KEYDOWN_DISMISS,e=>{if(e.key===ESCAPE_KEY){if(this._config.keyboard){this.hide();return}EventHandler.trigger(this._element,EVENT_HIDE_PREVENTED)}})}static jQueryInterface(e){return this.each(function(){const t=Offcanvas.getOrCreateInstance(this,e);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e](this)}})}}EventHandler.on(document,EVENT_CLICK_DATA_API$1,SELECTOR_DATA_TOGGLE$1,function(n){const e=SelectorEngine.getElementFromSelector(this);if(["A","AREA"].includes(this.tagName)&&n.preventDefault(),isDisabled(this))return;EventHandler.one(e,EVENT_HIDDEN$3,()=>{isVisible(this)&&this.focus()});const t=SelectorEngine.findOne(OPEN_SELECTOR);t&&t!==e&&Offcanvas.getInstance(t).hide(),Offcanvas.getOrCreateInstance(e).toggle(this)});EventHandler.on(window,EVENT_LOAD_DATA_API$2,()=>{for(const n of SelectorEngine.find(OPEN_SELECTOR))Offcanvas.getOrCreateInstance(n).show()});EventHandler.on(window,EVENT_RESIZE,()=>{for(const n of SelectorEngine.find("[aria-modal][class*=show][class*=offcanvas-]"))getComputedStyle(n).position!=="fixed"&&Offcanvas.getOrCreateInstance(n).hide()});enableDismissTrigger(Offcanvas);defineJQueryPlugin(Offcanvas);const ARIA_ATTRIBUTE_PATTERN=/^aria-[\w-]*$/i,DefaultAllowlist={"*":["class","dir","id","lang","role",ARIA_ATTRIBUTE_PATTERN],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],dd:[],div:[],dl:[],dt:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","srcset","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},uriAttributes=new Set(["background","cite","href","itemtype","longdesc","poster","src","xlink:href"]),SAFE_URL_PATTERN=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,allowedAttribute=(n,e)=>{const t=n.nodeName.toLowerCase();return e.includes(t)?uriAttributes.has(t)?!!SAFE_URL_PATTERN.test(n.nodeValue):!0:e.filter(s=>s instanceof RegExp).some(s=>s.test(t))};function sanitizeHtml(n,e,t){if(!n.length)return n;if(t&&typeof t=="function")return t(n);const i=new window.DOMParser().parseFromString(n,"text/html"),l=[].concat(...i.body.querySelectorAll("*"));for(const o of l){const r=o.nodeName.toLowerCase();if(!Object.keys(e).includes(r)){o.remove();continue}const c=[].concat(...o.attributes),Q=[].concat(e["*"]||[],e[r]||[]);for(const a of c)allowedAttribute(a,Q)||o.removeAttribute(a.nodeName)}return i.body.innerHTML}const NAME$5="TemplateFactory",Default$4={allowList:DefaultAllowlist,content:{},extraClass:"",html:!1,sanitize:!0,sanitizeFn:null,template:"<div></div>"},DefaultType$4={allowList:"object",content:"object",extraClass:"(string|function)",html:"boolean",sanitize:"boolean",sanitizeFn:"(null|function)",template:"string"},DefaultContentType={entry:"(string|element|function|null)",selector:"(string|element)"};class TemplateFactory extends Config{constructor(e){super(),this._config=this._getConfig(e)}static get Default(){return Default$4}static get DefaultType(){return DefaultType$4}static get NAME(){return NAME$5}getContent(){return Object.values(this._config.content).map(e=>this._resolvePossibleFunction(e)).filter(Boolean)}hasContent(){return this.getContent().length>0}changeContent(e){return this._checkContent(e),this._config.content={...this._config.content,...e},this}toHtml(){const e=document.createElement("div");e.innerHTML=this._maybeSanitize(this._config.template);for(const[i,l]of Object.entries(this._config.content))this._setContent(e,l,i);const t=e.children[0],s=this._resolvePossibleFunction(this._config.extraClass);return s&&t.classList.add(...s.split(" ")),t}_typeCheckConfig(e){super._typeCheckConfig(e),this._checkContent(e.content)}_checkContent(e){for(const[t,s]of Object.entries(e))super._typeCheckConfig({selector:t,entry:s},DefaultContentType)}_setContent(e,t,s){const i=SelectorEngine.findOne(s,e);if(i){if(t=this._resolvePossibleFunction(t),!t){i.remove();return}if(isElement(t)){this._putElementInTemplate(getElement(t),i);return}if(this._config.html){i.innerHTML=this._maybeSanitize(t);return}i.textContent=t}}_maybeSanitize(e){return this._config.sanitize?sanitizeHtml(e,this._config.allowList,this._config.sanitizeFn):e}_resolvePossibleFunction(e){return execute(e,[void 0,this])}_putElementInTemplate(e,t){if(this._config.html){t.innerHTML="",t.append(e);return}t.textContent=e.textContent}}const NAME$4="tooltip",DISALLOWED_ATTRIBUTES=new Set(["sanitize","allowList","sanitizeFn"]),CLASS_NAME_FADE$2="fade",CLASS_NAME_MODAL="modal",CLASS_NAME_SHOW$2="show",SELECTOR_TOOLTIP_INNER=".tooltip-inner",SELECTOR_MODAL=`.${CLASS_NAME_MODAL}`,EVENT_MODAL_HIDE="hide.bs.modal",TRIGGER_HOVER="hover",TRIGGER_FOCUS="focus",TRIGGER_CLICK="click",TRIGGER_MANUAL="manual",EVENT_HIDE$2="hide",EVENT_HIDDEN$2="hidden",EVENT_SHOW$2="show",EVENT_SHOWN$2="shown",EVENT_INSERTED="inserted",EVENT_CLICK$1="click",EVENT_FOCUSIN$1="focusin",EVENT_FOCUSOUT$1="focusout",EVENT_MOUSEENTER="mouseenter",EVENT_MOUSELEAVE="mouseleave",AttachmentMap={AUTO:"auto",TOP:"top",RIGHT:isRTL()?"left":"right",BOTTOM:"bottom",LEFT:isRTL()?"right":"left"},Default$3={allowList:DefaultAllowlist,animation:!0,boundary:"clippingParents",container:!1,customClass:"",delay:0,fallbackPlacements:["top","right","bottom","left"],html:!1,offset:[0,6],placement:"top",popperConfig:null,sanitize:!0,sanitizeFn:null,selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',title:"",trigger:"hover focus"},DefaultType$3={allowList:"object",animation:"boolean",boundary:"(string|element)",container:"(string|element|boolean)",customClass:"(string|function)",delay:"(number|object)",fallbackPlacements:"array",html:"boolean",offset:"(array|string|function)",placement:"(string|function)",popperConfig:"(null|object|function)",sanitize:"boolean",sanitizeFn:"(null|function)",selector:"(string|boolean)",template:"string",title:"(string|element|function)",trigger:"string"};class Tooltip extends BaseComponent{constructor(e,t){if(typeof Popper>"u")throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");super(e,t),this._isEnabled=!0,this._timeout=0,this._isHovered=null,this._activeTrigger={},this._popper=null,this._templateFactory=null,this._newContent=null,this.tip=null,this._setListeners(),this._config.selector||this._fixTitle()}static get Default(){return Default$3}static get DefaultType(){return DefaultType$3}static get NAME(){return NAME$4}enable(){this._isEnabled=!0}disable(){this._isEnabled=!1}toggleEnabled(){this._isEnabled=!this._isEnabled}toggle(){if(this._isEnabled){if(this._isShown()){this._leave();return}this._enter()}}dispose(){clearTimeout(this._timeout),EventHandler.off(this._element.closest(SELECTOR_MODAL),EVENT_MODAL_HIDE,this._hideModalHandler),this._element.getAttribute("data-bs-original-title")&&this._element.setAttribute("title",this._element.getAttribute("data-bs-original-title")),this._disposePopper(),super.dispose()}show(){if(this._element.style.display==="none")throw new Error("Please use show on visible elements");if(!(this._isWithContent()&&this._isEnabled))return;const e=EventHandler.trigger(this._element,this.constructor.eventName(EVENT_SHOW$2)),s=(findShadowRoot(this._element)||this._element.ownerDocument.documentElement).contains(this._element);if(e.defaultPrevented||!s)return;this._disposePopper();const i=this._getTipElement();this._element.setAttribute("aria-describedby",i.getAttribute("id"));const{container:l}=this._config;if(this._element.ownerDocument.documentElement.contains(this.tip)||(l.append(i),EventHandler.trigger(this._element,this.constructor.eventName(EVENT_INSERTED))),this._popper=this._createPopper(i),i.classList.add(CLASS_NAME_SHOW$2),"ontouchstart"in document.documentElement)for(const r of[].concat(...document.body.children))EventHandler.on(r,"mouseover",noop$1);const o=()=>{EventHandler.trigger(this._element,this.constructor.eventName(EVENT_SHOWN$2)),this._isHovered===!1&&this._leave(),this._isHovered=!1};this._queueCallback(o,this.tip,this._isAnimated())}hide(){if(!this._isShown()||EventHandler.trigger(this._element,this.constructor.eventName(EVENT_HIDE$2)).defaultPrevented)return;if(this._getTipElement().classList.remove(CLASS_NAME_SHOW$2),"ontouchstart"in document.documentElement)for(const i of[].concat(...document.body.children))EventHandler.off(i,"mouseover",noop$1);this._activeTrigger[TRIGGER_CLICK]=!1,this._activeTrigger[TRIGGER_FOCUS]=!1,this._activeTrigger[TRIGGER_HOVER]=!1,this._isHovered=null;const s=()=>{this._isWithActiveTrigger()||(this._isHovered||this._disposePopper(),this._element.removeAttribute("aria-describedby"),EventHandler.trigger(this._element,this.constructor.eventName(EVENT_HIDDEN$2)))};this._queueCallback(s,this.tip,this._isAnimated())}update(){this._popper&&this._popper.update()}_isWithContent(){return!!this._getTitle()}_getTipElement(){return this.tip||(this.tip=this._createTipElement(this._newContent||this._getContentForTemplate())),this.tip}_createTipElement(e){const t=this._getTemplateFactory(e).toHtml();if(!t)return null;t.classList.remove(CLASS_NAME_FADE$2,CLASS_NAME_SHOW$2),t.classList.add(`bs-${this.constructor.NAME}-auto`);const s=getUID(this.constructor.NAME).toString();return t.setAttribute("id",s),this._isAnimated()&&t.classList.add(CLASS_NAME_FADE$2),t}setContent(e){this._newContent=e,this._isShown()&&(this._disposePopper(),this.show())}_getTemplateFactory(e){return this._templateFactory?this._templateFactory.changeContent(e):this._templateFactory=new TemplateFactory({...this._config,content:e,extraClass:this._resolvePossibleFunction(this._config.customClass)}),this._templateFactory}_getContentForTemplate(){return{[SELECTOR_TOOLTIP_INNER]:this._getTitle()}}_getTitle(){return this._resolvePossibleFunction(this._config.title)||this._element.getAttribute("data-bs-original-title")}_initializeOnDelegatedTarget(e){return this.constructor.getOrCreateInstance(e.delegateTarget,this._getDelegateConfig())}_isAnimated(){return this._config.animation||this.tip&&this.tip.classList.contains(CLASS_NAME_FADE$2)}_isShown(){return this.tip&&this.tip.classList.contains(CLASS_NAME_SHOW$2)}_createPopper(e){const t=execute(this._config.placement,[this,e,this._element]),s=AttachmentMap[t.toUpperCase()];return createPopper(this._element,e,this._getPopperConfig(s))}_getOffset(){const{offset:e}=this._config;return typeof e=="string"?e.split(",").map(t=>Number.parseInt(t,10)):typeof e=="function"?t=>e(t,this._element):e}_resolvePossibleFunction(e){return execute(e,[this._element,this._element])}_getPopperConfig(e){const t={placement:e,modifiers:[{name:"flip",options:{fallbackPlacements:this._config.fallbackPlacements}},{name:"offset",options:{offset:this._getOffset()}},{name:"preventOverflow",options:{boundary:this._config.boundary}},{name:"arrow",options:{element:`.${this.constructor.NAME}-arrow`}},{name:"preSetPlacement",enabled:!0,phase:"beforeMain",fn:s=>{this._getTipElement().setAttribute("data-popper-placement",s.state.placement)}}]};return{...t,...execute(this._config.popperConfig,[void 0,t])}}_setListeners(){const e=this._config.trigger.split(" ");for(const t of e)if(t==="click")EventHandler.on(this._element,this.constructor.eventName(EVENT_CLICK$1),this._config.selector,s=>{this._initializeOnDelegatedTarget(s).toggle()});else if(t!==TRIGGER_MANUAL){const s=t===TRIGGER_HOVER?this.constructor.eventName(EVENT_MOUSEENTER):this.constructor.eventName(EVENT_FOCUSIN$1),i=t===TRIGGER_HOVER?this.constructor.eventName(EVENT_MOUSELEAVE):this.constructor.eventName(EVENT_FOCUSOUT$1);EventHandler.on(this._element,s,this._config.selector,l=>{const o=this._initializeOnDelegatedTarget(l);o._activeTrigger[l.type==="focusin"?TRIGGER_FOCUS:TRIGGER_HOVER]=!0,o._enter()}),EventHandler.on(this._element,i,this._config.selector,l=>{const o=this._initializeOnDelegatedTarget(l);o._activeTrigger[l.type==="focusout"?TRIGGER_FOCUS:TRIGGER_HOVER]=o._element.contains(l.relatedTarget),o._leave()})}this._hideModalHandler=()=>{this._element&&this.hide()},EventHandler.on(this._element.closest(SELECTOR_MODAL),EVENT_MODAL_HIDE,this._hideModalHandler)}_fixTitle(){const e=this._element.getAttribute("title");e&&(!this._element.getAttribute("aria-label")&&!this._element.textContent.trim()&&this._element.setAttribute("aria-label",e),this._element.setAttribute("data-bs-original-title",e),this._element.removeAttribute("title"))}_enter(){if(this._isShown()||this._isHovered){this._isHovered=!0;return}this._isHovered=!0,this._setTimeout(()=>{this._isHovered&&this.show()},this._config.delay.show)}_leave(){this._isWithActiveTrigger()||(this._isHovered=!1,this._setTimeout(()=>{this._isHovered||this.hide()},this._config.delay.hide))}_setTimeout(e,t){clearTimeout(this._timeout),this._timeout=setTimeout(e,t)}_isWithActiveTrigger(){return Object.values(this._activeTrigger).includes(!0)}_getConfig(e){const t=Manipulator.getDataAttributes(this._element);for(const s of Object.keys(t))DISALLOWED_ATTRIBUTES.has(s)&&delete t[s];return e={...t,...typeof e=="object"&&e?e:{}},e=this._mergeConfigObj(e),e=this._configAfterMerge(e),this._typeCheckConfig(e),e}_configAfterMerge(e){return e.container=e.container===!1?document.body:getElement(e.container),typeof e.delay=="number"&&(e.delay={show:e.delay,hide:e.delay}),typeof e.title=="number"&&(e.title=e.title.toString()),typeof e.content=="number"&&(e.content=e.content.toString()),e}_getDelegateConfig(){const e={};for(const[t,s]of Object.entries(this._config))this.constructor.Default[t]!==s&&(e[t]=s);return e.selector=!1,e.trigger="manual",e}_disposePopper(){this._popper&&(this._popper.destroy(),this._popper=null),this.tip&&(this.tip.remove(),this.tip=null)}static jQueryInterface(e){return this.each(function(){const t=Tooltip.getOrCreateInstance(this,e);if(typeof e=="string"){if(typeof t[e]>"u")throw new TypeError(`No method named "${e}"`);t[e]()}})}}defineJQueryPlugin(Tooltip);const NAME$3="popover",SELECTOR_TITLE=".popover-header",SELECTOR_CONTENT=".popover-body",Default$2={...Tooltip.Default,content:"",offset:[0,8],placement:"right",template:'<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',trigger:"click"},DefaultType$2={...Tooltip.DefaultType,content:"(null|string|element|function)"};class Popover extends Tooltip{static get Default(){return Default$2}static get DefaultType(){return DefaultType$2}static get NAME(){return NAME$3}_isWithContent(){return this._getTitle()||this._getContent()}_getContentForTemplate(){return{[SELECTOR_TITLE]:this._getTitle(),[SELECTOR_CONTENT]:this._getContent()}}_getContent(){return this._resolvePossibleFunction(this._config.content)}static jQueryInterface(e){return this.each(function(){const t=Popover.getOrCreateInstance(this,e);if(typeof e=="string"){if(typeof t[e]>"u")throw new TypeError(`No method named "${e}"`);t[e]()}})}}defineJQueryPlugin(Popover);const NAME$2="scrollspy",DATA_KEY$2="bs.scrollspy",EVENT_KEY$2=`.${DATA_KEY$2}`,DATA_API_KEY=".data-api",EVENT_ACTIVATE=`activate${EVENT_KEY$2}`,EVENT_CLICK=`click${EVENT_KEY$2}`,EVENT_LOAD_DATA_API$1=`load${EVENT_KEY$2}${DATA_API_KEY}`,CLASS_NAME_DROPDOWN_ITEM="dropdown-item",CLASS_NAME_ACTIVE$1="active",SELECTOR_DATA_SPY='[data-bs-spy="scroll"]',SELECTOR_TARGET_LINKS="[href]",SELECTOR_NAV_LIST_GROUP=".nav, .list-group",SELECTOR_NAV_LINKS=".nav-link",SELECTOR_NAV_ITEMS=".nav-item",SELECTOR_LIST_ITEMS=".list-group-item",SELECTOR_LINK_ITEMS=`${SELECTOR_NAV_LINKS}, ${SELECTOR_NAV_ITEMS} > ${SELECTOR_NAV_LINKS}, ${SELECTOR_LIST_ITEMS}`,SELECTOR_DROPDOWN=".dropdown",SELECTOR_DROPDOWN_TOGGLE$1=".dropdown-toggle",Default$1={offset:null,rootMargin:"0px 0px -25%",smoothScroll:!1,target:null,threshold:[.1,.5,1]},DefaultType$1={offset:"(number|null)",rootMargin:"string",smoothScroll:"boolean",target:"element",threshold:"array"};class ScrollSpy extends BaseComponent{constructor(e,t){super(e,t),this._targetLinks=new Map,this._observableSections=new Map,this._rootElement=getComputedStyle(this._element).overflowY==="visible"?null:this._element,this._activeTarget=null,this._observer=null,this._previousScrollData={visibleEntryTop:0,parentScrollTop:0},this.refresh()}static get Default(){return Default$1}static get DefaultType(){return DefaultType$1}static get NAME(){return NAME$2}refresh(){this._initializeTargetsAndObservables(),this._maybeEnableSmoothScroll(),this._observer?this._observer.disconnect():this._observer=this._getNewObserver();for(const e of this._observableSections.values())this._observer.observe(e)}dispose(){this._observer.disconnect(),super.dispose()}_configAfterMerge(e){return e.target=getElement(e.target)||document.body,e.rootMargin=e.offset?`${e.offset}px 0px -30%`:e.rootMargin,typeof e.threshold=="string"&&(e.threshold=e.threshold.split(",").map(t=>Number.parseFloat(t))),e}_maybeEnableSmoothScroll(){this._config.smoothScroll&&(EventHandler.off(this._config.target,EVENT_CLICK),EventHandler.on(this._config.target,EVENT_CLICK,SELECTOR_TARGET_LINKS,e=>{const t=this._observableSections.get(e.target.hash);if(t){e.preventDefault();const s=this._rootElement||window,i=t.offsetTop-this._element.offsetTop;if(s.scrollTo){s.scrollTo({top:i,behavior:"smooth"});return}s.scrollTop=i}}))}_getNewObserver(){const e={root:this._rootElement,threshold:this._config.threshold,rootMargin:this._config.rootMargin};return new IntersectionObserver(t=>this._observerCallback(t),e)}_observerCallback(e){const t=o=>this._targetLinks.get(`#${o.target.id}`),s=o=>{this._previousScrollData.visibleEntryTop=o.target.offsetTop,this._process(t(o))},i=(this._rootElement||document.documentElement).scrollTop,l=i>=this._previousScrollData.parentScrollTop;this._previousScrollData.parentScrollTop=i;for(const o of e){if(!o.isIntersecting){this._activeTarget=null,this._clearActiveClass(t(o));continue}const r=o.target.offsetTop>=this._previousScrollData.visibleEntryTop;if(l&&r){if(s(o),!i)return;continue}!l&&!r&&s(o)}}_initializeTargetsAndObservables(){this._targetLinks=new Map,this._observableSections=new Map;const e=SelectorEngine.find(SELECTOR_TARGET_LINKS,this._config.target);for(const t of e){if(!t.hash||isDisabled(t))continue;const s=SelectorEngine.findOne(decodeURI(t.hash),this._element);isVisible(s)&&(this._targetLinks.set(decodeURI(t.hash),t),this._observableSections.set(t.hash,s))}}_process(e){this._activeTarget!==e&&(this._clearActiveClass(this._config.target),this._activeTarget=e,e.classList.add(CLASS_NAME_ACTIVE$1),this._activateParents(e),EventHandler.trigger(this._element,EVENT_ACTIVATE,{relatedTarget:e}))}_activateParents(e){if(e.classList.contains(CLASS_NAME_DROPDOWN_ITEM)){SelectorEngine.findOne(SELECTOR_DROPDOWN_TOGGLE$1,e.closest(SELECTOR_DROPDOWN)).classList.add(CLASS_NAME_ACTIVE$1);return}for(const t of SelectorEngine.parents(e,SELECTOR_NAV_LIST_GROUP))for(const s of SelectorEngine.prev(t,SELECTOR_LINK_ITEMS))s.classList.add(CLASS_NAME_ACTIVE$1)}_clearActiveClass(e){e.classList.remove(CLASS_NAME_ACTIVE$1);const t=SelectorEngine.find(`${SELECTOR_TARGET_LINKS}.${CLASS_NAME_ACTIVE$1}`,e);for(const s of t)s.classList.remove(CLASS_NAME_ACTIVE$1)}static jQueryInterface(e){return this.each(function(){const t=ScrollSpy.getOrCreateInstance(this,e);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e]()}})}}EventHandler.on(window,EVENT_LOAD_DATA_API$1,()=>{for(const n of SelectorEngine.find(SELECTOR_DATA_SPY))ScrollSpy.getOrCreateInstance(n)});defineJQueryPlugin(ScrollSpy);const NAME$1="tab",DATA_KEY$1="bs.tab",EVENT_KEY$1=`.${DATA_KEY$1}`,EVENT_HIDE$1=`hide${EVENT_KEY$1}`,EVENT_HIDDEN$1=`hidden${EVENT_KEY$1}`,EVENT_SHOW$1=`show${EVENT_KEY$1}`,EVENT_SHOWN$1=`shown${EVENT_KEY$1}`,EVENT_CLICK_DATA_API=`click${EVENT_KEY$1}`,EVENT_KEYDOWN=`keydown${EVENT_KEY$1}`,EVENT_LOAD_DATA_API=`load${EVENT_KEY$1}`,ARROW_LEFT_KEY="ArrowLeft",ARROW_RIGHT_KEY="ArrowRight",ARROW_UP_KEY="ArrowUp",ARROW_DOWN_KEY="ArrowDown",HOME_KEY="Home",END_KEY="End",CLASS_NAME_ACTIVE="active",CLASS_NAME_FADE$1="fade",CLASS_NAME_SHOW$1="show",CLASS_DROPDOWN="dropdown",SELECTOR_DROPDOWN_TOGGLE=".dropdown-toggle",SELECTOR_DROPDOWN_MENU=".dropdown-menu",NOT_SELECTOR_DROPDOWN_TOGGLE=`:not(${SELECTOR_DROPDOWN_TOGGLE})`,SELECTOR_TAB_PANEL='.list-group, .nav, [role="tablist"]',SELECTOR_OUTER=".nav-item, .list-group-item",SELECTOR_INNER=`.nav-link${NOT_SELECTOR_DROPDOWN_TOGGLE}, .list-group-item${NOT_SELECTOR_DROPDOWN_TOGGLE}, [role="tab"]${NOT_SELECTOR_DROPDOWN_TOGGLE}`,SELECTOR_DATA_TOGGLE='[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',SELECTOR_INNER_ELEM=`${SELECTOR_INNER}, ${SELECTOR_DATA_TOGGLE}`,SELECTOR_DATA_TOGGLE_ACTIVE=`.${CLASS_NAME_ACTIVE}[data-bs-toggle="tab"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="pill"], .${CLASS_NAME_ACTIVE}[data-bs-toggle="list"]`;class Tab extends BaseComponent{constructor(e){super(e),this._parent=this._element.closest(SELECTOR_TAB_PANEL),this._parent&&(this._setInitialAttributes(this._parent,this._getChildren()),EventHandler.on(this._element,EVENT_KEYDOWN,t=>this._keydown(t)))}static get NAME(){return NAME$1}show(){const e=this._element;if(this._elemIsActive(e))return;const t=this._getActiveElem(),s=t?EventHandler.trigger(t,EVENT_HIDE$1,{relatedTarget:e}):null;EventHandler.trigger(e,EVENT_SHOW$1,{relatedTarget:t}).defaultPrevented||s&&s.defaultPrevented||(this._deactivate(t,e),this._activate(e,t))}_activate(e,t){if(!e)return;e.classList.add(CLASS_NAME_ACTIVE),this._activate(SelectorEngine.getElementFromSelector(e));const s=()=>{if(e.getAttribute("role")!=="tab"){e.classList.add(CLASS_NAME_SHOW$1);return}e.removeAttribute("tabindex"),e.setAttribute("aria-selected",!0),this._toggleDropDown(e,!0),EventHandler.trigger(e,EVENT_SHOWN$1,{relatedTarget:t})};this._queueCallback(s,e,e.classList.contains(CLASS_NAME_FADE$1))}_deactivate(e,t){if(!e)return;e.classList.remove(CLASS_NAME_ACTIVE),e.blur(),this._deactivate(SelectorEngine.getElementFromSelector(e));const s=()=>{if(e.getAttribute("role")!=="tab"){e.classList.remove(CLASS_NAME_SHOW$1);return}e.setAttribute("aria-selected",!1),e.setAttribute("tabindex","-1"),this._toggleDropDown(e,!1),EventHandler.trigger(e,EVENT_HIDDEN$1,{relatedTarget:t})};this._queueCallback(s,e,e.classList.contains(CLASS_NAME_FADE$1))}_keydown(e){if(![ARROW_LEFT_KEY,ARROW_RIGHT_KEY,ARROW_UP_KEY,ARROW_DOWN_KEY,HOME_KEY,END_KEY].includes(e.key))return;e.stopPropagation(),e.preventDefault();const t=this._getChildren().filter(i=>!isDisabled(i));let s;if([HOME_KEY,END_KEY].includes(e.key))s=t[e.key===HOME_KEY?0:t.length-1];else{const i=[ARROW_RIGHT_KEY,ARROW_DOWN_KEY].includes(e.key);s=getNextActiveElement(t,e.target,i,!0)}s&&(s.focus({preventScroll:!0}),Tab.getOrCreateInstance(s).show())}_getChildren(){return SelectorEngine.find(SELECTOR_INNER_ELEM,this._parent)}_getActiveElem(){return this._getChildren().find(e=>this._elemIsActive(e))||null}_setInitialAttributes(e,t){this._setAttributeIfNotExists(e,"role","tablist");for(const s of t)this._setInitialAttributesOnChild(s)}_setInitialAttributesOnChild(e){e=this._getInnerElement(e);const t=this._elemIsActive(e),s=this._getOuterElement(e);e.setAttribute("aria-selected",t),s!==e&&this._setAttributeIfNotExists(s,"role","presentation"),t||e.setAttribute("tabindex","-1"),this._setAttributeIfNotExists(e,"role","tab"),this._setInitialAttributesOnTargetPanel(e)}_setInitialAttributesOnTargetPanel(e){const t=SelectorEngine.getElementFromSelector(e);t&&(this._setAttributeIfNotExists(t,"role","tabpanel"),e.id&&this._setAttributeIfNotExists(t,"aria-labelledby",`${e.id}`))}_toggleDropDown(e,t){const s=this._getOuterElement(e);if(!s.classList.contains(CLASS_DROPDOWN))return;const i=(l,o)=>{const r=SelectorEngine.findOne(l,s);r&&r.classList.toggle(o,t)};i(SELECTOR_DROPDOWN_TOGGLE,CLASS_NAME_ACTIVE),i(SELECTOR_DROPDOWN_MENU,CLASS_NAME_SHOW$1),s.setAttribute("aria-expanded",t)}_setAttributeIfNotExists(e,t,s){e.hasAttribute(t)||e.setAttribute(t,s)}_elemIsActive(e){return e.classList.contains(CLASS_NAME_ACTIVE)}_getInnerElement(e){return e.matches(SELECTOR_INNER_ELEM)?e:SelectorEngine.findOne(SELECTOR_INNER_ELEM,e)}_getOuterElement(e){return e.closest(SELECTOR_OUTER)||e}static jQueryInterface(e){return this.each(function(){const t=Tab.getOrCreateInstance(this);if(typeof e=="string"){if(t[e]===void 0||e.startsWith("_")||e==="constructor")throw new TypeError(`No method named "${e}"`);t[e]()}})}}EventHandler.on(document,EVENT_CLICK_DATA_API,SELECTOR_DATA_TOGGLE,function(n){["A","AREA"].includes(this.tagName)&&n.preventDefault(),!isDisabled(this)&&Tab.getOrCreateInstance(this).show()});EventHandler.on(window,EVENT_LOAD_DATA_API,()=>{for(const n of SelectorEngine.find(SELECTOR_DATA_TOGGLE_ACTIVE))Tab.getOrCreateInstance(n)});defineJQueryPlugin(Tab);const NAME="toast",DATA_KEY="bs.toast",EVENT_KEY=`.${DATA_KEY}`,EVENT_MOUSEOVER=`mouseover${EVENT_KEY}`,EVENT_MOUSEOUT=`mouseout${EVENT_KEY}`,EVENT_FOCUSIN=`focusin${EVENT_KEY}`,EVENT_FOCUSOUT=`focusout${EVENT_KEY}`,EVENT_HIDE=`hide${EVENT_KEY}`,EVENT_HIDDEN=`hidden${EVENT_KEY}`,EVENT_SHOW=`show${EVENT_KEY}`,EVENT_SHOWN=`shown${EVENT_KEY}`,CLASS_NAME_FADE="fade",CLASS_NAME_HIDE="hide",CLASS_NAME_SHOW="show",CLASS_NAME_SHOWING="showing",DefaultType={animation:"boolean",autohide:"boolean",delay:"number"},Default={animation:!0,autohide:!0,delay:5e3};class Toast extends BaseComponent{constructor(e,t){super(e,t),this._timeout=null,this._hasMouseInteraction=!1,this._hasKeyboardInteraction=!1,this._setListeners()}static get Default(){return Default}static get DefaultType(){return DefaultType}static get NAME(){return NAME}show(){if(EventHandler.trigger(this._element,EVENT_SHOW).defaultPrevented)return;this._clearTimeout(),this._config.animation&&this._element.classList.add(CLASS_NAME_FADE);const t=()=>{this._element.classList.remove(CLASS_NAME_SHOWING),EventHandler.trigger(this._element,EVENT_SHOWN),this._maybeScheduleHide()};this._element.classList.remove(CLASS_NAME_HIDE),reflow(this._element),this._element.classList.add(CLASS_NAME_SHOW,CLASS_NAME_SHOWING),this._queueCallback(t,this._element,this._config.animation)}hide(){if(!this.isShown()||EventHandler.trigger(this._element,EVENT_HIDE).defaultPrevented)return;const t=()=>{this._element.classList.add(CLASS_NAME_HIDE),this._element.classList.remove(CLASS_NAME_SHOWING,CLASS_NAME_SHOW),EventHandler.trigger(this._element,EVENT_HIDDEN)};this._element.classList.add(CLASS_NAME_SHOWING),this._queueCallback(t,this._element,this._config.animation)}dispose(){this._clearTimeout(),this.isShown()&&this._element.classList.remove(CLASS_NAME_SHOW),super.dispose()}isShown(){return this._element.classList.contains(CLASS_NAME_SHOW)}_maybeScheduleHide(){this._config.autohide&&(this._hasMouseInteraction||this._hasKeyboardInteraction||(this._timeout=setTimeout(()=>{this.hide()},this._config.delay)))}_onInteraction(e,t){switch(e.type){case"mouseover":case"mouseout":{this._hasMouseInteraction=t;break}case"focusin":case"focusout":{this._hasKeyboardInteraction=t;break}}if(t){this._clearTimeout();return}const s=e.relatedTarget;this._element===s||this._element.contains(s)||this._maybeScheduleHide()}_setListeners(){EventHandler.on(this._element,EVENT_MOUSEOVER,e=>this._onInteraction(e,!0)),EventHandler.on(this._element,EVENT_MOUSEOUT,e=>this._onInteraction(e,!1)),EventHandler.on(this._element,EVENT_FOCUSIN,e=>this._onInteraction(e,!0)),EventHandler.on(this._element,EVENT_FOCUSOUT,e=>this._onInteraction(e,!1))}_clearTimeout(){clearTimeout(this._timeout),this._timeout=null}static jQueryInterface(e){return this.each(function(){const t=Toast.getOrCreateInstance(this,e);if(typeof e=="string"){if(typeof t[e]>"u")throw new TypeError(`No method named "${e}"`);t[e](this)}})}}enableDismissTrigger(Toast);defineJQueryPlugin(Toast);function bind(n,e){return function(){return n.apply(e,arguments)}}const{toString}=Object.prototype,{getPrototypeOf}=Object,{iterator,toStringTag}=Symbol,kindOf=(n=>e=>{const t=toString.call(e);return n[t]||(n[t]=t.slice(8,-1).toLowerCase())})(Object.create(null)),kindOfTest=n=>(n=n.toLowerCase(),e=>kindOf(e)===n),typeOfTest=n=>e=>typeof e===n,{isArray}=Array,isUndefined=typeOfTest("undefined");function isBuffer(n){return n!==null&&!isUndefined(n)&&n.constructor!==null&&!isUndefined(n.constructor)&&isFunction(n.constructor.isBuffer)&&n.constructor.isBuffer(n)}const isArrayBuffer=kindOfTest("ArrayBuffer");function isArrayBufferView(n){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(n):e=n&&n.buffer&&isArrayBuffer(n.buffer),e}const isString=typeOfTest("string"),isFunction=typeOfTest("function"),isNumber=typeOfTest("number"),isObject=n=>n!==null&&typeof n=="object",isBoolean=n=>n===!0||n===!1,isPlainObject=n=>{if(kindOf(n)!=="object")return!1;const e=getPrototypeOf(n);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(toStringTag in n)&&!(iterator in n)},isDate=kindOfTest("Date"),isFile=kindOfTest("File"),isBlob=kindOfTest("Blob"),isFileList=kindOfTest("FileList"),isStream=n=>isObject(n)&&isFunction(n.pipe),isFormData=n=>{let e;return n&&(typeof FormData=="function"&&n instanceof FormData||isFunction(n.append)&&((e=kindOf(n))==="formdata"||e==="object"&&isFunction(n.toString)&&n.toString()==="[object FormData]"))},isURLSearchParams=kindOfTest("URLSearchParams"),[isReadableStream,isRequest,isResponse,isHeaders]=["ReadableStream","Request","Response","Headers"].map(kindOfTest),trim=n=>n.trim?n.trim():n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function forEach(n,e,{allOwnKeys:t=!1}={}){if(n===null||typeof n>"u")return;let s,i;if(typeof n!="object"&&(n=[n]),isArray(n))for(s=0,i=n.length;s<i;s++)e.call(null,n[s],s,n);else{const l=t?Object.getOwnPropertyNames(n):Object.keys(n),o=l.length;let r;for(s=0;s<o;s++)r=l[s],e.call(null,n[r],r,n)}}function findKey(n,e){e=e.toLowerCase();const t=Object.keys(n);let s=t.length,i;for(;s-- >0;)if(i=t[s],e===i.toLowerCase())return i;return null}const _global=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,isContextDefined=n=>!isUndefined(n)&&n!==_global;function merge(){const{caseless:n}=isContextDefined(this)&&this||{},e={},t=(s,i)=>{const l=n&&findKey(e,i)||i;isPlainObject(e[l])&&isPlainObject(s)?e[l]=merge(e[l],s):isPlainObject(s)?e[l]=merge({},s):isArray(s)?e[l]=s.slice():e[l]=s};for(let s=0,i=arguments.length;s<i;s++)arguments[s]&&forEach(arguments[s],t);return e}const extend=(n,e,t,{allOwnKeys:s}={})=>(forEach(e,(i,l)=>{t&&isFunction(i)?n[l]=bind(i,t):n[l]=i},{allOwnKeys:s}),n),stripBOM=n=>(n.charCodeAt(0)===65279&&(n=n.slice(1)),n),inherits=(n,e,t,s)=>{n.prototype=Object.create(e.prototype,s),n.prototype.constructor=n,Object.defineProperty(n,"super",{value:e.prototype}),t&&Object.assign(n.prototype,t)},toFlatObject=(n,e,t,s)=>{let i,l,o;const r={};if(e=e||{},n==null)return e;do{for(i=Object.getOwnPropertyNames(n),l=i.length;l-- >0;)o=i[l],(!s||s(o,n,e))&&!r[o]&&(e[o]=n[o],r[o]=!0);n=t!==!1&&getPrototypeOf(n)}while(n&&(!t||t(n,e))&&n!==Object.prototype);return e},endsWith=(n,e,t)=>{n=String(n),(t===void 0||t>n.length)&&(t=n.length),t-=e.length;const s=n.indexOf(e,t);return s!==-1&&s===t},toArray=n=>{if(!n)return null;if(isArray(n))return n;let e=n.length;if(!isNumber(e))return null;const t=new Array(e);for(;e-- >0;)t[e]=n[e];return t},isTypedArray=(n=>e=>n&&e instanceof n)(typeof Uint8Array<"u"&&getPrototypeOf(Uint8Array)),forEachEntry=(n,e)=>{const s=(n&&n[iterator]).call(n);let i;for(;(i=s.next())&&!i.done;){const l=i.value;e.call(n,l[0],l[1])}},matchAll=(n,e)=>{let t;const s=[];for(;(t=n.exec(e))!==null;)s.push(t);return s},isHTMLForm=kindOfTest("HTMLFormElement"),toCamelCase=n=>n.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(t,s,i){return s.toUpperCase()+i}),hasOwnProperty=(({hasOwnProperty:n})=>(e,t)=>n.call(e,t))(Object.prototype),isRegExp=kindOfTest("RegExp"),reduceDescriptors=(n,e)=>{const t=Object.getOwnPropertyDescriptors(n),s={};forEach(t,(i,l)=>{let o;(o=e(i,l,n))!==!1&&(s[l]=o||i)}),Object.defineProperties(n,s)},freezeMethods=n=>{reduceDescriptors(n,(e,t)=>{if(isFunction(n)&&["arguments","caller","callee"].indexOf(t)!==-1)return!1;const s=n[t];if(isFunction(s)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+t+"'")})}})},toObjectSet=(n,e)=>{const t={},s=i=>{i.forEach(l=>{t[l]=!0})};return isArray(n)?s(n):s(String(n).split(e)),t},noop=()=>{},toFiniteNumber=(n,e)=>n!=null&&Number.isFinite(n=+n)?n:e;function isSpecCompliantForm(n){return!!(n&&isFunction(n.append)&&n[toStringTag]==="FormData"&&n[iterator])}const toJSONObject=n=>{const e=new Array(10),t=(s,i)=>{if(isObject(s)){if(e.indexOf(s)>=0)return;if(!("toJSON"in s)){e[i]=s;const l=isArray(s)?[]:{};return forEach(s,(o,r)=>{const c=t(o,i+1);!isUndefined(c)&&(l[r]=c)}),e[i]=void 0,l}}return s};return t(n,0)},isAsyncFn=kindOfTest("AsyncFunction"),isThenable=n=>n&&(isObject(n)||isFunction(n))&&isFunction(n.then)&&isFunction(n.catch),_setImmediate=((n,e)=>n?setImmediate:e?((t,s)=>(_global.addEventListener("message",({source:i,data:l})=>{i===_global&&l===t&&s.length&&s.shift()()},!1),i=>{s.push(i),_global.postMessage(t,"*")}))(`axios@${Math.random()}`,[]):t=>setTimeout(t))(typeof setImmediate=="function",isFunction(_global.postMessage)),asap=typeof queueMicrotask<"u"?queueMicrotask.bind(_global):typeof process<"u"&&process.nextTick||_setImmediate,isIterable=n=>n!=null&&isFunction(n[iterator]),utils$1={isArray,isArrayBuffer,isBuffer,isFormData,isArrayBufferView,isString,isNumber,isBoolean,isObject,isPlainObject,isReadableStream,isRequest,isResponse,isHeaders,isUndefined,isDate,isFile,isBlob,isRegExp,isFunction,isStream,isURLSearchParams,isTypedArray,isFileList,forEach,merge,extend,trim,stripBOM,inherits,toFlatObject,kindOf,kindOfTest,endsWith,toArray,forEachEntry,matchAll,isHTMLForm,hasOwnProperty,hasOwnProp:hasOwnProperty,reduceDescriptors,freezeMethods,toObjectSet,toCamelCase,noop,toFiniteNumber,findKey,global:_global,isContextDefined,isSpecCompliantForm,toJSONObject,isAsyncFn,isThenable,setImmediate:_setImmediate,asap,isIterable};function AxiosError$1(n,e,t,s,i){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=n,this.name="AxiosError",e&&(this.code=e),t&&(this.config=t),s&&(this.request=s),i&&(this.response=i,this.status=i.status?i.status:null)}utils$1.inherits(AxiosError$1,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:utils$1.toJSONObject(this.config),code:this.code,status:this.status}}});const prototype$1=AxiosError$1.prototype,descriptors={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(n=>{descriptors[n]={value:n}});Object.defineProperties(AxiosError$1,descriptors);Object.defineProperty(prototype$1,"isAxiosError",{value:!0});AxiosError$1.from=(n,e,t,s,i,l)=>{const o=Object.create(prototype$1);return utils$1.toFlatObject(n,o,function(c){return c!==Error.prototype},r=>r!=="isAxiosError"),AxiosError$1.call(o,n.message,e,t,s,i),o.cause=n,o.name=n.name,l&&Object.assign(o,l),o};const httpAdapter=null;function isVisitable(n){return utils$1.isPlainObject(n)||utils$1.isArray(n)}function removeBrackets(n){return utils$1.endsWith(n,"[]")?n.slice(0,-2):n}function renderKey(n,e,t){return n?n.concat(e).map(function(i,l){return i=removeBrackets(i),!t&&l?"["+i+"]":i}).join(t?".":""):e}function isFlatArray(n){return utils$1.isArray(n)&&!n.some(isVisitable)}const predicates=utils$1.toFlatObject(utils$1,{},null,function(e){return/^is[A-Z]/.test(e)});function toFormData$1(n,e,t){if(!utils$1.isObject(n))throw new TypeError("target must be an object");e=e||new FormData,t=utils$1.toFlatObject(t,{metaTokens:!0,dots:!1,indexes:!1},!1,function(u,d){return!utils$1.isUndefined(d[u])});const s=t.metaTokens,i=t.visitor||a,l=t.dots,o=t.indexes,c=(t.Blob||typeof Blob<"u"&&Blob)&&utils$1.isSpecCompliantForm(e);if(!utils$1.isFunction(i))throw new TypeError("visitor must be a function");function Q(g){if(g===null)return"";if(utils$1.isDate(g))return g.toISOString();if(!c&&utils$1.isBlob(g))throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");return utils$1.isArrayBuffer(g)||utils$1.isTypedArray(g)?c&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function a(g,u,d){let U=g;if(g&&!d&&typeof g=="object"){if(utils$1.endsWith(u,"{}"))u=s?u:u.slice(0,-2),g=JSON.stringify(g);else if(utils$1.isArray(g)&&isFlatArray(g)||(utils$1.isFileList(g)||utils$1.endsWith(u,"[]"))&&(U=utils$1.toArray(g)))return u=removeBrackets(u),U.forEach(function(E,C){!(utils$1.isUndefined(E)||E===null)&&e.append(o===!0?renderKey([u],C,l):o===null?u:u+"[]",Q(E))}),!1}return isVisitable(g)?!0:(e.append(renderKey(d,u,l),Q(g)),!1)}const B=[],F=Object.assign(predicates,{defaultVisitor:a,convertValue:Q,isVisitable});function I(g,u){if(!utils$1.isUndefined(g)){if(B.indexOf(g)!==-1)throw Error("Circular reference detected in "+u.join("."));B.push(g),utils$1.forEach(g,function(U,m){(!(utils$1.isUndefined(U)||U===null)&&i.call(e,U,utils$1.isString(m)?m.trim():m,u,F))===!0&&I(U,u?u.concat(m):[m])}),B.pop()}}if(!utils$1.isObject(n))throw new TypeError("data must be an object");return I(n),e}function encode$1(n){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g,function(s){return e[s]})}function AxiosURLSearchParams(n,e){this._pairs=[],n&&toFormData$1(n,this,e)}const prototype=AxiosURLSearchParams.prototype;prototype.append=function(e,t){this._pairs.push([e,t])};prototype.toString=function(e){const t=e?function(s){return e.call(this,s,encode$1)}:encode$1;return this._pairs.map(function(i){return t(i[0])+"="+t(i[1])},"").join("&")};function encode(n){return encodeURIComponent(n).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function buildURL(n,e,t){if(!e)return n;const s=t&&t.encode||encode;utils$1.isFunction(t)&&(t={serialize:t});const i=t&&t.serialize;let l;if(i?l=i(e,t):l=utils$1.isURLSearchParams(e)?e.toString():new AxiosURLSearchParams(e,t).toString(s),l){const o=n.indexOf("#");o!==-1&&(n=n.slice(0,o)),n+=(n.indexOf("?")===-1?"?":"&")+l}return n}class InterceptorManager{constructor(){this.handlers=[]}use(e,t,s){return this.handlers.push({fulfilled:e,rejected:t,synchronous:s?s.synchronous:!1,runWhen:s?s.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){utils$1.forEach(this.handlers,function(s){s!==null&&e(s)})}}const transitionalDefaults={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},URLSearchParams$1=typeof URLSearchParams<"u"?URLSearchParams:AxiosURLSearchParams,FormData$1=typeof FormData<"u"?FormData:null,Blob$1=typeof Blob<"u"?Blob:null,platform$1={isBrowser:!0,classes:{URLSearchParams:URLSearchParams$1,FormData:FormData$1,Blob:Blob$1},protocols:["http","https","file","blob","url","data"]},hasBrowserEnv=typeof window<"u"&&typeof document<"u",_navigator=typeof navigator=="object"&&navigator||void 0,hasStandardBrowserEnv=hasBrowserEnv&&(!_navigator||["ReactNative","NativeScript","NS"].indexOf(_navigator.product)<0),hasStandardBrowserWebWorkerEnv=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",origin=hasBrowserEnv&&window.location.href||"http://localhost",utils=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv,hasStandardBrowserEnv,hasStandardBrowserWebWorkerEnv,navigator:_navigator,origin},Symbol.toStringTag,{value:"Module"})),platform={...utils,...platform$1};function toURLEncodedForm(n,e){return toFormData$1(n,new platform.classes.URLSearchParams,Object.assign({visitor:function(t,s,i,l){return platform.isNode&&utils$1.isBuffer(t)?(this.append(s,t.toString("base64")),!1):l.defaultVisitor.apply(this,arguments)}},e))}function parsePropPath(n){return utils$1.matchAll(/\w+|\[(\w*)]/g,n).map(e=>e[0]==="[]"?"":e[1]||e[0])}function arrayToObject(n){const e={},t=Object.keys(n);let s;const i=t.length;let l;for(s=0;s<i;s++)l=t[s],e[l]=n[l];return e}function formDataToJSON(n){function e(t,s,i,l){let o=t[l++];if(o==="__proto__")return!0;const r=Number.isFinite(+o),c=l>=t.length;return o=!o&&utils$1.isArray(i)?i.length:o,c?(utils$1.hasOwnProp(i,o)?i[o]=[i[o],s]:i[o]=s,!r):((!i[o]||!utils$1.isObject(i[o]))&&(i[o]=[]),e(t,s,i[o],l)&&utils$1.isArray(i[o])&&(i[o]=arrayToObject(i[o])),!r)}if(utils$1.isFormData(n)&&utils$1.isFunction(n.entries)){const t={};return utils$1.forEachEntry(n,(s,i)=>{e(parsePropPath(s),i,t,0)}),t}return null}function stringifySafely(n,e,t){if(utils$1.isString(n))try{return(e||JSON.parse)(n),utils$1.trim(n)}catch(s){if(s.name!=="SyntaxError")throw s}return(t||JSON.stringify)(n)}const defaults={transitional:transitionalDefaults,adapter:["xhr","http","fetch"],transformRequest:[function(e,t){const s=t.getContentType()||"",i=s.indexOf("application/json")>-1,l=utils$1.isObject(e);if(l&&utils$1.isHTMLForm(e)&&(e=new FormData(e)),utils$1.isFormData(e))return i?JSON.stringify(formDataToJSON(e)):e;if(utils$1.isArrayBuffer(e)||utils$1.isBuffer(e)||utils$1.isStream(e)||utils$1.isFile(e)||utils$1.isBlob(e)||utils$1.isReadableStream(e))return e;if(utils$1.isArrayBufferView(e))return e.buffer;if(utils$1.isURLSearchParams(e))return t.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let r;if(l){if(s.indexOf("application/x-www-form-urlencoded")>-1)return toURLEncodedForm(e,this.formSerializer).toString();if((r=utils$1.isFileList(e))||s.indexOf("multipart/form-data")>-1){const c=this.env&&this.env.FormData;return toFormData$1(r?{"files[]":e}:e,c&&new c,this.formSerializer)}}return l||i?(t.setContentType("application/json",!1),stringifySafely(e)):e}],transformResponse:[function(e){const t=this.transitional||defaults.transitional,s=t&&t.forcedJSONParsing,i=this.responseType==="json";if(utils$1.isResponse(e)||utils$1.isReadableStream(e))return e;if(e&&utils$1.isString(e)&&(s&&!this.responseType||i)){const o=!(t&&t.silentJSONParsing)&&i;try{return JSON.parse(e)}catch(r){if(o)throw r.name==="SyntaxError"?AxiosError$1.from(r,AxiosError$1.ERR_BAD_RESPONSE,this,null,this.response):r}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:platform.classes.FormData,Blob:platform.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};utils$1.forEach(["delete","get","head","post","put","patch"],n=>{defaults.headers[n]={}});const ignoreDuplicateOf=utils$1.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),parseHeaders=n=>{const e={};let t,s,i;return n&&n.split(`
`).forEach(function(o){i=o.indexOf(":"),t=o.substring(0,i).trim().toLowerCase(),s=o.substring(i+1).trim(),!(!t||e[t]&&ignoreDuplicateOf[t])&&(t==="set-cookie"?e[t]?e[t].push(s):e[t]=[s]:e[t]=e[t]?e[t]+", "+s:s)}),e},$internals=Symbol("internals");function normalizeHeader(n){return n&&String(n).trim().toLowerCase()}function normalizeValue(n){return n===!1||n==null?n:utils$1.isArray(n)?n.map(normalizeValue):String(n)}function parseTokens(n){const e=Object.create(null),t=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let s;for(;s=t.exec(n);)e[s[1]]=s[2];return e}const isValidHeaderName=n=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());function matchHeaderValue(n,e,t,s,i){if(utils$1.isFunction(s))return s.call(this,e,t);if(i&&(e=t),!!utils$1.isString(e)){if(utils$1.isString(s))return e.indexOf(s)!==-1;if(utils$1.isRegExp(s))return s.test(e)}}function formatHeader(n){return n.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,t,s)=>t.toUpperCase()+s)}function buildAccessors(n,e){const t=utils$1.toCamelCase(" "+e);["get","set","has"].forEach(s=>{Object.defineProperty(n,s+t,{value:function(i,l,o){return this[s].call(this,e,i,l,o)},configurable:!0})})}let AxiosHeaders$1=class{constructor(e){e&&this.set(e)}set(e,t,s){const i=this;function l(r,c,Q){const a=normalizeHeader(c);if(!a)throw new Error("header name must be a non-empty string");const B=utils$1.findKey(i,a);(!B||i[B]===void 0||Q===!0||Q===void 0&&i[B]!==!1)&&(i[B||c]=normalizeValue(r))}const o=(r,c)=>utils$1.forEach(r,(Q,a)=>l(Q,a,c));if(utils$1.isPlainObject(e)||e instanceof this.constructor)o(e,t);else if(utils$1.isString(e)&&(e=e.trim())&&!isValidHeaderName(e))o(parseHeaders(e),t);else if(utils$1.isObject(e)&&utils$1.isIterable(e)){let r={},c,Q;for(const a of e){if(!utils$1.isArray(a))throw TypeError("Object iterator must return a key-value pair");r[Q=a[0]]=(c=r[Q])?utils$1.isArray(c)?[...c,a[1]]:[c,a[1]]:a[1]}o(r,t)}else e!=null&&l(t,e,s);return this}get(e,t){if(e=normalizeHeader(e),e){const s=utils$1.findKey(this,e);if(s){const i=this[s];if(!t)return i;if(t===!0)return parseTokens(i);if(utils$1.isFunction(t))return t.call(this,i,s);if(utils$1.isRegExp(t))return t.exec(i);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,t){if(e=normalizeHeader(e),e){const s=utils$1.findKey(this,e);return!!(s&&this[s]!==void 0&&(!t||matchHeaderValue(this,this[s],s,t)))}return!1}delete(e,t){const s=this;let i=!1;function l(o){if(o=normalizeHeader(o),o){const r=utils$1.findKey(s,o);r&&(!t||matchHeaderValue(s,s[r],r,t))&&(delete s[r],i=!0)}}return utils$1.isArray(e)?e.forEach(l):l(e),i}clear(e){const t=Object.keys(this);let s=t.length,i=!1;for(;s--;){const l=t[s];(!e||matchHeaderValue(this,this[l],l,e,!0))&&(delete this[l],i=!0)}return i}normalize(e){const t=this,s={};return utils$1.forEach(this,(i,l)=>{const o=utils$1.findKey(s,l);if(o){t[o]=normalizeValue(i),delete t[l];return}const r=e?formatHeader(l):String(l).trim();r!==l&&delete t[l],t[r]=normalizeValue(i),s[r]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const t=Object.create(null);return utils$1.forEach(this,(s,i)=>{s!=null&&s!==!1&&(t[i]=e&&utils$1.isArray(s)?s.join(", "):s)}),t}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,t])=>e+": "+t).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...t){const s=new this(e);return t.forEach(i=>s.set(i)),s}static accessor(e){const s=(this[$internals]=this[$internals]={accessors:{}}).accessors,i=this.prototype;function l(o){const r=normalizeHeader(o);s[r]||(buildAccessors(i,o),s[r]=!0)}return utils$1.isArray(e)?e.forEach(l):l(e),this}};AxiosHeaders$1.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);utils$1.reduceDescriptors(AxiosHeaders$1.prototype,({value:n},e)=>{let t=e[0].toUpperCase()+e.slice(1);return{get:()=>n,set(s){this[t]=s}}});utils$1.freezeMethods(AxiosHeaders$1);function transformData(n,e){const t=this||defaults,s=e||t,i=AxiosHeaders$1.from(s.headers);let l=s.data;return utils$1.forEach(n,function(r){l=r.call(t,l,i.normalize(),e?e.status:void 0)}),i.normalize(),l}function isCancel$1(n){return!!(n&&n.__CANCEL__)}function CanceledError$1(n,e,t){AxiosError$1.call(this,n??"canceled",AxiosError$1.ERR_CANCELED,e,t),this.name="CanceledError"}utils$1.inherits(CanceledError$1,AxiosError$1,{__CANCEL__:!0});function settle(n,e,t){const s=t.config.validateStatus;!t.status||!s||s(t.status)?n(t):e(new AxiosError$1("Request failed with status code "+t.status,[AxiosError$1.ERR_BAD_REQUEST,AxiosError$1.ERR_BAD_RESPONSE][Math.floor(t.status/100)-4],t.config,t.request,t))}function parseProtocol(n){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(n);return e&&e[1]||""}function speedometer(n,e){n=n||10;const t=new Array(n),s=new Array(n);let i=0,l=0,o;return e=e!==void 0?e:1e3,function(c){const Q=Date.now(),a=s[l];o||(o=Q),t[i]=c,s[i]=Q;let B=l,F=0;for(;B!==i;)F+=t[B++],B=B%n;if(i=(i+1)%n,i===l&&(l=(l+1)%n),Q-o<e)return;const I=a&&Q-a;return I?Math.round(F*1e3/I):void 0}}function throttle(n,e){let t=0,s=1e3/e,i,l;const o=(Q,a=Date.now())=>{t=a,i=null,l&&(clearTimeout(l),l=null),n.apply(null,Q)};return[(...Q)=>{const a=Date.now(),B=a-t;B>=s?o(Q,a):(i=Q,l||(l=setTimeout(()=>{l=null,o(i)},s-B)))},()=>i&&o(i)]}const progressEventReducer=(n,e,t=3)=>{let s=0;const i=speedometer(50,250);return throttle(l=>{const o=l.loaded,r=l.lengthComputable?l.total:void 0,c=o-s,Q=i(c),a=o<=r;s=o;const B={loaded:o,total:r,progress:r?o/r:void 0,bytes:c,rate:Q||void 0,estimated:Q&&r&&a?(r-o)/Q:void 0,event:l,lengthComputable:r!=null,[e?"download":"upload"]:!0};n(B)},t)},progressEventDecorator=(n,e)=>{const t=n!=null;return[s=>e[0]({lengthComputable:t,total:n,loaded:s}),e[1]]},asyncDecorator=n=>(...e)=>utils$1.asap(()=>n(...e)),isURLSameOrigin=platform.hasStandardBrowserEnv?((n,e)=>t=>(t=new URL(t,platform.origin),n.protocol===t.protocol&&n.host===t.host&&(e||n.port===t.port)))(new URL(platform.origin),platform.navigator&&/(msie|trident)/i.test(platform.navigator.userAgent)):()=>!0,cookies=platform.hasStandardBrowserEnv?{write(n,e,t,s,i,l){const o=[n+"="+encodeURIComponent(e)];utils$1.isNumber(t)&&o.push("expires="+new Date(t).toGMTString()),utils$1.isString(s)&&o.push("path="+s),utils$1.isString(i)&&o.push("domain="+i),l===!0&&o.push("secure"),document.cookie=o.join("; ")},read(n){const e=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove(n){this.write(n,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function isAbsoluteURL(n){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(n)}function combineURLs(n,e){return e?n.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):n}function buildFullPath(n,e,t){let s=!isAbsoluteURL(e);return n&&(s||t==!1)?combineURLs(n,e):e}const headersToObject=n=>n instanceof AxiosHeaders$1?{...n}:n;function mergeConfig$1(n,e){e=e||{};const t={};function s(Q,a,B,F){return utils$1.isPlainObject(Q)&&utils$1.isPlainObject(a)?utils$1.merge.call({caseless:F},Q,a):utils$1.isPlainObject(a)?utils$1.merge({},a):utils$1.isArray(a)?a.slice():a}function i(Q,a,B,F){if(utils$1.isUndefined(a)){if(!utils$1.isUndefined(Q))return s(void 0,Q,B,F)}else return s(Q,a,B,F)}function l(Q,a){if(!utils$1.isUndefined(a))return s(void 0,a)}function o(Q,a){if(utils$1.isUndefined(a)){if(!utils$1.isUndefined(Q))return s(void 0,Q)}else return s(void 0,a)}function r(Q,a,B){if(B in e)return s(Q,a);if(B in n)return s(void 0,Q)}const c={url:l,method:l,data:l,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:r,headers:(Q,a,B)=>i(headersToObject(Q),headersToObject(a),B,!0)};return utils$1.forEach(Object.keys(Object.assign({},n,e)),function(a){const B=c[a]||i,F=B(n[a],e[a],a);utils$1.isUndefined(F)&&B!==r||(t[a]=F)}),t}const resolveConfig=n=>{const e=mergeConfig$1({},n);let{data:t,withXSRFToken:s,xsrfHeaderName:i,xsrfCookieName:l,headers:o,auth:r}=e;e.headers=o=AxiosHeaders$1.from(o),e.url=buildURL(buildFullPath(e.baseURL,e.url,e.allowAbsoluteUrls),n.params,n.paramsSerializer),r&&o.set("Authorization","Basic "+btoa((r.username||"")+":"+(r.password?unescape(encodeURIComponent(r.password)):"")));let c;if(utils$1.isFormData(t)){if(platform.hasStandardBrowserEnv||platform.hasStandardBrowserWebWorkerEnv)o.setContentType(void 0);else if((c=o.getContentType())!==!1){const[Q,...a]=c?c.split(";").map(B=>B.trim()).filter(Boolean):[];o.setContentType([Q||"multipart/form-data",...a].join("; "))}}if(platform.hasStandardBrowserEnv&&(s&&utils$1.isFunction(s)&&(s=s(e)),s||s!==!1&&isURLSameOrigin(e.url))){const Q=i&&l&&cookies.read(l);Q&&o.set(i,Q)}return e},isXHRAdapterSupported=typeof XMLHttpRequest<"u",xhrAdapter=isXHRAdapterSupported&&function(n){return new Promise(function(t,s){const i=resolveConfig(n);let l=i.data;const o=AxiosHeaders$1.from(i.headers).normalize();let{responseType:r,onUploadProgress:c,onDownloadProgress:Q}=i,a,B,F,I,g;function u(){I&&I(),g&&g(),i.cancelToken&&i.cancelToken.unsubscribe(a),i.signal&&i.signal.removeEventListener("abort",a)}let d=new XMLHttpRequest;d.open(i.method.toUpperCase(),i.url,!0),d.timeout=i.timeout;function U(){if(!d)return;const E=AxiosHeaders$1.from("getAllResponseHeaders"in d&&d.getAllResponseHeaders()),b={data:!r||r==="text"||r==="json"?d.responseText:d.response,status:d.status,statusText:d.statusText,headers:E,config:n,request:d};settle(function(h){t(h),u()},function(h){s(h),u()},b),d=null}"onloadend"in d?d.onloadend=U:d.onreadystatechange=function(){!d||d.readyState!==4||d.status===0&&!(d.responseURL&&d.responseURL.indexOf("file:")===0)||setTimeout(U)},d.onabort=function(){d&&(s(new AxiosError$1("Request aborted",AxiosError$1.ECONNABORTED,n,d)),d=null)},d.onerror=function(){s(new AxiosError$1("Network Error",AxiosError$1.ERR_NETWORK,n,d)),d=null},d.ontimeout=function(){let C=i.timeout?"timeout of "+i.timeout+"ms exceeded":"timeout exceeded";const b=i.transitional||transitionalDefaults;i.timeoutErrorMessage&&(C=i.timeoutErrorMessage),s(new AxiosError$1(C,b.clarifyTimeoutError?AxiosError$1.ETIMEDOUT:AxiosError$1.ECONNABORTED,n,d)),d=null},l===void 0&&o.setContentType(null),"setRequestHeader"in d&&utils$1.forEach(o.toJSON(),function(C,b){d.setRequestHeader(b,C)}),utils$1.isUndefined(i.withCredentials)||(d.withCredentials=!!i.withCredentials),r&&r!=="json"&&(d.responseType=i.responseType),Q&&([F,g]=progressEventReducer(Q,!0),d.addEventListener("progress",F)),c&&d.upload&&([B,I]=progressEventReducer(c),d.upload.addEventListener("progress",B),d.upload.addEventListener("loadend",I)),(i.cancelToken||i.signal)&&(a=E=>{d&&(s(!E||E.type?new CanceledError$1(null,n,d):E),d.abort(),d=null)},i.cancelToken&&i.cancelToken.subscribe(a),i.signal&&(i.signal.aborted?a():i.signal.addEventListener("abort",a)));const m=parseProtocol(i.url);if(m&&platform.protocols.indexOf(m)===-1){s(new AxiosError$1("Unsupported protocol "+m+":",AxiosError$1.ERR_BAD_REQUEST,n));return}d.send(l||null)})},composeSignals=(n,e)=>{const{length:t}=n=n?n.filter(Boolean):[];if(e||t){let s=new AbortController,i;const l=function(Q){if(!i){i=!0,r();const a=Q instanceof Error?Q:this.reason;s.abort(a instanceof AxiosError$1?a:new CanceledError$1(a instanceof Error?a.message:a))}};let o=e&&setTimeout(()=>{o=null,l(new AxiosError$1(`timeout ${e} of ms exceeded`,AxiosError$1.ETIMEDOUT))},e);const r=()=>{n&&(o&&clearTimeout(o),o=null,n.forEach(Q=>{Q.unsubscribe?Q.unsubscribe(l):Q.removeEventListener("abort",l)}),n=null)};n.forEach(Q=>Q.addEventListener("abort",l));const{signal:c}=s;return c.unsubscribe=()=>utils$1.asap(r),c}},streamChunk=function*(n,e){let t=n.byteLength;if(t<e){yield n;return}let s=0,i;for(;s<t;)i=s+e,yield n.slice(s,i),s=i},readBytes=async function*(n,e){for await(const t of readStream(n))yield*streamChunk(t,e)},readStream=async function*(n){if(n[Symbol.asyncIterator]){yield*n;return}const e=n.getReader();try{for(;;){const{done:t,value:s}=await e.read();if(t)break;yield s}}finally{await e.cancel()}},trackStream=(n,e,t,s)=>{const i=readBytes(n,e);let l=0,o,r=c=>{o||(o=!0,s&&s(c))};return new ReadableStream({async pull(c){try{const{done:Q,value:a}=await i.next();if(Q){r(),c.close();return}let B=a.byteLength;if(t){let F=l+=B;t(F)}c.enqueue(new Uint8Array(a))}catch(Q){throw r(Q),Q}},cancel(c){return r(c),i.return()}},{highWaterMark:2})},isFetchSupported=typeof fetch=="function"&&typeof Request=="function"&&typeof Response=="function",isReadableStreamSupported=isFetchSupported&&typeof ReadableStream=="function",encodeText=isFetchSupported&&(typeof TextEncoder=="function"?(n=>e=>n.encode(e))(new TextEncoder):async n=>new Uint8Array(await new Response(n).arrayBuffer())),test=(n,...e)=>{try{return!!n(...e)}catch{return!1}},supportsRequestStream=isReadableStreamSupported&&test(()=>{let n=!1;const e=new Request(platform.origin,{body:new ReadableStream,method:"POST",get duplex(){return n=!0,"half"}}).headers.has("Content-Type");return n&&!e}),DEFAULT_CHUNK_SIZE=64*1024,supportsResponseStream=isReadableStreamSupported&&test(()=>utils$1.isReadableStream(new Response("").body)),resolvers={stream:supportsResponseStream&&(n=>n.body)};isFetchSupported&&(n=>{["text","arrayBuffer","blob","formData","stream"].forEach(e=>{!resolvers[e]&&(resolvers[e]=utils$1.isFunction(n[e])?t=>t[e]():(t,s)=>{throw new AxiosError$1(`Response type '${e}' is not supported`,AxiosError$1.ERR_NOT_SUPPORT,s)})})})(new Response);const getBodyLength=async n=>{if(n==null)return 0;if(utils$1.isBlob(n))return n.size;if(utils$1.isSpecCompliantForm(n))return(await new Request(platform.origin,{method:"POST",body:n}).arrayBuffer()).byteLength;if(utils$1.isArrayBufferView(n)||utils$1.isArrayBuffer(n))return n.byteLength;if(utils$1.isURLSearchParams(n)&&(n=n+""),utils$1.isString(n))return(await encodeText(n)).byteLength},resolveBodyLength=async(n,e)=>{const t=utils$1.toFiniteNumber(n.getContentLength());return t??getBodyLength(e)},fetchAdapter=isFetchSupported&&(async n=>{let{url:e,method:t,data:s,signal:i,cancelToken:l,timeout:o,onDownloadProgress:r,onUploadProgress:c,responseType:Q,headers:a,withCredentials:B="same-origin",fetchOptions:F}=resolveConfig(n);Q=Q?(Q+"").toLowerCase():"text";let I=composeSignals([i,l&&l.toAbortSignal()],o),g;const u=I&&I.unsubscribe&&(()=>{I.unsubscribe()});let d;try{if(c&&supportsRequestStream&&t!=="get"&&t!=="head"&&(d=await resolveBodyLength(a,s))!==0){let b=new Request(e,{method:"POST",body:s,duplex:"half"}),p;if(utils$1.isFormData(s)&&(p=b.headers.get("content-type"))&&a.setContentType(p),b.body){const[h,A]=progressEventDecorator(d,progressEventReducer(asyncDecorator(c)));s=trackStream(b.body,DEFAULT_CHUNK_SIZE,h,A)}}utils$1.isString(B)||(B=B?"include":"omit");const U="credentials"in Request.prototype;g=new Request(e,{...F,signal:I,method:t.toUpperCase(),headers:a.normalize().toJSON(),body:s,duplex:"half",credentials:U?B:void 0});let m=await fetch(g);const E=supportsResponseStream&&(Q==="stream"||Q==="response");if(supportsResponseStream&&(r||E&&u)){const b={};["status","statusText","headers"].forEach(G=>{b[G]=m[G]});const p=utils$1.toFiniteNumber(m.headers.get("content-length")),[h,A]=r&&progressEventDecorator(p,progressEventReducer(asyncDecorator(r),!0))||[];m=new Response(trackStream(m.body,DEFAULT_CHUNK_SIZE,h,()=>{A&&A(),u&&u()}),b)}Q=Q||"text";let C=await resolvers[utils$1.findKey(resolvers,Q)||"text"](m,n);return!E&&u&&u(),await new Promise((b,p)=>{settle(b,p,{data:C,headers:AxiosHeaders$1.from(m.headers),status:m.status,statusText:m.statusText,config:n,request:g})})}catch(U){throw u&&u(),U&&U.name==="TypeError"&&/Load failed|fetch/i.test(U.message)?Object.assign(new AxiosError$1("Network Error",AxiosError$1.ERR_NETWORK,n,g),{cause:U.cause||U}):AxiosError$1.from(U,U&&U.code,n,g)}}),knownAdapters={http:httpAdapter,xhr:xhrAdapter,fetch:fetchAdapter};utils$1.forEach(knownAdapters,(n,e)=>{if(n){try{Object.defineProperty(n,"name",{value:e})}catch{}Object.defineProperty(n,"adapterName",{value:e})}});const renderReason=n=>`- ${n}`,isResolvedHandle=n=>utils$1.isFunction(n)||n===null||n===!1,adapters={getAdapter:n=>{n=utils$1.isArray(n)?n:[n];const{length:e}=n;let t,s;const i={};for(let l=0;l<e;l++){t=n[l];let o;if(s=t,!isResolvedHandle(t)&&(s=knownAdapters[(o=String(t)).toLowerCase()],s===void 0))throw new AxiosError$1(`Unknown adapter '${o}'`);if(s)break;i[o||"#"+l]=s}if(!s){const l=Object.entries(i).map(([r,c])=>`adapter ${r} `+(c===!1?"is not supported by the environment":"is not available in the build"));let o=e?l.length>1?`since :
`+l.map(renderReason).join(`
`):" "+renderReason(l[0]):"as no adapter specified";throw new AxiosError$1("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return s},adapters:knownAdapters};function throwIfCancellationRequested(n){if(n.cancelToken&&n.cancelToken.throwIfRequested(),n.signal&&n.signal.aborted)throw new CanceledError$1(null,n)}function dispatchRequest(n){return throwIfCancellationRequested(n),n.headers=AxiosHeaders$1.from(n.headers),n.data=transformData.call(n,n.transformRequest),["post","put","patch"].indexOf(n.method)!==-1&&n.headers.setContentType("application/x-www-form-urlencoded",!1),adapters.getAdapter(n.adapter||defaults.adapter)(n).then(function(s){return throwIfCancellationRequested(n),s.data=transformData.call(n,n.transformResponse,s),s.headers=AxiosHeaders$1.from(s.headers),s},function(s){return isCancel$1(s)||(throwIfCancellationRequested(n),s&&s.response&&(s.response.data=transformData.call(n,n.transformResponse,s.response),s.response.headers=AxiosHeaders$1.from(s.response.headers))),Promise.reject(s)})}const VERSION$1="1.9.0",validators$1={};["object","boolean","number","function","string","symbol"].forEach((n,e)=>{validators$1[n]=function(s){return typeof s===n||"a"+(e<1?"n ":" ")+n}});const deprecatedWarnings={};validators$1.transitional=function(e,t,s){function i(l,o){return"[Axios v"+VERSION$1+"] Transitional option '"+l+"'"+o+(s?". "+s:"")}return(l,o,r)=>{if(e===!1)throw new AxiosError$1(i(o," has been removed"+(t?" in "+t:"")),AxiosError$1.ERR_DEPRECATED);return t&&!deprecatedWarnings[o]&&(deprecatedWarnings[o]=!0,console.warn(i(o," has been deprecated since v"+t+" and will be removed in the near future"))),e?e(l,o,r):!0}};validators$1.spelling=function(e){return(t,s)=>(console.warn(`${s} is likely a misspelling of ${e}`),!0)};function assertOptions(n,e,t){if(typeof n!="object")throw new AxiosError$1("options must be an object",AxiosError$1.ERR_BAD_OPTION_VALUE);const s=Object.keys(n);let i=s.length;for(;i-- >0;){const l=s[i],o=e[l];if(o){const r=n[l],c=r===void 0||o(r,l,n);if(c!==!0)throw new AxiosError$1("option "+l+" must be "+c,AxiosError$1.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new AxiosError$1("Unknown option "+l,AxiosError$1.ERR_BAD_OPTION)}}const validator={assertOptions,validators:validators$1},validators=validator.validators;let Axios$1=class{constructor(e){this.defaults=e||{},this.interceptors={request:new InterceptorManager,response:new InterceptorManager}}async request(e,t){try{return await this._request(e,t)}catch(s){if(s instanceof Error){let i={};Error.captureStackTrace?Error.captureStackTrace(i):i=new Error;const l=i.stack?i.stack.replace(/^.+\n/,""):"";try{s.stack?l&&!String(s.stack).endsWith(l.replace(/^.+\n.+\n/,""))&&(s.stack+=`
`+l):s.stack=l}catch{}}throw s}}_request(e,t){typeof e=="string"?(t=t||{},t.url=e):t=e||{},t=mergeConfig$1(this.defaults,t);const{transitional:s,paramsSerializer:i,headers:l}=t;s!==void 0&&validator.assertOptions(s,{silentJSONParsing:validators.transitional(validators.boolean),forcedJSONParsing:validators.transitional(validators.boolean),clarifyTimeoutError:validators.transitional(validators.boolean)},!1),i!=null&&(utils$1.isFunction(i)?t.paramsSerializer={serialize:i}:validator.assertOptions(i,{encode:validators.function,serialize:validators.function},!0)),t.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?t.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:t.allowAbsoluteUrls=!0),validator.assertOptions(t,{baseUrl:validators.spelling("baseURL"),withXsrfToken:validators.spelling("withXSRFToken")},!0),t.method=(t.method||this.defaults.method||"get").toLowerCase();let o=l&&utils$1.merge(l.common,l[t.method]);l&&utils$1.forEach(["delete","get","head","post","put","patch","common"],g=>{delete l[g]}),t.headers=AxiosHeaders$1.concat(o,l);const r=[];let c=!0;this.interceptors.request.forEach(function(u){typeof u.runWhen=="function"&&u.runWhen(t)===!1||(c=c&&u.synchronous,r.unshift(u.fulfilled,u.rejected))});const Q=[];this.interceptors.response.forEach(function(u){Q.push(u.fulfilled,u.rejected)});let a,B=0,F;if(!c){const g=[dispatchRequest.bind(this),void 0];for(g.unshift.apply(g,r),g.push.apply(g,Q),F=g.length,a=Promise.resolve(t);B<F;)a=a.then(g[B++],g[B++]);return a}F=r.length;let I=t;for(B=0;B<F;){const g=r[B++],u=r[B++];try{I=g(I)}catch(d){u.call(this,d);break}}try{a=dispatchRequest.call(this,I)}catch(g){return Promise.reject(g)}for(B=0,F=Q.length;B<F;)a=a.then(Q[B++],Q[B++]);return a}getUri(e){e=mergeConfig$1(this.defaults,e);const t=buildFullPath(e.baseURL,e.url,e.allowAbsoluteUrls);return buildURL(t,e.params,e.paramsSerializer)}};utils$1.forEach(["delete","get","head","options"],function(e){Axios$1.prototype[e]=function(t,s){return this.request(mergeConfig$1(s||{},{method:e,url:t,data:(s||{}).data}))}});utils$1.forEach(["post","put","patch"],function(e){function t(s){return function(l,o,r){return this.request(mergeConfig$1(r||{},{method:e,headers:s?{"Content-Type":"multipart/form-data"}:{},url:l,data:o}))}}Axios$1.prototype[e]=t(),Axios$1.prototype[e+"Form"]=t(!0)});let CancelToken$1=class le{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let t;this.promise=new Promise(function(l){t=l});const s=this;this.promise.then(i=>{if(!s._listeners)return;let l=s._listeners.length;for(;l-- >0;)s._listeners[l](i);s._listeners=null}),this.promise.then=i=>{let l;const o=new Promise(r=>{s.subscribe(r),l=r}).then(i);return o.cancel=function(){s.unsubscribe(l)},o},e(function(l,o,r){s.reason||(s.reason=new CanceledError$1(l,o,r),t(s.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const t=this._listeners.indexOf(e);t!==-1&&this._listeners.splice(t,1)}toAbortSignal(){const e=new AbortController,t=s=>{e.abort(s)};return this.subscribe(t),e.signal.unsubscribe=()=>this.unsubscribe(t),e.signal}static source(){let e;return{token:new le(function(i){e=i}),cancel:e}}};function spread$1(n){return function(t){return n.apply(null,t)}}function isAxiosError$1(n){return utils$1.isObject(n)&&n.isAxiosError===!0}const HttpStatusCode$1={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(HttpStatusCode$1).forEach(([n,e])=>{HttpStatusCode$1[e]=n});function createInstance(n){const e=new Axios$1(n),t=bind(Axios$1.prototype.request,e);return utils$1.extend(t,Axios$1.prototype,e,{allOwnKeys:!0}),utils$1.extend(t,e,null,{allOwnKeys:!0}),t.create=function(i){return createInstance(mergeConfig$1(n,i))},t}const axios=createInstance(defaults);axios.Axios=Axios$1;axios.CanceledError=CanceledError$1;axios.CancelToken=CancelToken$1;axios.isCancel=isCancel$1;axios.VERSION=VERSION$1;axios.toFormData=toFormData$1;axios.AxiosError=AxiosError$1;axios.Cancel=axios.CanceledError;axios.all=function(e){return Promise.all(e)};axios.spread=spread$1;axios.isAxiosError=isAxiosError$1;axios.mergeConfig=mergeConfig$1;axios.AxiosHeaders=AxiosHeaders$1;axios.formToJSON=n=>formDataToJSON(utils$1.isHTMLForm(n)?new FormData(n):n);axios.getAdapter=adapters.getAdapter;axios.HttpStatusCode=HttpStatusCode$1;axios.default=axios;const{Axios,AxiosError,CanceledError,isCancel,CancelToken,VERSION,all,Cancel,isAxiosError,spread,toFormData,AxiosHeaders,HttpStatusCode,formToJSON,getAdapter,mergeConfig}=axios;window.axios=axios;window.axios.defaults.headers.common["X-Requested-With"]="XMLHttpRequest";(function(n,e){for(var t in e)n[t]=e[t]})(window,function(n){var e={};function t(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return n[s].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=n,t.c=e,t.d=function(s,i,l){t.o(s,i)||Object.defineProperty(s,i,{enumerable:!0,get:l})},t.r=function(s){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},t.t=function(s,i){if(i&1&&(s=t(s)),i&8||i&4&&typeof s=="object"&&s&&s.__esModule)return s;var l=Object.create(null);if(t.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:s}),i&2&&typeof s!="string")for(var o in s)t.d(l,o,(function(r){return s[r]}).bind(null,o));return l},t.n=function(s){var i=s&&s.__esModule?function(){return s.default}:function(){return s};return t.d(i,"a",i),i},t.o=function(s,i){return Object.prototype.hasOwnProperty.call(s,i)},t.p="",t(t.s="./js/helpers.js")}({"./js/helpers.js":function(module,__webpack_exports__,__webpack_require__){eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Helpers", function() { return Helpers; });
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Constants
var TRANS_EVENTS = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd'];
var TRANS_PROPERTIES = ['transition', 'MozTransition', 'webkitTransition', 'WebkitTransition', 'OTransition'];
var INLINE_STYLES = "\\n.layout-menu-fixed .layout-navbar-full .layout-menu,\\n.layout-page {\\n  padding-top: {navbarHeight}px !important;\\n}\\n.content-wrapper {\\n  padding-bottom: {footerHeight}px !important;\\n}"; // Guard

function requiredParam(name) {
  throw new Error("Parameter required".concat(name ? ": \`".concat(name, "\`") : ''));
}

var Helpers = {
  // Root Element
  ROOT_EL: typeof window !== 'undefined' ? document.documentElement : null,
  // Large screens breakpoint
  LAYOUT_BREAKPOINT: 1200,
  // Resize delay in milliseconds
  RESIZE_DELAY: 200,
  menuPsScroll: null,
  mainMenu: null,
  // Internal variables
  _curStyle: null,
  _styleEl: null,
  _resizeTimeout: null,
  _resizeCallback: null,
  _transitionCallback: null,
  _transitionCallbackTimeout: null,
  _listeners: [],
  _initialized: false,
  _autoUpdate: false,
  _lastWindowHeight: 0,
  // *******************************************************************************
  // * Utilities
  // ---
  // Scroll To Active Menu Item
  _scrollToActive: function _scrollToActive() {
    var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var layoutMenu = this.getLayoutMenu();
    if (!layoutMenu) return;
    var activeEl = layoutMenu.querySelector('li.menu-item.active:not(.open)');

    if (activeEl) {
      // t = current time
      // b = start value
      // c = change in value
      // d = duration
      var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t -= 1;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      var element = this.getLayoutMenu().querySelector('.menu-inner');

      if (typeof activeEl === 'string') {
        activeEl = document.querySelector(activeEl);
      }

      if (typeof activeEl !== 'number') {
        activeEl = activeEl.getBoundingClientRect().top + element.scrollTop;
      } // If active element's top position is less than 2/3 (66%) of menu height than do not scroll


      if (activeEl < parseInt(element.clientHeight * 2 / 3, 10)) return;
      var start = element.scrollTop;
      var change = activeEl - start - parseInt(element.clientHeight / 2, 10);
      var startDate = +new Date();

      if (animate === true) {
        var animateScroll = function animateScroll() {
          var currentDate = +new Date();
          var currentTime = currentDate - startDate;
          var val = easeInOutQuad(currentTime, start, change, duration);
          element.scrollTop = val;

          if (currentTime < duration) {
            requestAnimationFrame(animateScroll);
          } else {
            element.scrollTop = change;
          }
        };

        animateScroll();
      } else {
        element.scrollTop = change;
      }
    }
  },
  // ---
  // Add classes
  _addClass: function _addClass(cls) {
    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.ROOT_EL;

    if (el.length !== undefined) {
      // Add classes to multiple elements
      el.forEach(function (e) {
        cls.split(' ').forEach(function (c) {
          return e.classList.add(c);
        });
      });
    } else {
      // Add classes to single element
      cls.split(' ').forEach(function (c) {
        return el.classList.add(c);
      });
    }
  },
  // ---
  // Remove classes
  _removeClass: function _removeClass(cls) {
    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.ROOT_EL;

    if (el.length !== undefined) {
      // Remove classes to multiple elements
      el.forEach(function (e) {
        cls.split(' ').forEach(function (c) {
          return e.classList.remove(c);
        });
      });
    } else {
      // Remove classes to single element
      cls.split(' ').forEach(function (c) {
        return el.classList.remove(c);
      });
    }
  },
  // Toggle classes
  _toggleClass: function _toggleClass() {
    var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.ROOT_EL;
    var cls1 = arguments.length > 1 ? arguments[1] : undefined;
    var cls2 = arguments.length > 2 ? arguments[2] : undefined;

    if (el.classList.contains(cls1)) {
      el.classList.replace(cls1, cls2);
    } else {
      el.classList.replace(cls2, cls1);
    }
  },
  // ---
  // Has class
  _hasClass: function _hasClass(cls) {
    var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.ROOT_EL;
    var result = false;
    cls.split(' ').forEach(function (c) {
      if (el.classList.contains(c)) result = true;
    });
    return result;
  },
  _findParent: function _findParent(el, cls) {
    if (el && el.tagName.toUpperCase() === 'BODY' || el.tagName.toUpperCase() === 'HTML') return null;
    el = el.parentNode;

    while (el && el.tagName.toUpperCase() !== 'BODY' && !el.classList.contains(cls)) {
      el = el.parentNode;
    }

    el = el && el.tagName.toUpperCase() !== 'BODY' ? el : null;
    return el;
  },
  // ---
  // Trigger window event
  _triggerWindowEvent: function _triggerWindowEvent(name) {
    if (typeof window === 'undefined') return;

    if (document.createEvent) {
      var event;

      if (typeof Event === 'function') {
        event = new Event(name);
      } else {
        event = document.createEvent('Event');
        event.initEvent(name, false, true);
      }

      window.dispatchEvent(event);
    } else {
      window.fireEvent("on".concat(name), document.createEventObject());
    }
  },
  // ---
  // Trigger event
  _triggerEvent: function _triggerEvent(name) {
    this._triggerWindowEvent("layout".concat(name));

    this._listeners.filter(function (listener) {
      return listener.event === name;
    }).forEach(function (listener) {
      return listener.callback.call(null);
    });
  },
  // ---
  // Update style
  _updateInlineStyle: function _updateInlineStyle() {
    var navbarHeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var footerHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (!this._styleEl) {
      this._styleEl = document.createElement('style');
      this._styleEl.type = 'text/css';
      document.head.appendChild(this._styleEl);
    }

    var newStyle = INLINE_STYLES.replace(/\\{navbarHeight\\}/gi, navbarHeight).replace(/\\{footerHeight\\}/gi, footerHeight);

    if (this._curStyle !== newStyle) {
      this._curStyle = newStyle;
      this._styleEl.textContent = newStyle;
    }
  },
  // ---
  // Remove style
  _removeInlineStyle: function _removeInlineStyle() {
    if (this._styleEl) document.head.removeChild(this._styleEl);
    this._styleEl = null;
    this._curStyle = null;
  },
  // ---
  // Redraw layout menu (Safari bugfix)
  _redrawLayoutMenu: function _redrawLayoutMenu() {
    var layoutMenu = this.getLayoutMenu();

    if (layoutMenu && layoutMenu.querySelector('.menu')) {
      var inner = layoutMenu.querySelector('.menu-inner');
      var scrollTop = inner.scrollTop;
      var pageScrollTop = document.documentElement.scrollTop;
      layoutMenu.style.display = 'none'; // layoutMenu.offsetHeight

      layoutMenu.style.display = '';
      inner.scrollTop = scrollTop;
      document.documentElement.scrollTop = pageScrollTop;
      return true;
    }

    return false;
  },
  // ---
  // Check for transition support
  _supportsTransitionEnd: function _supportsTransitionEnd() {
    if (window.QUnit) return false;
    var el = document.body || document.documentElement;
    if (!el) return false;
    var result = false;
    TRANS_PROPERTIES.forEach(function (evnt) {
      if (typeof el.style[evnt] !== 'undefined') result = true;
    });
    return result;
  },
  // ---
  // Calculate current navbar height
  _getNavbarHeight: function _getNavbarHeight() {
    var _this = this;

    var layoutNavbar = this.getLayoutNavbar();
    if (!layoutNavbar) return 0;
    if (!this.isSmallScreen()) return layoutNavbar.getBoundingClientRect().height; // Needs some logic to get navbar height on small screens

    var clonedEl = layoutNavbar.cloneNode(true);
    clonedEl.id = null;
    clonedEl.style.visibility = 'hidden';
    clonedEl.style.position = 'absolute';
    Array.prototype.slice.call(clonedEl.querySelectorAll('.collapse.show')).forEach(function (el) {
      return _this._removeClass('show', el);
    });
    layoutNavbar.parentNode.insertBefore(clonedEl, layoutNavbar);
    var navbarHeight = clonedEl.getBoundingClientRect().height;
    clonedEl.parentNode.removeChild(clonedEl);
    return navbarHeight;
  },
  // ---
  // Get current footer height
  _getFooterHeight: function _getFooterHeight() {
    var layoutFooter = this.getLayoutFooter();
    if (!layoutFooter) return 0;
    return layoutFooter.getBoundingClientRect().height;
  },
  // ---
  // Get animation duration of element
  _getAnimationDuration: function _getAnimationDuration(el) {
    var duration = window.getComputedStyle(el).transitionDuration;
    return parseFloat(duration) * (duration.indexOf('ms') !== -1 ? 1 : 1000);
  },
  // ---
  // Set menu hover state
  _setMenuHoverState: function _setMenuHoverState(hovered) {
    this[hovered ? '_addClass' : '_removeClass']('layout-menu-hover');
  },
  // ---
  // Toggle collapsed
  _setCollapsed: function _setCollapsed(collapsed) {
    var _this2 = this;

    if (this.isSmallScreen()) {
      if (collapsed) {
        this._removeClass('layout-menu-expanded');
      } else {
        setTimeout(function () {
          _this2._addClass('layout-menu-expanded');
        }, this._redrawLayoutMenu() ? 5 : 0);
      }
    }
  },
  // ---
  // Add layout sivenav toggle animationEnd event
  _bindLayoutAnimationEndEvent: function _bindLayoutAnimationEndEvent(modifier, cb) {
    var _this3 = this;

    var menu = this.getMenu();
    var duration = menu ? this._getAnimationDuration(menu) + 50 : 0;

    if (!duration) {
      modifier.call(this);
      cb.call(this);
      return;
    }

    this._transitionCallback = function (e) {
      if (e.target !== menu) return;

      _this3._unbindLayoutAnimationEndEvent();

      cb.call(_this3);
    };

    TRANS_EVENTS.forEach(function (e) {
      menu.addEventListener(e, _this3._transitionCallback, false);
    });
    modifier.call(this);
    this._transitionCallbackTimeout = setTimeout(function () {
      _this3._transitionCallback.call(_this3, {
        target: menu
      });
    }, duration);
  },
  // ---
  // Remove layout sivenav toggle animationEnd event
  _unbindLayoutAnimationEndEvent: function _unbindLayoutAnimationEndEvent() {
    var _this4 = this;

    var menu = this.getMenu();

    if (this._transitionCallbackTimeout) {
      clearTimeout(this._transitionCallbackTimeout);
      this._transitionCallbackTimeout = null;
    }

    if (menu && this._transitionCallback) {
      TRANS_EVENTS.forEach(function (e) {
        menu.removeEventListener(e, _this4._transitionCallback, false);
      });
    }

    if (this._transitionCallback) {
      this._transitionCallback = null;
    }
  },
  // ---
  // Bind delayed window resize event
  _bindWindowResizeEvent: function _bindWindowResizeEvent() {
    var _this5 = this;

    this._unbindWindowResizeEvent();

    var cb = function cb() {
      if (_this5._resizeTimeout) {
        clearTimeout(_this5._resizeTimeout);
        _this5._resizeTimeout = null;
      }

      _this5._triggerEvent('resize');
    };

    this._resizeCallback = function () {
      if (_this5._resizeTimeout) clearTimeout(_this5._resizeTimeout);
      _this5._resizeTimeout = setTimeout(cb, _this5.RESIZE_DELAY);
    };

    window.addEventListener('resize', this._resizeCallback, false);
  },
  // ---
  // Unbind delayed window resize event
  _unbindWindowResizeEvent: function _unbindWindowResizeEvent() {
    if (this._resizeTimeout) {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = null;
    }

    if (this._resizeCallback) {
      window.removeEventListener('resize', this._resizeCallback, false);
      this._resizeCallback = null;
    }
  },
  _bindMenuMouseEvents: function _bindMenuMouseEvents() {
    var _this6 = this;

    if (this._menuMouseEnter && this._menuMouseLeave && this._windowTouchStart) return;
    var layoutMenu = this.getLayoutMenu();
    if (!layoutMenu) return this._unbindMenuMouseEvents();

    if (!this._menuMouseEnter) {
      this._menuMouseEnter = function () {
        if (_this6.isSmallScreen() || _this6._hasClass('layout-transitioning')) {
          return _this6._setMenuHoverState(false);
        }

        return _this6._setMenuHoverState(false);
      };

      layoutMenu.addEventListener('mouseenter', this._menuMouseEnter, false);
      layoutMenu.addEventListener('touchstart', this._menuMouseEnter, false);
    }

    if (!this._menuMouseLeave) {
      this._menuMouseLeave = function () {
        _this6._setMenuHoverState(false);
      };

      layoutMenu.addEventListener('mouseleave', this._menuMouseLeave, false);
    }

    if (!this._windowTouchStart) {
      this._windowTouchStart = function (e) {
        if (!e || !e.target || !_this6._findParent(e.target, '.layout-menu')) {
          _this6._setMenuHoverState(false);
        }
      };

      window.addEventListener('touchstart', this._windowTouchStart, true);
    }
  },
  _unbindMenuMouseEvents: function _unbindMenuMouseEvents() {
    if (!this._menuMouseEnter && !this._menuMouseLeave && !this._windowTouchStart) return;
    var layoutMenu = this.getLayoutMenu();

    if (this._menuMouseEnter) {
      if (layoutMenu) {
        layoutMenu.removeEventListener('mouseenter', this._menuMouseEnter, false);
        layoutMenu.removeEventListener('touchstart', this._menuMouseEnter, false);
      }

      this._menuMouseEnter = null;
    }

    if (this._menuMouseLeave) {
      if (layoutMenu) {
        layoutMenu.removeEventListener('mouseleave', this._menuMouseLeave, false);
      }

      this._menuMouseLeave = null;
    }

    if (this._windowTouchStart) {
      if (layoutMenu) {
        window.addEventListener('touchstart', this._windowTouchStart, true);
      }

      this._windowTouchStart = null;
    }

    this._setMenuHoverState(false);
  },
  // *******************************************************************************
  // * Methods
  scrollToActive: function scrollToActive() {
    var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    this._scrollToActive(animate);
  },
  // ---
  // Collapse / expand layout
  setCollapsed: function setCollapsed() {
    var _this7 = this;

    var collapsed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('collapsed');
    var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var layoutMenu = this.getLayoutMenu();
    if (!layoutMenu) return;

    this._unbindLayoutAnimationEndEvent();

    if (animate && this._supportsTransitionEnd()) {
      this._addClass('layout-transitioning');

      if (collapsed) this._setMenuHoverState(false);

      this._bindLayoutAnimationEndEvent(function () {
        // Collapse / Expand
        if (_this7.isSmallScreen) _this7._setCollapsed(collapsed);
      }, function () {
        _this7._removeClass('layout-transitioning');

        _this7._triggerWindowEvent('resize');

        _this7._triggerEvent('toggle');

        _this7._setMenuHoverState(false);
      });
    } else {
      this._addClass('layout-no-transition');

      if (collapsed) this._setMenuHoverState(false); // Collapse / Expand

      this._setCollapsed(collapsed);

      setTimeout(function () {
        _this7._removeClass('layout-no-transition');

        _this7._triggerWindowEvent('resize');

        _this7._triggerEvent('toggle');

        _this7._setMenuHoverState(false);
      }, 1);
    }
  },
  // ---
  // Toggle layout
  toggleCollapsed: function toggleCollapsed() {
    var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    this.setCollapsed(!this.isCollapsed(), animate);
  },
  // ---
  // Set layout positioning
  setPosition: function setPosition() {
    var fixed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('fixed');
    var offcanvas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : requiredParam('offcanvas');

    this._removeClass('layout-menu-offcanvas layout-menu-fixed layout-menu-fixed-offcanvas');

    if (!fixed && offcanvas) {
      this._addClass('layout-menu-offcanvas');
    } else if (fixed && !offcanvas) {
      this._addClass('layout-menu-fixed');

      this._redrawLayoutMenu();
    } else if (fixed && offcanvas) {
      this._addClass('layout-menu-fixed-offcanvas');

      this._redrawLayoutMenu();
    }

    this.update();
  },
  // *******************************************************************************
  // * Getters
  getLayoutMenu: function getLayoutMenu() {
    return document.querySelector('.layout-menu');
  },
  getMenu: function getMenu() {
    var layoutMenu = this.getLayoutMenu();
    if (!layoutMenu) return null;
    return !this._hasClass('menu', layoutMenu) ? layoutMenu.querySelector('.menu') : layoutMenu;
  },
  getLayoutNavbar: function getLayoutNavbar() {
    return document.querySelector('.layout-navbar');
  },
  getLayoutFooter: function getLayoutFooter() {
    return document.querySelector('.content-footer');
  },
  // *******************************************************************************
  // * Update
  update: function update() {
    if (this.getLayoutNavbar() && (!this.isSmallScreen() && this.isLayoutNavbarFull() && this.isFixed() || this.isNavbarFixed()) || this.getLayoutFooter() && this.isFooterFixed()) {
      this._updateInlineStyle(this._getNavbarHeight(), this._getFooterHeight());
    }

    this._bindMenuMouseEvents();
  },
  setAutoUpdate: function setAutoUpdate() {
    var _this8 = this;

    var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('enable');

    if (enable && !this._autoUpdate) {
      this.on('resize.Helpers:autoUpdate', function () {
        return _this8.update();
      });
      this._autoUpdate = true;
    } else if (!enable && this._autoUpdate) {
      this.off('resize.Helpers:autoUpdate');
      this._autoUpdate = false;
    }
  },
  // *******************************************************************************
  // * Tests
  isRtl: function isRtl() {
    return document.querySelector('body').getAttribute('dir') === 'rtl' || document.querySelector('html').getAttribute('dir') === 'rtl';
  },
  isMobileDevice: function isMobileDevice() {
    return typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1;
  },
  isSmallScreen: function isSmallScreen() {
    return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < this.LAYOUT_BREAKPOINT;
  },
  isLayoutNavbarFull: function isLayoutNavbarFull() {
    return !!document.querySelector('.layout-wrapper.layout-navbar-full');
  },
  isCollapsed: function isCollapsed() {
    if (this.isSmallScreen()) {
      return !this._hasClass('layout-menu-expanded');
    }

    return this._hasClass('layout-menu-collapsed');
  },
  isFixed: function isFixed() {
    return this._hasClass('layout-menu-fixed layout-menu-fixed-offcanvas');
  },
  isNavbarFixed: function isNavbarFixed() {
    return this._hasClass('layout-navbar-fixed') || !this.isSmallScreen() && this.isFixed() && this.isLayoutNavbarFull();
  },
  isFooterFixed: function isFooterFixed() {
    return this._hasClass('layout-footer-fixed');
  },
  isLightStyle: function isLightStyle() {
    return document.documentElement.classList.contains('light-style');
  },
  // *******************************************************************************
  // * Events
  on: function on() {
    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('event');
    var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : requiredParam('callback');

    var _event$split = event.split('.'),
        _event$split2 = _slicedToArray(_event$split, 1),
        _event = _event$split2[0];

    var _event$split3 = event.split('.'),
        _event$split4 = _toArray(_event$split3),
        namespace = _event$split4.slice(1); // let [_event, ...namespace] = event.split('.')


    namespace = namespace.join('.') || null;

    this._listeners.push({
      event: _event,
      namespace: namespace,
      callback: callback
    });
  },
  off: function off() {
    var _this9 = this;

    var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : requiredParam('event');

    var _event$split5 = event.split('.'),
        _event$split6 = _slicedToArray(_event$split5, 1),
        _event = _event$split6[0];

    var _event$split7 = event.split('.'),
        _event$split8 = _toArray(_event$split7),
        namespace = _event$split8.slice(1);

    namespace = namespace.join('.') || null;

    this._listeners.filter(function (listener) {
      return listener.event === _event && listener.namespace === namespace;
    }).forEach(function (listener) {
      return _this9._listeners.splice(_this9._listeners.indexOf(listener), 1);
    });
  },
  // *******************************************************************************
  // * Life cycle
  init: function init() {
    var _this10 = this;

    if (this._initialized) return;
    this._initialized = true; // Initialize \`style\` element

    this._updateInlineStyle(0); // Bind window resize event


    this._bindWindowResizeEvent(); // Bind init event


    this.off('init._Helpers');
    this.on('init._Helpers', function () {
      _this10.off('resize._Helpers:redrawMenu');

      _this10.on('resize._Helpers:redrawMenu', function () {
        // eslint-disable-next-line no-unused-expressions
        _this10.isSmallScreen() && !_this10.isCollapsed() && _this10._redrawLayoutMenu();
      }); // Force repaint in IE 10


      if (typeof document.documentMode === 'number' && document.documentMode < 11) {
        _this10.off('resize._Helpers:ie10RepaintBody');

        _this10.on('resize._Helpers:ie10RepaintBody', function () {
          if (_this10.isFixed()) return;
          var scrollTop = document.documentElement.scrollTop;
          document.body.style.display = 'none'; // document.body.offsetHeight

          document.body.style.display = 'block';
          document.documentElement.scrollTop = scrollTop;
        });
      }
    });

    this._triggerEvent('init');
  },
  destroy: function destroy() {
    var _this11 = this;

    if (!this._initialized) return;
    this._initialized = false;

    this._removeClass('layout-transitioning');

    this._removeInlineStyle();

    this._unbindLayoutAnimationEndEvent();

    this._unbindWindowResizeEvent();

    this._unbindMenuMouseEvents();

    this.setAutoUpdate(false);
    this.off('init._Helpers'); // Remove all listeners except \`init\`

    this._listeners.filter(function (listener) {
      return listener.event !== 'init';
    }).forEach(function (listener) {
      return _this11._listeners.splice(_this11._listeners.indexOf(listener), 1);
    });
  },
  // ---
  // Init Password Toggle
  initPasswordToggle: function initPasswordToggle() {
    var toggler = document.querySelectorAll('.form-password-toggle i');

    if (typeof toggler !== 'undefined' && toggler !== null) {
      toggler.forEach(function (el) {
        el.addEventListener('click', function (e) {
          e.preventDefault();
          var formPasswordToggle = el.closest('.form-password-toggle');
          var formPasswordToggleIcon = formPasswordToggle.querySelector('i');
          var formPasswordToggleInput = formPasswordToggle.querySelector('input');

          if (formPasswordToggleInput.getAttribute('type') === 'text') {
            formPasswordToggleInput.setAttribute('type', 'password');
            formPasswordToggleIcon.classList.replace('bx-show', 'bx-hide');
          } else if (formPasswordToggleInput.getAttribute('type') === 'password') {
            formPasswordToggleInput.setAttribute('type', 'text');
            formPasswordToggleIcon.classList.replace('bx-hide', 'bx-show');
          }
        });
      });
    }
  },
  // ---
  // Init Speech To Text
  initSpeechToText: function initSpeechToText() {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var speechToText = document.querySelectorAll('.speech-to-text');

    if (SpeechRecognition !== undefined && SpeechRecognition !== null) {
      if (typeof speechToText !== 'undefined' && speechToText !== null) {
        var recognition = new SpeechRecognition();
        var toggler = document.querySelectorAll('.speech-to-text i');
        toggler.forEach(function (el) {
          var listening = false;
          el.addEventListener('click', function () {
            el.closest('.input-group').querySelector('.form-control').focus();

            recognition.onspeechstart = function () {
              listening = true;
            };

            if (listening === false) {
              recognition.start();
            }

            recognition.onerror = function () {
              listening = false;
            };

            recognition.onresult = function (event) {
              el.closest('.input-group').querySelector('.form-control').value = event.results[0][0].transcript;
            };

            recognition.onspeechend = function () {
              listening = false;
              recognition.stop();
            };
          });
        });
      }
    }
  },
  // Ajax Call Promise
  ajaxCall: function ajaxCall(url) {
    return new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function () {
        return req.status === 200 ? resolve(req.response) : reject(Error(req.statusText));
      };

      req.onerror = function (e) {
        return reject(Error("Network Error: ".concat(e)));
      };

      req.send();
    });
  },
  // ---
  // SidebarToggle (Used in Apps)
  initSidebarToggle: function initSidebarToggle() {
    var sidebarToggler = document.querySelectorAll('[data-bs-toggle="sidebar"]');
    sidebarToggler.forEach(function (el) {
      el.addEventListener('click', function () {
        var target = el.getAttribute('data-target');
        var overlay = el.getAttribute('data-overlay');
        var appOverlay = document.querySelectorAll('.app-overlay');
        var targetEl = document.querySelectorAll(target);
        targetEl.forEach(function (tel) {
          tel.classList.toggle('show');

          if (typeof overlay !== 'undefined' && overlay !== null && overlay !== false && typeof appOverlay !== 'undefined') {
            if (tel.classList.contains('show')) {
              appOverlay[0].classList.add('show');
            } else {
              appOverlay[0].classList.remove('show');
            }

            appOverlay[0].addEventListener('click', function (e) {
              e.currentTarget.classList.remove('show');
              tel.classList.remove('show');
            });
          }
        });
      });
    });
  }
}; // *******************************************************************************
// * Initialization

if (typeof window !== 'undefined') {
  Helpers.init();

  if (Helpers.isMobileDevice() && window.chrome) {
    document.documentElement.classList.add('layout-menu-100vh');
  } // Update layout after page load


  if (document.readyState === 'complete') Helpers.update();else document.addEventListener('DOMContentLoaded', function onContentLoaded() {
    Helpers.update();
    document.removeEventListener('DOMContentLoaded', onContentLoaded);
  });
} // ---


//# sourceURL=[module]
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXJzLmpzPzBiMjEiXSwibmFtZXMiOlsiVFJBTlNfRVZFTlRTIiwiVFJBTlNfUFJPUEVSVElFUyIsIklOTElORV9TVFlMRVMiLCJyZXF1aXJlZFBhcmFtIiwibmFtZSIsIkVycm9yIiwiSGVscGVycyIsIlJPT1RfRUwiLCJ3aW5kb3ciLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsIkxBWU9VVF9CUkVBS1BPSU5UIiwiUkVTSVpFX0RFTEFZIiwibWVudVBzU2Nyb2xsIiwibWFpbk1lbnUiLCJfY3VyU3R5bGUiLCJfc3R5bGVFbCIsIl9yZXNpemVUaW1lb3V0IiwiX3Jlc2l6ZUNhbGxiYWNrIiwiX3RyYW5zaXRpb25DYWxsYmFjayIsIl90cmFuc2l0aW9uQ2FsbGJhY2tUaW1lb3V0IiwiX2xpc3RlbmVycyIsIl9pbml0aWFsaXplZCIsIl9hdXRvVXBkYXRlIiwiX2xhc3RXaW5kb3dIZWlnaHQiLCJfc2Nyb2xsVG9BY3RpdmUiLCJhbmltYXRlIiwiZHVyYXRpb24iLCJsYXlvdXRNZW51IiwiZ2V0TGF5b3V0TWVudSIsImFjdGl2ZUVsIiwicXVlcnlTZWxlY3RvciIsImVhc2VJbk91dFF1YWQiLCJ0IiwiYiIsImMiLCJkIiwiZWxlbWVudCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInRvcCIsInNjcm9sbFRvcCIsInBhcnNlSW50IiwiY2xpZW50SGVpZ2h0Iiwic3RhcnQiLCJjaGFuZ2UiLCJzdGFydERhdGUiLCJEYXRlIiwiYW5pbWF0ZVNjcm9sbCIsImN1cnJlbnREYXRlIiwiY3VycmVudFRpbWUiLCJ2YWwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfYWRkQ2xhc3MiLCJjbHMiLCJlbCIsImxlbmd0aCIsInVuZGVmaW5lZCIsImZvckVhY2giLCJlIiwic3BsaXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJfcmVtb3ZlQ2xhc3MiLCJyZW1vdmUiLCJfdG9nZ2xlQ2xhc3MiLCJjbHMxIiwiY2xzMiIsImNvbnRhaW5zIiwicmVwbGFjZSIsIl9oYXNDbGFzcyIsInJlc3VsdCIsIl9maW5kUGFyZW50IiwidGFnTmFtZSIsInRvVXBwZXJDYXNlIiwicGFyZW50Tm9kZSIsIl90cmlnZ2VyV2luZG93RXZlbnQiLCJjcmVhdGVFdmVudCIsImV2ZW50IiwiRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiZmlyZUV2ZW50IiwiY3JlYXRlRXZlbnRPYmplY3QiLCJfdHJpZ2dlckV2ZW50IiwiZmlsdGVyIiwibGlzdGVuZXIiLCJjYWxsYmFjayIsImNhbGwiLCJfdXBkYXRlSW5saW5lU3R5bGUiLCJuYXZiYXJIZWlnaHQiLCJmb290ZXJIZWlnaHQiLCJjcmVhdGVFbGVtZW50IiwidHlwZSIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIm5ld1N0eWxlIiwidGV4dENvbnRlbnQiLCJfcmVtb3ZlSW5saW5lU3R5bGUiLCJyZW1vdmVDaGlsZCIsIl9yZWRyYXdMYXlvdXRNZW51IiwiaW5uZXIiLCJwYWdlU2Nyb2xsVG9wIiwic3R5bGUiLCJkaXNwbGF5IiwiX3N1cHBvcnRzVHJhbnNpdGlvbkVuZCIsIlFVbml0IiwiYm9keSIsImV2bnQiLCJfZ2V0TmF2YmFySGVpZ2h0IiwibGF5b3V0TmF2YmFyIiwiZ2V0TGF5b3V0TmF2YmFyIiwiaXNTbWFsbFNjcmVlbiIsImhlaWdodCIsImNsb25lZEVsIiwiY2xvbmVOb2RlIiwiaWQiLCJ2aXNpYmlsaXR5IiwicG9zaXRpb24iLCJBcnJheSIsInByb3RvdHlwZSIsInNsaWNlIiwicXVlcnlTZWxlY3RvckFsbCIsImluc2VydEJlZm9yZSIsIl9nZXRGb290ZXJIZWlnaHQiLCJsYXlvdXRGb290ZXIiLCJnZXRMYXlvdXRGb290ZXIiLCJfZ2V0QW5pbWF0aW9uRHVyYXRpb24iLCJnZXRDb21wdXRlZFN0eWxlIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwicGFyc2VGbG9hdCIsImluZGV4T2YiLCJfc2V0TWVudUhvdmVyU3RhdGUiLCJob3ZlcmVkIiwiX3NldENvbGxhcHNlZCIsImNvbGxhcHNlZCIsInNldFRpbWVvdXQiLCJfYmluZExheW91dEFuaW1hdGlvbkVuZEV2ZW50IiwibW9kaWZpZXIiLCJjYiIsIm1lbnUiLCJnZXRNZW51IiwidGFyZ2V0IiwiX3VuYmluZExheW91dEFuaW1hdGlvbkVuZEV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsZWFyVGltZW91dCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJfYmluZFdpbmRvd1Jlc2l6ZUV2ZW50IiwiX3VuYmluZFdpbmRvd1Jlc2l6ZUV2ZW50IiwiX2JpbmRNZW51TW91c2VFdmVudHMiLCJfbWVudU1vdXNlRW50ZXIiLCJfbWVudU1vdXNlTGVhdmUiLCJfd2luZG93VG91Y2hTdGFydCIsIl91bmJpbmRNZW51TW91c2VFdmVudHMiLCJzY3JvbGxUb0FjdGl2ZSIsInNldENvbGxhcHNlZCIsInRvZ2dsZUNvbGxhcHNlZCIsImlzQ29sbGFwc2VkIiwic2V0UG9zaXRpb24iLCJmaXhlZCIsIm9mZmNhbnZhcyIsInVwZGF0ZSIsImlzTGF5b3V0TmF2YmFyRnVsbCIsImlzRml4ZWQiLCJpc05hdmJhckZpeGVkIiwiaXNGb290ZXJGaXhlZCIsInNldEF1dG9VcGRhdGUiLCJlbmFibGUiLCJvbiIsIm9mZiIsImlzUnRsIiwiZ2V0QXR0cmlidXRlIiwiaXNNb2JpbGVEZXZpY2UiLCJvcmllbnRhdGlvbiIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImlubmVyV2lkdGgiLCJjbGllbnRXaWR0aCIsImlzTGlnaHRTdHlsZSIsIl9ldmVudCIsIm5hbWVzcGFjZSIsImpvaW4iLCJwdXNoIiwic3BsaWNlIiwiaW5pdCIsImRvY3VtZW50TW9kZSIsImRlc3Ryb3kiLCJpbml0UGFzc3dvcmRUb2dnbGUiLCJ0b2dnbGVyIiwicHJldmVudERlZmF1bHQiLCJmb3JtUGFzc3dvcmRUb2dnbGUiLCJjbG9zZXN0IiwiZm9ybVBhc3N3b3JkVG9nZ2xlSWNvbiIsImZvcm1QYXNzd29yZFRvZ2dsZUlucHV0Iiwic2V0QXR0cmlidXRlIiwiaW5pdFNwZWVjaFRvVGV4dCIsIlNwZWVjaFJlY29nbml0aW9uIiwid2Via2l0U3BlZWNoUmVjb2duaXRpb24iLCJzcGVlY2hUb1RleHQiLCJyZWNvZ25pdGlvbiIsImxpc3RlbmluZyIsImZvY3VzIiwib25zcGVlY2hzdGFydCIsIm9uZXJyb3IiLCJvbnJlc3VsdCIsInZhbHVlIiwicmVzdWx0cyIsInRyYW5zY3JpcHQiLCJvbnNwZWVjaGVuZCIsInN0b3AiLCJhamF4Q2FsbCIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwic3RhdHVzIiwicmVzcG9uc2UiLCJzdGF0dXNUZXh0Iiwic2VuZCIsImluaXRTaWRlYmFyVG9nZ2xlIiwic2lkZWJhclRvZ2dsZXIiLCJvdmVybGF5IiwiYXBwT3ZlcmxheSIsInRhcmdldEVsIiwidGVsIiwidG9nZ2xlIiwiY3VycmVudFRhcmdldCIsImNocm9tZSIsInJlYWR5U3RhdGUiLCJvbkNvbnRlbnRMb2FkZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsSUFBTUEsWUFBWSxHQUFHLENBQUMsZUFBRCxFQUFrQixxQkFBbEIsRUFBeUMsZ0JBQXpDLENBQXJCO0FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUcsQ0FBQyxZQUFELEVBQWUsZUFBZixFQUFnQyxrQkFBaEMsRUFBb0Qsa0JBQXBELEVBQXdFLGFBQXhFLENBQXpCO0FBQ0EsSUFBTUMsYUFBYSxrTUFBbkIsQyxDQVNBOztBQUNBLFNBQVNDLGFBQVQsQ0FBdUJDLElBQXZCLEVBQTZCO0FBQzNCLFFBQU0sSUFBSUMsS0FBSiw2QkFBK0JELElBQUksZ0JBQVVBLElBQVYsU0FBcUIsRUFBeEQsRUFBTjtBQUNEOztBQUVELElBQU1FLE9BQU8sR0FBRztBQUNkO0FBQ0FDLFNBQU8sRUFBRSxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQyxRQUFRLENBQUNDLGVBQXpDLEdBQTJELElBRnREO0FBSWQ7QUFDQUMsbUJBQWlCLEVBQUUsSUFM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Q0FBNEIsTUFBNUI7QUFDRCxhQUZELE1BRU87QUFDTG9LLHdCQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNySyxTQUFkLENBQXdCRyxNQUF4QixDQUErQixNQUEvQjtBQUNEOztBQUNEa0ssc0JBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY2xGLGdCQUFkLENBQStCLE9BQS9CLEVBQXdDLFVBQUFyRixDQUFDLEVBQUk7QUFDM0NBLGVBQUMsQ0FBQzJLLGFBQUYsQ0FBZ0J6SyxTQUFoQixDQUEwQkcsTUFBMUIsQ0FBaUMsTUFBakM7QUFDQW9LLGlCQUFHLENBQUN2SyxTQUFKLENBQWNHLE1BQWQsQ0FBcUIsTUFBckI7QUFDRCxhQUhEO0FBSUQ7QUFDRixTQWxCRDtBQW1CRCxPQXpCRDtBQTBCRCxLQTNCRDtBQTRCRDtBQXp5QmEsQ0FBaEIsQyxDQTR5QkE7QUFDQTs7QUFFQSxJQUFJLE9BQU92RCxNQUFQLEtBQWtCLFdBQXRCLEVBQW1DO0FBQ2pDRixTQUFPLENBQUNpTCxJQUFSOztBQUVBLE1BQUlqTCxPQUFPLENBQUNxSyxjQUFSLE1BQTRCbkssTUFBTSxDQUFDOE4sTUFBdkMsRUFBK0M7QUFDN0M3TixZQUFRLENBQUNDLGVBQVQsQ0FBeUJrRCxTQUF6QixDQUFtQ0MsR0FBbkMsQ0FBdUMsbUJBQXZDO0FBQ0QsR0FMZ0MsQ0FPakM7OztBQUNBLE1BQUlwRCxRQUFRLENBQUM4TixVQUFULEtBQXdCLFVBQTVCLEVBQXdDak8sT0FBTyxDQUFDMEosTUFBUixHQUF4QyxLQUVFdkosUUFBUSxDQUFDc0ksZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFNBQVN5RixlQUFULEdBQTJCO0FBQ3ZFbE8sV0FBTyxDQUFDMEosTUFBUjtBQUNBdkosWUFBUSxDQUFDd0ksbUJBQVQsQ0FBNkIsa0JBQTdCLEVBQWlEdUYsZUFBakQ7QUFDRCxHQUhEO0FBSUgsQyxDQUVEIiwiZmlsZSI6Ii4vanMvaGVscGVycy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvbnN0YW50c1xuY29uc3QgVFJBTlNfRVZFTlRTID0gWyd0cmFuc2l0aW9uZW5kJywgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAnb1RyYW5zaXRpb25FbmQnXVxuY29uc3QgVFJBTlNfUFJPUEVSVElFUyA9IFsndHJhbnNpdGlvbicsICdNb3pUcmFuc2l0aW9uJywgJ3dlYmtpdFRyYW5zaXRpb24nLCAnV2Via2l0VHJhbnNpdGlvbicsICdPVHJhbnNpdGlvbiddXG5jb25zdCBJTkxJTkVfU1RZTEVTID0gYFxuLmxheW91dC1tZW51LWZpeGVkIC5sYXlvdXQtbmF2YmFyLWZ1bGwgLmxheW91dC1tZW51LFxuLmxheW91dC1wYWdlIHtcbiAgcGFkZGluZy10b3A6IHtuYXZiYXJIZWlnaHR9cHggIWltcG9ydGFudDtcbn1cbi5jb250ZW50LXdyYXBwZXIge1xuICBwYWRkaW5nLWJvdHRvbToge2Zvb3RlckhlaWdodH1weCAhaW1wb3J0YW50O1xufWBcblxuLy8gR3VhcmRcbmZ1bmN0aW9uIHJlcXVpcmVkUGFyYW0obmFtZSkge1xuICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciByZXF1aXJlZCR7bmFtZSA/IGA6IFxcYCR7bmFtZX1cXGBgIDogJyd9YClcbn1cblxuY29uc3QgSGVscGVycyA9IHtcbiAgLy8gUm9vdCBFbGVtZW50XG4gIFJPT1RfRUw6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogbnVsbCxcblxuICAvLyBMYXJnZSBzY3JlZW5zIGJyZWFrcG9pbnRcbiAgTEFZT1VUX0JSRUFLUE9JTlQ6IDEyMDAsXG5cbiAgLy8gUmVzaXplIGRlbGF5IGluIG1pbGxpc2Vjb25kc1xuICBSRVNJWkVfREVMQVk6IDIwMCxcblxuICBtZW51UHNTY3JvbGw6IG51bGwsXG5cbiAgbWFpbk1lbnU6IG51bGwsXG5cbiAgLy8gSW50ZXJuYWwgdmFyaWFibGVzXG4gIF9jdXJTdHlsZTogbnVsbCxcbiAgX3N0eWxlRWw6IG51bGwsXG4gIF9yZXNpemVUaW1lb3V0OiBudWxsLFxuICBfcmVzaXplQ2FsbGJhY2s6IG51bGwsXG4gIF90cmFuc2l0aW9uQ2FsbGJhY2s6IG51bGwsXG4gIF90cmFuc2l0aW9uQ2FsbGJhY2tUaW1lb3V0OiBudWxsLFxuICBfbGlzdGVuZXJzOiBbXSxcbiAgX2luaXRpYWxpemVkOiBmYWxzZSxcbiAgX2F1dG9VcGRhdGU6IGZhbHNlLFxuICBfbGFzdFdpbmRvd0hlaWdodDogMCxcblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vICogVXRpbGl0aWVzXG5cbiAgLy8gLS0tXG4gIC8vIFNjcm9sbCBUbyBBY3RpdmUgTWVudSBJdGVtXG4gIF9zY3JvbGxUb0FjdGl2ZShhbmltYXRlID0gZmFsc2UsIGR1cmF0aW9uID0gNTAwKSB7XG4gICAgY29uc3QgbGF5b3V0TWVudSA9IHRoaXMuZ2V0TGF5b3V0TWVudSgpXG5cbiAgICBpZiAoIWxheW91dE1lbnUpIHJldHVyblxuXG4gICAgbGV0IGFjdGl2ZUVsID0gbGF5b3V0TWVudS5xdWVyeVNlbGVjdG9yKCdsaS5tZW51LWl0ZW0uYWN0aXZlOm5vdCgub3BlbiknKVxuXG4gICAgaWYgKGFjdGl2ZUVsKSB7XG4gICAgICAvLyB0ID0gY3VycmVudCB0aW1lXG4gICAgICAvLyBiID0gc3RhcnQgdmFsdWVcbiAgICAgIC8vIGMgPSBjaGFuZ2UgaW4gdmFsdWVcbiAgICAgIC8vIGQgPSBkdXJhdGlvblxuICAgICAgY29uc3QgZWFzZUluT3V0UXVhZCA9ICh0LCBiLCBjLCBkKSA9PiB7XG4gICAgICAgIHQgLz0gZCAvIDJcbiAgICAgICAgaWYgKHQgPCAxKSByZXR1cm4gKGMgLyAyKSAqIHQgKiB0ICsgYlxuICAgICAgICB0IC09IDFcbiAgICAgICAgcmV0dXJuICgtYyAvIDIpICogKHQgKiAodCAtIDIpIC0gMSkgKyBiXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmdldExheW91dE1lbnUoKS5xdWVyeVNlbGVjdG9yKCcubWVudS1pbm5lcicpXG5cbiAgICAgIGlmICh0eXBlb2YgYWN0aXZlRWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGFjdGl2ZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihhY3RpdmVFbClcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgYWN0aXZlRWwgIT09ICdudW1iZXInKSB7XG4gICAgICAgIGFjdGl2ZUVsID0gYWN0aXZlRWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgZWxlbWVudC5zY3JvbGxUb3BcbiAgICAgIH1cblxuICAgICAgLy8gSWYgYWN0aXZlIGVsZW1lbnQncyB0b3AgcG9zaXRpb24gaXMgbGVzcyB0aGFuIDIvMyAoNjYlKSBvZiBtZW51IGhlaWdodCB0aGFuIGRvIG5vdCBzY3JvbGxcbiAgICAgIGlmIChhY3RpdmVFbCA8IHBhcnNlSW50KChlbGVtZW50LmNsaWVudEhlaWdodCAqIDIpIC8gMywgMTApKSByZXR1cm5cblxuICAgICAgY29uc3Qgc3RhcnQgPSBlbGVtZW50LnNjcm9sbFRvcFxuICAgICAgY29uc3QgY2hhbmdlID0gYWN0aXZlRWwgLSBzdGFydCAtIHBhcnNlSW50KGVsZW1lbnQuY2xpZW50SGVpZ2h0IC8gMiwgMTApXG4gICAgICBjb25zdCBzdGFydERhdGUgPSArbmV3IERhdGUoKVxuXG4gICAgICBpZiAoYW5pbWF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBhbmltYXRlU2Nyb2xsID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gK25ldyBEYXRlKClcbiAgICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IGN1cnJlbnREYXRlIC0gc3RhcnREYXRlXG4gICAgICAgICAgY29uc3QgdmFsID0gZWFzZUluT3V0UXVhZChjdXJyZW50VGltZSwgc3RhcnQsIGNoYW5nZSwgZHVyYXRpb24pXG4gICAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPSB2YWxcbiAgICAgICAgICBpZiAoY3VycmVudFRpbWUgPCBkdXJhdGlvbikge1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGVTY3JvbGwpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gY2hhbmdlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGFuaW1hdGVTY3JvbGwoKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgPSBjaGFuZ2VcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIEFkZCBjbGFzc2VzXG4gIF9hZGRDbGFzcyhjbHMsIGVsID0gdGhpcy5ST09UX0VMKSB7XG4gICAgaWYgKGVsLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBZGQgY2xhc3NlcyB0byBtdWx0aXBsZSBlbGVtZW50c1xuICAgICAgZWwuZm9yRWFjaChlID0+IHtcbiAgICAgICAgY2xzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IGUuY2xhc3NMaXN0LmFkZChjKSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEFkZCBjbGFzc2VzIHRvIHNpbmdsZSBlbGVtZW50XG4gICAgICBjbHMuc3BsaXQoJyAnKS5mb3JFYWNoKGMgPT4gZWwuY2xhc3NMaXN0LmFkZChjKSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIFJlbW92ZSBjbGFzc2VzXG4gIF9yZW1vdmVDbGFzcyhjbHMsIGVsID0gdGhpcy5ST09UX0VMKSB7XG4gICAgaWYgKGVsLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBSZW1vdmUgY2xhc3NlcyB0byBtdWx0aXBsZSBlbGVtZW50c1xuICAgICAgZWwuZm9yRWFjaChlID0+IHtcbiAgICAgICAgY2xzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IGUuY2xhc3NMaXN0LnJlbW92ZShjKSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlbW92ZSBjbGFzc2VzIHRvIHNpbmdsZSBlbGVtZW50XG4gICAgICBjbHMuc3BsaXQoJyAnKS5mb3JFYWNoKGMgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZShjKSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gVG9nZ2xlIGNsYXNzZXNcbiAgX3RvZ2dsZUNsYXNzKGVsID0gdGhpcy5ST09UX0VMLCBjbHMxLCBjbHMyKSB7XG4gICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMxKSkge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlcGxhY2UoY2xzMSwgY2xzMilcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlcGxhY2UoY2xzMiwgY2xzMSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIEhhcyBjbGFzc1xuICBfaGFzQ2xhc3MoY2xzLCBlbCA9IHRoaXMuUk9PVF9FTCkge1xuICAgIGxldCByZXN1bHQgPSBmYWxzZVxuXG4gICAgY2xzLnNwbGl0KCcgJykuZm9yRWFjaChjID0+IHtcbiAgICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoYykpIHJlc3VsdCA9IHRydWVcbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9LFxuXG4gIF9maW5kUGFyZW50KGVsLCBjbHMpIHtcbiAgICBpZiAoKGVsICYmIGVsLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0JPRFknKSB8fCBlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdIVE1MJykgcmV0dXJuIG51bGxcbiAgICBlbCA9IGVsLnBhcmVudE5vZGVcbiAgICB3aGlsZSAoZWwgJiYgZWwudGFnTmFtZS50b1VwcGVyQ2FzZSgpICE9PSAnQk9EWScgJiYgIWVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMpKSB7XG4gICAgICBlbCA9IGVsLnBhcmVudE5vZGVcbiAgICB9XG4gICAgZWwgPSBlbCAmJiBlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdCT0RZJyA/IGVsIDogbnVsbFxuICAgIHJldHVybiBlbFxuICB9LFxuXG4gIC8vIC0tLVxuICAvLyBUcmlnZ2VyIHdpbmRvdyBldmVudFxuICBfdHJpZ2dlcldpbmRvd0V2ZW50KG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVyblxuXG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50KSB7XG4gICAgICBsZXQgZXZlbnRcblxuICAgICAgaWYgKHR5cGVvZiBFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBldmVudCA9IG5ldyBFdmVudChuYW1lKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKVxuICAgICAgICBldmVudC5pbml0RXZlbnQobmFtZSwgZmFsc2UsIHRydWUpXG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KGV2ZW50KVxuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuZmlyZUV2ZW50KGBvbiR7bmFtZX1gLCBkb2N1bWVudC5jcmVhdGVFdmVudE9iamVjdCgpKVxuICAgIH1cbiAgfSxcblxuICAvLyAtLS1cbiAgLy8gVHJpZ2dlciBldmVudFxuICBfdHJpZ2dlckV2ZW50KG5hbWUpIHtcbiAgICB0aGlzLl90cmlnZ2VyV2luZG93RXZlbnQoYGxheW91dCR7bmFtZX1gKVxuXG4gICAgdGhpcy5fbGlzdGVuZXJzLmZpbHRlcihsaXN0ZW5lciA9PiBsaXN0ZW5lci5ldmVudCA9PT0gbmFtZSkuZm9yRWFjaChsaXN0ZW5lciA9PiBsaXN0ZW5lci5jYWxsYmFjay5jYWxsKG51bGwpKVxuICB9LFxuXG4gIC8vIC0tLVxuICAvLyBVcGRhdGUgc3R5bGVcbiAgX3VwZGF0ZUlubGluZVN0eWxlKG5hdmJhckhlaWdodCA9IDAsIGZvb3RlckhlaWdodCA9IDApIHtcbiAgICBpZiAoIXRoaXMuX3N0eWxlRWwpIHtcbiAgICAgIHRoaXMuX3N0eWxlRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpXG4gICAgICB0aGlzLl9zdHlsZUVsLnR5cGUgPSAndGV4dC9jc3MnXG4gICAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHRoaXMuX3N0eWxlRWwpXG4gICAgfVxuXG4gICAgY29uc3QgbmV3U3R5bGUgPSBJTkxJTkVfU1RZTEVTLnJlcGxhY2UoL1xce25hdmJhckhlaWdodFxcfS9naSwgbmF2YmFySGVpZ2h0KS5yZXBsYWNlKFxuICAgICAgL1xce2Zvb3RlckhlaWdodFxcfS9naSxcbiAgICAgIGZvb3RlckhlaWdodFxuICAgIClcblxuICAgIGlmICh0aGlzLl9jdXJTdHlsZSAhPT0gbmV3U3R5bGUpIHtcbiAgICAgIHRoaXMuX2N1clN0eWxlID0gbmV3U3R5bGVcbiAgICAgIHRoaXMuX3N0eWxlRWwudGV4dENvbnRlbnQgPSBuZXdTdHlsZVxuICAgIH1cbiAgfSxcblxuICAvLyAtLS1cbiAgLy8gUmVtb3ZlIHN0eWxlXG4gIF9yZW1vdmVJbmxpbmVTdHlsZSgpIHtcbiAgICBpZiAodGhpcy5fc3R5bGVFbCkgZG9jdW1lbnQuaGVhZC5yZW1vdmVDaGlsZCh0aGlzLl9zdHlsZUVsKVxuICAgIHRoaXMuX3N0eWxlRWwgPSBudWxsXG4gICAgdGhpcy5fY3VyU3R5bGUgPSBudWxsXG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIFJlZHJhdyBsYXlvdXQgbWVudSAoU2FmYXJpIGJ1Z2ZpeClcbiAgX3JlZHJhd0xheW91dE1lbnUoKSB7XG4gICAgY29uc3QgbGF5b3V0TWVudSA9IHRoaXMuZ2V0TGF5b3V0TWVudSgpXG5cbiAgICBpZiAobGF5b3V0TWVudSAmJiBsYXlvdXRNZW51LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JykpIHtcbiAgICAgIGNvbnN0IGlubmVyID0gbGF5b3V0TWVudS5xdWVyeVNlbGVjdG9yKCcubWVudS1pbm5lcicpXG4gICAgICBjb25zdCB7IHNjcm9sbFRvcCB9ID0gaW5uZXJcbiAgICAgIGNvbnN0IHBhZ2VTY3JvbGxUb3AgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXG5cbiAgICAgIGxheW91dE1lbnUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgLy8gbGF5b3V0TWVudS5vZmZzZXRIZWlnaHRcbiAgICAgIGxheW91dE1lbnUuc3R5bGUuZGlzcGxheSA9ICcnXG4gICAgICBpbm5lci5zY3JvbGxUb3AgPSBzY3JvbGxUb3BcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSBwYWdlU2Nyb2xsVG9wXG5cbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIENoZWNrIGZvciB0cmFuc2l0aW9uIHN1cHBvcnRcbiAgX3N1cHBvcnRzVHJhbnNpdGlvbkVuZCgpIHtcbiAgICBpZiAod2luZG93LlFVbml0KSByZXR1cm4gZmFsc2VcblxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcblxuICAgIGlmICghZWwpIHJldHVybiBmYWxzZVxuXG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlXG4gICAgVFJBTlNfUFJPUEVSVElFUy5mb3JFYWNoKGV2bnQgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBlbC5zdHlsZVtldm50XSAhPT0gJ3VuZGVmaW5lZCcpIHJlc3VsdCA9IHRydWVcbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9LFxuXG4gIC8vIC0tLVxuICAvLyBDYWxjdWxhdGUgY3VycmVudCBuYXZiYXIgaGVpZ2h0XG4gIF9nZXROYXZiYXJIZWlnaHQoKSB7XG4gICAgY29uc3QgbGF5b3V0TmF2YmFyID0gdGhpcy5nZXRMYXlvdXROYXZiYXIoKVxuXG4gICAgaWYgKCFsYXlvdXROYXZiYXIpIHJldHVybiAwXG4gICAgaWYgKCF0aGlzLmlzU21hbGxTY3JlZW4oKSkgcmV0dXJuIGxheW91dE5hdmJhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcblxuICAgIC8vIE5lZWRzIHNvbWUgbG9naWMgdG8gZ2V0IG5hdmJhciBoZWlnaHQgb24gc21hbGwgc2NyZWVuc1xuXG4gICAgY29uc3QgY2xvbmVkRWwgPSBsYXlvdXROYXZiYXIuY2xvbmVOb2RlKHRydWUpXG4gICAgY2xvbmVkRWwuaWQgPSBudWxsXG4gICAgY2xvbmVkRWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXG4gICAgY2xvbmVkRWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG5cbiAgICBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChjbG9uZWRFbC5xdWVyeVNlbGVjdG9yQWxsKCcuY29sbGFwc2Uuc2hvdycpKS5mb3JFYWNoKGVsID0+IHRoaXMuX3JlbW92ZUNsYXNzKCdzaG93JywgZWwpKVxuXG4gICAgbGF5b3V0TmF2YmFyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNsb25lZEVsLCBsYXlvdXROYXZiYXIpXG5cbiAgICBjb25zdCBuYXZiYXJIZWlnaHQgPSBjbG9uZWRFbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcblxuICAgIGNsb25lZEVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvbmVkRWwpXG5cbiAgICByZXR1cm4gbmF2YmFySGVpZ2h0XG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIEdldCBjdXJyZW50IGZvb3RlciBoZWlnaHRcbiAgX2dldEZvb3RlckhlaWdodCgpIHtcbiAgICBjb25zdCBsYXlvdXRGb290ZXIgPSB0aGlzLmdldExheW91dEZvb3RlcigpXG5cbiAgICBpZiAoIWxheW91dEZvb3RlcikgcmV0dXJuIDBcblxuICAgIHJldHVybiBsYXlvdXRGb290ZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0XG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIEdldCBhbmltYXRpb24gZHVyYXRpb24gb2YgZWxlbWVudFxuICBfZ2V0QW5pbWF0aW9uRHVyYXRpb24oZWwpIHtcbiAgICBjb25zdCBkdXJhdGlvbiA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS50cmFuc2l0aW9uRHVyYXRpb25cblxuICAgIHJldHVybiBwYXJzZUZsb2F0KGR1cmF0aW9uKSAqIChkdXJhdGlvbi5pbmRleE9mKCdtcycpICE9PSAtMSA/IDEgOiAxMDAwKVxuICB9LFxuXG4gIC8vIC0tLVxuICAvLyBTZXQgbWVudSBob3ZlciBzdGF0ZVxuICBfc2V0TWVudUhvdmVyU3RhdGUoaG92ZXJlZCkge1xuICAgIHRoaXNbaG92ZXJlZCA/ICdfYWRkQ2xhc3MnIDogJ19yZW1vdmVDbGFzcyddKCdsYXlvdXQtbWVudS1ob3ZlcicpXG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIFRvZ2dsZSBjb2xsYXBzZWRcbiAgX3NldENvbGxhcHNlZChjb2xsYXBzZWQpIHtcbiAgICBpZiAodGhpcy5pc1NtYWxsU2NyZWVuKCkpIHtcbiAgICAgIGlmIChjb2xsYXBzZWQpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlQ2xhc3MoJ2xheW91dC1tZW51LWV4cGFuZGVkJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldFRpbWVvdXQoXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fYWRkQ2xhc3MoJ2xheW91dC1tZW51LWV4cGFuZGVkJylcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRoaXMuX3JlZHJhd0xheW91dE1lbnUoKSA/IDUgOiAwXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIEFkZCBsYXlvdXQgc2l2ZW5hdiB0b2dnbGUgYW5pbWF0aW9uRW5kIGV2ZW50XG4gIF9iaW5kTGF5b3V0QW5pbWF0aW9uRW5kRXZlbnQobW9kaWZpZXIsIGNiKSB7XG4gICAgY29uc3QgbWVudSA9IHRoaXMuZ2V0TWVudSgpXG4gICAgY29uc3QgZHVyYXRpb24gPSBtZW51ID8gdGhpcy5fZ2V0QW5pbWF0aW9uRHVyYXRpb24obWVudSkgKyA1MCA6IDBcblxuICAgIGlmICghZHVyYXRpb24pIHtcbiAgICAgIG1vZGlmaWVyLmNhbGwodGhpcylcbiAgICAgIGNiLmNhbGwodGhpcylcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX3RyYW5zaXRpb25DYWxsYmFjayA9IGUgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0ICE9PSBtZW51KSByZXR1cm5cbiAgICAgIHRoaXMuX3VuYmluZExheW91dEFuaW1hdGlvbkVuZEV2ZW50KClcbiAgICAgIGNiLmNhbGwodGhpcylcbiAgICB9XG5cbiAgICBUUkFOU19FVkVOVFMuZm9yRWFjaChlID0+IHtcbiAgICAgIG1lbnUuYWRkRXZlbnRMaXN0ZW5lcihlLCB0aGlzLl90cmFuc2l0aW9uQ2FsbGJhY2ssIGZhbHNlKVxuICAgIH0pXG5cbiAgICBtb2RpZmllci5jYWxsKHRoaXMpXG5cbiAgICB0aGlzLl90cmFuc2l0aW9uQ2FsbGJhY2tUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl90cmFuc2l0aW9uQ2FsbGJhY2suY2FsbCh0aGlzLCB7IHRhcmdldDogbWVudSB9KVxuICAgIH0sIGR1cmF0aW9uKVxuICB9LFxuXG4gIC8vIC0tLVxuICAvLyBSZW1vdmUgbGF5b3V0IHNpdmVuYXYgdG9nZ2xlIGFuaW1hdGlvbkVuZCBldmVudFxuICBfdW5iaW5kTGF5b3V0QW5pbWF0aW9uRW5kRXZlbnQoKSB7XG4gICAgY29uc3QgbWVudSA9IHRoaXMuZ2V0TWVudSgpXG5cbiAgICBpZiAodGhpcy5fdHJhbnNpdGlvbkNhbGxiYWNrVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RyYW5zaXRpb25DYWxsYmFja1RpbWVvdXQpXG4gICAgICB0aGlzLl90cmFuc2l0aW9uQ2FsbGJhY2tUaW1lb3V0ID0gbnVsbFxuICAgIH1cblxuICAgIGlmIChtZW51ICYmIHRoaXMuX3RyYW5zaXRpb25DYWxsYmFjaykge1xuICAgICAgVFJBTlNfRVZFTlRTLmZvckVhY2goZSA9PiB7XG4gICAgICAgIG1lbnUucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLCB0aGlzLl90cmFuc2l0aW9uQ2FsbGJhY2ssIGZhbHNlKVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fdHJhbnNpdGlvbkNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl90cmFuc2l0aW9uQ2FsbGJhY2sgPSBudWxsXG4gICAgfVxuICB9LFxuXG4gIC8vIC0tLVxuICAvLyBCaW5kIGRlbGF5ZWQgd2luZG93IHJlc2l6ZSBldmVudFxuICBfYmluZFdpbmRvd1Jlc2l6ZUV2ZW50KCkge1xuICAgIHRoaXMuX3VuYmluZFdpbmRvd1Jlc2l6ZUV2ZW50KClcblxuICAgIGNvbnN0IGNiID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3Jlc2l6ZVRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc2l6ZVRpbWVvdXQpXG4gICAgICAgIHRoaXMuX3Jlc2l6ZVRpbWVvdXQgPSBudWxsXG4gICAgICB9XG4gICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoJ3Jlc2l6ZScpXG4gICAgfVxuXG4gICAgdGhpcy5fcmVzaXplQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5fcmVzaXplVGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc2l6ZVRpbWVvdXQpXG4gICAgICB0aGlzLl9yZXNpemVUaW1lb3V0ID0gc2V0VGltZW91dChjYiwgdGhpcy5SRVNJWkVfREVMQVkpXG4gICAgfVxuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX3Jlc2l6ZUNhbGxiYWNrLCBmYWxzZSlcbiAgfSxcblxuICAvLyAtLS1cbiAgLy8gVW5iaW5kIGRlbGF5ZWQgd2luZG93IHJlc2l6ZSBldmVudFxuICBfdW5iaW5kV2luZG93UmVzaXplRXZlbnQoKSB7XG4gICAgaWYgKHRoaXMuX3Jlc2l6ZVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLl9yZXNpemVUaW1lb3V0KVxuICAgICAgdGhpcy5fcmVzaXplVGltZW91dCA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fcmVzaXplQ2FsbGJhY2spIHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9yZXNpemVDYWxsYmFjaywgZmFsc2UpXG4gICAgICB0aGlzLl9yZXNpemVDYWxsYmFjayA9IG51bGxcbiAgICB9XG4gIH0sXG5cbiAgX2JpbmRNZW51TW91c2VFdmVudHMoKSB7XG4gICAgaWYgKHRoaXMuX21lbnVNb3VzZUVudGVyICYmIHRoaXMuX21lbnVNb3VzZUxlYXZlICYmIHRoaXMuX3dpbmRvd1RvdWNoU3RhcnQpIHJldHVyblxuXG4gICAgY29uc3QgbGF5b3V0TWVudSA9IHRoaXMuZ2V0TGF5b3V0TWVudSgpXG4gICAgaWYgKCFsYXlvdXRNZW51KSByZXR1cm4gdGhpcy5fdW5iaW5kTWVudU1vdXNlRXZlbnRzKClcblxuICAgIGlmICghdGhpcy5fbWVudU1vdXNlRW50ZXIpIHtcbiAgICAgIHRoaXMuX21lbnVNb3VzZUVudGVyID0gKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc1NtYWxsU2NyZWVuKCkgfHwgdGhpcy5faGFzQ2xhc3MoJ2xheW91dC10cmFuc2l0aW9uaW5nJykpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fc2V0TWVudUhvdmVyU3RhdGUoZmFsc2UpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0TWVudUhvdmVyU3RhdGUoZmFsc2UpXG4gICAgICB9XG4gICAgICBsYXlvdXRNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9tZW51TW91c2VFbnRlciwgZmFsc2UpXG4gICAgICBsYXlvdXRNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl9tZW51TW91c2VFbnRlciwgZmFsc2UpXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLl9tZW51TW91c2VMZWF2ZSkge1xuICAgICAgdGhpcy5fbWVudU1vdXNlTGVhdmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NldE1lbnVIb3ZlclN0YXRlKGZhbHNlKVxuICAgICAgfVxuICAgICAgbGF5b3V0TWVudS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fbWVudU1vdXNlTGVhdmUsIGZhbHNlKVxuICAgIH1cblxuICAgIGlmICghdGhpcy5fd2luZG93VG91Y2hTdGFydCkge1xuICAgICAgdGhpcy5fd2luZG93VG91Y2hTdGFydCA9IGUgPT4ge1xuICAgICAgICBpZiAoIWUgfHwgIWUudGFyZ2V0IHx8ICF0aGlzLl9maW5kUGFyZW50KGUudGFyZ2V0LCAnLmxheW91dC1tZW51JykpIHtcbiAgICAgICAgICB0aGlzLl9zZXRNZW51SG92ZXJTdGF0ZShmYWxzZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLl93aW5kb3dUb3VjaFN0YXJ0LCB0cnVlKVxuICAgIH1cbiAgfSxcblxuICBfdW5iaW5kTWVudU1vdXNlRXZlbnRzKCkge1xuICAgIGlmICghdGhpcy5fbWVudU1vdXNlRW50ZXIgJiYgIXRoaXMuX21lbnVNb3VzZUxlYXZlICYmICF0aGlzLl93aW5kb3dUb3VjaFN0YXJ0KSByZXR1cm5cblxuICAgIGNvbnN0IGxheW91dE1lbnUgPSB0aGlzLmdldExheW91dE1lbnUoKVxuXG4gICAgaWYgKHRoaXMuX21lbnVNb3VzZUVudGVyKSB7XG4gICAgICBpZiAobGF5b3V0TWVudSkge1xuICAgICAgICBsYXlvdXRNZW51LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLl9tZW51TW91c2VFbnRlciwgZmFsc2UpXG4gICAgICAgIGxheW91dE1lbnUucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX21lbnVNb3VzZUVudGVyLCBmYWxzZSlcbiAgICAgIH1cbiAgICAgIHRoaXMuX21lbnVNb3VzZUVudGVyID0gbnVsbFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9tZW51TW91c2VMZWF2ZSkge1xuICAgICAgaWYgKGxheW91dE1lbnUpIHtcbiAgICAgICAgbGF5b3V0TWVudS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fbWVudU1vdXNlTGVhdmUsIGZhbHNlKVxuICAgICAgfVxuICAgICAgdGhpcy5fbWVudU1vdXNlTGVhdmUgPSBudWxsXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX3dpbmRvd1RvdWNoU3RhcnQpIHtcbiAgICAgIGlmIChsYXlvdXRNZW51KSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fd2luZG93VG91Y2hTdGFydCwgdHJ1ZSlcbiAgICAgIH1cbiAgICAgIHRoaXMuX3dpbmRvd1RvdWNoU3RhcnQgPSBudWxsXG4gICAgfVxuXG4gICAgdGhpcy5fc2V0TWVudUhvdmVyU3RhdGUoZmFsc2UpXG4gIH0sXG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyAqIE1ldGhvZHNcblxuICBzY3JvbGxUb0FjdGl2ZShhbmltYXRlID0gZmFsc2UpIHtcbiAgICB0aGlzLl9zY3JvbGxUb0FjdGl2ZShhbmltYXRlKVxuICB9LFxuXG4gIC8vIC0tLVxuICAvLyBDb2xsYXBzZSAvIGV4cGFuZCBsYXlvdXRcbiAgc2V0Q29sbGFwc2VkKGNvbGxhcHNlZCA9IHJlcXVpcmVkUGFyYW0oJ2NvbGxhcHNlZCcpLCBhbmltYXRlID0gdHJ1ZSkge1xuICAgIGNvbnN0IGxheW91dE1lbnUgPSB0aGlzLmdldExheW91dE1lbnUoKVxuXG4gICAgaWYgKCFsYXlvdXRNZW51KSByZXR1cm5cblxuICAgIHRoaXMuX3VuYmluZExheW91dEFuaW1hdGlvbkVuZEV2ZW50KClcblxuICAgIGlmIChhbmltYXRlICYmIHRoaXMuX3N1cHBvcnRzVHJhbnNpdGlvbkVuZCgpKSB7XG4gICAgICB0aGlzLl9hZGRDbGFzcygnbGF5b3V0LXRyYW5zaXRpb25pbmcnKVxuICAgICAgaWYgKGNvbGxhcHNlZCkgdGhpcy5fc2V0TWVudUhvdmVyU3RhdGUoZmFsc2UpXG5cbiAgICAgIHRoaXMuX2JpbmRMYXlvdXRBbmltYXRpb25FbmRFdmVudChcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIC8vIENvbGxhcHNlIC8gRXhwYW5kXG4gICAgICAgICAgaWYgKHRoaXMuaXNTbWFsbFNjcmVlbikgdGhpcy5fc2V0Q29sbGFwc2VkKGNvbGxhcHNlZClcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuX3JlbW92ZUNsYXNzKCdsYXlvdXQtdHJhbnNpdGlvbmluZycpXG4gICAgICAgICAgdGhpcy5fdHJpZ2dlcldpbmRvd0V2ZW50KCdyZXNpemUnKVxuICAgICAgICAgIHRoaXMuX3RyaWdnZXJFdmVudCgndG9nZ2xlJylcbiAgICAgICAgICB0aGlzLl9zZXRNZW51SG92ZXJTdGF0ZShmYWxzZSlcbiAgICAgICAgfVxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9hZGRDbGFzcygnbGF5b3V0LW5vLXRyYW5zaXRpb24nKVxuICAgICAgaWYgKGNvbGxhcHNlZCkgdGhpcy5fc2V0TWVudUhvdmVyU3RhdGUoZmFsc2UpXG5cbiAgICAgIC8vIENvbGxhcHNlIC8gRXhwYW5kXG4gICAgICB0aGlzLl9zZXRDb2xsYXBzZWQoY29sbGFwc2VkKVxuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlQ2xhc3MoJ2xheW91dC1uby10cmFuc2l0aW9uJylcbiAgICAgICAgdGhpcy5fdHJpZ2dlcldpbmRvd0V2ZW50KCdyZXNpemUnKVxuICAgICAgICB0aGlzLl90cmlnZ2VyRXZlbnQoJ3RvZ2dsZScpXG4gICAgICAgIHRoaXMuX3NldE1lbnVIb3ZlclN0YXRlKGZhbHNlKVxuICAgICAgfSwgMSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIFRvZ2dsZSBsYXlvdXRcbiAgdG9nZ2xlQ29sbGFwc2VkKGFuaW1hdGUgPSB0cnVlKSB7XG4gICAgdGhpcy5zZXRDb2xsYXBzZWQoIXRoaXMuaXNDb2xsYXBzZWQoKSwgYW5pbWF0ZSlcbiAgfSxcblxuICAvLyAtLS1cbiAgLy8gU2V0IGxheW91dCBwb3NpdGlvbmluZ1xuICBzZXRQb3NpdGlvbihmaXhlZCA9IHJlcXVpcmVkUGFyYW0oJ2ZpeGVkJyksIG9mZmNhbnZhcyA9IHJlcXVpcmVkUGFyYW0oJ29mZmNhbnZhcycpKSB7XG4gICAgdGhpcy5fcmVtb3ZlQ2xhc3MoJ2xheW91dC1tZW51LW9mZmNhbnZhcyBsYXlvdXQtbWVudS1maXhlZCBsYXlvdXQtbWVudS1maXhlZC1vZmZjYW52YXMnKVxuXG4gICAgaWYgKCFmaXhlZCAmJiBvZmZjYW52YXMpIHtcbiAgICAgIHRoaXMuX2FkZENsYXNzKCdsYXlvdXQtbWVudS1vZmZjYW52YXMnKVxuICAgIH0gZWxzZSBpZiAoZml4ZWQgJiYgIW9mZmNhbnZhcykge1xuICAgICAgdGhpcy5fYWRkQ2xhc3MoJ2xheW91dC1tZW51LWZpeGVkJylcbiAgICAgIHRoaXMuX3JlZHJhd0xheW91dE1lbnUoKVxuICAgIH0gZWxzZSBpZiAoZml4ZWQgJiYgb2ZmY2FudmFzKSB7XG4gICAgICB0aGlzLl9hZGRDbGFzcygnbGF5b3V0LW1lbnUtZml4ZWQtb2ZmY2FudmFzJylcbiAgICAgIHRoaXMuX3JlZHJhd0xheW91dE1lbnUoKVxuICAgIH1cblxuICAgIHRoaXMudXBkYXRlKClcbiAgfSxcblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vICogR2V0dGVyc1xuXG4gIGdldExheW91dE1lbnUoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYXlvdXQtbWVudScpXG4gIH0sXG5cbiAgZ2V0TWVudSgpIHtcbiAgICBjb25zdCBsYXlvdXRNZW51ID0gdGhpcy5nZXRMYXlvdXRNZW51KClcblxuICAgIGlmICghbGF5b3V0TWVudSkgcmV0dXJuIG51bGxcblxuICAgIHJldHVybiAhdGhpcy5faGFzQ2xhc3MoJ21lbnUnLCBsYXlvdXRNZW51KSA/IGxheW91dE1lbnUucXVlcnlTZWxlY3RvcignLm1lbnUnKSA6IGxheW91dE1lbnVcbiAgfSxcblxuICBnZXRMYXlvdXROYXZiYXIoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYXlvdXQtbmF2YmFyJylcbiAgfSxcblxuICBnZXRMYXlvdXRGb290ZXIoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LWZvb3RlcicpXG4gIH0sXG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyAqIFVwZGF0ZVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAoXG4gICAgICAodGhpcy5nZXRMYXlvdXROYXZiYXIoKSAmJlxuICAgICAgICAoKCF0aGlzLmlzU21hbGxTY3JlZW4oKSAmJiB0aGlzLmlzTGF5b3V0TmF2YmFyRnVsbCgpICYmIHRoaXMuaXNGaXhlZCgpKSB8fCB0aGlzLmlzTmF2YmFyRml4ZWQoKSkpIHx8XG4gICAgICAodGhpcy5nZXRMYXlvdXRGb290ZXIoKSAmJiB0aGlzLmlzRm9vdGVyRml4ZWQoKSlcbiAgICApIHtcbiAgICAgIHRoaXMuX3VwZGF0ZUlubGluZVN0eWxlKHRoaXMuX2dldE5hdmJhckhlaWdodCgpLCB0aGlzLl9nZXRGb290ZXJIZWlnaHQoKSlcbiAgICB9XG5cbiAgICB0aGlzLl9iaW5kTWVudU1vdXNlRXZlbnRzKClcbiAgfSxcblxuICBzZXRBdXRvVXBkYXRlKGVuYWJsZSA9IHJlcXVpcmVkUGFyYW0oJ2VuYWJsZScpKSB7XG4gICAgaWYgKGVuYWJsZSAmJiAhdGhpcy5fYXV0b1VwZGF0ZSkge1xuICAgICAgdGhpcy5vbigncmVzaXplLkhlbHBlcnM6YXV0b1VwZGF0ZScsICgpID0+IHRoaXMudXBkYXRlKCkpXG4gICAgICB0aGlzLl9hdXRvVXBkYXRlID0gdHJ1ZVxuICAgIH0gZWxzZSBpZiAoIWVuYWJsZSAmJiB0aGlzLl9hdXRvVXBkYXRlKSB7XG4gICAgICB0aGlzLm9mZigncmVzaXplLkhlbHBlcnM6YXV0b1VwZGF0ZScpXG4gICAgICB0aGlzLl9hdXRvVXBkYXRlID0gZmFsc2VcbiAgICB9XG4gIH0sXG5cbiAgLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAvLyAqIFRlc3RzXG5cbiAgaXNSdGwoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5nZXRBdHRyaWJ1dGUoJ2RpcicpID09PSAncnRsJyB8fFxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaHRtbCcpLmdldEF0dHJpYnV0ZSgnZGlyJykgPT09ICdydGwnXG4gICAgKVxuICB9LFxuXG4gIGlzTW9iaWxlRGV2aWNlKCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2luZG93Lm9yaWVudGF0aW9uICE9PSAndW5kZWZpbmVkJyB8fCBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0lFTW9iaWxlJykgIT09IC0xXG4gIH0sXG5cbiAgaXNTbWFsbFNjcmVlbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKSA8IHRoaXMuTEFZT1VUX0JSRUFLUE9JTlRcbiAgICApXG4gIH0sXG5cbiAgaXNMYXlvdXROYXZiYXJGdWxsKCkge1xuICAgIHJldHVybiAhIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sYXlvdXQtd3JhcHBlci5sYXlvdXQtbmF2YmFyLWZ1bGwnKVxuICB9LFxuXG4gIGlzQ29sbGFwc2VkKCkge1xuICAgIGlmICh0aGlzLmlzU21hbGxTY3JlZW4oKSkge1xuICAgICAgcmV0dXJuICF0aGlzLl9oYXNDbGFzcygnbGF5b3V0LW1lbnUtZXhwYW5kZWQnKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5faGFzQ2xhc3MoJ2xheW91dC1tZW51LWNvbGxhcHNlZCcpXG4gIH0sXG5cbiAgaXNGaXhlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5faGFzQ2xhc3MoJ2xheW91dC1tZW51LWZpeGVkIGxheW91dC1tZW51LWZpeGVkLW9mZmNhbnZhcycpXG4gIH0sXG5cbiAgaXNOYXZiYXJGaXhlZCgpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5faGFzQ2xhc3MoJ2xheW91dC1uYXZiYXItZml4ZWQnKSB8fCAoIXRoaXMuaXNTbWFsbFNjcmVlbigpICYmIHRoaXMuaXNGaXhlZCgpICYmIHRoaXMuaXNMYXlvdXROYXZiYXJGdWxsKCkpXG4gICAgKVxuICB9LFxuXG4gIGlzRm9vdGVyRml4ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0NsYXNzKCdsYXlvdXQtZm9vdGVyLWZpeGVkJylcbiAgfSxcblxuICBpc0xpZ2h0U3R5bGUoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpZ2h0LXN0eWxlJylcbiAgfSxcblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gIC8vICogRXZlbnRzXG5cbiAgb24oZXZlbnQgPSByZXF1aXJlZFBhcmFtKCdldmVudCcpLCBjYWxsYmFjayA9IHJlcXVpcmVkUGFyYW0oJ2NhbGxiYWNrJykpIHtcbiAgICBjb25zdCBbX2V2ZW50XSA9IGV2ZW50LnNwbGl0KCcuJylcbiAgICBsZXQgWywgLi4ubmFtZXNwYWNlXSA9IGV2ZW50LnNwbGl0KCcuJylcbiAgICAvLyBsZXQgW19ldmVudCwgLi4ubmFtZXNwYWNlXSA9IGV2ZW50LnNwbGl0KCcuJylcbiAgICBuYW1lc3BhY2UgPSBuYW1lc3BhY2Uuam9pbignLicpIHx8IG51bGxcblxuICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKHsgZXZlbnQ6IF9ldmVudCwgbmFtZXNwYWNlLCBjYWxsYmFjayB9KVxuICB9LFxuXG4gIG9mZihldmVudCA9IHJlcXVpcmVkUGFyYW0oJ2V2ZW50JykpIHtcbiAgICBjb25zdCBbX2V2ZW50XSA9IGV2ZW50LnNwbGl0KCcuJylcbiAgICBsZXQgWywgLi4ubmFtZXNwYWNlXSA9IGV2ZW50LnNwbGl0KCcuJylcbiAgICBuYW1lc3BhY2UgPSBuYW1lc3BhY2Uuam9pbignLicpIHx8IG51bGxcblxuICAgIHRoaXMuX2xpc3RlbmVyc1xuICAgICAgLmZpbHRlcihsaXN0ZW5lciA9PiBsaXN0ZW5lci5ldmVudCA9PT0gX2V2ZW50ICYmIGxpc3RlbmVyLm5hbWVzcGFjZSA9PT0gbmFtZXNwYWNlKVxuICAgICAgLmZvckVhY2gobGlzdGVuZXIgPT4gdGhpcy5fbGlzdGVuZXJzLnNwbGljZSh0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lciksIDEpKVxuICB9LFxuXG4gIC8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gKiBMaWZlIGN5Y2xlXG5cbiAgaW5pdCgpIHtcbiAgICBpZiAodGhpcy5faW5pdGlhbGl6ZWQpIHJldHVyblxuICAgIHRoaXMuX2luaXRpYWxpemVkID0gdHJ1ZVxuXG4gICAgLy8gSW5pdGlhbGl6ZSBgc3R5bGVgIGVsZW1lbnRcbiAgICB0aGlzLl91cGRhdGVJbmxpbmVTdHlsZSgwKVxuXG4gICAgLy8gQmluZCB3aW5kb3cgcmVzaXplIGV2ZW50XG4gICAgdGhpcy5fYmluZFdpbmRvd1Jlc2l6ZUV2ZW50KClcblxuICAgIC8vIEJpbmQgaW5pdCBldmVudFxuICAgIHRoaXMub2ZmKCdpbml0Ll9IZWxwZXJzJylcbiAgICB0aGlzLm9uKCdpbml0Ll9IZWxwZXJzJywgKCkgPT4ge1xuICAgICAgdGhpcy5vZmYoJ3Jlc2l6ZS5fSGVscGVyczpyZWRyYXdNZW51JylcbiAgICAgIHRoaXMub24oJ3Jlc2l6ZS5fSGVscGVyczpyZWRyYXdNZW51JywgKCkgPT4ge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAgIHRoaXMuaXNTbWFsbFNjcmVlbigpICYmICF0aGlzLmlzQ29sbGFwc2VkKCkgJiYgdGhpcy5fcmVkcmF3TGF5b3V0TWVudSgpXG4gICAgICB9KVxuXG4gICAgICAvLyBGb3JjZSByZXBhaW50IGluIElFIDEwXG4gICAgICBpZiAodHlwZW9mIGRvY3VtZW50LmRvY3VtZW50TW9kZSA9PT0gJ251bWJlcicgJiYgZG9jdW1lbnQuZG9jdW1lbnRNb2RlIDwgMTEpIHtcbiAgICAgICAgdGhpcy5vZmYoJ3Jlc2l6ZS5fSGVscGVyczppZTEwUmVwYWludEJvZHknKVxuICAgICAgICB0aGlzLm9uKCdyZXNpemUuX0hlbHBlcnM6aWUxMFJlcGFpbnRCb2R5JywgKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmlzRml4ZWQoKSkgcmV0dXJuXG4gICAgICAgICAgY29uc3QgeyBzY3JvbGxUb3AgfSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgIC8vIGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0XG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSBzY3JvbGxUb3BcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgdGhpcy5fdHJpZ2dlckV2ZW50KCdpbml0JylcbiAgfSxcblxuICBkZXN0cm95KCkge1xuICAgIGlmICghdGhpcy5faW5pdGlhbGl6ZWQpIHJldHVyblxuICAgIHRoaXMuX2luaXRpYWxpemVkID0gZmFsc2VcblxuICAgIHRoaXMuX3JlbW92ZUNsYXNzKCdsYXlvdXQtdHJhbnNpdGlvbmluZycpXG4gICAgdGhpcy5fcmVtb3ZlSW5saW5lU3R5bGUoKVxuICAgIHRoaXMuX3VuYmluZExheW91dEFuaW1hdGlvbkVuZEV2ZW50KClcbiAgICB0aGlzLl91bmJpbmRXaW5kb3dSZXNpemVFdmVudCgpXG4gICAgdGhpcy5fdW5iaW5kTWVudU1vdXNlRXZlbnRzKClcbiAgICB0aGlzLnNldEF1dG9VcGRhdGUoZmFsc2UpXG5cbiAgICB0aGlzLm9mZignaW5pdC5fSGVscGVycycpXG5cbiAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBleGNlcHQgYGluaXRgXG4gICAgdGhpcy5fbGlzdGVuZXJzXG4gICAgICAuZmlsdGVyKGxpc3RlbmVyID0+IGxpc3RlbmVyLmV2ZW50ICE9PSAnaW5pdCcpXG4gICAgICAuZm9yRWFjaChsaXN0ZW5lciA9PiB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKHRoaXMuX2xpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSwgMSkpXG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIEluaXQgUGFzc3dvcmQgVG9nZ2xlXG4gIGluaXRQYXNzd29yZFRvZ2dsZSgpIHtcbiAgICBjb25zdCB0b2dnbGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm0tcGFzc3dvcmQtdG9nZ2xlIGknKVxuICAgIGlmICh0eXBlb2YgdG9nZ2xlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdG9nZ2xlciAhPT0gbnVsbCkge1xuICAgICAgdG9nZ2xlci5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBjb25zdCBmb3JtUGFzc3dvcmRUb2dnbGUgPSBlbC5jbG9zZXN0KCcuZm9ybS1wYXNzd29yZC10b2dnbGUnKVxuICAgICAgICAgIGNvbnN0IGZvcm1QYXNzd29yZFRvZ2dsZUljb24gPSBmb3JtUGFzc3dvcmRUb2dnbGUucXVlcnlTZWxlY3RvcignaScpXG4gICAgICAgICAgY29uc3QgZm9ybVBhc3N3b3JkVG9nZ2xlSW5wdXQgPSBmb3JtUGFzc3dvcmRUb2dnbGUucXVlcnlTZWxlY3RvcignaW5wdXQnKVxuXG4gICAgICAgICAgaWYgKGZvcm1QYXNzd29yZFRvZ2dsZUlucHV0LmdldEF0dHJpYnV0ZSgndHlwZScpID09PSAndGV4dCcpIHtcbiAgICAgICAgICAgIGZvcm1QYXNzd29yZFRvZ2dsZUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICdwYXNzd29yZCcpXG4gICAgICAgICAgICBmb3JtUGFzc3dvcmRUb2dnbGVJY29uLmNsYXNzTGlzdC5yZXBsYWNlKCdieC1zaG93JywgJ2J4LWhpZGUnKVxuICAgICAgICAgIH0gZWxzZSBpZiAoZm9ybVBhc3N3b3JkVG9nZ2xlSW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykgPT09ICdwYXNzd29yZCcpIHtcbiAgICAgICAgICAgIGZvcm1QYXNzd29yZFRvZ2dsZUlucHV0LnNldEF0dHJpYnV0ZSgndHlwZScsICd0ZXh0JylcbiAgICAgICAgICAgIGZvcm1QYXNzd29yZFRvZ2dsZUljb24uY2xhc3NMaXN0LnJlcGxhY2UoJ2J4LWhpZGUnLCAnYngtc2hvdycpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tXG4gIC8vIEluaXQgU3BlZWNoIFRvIFRleHRcbiAgaW5pdFNwZWVjaFRvVGV4dCgpIHtcbiAgICBjb25zdCBTcGVlY2hSZWNvZ25pdGlvbiA9IHdpbmRvdy5TcGVlY2hSZWNvZ25pdGlvbiB8fCB3aW5kb3cud2Via2l0U3BlZWNoUmVjb2duaXRpb25cbiAgICBjb25zdCBzcGVlY2hUb1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3BlZWNoLXRvLXRleHQnKVxuICAgIGlmIChTcGVlY2hSZWNvZ25pdGlvbiAhPT0gdW5kZWZpbmVkICYmIFNwZWVjaFJlY29nbml0aW9uICE9PSBudWxsKSB7XG4gICAgICBpZiAodHlwZW9mIHNwZWVjaFRvVGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgc3BlZWNoVG9UZXh0ICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IHJlY29nbml0aW9uID0gbmV3IFNwZWVjaFJlY29nbml0aW9uKClcbiAgICAgICAgY29uc3QgdG9nZ2xlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcGVlY2gtdG8tdGV4dCBpJylcbiAgICAgICAgdG9nZ2xlci5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICBsZXQgbGlzdGVuaW5nID0gZmFsc2VcbiAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIGVsLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbnRyb2wnKS5mb2N1cygpXG4gICAgICAgICAgICByZWNvZ25pdGlvbi5vbnNwZWVjaHN0YXJ0ID0gKCkgPT4ge1xuICAgICAgICAgICAgICBsaXN0ZW5pbmcgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGlzdGVuaW5nID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICByZWNvZ25pdGlvbi5zdGFydCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWNvZ25pdGlvbi5vbmVycm9yID0gKCkgPT4ge1xuICAgICAgICAgICAgICBsaXN0ZW5pbmcgPSBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVjb2duaXRpb24ub25yZXN1bHQgPSBldmVudCA9PiB7XG4gICAgICAgICAgICAgIGVsLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCcpLnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWNvbnRyb2wnKS52YWx1ZSA9IGV2ZW50LnJlc3VsdHNbMF1bMF0udHJhbnNjcmlwdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVjb2duaXRpb24ub25zcGVlY2hlbmQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgIGxpc3RlbmluZyA9IGZhbHNlXG4gICAgICAgICAgICAgIHJlY29nbml0aW9uLnN0b3AoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8vIEFqYXggQ2FsbCBQcm9taXNlXG4gIGFqYXhDYWxsKHVybCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgcmVxLm9wZW4oJ0dFVCcsIHVybClcbiAgICAgIHJlcS5vbmxvYWQgPSAoKSA9PiAocmVxLnN0YXR1cyA9PT0gMjAwID8gcmVzb2x2ZShyZXEucmVzcG9uc2UpIDogcmVqZWN0KEVycm9yKHJlcS5zdGF0dXNUZXh0KSkpXG4gICAgICByZXEub25lcnJvciA9IGUgPT4gcmVqZWN0KEVycm9yKGBOZXR3b3JrIEVycm9yOiAke2V9YCkpXG4gICAgICByZXEuc2VuZCgpXG4gICAgfSlcbiAgfSxcblxuICAvLyAtLS1cbiAgLy8gU2lkZWJhclRvZ2dsZSAoVXNlZCBpbiBBcHBzKVxuICBpbml0U2lkZWJhclRvZ2dsZSgpIHtcbiAgICBjb25zdCBzaWRlYmFyVG9nZ2xlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJzLXRvZ2dsZT1cInNpZGViYXJcIl0nKVxuXG4gICAgc2lkZWJhclRvZ2dsZXIuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRhcmdldCcpXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtb3ZlcmxheScpXG4gICAgICAgIGNvbnN0IGFwcE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXBwLW92ZXJsYXknKVxuICAgICAgICBjb25zdCB0YXJnZXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGFyZ2V0KVxuXG4gICAgICAgIHRhcmdldEVsLmZvckVhY2godGVsID0+IHtcbiAgICAgICAgICB0ZWwuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdycpXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIG92ZXJsYXkgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICBvdmVybGF5ICE9PSBudWxsICYmXG4gICAgICAgICAgICBvdmVybGF5ICE9PSBmYWxzZSAmJlxuICAgICAgICAgICAgdHlwZW9mIGFwcE92ZXJsYXkgIT09ICd1bmRlZmluZWQnXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAodGVsLmNsYXNzTGlzdC5jb250YWlucygnc2hvdycpKSB7XG4gICAgICAgICAgICAgIGFwcE92ZXJsYXlbMF0uY2xhc3NMaXN0LmFkZCgnc2hvdycpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhcHBPdmVybGF5WzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXBwT3ZlcmxheVswXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICAgICAgICBlLmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpXG4gICAgICAgICAgICAgIHRlbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICogSW5pdGlhbGl6YXRpb25cblxuaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIEhlbHBlcnMuaW5pdCgpXG5cbiAgaWYgKEhlbHBlcnMuaXNNb2JpbGVEZXZpY2UoKSAmJiB3aW5kb3cuY2hyb21lKSB7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xheW91dC1tZW51LTEwMHZoJylcbiAgfVxuXG4gIC8vIFVwZGF0ZSBsYXlvdXQgYWZ0ZXIgcGFnZSBsb2FkXG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSBIZWxwZXJzLnVwZGF0ZSgpXG4gIGVsc2VcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gb25Db250ZW50TG9hZGVkKCkge1xuICAgICAgSGVscGVycy51cGRhdGUoKVxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIG9uQ29udGVudExvYWRlZClcbiAgICB9KVxufVxuXG4vLyAtLS1cbmV4cG9ydCB7IEhlbHBlcnMgfVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=webpack-internal:///./js/helpers.js
`)}}));(function(n,e){for(var t in e)n[t]=e[t]})(window,function(n){var e={};function t(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return n[s].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=n,t.c=e,t.d=function(s,i,l){t.o(s,i)||Object.defineProperty(s,i,{enumerable:!0,get:l})},t.r=function(s){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},t.t=function(s,i){if(i&1&&(s=t(s)),i&8||i&4&&typeof s=="object"&&s&&s.__esModule)return s;var l=Object.create(null);if(t.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:s}),i&2&&typeof s!="string")for(var o in s)t.d(l,o,(function(r){return s[r]}).bind(null,o));return l},t.n=function(s){var i=s&&s.__esModule?function(){return s.default}:function(){return s};return t.d(i,"a",i),i},t.o=function(s,i){return Object.prototype.hasOwnProperty.call(s,i)},t.p="",t(t.s="./libs/popper/popper.js")}({"./libs/popper/popper.js":function(module,__webpack_exports__,__webpack_require__){eval(`__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popperjs_core_dist_umd_popper_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core/dist/umd/popper.min */ "./node_modules/@popperjs/core/dist/umd/popper.min.js");
/* harmony import */ var _popperjs_core_dist_umd_popper_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_popperjs_core_dist_umd_popper_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Popper", function() { return _popperjs_core_dist_umd_popper_min__WEBPACK_IMPORTED_MODULE_0___default.a; });
 // Required to enable animations on dropdowns/tooltips/popovers
// Popper.Defaults.modifiers.computeStyle.gpuAcceleration = false

//# sourceURL=[module]
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWJzL3BvcHBlci9wb3BwZXIuanM/NTgwMyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtDQUVBO0FBQ0EiLCJmaWxlIjoiLi9saWJzL3BvcHBlci9wb3BwZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUG9wcGVyIGZyb20gJ0Bwb3BwZXJqcy9jb3JlL2Rpc3QvdW1kL3BvcHBlci5taW4nO1xuXG4vLyBSZXF1aXJlZCB0byBlbmFibGUgYW5pbWF0aW9ucyBvbiBkcm9wZG93bnMvdG9vbHRpcHMvcG9wb3ZlcnNcbi8vIFBvcHBlci5EZWZhdWx0cy5tb2RpZmllcnMuY29tcHV0ZVN0eWxlLmdwdUFjY2VsZXJhdGlvbiA9IGZhbHNlXG5cbmV4cG9ydCB7IFBvcHBlciB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=webpack-internal:///./libs/popper/popper.js
`)},"./node_modules/@popperjs/core/dist/umd/popper.min.js":function(module,exports,__webpack_require__){eval(`/**
 * @popperjs/core v2.11.2 - MIT License
 */

!function(e,t){ true?t(exports):undefined}(this,(function(e){"use strict";function t(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function n(e){return e instanceof t(e).Element||e instanceof Element}function r(e){return e instanceof t(e).HTMLElement||e instanceof HTMLElement}function o(e){return"undefined"!=typeof ShadowRoot&&(e instanceof t(e).ShadowRoot||e instanceof ShadowRoot)}var i=Math.max,a=Math.min,s=Math.round;function f(e,t){void 0===t&&(t=!1);var n=e.getBoundingClientRect(),o=1,i=1;if(r(e)&&t){var a=e.offsetHeight,f=e.offsetWidth;f>0&&(o=s(n.width)/f||1),a>0&&(i=s(n.height)/a||1)}return{width:n.width/o,height:n.height/i,top:n.top/i,right:n.right/o,bottom:n.bottom/i,left:n.left/o,x:n.left/o,y:n.top/i}}function c(e){var n=t(e);return{scrollLeft:n.pageXOffset,scrollTop:n.pageYOffset}}function p(e){return e?(e.nodeName||"").toLowerCase():null}function u(e){return((n(e)?e.ownerDocument:e.document)||window.document).documentElement}function l(e){return f(u(e)).left+c(e).scrollLeft}function d(e){return t(e).getComputedStyle(e)}function h(e){var t=d(e),n=t.overflow,r=t.overflowX,o=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+r)}function m(e,n,o){void 0===o&&(o=!1);var i,a,d=r(n),m=r(n)&&function(e){var t=e.getBoundingClientRect(),n=s(t.width)/e.offsetWidth||1,r=s(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(n),v=u(n),g=f(e,m),y={scrollLeft:0,scrollTop:0},b={x:0,y:0};return(d||!d&&!o)&&(("body"!==p(n)||h(v))&&(y=(i=n)!==t(i)&&r(i)?{scrollLeft:(a=i).scrollLeft,scrollTop:a.scrollTop}:c(i)),r(n)?((b=f(n,!0)).x+=n.clientLeft,b.y+=n.clientTop):v&&(b.x=l(v))),{x:g.left+y.scrollLeft-b.x,y:g.top+y.scrollTop-b.y,width:g.width,height:g.height}}function v(e){var t=f(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function g(e){return"html"===p(e)?e:e.assignedSlot||e.parentNode||(o(e)?e.host:null)||u(e)}function y(e){return["html","body","#document"].indexOf(p(e))>=0?e.ownerDocument.body:r(e)&&h(e)?e:y(g(e))}function b(e,n){var r;void 0===n&&(n=[]);var o=y(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),a=t(o),s=i?[a].concat(a.visualViewport||[],h(o)?o:[]):o,f=n.concat(s);return i?f:f.concat(b(g(s)))}function x(e){return["table","td","th"].indexOf(p(e))>=0}function w(e){return r(e)&&"fixed"!==d(e).position?e.offsetParent:null}function O(e){for(var n=t(e),o=w(e);o&&x(o)&&"static"===d(o).position;)o=w(o);return o&&("html"===p(o)||"body"===p(o)&&"static"===d(o).position)?n:o||function(e){var t=-1!==navigator.userAgent.toLowerCase().indexOf("firefox");if(-1!==navigator.userAgent.indexOf("Trident")&&r(e)&&"fixed"===d(e).position)return null;for(var n=g(e);r(n)&&["html","body"].indexOf(p(n))<0;){var o=d(n);if("none"!==o.transform||"none"!==o.perspective||"paint"===o.contain||-1!==["transform","perspective"].indexOf(o.willChange)||t&&"filter"===o.willChange||t&&o.filter&&"none"!==o.filter)return n;n=n.parentNode}return null}(e)||n}var j="top",E="bottom",D="right",A="left",L="auto",P=[j,E,D,A],M="start",k="end",W="viewport",B="popper",H=P.reduce((function(e,t){return e.concat([t+"-"+M,t+"-"+k])}),[]),T=[].concat(P,[L]).reduce((function(e,t){return e.concat([t,t+"-"+M,t+"-"+k])}),[]),R=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function S(e){var t=new Map,n=new Set,r=[];function o(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&o(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||o(e)})),r}function C(e){return e.split("-")[0]}function q(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&o(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function V(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function N(e,r){return r===W?V(function(e){var n=t(e),r=u(e),o=n.visualViewport,i=r.clientWidth,a=r.clientHeight,s=0,f=0;return o&&(i=o.width,a=o.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(s=o.offsetLeft,f=o.offsetTop)),{width:i,height:a,x:s+l(e),y:f}}(e)):n(r)?function(e){var t=f(e);return t.top=t.top+e.clientTop,t.left=t.left+e.clientLeft,t.bottom=t.top+e.clientHeight,t.right=t.left+e.clientWidth,t.width=e.clientWidth,t.height=e.clientHeight,t.x=t.left,t.y=t.top,t}(r):V(function(e){var t,n=u(e),r=c(e),o=null==(t=e.ownerDocument)?void 0:t.body,a=i(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=i(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),f=-r.scrollLeft+l(e),p=-r.scrollTop;return"rtl"===d(o||n).direction&&(f+=i(n.clientWidth,o?o.clientWidth:0)-a),{width:a,height:s,x:f,y:p}}(u(e)))}function I(e,t,o){var s="clippingParents"===t?function(e){var t=b(g(e)),o=["absolute","fixed"].indexOf(d(e).position)>=0&&r(e)?O(e):e;return n(o)?t.filter((function(e){return n(e)&&q(e,o)&&"body"!==p(e)})):[]}(e):[].concat(t),f=[].concat(s,[o]),c=f[0],u=f.reduce((function(t,n){var r=N(e,n);return t.top=i(r.top,t.top),t.right=a(r.right,t.right),t.bottom=a(r.bottom,t.bottom),t.left=i(r.left,t.left),t}),N(e,c));return u.width=u.right-u.left,u.height=u.bottom-u.top,u.x=u.left,u.y=u.top,u}function _(e){return e.split("-")[1]}function F(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function U(e){var t,n=e.reference,r=e.element,o=e.placement,i=o?C(o):null,a=o?_(o):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(i){case j:t={x:s,y:n.y-r.height};break;case E:t={x:s,y:n.y+n.height};break;case D:t={x:n.x+n.width,y:f};break;case A:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=i?F(i):null;if(null!=c){var p="y"===c?"height":"width";switch(a){case M:t[c]=t[c]-(n[p]/2-r[p]/2);break;case k:t[c]=t[c]+(n[p]/2-r[p]/2)}}return t}function z(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function X(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function Y(e,t){void 0===t&&(t={});var r=t,o=r.placement,i=void 0===o?e.placement:o,a=r.boundary,s=void 0===a?"clippingParents":a,c=r.rootBoundary,p=void 0===c?W:c,l=r.elementContext,d=void 0===l?B:l,h=r.altBoundary,m=void 0!==h&&h,v=r.padding,g=void 0===v?0:v,y=z("number"!=typeof g?g:X(g,P)),b=d===B?"reference":B,x=e.rects.popper,w=e.elements[m?b:d],O=I(n(w)?w:w.contextElement||u(e.elements.popper),s,p),A=f(e.elements.reference),L=U({reference:A,element:x,strategy:"absolute",placement:i}),M=V(Object.assign({},x,L)),k=d===B?M:A,H={top:O.top-k.top+y.top,bottom:k.bottom-O.bottom+y.bottom,left:O.left-k.left+y.left,right:k.right-O.right+y.right},T=e.modifiersData.offset;if(d===B&&T){var R=T[i];Object.keys(H).forEach((function(e){var t=[D,E].indexOf(e)>=0?1:-1,n=[j,E].indexOf(e)>=0?"y":"x";H[e]+=R[n]*t}))}return H}var G={placement:"bottom",modifiers:[],strategy:"absolute"};function J(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"==typeof e.getBoundingClientRect)}))}function K(e){void 0===e&&(e={});var t=e,r=t.defaultModifiers,o=void 0===r?[]:r,i=t.defaultOptions,a=void 0===i?G:i;return function(e,t,r){void 0===r&&(r=a);var i,s,f={placement:"bottom",orderedModifiers:[],options:Object.assign({},G,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},c=[],p=!1,u={state:f,setOptions:function(r){var i="function"==typeof r?r(f.options):r;l(),f.options=Object.assign({},a,f.options,i),f.scrollParents={reference:n(e)?b(e):e.contextElement?b(e.contextElement):[],popper:b(t)};var s,p,d=function(e){var t=S(e);return R.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}((s=[].concat(o,f.options.modifiers),p=s.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{}),Object.keys(p).map((function(e){return p[e]}))));return f.orderedModifiers=d.filter((function(e){return e.enabled})),f.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,o=e.effect;if("function"==typeof o){var i=o({state:f,name:t,instance:u,options:r}),a=function(){};c.push(i||a)}})),u.update()},forceUpdate:function(){if(!p){var e=f.elements,t=e.reference,n=e.popper;if(J(t,n)){f.rects={reference:m(t,O(n),"fixed"===f.options.strategy),popper:v(n)},f.reset=!1,f.placement=f.options.placement,f.orderedModifiers.forEach((function(e){return f.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<f.orderedModifiers.length;r++)if(!0!==f.reset){var o=f.orderedModifiers[r],i=o.fn,a=o.options,s=void 0===a?{}:a,c=o.name;"function"==typeof i&&(f=i({state:f,options:s,name:c,instance:u})||f)}else f.reset=!1,r=-1}}},update:(i=function(){return new Promise((function(e){u.forceUpdate(),e(f)}))},function(){return s||(s=new Promise((function(e){Promise.resolve().then((function(){s=void 0,e(i())}))}))),s}),destroy:function(){l(),p=!0}};if(!J(e,t))return u;function l(){c.forEach((function(e){return e()})),c=[]}return u.setOptions(r).then((function(e){!p&&r.onFirstUpdate&&r.onFirstUpdate(e)})),u}}var Q={passive:!0};var Z={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var n=e.state,r=e.instance,o=e.options,i=o.scroll,a=void 0===i||i,s=o.resize,f=void 0===s||s,c=t(n.elements.popper),p=[].concat(n.scrollParents.reference,n.scrollParents.popper);return a&&p.forEach((function(e){e.addEventListener("scroll",r.update,Q)})),f&&c.addEventListener("resize",r.update,Q),function(){a&&p.forEach((function(e){e.removeEventListener("scroll",r.update,Q)})),f&&c.removeEventListener("resize",r.update,Q)}},data:{}};var $={name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=U({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},ee={top:"auto",right:"auto",bottom:"auto",left:"auto"};function te(e){var n,r=e.popper,o=e.popperRect,i=e.placement,a=e.variation,f=e.offsets,c=e.position,p=e.gpuAcceleration,l=e.adaptive,h=e.roundOffsets,m=e.isFixed,v=f.x,g=void 0===v?0:v,y=f.y,b=void 0===y?0:y,x="function"==typeof h?h({x:g,y:b}):{x:g,y:b};g=x.x,b=x.y;var w=f.hasOwnProperty("x"),L=f.hasOwnProperty("y"),P=A,M=j,W=window;if(l){var B=O(r),H="clientHeight",T="clientWidth";if(B===t(r)&&"static"!==d(B=u(r)).position&&"absolute"===c&&(H="scrollHeight",T="scrollWidth"),B=B,i===j||(i===A||i===D)&&a===k)M=E,b-=(m&&W.visualViewport?W.visualViewport.height:B[H])-o.height,b*=p?1:-1;if(i===A||(i===j||i===E)&&a===k)P=D,g-=(m&&W.visualViewport?W.visualViewport.width:B[T])-o.width,g*=p?1:-1}var R,S=Object.assign({position:c},l&&ee),C=!0===h?function(e){var t=e.x,n=e.y,r=window.devicePixelRatio||1;return{x:s(t*r)/r||0,y:s(n*r)/r||0}}({x:g,y:b}):{x:g,y:b};return g=C.x,b=C.y,p?Object.assign({},S,((R={})[M]=L?"0":"",R[P]=w?"0":"",R.transform=(W.devicePixelRatio||1)<=1?"translate("+g+"px, "+b+"px)":"translate3d("+g+"px, "+b+"px, 0)",R)):Object.assign({},S,((n={})[M]=L?b+"px":"",n[P]=w?g+"px":"",n.transform="",n))}var ne={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,o=void 0===r||r,i=n.adaptive,a=void 0===i||i,s=n.roundOffsets,f=void 0===s||s,c={placement:C(t.placement),variation:_(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:o,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,te(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,te(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}};var re={name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},o=t.attributes[e]||{},i=t.elements[e];r(i)&&p(i)&&(Object.assign(i.style,n),Object.keys(o).forEach((function(e){var t=o[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var o=t.elements[e],i=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});r(o)&&p(o)&&(Object.assign(o.style,a),Object.keys(i).forEach((function(e){o.removeAttribute(e)})))}))}},requires:["computeStyles"]};var oe={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.offset,i=void 0===o?[0,0]:o,a=T.reduce((function(e,n){return e[n]=function(e,t,n){var r=C(e),o=[A,j].indexOf(r)>=0?-1:1,i="function"==typeof n?n(Object.assign({},t,{placement:e})):n,a=i[0],s=i[1];return a=a||0,s=(s||0)*o,[A,D].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,i),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},ie={left:"right",right:"left",bottom:"top",top:"bottom"};function ae(e){return e.replace(/left|right|bottom|top/g,(function(e){return ie[e]}))}var se={start:"end",end:"start"};function fe(e){return e.replace(/start|end/g,(function(e){return se[e]}))}function ce(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=n.boundary,i=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?T:f,p=_(r),u=p?s?H:H.filter((function(e){return _(e)===p})):P,l=u.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=u);var d=l.reduce((function(t,n){return t[n]=Y(e,{placement:n,boundary:o,rootBoundary:i,padding:a})[C(n)],t}),{});return Object.keys(d).sort((function(e,t){return d[e]-d[t]}))}var pe={name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var o=n.mainAxis,i=void 0===o||o,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.flipVariations,h=void 0===d||d,m=n.allowedAutoPlacements,v=t.options.placement,g=C(v),y=f||(g===v||!h?[ae(v)]:function(e){if(C(e)===L)return[];var t=ae(e);return[fe(e),t,fe(t)]}(v)),b=[v].concat(y).reduce((function(e,n){return e.concat(C(n)===L?ce(t,{placement:n,boundary:p,rootBoundary:u,padding:c,flipVariations:h,allowedAutoPlacements:m}):n)}),[]),x=t.rects.reference,w=t.rects.popper,O=new Map,P=!0,k=b[0],W=0;W<b.length;W++){var B=b[W],H=C(B),T=_(B)===M,R=[j,E].indexOf(H)>=0,S=R?"width":"height",q=Y(t,{placement:B,boundary:p,rootBoundary:u,altBoundary:l,padding:c}),V=R?T?D:A:T?E:j;x[S]>w[S]&&(V=ae(V));var N=ae(V),I=[];if(i&&I.push(q[H]<=0),s&&I.push(q[V]<=0,q[N]<=0),I.every((function(e){return e}))){k=B,P=!1;break}O.set(B,I)}if(P)for(var F=function(e){var t=b.find((function(t){var n=O.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return k=t,"break"},U=h?3:1;U>0;U--){if("break"===F(U))break}t.placement!==k&&(t.modifiersData[r]._skip=!0,t.placement=k,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function ue(e,t,n){return i(e,a(t,n))}var le={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,o=n.mainAxis,s=void 0===o||o,f=n.altAxis,c=void 0!==f&&f,p=n.boundary,u=n.rootBoundary,l=n.altBoundary,d=n.padding,h=n.tether,m=void 0===h||h,g=n.tetherOffset,y=void 0===g?0:g,b=Y(t,{boundary:p,rootBoundary:u,padding:d,altBoundary:l}),x=C(t.placement),w=_(t.placement),L=!w,P=F(x),k="x"===P?"y":"x",W=t.modifiersData.popperOffsets,B=t.rects.reference,H=t.rects.popper,T="function"==typeof y?y(Object.assign({},t.rects,{placement:t.placement})):y,R="number"==typeof T?{mainAxis:T,altAxis:T}:Object.assign({mainAxis:0,altAxis:0},T),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,q={x:0,y:0};if(W){if(s){var V,N="y"===P?j:A,I="y"===P?E:D,U="y"===P?"height":"width",z=W[P],X=z+b[N],G=z-b[I],J=m?-H[U]/2:0,K=w===M?B[U]:H[U],Q=w===M?-H[U]:-B[U],Z=t.elements.arrow,$=m&&Z?v(Z):{width:0,height:0},ee=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},te=ee[N],ne=ee[I],re=ue(0,B[U],$[U]),oe=L?B[U]/2-J-re-te-R.mainAxis:K-re-te-R.mainAxis,ie=L?-B[U]/2+J+re+ne+R.mainAxis:Q+re+ne+R.mainAxis,ae=t.elements.arrow&&O(t.elements.arrow),se=ae?"y"===P?ae.clientTop||0:ae.clientLeft||0:0,fe=null!=(V=null==S?void 0:S[P])?V:0,ce=z+ie-fe,pe=ue(m?a(X,z+oe-fe-se):X,z,m?i(G,ce):G);W[P]=pe,q[P]=pe-z}if(c){var le,de="x"===P?j:A,he="x"===P?E:D,me=W[k],ve="y"===k?"height":"width",ge=me+b[de],ye=me-b[he],be=-1!==[j,A].indexOf(x),xe=null!=(le=null==S?void 0:S[k])?le:0,we=be?ge:me-B[ve]-H[ve]-xe+R.altAxis,Oe=be?me+B[ve]+H[ve]-xe-R.altAxis:ye,je=m&&be?function(e,t,n){var r=ue(e,t,n);return r>n?n:r}(we,me,Oe):ue(m?we:ge,me,m?Oe:ye);W[k]=je,q[k]=je-me}t.modifiersData[r]=q}},requiresIfExists:["offset"]};var de={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,o=e.options,i=n.elements.arrow,a=n.modifiersData.popperOffsets,s=C(n.placement),f=F(s),c=[A,D].indexOf(s)>=0?"height":"width";if(i&&a){var p=function(e,t){return z("number"!=typeof(e="function"==typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:X(e,P))}(o.padding,n),u=v(i),l="y"===f?j:A,d="y"===f?E:D,h=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],m=a[f]-n.rects.reference[f],g=O(i),y=g?"y"===f?g.clientHeight||0:g.clientWidth||0:0,b=h/2-m/2,x=p[l],w=y-u[c]-p[d],L=y/2-u[c]/2+b,M=ue(x,L,w),k=f;n.modifiersData[r]=((t={})[k]=M,t.centerOffset=M-L,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!=typeof r||(r=t.elements.popper.querySelector(r)))&&q(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function he(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function me(e){return[j,D,E,A].some((function(t){return e[t]>=0}))}var ve={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,o=t.rects.popper,i=t.modifiersData.preventOverflow,a=Y(t,{elementContext:"reference"}),s=Y(t,{altBoundary:!0}),f=he(a,r),c=he(s,o,i),p=me(f),u=me(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:u},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":u})}},ge=K({defaultModifiers:[Z,$,ne,re]}),ye=[Z,$,ne,re,oe,pe,le,de,ve],be=K({defaultModifiers:ye});e.applyStyles=re,e.arrow=de,e.computeStyles=ne,e.createPopper=be,e.createPopperLite=ge,e.defaultModifiers=ye,e.detectOverflow=Y,e.eventListeners=Z,e.flip=pe,e.hide=ve,e.offset=oe,e.popperGenerator=K,e.popperOffsets=$,e.preventOverflow=le,Object.defineProperty(e,"__esModule",{value:!0})}));
//# sourceMappingURL=popper.min.js.map
//# sourceURL=[module]
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQHBvcHBlcmpzL2NvcmUvZGlzdC91bWQvcG9wcGVyLm1pbi5qcz8wMzRhIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlLEtBQW9ELFlBQVksU0FBOEgsQ0FBQyxtQkFBbUIsYUFBYSxjQUFjLHlCQUF5QixxQ0FBcUMsc0JBQXNCLGdDQUFnQyxTQUFTLGNBQWMsdURBQXVELGNBQWMsK0RBQStELGNBQWMsOEZBQThGLHVDQUF1QyxnQkFBZ0IsbUJBQW1CLHdDQUF3QyxZQUFZLHFDQUFxQyxtREFBbUQsT0FBTyxvSEFBb0gsY0FBYyxXQUFXLE9BQU8sa0RBQWtELGNBQWMsNkNBQTZDLGNBQWMsMkVBQTJFLGNBQWMsb0NBQW9DLGNBQWMsZ0NBQWdDLGNBQWMsb0RBQW9ELCtDQUErQyxrQkFBa0IsbUJBQW1CLG1DQUFtQyw4RkFBOEYsb0JBQW9CLHVCQUF1Qix5QkFBeUIsSUFBSSxTQUFTLGtFQUFrRSxrREFBa0QsMkVBQTJFLGlGQUFpRixjQUFjLDRDQUE0QyxrRkFBa0YsK0NBQStDLGNBQWMsNkVBQTZFLGNBQWMsNkZBQTZGLGdCQUFnQixNQUFNLG1CQUFtQixpSUFBaUksNkJBQTZCLGNBQWMsMkNBQTJDLGNBQWMseURBQXlELGNBQWMsc0JBQXNCLGtDQUFrQyxRQUFRLG9GQUFvRixnRUFBZ0UsMEZBQTBGLGVBQWUsc0NBQXNDLEVBQUUsV0FBVyxrTUFBa00sZUFBZSxZQUFZLE9BQU8sbUlBQW1JLG1DQUFtQywrQ0FBK0MscUNBQXFDLDZHQUE2RyxjQUFjLDZCQUE2QixjQUFjLG9GQUFvRixjQUFjLGVBQWUsU0FBUyxhQUFhLDhCQUE4QixnQkFBZ0IsMEJBQTBCLG9CQUFvQixLQUFLLGNBQWMsdUJBQXVCLGdCQUFnQixxQ0FBcUMsMEJBQTBCLFlBQVksUUFBUSxHQUFHLCtCQUErQix1QkFBdUIsU0FBUyxTQUFTLGNBQWMsdUJBQXVCLElBQUksdURBQXVELEVBQUUsZ0JB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QUMzcm1CIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL0Bwb3BwZXJqcy9jb3JlL2Rpc3QvdW1kL3BvcHBlci5taW4uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBwb3BwZXJqcy9jb3JlIHYyLjExLjIgLSBNSVQgTGljZW5zZVxuICovXG5cbiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP3QoZXhwb3J0cyk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShbXCJleHBvcnRzXCJdLHQpOnQoKGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5Qb3BwZXI9e30pfSh0aGlzLChmdW5jdGlvbihlKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KGUpe2lmKG51bGw9PWUpcmV0dXJuIHdpbmRvdztpZihcIltvYmplY3QgV2luZG93XVwiIT09ZS50b1N0cmluZygpKXt2YXIgdD1lLm93bmVyRG9jdW1lbnQ7cmV0dXJuIHQmJnQuZGVmYXVsdFZpZXd8fHdpbmRvd31yZXR1cm4gZX1mdW5jdGlvbiBuKGUpe3JldHVybiBlIGluc3RhbmNlb2YgdChlKS5FbGVtZW50fHxlIGluc3RhbmNlb2YgRWxlbWVudH1mdW5jdGlvbiByKGUpe3JldHVybiBlIGluc3RhbmNlb2YgdChlKS5IVE1MRWxlbWVudHx8ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50fWZ1bmN0aW9uIG8oZSl7cmV0dXJuXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFNoYWRvd1Jvb3QmJihlIGluc3RhbmNlb2YgdChlKS5TaGFkb3dSb290fHxlIGluc3RhbmNlb2YgU2hhZG93Um9vdCl9dmFyIGk9TWF0aC5tYXgsYT1NYXRoLm1pbixzPU1hdGgucm91bmQ7ZnVuY3Rpb24gZihlLHQpe3ZvaWQgMD09PXQmJih0PSExKTt2YXIgbj1lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG89MSxpPTE7aWYocihlKSYmdCl7dmFyIGE9ZS5vZmZzZXRIZWlnaHQsZj1lLm9mZnNldFdpZHRoO2Y+MCYmKG89cyhuLndpZHRoKS9mfHwxKSxhPjAmJihpPXMobi5oZWlnaHQpL2F8fDEpfXJldHVybnt3aWR0aDpuLndpZHRoL28saGVpZ2h0Om4uaGVpZ2h0L2ksdG9wOm4udG9wL2kscmlnaHQ6bi5yaWdodC9vLGJvdHRvbTpuLmJvdHRvbS9pLGxlZnQ6bi5sZWZ0L28seDpuLmxlZnQvbyx5Om4udG9wL2l9fWZ1bmN0aW9uIGMoZSl7dmFyIG49dChlKTtyZXR1cm57c2Nyb2xsTGVmdDpuLnBhZ2VYT2Zmc2V0LHNjcm9sbFRvcDpuLnBhZ2VZT2Zmc2V0fX1mdW5jdGlvbiBwKGUpe3JldHVybiBlPyhlLm5vZGVOYW1lfHxcIlwiKS50b0xvd2VyQ2FzZSgpOm51bGx9ZnVuY3Rpb24gdShlKXtyZXR1cm4oKG4oZSk/ZS5vd25lckRvY3VtZW50OmUuZG9jdW1lbnQpfHx3aW5kb3cuZG9jdW1lbnQpLmRvY3VtZW50RWxlbWVudH1mdW5jdGlvbiBsKGUpe3JldHVybiBmKHUoZSkpLmxlZnQrYyhlKS5zY3JvbGxMZWZ0fWZ1bmN0aW9uIGQoZSl7cmV0dXJuIHQoZSkuZ2V0Q29tcHV0ZWRTdHlsZShlKX1mdW5jdGlvbiBoKGUpe3ZhciB0PWQoZSksbj10Lm92ZXJmbG93LHI9dC5vdmVyZmxvd1gsbz10Lm92ZXJmbG93WTtyZXR1cm4vYXV0b3xzY3JvbGx8b3ZlcmxheXxoaWRkZW4vLnRlc3QobitvK3IpfWZ1bmN0aW9uIG0oZSxuLG8pe3ZvaWQgMD09PW8mJihvPSExKTt2YXIgaSxhLGQ9cihuKSxtPXIobikmJmZ1bmN0aW9uKGUpe3ZhciB0PWUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksbj1zKHQud2lkdGgpL2Uub2Zmc2V0V2lkdGh8fDEscj1zKHQuaGVpZ2h0KS9lLm9mZnNldEhlaWdodHx8MTtyZXR1cm4gMSE9PW58fDEhPT1yfShuKSx2PXUobiksZz1mKGUsbSkseT17c2Nyb2xsTGVmdDowLHNjcm9sbFRvcDowfSxiPXt4OjAseTowfTtyZXR1cm4oZHx8IWQmJiFvKSYmKChcImJvZHlcIiE9PXAobil8fGgodikpJiYoeT0oaT1uKSE9PXQoaSkmJnIoaSk/e3Njcm9sbExlZnQ6KGE9aSkuc2Nyb2xsTGVmdCxzY3JvbGxUb3A6YS5zY3JvbGxUb3B9OmMoaSkpLHIobik/KChiPWYobiwhMCkpLngrPW4uY2xpZW50TGVmdCxiLnkrPW4uY2xpZW50VG9wKTp2JiYoYi54PWwodikpKSx7eDpnLmxlZnQreS5zY3JvbGxMZWZ0LWIueCx5OmcudG9wK3kuc2Nyb2xsVG9wLWIueSx3aWR0aDpnLndpZHRoLGhlaWdodDpnLmhlaWdodH19ZnVuY3Rpb24gdihlKXt2YXIgdD1mKGUpLG49ZS5vZmZzZXRXaWR0aCxyPWUub2Zmc2V0SGVpZ2h0O3JldHVybiBNYXRoLmFicyh0LndpZHRoLW4pPD0xJiYobj10LndpZHRoKSxNYXRoLmFicyh0LmhlaWdodC1yKTw9MSYmKHI9dC5oZWlnaHQpLHt4OmUub2Zmc2V0TGVmdCx5OmUub2Zmc2V0VG9wLHdpZHRoOm4saGVpZ2h0OnJ9fWZ1bmN0aW9uIGcoZSl7cmV0dXJuXCJodG1sXCI9PT1wKGUpP2U6ZS5hc3NpZ25lZFNsb3R8fGUucGFyZW50Tm9kZXx8KG8oZSk/ZS5ob3N0Om51bGwpfHx1KGUpfWZ1bmN0aW9uIHkoZSl7cmV0dXJuW1wiaHRtbFwiLFwiYm9keVwiLFwiI2RvY3VtZW50XCJdLmluZGV4T2YocChlKSk+PTA/ZS5vd25lckRvY3VtZW50LmJvZHk6cihlKSYmaChlKT9lOnkoZyhlKSl9ZnVuY3Rpb24gYihlLG4pe3ZhciByO3ZvaWQgMD09PW4mJihuPVtdKTt2YXIgbz15KGUpLGk9bz09PShudWxsPT0ocj1lLm93bmVyRG9jdW1lbnQpP3ZvaWQgMDpyLmJvZHkpLGE9dChvKSxzPWk/W2FdLmNvbmNhdChhLnZpc3VhbFZpZXdwb3J0fHxbXSxoKG8pP286W10pOm8sZj1uLmNvbmNhdChzKTtyZXR1cm4gaT9mOmYuY29uY2F0KGIoZyhzKSkpfWZ1bmN0aW9uIHgoZSl7cmV0dXJuW1widGFibGVcIixcInRkXCIsXCJ0aFwiXS5pbmRleE9mKHAoZSkpPj0wfWZ1bmN0aW9uIHcoZSl7cmV0dXJuIHIoZSkmJlwiZml4ZWRcIiE9PWQoZSkucG9zaXRpb24/ZS5vZmZzZXRQYXJlbnQ6bnVsbH1mdW5jdGlvbiBPKGUpe2Zvcih2YXIgbj10KGUpLG89dyhlKTtvJiZ4KG8pJiZcInN0YXRpY1wiPT09ZChvKS5wb3NpdGlvbjspbz13KG8pO3JldHVybiBvJiYoXCJodG1sXCI9PT1wKG8pfHxcImJvZHlcIj09PXAobykmJlwic3RhdGljXCI9PT1kKG8pLnBvc2l0aW9uKT9uOm98fGZ1bmN0aW9uKGUpe3ZhciB0PS0xIT09bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoXCJmaXJlZm94XCIpO2lmKC0xIT09bmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiVHJpZGVudFwiKSYmcihlKSYmXCJmaXhlZFwiPT09ZChlKS5wb3NpdGlvbilyZXR1cm4gbnVsbDtmb3IodmFyIG49ZyhlKTtyKG4pJiZbXCJodG1sXCIsXCJib2R5XCJdLmluZGV4T2YocChuKSk8MDspe3ZhciBvPWQobik7aWYoXCJub25lXCIhPT1vLnRyYW5zZm9ybXx8XCJub25lXCIhPT1vLnBlcnNwZWN0aXZlfHxcInBhaW50XCI9PT1vLmNvbnRhaW58fC0xIT09W1widHJhbnNmb3JtXCIsXCJwZXJzcGVjdGl2ZVwiXS5pbmRleE9mKG8ud2lsbENoYW5nZSl8fHQmJlwiZmlsdGVyXCI9PT1vLndpbGxDaGFuZ2V8fHQmJm8uZmlsdGVyJiZcIm5vbmVcIiE9PW8uZmlsdGVyKXJldHVybiBuO249bi5wYXJlbnROb2RlfXJldHVybiBudWxsfShlKXx8bn12YXIgaj1cInRvcFwiLEU9XCJib3R0b21cIixEPVwicmlnaHRcIixBPVwibGVmdFwiLEw9XCJhdXRvXCIsUD1baixFLEQsQV0sTT1cInN0YXJ0XCIsaz1cImVuZFwiLFc9XCJ2aWV3cG9ydFwiLEI9XCJwb3BwZXJcIixIPVAucmVkdWNlKChmdW5jdGlvbihlLHQpe3JldHVybiBlLmNvbmNhdChbdCtcIi1cIitNLHQrXCItXCIra10pfSksW10pLFQ9W10uY29uY2F0KFAsW0xdKS5yZWR1Y2UoKGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUuY29uY2F0KFt0LHQrXCItXCIrTSx0K1wiLVwiK2tdKX0pLFtdKSxSPVtcImJlZm9yZVJlYWRcIixcInJlYWRcIixcImFmdGVyUmVhZFwiLFwiYmVmb3JlTWFpblwiLFwibWFpblwiLFwiYWZ0ZXJNYWluXCIsXCJiZWZvcmVXcml0ZVwiLFwid3JpdGVcIixcImFmdGVyV3JpdGVcIl07ZnVuY3Rpb24gUyhlKXt2YXIgdD1uZXcgTWFwLG49bmV3IFNldCxyPVtdO2Z1bmN0aW9uIG8oZSl7bi5hZGQoZS5uYW1lKSxbXS5jb25jYXQoZS5yZXF1aXJlc3x8W10sZS5yZXF1aXJlc0lmRXhpc3RzfHxbXSkuZm9yRWFjaCgoZnVuY3Rpb24oZSl7aWYoIW4uaGFzKGUpKXt2YXIgcj10LmdldChlKTtyJiZvKHIpfX0pKSxyLnB1c2goZSl9cmV0dXJuIGUuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dC5zZXQoZS5uYW1lLGUpfSkpLGUuZm9yRWFjaCgoZnVuY3Rpb24oZSl7bi5oYXMoZS5uYW1lKXx8byhlKX0pKSxyfWZ1bmN0aW9uIEMoZSl7cmV0dXJuIGUuc3BsaXQoXCItXCIpWzBdfWZ1bmN0aW9uIHEoZSx0KXt2YXIgbj10LmdldFJvb3ROb2RlJiZ0LmdldFJvb3ROb2RlKCk7aWYoZS5jb250YWlucyh0KSlyZXR1cm4hMDtpZihuJiZvKG4pKXt2YXIgcj10O2Rve2lmKHImJmUuaXNTYW1lTm9kZShyKSlyZXR1cm4hMDtyPXIucGFyZW50Tm9kZXx8ci5ob3N0fXdoaWxlKHIpfXJldHVybiExfWZ1bmN0aW9uIFYoZSl7cmV0dXJuIE9iamVjdC5hc3NpZ24oe30sZSx7bGVmdDplLngsdG9wOmUueSxyaWdodDplLngrZS53aWR0aCxib3R0b206ZS55K2UuaGVpZ2h0fSl9ZnVuY3Rpb24gTihlLHIpe3JldHVybiByPT09Vz9WKGZ1bmN0aW9uKGUpe3ZhciBuPXQoZSkscj11KGUpLG89bi52aXN1YWxWaWV3cG9ydCxpPXIuY2xpZW50V2lkdGgsYT1yLmNsaWVudEhlaWdodCxzPTAsZj0wO3JldHVybiBvJiYoaT1vLndpZHRoLGE9by5oZWlnaHQsL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KXx8KHM9by5vZmZzZXRMZWZ0LGY9by5vZmZzZXRUb3ApKSx7d2lkdGg6aSxoZWlnaHQ6YSx4OnMrbChlKSx5OmZ9fShlKSk6bihyKT9mdW5jdGlvbihlKXt2YXIgdD1mKGUpO3JldHVybiB0LnRvcD10LnRvcCtlLmNsaWVudFRvcCx0LmxlZnQ9dC5sZWZ0K2UuY2xpZW50TGVmdCx0LmJvdHRvbT10LnRvcCtlLmNsaWVudEhlaWdodCx0LnJpZ2h0PXQubGVmdCtlLmNsaWVudFdpZHRoLHQud2lkdGg9ZS5jbGllbnRXaWR0aCx0LmhlaWdodD1lLmNsaWVudEhlaWdodCx0Lng9dC5sZWZ0LHQueT10LnRvcCx0fShyKTpWKGZ1bmN0aW9uKGUpe3ZhciB0LG49dShlKSxyPWMoZSksbz1udWxsPT0odD1lLm93bmVyRG9jdW1lbnQpP3ZvaWQgMDp0LmJvZHksYT1pKG4uc2Nyb2xsV2lkdGgsbi5jbGllbnRXaWR0aCxvP28uc2Nyb2xsV2lkdGg6MCxvP28uY2xpZW50V2lkdGg6MCkscz1pKG4uc2Nyb2xsSGVpZ2h0LG4uY2xpZW50SGVpZ2h0LG8/by5zY3JvbGxIZWlnaHQ6MCxvP28uY2xpZW50SGVpZ2h0OjApLGY9LXIuc2Nyb2xsTGVmdCtsKGUpLHA9LXIuc2Nyb2xsVG9wO3JldHVyblwicnRsXCI9PT1kKG98fG4pLmRpcmVjdGlvbiYmKGYrPWkobi5jbGllbnRXaWR0aCxvP28uY2xpZW50V2lkdGg6MCktYSkse3dpZHRoOmEsaGVpZ2h0OnMseDpmLHk6cH19KHUoZSkpKX1mdW5jdGlvbiBJKGUsdCxvKXt2YXIgcz1cImNsaXBwaW5nUGFyZW50c1wiPT09dD9mdW5jdGlvbihlKXt2YXIgdD1iKGcoZSkpLG89W1wiYWJzb2x1dGVcIixcImZpeGVkXCJdLmluZGV4T2YoZChlKS5wb3NpdGlvbik+PTAmJnIoZSk/TyhlKTplO3JldHVybiBuKG8pP3QuZmlsdGVyKChmdW5jdGlvbihlKXtyZXR1cm4gbihlKSYmcShlLG8pJiZcImJvZHlcIiE9PXAoZSl9KSk6W119KGUpOltdLmNvbmNhdCh0KSxmPVtdLmNvbmNhdChzLFtvXSksYz1mWzBdLHU9Zi5yZWR1Y2UoKGZ1bmN0aW9uKHQsbil7dmFyIHI9TihlLG4pO3JldHVybiB0LnRvcD1pKHIudG9wLHQudG9wKSx0LnJpZ2h0PWEoci5yaWdodCx0LnJpZ2h0KSx0LmJvdHRvbT1hKHIuYm90dG9tLHQuYm90dG9tKSx0LmxlZnQ9aShyLmxlZnQsdC5sZWZ0KSx0fSksTihlLGMpKTtyZXR1cm4gdS53aWR0aD11LnJpZ2h0LXUubGVmdCx1LmhlaWdodD11LmJvdHRvbS11LnRvcCx1Lng9dS5sZWZ0LHUueT11LnRvcCx1fWZ1bmN0aW9uIF8oZSl7cmV0dXJuIGUuc3BsaXQoXCItXCIpWzFdfWZ1bmN0aW9uIEYoZSl7cmV0dXJuW1widG9wXCIsXCJib3R0b21cIl0uaW5kZXhPZihlKT49MD9cInhcIjpcInlcIn1mdW5jdGlvbiBVKGUpe3ZhciB0LG49ZS5yZWZlcmVuY2Uscj1lLmVsZW1lbnQsbz1lLnBsYWNlbWVudCxpPW8/QyhvKTpudWxsLGE9bz9fKG8pOm51bGwscz1uLngrbi53aWR0aC8yLXIud2lkdGgvMixmPW4ueStuLmhlaWdodC8yLXIuaGVpZ2h0LzI7c3dpdGNoKGkpe2Nhc2Ugajp0PXt4OnMseTpuLnktci5oZWlnaHR9O2JyZWFrO2Nhc2UgRTp0PXt4OnMseTpuLnkrbi5oZWlnaHR9O2JyZWFrO2Nhc2UgRDp0PXt4Om4ueCtuLndpZHRoLHk6Zn07YnJlYWs7Y2FzZSBBOnQ9e3g6bi54LXIud2lkdGgseTpmfTticmVhaztkZWZhdWx0OnQ9e3g6bi54LHk6bi55fX12YXIgYz1pP0YoaSk6bnVsbDtpZihudWxsIT1jKXt2YXIgcD1cInlcIj09PWM/XCJoZWlnaHRcIjpcIndpZHRoXCI7c3dpdGNoKGEpe2Nhc2UgTTp0W2NdPXRbY10tKG5bcF0vMi1yW3BdLzIpO2JyZWFrO2Nhc2Ugazp0W2NdPXRbY10rKG5bcF0vMi1yW3BdLzIpfX1yZXR1cm4gdH1mdW5jdGlvbiB6KGUpe3JldHVybiBPYmplY3QuYXNzaWduKHt9LHt0b3A6MCxyaWdodDowLGJvdHRvbTowLGxlZnQ6MH0sZSl9ZnVuY3Rpb24gWChlLHQpe3JldHVybiB0LnJlZHVjZSgoZnVuY3Rpb24odCxuKXtyZXR1cm4gdFtuXT1lLHR9KSx7fSl9ZnVuY3Rpb24gWShlLHQpe3ZvaWQgMD09PXQmJih0PXt9KTt2YXIgcj10LG89ci5wbGFjZW1lbnQsaT12b2lkIDA9PT1vP2UucGxhY2VtZW50Om8sYT1yLmJvdW5kYXJ5LHM9dm9pZCAwPT09YT9cImNsaXBwaW5nUGFyZW50c1wiOmEsYz1yLnJvb3RCb3VuZGFyeSxwPXZvaWQgMD09PWM/VzpjLGw9ci5lbGVtZW50Q29udGV4dCxkPXZvaWQgMD09PWw/QjpsLGg9ci5hbHRCb3VuZGFyeSxtPXZvaWQgMCE9PWgmJmgsdj1yLnBhZGRpbmcsZz12b2lkIDA9PT12PzA6dix5PXooXCJudW1iZXJcIiE9dHlwZW9mIGc/ZzpYKGcsUCkpLGI9ZD09PUI/XCJyZWZlcmVuY2VcIjpCLHg9ZS5yZWN0cy5wb3BwZXIsdz1lLmVsZW1lbnRzW20/YjpkXSxPPUkobih3KT93OncuY29udGV4dEVsZW1lbnR8fHUoZS5lbGVtZW50cy5wb3BwZXIpLHMscCksQT1mKGUuZWxlbWVudHMucmVmZXJlbmNlKSxMPVUoe3JlZmVyZW5jZTpBLGVsZW1lbnQ6eCxzdHJhdGVneTpcImFic29sdXRlXCIscGxhY2VtZW50Oml9KSxNPVYoT2JqZWN0LmFzc2lnbih7fSx4LEwpKSxrPWQ9PT1CP006QSxIPXt0b3A6Ty50b3Atay50b3AreS50b3AsYm90dG9tOmsuYm90dG9tLU8uYm90dG9tK3kuYm90dG9tLGxlZnQ6Ty5sZWZ0LWsubGVmdCt5LmxlZnQscmlnaHQ6ay5yaWdodC1PLnJpZ2h0K3kucmlnaHR9LFQ9ZS5tb2RpZmllcnNEYXRhLm9mZnNldDtpZihkPT09QiYmVCl7dmFyIFI9VFtpXTtPYmplY3Qua2V5cyhIKS5mb3JFYWNoKChmdW5jdGlvbihlKXt2YXIgdD1bRCxFXS5pbmRleE9mKGUpPj0wPzE6LTEsbj1baixFXS5pbmRleE9mKGUpPj0wP1wieVwiOlwieFwiO0hbZV0rPVJbbl0qdH0pKX1yZXR1cm4gSH12YXIgRz17cGxhY2VtZW50OlwiYm90dG9tXCIsbW9kaWZpZXJzOltdLHN0cmF0ZWd5OlwiYWJzb2x1dGVcIn07ZnVuY3Rpb24gSigpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9bmV3IEFycmF5KGUpLG49MDtuPGU7bisrKXRbbl09YXJndW1lbnRzW25dO3JldHVybiF0LnNvbWUoKGZ1bmN0aW9uKGUpe3JldHVybiEoZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QpfSkpfWZ1bmN0aW9uIEsoZSl7dm9pZCAwPT09ZSYmKGU9e30pO3ZhciB0PWUscj10LmRlZmF1bHRNb2RpZmllcnMsbz12b2lkIDA9PT1yP1tdOnIsaT10LmRlZmF1bHRPcHRpb25zLGE9dm9pZCAwPT09aT9HOmk7cmV0dXJuIGZ1bmN0aW9uKGUsdCxyKXt2b2lkIDA9PT1yJiYocj1hKTt2YXIgaSxzLGY9e3BsYWNlbWVudDpcImJvdHRvbVwiLG9yZGVyZWRNb2RpZmllcnM6W10sb3B0aW9uczpPYmplY3QuYXNzaWduKHt9LEcsYSksbW9kaWZpZXJzRGF0YTp7fSxlbGVtZW50czp7cmVmZXJlbmNlOmUscG9wcGVyOnR9LGF0dHJpYnV0ZXM6e30sc3R5bGVzOnt9fSxjPVtdLHA9ITEsdT17c3RhdGU6ZixzZXRPcHRpb25zOmZ1bmN0aW9uKHIpe3ZhciBpPVwiZnVuY3Rpb25cIj09dHlwZW9mIHI/cihmLm9wdGlvbnMpOnI7bCgpLGYub3B0aW9ucz1PYmplY3QuYXNzaWduKHt9LGEsZi5vcHRpb25zLGkpLGYuc2Nyb2xsUGFyZW50cz17cmVmZXJlbmNlOm4oZSk/YihlKTplLmNvbnRleHRFbGVtZW50P2IoZS5jb250ZXh0RWxlbWVudCk6W10scG9wcGVyOmIodCl9O3ZhciBzLHAsZD1mdW5jdGlvbihlKXt2YXIgdD1TKGUpO3JldHVybiBSLnJlZHVjZSgoZnVuY3Rpb24oZSxuKXtyZXR1cm4gZS5jb25jYXQodC5maWx0ZXIoKGZ1bmN0aW9uKGUpe3JldHVybiBlLnBoYXNlPT09bn0pKSl9KSxbXSl9KChzPVtdLmNvbmNhdChvLGYub3B0aW9ucy5tb2RpZmllcnMpLHA9cy5yZWR1Y2UoKGZ1bmN0aW9uKGUsdCl7dmFyIG49ZVt0Lm5hbWVdO3JldHVybiBlW3QubmFtZV09bj9PYmplY3QuYXNzaWduKHt9LG4sdCx7b3B0aW9uczpPYmplY3QuYXNzaWduKHt9LG4ub3B0aW9ucyx0Lm9wdGlvbnMpLGRhdGE6T2JqZWN0LmFzc2lnbih7fSxuLmRhdGEsdC5kYXRhKX0pOnQsZX0pLHt9KSxPYmplY3Qua2V5cyhwKS5tYXAoKGZ1bmN0aW9uKGUpe3JldHVybiBwW2VdfSkpKSk7cmV0dXJuIGYub3JkZXJlZE1vZGlmaWVycz1kLmZpbHRlcigoZnVuY3Rpb24oZSl7cmV0dXJuIGUuZW5hYmxlZH0pKSxmLm9yZGVyZWRNb2RpZmllcnMuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dmFyIHQ9ZS5uYW1lLG49ZS5vcHRpb25zLHI9dm9pZCAwPT09bj97fTpuLG89ZS5lZmZlY3Q7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygbyl7dmFyIGk9byh7c3RhdGU6ZixuYW1lOnQsaW5zdGFuY2U6dSxvcHRpb25zOnJ9KSxhPWZ1bmN0aW9uKCl7fTtjLnB1c2goaXx8YSl9fSkpLHUudXBkYXRlKCl9LGZvcmNlVXBkYXRlOmZ1bmN0aW9uKCl7aWYoIXApe3ZhciBlPWYuZWxlbWVudHMsdD1lLnJlZmVyZW5jZSxuPWUucG9wcGVyO2lmKEoodCxuKSl7Zi5yZWN0cz17cmVmZXJlbmNlOm0odCxPKG4pLFwiZml4ZWRcIj09PWYub3B0aW9ucy5zdHJhdGVneSkscG9wcGVyOnYobil9LGYucmVzZXQ9ITEsZi5wbGFjZW1lbnQ9Zi5vcHRpb25zLnBsYWNlbWVudCxmLm9yZGVyZWRNb2RpZmllcnMuZm9yRWFjaCgoZnVuY3Rpb24oZSl7cmV0dXJuIGYubW9kaWZpZXJzRGF0YVtlLm5hbWVdPU9iamVjdC5hc3NpZ24oe30sZS5kYXRhKX0pKTtmb3IodmFyIHI9MDtyPGYub3JkZXJlZE1vZGlmaWVycy5sZW5ndGg7cisrKWlmKCEwIT09Zi5yZXNldCl7dmFyIG89Zi5vcmRlcmVkTW9kaWZpZXJzW3JdLGk9by5mbixhPW8ub3B0aW9ucyxzPXZvaWQgMD09PWE/e306YSxjPW8ubmFtZTtcImZ1bmN0aW9uXCI9PXR5cGVvZiBpJiYoZj1pKHtzdGF0ZTpmLG9wdGlvbnM6cyxuYW1lOmMsaW5zdGFuY2U6dX0pfHxmKX1lbHNlIGYucmVzZXQ9ITEscj0tMX19fSx1cGRhdGU6KGk9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IFByb21pc2UoKGZ1bmN0aW9uKGUpe3UuZm9yY2VVcGRhdGUoKSxlKGYpfSkpfSxmdW5jdGlvbigpe3JldHVybiBzfHwocz1uZXcgUHJvbWlzZSgoZnVuY3Rpb24oZSl7UHJvbWlzZS5yZXNvbHZlKCkudGhlbigoZnVuY3Rpb24oKXtzPXZvaWQgMCxlKGkoKSl9KSl9KSkpLHN9KSxkZXN0cm95OmZ1bmN0aW9uKCl7bCgpLHA9ITB9fTtpZighSihlLHQpKXJldHVybiB1O2Z1bmN0aW9uIGwoKXtjLmZvckVhY2goKGZ1bmN0aW9uKGUpe3JldHVybiBlKCl9KSksYz1bXX1yZXR1cm4gdS5zZXRPcHRpb25zKHIpLnRoZW4oKGZ1bmN0aW9uKGUpeyFwJiZyLm9uRmlyc3RVcGRhdGUmJnIub25GaXJzdFVwZGF0ZShlKX0pKSx1fX12YXIgUT17cGFzc2l2ZTohMH07dmFyIFo9e25hbWU6XCJldmVudExpc3RlbmVyc1wiLGVuYWJsZWQ6ITAscGhhc2U6XCJ3cml0ZVwiLGZuOmZ1bmN0aW9uKCl7fSxlZmZlY3Q6ZnVuY3Rpb24oZSl7dmFyIG49ZS5zdGF0ZSxyPWUuaW5zdGFuY2Usbz1lLm9wdGlvbnMsaT1vLnNjcm9sbCxhPXZvaWQgMD09PWl8fGkscz1vLnJlc2l6ZSxmPXZvaWQgMD09PXN8fHMsYz10KG4uZWxlbWVudHMucG9wcGVyKSxwPVtdLmNvbmNhdChuLnNjcm9sbFBhcmVudHMucmVmZXJlbmNlLG4uc2Nyb2xsUGFyZW50cy5wb3BwZXIpO3JldHVybiBhJiZwLmZvckVhY2goKGZ1bmN0aW9uKGUpe2UuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLHIudXBkYXRlLFEpfSkpLGYmJmMuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHIudXBkYXRlLFEpLGZ1bmN0aW9uKCl7YSYmcC5mb3JFYWNoKChmdW5jdGlvbihlKXtlLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIixyLnVwZGF0ZSxRKX0pKSxmJiZjLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixyLnVwZGF0ZSxRKX19LGRhdGE6e319O3ZhciAkPXtuYW1lOlwicG9wcGVyT2Zmc2V0c1wiLGVuYWJsZWQ6ITAscGhhc2U6XCJyZWFkXCIsZm46ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5zdGF0ZSxuPWUubmFtZTt0Lm1vZGlmaWVyc0RhdGFbbl09VSh7cmVmZXJlbmNlOnQucmVjdHMucmVmZXJlbmNlLGVsZW1lbnQ6dC5yZWN0cy5wb3BwZXIsc3RyYXRlZ3k6XCJhYnNvbHV0ZVwiLHBsYWNlbWVudDp0LnBsYWNlbWVudH0pfSxkYXRhOnt9fSxlZT17dG9wOlwiYXV0b1wiLHJpZ2h0OlwiYXV0b1wiLGJvdHRvbTpcImF1dG9cIixsZWZ0OlwiYXV0b1wifTtmdW5jdGlvbiB0ZShlKXt2YXIgbixyPWUucG9wcGVyLG89ZS5wb3BwZXJSZWN0LGk9ZS5wbGFjZW1lbnQsYT1lLnZhcmlhdGlvbixmPWUub2Zmc2V0cyxjPWUucG9zaXRpb24scD1lLmdwdUFjY2VsZXJhdGlvbixsPWUuYWRhcHRpdmUsaD1lLnJvdW5kT2Zmc2V0cyxtPWUuaXNGaXhlZCx2PWYueCxnPXZvaWQgMD09PXY/MDp2LHk9Zi55LGI9dm9pZCAwPT09eT8wOnkseD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBoP2goe3g6Zyx5OmJ9KTp7eDpnLHk6Yn07Zz14LngsYj14Lnk7dmFyIHc9Zi5oYXNPd25Qcm9wZXJ0eShcInhcIiksTD1mLmhhc093blByb3BlcnR5KFwieVwiKSxQPUEsTT1qLFc9d2luZG93O2lmKGwpe3ZhciBCPU8ociksSD1cImNsaWVudEhlaWdodFwiLFQ9XCJjbGllbnRXaWR0aFwiO2lmKEI9PT10KHIpJiZcInN0YXRpY1wiIT09ZChCPXUocikpLnBvc2l0aW9uJiZcImFic29sdXRlXCI9PT1jJiYoSD1cInNjcm9sbEhlaWdodFwiLFQ9XCJzY3JvbGxXaWR0aFwiKSxCPUIsaT09PWp8fChpPT09QXx8aT09PUQpJiZhPT09aylNPUUsYi09KG0mJlcudmlzdWFsVmlld3BvcnQ/Vy52aXN1YWxWaWV3cG9ydC5oZWlnaHQ6QltIXSktby5oZWlnaHQsYio9cD8xOi0xO2lmKGk9PT1BfHwoaT09PWp8fGk9PT1FKSYmYT09PWspUD1ELGctPShtJiZXLnZpc3VhbFZpZXdwb3J0P1cudmlzdWFsVmlld3BvcnQud2lkdGg6QltUXSktby53aWR0aCxnKj1wPzE6LTF9dmFyIFIsUz1PYmplY3QuYXNzaWduKHtwb3NpdGlvbjpjfSxsJiZlZSksQz0hMD09PWg/ZnVuY3Rpb24oZSl7dmFyIHQ9ZS54LG49ZS55LHI9d2luZG93LmRldmljZVBpeGVsUmF0aW98fDE7cmV0dXJue3g6cyh0KnIpL3J8fDAseTpzKG4qcikvcnx8MH19KHt4OmcseTpifSk6e3g6Zyx5OmJ9O3JldHVybiBnPUMueCxiPUMueSxwP09iamVjdC5hc3NpZ24oe30sUywoKFI9e30pW01dPUw/XCIwXCI6XCJcIixSW1BdPXc/XCIwXCI6XCJcIixSLnRyYW5zZm9ybT0oVy5kZXZpY2VQaXhlbFJhdGlvfHwxKTw9MT9cInRyYW5zbGF0ZShcIitnK1wicHgsIFwiK2IrXCJweClcIjpcInRyYW5zbGF0ZTNkKFwiK2crXCJweCwgXCIrYitcInB4LCAwKVwiLFIpKTpPYmplY3QuYXNzaWduKHt9LFMsKChuPXt9KVtNXT1MP2IrXCJweFwiOlwiXCIsbltQXT13P2crXCJweFwiOlwiXCIsbi50cmFuc2Zvcm09XCJcIixuKSl9dmFyIG5lPXtuYW1lOlwiY29tcHV0ZVN0eWxlc1wiLGVuYWJsZWQ6ITAscGhhc2U6XCJiZWZvcmVXcml0ZVwiLGZuOmZ1bmN0aW9uKGUpe3ZhciB0PWUuc3RhdGUsbj1lLm9wdGlvbnMscj1uLmdwdUFjY2VsZXJhdGlvbixvPXZvaWQgMD09PXJ8fHIsaT1uLmFkYXB0aXZlLGE9dm9pZCAwPT09aXx8aSxzPW4ucm91bmRPZmZzZXRzLGY9dm9pZCAwPT09c3x8cyxjPXtwbGFjZW1lbnQ6Qyh0LnBsYWNlbWVudCksdmFyaWF0aW9uOl8odC5wbGFjZW1lbnQpLHBvcHBlcjp0LmVsZW1lbnRzLnBvcHBlcixwb3BwZXJSZWN0OnQucmVjdHMucG9wcGVyLGdwdUFjY2VsZXJhdGlvbjpvLGlzRml4ZWQ6XCJmaXhlZFwiPT09dC5vcHRpb25zLnN0cmF0ZWd5fTtudWxsIT10Lm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyYmKHQuc3R5bGVzLnBvcHBlcj1PYmplY3QuYXNzaWduKHt9LHQuc3R5bGVzLnBvcHBlcix0ZShPYmplY3QuYXNzaWduKHt9LGMse29mZnNldHM6dC5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMscG9zaXRpb246dC5vcHRpb25zLnN0cmF0ZWd5LGFkYXB0aXZlOmEscm91bmRPZmZzZXRzOmZ9KSkpKSxudWxsIT10Lm1vZGlmaWVyc0RhdGEuYXJyb3cmJih0LnN0eWxlcy5hcnJvdz1PYmplY3QuYXNzaWduKHt9LHQuc3R5bGVzLmFycm93LHRlKE9iamVjdC5hc3NpZ24oe30sYyx7b2Zmc2V0czp0Lm1vZGlmaWVyc0RhdGEuYXJyb3cscG9zaXRpb246XCJhYnNvbHV0ZVwiLGFkYXB0aXZlOiExLHJvdW5kT2Zmc2V0czpmfSkpKSksdC5hdHRyaWJ1dGVzLnBvcHBlcj1PYmplY3QuYXNzaWduKHt9LHQuYXR0cmlidXRlcy5wb3BwZXIse1wiZGF0YS1wb3BwZXItcGxhY2VtZW50XCI6dC5wbGFjZW1lbnR9KX0sZGF0YTp7fX07dmFyIHJlPXtuYW1lOlwiYXBwbHlTdHlsZXNcIixlbmFibGVkOiEwLHBoYXNlOlwid3JpdGVcIixmbjpmdW5jdGlvbihlKXt2YXIgdD1lLnN0YXRlO09iamVjdC5rZXlzKHQuZWxlbWVudHMpLmZvckVhY2goKGZ1bmN0aW9uKGUpe3ZhciBuPXQuc3R5bGVzW2VdfHx7fSxvPXQuYXR0cmlidXRlc1tlXXx8e30saT10LmVsZW1lbnRzW2VdO3IoaSkmJnAoaSkmJihPYmplY3QuYXNzaWduKGkuc3R5bGUsbiksT2JqZWN0LmtleXMobykuZm9yRWFjaCgoZnVuY3Rpb24oZSl7dmFyIHQ9b1tlXTshMT09PXQ/aS5yZW1vdmVBdHRyaWJ1dGUoZSk6aS5zZXRBdHRyaWJ1dGUoZSwhMD09PXQ/XCJcIjp0KX0pKSl9KSl9LGVmZmVjdDpmdW5jdGlvbihlKXt2YXIgdD1lLnN0YXRlLG49e3BvcHBlcjp7cG9zaXRpb246dC5vcHRpb25zLnN0cmF0ZWd5LGxlZnQ6XCIwXCIsdG9wOlwiMFwiLG1hcmdpbjpcIjBcIn0sYXJyb3c6e3Bvc2l0aW9uOlwiYWJzb2x1dGVcIn0scmVmZXJlbmNlOnt9fTtyZXR1cm4gT2JqZWN0LmFzc2lnbih0LmVsZW1lbnRzLnBvcHBlci5zdHlsZSxuLnBvcHBlciksdC5zdHlsZXM9bix0LmVsZW1lbnRzLmFycm93JiZPYmplY3QuYXNzaWduKHQuZWxlbWVudHMuYXJyb3cuc3R5bGUsbi5hcnJvdyksZnVuY3Rpb24oKXtPYmplY3Qua2V5cyh0LmVsZW1lbnRzKS5mb3JFYWNoKChmdW5jdGlvbihlKXt2YXIgbz10LmVsZW1lbnRzW2VdLGk9dC5hdHRyaWJ1dGVzW2VdfHx7fSxhPU9iamVjdC5rZXlzKHQuc3R5bGVzLmhhc093blByb3BlcnR5KGUpP3Quc3R5bGVzW2VdOm5bZV0pLnJlZHVjZSgoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZVt0XT1cIlwiLGV9KSx7fSk7cihvKSYmcChvKSYmKE9iamVjdC5hc3NpZ24oby5zdHlsZSxhKSxPYmplY3Qua2V5cyhpKS5mb3JFYWNoKChmdW5jdGlvbihlKXtvLnJlbW92ZUF0dHJpYnV0ZShlKX0pKSl9KSl9fSxyZXF1aXJlczpbXCJjb21wdXRlU3R5bGVzXCJdfTt2YXIgb2U9e25hbWU6XCJvZmZzZXRcIixlbmFibGVkOiEwLHBoYXNlOlwibWFpblwiLHJlcXVpcmVzOltcInBvcHBlck9mZnNldHNcIl0sZm46ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5zdGF0ZSxuPWUub3B0aW9ucyxyPWUubmFtZSxvPW4ub2Zmc2V0LGk9dm9pZCAwPT09bz9bMCwwXTpvLGE9VC5yZWR1Y2UoKGZ1bmN0aW9uKGUsbil7cmV0dXJuIGVbbl09ZnVuY3Rpb24oZSx0LG4pe3ZhciByPUMoZSksbz1bQSxqXS5pbmRleE9mKHIpPj0wPy0xOjEsaT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBuP24oT2JqZWN0LmFzc2lnbih7fSx0LHtwbGFjZW1lbnQ6ZX0pKTpuLGE9aVswXSxzPWlbMV07cmV0dXJuIGE9YXx8MCxzPShzfHwwKSpvLFtBLERdLmluZGV4T2Yocik+PTA/e3g6cyx5OmF9Ont4OmEseTpzfX0obix0LnJlY3RzLGkpLGV9KSx7fSkscz1hW3QucGxhY2VtZW50XSxmPXMueCxjPXMueTtudWxsIT10Lm1vZGlmaWVyc0RhdGEucG9wcGVyT2Zmc2V0cyYmKHQubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLngrPWYsdC5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMueSs9YyksdC5tb2RpZmllcnNEYXRhW3JdPWF9fSxpZT17bGVmdDpcInJpZ2h0XCIscmlnaHQ6XCJsZWZ0XCIsYm90dG9tOlwidG9wXCIsdG9wOlwiYm90dG9tXCJ9O2Z1bmN0aW9uIGFlKGUpe3JldHVybiBlLnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLChmdW5jdGlvbihlKXtyZXR1cm4gaWVbZV19KSl9dmFyIHNlPXtzdGFydDpcImVuZFwiLGVuZDpcInN0YXJ0XCJ9O2Z1bmN0aW9uIGZlKGUpe3JldHVybiBlLnJlcGxhY2UoL3N0YXJ0fGVuZC9nLChmdW5jdGlvbihlKXtyZXR1cm4gc2VbZV19KSl9ZnVuY3Rpb24gY2UoZSx0KXt2b2lkIDA9PT10JiYodD17fSk7dmFyIG49dCxyPW4ucGxhY2VtZW50LG89bi5ib3VuZGFyeSxpPW4ucm9vdEJvdW5kYXJ5LGE9bi5wYWRkaW5nLHM9bi5mbGlwVmFyaWF0aW9ucyxmPW4uYWxsb3dlZEF1dG9QbGFjZW1lbnRzLGM9dm9pZCAwPT09Zj9UOmYscD1fKHIpLHU9cD9zP0g6SC5maWx0ZXIoKGZ1bmN0aW9uKGUpe3JldHVybiBfKGUpPT09cH0pKTpQLGw9dS5maWx0ZXIoKGZ1bmN0aW9uKGUpe3JldHVybiBjLmluZGV4T2YoZSk+PTB9KSk7MD09PWwubGVuZ3RoJiYobD11KTt2YXIgZD1sLnJlZHVjZSgoZnVuY3Rpb24odCxuKXtyZXR1cm4gdFtuXT1ZKGUse3BsYWNlbWVudDpuLGJvdW5kYXJ5Om8scm9vdEJvdW5kYXJ5OmkscGFkZGluZzphfSlbQyhuKV0sdH0pLHt9KTtyZXR1cm4gT2JqZWN0LmtleXMoZCkuc29ydCgoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZFtlXS1kW3RdfSkpfXZhciBwZT17bmFtZTpcImZsaXBcIixlbmFibGVkOiEwLHBoYXNlOlwibWFpblwiLGZuOmZ1bmN0aW9uKGUpe3ZhciB0PWUuc3RhdGUsbj1lLm9wdGlvbnMscj1lLm5hbWU7aWYoIXQubW9kaWZpZXJzRGF0YVtyXS5fc2tpcCl7Zm9yKHZhciBvPW4ubWFpbkF4aXMsaT12b2lkIDA9PT1vfHxvLGE9bi5hbHRBeGlzLHM9dm9pZCAwPT09YXx8YSxmPW4uZmFsbGJhY2tQbGFjZW1lbnRzLGM9bi5wYWRkaW5nLHA9bi5ib3VuZGFyeSx1PW4ucm9vdEJvdW5kYXJ5LGw9bi5hbHRCb3VuZGFyeSxkPW4uZmxpcFZhcmlhdGlvbnMsaD12b2lkIDA9PT1kfHxkLG09bi5hbGxvd2VkQXV0b1BsYWNlbWVudHMsdj10Lm9wdGlvbnMucGxhY2VtZW50LGc9Qyh2KSx5PWZ8fChnPT09dnx8IWg/W2FlKHYpXTpmdW5jdGlvbihlKXtpZihDKGUpPT09TClyZXR1cm5bXTt2YXIgdD1hZShlKTtyZXR1cm5bZmUoZSksdCxmZSh0KV19KHYpKSxiPVt2XS5jb25jYXQoeSkucmVkdWNlKChmdW5jdGlvbihlLG4pe3JldHVybiBlLmNvbmNhdChDKG4pPT09TD9jZSh0LHtwbGFjZW1lbnQ6bixib3VuZGFyeTpwLHJvb3RCb3VuZGFyeTp1LHBhZGRpbmc6YyxmbGlwVmFyaWF0aW9uczpoLGFsbG93ZWRBdXRvUGxhY2VtZW50czptfSk6bil9KSxbXSkseD10LnJlY3RzLnJlZmVyZW5jZSx3PXQucmVjdHMucG9wcGVyLE89bmV3IE1hcCxQPSEwLGs9YlswXSxXPTA7VzxiLmxlbmd0aDtXKyspe3ZhciBCPWJbV10sSD1DKEIpLFQ9XyhCKT09PU0sUj1baixFXS5pbmRleE9mKEgpPj0wLFM9Uj9cIndpZHRoXCI6XCJoZWlnaHRcIixxPVkodCx7cGxhY2VtZW50OkIsYm91bmRhcnk6cCxyb290Qm91bmRhcnk6dSxhbHRCb3VuZGFyeTpsLHBhZGRpbmc6Y30pLFY9Uj9UP0Q6QTpUP0U6ajt4W1NdPndbU10mJihWPWFlKFYpKTt2YXIgTj1hZShWKSxJPVtdO2lmKGkmJkkucHVzaChxW0hdPD0wKSxzJiZJLnB1c2gocVtWXTw9MCxxW05dPD0wKSxJLmV2ZXJ5KChmdW5jdGlvbihlKXtyZXR1cm4gZX0pKSl7az1CLFA9ITE7YnJlYWt9Ty5zZXQoQixJKX1pZihQKWZvcih2YXIgRj1mdW5jdGlvbihlKXt2YXIgdD1iLmZpbmQoKGZ1bmN0aW9uKHQpe3ZhciBuPU8uZ2V0KHQpO2lmKG4pcmV0dXJuIG4uc2xpY2UoMCxlKS5ldmVyeSgoZnVuY3Rpb24oZSl7cmV0dXJuIGV9KSl9KSk7aWYodClyZXR1cm4gaz10LFwiYnJlYWtcIn0sVT1oPzM6MTtVPjA7VS0tKXtpZihcImJyZWFrXCI9PT1GKFUpKWJyZWFrfXQucGxhY2VtZW50IT09ayYmKHQubW9kaWZpZXJzRGF0YVtyXS5fc2tpcD0hMCx0LnBsYWNlbWVudD1rLHQucmVzZXQ9ITApfX0scmVxdWlyZXNJZkV4aXN0czpbXCJvZmZzZXRcIl0sZGF0YTp7X3NraXA6ITF9fTtmdW5jdGlvbiB1ZShlLHQsbil7cmV0dXJuIGkoZSxhKHQsbikpfXZhciBsZT17bmFtZTpcInByZXZlbnRPdmVyZmxvd1wiLGVuYWJsZWQ6ITAscGhhc2U6XCJtYWluXCIsZm46ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5zdGF0ZSxuPWUub3B0aW9ucyxyPWUubmFtZSxvPW4ubWFpbkF4aXMscz12b2lkIDA9PT1vfHxvLGY9bi5hbHRBeGlzLGM9dm9pZCAwIT09ZiYmZixwPW4uYm91bmRhcnksdT1uLnJvb3RCb3VuZGFyeSxsPW4uYWx0Qm91bmRhcnksZD1uLnBhZGRpbmcsaD1uLnRldGhlcixtPXZvaWQgMD09PWh8fGgsZz1uLnRldGhlck9mZnNldCx5PXZvaWQgMD09PWc/MDpnLGI9WSh0LHtib3VuZGFyeTpwLHJvb3RCb3VuZGFyeTp1LHBhZGRpbmc6ZCxhbHRCb3VuZGFyeTpsfSkseD1DKHQucGxhY2VtZW50KSx3PV8odC5wbGFjZW1lbnQpLEw9IXcsUD1GKHgpLGs9XCJ4XCI9PT1QP1wieVwiOlwieFwiLFc9dC5tb2RpZmllcnNEYXRhLnBvcHBlck9mZnNldHMsQj10LnJlY3RzLnJlZmVyZW5jZSxIPXQucmVjdHMucG9wcGVyLFQ9XCJmdW5jdGlvblwiPT10eXBlb2YgeT95KE9iamVjdC5hc3NpZ24oe30sdC5yZWN0cyx7cGxhY2VtZW50OnQucGxhY2VtZW50fSkpOnksUj1cIm51bWJlclwiPT10eXBlb2YgVD97bWFpbkF4aXM6VCxhbHRBeGlzOlR9Ok9iamVjdC5hc3NpZ24oe21haW5BeGlzOjAsYWx0QXhpczowfSxUKSxTPXQubW9kaWZpZXJzRGF0YS5vZmZzZXQ/dC5tb2RpZmllcnNEYXRhLm9mZnNldFt0LnBsYWNlbWVudF06bnVsbCxxPXt4OjAseTowfTtpZihXKXtpZihzKXt2YXIgVixOPVwieVwiPT09UD9qOkEsST1cInlcIj09PVA/RTpELFU9XCJ5XCI9PT1QP1wiaGVpZ2h0XCI6XCJ3aWR0aFwiLHo9V1tQXSxYPXorYltOXSxHPXotYltJXSxKPW0/LUhbVV0vMjowLEs9dz09PU0/QltVXTpIW1VdLFE9dz09PU0/LUhbVV06LUJbVV0sWj10LmVsZW1lbnRzLmFycm93LCQ9bSYmWj92KFopOnt3aWR0aDowLGhlaWdodDowfSxlZT10Lm1vZGlmaWVyc0RhdGFbXCJhcnJvdyNwZXJzaXN0ZW50XCJdP3QubW9kaWZpZXJzRGF0YVtcImFycm93I3BlcnNpc3RlbnRcIl0ucGFkZGluZzp7dG9wOjAscmlnaHQ6MCxib3R0b206MCxsZWZ0OjB9LHRlPWVlW05dLG5lPWVlW0ldLHJlPXVlKDAsQltVXSwkW1VdKSxvZT1MP0JbVV0vMi1KLXJlLXRlLVIubWFpbkF4aXM6Sy1yZS10ZS1SLm1haW5BeGlzLGllPUw/LUJbVV0vMitKK3JlK25lK1IubWFpbkF4aXM6UStyZStuZStSLm1haW5BeGlzLGFlPXQuZWxlbWVudHMuYXJyb3cmJk8odC5lbGVtZW50cy5hcnJvdyksc2U9YWU/XCJ5XCI9PT1QP2FlLmNsaWVudFRvcHx8MDphZS5jbGllbnRMZWZ0fHwwOjAsZmU9bnVsbCE9KFY9bnVsbD09Uz92b2lkIDA6U1tQXSk/VjowLGNlPXoraWUtZmUscGU9dWUobT9hKFgseitvZS1mZS1zZSk6WCx6LG0/aShHLGNlKTpHKTtXW1BdPXBlLHFbUF09cGUten1pZihjKXt2YXIgbGUsZGU9XCJ4XCI9PT1QP2o6QSxoZT1cInhcIj09PVA/RTpELG1lPVdba10sdmU9XCJ5XCI9PT1rP1wiaGVpZ2h0XCI6XCJ3aWR0aFwiLGdlPW1lK2JbZGVdLHllPW1lLWJbaGVdLGJlPS0xIT09W2osQV0uaW5kZXhPZih4KSx4ZT1udWxsIT0obGU9bnVsbD09Uz92b2lkIDA6U1trXSk/bGU6MCx3ZT1iZT9nZTptZS1CW3ZlXS1IW3ZlXS14ZStSLmFsdEF4aXMsT2U9YmU/bWUrQlt2ZV0rSFt2ZV0teGUtUi5hbHRBeGlzOnllLGplPW0mJmJlP2Z1bmN0aW9uKGUsdCxuKXt2YXIgcj11ZShlLHQsbik7cmV0dXJuIHI+bj9uOnJ9KHdlLG1lLE9lKTp1ZShtP3dlOmdlLG1lLG0/T2U6eWUpO1dba109amUscVtrXT1qZS1tZX10Lm1vZGlmaWVyc0RhdGFbcl09cX19LHJlcXVpcmVzSWZFeGlzdHM6W1wib2Zmc2V0XCJdfTt2YXIgZGU9e25hbWU6XCJhcnJvd1wiLGVuYWJsZWQ6ITAscGhhc2U6XCJtYWluXCIsZm46ZnVuY3Rpb24oZSl7dmFyIHQsbj1lLnN0YXRlLHI9ZS5uYW1lLG89ZS5vcHRpb25zLGk9bi5lbGVtZW50cy5hcnJvdyxhPW4ubW9kaWZpZXJzRGF0YS5wb3BwZXJPZmZzZXRzLHM9QyhuLnBsYWNlbWVudCksZj1GKHMpLGM9W0EsRF0uaW5kZXhPZihzKT49MD9cImhlaWdodFwiOlwid2lkdGhcIjtpZihpJiZhKXt2YXIgcD1mdW5jdGlvbihlLHQpe3JldHVybiB6KFwibnVtYmVyXCIhPXR5cGVvZihlPVwiZnVuY3Rpb25cIj09dHlwZW9mIGU/ZShPYmplY3QuYXNzaWduKHt9LHQucmVjdHMse3BsYWNlbWVudDp0LnBsYWNlbWVudH0pKTplKT9lOlgoZSxQKSl9KG8ucGFkZGluZyxuKSx1PXYoaSksbD1cInlcIj09PWY/ajpBLGQ9XCJ5XCI9PT1mP0U6RCxoPW4ucmVjdHMucmVmZXJlbmNlW2NdK24ucmVjdHMucmVmZXJlbmNlW2ZdLWFbZl0tbi5yZWN0cy5wb3BwZXJbY10sbT1hW2ZdLW4ucmVjdHMucmVmZXJlbmNlW2ZdLGc9TyhpKSx5PWc/XCJ5XCI9PT1mP2cuY2xpZW50SGVpZ2h0fHwwOmcuY2xpZW50V2lkdGh8fDA6MCxiPWgvMi1tLzIseD1wW2xdLHc9eS11W2NdLXBbZF0sTD15LzItdVtjXS8yK2IsTT11ZSh4LEwsdyksaz1mO24ubW9kaWZpZXJzRGF0YVtyXT0oKHQ9e30pW2tdPU0sdC5jZW50ZXJPZmZzZXQ9TS1MLHQpfX0sZWZmZWN0OmZ1bmN0aW9uKGUpe3ZhciB0PWUuc3RhdGUsbj1lLm9wdGlvbnMuZWxlbWVudCxyPXZvaWQgMD09PW4/XCJbZGF0YS1wb3BwZXItYXJyb3ddXCI6bjtudWxsIT1yJiYoXCJzdHJpbmdcIiE9dHlwZW9mIHJ8fChyPXQuZWxlbWVudHMucG9wcGVyLnF1ZXJ5U2VsZWN0b3IocikpKSYmcSh0LmVsZW1lbnRzLnBvcHBlcixyKSYmKHQuZWxlbWVudHMuYXJyb3c9cil9LHJlcXVpcmVzOltcInBvcHBlck9mZnNldHNcIl0scmVxdWlyZXNJZkV4aXN0czpbXCJwcmV2ZW50T3ZlcmZsb3dcIl19O2Z1bmN0aW9uIGhlKGUsdCxuKXtyZXR1cm4gdm9pZCAwPT09biYmKG49e3g6MCx5OjB9KSx7dG9wOmUudG9wLXQuaGVpZ2h0LW4ueSxyaWdodDplLnJpZ2h0LXQud2lkdGgrbi54LGJvdHRvbTplLmJvdHRvbS10LmhlaWdodCtuLnksbGVmdDplLmxlZnQtdC53aWR0aC1uLnh9fWZ1bmN0aW9uIG1lKGUpe3JldHVybltqLEQsRSxBXS5zb21lKChmdW5jdGlvbih0KXtyZXR1cm4gZVt0XT49MH0pKX12YXIgdmU9e25hbWU6XCJoaWRlXCIsZW5hYmxlZDohMCxwaGFzZTpcIm1haW5cIixyZXF1aXJlc0lmRXhpc3RzOltcInByZXZlbnRPdmVyZmxvd1wiXSxmbjpmdW5jdGlvbihlKXt2YXIgdD1lLnN0YXRlLG49ZS5uYW1lLHI9dC5yZWN0cy5yZWZlcmVuY2Usbz10LnJlY3RzLnBvcHBlcixpPXQubW9kaWZpZXJzRGF0YS5wcmV2ZW50T3ZlcmZsb3csYT1ZKHQse2VsZW1lbnRDb250ZXh0OlwicmVmZXJlbmNlXCJ9KSxzPVkodCx7YWx0Qm91bmRhcnk6ITB9KSxmPWhlKGEsciksYz1oZShzLG8saSkscD1tZShmKSx1PW1lKGMpO3QubW9kaWZpZXJzRGF0YVtuXT17cmVmZXJlbmNlQ2xpcHBpbmdPZmZzZXRzOmYscG9wcGVyRXNjYXBlT2Zmc2V0czpjLGlzUmVmZXJlbmNlSGlkZGVuOnAsaGFzUG9wcGVyRXNjYXBlZDp1fSx0LmF0dHJpYnV0ZXMucG9wcGVyPU9iamVjdC5hc3NpZ24oe30sdC5hdHRyaWJ1dGVzLnBvcHBlcix7XCJkYXRhLXBvcHBlci1yZWZlcmVuY2UtaGlkZGVuXCI6cCxcImRhdGEtcG9wcGVyLWVzY2FwZWRcIjp1fSl9fSxnZT1LKHtkZWZhdWx0TW9kaWZpZXJzOltaLCQsbmUscmVdfSkseWU9W1osJCxuZSxyZSxvZSxwZSxsZSxkZSx2ZV0sYmU9Syh7ZGVmYXVsdE1vZGlmaWVyczp5ZX0pO2UuYXBwbHlTdHlsZXM9cmUsZS5hcnJvdz1kZSxlLmNvbXB1dGVTdHlsZXM9bmUsZS5jcmVhdGVQb3BwZXI9YmUsZS5jcmVhdGVQb3BwZXJMaXRlPWdlLGUuZGVmYXVsdE1vZGlmaWVycz15ZSxlLmRldGVjdE92ZXJmbG93PVksZS5ldmVudExpc3RlbmVycz1aLGUuZmxpcD1wZSxlLmhpZGU9dmUsZS5vZmZzZXQ9b2UsZS5wb3BwZXJHZW5lcmF0b3I9SyxlLnBvcHBlck9mZnNldHM9JCxlLnByZXZlbnRPdmVyZmxvdz1sZSxPYmplY3QuZGVmaW5lUHJvcGVydHkoZSxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KX0pKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvcHBlci5taW4uanMubWFwXG4iXSwic291cmNlUm9vdCI6IiJ9
//# sourceURL=webpack-internal:///./node_modules/@popperjs/core/dist/umd/popper.min.js
`)}}));(function(n,e){for(var t in e)n[t]=e[t]})(window,function(n){var e={};function t(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return n[s].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=n,t.c=e,t.d=function(s,i,l){t.o(s,i)||Object.defineProperty(s,i,{enumerable:!0,get:l})},t.r=function(s){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},t.t=function(s,i){if(i&1&&(s=t(s)),i&8||i&4&&typeof s=="object"&&s&&s.__esModule)return s;var l=Object.create(null);if(t.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:s}),i&2&&typeof s!="string")for(var o in s)t.d(l,o,(function(r){return s[r]}).bind(null,o));return l},t.n=function(s){var i=s&&s.__esModule?function(){return s.default}:function(){return s};return t.d(i,"a",i),i},t.o=function(s,i){return Object.prototype.hasOwnProperty.call(s,i)},t.p="",t(t.s="./libs/perfect-scrollbar/perfect-scrollbar.js")}({"./libs/perfect-scrollbar/perfect-scrollbar.js":function(module,__webpack_exports__,__webpack_require__){eval(`__webpack_require__.r(__webpack_exports__);
/* harmony import */ var perfect_scrollbar_dist_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! perfect-scrollbar/dist/perfect-scrollbar */ "./node_modules/perfect-scrollbar/dist/perfect-scrollbar.js");
/* harmony import */ var perfect_scrollbar_dist_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(perfect_scrollbar_dist_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "PerfectScrollbar", function() { return perfect_scrollbar_dist_perfect_scrollbar__WEBPACK_IMPORTED_MODULE_0___default.a; });

//# sourceURL=[module]
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWJzL3BlcmZlY3Qtc2Nyb2xsYmFyL3BlcmZlY3Qtc2Nyb2xsYmFyLmpzP2IyYzMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSIsImZpbGUiOiIuL2xpYnMvcGVyZmVjdC1zY3JvbGxiYXIvcGVyZmVjdC1zY3JvbGxiYXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGVyZmVjdFNjcm9sbGJhciBmcm9tICdwZXJmZWN0LXNjcm9sbGJhci9kaXN0L3BlcmZlY3Qtc2Nyb2xsYmFyJztcblxuZXhwb3J0IHsgUGVyZmVjdFNjcm9sbGJhciB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=webpack-internal:///./libs/perfect-scrollbar/perfect-scrollbar.js
`)},"./node_modules/perfect-scrollbar/dist/perfect-scrollbar.js":function(module,exports,__webpack_require__){eval(`/*!
 * perfect-scrollbar v1.5.3
 * Copyright 2021 Hyunje Jun, MDBootstrap and Contributors
 * Licensed under MIT
 */

(function (global, factory) {
   true ? module.exports = factory() :
  undefined;
}(this, (function () { 'use strict';

  function get(element) {
    return getComputedStyle(element);
  }

  function set(element, obj) {
    for (var key in obj) {
      var val = obj[key];
      if (typeof val === 'number') {
        val = val + "px";
      }
      element.style[key] = val;
    }
    return element;
  }

  function div(className) {
    var div = document.createElement('div');
    div.className = className;
    return div;
  }

  var elMatches =
    typeof Element !== 'undefined' &&
    (Element.prototype.matches ||
      Element.prototype.webkitMatchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector);

  function matches(element, query) {
    if (!elMatches) {
      throw new Error('No element matching method supported');
    }

    return elMatches.call(element, query);
  }

  function remove(element) {
    if (element.remove) {
      element.remove();
    } else {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }

  function queryChildren(element, selector) {
    return Array.prototype.filter.call(element.children, function (child) { return matches(child, selector); }
    );
  }

  var cls = {
    main: 'ps',
    rtl: 'ps__rtl',
    element: {
      thumb: function (x) { return ("ps__thumb-" + x); },
      rail: function (x) { return ("ps__rail-" + x); },
      consuming: 'ps__child--consume',
    },
    state: {
      focus: 'ps--focus',
      clicking: 'ps--clicking',
      active: function (x) { return ("ps--active-" + x); },
      scrolling: function (x) { return ("ps--scrolling-" + x); },
    },
  };

  /*
   * Helper methods
   */
  var scrollingClassTimeout = { x: null, y: null };

  function addScrollingClass(i, x) {
    var classList = i.element.classList;
    var className = cls.state.scrolling(x);

    if (classList.contains(className)) {
      clearTimeout(scrollingClassTimeout[x]);
    } else {
      classList.add(className);
    }
  }

  function removeScrollingClass(i, x) {
    scrollingClassTimeout[x] = setTimeout(
      function () { return i.isAlive && i.element.classList.remove(cls.state.scrolling(x)); },
      i.settings.scrollingThreshold
    );
  }

  function setScrollingClassInstantly(i, x) {
    addScrollingClass(i, x);
    removeScrollingClass(i, x);
  }

  var EventElement = function EventElement(element) {
    this.element = element;
    this.handlers = {};
  };

  var prototypeAccessors = { isEmpty: { configurable: true } };

  EventElement.prototype.bind = function bind (eventName, handler) {
    if (typeof this.handlers[eventName] === 'undefined') {
      this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handler);
    this.element.addEventListener(eventName, handler, false);
  };

  EventElement.prototype.unbind = function unbind (eventName, target) {
      var this$1 = this;

    this.handlers[eventName] = this.handlers[eventName].filter(function (handler) {
      if (target && handler !== target) {
        return true;
      }
      this$1.element.removeEventListener(eventName, handler, false);
      return false;
    });
  };

  EventElement.prototype.unbindAll = function unbindAll () {
    for (var name in this.handlers) {
      this.unbind(name);
    }
  };

  prototypeAccessors.isEmpty.get = function () {
      var this$1 = this;

    return Object.keys(this.handlers).every(
      function (key) { return this$1.handlers[key].length === 0; }
    );
  };

  Object.defineProperties( EventElement.prototype, prototypeAccessors );

  var EventManager = function EventManager() {
    this.eventElements = [];
  };

  EventManager.prototype.eventElement = function eventElement (element) {
    var ee = this.eventElements.filter(function (ee) { return ee.element === element; })[0];
    if (!ee) {
      ee = new EventElement(element);
      this.eventElements.push(ee);
    }
    return ee;
  };

  EventManager.prototype.bind = function bind (element, eventName, handler) {
    this.eventElement(element).bind(eventName, handler);
  };

  EventManager.prototype.unbind = function unbind (element, eventName, handler) {
    var ee = this.eventElement(element);
    ee.unbind(eventName, handler);

    if (ee.isEmpty) {
      // remove
      this.eventElements.splice(this.eventElements.indexOf(ee), 1);
    }
  };

  EventManager.prototype.unbindAll = function unbindAll () {
    this.eventElements.forEach(function (e) { return e.unbindAll(); });
    this.eventElements = [];
  };

  EventManager.prototype.once = function once (element, eventName, handler) {
    var ee = this.eventElement(element);
    var onceHandler = function (evt) {
      ee.unbind(eventName, onceHandler);
      handler(evt);
    };
    ee.bind(eventName, onceHandler);
  };

  function createEvent(name) {
    if (typeof window.CustomEvent === 'function') {
      return new CustomEvent(name);
    } else {
      var evt = document.createEvent('CustomEvent');
      evt.initCustomEvent(name, false, false, undefined);
      return evt;
    }
  }

  function processScrollDiff(
    i,
    axis,
    diff,
    useScrollingClass,
    forceFireReachEvent
  ) {
    if ( useScrollingClass === void 0 ) useScrollingClass = true;
    if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

    var fields;
    if (axis === 'top') {
      fields = [
        'contentHeight',
        'containerHeight',
        'scrollTop',
        'y',
        'up',
        'down' ];
    } else if (axis === 'left') {
      fields = [
        'contentWidth',
        'containerWidth',
        'scrollLeft',
        'x',
        'left',
        'right' ];
    } else {
      throw new Error('A proper axis should be provided');
    }

    processScrollDiff$1(i, diff, fields, useScrollingClass, forceFireReachEvent);
  }

  function processScrollDiff$1(
    i,
    diff,
    ref,
    useScrollingClass,
    forceFireReachEvent
  ) {
    var contentHeight = ref[0];
    var containerHeight = ref[1];
    var scrollTop = ref[2];
    var y = ref[3];
    var up = ref[4];
    var down = ref[5];
    if ( useScrollingClass === void 0 ) useScrollingClass = true;
    if ( forceFireReachEvent === void 0 ) forceFireReachEvent = false;

    var element = i.element;

    // reset reach
    i.reach[y] = null;

    // 1 for subpixel rounding
    if (element[scrollTop] < 1) {
      i.reach[y] = 'start';
    }

    // 1 for subpixel rounding
    if (element[scrollTop] > i[contentHeight] - i[containerHeight] - 1) {
      i.reach[y] = 'end';
    }

    if (diff) {
      element.dispatchEvent(createEvent(("ps-scroll-" + y)));

      if (diff < 0) {
        element.dispatchEvent(createEvent(("ps-scroll-" + up)));
      } else if (diff > 0) {
        element.dispatchEvent(createEvent(("ps-scroll-" + down)));
      }

      if (useScrollingClass) {
        setScrollingClassInstantly(i, y);
      }
    }

    if (i.reach[y] && (diff || forceFireReachEvent)) {
      element.dispatchEvent(createEvent(("ps-" + y + "-reach-" + (i.reach[y]))));
    }
  }

  function toInt(x) {
    return parseInt(x, 10) || 0;
  }

  function isEditable(el) {
    return (
      matches(el, 'input,[contenteditable]') ||
      matches(el, 'select,[contenteditable]') ||
      matches(el, 'textarea,[contenteditable]') ||
      matches(el, 'button,[contenteditable]')
    );
  }

  function outerWidth(element) {
    var styles = get(element);
    return (
      toInt(styles.width) +
      toInt(styles.paddingLeft) +
      toInt(styles.paddingRight) +
      toInt(styles.borderLeftWidth) +
      toInt(styles.borderRightWidth)
    );
  }

  var env = {
    isWebKit:
      typeof document !== 'undefined' &&
      'WebkitAppearance' in document.documentElement.style,
    supportsTouch:
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        ('maxTouchPoints' in window.navigator &&
          window.navigator.maxTouchPoints > 0) ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
    supportsIePointer:
      typeof navigator !== 'undefined' && navigator.msMaxTouchPoints,
    isChrome:
      typeof navigator !== 'undefined' &&
      /Chrome/i.test(navigator && navigator.userAgent),
  };

  function updateGeometry(i) {
    var element = i.element;
    var roundedScrollTop = Math.floor(element.scrollTop);
    var rect = element.getBoundingClientRect();

    i.containerWidth = Math.round(rect.width);
    i.containerHeight = Math.round(rect.height);

    i.contentWidth = element.scrollWidth;
    i.contentHeight = element.scrollHeight;

    if (!element.contains(i.scrollbarXRail)) {
      // clean up and append
      queryChildren(element, cls.element.rail('x')).forEach(function (el) { return remove(el); }
      );
      element.appendChild(i.scrollbarXRail);
    }
    if (!element.contains(i.scrollbarYRail)) {
      // clean up and append
      queryChildren(element, cls.element.rail('y')).forEach(function (el) { return remove(el); }
      );
      element.appendChild(i.scrollbarYRail);
    }

    if (
      !i.settings.suppressScrollX &&
      i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth
    ) {
      i.scrollbarXActive = true;
      i.railXWidth = i.containerWidth - i.railXMarginWidth;
      i.railXRatio = i.containerWidth / i.railXWidth;
      i.scrollbarXWidth = getThumbSize(
        i,
        toInt((i.railXWidth * i.containerWidth) / i.contentWidth)
      );
      i.scrollbarXLeft = toInt(
        ((i.negativeScrollAdjustment + element.scrollLeft) *
          (i.railXWidth - i.scrollbarXWidth)) /
          (i.contentWidth - i.containerWidth)
      );
    } else {
      i.scrollbarXActive = false;
    }

    if (
      !i.settings.suppressScrollY &&
      i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight
    ) {
      i.scrollbarYActive = true;
      i.railYHeight = i.containerHeight - i.railYMarginHeight;
      i.railYRatio = i.containerHeight / i.railYHeight;
      i.scrollbarYHeight = getThumbSize(
        i,
        toInt((i.railYHeight * i.containerHeight) / i.contentHeight)
      );
      i.scrollbarYTop = toInt(
        (roundedScrollTop * (i.railYHeight - i.scrollbarYHeight)) /
          (i.contentHeight - i.containerHeight)
      );
    } else {
      i.scrollbarYActive = false;
    }

    if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
      i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
    }
    if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
      i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
    }

    updateCss(element, i);

    if (i.scrollbarXActive) {
      element.classList.add(cls.state.active('x'));
    } else {
      element.classList.remove(cls.state.active('x'));
      i.scrollbarXWidth = 0;
      i.scrollbarXLeft = 0;
      element.scrollLeft = i.isRtl === true ? i.contentWidth : 0;
    }
    if (i.scrollbarYActive) {
      element.classList.add(cls.state.active('y'));
    } else {
      element.classList.remove(cls.state.active('y'));
      i.scrollbarYHeight = 0;
      i.scrollbarYTop = 0;
      element.scrollTop = 0;
    }
  }

  function getThumbSize(i, thumbSize) {
    if (i.settings.minScrollbarLength) {
      thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
    }
    if (i.settings.maxScrollbarLength) {
      thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
    }
    return thumbSize;
  }

  function updateCss(element, i) {
    var xRailOffset = { width: i.railXWidth };
    var roundedScrollTop = Math.floor(element.scrollTop);

    if (i.isRtl) {
      xRailOffset.left =
        i.negativeScrollAdjustment +
        element.scrollLeft +
        i.containerWidth -
        i.contentWidth;
    } else {
      xRailOffset.left = element.scrollLeft;
    }
    if (i.isScrollbarXUsingBottom) {
      xRailOffset.bottom = i.scrollbarXBottom - roundedScrollTop;
    } else {
      xRailOffset.top = i.scrollbarXTop + roundedScrollTop;
    }
    set(i.scrollbarXRail, xRailOffset);

    var yRailOffset = { top: roundedScrollTop, height: i.railYHeight };
    if (i.isScrollbarYUsingRight) {
      if (i.isRtl) {
        yRailOffset.right =
          i.contentWidth -
          (i.negativeScrollAdjustment + element.scrollLeft) -
          i.scrollbarYRight -
          i.scrollbarYOuterWidth -
          9;
      } else {
        yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
      }
    } else {
      if (i.isRtl) {
        yRailOffset.left =
          i.negativeScrollAdjustment +
          element.scrollLeft +
          i.containerWidth * 2 -
          i.contentWidth -
          i.scrollbarYLeft -
          i.scrollbarYOuterWidth;
      } else {
        yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
      }
    }
    set(i.scrollbarYRail, yRailOffset);

    set(i.scrollbarX, {
      left: i.scrollbarXLeft,
      width: i.scrollbarXWidth - i.railBorderXWidth,
    });
    set(i.scrollbarY, {
      top: i.scrollbarYTop,
      height: i.scrollbarYHeight - i.railBorderYWidth,
    });
  }

  function clickRail(i) {
    var element = i.element;

    i.event.bind(i.scrollbarY, 'mousedown', function (e) { return e.stopPropagation(); });
    i.event.bind(i.scrollbarYRail, 'mousedown', function (e) {
      var positionTop =
        e.pageY -
        window.pageYOffset -
        i.scrollbarYRail.getBoundingClientRect().top;
      var direction = positionTop > i.scrollbarYTop ? 1 : -1;

      i.element.scrollTop += direction * i.containerHeight;
      updateGeometry(i);

      e.stopPropagation();
    });

    i.event.bind(i.scrollbarX, 'mousedown', function (e) { return e.stopPropagation(); });
    i.event.bind(i.scrollbarXRail, 'mousedown', function (e) {
      var positionLeft =
        e.pageX -
        window.pageXOffset -
        i.scrollbarXRail.getBoundingClientRect().left;
      var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

      i.element.scrollLeft += direction * i.containerWidth;
      updateGeometry(i);

      e.stopPropagation();
    });
  }

  function dragThumb(i) {
    bindMouseScrollHandler(i, [
      'containerWidth',
      'contentWidth',
      'pageX',
      'railXWidth',
      'scrollbarX',
      'scrollbarXWidth',
      'scrollLeft',
      'x',
      'scrollbarXRail' ]);
    bindMouseScrollHandler(i, [
      'containerHeight',
      'contentHeight',
      'pageY',
      'railYHeight',
      'scrollbarY',
      'scrollbarYHeight',
      'scrollTop',
      'y',
      'scrollbarYRail' ]);
  }

  function bindMouseScrollHandler(
    i,
    ref
  ) {
    var containerHeight = ref[0];
    var contentHeight = ref[1];
    var pageY = ref[2];
    var railYHeight = ref[3];
    var scrollbarY = ref[4];
    var scrollbarYHeight = ref[5];
    var scrollTop = ref[6];
    var y = ref[7];
    var scrollbarYRail = ref[8];

    var element = i.element;

    var startingScrollTop = null;
    var startingMousePageY = null;
    var scrollBy = null;

    function mouseMoveHandler(e) {
      if (e.touches && e.touches[0]) {
        e[pageY] = e.touches[0].pageY;
      }
      element[scrollTop] =
        startingScrollTop + scrollBy * (e[pageY] - startingMousePageY);
      addScrollingClass(i, y);
      updateGeometry(i);

      e.stopPropagation();
      if (e.type.startsWith('touch') && e.changedTouches.length > 1) {
        e.preventDefault();
      }
    }

    function mouseUpHandler() {
      removeScrollingClass(i, y);
      i[scrollbarYRail].classList.remove(cls.state.clicking);
      i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    }

    function bindMoves(e, touchMode) {
      startingScrollTop = element[scrollTop];
      if (touchMode && e.touches) {
        e[pageY] = e.touches[0].pageY;
      }
      startingMousePageY = e[pageY];
      scrollBy =
        (i[contentHeight] - i[containerHeight]) /
        (i[railYHeight] - i[scrollbarYHeight]);
      if (!touchMode) {
        i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
        i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);
        e.preventDefault();
      } else {
        i.event.bind(i.ownerDocument, 'touchmove', mouseMoveHandler);
      }

      i[scrollbarYRail].classList.add(cls.state.clicking);

      e.stopPropagation();
    }

    i.event.bind(i[scrollbarY], 'mousedown', function (e) {
      bindMoves(e);
    });
    i.event.bind(i[scrollbarY], 'touchstart', function (e) {
      bindMoves(e, true);
    });
  }

  function keyboard(i) {
    var element = i.element;

    var elementHovered = function () { return matches(element, ':hover'); };
    var scrollbarFocused = function () { return matches(i.scrollbarX, ':focus') || matches(i.scrollbarY, ':focus'); };

    function shouldPreventDefault(deltaX, deltaY) {
      var scrollTop = Math.floor(element.scrollTop);
      if (deltaX === 0) {
        if (!i.scrollbarYActive) {
          return false;
        }
        if (
          (scrollTop === 0 && deltaY > 0) ||
          (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)
        ) {
          return !i.settings.wheelPropagation;
        }
      }

      var scrollLeft = element.scrollLeft;
      if (deltaY === 0) {
        if (!i.scrollbarXActive) {
          return false;
        }
        if (
          (scrollLeft === 0 && deltaX < 0) ||
          (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)
        ) {
          return !i.settings.wheelPropagation;
        }
      }
      return true;
    }

    i.event.bind(i.ownerDocument, 'keydown', function (e) {
      if (
        (e.isDefaultPrevented && e.isDefaultPrevented()) ||
        e.defaultPrevented
      ) {
        return;
      }

      if (!elementHovered() && !scrollbarFocused()) {
        return;
      }

      var activeElement = document.activeElement
        ? document.activeElement
        : i.ownerDocument.activeElement;
      if (activeElement) {
        if (activeElement.tagName === 'IFRAME') {
          activeElement = activeElement.contentDocument.activeElement;
        } else {
          // go deeper if element is a webcomponent
          while (activeElement.shadowRoot) {
            activeElement = activeElement.shadowRoot.activeElement;
          }
        }
        if (isEditable(activeElement)) {
          return;
        }
      }

      var deltaX = 0;
      var deltaY = 0;

      switch (e.which) {
        case 37: // left
          if (e.metaKey) {
            deltaX = -i.contentWidth;
          } else if (e.altKey) {
            deltaX = -i.containerWidth;
          } else {
            deltaX = -30;
          }
          break;
        case 38: // up
          if (e.metaKey) {
            deltaY = i.contentHeight;
          } else if (e.altKey) {
            deltaY = i.containerHeight;
          } else {
            deltaY = 30;
          }
          break;
        case 39: // right
          if (e.metaKey) {
            deltaX = i.contentWidth;
          } else if (e.altKey) {
            deltaX = i.containerWidth;
          } else {
            deltaX = 30;
          }
          break;
        case 40: // down
          if (e.metaKey) {
            deltaY = -i.contentHeight;
          } else if (e.altKey) {
            deltaY = -i.containerHeight;
          } else {
            deltaY = -30;
          }
          break;
        case 32: // space bar
          if (e.shiftKey) {
            deltaY = i.containerHeight;
          } else {
            deltaY = -i.containerHeight;
          }
          break;
        case 33: // page up
          deltaY = i.containerHeight;
          break;
        case 34: // page down
          deltaY = -i.containerHeight;
          break;
        case 36: // home
          deltaY = i.contentHeight;
          break;
        case 35: // end
          deltaY = -i.contentHeight;
          break;
        default:
          return;
      }

      if (i.settings.suppressScrollX && deltaX !== 0) {
        return;
      }
      if (i.settings.suppressScrollY && deltaY !== 0) {
        return;
      }

      element.scrollTop -= deltaY;
      element.scrollLeft += deltaX;
      updateGeometry(i);

      if (shouldPreventDefault(deltaX, deltaY)) {
        e.preventDefault();
      }
    });
  }

  function wheel(i) {
    var element = i.element;

    function shouldPreventDefault(deltaX, deltaY) {
      var roundedScrollTop = Math.floor(element.scrollTop);
      var isTop = element.scrollTop === 0;
      var isBottom =
        roundedScrollTop + element.offsetHeight === element.scrollHeight;
      var isLeft = element.scrollLeft === 0;
      var isRight =
        element.scrollLeft + element.offsetWidth === element.scrollWidth;

      var hitsBound;

      // pick axis with primary direction
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        hitsBound = isTop || isBottom;
      } else {
        hitsBound = isLeft || isRight;
      }

      return hitsBound ? !i.settings.wheelPropagation : true;
    }

    function getDeltaFromEvent(e) {
      var deltaX = e.deltaX;
      var deltaY = -1 * e.deltaY;

      if (typeof deltaX === 'undefined' || typeof deltaY === 'undefined') {
        // OS X Safari
        deltaX = (-1 * e.wheelDeltaX) / 6;
        deltaY = e.wheelDeltaY / 6;
      }

      if (e.deltaMode && e.deltaMode === 1) {
        // Firefox in deltaMode 1: Line scrolling
        deltaX *= 10;
        deltaY *= 10;
      }

      if (deltaX !== deltaX && deltaY !== deltaY /* NaN checks */) {
        // IE in some mouse drivers
        deltaX = 0;
        deltaY = e.wheelDelta;
      }

      if (e.shiftKey) {
        // reverse axis with shift key
        return [-deltaY, -deltaX];
      }
      return [deltaX, deltaY];
    }

    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      // FIXME: this is a workaround for <select> issue in FF and IE #571
      if (!env.isWebKit && element.querySelector('select:focus')) {
        return true;
      }

      if (!element.contains(target)) {
        return false;
      }

      var cursor = target;

      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }

        var style = get(cursor);

        // if deltaY && vertical scrollable
        if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
          var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (
              (cursor.scrollTop > 0 && deltaY < 0) ||
              (cursor.scrollTop < maxScrollTop && deltaY > 0)
            ) {
              return true;
            }
          }
        }
        // if deltaX && horizontal scrollable
        if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
          var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (
              (cursor.scrollLeft > 0 && deltaX < 0) ||
              (cursor.scrollLeft < maxScrollLeft && deltaX > 0)
            ) {
              return true;
            }
          }
        }

        cursor = cursor.parentNode;
      }

      return false;
    }

    function mousewheelHandler(e) {
      var ref = getDeltaFromEvent(e);
      var deltaX = ref[0];
      var deltaY = ref[1];

      if (shouldBeConsumedByChild(e.target, deltaX, deltaY)) {
        return;
      }

      var shouldPrevent = false;
      if (!i.settings.useBothWheelAxes) {
        // deltaX will only be used for horizontal scrolling and deltaY will
        // only be used for vertical scrolling - this is the default
        element.scrollTop -= deltaY * i.settings.wheelSpeed;
        element.scrollLeft += deltaX * i.settings.wheelSpeed;
      } else if (i.scrollbarYActive && !i.scrollbarXActive) {
        // only vertical scrollbar is active and useBothWheelAxes option is
        // active, so let's scroll vertical bar using both mouse wheel axes
        if (deltaY) {
          element.scrollTop -= deltaY * i.settings.wheelSpeed;
        } else {
          element.scrollTop += deltaX * i.settings.wheelSpeed;
        }
        shouldPrevent = true;
      } else if (i.scrollbarXActive && !i.scrollbarYActive) {
        // useBothWheelAxes and only horizontal bar is active, so use both
        // wheel axes for horizontal bar
        if (deltaX) {
          element.scrollLeft += deltaX * i.settings.wheelSpeed;
        } else {
          element.scrollLeft -= deltaY * i.settings.wheelSpeed;
        }
        shouldPrevent = true;
      }

      updateGeometry(i);

      shouldPrevent = shouldPrevent || shouldPreventDefault(deltaX, deltaY);
      if (shouldPrevent && !e.ctrlKey) {
        e.stopPropagation();
        e.preventDefault();
      }
    }

    if (typeof window.onwheel !== 'undefined') {
      i.event.bind(element, 'wheel', mousewheelHandler);
    } else if (typeof window.onmousewheel !== 'undefined') {
      i.event.bind(element, 'mousewheel', mousewheelHandler);
    }
  }

  function touch(i) {
    if (!env.supportsTouch && !env.supportsIePointer) {
      return;
    }

    var element = i.element;

    function shouldPrevent(deltaX, deltaY) {
      var scrollTop = Math.floor(element.scrollTop);
      var scrollLeft = element.scrollLeft;
      var magnitudeX = Math.abs(deltaX);
      var magnitudeY = Math.abs(deltaY);

      if (magnitudeY > magnitudeX) {
        // user is perhaps trying to swipe up/down the page

        if (
          (deltaY < 0 && scrollTop === i.contentHeight - i.containerHeight) ||
          (deltaY > 0 && scrollTop === 0)
        ) {
          // set prevent for mobile Chrome refresh
          return window.scrollY === 0 && deltaY > 0 && env.isChrome;
        }
      } else if (magnitudeX > magnitudeY) {
        // user is perhaps trying to swipe left/right across the page

        if (
          (deltaX < 0 && scrollLeft === i.contentWidth - i.containerWidth) ||
          (deltaX > 0 && scrollLeft === 0)
        ) {
          return true;
        }
      }

      return true;
    }

    function applyTouchMove(differenceX, differenceY) {
      element.scrollTop -= differenceY;
      element.scrollLeft -= differenceX;

      updateGeometry(i);
    }

    var startOffset = {};
    var startTime = 0;
    var speed = {};
    var easingLoop = null;

    function getTouch(e) {
      if (e.targetTouches) {
        return e.targetTouches[0];
      } else {
        // Maybe IE pointer
        return e;
      }
    }

    function shouldHandle(e) {
      if (e.pointerType && e.pointerType === 'pen' && e.buttons === 0) {
        return false;
      }
      if (e.targetTouches && e.targetTouches.length === 1) {
        return true;
      }
      if (
        e.pointerType &&
        e.pointerType !== 'mouse' &&
        e.pointerType !== e.MSPOINTER_TYPE_MOUSE
      ) {
        return true;
      }
      return false;
    }

    function touchStart(e) {
      if (!shouldHandle(e)) {
        return;
      }

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = new Date().getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }
    }

    function shouldBeConsumedByChild(target, deltaX, deltaY) {
      if (!element.contains(target)) {
        return false;
      }

      var cursor = target;

      while (cursor && cursor !== element) {
        if (cursor.classList.contains(cls.element.consuming)) {
          return true;
        }

        var style = get(cursor);

        // if deltaY && vertical scrollable
        if (deltaY && style.overflowY.match(/(scroll|auto)/)) {
          var maxScrollTop = cursor.scrollHeight - cursor.clientHeight;
          if (maxScrollTop > 0) {
            if (
              (cursor.scrollTop > 0 && deltaY < 0) ||
              (cursor.scrollTop < maxScrollTop && deltaY > 0)
            ) {
              return true;
            }
          }
        }
        // if deltaX && horizontal scrollable
        if (deltaX && style.overflowX.match(/(scroll|auto)/)) {
          var maxScrollLeft = cursor.scrollWidth - cursor.clientWidth;
          if (maxScrollLeft > 0) {
            if (
              (cursor.scrollLeft > 0 && deltaX < 0) ||
              (cursor.scrollLeft < maxScrollLeft && deltaX > 0)
            ) {
              return true;
            }
          }
        }

        cursor = cursor.parentNode;
      }

      return false;
    }

    function touchMove(e) {
      if (shouldHandle(e)) {
        var touch = getTouch(e);

        var currentOffset = { pageX: touch.pageX, pageY: touch.pageY };

        var differenceX = currentOffset.pageX - startOffset.pageX;
        var differenceY = currentOffset.pageY - startOffset.pageY;

        if (shouldBeConsumedByChild(e.target, differenceX, differenceY)) {
          return;
        }

        applyTouchMove(differenceX, differenceY);
        startOffset = currentOffset;

        var currentTime = new Date().getTime();

        var timeGap = currentTime - startTime;
        if (timeGap > 0) {
          speed.x = differenceX / timeGap;
          speed.y = differenceY / timeGap;
          startTime = currentTime;
        }

        if (shouldPrevent(differenceX, differenceY)) {
          e.preventDefault();
        }
      }
    }
    function touchEnd() {
      if (i.settings.swipeEasing) {
        clearInterval(easingLoop);
        easingLoop = setInterval(function() {
          if (i.isInitialized) {
            clearInterval(easingLoop);
            return;
          }

          if (!speed.x && !speed.y) {
            clearInterval(easingLoop);
            return;
          }

          if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
            clearInterval(easingLoop);
            return;
          }

          if (!i.element) {
            clearInterval(easingLoop);
            return;
          }

          applyTouchMove(speed.x * 30, speed.y * 30);

          speed.x *= 0.8;
          speed.y *= 0.8;
        }, 10);
      }
    }

    if (env.supportsTouch) {
      i.event.bind(element, 'touchstart', touchStart);
      i.event.bind(element, 'touchmove', touchMove);
      i.event.bind(element, 'touchend', touchEnd);
    } else if (env.supportsIePointer) {
      if (window.PointerEvent) {
        i.event.bind(element, 'pointerdown', touchStart);
        i.event.bind(element, 'pointermove', touchMove);
        i.event.bind(element, 'pointerup', touchEnd);
      } else if (window.MSPointerEvent) {
        i.event.bind(element, 'MSPointerDown', touchStart);
        i.event.bind(element, 'MSPointerMove', touchMove);
        i.event.bind(element, 'MSPointerUp', touchEnd);
      }
    }
  }

  var defaultSettings = function () { return ({
    handlers: ['click-rail', 'drag-thumb', 'keyboard', 'wheel', 'touch'],
    maxScrollbarLength: null,
    minScrollbarLength: null,
    scrollingThreshold: 1000,
    scrollXMarginOffset: 0,
    scrollYMarginOffset: 0,
    suppressScrollX: false,
    suppressScrollY: false,
    swipeEasing: true,
    useBothWheelAxes: false,
    wheelPropagation: true,
    wheelSpeed: 1,
  }); };

  var handlers = {
    'click-rail': clickRail,
    'drag-thumb': dragThumb,
    keyboard: keyboard,
    wheel: wheel,
    touch: touch,
  };

  var PerfectScrollbar = function PerfectScrollbar(element, userSettings) {
    var this$1 = this;
    if ( userSettings === void 0 ) userSettings = {};

    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    if (!element || !element.nodeName) {
      throw new Error('no element is specified to initialize PerfectScrollbar');
    }

    this.element = element;

    element.classList.add(cls.main);

    this.settings = defaultSettings();
    for (var key in userSettings) {
      this.settings[key] = userSettings[key];
    }

    this.containerWidth = null;
    this.containerHeight = null;
    this.contentWidth = null;
    this.contentHeight = null;

    var focus = function () { return element.classList.add(cls.state.focus); };
    var blur = function () { return element.classList.remove(cls.state.focus); };

    this.isRtl = get(element).direction === 'rtl';
    if (this.isRtl === true) {
      element.classList.add(cls.rtl);
    }
    this.isNegativeScroll = (function () {
      var originalScrollLeft = element.scrollLeft;
      var result = null;
      element.scrollLeft = -1;
      result = element.scrollLeft < 0;
      element.scrollLeft = originalScrollLeft;
      return result;
    })();
    this.negativeScrollAdjustment = this.isNegativeScroll
      ? element.scrollWidth - element.clientWidth
      : 0;
    this.event = new EventManager();
    this.ownerDocument = element.ownerDocument || document;

    this.scrollbarXRail = div(cls.element.rail('x'));
    element.appendChild(this.scrollbarXRail);
    this.scrollbarX = div(cls.element.thumb('x'));
    this.scrollbarXRail.appendChild(this.scrollbarX);
    this.scrollbarX.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarX, 'focus', focus);
    this.event.bind(this.scrollbarX, 'blur', blur);
    this.scrollbarXActive = null;
    this.scrollbarXWidth = null;
    this.scrollbarXLeft = null;
    var railXStyle = get(this.scrollbarXRail);
    this.scrollbarXBottom = parseInt(railXStyle.bottom, 10);
    if (isNaN(this.scrollbarXBottom)) {
      this.isScrollbarXUsingBottom = false;
      this.scrollbarXTop = toInt(railXStyle.top);
    } else {
      this.isScrollbarXUsingBottom = true;
    }
    this.railBorderXWidth =
      toInt(railXStyle.borderLeftWidth) + toInt(railXStyle.borderRightWidth);
    // Set rail to display:block to calculate margins
    set(this.scrollbarXRail, { display: 'block' });
    this.railXMarginWidth =
      toInt(railXStyle.marginLeft) + toInt(railXStyle.marginRight);
    set(this.scrollbarXRail, { display: '' });
    this.railXWidth = null;
    this.railXRatio = null;

    this.scrollbarYRail = div(cls.element.rail('y'));
    element.appendChild(this.scrollbarYRail);
    this.scrollbarY = div(cls.element.thumb('y'));
    this.scrollbarYRail.appendChild(this.scrollbarY);
    this.scrollbarY.setAttribute('tabindex', 0);
    this.event.bind(this.scrollbarY, 'focus', focus);
    this.event.bind(this.scrollbarY, 'blur', blur);
    this.scrollbarYActive = null;
    this.scrollbarYHeight = null;
    this.scrollbarYTop = null;
    var railYStyle = get(this.scrollbarYRail);
    this.scrollbarYRight = parseInt(railYStyle.right, 10);
    if (isNaN(this.scrollbarYRight)) {
      this.isScrollbarYUsingRight = false;
      this.scrollbarYLeft = toInt(railYStyle.left);
    } else {
      this.isScrollbarYUsingRight = true;
    }
    this.scrollbarYOuterWidth = this.isRtl ? outerWidth(this.scrollbarY) : null;
    this.railBorderYWidth =
      toInt(railYStyle.borderTopWidth) + toInt(railYStyle.borderBottomWidth);
    set(this.scrollbarYRail, { display: 'block' });
    this.railYMarginHeight =
      toInt(railYStyle.marginTop) + toInt(railYStyle.marginBottom);
    set(this.scrollbarYRail, { display: '' });
    this.railYHeight = null;
    this.railYRatio = null;

    this.reach = {
      x:
        element.scrollLeft <= 0
          ? 'start'
          : element.scrollLeft >= this.contentWidth - this.containerWidth
          ? 'end'
          : null,
      y:
        element.scrollTop <= 0
          ? 'start'
          : element.scrollTop >= this.contentHeight - this.containerHeight
          ? 'end'
          : null,
    };

    this.isAlive = true;

    this.settings.handlers.forEach(function (handlerName) { return handlers[handlerName](this$1); });

    this.lastScrollTop = Math.floor(element.scrollTop); // for onScroll only
    this.lastScrollLeft = element.scrollLeft; // for onScroll only
    this.event.bind(this.element, 'scroll', function (e) { return this$1.onScroll(e); });
    updateGeometry(this);
  };

  PerfectScrollbar.prototype.update = function update () {
    if (!this.isAlive) {
      return;
    }

    // Recalcuate negative scrollLeft adjustment
    this.negativeScrollAdjustment = this.isNegativeScroll
      ? this.element.scrollWidth - this.element.clientWidth
      : 0;

    // Recalculate rail margins
    set(this.scrollbarXRail, { display: 'block' });
    set(this.scrollbarYRail, { display: 'block' });
    this.railXMarginWidth =
      toInt(get(this.scrollbarXRail).marginLeft) +
      toInt(get(this.scrollbarXRail).marginRight);
    this.railYMarginHeight =
      toInt(get(this.scrollbarYRail).marginTop) +
      toInt(get(this.scrollbarYRail).marginBottom);

    // Hide scrollbars not to affect scrollWidth and scrollHeight
    set(this.scrollbarXRail, { display: 'none' });
    set(this.scrollbarYRail, { display: 'none' });

    updateGeometry(this);

    processScrollDiff(this, 'top', 0, false, true);
    processScrollDiff(this, 'left', 0, false, true);

    set(this.scrollbarXRail, { display: '' });
    set(this.scrollbarYRail, { display: '' });
  };

  PerfectScrollbar.prototype.onScroll = function onScroll (e) {
    if (!this.isAlive) {
      return;
    }

    updateGeometry(this);
    processScrollDiff(this, 'top', this.element.scrollTop - this.lastScrollTop);
    processScrollDiff(
      this,
      'left',
      this.element.scrollLeft - this.lastScrollLeft
    );

    this.lastScrollTop = Math.floor(this.element.scrollTop);
    this.lastScrollLeft = this.element.scrollLeft;
  };

  PerfectScrollbar.prototype.destroy = function destroy () {
    if (!this.isAlive) {
      return;
    }

    this.event.unbindAll();
    remove(this.scrollbarX);
    remove(this.scrollbarY);
    remove(this.scrollbarXRail);
    remove(this.scrollbarYRail);
    this.removePsClasses();

    // unset elements
    this.element = null;
    this.scrollbarX = null;
    this.scrollbarY = null;
    this.scrollbarXRail = null;
    this.scrollbarYRail = null;

    this.isAlive = false;
  };

  PerfectScrollbar.prototype.removePsClasses = function removePsClasses () {
    this.element.className = this.element.className
      .split(' ')
      .filter(function (name) { return !name.match(/^ps([-_].+|)$/); })
      .join(' ');
  };

  return PerfectScrollbar;

})));
//# sourceMappingURL=perfect-scrollbar.js.map
//# sourceURL=[module]
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvZGlzdC9wZXJmZWN0LXNjcm9sbGJhci5qcz9lYjJjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLEtBQTREO0FBQzlELEVBQUUsU0FDOEQ7QUFDaEUsQ0FBQyxxQkFBcUI7O0FBRXRCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkVBQTJFLGlDQUFpQztBQUM1RztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDJCQUEyQixFQUFFO0FBQ3hELDBCQUEwQiwwQkFBMEIsRUFBRTtBQUN0RDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsNEJBQTRCLEVBQUU7QUFDMUQsK0JBQStCLCtCQUErQixFQUFFO0FBQ2hFLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLHdFQUF3RSxFQUFFO0FBQzdGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsV0FBVyxxQkFBcUI7O0FBRTVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQiwwQ0FBMEM7QUFDaEU7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzREFBc0QsK0JBQStCLEVBQUU7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxzQkFBc0IsRUFBRTtBQUNyRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyRUFBMkUsbUJBQW1CO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUsbUJBQW1CO0FBQzlGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUI7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBLDBEQUEwRCw0QkFBNEIsRUFBRTtBQUN4RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUwsMERBQTBELDRCQUE0QixFQUFFO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUEsc0NBQXNDLG1DQUFtQztBQUN6RSx3Q0FBd0MsMkVBQTJFOztBQUVuSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDZCQUE2Qjs7QUFFN0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRyxFQUFFOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCQUE2QiwrQ0FBK0M7QUFDNUUsNEJBQTRCLGtEQUFrRDs7QUFFOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG1CQUFtQjtBQUNqRDtBQUNBO0FBQ0EsOEJBQThCLGNBQWM7QUFDNUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixtQkFBbUI7QUFDakQ7QUFDQTtBQUNBLDhCQUE4QixjQUFjO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwyREFBMkQsc0NBQXNDLEVBQUU7O0FBRW5HLHVEQUF1RDtBQUN2RCw2Q0FBNkM7QUFDN0MsMERBQTBELDJCQUEyQixFQUFFO0FBQ3ZGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsbUJBQW1CO0FBQ2pELDhCQUE4QixtQkFBbUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLGtCQUFrQjtBQUNoRCw4QkFBOEIsa0JBQWtCOztBQUVoRDs7QUFFQTtBQUNBOztBQUVBLDhCQUE4QixjQUFjO0FBQzVDLDhCQUE4QixjQUFjO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLHFDQUFxQyxFQUFFO0FBQ3RFO0FBQ0E7O0FBRUE7O0FBRUEsQ0FBQztBQUNEIiwiZmlsZSI6Ii4vbm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL2Rpc3QvcGVyZmVjdC1zY3JvbGxiYXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIHBlcmZlY3Qtc2Nyb2xsYmFyIHYxLjUuM1xuICogQ29weXJpZ2h0IDIwMjEgSHl1bmplIEp1biwgTURCb290c3RyYXAgYW5kIENvbnRyaWJ1dG9yc1xuICogTGljZW5zZWQgdW5kZXIgTUlUXG4gKi9cblxuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCkgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoZmFjdG9yeSkgOlxuICAoZ2xvYmFsID0gZ2xvYmFsIHx8IHNlbGYsIGdsb2JhbC5QZXJmZWN0U2Nyb2xsYmFyID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIGdldChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXQoZWxlbWVudCwgb2JqKSB7XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHZhbCA9IHZhbCArIFwicHhcIjtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICBmdW5jdGlvbiBkaXYoY2xhc3NOYW1lKSB7XG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGRpdi5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG4gICAgcmV0dXJuIGRpdjtcbiAgfVxuXG4gIHZhciBlbE1hdGNoZXMgPVxuICAgIHR5cGVvZiBFbGVtZW50ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIChFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzIHx8XG4gICAgICBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IpO1xuXG4gIGZ1bmN0aW9uIG1hdGNoZXMoZWxlbWVudCwgcXVlcnkpIHtcbiAgICBpZiAoIWVsTWF0Y2hlcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBlbGVtZW50IG1hdGNoaW5nIG1ldGhvZCBzdXBwb3J0ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxNYXRjaGVzLmNhbGwoZWxlbWVudCwgcXVlcnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlKGVsZW1lbnQpIHtcbiAgICBpZiAoZWxlbWVudC5yZW1vdmUpIHtcbiAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgICAgZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHF1ZXJ5Q2hpbGRyZW4oZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGVsZW1lbnQuY2hpbGRyZW4sIGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gbWF0Y2hlcyhjaGlsZCwgc2VsZWN0b3IpOyB9XG4gICAgKTtcbiAgfVxuXG4gIHZhciBjbHMgPSB7XG4gICAgbWFpbjogJ3BzJyxcbiAgICBydGw6ICdwc19fcnRsJyxcbiAgICBlbGVtZW50OiB7XG4gICAgICB0aHVtYjogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIChcInBzX190aHVtYi1cIiArIHgpOyB9LFxuICAgICAgcmFpbDogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIChcInBzX19yYWlsLVwiICsgeCk7IH0sXG4gICAgICBjb25zdW1pbmc6ICdwc19fY2hpbGQtLWNvbnN1bWUnLFxuICAgIH0sXG4gICAgc3RhdGU6IHtcbiAgICAgIGZvY3VzOiAncHMtLWZvY3VzJyxcbiAgICAgIGNsaWNraW5nOiAncHMtLWNsaWNraW5nJyxcbiAgICAgIGFjdGl2ZTogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIChcInBzLS1hY3RpdmUtXCIgKyB4KTsgfSxcbiAgICAgIHNjcm9sbGluZzogZnVuY3Rpb24gKHgpIHsgcmV0dXJuIChcInBzLS1zY3JvbGxpbmctXCIgKyB4KTsgfSxcbiAgICB9LFxuICB9O1xuXG4gIC8qXG4gICAqIEhlbHBlciBtZXRob2RzXG4gICAqL1xuICB2YXIgc2Nyb2xsaW5nQ2xhc3NUaW1lb3V0ID0geyB4OiBudWxsLCB5OiBudWxsIH07XG5cbiAgZnVuY3Rpb24gYWRkU2Nyb2xsaW5nQ2xhc3MoaSwgeCkge1xuICAgIHZhciBjbGFzc0xpc3QgPSBpLmVsZW1lbnQuY2xhc3NMaXN0O1xuICAgIHZhciBjbGFzc05hbWUgPSBjbHMuc3RhdGUuc2Nyb2xsaW5nKHgpO1xuXG4gICAgaWYgKGNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2Nyb2xsaW5nQ2xhc3NUaW1lb3V0W3hdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVNjcm9sbGluZ0NsYXNzKGksIHgpIHtcbiAgICBzY3JvbGxpbmdDbGFzc1RpbWVvdXRbeF0gPSBzZXRUaW1lb3V0KFxuICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gaS5pc0FsaXZlICYmIGkuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNscy5zdGF0ZS5zY3JvbGxpbmcoeCkpOyB9LFxuICAgICAgaS5zZXR0aW5ncy5zY3JvbGxpbmdUaHJlc2hvbGRcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0U2Nyb2xsaW5nQ2xhc3NJbnN0YW50bHkoaSwgeCkge1xuICAgIGFkZFNjcm9sbGluZ0NsYXNzKGksIHgpO1xuICAgIHJlbW92ZVNjcm9sbGluZ0NsYXNzKGksIHgpO1xuICB9XG5cbiAgdmFyIEV2ZW50RWxlbWVudCA9IGZ1bmN0aW9uIEV2ZW50RWxlbWVudChlbGVtZW50KSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgICB0aGlzLmhhbmRsZXJzID0ge307XG4gIH07XG5cbiAgdmFyIHByb3RvdHlwZUFjY2Vzc29ycyA9IHsgaXNFbXB0eTogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG4gIEV2ZW50RWxlbWVudC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uIGJpbmQgKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIGlmICh0eXBlb2YgdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5oYW5kbGVyc1tldmVudE5hbWVdID0gW107XG4gICAgfVxuICAgIHRoaXMuaGFuZGxlcnNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgZmFsc2UpO1xuICB9O1xuXG4gIEV2ZW50RWxlbWVudC5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24gdW5iaW5kIChldmVudE5hbWUsIHRhcmdldCkge1xuICAgICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV0gPSB0aGlzLmhhbmRsZXJzW2V2ZW50TmFtZV0uZmlsdGVyKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICBpZiAodGFyZ2V0ICYmIGhhbmRsZXIgIT09IHRhcmdldCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMkMS5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH07XG5cbiAgRXZlbnRFbGVtZW50LnByb3RvdHlwZS51bmJpbmRBbGwgPSBmdW5jdGlvbiB1bmJpbmRBbGwgKCkge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5oYW5kbGVycykge1xuICAgICAgdGhpcy51bmJpbmQobmFtZSk7XG4gICAgfVxuICB9O1xuXG4gIHByb3RvdHlwZUFjY2Vzc29ycy5pc0VtcHR5LmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuaGFuZGxlcnMpLmV2ZXJ5KFxuICAgICAgZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gdGhpcyQxLmhhbmRsZXJzW2tleV0ubGVuZ3RoID09PSAwOyB9XG4gICAgKTtcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyggRXZlbnRFbGVtZW50LnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzICk7XG5cbiAgdmFyIEV2ZW50TWFuYWdlciA9IGZ1bmN0aW9uIEV2ZW50TWFuYWdlcigpIHtcbiAgICB0aGlzLmV2ZW50RWxlbWVudHMgPSBbXTtcbiAgfTtcblxuICBFdmVudE1hbmFnZXIucHJvdG90eXBlLmV2ZW50RWxlbWVudCA9IGZ1bmN0aW9uIGV2ZW50RWxlbWVudCAoZWxlbWVudCkge1xuICAgIHZhciBlZSA9IHRoaXMuZXZlbnRFbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGVlKSB7IHJldHVybiBlZS5lbGVtZW50ID09PSBlbGVtZW50OyB9KVswXTtcbiAgICBpZiAoIWVlKSB7XG4gICAgICBlZSA9IG5ldyBFdmVudEVsZW1lbnQoZWxlbWVudCk7XG4gICAgICB0aGlzLmV2ZW50RWxlbWVudHMucHVzaChlZSk7XG4gICAgfVxuICAgIHJldHVybiBlZTtcbiAgfTtcblxuICBFdmVudE1hbmFnZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiBiaW5kIChlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICB0aGlzLmV2ZW50RWxlbWVudChlbGVtZW50KS5iaW5kKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gIH07XG5cbiAgRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbiB1bmJpbmQgKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIHZhciBlZSA9IHRoaXMuZXZlbnRFbGVtZW50KGVsZW1lbnQpO1xuICAgIGVlLnVuYmluZChldmVudE5hbWUsIGhhbmRsZXIpO1xuXG4gICAgaWYgKGVlLmlzRW1wdHkpIHtcbiAgICAgIC8vIHJlbW92ZVxuICAgICAgdGhpcy5ldmVudEVsZW1lbnRzLnNwbGljZSh0aGlzLmV2ZW50RWxlbWVudHMuaW5kZXhPZihlZSksIDEpO1xuICAgIH1cbiAgfTtcblxuICBFdmVudE1hbmFnZXIucHJvdG90eXBlLnVuYmluZEFsbCA9IGZ1bmN0aW9uIHVuYmluZEFsbCAoKSB7XG4gICAgdGhpcy5ldmVudEVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudW5iaW5kQWxsKCk7IH0pO1xuICAgIHRoaXMuZXZlbnRFbGVtZW50cyA9IFtdO1xuICB9O1xuXG4gIEV2ZW50TWFuYWdlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UgKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgIHZhciBlZSA9IHRoaXMuZXZlbnRFbGVtZW50KGVsZW1lbnQpO1xuICAgIHZhciBvbmNlSGFuZGxlciA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIGVlLnVuYmluZChldmVudE5hbWUsIG9uY2VIYW5kbGVyKTtcbiAgICAgIGhhbmRsZXIoZXZ0KTtcbiAgICB9O1xuICAgIGVlLmJpbmQoZXZlbnROYW1lLCBvbmNlSGFuZGxlcik7XG4gIH07XG5cbiAgZnVuY3Rpb24gY3JlYXRlRXZlbnQobmFtZSkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbmV3IEN1c3RvbUV2ZW50KG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgICBldnQuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIGZhbHNlLCBmYWxzZSwgdW5kZWZpbmVkKTtcbiAgICAgIHJldHVybiBldnQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc1Njcm9sbERpZmYoXG4gICAgaSxcbiAgICBheGlzLFxuICAgIGRpZmYsXG4gICAgdXNlU2Nyb2xsaW5nQ2xhc3MsXG4gICAgZm9yY2VGaXJlUmVhY2hFdmVudFxuICApIHtcbiAgICBpZiAoIHVzZVNjcm9sbGluZ0NsYXNzID09PSB2b2lkIDAgKSB1c2VTY3JvbGxpbmdDbGFzcyA9IHRydWU7XG4gICAgaWYgKCBmb3JjZUZpcmVSZWFjaEV2ZW50ID09PSB2b2lkIDAgKSBmb3JjZUZpcmVSZWFjaEV2ZW50ID0gZmFsc2U7XG5cbiAgICB2YXIgZmllbGRzO1xuICAgIGlmIChheGlzID09PSAndG9wJykge1xuICAgICAgZmllbGRzID0gW1xuICAgICAgICAnY29udGVudEhlaWdodCcsXG4gICAgICAgICdjb250YWluZXJIZWlnaHQnLFxuICAgICAgICAnc2Nyb2xsVG9wJyxcbiAgICAgICAgJ3knLFxuICAgICAgICAndXAnLFxuICAgICAgICAnZG93bicgXTtcbiAgICB9IGVsc2UgaWYgKGF4aXMgPT09ICdsZWZ0Jykge1xuICAgICAgZmllbGRzID0gW1xuICAgICAgICAnY29udGVudFdpZHRoJyxcbiAgICAgICAgJ2NvbnRhaW5lcldpZHRoJyxcbiAgICAgICAgJ3Njcm9sbExlZnQnLFxuICAgICAgICAneCcsXG4gICAgICAgICdsZWZ0JyxcbiAgICAgICAgJ3JpZ2h0JyBdO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgcHJvcGVyIGF4aXMgc2hvdWxkIGJlIHByb3ZpZGVkJyk7XG4gICAgfVxuXG4gICAgcHJvY2Vzc1Njcm9sbERpZmYkMShpLCBkaWZmLCBmaWVsZHMsIHVzZVNjcm9sbGluZ0NsYXNzLCBmb3JjZUZpcmVSZWFjaEV2ZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NTY3JvbGxEaWZmJDEoXG4gICAgaSxcbiAgICBkaWZmLFxuICAgIHJlZixcbiAgICB1c2VTY3JvbGxpbmdDbGFzcyxcbiAgICBmb3JjZUZpcmVSZWFjaEV2ZW50XG4gICkge1xuICAgIHZhciBjb250ZW50SGVpZ2h0ID0gcmVmWzBdO1xuICAgIHZhciBjb250YWluZXJIZWlnaHQgPSByZWZbMV07XG4gICAgdmFyIHNjcm9sbFRvcCA9IHJlZlsyXTtcbiAgICB2YXIgeSA9IHJlZlszXTtcbiAgICB2YXIgdXAgPSByZWZbNF07XG4gICAgdmFyIGRvd24gPSByZWZbNV07XG4gICAgaWYgKCB1c2VTY3JvbGxpbmdDbGFzcyA9PT0gdm9pZCAwICkgdXNlU2Nyb2xsaW5nQ2xhc3MgPSB0cnVlO1xuICAgIGlmICggZm9yY2VGaXJlUmVhY2hFdmVudCA9PT0gdm9pZCAwICkgZm9yY2VGaXJlUmVhY2hFdmVudCA9IGZhbHNlO1xuXG4gICAgdmFyIGVsZW1lbnQgPSBpLmVsZW1lbnQ7XG5cbiAgICAvLyByZXNldCByZWFjaFxuICAgIGkucmVhY2hbeV0gPSBudWxsO1xuXG4gICAgLy8gMSBmb3Igc3VicGl4ZWwgcm91bmRpbmdcbiAgICBpZiAoZWxlbWVudFtzY3JvbGxUb3BdIDwgMSkge1xuICAgICAgaS5yZWFjaFt5XSA9ICdzdGFydCc7XG4gICAgfVxuXG4gICAgLy8gMSBmb3Igc3VicGl4ZWwgcm91bmRpbmdcbiAgICBpZiAoZWxlbWVudFtzY3JvbGxUb3BdID4gaVtjb250ZW50SGVpZ2h0XSAtIGlbY29udGFpbmVySGVpZ2h0XSAtIDEpIHtcbiAgICAgIGkucmVhY2hbeV0gPSAnZW5kJztcbiAgICB9XG5cbiAgICBpZiAoZGlmZikge1xuICAgICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KChcInBzLXNjcm9sbC1cIiArIHkpKSk7XG5cbiAgICAgIGlmIChkaWZmIDwgMCkge1xuICAgICAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRXZlbnQoKFwicHMtc2Nyb2xsLVwiICsgdXApKSk7XG4gICAgICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XG4gICAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCgoXCJwcy1zY3JvbGwtXCIgKyBkb3duKSkpO1xuICAgICAgfVxuXG4gICAgICBpZiAodXNlU2Nyb2xsaW5nQ2xhc3MpIHtcbiAgICAgICAgc2V0U2Nyb2xsaW5nQ2xhc3NJbnN0YW50bHkoaSwgeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGkucmVhY2hbeV0gJiYgKGRpZmYgfHwgZm9yY2VGaXJlUmVhY2hFdmVudCkpIHtcbiAgICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVFdmVudCgoXCJwcy1cIiArIHkgKyBcIi1yZWFjaC1cIiArIChpLnJlYWNoW3ldKSkpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b0ludCh4KSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHgsIDEwKSB8fCAwO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNFZGl0YWJsZShlbCkge1xuICAgIHJldHVybiAoXG4gICAgICBtYXRjaGVzKGVsLCAnaW5wdXQsW2NvbnRlbnRlZGl0YWJsZV0nKSB8fFxuICAgICAgbWF0Y2hlcyhlbCwgJ3NlbGVjdCxbY29udGVudGVkaXRhYmxlXScpIHx8XG4gICAgICBtYXRjaGVzKGVsLCAndGV4dGFyZWEsW2NvbnRlbnRlZGl0YWJsZV0nKSB8fFxuICAgICAgbWF0Y2hlcyhlbCwgJ2J1dHRvbixbY29udGVudGVkaXRhYmxlXScpXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG91dGVyV2lkdGgoZWxlbWVudCkge1xuICAgIHZhciBzdHlsZXMgPSBnZXQoZWxlbWVudCk7XG4gICAgcmV0dXJuIChcbiAgICAgIHRvSW50KHN0eWxlcy53aWR0aCkgK1xuICAgICAgdG9JbnQoc3R5bGVzLnBhZGRpbmdMZWZ0KSArXG4gICAgICB0b0ludChzdHlsZXMucGFkZGluZ1JpZ2h0KSArXG4gICAgICB0b0ludChzdHlsZXMuYm9yZGVyTGVmdFdpZHRoKSArXG4gICAgICB0b0ludChzdHlsZXMuYm9yZGVyUmlnaHRXaWR0aClcbiAgICApO1xuICB9XG5cbiAgdmFyIGVudiA9IHtcbiAgICBpc1dlYktpdDpcbiAgICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUsXG4gICAgc3VwcG9ydHNUb3VjaDpcbiAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8XG4gICAgICAgICgnbWF4VG91Y2hQb2ludHMnIGluIHdpbmRvdy5uYXZpZ2F0b3IgJiZcbiAgICAgICAgICB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMCkgfHxcbiAgICAgICAgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKSxcbiAgICBzdXBwb3J0c0llUG9pbnRlcjpcbiAgICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzLFxuICAgIGlzQ2hyb21lOlxuICAgICAgdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIC9DaHJvbWUvaS50ZXN0KG5hdmlnYXRvciAmJiBuYXZpZ2F0b3IudXNlckFnZW50KSxcbiAgfTtcblxuICBmdW5jdGlvbiB1cGRhdGVHZW9tZXRyeShpKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBpLmVsZW1lbnQ7XG4gICAgdmFyIHJvdW5kZWRTY3JvbGxUb3AgPSBNYXRoLmZsb29yKGVsZW1lbnQuc2Nyb2xsVG9wKTtcbiAgICB2YXIgcmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBpLmNvbnRhaW5lcldpZHRoID0gTWF0aC5yb3VuZChyZWN0LndpZHRoKTtcbiAgICBpLmNvbnRhaW5lckhlaWdodCA9IE1hdGgucm91bmQocmVjdC5oZWlnaHQpO1xuXG4gICAgaS5jb250ZW50V2lkdGggPSBlbGVtZW50LnNjcm9sbFdpZHRoO1xuICAgIGkuY29udGVudEhlaWdodCA9IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuXG4gICAgaWYgKCFlbGVtZW50LmNvbnRhaW5zKGkuc2Nyb2xsYmFyWFJhaWwpKSB7XG4gICAgICAvLyBjbGVhbiB1cCBhbmQgYXBwZW5kXG4gICAgICBxdWVyeUNoaWxkcmVuKGVsZW1lbnQsIGNscy5lbGVtZW50LnJhaWwoJ3gnKSkuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIHJlbW92ZShlbCk7IH1cbiAgICAgICk7XG4gICAgICBlbGVtZW50LmFwcGVuZENoaWxkKGkuc2Nyb2xsYmFyWFJhaWwpO1xuICAgIH1cbiAgICBpZiAoIWVsZW1lbnQuY29udGFpbnMoaS5zY3JvbGxiYXJZUmFpbCkpIHtcbiAgICAgIC8vIGNsZWFuIHVwIGFuZCBhcHBlbmRcbiAgICAgIHF1ZXJ5Q2hpbGRyZW4oZWxlbWVudCwgY2xzLmVsZW1lbnQucmFpbCgneScpKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gcmVtb3ZlKGVsKTsgfVxuICAgICAgKTtcbiAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQoaS5zY3JvbGxiYXJZUmFpbCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgIWkuc2V0dGluZ3Muc3VwcHJlc3NTY3JvbGxYICYmXG4gICAgICBpLmNvbnRhaW5lcldpZHRoICsgaS5zZXR0aW5ncy5zY3JvbGxYTWFyZ2luT2Zmc2V0IDwgaS5jb250ZW50V2lkdGhcbiAgICApIHtcbiAgICAgIGkuc2Nyb2xsYmFyWEFjdGl2ZSA9IHRydWU7XG4gICAgICBpLnJhaWxYV2lkdGggPSBpLmNvbnRhaW5lcldpZHRoIC0gaS5yYWlsWE1hcmdpbldpZHRoO1xuICAgICAgaS5yYWlsWFJhdGlvID0gaS5jb250YWluZXJXaWR0aCAvIGkucmFpbFhXaWR0aDtcbiAgICAgIGkuc2Nyb2xsYmFyWFdpZHRoID0gZ2V0VGh1bWJTaXplKFxuICAgICAgICBpLFxuICAgICAgICB0b0ludCgoaS5yYWlsWFdpZHRoICogaS5jb250YWluZXJXaWR0aCkgLyBpLmNvbnRlbnRXaWR0aClcbiAgICAgICk7XG4gICAgICBpLnNjcm9sbGJhclhMZWZ0ID0gdG9JbnQoXG4gICAgICAgICgoaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgKyBlbGVtZW50LnNjcm9sbExlZnQpICpcbiAgICAgICAgICAoaS5yYWlsWFdpZHRoIC0gaS5zY3JvbGxiYXJYV2lkdGgpKSAvXG4gICAgICAgICAgKGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aClcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGkuc2Nyb2xsYmFyWEFjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICFpLnNldHRpbmdzLnN1cHByZXNzU2Nyb2xsWSAmJlxuICAgICAgaS5jb250YWluZXJIZWlnaHQgKyBpLnNldHRpbmdzLnNjcm9sbFlNYXJnaW5PZmZzZXQgPCBpLmNvbnRlbnRIZWlnaHRcbiAgICApIHtcbiAgICAgIGkuc2Nyb2xsYmFyWUFjdGl2ZSA9IHRydWU7XG4gICAgICBpLnJhaWxZSGVpZ2h0ID0gaS5jb250YWluZXJIZWlnaHQgLSBpLnJhaWxZTWFyZ2luSGVpZ2h0O1xuICAgICAgaS5yYWlsWVJhdGlvID0gaS5jb250YWluZXJIZWlnaHQgLyBpLnJhaWxZSGVpZ2h0O1xuICAgICAgaS5zY3JvbGxiYXJZSGVpZ2h0ID0gZ2V0VGh1bWJTaXplKFxuICAgICAgICBpLFxuICAgICAgICB0b0ludCgoaS5yYWlsWUhlaWdodCAqIGkuY29udGFpbmVySGVpZ2h0KSAvIGkuY29udGVudEhlaWdodClcbiAgICAgICk7XG4gICAgICBpLnNjcm9sbGJhcllUb3AgPSB0b0ludChcbiAgICAgICAgKHJvdW5kZWRTY3JvbGxUb3AgKiAoaS5yYWlsWUhlaWdodCAtIGkuc2Nyb2xsYmFyWUhlaWdodCkpIC9cbiAgICAgICAgICAoaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpLnNjcm9sbGJhcllBY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaS5zY3JvbGxiYXJYTGVmdCA+PSBpLnJhaWxYV2lkdGggLSBpLnNjcm9sbGJhclhXaWR0aCkge1xuICAgICAgaS5zY3JvbGxiYXJYTGVmdCA9IGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoO1xuICAgIH1cbiAgICBpZiAoaS5zY3JvbGxiYXJZVG9wID49IGkucmFpbFlIZWlnaHQgLSBpLnNjcm9sbGJhcllIZWlnaHQpIHtcbiAgICAgIGkuc2Nyb2xsYmFyWVRvcCA9IGkucmFpbFlIZWlnaHQgLSBpLnNjcm9sbGJhcllIZWlnaHQ7XG4gICAgfVxuXG4gICAgdXBkYXRlQ3NzKGVsZW1lbnQsIGkpO1xuXG4gICAgaWYgKGkuc2Nyb2xsYmFyWEFjdGl2ZSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNscy5zdGF0ZS5hY3RpdmUoJ3gnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbHMuc3RhdGUuYWN0aXZlKCd4JykpO1xuICAgICAgaS5zY3JvbGxiYXJYV2lkdGggPSAwO1xuICAgICAgaS5zY3JvbGxiYXJYTGVmdCA9IDA7XG4gICAgICBlbGVtZW50LnNjcm9sbExlZnQgPSBpLmlzUnRsID09PSB0cnVlID8gaS5jb250ZW50V2lkdGggOiAwO1xuICAgIH1cbiAgICBpZiAoaS5zY3JvbGxiYXJZQWN0aXZlKSB7XG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xzLnN0YXRlLmFjdGl2ZSgneScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNscy5zdGF0ZS5hY3RpdmUoJ3knKSk7XG4gICAgICBpLnNjcm9sbGJhcllIZWlnaHQgPSAwO1xuICAgICAgaS5zY3JvbGxiYXJZVG9wID0gMDtcbiAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUaHVtYlNpemUoaSwgdGh1bWJTaXplKSB7XG4gICAgaWYgKGkuc2V0dGluZ3MubWluU2Nyb2xsYmFyTGVuZ3RoKSB7XG4gICAgICB0aHVtYlNpemUgPSBNYXRoLm1heCh0aHVtYlNpemUsIGkuc2V0dGluZ3MubWluU2Nyb2xsYmFyTGVuZ3RoKTtcbiAgICB9XG4gICAgaWYgKGkuc2V0dGluZ3MubWF4U2Nyb2xsYmFyTGVuZ3RoKSB7XG4gICAgICB0aHVtYlNpemUgPSBNYXRoLm1pbih0aHVtYlNpemUsIGkuc2V0dGluZ3MubWF4U2Nyb2xsYmFyTGVuZ3RoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRodW1iU2l6ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUNzcyhlbGVtZW50LCBpKSB7XG4gICAgdmFyIHhSYWlsT2Zmc2V0ID0geyB3aWR0aDogaS5yYWlsWFdpZHRoIH07XG4gICAgdmFyIHJvdW5kZWRTY3JvbGxUb3AgPSBNYXRoLmZsb29yKGVsZW1lbnQuc2Nyb2xsVG9wKTtcblxuICAgIGlmIChpLmlzUnRsKSB7XG4gICAgICB4UmFpbE9mZnNldC5sZWZ0ID1cbiAgICAgICAgaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgK1xuICAgICAgICBlbGVtZW50LnNjcm9sbExlZnQgK1xuICAgICAgICBpLmNvbnRhaW5lcldpZHRoIC1cbiAgICAgICAgaS5jb250ZW50V2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHhSYWlsT2Zmc2V0LmxlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgfVxuICAgIGlmIChpLmlzU2Nyb2xsYmFyWFVzaW5nQm90dG9tKSB7XG4gICAgICB4UmFpbE9mZnNldC5ib3R0b20gPSBpLnNjcm9sbGJhclhCb3R0b20gLSByb3VuZGVkU2Nyb2xsVG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICB4UmFpbE9mZnNldC50b3AgPSBpLnNjcm9sbGJhclhUb3AgKyByb3VuZGVkU2Nyb2xsVG9wO1xuICAgIH1cbiAgICBzZXQoaS5zY3JvbGxiYXJYUmFpbCwgeFJhaWxPZmZzZXQpO1xuXG4gICAgdmFyIHlSYWlsT2Zmc2V0ID0geyB0b3A6IHJvdW5kZWRTY3JvbGxUb3AsIGhlaWdodDogaS5yYWlsWUhlaWdodCB9O1xuICAgIGlmIChpLmlzU2Nyb2xsYmFyWVVzaW5nUmlnaHQpIHtcbiAgICAgIGlmIChpLmlzUnRsKSB7XG4gICAgICAgIHlSYWlsT2Zmc2V0LnJpZ2h0ID1cbiAgICAgICAgICBpLmNvbnRlbnRXaWR0aCAtXG4gICAgICAgICAgKGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICsgZWxlbWVudC5zY3JvbGxMZWZ0KSAtXG4gICAgICAgICAgaS5zY3JvbGxiYXJZUmlnaHQgLVxuICAgICAgICAgIGkuc2Nyb2xsYmFyWU91dGVyV2lkdGggLVxuICAgICAgICAgIDk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5UmFpbE9mZnNldC5yaWdodCA9IGkuc2Nyb2xsYmFyWVJpZ2h0IC0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoaS5pc1J0bCkge1xuICAgICAgICB5UmFpbE9mZnNldC5sZWZ0ID1cbiAgICAgICAgICBpLm5lZ2F0aXZlU2Nyb2xsQWRqdXN0bWVudCArXG4gICAgICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ICtcbiAgICAgICAgICBpLmNvbnRhaW5lcldpZHRoICogMiAtXG4gICAgICAgICAgaS5jb250ZW50V2lkdGggLVxuICAgICAgICAgIGkuc2Nyb2xsYmFyWUxlZnQgLVxuICAgICAgICAgIGkuc2Nyb2xsYmFyWU91dGVyV2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5UmFpbE9mZnNldC5sZWZ0ID0gaS5zY3JvbGxiYXJZTGVmdCArIGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgIH1cbiAgICB9XG4gICAgc2V0KGkuc2Nyb2xsYmFyWVJhaWwsIHlSYWlsT2Zmc2V0KTtcblxuICAgIHNldChpLnNjcm9sbGJhclgsIHtcbiAgICAgIGxlZnQ6IGkuc2Nyb2xsYmFyWExlZnQsXG4gICAgICB3aWR0aDogaS5zY3JvbGxiYXJYV2lkdGggLSBpLnJhaWxCb3JkZXJYV2lkdGgsXG4gICAgfSk7XG4gICAgc2V0KGkuc2Nyb2xsYmFyWSwge1xuICAgICAgdG9wOiBpLnNjcm9sbGJhcllUb3AsXG4gICAgICBoZWlnaHQ6IGkuc2Nyb2xsYmFyWUhlaWdodCAtIGkucmFpbEJvcmRlcllXaWR0aCxcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsaWNrUmFpbChpKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBpLmVsZW1lbnQ7XG5cbiAgICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJZLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc3RvcFByb3BhZ2F0aW9uKCk7IH0pO1xuICAgIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhcllSYWlsLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIHZhciBwb3NpdGlvblRvcCA9XG4gICAgICAgIGUucGFnZVkgLVxuICAgICAgICB3aW5kb3cucGFnZVlPZmZzZXQgLVxuICAgICAgICBpLnNjcm9sbGJhcllSYWlsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcDtcbiAgICAgIHZhciBkaXJlY3Rpb24gPSBwb3NpdGlvblRvcCA+IGkuc2Nyb2xsYmFyWVRvcCA/IDEgOiAtMTtcblxuICAgICAgaS5lbGVtZW50LnNjcm9sbFRvcCArPSBkaXJlY3Rpb24gKiBpLmNvbnRhaW5lckhlaWdodDtcbiAgICAgIHVwZGF0ZUdlb21ldHJ5KGkpO1xuXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgaS5ldmVudC5iaW5kKGkuc2Nyb2xsYmFyWCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnN0b3BQcm9wYWdhdGlvbigpOyB9KTtcbiAgICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJYUmFpbCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB2YXIgcG9zaXRpb25MZWZ0ID1cbiAgICAgICAgZS5wYWdlWCAtXG4gICAgICAgIHdpbmRvdy5wYWdlWE9mZnNldCAtXG4gICAgICAgIGkuc2Nyb2xsYmFyWFJhaWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICAgIHZhciBkaXJlY3Rpb24gPSBwb3NpdGlvbkxlZnQgPiBpLnNjcm9sbGJhclhMZWZ0ID8gMSA6IC0xO1xuXG4gICAgICBpLmVsZW1lbnQuc2Nyb2xsTGVmdCArPSBkaXJlY3Rpb24gKiBpLmNvbnRhaW5lcldpZHRoO1xuICAgICAgdXBkYXRlR2VvbWV0cnkoaSk7XG5cbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmFnVGh1bWIoaSkge1xuICAgIGJpbmRNb3VzZVNjcm9sbEhhbmRsZXIoaSwgW1xuICAgICAgJ2NvbnRhaW5lcldpZHRoJyxcbiAgICAgICdjb250ZW50V2lkdGgnLFxuICAgICAgJ3BhZ2VYJyxcbiAgICAgICdyYWlsWFdpZHRoJyxcbiAgICAgICdzY3JvbGxiYXJYJyxcbiAgICAgICdzY3JvbGxiYXJYV2lkdGgnLFxuICAgICAgJ3Njcm9sbExlZnQnLFxuICAgICAgJ3gnLFxuICAgICAgJ3Njcm9sbGJhclhSYWlsJyBdKTtcbiAgICBiaW5kTW91c2VTY3JvbGxIYW5kbGVyKGksIFtcbiAgICAgICdjb250YWluZXJIZWlnaHQnLFxuICAgICAgJ2NvbnRlbnRIZWlnaHQnLFxuICAgICAgJ3BhZ2VZJyxcbiAgICAgICdyYWlsWUhlaWdodCcsXG4gICAgICAnc2Nyb2xsYmFyWScsXG4gICAgICAnc2Nyb2xsYmFyWUhlaWdodCcsXG4gICAgICAnc2Nyb2xsVG9wJyxcbiAgICAgICd5JyxcbiAgICAgICdzY3JvbGxiYXJZUmFpbCcgXSk7XG4gIH1cblxuICBmdW5jdGlvbiBiaW5kTW91c2VTY3JvbGxIYW5kbGVyKFxuICAgIGksXG4gICAgcmVmXG4gICkge1xuICAgIHZhciBjb250YWluZXJIZWlnaHQgPSByZWZbMF07XG4gICAgdmFyIGNvbnRlbnRIZWlnaHQgPSByZWZbMV07XG4gICAgdmFyIHBhZ2VZID0gcmVmWzJdO1xuICAgIHZhciByYWlsWUhlaWdodCA9IHJlZlszXTtcbiAgICB2YXIgc2Nyb2xsYmFyWSA9IHJlZls0XTtcbiAgICB2YXIgc2Nyb2xsYmFyWUhlaWdodCA9IHJlZls1XTtcbiAgICB2YXIgc2Nyb2xsVG9wID0gcmVmWzZdO1xuICAgIHZhciB5ID0gcmVmWzddO1xuICAgIHZhciBzY3JvbGxiYXJZUmFpbCA9IHJlZls4XTtcblxuICAgIHZhciBlbGVtZW50ID0gaS5lbGVtZW50O1xuXG4gICAgdmFyIHN0YXJ0aW5nU2Nyb2xsVG9wID0gbnVsbDtcbiAgICB2YXIgc3RhcnRpbmdNb3VzZVBhZ2VZID0gbnVsbDtcbiAgICB2YXIgc2Nyb2xsQnkgPSBudWxsO1xuXG4gICAgZnVuY3Rpb24gbW91c2VNb3ZlSGFuZGxlcihlKSB7XG4gICAgICBpZiAoZS50b3VjaGVzICYmIGUudG91Y2hlc1swXSkge1xuICAgICAgICBlW3BhZ2VZXSA9IGUudG91Y2hlc1swXS5wYWdlWTtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnRbc2Nyb2xsVG9wXSA9XG4gICAgICAgIHN0YXJ0aW5nU2Nyb2xsVG9wICsgc2Nyb2xsQnkgKiAoZVtwYWdlWV0gLSBzdGFydGluZ01vdXNlUGFnZVkpO1xuICAgICAgYWRkU2Nyb2xsaW5nQ2xhc3MoaSwgeSk7XG4gICAgICB1cGRhdGVHZW9tZXRyeShpKTtcblxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmIChlLnR5cGUuc3RhcnRzV2l0aCgndG91Y2gnKSAmJiBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNlVXBIYW5kbGVyKCkge1xuICAgICAgcmVtb3ZlU2Nyb2xsaW5nQ2xhc3MoaSwgeSk7XG4gICAgICBpW3Njcm9sbGJhcllSYWlsXS5jbGFzc0xpc3QucmVtb3ZlKGNscy5zdGF0ZS5jbGlja2luZyk7XG4gICAgICBpLmV2ZW50LnVuYmluZChpLm93bmVyRG9jdW1lbnQsICdtb3VzZW1vdmUnLCBtb3VzZU1vdmVIYW5kbGVyKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiaW5kTW92ZXMoZSwgdG91Y2hNb2RlKSB7XG4gICAgICBzdGFydGluZ1Njcm9sbFRvcCA9IGVsZW1lbnRbc2Nyb2xsVG9wXTtcbiAgICAgIGlmICh0b3VjaE1vZGUgJiYgZS50b3VjaGVzKSB7XG4gICAgICAgIGVbcGFnZVldID0gZS50b3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgfVxuICAgICAgc3RhcnRpbmdNb3VzZVBhZ2VZID0gZVtwYWdlWV07XG4gICAgICBzY3JvbGxCeSA9XG4gICAgICAgIChpW2NvbnRlbnRIZWlnaHRdIC0gaVtjb250YWluZXJIZWlnaHRdKSAvXG4gICAgICAgIChpW3JhaWxZSGVpZ2h0XSAtIGlbc2Nyb2xsYmFyWUhlaWdodF0pO1xuICAgICAgaWYgKCF0b3VjaE1vZGUpIHtcbiAgICAgICAgaS5ldmVudC5iaW5kKGkub3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICAgICAgICBpLmV2ZW50Lm9uY2UoaS5vd25lckRvY3VtZW50LCAnbW91c2V1cCcsIG1vdXNlVXBIYW5kbGVyKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaS5ldmVudC5iaW5kKGkub3duZXJEb2N1bWVudCwgJ3RvdWNobW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICAgICAgfVxuXG4gICAgICBpW3Njcm9sbGJhcllSYWlsXS5jbGFzc0xpc3QuYWRkKGNscy5zdGF0ZS5jbGlja2luZyk7XG5cbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgaS5ldmVudC5iaW5kKGlbc2Nyb2xsYmFyWV0sICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgYmluZE1vdmVzKGUpO1xuICAgIH0pO1xuICAgIGkuZXZlbnQuYmluZChpW3Njcm9sbGJhclldLCAndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBiaW5kTW92ZXMoZSwgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBrZXlib2FyZChpKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBpLmVsZW1lbnQ7XG5cbiAgICB2YXIgZWxlbWVudEhvdmVyZWQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBtYXRjaGVzKGVsZW1lbnQsICc6aG92ZXInKTsgfTtcbiAgICB2YXIgc2Nyb2xsYmFyRm9jdXNlZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1hdGNoZXMoaS5zY3JvbGxiYXJYLCAnOmZvY3VzJykgfHwgbWF0Y2hlcyhpLnNjcm9sbGJhclksICc6Zm9jdXMnKTsgfTtcblxuICAgIGZ1bmN0aW9uIHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7XG4gICAgICBpZiAoZGVsdGFYID09PSAwKSB7XG4gICAgICAgIGlmICghaS5zY3JvbGxiYXJZQWN0aXZlKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoc2Nyb2xsVG9wID09PSAwICYmIGRlbHRhWSA+IDApIHx8XG4gICAgICAgICAgKHNjcm9sbFRvcCA+PSBpLmNvbnRlbnRIZWlnaHQgLSBpLmNvbnRhaW5lckhlaWdodCAmJiBkZWx0YVkgPCAwKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gIWkuc2V0dGluZ3Mud2hlZWxQcm9wYWdhdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgIGlmIChkZWx0YVkgPT09IDApIHtcbiAgICAgICAgaWYgKCFpLnNjcm9sbGJhclhBY3RpdmUpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChzY3JvbGxMZWZ0ID09PSAwICYmIGRlbHRhWCA8IDApIHx8XG4gICAgICAgICAgKHNjcm9sbExlZnQgPj0gaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoICYmIGRlbHRhWCA+IDApXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiAhaS5zZXR0aW5ncy53aGVlbFByb3BhZ2F0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpLmV2ZW50LmJpbmQoaS5vd25lckRvY3VtZW50LCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpZiAoXG4gICAgICAgIChlLmlzRGVmYXVsdFByZXZlbnRlZCAmJiBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB8fFxuICAgICAgICBlLmRlZmF1bHRQcmV2ZW50ZWRcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghZWxlbWVudEhvdmVyZWQoKSAmJiAhc2Nyb2xsYmFyRm9jdXNlZCgpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIGFjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gICAgICAgID8gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICAgICAgICA6IGkub3duZXJEb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQudGFnTmFtZSA9PT0gJ0lGUkFNRScpIHtcbiAgICAgICAgICBhY3RpdmVFbGVtZW50ID0gYWN0aXZlRWxlbWVudC5jb250ZW50RG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBnbyBkZWVwZXIgaWYgZWxlbWVudCBpcyBhIHdlYmNvbXBvbmVudFxuICAgICAgICAgIHdoaWxlIChhY3RpdmVFbGVtZW50LnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBhY3RpdmVFbGVtZW50LnNoYWRvd1Jvb3QuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRWRpdGFibGUoYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGRlbHRhWCA9IDA7XG4gICAgICB2YXIgZGVsdGFZID0gMDtcblxuICAgICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICAgIGNhc2UgMzc6IC8vIGxlZnRcbiAgICAgICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgICAgICBkZWx0YVggPSAtaS5jb250ZW50V2lkdGg7XG4gICAgICAgICAgfSBlbHNlIGlmIChlLmFsdEtleSkge1xuICAgICAgICAgICAgZGVsdGFYID0gLWkuY29udGFpbmVyV2lkdGg7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbHRhWCA9IC0zMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzg6IC8vIHVwXG4gICAgICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICAgICAgZGVsdGFZID0gaS5jb250ZW50SGVpZ2h0O1xuICAgICAgICAgIH0gZWxzZSBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgICAgIGRlbHRhWSA9IGkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWx0YVkgPSAzMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzk6IC8vIHJpZ2h0XG4gICAgICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICAgICAgZGVsdGFYID0gaS5jb250ZW50V2lkdGg7XG4gICAgICAgICAgfSBlbHNlIGlmIChlLmFsdEtleSkge1xuICAgICAgICAgICAgZGVsdGFYID0gaS5jb250YWluZXJXaWR0aDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsdGFYID0gMzA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQwOiAvLyBkb3duXG4gICAgICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICAgICAgZGVsdGFZID0gLWkuY29udGVudEhlaWdodDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgICAgICBkZWx0YVkgPSAtaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbHRhWSA9IC0zMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzI6IC8vIHNwYWNlIGJhclxuICAgICAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBkZWx0YVkgPSBpLmNvbnRhaW5lckhlaWdodDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsdGFZID0gLWkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzMzogLy8gcGFnZSB1cFxuICAgICAgICAgIGRlbHRhWSA9IGkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM0OiAvLyBwYWdlIGRvd25cbiAgICAgICAgICBkZWx0YVkgPSAtaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzY6IC8vIGhvbWVcbiAgICAgICAgICBkZWx0YVkgPSBpLmNvbnRlbnRIZWlnaHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzU6IC8vIGVuZFxuICAgICAgICAgIGRlbHRhWSA9IC1pLmNvbnRlbnRIZWlnaHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoaS5zZXR0aW5ncy5zdXBwcmVzc1Njcm9sbFggJiYgZGVsdGFYICE9PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpLnNldHRpbmdzLnN1cHByZXNzU2Nyb2xsWSAmJiBkZWx0YVkgIT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50LnNjcm9sbFRvcCAtPSBkZWx0YVk7XG4gICAgICBlbGVtZW50LnNjcm9sbExlZnQgKz0gZGVsdGFYO1xuICAgICAgdXBkYXRlR2VvbWV0cnkoaSk7XG5cbiAgICAgIGlmIChzaG91bGRQcmV2ZW50RGVmYXVsdChkZWx0YVgsIGRlbHRhWSkpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gd2hlZWwoaSkge1xuICAgIHZhciBlbGVtZW50ID0gaS5lbGVtZW50O1xuXG4gICAgZnVuY3Rpb24gc2hvdWxkUHJldmVudERlZmF1bHQoZGVsdGFYLCBkZWx0YVkpIHtcbiAgICAgIHZhciByb3VuZGVkU2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7XG4gICAgICB2YXIgaXNUb3AgPSBlbGVtZW50LnNjcm9sbFRvcCA9PT0gMDtcbiAgICAgIHZhciBpc0JvdHRvbSA9XG4gICAgICAgIHJvdW5kZWRTY3JvbGxUb3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCA9PT0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICB2YXIgaXNMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0ID09PSAwO1xuICAgICAgdmFyIGlzUmlnaHQgPVxuICAgICAgICBlbGVtZW50LnNjcm9sbExlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoID09PSBlbGVtZW50LnNjcm9sbFdpZHRoO1xuXG4gICAgICB2YXIgaGl0c0JvdW5kO1xuXG4gICAgICAvLyBwaWNrIGF4aXMgd2l0aCBwcmltYXJ5IGRpcmVjdGlvblxuICAgICAgaWYgKE1hdGguYWJzKGRlbHRhWSkgPiBNYXRoLmFicyhkZWx0YVgpKSB7XG4gICAgICAgIGhpdHNCb3VuZCA9IGlzVG9wIHx8IGlzQm90dG9tO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaGl0c0JvdW5kID0gaXNMZWZ0IHx8IGlzUmlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBoaXRzQm91bmQgPyAhaS5zZXR0aW5ncy53aGVlbFByb3BhZ2F0aW9uIDogdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREZWx0YUZyb21FdmVudChlKSB7XG4gICAgICB2YXIgZGVsdGFYID0gZS5kZWx0YVg7XG4gICAgICB2YXIgZGVsdGFZID0gLTEgKiBlLmRlbHRhWTtcblxuICAgICAgaWYgKHR5cGVvZiBkZWx0YVggPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBkZWx0YVkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIE9TIFggU2FmYXJpXG4gICAgICAgIGRlbHRhWCA9ICgtMSAqIGUud2hlZWxEZWx0YVgpIC8gNjtcbiAgICAgICAgZGVsdGFZID0gZS53aGVlbERlbHRhWSAvIDY7XG4gICAgICB9XG5cbiAgICAgIGlmIChlLmRlbHRhTW9kZSAmJiBlLmRlbHRhTW9kZSA9PT0gMSkge1xuICAgICAgICAvLyBGaXJlZm94IGluIGRlbHRhTW9kZSAxOiBMaW5lIHNjcm9sbGluZ1xuICAgICAgICBkZWx0YVggKj0gMTA7XG4gICAgICAgIGRlbHRhWSAqPSAxMDtcbiAgICAgIH1cblxuICAgICAgaWYgKGRlbHRhWCAhPT0gZGVsdGFYICYmIGRlbHRhWSAhPT0gZGVsdGFZIC8qIE5hTiBjaGVja3MgKi8pIHtcbiAgICAgICAgLy8gSUUgaW4gc29tZSBtb3VzZSBkcml2ZXJzXG4gICAgICAgIGRlbHRhWCA9IDA7XG4gICAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YTtcbiAgICAgIH1cblxuICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgLy8gcmV2ZXJzZSBheGlzIHdpdGggc2hpZnQga2V5XG4gICAgICAgIHJldHVybiBbLWRlbHRhWSwgLWRlbHRhWF07XG4gICAgICB9XG4gICAgICByZXR1cm4gW2RlbHRhWCwgZGVsdGFZXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG91bGRCZUNvbnN1bWVkQnlDaGlsZCh0YXJnZXQsIGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgICAvLyBGSVhNRTogdGhpcyBpcyBhIHdvcmthcm91bmQgZm9yIDxzZWxlY3Q+IGlzc3VlIGluIEZGIGFuZCBJRSAjNTcxXG4gICAgICBpZiAoIWVudi5pc1dlYktpdCAmJiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdDpmb2N1cycpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWVsZW1lbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJzb3IgPSB0YXJnZXQ7XG5cbiAgICAgIHdoaWxlIChjdXJzb3IgJiYgY3Vyc29yICE9PSBlbGVtZW50KSB7XG4gICAgICAgIGlmIChjdXJzb3IuY2xhc3NMaXN0LmNvbnRhaW5zKGNscy5lbGVtZW50LmNvbnN1bWluZykpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdHlsZSA9IGdldChjdXJzb3IpO1xuXG4gICAgICAgIC8vIGlmIGRlbHRhWSAmJiB2ZXJ0aWNhbCBzY3JvbGxhYmxlXG4gICAgICAgIGlmIChkZWx0YVkgJiYgc3R5bGUub3ZlcmZsb3dZLm1hdGNoKC8oc2Nyb2xsfGF1dG8pLykpIHtcbiAgICAgICAgICB2YXIgbWF4U2Nyb2xsVG9wID0gY3Vyc29yLnNjcm9sbEhlaWdodCAtIGN1cnNvci5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgaWYgKG1heFNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgKGN1cnNvci5zY3JvbGxUb3AgPiAwICYmIGRlbHRhWSA8IDApIHx8XG4gICAgICAgICAgICAgIChjdXJzb3Iuc2Nyb2xsVG9wIDwgbWF4U2Nyb2xsVG9wICYmIGRlbHRhWSA+IDApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIGRlbHRhWCAmJiBob3Jpem9udGFsIHNjcm9sbGFibGVcbiAgICAgICAgaWYgKGRlbHRhWCAmJiBzdHlsZS5vdmVyZmxvd1gubWF0Y2goLyhzY3JvbGx8YXV0bykvKSkge1xuICAgICAgICAgIHZhciBtYXhTY3JvbGxMZWZ0ID0gY3Vyc29yLnNjcm9sbFdpZHRoIC0gY3Vyc29yLmNsaWVudFdpZHRoO1xuICAgICAgICAgIGlmIChtYXhTY3JvbGxMZWZ0ID4gMCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoY3Vyc29yLnNjcm9sbExlZnQgPiAwICYmIGRlbHRhWCA8IDApIHx8XG4gICAgICAgICAgICAgIChjdXJzb3Iuc2Nyb2xsTGVmdCA8IG1heFNjcm9sbExlZnQgJiYgZGVsdGFYID4gMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjdXJzb3IgPSBjdXJzb3IucGFyZW50Tm9kZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdXNld2hlZWxIYW5kbGVyKGUpIHtcbiAgICAgIHZhciByZWYgPSBnZXREZWx0YUZyb21FdmVudChlKTtcbiAgICAgIHZhciBkZWx0YVggPSByZWZbMF07XG4gICAgICB2YXIgZGVsdGFZID0gcmVmWzFdO1xuXG4gICAgICBpZiAoc2hvdWxkQmVDb25zdW1lZEJ5Q2hpbGQoZS50YXJnZXQsIGRlbHRhWCwgZGVsdGFZKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHZhciBzaG91bGRQcmV2ZW50ID0gZmFsc2U7XG4gICAgICBpZiAoIWkuc2V0dGluZ3MudXNlQm90aFdoZWVsQXhlcykge1xuICAgICAgICAvLyBkZWx0YVggd2lsbCBvbmx5IGJlIHVzZWQgZm9yIGhvcml6b250YWwgc2Nyb2xsaW5nIGFuZCBkZWx0YVkgd2lsbFxuICAgICAgICAvLyBvbmx5IGJlIHVzZWQgZm9yIHZlcnRpY2FsIHNjcm9sbGluZyAtIHRoaXMgaXMgdGhlIGRlZmF1bHRcbiAgICAgICAgZWxlbWVudC5zY3JvbGxUb3AgLT0gZGVsdGFZICogaS5zZXR0aW5ncy53aGVlbFNwZWVkO1xuICAgICAgICBlbGVtZW50LnNjcm9sbExlZnQgKz0gZGVsdGFYICogaS5zZXR0aW5ncy53aGVlbFNwZWVkO1xuICAgICAgfSBlbHNlIGlmIChpLnNjcm9sbGJhcllBY3RpdmUgJiYgIWkuc2Nyb2xsYmFyWEFjdGl2ZSkge1xuICAgICAgICAvLyBvbmx5IHZlcnRpY2FsIHNjcm9sbGJhciBpcyBhY3RpdmUgYW5kIHVzZUJvdGhXaGVlbEF4ZXMgb3B0aW9uIGlzXG4gICAgICAgIC8vIGFjdGl2ZSwgc28gbGV0J3Mgc2Nyb2xsIHZlcnRpY2FsIGJhciB1c2luZyBib3RoIG1vdXNlIHdoZWVsIGF4ZXNcbiAgICAgICAgaWYgKGRlbHRhWSkge1xuICAgICAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wIC09IGRlbHRhWSAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCArPSBkZWx0YVggKiBpLnNldHRpbmdzLndoZWVsU3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgc2hvdWxkUHJldmVudCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGkuc2Nyb2xsYmFyWEFjdGl2ZSAmJiAhaS5zY3JvbGxiYXJZQWN0aXZlKSB7XG4gICAgICAgIC8vIHVzZUJvdGhXaGVlbEF4ZXMgYW5kIG9ubHkgaG9yaXpvbnRhbCBiYXIgaXMgYWN0aXZlLCBzbyB1c2UgYm90aFxuICAgICAgICAvLyB3aGVlbCBheGVzIGZvciBob3Jpem9udGFsIGJhclxuICAgICAgICBpZiAoZGVsdGFYKSB7XG4gICAgICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ICs9IGRlbHRhWCAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbGVtZW50LnNjcm9sbExlZnQgLT0gZGVsdGFZICogaS5zZXR0aW5ncy53aGVlbFNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIHNob3VsZFByZXZlbnQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB1cGRhdGVHZW9tZXRyeShpKTtcblxuICAgICAgc2hvdWxkUHJldmVudCA9IHNob3VsZFByZXZlbnQgfHwgc2hvdWxkUHJldmVudERlZmF1bHQoZGVsdGFYLCBkZWx0YVkpO1xuICAgICAgaWYgKHNob3VsZFByZXZlbnQgJiYgIWUuY3RybEtleSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cub253aGVlbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAnd2hlZWwnLCBtb3VzZXdoZWVsSGFuZGxlcik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93Lm9ubW91c2V3aGVlbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAnbW91c2V3aGVlbCcsIG1vdXNld2hlZWxIYW5kbGVyKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0b3VjaChpKSB7XG4gICAgaWYgKCFlbnYuc3VwcG9ydHNUb3VjaCAmJiAhZW52LnN1cHBvcnRzSWVQb2ludGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBpLmVsZW1lbnQ7XG5cbiAgICBmdW5jdGlvbiBzaG91bGRQcmV2ZW50KGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgICB2YXIgc2Nyb2xsVG9wID0gTWF0aC5mbG9vcihlbGVtZW50LnNjcm9sbFRvcCk7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciBtYWduaXR1ZGVYID0gTWF0aC5hYnMoZGVsdGFYKTtcbiAgICAgIHZhciBtYWduaXR1ZGVZID0gTWF0aC5hYnMoZGVsdGFZKTtcblxuICAgICAgaWYgKG1hZ25pdHVkZVkgPiBtYWduaXR1ZGVYKSB7XG4gICAgICAgIC8vIHVzZXIgaXMgcGVyaGFwcyB0cnlpbmcgdG8gc3dpcGUgdXAvZG93biB0aGUgcGFnZVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAoZGVsdGFZIDwgMCAmJiBzY3JvbGxUb3AgPT09IGkuY29udGVudEhlaWdodCAtIGkuY29udGFpbmVySGVpZ2h0KSB8fFxuICAgICAgICAgIChkZWx0YVkgPiAwICYmIHNjcm9sbFRvcCA9PT0gMClcbiAgICAgICAgKSB7XG4gICAgICAgICAgLy8gc2V0IHByZXZlbnQgZm9yIG1vYmlsZSBDaHJvbWUgcmVmcmVzaFxuICAgICAgICAgIHJldHVybiB3aW5kb3cuc2Nyb2xsWSA9PT0gMCAmJiBkZWx0YVkgPiAwICYmIGVudi5pc0Nocm9tZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChtYWduaXR1ZGVYID4gbWFnbml0dWRlWSkge1xuICAgICAgICAvLyB1c2VyIGlzIHBlcmhhcHMgdHJ5aW5nIHRvIHN3aXBlIGxlZnQvcmlnaHQgYWNyb3NzIHRoZSBwYWdlXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChkZWx0YVggPCAwICYmIHNjcm9sbExlZnQgPT09IGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aCkgfHxcbiAgICAgICAgICAoZGVsdGFYID4gMCAmJiBzY3JvbGxMZWZ0ID09PSAwKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBseVRvdWNoTW92ZShkaWZmZXJlbmNlWCwgZGlmZmVyZW5jZVkpIHtcbiAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wIC09IGRpZmZlcmVuY2VZO1xuICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0IC09IGRpZmZlcmVuY2VYO1xuXG4gICAgICB1cGRhdGVHZW9tZXRyeShpKTtcbiAgICB9XG5cbiAgICB2YXIgc3RhcnRPZmZzZXQgPSB7fTtcbiAgICB2YXIgc3RhcnRUaW1lID0gMDtcbiAgICB2YXIgc3BlZWQgPSB7fTtcbiAgICB2YXIgZWFzaW5nTG9vcCA9IG51bGw7XG5cbiAgICBmdW5jdGlvbiBnZXRUb3VjaChlKSB7XG4gICAgICBpZiAoZS50YXJnZXRUb3VjaGVzKSB7XG4gICAgICAgIHJldHVybiBlLnRhcmdldFRvdWNoZXNbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNYXliZSBJRSBwb2ludGVyXG4gICAgICAgIHJldHVybiBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3VsZEhhbmRsZShlKSB7XG4gICAgICBpZiAoZS5wb2ludGVyVHlwZSAmJiBlLnBvaW50ZXJUeXBlID09PSAncGVuJyAmJiBlLmJ1dHRvbnMgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICBlLnBvaW50ZXJUeXBlICYmXG4gICAgICAgIGUucG9pbnRlclR5cGUgIT09ICdtb3VzZScgJiZcbiAgICAgICAgZS5wb2ludGVyVHlwZSAhPT0gZS5NU1BPSU5URVJfVFlQRV9NT1VTRVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvdWNoU3RhcnQoZSkge1xuICAgICAgaWYgKCFzaG91bGRIYW5kbGUoZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2YXIgdG91Y2ggPSBnZXRUb3VjaChlKTtcblxuICAgICAgc3RhcnRPZmZzZXQucGFnZVggPSB0b3VjaC5wYWdlWDtcbiAgICAgIHN0YXJ0T2Zmc2V0LnBhZ2VZID0gdG91Y2gucGFnZVk7XG5cbiAgICAgIHN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICBpZiAoZWFzaW5nTG9vcCAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhckludGVydmFsKGVhc2luZ0xvb3ApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3VsZEJlQ29uc3VtZWRCeUNoaWxkKHRhcmdldCwgZGVsdGFYLCBkZWx0YVkpIHtcbiAgICAgIGlmICghZWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnNvciA9IHRhcmdldDtcblxuICAgICAgd2hpbGUgKGN1cnNvciAmJiBjdXJzb3IgIT09IGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGN1cnNvci5jbGFzc0xpc3QuY29udGFpbnMoY2xzLmVsZW1lbnQuY29uc3VtaW5nKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0eWxlID0gZ2V0KGN1cnNvcik7XG5cbiAgICAgICAgLy8gaWYgZGVsdGFZICYmIHZlcnRpY2FsIHNjcm9sbGFibGVcbiAgICAgICAgaWYgKGRlbHRhWSAmJiBzdHlsZS5vdmVyZmxvd1kubWF0Y2goLyhzY3JvbGx8YXV0bykvKSkge1xuICAgICAgICAgIHZhciBtYXhTY3JvbGxUb3AgPSBjdXJzb3Iuc2Nyb2xsSGVpZ2h0IC0gY3Vyc29yLmNsaWVudEhlaWdodDtcbiAgICAgICAgICBpZiAobWF4U2Nyb2xsVG9wID4gMCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoY3Vyc29yLnNjcm9sbFRvcCA+IDAgJiYgZGVsdGFZIDwgMCkgfHxcbiAgICAgICAgICAgICAgKGN1cnNvci5zY3JvbGxUb3AgPCBtYXhTY3JvbGxUb3AgJiYgZGVsdGFZID4gMClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgZGVsdGFYICYmIGhvcml6b250YWwgc2Nyb2xsYWJsZVxuICAgICAgICBpZiAoZGVsdGFYICYmIHN0eWxlLm92ZXJmbG93WC5tYXRjaCgvKHNjcm9sbHxhdXRvKS8pKSB7XG4gICAgICAgICAgdmFyIG1heFNjcm9sbExlZnQgPSBjdXJzb3Iuc2Nyb2xsV2lkdGggLSBjdXJzb3IuY2xpZW50V2lkdGg7XG4gICAgICAgICAgaWYgKG1heFNjcm9sbExlZnQgPiAwKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChjdXJzb3Iuc2Nyb2xsTGVmdCA+IDAgJiYgZGVsdGFYIDwgMCkgfHxcbiAgICAgICAgICAgICAgKGN1cnNvci5zY3JvbGxMZWZ0IDwgbWF4U2Nyb2xsTGVmdCAmJiBkZWx0YVggPiAwKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnNvciA9IGN1cnNvci5wYXJlbnROb2RlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG91Y2hNb3ZlKGUpIHtcbiAgICAgIGlmIChzaG91bGRIYW5kbGUoZSkpIHtcbiAgICAgICAgdmFyIHRvdWNoID0gZ2V0VG91Y2goZSk7XG5cbiAgICAgICAgdmFyIGN1cnJlbnRPZmZzZXQgPSB7IHBhZ2VYOiB0b3VjaC5wYWdlWCwgcGFnZVk6IHRvdWNoLnBhZ2VZIH07XG5cbiAgICAgICAgdmFyIGRpZmZlcmVuY2VYID0gY3VycmVudE9mZnNldC5wYWdlWCAtIHN0YXJ0T2Zmc2V0LnBhZ2VYO1xuICAgICAgICB2YXIgZGlmZmVyZW5jZVkgPSBjdXJyZW50T2Zmc2V0LnBhZ2VZIC0gc3RhcnRPZmZzZXQucGFnZVk7XG5cbiAgICAgICAgaWYgKHNob3VsZEJlQ29uc3VtZWRCeUNoaWxkKGUudGFyZ2V0LCBkaWZmZXJlbmNlWCwgZGlmZmVyZW5jZVkpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb3VjaE1vdmUoZGlmZmVyZW5jZVgsIGRpZmZlcmVuY2VZKTtcbiAgICAgICAgc3RhcnRPZmZzZXQgPSBjdXJyZW50T2Zmc2V0O1xuXG4gICAgICAgIHZhciBjdXJyZW50VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIHZhciB0aW1lR2FwID0gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gICAgICAgIGlmICh0aW1lR2FwID4gMCkge1xuICAgICAgICAgIHNwZWVkLnggPSBkaWZmZXJlbmNlWCAvIHRpbWVHYXA7XG4gICAgICAgICAgc3BlZWQueSA9IGRpZmZlcmVuY2VZIC8gdGltZUdhcDtcbiAgICAgICAgICBzdGFydFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaG91bGRQcmV2ZW50KGRpZmZlcmVuY2VYLCBkaWZmZXJlbmNlWSkpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gdG91Y2hFbmQoKSB7XG4gICAgICBpZiAoaS5zZXR0aW5ncy5zd2lwZUVhc2luZykge1xuICAgICAgICBjbGVhckludGVydmFsKGVhc2luZ0xvb3ApO1xuICAgICAgICBlYXNpbmdMb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKGkuaXNJbml0aWFsaXplZCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXNwZWVkLnggJiYgIXNwZWVkLnkpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKE1hdGguYWJzKHNwZWVkLngpIDwgMC4wMSAmJiBNYXRoLmFicyhzcGVlZC55KSA8IDAuMDEpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCFpLmVsZW1lbnQpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXBwbHlUb3VjaE1vdmUoc3BlZWQueCAqIDMwLCBzcGVlZC55ICogMzApO1xuXG4gICAgICAgICAgc3BlZWQueCAqPSAwLjg7XG4gICAgICAgICAgc3BlZWQueSAqPSAwLjg7XG4gICAgICAgIH0sIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZW52LnN1cHBvcnRzVG91Y2gpIHtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAndG91Y2hzdGFydCcsIHRvdWNoU3RhcnQpO1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICd0b3VjaG1vdmUnLCB0b3VjaE1vdmUpO1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICd0b3VjaGVuZCcsIHRvdWNoRW5kKTtcbiAgICB9IGVsc2UgaWYgKGVudi5zdXBwb3J0c0llUG9pbnRlcikge1xuICAgICAgaWYgKHdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcbiAgICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdwb2ludGVyZG93bicsIHRvdWNoU3RhcnQpO1xuICAgICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3BvaW50ZXJtb3ZlJywgdG91Y2hNb3ZlKTtcbiAgICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdwb2ludGVydXAnLCB0b3VjaEVuZCk7XG4gICAgICB9IGVsc2UgaWYgKHdpbmRvdy5NU1BvaW50ZXJFdmVudCkge1xuICAgICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ01TUG9pbnRlckRvd24nLCB0b3VjaFN0YXJ0KTtcbiAgICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdNU1BvaW50ZXJNb3ZlJywgdG91Y2hNb3ZlKTtcbiAgICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdNU1BvaW50ZXJVcCcsIHRvdWNoRW5kKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgZGVmYXVsdFNldHRpbmdzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gKHtcbiAgICBoYW5kbGVyczogWydjbGljay1yYWlsJywgJ2RyYWctdGh1bWInLCAna2V5Ym9hcmQnLCAnd2hlZWwnLCAndG91Y2gnXSxcbiAgICBtYXhTY3JvbGxiYXJMZW5ndGg6IG51bGwsXG4gICAgbWluU2Nyb2xsYmFyTGVuZ3RoOiBudWxsLFxuICAgIHNjcm9sbGluZ1RocmVzaG9sZDogMTAwMCxcbiAgICBzY3JvbGxYTWFyZ2luT2Zmc2V0OiAwLFxuICAgIHNjcm9sbFlNYXJnaW5PZmZzZXQ6IDAsXG4gICAgc3VwcHJlc3NTY3JvbGxYOiBmYWxzZSxcbiAgICBzdXBwcmVzc1Njcm9sbFk6IGZhbHNlLFxuICAgIHN3aXBlRWFzaW5nOiB0cnVlLFxuICAgIHVzZUJvdGhXaGVlbEF4ZXM6IGZhbHNlLFxuICAgIHdoZWVsUHJvcGFnYXRpb246IHRydWUsXG4gICAgd2hlZWxTcGVlZDogMSxcbiAgfSk7IH07XG5cbiAgdmFyIGhhbmRsZXJzID0ge1xuICAgICdjbGljay1yYWlsJzogY2xpY2tSYWlsLFxuICAgICdkcmFnLXRodW1iJzogZHJhZ1RodW1iLFxuICAgIGtleWJvYXJkOiBrZXlib2FyZCxcbiAgICB3aGVlbDogd2hlZWwsXG4gICAgdG91Y2g6IHRvdWNoLFxuICB9O1xuXG4gIHZhciBQZXJmZWN0U2Nyb2xsYmFyID0gZnVuY3Rpb24gUGVyZmVjdFNjcm9sbGJhcihlbGVtZW50LCB1c2VyU2V0dGluZ3MpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcbiAgICBpZiAoIHVzZXJTZXR0aW5ncyA9PT0gdm9pZCAwICkgdXNlclNldHRpbmdzID0ge307XG5cbiAgICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcbiAgICB9XG5cbiAgICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQubm9kZU5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbm8gZWxlbWVudCBpcyBzcGVjaWZpZWQgdG8gaW5pdGlhbGl6ZSBQZXJmZWN0U2Nyb2xsYmFyJyk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbHMubWFpbik7XG5cbiAgICB0aGlzLnNldHRpbmdzID0gZGVmYXVsdFNldHRpbmdzKCk7XG4gICAgZm9yICh2YXIga2V5IGluIHVzZXJTZXR0aW5ncykge1xuICAgICAgdGhpcy5zZXR0aW5nc1trZXldID0gdXNlclNldHRpbmdzW2tleV07XG4gICAgfVxuXG4gICAgdGhpcy5jb250YWluZXJXaWR0aCA9IG51bGw7XG4gICAgdGhpcy5jb250YWluZXJIZWlnaHQgPSBudWxsO1xuICAgIHRoaXMuY29udGVudFdpZHRoID0gbnVsbDtcbiAgICB0aGlzLmNvbnRlbnRIZWlnaHQgPSBudWxsO1xuXG4gICAgdmFyIGZvY3VzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNscy5zdGF0ZS5mb2N1cyk7IH07XG4gICAgdmFyIGJsdXIgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xzLnN0YXRlLmZvY3VzKTsgfTtcblxuICAgIHRoaXMuaXNSdGwgPSBnZXQoZWxlbWVudCkuZGlyZWN0aW9uID09PSAncnRsJztcbiAgICBpZiAodGhpcy5pc1J0bCA9PT0gdHJ1ZSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNscy5ydGwpO1xuICAgIH1cbiAgICB0aGlzLmlzTmVnYXRpdmVTY3JvbGwgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIG9yaWdpbmFsU2Nyb2xsTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ID0gLTE7XG4gICAgICByZXN1bHQgPSBlbGVtZW50LnNjcm9sbExlZnQgPCAwO1xuICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ID0gb3JpZ2luYWxTY3JvbGxMZWZ0O1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KSgpO1xuICAgIHRoaXMubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ID0gdGhpcy5pc05lZ2F0aXZlU2Nyb2xsXG4gICAgICA/IGVsZW1lbnQuc2Nyb2xsV2lkdGggLSBlbGVtZW50LmNsaWVudFdpZHRoXG4gICAgICA6IDA7XG4gICAgdGhpcy5ldmVudCA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgICB0aGlzLm93bmVyRG9jdW1lbnQgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgICB0aGlzLnNjcm9sbGJhclhSYWlsID0gZGl2KGNscy5lbGVtZW50LnJhaWwoJ3gnKSk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNjcm9sbGJhclhSYWlsKTtcbiAgICB0aGlzLnNjcm9sbGJhclggPSBkaXYoY2xzLmVsZW1lbnQudGh1bWIoJ3gnKSk7XG4gICAgdGhpcy5zY3JvbGxiYXJYUmFpbC5hcHBlbmRDaGlsZCh0aGlzLnNjcm9sbGJhclgpO1xuICAgIHRoaXMuc2Nyb2xsYmFyWC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgdGhpcy5ldmVudC5iaW5kKHRoaXMuc2Nyb2xsYmFyWCwgJ2ZvY3VzJywgZm9jdXMpO1xuICAgIHRoaXMuZXZlbnQuYmluZCh0aGlzLnNjcm9sbGJhclgsICdibHVyJywgYmx1cik7XG4gICAgdGhpcy5zY3JvbGxiYXJYQWN0aXZlID0gbnVsbDtcbiAgICB0aGlzLnNjcm9sbGJhclhXaWR0aCA9IG51bGw7XG4gICAgdGhpcy5zY3JvbGxiYXJYTGVmdCA9IG51bGw7XG4gICAgdmFyIHJhaWxYU3R5bGUgPSBnZXQodGhpcy5zY3JvbGxiYXJYUmFpbCk7XG4gICAgdGhpcy5zY3JvbGxiYXJYQm90dG9tID0gcGFyc2VJbnQocmFpbFhTdHlsZS5ib3R0b20sIDEwKTtcbiAgICBpZiAoaXNOYU4odGhpcy5zY3JvbGxiYXJYQm90dG9tKSkge1xuICAgICAgdGhpcy5pc1Njcm9sbGJhclhVc2luZ0JvdHRvbSA9IGZhbHNlO1xuICAgICAgdGhpcy5zY3JvbGxiYXJYVG9wID0gdG9JbnQocmFpbFhTdHlsZS50b3ApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzU2Nyb2xsYmFyWFVzaW5nQm90dG9tID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5yYWlsQm9yZGVyWFdpZHRoID1cbiAgICAgIHRvSW50KHJhaWxYU3R5bGUuYm9yZGVyTGVmdFdpZHRoKSArIHRvSW50KHJhaWxYU3R5bGUuYm9yZGVyUmlnaHRXaWR0aCk7XG4gICAgLy8gU2V0IHJhaWwgdG8gZGlzcGxheTpibG9jayB0byBjYWxjdWxhdGUgbWFyZ2luc1xuICAgIHNldCh0aGlzLnNjcm9sbGJhclhSYWlsLCB7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gICAgdGhpcy5yYWlsWE1hcmdpbldpZHRoID1cbiAgICAgIHRvSW50KHJhaWxYU3R5bGUubWFyZ2luTGVmdCkgKyB0b0ludChyYWlsWFN0eWxlLm1hcmdpblJpZ2h0KTtcbiAgICBzZXQodGhpcy5zY3JvbGxiYXJYUmFpbCwgeyBkaXNwbGF5OiAnJyB9KTtcbiAgICB0aGlzLnJhaWxYV2lkdGggPSBudWxsO1xuICAgIHRoaXMucmFpbFhSYXRpbyA9IG51bGw7XG5cbiAgICB0aGlzLnNjcm9sbGJhcllSYWlsID0gZGl2KGNscy5lbGVtZW50LnJhaWwoJ3knKSk7XG4gICAgZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLnNjcm9sbGJhcllSYWlsKTtcbiAgICB0aGlzLnNjcm9sbGJhclkgPSBkaXYoY2xzLmVsZW1lbnQudGh1bWIoJ3knKSk7XG4gICAgdGhpcy5zY3JvbGxiYXJZUmFpbC5hcHBlbmRDaGlsZCh0aGlzLnNjcm9sbGJhclkpO1xuICAgIHRoaXMuc2Nyb2xsYmFyWS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gICAgdGhpcy5ldmVudC5iaW5kKHRoaXMuc2Nyb2xsYmFyWSwgJ2ZvY3VzJywgZm9jdXMpO1xuICAgIHRoaXMuZXZlbnQuYmluZCh0aGlzLnNjcm9sbGJhclksICdibHVyJywgYmx1cik7XG4gICAgdGhpcy5zY3JvbGxiYXJZQWN0aXZlID0gbnVsbDtcbiAgICB0aGlzLnNjcm9sbGJhcllIZWlnaHQgPSBudWxsO1xuICAgIHRoaXMuc2Nyb2xsYmFyWVRvcCA9IG51bGw7XG4gICAgdmFyIHJhaWxZU3R5bGUgPSBnZXQodGhpcy5zY3JvbGxiYXJZUmFpbCk7XG4gICAgdGhpcy5zY3JvbGxiYXJZUmlnaHQgPSBwYXJzZUludChyYWlsWVN0eWxlLnJpZ2h0LCAxMCk7XG4gICAgaWYgKGlzTmFOKHRoaXMuc2Nyb2xsYmFyWVJpZ2h0KSkge1xuICAgICAgdGhpcy5pc1Njcm9sbGJhcllVc2luZ1JpZ2h0ID0gZmFsc2U7XG4gICAgICB0aGlzLnNjcm9sbGJhcllMZWZ0ID0gdG9JbnQocmFpbFlTdHlsZS5sZWZ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1Njcm9sbGJhcllVc2luZ1JpZ2h0ID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5zY3JvbGxiYXJZT3V0ZXJXaWR0aCA9IHRoaXMuaXNSdGwgPyBvdXRlcldpZHRoKHRoaXMuc2Nyb2xsYmFyWSkgOiBudWxsO1xuICAgIHRoaXMucmFpbEJvcmRlcllXaWR0aCA9XG4gICAgICB0b0ludChyYWlsWVN0eWxlLmJvcmRlclRvcFdpZHRoKSArIHRvSW50KHJhaWxZU3R5bGUuYm9yZGVyQm90dG9tV2lkdGgpO1xuICAgIHNldCh0aGlzLnNjcm9sbGJhcllSYWlsLCB7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gICAgdGhpcy5yYWlsWU1hcmdpbkhlaWdodCA9XG4gICAgICB0b0ludChyYWlsWVN0eWxlLm1hcmdpblRvcCkgKyB0b0ludChyYWlsWVN0eWxlLm1hcmdpbkJvdHRvbSk7XG4gICAgc2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwsIHsgZGlzcGxheTogJycgfSk7XG4gICAgdGhpcy5yYWlsWUhlaWdodCA9IG51bGw7XG4gICAgdGhpcy5yYWlsWVJhdGlvID0gbnVsbDtcblxuICAgIHRoaXMucmVhY2ggPSB7XG4gICAgICB4OlxuICAgICAgICBlbGVtZW50LnNjcm9sbExlZnQgPD0gMFxuICAgICAgICAgID8gJ3N0YXJ0J1xuICAgICAgICAgIDogZWxlbWVudC5zY3JvbGxMZWZ0ID49IHRoaXMuY29udGVudFdpZHRoIC0gdGhpcy5jb250YWluZXJXaWR0aFxuICAgICAgICAgID8gJ2VuZCdcbiAgICAgICAgICA6IG51bGwsXG4gICAgICB5OlxuICAgICAgICBlbGVtZW50LnNjcm9sbFRvcCA8PSAwXG4gICAgICAgICAgPyAnc3RhcnQnXG4gICAgICAgICAgOiBlbGVtZW50LnNjcm9sbFRvcCA+PSB0aGlzLmNvbnRlbnRIZWlnaHQgLSB0aGlzLmNvbnRhaW5lckhlaWdodFxuICAgICAgICAgID8gJ2VuZCdcbiAgICAgICAgICA6IG51bGwsXG4gICAgfTtcblxuICAgIHRoaXMuaXNBbGl2ZSA9IHRydWU7XG5cbiAgICB0aGlzLnNldHRpbmdzLmhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGhhbmRsZXJOYW1lKSB7IHJldHVybiBoYW5kbGVyc1toYW5kbGVyTmFtZV0odGhpcyQxKTsgfSk7XG5cbiAgICB0aGlzLmxhc3RTY3JvbGxUb3AgPSBNYXRoLmZsb29yKGVsZW1lbnQuc2Nyb2xsVG9wKTsgLy8gZm9yIG9uU2Nyb2xsIG9ubHlcbiAgICB0aGlzLmxhc3RTY3JvbGxMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0OyAvLyBmb3Igb25TY3JvbGwgb25seVxuICAgIHRoaXMuZXZlbnQuYmluZCh0aGlzLmVsZW1lbnQsICdzY3JvbGwnLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gdGhpcyQxLm9uU2Nyb2xsKGUpOyB9KTtcbiAgICB1cGRhdGVHZW9tZXRyeSh0aGlzKTtcbiAgfTtcblxuICBQZXJmZWN0U2Nyb2xsYmFyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKCkge1xuICAgIGlmICghdGhpcy5pc0FsaXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUmVjYWxjdWF0ZSBuZWdhdGl2ZSBzY3JvbGxMZWZ0IGFkanVzdG1lbnRcbiAgICB0aGlzLm5lZ2F0aXZlU2Nyb2xsQWRqdXN0bWVudCA9IHRoaXMuaXNOZWdhdGl2ZVNjcm9sbFxuICAgICAgPyB0aGlzLmVsZW1lbnQuc2Nyb2xsV2lkdGggLSB0aGlzLmVsZW1lbnQuY2xpZW50V2lkdGhcbiAgICAgIDogMDtcblxuICAgIC8vIFJlY2FsY3VsYXRlIHJhaWwgbWFyZ2luc1xuICAgIHNldCh0aGlzLnNjcm9sbGJhclhSYWlsLCB7IGRpc3BsYXk6ICdibG9jaycgfSk7XG4gICAgc2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwsIHsgZGlzcGxheTogJ2Jsb2NrJyB9KTtcbiAgICB0aGlzLnJhaWxYTWFyZ2luV2lkdGggPVxuICAgICAgdG9JbnQoZ2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwpLm1hcmdpbkxlZnQpICtcbiAgICAgIHRvSW50KGdldCh0aGlzLnNjcm9sbGJhclhSYWlsKS5tYXJnaW5SaWdodCk7XG4gICAgdGhpcy5yYWlsWU1hcmdpbkhlaWdodCA9XG4gICAgICB0b0ludChnZXQodGhpcy5zY3JvbGxiYXJZUmFpbCkubWFyZ2luVG9wKSArXG4gICAgICB0b0ludChnZXQodGhpcy5zY3JvbGxiYXJZUmFpbCkubWFyZ2luQm90dG9tKTtcblxuICAgIC8vIEhpZGUgc2Nyb2xsYmFycyBub3QgdG8gYWZmZWN0IHNjcm9sbFdpZHRoIGFuZCBzY3JvbGxIZWlnaHRcbiAgICBzZXQodGhpcy5zY3JvbGxiYXJYUmFpbCwgeyBkaXNwbGF5OiAnbm9uZScgfSk7XG4gICAgc2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwsIHsgZGlzcGxheTogJ25vbmUnIH0pO1xuXG4gICAgdXBkYXRlR2VvbWV0cnkodGhpcyk7XG5cbiAgICBwcm9jZXNzU2Nyb2xsRGlmZih0aGlzLCAndG9wJywgMCwgZmFsc2UsIHRydWUpO1xuICAgIHByb2Nlc3NTY3JvbGxEaWZmKHRoaXMsICdsZWZ0JywgMCwgZmFsc2UsIHRydWUpO1xuXG4gICAgc2V0KHRoaXMuc2Nyb2xsYmFyWFJhaWwsIHsgZGlzcGxheTogJycgfSk7XG4gICAgc2V0KHRoaXMuc2Nyb2xsYmFyWVJhaWwsIHsgZGlzcGxheTogJycgfSk7XG4gIH07XG5cbiAgUGVyZmVjdFNjcm9sbGJhci5wcm90b3R5cGUub25TY3JvbGwgPSBmdW5jdGlvbiBvblNjcm9sbCAoZSkge1xuICAgIGlmICghdGhpcy5pc0FsaXZlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdXBkYXRlR2VvbWV0cnkodGhpcyk7XG4gICAgcHJvY2Vzc1Njcm9sbERpZmYodGhpcywgJ3RvcCcsIHRoaXMuZWxlbWVudC5zY3JvbGxUb3AgLSB0aGlzLmxhc3RTY3JvbGxUb3ApO1xuICAgIHByb2Nlc3NTY3JvbGxEaWZmKFxuICAgICAgdGhpcyxcbiAgICAgICdsZWZ0JyxcbiAgICAgIHRoaXMuZWxlbWVudC5zY3JvbGxMZWZ0IC0gdGhpcy5sYXN0U2Nyb2xsTGVmdFxuICAgICk7XG5cbiAgICB0aGlzLmxhc3RTY3JvbGxUb3AgPSBNYXRoLmZsb29yKHRoaXMuZWxlbWVudC5zY3JvbGxUb3ApO1xuICAgIHRoaXMubGFzdFNjcm9sbExlZnQgPSB0aGlzLmVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgfTtcblxuICBQZXJmZWN0U2Nyb2xsYmFyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gICAgaWYgKCF0aGlzLmlzQWxpdmUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmV2ZW50LnVuYmluZEFsbCgpO1xuICAgIHJlbW92ZSh0aGlzLnNjcm9sbGJhclgpO1xuICAgIHJlbW92ZSh0aGlzLnNjcm9sbGJhclkpO1xuICAgIHJlbW92ZSh0aGlzLnNjcm9sbGJhclhSYWlsKTtcbiAgICByZW1vdmUodGhpcy5zY3JvbGxiYXJZUmFpbCk7XG4gICAgdGhpcy5yZW1vdmVQc0NsYXNzZXMoKTtcblxuICAgIC8vIHVuc2V0IGVsZW1lbnRzXG4gICAgdGhpcy5lbGVtZW50ID0gbnVsbDtcbiAgICB0aGlzLnNjcm9sbGJhclggPSBudWxsO1xuICAgIHRoaXMuc2Nyb2xsYmFyWSA9IG51bGw7XG4gICAgdGhpcy5zY3JvbGxiYXJYUmFpbCA9IG51bGw7XG4gICAgdGhpcy5zY3JvbGxiYXJZUmFpbCA9IG51bGw7XG5cbiAgICB0aGlzLmlzQWxpdmUgPSBmYWxzZTtcbiAgfTtcblxuICBQZXJmZWN0U2Nyb2xsYmFyLnByb3RvdHlwZS5yZW1vdmVQc0NsYXNzZXMgPSBmdW5jdGlvbiByZW1vdmVQc0NsYXNzZXMgKCkge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lXG4gICAgICAuc3BsaXQoJyAnKVxuICAgICAgLmZpbHRlcihmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gIW5hbWUubWF0Y2goL15wcyhbLV9dLit8KSQvKTsgfSlcbiAgICAgIC5qb2luKCcgJyk7XG4gIH07XG5cbiAgcmV0dXJuIFBlcmZlY3RTY3JvbGxiYXI7XG5cbn0pKSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wZXJmZWN0LXNjcm9sbGJhci5qcy5tYXBcbiJdLCJzb3VyY2VSb290IjoiIn0=
//# sourceURL=webpack-internal:///./node_modules/perfect-scrollbar/dist/perfect-scrollbar.js
`)}}));(function(n,e){for(var t in e)n[t]=e[t]})(window,function(n){var e={};function t(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return n[s].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=n,t.c=e,t.d=function(s,i,l){t.o(s,i)||Object.defineProperty(s,i,{enumerable:!0,get:l})},t.r=function(s){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(s,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(s,"__esModule",{value:!0})},t.t=function(s,i){if(i&1&&(s=t(s)),i&8||i&4&&typeof s=="object"&&s&&s.__esModule)return s;var l=Object.create(null);if(t.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:s}),i&2&&typeof s!="string")for(var o in s)t.d(l,o,(function(r){return s[r]}).bind(null,o));return l},t.n=function(s){var i=s&&s.__esModule?function(){return s.default}:function(){return s};return t.d(i,"a",i),i},t.o=function(s,i){return Object.prototype.hasOwnProperty.call(s,i)},t.p="",t(t.s="./js/menu.js")}({"./js/menu.js":function(module,__webpack_exports__,__webpack_require__){eval(`__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Menu", function() { return Menu; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var TRANSITION_EVENTS = ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd']; // const TRANSITION_PROPERTIES = ['transition', 'MozTransition', 'webkitTransition', 'WebkitTransition', 'OTransition']

var Menu = /*#__PURE__*/function () {
  function Menu(el) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _PS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Menu);

    this._el = el;
    this._animate = config.animate !== false;
    this._accordion = config.accordion !== false;
    this._closeChildren = Boolean(config.closeChildren);

    this._onOpen = config.onOpen || function () {};

    this._onOpened = config.onOpened || function () {};

    this._onClose = config.onClose || function () {};

    this._onClosed = config.onClosed || function () {};

    this._psScroll = null;
    this._topParent = null;
    this._menuBgClass = null;
    el.classList.add('menu');
    el.classList[this._animate ? 'remove' : 'add']('menu-no-animation'); // check

    el.classList.add('menu-vertical');
    var PerfectScrollbarLib = _PS || window.PerfectScrollbar;

    if (PerfectScrollbarLib) {
      this._scrollbar = new PerfectScrollbarLib(el.querySelector('.menu-inner'), {
        suppressScrollX: true,
        wheelPropagation: !Menu._hasClass('layout-menu-fixed layout-menu-fixed-offcanvas')
      });
      window.Helpers.menuPsScroll = this._scrollbar;
    } else {
      el.querySelector('.menu-inner').classList.add('overflow-auto');
    } // Add data attribute for bg color class of menu


    var menuClassList = el.classList;

    for (var i = 0; i < menuClassList.length; i++) {
      if (menuClassList[i].startsWith('bg-')) {
        this._menuBgClass = menuClassList[i];
      }
    }

    el.setAttribute('data-bg-class', this._menuBgClass);

    this._bindEvents(); // Link menu instance to element


    el.menuInstance = this;
  }

  _createClass(Menu, [{
    key: "_bindEvents",
    value: function _bindEvents() {
      var _this = this;

      // Click Event
      this._evntElClick = function (e) {
        // Find top parent element
        if (e.target.closest('ul') && e.target.closest('ul').classList.contains('menu-inner')) {
          var menuItem = Menu._findParent(e.target, 'menu-item', false); // eslint-disable-next-line prefer-destructuring


          if (menuItem) _this._topParent = menuItem.childNodes[0];
        }

        var toggleLink = e.target.classList.contains('menu-toggle') ? e.target : Menu._findParent(e.target, 'menu-toggle', false);

        if (toggleLink) {
          e.preventDefault();

          if (toggleLink.getAttribute('data-hover') !== 'true') {
            _this.toggle(toggleLink);
          }
        }
      };

      if (window.Helpers.isMobileDevice) this._el.addEventListener('click', this._evntElClick);

      this._evntWindowResize = function () {
        _this.update();

        if (_this._lastWidth !== window.innerWidth) {
          _this._lastWidth = window.innerWidth;

          _this.update();
        }

        var horizontalMenuTemplate = document.querySelector("[data-template^='horizontal-menu']");
        if (!_this._horizontal && !horizontalMenuTemplate) _this.manageScroll();
      };

      window.addEventListener('resize', this._evntWindowResize);
    }
  }, {
    key: "_unbindEvents",
    value: function _unbindEvents() {
      if (this._evntElClick) {
        this._el.removeEventListener('click', this._evntElClick);

        this._evntElClick = null;
      }

      if (this._evntElMouseOver) {
        this._el.removeEventListener('mouseover', this._evntElMouseOver);

        this._evntElMouseOver = null;
      }

      if (this._evntElMouseOut) {
        this._el.removeEventListener('mouseout', this._evntElMouseOut);

        this._evntElMouseOut = null;
      }

      if (this._evntWindowResize) {
        window.removeEventListener('resize', this._evntWindowResize);
        this._evntWindowResize = null;
      }

      if (this._evntBodyClick) {
        document.body.removeEventListener('click', this._evntBodyClick);
        this._evntBodyClick = null;
      }

      if (this._evntInnerMousemove) {
        this._inner.removeEventListener('mousemove', this._evntInnerMousemove);

        this._evntInnerMousemove = null;
      }

      if (this._evntInnerMouseleave) {
        this._inner.removeEventListener('mouseleave', this._evntInnerMouseleave);

        this._evntInnerMouseleave = null;
      }
    }
  }, {
    key: "open",
    value: function open(el) {
      var _this2 = this;

      var closeChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._closeChildren;

      var item = this._findUnopenedParent(Menu._getItem(el, true), closeChildren);

      if (!item) return;

      var toggleLink = Menu._getLink(item, true);

      Menu._promisify(this._onOpen, this, item, toggleLink, Menu._findMenu(item)).then(function () {
        if (!_this2._horizontal || !Menu._isRoot(item)) {
          if (_this2._animate && !_this2._horizontal) {
            window.requestAnimationFrame(function () {
              return _this2._toggleAnimation(true, item, false);
            });
            if (_this2._accordion) _this2._closeOther(item, closeChildren);
          } else if (_this2._animate) {
            // eslint-disable-next-line no-unused-expressions
            _this2._onOpened && _this2._onOpened(_this2, item, toggleLink, Menu._findMenu(item));
          } else {
            item.classList.add('open'); // eslint-disable-next-line no-unused-expressions

            _this2._onOpened && _this2._onOpened(_this2, item, toggleLink, Menu._findMenu(item));
            if (_this2._accordion) _this2._closeOther(item, closeChildren);
          }
        } else {
          // eslint-disable-next-line no-unused-expressions
          _this2._onOpened && _this2._onOpened(_this2, item, toggleLink, Menu._findMenu(item));
        }
      }).catch(function () {});
    }
  }, {
    key: "close",
    value: function close(el) {
      var _this3 = this;

      var closeChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._closeChildren;

      var _autoClose = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var item = Menu._getItem(el, true);

      var toggleLink = Menu._getLink(el, true);

      if (!item.classList.contains('open') || item.classList.contains('disabled')) return;

      Menu._promisify(this._onClose, this, item, toggleLink, Menu._findMenu(item), _autoClose).then(function () {
        if (!_this3._horizontal || !Menu._isRoot(item)) {
          if (_this3._animate && !_this3._horizontal) {
            window.requestAnimationFrame(function () {
              return _this3._toggleAnimation(false, item, closeChildren);
            });
          } else {
            item.classList.remove('open');

            if (closeChildren) {
              var opened = item.querySelectorAll('.menu-item.open');

              for (var i = 0, l = opened.length; i < l; i++) {
                opened[i].classList.remove('open');
              }
            } // eslint-disable-next-line no-unused-expressions


            _this3._onClosed && _this3._onClosed(_this3, item, toggleLink, Menu._findMenu(item));
          }
        } else {
          // eslint-disable-next-line no-unused-expressions
          _this3._onClosed && _this3._onClosed(_this3, item, toggleLink, Menu._findMenu(item));
        }
      }).catch(function () {});
    }
  }, {
    key: "_closeOther",
    value: function _closeOther(item, closeChildren) {
      var opened = Menu._findChild(item.parentNode, ['menu-item', 'open']);

      for (var i = 0, l = opened.length; i < l; i++) {
        if (opened[i] !== item) this.close(opened[i], closeChildren);
      }
    }
  }, {
    key: "toggle",
    value: function toggle(el) {
      var closeChildren = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._closeChildren;

      var item = Menu._getItem(el, true); // const toggleLink = Menu._getLink(el, true)


      if (item.classList.contains('open')) this.close(item, closeChildren);else this.open(item, closeChildren);
    }
  }, {
    key: "_findUnopenedParent",
    value: function _findUnopenedParent(item, closeChildren) {
      var tree = [];
      var parentItem = null;

      while (item) {
        if (item.classList.contains('disabled')) {
          parentItem = null;
          tree = [];
        } else {
          if (!item.classList.contains('open')) parentItem = item;
          tree.push(item);
        }

        item = Menu._findParent(item, 'menu-item', false);
      }

      if (!parentItem) return null;
      if (tree.length === 1) return parentItem;
      tree = tree.slice(0, tree.indexOf(parentItem));

      for (var i = 0, l = tree.length; i < l; i++) {
        tree[i].classList.add('open');

        if (this._accordion) {
          var openedItems = Menu._findChild(tree[i].parentNode, ['menu-item', 'open']);

          for (var j = 0, k = openedItems.length; j < k; j++) {
            if (openedItems[j] !== tree[i]) {
              openedItems[j].classList.remove('open');

              if (closeChildren) {
                var openedChildren = openedItems[j].querySelectorAll('.menu-item.open');

                for (var x = 0, z = openedChildren.length; x < z; x++) {
                  openedChildren[x].classList.remove('open');
                }
              }
            }
          }
        }
      }

      return parentItem;
    }
  }, {
    key: "_toggleAnimation",
    value: function _toggleAnimation(open, item, closeChildren) {
      var _this4 = this;

      var toggleLink = Menu._getLink(item, true);

      var menu = Menu._findMenu(item);

      Menu._unbindAnimationEndEvent(item);

      var linkHeight = Math.round(toggleLink.getBoundingClientRect().height);
      item.style.overflow = 'hidden';

      var clearItemStyle = function clearItemStyle() {
        item.classList.remove('menu-item-animating');
        item.classList.remove('menu-item-closing');
        item.style.overflow = null;
        item.style.height = null;

        _this4.update();
      };

      if (open) {
        item.style.height = "".concat(linkHeight, "px");
        item.classList.add('menu-item-animating');
        item.classList.add('open');

        Menu._bindAnimationEndEvent(item, function () {
          clearItemStyle();

          _this4._onOpened(_this4, item, toggleLink, menu);
        });

        setTimeout(function () {
          item.style.height = "".concat(linkHeight + Math.round(menu.getBoundingClientRect().height), "px");
        }, 50);
      } else {
        item.style.height = "".concat(linkHeight + Math.round(menu.getBoundingClientRect().height), "px");
        item.classList.add('menu-item-animating');
        item.classList.add('menu-item-closing');

        Menu._bindAnimationEndEvent(item, function () {
          item.classList.remove('open');
          clearItemStyle();

          if (closeChildren) {
            var opened = item.querySelectorAll('.menu-item.open');

            for (var i = 0, l = opened.length; i < l; i++) {
              opened[i].classList.remove('open');
            }
          }

          _this4._onClosed(_this4, item, toggleLink, menu);
        });

        setTimeout(function () {
          item.style.height = "".concat(linkHeight, "px");
        }, 50);
      }
    }
  }, {
    key: "_getItemOffset",
    value: function _getItemOffset(item) {
      var curItem = this._inner.childNodes[0];
      var left = 0;

      while (curItem !== item) {
        if (curItem.tagName) {
          left += Math.round(curItem.getBoundingClientRect().width);
        }

        curItem = curItem.nextSibling;
      }

      return left;
    }
  }, {
    key: "_innerWidth",
    get: function get() {
      var items = this._inner.childNodes;
      var width = 0;

      for (var i = 0, l = items.length; i < l; i++) {
        if (items[i].tagName) {
          width += Math.round(items[i].getBoundingClientRect().width);
        }
      }

      return width;
    }
  }, {
    key: "_innerPosition",
    get: function get() {
      return parseInt(this._inner.style[this._rtl ? 'marginRight' : 'marginLeft'] || '0px', 10);
    },
    set: function set(value) {
      this._inner.style[this._rtl ? 'marginRight' : 'marginLeft'] = "".concat(value, "px");
      return value;
    }
  }, {
    key: "closeAll",
    value: function closeAll() {
      var closeChildren = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._closeChildren;

      var opened = this._el.querySelectorAll('.menu-inner > .menu-item.open');

      for (var i = 0, l = opened.length; i < l; i++) {
        this.close(opened[i], closeChildren);
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this._scrollbar) {
        this._scrollbar.update();
      }
    }
  }, {
    key: "manageScroll",
    value: function manageScroll() {
      var _window = window,
          PerfectScrollbar = _window.PerfectScrollbar;
      var menuInner = document.querySelector('.menu-inner');

      if (window.innerWidth < window.Helpers.LAYOUT_BREAKPOINT) {
        if (this._scrollbar !== null) {
          // window.Helpers.menuPsScroll.destroy()
          this._scrollbar.destroy();

          this._scrollbar = null;
        }

        menuInner.classList.add('overflow-auto');
      } else {
        if (this._scrollbar === null) {
          var menuScroll = new PerfectScrollbar(document.querySelector('.menu-inner'), {
            suppressScrollX: true,
            wheelPropagation: false
          });
          this._scrollbar = menuScroll;
        }

        menuInner.classList.remove('overflow-auto');
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (!this._el) return;

      this._unbindEvents();

      var items = this._el.querySelectorAll('.menu-item');

      for (var i = 0, l = items.length; i < l; i++) {
        Menu._unbindAnimationEndEvent(items[i]);

        items[i].classList.remove('menu-item-animating');
        items[i].classList.remove('open');
        items[i].style.overflow = null;
        items[i].style.height = null;
      }

      var menus = this._el.querySelectorAll('.menu-menu');

      for (var i2 = 0, l2 = menus.length; i2 < l2; i2++) {
        menus[i2].style.marginRight = null;
        menus[i2].style.marginLeft = null;
      }

      this._el.classList.remove('menu-no-animation');

      if (this._wrapper) {
        this._prevBtn.parentNode.removeChild(this._prevBtn);

        this._nextBtn.parentNode.removeChild(this._nextBtn);

        this._wrapper.parentNode.insertBefore(this._inner, this._wrapper);

        this._wrapper.parentNode.removeChild(this._wrapper);

        this._inner.style.marginLeft = null;
        this._inner.style.marginRight = null;
      }

      this._el.menuInstance = null;
      delete this._el.menuInstance;
      this._el = null;
      this._animate = null;
      this._accordion = null;
      this._closeChildren = null;
      this._onOpen = null;
      this._onOpened = null;
      this._onClose = null;
      this._onClosed = null;

      if (this._scrollbar) {
        this._scrollbar.destroy();

        this._scrollbar = null;
      }

      this._inner = null;
      this._prevBtn = null;
      this._wrapper = null;
      this._nextBtn = null;
    }
  }], [{
    key: "childOf",
    value: function childOf(
    /* child node */
    c,
    /* parent node */
    p) {
      // returns boolean
      if (c.parentNode) {
        while ((c = c.parentNode) && c !== p) {
          ;
        }

        return !!c;
      }

      return false;
    }
  }, {
    key: "_isRoot",
    value: function _isRoot(item) {
      return !Menu._findParent(item, 'menu-item', false);
    }
  }, {
    key: "_findParent",
    value: function _findParent(el, cls) {
      var throwError = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      if (el.tagName.toUpperCase() === 'BODY') return null;
      el = el.parentNode;

      while (el.tagName.toUpperCase() !== 'BODY' && !el.classList.contains(cls)) {
        el = el.parentNode;
      }

      el = el.tagName.toUpperCase() !== 'BODY' ? el : null;
      if (!el && throwError) throw new Error("Cannot find \`.".concat(cls, "\` parent element"));
      return el;
    }
  }, {
    key: "_findChild",
    value: function _findChild(el, cls) {
      var items = el.childNodes;
      var found = [];

      for (var i = 0, l = items.length; i < l; i++) {
        if (items[i].classList) {
          var passed = 0;

          for (var j = 0; j < cls.length; j++) {
            if (items[i].classList.contains(cls[j])) passed += 1;
          }

          if (cls.length === passed) found.push(items[i]);
        }
      }

      return found;
    }
  }, {
    key: "_findMenu",
    value: function _findMenu(item) {
      var curEl = item.childNodes[0];
      var menu = null;

      while (curEl && !menu) {
        if (curEl.classList && curEl.classList.contains('menu-sub')) menu = curEl;
        curEl = curEl.nextSibling;
      }

      if (!menu) throw new Error('Cannot find \`.menu-sub\` element for the current \`.menu-toggle\`');
      return menu;
    } // Has class

  }, {
    key: "_hasClass",
    value: function _hasClass(cls) {
      var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.Helpers.ROOT_EL;
      var result = false;
      cls.split(' ').forEach(function (c) {
        if (el.classList.contains(c)) result = true;
      });
      return result;
    }
  }, {
    key: "_getItem",
    value: function _getItem(el, toggle) {
      var item = null;
      var selector = toggle ? 'menu-toggle' : 'menu-link';

      if (el.classList.contains('menu-item')) {
        if (Menu._findChild(el, [selector]).length) item = el;
      } else if (el.classList.contains(selector)) {
        item = el.parentNode.classList.contains('menu-item') ? el.parentNode : null;
      }

      if (!item) {
        throw new Error("".concat(toggle ? 'Toggable ' : '', "\`.menu-item\` element not found."));
      }

      return item;
    }
  }, {
    key: "_getLink",
    value: function _getLink(el, toggle) {
      var found = [];
      var selector = toggle ? 'menu-toggle' : 'menu-link';
      if (el.classList.contains(selector)) found = [el];else if (el.classList.contains('menu-item')) found = Menu._findChild(el, [selector]);
      if (!found.length) throw new Error("\`".concat(selector, "\` element not found."));
      return found[0];
    }
  }, {
    key: "_bindAnimationEndEvent",
    value: function _bindAnimationEndEvent(el, handler) {
      var cb = function cb(e) {
        if (e.target !== el) return;

        Menu._unbindAnimationEndEvent(el);

        handler(e);
      };

      var duration = window.getComputedStyle(el).transitionDuration;
      duration = parseFloat(duration) * (duration.indexOf('ms') !== -1 ? 1 : 1000);
      el._menuAnimationEndEventCb = cb;
      TRANSITION_EVENTS.forEach(function (ev) {
        return el.addEventListener(ev, el._menuAnimationEndEventCb, false);
      });
      el._menuAnimationEndEventTimeout = setTimeout(function () {
        cb({
          target: el
        });
      }, duration + 50);
    }
  }, {
    key: "_promisify",
    value: function _promisify(fn) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var result = fn.apply(void 0, args);

      if (result instanceof Promise) {
        return result;
      }

      if (result === false) {
        return Promise.reject();
      }

      return Promise.resolve();
    }
  }, {
    key: "_unbindAnimationEndEvent",
    value: function _unbindAnimationEndEvent(el) {
      var cb = el._menuAnimationEndEventCb;

      if (el._menuAnimationEndEventTimeout) {
        clearTimeout(el._menuAnimationEndEventTimeout);
        el._menuAnimationEndEventTimeout = null;
      }

      if (!cb) return;
      TRANSITION_EVENTS.forEach(function (ev) {
        return el.removeEventListener(ev, cb, false);
      });
      el._menuAnimationEndEventCb = null;
    }
  }, {
    key: "setDisabled",
    value: function setDisabled(el, disabled) {
      Menu._getItem(el, false).classList[disabled ? 'add' : 'remove']('disabled');
    }
  }, {
    key: "isActive",
    value: function isActive(el) {
      return Menu._getItem(el, false).classList.contains('active');
    }
  }, {
    key: "isOpened",
    value: function isOpened(el) {
      return Menu._getItem(el, false).classList.contains('open');
    }
  }, {
    key: "isDisabled",
    value: function isDisabled(el) {
      return Menu._getItem(el, false).classList.contains('disabled');
    }
  }]);

  return Menu;
}();

//# sourceURL=[module]
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9tZW51LmpzPzg3N2UiXSwibmFtZXMiOlsiVFJBTlNJVElPTl9FVkVOVFMiLCJNZW51IiwiZWwiLCJjb25maWciLCJfUFMiLCJfZWwiLCJfYW5pbWF0ZSIsImFuaW1hdGUiLCJfYWNjb3JkaW9uIiwiYWNjb3JkaW9uIiwiX2Nsb3NlQ2hpbGRyZW4iLCJCb29sZWFuIiwiY2xvc2VDaGlsZHJlbiIsIl9vbk9wZW4iLCJvbk9wZW4iLCJfb25PcGVuZWQiLCJvbk9wZW5lZCIsIl9vbkNsb3NlIiwib25DbG9zZSIsIl9vbkNsb3NlZCIsIm9uQ2xvc2VkIiwiX3BzU2Nyb2xsIiwiX3RvcFBhcmVudCIsIl9tZW51QmdDbGFzcyIsImNsYXNzTGlzdCIsImFkZCIsIlBlcmZlY3RTY3JvbGxiYXJMaWIiLCJ3aW5kb3ciLCJQZXJmZWN0U2Nyb2xsYmFyIiwiX3Njcm9sbGJhciIsInF1ZXJ5U2VsZWN0b3IiLCJzdXBwcmVzc1Njcm9sbFgiLCJ3aGVlbFByb3BhZ2F0aW9uIiwiX2hhc0NsYXNzIiwiSGVscGVycyIsIm1lbnVQc1Njcm9sbCIsIm1lbnVDbGFzc0xpc3QiLCJpIiwibGVuZ3RoIiwic3RhcnRzV2l0aCIsInNldEF0dHJpYnV0ZSIsIl9iaW5kRXZlbnRzIiwibWVudUluc3RhbmNlIiwiX2V2bnRFbENsaWNrIiwiZSIsInRhcmdldCIsImNsb3Nlc3QiLCJjb250YWlucyIsIm1lbnVJdGVtIiwiX2ZpbmRQYXJlbnQiLCJjaGlsZE5vZGVzIiwidG9nZ2xlTGluayIsInByZXZlbnREZWZhdWx0IiwiZ2V0QXR0cmlidXRlIiwidG9nZ2xlIiwiaXNNb2JpbGVEZXZpY2UiLCJhZGRFdmVudExpc3RlbmVyIiwiX2V2bnRXaW5kb3dSZXNpemUiLCJ1cGRhdGUiLCJfbGFzdFdpZHRoIiwiaW5uZXJXaWR0aCIsImhvcml6b250YWxNZW51VGVtcGxhdGUiLCJkb2N1bWVudCIsIl9ob3Jpem9udGFsIiwibWFuYWdlU2Nyb2xsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIl9ldm50RWxNb3VzZU92ZXIiLCJfZXZudEVsTW91c2VPdXQiLCJfZXZudEJvZHlDbGljayIsImJvZHkiLCJfZXZudElubmVyTW91c2Vtb3ZlIiwiX2lubmVyIiwiX2V2bnRJbm5lck1vdXNlbGVhdmUiLCJpdGVtIiwiX2ZpbmRVbm9wZW5lZFBhcmVudCIsIl9nZXRJdGVtIiwiX2dldExpbmsiLCJfcHJvbWlzaWZ5IiwiX2ZpbmRNZW51IiwidGhlbiIsIl9pc1Jvb3QiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJfdG9nZ2xlQW5pbWF0aW9uIiwiX2Nsb3NlT3RoZXIiLCJjYXRjaCIsIl9hdXRvQ2xvc2UiLCJyZW1vdmUiLCJvcGVuZWQiLCJxdWVyeVNlbGVjdG9yQWxsIiwibCIsIl9maW5kQ2hpbGQiLCJwYXJlbnROb2RlIiwiY2xvc2UiLCJvcGVuIiwidHJlZSIsInBhcmVudEl0ZW0iLCJwdXNoIiwic2xpY2UiLCJpbmRleE9mIiwib3BlbmVkSXRlbXMiLCJqIiwiayIsIm9wZW5lZENoaWxkcmVuIiwieCIsInoiLCJtZW51IiwiX3VuYmluZEFuaW1hdGlvbkVuZEV2ZW50IiwibGlua0hlaWdodCIsIk1hdGgiLCJyb3VuZCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImhlaWdodCIsInN0eWxlIiwib3ZlcmZsb3ciLCJjbGVhckl0ZW1TdHlsZSIsIl9iaW5kQW5pbWF0aW9uRW5kRXZlbnQiLCJzZXRUaW1lb3V0IiwiY3VySXRlbSIsImxlZnQiLCJ0YWdOYW1lIiwid2lkdGgiLCJuZXh0U2libGluZyIsIml0ZW1zIiwicGFyc2VJbnQiLCJfcnRsIiwidmFsdWUiLCJtZW51SW5uZXIiLCJMQVlPVVRfQlJFQUtQT0lOVCIsImRlc3Ryb3kiLCJtZW51U2Nyb2xsIiwiX3VuYmluZEV2ZW50cyIsIm1lbnVzIiwiaTIiLCJsMiIsIm1hcmdpblJpZ2h0IiwibWFyZ2luTGVmdCIsIl93cmFwcGVyIiwiX3ByZXZCdG4iLCJyZW1vdmVDaGlsZCIsIl9uZXh0QnRuIiwiaW5zZXJ0QmVmb3JlIiwiYyIsInAiLCJjbHMiLCJ0aHJvd0Vycm9yIiwidG9VcHBlckNhc2UiLCJFcnJvciIsImZvdW5kIiwicGFzc2VkIiwiY3VyRWwiLCJST09UX0VMIiwicmVzdWx0Iiwic3BsaXQiLCJmb3JFYWNoIiwic2VsZWN0b3IiLCJoYW5kbGVyIiwiY2IiLCJkdXJhdGlvbiIsImdldENvbXB1dGVkU3R5bGUiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJwYXJzZUZsb2F0IiwiX21lbnVBbmltYXRpb25FbmRFdmVudENiIiwiZXYiLCJfbWVudUFuaW1hdGlvbkVuZEV2ZW50VGltZW91dCIsImZuIiwiYXJncyIsIlByb21pc2UiLCJyZWplY3QiLCJyZXNvbHZlIiwiY2xlYXJUaW1lb3V0IiwiZGlzYWJsZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsSUFBTUEsaUJBQWlCLEdBQUcsQ0FBQyxlQUFELEVBQWtCLHFCQUFsQixFQUF5QyxnQkFBekMsQ0FBMUIsQyxDQUNBOztJQUVNQyxJO0FBQ0osZ0JBQVlDLEVBQVosRUFBeUM7QUFBQSxRQUF6QkMsTUFBeUIsdUVBQWhCLEVBQWdCOztBQUFBLFFBQVpDLEdBQVksdUVBQU4sSUFBTTs7QUFBQTs7QUFDdkMsU0FBS0MsR0FBTCxHQUFXSCxFQUFYO0FBQ0EsU0FBS0ksUUFBTCxHQUFnQkgsTUFBTSxDQUFDSSxPQUFQLEtBQW1CLEtBQW5DO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkwsTUFBTSxDQUFDTSxTQUFQLEtBQXFCLEtBQXZDO0FBQ0EsU0FBS0MsY0FBTCxHQUFzQkMsT0FBTyxDQUFDUixNQUFNLENBQUNTLGFBQVIsQ0FBN0I7O0FBRUEsU0FBS0MsT0FBTCxHQUFlVixNQUFNLENBQUNXLE1BQVAsSUFBa0IsWUFBTSxDQUFFLENBQXpDOztBQUNBLFNBQUtDLFNBQUwsR0FBaUJaLE1BQU0sQ0FBQ2EsUUFBUCxJQUFvQixZQUFNLENBQUUsQ0FBN0M7O0FBQ0EsU0FBS0MsUUFBTCxHQUFnQmQsTUFBTSxDQUFDZSxPQUFQLElBQW1CLFlBQU0sQ0FBRSxDQUEzQzs7QUFDQSxTQUFLQyxTQUFMLEdBQWlCaEIsTUFBTSxDQUFDaUIsUUFBUCxJQUFvQixZQUFNLENBQUUsQ0FBN0M7O0FBRUEsU0FBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CLElBQXBCO0FBRUFyQixNQUFFLENBQUNzQixTQUFILENBQWFDLEdBQWIsQ0FBaUIsTUFBakI7QUFDQXZCLE1BQUUsQ0FBQ3NCLFNBQUgsQ0FBYSxLQUFLbEIsUUFBTCxHQUFnQixRQUFoQixHQUEyQixLQUF4QyxFQUErQyxtQkFBL0MsRUFoQnVDLENBZ0I2Qjs7QUFFcEVKLE1BQUUsQ0FBQ3NCLFNBQUgsQ0FBYUMsR0FBYixDQUFpQixlQUFqQjtBQUVBLFFBQU1DLG1CQUFtQixHQUFHdEIsR0FBRyxJQUFJdUIsTUFBTSxDQUFDQyxnQkFBMUM7O0FBRUEsUUFBSUYsbUJBQUosRUFBeUI7QUFDdkIsV0FBS0csVUFBTCxHQUFrQixJQUFJSCxtQkFBSixDQUF3QnhCLEVBQUUsQ0FBQzRCLGFBQUgsQ0FBaUIsYUFBakIsQ0FBeEIsRUFBeUQ7QUFDekVDLHVCQUFlLEVBQUUsSUFEd0Q7QUFFekVDLHdCQUFnQixFQUFFLENBQUMvQixJQUFJLENBQUNnQyxTQUFMLENBQWUsK0NBQWY7QUFGc0QsT0FBekQsQ0FBbEI7QUFLQU4sWUFBTSxDQUFDTyxPQUFQLENBQWVDLFlBQWYsR0FBOEIsS0FBS04sVUFBbkM7QUFDRCxLQVBELE1BT087QUFDTDNCLFFBQUUsQ0FBQzRCLGFBQUgsQ0FBaUIsYUFBakIsRUFBZ0NOLFNBQWhDLENBQTBDQyxHQUExQyxDQUE4QyxlQUE5QztBQUNELEtBL0JzQyxDQWlDdkM7OztBQUNBLFFBQU1XLGFBQWEsR0FBR2xDLEVBQUUsQ0FBQ3NCLFNBQXpCOztBQUVBLFNBQUssSUFBSWEsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0QsYUFBYSxDQUFDRSxNQUFsQyxFQUEwQ0QsQ0FBQyxFQUEzQyxFQUErQztBQUM3QyxVQUFJRCxhQUFhLENBQUNDLENBQUQsQ0FBYixDQUFpQkUsVUFBakIsQ0FBNEIsS0FBNUIsQ0FBSixFQUF3QztBQUN0QyxhQUFLaEIsWUFBTCxHQUFvQmEsYUFBYSxDQUFDQyxDQUFELENBQWpDO0FBQ0Q7QUFDRjs7QUFDRG5DLE1BQUUsQ0FBQ3NDLFlBQUgsQ0FBZ0IsZUFBaEIsRUFBaUMsS0FBS2pCLFlBQXRDOztBQUVBLFNBQUtrQixXQUFMLEdBM0N1QyxDQTZDdkM7OztBQUNBdkMsTUFBRSxDQUFDd0MsWUFBSCxHQUFrQixJQUFsQjtBQUNEOzs7O1dBRUQsdUJBQWM7QUFBQTs7QUFDWjtBQUNBLFdBQUtDLFlBQUwsR0FBb0IsVUFBQUMsQ0FBQyxFQUFJO0FBQ3ZCO0FBQ0EsWUFBSUEsQ0FBQyxDQUFDQyxNQUFGLENBQVNDLE9BQVQsQ0FBaUIsSUFBakIsS0FBMEJGLENBQUMsQ0FBQ0MsTUFBRixDQUFTQyxPQUFULENBQWlCLElBQWpCLEVBQXVCdEIsU0FBdkIsQ0FBaUN1QixRQUFqQyxDQUEwQyxZQUExQyxDQUE5QixFQUF1RjtBQUNyRixjQUFNQyxRQUFRLEdBQUcvQyxJQUFJLENBQUNnRCxXQUFMLENBQWlCTCxDQUFDLENBQUNDLE1BQW5CLEVBQTJCLFdBQTNCLEVBQXdDLEtBQXhDLENBQWpCLENBRHFGLENBR3JGOzs7QUFDQSxjQUFJRyxRQUFKLEVBQWMsS0FBSSxDQUFDMUIsVUFBTCxHQUFrQjBCLFFBQVEsQ0FBQ0UsVUFBVCxDQUFvQixDQUFwQixDQUFsQjtBQUNmOztBQUVELFlBQU1DLFVBQVUsR0FBR1AsQ0FBQyxDQUFDQyxNQUFGLENBQVNyQixTQUFULENBQW1CdUIsUUFBbkIsQ0FBNEIsYUFBNUIsSUFDZkgsQ0FBQyxDQUFDQyxNQURhLEdBRWY1QyxJQUFJLENBQUNnRCxXQUFMLENBQWlCTCxDQUFDLENBQUNDLE1BQW5CLEVBQTJCLGFBQTNCLEVBQTBDLEtBQTFDLENBRko7O0FBSUEsWUFBSU0sVUFBSixFQUFnQjtBQUNkUCxXQUFDLENBQUNRLGNBQUY7O0FBRUEsY0FBSUQsVUFBVSxDQUFDRSxZQUFYLENBQXdCLFlBQXhCLE1BQTBDLE1BQTlDLEVBQXNEO0FBQ3BELGlCQUFJLENBQUNDLE1BQUwsQ0FBWUgsVUFBWjtBQUNEO0FBQ0Y7QUFDRixPQXBCRDs7QUFxQkEsVUFBSXhCLE1BQU0sQ0FBQ08sT0FBUCxDQUFlcUIsY0FBbkIsRUFBbUMsS0FBS2xELEdBQUwsQ0FBU21ELGdCQUFULENBQTBCLE9BQTFCLEVBQW1DLEtBQUtiLFlBQXhDOztBQUVuQyxXQUFLYyxpQkFBTCxHQUF5QixZQUFNO0FBQzdCLGFBQUksQ0FBQ0MsTUFBTDs7QUFDQSxZQUFJLEtBQUksQ0FBQ0MsVUFBTCxLQUFvQmhDLE1BQU0sQ0FBQ2lDLFVBQS9CLEVBQTJDO0FBQ3pDLGVBQUksQ0FBQ0QsVUFBTCxHQUFrQmhDLE1BQU0sQ0FBQ2lDLFVBQXpCOztBQUNBLGVBQUksQ0FBQ0YsTUFBTDtBQUNEOztBQUVELFlBQU1HLHNCQUFzQixHQUFHQyxRQUFRLENBQUNoQyxhQUFULENBQXVCLG9DQUF2QixDQUEvQjtBQUNBLFlBQUksQ0FBQyxLQUFJLENBQUNpQyxXQUFOLElBQXFCLENBQUNGLHNCQUExQixFQUFrRCxLQUFJLENBQUNHLFlBQUw7QUFDbkQsT0FURDs7QUFVQXJDLFlBQU0sQ0FBQzZCLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLEtBQUtDLGlCQUF2QztBQUNEOzs7V0FXRCx5QkFBZ0I7QUFDZCxVQUFJLEtBQUtkLFlBQVQsRUFBdUI7QUFDckIsYUFBS3RDLEdBQUwsQ0FBUzRELG1CQUFULENBQTZCLE9BQTdCLEVBQXNDLEtBQUt0QixZQUEzQzs7QUFDQSxhQUFLQSxZQUFMLEdBQW9CLElBQXBCO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLdUIsZ0JBQVQsRUFBMkI7QUFDekIsYUFBSzdELEdBQUwsQ0FBUzRELG1CQUFULENBQTZCLFdBQTdCLEVBQTBDLEtBQUtDLGdCQUEvQzs7QUFDQSxhQUFLQSxnQkFBTCxHQUF3QixJQUF4QjtBQUNEOztBQUVELFVBQUksS0FBS0MsZUFBVCxFQUEwQjtBQUN4QixhQUFLOUQsR0FBTCxDQUFTNEQsbUJBQVQsQ0FBNkIsVUFBN0IsRUFBeUMsS0FBS0UsZUFBOUM7O0FBQ0EsYUFBS0EsZUFBTCxHQUF1QixJQUF2QjtBQUNEOztBQUVELFVBQUksS0FBS1YsaUJBQVQsRUFBNEI7QUFDMUI5QixjQUFNLENBQUNzQyxtQkFBUCxDQUEyQixRQUEzQixFQUFxQyxLQUFLUixpQkFBMUM7QUFDQSxhQUFLQSxpQkFBTCxHQUF5QixJQUF6QjtBQUNEOztBQUVELFVBQUksS0FBS1csY0FBVCxFQUF5QjtBQUN2Qk4sZ0JBQVEsQ0FBQ08sSUFBVCxDQUFjSixtQkFBZCxDQUFrQyxPQUFsQyxFQUEyQyxLQUFLRyxjQUFoRDtBQUNBLGFBQUtBLGNBQUwsR0FBc0IsSUFBdEI7QUFDRDs7QUFFRCxVQUFJLEtBQUtFLG1CQUFULEVBQThCO0FBQzVCLGFBQUtDLE1BQUwsQ0FBWU4sbUJBQVosQ0FBZ0MsV0FBaEMsRUFBNkMsS0FBS0ssbUJBQWxEOztBQUNBLGFBQUtBLG1CQUFMLEdBQTJCLElBQTNCO0FBQ0Q7O0FBRUQsVUFBSSxLQUFLRSxvQkFBVCxFQUErQjtBQUM3QixhQUFLRCxNQUFMLENBQVlOLG1CQUFaLENBQWdDLFlBQWhDLEVBQThDLEtBQUtPLG9CQUFuRDs7QUFDQSxhQUFLQSxvQkFBTCxHQUE0QixJQUE1QjtBQUNEO0FBQ0Y7OztXQWdFRCxjQUFLdEUsRUFBTCxFQUE4QztBQUFBOztBQUFBLFVBQXJDVSxhQUFxQyx1RUFBckIsS0FBS0YsY0FBZ0I7O0FBQzVDLFVBQU0rRCxJQUFJLEdBQUcsS0FBS0MsbUJBQUwsQ0FBeUJ6RSxJQUFJLENBQUMwRSxRQUFMLENBQWN6RSxFQUFkLEVBQWtCLElBQWxCLENBQXpCLEVBQWtEVSxhQUFsRCxDQUFiOztBQUVBLFVBQUksQ0FBQzZELElBQUwsRUFBVzs7QUFFWCxVQUFNdEIsVUFBVSxHQUFHbEQsSUFBSSxDQUFDMkUsUUFBTCxDQUFjSCxJQUFkLEVBQW9CLElBQXBCLENBQW5COztBQUVBeEUsVUFBSSxDQUFDNEUsVUFBTCxDQUFnQixLQUFLaEUsT0FBckIsRUFBOEIsSUFBOUIsRUFBb0M0RCxJQUFwQyxFQUEwQ3RCLFVBQTFDLEVBQXNEbEQsSUFBSSxDQUFDNkUsU0FBTCxDQUFlTCxJQUFmLENBQXRELEVBQ0dNLElBREgsQ0FDUSxZQUFNO0FBQ1YsWUFBSSxDQUFDLE1BQUksQ0FBQ2hCLFdBQU4sSUFBcUIsQ0FBQzlELElBQUksQ0FBQytFLE9BQUwsQ0FBYVAsSUFBYixDQUExQixFQUE4QztBQUM1QyxjQUFJLE1BQUksQ0FBQ25FLFFBQUwsSUFBaUIsQ0FBQyxNQUFJLENBQUN5RCxXQUEzQixFQUF3QztBQUN0Q3BDLGtCQUFNLENBQUNzRCxxQkFBUCxDQUE2QjtBQUFBLHFCQUFNLE1BQUksQ0FBQ0MsZ0JBQUwsQ0FBc0IsSUFBdEIsRUFBNEJULElBQTVCLEVBQWtDLEtBQWxDLENBQU47QUFBQSxhQUE3QjtBQUNBLGdCQUFJLE1BQUksQ0FBQ2pFLFVBQVQsRUFBcUIsTUFBSSxDQUFDMkUsV0FBTCxDQUFpQlYsSUFBakIsRUFBdUI3RCxhQUF2QjtBQUN0QixXQUhELE1BR08sSUFBSSxNQUFJLENBQUNOLFFBQVQsRUFBbUI7QUFDeEI7QUFDQSxrQkFBSSxDQUFDUyxTQUFMLElBQWtCLE1BQUksQ0FBQ0EsU0FBTCxDQUFlLE1BQWYsRUFBcUIwRCxJQUFyQixFQUEyQnRCLFVBQTNCLEVBQXVDbEQsSUFBSSxDQUFDNkUsU0FBTCxDQUFlTCxJQUFmLENBQXZDLENBQWxCO0FBQ0QsV0FITSxNQUdBO0FBQ0xBLGdCQUFJLENBQUNqRCxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsTUFBbkIsRUFESyxDQUVMOztBQUNBLGtCQUFJLENBQUNWLFNBQUwsSUFBa0IsTUFBSSxDQUFDQSxTQUFMLENBQWUsTUFBZixFQUFxQjBELElBQXJCLEVBQTJCdEIsVUFBM0IsRUFBdUNsRCxJQUFJLENBQUM2RSxTQUFMLENBQWVMLElBQWYsQ0FBdkMsQ0FBbEI7QUFDQSxnQkFBSSxNQUFJLENBQUNqRSxVQUFULEVBQXFCLE1BQUksQ0FBQzJFLFdBQUwsQ0FBaUJWLElBQWpCLEVBQXVCN0QsYUFBdkI7QUFDdEI7QUFDRixTQWJELE1BYU87QUFDTDtBQUNBLGdCQUFJLENBQUNHLFNBQUwsSUFBa0IsTUFBSSxDQUFDQSxTQUFMLENBQWUsTUFBZixFQUFxQjBELElBQXJCLEVBQTJCdEIsVUFBM0IsRUFBdUNsRCxJQUFJLENBQUM2RSxTQUFMLENBQWVMLElBQWYsQ0FBdkMsQ0FBbEI7QUFDRDtBQUNGLE9BbkJILEVBb0JHVyxLQXBCSCxDQW9CUyxZQUFNLENBQUUsQ0FwQmpCO0FBcUJEOzs7V0FFRCxlQUFNbEYsRUFBTixFQUFtRTtBQUFBOztBQUFBLFVBQXpEVSxhQUF5RCx1RUFBekMsS0FBS0YsY0FBb0M7O0FBQUEsVUFBcEIyRSxVQUFvQix1RUFBUCxLQUFPOztBQUNqRSxVQUFNWixJQUFJLEdBQUd4RSxJQUFJLENBQUMwRSxRQUFMLENBQWN6RSxFQUFkLEVBQWtCLElBQWxCLENBQWI7O0FBQ0EsVUFBTWlELFVBQVUsR0FBR2xELElBQUksQ0FBQzJFLFFBQUwsQ0FBYzFFLEVBQWQsRUFBa0IsSUFBbEIsQ0FBbkI7O0FBRUEsVUFBSSxDQUFDdUUsSUFBSSxDQUFDakQsU0FBTCxDQUFldUIsUUFBZixDQUF3QixNQUF4QixDQUFELElBQW9DMEIsSUFBSSxDQUFDakQsU0FBTCxDQUFldUIsUUFBZixDQUF3QixVQUF4QixDQUF4QyxFQUE2RTs7QUFFN0U5QyxVQUFJLENBQUM0RSxVQUFMLENBQWdCLEtBQUs1RCxRQUFyQixFQUErQixJQUEvQixFQUFxQ3dELElBQXJDLEVBQTJDdEIsVUFBM0MsRUFBdURsRCxJQUFJLENBQUM2RSxTQUFMLENBQWVMLElBQWYsQ0FBdkQsRUFBNkVZLFVBQTdFLEVBQ0dOLElBREgsQ0FDUSxZQUFNO0FBQ1YsWUFBSSxDQUFDLE1BQUksQ0FBQ2hCLFdBQU4sSUFBcUIsQ0FBQzlELElBQUksQ0FBQytFLE9BQUwsQ0FBYVAsSUFBYixDQUExQixFQUE4QztBQUM1QyxjQUFJLE1BQUksQ0FBQ25FLFFBQUwsSUFBaUIsQ0FBQyxNQUFJLENBQUN5RCxXQUEzQixFQUF3QztBQUN0Q3BDLGtCQUFNLENBQUNzRCxxQkFBUCxDQUE2QjtBQUFBLHFCQUFNLE1BQUksQ0FBQ0MsZ0JBQUwsQ0FBc0IsS0FBdEIsRUFBNkJULElBQTdCLEVBQW1DN0QsYUFBbkMsQ0FBTjtBQUFBLGFBQTdCO0FBQ0QsV0FGRCxNQUVPO0FBQ0w2RCxnQkFBSSxDQUFDakQsU0FBTCxDQUFlOEQsTUFBZixDQUFzQixNQUF0Qjs7QUFFQSxnQkFBSTFFLGFBQUosRUFBbUI7QUFDakIsa0JBQU0yRSxNQUFNLEdBQUdkLElBQUksQ0FBQ2UsZ0JBQUwsQ0FBc0IsaUJBQXRCLENBQWY7O0FBQ0EsbUJBQUssSUFBSW5ELENBQUMsR0FBRyxDQUFSLEVBQVdvRCxDQUFDLEdBQUdGLE1BQU0sQ0FBQ2pELE1BQTNCLEVBQW1DRCxDQUFDLEdBQUdvRCxDQUF2QyxFQUEwQ3BELENBQUMsRUFBM0M7QUFBK0NrRCxzQkFBTSxDQUFDbEQsQ0FBRCxDQUFOLENBQVViLFNBQVYsQ0FBb0I4RCxNQUFwQixDQUEyQixNQUEzQjtBQUEvQztBQUNELGFBTkksQ0FRTDs7O0FBQ0Esa0JBQUksQ0FBQ25FLFNBQUwsSUFBa0IsTUFBSSxDQUFDQSxTQUFMLENBQWUsTUFBZixFQUFxQnNELElBQXJCLEVBQTJCdEIsVUFBM0IsRUFBdUNsRCxJQUFJLENBQUM2RSxTQUFMLENBQWVMLElBQWYsQ0FBdkMsQ0FBbEI7QUFDRDtBQUNGLFNBZEQsTUFjTztBQUNMO0FBQ0EsZ0JBQUksQ0FBQ3RELFNBQUwsSUFBa0IsTUFBSSxDQUFDQSxTQUFMLENBQWUsTUFBZixFQUFxQnNELElBQXJCLEVBQTJCdEIsVUFBM0IsRUFBdUNsRCxJQUFJLENBQUM2RSxTQUFMLENBQWVMLElBQWYsQ0FBdkMsQ0FBbEI7QUFDRDtBQUNGLE9BcEJILEVBcUJHVyxLQXJCSCxDQXFCUyxZQUFNLENBQUUsQ0FyQmpCO0FBc0JEOzs7V0FFRCxxQkFBWVgsSUFBWixFQUFrQjdELGFBQWxCLEVBQWlDO0FBQy9CLFVBQU0yRSxNQUFNLEdBQUd0RixJQUFJLENBQUN5RixVQUFMLENBQWdCakIsSUFBSSxDQUFDa0IsVUFBckIsRUFBaUMsQ0FBQyxXQUFELEVBQWMsTUFBZCxDQUFqQyxDQUFmOztBQUVBLFdBQUssSUFBSXRELENBQUMsR0FBRyxDQUFSLEVBQVdvRCxDQUFDLEdBQUdGLE1BQU0sQ0FBQ2pELE1BQTNCLEVBQW1DRCxDQUFDLEdBQUdvRCxDQUF2QyxFQUEwQ3BELENBQUMsRUFBM0MsRUFBK0M7QUFDN0MsWUFBSWtELE1BQU0sQ0FBQ2xELENBQUQsQ0FBTixLQUFjb0MsSUFBbEIsRUFBd0IsS0FBS21CLEtBQUwsQ0FBV0wsTUFBTSxDQUFDbEQsQ0FBRCxDQUFqQixFQUFzQnpCLGFBQXRCO0FBQ3pCO0FBQ0Y7OztXQUVELGdCQUFPVixFQUFQLEVBQWdEO0FBQUEsVUFBckNVLGFBQXFDLHVFQUFyQixLQUFLRixjQUFnQjs7QUFDOUMsVUFBTStELElBQUksR0FBR3hFLElBQUksQ0FBQzBFLFFBQUwsQ0FBY3pFLEVBQWQsRUFBa0IsSUFBbEIsQ0FBYixDQUQ4QyxDQUU5Qzs7O0FBRUEsVUFBSXVFLElBQUksQ0FBQ2pELFNBQUwsQ0FBZXVCLFFBQWYsQ0FBd0IsTUFBeEIsQ0FBSixFQUFxQyxLQUFLNkMsS0FBTCxDQUFXbkIsSUFBWCxFQUFpQjdELGFBQWpCLEVBQXJDLEtBQ0ssS0FBS2lGLElBQUwsQ0FBVXBCLElBQVYsRUFBZ0I3RCxhQUFoQjtBQUNOOzs7V0ErQkQsNkJBQW9CNkQsSUFBcEIsRUFBMEI3RCxhQUExQixFQUF5QztBQUN2QyxVQUFJa0YsSUFBSSxHQUFHLEVBQVg7QUFDQSxVQUFJQyxVQUFVLEdBQUcsSUFBakI7O0FBRUEsYUFBT3RCLElBQVAsRUFBYTtBQUNYLFlBQUlBLElBQUksQ0FBQ2pELFNBQUwsQ0FBZXVCLFFBQWYsQ0FBd0IsVUFBeEIsQ0FBSixFQUF5QztBQUN2Q2dELG9CQUFVLEdBQUcsSUFBYjtBQUNBRCxjQUFJLEdBQUcsRUFBUDtBQUNELFNBSEQsTUFHTztBQUNMLGNBQUksQ0FBQ3JCLElBQUksQ0FBQ2pELFNBQUwsQ0FBZXVCLFFBQWYsQ0FBd0IsTUFBeEIsQ0FBTCxFQUFzQ2dELFVBQVUsR0FBR3RCLElBQWI7QUFDdENxQixjQUFJLENBQUNFLElBQUwsQ0FBVXZCLElBQVY7QUFDRDs7QUFFREEsWUFBSSxHQUFHeEUsSUFBSSxDQUFDZ0QsV0FBTCxDQUFpQndCLElBQWpCLEVBQXVCLFdBQXZCLEVBQW9DLEtBQXBDLENBQVA7QUFDRDs7QUFFRCxVQUFJLENBQUNzQixVQUFMLEVBQWlCLE9BQU8sSUFBUDtBQUNqQixVQUFJRCxJQUFJLENBQUN4RCxNQUFMLEtBQWdCLENBQXBCLEVBQXVCLE9BQU95RCxVQUFQO0FBRXZCRCxVQUFJLEdBQUdBLElBQUksQ0FBQ0csS0FBTCxDQUFXLENBQVgsRUFBY0gsSUFBSSxDQUFDSSxPQUFMLENBQWFILFVBQWIsQ0FBZCxDQUFQOztBQUVBLFdBQUssSUFBSTFELENBQUMsR0FBRyxDQUFSLEVBQVdvRCxDQUFDLEdBQUdLLElBQUksQ0FBQ3hELE1BQXpCLEVBQWlDRCxDQUFDLEdBQUdvRCxDQUFyQyxFQUF3Q3BELENBQUMsRUFBekMsRUFBNkM7QUFDM0N5RCxZQUFJLENBQUN6RCxDQUFELENBQUosQ0FBUWIsU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0IsTUFBdEI7O0FBRUEsWUFBSSxLQUFLakIsVUFBVCxFQUFxQjtBQUNuQixjQUFNMkYsV0FBVyxHQUFHbEcsSUFBSSxDQUFDeUYsVUFBTCxDQUFnQkksSUFBSSxDQUFDekQsQ0FBRCxDQUFKLENBQVFzRCxVQUF4QixFQUFvQyxDQUFDLFdBQUQsRUFBYyxNQUFkLENBQXBDLENBQXBCOztBQUVBLGVBQUssSUFBSVMsQ0FBQyxHQUFHLENBQVIsRUFBV0MsQ0FBQyxHQUFHRixXQUFXLENBQUM3RCxNQUFoQyxFQUF3QzhELENBQUMsR0FBR0MsQ0FBNUMsRUFBK0NELENBQUMsRUFBaEQsRUFBb0Q7QUFDbEQsZ0JBQUlELFdBQVcsQ0FBQ0MsQ0FBRCxDQUFYLEtBQW1CTixJQUFJLENBQUN6RCxDQUFELENBQTNCLEVBQWdDO0FBQzlCOEQseUJBQVcsQ0FBQ0MsQ0FBRCxDQUFYLENBQWU1RSxTQUFmLENBQXlCOEQsTUFBekIsQ0FBZ0MsTUFBaEM7O0FBRUEsa0JBQUkxRSxhQUFKLEVBQW1CO0FBQ2pCLG9CQUFNMEYsY0FBYyxHQUFHSCxXQUFXLENBQUNDLENBQUQsQ0FBWCxDQUFlWixnQkFBZixDQUFnQyxpQkFBaEMsQ0FBdkI7O0FBQ0EscUJBQUssSUFBSWUsQ0FBQyxHQUFHLENBQVIsRUFBV0MsQ0FBQyxHQUFHRixjQUFjLENBQUNoRSxNQUFuQyxFQUEyQ2lFLENBQUMsR0FBR0MsQ0FBL0MsRUFBa0RELENBQUMsRUFBbkQsRUFBdUQ7QUFDckRELGdDQUFjLENBQUNDLENBQUQsQ0FBZCxDQUFrQi9FLFNBQWxCLENBQTRCOEQsTUFBNUIsQ0FBbUMsTUFBbkM7QUFDRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGO0FBQ0Y7O0FBRUQsYUFBT1MsVUFBUDtBQUNEOzs7V0FFRCwwQkFBaUJGLElBQWpCLEVBQXVCcEIsSUFBdkIsRUFBNkI3RCxhQUE3QixFQUE0QztBQUFBOztBQUMxQyxVQUFNdUMsVUFBVSxHQUFHbEQsSUFBSSxDQUFDMkUsUUFBTCxDQUFjSCxJQUFkLEVBQW9CLElBQXBCLENBQW5COztBQUNBLFVBQU1nQyxJQUFJLEdBQUd4RyxJQUFJLENBQUM2RSxTQUFMLENBQWVMLElBQWYsQ0FBYjs7QUFFQXhFLFVBQUksQ0FBQ3lHLHdCQUFMLENBQThCakMsSUFBOUI7O0FBRUEsVUFBTWtDLFVBQVUsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVcxRCxVQUFVLENBQUMyRCxxQkFBWCxHQUFtQ0MsTUFBOUMsQ0FBbkI7QUFFQXRDLFVBQUksQ0FBQ3VDLEtBQUwsQ0FBV0MsUUFBWCxHQUFzQixRQUF0Qjs7QUFFQSxVQUFNQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLEdBQU07QUFDM0J6QyxZQUFJLENBQUNqRCxTQUFMLENBQWU4RCxNQUFmLENBQXNCLHFCQUF0QjtBQUNBYixZQUFJLENBQUNqRCxTQUFMLENBQWU4RCxNQUFmLENBQXNCLG1CQUF0QjtBQUNBYixZQUFJLENBQUN1QyxLQUFMLENBQVdDLFFBQVgsR0FBc0IsSUFBdEI7QUFDQXhDLFlBQUksQ0FBQ3VDLEtBQUwsQ0FBV0QsTUFBWCxHQUFvQixJQUFwQjs7QUFFQSxjQUFJLENBQUNyRCxNQUFMO0FBQ0QsT0FQRDs7QUFTQSxVQUFJbUMsSUFBSixFQUFVO0FBQ1JwQixZQUFJLENBQUN1QyxLQUFMLENBQVdELE1BQVgsYUFBdUJKLFVBQXZCO0FBQ0FsQyxZQUFJLENBQUNqRCxTQUFMLENBQWVDLEdBQWYsQ0FBbUIscUJBQW5CO0FBQ0FnRCxZQUFJLENBQUNqRCxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsTUFBbkI7O0FBRUF4QixZQUFJLENBQUNrSCxzQkFBTCxDQUE0QjFDLElBQTVCLEVBQWtDLFlBQU07QUFDdEN5Qyx3QkFBYzs7QUFDZCxnQkFBSSxDQUFDbkcsU0FBTCxDQUFlLE1BQWYsRUFBcUIwRCxJQUFyQixFQUEyQnRCLFVBQTNCLEVBQXVDc0QsSUFBdkM7QUFDRCxTQUhEOztBQUtBVyxrQkFBVSxDQUFDLFlBQU07QUFDZjNDLGNBQUksQ0FBQ3VDLEtBQUwsQ0FBV0QsTUFBWCxhQUF1QkosVUFBVSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0osSUFBSSxDQUFDSyxxQkFBTCxHQUE2QkMsTUFBeEMsQ0FBcEM7QUFDRCxTQUZTLEVBRVAsRUFGTyxDQUFWO0FBR0QsT0FiRCxNQWFPO0FBQ0x0QyxZQUFJLENBQUN1QyxLQUFMLENBQVdELE1BQVgsYUFBdUJKLFVBQVUsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdKLElBQUksQ0FBQ0sscUJBQUwsR0FBNkJDLE1BQXhDLENBQXBDO0FBQ0F0QyxZQUFJLENBQUNqRCxTQUFMLENBQWVDLEdBQWYsQ0FBbUIscUJBQW5CO0FBQ0FnRCxZQUFJLENBQUNqRCxTQUFMLENBQWVDLEdBQWYsQ0FBbUIsbUJBQW5COztBQUVBeEIsWUFBSSxDQUFDa0gsc0JBQUwsQ0FBNEIxQyxJQUE1QixFQUFrQyxZQUFNO0FBQ3RDQSxjQUFJLENBQUNqRCxTQUFMLENBQWU4RCxNQUFmLENBQXNCLE1BQXRCO0FBQ0E0Qix3QkFBYzs7QUFFZCxjQUFJdEcsYUFBSixFQUFtQjtBQUNqQixnQkFBTTJFLE1BQU0sR0FBR2QsSUFBSSxDQUFDZSxnQkFBTCxDQUFzQixpQkFBdEIsQ0FBZjs7QUFDQSxpQkFBSyxJQUFJbkQsQ0FBQyxHQUFHLENBQVIsRUFBV29ELENBQUMsR0FBR0YsTUFBTSxDQUFDakQsTUFBM0IsRUFBbUNELENBQUMsR0FBR29ELENBQXZDLEVBQTBDcEQsQ0FBQyxFQUEzQztBQUErQ2tELG9CQUFNLENBQUNsRCxDQUFELENBQU4sQ0FBVWIsU0FBVixDQUFvQjhELE1BQXBCLENBQTJCLE1BQTNCO0FBQS9DO0FBQ0Q7O0FBRUQsZ0JBQUksQ0FBQ25FLFNBQUwsQ0FBZSxNQUFmLEVBQXFCc0QsSUFBckIsRUFBMkJ0QixVQUEzQixFQUF1Q3NELElBQXZDO0FBQ0QsU0FWRDs7QUFZQVcsa0JBQVUsQ0FBQyxZQUFNO0FBQ2YzQyxjQUFJLENBQUN1QyxLQUFMLENBQVdELE1BQVgsYUFBdUJKLFVBQXZCO0FBQ0QsU0FGUyxFQUVQLEVBRk8sQ0FBVjtBQUdEO0FBQ0Y7OztXQW9CRCx3QkFBZWxDLElBQWYsRUFBcUI7QUFDbkIsVUFBSTRDLE9BQU8sR0FBRyxLQUFLOUMsTUFBTCxDQUFZckIsVUFBWixDQUF1QixDQUF2QixDQUFkO0FBQ0EsVUFBSW9FLElBQUksR0FBRyxDQUFYOztBQUVBLGFBQU9ELE9BQU8sS0FBSzVDLElBQW5CLEVBQXlCO0FBQ3ZCLFlBQUk0QyxPQUFPLENBQUNFLE9BQVosRUFBcUI7QUFDbkJELGNBQUksSUFBSVYsSUFBSSxDQUFDQyxLQUFMLENBQVdRLE9BQU8sQ0FBQ1AscUJBQVIsR0FBZ0NVLEtBQTNDLENBQVI7QUFDRDs7QUFFREgsZUFBTyxHQUFHQSxPQUFPLENBQUNJLFdBQWxCO0FBQ0Q7O0FBRUQsYUFBT0gsSUFBUDtBQUNEOzs7U0FhRCxlQUFrQjtBQUNoQixVQUFNSSxLQUFLLEdBQUcsS0FBS25ELE1BQUwsQ0FBWXJCLFVBQTFCO0FBQ0EsVUFBSXNFLEtBQUssR0FBRyxDQUFaOztBQUVBLFdBQUssSUFBSW5GLENBQUMsR0FBRyxDQUFSLEVBQVdvRCxDQUFDLEdBQUdpQyxLQUFLLENBQUNwRixNQUExQixFQUFrQ0QsQ0FBQyxHQUFHb0QsQ0FBdEMsRUFBeUNwRCxDQUFDLEVBQTFDLEVBQThDO0FBQzVDLFlBQUlxRixLQUFLLENBQUNyRixDQUFELENBQUwsQ0FBU2tGLE9BQWIsRUFBc0I7QUFDcEJDLGVBQUssSUFBSVosSUFBSSxDQUFDQyxLQUFMLENBQVdhLEtBQUssQ0FBQ3JGLENBQUQsQ0FBTCxDQUFTeUUscUJBQVQsR0FBaUNVLEtBQTVDLENBQVQ7QUFDRDtBQUNGOztBQUVELGFBQU9BLEtBQVA7QUFDRDs7O1NBRUQsZUFBcUI7QUFDbkIsYUFBT0csUUFBUSxDQUFDLEtBQUtwRCxNQUFMLENBQVl5QyxLQUFaLENBQWtCLEtBQUtZLElBQUwsR0FBWSxhQUFaLEdBQTRCLFlBQTlDLEtBQStELEtBQWhFLEVBQXVFLEVBQXZFLENBQWY7QUFDRCxLO1NBRUQsYUFBbUJDLEtBQW5CLEVBQTBCO0FBQ3hCLFdBQUt0RCxNQUFMLENBQVl5QyxLQUFaLENBQWtCLEtBQUtZLElBQUwsR0FBWSxhQUFaLEdBQTRCLFlBQTlDLGNBQWlFQyxLQUFqRTtBQUNBLGFBQU9BLEtBQVA7QUFDRDs7O1dBZ0JELG9CQUE4QztBQUFBLFVBQXJDakgsYUFBcUMsdUVBQXJCLEtBQUtGLGNBQWdCOztBQUM1QyxVQUFNNkUsTUFBTSxHQUFHLEtBQUtsRixHQUFMLENBQVNtRixnQkFBVCxDQUEwQiwrQkFBMUIsQ0FBZjs7QUFFQSxXQUFLLElBQUluRCxDQUFDLEdBQUcsQ0FBUixFQUFXb0QsQ0FBQyxHQUFHRixNQUFNLENBQUNqRCxNQUEzQixFQUFtQ0QsQ0FBQyxHQUFHb0QsQ0FBdkMsRUFBMENwRCxDQUFDLEVBQTNDO0FBQStDLGFBQUt1RCxLQUFMLENBQVdMLE1BQU0sQ0FBQ2xELENBQUQsQ0FBakIsRUFBc0J6QixhQUF0QjtBQUEvQztBQUNEOzs7V0FrQkQsa0JBQVM7QUFDUCxVQUFJLEtBQUtpQixVQUFULEVBQXFCO0FBQ25CLGFBQUtBLFVBQUwsQ0FBZ0I2QixNQUFoQjtBQUNEO0FBQ0Y7OztXQUVELHdCQUFlO0FBQUEsb0JBQ2dCL0IsTUFEaEI7QUFBQSxVQUNMQyxnQkFESyxXQUNMQSxnQkFESztBQUViLFVBQU1rRyxTQUFTLEdBQUdoRSxRQUFRLENBQUNoQyxhQUFULENBQXVCLGFBQXZCLENBQWxCOztBQUVBLFVBQUlILE1BQU0sQ0FBQ2lDLFVBQVAsR0FBb0JqQyxNQUFNLENBQUNPLE9BQVAsQ0FBZTZGLGlCQUF2QyxFQUEwRDtBQUN4RCxZQUFJLEtBQUtsRyxVQUFMLEtBQW9CLElBQXhCLEVBQThCO0FBQzVCO0FBQ0EsZUFBS0EsVUFBTCxDQUFnQm1HLE9BQWhCOztBQUNBLGVBQUtuRyxVQUFMLEdBQWtCLElBQWxCO0FBQ0Q7O0FBQ0RpRyxpQkFBUyxDQUFDdEcsU0FBVixDQUFvQkMsR0FBcEIsQ0FBd0IsZUFBeEI7QUFDRCxPQVBELE1BT087QUFDTCxZQUFJLEtBQUtJLFVBQUwsS0FBb0IsSUFBeEIsRUFBOEI7QUFDNUIsY0FBTW9HLFVBQVUsR0FBRyxJQUFJckcsZ0JBQUosQ0FBcUJrQyxRQUFRLENBQUNoQyxhQUFULENBQXVCLGFBQXZCLENBQXJCLEVBQTREO0FBQzdFQywyQkFBZSxFQUFFLElBRDREO0FBRTdFQyw0QkFBZ0IsRUFBRTtBQUYyRCxXQUE1RCxDQUFuQjtBQUlBLGVBQUtILFVBQUwsR0FBa0JvRyxVQUFsQjtBQUNEOztBQUNESCxpQkFBUyxDQUFDdEcsU0FBVixDQUFvQjhELE1BQXBCLENBQTJCLGVBQTNCO0FBQ0Q7QUFDRjs7O1dBRUQsbUJBQVU7QUFDUixVQUFJLENBQUMsS0FBS2pGLEdBQVYsRUFBZTs7QUFFZixXQUFLNkgsYUFBTDs7QUFFQSxVQUFNUixLQUFLLEdBQUcsS0FBS3JILEdBQUwsQ0FBU21GLGdCQUFULENBQTBCLFlBQTFCLENBQWQ7O0FBQ0EsV0FBSyxJQUFJbkQsQ0FBQyxHQUFHLENBQVIsRUFBV29ELENBQUMsR0FBR2lDLEtBQUssQ0FBQ3BGLE1BQTFCLEVBQWtDRCxDQUFDLEdBQUdvRCxDQUF0QyxFQUF5Q3BELENBQUMsRUFBMUMsRUFBOEM7QUFDNUNwQyxZQUFJLENBQUN5Ryx3QkFBTCxDQUE4QmdCLEtBQUssQ0FBQ3JGLENBQUQsQ0FBbkM7O0FBQ0FxRixhQUFLLENBQUNyRixDQUFELENBQUwsQ0FBU2IsU0FBVCxDQUFtQjhELE1BQW5CLENBQTBCLHFCQUExQjtBQUNBb0MsYUFBSyxDQUFDckYsQ0FBRCxDQUFMLENBQVNiLFNBQVQsQ0FBbUI4RCxNQUFuQixDQUEwQixNQUExQjtBQUNBb0MsYUFBSyxDQUFDckYsQ0FBRCxDQUFMLENBQVMyRSxLQUFULENBQWVDLFFBQWYsR0FBMEIsSUFBMUI7QUFDQVMsYUFBSyxDQUFDckYsQ0FBRCxDQUFMLENBQVMyRSxLQUFULENBQWVELE1BQWYsR0FBd0IsSUFBeEI7QUFDRDs7QUFFRCxVQUFNb0IsS0FBSyxHQUFHLEtBQUs5SCxHQUFMLENBQVNtRixnQkFBVCxDQUEwQixZQUExQixDQUFkOztBQUNBLFdBQUssSUFBSTRDLEVBQUUsR0FBRyxDQUFULEVBQVlDLEVBQUUsR0FBR0YsS0FBSyxDQUFDN0YsTUFBNUIsRUFBb0M4RixFQUFFLEdBQUdDLEVBQXpDLEVBQTZDRCxFQUFFLEVBQS9DLEVBQW1EO0FBQ2pERCxhQUFLLENBQUNDLEVBQUQsQ0FBTCxDQUFVcEIsS0FBVixDQUFnQnNCLFdBQWhCLEdBQThCLElBQTlCO0FBQ0FILGFBQUssQ0FBQ0MsRUFBRCxDQUFMLENBQVVwQixLQUFWLENBQWdCdUIsVUFBaEIsR0FBNkIsSUFBN0I7QUFDRDs7QUFFRCxXQUFLbEksR0FBTCxDQUFTbUIsU0FBVCxDQUFtQjhELE1BQW5CLENBQTBCLG1CQUExQjs7QUFFQSxVQUFJLEtBQUtrRCxRQUFULEVBQW1CO0FBQ2pCLGFBQUtDLFFBQUwsQ0FBYzlDLFVBQWQsQ0FBeUIrQyxXQUF6QixDQUFxQyxLQUFLRCxRQUExQzs7QUFDQSxhQUFLRSxRQUFMLENBQWNoRCxVQUFkLENBQXlCK0MsV0FBekIsQ0FBcUMsS0FBS0MsUUFBMUM7O0FBQ0EsYUFBS0gsUUFBTCxDQUFjN0MsVUFBZCxDQUF5QmlELFlBQXpCLENBQXNDLEtBQUtyRSxNQUEzQyxFQUFtRCxLQUFLaUUsUUFBeEQ7O0FBQ0EsYUFBS0EsUUFBTCxDQUFjN0MsVUFBZCxDQUF5QitDLFdBQXpCLENBQXFDLEtBQUtGLFFBQTFDOztBQUNBLGFBQUtqRSxNQUFMLENBQVl5QyxLQUFaLENBQWtCdUIsVUFBbEIsR0FBK0IsSUFBL0I7QUFDQSxhQUFLaEUsTUFBTCxDQUFZeUMsS0FBWixDQUFrQnNCLFdBQWxCLEdBQWdDLElBQWhDO0FBQ0Q7O0FBRUQsV0FBS2pJLEdBQUwsQ0FBU3FDLFlBQVQsR0FBd0IsSUFBeEI7QUFDQSxhQUFPLEtBQUtyQyxHQUFMLENBQVNxQyxZQUFoQjtBQUVBLFdBQUtyQyxHQUFMLEdBQVcsSUFBWDtBQUNBLFdBQUtDLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxXQUFLRSxVQUFMLEdBQWtCLElBQWxCO0FBQ0EsV0FBS0UsY0FBTCxHQUFzQixJQUF0QjtBQUNBLFdBQUtHLE9BQUwsR0FBZSxJQUFmO0FBQ0EsV0FBS0UsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFdBQUtFLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxXQUFLRSxTQUFMLEdBQWlCLElBQWpCOztBQUNBLFVBQUksS0FBS1UsVUFBVCxFQUFxQjtBQUNuQixhQUFLQSxVQUFMLENBQWdCbUcsT0FBaEI7O0FBQ0EsYUFBS25HLFVBQUwsR0FBa0IsSUFBbEI7QUFDRDs7QUFDRCxXQUFLMEMsTUFBTCxHQUFjLElBQWQ7QUFDQSxXQUFLa0UsUUFBTCxHQUFnQixJQUFoQjtBQUNBLFdBQUtELFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxXQUFLRyxRQUFMLEdBQWdCLElBQWhCO0FBQ0Q7OztXQTllRDtBQUFlO0FBQWlCRSxLQUFoQztBQUFtQztBQUFrQkMsS0FBckQsRUFBd0Q7QUFDdEQ7QUFDQSxVQUFJRCxDQUFDLENBQUNsRCxVQUFOLEVBQWtCO0FBQ2hCLGVBQU8sQ0FBQ2tELENBQUMsR0FBR0EsQ0FBQyxDQUFDbEQsVUFBUCxLQUFzQmtELENBQUMsS0FBS0MsQ0FBbkM7QUFBcUM7QUFBckM7O0FBQ0EsZUFBTyxDQUFDLENBQUNELENBQVQ7QUFDRDs7QUFDRCxhQUFPLEtBQVA7QUFDRDs7O1dBdUNELGlCQUFlcEUsSUFBZixFQUFxQjtBQUNuQixhQUFPLENBQUN4RSxJQUFJLENBQUNnRCxXQUFMLENBQWlCd0IsSUFBakIsRUFBdUIsV0FBdkIsRUFBb0MsS0FBcEMsQ0FBUjtBQUNEOzs7V0FFRCxxQkFBbUJ2RSxFQUFuQixFQUF1QjZJLEdBQXZCLEVBQStDO0FBQUEsVUFBbkJDLFVBQW1CLHVFQUFOLElBQU07QUFDN0MsVUFBSTlJLEVBQUUsQ0FBQ3FILE9BQUgsQ0FBVzBCLFdBQVgsT0FBNkIsTUFBakMsRUFBeUMsT0FBTyxJQUFQO0FBQ3pDL0ksUUFBRSxHQUFHQSxFQUFFLENBQUN5RixVQUFSOztBQUNBLGFBQU96RixFQUFFLENBQUNxSCxPQUFILENBQVcwQixXQUFYLE9BQTZCLE1BQTdCLElBQXVDLENBQUMvSSxFQUFFLENBQUNzQixTQUFILENBQWF1QixRQUFiLENBQXNCZ0csR0FBdEIsQ0FBL0MsRUFBMkU7QUFDekU3SSxVQUFFLEdBQUdBLEVBQUUsQ0FBQ3lGLFVBQVI7QUFDRDs7QUFFRHpGLFFBQUUsR0FBR0EsRUFBRSxDQUFDcUgsT0FBSCxDQUFXMEIsV0FBWCxPQUE2QixNQUE3QixHQUFzQy9JLEVBQXRDLEdBQTJDLElBQWhEO0FBRUEsVUFBSSxDQUFDQSxFQUFELElBQU84SSxVQUFYLEVBQXVCLE1BQU0sSUFBSUUsS0FBSix5QkFBNEJILEdBQTVCLHNCQUFOO0FBRXZCLGFBQU83SSxFQUFQO0FBQ0Q7OztXQUVELG9CQUFrQkEsRUFBbEIsRUFBc0I2SSxHQUF0QixFQUEyQjtBQUN6QixVQUFNckIsS0FBSyxHQUFHeEgsRUFBRSxDQUFDZ0QsVUFBakI7QUFDQSxVQUFNaUcsS0FBSyxHQUFHLEVBQWQ7O0FBRUEsV0FBSyxJQUFJOUcsQ0FBQyxHQUFHLENBQVIsRUFBV29ELENBQUMsR0FBR2lDLEtBQUssQ0FBQ3BGLE1BQTFCLEVBQWtDRCxDQUFDLEdBQUdvRCxDQUF0QyxFQUF5Q3BELENBQUMsRUFBMUMsRUFBOEM7QUFDNUMsWUFBSXFGLEtBQUssQ0FBQ3JGLENBQUQsQ0FBTCxDQUFTYixTQUFiLEVBQXdCO0FBQ3RCLGNBQUk0SCxNQUFNLEdBQUcsQ0FBYjs7QUFFQSxlQUFLLElBQUloRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHMkMsR0FBRyxDQUFDekcsTUFBeEIsRUFBZ0M4RCxDQUFDLEVBQWpDLEVBQXFDO0FBQ25DLGdCQUFJc0IsS0FBSyxDQUFDckYsQ0FBRCxDQUFMLENBQVNiLFNBQVQsQ0FBbUJ1QixRQUFuQixDQUE0QmdHLEdBQUcsQ0FBQzNDLENBQUQsQ0FBL0IsQ0FBSixFQUF5Q2dELE1BQU0sSUFBSSxDQUFWO0FBQzFDOztBQUVELGNBQUlMLEdBQUcsQ0FBQ3pHLE1BQUosS0FBZThHLE1BQW5CLEVBQTJCRCxLQUFLLENBQUNuRCxJQUFOLENBQVcwQixLQUFLLENBQUNyRixDQUFELENBQWhCO0FBQzVCO0FBQ0Y7O0FBRUQsYUFBTzhHLEtBQVA7QUFDRDs7O1dBRUQsbUJBQWlCMUUsSUFBakIsRUFBdUI7QUFDckIsVUFBSTRFLEtBQUssR0FBRzVFLElBQUksQ0FBQ3ZCLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBWjtBQUNBLFVBQUl1RCxJQUFJLEdBQUcsSUFBWDs7QUFFQSxhQUFPNEMsS0FBSyxJQUFJLENBQUM1QyxJQUFqQixFQUF1QjtBQUNyQixZQUFJNEMsS0FBSyxDQUFDN0gsU0FBTixJQUFtQjZILEtBQUssQ0FBQzdILFNBQU4sQ0FBZ0J1QixRQUFoQixDQUF5QixVQUF6QixDQUF2QixFQUE2RDBELElBQUksR0FBRzRDLEtBQVA7QUFDN0RBLGFBQUssR0FBR0EsS0FBSyxDQUFDNUIsV0FBZDtBQUNEOztBQUVELFVBQUksQ0FBQ2hCLElBQUwsRUFBVyxNQUFNLElBQUl5QyxLQUFKLENBQVUsZ0VBQVYsQ0FBTjtBQUVYLGFBQU96QyxJQUFQO0FBQ0QsSyxDQUVEOzs7O1dBQ0EsbUJBQWlCc0MsR0FBakIsRUFBbUQ7QUFBQSxVQUE3QjdJLEVBQTZCLHVFQUF4QnlCLE1BQU0sQ0FBQ08sT0FBUCxDQUFlb0gsT0FBUztBQUNqRCxVQUFJQyxNQUFNLEdBQUcsS0FBYjtBQUVBUixTQUFHLENBQUNTLEtBQUosQ0FBVSxHQUFWLEVBQWVDLE9BQWYsQ0FBdUIsVUFBQVosQ0FBQyxFQUFJO0FBQzFCLFlBQUkzSSxFQUFFLENBQUNzQixTQUFILENBQWF1QixRQUFiLENBQXNCOEYsQ0FBdEIsQ0FBSixFQUE4QlUsTUFBTSxHQUFHLElBQVQ7QUFDL0IsT0FGRDtBQUlBLGFBQU9BLE1BQVA7QUFDRDs7O1dBOEVELGtCQUFnQnJKLEVBQWhCLEVBQW9Cb0QsTUFBcEIsRUFBNEI7QUFDMUIsVUFBSW1CLElBQUksR0FBRyxJQUFYO0FBQ0EsVUFBTWlGLFFBQVEsR0FBR3BHLE1BQU0sR0FBRyxhQUFILEdBQW1CLFdBQTFDOztBQUVBLFVBQUlwRCxFQUFFLENBQUNzQixTQUFILENBQWF1QixRQUFiLENBQXNCLFdBQXRCLENBQUosRUFBd0M7QUFDdEMsWUFBSTlDLElBQUksQ0FBQ3lGLFVBQUwsQ0FBZ0J4RixFQUFoQixFQUFvQixDQUFDd0osUUFBRCxDQUFwQixFQUFnQ3BILE1BQXBDLEVBQTRDbUMsSUFBSSxHQUFHdkUsRUFBUDtBQUM3QyxPQUZELE1BRU8sSUFBSUEsRUFBRSxDQUFDc0IsU0FBSCxDQUFhdUIsUUFBYixDQUFzQjJHLFFBQXRCLENBQUosRUFBcUM7QUFDMUNqRixZQUFJLEdBQUd2RSxFQUFFLENBQUN5RixVQUFILENBQWNuRSxTQUFkLENBQXdCdUIsUUFBeEIsQ0FBaUMsV0FBakMsSUFBZ0Q3QyxFQUFFLENBQUN5RixVQUFuRCxHQUFnRSxJQUF2RTtBQUNEOztBQUVELFVBQUksQ0FBQ2xCLElBQUwsRUFBVztBQUNULGNBQU0sSUFBSXlFLEtBQUosV0FBYTVGLE1BQU0sR0FBRyxXQUFILEdBQWlCLEVBQXBDLHFDQUFOO0FBQ0Q7O0FBRUQsYUFBT21CLElBQVA7QUFDRDs7O1dBRUQsa0JBQWdCdkUsRUFBaEIsRUFBb0JvRCxNQUFwQixFQUE0QjtBQUMxQixVQUFJNkYsS0FBSyxHQUFHLEVBQVo7QUFDQSxVQUFNTyxRQUFRLEdBQUdwRyxNQUFNLEdBQUcsYUFBSCxHQUFtQixXQUExQztBQUVBLFVBQUlwRCxFQUFFLENBQUNzQixTQUFILENBQWF1QixRQUFiLENBQXNCMkcsUUFBdEIsQ0FBSixFQUFxQ1AsS0FBSyxHQUFHLENBQUNqSixFQUFELENBQVIsQ0FBckMsS0FDSyxJQUFJQSxFQUFFLENBQUNzQixTQUFILENBQWF1QixRQUFiLENBQXNCLFdBQXRCLENBQUosRUFBd0NvRyxLQUFLLEdBQUdsSixJQUFJLENBQUN5RixVQUFMLENBQWdCeEYsRUFBaEIsRUFBb0IsQ0FBQ3dKLFFBQUQsQ0FBcEIsQ0FBUjtBQUU3QyxVQUFJLENBQUNQLEtBQUssQ0FBQzdHLE1BQVgsRUFBbUIsTUFBTSxJQUFJNEcsS0FBSixZQUFlUSxRQUFmLDBCQUFOO0FBRW5CLGFBQU9QLEtBQUssQ0FBQyxDQUFELENBQVo7QUFDRDs7O1dBc0dELGdDQUE4QmpKLEVBQTlCLEVBQWtDeUosT0FBbEMsRUFBMkM7QUFDekMsVUFBTUMsRUFBRSxHQUFHLFNBQUxBLEVBQUssQ0FBQWhILENBQUMsRUFBSTtBQUNkLFlBQUlBLENBQUMsQ0FBQ0MsTUFBRixLQUFhM0MsRUFBakIsRUFBcUI7O0FBQ3JCRCxZQUFJLENBQUN5Ryx3QkFBTCxDQUE4QnhHLEVBQTlCOztBQUNBeUosZUFBTyxDQUFDL0csQ0FBRCxDQUFQO0FBQ0QsT0FKRDs7QUFNQSxVQUFJaUgsUUFBUSxHQUFHbEksTUFBTSxDQUFDbUksZ0JBQVAsQ0FBd0I1SixFQUF4QixFQUE0QjZKLGtCQUEzQztBQUNBRixjQUFRLEdBQUdHLFVBQVUsQ0FBQ0gsUUFBRCxDQUFWLElBQXdCQSxRQUFRLENBQUMzRCxPQUFULENBQWlCLElBQWpCLE1BQTJCLENBQUMsQ0FBNUIsR0FBZ0MsQ0FBaEMsR0FBb0MsSUFBNUQsQ0FBWDtBQUVBaEcsUUFBRSxDQUFDK0osd0JBQUgsR0FBOEJMLEVBQTlCO0FBQ0E1Six1QkFBaUIsQ0FBQ3lKLE9BQWxCLENBQTBCLFVBQUFTLEVBQUU7QUFBQSxlQUFJaEssRUFBRSxDQUFDc0QsZ0JBQUgsQ0FBb0IwRyxFQUFwQixFQUF3QmhLLEVBQUUsQ0FBQytKLHdCQUEzQixFQUFxRCxLQUFyRCxDQUFKO0FBQUEsT0FBNUI7QUFFQS9KLFFBQUUsQ0FBQ2lLLDZCQUFILEdBQW1DL0MsVUFBVSxDQUFDLFlBQU07QUFDbER3QyxVQUFFLENBQUM7QUFBRS9HLGdCQUFNLEVBQUUzQztBQUFWLFNBQUQsQ0FBRjtBQUNELE9BRjRDLEVBRTFDMkosUUFBUSxHQUFHLEVBRitCLENBQTdDO0FBR0Q7OztXQWlCRCxvQkFBa0JPLEVBQWxCLEVBQStCO0FBQUEsd0NBQU5DLElBQU07QUFBTkEsWUFBTTtBQUFBOztBQUM3QixVQUFNZCxNQUFNLEdBQUdhLEVBQUUsTUFBRixTQUFNQyxJQUFOLENBQWY7O0FBQ0EsVUFBSWQsTUFBTSxZQUFZZSxPQUF0QixFQUErQjtBQUM3QixlQUFPZixNQUFQO0FBQ0Q7O0FBQ0QsVUFBSUEsTUFBTSxLQUFLLEtBQWYsRUFBc0I7QUFDcEIsZUFBT2UsT0FBTyxDQUFDQyxNQUFSLEVBQVA7QUFDRDs7QUFDRCxhQUFPRCxPQUFPLENBQUNFLE9BQVIsRUFBUDtBQUNEOzs7V0F3QkQsa0NBQWdDdEssRUFBaEMsRUFBb0M7QUFDbEMsVUFBTTBKLEVBQUUsR0FBRzFKLEVBQUUsQ0FBQytKLHdCQUFkOztBQUVBLFVBQUkvSixFQUFFLENBQUNpSyw2QkFBUCxFQUFzQztBQUNwQ00sb0JBQVksQ0FBQ3ZLLEVBQUUsQ0FBQ2lLLDZCQUFKLENBQVo7QUFDQWpLLFVBQUUsQ0FBQ2lLLDZCQUFILEdBQW1DLElBQW5DO0FBQ0Q7O0FBRUQsVUFBSSxDQUFDUCxFQUFMLEVBQVM7QUFFVDVKLHVCQUFpQixDQUFDeUosT0FBbEIsQ0FBMEIsVUFBQVMsRUFBRTtBQUFBLGVBQUloSyxFQUFFLENBQUMrRCxtQkFBSCxDQUF1QmlHLEVBQXZCLEVBQTJCTixFQUEzQixFQUErQixLQUEvQixDQUFKO0FBQUEsT0FBNUI7QUFDQTFKLFFBQUUsQ0FBQytKLHdCQUFILEdBQThCLElBQTlCO0FBQ0Q7OztXQVFELHFCQUFtQi9KLEVBQW5CLEVBQXVCd0ssUUFBdkIsRUFBaUM7QUFDL0J6SyxVQUFJLENBQUMwRSxRQUFMLENBQWN6RSxFQUFkLEVBQWtCLEtBQWxCLEVBQXlCc0IsU0FBekIsQ0FBbUNrSixRQUFRLEdBQUcsS0FBSCxHQUFXLFFBQXRELEVBQWdFLFVBQWhFO0FBQ0Q7OztXQUVELGtCQUFnQnhLLEVBQWhCLEVBQW9CO0FBQ2xCLGFBQU9ELElBQUksQ0FBQzBFLFFBQUwsQ0FBY3pFLEVBQWQsRUFBa0IsS0FBbEIsRUFBeUJzQixTQUF6QixDQUFtQ3VCLFFBQW5DLENBQTRDLFFBQTVDLENBQVA7QUFDRDs7O1dBRUQsa0JBQWdCN0MsRUFBaEIsRUFBb0I7QUFDbEIsYUFBT0QsSUFBSSxDQUFDMEUsUUFBTCxDQUFjekUsRUFBZCxFQUFrQixLQUFsQixFQUF5QnNCLFNBQXpCLENBQW1DdUIsUUFBbkMsQ0FBNEMsTUFBNUMsQ0FBUDtBQUNEOzs7V0FFRCxvQkFBa0I3QyxFQUFsQixFQUFzQjtBQUNwQixhQUFPRCxJQUFJLENBQUMwRSxRQUFMLENBQWN6RSxFQUFkLEVBQWtCLEtBQWxCLEVBQXlCc0IsU0FBekIsQ0FBbUN1QixRQUFuQyxDQUE0QyxVQUE1QyxDQUFQO0FBQ0QiLCJmaWxlIjoiLi9qcy9tZW51LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgVFJBTlNJVElPTl9FVkVOVFMgPSBbJ3RyYW5zaXRpb25lbmQnLCAnd2Via2l0VHJhbnNpdGlvbkVuZCcsICdvVHJhbnNpdGlvbkVuZCddXG4vLyBjb25zdCBUUkFOU0lUSU9OX1BST1BFUlRJRVMgPSBbJ3RyYW5zaXRpb24nLCAnTW96VHJhbnNpdGlvbicsICd3ZWJraXRUcmFuc2l0aW9uJywgJ1dlYmtpdFRyYW5zaXRpb24nLCAnT1RyYW5zaXRpb24nXVxuXG5jbGFzcyBNZW51IHtcbiAgY29uc3RydWN0b3IoZWwsIGNvbmZpZyA9IHt9LCBfUFMgPSBudWxsKSB7XG4gICAgdGhpcy5fZWwgPSBlbFxuICAgIHRoaXMuX2FuaW1hdGUgPSBjb25maWcuYW5pbWF0ZSAhPT0gZmFsc2VcbiAgICB0aGlzLl9hY2NvcmRpb24gPSBjb25maWcuYWNjb3JkaW9uICE9PSBmYWxzZVxuICAgIHRoaXMuX2Nsb3NlQ2hpbGRyZW4gPSBCb29sZWFuKGNvbmZpZy5jbG9zZUNoaWxkcmVuKVxuXG4gICAgdGhpcy5fb25PcGVuID0gY29uZmlnLm9uT3BlbiB8fCAoKCkgPT4ge30pXG4gICAgdGhpcy5fb25PcGVuZWQgPSBjb25maWcub25PcGVuZWQgfHwgKCgpID0+IHt9KVxuICAgIHRoaXMuX29uQ2xvc2UgPSBjb25maWcub25DbG9zZSB8fCAoKCkgPT4ge30pXG4gICAgdGhpcy5fb25DbG9zZWQgPSBjb25maWcub25DbG9zZWQgfHwgKCgpID0+IHt9KVxuXG4gICAgdGhpcy5fcHNTY3JvbGwgPSBudWxsXG4gICAgdGhpcy5fdG9wUGFyZW50ID0gbnVsbFxuICAgIHRoaXMuX21lbnVCZ0NsYXNzID0gbnVsbFxuXG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnbWVudScpXG4gICAgZWwuY2xhc3NMaXN0W3RoaXMuX2FuaW1hdGUgPyAncmVtb3ZlJyA6ICdhZGQnXSgnbWVudS1uby1hbmltYXRpb24nKSAvLyBjaGVja1xuXG4gICAgZWwuY2xhc3NMaXN0LmFkZCgnbWVudS12ZXJ0aWNhbCcpXG5cbiAgICBjb25zdCBQZXJmZWN0U2Nyb2xsYmFyTGliID0gX1BTIHx8IHdpbmRvdy5QZXJmZWN0U2Nyb2xsYmFyXG5cbiAgICBpZiAoUGVyZmVjdFNjcm9sbGJhckxpYikge1xuICAgICAgdGhpcy5fc2Nyb2xsYmFyID0gbmV3IFBlcmZlY3RTY3JvbGxiYXJMaWIoZWwucXVlcnlTZWxlY3RvcignLm1lbnUtaW5uZXInKSwge1xuICAgICAgICBzdXBwcmVzc1Njcm9sbFg6IHRydWUsXG4gICAgICAgIHdoZWVsUHJvcGFnYXRpb246ICFNZW51Ll9oYXNDbGFzcygnbGF5b3V0LW1lbnUtZml4ZWQgbGF5b3V0LW1lbnUtZml4ZWQtb2ZmY2FudmFzJylcbiAgICAgIH0pXG5cbiAgICAgIHdpbmRvdy5IZWxwZXJzLm1lbnVQc1Njcm9sbCA9IHRoaXMuX3Njcm9sbGJhclxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5xdWVyeVNlbGVjdG9yKCcubWVudS1pbm5lcicpLmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93LWF1dG8nKVxuICAgIH1cblxuICAgIC8vIEFkZCBkYXRhIGF0dHJpYnV0ZSBmb3IgYmcgY29sb3IgY2xhc3Mgb2YgbWVudVxuICAgIGNvbnN0IG1lbnVDbGFzc0xpc3QgPSBlbC5jbGFzc0xpc3RcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWVudUNsYXNzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG1lbnVDbGFzc0xpc3RbaV0uc3RhcnRzV2l0aCgnYmctJykpIHtcbiAgICAgICAgdGhpcy5fbWVudUJnQ2xhc3MgPSBtZW51Q2xhc3NMaXN0W2ldXG4gICAgICB9XG4gICAgfVxuICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1iZy1jbGFzcycsIHRoaXMuX21lbnVCZ0NsYXNzKVxuXG4gICAgdGhpcy5fYmluZEV2ZW50cygpXG5cbiAgICAvLyBMaW5rIG1lbnUgaW5zdGFuY2UgdG8gZWxlbWVudFxuICAgIGVsLm1lbnVJbnN0YW5jZSA9IHRoaXNcbiAgfVxuXG4gIF9iaW5kRXZlbnRzKCkge1xuICAgIC8vIENsaWNrIEV2ZW50XG4gICAgdGhpcy5fZXZudEVsQ2xpY2sgPSBlID0+IHtcbiAgICAgIC8vIEZpbmQgdG9wIHBhcmVudCBlbGVtZW50XG4gICAgICBpZiAoZS50YXJnZXQuY2xvc2VzdCgndWwnKSAmJiBlLnRhcmdldC5jbG9zZXN0KCd1bCcpLmNsYXNzTGlzdC5jb250YWlucygnbWVudS1pbm5lcicpKSB7XG4gICAgICAgIGNvbnN0IG1lbnVJdGVtID0gTWVudS5fZmluZFBhcmVudChlLnRhcmdldCwgJ21lbnUtaXRlbScsIGZhbHNlKVxuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItZGVzdHJ1Y3R1cmluZ1xuICAgICAgICBpZiAobWVudUl0ZW0pIHRoaXMuX3RvcFBhcmVudCA9IG1lbnVJdGVtLmNoaWxkTm9kZXNbMF1cbiAgICAgIH1cblxuICAgICAgY29uc3QgdG9nZ2xlTGluayA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWVudS10b2dnbGUnKVxuICAgICAgICA/IGUudGFyZ2V0XG4gICAgICAgIDogTWVudS5fZmluZFBhcmVudChlLnRhcmdldCwgJ21lbnUtdG9nZ2xlJywgZmFsc2UpXG5cbiAgICAgIGlmICh0b2dnbGVMaW5rKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGlmICh0b2dnbGVMaW5rLmdldEF0dHJpYnV0ZSgnZGF0YS1ob3ZlcicpICE9PSAndHJ1ZScpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZSh0b2dnbGVMaW5rKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh3aW5kb3cuSGVscGVycy5pc01vYmlsZURldmljZSkgdGhpcy5fZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9ldm50RWxDbGljaylcblxuICAgIHRoaXMuX2V2bnRXaW5kb3dSZXNpemUgPSAoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZSgpXG4gICAgICBpZiAodGhpcy5fbGFzdFdpZHRoICE9PSB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICB0aGlzLl9sYXN0V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICB0aGlzLnVwZGF0ZSgpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhvcml6b250YWxNZW51VGVtcGxhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdGVtcGxhdGVePSdob3Jpem9udGFsLW1lbnUnXVwiKVxuICAgICAgaWYgKCF0aGlzLl9ob3Jpem9udGFsICYmICFob3Jpem9udGFsTWVudVRlbXBsYXRlKSB0aGlzLm1hbmFnZVNjcm9sbCgpXG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLl9ldm50V2luZG93UmVzaXplKVxuICB9XG5cbiAgc3RhdGljIGNoaWxkT2YoLyogY2hpbGQgbm9kZSAqLyBjLCAvKiBwYXJlbnQgbm9kZSAqLyBwKSB7XG4gICAgLy8gcmV0dXJucyBib29sZWFuXG4gICAgaWYgKGMucGFyZW50Tm9kZSkge1xuICAgICAgd2hpbGUgKChjID0gYy5wYXJlbnROb2RlKSAmJiBjICE9PSBwKTtcbiAgICAgIHJldHVybiAhIWNcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBfdW5iaW5kRXZlbnRzKCkge1xuICAgIGlmICh0aGlzLl9ldm50RWxDbGljaykge1xuICAgICAgdGhpcy5fZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLl9ldm50RWxDbGljaylcbiAgICAgIHRoaXMuX2V2bnRFbENsaWNrID0gbnVsbFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldm50RWxNb3VzZU92ZXIpIHtcbiAgICAgIHRoaXMuX2VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMuX2V2bnRFbE1vdXNlT3ZlcilcbiAgICAgIHRoaXMuX2V2bnRFbE1vdXNlT3ZlciA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZudEVsTW91c2VPdXQpIHtcbiAgICAgIHRoaXMuX2VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcy5fZXZudEVsTW91c2VPdXQpXG4gICAgICB0aGlzLl9ldm50RWxNb3VzZU91dCA9IG51bGxcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZudFdpbmRvd1Jlc2l6ZSkge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuX2V2bnRXaW5kb3dSZXNpemUpXG4gICAgICB0aGlzLl9ldm50V2luZG93UmVzaXplID0gbnVsbFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldm50Qm9keUNsaWNrKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5fZXZudEJvZHlDbGljaylcbiAgICAgIHRoaXMuX2V2bnRCb2R5Q2xpY2sgPSBudWxsXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2V2bnRJbm5lck1vdXNlbW92ZSkge1xuICAgICAgdGhpcy5faW5uZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fZXZudElubmVyTW91c2Vtb3ZlKVxuICAgICAgdGhpcy5fZXZudElubmVyTW91c2Vtb3ZlID0gbnVsbFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldm50SW5uZXJNb3VzZWxlYXZlKSB7XG4gICAgICB0aGlzLl9pbm5lci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5fZXZudElubmVyTW91c2VsZWF2ZSlcbiAgICAgIHRoaXMuX2V2bnRJbm5lck1vdXNlbGVhdmUgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgc3RhdGljIF9pc1Jvb3QoaXRlbSkge1xuICAgIHJldHVybiAhTWVudS5fZmluZFBhcmVudChpdGVtLCAnbWVudS1pdGVtJywgZmFsc2UpXG4gIH1cblxuICBzdGF0aWMgX2ZpbmRQYXJlbnQoZWwsIGNscywgdGhyb3dFcnJvciA9IHRydWUpIHtcbiAgICBpZiAoZWwudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnQk9EWScpIHJldHVybiBudWxsXG4gICAgZWwgPSBlbC5wYXJlbnROb2RlXG4gICAgd2hpbGUgKGVsLnRhZ05hbWUudG9VcHBlckNhc2UoKSAhPT0gJ0JPRFknICYmICFlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xzKSkge1xuICAgICAgZWwgPSBlbC5wYXJlbnROb2RlXG4gICAgfVxuXG4gICAgZWwgPSBlbC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgIT09ICdCT0RZJyA/IGVsIDogbnVsbFxuXG4gICAgaWYgKCFlbCAmJiB0aHJvd0Vycm9yKSB0aHJvdyBuZXcgRXJyb3IoYENhbm5vdCBmaW5kIFxcYC4ke2Nsc31cXGAgcGFyZW50IGVsZW1lbnRgKVxuXG4gICAgcmV0dXJuIGVsXG4gIH1cblxuICBzdGF0aWMgX2ZpbmRDaGlsZChlbCwgY2xzKSB7XG4gICAgY29uc3QgaXRlbXMgPSBlbC5jaGlsZE5vZGVzXG4gICAgY29uc3QgZm91bmQgPSBbXVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBpdGVtcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmIChpdGVtc1tpXS5jbGFzc0xpc3QpIHtcbiAgICAgICAgbGV0IHBhc3NlZCA9IDBcblxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNscy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGlmIChpdGVtc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoY2xzW2pdKSkgcGFzc2VkICs9IDFcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjbHMubGVuZ3RoID09PSBwYXNzZWQpIGZvdW5kLnB1c2goaXRlbXNbaV0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvdW5kXG4gIH1cblxuICBzdGF0aWMgX2ZpbmRNZW51KGl0ZW0pIHtcbiAgICBsZXQgY3VyRWwgPSBpdGVtLmNoaWxkTm9kZXNbMF1cbiAgICBsZXQgbWVudSA9IG51bGxcblxuICAgIHdoaWxlIChjdXJFbCAmJiAhbWVudSkge1xuICAgICAgaWYgKGN1ckVsLmNsYXNzTGlzdCAmJiBjdXJFbC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtc3ViJykpIG1lbnUgPSBjdXJFbFxuICAgICAgY3VyRWwgPSBjdXJFbC5uZXh0U2libGluZ1xuICAgIH1cblxuICAgIGlmICghbWVudSkgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgZmluZCBgLm1lbnUtc3ViYCBlbGVtZW50IGZvciB0aGUgY3VycmVudCBgLm1lbnUtdG9nZ2xlYCcpXG5cbiAgICByZXR1cm4gbWVudVxuICB9XG5cbiAgLy8gSGFzIGNsYXNzXG4gIHN0YXRpYyBfaGFzQ2xhc3MoY2xzLCBlbCA9IHdpbmRvdy5IZWxwZXJzLlJPT1RfRUwpIHtcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2VcblxuICAgIGNscy5zcGxpdCgnICcpLmZvckVhY2goYyA9PiB7XG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGMpKSByZXN1bHQgPSB0cnVlXG4gICAgfSlcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIG9wZW4oZWwsIGNsb3NlQ2hpbGRyZW4gPSB0aGlzLl9jbG9zZUNoaWxkcmVuKSB7XG4gICAgY29uc3QgaXRlbSA9IHRoaXMuX2ZpbmRVbm9wZW5lZFBhcmVudChNZW51Ll9nZXRJdGVtKGVsLCB0cnVlKSwgY2xvc2VDaGlsZHJlbilcblxuICAgIGlmICghaXRlbSkgcmV0dXJuXG5cbiAgICBjb25zdCB0b2dnbGVMaW5rID0gTWVudS5fZ2V0TGluayhpdGVtLCB0cnVlKVxuXG4gICAgTWVudS5fcHJvbWlzaWZ5KHRoaXMuX29uT3BlbiwgdGhpcywgaXRlbSwgdG9nZ2xlTGluaywgTWVudS5fZmluZE1lbnUoaXRlbSkpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5faG9yaXpvbnRhbCB8fCAhTWVudS5faXNSb290KGl0ZW0pKSB7XG4gICAgICAgICAgaWYgKHRoaXMuX2FuaW1hdGUgJiYgIXRoaXMuX2hvcml6b250YWwpIHtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5fdG9nZ2xlQW5pbWF0aW9uKHRydWUsIGl0ZW0sIGZhbHNlKSlcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY2NvcmRpb24pIHRoaXMuX2Nsb3NlT3RoZXIoaXRlbSwgY2xvc2VDaGlsZHJlbilcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2FuaW1hdGUpIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgICAgICAgIHRoaXMuX29uT3BlbmVkICYmIHRoaXMuX29uT3BlbmVkKHRoaXMsIGl0ZW0sIHRvZ2dsZUxpbmssIE1lbnUuX2ZpbmRNZW51KGl0ZW0pKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ29wZW4nKVxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuICAgICAgICAgICAgdGhpcy5fb25PcGVuZWQgJiYgdGhpcy5fb25PcGVuZWQodGhpcywgaXRlbSwgdG9nZ2xlTGluaywgTWVudS5fZmluZE1lbnUoaXRlbSkpXG4gICAgICAgICAgICBpZiAodGhpcy5fYWNjb3JkaW9uKSB0aGlzLl9jbG9zZU90aGVyKGl0ZW0sIGNsb3NlQ2hpbGRyZW4pXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgICAgICB0aGlzLl9vbk9wZW5lZCAmJiB0aGlzLl9vbk9wZW5lZCh0aGlzLCBpdGVtLCB0b2dnbGVMaW5rLCBNZW51Ll9maW5kTWVudShpdGVtKSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoKSA9PiB7fSlcbiAgfVxuXG4gIGNsb3NlKGVsLCBjbG9zZUNoaWxkcmVuID0gdGhpcy5fY2xvc2VDaGlsZHJlbiwgX2F1dG9DbG9zZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgaXRlbSA9IE1lbnUuX2dldEl0ZW0oZWwsIHRydWUpXG4gICAgY29uc3QgdG9nZ2xlTGluayA9IE1lbnUuX2dldExpbmsoZWwsIHRydWUpXG5cbiAgICBpZiAoIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykgfHwgaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHJldHVyblxuXG4gICAgTWVudS5fcHJvbWlzaWZ5KHRoaXMuX29uQ2xvc2UsIHRoaXMsIGl0ZW0sIHRvZ2dsZUxpbmssIE1lbnUuX2ZpbmRNZW51KGl0ZW0pLCBfYXV0b0Nsb3NlKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuX2hvcml6b250YWwgfHwgIU1lbnUuX2lzUm9vdChpdGVtKSkge1xuICAgICAgICAgIGlmICh0aGlzLl9hbmltYXRlICYmICF0aGlzLl9ob3Jpem9udGFsKSB7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMuX3RvZ2dsZUFuaW1hdGlvbihmYWxzZSwgaXRlbSwgY2xvc2VDaGlsZHJlbikpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpXG5cbiAgICAgICAgICAgIGlmIChjbG9zZUNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgIGNvbnN0IG9wZW5lZCA9IGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtaXRlbS5vcGVuJylcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvcGVuZWQubGVuZ3RoOyBpIDwgbDsgaSsrKSBvcGVuZWRbaV0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcbiAgICAgICAgICAgIHRoaXMuX29uQ2xvc2VkICYmIHRoaXMuX29uQ2xvc2VkKHRoaXMsIGl0ZW0sIHRvZ2dsZUxpbmssIE1lbnUuX2ZpbmRNZW51KGl0ZW0pKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAgICAgdGhpcy5fb25DbG9zZWQgJiYgdGhpcy5fb25DbG9zZWQodGhpcywgaXRlbSwgdG9nZ2xlTGluaywgTWVudS5fZmluZE1lbnUoaXRlbSkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKCkgPT4ge30pXG4gIH1cblxuICBfY2xvc2VPdGhlcihpdGVtLCBjbG9zZUNoaWxkcmVuKSB7XG4gICAgY29uc3Qgb3BlbmVkID0gTWVudS5fZmluZENoaWxkKGl0ZW0ucGFyZW50Tm9kZSwgWydtZW51LWl0ZW0nLCAnb3BlbiddKVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvcGVuZWQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAob3BlbmVkW2ldICE9PSBpdGVtKSB0aGlzLmNsb3NlKG9wZW5lZFtpXSwgY2xvc2VDaGlsZHJlbilcbiAgICB9XG4gIH1cblxuICB0b2dnbGUoZWwsIGNsb3NlQ2hpbGRyZW4gPSB0aGlzLl9jbG9zZUNoaWxkcmVuKSB7XG4gICAgY29uc3QgaXRlbSA9IE1lbnUuX2dldEl0ZW0oZWwsIHRydWUpXG4gICAgLy8gY29uc3QgdG9nZ2xlTGluayA9IE1lbnUuX2dldExpbmsoZWwsIHRydWUpXG5cbiAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkgdGhpcy5jbG9zZShpdGVtLCBjbG9zZUNoaWxkcmVuKVxuICAgIGVsc2UgdGhpcy5vcGVuKGl0ZW0sIGNsb3NlQ2hpbGRyZW4pXG4gIH1cblxuICBzdGF0aWMgX2dldEl0ZW0oZWwsIHRvZ2dsZSkge1xuICAgIGxldCBpdGVtID0gbnVsbFxuICAgIGNvbnN0IHNlbGVjdG9yID0gdG9nZ2xlID8gJ21lbnUtdG9nZ2xlJyA6ICdtZW51LWxpbmsnXG5cbiAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdtZW51LWl0ZW0nKSkge1xuICAgICAgaWYgKE1lbnUuX2ZpbmRDaGlsZChlbCwgW3NlbGVjdG9yXSkubGVuZ3RoKSBpdGVtID0gZWxcbiAgICB9IGVsc2UgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhzZWxlY3RvcikpIHtcbiAgICAgIGl0ZW0gPSBlbC5wYXJlbnROb2RlLmNsYXNzTGlzdC5jb250YWlucygnbWVudS1pdGVtJykgPyBlbC5wYXJlbnROb2RlIDogbnVsbFxuICAgIH1cblxuICAgIGlmICghaXRlbSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGAke3RvZ2dsZSA/ICdUb2dnYWJsZSAnIDogJyd9XFxgLm1lbnUtaXRlbVxcYCBlbGVtZW50IG5vdCBmb3VuZC5gKVxuICAgIH1cblxuICAgIHJldHVybiBpdGVtXG4gIH1cblxuICBzdGF0aWMgX2dldExpbmsoZWwsIHRvZ2dsZSkge1xuICAgIGxldCBmb3VuZCA9IFtdXG4gICAgY29uc3Qgc2VsZWN0b3IgPSB0b2dnbGUgPyAnbWVudS10b2dnbGUnIDogJ21lbnUtbGluaydcblxuICAgIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoc2VsZWN0b3IpKSBmb3VuZCA9IFtlbF1cbiAgICBlbHNlIGlmIChlbC5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnUtaXRlbScpKSBmb3VuZCA9IE1lbnUuX2ZpbmRDaGlsZChlbCwgW3NlbGVjdG9yXSlcblxuICAgIGlmICghZm91bmQubGVuZ3RoKSB0aHJvdyBuZXcgRXJyb3IoYFxcYCR7c2VsZWN0b3J9XFxgIGVsZW1lbnQgbm90IGZvdW5kLmApXG5cbiAgICByZXR1cm4gZm91bmRbMF1cbiAgfVxuXG4gIF9maW5kVW5vcGVuZWRQYXJlbnQoaXRlbSwgY2xvc2VDaGlsZHJlbikge1xuICAgIGxldCB0cmVlID0gW11cbiAgICBsZXQgcGFyZW50SXRlbSA9IG51bGxcblxuICAgIHdoaWxlIChpdGVtKSB7XG4gICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgcGFyZW50SXRlbSA9IG51bGxcbiAgICAgICAgdHJlZSA9IFtdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHBhcmVudEl0ZW0gPSBpdGVtXG4gICAgICAgIHRyZWUucHVzaChpdGVtKVxuICAgICAgfVxuXG4gICAgICBpdGVtID0gTWVudS5fZmluZFBhcmVudChpdGVtLCAnbWVudS1pdGVtJywgZmFsc2UpXG4gICAgfVxuXG4gICAgaWYgKCFwYXJlbnRJdGVtKSByZXR1cm4gbnVsbFxuICAgIGlmICh0cmVlLmxlbmd0aCA9PT0gMSkgcmV0dXJuIHBhcmVudEl0ZW1cblxuICAgIHRyZWUgPSB0cmVlLnNsaWNlKDAsIHRyZWUuaW5kZXhPZihwYXJlbnRJdGVtKSlcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdHJlZS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRyZWVbaV0uY2xhc3NMaXN0LmFkZCgnb3BlbicpXG5cbiAgICAgIGlmICh0aGlzLl9hY2NvcmRpb24pIHtcbiAgICAgICAgY29uc3Qgb3BlbmVkSXRlbXMgPSBNZW51Ll9maW5kQ2hpbGQodHJlZVtpXS5wYXJlbnROb2RlLCBbJ21lbnUtaXRlbScsICdvcGVuJ10pXG5cbiAgICAgICAgZm9yIChsZXQgaiA9IDAsIGsgPSBvcGVuZWRJdGVtcy5sZW5ndGg7IGogPCBrOyBqKyspIHtcbiAgICAgICAgICBpZiAob3BlbmVkSXRlbXNbal0gIT09IHRyZWVbaV0pIHtcbiAgICAgICAgICAgIG9wZW5lZEl0ZW1zW2pdLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKVxuXG4gICAgICAgICAgICBpZiAoY2xvc2VDaGlsZHJlbikge1xuICAgICAgICAgICAgICBjb25zdCBvcGVuZWRDaGlsZHJlbiA9IG9wZW5lZEl0ZW1zW2pdLnF1ZXJ5U2VsZWN0b3JBbGwoJy5tZW51LWl0ZW0ub3BlbicpXG4gICAgICAgICAgICAgIGZvciAobGV0IHggPSAwLCB6ID0gb3BlbmVkQ2hpbGRyZW4ubGVuZ3RoOyB4IDwgejsgeCsrKSB7XG4gICAgICAgICAgICAgICAgb3BlbmVkQ2hpbGRyZW5beF0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbicpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcGFyZW50SXRlbVxuICB9XG5cbiAgX3RvZ2dsZUFuaW1hdGlvbihvcGVuLCBpdGVtLCBjbG9zZUNoaWxkcmVuKSB7XG4gICAgY29uc3QgdG9nZ2xlTGluayA9IE1lbnUuX2dldExpbmsoaXRlbSwgdHJ1ZSlcbiAgICBjb25zdCBtZW51ID0gTWVudS5fZmluZE1lbnUoaXRlbSlcblxuICAgIE1lbnUuX3VuYmluZEFuaW1hdGlvbkVuZEV2ZW50KGl0ZW0pXG5cbiAgICBjb25zdCBsaW5rSGVpZ2h0ID0gTWF0aC5yb3VuZCh0b2dnbGVMaW5rLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodClcblxuICAgIGl0ZW0uc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJ1xuXG4gICAgY29uc3QgY2xlYXJJdGVtU3R5bGUgPSAoKSA9PiB7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnUtaXRlbS1hbmltYXRpbmcnKVxuICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWl0ZW0tY2xvc2luZycpXG4gICAgICBpdGVtLnN0eWxlLm92ZXJmbG93ID0gbnVsbFxuICAgICAgaXRlbS5zdHlsZS5oZWlnaHQgPSBudWxsXG5cbiAgICAgIHRoaXMudXBkYXRlKClcbiAgICB9XG5cbiAgICBpZiAob3Blbikge1xuICAgICAgaXRlbS5zdHlsZS5oZWlnaHQgPSBgJHtsaW5rSGVpZ2h0fXB4YFxuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdtZW51LWl0ZW0tYW5pbWF0aW5nJylcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnb3BlbicpXG5cbiAgICAgIE1lbnUuX2JpbmRBbmltYXRpb25FbmRFdmVudChpdGVtLCAoKSA9PiB7XG4gICAgICAgIGNsZWFySXRlbVN0eWxlKClcbiAgICAgICAgdGhpcy5fb25PcGVuZWQodGhpcywgaXRlbSwgdG9nZ2xlTGluaywgbWVudSlcbiAgICAgIH0pXG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpdGVtLnN0eWxlLmhlaWdodCA9IGAke2xpbmtIZWlnaHQgKyBNYXRoLnJvdW5kKG1lbnUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KX1weGBcbiAgICAgIH0sIDUwKVxuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtLnN0eWxlLmhlaWdodCA9IGAke2xpbmtIZWlnaHQgKyBNYXRoLnJvdW5kKG1lbnUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0KX1weGBcbiAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnbWVudS1pdGVtLWFuaW1hdGluZycpXG4gICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ21lbnUtaXRlbS1jbG9zaW5nJylcblxuICAgICAgTWVudS5fYmluZEFuaW1hdGlvbkVuZEV2ZW50KGl0ZW0sICgpID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuJylcbiAgICAgICAgY2xlYXJJdGVtU3R5bGUoKVxuXG4gICAgICAgIGlmIChjbG9zZUNoaWxkcmVuKSB7XG4gICAgICAgICAgY29uc3Qgb3BlbmVkID0gaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1pdGVtLm9wZW4nKVxuICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gb3BlbmVkLmxlbmd0aDsgaSA8IGw7IGkrKykgb3BlbmVkW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fb25DbG9zZWQodGhpcywgaXRlbSwgdG9nZ2xlTGluaywgbWVudSlcbiAgICAgIH0pXG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpdGVtLnN0eWxlLmhlaWdodCA9IGAke2xpbmtIZWlnaHR9cHhgXG4gICAgICB9LCA1MClcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgX2JpbmRBbmltYXRpb25FbmRFdmVudChlbCwgaGFuZGxlcikge1xuICAgIGNvbnN0IGNiID0gZSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQgIT09IGVsKSByZXR1cm5cbiAgICAgIE1lbnUuX3VuYmluZEFuaW1hdGlvbkVuZEV2ZW50KGVsKVxuICAgICAgaGFuZGxlcihlKVxuICAgIH1cblxuICAgIGxldCBkdXJhdGlvbiA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS50cmFuc2l0aW9uRHVyYXRpb25cbiAgICBkdXJhdGlvbiA9IHBhcnNlRmxvYXQoZHVyYXRpb24pICogKGR1cmF0aW9uLmluZGV4T2YoJ21zJykgIT09IC0xID8gMSA6IDEwMDApXG5cbiAgICBlbC5fbWVudUFuaW1hdGlvbkVuZEV2ZW50Q2IgPSBjYlxuICAgIFRSQU5TSVRJT05fRVZFTlRTLmZvckVhY2goZXYgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihldiwgZWwuX21lbnVBbmltYXRpb25FbmRFdmVudENiLCBmYWxzZSkpXG5cbiAgICBlbC5fbWVudUFuaW1hdGlvbkVuZEV2ZW50VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY2IoeyB0YXJnZXQ6IGVsIH0pXG4gICAgfSwgZHVyYXRpb24gKyA1MClcbiAgfVxuXG4gIF9nZXRJdGVtT2Zmc2V0KGl0ZW0pIHtcbiAgICBsZXQgY3VySXRlbSA9IHRoaXMuX2lubmVyLmNoaWxkTm9kZXNbMF1cbiAgICBsZXQgbGVmdCA9IDBcblxuICAgIHdoaWxlIChjdXJJdGVtICE9PSBpdGVtKSB7XG4gICAgICBpZiAoY3VySXRlbS50YWdOYW1lKSB7XG4gICAgICAgIGxlZnQgKz0gTWF0aC5yb3VuZChjdXJJdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKVxuICAgICAgfVxuXG4gICAgICBjdXJJdGVtID0gY3VySXRlbS5uZXh0U2libGluZ1xuICAgIH1cblxuICAgIHJldHVybiBsZWZ0XG4gIH1cblxuICBzdGF0aWMgX3Byb21pc2lmeShmbiwgLi4uYXJncykge1xuICAgIGNvbnN0IHJlc3VsdCA9IGZuKC4uLmFyZ3MpXG4gICAgaWYgKHJlc3VsdCBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG4gICAgaWYgKHJlc3VsdCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpXG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICB9XG5cbiAgZ2V0IF9pbm5lcldpZHRoKCkge1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5faW5uZXIuY2hpbGROb2Rlc1xuICAgIGxldCB3aWR0aCA9IDBcblxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gaXRlbXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBpZiAoaXRlbXNbaV0udGFnTmFtZSkge1xuICAgICAgICB3aWR0aCArPSBNYXRoLnJvdW5kKGl0ZW1zW2ldLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB3aWR0aFxuICB9XG5cbiAgZ2V0IF9pbm5lclBvc2l0aW9uKCkge1xuICAgIHJldHVybiBwYXJzZUludCh0aGlzLl9pbm5lci5zdHlsZVt0aGlzLl9ydGwgPyAnbWFyZ2luUmlnaHQnIDogJ21hcmdpbkxlZnQnXSB8fCAnMHB4JywgMTApXG4gIH1cblxuICBzZXQgX2lubmVyUG9zaXRpb24odmFsdWUpIHtcbiAgICB0aGlzLl9pbm5lci5zdHlsZVt0aGlzLl9ydGwgPyAnbWFyZ2luUmlnaHQnIDogJ21hcmdpbkxlZnQnXSA9IGAke3ZhbHVlfXB4YFxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgc3RhdGljIF91bmJpbmRBbmltYXRpb25FbmRFdmVudChlbCkge1xuICAgIGNvbnN0IGNiID0gZWwuX21lbnVBbmltYXRpb25FbmRFdmVudENiXG5cbiAgICBpZiAoZWwuX21lbnVBbmltYXRpb25FbmRFdmVudFRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dChlbC5fbWVudUFuaW1hdGlvbkVuZEV2ZW50VGltZW91dClcbiAgICAgIGVsLl9tZW51QW5pbWF0aW9uRW5kRXZlbnRUaW1lb3V0ID0gbnVsbFxuICAgIH1cblxuICAgIGlmICghY2IpIHJldHVyblxuXG4gICAgVFJBTlNJVElPTl9FVkVOVFMuZm9yRWFjaChldiA9PiBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2LCBjYiwgZmFsc2UpKVxuICAgIGVsLl9tZW51QW5pbWF0aW9uRW5kRXZlbnRDYiA9IG51bGxcbiAgfVxuXG4gIGNsb3NlQWxsKGNsb3NlQ2hpbGRyZW4gPSB0aGlzLl9jbG9zZUNoaWxkcmVuKSB7XG4gICAgY29uc3Qgb3BlbmVkID0gdGhpcy5fZWwucXVlcnlTZWxlY3RvckFsbCgnLm1lbnUtaW5uZXIgPiAubWVudS1pdGVtLm9wZW4nKVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvcGVuZWQubGVuZ3RoOyBpIDwgbDsgaSsrKSB0aGlzLmNsb3NlKG9wZW5lZFtpXSwgY2xvc2VDaGlsZHJlbilcbiAgfVxuXG4gIHN0YXRpYyBzZXREaXNhYmxlZChlbCwgZGlzYWJsZWQpIHtcbiAgICBNZW51Ll9nZXRJdGVtKGVsLCBmYWxzZSkuY2xhc3NMaXN0W2Rpc2FibGVkID8gJ2FkZCcgOiAncmVtb3ZlJ10oJ2Rpc2FibGVkJylcbiAgfVxuXG4gIHN0YXRpYyBpc0FjdGl2ZShlbCkge1xuICAgIHJldHVybiBNZW51Ll9nZXRJdGVtKGVsLCBmYWxzZSkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKVxuICB9XG5cbiAgc3RhdGljIGlzT3BlbmVkKGVsKSB7XG4gICAgcmV0dXJuIE1lbnUuX2dldEl0ZW0oZWwsIGZhbHNlKS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKVxuICB9XG5cbiAgc3RhdGljIGlzRGlzYWJsZWQoZWwpIHtcbiAgICByZXR1cm4gTWVudS5fZ2V0SXRlbShlbCwgZmFsc2UpLmNsYXNzTGlzdC5jb250YWlucygnZGlzYWJsZWQnKVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLl9zY3JvbGxiYXIpIHtcbiAgICAgIHRoaXMuX3Njcm9sbGJhci51cGRhdGUoKVxuICAgIH1cbiAgfVxuXG4gIG1hbmFnZVNjcm9sbCgpIHtcbiAgICBjb25zdCB7IFBlcmZlY3RTY3JvbGxiYXIgfSA9IHdpbmRvd1xuICAgIGNvbnN0IG1lbnVJbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWlubmVyJylcblxuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IHdpbmRvdy5IZWxwZXJzLkxBWU9VVF9CUkVBS1BPSU5UKSB7XG4gICAgICBpZiAodGhpcy5fc2Nyb2xsYmFyICE9PSBudWxsKSB7XG4gICAgICAgIC8vIHdpbmRvdy5IZWxwZXJzLm1lbnVQc1Njcm9sbC5kZXN0cm95KClcbiAgICAgICAgdGhpcy5fc2Nyb2xsYmFyLmRlc3Ryb3koKVxuICAgICAgICB0aGlzLl9zY3JvbGxiYXIgPSBudWxsXG4gICAgICB9XG4gICAgICBtZW51SW5uZXIuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctYXV0bycpXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLl9zY3JvbGxiYXIgPT09IG51bGwpIHtcbiAgICAgICAgY29uc3QgbWVudVNjcm9sbCA9IG5ldyBQZXJmZWN0U2Nyb2xsYmFyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51LWlubmVyJyksIHtcbiAgICAgICAgICBzdXBwcmVzc1Njcm9sbFg6IHRydWUsXG4gICAgICAgICAgd2hlZWxQcm9wYWdhdGlvbjogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgICAgdGhpcy5fc2Nyb2xsYmFyID0gbWVudVNjcm9sbFxuICAgICAgfVxuICAgICAgbWVudUlubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ292ZXJmbG93LWF1dG8nKVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3koKSB7XG4gICAgaWYgKCF0aGlzLl9lbCkgcmV0dXJuXG5cbiAgICB0aGlzLl91bmJpbmRFdmVudHMoKVxuXG4gICAgY29uc3QgaXRlbXMgPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1pdGVtJylcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IGl0ZW1zLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgTWVudS5fdW5iaW5kQW5pbWF0aW9uRW5kRXZlbnQoaXRlbXNbaV0pXG4gICAgICBpdGVtc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LWl0ZW0tYW5pbWF0aW5nJylcbiAgICAgIGl0ZW1zW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKVxuICAgICAgaXRlbXNbaV0uc3R5bGUub3ZlcmZsb3cgPSBudWxsXG4gICAgICBpdGVtc1tpXS5zdHlsZS5oZWlnaHQgPSBudWxsXG4gICAgfVxuXG4gICAgY29uc3QgbWVudXMgPSB0aGlzLl9lbC5xdWVyeVNlbGVjdG9yQWxsKCcubWVudS1tZW51JylcbiAgICBmb3IgKGxldCBpMiA9IDAsIGwyID0gbWVudXMubGVuZ3RoOyBpMiA8IGwyOyBpMisrKSB7XG4gICAgICBtZW51c1tpMl0uc3R5bGUubWFyZ2luUmlnaHQgPSBudWxsXG4gICAgICBtZW51c1tpMl0uc3R5bGUubWFyZ2luTGVmdCA9IG51bGxcbiAgICB9XG5cbiAgICB0aGlzLl9lbC5jbGFzc0xpc3QucmVtb3ZlKCdtZW51LW5vLWFuaW1hdGlvbicpXG5cbiAgICBpZiAodGhpcy5fd3JhcHBlcikge1xuICAgICAgdGhpcy5fcHJldkJ0bi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX3ByZXZCdG4pXG4gICAgICB0aGlzLl9uZXh0QnRuLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fbmV4dEJ0bilcbiAgICAgIHRoaXMuX3dyYXBwZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5faW5uZXIsIHRoaXMuX3dyYXBwZXIpXG4gICAgICB0aGlzLl93cmFwcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5fd3JhcHBlcilcbiAgICAgIHRoaXMuX2lubmVyLnN0eWxlLm1hcmdpbkxlZnQgPSBudWxsXG4gICAgICB0aGlzLl9pbm5lci5zdHlsZS5tYXJnaW5SaWdodCA9IG51bGxcbiAgICB9XG5cbiAgICB0aGlzLl9lbC5tZW51SW5zdGFuY2UgPSBudWxsXG4gICAgZGVsZXRlIHRoaXMuX2VsLm1lbnVJbnN0YW5jZVxuXG4gICAgdGhpcy5fZWwgPSBudWxsXG4gICAgdGhpcy5fYW5pbWF0ZSA9IG51bGxcbiAgICB0aGlzLl9hY2NvcmRpb24gPSBudWxsXG4gICAgdGhpcy5fY2xvc2VDaGlsZHJlbiA9IG51bGxcbiAgICB0aGlzLl9vbk9wZW4gPSBudWxsXG4gICAgdGhpcy5fb25PcGVuZWQgPSBudWxsXG4gICAgdGhpcy5fb25DbG9zZSA9IG51bGxcbiAgICB0aGlzLl9vbkNsb3NlZCA9IG51bGxcbiAgICBpZiAodGhpcy5fc2Nyb2xsYmFyKSB7XG4gICAgICB0aGlzLl9zY3JvbGxiYXIuZGVzdHJveSgpXG4gICAgICB0aGlzLl9zY3JvbGxiYXIgPSBudWxsXG4gICAgfVxuICAgIHRoaXMuX2lubmVyID0gbnVsbFxuICAgIHRoaXMuX3ByZXZCdG4gPSBudWxsXG4gICAgdGhpcy5fd3JhcHBlciA9IG51bGxcbiAgICB0aGlzLl9uZXh0QnRuID0gbnVsbFxuICB9XG59XG5cbmV4cG9ydCB7IE1lbnUgfVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
//# sourceURL=webpack-internal:///./js/menu.js
`)}}));let menu;(function(){document.querySelectorAll("#layout-menu").forEach(function(c){menu=new Menu(c,{orientation:"vertical",closeChildren:!1}),window.Helpers.scrollToActive(!1),window.Helpers.mainMenu=menu}),document.querySelectorAll(".layout-menu-toggle").forEach(c=>{c.addEventListener("click",Q=>{Q.preventDefault(),window.Helpers.toggleCollapsed()})});let t=function(c,Q){let a=null;c.onmouseenter=function(){Helpers.isSmallScreen()?a=setTimeout(Q,0):a=setTimeout(Q,300)},c.onmouseleave=function(){document.querySelector(".layout-menu-toggle").classList.remove("d-block"),clearTimeout(a)}};document.getElementById("layout-menu")&&t(document.getElementById("layout-menu"),function(){Helpers.isSmallScreen()||document.querySelector(".layout-menu-toggle").classList.add("d-block")});let s=document.getElementsByClassName("menu-inner"),i=document.getElementsByClassName("menu-inner-shadow")[0];s.length>0&&i&&s[0].addEventListener("ps-scroll-y",function(){this.querySelector(".ps__thumb-y").offsetTop?i.style.display="block":i.style.display="none"}),[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(c){return new bootstrap.Tooltip(c)});const o=function(c){c.type=="show.bs.collapse"||c.type=="show.bs.collapse"?c.target.closest(".accordion-item").classList.add("active"):c.target.closest(".accordion-item").classList.remove("active")};[].slice.call(document.querySelectorAll(".accordion")).map(function(c){c.addEventListener("show.bs.collapse",o),c.addEventListener("hide.bs.collapse",o)}),window.Helpers.setAutoUpdate(!0),window.Helpers.initPasswordToggle(),window.Helpers.initSpeechToText(),!window.Helpers.isSmallScreen()&&window.Helpers.setCollapsed(!0,!1)})();
