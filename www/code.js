
Function.prototype.property = function(prop, desc) {
    Object.defineProperty(this.prototype, prop, desc);
};

/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
var dat=dat||{};dat.gui=dat.gui||{};dat.utils=dat.utils||{};dat.controllers=dat.controllers||{};dat.dom=dat.dom||{};dat.color=dat.color||{};dat.utils.css=function(){return{load:function(e,a){var a=a||document,c=a.createElement("link");c.type="text/css";c.rel="stylesheet";c.href=e;a.getElementsByTagName("head")[0].appendChild(c)},inject:function(e,a){var a=a||document,c=document.createElement("style");c.type="text/css";c.innerHTML=e;a.getElementsByTagName("head")[0].appendChild(c)}}}();
dat.utils.common=function(){var e=Array.prototype.forEach,a=Array.prototype.slice;return{BREAK:{},extend:function(c){this.each(a.call(arguments,1),function(a){for(var f in a)this.isUndefined(a[f])||(c[f]=a[f])},this);return c},defaults:function(c){this.each(a.call(arguments,1),function(a){for(var f in a)this.isUndefined(c[f])&&(c[f]=a[f])},this);return c},compose:function(){var c=a.call(arguments);return function(){for(var d=a.call(arguments),f=c.length-1;f>=0;f--)d=[c[f].apply(this,d)];return d[0]}},
each:function(a,d,f){if(e&&a.forEach===e)a.forEach(d,f);else if(a.length===a.length+0)for(var b=0,n=a.length;b<n;b++){if(b in a&&d.call(f,a[b],b)===this.BREAK)break}else for(b in a)if(d.call(f,a[b],b)===this.BREAK)break},defer:function(a){setTimeout(a,0)},toArray:function(c){return c.toArray?c.toArray():a.call(c)},isUndefined:function(a){return a===void 0},isNull:function(a){return a===null},isNaN:function(a){return a!==a},isArray:Array.isArray||function(a){return a.constructor===Array},isObject:function(a){return a===
Object(a)},isNumber:function(a){return a===a+0},isString:function(a){return a===a+""},isBoolean:function(a){return a===false||a===true},isFunction:function(a){return Object.prototype.toString.call(a)==="[object Function]"}}}();
dat.controllers.Controller=function(e){var a=function(a,d){this.initialValue=a[d];this.domElement=document.createElement("div");this.object=a;this.property=d;this.__onFinishChange=this.__onChange=void 0};e.extend(a.prototype,{onChange:function(a){this.__onChange=a;return this},onFinishChange:function(a){this.__onFinishChange=a;return this},setValue:function(a){this.object[this.property]=a;this.__onChange&&this.__onChange.call(this,a);this.updateDisplay();return this},getValue:function(){return this.object[this.property]},
updateDisplay:function(){return this},isModified:function(){return this.initialValue!==this.getValue()}});return a}(dat.utils.common);
dat.dom.dom=function(e){function a(b){if(b==="0"||e.isUndefined(b))return 0;b=b.match(d);return!e.isNull(b)?parseFloat(b[1]):0}var c={};e.each({HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},function(b,a){e.each(b,function(b){c[b]=a})});var d=/(\d+(\.\d+)?)px/,f={makeSelectable:function(b,a){if(!(b===void 0||b.style===void 0))b.onselectstart=a?function(){return false}:function(){},b.style.MozUserSelect=a?"auto":"none",b.style.KhtmlUserSelect=
a?"auto":"none",b.unselectable=a?"on":"off"},makeFullscreen:function(b,a,d){e.isUndefined(a)&&(a=true);e.isUndefined(d)&&(d=true);b.style.position="absolute";if(a)b.style.left=0,b.style.right=0;if(d)b.style.top=0,b.style.bottom=0},fakeEvent:function(b,a,d,f){var d=d||{},m=c[a];if(!m)throw Error("Event type "+a+" not supported.");var l=document.createEvent(m);switch(m){case "MouseEvents":l.initMouseEvent(a,d.bubbles||false,d.cancelable||true,window,d.clickCount||1,0,0,d.x||d.clientX||0,d.y||d.clientY||
0,false,false,false,false,0,null);break;case "KeyboardEvents":m=l.initKeyboardEvent||l.initKeyEvent;e.defaults(d,{cancelable:true,ctrlKey:false,altKey:false,shiftKey:false,metaKey:false,keyCode:void 0,charCode:void 0});m(a,d.bubbles||false,d.cancelable,window,d.ctrlKey,d.altKey,d.shiftKey,d.metaKey,d.keyCode,d.charCode);break;default:l.initEvent(a,d.bubbles||false,d.cancelable||true)}e.defaults(l,f);b.dispatchEvent(l)},bind:function(b,a,d,c){b.addEventListener?b.addEventListener(a,d,c||false):b.attachEvent&&
b.attachEvent("on"+a,d);return f},unbind:function(b,a,d,c){b.removeEventListener?b.removeEventListener(a,d,c||false):b.detachEvent&&b.detachEvent("on"+a,d);return f},addClass:function(b,a){if(b.className===void 0)b.className=a;else if(b.className!==a){var d=b.className.split(/ +/);if(d.indexOf(a)==-1)d.push(a),b.className=d.join(" ").replace(/^\s+/,"").replace(/\s+$/,"")}return f},removeClass:function(b,a){if(a){if(b.className!==void 0)if(b.className===a)b.removeAttribute("class");else{var d=b.className.split(/ +/),
c=d.indexOf(a);if(c!=-1)d.splice(c,1),b.className=d.join(" ")}}else b.className=void 0;return f},hasClass:function(a,d){return RegExp("(?:^|\\s+)"+d+"(?:\\s+|$)").test(a.className)||false},getWidth:function(b){b=getComputedStyle(b);return a(b["border-left-width"])+a(b["border-right-width"])+a(b["padding-left"])+a(b["padding-right"])+a(b.width)},getHeight:function(b){b=getComputedStyle(b);return a(b["border-top-width"])+a(b["border-bottom-width"])+a(b["padding-top"])+a(b["padding-bottom"])+a(b.height)},
getOffset:function(a){var d={left:0,top:0};if(a.offsetParent){do d.left+=a.offsetLeft,d.top+=a.offsetTop;while(a=a.offsetParent)}return d},isActive:function(a){return a===document.activeElement&&(a.type||a.href)}};return f}(dat.utils.common);
dat.controllers.OptionController=function(e,a,c){var d=function(f,b,e){d.superclass.call(this,f,b);var h=this;this.__select=document.createElement("select");if(c.isArray(e)){var j={};c.each(e,function(a){j[a]=a});e=j}c.each(e,function(a,b){var d=document.createElement("option");d.innerHTML=b;d.setAttribute("value",a);h.__select.appendChild(d)});this.updateDisplay();a.bind(this.__select,"change",function(){h.setValue(this.options[this.selectedIndex].value)});this.domElement.appendChild(this.__select)};
d.superclass=e;c.extend(d.prototype,e.prototype,{setValue:function(a){a=d.superclass.prototype.setValue.call(this,a);this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue());return a},updateDisplay:function(){this.__select.value=this.getValue();return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common);
dat.controllers.NumberController=function(e,a){var c=function(d,f,b){c.superclass.call(this,d,f);b=b||{};this.__min=b.min;this.__max=b.max;this.__step=b.step;d=this.__impliedStep=a.isUndefined(this.__step)?this.initialValue==0?1:Math.pow(10,Math.floor(Math.log(this.initialValue)/Math.LN10))/10:this.__step;d=d.toString();this.__precision=d.indexOf(".")>-1?d.length-d.indexOf(".")-1:0};c.superclass=e;a.extend(c.prototype,e.prototype,{setValue:function(a){if(this.__min!==void 0&&a<this.__min)a=this.__min;
else if(this.__max!==void 0&&a>this.__max)a=this.__max;this.__step!==void 0&&a%this.__step!=0&&(a=Math.round(a/this.__step)*this.__step);return c.superclass.prototype.setValue.call(this,a)},min:function(a){this.__min=a;return this},max:function(a){this.__max=a;return this},step:function(a){this.__step=a;return this}});return c}(dat.controllers.Controller,dat.utils.common);
dat.controllers.NumberControllerBox=function(e,a,c){var d=function(f,b,e){function h(){var a=parseFloat(l.__input.value);c.isNaN(a)||l.setValue(a)}function j(a){var b=o-a.clientY;l.setValue(l.getValue()+b*l.__impliedStep);o=a.clientY}function m(){a.unbind(window,"mousemove",j);a.unbind(window,"mouseup",m)}this.__truncationSuspended=false;d.superclass.call(this,f,b,e);var l=this,o;this.__input=document.createElement("input");this.__input.setAttribute("type","text");a.bind(this.__input,"change",h);
a.bind(this.__input,"blur",function(){h();l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())});a.bind(this.__input,"mousedown",function(b){a.bind(window,"mousemove",j);a.bind(window,"mouseup",m);o=b.clientY});a.bind(this.__input,"keydown",function(a){if(a.keyCode===13)l.__truncationSuspended=true,this.blur(),l.__truncationSuspended=false});this.updateDisplay();this.domElement.appendChild(this.__input)};d.superclass=e;c.extend(d.prototype,e.prototype,{updateDisplay:function(){var a=this.__input,
b;if(this.__truncationSuspended)b=this.getValue();else{b=this.getValue();var c=Math.pow(10,this.__precision);b=Math.round(b*c)/c}a.value=b;return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.NumberController,dat.dom.dom,dat.utils.common);
dat.controllers.NumberControllerSlider=function(e,a,c,d,f){var b=function(d,c,f,e,l){function o(b){b.preventDefault();var d=a.getOffset(g.__background),c=a.getWidth(g.__background);g.setValue(g.__min+(g.__max-g.__min)*((b.clientX-d.left)/(d.left+c-d.left)));return false}function y(){a.unbind(window,"mousemove",o);a.unbind(window,"mouseup",y);g.__onFinishChange&&g.__onFinishChange.call(g,g.getValue())}b.superclass.call(this,d,c,{min:f,max:e,step:l});var g=this;this.__background=document.createElement("div");
this.__foreground=document.createElement("div");a.bind(this.__background,"mousedown",function(b){a.bind(window,"mousemove",o);a.bind(window,"mouseup",y);o(b)});a.addClass(this.__background,"slider");a.addClass(this.__foreground,"slider-fg");this.updateDisplay();this.__background.appendChild(this.__foreground);this.domElement.appendChild(this.__background)};b.superclass=e;b.useDefaultStyles=function(){c.inject(f)};d.extend(b.prototype,e.prototype,{updateDisplay:function(){this.__foreground.style.width=
(this.getValue()-this.__min)/(this.__max-this.__min)*100+"%";return b.superclass.prototype.updateDisplay.call(this)}});return b}(dat.controllers.NumberController,dat.dom.dom,dat.utils.css,dat.utils.common,".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}");
dat.controllers.FunctionController=function(e,a,c){var d=function(c,b,e){d.superclass.call(this,c,b);var h=this;this.__button=document.createElement("div");this.__button.innerHTML=e===void 0?"Fire":e;a.bind(this.__button,"click",function(a){a.preventDefault();h.fire();return false});a.addClass(this.__button,"button");this.domElement.appendChild(this.__button)};d.superclass=e;c.extend(d.prototype,e.prototype,{fire:function(){this.__onChange&&this.__onChange.call(this);this.__onFinishChange&&this.__onFinishChange.call(this,
this.getValue());this.getValue().call(this.object)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common);
dat.controllers.BooleanController=function(e,a,c){var d=function(c,b){d.superclass.call(this,c,b);var e=this;this.__prev=this.getValue();this.__checkbox=document.createElement("input");this.__checkbox.setAttribute("type","checkbox");a.bind(this.__checkbox,"change",function(){e.setValue(!e.__prev)},false);this.domElement.appendChild(this.__checkbox);this.updateDisplay()};d.superclass=e;c.extend(d.prototype,e.prototype,{setValue:function(a){a=d.superclass.prototype.setValue.call(this,a);this.__onFinishChange&&
this.__onFinishChange.call(this,this.getValue());this.__prev=this.getValue();return a},updateDisplay:function(){this.getValue()===true?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=true):this.__checkbox.checked=false;return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common);
dat.color.toString=function(e){return function(a){if(a.a==1||e.isUndefined(a.a)){for(a=a.hex.toString(16);a.length<6;)a="0"+a;return"#"+a}else return"rgba("+Math.round(a.r)+","+Math.round(a.g)+","+Math.round(a.b)+","+a.a+")"}}(dat.utils.common);
dat.color.interpret=function(e,a){var c,d,f=[{litmus:a.isString,conversions:{THREE_CHAR_HEX:{read:function(a){a=a.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return a===null?false:{space:"HEX",hex:parseInt("0x"+a[1].toString()+a[1].toString()+a[2].toString()+a[2].toString()+a[3].toString()+a[3].toString())}},write:e},SIX_CHAR_HEX:{read:function(a){a=a.match(/^#([A-F0-9]{6})$/i);return a===null?false:{space:"HEX",hex:parseInt("0x"+a[1].toString())}},write:e},CSS_RGB:{read:function(a){a=a.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
return a===null?false:{space:"RGB",r:parseFloat(a[1]),g:parseFloat(a[2]),b:parseFloat(a[3])}},write:e},CSS_RGBA:{read:function(a){a=a.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);return a===null?false:{space:"RGB",r:parseFloat(a[1]),g:parseFloat(a[2]),b:parseFloat(a[3]),a:parseFloat(a[4])}},write:e}}},{litmus:a.isNumber,conversions:{HEX:{read:function(a){return{space:"HEX",hex:a,conversionName:"HEX"}},write:function(a){return a.hex}}}},{litmus:a.isArray,conversions:{RGB_ARRAY:{read:function(a){return a.length!=
3?false:{space:"RGB",r:a[0],g:a[1],b:a[2]}},write:function(a){return[a.r,a.g,a.b]}},RGBA_ARRAY:{read:function(a){return a.length!=4?false:{space:"RGB",r:a[0],g:a[1],b:a[2],a:a[3]}},write:function(a){return[a.r,a.g,a.b,a.a]}}}},{litmus:a.isObject,conversions:{RGBA_OBJ:{read:function(b){return a.isNumber(b.r)&&a.isNumber(b.g)&&a.isNumber(b.b)&&a.isNumber(b.a)?{space:"RGB",r:b.r,g:b.g,b:b.b,a:b.a}:false},write:function(a){return{r:a.r,g:a.g,b:a.b,a:a.a}}},RGB_OBJ:{read:function(b){return a.isNumber(b.r)&&
a.isNumber(b.g)&&a.isNumber(b.b)?{space:"RGB",r:b.r,g:b.g,b:b.b}:false},write:function(a){return{r:a.r,g:a.g,b:a.b}}},HSVA_OBJ:{read:function(b){return a.isNumber(b.h)&&a.isNumber(b.s)&&a.isNumber(b.v)&&a.isNumber(b.a)?{space:"HSV",h:b.h,s:b.s,v:b.v,a:b.a}:false},write:function(a){return{h:a.h,s:a.s,v:a.v,a:a.a}}},HSV_OBJ:{read:function(b){return a.isNumber(b.h)&&a.isNumber(b.s)&&a.isNumber(b.v)?{space:"HSV",h:b.h,s:b.s,v:b.v}:false},write:function(a){return{h:a.h,s:a.s,v:a.v}}}}}];return function(){d=
false;var b=arguments.length>1?a.toArray(arguments):arguments[0];a.each(f,function(e){if(e.litmus(b))return a.each(e.conversions,function(e,f){c=e.read(b);if(d===false&&c!==false)return d=c,c.conversionName=f,c.conversion=e,a.BREAK}),a.BREAK});return d}}(dat.color.toString,dat.utils.common);
dat.GUI=dat.gui.GUI=function(e,a,c,d,f,b,n,h,j,m,l,o,y,g,i){function q(a,b,r,c){if(b[r]===void 0)throw Error("Object "+b+' has no property "'+r+'"');c.color?b=new l(b,r):(b=[b,r].concat(c.factoryArgs),b=d.apply(a,b));if(c.before instanceof f)c.before=c.before.__li;t(a,b);g.addClass(b.domElement,"c");r=document.createElement("span");g.addClass(r,"property-name");r.innerHTML=b.property;var e=document.createElement("div");e.appendChild(r);e.appendChild(b.domElement);c=s(a,e,c.before);g.addClass(c,k.CLASS_CONTROLLER_ROW);
g.addClass(c,typeof b.getValue());p(a,c,b);a.__controllers.push(b);return b}function s(a,b,d){var c=document.createElement("li");b&&c.appendChild(b);d?a.__ul.insertBefore(c,params.before):a.__ul.appendChild(c);a.onResize();return c}function p(a,d,c){c.__li=d;c.__gui=a;i.extend(c,{options:function(b){if(arguments.length>1)return c.remove(),q(a,c.object,c.property,{before:c.__li.nextElementSibling,factoryArgs:[i.toArray(arguments)]});if(i.isArray(b)||i.isObject(b))return c.remove(),q(a,c.object,c.property,
{before:c.__li.nextElementSibling,factoryArgs:[b]})},name:function(a){c.__li.firstElementChild.firstElementChild.innerHTML=a;return c},listen:function(){c.__gui.listen(c);return c},remove:function(){c.__gui.remove(c);return c}});if(c instanceof j){var e=new h(c.object,c.property,{min:c.__min,max:c.__max,step:c.__step});i.each(["updateDisplay","onChange","onFinishChange"],function(a){var b=c[a],H=e[a];c[a]=e[a]=function(){var a=Array.prototype.slice.call(arguments);b.apply(c,a);return H.apply(e,a)}});
g.addClass(d,"has-slider");c.domElement.insertBefore(e.domElement,c.domElement.firstElementChild)}else if(c instanceof h){var f=function(b){return i.isNumber(c.__min)&&i.isNumber(c.__max)?(c.remove(),q(a,c.object,c.property,{before:c.__li.nextElementSibling,factoryArgs:[c.__min,c.__max,c.__step]})):b};c.min=i.compose(f,c.min);c.max=i.compose(f,c.max)}else if(c instanceof b)g.bind(d,"click",function(){g.fakeEvent(c.__checkbox,"click")}),g.bind(c.__checkbox,"click",function(a){a.stopPropagation()});
else if(c instanceof n)g.bind(d,"click",function(){g.fakeEvent(c.__button,"click")}),g.bind(d,"mouseover",function(){g.addClass(c.__button,"hover")}),g.bind(d,"mouseout",function(){g.removeClass(c.__button,"hover")});else if(c instanceof l)g.addClass(d,"color"),c.updateDisplay=i.compose(function(a){d.style.borderLeftColor=c.__color.toString();return a},c.updateDisplay),c.updateDisplay();c.setValue=i.compose(function(b){a.getRoot().__preset_select&&c.isModified()&&B(a.getRoot(),true);return b},c.setValue)}
function t(a,b){var c=a.getRoot(),d=c.__rememberedObjects.indexOf(b.object);if(d!=-1){var e=c.__rememberedObjectIndecesToControllers[d];e===void 0&&(e={},c.__rememberedObjectIndecesToControllers[d]=e);e[b.property]=b;if(c.load&&c.load.remembered){c=c.load.remembered;if(c[a.preset])c=c[a.preset];else if(c[w])c=c[w];else return;if(c[d]&&c[d][b.property]!==void 0)d=c[d][b.property],b.initialValue=d,b.setValue(d)}}}function I(a){var b=a.__save_row=document.createElement("li");g.addClass(a.domElement,
"has-save");a.__ul.insertBefore(b,a.__ul.firstChild);g.addClass(b,"save-row");var c=document.createElement("span");c.innerHTML="&nbsp;";g.addClass(c,"button gears");var d=document.createElement("span");d.innerHTML="Save";g.addClass(d,"button");g.addClass(d,"save");var e=document.createElement("span");e.innerHTML="New";g.addClass(e,"button");g.addClass(e,"save-as");var f=document.createElement("span");f.innerHTML="Revert";g.addClass(f,"button");g.addClass(f,"revert");var m=a.__preset_select=document.createElement("select");
a.load&&a.load.remembered?i.each(a.load.remembered,function(b,c){C(a,c,c==a.preset)}):C(a,w,false);g.bind(m,"change",function(){for(var b=0;b<a.__preset_select.length;b++)a.__preset_select[b].innerHTML=a.__preset_select[b].value;a.preset=this.value});b.appendChild(m);b.appendChild(c);b.appendChild(d);b.appendChild(e);b.appendChild(f);if(u){var b=document.getElementById("dg-save-locally"),l=document.getElementById("dg-local-explain");b.style.display="block";b=document.getElementById("dg-local-storage");
localStorage.getItem(document.location.href+".isLocal")==="true"&&b.setAttribute("checked","checked");var o=function(){l.style.display=a.useLocalStorage?"block":"none"};o();g.bind(b,"change",function(){a.useLocalStorage=!a.useLocalStorage;o()})}var h=document.getElementById("dg-new-constructor");g.bind(h,"keydown",function(a){a.metaKey&&(a.which===67||a.keyCode==67)&&x.hide()});g.bind(c,"click",function(){h.innerHTML=JSON.stringify(a.getSaveObject(),void 0,2);x.show();h.focus();h.select()});g.bind(d,
"click",function(){a.save()});g.bind(e,"click",function(){var b=prompt("Enter a new preset name.");b&&a.saveAs(b)});g.bind(f,"click",function(){a.revert()})}function J(a){function b(f){f.preventDefault();e=f.clientX;g.addClass(a.__closeButton,k.CLASS_DRAG);g.bind(window,"mousemove",c);g.bind(window,"mouseup",d);return false}function c(b){b.preventDefault();a.width+=e-b.clientX;a.onResize();e=b.clientX;return false}function d(){g.removeClass(a.__closeButton,k.CLASS_DRAG);g.unbind(window,"mousemove",
c);g.unbind(window,"mouseup",d)}a.__resize_handle=document.createElement("div");i.extend(a.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});var e;g.bind(a.__resize_handle,"mousedown",b);g.bind(a.__closeButton,"mousedown",b);a.domElement.insertBefore(a.__resize_handle,a.domElement.firstElementChild)}function D(a,b){a.domElement.style.width=b+"px";if(a.__save_row&&a.autoPlace)a.__save_row.style.width=b+"px";if(a.__closeButton)a.__closeButton.style.width=
b+"px"}function z(a,b){var c={};i.each(a.__rememberedObjects,function(d,e){var f={};i.each(a.__rememberedObjectIndecesToControllers[e],function(a,c){f[c]=b?a.initialValue:a.getValue()});c[e]=f});return c}function C(a,b,c){var d=document.createElement("option");d.innerHTML=b;d.value=b;a.__preset_select.appendChild(d);if(c)a.__preset_select.selectedIndex=a.__preset_select.length-1}function B(a,b){var c=a.__preset_select[a.__preset_select.selectedIndex];c.innerHTML=b?c.value+"*":c.value}function E(a){a.length!=
0&&o(function(){E(a)});i.each(a,function(a){a.updateDisplay()})}e.inject(c);var w="Default",u;try{u="localStorage"in window&&window.localStorage!==null}catch(K){u=false}var x,F=true,v,A=false,G=[],k=function(a){function b(){localStorage.setItem(document.location.href+".gui",JSON.stringify(d.getSaveObject()))}function c(){var a=d.getRoot();a.width+=1;i.defer(function(){a.width-=1})}var d=this;this.domElement=document.createElement("div");this.__ul=document.createElement("ul");this.domElement.appendChild(this.__ul);
g.addClass(this.domElement,"dg");this.__folders={};this.__controllers=[];this.__rememberedObjects=[];this.__rememberedObjectIndecesToControllers=[];this.__listening=[];a=a||{};a=i.defaults(a,{autoPlace:true,width:k.DEFAULT_WIDTH});a=i.defaults(a,{resizable:a.autoPlace,hideable:a.autoPlace});if(i.isUndefined(a.load))a.load={preset:w};else if(a.preset)a.load.preset=a.preset;i.isUndefined(a.parent)&&a.hideable&&G.push(this);a.resizable=i.isUndefined(a.parent)&&a.resizable;if(a.autoPlace&&i.isUndefined(a.scrollable))a.scrollable=
true;var e=u&&localStorage.getItem(document.location.href+".isLocal")==="true";Object.defineProperties(this,{parent:{get:function(){return a.parent}},scrollable:{get:function(){return a.scrollable}},autoPlace:{get:function(){return a.autoPlace}},preset:{get:function(){return d.parent?d.getRoot().preset:a.load.preset},set:function(b){d.parent?d.getRoot().preset=b:a.load.preset=b;for(b=0;b<this.__preset_select.length;b++)if(this.__preset_select[b].value==this.preset)this.__preset_select.selectedIndex=
b;d.revert()}},width:{get:function(){return a.width},set:function(b){a.width=b;D(d,b)}},name:{get:function(){return a.name},set:function(b){a.name=b;if(m)m.innerHTML=a.name}},closed:{get:function(){return a.closed},set:function(b){a.closed=b;a.closed?g.addClass(d.__ul,k.CLASS_CLOSED):g.removeClass(d.__ul,k.CLASS_CLOSED);this.onResize();if(d.__closeButton)d.__closeButton.innerHTML=b?k.TEXT_OPEN:k.TEXT_CLOSED}},load:{get:function(){return a.load}},useLocalStorage:{get:function(){return e},set:function(a){u&&
((e=a)?g.bind(window,"unload",b):g.unbind(window,"unload",b),localStorage.setItem(document.location.href+".isLocal",a))}}});if(i.isUndefined(a.parent)){a.closed=false;g.addClass(this.domElement,k.CLASS_MAIN);g.makeSelectable(this.domElement,false);if(u&&e){d.useLocalStorage=true;var f=localStorage.getItem(document.location.href+".gui");if(f)a.load=JSON.parse(f)}this.__closeButton=document.createElement("div");this.__closeButton.innerHTML=k.TEXT_CLOSED;g.addClass(this.__closeButton,k.CLASS_CLOSE_BUTTON);
this.domElement.appendChild(this.__closeButton);g.bind(this.__closeButton,"click",function(){d.closed=!d.closed})}else{if(a.closed===void 0)a.closed=true;var m=document.createTextNode(a.name);g.addClass(m,"controller-name");f=s(d,m);g.addClass(this.__ul,k.CLASS_CLOSED);g.addClass(f,"title");g.bind(f,"click",function(a){a.preventDefault();d.closed=!d.closed;return false});if(!a.closed)this.closed=false}a.autoPlace&&(i.isUndefined(a.parent)&&(F&&(v=document.createElement("div"),g.addClass(v,"dg"),g.addClass(v,
k.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(v),F=false),v.appendChild(this.domElement),g.addClass(this.domElement,k.CLASS_AUTO_PLACE)),this.parent||D(d,a.width));g.bind(window,"resize",function(){d.onResize()});g.bind(this.__ul,"webkitTransitionEnd",function(){d.onResize()});g.bind(this.__ul,"transitionend",function(){d.onResize()});g.bind(this.__ul,"oTransitionEnd",function(){d.onResize()});this.onResize();a.resizable&&J(this);d.getRoot();a.parent||c()};k.toggleHide=function(){A=!A;i.each(G,
function(a){a.domElement.style.zIndex=A?-999:999;a.domElement.style.opacity=A?0:1})};k.CLASS_AUTO_PLACE="a";k.CLASS_AUTO_PLACE_CONTAINER="ac";k.CLASS_MAIN="main";k.CLASS_CONTROLLER_ROW="cr";k.CLASS_TOO_TALL="taller-than-window";k.CLASS_CLOSED="closed";k.CLASS_CLOSE_BUTTON="close-button";k.CLASS_DRAG="drag";k.DEFAULT_WIDTH=245;k.TEXT_CLOSED="Close Controls";k.TEXT_OPEN="Open Controls";g.bind(window,"keydown",function(a){document.activeElement.type!=="text"&&(a.which===72||a.keyCode==72)&&k.toggleHide()},
false);i.extend(k.prototype,{add:function(a,b){return q(this,a,b,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(a,b){return q(this,a,b,{color:true})},remove:function(a){this.__ul.removeChild(a.__li);this.__controllers.slice(this.__controllers.indexOf(a),1);var b=this;i.defer(function(){b.onResize()})},destroy:function(){this.autoPlace&&v.removeChild(this.domElement)},addFolder:function(a){if(this.__folders[a]!==void 0)throw Error('You already have a folder in this GUI by the name "'+
a+'"');var b={name:a,parent:this};b.autoPlace=this.autoPlace;if(this.load&&this.load.folders&&this.load.folders[a])b.closed=this.load.folders[a].closed,b.load=this.load.folders[a];b=new k(b);this.__folders[a]=b;a=s(this,b.domElement);g.addClass(a,"folder");return b},open:function(){this.closed=false},close:function(){this.closed=true},onResize:function(){var a=this.getRoot();if(a.scrollable){var b=g.getOffset(a.__ul).top,c=0;i.each(a.__ul.childNodes,function(b){a.autoPlace&&b===a.__save_row||(c+=
g.getHeight(b))});window.innerHeight-b-20<c?(g.addClass(a.domElement,k.CLASS_TOO_TALL),a.__ul.style.height=window.innerHeight-b-20+"px"):(g.removeClass(a.domElement,k.CLASS_TOO_TALL),a.__ul.style.height="auto")}a.__resize_handle&&i.defer(function(){a.__resize_handle.style.height=a.__ul.offsetHeight+"px"});if(a.__closeButton)a.__closeButton.style.width=a.width+"px"},remember:function(){if(i.isUndefined(x))x=new y,x.domElement.innerHTML=a;if(this.parent)throw Error("You can only call remember on a top level GUI.");
var b=this;i.each(Array.prototype.slice.call(arguments),function(a){b.__rememberedObjects.length==0&&I(b);b.__rememberedObjects.indexOf(a)==-1&&b.__rememberedObjects.push(a)});this.autoPlace&&D(this,this.width)},getRoot:function(){for(var a=this;a.parent;)a=a.parent;return a},getSaveObject:function(){var a=this.load;a.closed=this.closed;if(this.__rememberedObjects.length>0){a.preset=this.preset;if(!a.remembered)a.remembered={};a.remembered[this.preset]=z(this)}a.folders={};i.each(this.__folders,function(b,
c){a.folders[c]=b.getSaveObject()});return a},save:function(){if(!this.load.remembered)this.load.remembered={};this.load.remembered[this.preset]=z(this);B(this,false)},saveAs:function(a){if(!this.load.remembered)this.load.remembered={},this.load.remembered[w]=z(this,true);this.load.remembered[a]=z(this);this.preset=a;C(this,a,true)},revert:function(a){i.each(this.__controllers,function(b){this.getRoot().load.remembered?t(a||this.getRoot(),b):b.setValue(b.initialValue)},this);i.each(this.__folders,
function(a){a.revert(a)});a||B(this.getRoot(),false)},listen:function(a){var b=this.__listening.length==0;this.__listening.push(a);b&&E(this.__listening)}});return k}(dat.utils.css,'<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>',
".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n",
dat.controllers.factory=function(e,a,c,d,f,b,n){return function(h,j,m,l){var o=h[j];if(n.isArray(m)||n.isObject(m))return new e(h,j,m);if(n.isNumber(o))return n.isNumber(m)&&n.isNumber(l)?new c(h,j,m,l):new a(h,j,{min:m,max:l});if(n.isString(o))return new d(h,j);if(n.isFunction(o))return new f(h,j,"");if(n.isBoolean(o))return new b(h,j)}}(dat.controllers.OptionController,dat.controllers.NumberControllerBox,dat.controllers.NumberControllerSlider,dat.controllers.StringController=function(e,a,c){var d=
function(c,b){function e(){h.setValue(h.__input.value)}d.superclass.call(this,c,b);var h=this;this.__input=document.createElement("input");this.__input.setAttribute("type","text");a.bind(this.__input,"keyup",e);a.bind(this.__input,"change",e);a.bind(this.__input,"blur",function(){h.__onFinishChange&&h.__onFinishChange.call(h,h.getValue())});a.bind(this.__input,"keydown",function(a){a.keyCode===13&&this.blur()});this.updateDisplay();this.domElement.appendChild(this.__input)};d.superclass=e;c.extend(d.prototype,
e.prototype,{updateDisplay:function(){if(!a.isActive(this.__input))this.__input.value=this.getValue();return d.superclass.prototype.updateDisplay.call(this)}});return d}(dat.controllers.Controller,dat.dom.dom,dat.utils.common),dat.controllers.FunctionController,dat.controllers.BooleanController,dat.utils.common),dat.controllers.Controller,dat.controllers.BooleanController,dat.controllers.FunctionController,dat.controllers.NumberControllerBox,dat.controllers.NumberControllerSlider,dat.controllers.OptionController,
dat.controllers.ColorController=function(e,a,c,d,f){function b(a,b,c,d){a.style.background="";f.each(j,function(e){a.style.cssText+="background: "+e+"linear-gradient("+b+", "+c+" 0%, "+d+" 100%); "})}function n(a){a.style.background="";a.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";a.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
a.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";a.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";a.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var h=function(e,l){function o(b){q(b);a.bind(window,"mousemove",q);a.bind(window,
"mouseup",j)}function j(){a.unbind(window,"mousemove",q);a.unbind(window,"mouseup",j)}function g(){var a=d(this.value);a!==false?(p.__color.__state=a,p.setValue(p.__color.toOriginal())):this.value=p.__color.toString()}function i(){a.unbind(window,"mousemove",s);a.unbind(window,"mouseup",i)}function q(b){b.preventDefault();var c=a.getWidth(p.__saturation_field),d=a.getOffset(p.__saturation_field),e=(b.clientX-d.left+document.body.scrollLeft)/c,b=1-(b.clientY-d.top+document.body.scrollTop)/c;b>1?b=
1:b<0&&(b=0);e>1?e=1:e<0&&(e=0);p.__color.v=b;p.__color.s=e;p.setValue(p.__color.toOriginal());return false}function s(b){b.preventDefault();var c=a.getHeight(p.__hue_field),d=a.getOffset(p.__hue_field),b=1-(b.clientY-d.top+document.body.scrollTop)/c;b>1?b=1:b<0&&(b=0);p.__color.h=b*360;p.setValue(p.__color.toOriginal());return false}h.superclass.call(this,e,l);this.__color=new c(this.getValue());this.__temp=new c(0);var p=this;this.domElement=document.createElement("div");a.makeSelectable(this.domElement,
false);this.__selector=document.createElement("div");this.__selector.className="selector";this.__saturation_field=document.createElement("div");this.__saturation_field.className="saturation-field";this.__field_knob=document.createElement("div");this.__field_knob.className="field-knob";this.__field_knob_border="2px solid ";this.__hue_knob=document.createElement("div");this.__hue_knob.className="hue-knob";this.__hue_field=document.createElement("div");this.__hue_field.className="hue-field";this.__input=
document.createElement("input");this.__input.type="text";this.__input_textShadow="0 1px 1px ";a.bind(this.__input,"keydown",function(a){a.keyCode===13&&g.call(this)});a.bind(this.__input,"blur",g);a.bind(this.__selector,"mousedown",function(){a.addClass(this,"drag").bind(window,"mouseup",function(){a.removeClass(p.__selector,"drag")})});var t=document.createElement("div");f.extend(this.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"});
f.extend(this.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:this.__field_knob_border+(this.__color.v<0.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1});f.extend(this.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1});f.extend(this.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"});f.extend(t.style,
{width:"100%",height:"100%",background:"none"});b(t,"top","rgba(0,0,0,0)","#000");f.extend(this.__hue_field.style,{width:"15px",height:"100px",display:"inline-block",border:"1px solid #555",cursor:"ns-resize"});n(this.__hue_field);f.extend(this.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:this.__input_textShadow+"rgba(0,0,0,0.7)"});a.bind(this.__saturation_field,"mousedown",o);a.bind(this.__field_knob,"mousedown",o);a.bind(this.__hue_field,"mousedown",
function(b){s(b);a.bind(window,"mousemove",s);a.bind(window,"mouseup",i)});this.__saturation_field.appendChild(t);this.__selector.appendChild(this.__field_knob);this.__selector.appendChild(this.__saturation_field);this.__selector.appendChild(this.__hue_field);this.__hue_field.appendChild(this.__hue_knob);this.domElement.appendChild(this.__input);this.domElement.appendChild(this.__selector);this.updateDisplay()};h.superclass=e;f.extend(h.prototype,e.prototype,{updateDisplay:function(){var a=d(this.getValue());
if(a!==false){var e=false;f.each(c.COMPONENTS,function(b){if(!f.isUndefined(a[b])&&!f.isUndefined(this.__color.__state[b])&&a[b]!==this.__color.__state[b])return e=true,{}},this);e&&f.extend(this.__color.__state,a)}f.extend(this.__temp.__state,this.__color.__state);this.__temp.a=1;var h=this.__color.v<0.5||this.__color.s>0.5?255:0,j=255-h;f.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toString(),border:this.__field_knob_border+
"rgb("+h+","+h+","+h+")"});this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px";this.__temp.s=1;this.__temp.v=1;b(this.__saturation_field,"left","#fff",this.__temp.toString());f.extend(this.__input.style,{backgroundColor:this.__input.value=this.__color.toString(),color:"rgb("+h+","+h+","+h+")",textShadow:this.__input_textShadow+"rgba("+j+","+j+","+j+",.7)"})}});var j=["-moz-","-o-","-webkit-","-ms-",""];return h}(dat.controllers.Controller,dat.dom.dom,dat.color.Color=function(e,a,c,d){function f(a,
b,c){Object.defineProperty(a,b,{get:function(){if(this.__state.space==="RGB")return this.__state[b];n(this,b,c);return this.__state[b]},set:function(a){if(this.__state.space!=="RGB")n(this,b,c),this.__state.space="RGB";this.__state[b]=a}})}function b(a,b){Object.defineProperty(a,b,{get:function(){if(this.__state.space==="HSV")return this.__state[b];h(this);return this.__state[b]},set:function(a){if(this.__state.space!=="HSV")h(this),this.__state.space="HSV";this.__state[b]=a}})}function n(b,c,e){if(b.__state.space===
"HEX")b.__state[c]=a.component_from_hex(b.__state.hex,e);else if(b.__state.space==="HSV")d.extend(b.__state,a.hsv_to_rgb(b.__state.h,b.__state.s,b.__state.v));else throw"Corrupted color state";}function h(b){var c=a.rgb_to_hsv(b.r,b.g,b.b);d.extend(b.__state,{s:c.s,v:c.v});if(d.isNaN(c.h)){if(d.isUndefined(b.__state.h))b.__state.h=0}else b.__state.h=c.h}var j=function(){this.__state=e.apply(this,arguments);if(this.__state===false)throw"Failed to interpret color arguments";this.__state.a=this.__state.a||
1};j.COMPONENTS="r,g,b,h,s,v,hex,a".split(",");d.extend(j.prototype,{toString:function(){return c(this)},toOriginal:function(){return this.__state.conversion.write(this)}});f(j.prototype,"r",2);f(j.prototype,"g",1);f(j.prototype,"b",0);b(j.prototype,"h");b(j.prototype,"s");b(j.prototype,"v");Object.defineProperty(j.prototype,"a",{get:function(){return this.__state.a},set:function(a){this.__state.a=a}});Object.defineProperty(j.prototype,"hex",{get:function(){if(!this.__state.space!=="HEX")this.__state.hex=
a.rgb_to_hex(this.r,this.g,this.b);return this.__state.hex},set:function(a){this.__state.space="HEX";this.__state.hex=a}});return j}(dat.color.interpret,dat.color.math=function(){var e;return{hsv_to_rgb:function(a,c,d){var e=a/60-Math.floor(a/60),b=d*(1-c),n=d*(1-e*c),c=d*(1-(1-e)*c),a=[[d,c,b],[n,d,b],[b,d,c],[b,n,d],[c,b,d],[d,b,n]][Math.floor(a/60)%6];return{r:a[0]*255,g:a[1]*255,b:a[2]*255}},rgb_to_hsv:function(a,c,d){var e=Math.min(a,c,d),b=Math.max(a,c,d),e=b-e;if(b==0)return{h:NaN,s:0,v:0};
a=a==b?(c-d)/e:c==b?2+(d-a)/e:4+(a-c)/e;a/=6;a<0&&(a+=1);return{h:a*360,s:e/b,v:b/255}},rgb_to_hex:function(a,c,d){a=this.hex_with_component(0,2,a);a=this.hex_with_component(a,1,c);return a=this.hex_with_component(a,0,d)},component_from_hex:function(a,c){return a>>c*8&255},hex_with_component:function(a,c,d){return d<<(e=c*8)|a&~(255<<e)}}}(),dat.color.toString,dat.utils.common),dat.color.interpret,dat.utils.common),dat.utils.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||
window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1E3/60)}}(),dat.dom.CenteredDiv=function(e,a){var c=function(){this.backgroundElement=document.createElement("div");a.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear"});e.makeFullscreen(this.backgroundElement);this.backgroundElement.style.position="fixed";this.domElement=
document.createElement("div");a.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear"});document.body.appendChild(this.backgroundElement);document.body.appendChild(this.domElement);var c=this;e.bind(this.backgroundElement,"click",function(){c.hide()})};c.prototype.show=function(){var c=this;this.backgroundElement.style.display="block";this.domElement.style.display="block";this.domElement.style.opacity=
0;this.domElement.style.webkitTransform="scale(1.1)";this.layout();a.defer(function(){c.backgroundElement.style.opacity=1;c.domElement.style.opacity=1;c.domElement.style.webkitTransform="scale(1)"})};c.prototype.hide=function(){var a=this,c=function(){a.domElement.style.display="none";a.backgroundElement.style.display="none";e.unbind(a.domElement,"webkitTransitionEnd",c);e.unbind(a.domElement,"transitionend",c);e.unbind(a.domElement,"oTransitionEnd",c)};e.bind(this.domElement,"webkitTransitionEnd",
c);e.bind(this.domElement,"transitionend",c);e.bind(this.domElement,"oTransitionEnd",c);this.backgroundElement.style.opacity=0;this.domElement.style.opacity=0;this.domElement.style.webkitTransform="scale(1.1)"};c.prototype.layout=function(){this.domElement.style.left=window.innerWidth/2-e.getWidth(this.domElement)/2+"px";this.domElement.style.top=window.innerHeight/2-e.getHeight(this.domElement)/2+"px"};return c}(dat.dom.dom,dat.utils.common),dat.dom.dom,dat.utils.common);;

// Generated by CoffeeScript 1.3.3
(function() {
  var log_count, now, start;

  if (window.performance) {
    if (window.performance.now) {
      now = function() {
        return window.performance.now();
      };
    } else if (window.performance.webkitNow) {
      now = function() {
        return window.performance.webkitNow();
      };
    } else if (window.performance.mozNow) {
      now = function() {
        return window.performance.mozNow();
      };
    } else if (window.performance.oNow) {
      now = function() {
        return window.performance.oNow();
      };
    } else {
      now = function() {
        return Date.now();
      };
    }
  } else {
    now = function() {
      return Date.now();
    };
  }

  start = now();

  window.gettime = function() {
    return (now() - start) / 1000;
  };

  if (!window.requestAnimationFrame) {
    if (window.webkitRequestAnimationFrame) {
      window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    } else if (window.mozRequestAnimationFrame) {
      window.requestAnimationFrame = window.mozRequestAnimationFrame;
    } else if (window.oRequestAnimationFrame) {
      window.requestAnimationFrame = window.oRequestAnimationFrame;
    } else {
      window.requestAnimationFrame = function(fun) {
        return setTimeout(fun, 1000 / 30);
      };
    }
  }

  window.URL = window.URL || window.mozURL || window.webkitURL || window.oURL;

  window.BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.OBlobBuilder;

  log_count = 0;

  window.console.logN = function(n) {
    var args;
    if (log_count < n) {
      log_count += 1;
      args = [].slice.call(arguments, 1);
      return console.log.apply(console, args);
    }
  };

}).call(this);
;

/**
 * @author mrdoob / http://mrdoob.com/
 */

var Stats = function () {

	var startTime = Date.now(), prevTime = startTime;
	var ms = 0, msMin = 1000, msMax = 0;
	var fps = 0, fpsMin = 1000, fpsMax = 0;
	var frames = 0, mode = 0;	

	var container = document.createElement( 'div' );
	container.id = 'stats';
	container.addEventListener( 'mousedown', function ( event ) { event.preventDefault(); setMode( ++ mode % 2 ) }, false );
	container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

	var fpsDiv = document.createElement( 'div' );
	fpsDiv.id = 'fps';
	fpsDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#002';
	container.appendChild( fpsDiv );

	var fpsText = document.createElement( 'div' );
	fpsText.id = 'fpsText';
	fpsText.style.cssText = 'color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	fpsText.innerHTML = 'FPS';
	fpsDiv.appendChild( fpsText );

	var fpsGraph = document.createElement( 'div' );
	fpsGraph.id = 'fpsGraph';
	fpsGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0ff';
	fpsDiv.appendChild( fpsGraph );

	while ( fpsGraph.children.length < 74 ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#113';
		fpsGraph.appendChild( bar );

	}

	var msDiv = document.createElement( 'div' );
	msDiv.id = 'ms';
	msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:#020;display:none';
	container.appendChild( msDiv );

	var msText = document.createElement( 'div' );
	msText.id = 'msText';
	msText.style.cssText = 'color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	msText.innerHTML = 'MS';
	msDiv.appendChild( msText );

	var msGraph = document.createElement( 'div' );
	msGraph.id = 'msGraph';
	msGraph.style.cssText = 'position:relative;width:74px;height:30px;background-color:#0f0';
	msDiv.appendChild( msGraph );

	while ( msGraph.children.length < 74 ) {

		var bar = document.createElement( 'span' );
		bar.style.cssText = 'width:1px;height:30px;float:left;background-color:#131';
		msGraph.appendChild( bar );

	}

	var setMode = function ( value ) {

		mode = value;

		switch ( mode ) {

			case 0:
				fpsDiv.style.display = 'block';
				msDiv.style.display = 'none';
				break;
			case 1:
				fpsDiv.style.display = 'none';
				msDiv.style.display = 'block';
				break;
		}

	}

	var updateGraph = function ( dom, value ) {

		var child = dom.appendChild( dom.firstChild );
		child.style.height = value + 'px';

	}

	return {

		domElement: container,

		setMode: setMode,

		begin: function () {

			startTime = Date.now();

		},

		end: function () {

			var time = Date.now();

			ms = time - startTime;
			msMin = Math.min( msMin, ms );
			msMax = Math.max( msMax, ms );

			msText.textContent = ms + ' MS (' + msMin + '-' + msMax + ')';
			updateGraph( msGraph, Math.min( 30, 30 - ( ms / 200 ) * 30 ) );

			frames ++;

			if ( time > prevTime + 1000 ) {

				fps = Math.round( ( frames * 1000 ) / ( time - prevTime ) );
				fpsMin = Math.min( fpsMin, fps );
				fpsMax = Math.max( fpsMax, fps );

				fpsText.textContent = fps + ' FPS (' + fpsMin + '-' + fpsMax + ')';
				updateGraph( fpsGraph, Math.min( 30, 30 - ( fps / 100 ) * 30 ) );

				prevTime = time;
				frames = 0;

			}

			return time;

		},

		update: function () {

			startTime = this.end();
			
		}

	}
	
};
;

// Generated by CoffeeScript 1.3.3
(function() {
  var fs, getBuffer, getJSON, isImage, makeBlob, makeURL, resolvePath;

  fs = {};

  makeURL = function(blob) {
    return URL.createObjectURL(blob);
  };

  makeBlob = function(data, type) {
    var blob;
    blob = new Blob([data], {
      type: type
    });
    return blob;
  };

  window.getURL = function(data, mime) {
    var blob;
    blob = makeBlob(data, mime);
    return makeURL(blob);
  };

  resolvePath = function(base, path) {
    if (path[0] === '/') {
      return path;
    } else {
      path = path.split('/');
      if (base === '/') {
        base = [''];
      } else {
        base = base.split('/');
      }
      while (base.length > 0 && path.length > 0 && path[0] === '..') {
        base.pop();
        path.shift();
      }
      if (base.length === 0 || path.length === 0 || base[0] !== '') {
        throw "Invalid path: " + (base.join('/')) + "/" + (path.join('/'));
      }
      return "" + (base.join('/')) + "/" + (path.join('/'));
    }
  };

  getJSON = function(url, callback) {
    var request;
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      return callback(JSON.parse(request.response));
    };
    return request.send();
  };

  getBuffer = function(url, progress, callback) {
    var request;
    request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function() {
      return callback(request.response);
    };
    request.onprogress = function(event) {
      if (event.lengthComputable) {
        return progress(event.loaded / event.total);
      }
    };
    return request.send();
  };

  isImage = function(path) {
    return path.match('\.jpg$|\.jpeg|\.gif$|\.png');
  };

  window.loader = {
    resolvePath: resolvePath,
    main: function() {
      var main;
      main = this.require('main');
      if (main.main) {
        return main.main();
      } else {
        throw 'Main function is not defined in main module.';
      }
    },
    define: function(path, code) {
      var dirname, folder, get, require;
      dirname = path.split('/');
      dirname.pop();
      dirname = dirname.join('/');
      require = function(modpath) {
        var abspath, node;
        abspath = resolvePath(dirname, modpath);
        node = fs["" + abspath + ".js"];
        if (!node) {
          node = fs["" + abspath + "/module.js"];
        }
        if (!node) {
          throw "Module not found: " + abspath;
        }
        if (!node.value) {
          node.create();
        }
        return node.value;
      };
      get = function(respath) {
        var abspath, node;
        abspath = resolvePath(dirname, respath);
        node = fs[abspath];
        if (!node) {
          throw "Resource not found: " + abspath;
        }
        return node;
      };
      get.exists = function(respath) {
        var abspath, node;
        abspath = resolvePath(dirname, respath);
        node = fs[abspath];
        return node !== void 0;
      };
      folder = get.folder = function(folderpath) {
        var folder_abs;
        folder_abs = resolvePath(dirname, folderpath);
        return {
          path: folder_abs,
          name: folder_abs.split('/')[folder_abs.split('/').length - 1],
          get: function(respath) {
            var node, nodepath;
            nodepath = resolvePath(folder_abs, respath);
            node = fs[nodepath];
            if (!node) {
              throw "Resource not found: " + nodepath;
            }
            return node;
          },
          exists: function(respath) {
            var nodepath;
            nodepath = resolvePath(folder_abs, respath);
            return fs[nodepath] !== void 0;
          },
          listdir: function(respath) {
            var match, name, nodepath, result, translated, _i, _len;
            if (respath) {
              nodepath = resolvepath(folder_abs, respath);
            } else {
              nodepath = folder_abs;
            }
            result = [];
            for (name in fs) {
              match = name.match("" + folder_abs + "/[a-zA-Z0-9-\.]+");
              if (match) {
                match = match[0];
                if (result.indexOf(match) === -1) {
                  result.push(match);
                }
              }
            }
            translated = [];
            for (_i = 0, _len = result.length; _i < _len; _i++) {
              name = result[_i];
              if (name.match(/\.[a-z]+$/)) {
                translated.push(name);
              } else {
                translated.push(folder(name));
              }
            }
            return translated;
          }
        };
      };
      get.listdir = function(respath, match) {
        var abspath, name, result;
        if (respath) {
          abspath = resolvePath(dirname, respath);
        } else {
          abspath = dirname;
        }
        result = [];
        for (name in fs) {
          if (name.search(abspath) === 0) {
            if (match) {
              if (name.match(match)) {
                result.push(name);
              }
            } else {
              result.push(name);
            }
          }
        }
        return result;
      };
      return fs[path] = {
        path: path,
        type: 'code',
        data: code,
        create: function() {
          var retval;
          this.value = {};
          retval = code(this.value, require, get);
          if (retval) {
            return this.value = retval;
          }
        }
      };
    },
    require: function(modpath) {
      var abspath, node;
      abspath = resolvePath('/', modpath);
      node = fs["" + abspath + ".js"];
      if (!node) {
        node = fs["" + abspath + "/module.js"];
      }
      if (!node) {
        throw "Module not found: " + abspath;
      }
      if (!node.value) {
        node.create();
      }
      return node.value;
    },
    loadPack: function(_arg) {
      var files, hooks, loaded, progress, url;
      url = _arg.url, progress = _arg.progress, loaded = _arg.loaded;
      files = {};
      hooks = this.hooks;
      return getBuffer(url, (function(factor) {
        if (progress) {
          return progress(factor * 0.5, 'network');
        }
      }), function(data) {
        var decoded, decoding, doLoad, i, info, length, metadata, name, result, _i;
        decoding = 0;
        decoded = 0;
        doLoad = function(name, info) {
          var decode, dst, matcher, src, storage;
          if (typeof info === 'object' && info.offset !== void 0 && info.size !== void 0) {
            storage = new ArrayBuffer(info.size);
            dst = new Uint8Array(storage);
            src = new Uint8Array(data, 8 + length + info.offset, info.size);
            dst.set(src);
            dst = dst.buffer;
            if (hooks) {
              for (matcher in hooks) {
                decode = hooks[matcher];
                if (name.match(matcher)) {
                  decoding += 1;
                  decode(name, dst, function(result) {
                    decoded += 1;
                    files[name] = result;
                    if (progress) {
                      progress(0.5 + (decoded / decoding) * 0.5, 'decode');
                    }
                    if (decoding === decoded && loaded) {
                      return loaded(files);
                    }
                  });
                  return;
                }
              }
            }
            return files[name] = dst;
          } else {
            if (hooks) {
              for (matcher in hooks) {
                decode = hooks[matcher];
                if (name.match(matcher)) {
                  decode(name, info, function(result) {
                    return files[name] = result;
                  });
                  return;
                }
              }
            }
            return files[name] = info;
          }
        };
        length = new Uint32Array(data, 4, 1)[0];
        metadata = new Uint8Array(data, 8, length);
        result = '';
        for (i = _i = 0; 0 <= length ? _i < length : _i > length; i = 0 <= length ? ++_i : --_i) {
          result += String.fromCharCode(metadata[i]);
        }
        result = JSON.parse(result);
        for (name in result) {
          info = result[name];
          doLoad(name, info, data);
        }
        if (decoding === decoded && loaded) {
          return loaded(files);
        }
      });
    },
    hooks: function(hooks) {
      this.hooks = hooks;
      return this;
    },
    mount: function(_arg) {
      var loaded, mountpoint, progress, url;
      url = _arg.url, mountpoint = _arg.mountpoint, progress = _arg.progress, loaded = _arg.loaded;
      if (mountpoint == null) {
        mountpoint = '/';
      }
      return this.loadPack({
        url: url,
        progress: progress,
        loaded: function(data) {
          var name, value;
          for (name in data) {
            value = data[name];
            fs[name] = value;
          }
          return loaded(data, fs);
        }
      });
    }
  };

}).call(this);
;

// Generated by CoffeeScript 1.3.3
(function() {
  var Vec3, Vec4;

  window.Vec3 = Vec3 = (function() {

    Vec3.property('x', {
      get: function() {
        return this.data[0];
      },
      set: function(val) {
        return this.data[0] = val;
      }
    });

    Vec3.property('y', {
      get: function() {
        return this.data[1];
      },
      set: function(val) {
        return this.data[1] = val;
      }
    });

    Vec3.property('z', {
      get: function() {
        return this.data[2];
      },
      set: function(val) {
        return this.data[2] = val;
      }
    });

    Vec3.property('length', {
      get: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      }
    });

    function Vec3(data) {
      var _ref;
      this.data = data;
      if ((_ref = this.data) == null) {
        this.data = new Float32Array(3);
      }
    }

    Vec3.prototype.sub = function(other, dst) {
      if (dst == null) {
        dst = this;
      }
      dst.x = this.x - other.x;
      dst.y = this.y - other.y;
      dst.z = this.z - other.z;
      return dst;
    };

    Vec3.prototype.add = function(other, dst) {
      if (dst == null) {
        dst = this;
      }
      dst.x = this.x + other.x;
      dst.y = this.y + other.y;
      dst.z = this.z + other.z;
      return dst;
    };

    Vec3.prototype.addVal3 = function(x, y, z, dst) {
      if (dst == null) {
        dst = this;
      }
      dst.x = this.x + x;
      dst.y = this.y + y;
      dst.z = this.z + z;
      return dst;
    };

    Vec3.prototype.mul = function(scalar, dst) {
      if (dst == null) {
        dst = this;
      }
      dst.x = this.x * scalar;
      dst.y = this.y * scalar;
      dst.z = this.z * scalar;
      return dst;
    };

    Vec3.prototype.div = function(scalar, dst) {
      if (dst == null) {
        dst = this;
      }
      dst.x = this.x / scalar;
      dst.y = this.y / scalar;
      dst.z = this.z / scalar;
      return dst;
    };

    Vec3.prototype.divVal3 = function(x, y, z, dst) {
      if (dst == null) {
        dst = this;
      }
      dst.x = this.x / x;
      dst.y = this.y / y;
      dst.z = this.z / z;
      return dst;
    };

    Vec3.prototype.dot = function(other) {
      return this.x * other.x + this.y * other.y + this.z * other.z;
    };

    Vec3.prototype.normalize = function(dst) {
      var l;
      if (dst == null) {
        dst = this;
      }
      l = this.length;
      if (l > 0) {
        this.mul(1 / this.length, dst);
      }
      return dst;
    };

    Vec3.prototype.set = function(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    };

    return Vec3;

  })();

  window.Vec4 = Vec4 = (function() {

    Vec4.property('x', {
      get: function() {
        return this.data[0];
      },
      set: function(val) {
        return this.data[0] = val;
      }
    });

    Vec4.property('y', {
      get: function() {
        return this.data[1];
      },
      set: function(val) {
        return this.data[1] = val;
      }
    });

    Vec4.property('z', {
      get: function() {
        return this.data[2];
      },
      set: function(val) {
        return this.data[2] = val;
      }
    });

    Vec4.property('w', {
      get: function() {
        return this.data[3];
      },
      set: function(val) {
        return this.data[3] = val;
      }
    });

    function Vec4(data) {
      var _ref;
      this.data = data;
      if ((_ref = this.data) == null) {
        this.data = new Float32Array(4);
      }
    }

    Vec4.prototype.sub = function(other, dst) {
      if (dst == null) {
        dst = this;
      }
      dst.x = this.x - other.x;
      dst.y = this.y - other.y;
      dst.z = this.z - other.z;
      dst.w = this.w - other.w;
      return dst;
    };

    Vec4.prototype.dot = function(other) {
      return this.x * other.x + this.y * other.y + this.z * other.z + this.w * other.w;
    };

    Vec4.prototype.toVec3 = function(dst) {
      if (dst == null) {
        dst = new Vec3();
      }
      dst.x = this.x;
      dst.y = this.y;
      dst.z = this.z;
      return dst;
    };

    return Vec4;

  })();

}).call(this);
;

// Generated by CoffeeScript 1.3.3
(function() {
  var Mat3, Mat4, arc, deg, pi, tau;

  pi = Math.PI;

  tau = 2 * pi;

  deg = 360 / tau;

  arc = tau / 360;

  window.Mat3 = Mat3 = (function() {

    function Mat3(data) {
      var _ref;
      this.data = data;
      if ((_ref = this.data) == null) {
        this.data = new Float32Array(9);
      }
      this.identity();
    }

    Mat3.prototype.identity = function() {
      var d;
      d = this.data;
      d[0] = 1;
      d[1] = 0;
      d[2] = 0;
      d[3] = 0;
      d[4] = 1;
      d[5] = 0;
      d[6] = 0;
      d[7] = 0;
      d[8] = 1;
      return this;
    };

    Mat3.prototype.transpose = function() {
      var a01, a02, a12, d;
      d = this.data;
      a01 = d[1];
      a02 = d[2];
      a12 = d[5];
      d[1] = d[3];
      d[2] = d[6];
      d[3] = a01;
      d[5] = d[7];
      d[6] = a02;
      d[7] = a12;
      return this;
    };

    Mat3.prototype.mulVec3 = function(vec, dst) {
      if (dst == null) {
        dst = vec;
      }
      this.mulVal3(vec.x, vec.y, vec.z, dst);
      return dst;
    };

    Mat3.prototype.mulVal3 = function(x, y, z, dst) {
      var d;
      dst = dst.data;
      d = this.data;
      dst[0] = d[0] * x + d[3] * y + d[6] * z;
      dst[1] = d[1] * x + d[4] * y + d[7] * z;
      dst[2] = d[2] * x + d[5] * y + d[8] * z;
      return this;
    };

    Mat3.prototype.rotatex = function(angle) {
      var c, s;
      s = Math.sin(angle * arc);
      c = Math.cos(angle * arc);
      return this.amul(1, 0, 0, 0, c, s, 0, -s, c);
    };

    Mat3.prototype.rotatey = function(angle) {
      var c, s;
      s = Math.sin(angle * arc);
      c = Math.cos(angle * arc);
      return this.amul(c, 0, -s, 0, 1, 0, s, 0, c);
    };

    Mat3.prototype.rotatez = function(angle) {
      var c, s;
      s = Math.sin(angle * arc);
      c = Math.cos(angle * arc);
      return this.amul(c, s, 0, -s, c, 0, 0, 0, 1);
    };

    Mat3.prototype.amul = function(b00, b10, b20, b01, b11, b21, b02, b12, b22, b03, b13, b23) {
      var a, a00, a01, a02, a10, a11, a12, a20, a21, a22;
      a = this.data;
      a00 = a[0];
      a10 = a[1];
      a20 = a[2];
      a01 = a[3];
      a11 = a[4];
      a21 = a[5];
      a02 = a[6];
      a12 = a[7];
      a22 = a[8];
      a[0] = a00 * b00 + a01 * b10 + a02 * b20;
      a[1] = a10 * b00 + a11 * b10 + a12 * b20;
      a[2] = a20 * b00 + a21 * b10 + a22 * b20;
      a[3] = a00 * b01 + a01 * b11 + a02 * b21;
      a[4] = a10 * b01 + a11 * b11 + a12 * b21;
      a[5] = a20 * b01 + a21 * b11 + a22 * b21;
      a[6] = a00 * b02 + a01 * b12 + a02 * b22;
      a[7] = a10 * b02 + a11 * b12 + a12 * b22;
      a[8] = a20 * b02 + a21 * b12 + a22 * b22;
      return this;
    };

    Mat3.prototype.log = function() {
      var d;
      d = this.data;
      return console.log('%f, %f, %f,\n%f, %f, %f, \n%f, %f, %f, ', d[0], d[1], d[2], d[3], d[4], d[5], d[6], d[7], d[8]);
    };

    return Mat3;

  })();

  window.Mat4 = Mat4 = (function() {

    function Mat4(data) {
      var _ref;
      this.data = data;
      if ((_ref = this.data) == null) {
        this.data = new Float32Array(16);
      }
      this.identity();
    }

    Mat4.prototype.identity = function() {
      var d;
      d = this.data;
      d[0] = 1;
      d[1] = 0;
      d[2] = 0;
      d[3] = 0;
      d[4] = 0;
      d[5] = 1;
      d[6] = 0;
      d[7] = 0;
      d[8] = 0;
      d[9] = 0;
      d[10] = 1;
      d[11] = 0;
      d[12] = 0;
      d[13] = 0;
      d[14] = 0;
      d[15] = 1;
      return this;
    };

    Mat4.prototype.zero = function() {
      var d;
      d = this.data;
      d[0] = 0;
      d[1] = 0;
      d[2] = 0;
      d[3] = 0;
      d[4] = 0;
      d[5] = 0;
      d[6] = 0;
      d[7] = 0;
      d[8] = 0;
      d[9] = 0;
      d[10] = 0;
      d[11] = 0;
      d[12] = 0;
      d[13] = 0;
      d[14] = 0;
      d[15] = 0;
      return this;
    };

    Mat4.prototype.copy = function(dest) {
      var dst, src;
      src = this.data;
      dst = dest.data;
      dst[0] = src[0];
      dst[1] = src[1];
      dst[2] = src[2];
      dst[3] = src[3];
      dst[4] = src[4];
      dst[5] = src[5];
      dst[6] = src[6];
      dst[7] = src[7];
      dst[8] = src[8];
      dst[9] = src[9];
      dst[10] = src[10];
      dst[11] = src[11];
      dst[12] = src[12];
      dst[13] = src[13];
      dst[14] = src[14];
      dst[15] = src[15];
      return dest;
    };

    Mat4.prototype.toMat3 = function(dest) {
      var dst, src;
      src = this.data;
      dst = dest.data;
      dst[0] = src[0];
      dst[1] = src[1];
      dst[2] = src[2];
      dst[3] = src[4];
      dst[4] = src[5];
      dst[5] = src[6];
      dst[6] = src[8];
      dst[7] = src[9];
      dst[8] = src[10];
      return dest;
    };

    Mat4.prototype.toMat3Rot = function(dest) {
      var a00, a01, a02, a10, a11, a12, a20, a21, a22, b01, b11, b21, d, dst, id, src;
      dst = dest.data;
      src = this.data;
      a00 = src[0];
      a01 = src[1];
      a02 = src[2];
      a10 = src[4];
      a11 = src[5];
      a12 = src[6];
      a20 = src[8];
      a21 = src[9];
      a22 = src[10];
      b01 = a22 * a11 - a12 * a21;
      b11 = -a22 * a10 + a12 * a20;
      b21 = a21 * a10 - a11 * a20;
      d = a00 * b01 + a01 * b11 + a02 * b21;
      id = 1 / d;
      dst[0] = b01 * id;
      dst[3] = (-a22 * a01 + a02 * a21) * id;
      dst[6] = (a12 * a01 - a02 * a11) * id;
      dst[1] = b11 * id;
      dst[4] = (a22 * a00 - a02 * a20) * id;
      dst[7] = (-a12 * a00 + a02 * a10) * id;
      dst[2] = b21 * id;
      dst[5] = (-a21 * a00 + a01 * a20) * id;
      dst[8] = (a11 * a00 - a01 * a10) * id;
      return dest;
    };

    Mat4.prototype.perspective = function(fov, aspect, near, far) {
      var bottom, d, left, right, top;
      this.zero();
      d = this.data;
      top = near * Math.tan(fov * Math.PI / 360);
      right = top * aspect;
      left = -right;
      bottom = -top;
      d[0] = (2 * near) / (right - left);
      d[5] = (2 * near) / (top - bottom);
      d[8] = (right + left) / (right - left);
      d[9] = (top + bottom) / (top - bottom);
      d[10] = -(far + near) / (far - near);
      d[11] = -1;
      d[14] = -(2 * far * near) / (far - near);
      return this;
    };

    Mat4.prototype.inversePerspective = function(fov, aspect, near, far) {
      var bottom, dst, left, right, top;
      this.zero();
      dst = this.data;
      top = near * Math.tan(fov * Math.PI / 360);
      right = top * aspect;
      left = -right;
      bottom = -top;
      dst[0] = (right - left) / (2 * near);
      dst[5] = (top - bottom) / (2 * near);
      dst[11] = -(far - near) / (2 * far * near);
      dst[12] = (right + left) / (2 * near);
      dst[13] = (top + bottom) / (2 * near);
      dst[14] = -1;
      dst[15] = (far + near) / (2 * far * near);
      return this;
    };

    Mat4.prototype.ortho = function(near, far, top, bottom, left, right) {
      var fn, rl, tb;
      if (near == null) {
        near = -1;
      }
      if (far == null) {
        far = 1;
      }
      if (top == null) {
        top = -1;
      }
      if (bottom == null) {
        bottom = 1;
      }
      if (left == null) {
        left = -1;
      }
      if (right == null) {
        right = 1;
      }
      rl = right - left;
      tb = top - bottom;
      fn = far - near;
      return this.set(2 / rl, 0, 0, -(left + right) / rl, 0, 2 / tb, 0, -(top + bottom) / tb, 0, 0, -2 / fn, -(far + near) / fn, 0, 0, 0, 1);
    };

    Mat4.prototype.inverseOrtho = function(near, far, top, bottom, left, right) {
      var a, b, c, d, e, f, g;
      if (near == null) {
        near = -1;
      }
      if (far == null) {
        far = 1;
      }
      if (top == null) {
        top = -1;
      }
      if (bottom == null) {
        bottom = 1;
      }
      if (left == null) {
        left = -1;
      }
      if (right == null) {
        right = 1;
      }
      a = (right - left) / 2;
      b = (right + left) / 2;
      c = (top - bottom) / 2;
      d = (top + bottom) / 2;
      e = (far - near) / -2;
      f = (near + far) / 2;
      g = 1;
      return this.set(a, 0, 0, b, 0, c, 0, d, 0, 0, e, f, 0, 0, 0, g);
    };

    Mat4.prototype.fromRotationTranslation = function(quat, vec) {
      var dest, w, wx, wy, wz, x, x2, xx, xy, xz, y, y2, yy, yz, z, z2, zz;
      x = quat.x;
      y = quat.y;
      z = quat.z;
      w = quat.w;
      x2 = x + x;
      y2 = y + y;
      z2 = z + z;
      xx = x * x2;
      xy = x * y2;
      xz = x * z2;
      yy = y * y2;
      yz = y * z2;
      zz = z * z2;
      wx = w * x2;
      wy = w * y2;
      wz = w * z2;
      dest = this.data;
      ' \ndest[0] = 1 - 2.0 * y * y - 2.0 * y * y\ndest[1] = 2 * x * y - 2.0 * w * z\ndest[3] = 2 * x * z + 2.0 * w * y\n\ndest[4] = 2 * x * y + 2.0 * w * z\ndest[5] = 1 - 2.0 * x * x - 2.0 * z * z\ndest[6] = 2 * y * z - 2.0 * w * x\n\ndest[8] = 2 * x * z - 2.0 * w * y\ndest[9] = 2 * y * z + 2.0 * w * x\ndest[10] = 1 - 2.0 * x * x - 2.0 * y * y';

      'dest[0] = 1 - 2.0 * y * y - 2.0 * y * y\ndest[1] = 2 * x * y + 2.0 * w * z\ndest[2] = 2 * x * z - 2.0 * w * y\n\ndest[4] = 2 * x * y - 2.0 * w * z\ndest[5] = 1 - 2.0 * x * x - 2.0 * z * z\ndest[6] = 2 * y * z + 2.0 * w * x\n\ndest[8] = 2 * x * z + 2.0 * w * y\ndest[9] = 2 * y * z - 2.0 * w * x\ndest[10] = 1 - 2.0 * x * x - 2.0 * y * y';

      dest[0] = 1 - (yy + zz);
      dest[1] = xy + wz;
      dest[2] = xz - wy;
      dest[3] = 0;
      dest[4] = xy - wz;
      dest[5] = 1 - (xx + zz);
      dest[6] = yz + wx;
      dest[7] = 0;
      dest[8] = xz + wy;
      dest[9] = yz - wx;
      dest[10] = 1 - (xx + yy);
      dest[11] = 0;
      dest[12] = vec.x;
      dest[13] = vec.y;
      dest[14] = vec.z;
      dest[15] = 1;
      return this;
    };

    Mat4.prototype.translateVec3 = function(vec) {
      return this.translateVal3(vec.x, vec.y, vec.z);
    };

    Mat4.prototype.translateVal3 = function(x, y, z) {
      var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, d;
      d = this.data;
      a00 = d[0];
      a01 = d[1];
      a02 = d[2];
      a03 = d[3];
      a10 = d[4];
      a11 = d[5];
      a12 = d[6];
      a13 = d[7];
      a20 = d[8];
      a21 = d[9];
      a22 = d[10];
      a23 = d[11];
      d[12] = a00 * x + a10 * y + a20 * z + d[12];
      d[13] = a01 * x + a11 * y + a21 * z + d[13];
      d[14] = a02 * x + a12 * y + a22 * z + d[14];
      d[15] = a03 * x + a13 * y + a23 * z + d[15];
      return this;
    };

    Mat4.prototype.rotatex = function(angle) {
      var a10, a11, a12, a13, a20, a21, a22, a23, c, d, rad, s;
      d = this.data;
      rad = tau * (angle / 360);
      s = Math.sin(rad);
      c = Math.cos(rad);
      a10 = d[4];
      a11 = d[5];
      a12 = d[6];
      a13 = d[7];
      a20 = d[8];
      a21 = d[9];
      a22 = d[10];
      a23 = d[11];
      d[4] = a10 * c + a20 * s;
      d[5] = a11 * c + a21 * s;
      d[6] = a12 * c + a22 * s;
      d[7] = a13 * c + a23 * s;
      d[8] = a10 * -s + a20 * c;
      d[9] = a11 * -s + a21 * c;
      d[10] = a12 * -s + a22 * c;
      d[11] = a13 * -s + a23 * c;
      return this;
    };

    Mat4.prototype.rotatey = function(angle) {
      var a00, a01, a02, a03, a20, a21, a22, a23, c, d, rad, s;
      d = this.data;
      rad = tau * (angle / 360);
      s = Math.sin(rad);
      c = Math.cos(rad);
      a00 = d[0];
      a01 = d[1];
      a02 = d[2];
      a03 = d[3];
      a20 = d[8];
      a21 = d[9];
      a22 = d[10];
      a23 = d[11];
      d[0] = a00 * c + a20 * -s;
      d[1] = a01 * c + a21 * -s;
      d[2] = a02 * c + a22 * -s;
      d[3] = a03 * c + a23 * -s;
      d[8] = a00 * s + a20 * c;
      d[9] = a01 * s + a21 * c;
      d[10] = a02 * s + a22 * c;
      d[11] = a03 * s + a23 * c;
      return this;
    };

    Mat4.prototype.rotatez = function(angle) {
      var a00, a01, a02, a03, a10, a11, a12, a13, c, d, rad, s;
      d = this.data;
      rad = tau * (angle / 360);
      s = Math.sin(rad);
      c = Math.cos(rad);
      a00 = d[0];
      a01 = d[1];
      a02 = d[2];
      a03 = d[3];
      a10 = d[4];
      a11 = d[5];
      a12 = d[6];
      a13 = d[7];
      d[0] = a00 * c + a10 * s;
      d[1] = a01 * c + a11 * s;
      d[2] = a02 * c + a12 * s;
      d[3] = a03 * c + a13 * s;
      d[4] = a00 * -s + a10 * c;
      d[5] = a01 * -s + a11 * c;
      d[6] = a02 * -s + a12 * c;
      d[7] = a03 * -s + a13 * c;
      return this;
    };

    Mat4.prototype.scale = function(scalar) {
      var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, d;
      d = this.data;
      a00 = d[0];
      a01 = d[1];
      a02 = d[2];
      a03 = d[3];
      a10 = d[4];
      a11 = d[5];
      a12 = d[6];
      a13 = d[7];
      a20 = d[8];
      a21 = d[9];
      a22 = d[10];
      a23 = d[11];
      d[0] = a00 * scalar;
      d[1] = a01 * scalar;
      d[2] = a02 * scalar;
      d[3] = a03 * scalar;
      d[4] = a10 * scalar;
      d[5] = a11 * scalar;
      d[6] = a12 * scalar;
      d[7] = a13 * scalar;
      d[8] = a20 * scalar;
      d[9] = a21 * scalar;
      d[10] = a22 * scalar;
      d[11] = a23 * scalar;
      return this;
    };

    Mat4.prototype.mulMat4 = function(other, dst) {
      var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33, b0, b1, b2, b3, dest, mat, mat2;
      if (dst == null) {
        dst = this;
      }
      dest = dst.data;
      mat = this.data;
      mat2 = other.data;
      a00 = mat[0];
      a01 = mat[1];
      a02 = mat[2];
      a03 = mat[3];
      a10 = mat[4];
      a11 = mat[5];
      a12 = mat[6];
      a13 = mat[7];
      a20 = mat[8];
      a21 = mat[9];
      a22 = mat[10];
      a23 = mat[11];
      a30 = mat[12];
      a31 = mat[13];
      a32 = mat[14];
      a33 = mat[15];
      b0 = mat2[0];
      b1 = mat2[1];
      b2 = mat2[2];
      b3 = mat2[3];
      dest[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      dest[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      dest[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      dest[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = mat2[4];
      b1 = mat2[5];
      b2 = mat2[6];
      b3 = mat2[7];
      dest[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      dest[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      dest[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      dest[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = mat2[8];
      b1 = mat2[9];
      b2 = mat2[10];
      b3 = mat2[11];
      dest[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      dest[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      dest[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      dest[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      b0 = mat2[12];
      b1 = mat2[13];
      b2 = mat2[14];
      b3 = mat2[15];
      dest[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      dest[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      dest[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      dest[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      return dst;
    };

    Mat4.prototype.mulVec3 = function(vec, dst) {
      if (dst == null) {
        dst = vec;
      }
      return this.mulVal3(vec.x, vec.y, vec.z, dst);
    };

    Mat4.prototype.mulVal3 = function(x, y, z, dst) {
      var d;
      dst = dst.data;
      d = this.data;
      dst[0] = d[0] * x + d[4] * y + d[8] * z;
      dst[1] = d[1] * x + d[5] * y + d[9] * z;
      dst[2] = d[2] * x + d[6] * y + d[10] * z;
      return dst;
    };

    Mat4.prototype.mulVec4 = function(vec, dst) {
      if (dst == null) {
        dst = vec;
      }
      return this.mulVal4(vec.x, vec.y, vec.z, vec.w, dst);
    };

    Mat4.prototype.mulVal4 = function(x, y, z, w, dst) {
      var d;
      dst = dst.data;
      d = this.data;
      dst[0] = d[0] * x + d[4] * y + d[8] * z + d[12] * w;
      dst[1] = d[1] * x + d[5] * y + d[9] * z + d[13] * w;
      dst[2] = d[2] * x + d[6] * y + d[10] * z + d[14] * w;
      dst[3] = d[3] * x + d[7] * y + d[11] * z + d[15] * w;
      return dst;
    };

    Mat4.prototype.invert = function(dst) {
      var a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, a30, a31, a32, a33, b00, b01, b02, b03, b04, b05, b06, b07, b08, b09, b10, b11, d, dest, invDet, mat;
      if (dst == null) {
        dst = this;
      }
      mat = this.data;
      dest = dst.data;
      a00 = mat[0];
      a01 = mat[1];
      a02 = mat[2];
      a03 = mat[3];
      a10 = mat[4];
      a11 = mat[5];
      a12 = mat[6];
      a13 = mat[7];
      a20 = mat[8];
      a21 = mat[9];
      a22 = mat[10];
      a23 = mat[11];
      a30 = mat[12];
      a31 = mat[13];
      a32 = mat[14];
      a33 = mat[15];
      b00 = a00 * a11 - a01 * a10;
      b01 = a00 * a12 - a02 * a10;
      b02 = a00 * a13 - a03 * a10;
      b03 = a01 * a12 - a02 * a11;
      b04 = a01 * a13 - a03 * a11;
      b05 = a02 * a13 - a03 * a12;
      b06 = a20 * a31 - a21 * a30;
      b07 = a20 * a32 - a22 * a30;
      b08 = a20 * a33 - a23 * a30;
      b09 = a21 * a32 - a22 * a31;
      b10 = a21 * a33 - a23 * a31;
      b11 = a22 * a33 - a23 * a32;
      d = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
      if (d === 0) {
        return;
      }
      invDet = 1 / d;
      dest[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
      dest[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
      dest[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
      dest[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
      dest[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
      dest[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
      dest[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
      dest[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
      dest[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
      dest[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
      dest[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
      dest[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
      dest[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
      dest[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
      dest[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
      dest[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
      return dst;
    };

    Mat4.prototype.set = function(a00, a10, a20, a30, a01, a11, a21, a31, a02, a12, a22, a32, a03, a13, a23, a33) {
      var d;
      d = this.data;
      d[0] = a00;
      d[4] = a10;
      d[8] = a20;
      d[12] = a30;
      d[1] = a01;
      d[5] = a11;
      d[9] = a21;
      d[13] = a31;
      d[2] = a02;
      d[6] = a12;
      d[10] = a22;
      d[14] = a32;
      d[3] = a03;
      d[7] = a13;
      d[11] = a23;
      d[15] = a33;
      return this;
    };

    return Mat4;

  })();

}).call(this);
;

/*! jQuery v1.7.2 jquery.com | jquery.org/license */
(function(a,b){function cy(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cu(a){if(!cj[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ck||(ck=c.createElement("iframe"),ck.frameBorder=ck.width=ck.height=0),b.appendChild(ck);if(!cl||!ck.createElement)cl=(ck.contentWindow||ck.contentDocument).document,cl.write((f.support.boxModel?"<!doctype html>":"")+"<html><body>"),cl.close();d=cl.createElement(a),cl.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ck)}cj[a]=e}return cj[a]}function ct(a,b){var c={};f.each(cp.concat.apply([],cp.slice(0,b)),function(){c[this]=a});return c}function cs(){cq=b}function cr(){setTimeout(cs,0);return cq=f.now()}function ci(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ch(){try{return new a.XMLHttpRequest}catch(b){}}function cb(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function ca(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function b_(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bD.test(a)?d(a,e):b_(a+"["+(typeof e=="object"?b:"")+"]",e,c,d)});else if(!c&&f.type(b)==="object")for(var e in b)b_(a+"["+e+"]",b[e],c,d);else d(a,b)}function b$(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bZ(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bS,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bZ(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bZ(a,c,d,e,"*",g));return l}function bY(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bO),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function bB(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?1:0,g=4;if(d>0){if(c!=="border")for(;e<g;e+=2)c||(d-=parseFloat(f.css(a,"padding"+bx[e]))||0),c==="margin"?d+=parseFloat(f.css(a,c+bx[e]))||0:d-=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0;return d+"px"}d=by(a,b);if(d<0||d==null)d=a.style[b];if(bt.test(d))return d;d=parseFloat(d)||0;if(c)for(;e<g;e+=2)d+=parseFloat(f.css(a,"padding"+bx[e]))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+bx[e]+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+bx[e]))||0);return d+"px"}function bo(a){var b=c.createElement("div");bh.appendChild(b),b.innerHTML=a.outerHTML;return b.firstChild}function bn(a){var b=(a.nodeName||"").toLowerCase();b==="input"?bm(a):b!=="script"&&typeof a.getElementsByTagName!="undefined"&&f.grep(a.getElementsByTagName("input"),bm)}function bm(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bl(a){return typeof a.getElementsByTagName!="undefined"?a.getElementsByTagName("*"):typeof a.querySelectorAll!="undefined"?a.querySelectorAll("*"):[]}function bk(a,b){var c;b.nodeType===1&&(b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase(),c==="object"?b.outerHTML=a.outerHTML:c!=="input"||a.type!=="checkbox"&&a.type!=="radio"?c==="option"?b.selected=a.defaultSelected:c==="input"||c==="textarea"?b.defaultValue=a.defaultValue:c==="script"&&b.text!==a.text&&(b.text=a.text):(a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value)),b.removeAttribute(f.expando),b.removeAttribute("_submit_attached"),b.removeAttribute("_change_attached"))}function bj(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c,d,e,g=f._data(a),h=f._data(b,g),i=g.events;if(i){delete h.handle,h.events={};for(c in i)for(d=0,e=i[c].length;d<e;d++)f.event.add(b,c,i[c][d])}h.data&&(h.data=f.extend({},h.data))}}function bi(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function U(a){var b=V.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}function T(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(O.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function S(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function K(){return!0}function J(){return!1}function n(a,b,c){var d=b+"defer",e=b+"queue",g=b+"mark",h=f._data(a,d);h&&(c==="queue"||!f._data(a,e))&&(c==="mark"||!f._data(a,g))&&setTimeout(function(){!f._data(a,e)&&!f._data(a,g)&&(f.removeData(a,d,!0),h.fire())},0)}function m(a){for(var b in a){if(b==="data"&&f.isEmptyObject(a[b]))continue;if(b!=="toJSON")return!1}return!0}function l(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(k,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNumeric(d)?+d:j.test(d)?f.parseJSON(d):d}catch(g){}f.data(a,c,d)}else d=b}return d}function h(a){var b=g[a]={},c,d;a=a.split(/\s+/);for(c=0,d=a.length;c<d;c++)b[a[c]]=!0;return b}var c=a.document,d=a.navigator,e=a.location,f=function(){function J(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(J,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,n=/^[\],:{}\s]*$/,o=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,p=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,q=/(?:^|:|,)(?:\s*\[)+/g,r=/(webkit)[ \/]([\w.]+)/,s=/(opera)(?:.*version)?[ \/]([\w.]+)/,t=/(msie) ([\w.]+)/,u=/(mozilla)(?:.*? rv:([\w.]+))?/,v=/-([a-z]|[0-9])/ig,w=/^-ms-/,x=function(a,b){return(b+"").toUpperCase()},y=d.userAgent,z,A,B,C=Object.prototype.toString,D=Object.prototype.hasOwnProperty,E=Array.prototype.push,F=Array.prototype.slice,G=String.prototype.trim,H=Array.prototype.indexOf,I={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=m.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length},toArray:function(){return F.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?E.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),A.add(a);return this},eq:function(a){a=+a;return a===-1?this.slice(a):this.slice(a,a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(F.apply(this,arguments),"slice",F.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:E,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;A.fireWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").off("ready")}},bindReady:function(){if(!A){A=e.Callbacks("once memory");if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",B,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",B),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&J()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a!=null&&a==a.window},isNumeric:function(a){return!isNaN(parseFloat(a))&&isFinite(a)},type:function(a){return a==null?String(a):I[C.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!D.call(a,"constructor")&&!D.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||D.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw new Error(a)},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(n.test(b.replace(o,"@").replace(p,"]").replace(q,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){if(typeof c!="string"||!c)return null;var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(w,"ms-").replace(v,x)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:G?function(a){return a==null?"":G.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?E.call(c,a):e.merge(c,a)}return c},inArray:function(a,b,c){var d;if(b){if(H)return H.call(b,a,c);d=b.length,c=c?c<0?Math.max(0,d+c):c:0;for(;c<d;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=F.call(arguments,2),g=function(){return a.apply(c,f.concat(F.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h,i){var j,k=d==null,l=0,m=a.length;if(d&&typeof d=="object"){for(l in d)e.access(a,c,l,d[l],1,h,f);g=1}else if(f!==b){j=i===b&&e.isFunction(f),k&&(j?(j=c,c=function(a,b,c){return j.call(e(a),c)}):(c.call(a,f),c=null));if(c)for(;l<m;l++)c(a[l],d,j?f.call(a[l],l,c(a[l],d)):f,i);g=1}return g?a:k?c.call(a):m?c(a[0],d):h},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=r.exec(a)||s.exec(a)||t.exec(a)||a.indexOf("compatible")<0&&u.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){I["[object "+b+"]"]=b.toLowerCase()}),z=e.uaMatch(y),z.browser&&(e.browser[z.browser]=!0,e.browser.version=z.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?B=function(){c.removeEventListener("DOMContentLoaded",B,!1),e.ready()}:c.attachEvent&&(B=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",B),e.ready())});return e}(),g={};f.Callbacks=function(a){a=a?g[a]||h(a):{};var c=[],d=[],e,i,j,k,l,m,n=function(b){var d,e,g,h,i;for(d=0,e=b.length;d<e;d++)g=b[d],h=f.type(g),h==="array"?n(g):h==="function"&&(!a.unique||!p.has(g))&&c.push(g)},o=function(b,f){f=f||[],e=!a.memory||[b,f],i=!0,j=!0,m=k||0,k=0,l=c.length;for(;c&&m<l;m++)if(c[m].apply(b,f)===!1&&a.stopOnFalse){e=!0;break}j=!1,c&&(a.once?e===!0?p.disable():c=[]:d&&d.length&&(e=d.shift(),p.fireWith(e[0],e[1])))},p={add:function(){if(c){var a=c.length;n(arguments),j?l=c.length:e&&e!==!0&&(k=a,o(e[0],e[1]))}return this},remove:function(){if(c){var b=arguments,d=0,e=b.length;for(;d<e;d++)for(var f=0;f<c.length;f++)if(b[d]===c[f]){j&&f<=l&&(l--,f<=m&&m--),c.splice(f--,1);if(a.unique)break}}return this},has:function(a){if(c){var b=0,d=c.length;for(;b<d;b++)if(a===c[b])return!0}return!1},empty:function(){c=[];return this},disable:function(){c=d=e=b;return this},disabled:function(){return!c},lock:function(){d=b,(!e||e===!0)&&p.disable();return this},locked:function(){return!d},fireWith:function(b,c){d&&(j?a.once||d.push([b,c]):(!a.once||!e)&&o(b,c));return this},fire:function(){p.fireWith(this,arguments);return this},fired:function(){return!!i}};return p};var i=[].slice;f.extend({Deferred:function(a){var b=f.Callbacks("once memory"),c=f.Callbacks("once memory"),d=f.Callbacks("memory"),e="pending",g={resolve:b,reject:c,notify:d},h={done:b.add,fail:c.add,progress:d.add,state:function(){return e},isResolved:b.fired,isRejected:c.fired,then:function(a,b,c){i.done(a).fail(b).progress(c);return this},always:function(){i.done.apply(i,arguments).fail.apply(i,arguments);return this},pipe:function(a,b,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[b,"reject"],progress:[c,"notify"]},function(a,b){var c=b[0],e=b[1],g;f.isFunction(c)?i[a](function(){g=c.apply(this,arguments),g&&f.isFunction(g.promise)?g.promise().then(d.resolve,d.reject,d.notify):d[e+"With"](this===i?d:this,[g])}):i[a](d[e])})}).promise()},promise:function(a){if(a==null)a=h;else for(var b in h)a[b]=h[b];return a}},i=h.promise({}),j;for(j in g)i[j]=g[j].fire,i[j+"With"]=g[j].fireWith;i.done(function(){e="resolved"},c.disable,d.lock).fail(function(){e="rejected"},b.disable,d.lock),a&&a.call(i,i);return i},when:function(a){function m(a){return function(b){e[a]=arguments.length>1?i.call(arguments,0):b,j.notifyWith(k,e)}}function l(a){return function(c){b[a]=arguments.length>1?i.call(arguments,0):c,--g||j.resolveWith(j,b)}}var b=i.call(arguments,0),c=0,d=b.length,e=Array(d),g=d,h=d,j=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred(),k=j.promise();if(d>1){for(;c<d;c++)b[c]&&b[c].promise&&f.isFunction(b[c].promise)?b[c].promise().then(l(c),j.reject,m(c)):--g;g||j.resolveWith(j,b)}else j!==a&&j.resolveWith(j,d?[a]:[]);return k}}),f.support=function(){var b,d,e,g,h,i,j,k,l,m,n,o,p=c.createElement("div"),q=c.documentElement;p.setAttribute("className","t"),p.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=p.getElementsByTagName("*"),e=p.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=p.getElementsByTagName("input")[0],b={leadingWhitespace:p.firstChild.nodeType===3,tbody:!p.getElementsByTagName("tbody").length,htmlSerialize:!!p.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:p.className!=="t",enctype:!!c.createElement("form").enctype,html5Clone:c.createElement("nav").cloneNode(!0).outerHTML!=="<:nav></:nav>",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0,pixelMargin:!0},f.boxModel=b.boxModel=c.compatMode==="CSS1Compat",i.checked=!0,b.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,b.optDisabled=!h.disabled;try{delete p.test}catch(r){b.deleteExpando=!1}!p.addEventListener&&p.attachEvent&&p.fireEvent&&(p.attachEvent("onclick",function(){b.noCloneEvent=!1}),p.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),b.radioValue=i.value==="t",i.setAttribute("checked","checked"),i.setAttribute("name","t"),p.appendChild(i),j=c.createDocumentFragment(),j.appendChild(p.lastChild),b.checkClone=j.cloneNode(!0).cloneNode(!0).lastChild.checked,b.appendChecked=i.checked,j.removeChild(i),j.appendChild(p);if(p.attachEvent)for(n in{submit:1,change:1,focusin:1})m="on"+n,o=m in p,o||(p.setAttribute(m,"return;"),o=typeof p[m]=="function"),b[n+"Bubbles"]=o;j.removeChild(p),j=g=h=p=i=null,f(function(){var d,e,g,h,i,j,l,m,n,q,r,s,t,u=c.getElementsByTagName("body")[0];!u||(m=1,t="padding:0;margin:0;border:",r="position:absolute;top:0;left:0;width:1px;height:1px;",s=t+"0;visibility:hidden;",n="style='"+r+t+"5px solid #000;",q="<div "+n+"display:block;'><div style='"+t+"0;display:block;overflow:hidden;'></div></div>"+"<table "+n+"' cellpadding='0' cellspacing='0'>"+"<tr><td></td></tr></table>",d=c.createElement("div"),d.style.cssText=s+"width:0;height:0;position:static;top:0;margin-top:"+m+"px",u.insertBefore(d,u.firstChild),p=c.createElement("div"),d.appendChild(p),p.innerHTML="<table><tr><td style='"+t+"0;display:none'></td><td>t</td></tr></table>",k=p.getElementsByTagName("td"),o=k[0].offsetHeight===0,k[0].style.display="",k[1].style.display="none",b.reliableHiddenOffsets=o&&k[0].offsetHeight===0,a.getComputedStyle&&(p.innerHTML="",l=c.createElement("div"),l.style.width="0",l.style.marginRight="0",p.style.width="2px",p.appendChild(l),b.reliableMarginRight=(parseInt((a.getComputedStyle(l,null)||{marginRight:0}).marginRight,10)||0)===0),typeof p.style.zoom!="undefined"&&(p.innerHTML="",p.style.width=p.style.padding="1px",p.style.border=0,p.style.overflow="hidden",p.style.display="inline",p.style.zoom=1,b.inlineBlockNeedsLayout=p.offsetWidth===3,p.style.display="block",p.style.overflow="visible",p.innerHTML="<div style='width:5px;'></div>",b.shrinkWrapBlocks=p.offsetWidth!==3),p.style.cssText=r+s,p.innerHTML=q,e=p.firstChild,g=e.firstChild,i=e.nextSibling.firstChild.firstChild,j={doesNotAddBorder:g.offsetTop!==5,doesAddBorderForTableAndCells:i.offsetTop===5},g.style.position="fixed",g.style.top="20px",j.fixedPosition=g.offsetTop===20||g.offsetTop===15,g.style.position=g.style.top="",e.style.overflow="hidden",e.style.position="relative",j.subtractsBorderForOverflowNotVisible=g.offsetTop===-5,j.doesNotIncludeMarginInBodyOffset=u.offsetTop!==m,a.getComputedStyle&&(p.style.marginTop="1%",b.pixelMargin=(a.getComputedStyle(p,null)||{marginTop:0}).marginTop!=="1%"),typeof d.style.zoom!="undefined"&&(d.style.zoom=1),u.removeChild(d),l=p=d=null,f.extend(b,j))});return b}();var j=/^(?:\{.*\}|\[.*\])$/,k=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!m(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i,j=f.expando,k=typeof c=="string",l=a.nodeType,m=l?f.cache:a,n=l?a[j]:a[j]&&j,o=c==="events";if((!n||!m[n]||!o&&!e&&!m[n].data)&&k&&d===b)return;n||(l?a[j]=n=++f.uuid:n=j),m[n]||(m[n]={},l||(m[n].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?m[n]=f.extend(m[n],c):m[n].data=f.extend(m[n].data,c);g=h=m[n],e||(h.data||(h.data={}),h=h.data),d!==b&&(h[f.camelCase(c)]=d);if(o&&!h[c])return g.events;k?(i=h[c],i==null&&(i=h[f.camelCase(c)])):i=h;return i}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e,g,h=f.expando,i=a.nodeType,j=i?f.cache:a,k=i?a[h]:h;if(!j[k])return;if(b){d=c?j[k]:j[k].data;if(d){f.isArray(b)||(b in d?b=[b]:(b=f.camelCase(b),b in d?b=[b]:b=b.split(" ")));for(e=0,g=b.length;e<g;e++)delete d[b[e]];if(!(c?m:f.isEmptyObject)(d))return}}if(!c){delete j[k].data;if(!m(j[k]))return}f.support.deleteExpando||!j.setInterval?delete j[k]:j[k]=null,i&&(f.support.deleteExpando?delete a[h]:a.removeAttribute?a.removeAttribute(h):a[h]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d,e,g,h,i,j=this[0],k=0,m=null;if(a===b){if(this.length){m=f.data(j);if(j.nodeType===1&&!f._data(j,"parsedAttrs")){g=j.attributes;for(i=g.length;k<i;k++)h=g[k].name,h.indexOf("data-")===0&&(h=f.camelCase(h.substring(5)),l(j,h,m[h]));f._data(j,"parsedAttrs",!0)}}return m}if(typeof a=="object")return this.each(function(){f.data(this,a)});d=a.split(".",2),d[1]=d[1]?"."+d[1]:"",e=d[1]+"!";return f.access(this,function(c){if(c===b){m=this.triggerHandler("getData"+e,[d[0]]),m===b&&j&&(m=f.data(j,a),m=l(j,a,m));return m===b&&d[1]?this.data(d[0]):m}d[1]=c,this.each(function(){var b=f(this);b.triggerHandler("setData"+e,d),f.data(this,a,c),b.triggerHandler("changeData"+e,d)})},null,c,arguments.length>1,null,!1)},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,b){a&&(b=(b||"fx")+"mark",f._data(a,b,(f._data(a,b)||0)+1))},_unmark:function(a,b,c){a!==!0&&(c=b,b=a,a=!1);if(b){c=c||"fx";var d=c+"mark",e=a?0:(f._data(b,d)||1)-1;e?f._data(b,d,e):(f.removeData(b,d,!0),n(b,c,"mark"))}},queue:function(a,b,c){var d;if(a){b=(b||"fx")+"queue",d=f._data(a,b),c&&(!d||f.isArray(c)?d=f._data(a,b,f.makeArray(c)):d.push(c));return d||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e={};d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),f._data(a,b+".run",e),d.call(a,function(){f.dequeue(a,b)},e)),c.length||(f.removeData(a,b+"queue "+b+".run",!0),n(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){var d=2;typeof a!="string"&&(c=a,a="fx",d--);if(arguments.length<d)return f.queue(this[0],a);return c===b?this:this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f.Callbacks("once memory"),!0))h++,l.add(m);m();return d.promise(c)}});var o=/[\n\t\r]/g,p=/\s+/,q=/\r/g,r=/^(?:button|input)$/i,s=/^(?:button|input|object|select|textarea)$/i,t=/^a(?:rea)?$/i,u=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,v=f.support.getSetAttribute,w,x,y;f.fn.extend({attr:function(a,b){return f.access(this,f.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,f.prop,a,b,arguments.length>1)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(p);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(p);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(o," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(p);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ",c=0,d=this.length;for(;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(o," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e,g=this[0];{if(!!arguments.length){e=f.isFunction(a);return this.each(function(d){var g=f(this),h;if(this.nodeType===1){e?h=a.call(this,d,g.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.type]||f.valHooks[this.nodeName.toLowerCase()];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}if(g){c=f.valHooks[g.type]||f.valHooks[g.nodeName.toLowerCase()];if(c&&"get"in c&&(d=c.get(g,"value"))!==b)return d;d=g.value;return typeof d=="string"?d.replace(q,""):d==null?"":d}}}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c,d,e,g=a.selectedIndex,h=[],i=a.options,j=a.type==="select-one";if(g<0)return null;c=j?g:0,d=j?g+1:i.length;for(;c<d;c++){e=i[c];if(e.selected&&(f.support.optDisabled?!e.disabled:e.getAttribute("disabled")===null)&&(!e.parentNode.disabled||!f.nodeName(e.parentNode,"optgroup"))){b=f(e).val();if(j)return b;h.push(b)}}if(j&&!h.length&&i.length)return f(i[g]).val();return h},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attr:function(a,c,d,e){var g,h,i,j=a.nodeType;if(!!a&&j!==3&&j!==8&&j!==2){if(e&&c in f.attrFn)return f(a)[c](d);if(typeof a.getAttribute=="undefined")return f.prop(a,c,d);i=j!==1||!f.isXMLDoc(a),i&&(c=c.toLowerCase(),h=f.attrHooks[c]||(u.test(c)?x:w));if(d!==b){if(d===null){f.removeAttr(a,c);return}if(h&&"set"in h&&i&&(g=h.set(a,d,c))!==b)return g;a.setAttribute(c,""+d);return d}if(h&&"get"in h&&i&&(g=h.get(a,c))!==null)return g;g=a.getAttribute(c);return g===null?b:g}},removeAttr:function(a,b){var c,d,e,g,h,i=0;if(b&&a.nodeType===1){d=b.toLowerCase().split(p),g=d.length;for(;i<g;i++)e=d[i],e&&(c=f.propFix[e]||e,h=u.test(e),h||f.attr(a,e,""),a.removeAttribute(v?e:c),h&&c in a&&(a[c]=!1))}},attrHooks:{type:{set:function(a,b){if(r.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(w&&f.nodeName(a,"button"))return w.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(w&&f.nodeName(a,"button"))return w.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e,g,h,i=a.nodeType;if(!!a&&i!==3&&i!==8&&i!==2){h=i!==1||!f.isXMLDoc(a),h&&(c=f.propFix[c]||c,g=f.propHooks[c]);return d!==b?g&&"set"in g&&(e=g.set(a,d,c))!==b?e:a[c]=d:g&&"get"in g&&(e=g.get(a,c))!==null?e:a[c]}},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):s.test(a.nodeName)||t.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabindex=f.propHooks.tabIndex,x={get:function(a,c){var d,e=f.prop(a,c);return e===!0||typeof e!="boolean"&&(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},v||(y={name:!0,id:!0,coords:!0},w=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&(y[c]?d.nodeValue!=="":d.specified)?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.attrHooks.tabindex.set=w.set,f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})}),f.attrHooks.contenteditable={get:w.get,set:function(a,b,c){b===""&&(b="false"),w.set(a,b,c)}}),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.enctype||(f.propFix.enctype="encoding"),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var z=/^(?:textarea|input|select)$/i,A=/^([^\.]*)?(?:\.(.+))?$/,B=/(?:^|\s)hover(\.\S+)?\b/,C=/^key/,D=/^(?:mouse|contextmenu)|click/,E=/^(?:focusinfocus|focusoutblur)$/,F=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,G=function(
a){var b=F.exec(a);b&&(b[1]=(b[1]||"").toLowerCase(),b[3]=b[3]&&new RegExp("(?:^|\\s)"+b[3]+"(?:\\s|$)"));return b},H=function(a,b){var c=a.attributes||{};return(!b[1]||a.nodeName.toLowerCase()===b[1])&&(!b[2]||(c.id||{}).value===b[2])&&(!b[3]||b[3].test((c["class"]||{}).value))},I=function(a){return f.event.special.hover?a:a.replace(B,"mouseenter$1 mouseleave$1")};f.event={add:function(a,c,d,e,g){var h,i,j,k,l,m,n,o,p,q,r,s;if(!(a.nodeType===3||a.nodeType===8||!c||!d||!(h=f._data(a)))){d.handler&&(p=d,d=p.handler,g=p.selector),d.guid||(d.guid=f.guid++),j=h.events,j||(h.events=j={}),i=h.handle,i||(h.handle=i=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.dispatch.apply(i.elem,arguments):b},i.elem=a),c=f.trim(I(c)).split(" ");for(k=0;k<c.length;k++){l=A.exec(c[k])||[],m=l[1],n=(l[2]||"").split(".").sort(),s=f.event.special[m]||{},m=(g?s.delegateType:s.bindType)||m,s=f.event.special[m]||{},o=f.extend({type:m,origType:l[1],data:e,handler:d,guid:d.guid,selector:g,quick:g&&G(g),namespace:n.join(".")},p),r=j[m];if(!r){r=j[m]=[],r.delegateCount=0;if(!s.setup||s.setup.call(a,e,n,i)===!1)a.addEventListener?a.addEventListener(m,i,!1):a.attachEvent&&a.attachEvent("on"+m,i)}s.add&&(s.add.call(a,o),o.handler.guid||(o.handler.guid=d.guid)),g?r.splice(r.delegateCount++,0,o):r.push(o),f.event.global[m]=!0}a=null}},global:{},remove:function(a,b,c,d,e){var g=f.hasData(a)&&f._data(a),h,i,j,k,l,m,n,o,p,q,r,s;if(!!g&&!!(o=g.events)){b=f.trim(I(b||"")).split(" ");for(h=0;h<b.length;h++){i=A.exec(b[h])||[],j=k=i[1],l=i[2];if(!j){for(j in o)f.event.remove(a,j+b[h],c,d,!0);continue}p=f.event.special[j]||{},j=(d?p.delegateType:p.bindType)||j,r=o[j]||[],m=r.length,l=l?new RegExp("(^|\\.)"+l.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(n=0;n<r.length;n++)s=r[n],(e||k===s.origType)&&(!c||c.guid===s.guid)&&(!l||l.test(s.namespace))&&(!d||d===s.selector||d==="**"&&s.selector)&&(r.splice(n--,1),s.selector&&r.delegateCount--,p.remove&&p.remove.call(a,s));r.length===0&&m!==r.length&&((!p.teardown||p.teardown.call(a,l)===!1)&&f.removeEvent(a,j,g.handle),delete o[j])}f.isEmptyObject(o)&&(q=g.handle,q&&(q.elem=null),f.removeData(a,["events","handle"],!0))}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){if(!e||e.nodeType!==3&&e.nodeType!==8){var h=c.type||c,i=[],j,k,l,m,n,o,p,q,r,s;if(E.test(h+f.event.triggered))return;h.indexOf("!")>=0&&(h=h.slice(0,-1),k=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if((!e||f.event.customEvent[h])&&!f.event.global[h])return;c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.isTrigger=!0,c.exclusive=k,c.namespace=i.join("."),c.namespace_re=c.namespace?new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)"):null,o=h.indexOf(":")<0?"on"+h:"";if(!e){j=f.cache;for(l in j)j[l].events&&j[l].events[h]&&f.event.trigger(c,d,j[l].handle.elem,!0);return}c.result=b,c.target||(c.target=e),d=d!=null?f.makeArray(d):[],d.unshift(c),p=f.event.special[h]||{};if(p.trigger&&p.trigger.apply(e,d)===!1)return;r=[[e,p.bindType||h]];if(!g&&!p.noBubble&&!f.isWindow(e)){s=p.delegateType||h,m=E.test(s+h)?e:e.parentNode,n=null;for(;m;m=m.parentNode)r.push([m,s]),n=m;n&&n===e.ownerDocument&&r.push([n.defaultView||n.parentWindow||a,s])}for(l=0;l<r.length&&!c.isPropagationStopped();l++)m=r[l][0],c.type=r[l][1],q=(f._data(m,"events")||{})[c.type]&&f._data(m,"handle"),q&&q.apply(m,d),q=o&&m[o],q&&f.acceptData(m)&&q.apply(m,d)===!1&&c.preventDefault();c.type=h,!g&&!c.isDefaultPrevented()&&(!p._default||p._default.apply(e.ownerDocument,d)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)&&o&&e[h]&&(h!=="focus"&&h!=="blur"||c.target.offsetWidth!==0)&&!f.isWindow(e)&&(n=e[o],n&&(e[o]=null),f.event.triggered=h,e[h](),f.event.triggered=b,n&&(e[o]=n));return c.result}},dispatch:function(c){c=f.event.fix(c||a.event);var d=(f._data(this,"events")||{})[c.type]||[],e=d.delegateCount,g=[].slice.call(arguments,0),h=!c.exclusive&&!c.namespace,i=f.event.special[c.type]||{},j=[],k,l,m,n,o,p,q,r,s,t,u;g[0]=c,c.delegateTarget=this;if(!i.preDispatch||i.preDispatch.call(this,c)!==!1){if(e&&(!c.button||c.type!=="click")){n=f(this),n.context=this.ownerDocument||this;for(m=c.target;m!=this;m=m.parentNode||this)if(m.disabled!==!0){p={},r=[],n[0]=m;for(k=0;k<e;k++)s=d[k],t=s.selector,p[t]===b&&(p[t]=s.quick?H(m,s.quick):n.is(t)),p[t]&&r.push(s);r.length&&j.push({elem:m,matches:r})}}d.length>e&&j.push({elem:this,matches:d.slice(e)});for(k=0;k<j.length&&!c.isPropagationStopped();k++){q=j[k],c.currentTarget=q.elem;for(l=0;l<q.matches.length&&!c.isImmediatePropagationStopped();l++){s=q.matches[l];if(h||!c.namespace&&!s.namespace||c.namespace_re&&c.namespace_re.test(s.namespace))c.data=s.data,c.handleObj=s,o=((f.event.special[s.origType]||{}).handle||s.handler).apply(q.elem,g),o!==b&&(c.result=o,o===!1&&(c.preventDefault(),c.stopPropagation()))}}i.postDispatch&&i.postDispatch.call(this,c);return c.result}},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){a.which==null&&(a.which=b.charCode!=null?b.charCode:b.keyCode);return a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,d){var e,f,g,h=d.button,i=d.fromElement;a.pageX==null&&d.clientX!=null&&(e=a.target.ownerDocument||c,f=e.documentElement,g=e.body,a.pageX=d.clientX+(f&&f.scrollLeft||g&&g.scrollLeft||0)-(f&&f.clientLeft||g&&g.clientLeft||0),a.pageY=d.clientY+(f&&f.scrollTop||g&&g.scrollTop||0)-(f&&f.clientTop||g&&g.clientTop||0)),!a.relatedTarget&&i&&(a.relatedTarget=i===a.target?d.toElement:i),!a.which&&h!==b&&(a.which=h&1?1:h&2?3:h&4?2:0);return a}},fix:function(a){if(a[f.expando])return a;var d,e,g=a,h=f.event.fixHooks[a.type]||{},i=h.props?this.props.concat(h.props):this.props;a=f.Event(g);for(d=i.length;d;)e=i[--d],a[e]=g[e];a.target||(a.target=g.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),a.metaKey===b&&(a.metaKey=a.ctrlKey);return h.filter?h.filter(a,g):a},special:{ready:{setup:f.bindReady},load:{noBubble:!0},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}},simulate:function(a,b,c,d){var e=f.extend(new f.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?f.event.trigger(e,null,b):f.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},f.event.handle=f.event.dispatch,f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!(this instanceof f.Event))return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?K:J):this.type=a,b&&f.extend(this,b),this.timeStamp=a&&a.timeStamp||f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=K;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=K;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=K,this.stopPropagation()},isDefaultPrevented:J,isPropagationStopped:J,isImmediatePropagationStopped:J},f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c=this,d=a.relatedTarget,e=a.handleObj,g=e.selector,h;if(!d||d!==c&&!f.contains(c,d))a.type=e.origType,h=e.handler.apply(this,arguments),a.type=b;return h}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(){if(f.nodeName(this,"form"))return!1;f.event.add(this,"click._submit keypress._submit",function(a){var c=a.target,d=f.nodeName(c,"input")||f.nodeName(c,"button")?c.form:b;d&&!d._submit_attached&&(f.event.add(d,"submit._submit",function(a){a._submit_bubble=!0}),d._submit_attached=!0)})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&f.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){if(f.nodeName(this,"form"))return!1;f.event.remove(this,"._submit")}}),f.support.changeBubbles||(f.event.special.change={setup:function(){if(z.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio")f.event.add(this,"propertychange._change",function(a){a.originalEvent.propertyName==="checked"&&(this._just_changed=!0)}),f.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1,f.event.simulate("change",this,a,!0))});return!1}f.event.add(this,"beforeactivate._change",function(a){var b=a.target;z.test(b.nodeName)&&!b._change_attached&&(f.event.add(b,"change._change",function(a){this.parentNode&&!a.isSimulated&&!a.isTrigger&&f.event.simulate("change",this.parentNode,a,!0)}),b._change_attached=!0)})},handle:function(a){var b=a.target;if(this!==b||a.isSimulated||a.isTrigger||b.type!=="radio"&&b.type!=="checkbox")return a.handleObj.handler.apply(this,arguments)},teardown:function(){f.event.remove(this,"._change");return z.test(this.nodeName)}}),f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){var d=0,e=function(a){f.event.simulate(b,a.target,f.event.fix(a),!0)};f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.fn.extend({on:function(a,c,d,e,g){var h,i;if(typeof a=="object"){typeof c!="string"&&(d=d||c,c=b);for(i in a)this.on(i,c,d,a[i],g);return this}d==null&&e==null?(e=c,d=c=b):e==null&&(typeof c=="string"?(e=d,d=b):(e=d,d=c,c=b));if(e===!1)e=J;else if(!e)return this;g===1&&(h=e,e=function(a){f().off(a);return h.apply(this,arguments)},e.guid=h.guid||(h.guid=f.guid++));return this.each(function(){f.event.add(this,a,e,d,c)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,c,d){if(a&&a.preventDefault&&a.handleObj){var e=a.handleObj;f(a.delegateTarget).off(e.namespace?e.origType+"."+e.namespace:e.origType,e.selector,e.handler);return this}if(typeof a=="object"){for(var g in a)this.off(g,c,a[g]);return this}if(c===!1||typeof c=="function")d=c,c=b;d===!1&&(d=J);return this.each(function(){f.event.remove(this,a,d,c)})},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},live:function(a,b,c){f(this.context).on(a,this.selector,b,c);return this},die:function(a,b){f(this.context).off(a,this.selector||"**",b);return this},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return arguments.length==1?this.off(a,"**"):this.off(b,a,c)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f._data(this,"lastToggle"+a.guid)||0)%d;f._data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.on(b,null,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0),C.test(b)&&(f.event.fixHooks[b]=f.event.keyHooks),D.test(b)&&(f.event.fixHooks[b]=f.event.mouseHooks)}),function(){function x(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}if(j.nodeType===1){g||(j[d]=c,j.sizset=h);if(typeof b!="string"){if(j===b){k=!0;break}}else if(m.filter(b,[j]).length>0){k=j;break}}j=j[a]}e[h]=k}}}function w(a,b,c,e,f,g){for(var h=0,i=e.length;h<i;h++){var j=e[h];if(j){var k=!1;j=j[a];while(j){if(j[d]===c){k=e[j.sizset];break}j.nodeType===1&&!g&&(j[d]=c,j.sizset=h);if(j.nodeName.toLowerCase()===b){k=j;break}j=j[a]}e[h]=k}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d="sizcache"+(Math.random()+"").replace(".",""),e=0,g=Object.prototype.toString,h=!1,i=!0,j=/\\/g,k=/\r\n/g,l=/\W/;[0,0].sort(function(){i=!1;return 0});var m=function(b,d,e,f){e=e||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return e;var i,j,k,l,n,q,r,t,u=!0,v=m.isXML(d),w=[],x=b;do{a.exec(""),i=a.exec(x);if(i){x=i[3],w.push(i[1]);if(i[2]){l=i[3];break}}}while(i);if(w.length>1&&p.exec(b))if(w.length===2&&o.relative[w[0]])j=y(w[0]+w[1],d,f);else{j=o.relative[w[0]]?[d]:m(w.shift(),d);while(w.length)b=w.shift(),o.relative[b]&&(b+=w.shift()),j=y(b,j,f)}else{!f&&w.length>1&&d.nodeType===9&&!v&&o.match.ID.test(w[0])&&!o.match.ID.test(w[w.length-1])&&(n=m.find(w.shift(),d,v),d=n.expr?m.filter(n.expr,n.set)[0]:n.set[0]);if(d){n=f?{expr:w.pop(),set:s(f)}:m.find(w.pop(),w.length===1&&(w[0]==="~"||w[0]==="+")&&d.parentNode?d.parentNode:d,v),j=n.expr?m.filter(n.expr,n.set):n.set,w.length>0?k=s(j):u=!1;while(w.length)q=w.pop(),r=q,o.relative[q]?r=w.pop():q="",r==null&&(r=d),o.relative[q](k,r,v)}else k=w=[]}k||(k=j),k||m.error(q||b);if(g.call(k)==="[object Array]")if(!u)e.push.apply(e,k);else if(d&&d.nodeType===1)for(t=0;k[t]!=null;t++)k[t]&&(k[t]===!0||k[t].nodeType===1&&m.contains(d,k[t]))&&e.push(j[t]);else for(t=0;k[t]!=null;t++)k[t]&&k[t].nodeType===1&&e.push(j[t]);else s(k,e);l&&(m(l,h,e,f),m.uniqueSort(e));return e};m.uniqueSort=function(a){if(u){h=i,a.sort(u);if(h)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},m.matches=function(a,b){return m(a,null,null,b)},m.matchesSelector=function(a,b){return m(b,null,null,[a]).length>0},m.find=function(a,b,c){var d,e,f,g,h,i;if(!a)return[];for(e=0,f=o.order.length;e<f;e++){h=o.order[e];if(g=o.leftMatch[h].exec(a)){i=g[1],g.splice(1,1);if(i.substr(i.length-1)!=="\\"){g[1]=(g[1]||"").replace(j,""),d=o.find[h](g,b,c);if(d!=null){a=a.replace(o.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},m.filter=function(a,c,d,e){var f,g,h,i,j,k,l,n,p,q=a,r=[],s=c,t=c&&c[0]&&m.isXML(c[0]);while(a&&c.length){for(h in o.filter)if((f=o.leftMatch[h].exec(a))!=null&&f[2]){k=o.filter[h],l=f[1],g=!1,f.splice(1,1);if(l.substr(l.length-1)==="\\")continue;s===r&&(r=[]);if(o.preFilter[h]){f=o.preFilter[h](f,s,d,r,e,t);if(!f)g=i=!0;else if(f===!0)continue}if(f)for(n=0;(j=s[n])!=null;n++)j&&(i=k(j,f,n,s),p=e^i,d&&i!=null?p?g=!0:s[n]=!1:p&&(r.push(j),g=!0));if(i!==b){d||(s=r),a=a.replace(o.match[h],"");if(!g)return[];break}}if(a===q)if(g==null)m.error(a);else break;q=a}return s},m.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)};var n=m.getText=function(a){var b,c,d=a.nodeType,e="";if(d){if(d===1||d===9||d===11){if(typeof a.textContent=="string")return a.textContent;if(typeof a.innerText=="string")return a.innerText.replace(k,"");for(a=a.firstChild;a;a=a.nextSibling)e+=n(a)}else if(d===3||d===4)return a.nodeValue}else for(b=0;c=a[b];b++)c.nodeType!==8&&(e+=n(c));return e},o=m.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!l.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&m.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!l.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&m.filter(b,a,!0)}},"":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("parentNode",b,f,a,d,c)},"~":function(a,b,c){var d,f=e++,g=x;typeof b=="string"&&!l.test(b)&&(b=b.toLowerCase(),d=b,g=w),g("previousSibling",b,f,a,d,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(j,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(j,"")},TAG:function(a,b){return a[1].replace(j,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||m.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&m.error(a[0]);a[0]=e++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(j,"");!f&&o.attrMap[g]&&(a[1]=o.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(j,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=m(b[3],null,null,c);else{var g=m.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(o.match.POS.test(b[0])||o.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!m(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=o.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||n([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}m.error(e)},CHILD:function(a,b){var c,e,f,g,h,i,j,k=b[1],l=a;switch(k){case"only":case"first":while(l=l.previousSibling)if(l.nodeType===1)return!1;if(k==="first")return!0;l=a;case"last":while(l=l.nextSibling)if(l.nodeType===1)return!1;return!0;case"nth":c=b[2],e=b[3];if(c===1&&e===0)return!0;f=b[0],g=a.parentNode;if(g&&(g[d]!==f||!a.nodeIndex)){i=0;for(l=g.firstChild;l;l=l.nextSibling)l.nodeType===1&&(l.nodeIndex=++i);g[d]=f}j=a.nodeIndex-e;return c===0?j===0:j%c===0&&j/c>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||!!a.nodeName&&a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=m.attr?m.attr(a,c):o.attrHandle[c]?o.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":!f&&m.attr?d!=null:f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=o.setFilters[e];if(f)return f(a,c,b,d)}}},p=o.match.POS,q=function(a,b){return"\\"+(b-0+1)};for(var r in o.match)o.match[r]=new RegExp(o.match[r].source+/(?![^\[]*\])(?![^\(]*\))/.source),o.leftMatch[r]=new RegExp(/(^(?:.|\r|\n)*?)/.source+o.match[r].source.replace(/\\(\d+)/g,q));o.match.globalPOS=p;var s=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(t){s=function(a,b){var c=0,d=b||[];if(g.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var e=a.length;c<e;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var u,v;c.documentElement.compareDocumentPosition?u=function(a,b){if(a===b){h=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(u=function(a,b){if(a===b){h=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],g=a.parentNode,i=b.parentNode,j=g;if(g===i)return v(a,b);if(!g)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return v(e[k],f[k]);return k===c?v(a,f[k],-1):v(e[k],b,1)},v=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(o.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},o.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(o.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(o.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=m,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){m=function(b,e,f,g){e=e||c;if(!g&&!m.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return s(e.getElementsByTagName(b),f);if(h[2]&&o.find.CLASS&&e.getElementsByClassName)return s(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return s([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return s([],f);if(i.id===h[3])return s([i],f)}try{return s(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var k=e,l=e.getAttribute("id"),n=l||d,p=e.parentNode,q=/^\s*[+~]/.test(b);l?n=n.replace(/'/g,"\\$&"):e.setAttribute("id",n),q&&p&&(e=e.parentNode);try{if(!q||p)return s(e.querySelectorAll("[id='"+n+"'] "+b),f)}catch(r){}finally{l||k.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)m[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}m.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!m.isXML(a))try{if(e||!o.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return m(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;o.order.splice(1,0,"CLASS"),o.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?m.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?m.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:m.contains=function(){return!1},m.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var y=function(a,b,c){var d,e=[],f="",g=b.nodeType?[b]:b;while(d=o.match.PSEUDO.exec(a))f+=d[0],a=a.replace(o.match.PSEUDO,"");a=o.relative[a]?a+"*":a;for(var h=0,i=g.length;h<i;h++)m(a,g[h],e,c);return m.filter(f,e)};m.attr=f.attr,m.selectors.attrMap={},f.find=m,f.expr=m.selectors,f.expr[":"]=f.expr.filters,f.unique=m.uniqueSort,f.text=m.getText,f.isXMLDoc=m.isXML,f.contains=m.contains}();var L=/Until$/,M=/^(?:parents|prevUntil|prevAll)/,N=/,/,O=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,Q=f.expr.match.globalPOS,R={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(T(this,a,!1),"not",a)},filter:function(a){return this.pushStack(T(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?Q.test(a)?f(a,this.context).index(this[0])>=0:f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h=1;while(g&&g.ownerDocument&&g!==b){for(d=0;d<a.length;d++)f(g).is(a[d])&&c.push({selector:a[d],elem:g,level:h});g=g.parentNode,h++}return c}var i=Q.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(i?i.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(S(c[0])||S(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c);L.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!R[a]?f.unique(e):e,(this.length>1||N.test(d))&&M.test(a)&&(e=e.reverse());return this.pushStack(e,a,P.call(arguments).join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var V="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|style)/i,bb=/<(?:script|object|embed|option|style)/i,bc=new RegExp("<(?:"+V+")[\\s/>]","i"),bd=/checked\s*(?:[^=]|=\s*.checked.)/i,be=/\/(java|ecma)script/i,bf=/^\s*<!(?:\[CDATA\[|\-\-)/,bg={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},bh=U(c);bg.optgroup=bg.option,bg.tbody=bg.tfoot=bg.colgroup=bg.caption=bg.thead,bg.th=bg.td,f.support.htmlSerialize||(bg._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){return f.access(this,function(a){return a===b?f.text(this):this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a))},null,a,arguments.length)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=f.isFunction(a);return this.each(function(c){f(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f
.clean(arguments);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f.clean(arguments));return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){return f.access(this,function(a){var c=this[0]||{},d=0,e=this.length;if(a===b)return c.nodeType===1?c.innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!bg[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(;d<e;d++)c=this[d]||{},c.nodeType===1&&(f.cleanData(c.getElementsByTagName("*")),c.innerHTML=a);c=0}catch(g){}}c&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bd.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bi(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,function(a,b){b.src?f.ajax({type:"GET",global:!1,url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bf,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)})}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i,j=a[0];b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof j=="string"&&j.length<512&&i===c&&j.charAt(0)==="<"&&!bb.test(j)&&(f.support.checkClone||!bd.test(j))&&(f.support.html5Clone||!bc.test(j))&&(g=!0,h=f.fragments[j],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean(a,i,e,d)),g&&(f.fragments[j]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d,e,g,h=f.support.html5Clone||f.isXMLDoc(a)||!bc.test("<"+a.nodeName+">")?a.cloneNode(!0):bo(a);if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bk(a,h),d=bl(a),e=bl(h);for(g=0;d[g];++g)e[g]&&bk(d[g],e[g])}if(b){bj(a,h);if(c){d=bl(a),e=bl(h);for(g=0;d[g];++g)bj(d[g],e[g])}}d=e=null;return h},clean:function(a,b,d,e){var g,h,i,j=[];b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);for(var k=0,l;(l=a[k])!=null;k++){typeof l=="number"&&(l+="");if(!l)continue;if(typeof l=="string")if(!_.test(l))l=b.createTextNode(l);else{l=l.replace(Y,"<$1></$2>");var m=(Z.exec(l)||["",""])[1].toLowerCase(),n=bg[m]||bg._default,o=n[0],p=b.createElement("div"),q=bh.childNodes,r;b===c?bh.appendChild(p):U(b).appendChild(p),p.innerHTML=n[1]+l+n[2];while(o--)p=p.lastChild;if(!f.support.tbody){var s=$.test(l),t=m==="table"&&!s?p.firstChild&&p.firstChild.childNodes:n[1]==="<table>"&&!s?p.childNodes:[];for(i=t.length-1;i>=0;--i)f.nodeName(t[i],"tbody")&&!t[i].childNodes.length&&t[i].parentNode.removeChild(t[i])}!f.support.leadingWhitespace&&X.test(l)&&p.insertBefore(b.createTextNode(X.exec(l)[0]),p.firstChild),l=p.childNodes,p&&(p.parentNode.removeChild(p),q.length>0&&(r=q[q.length-1],r&&r.parentNode&&r.parentNode.removeChild(r)))}var u;if(!f.support.appendChecked)if(l[0]&&typeof (u=l.length)=="number")for(i=0;i<u;i++)bn(l[i]);else bn(l);l.nodeType?j.push(l):j=f.merge(j,l)}if(d){g=function(a){return!a.type||be.test(a.type)};for(k=0;j[k];k++){h=j[k];if(e&&f.nodeName(h,"script")&&(!h.type||be.test(h.type)))e.push(h.parentNode?h.parentNode.removeChild(h):h);else{if(h.nodeType===1){var v=f.grep(h.getElementsByTagName("script"),g);j.splice.apply(j,[k+1,0].concat(v))}d.appendChild(h)}}}return j},cleanData:function(a){var b,c,d=f.cache,e=f.event.special,g=f.support.deleteExpando;for(var h=0,i;(i=a[h])!=null;h++){if(i.nodeName&&f.noData[i.nodeName.toLowerCase()])continue;c=i[f.expando];if(c){b=d[c];if(b&&b.events){for(var j in b.events)e[j]?f.event.remove(i,j):f.removeEvent(i,j,b.handle);b.handle&&(b.handle.elem=null)}g?delete i[f.expando]:i.removeAttribute&&i.removeAttribute(f.expando),delete d[c]}}}});var bp=/alpha\([^)]*\)/i,bq=/opacity=([^)]*)/,br=/([A-Z]|^ms)/g,bs=/^[\-+]?(?:\d*\.)?\d+$/i,bt=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,bu=/^([\-+])=([\-+.\de]+)/,bv=/^margin/,bw={position:"absolute",visibility:"hidden",display:"block"},bx=["Top","Right","Bottom","Left"],by,bz,bA;f.fn.css=function(a,c){return f.access(this,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)},a,c,arguments.length>1)},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=by(a,"opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=bu.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(by)return by(a,c)},swap:function(a,b,c){var d={},e,f;for(f in b)d[f]=a.style[f],a.style[f]=b[f];e=c.call(a);for(f in b)a.style[f]=d[f];return e}}),f.curCSS=f.css,c.defaultView&&c.defaultView.getComputedStyle&&(bz=function(a,b){var c,d,e,g,h=a.style;b=b.replace(br,"-$1").toLowerCase(),(d=a.ownerDocument.defaultView)&&(e=d.getComputedStyle(a,null))&&(c=e.getPropertyValue(b),c===""&&!f.contains(a.ownerDocument.documentElement,a)&&(c=f.style(a,b))),!f.support.pixelMargin&&e&&bv.test(b)&&bt.test(c)&&(g=h.width,h.width=c,c=e.width,h.width=g);return c}),c.documentElement.currentStyle&&(bA=function(a,b){var c,d,e,f=a.currentStyle&&a.currentStyle[b],g=a.style;f==null&&g&&(e=g[b])&&(f=e),bt.test(f)&&(c=g.left,d=a.runtimeStyle&&a.runtimeStyle.left,d&&(a.runtimeStyle.left=a.currentStyle.left),g.left=b==="fontSize"?"1em":f,f=g.pixelLeft+"px",g.left=c,d&&(a.runtimeStyle.left=d));return f===""?"auto":f}),by=bz||bA,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){if(c)return a.offsetWidth!==0?bB(a,b,d):f.swap(a,bw,function(){return bB(a,b,d)})},set:function(a,b){return bs.test(b)?b+"px":b}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bq.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNumeric(b)?"alpha(opacity="+b*100+")":"",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bp,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bp.test(g)?g.replace(bp,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){return f.swap(a,{display:"inline-block"},function(){return b?by(a,"margin-right"):a.style.marginRight})}})}),f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style&&a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)}),f.each({margin:"",padding:"",border:"Width"},function(a,b){f.cssHooks[a+b]={expand:function(c){var d,e=typeof c=="string"?c.split(" "):[c],f={};for(d=0;d<4;d++)f[a+bx[d]+b]=e[d]||e[d-2]||e[0];return f}}});var bC=/%20/g,bD=/\[\]$/,bE=/\r?\n/g,bF=/#.*$/,bG=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bH=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bI=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bJ=/^(?:GET|HEAD)$/,bK=/^\/\//,bL=/\?/,bM=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bN=/^(?:select|textarea)/i,bO=/\s+/,bP=/([?&])_=[^&]*/,bQ=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bR=f.fn.load,bS={},bT={},bU,bV,bW=["*/"]+["*"];try{bU=e.href}catch(bX){bU=c.createElement("a"),bU.href="",bU=bU.href}bV=bQ.exec(bU.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bR)return bR.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bM,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bN.test(this.nodeName)||bH.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bE,"\r\n")}}):{name:b.name,value:c.replace(bE,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.on(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?b$(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),b$(a,b);return a},ajaxSettings:{url:bU,isLocal:bI.test(bV[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bY(bS),ajaxTransport:bY(bT),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?ca(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=cb(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.fireWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f.Callbacks("once memory"),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bG.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.add,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bF,"").replace(bK,bV[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bO),d.crossDomain==null&&(r=bQ.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bV[1]&&r[2]==bV[2]&&(r[3]||(r[1]==="http:"?80:443))==(bV[3]||(bV[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bZ(bS,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bJ.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bL.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bP,"$1_="+x);d.url=y+(y===d.url?(bL.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bW+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bZ(bT,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){if(s<2)w(-1,z);else throw z}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)b_(g,a[g],c,e);return d.join("&").replace(bC,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var cc=f.now(),cd=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+cc++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=typeof b.data=="string"&&/^application\/x\-www\-form\-urlencoded/.test(b.contentType);if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(cd.test(b.url)||e&&cd.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(cd,l),b.url===j&&(e&&(k=k.replace(cd,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var ce=a.ActiveXObject?function(){for(var a in cg)cg[a](0,1)}:!1,cf=0,cg;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ch()||ci()}:ch,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,ce&&delete cg[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n);try{m.text=h.responseText}catch(a){}try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cf,ce&&(cg||(cg={},f(a).unload(ce)),cg[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cj={},ck,cl,cm=/^(?:toggle|show|hide)$/,cn=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,co,cp=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cq;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(ct("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),(e===""&&f.css(d,"display")==="none"||!f.contains(d.ownerDocument.documentElement,d))&&f._data(d,"olddisplay",cu(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(ct("hide",3),a,b,c);var d,e,g=0,h=this.length;for(;g<h;g++)d=this[g],d.style&&(e=f.css(d,"display"),e!=="none"&&!f._data(d,"olddisplay")&&f._data(d,"olddisplay",e));for(g=0;g<h;g++)this[g].style&&(this[g].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(ct("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){function g(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o,p,q;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]);if((k=f.cssHooks[g])&&"expand"in k){l=k.expand(a[g]),delete a[g];for(i in l)i in a||(a[i]=l[i])}}for(g in a){h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(!f.support.inlineBlockNeedsLayout||cu(this.nodeName)==="inline"?this.style.display="inline-block":this.style.zoom=1))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)j=new f.fx(this,b,i),h=a[i],cm.test(h)?(q=f._data(this,"toggle"+i)||(h==="toggle"?d?"show":"hide":0),q?(f._data(this,"toggle"+i,q==="show"?"hide":"show"),j[q]()):j[h]()):(m=cn.exec(h),n=j.cur(),m?(o=parseFloat(m[2]),p=m[3]||(f.cssNumber[i]?"":"px"),p!=="px"&&(f.style(this,i,(o||1)+p),n=(o||1)/j.cur()*n,f.style(this,i,n+p)),m[1]&&(o=(m[1]==="-="?-1:1)*o+n),j.custom(n,o,p)):j.custom(n,h,""));return!0}var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return e.queue===!1?this.each(g):this.queue(e.queue,g)},stop:function(a,c,d){typeof a!="string"&&(d=c,c=a,a=b),c&&a!==!1&&this.queue(a||"fx",[]);return this.each(function(){function h(a,b,c){var e=b[c];f.removeData(a,c,!0),e.stop(d)}var b,c=!1,e=f.timers,g=f._data(this);d||f._unmark(!0,this);if(a==null)for(b in g)g[b]&&g[b].stop&&b.indexOf(".run")===b.length-4&&h(this,g,b);else g[b=a+".run"]&&g[b].stop&&h(this,g,b);for(b=e.length;b--;)e[b].elem===this&&(a==null||e[b].queue===a)&&(d?e[b](!0):e[b].saveState(),c=!0,e.splice(b,1));(!d||!c)&&f.dequeue(this,a)})}}),f.each({slideDown:ct("show",1),slideUp:ct("hide",1),slideToggle:ct("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default;if(d.queue==null||d.queue===!0)d.queue="fx";d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue?f.dequeue(this,d.queue):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a){return a},swing:function(a){return-Math.cos(a*Math.PI)/2+.5}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,c,d){function h(a){return e.step(a)}var e=this,g=f.fx;this.startTime=cq||cr(),this.end=c,this.now=this.start=a,this.pos=this.state=0,this.unit=d||this.unit||(f.cssNumber[this.prop]?"":"px"),h.queue=this.options.queue,h.elem=this.elem,h.saveState=function(){f._data(e.elem,"fxshow"+e.prop)===b&&(e.options.hide?f._data(e.elem,"fxshow"+e.prop,e.start):e.options.show&&f._data(e.elem,"fxshow"+e.prop,e.end))},h()&&f.timers.push(h)&&!co&&(co=setInterval(g.tick,g.interval))},show:function(){var a=f._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=a||f.style(this.elem,this.prop),this.options.show=!0,a!==b?this.custom(this.cur(),a):this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f._data(this.elem,"fxshow"+this.prop)||f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b,c,d,e=cq||cr(),g=!0,h=this.elem,i=this.options;if(a||e>=i.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),i.animatedProperties[this.prop]=!0;for(b in i.animatedProperties)i.animatedProperties[b]!==!0&&(g=!1);if(g){i.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){h.style["overflow"+b]=i.overflow[a]}),i.hide&&f(h).hide();if(i.hide||i.show)for(b in i.animatedProperties)f.style(h,b,i.orig[b]),f.removeData(h,"fxshow"+b,!0),f.removeData(h,"toggle"+b,!0);d=i.complete,d&&(i.complete=!1,d.call(h))}return!1}i.duration==Infinity?this.now=e:(c=e-this.startTime,this.state=c/i.duration,this.pos=f.easing[i.animatedProperties[this.prop]](this.state,c,0,1,i.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){var a,b=f.timers,c=0;for(;c<b.length;c++)a=b[c],!a()&&b[c]===a&&b.splice(c--,1);b.length||f.fx.stop()},interval:13,stop:function(){clearInterval(co),co=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=a.now+a.unit:a.elem[a.prop]=a.now}}}),f.each(cp.concat.apply([],cp),function(a,b){b.indexOf("margin")&&(f.fx.step[b]=function(a){f.style(a.elem,b,Math.max(0,a.now)+a.unit)})}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cv,cw=/^t(?:able|d|h)$/i,cx=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?cv=function(a,b,c,d){try{d=a.getBoundingClientRect()}catch(e){}if(!d||!f.contains(c,a))return d?{top:d.top,left:d.left}:{top:0,left:0};var g=b.body,h=cy(b),i=c.clientTop||g.clientTop||0,j=c.clientLeft||g.clientLeft||0,k=h.pageYOffset||f.support.boxModel&&c.scrollTop||g.scrollTop,l=h.pageXOffset||f.support.boxModel&&c.scrollLeft||g.scrollLeft,m=d.top+k-i,n=d.left+l-j;return{top:m,left:n}}:cv=function(a,b,c){var d,e=a.offsetParent,g=a,h=b.body,i=b.defaultView,j=i?i.getComputedStyle(a,null):a.currentStyle,k=a.offsetTop,l=a.offsetLeft;while((a=a.parentNode)&&a!==h&&a!==c){if(f.support.fixedPosition&&j.position==="fixed")break;d=i?i.getComputedStyle(a,null):a.currentStyle,k-=a.scrollTop,l-=a.scrollLeft,a===e&&(k+=a.offsetTop,l+=a.offsetLeft,f.support.doesNotAddBorder&&(!f.support.doesAddBorderForTableAndCells||!cw.test(a.nodeName))&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),g=e,e=a.offsetParent),f.support.subtractsBorderForOverflowNotVisible&&d.overflow!=="visible"&&(k+=parseFloat(d.borderTopWidth)||0,l+=parseFloat(d.borderLeftWidth)||0),j=d}if(j.position==="relative"||j.position==="static")k+=h.offsetTop,l+=h.offsetLeft;f.support.fixedPosition&&j.position==="fixed"&&(k+=Math.max(c.scrollTop,h.scrollTop),l+=Math.max(c.scrollLeft,h.scrollLeft));return{top:k,left:l}},f.fn.offset=function(a){if(arguments.length)return a===b?this:this.each(function(b){f.offset.setOffset(this,a,b)});var c=this[0],d=c&&c.ownerDocument;if(!d)return null;if(c===d.body)return f.offset.bodyOffset(c);return cv(c,d,d.documentElement)},f.offset={bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.support.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=cx.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!cx.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,c){var d=/Y/.test(c);f.fn[a]=function(e){return f.access(this,function(a,e,g){var h=cy(a);if(g===b)return h?c in h?h[c]:f.support.boxModel&&h.document.documentElement[e]||h.document.body[e]:a[e];h?h.scrollTo(d?f(h).scrollLeft():g,d?g:f(h).scrollTop()):a[e]=g},a,e,arguments.length,null)}}),f.each({Height:"height",Width:"width"},function(a,c){var d="client"+a,e="scroll"+a,g="offset"+a;f.fn["inner"+a]=function(){var a=this[0];return a?a.style?parseFloat(f.css(a,c,"padding")):this[c]():null},f.fn["outer"+a]=function(a){var b=this[0];return b?b.style?parseFloat(f.css(b,c,a?"margin":"border")):this[c]():null},f.fn[c]=function(a){return f.access(this,function(a,c,h){var i,j,k,l;if(f.isWindow(a)){i=a.document,j=i.documentElement[d];return f.support.boxModel&&j||i.body&&i.body[d]||j}if(a.nodeType===9){i=a.documentElement;if(i[d]>=i[e])return i[d];return Math.max(a.body[e],i[e],a.body[g],i[g])}if(h===b){k=f.css(a,c),l=parseFloat(k);return f.isNumeric(l)?l:k}f(a).css(c,h)},c,a,arguments.length,null)}}),a.jQuery=a.$=f,typeof define=="function"&&define.amd&&define.amd.jQuery&&define("jquery",[],function(){return f})})(window);;

    loader.define('/application.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Antialias, CompositingControl, Cube, DeferredModel, DeferredShadowMap, Illumination, Lighting, LowresModel, Model, PictureSettings, Quad, Rendernode, SHConstants, SSAO, Sun, Windows, camera, loading, makeStat, schedule, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

schedule = require('schedule');

loading = require('loading');

camera = require('camera');

Quad = require('/webgl/quad');

Cube = require('/webgl/cube');

Antialias = require('antialias');

_ref = require('model'), LowresModel = _ref.LowresModel, Model = _ref.Model;

Illumination = require('illumination');

Rendernode = require('/rendernode');

Windows = require('/windows');

DeferredShadowMap = require('/depth').DeferredShadowMap;

Sun = require('sun');

DeferredModel = require('deferred_model');

SSAO = require('ssao');

CompositingControl = (function() {

  function CompositingControl(gui) {
    var folder;
    gui.remember(this);
    this.draw_probes = false;
    this.gi = 1;
    this.di = 1;
    this.ao = 0.8;
    folder = gui.addFolder('Compositing');
    folder.add(this, 'draw_probes').name('Draw Probes');
    folder.add(this, 'gi', 0.0, 2.0).name('Glob. Illum.');
    folder.add(this, 'di', 0.0, 2.0).name('Direct. Illum.');
    folder.add(this, 'ao', 0.0, 1.0).name('SSAO');
  }

  return CompositingControl;

})();

Lighting = (function(_super) {

  __extends(Lighting, _super);

  function Lighting(gui) {
    this.update = __bind(this.update, this);

    this.bouncesChanged = __bind(this.bouncesChanged, this);

    this.computeRadiance = __bind(this.computeRadiance, this);

    var folder;
    gui.remember(this);
    Lighting.__super__.constructor.call(this);
    this.sunRadiance = 1.0;
    this.skyRadiance = 1.0;
    this.giGain = 1.0;
    this.bounces = 3;
    this.sunColor = [255, 255, 255];
    this.skyColor = [0x07, 0xcb, 0xf5];
    this.sun_radiance = [0, 0, 0];
    this.sky_radiance = [0, 0, 0];
    folder = gui.addFolder('Lighting');
    folder.addColor(this, 'sunColor').name('Sun Color').onChange(this.computeRadiance);
    folder.add(this, 'sunRadiance', 0.0, 20.0).name('Sun Radiance').onChange(this.computeRadiance);
    folder.addColor(this, 'skyColor').name('Sky Color').onChange(this.computeRadiance);
    folder.add(this, 'skyRadiance', 0.0, 20.0).name('Sky Radiance').onChange(this.computeRadiance);
    folder.add(this, 'giGain', 0.0, 20.0).name('GI-gain').onChange(this.update);
    folder.add(this, 'bounces', 1.0, 10.0).step(1).name('Bounces').onChange(this.bouncesChanged);
    this.computeRadiance();
    this.lastbounces = this.bounces;
  }

  Lighting.prototype.computeRadiance = function() {
    this.sun_radiance[0] = this.sunRadiance * (this.sunColor[0] / 255.0);
    this.sun_radiance[1] = this.sunRadiance * (this.sunColor[1] / 255.0);
    this.sun_radiance[2] = this.sunRadiance * (this.sunColor[2] / 255.0);
    this.sky_radiance[0] = this.skyRadiance * (this.skyColor[0] / 255.0);
    this.sky_radiance[1] = this.skyRadiance * (this.skyColor[1] / 255.0);
    this.sky_radiance[2] = this.skyRadiance * (this.skyColor[2] / 255.0);
    return this.update();
  };

  Lighting.prototype.bouncesChanged = function() {
    if (this.bounces !== this.lastBounces) {
      this.lastBounces = this.bounces;
      return this.update();
    }
  };

  Lighting.prototype.update = function() {
    return this.trigger('change');
  };

  return Lighting;

})(require('events'));

PictureSettings = (function() {

  function PictureSettings(gui) {
    var folder;
    gui.remember(this);
    this.inputGamma = 1.8;
    this.outputGamma = 1.8;
    this.brightness = 1.0;
    this.saturation = 1.0;
    folder = gui.addFolder('Picture');
    folder.add(this, 'inputGamma', 0.25, 3.0).name('Input Gamma');
    folder.add(this, 'outputGamma', 0.25, 3.0).name('Output Gamma');
    folder.add(this, 'brightness', 0.0, 10.0).name('Exposure');
    folder.add(this, 'saturation', 0.0, 4.0).name('Saturation');
  }

  return PictureSettings;

})();

SHConstants = (function() {

  function SHConstants(app, gui) {
    var folder;
    this.app = app;
    this.change = __bind(this.change, this);

    gui.remember(this);
    this.c1 = 0.43;
    this.c2 = 0.66;
    this.band3 = 1.0;
    this.c3 = 0.9;
    this.c4 = 0.34;
    this.c5 = 0.43;
    this.data = new Float32Array(5);
    folder = gui.addFolder('Harmonics');
    folder.add(this, 'c1', 0.0, 4.0).name('L0').onChange(this.change);
    folder.add(this, 'c2', 0.0, 4.0).name('L1').onChange(this.change);
    folder.add(this, 'band3', 0.0, 4.0).name('L2').onChange(this.change);
    folder.add(this, 'c3', 0.0, 4.0).name('L2m2/L2m1/L21').onChange(this.change);
    folder.add(this, 'c4', 0.0, 4.0).name('L20').onChange(this.change);
    folder.add(this, 'c5', 0.0, 4.0).name('L22').onChange(this.change);
    this.updateData();
  }

  SHConstants.prototype.updateData = function() {
    this.data[0] = this.c1;
    this.data[1] = this.c2;
    this.data[2] = this.band3 * this.c3;
    this.data[3] = this.band3 * this.c4;
    return this.data[4] = this.band3 * this.c5;
  };

  SHConstants.prototype.change = function() {
    this.updateData();
    return this.app.lightChange();
  };

  return SHConstants;

})();

makeStat = function(mode, offset) {
  var node, stats;
  stats = new Stats();
  stats.setMode(mode);
  node = $(stats.domElement);
  node.css({
    position: 'absolute',
    left: offset,
    top: 0
  }).appendTo('body').hide();
  stats.hide = function() {
    return node.clearQueue().fadeOut();
  };
  stats.show = function() {
    return node.clearQueue().fadeIn();
  };
  return stats;
};

exports.Application = (function() {

  function _Class(canvas) {
    var floatExt, folder, gui, resmap,
      _this = this;
    this.canvas = canvas;
    this.update = __bind(this.update, this);

    this.resize = __bind(this.resize, this);

    this.lightChange = __bind(this.lightChange, this);

    this.sunChanged = __bind(this.sunChanged, this);

    $('<div id="controls"></div>').css('margin', 10).appendTo('#ui');
    Rendernode.stateDefaults(gl);
    gui = this.gui = new dat.GUI({
      load: get('presets/new.json')
    });
    gui.remember(this);
    this.gui_width = gui.width = 370;
    this.gui.closed = false;
    this.fps = makeStat(0, 0);
    this.rtime = makeStat(1, 80);
    this.gui_closed = gui.closed;
    this.resolution = 0.5;
    this.resolution_label = '1:2 default';
    resmap = {
      '2:1 very slow!': 2,
      '1:1 slow': 1,
      '1:2 default': 0.5,
      '1:4 ugly': 0.25,
      '1:8 worse': 0.125
    };
    folder = gui.addFolder('Performance');
    $('<li>WASD=move, space=overview, cursor keys=navigate</li>').appendTo(folder.__ul);
    folder.add(this, 'resolution_label', ['2:1 very slow!', '1:1 slow', '1:2 default', '1:4 ugly', '1:8 worse']).name('Resolution').onChange(function() {
      _this.resolution = resmap[_this.resolution_label];
      return _this.resizeBuffers();
    });
    this.resolution = resmap[this.resolution_label];
    this.show_fps = false;
    folder.add(this, 'show_fps').name('FPS').onChange(function() {
      if (_this.show_fps) {
        _this.fps.show();
        return _this.rtime.show();
      } else {
        _this.fps.hide();
        return _this.rtime.hide();
      }
    });
    if (this.show_fps) {
      this.fps.show();
      this.rtime.show();
    } else {
      this.fps.hide();
      this.rtime.hide();
    }
    this.picture = new PictureSettings(gui);
    this.sun = new Sun(gui).on('change', this.sunChanged);
    this.compositing_control = new CompositingControl(gui);
    this.lighting = new Lighting(gui).on('change', this.lightChange);
    this.shconst = new SHConstants(this, gui);
    loading.hide();
    this.near = 0.1;
    this.far = 42;
    this.camera = new camera.FlyCam({
      gui: gui,
      near: this.near,
      far: this.far,
      x: -10,
      y: 7,
      z: -1.5,
      o: 100,
      p: 20
    });
    this.sponza = new Model(gl);
    this.lowres = new LowresModel(gl);
    floatExt = gl.getFloatExtension({
      require: ['renderable', 'filterable']
    });
    this.view_normaldepth = new Rendernode(gl, {
      program: get('normaldepth.shader'),
      drawable: this.sponza,
      depthBuffer: true,
      depthTest: true,
      depthWrite: true,
      cullFace: 'BACK',
      type: floatExt.type,
      filter: 'nearest',
      hdrClear: true
    });
    this.ssao = new SSAO(gl, this.view_normaldepth);
    this.direct_light = new DeferredShadowMap(gl, {
      drawable: this.sponza,
      depthWidth: 512,
      depthHeight: 512,
      eyeNormaldepth: this.view_normaldepth,
      light: this.sun,
      camera: this.camera,
      blurred: true
    });
    this.illumination = new Illumination(gl, this.sun, this.lighting, this.lowres, this.sponza, this.view_normaldepth, this.sun.orientation, this.sun.elevation, this.shconst);
    this.albedo = new Rendernode(gl, {
      program: get('albedo.shader'),
      drawable: this.sponza,
      depthBuffer: true,
      depthTest: true,
      depthWrite: true
    });
    this.global_illumination = new Rendernode(gl, {
      program: get('global_illumination.shader'),
      drawable: new DeferredModel(gl, this.illumination.probes),
      cullFace: 'FRONT',
      blend: 'additive',
      type: floatExt.type,
      depthBuffer: this.view_normaldepth.depth,
      depthWrite: false,
      depthTest: 'GEQUAL'
    });
    this.composit = new Rendernode(gl, {
      program: get('composit.shader'),
      drawable: quad
    });
    this.antialias = new Antialias(gl, gui, this.composit);
    this.windows = new Windows(gl, gui, [
      {
        label: 'Scene depth from sun',
        affine: [1, 0],
        gamma: false,
        tex: this.direct_light.depth.output
      }, {
        label: 'Scene normal/depth',
        affine: [0.5, 0.5],
        gamma: false,
        tex: this.view_normaldepth
      }, {
        label: 'Scene depth moments',
        gamma: false,
        tex: this.ssao.blur.output
      }, {
        label: 'Direct Illumination Lightmap',
        tex: this.illumination.direct_light.output
      }, {
        label: 'Global Illumination Lightmap',
        diva: true,
        tex: this.illumination.bounce
      }, {
        label: 'Lightmap Dictionary',
        tex: this.illumination.texmap
      }, {
        label: 'Albedo Probe Values',
        tex: this.illumination.diffusemap
      }, {
        label: 'Light Probes',
        tex: this.illumination.lightprobes
      }, {
        label: 'Spherical Harmonics Coefficients',
        tex: this.illumination.coefficients
      }, {
        label: 'Albedo',
        tex: this.albedo
      }, {
        label: 'SSAO',
        gamma: false,
        tex: this.ssao.output
      }, {
        label: 'Direct Illumination',
        tex: this.direct_light.output
      }, {
        label: 'Global Illumination',
        diva: true,
        tex: this.global_illumination
      }, {
        label: 'Composited',
        gamma: false,
        tex: this.composit
      }, {
        label: 'Antialiased',
        gamma: false,
        tex: this.antialias.node
      }
    ]);
    this.target_width = this.canvas.width();
    this.current_width = this.target_width;
    $(window).resize(this.resize);
    this.resize();
    schedule.run(this.update);
    this.canvas.fadeIn(2000);
    $('div.dg > ul').css('margin-top', 0);
  }

  _Class.prototype.sunChanged = function() {
    this.direct_light.updateDepth();
    this.illumination.updateDirectLight();
    return this.lightChange();
  };

  _Class.prototype.lightChange = function() {
    return this.illumination.update();
  };

  _Class.prototype.resizeBuffers = function(width, height) {
    var h, w;
    w = this.width * this.resolution;
    h = this.height * this.resolution;
    this.view_normaldepth.resize(w, h);
    this.albedo.resize(w, h);
    this.global_illumination.resize(w, h);
    this.direct_light.resize(w, h);
    this.composit.resize(w, h);
    this.antialias.resize(w, h);
    this.illumination.debug.resize(w, h);
    return this.ssao.resize(w, h);
  };

  _Class.prototype.resize = function() {
    this.width = this.canvas.width();
    this.height = this.canvas.height();
    this.camera.aspect(this.width, this.height);
    this.canvas[0].width = this.width;
    this.canvas[0].height = this.height;
    this.resizeBuffers(this.width, this.height);
    return this.resizeWindows();
  };

  _Class.prototype.update = function() {
    this.fps.end();
    this.fps.begin();
    this.rtime.begin();
    this.step();
    this.draw();
    return this.rtime.end();
  };

  _Class.prototype.resizeWindows = function() {
    return this.windows.node.viewport(0, 0, this.current_width, this.height);
  };

  _Class.prototype.step = function() {
    var dw, gui_closed, gui_width;
    gui_closed = this.gui.closed;
    if (gui_closed) {
      this.target_width = this.width;
    } else {
      gui_width = this.gui.width;
      this.target_width = this.width - (gui_width + 10);
    }
    dw = this.target_width - this.current_width;
    this.current_width = this.current_width + dw * 0.1;
    dw = Math.abs(this.target_width - this.current_width);
    if (dw > 1) {
      this.resizeWindows();
    } else if (dw <= 1 && dw > 0) {
      this.current_width = this.target_width;
      this.resizeWindows();
    }
    return this.camera.update();
  };

  _Class.prototype.draw = function() {
    var probe_factor;
    this.view_normaldepth.clear(0, 0, 0, 100).start().clearDepth().mat4('proj', this.camera.proj).mat4('view', this.camera.view).mat3('view_rot', this.camera.rot).drawModel('bumpmap').end();
    this.ssao.update();
    this.albedo.start().f('gamma', this.picture.inputGamma).mat4('proj', this.camera.proj).mat4('view', this.camera.view).mat3('view_rot', this.camera.rot).clearBoth(0, 0, 0, 0).drawModel('diffuse_texture').end();
    this.global_illumination.start().f('gi_gain', this.lighting.giGain).fv('shconst', this.shconst.data).sampler('normaldepth', this.view_normaldepth).mat4('proj', this.camera.proj).mat4('view', this.camera.view).mat4('inv_view', this.camera.inv_view).sampler('coefficients', this.illumination.coefficients).val2('coefficients_size', this.illumination.coefficients.width, this.illumination.coefficients.height).clear().draw().end();
    this.direct_light.updateShadow();
    if (this.compositing_control.draw_probes) {
      probe_factor = 1;
      this.illumination.drawDebug(this.camera, this.view_normaldepth);
    } else {
      probe_factor = 0;
    }
    this.composit.start().clear().f('gamma', this.picture.outputGamma).f('brightness', this.picture.brightness).f('saturation', this.picture.saturation).vec3('sun_radiance', this.lighting.sun_radiance).vec3('sky_radiance', this.lighting.sky_radiance).f('probe_factor', probe_factor).f('gi_factor', this.compositing_control.gi).f('di_factor', this.compositing_control.di).f('ao_factor', this.compositing_control.ao).vec3('sky_color', this.lighting.skyColor).sampler('debug', this.illumination.debug).sampler('albedo', this.albedo).sampler('global', this.global_illumination).sampler('direct', this.direct_light.output).sampler('ssao', this.ssao.output).draw().end();
    this.antialias.apply();
    return this.windows.draw(this.picture.outputGamma);
  };

  return _Class;

})();
});
    
    loader.define('/deferred_model.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var DeferredModel, Sphere,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Sphere = require('/webgl/sphere');

return DeferredModel = (function(_super) {

  __extends(DeferredModel, _super);

  DeferredModel.prototype.attribs = ['position', 'lightprobe', 'center'];

  DeferredModel.prototype.pointers = [
    {
      name: 'position',
      size: 3,
      offset: 0,
      stride: 7
    }, {
      name: 'lightprobe',
      size: 4,
      offset: 3,
      stride: 7
    }
  ];

  function DeferredModel(gl, probes) {
    var buffer, i, probe, px, py, pz, template, vi, x, y, z, _i, _j, _len, _ref;
    this.gl = gl;
    DeferredModel.__super__.constructor.call(this);
    template = Sphere.makeVertices(5.1, 2);
    buffer = [];
    for (i = _i = 0, _len = probes.length; _i < _len; i = ++_i) {
      probe = probes[i];
      px = probe.x;
      py = probe.y;
      pz = probe.z;
      for (vi = _j = 0, _ref = template.length; _j < _ref; vi = _j += 3) {
        x = template[vi];
        y = template[vi + 1];
        z = template[vi + 2];
        buffer.push(x, y, z, px, py, pz, i);
      }
    }
    this.size = buffer.length / 7;
    this.uploadList(buffer);
  }

  return DeferredModel;

})(require('webgl/drawable'));
});
    
    loader.define('/main.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Quad, Shader, audio, disableSelect, enableSelect, errorContainer, load_hooks, loading;

audio = require('audio');

loading = require('loading');

Shader = require('webgl/shader');

Quad = require('webgl/quad');

require('webgl-nuke-vendor-prefix');

require('webgl-texture-float-extension-shims');

load_hooks = {
  '\.jpg$|\.jpeg$|\.gif$|\.png': function(name, buffer, callback) {
    var ext, image, mime;
    ext = name.split('.').pop();
    switch (ext) {
      case 'png':
        mime = 'image/png';
        break;
      case 'gif':
        mime = 'image/gif';
        break;
      case 'jpg':
      case 'jpeg':
        mime = 'image/jpeg';
    }
    image = new Image();
    image.src = getURL(buffer, mime);
    return image.onload = function() {
      return callback(image);
    };
  },
  '\.mpg$|\.ogg$|\.wav$': function(name, buffer, callback) {
    return audio.decode(buffer, function(result) {
      return callback(result);
    });
  }
};

errorContainer = function(title) {
  canvas.remove();
  $('#ui').empty();
  return $('<div></div>').css({
    position: 'absolute',
    width: 300,
    left: '50%',
    top: 50,
    marginLeft: -100
  }).append($('<h1></h1>').text(title)).appendTo('#ui');
};

disableSelect = function() {
  $('*').each(function() {
    $(this).attr('unselectable', 'on').css({
      '-moz-user-select': 'none',
      '-webkit-user-select': 'none',
      'user-select': 'none',
      '-ms-user-select': 'none'
    });
    return this.onselectstart = function() {
      return false;
    };
  });
  return document.oncontextmenu = function() {
    return false;
  };
};

enableSelect = function() {
  $('*').each(function() {
    $(this).removeAttr('unselectable').css({
      '-moz-user-select': 'text',
      '-webkit-user-select': 'text',
      'user-select': 'text',
      '-ms-user-select': 'text'
    });
    return this.onselectstart = void 0;
  });
  return document.oncontextmenu = void 0;
};

exports.main = function() {
  var Application, application, container, floatExt, stddev;
  disableSelect();
  window.canvas = $('canvas');
  window.onerror = function(error) {
    if (error.search(Shader.error) > 0) {
      return true;
    }
  };
  try {
    window.gl = canvas[0].getContext('experimental-webgl');
    if (!window.gl) {
      window.gl = canvas[0].getContext('webgl');
    }
  } catch (_error) {}
  if (window.gl) {
    window.quad = new Quad(window.gl);
    stddev = gl.getExtension('OES_standard_derivatives');
    if (!stddev) {
      return errorContainer('Missing Extension: Standard Derivatives').append('<p>This application requires the WebGL <a href="http://www.khronos.org/registry/webgl/extensions/OES_standard_derivatives/">Standard Derivatives extension</a> which you do not have, sorry.</p>');
    }
    floatExt = gl.getFloatExtension({
      require: ['renderable'],
      prefer: ['filterable', 'half'],
      throws: false
    });
    if (!floatExt) {
      return errorContainer('Missing Extension: Floating Point Textures').append('<p>This application requires the WebGL <a href="http://www.khronos.org/registry/webgl/extensions/OES_texture_float/">Floating Point Textures extension</a> which you do not have, sorry.</p>');
    }
    Application = require('application').Application;
    application = null;
    loading.show('Loading ...');
    return loader.hooks(load_hooks).mount({
      url: 'assets.pack',
      loaded: function(files, fs) {
        var container, name, value;
        for (name in files) {
          value = files[name];
          if (name.match('\.shaderlib$')) {
            fs[name] = Shader.splitLines(name, value);
          }
        }
        try {
          for (name in files) {
            value = files[name];
            if (name.match('\.shader$')) {
              fs[name] = new Shader(gl, name, value);
            }
          }
          return application = new Application(window.canvas, window.gl);
        } catch (error) {
          if (error === 'ShaderError') {
            enableSelect();
            container = errorContainer('Shader Error').append('<p>\n    An error occured when compiling a shader, you can <a href="mailto:pyalot@gmail.com">paste me the error</a>.\n</p>');
            container.css({
              width: 600,
              marginLeft: -300
            });
            return $('<pre></pre>').text(Shader.lastError).css('overflow', 'auto').appendTo(container);
          } else {
            throw error;
          }
        }
      },
      progress: loading.progress
    });
  } else {
    container = errorContainer('You dont have WebGL');
    if ($.browser.msie) {
      container.append('<p>\n    You have Internet Explorer, please install\n    <a href="https://www.google.com/intl/en/chrome/browser/">Google Chrome</a> or\n    <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>\n</p>');
    } else if ($.browser.webkit) {
      container.append('<p>\n    If you use OSX Safari, please <a href="http://www.ikriz.nl/2011/08/23/enable-webgl-in-safari">enable WebGL manually</a>.\n    If you use iOS Safari, you cannot use WebGL.\n    If you use Android, please try <a href="http://www.mozilla.org/en-US/mobile/">Firefox Mobile</a> or\n    <a href="https://play.google.com/store/apps/details?id=com.opera.browser&hl=en">Opera Mobile</a>\n</p>');
    }
    return container.append('<p>\n    Please consult the <a href="http://support.google.com/chrome/bin/answer.py?hl=en&answer=1220892">support pages</a>\n    on how to get WebGL for your machine.\n</p>');
  }
};
});
    
    loader.define('/sun.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Sun,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

return Sun = (function(_super) {

  __extends(Sun, _super);

  function Sun(gui, orientation, elevation) {
    var folder;
    this.orientation = orientation != null ? orientation : 104;
    this.elevation = elevation != null ? elevation : 60;
    this.update = __bind(this.update, this);

    gui.remember(this);
    Sun.__super__.constructor.call(this);
    folder = gui.addFolder('Sun');
    folder.add(this, 'orientation', 0, 360).onChange(this.update);
    folder.add(this, 'elevation', 0, 90).onChange(this.update);
    this.near = -1;
    this.far = 41;
    this.proj = new Mat4().ortho(this.near, this.far, 21, -21, -21, 21);
    this.view = new Mat4();
    this.rot = new Mat3();
    this.update();
  }

  Sun.prototype.update = function() {
    this.view.identity().translateVal3(0, 0, -21).rotatex(this.elevation).rotatey(this.orientation).translateVal3(0, -7.5, 0).toMat3(this.rot.identity());
    this.trigger('change');
    return this;
  };

  return Sun;

})(require('events'));
});
    
    loader.define('/dist3d.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var cross, dot, length, sadd, slength, smul, vadd, vsub;

vsub = function(p1, p2) {
  return [p1[0] - p2[0], p1[1] - p2[1], p1[2] - p2[2]];
};

vadd = function(p1, p2) {
  return [p1[0] + p2[0], p1[1] + p2[1], p1[2] + p2[2]];
};

sadd = function(s, p) {
  var x, y, z;
  x = p[0];
  y = p[1];
  z = p[2];
  return [x + s, y + s, z + s];
};

slength = function(p) {
  var x, y, z;
  x = p[0];
  y = p[1];
  z = p[2];
  return x * x + y * y + z * z;
};

length = function(p) {
  return Math.sqrt(slength(p));
};

dot = function(p1, p2) {
  var x1, x2, y1, y2, z1, z2;
  x1 = p1[0];
  y1 = p1[1];
  z1 = p1[2];
  x2 = p2[0];
  y2 = p2[1];
  z2 = p2[2];
  return x1 * x2 + y1 * y2 + z1 * z2;
};

smul = function(s, p) {
  var x, y, z;
  x = p[0];
  y = p[1];
  z = p[2];
  return [x * s, y * s, z * s];
};

cross = function(p1, p2) {
  var x1, x2, y1, y2, z1, z2;
  x1 = p1[0];
  y1 = p1[1];
  z1 = p1[2];
  x2 = p2[0];
  y2 = p2[1];
  z2 = p2[2];
  return [y1 * z2 - z1 * y2, z1 * x2 - x1 * z2, x1 * y2 - y1 * x2];
};

exports.closestPointTriangle = function(p, a, b, c) {
  var ab, ac, bc, n, sdenom, snom, tdenom, tnom, u, udenom, unom, v, va, vb, vc, w;
  ab = vsub(b, a);
  ac = vsub(c, a);
  bc = vsub(c, b);
  snom = dot(vsub(p, a), ab);
  sdenom = dot(vsub(p, b), vsub(a, b));
  tnom = dot(vsub(p, a), ac);
  tdenom = dot(vsub(p, c), vsub(a, c));
  if (snom <= 0 && tnom <= 0) {
    return a;
  }
  unom = dot(vsub(p, b), bc);
  udenom = dot(vsub(p, c), vsub(b, c));
  if (sdenom <= 0 && unom <= 0) {
    return b;
  }
  if (tdenom <= 0 && udenom <= 0) {
    return c;
  }
  n = cross(vsub(b, a), vsub(c, a));
  vc = dot(n, cross(vsub(a, p), vsub(b, p)));
  if (vc <= 0 && snom >= 0 && sdenom >= 0) {
    return vadd(a, smul(snom / (snom + sdenom), ab));
  }
  va = dot(n, cross(vsub(b, p), vsub(c, p)));
  if (va <= 0 && unom >= 0 && udenom >= 0) {
    return vadd(b, smul(unom / (unom + udenom), bc));
  }
  vb = dot(n, cross(vsub(c, p), vsub(a, p)));
  if (vb <= 0 && tnom > 0 && tdenom >= 0) {
    return vadd(a, smul(tnom / (tnom + tdenom), ac));
  }
  u = va / (va + vb + vc);
  v = vb / (va + vb + vc);
  w = 1 - u - v;
  return vadd(smul(u, a), vadd(smul(v, b), smul(w, c)));
};

exports.pointTriangleDist = function(p, v0, v1, v2) {
  var cx, cy, cz, dx, dy, dz, px, py, pz, _ref;
  _ref = exports.closestPointTriangle(p, v0, v1, v2), cx = _ref[0], cy = _ref[1], cz = _ref[2];
  px = p[0], py = p[1], pz = p[2];
  dx = cx - px;
  dy = cy - py;
  dz = cz - pz;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};
});
    
    loader.define('/windows/module.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Quad, Rendernode, Window, Windows, keys,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Quad = require('/webgl/quad');

Rendernode = require('/rendernode');

keys = require('/keys');

Window = (function() {

  function Window(index, texture, node, x, y) {
    this.index = index;
    this.texture = texture;
    this.node = node;
    this.x = x;
    this.y = y;
    this.label = this.texture.label;
    if (this.texture.diva) {
      this.diva = 1;
    } else {
      this.diva = 0;
    }
    if (this.texture.gamma === false) {
      this.gamma = 0;
    } else {
      this.gamma = 1;
    }
    if (this.texture.affine) {
      this.mul = this.texture.affine[0];
      this.add = this.texture.affine[1];
    } else {
      this.mul = 1;
      this.add = 0;
    }
  }

  Window.prototype.draw = function(xscale, yscale, one2one, cx, cy, active) {
    var h, height, max, s, w, width;
    width = this.texture.tex.width;
    height = this.texture.tex.height;
    max = Math.max(width, height);
    w = width / max;
    h = height / max;
    s = 1 / Math.max(w * xscale, h * yscale);
    w = w * (1 - one2one) + s * w * one2one;
    h = h * (1 - one2one) + s * h * one2one;
    return this.node.sampler('source', this.texture.tex).f('mixgamma', this.gamma).f('diva', this.diva).f('border_factor', active).val2('affine', this.mul, this.add).val2('size', w * xscale, h * yscale).val2('offset', (this.x - cx) * xscale, (this.y - cy) * yscale).draw();
  };

  return Window;

})();

return Windows = (function() {

  function Windows(gl, gui, textures) {
    var active, folder, gridsize, i, labels, maxx, maxy, minx, miny, texture, window, x, y, _i, _j, _len, _len1, _ref, _ref1,
      _this = this;
    this.gl = gl;
    this.textures = textures;
    this.prev = __bind(this.prev, this);

    this.next = __bind(this.next, this);

    this.guiLabelChange = __bind(this.guiLabelChange, this);

    this.labelVisibilityChange = __bind(this.labelVisibilityChange, this);

    gui.remember(this);
    this.label = $('<div id="windowlabel">test</div>').appendTo('#ui').hide();
    this.show_all = false;
    this.show_label = false;
    this.needs_clear = $.browser.mozilla;
    this.node = new Rendernode(this.gl, {
      front: true,
      program: get('window.shader'),
      drawable: quad
    });
    this.windows = [];
    this.labelmap = {};
    labels = [];
    gridsize = Math.ceil(Math.sqrt(this.textures.length));
    _ref = this.textures;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      texture = _ref[i];
      x = i % gridsize;
      y = gridsize - Math.floor(i / gridsize) - 1;
      window = new Window(i, texture, this.node, x * 2.2, y * 2.2);
      this.labelmap[window.label] = window;
      this.windows.push(window);
      labels.push(window.label);
    }
    minx = null;
    maxx = null;
    miny = null;
    maxy = null;
    _ref1 = this.windows;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      window = _ref1[_j];
      minx = minx !== null ? Math.min(window.x, minx) : window.x;
      maxx = maxx !== null ? Math.max(window.x, maxx) : window.x;
      miny = miny !== null ? Math.min(window.y, miny) : window.y;
      maxy = maxy !== null ? Math.max(window.y, maxy) : window.y;
    }
    this.cx = (minx + maxx) / 2;
    this.cy = (miny + maxy) / 2;
    this.full_scale = 1.9 / Math.min(maxx - minx + 2, maxy - miny + 2);
    this.zoom = 0.0;
    this.active = this.windows.length - 1;
    keys.press('right', this.next);
    keys.press('left', this.prev);
    keys.press('down', function() {
      var new_value;
      new_value = _this.active + gridsize;
      if (new_value < _this.windows.length) {
        _this.active = new_value;
      } else {
        _this.active = _this.active % gridsize;
      }
      return _this.setActive();
    });
    keys.press('up', function() {
      var new_value;
      new_value = _this.active - gridsize;
      if (new_value >= 0) {
        _this.active = new_value;
      } else {
        new_value = gridsize * gridsize + new_value;
        while (new_value >= _this.windows.length) {
          new_value -= gridsize;
        }
        _this.active = new_value;
      }
      return _this.setActive();
    });
    keys.press('space', function() {
      _this.show_all = !_this.show_all;
      return _this.all_ctrl.setValue(_this.show_all);
    });
    keys.press('enter', function() {
      _this.show_all = !_this.show_all;
      return _this.all_ctrl.setValue(_this.show_all);
    });
    active = this.getActive();
    this.x = active.x;
    this.y = active.y;
    folder = gui.addFolder('Views');
    this.all_ctrl = folder.add(this, 'show_all').name('Overview');
    folder.add(this, 'next').name('Next view');
    folder.add(this, 'prev').name('Prev view');
    this.window_label = active.label;
    this.guiLabel = folder.add(this, 'window_label', labels).name('View').onChange(this.guiLabelChange);
    folder.add(this, 'show_label').name('Labels').onChange(this.labelVisibilityChange);
    this.guiLabelChange();
  }

  Windows.prototype.labelVisibilityChange = function() {
    if (this.show_label) {
      return this.label.clearQueue().fadeIn();
    } else {
      return this.label.clearQueue().fadeOut();
    }
  };

  Windows.prototype.guiLabelChange = function() {
    var window;
    window = this.labelmap[this.window_label];
    this.active = window.index;
    return this.setActive();
  };

  Windows.prototype.getActive = function() {
    return this.windows[this.active];
  };

  Windows.prototype.setActive = function() {
    var text;
    text = this.getActive().label;
    this.window_label = text;
    this.guiLabel.updateDisplay();
    return this.label.text(text);
  };

  Windows.prototype.next = function() {
    this.active = (this.active + 1) % this.windows.length;
    return this.setActive();
  };

  Windows.prototype.prev = function() {
    if (this.active === 0) {
      this.active = this.windows.length - 1;
    } else {
      this.active -= 1;
    }
    return this.setActive();
  };

  Windows.prototype.step = function() {
    var active, tx, ty;
    active = this.getActive();
    tx = active.x;
    ty = active.y;
    this.x = this.x + (tx - this.x) * 0.1;
    this.y = this.y + (ty - this.y) * 0.1;
    if (this.show_all) {
      return this.zoom = this.zoom + (1 - this.zoom) * 0.1;
    } else {
      return this.zoom = this.zoom + (0 - this.zoom) * 0.1;
    }
  };

  Windows.prototype.draw = function(gamma) {
    var active, factor, height, width, window, xscale, yscale, _i, _len, _ref;
    this.step();
    if (this.needs_clear === true) {
      this.gl.clearColor(0, 0, 0, 0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    this.node.start().f('gamma', gamma);
    width = this.node.width;
    height = this.node.height;
    if (width > height) {
      xscale = height / width;
      yscale = 1;
    } else {
      xscale = 1;
      yscale = width / height;
    }
    factor = 1.0 - this.zoom + this.zoom * this.full_scale;
    xscale *= factor;
    yscale *= factor;
    active = this.getActive();
    _ref = this.windows;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      window = _ref[_i];
      if (window !== active) {
        this.drawWindow(xscale, yscale, window, 0);
      }
    }
    this.drawWindow(xscale, yscale, active, 1);
    return this.node.end();
  };

  Windows.prototype.drawWindow = function(xscale, yscale, window, active) {
    var dx, dy, l, one2one, x, y;
    dx = window.x - this.x;
    dy = window.y - this.y;
    l = Math.sqrt(dx * dx + dy * dy);
    if (l > 0) {
      one2one = Math.min(1 / (l * 2), 1);
    } else {
      one2one = 1;
    }
    x = this.x * (1 - this.zoom) + this.cx * this.zoom;
    y = this.y * (1 - this.zoom) + this.cy * this.zoom;
    active = Math.pow(one2one, 2.0) * this.zoom;
    return window.draw(xscale, yscale, one2one * (1 - this.zoom), x, y, active);
  };

  return Windows;

})();
});
    
    loader.define('/depth/module.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Blur, DeferredShadowMap, DepthRender, LightmappedShadowMap, Rendernode;

Rendernode = require('/rendernode');

Blur = require('/blur');

exports.DepthRender = DepthRender = (function() {

  function DepthRender(gl, width, height, drawable, _arg) {
    var blurred, floatExt;
    blurred = (_arg != null ? _arg : {}).blurred;
    if (blurred == null) {
      blurred = false;
    }
    floatExt = gl.getFloatExtension({
      require: ['renderable', 'filterable']
    });
    this.direct = new Rendernode(gl, {
      width: width,
      height: height,
      program: get('depth.shader'),
      drawable: drawable,
      depthBuffer: true,
      depthTest: true,
      depthWrite: true,
      filter: blurred ? 'nearest' : 'linear',
      type: floatExt.type,
      cullFace: 'BACK'
    });
    if (blurred) {
      this.blurred = new Blur(gl, {
        width: width,
        height: height,
        type: floatExt.type
      });
    }
    this.output = this.blurred ? this.blurred.output : this.direct;
  }

  DepthRender.prototype.update = function(proj, view) {
    this.direct.start().clearBoth(0, 0, 0, 1).mat4('proj', proj).mat4('view', view).f('range', 42).draw().end();
    if (this.blurred) {
      return this.blurred.update(this.direct);
    }
  };

  return DepthRender;

})();

exports.DeferredShadowMap = DeferredShadowMap = (function() {

  function DeferredShadowMap(gl, _arg) {
    var blurred, depthHeight, depthWidth, drawable;
    drawable = _arg.drawable, depthWidth = _arg.depthWidth, depthHeight = _arg.depthHeight, this.eyeNormaldepth = _arg.eyeNormaldepth, this.light = _arg.light, this.camera = _arg.camera, blurred = _arg.blurred;
    this.depth = new DepthRender(gl, depthWidth, depthHeight, drawable, {
      blurred: blurred
    });
    this.output = new Rendernode(gl, {
      program: get('deferred_shadow_map.shader'),
      drawable: quad
    });
    this.updateDepth();
  }

  DeferredShadowMap.prototype.resize = function(width, height) {
    return this.output.resize(width, height);
  };

  DeferredShadowMap.prototype.updateDepth = function() {
    return this.depth.update(this.light.proj, this.light.view);
  };

  DeferredShadowMap.prototype.updateShadow = function() {
    return this.output.start().clear(1, 0, 1).sampler('eye_normaldepth', this.eyeNormaldepth).sampler('light_depth', this.depth.output).mat4('inv_eye_proj', this.camera.inv_proj).mat4('inv_eye_view', this.camera.inv_view).mat4('light_view', this.light.view).mat4('light_proj', this.light.proj).mat3('light_rot', this.light.rot).draw().end();
  };

  return DeferredShadowMap;

})();

exports.LightmapShadowMap = LightmappedShadowMap = (function() {

  function LightmappedShadowMap(gl, _arg) {
    var blurred, depthHeight, depthWidth, drawable, lightmapSize;
    drawable = _arg.drawable, depthWidth = _arg.depthWidth, depthHeight = _arg.depthHeight, lightmapSize = _arg.lightmapSize, this.light = _arg.light, blurred = _arg.blurred;
    this.depth = new DepthRender(gl, depthWidth, depthHeight, drawable, {
      blurred: blurred
    });
    if (lightmapSize == null) {
      lightmapSize = 256;
    }
    this.output = new Rendernode(gl, {
      width: lightmapSize,
      height: lightmapSize,
      program: get('lightmap_shadow_map.shader'),
      drawable: drawable
    });
    this.update();
  }

  LightmappedShadowMap.prototype.update = function() {
    this.depth.update(this.light.proj, this.light.view);
    return this.output.start().sampler('light_depth', this.depth.output).mat4('light_view', this.light.view).mat4('light_proj', this.light.proj).mat3('light_rot', this.light.rot).draw().end();
  };

  return LightmappedShadowMap;

})();
});
    
    loader.define('/antialias/module.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var AntiAlias, Quad, Rendernode;

Rendernode = require('/rendernode');

Quad = require('/webgl/quad');

return AntiAlias = (function() {

  function AntiAlias(gl, gui, source) {
    var folder;
    this.gl = gl;
    this.source = source;
    gui.remember(this);
    this.node = new Rendernode(this.gl, {
      program: get('fxaa3_11.shader'),
      drawable: quad
    });
    this.subpixel_aa = 0.75;
    this.contrast_treshold = 0.166;
    this.edge_treshold = 0.0;
    folder = gui.addFolder('Antialias');
    folder.add(this, 'subpixel_aa', 0.0, 1.0).name('Subpixel aa');
    folder.add(this, 'contrast_treshold', 0.063, 0.333).name('Contrast Treshold');
    folder.add(this, 'edge_treshold', 0.0, 0.0833).name('Edge Treshold');
  }

  AntiAlias.prototype.apply = function() {
    return this.node.start().f('subpixel_aa', this.subpixel_aa).f('contrast_treshold', this.contrast_treshold).f('edge_treshold', this.edge_treshold).clear().sampler('source', this.source).draw().end();
  };

  AntiAlias.prototype.resize = function(width, height) {
    return this.node.resize(width, height);
  };

  return AntiAlias;

})();
});
    
    loader.define('/illumination/module.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var BounceModel, DepthRender, Illumination, LightmapShadowMap, Quad, Rendernode, Sphere, Texture2D, _ref;

Quad = require('/webgl/quad');

Sphere = require('/webgl/sphere');

Texture2D = require('/webgl/texture').Texture2D;

Rendernode = require('/rendernode');

_ref = require('/depth'), DepthRender = _ref.DepthRender, LightmapShadowMap = _ref.LightmapShadowMap;

BounceModel = require('bounce_model');

return Illumination = (function() {

  function Illumination(gl, sun, lighting, model, highresmodel, normaldepth, orientation, elevation, shconst) {
    var floatExt;
    this.gl = gl;
    this.lighting = lighting;
    this.shconst = shconst;
    this.proj = new Mat4().perspective(90, 1, 0.01, 42);
    this.view = new Mat4();
    this.mapsize = 32;
    this.probesize = 16;
    this.generateProbes();
    floatExt = this.gl.getFloatExtension({
      require: ['renderable', 'filterable']
    });
    this.debug = new Rendernode(this.gl, {
      program: get('debug.shader'),
      drawable: new Sphere(this.gl, 0.6),
      depthBuffer: true,
      depthTest: true,
      depthWrite: true,
      cullFace: 'BACK',
      type: floatExt.type
    });
    this.lightprobes = new Rendernode(this.gl, {
      width: this.probesize * 6,
      height: this.probesize * this.probes.length,
      program: get('transfer.shader'),
      drawable: quad,
      filter: 'nearest',
      type: floatExt.type
    });
    this.coefficients = new Rendernode(this.gl, {
      width: 9,
      height: this.probes.length,
      program: get('harmonics.shader'),
      drawable: quad,
      filter: 'nearest',
      type: floatExt.type
    });
    this.direct_light = new LightmapShadowMap(gl, {
      drawable: model,
      depthWidth: 128,
      depthHeight: 128,
      light: sun,
      blurred: true
    });
    this.bounce = new Rendernode(this.gl, {
      width: 256,
      height: 256,
      program: get('bounce.shader'),
      drawable: new BounceModel(this.gl, model, this.probes),
      type: floatExt.type,
      blend: 'additive'
    });
    this.renderProbes(model, highresmodel);
    this.update();
  }

  Illumination.prototype.generateProbes = function() {
    var i, _i, _j, _results;
    this.probes = [];
    for (i = _i = 0; _i < 7; i = ++_i) {
      this.probes.push({
        x: i * 4.5 - 3 * 4.5,
        y: 2.2,
        z: 0
      });
      this.probes.push({
        x: i * 4.5 - 3 * 4.5,
        y: 2.2,
        z: 5.5
      });
      this.probes.push({
        x: i * 4.5 - 3 * 4.5,
        y: 2.2,
        z: -5.5
      });
      this.probes.push({
        x: i * 4.5 - 3 * 4.5,
        y: 7.0,
        z: 0
      });
      this.probes.push({
        x: i * 4.5 - 3 * 4.5,
        y: 7.0,
        z: 5.5
      });
      this.probes.push({
        x: i * 4.5 - 3 * 4.5,
        y: 7.0,
        z: -5.5
      });
    }
    _results = [];
    for (i = _j = 1; _j < 6; i = ++_j) {
      _results.push(this.probes.push({
        x: i * 4.5 - 3 * 4.5,
        y: 12.5,
        z: 0
      }));
    }
    return _results;
  };

  Illumination.prototype.updateDirectLight = function() {
    return this.direct_light.update();
  };

  Illumination.prototype.update = function() {
    var i, _i, _ref1, _results;
    this.bounce.start().clear(0, 0, 0, 1).f('gi_gain', this.lighting.giGain).val2('coefficients_size', this.coefficients.width, this.coefficients.height).fv('shconst', this.shconst.data).end();
    this.lightprobes.start().vec3('sun_radiance', this.lighting.sun_radiance).vec3('sky_radiance', this.lighting.sky_radiance).sampler('texmap', this.texmap).sampler('diffusemap', this.diffusemap).sampler('bounce', this.bounce).sampler('lightmap', this.direct_light.output).draw().end();
    this.coefficients.start().val2('lightprobes_size', this.lightprobes.width, this.lightprobes.height).sampler('lightprobes', this.lightprobes).fv('shconst', this.shconst.data).draw().end();
    _results = [];
    for (i = _i = 0, _ref1 = this.lighting.bounces - 1; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
      this.bounce.start().clear(0, 0, 0, 0).sampler('coefficients', this.coefficients).draw().end();
      this.lightprobes.start().sampler('texmap', this.texmap).sampler('bounce', this.bounce).sampler('lightmap', this.direct_light.output).draw().end();
      _results.push(this.coefficients.start().val2('lightprobes_size', this.lightprobes.width, this.lightprobes.height).sampler('lightprobes', this.lightprobes).draw().end());
    }
    return _results;
  };

  Illumination.prototype.renderProbes = function(model, highresmodel) {
    var i, probe, _i, _j, _len, _len1, _ref1, _ref2;
    if (get.exists('texmap.png')) {
      this.texmap = new Texture2D(this.gl).bind().upload(get('texmap.png')).nearest().clampToEdge().unbind();
    } else {
      this.texmap = new Rendernode(this.gl, {
        width: this.mapsize * 6,
        height: this.mapsize * this.probes.length,
        program: get('cubeprobe.shader'),
        drawable: model,
        depthTest: true,
        depthWrite: true,
        cullFace: 'BACK',
        filter: 'nearest',
        depthBuffer: true
      });
      this.texmap.start().clear(0, 0, 1);
      this.texmap.mat4('proj', this.proj);
      _ref1 = this.probes;
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        probe = _ref1[i];
        this.renderProbe(i, this.texmap, null, probe.x, probe.y, probe.z);
      }
      this.texmap.end();
      this.texmap = this.texmap.output;
    }
    if (get.exists('diffusemap.jpg')) {
      return this.diffusemap = new Texture2D(this.gl).bind().upload(get('diffusemap.jpg')).nearest().clampToEdge().unbind();
    } else {
      this.diffusemap = new Rendernode(this.gl, {
        width: this.mapsize * 6,
        height: this.mapsize * this.probes.length,
        program: get('cube_diffuse.shader'),
        drawable: highresmodel,
        depthTest: true,
        depthWrite: true,
        cullFace: 'BACK',
        filter: 'nearest',
        depthBuffer: true
      });
      this.diffusemap.start().clear(0, 0, 0);
      this.diffusemap.mat4('proj', this.proj);
      _ref2 = this.probes;
      for (i = _j = 0, _len1 = _ref2.length; _j < _len1; i = ++_j) {
        probe = _ref2[i];
        this.renderProbe(i, this.diffusemap, 'diffuse_texture', probe.x, probe.y, probe.z);
      }
      this.diffusemap.end();
      return this.diffusemap = this.diffusemap.output;
    }
  };

  Illumination.prototype.renderProbe = function(i, node, texture_type, x, y, z) {
    var offset, s;
    s = this.mapsize;
    offset = i * s;
    this.view.identity().translateVal3(-x, -y, -z);
    node.viewport(s * 0, offset, s, s).mat4('view', this.view).drawModel(texture_type);
    this.view.identity().rotatey(180).translateVal3(-x, -y, -z);
    node.viewport(s * 1, offset, s, s).mat4('view', this.view).drawModel(texture_type);
    this.view.identity().rotatey(-90).translateVal3(-x, -y, -z);
    node.viewport(s * 2, offset, s, s).mat4('view', this.view).drawModel(texture_type);
    this.view.identity().rotatey(90).translateVal3(-x, -y, -z);
    node.viewport(s * 3, offset, s, s).mat4('view', this.view).drawModel(texture_type);
    this.view.identity().rotatex(-90).translateVal3(-x, -y, -z);
    node.viewport(s * 4, offset, s, s).mat4('view', this.view).drawModel(texture_type);
    this.view.identity().rotatex(90).translateVal3(-x, -y, -z);
    return node.viewport(s * 5, offset, s, s).mat4('view', this.view).drawModel(texture_type);
  };

  Illumination.prototype.drawDebug = function(camera, normaldepth) {
    var i, probe, _i, _len, _ref1;
    this.debug.start().clearBoth(0, 0, 0, 0).f('gi_gain', this.lighting.giGain).sampler('normaldepth', normaldepth).sampler('coefficients', this.coefficients).val2('coefficients_size', this.coefficients.width, this.coefficients.height).fv('shconst', this.shconst.data).mat4('proj', camera.proj).mat4('view', camera.view);
    _ref1 = this.probes;
    for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
      probe = _ref1[i];
      this.debug.val3('offset', probe.x, probe.y, probe.z).f('index', i).draw();
    }
    return this.debug.end();
  };

  return Illumination;

})();
});
    
    loader.define('/illumination/bounce_model.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var BounceModel, pointTriangleDist,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

pointTriangleDist = require('/dist3d').pointTriangleDist;

return BounceModel = (function(_super) {

  __extends(BounceModel, _super);

  BounceModel.prototype.attribs = ['position', 'texcoord', 'normal', 'lightprobe'];

  BounceModel.prototype.pointers = [
    {
      name: 'position',
      size: 3,
      offset: 0,
      stride: 12
    }, {
      name: 'texcoord',
      size: 2,
      offset: 3,
      stride: 12
    }, {
      name: 'normal',
      size: 3,
      offset: 5,
      stride: 12
    }, {
      name: 'lightprobe',
      size: 4,
      offset: 8,
      stride: 12
    }
  ];

  function BounceModel(gl, model, probes) {
    var btx, bty, btz, det, dist, dot1, dot2, dot3, dx1, dx2, dx3, dy1, dy2, dy3, dz1, dz2, dz3, face_count, fnx, fny, fnz, i, l, nx1, nx2, nx3, ny1, ny2, ny3, nz1, nz2, nz3, probe, px, py, pz, result, start, tx, ty, tz, u1, u2, u3, v1, v2, v3, vali, vertex_count, verti, vertices, x1, x2, x3, y1, y2, y3, z1, z2, z3, _i, _j, _len;
    this.gl = gl;
    BounceModel.__super__.constructor.call(this);
    start = gettime();
    vertices = model.vertices;
    vertex_count = vertices.length / 8;
    face_count = vertex_count / 3;
    result = [];
    for (i = _i = 0; 0 <= face_count ? _i < face_count : _i > face_count; i = 0 <= face_count ? ++_i : --_i) {
      verti = i * 3;
      vali = verti * 8;
      x1 = vertices[vali + 0];
      y1 = vertices[vali + 1];
      z1 = vertices[vali + 2];
      u1 = vertices[vali + 3];
      v1 = vertices[vali + 4];
      nx1 = vertices[vali + 5];
      ny1 = vertices[vali + 6];
      nz1 = vertices[vali + 7];
      vali = verti * 8 + 8;
      x2 = vertices[vali + 0];
      y2 = vertices[vali + 1];
      z2 = vertices[vali + 2];
      u2 = vertices[vali + 3];
      v2 = vertices[vali + 4];
      nx2 = vertices[vali + 5];
      ny2 = vertices[vali + 6];
      nz2 = vertices[vali + 7];
      vali = verti * 8 + 16;
      x3 = vertices[vali + 0];
      y3 = vertices[vali + 1];
      z3 = vertices[vali + 2];
      u3 = vertices[vali + 3];
      v3 = vertices[vali + 4];
      nx3 = vertices[vali + 5];
      ny3 = vertices[vali + 6];
      nz3 = vertices[vali + 7];
      for (i = _j = 0, _len = probes.length; _j < _len; i = ++_j) {
        probe = probes[i];
        px = probe.x;
        py = probe.y;
        pz = probe.z;
        dx1 = px - x1;
        dy1 = py - y1;
        dz1 = pz - z1;
        l = Math.sqrt(dx1 * dx1 + dy1 * dy1 + dz1 * dz1);
        dx1 /= l;
        dy1 /= l;
        dz1 /= l;
        dot1 = dx1 * nx1 + dy1 * ny1 + dz1 * nz1;
        dx2 = px - x2;
        dy2 = py - y2;
        dz2 = pz - z2;
        l = Math.sqrt(dx2 * dx2 + dy2 * dy2 + dz2 * dz2);
        dx2 /= l;
        dy2 /= l;
        dz2 /= l;
        dot2 = dx2 * nx2 + dy2 * ny2 + dz2 * nz2;
        dx3 = px - x3;
        dy3 = py - y3;
        dz3 = pz - z3;
        l = Math.sqrt(dx3 * dx3 + dy3 * dy3 + dz3 * dz3);
        dx3 /= l;
        dy3 /= l;
        dz3 /= l;
        dot3 = dx3 * nx3 + dy3 * ny3 + dz3 * nz3;
        tx = x2 - x1;
        ty = y2 - y1;
        tz = z2 - z1;
        btx = x3 - x1;
        bty = y3 - y1;
        btz = z3 - z1;
        fnx = ty * btz - tz * bty;
        fny = tz * btx - tx * btz;
        fnz = tx * bty - ty * btx;
        l = Math.sqrt(fnx * fnx + fny * fny + fnz * fnz);
        fnx /= l;
        fny /= l;
        fnz /= l;
        det = fnx * x1 + fny * y1 + fnz * z1;
        dist = Math.abs((fnx * px + fny * py + fnz * pz) - det);
        if ((dot1 >= 0 || dot2 >= 0 || dot3 >= 0) && dist <= 5.0) {
          if (pointTriangleDist([px, py, pz], [x1, y1, z1], [x2, y2, z2], [x3, y3, z3]) <= 5.0) {
            result.push(x1, y1, z1, u1, v1, nx1, ny1, nz1, px, py, pz, i, x2, y2, z2, u2, v2, nx2, ny2, nz2, px, py, pz, i, x3, y3, z3, u3, v3, nx3, ny3, nz3, px, py, pz, i);
          }
        }
      }
    }
    this.size = result.length / 12;
    this.uploadList(result);
  }

  return BounceModel;

})(require('/webgl/drawable'));
});
    
    loader.define('/ssao/module.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Blur, Rendernode, SSAO;

Rendernode = require('/rendernode');

Blur = require('/blur');

return SSAO = (function() {

  function SSAO(gl, normaldepth) {
    var floatExt;
    this.normaldepth = normaldepth;
    floatExt = gl.getFloatExtension({
      require: ['renderable', 'filterable']
    });
    this.moments = new Rendernode(gl, {
      program: get('moments.shader'),
      type: floatExt.type,
      drawable: quad
    });
    this.blur = new Blur(gl, {
      type: floatExt.type
    });
    this.output = new Rendernode(gl, {
      program: get('ssao.shader'),
      drawable: quad
    });
  }

  SSAO.prototype.update = function() {
    this.moments.start().sampler('normaldepth', this.normaldepth).f('range', 42).clear().draw().end();
    this.blur.update(this.moments);
    return this.output.start().sampler('normaldepth', this.normaldepth).sampler('momentsmap', this.blur.output).f('range', 42).clear().draw().end();
  };

  SSAO.prototype.resize = function(width, height) {
    this.moments.resize(width / 2, height / 2);
    this.blur.resize(width / 4, height / 4);
    return this.output.resize(width, height);
  };

  return SSAO;

})();
});
    
    loader.define('/blur/module.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Blur, Rendernode;

Rendernode = require('/rendernode');

return Blur = (function() {

  function Blur(gl, _arg) {
    var filter, height, type, width;
    width = _arg.width, height = _arg.height, type = _arg.type, filter = _arg.filter;
    if (type == null) {
      type = gl.UNSIGNED_BYTE;
    }
    if (filter == null) {
      filter = 'linear';
    }
    this.output = new Rendernode(gl, {
      width: width,
      height: height,
      program: get('blur.shader'),
      drawable: quad,
      filter: filter,
      type: type
    });
  }

  Blur.prototype.update = function(source) {
    return this.output.start().sampler('source', source).draw().end();
  };

  Blur.prototype.resize = function(width, height) {
    return this.output.resize(width, height);
  };

  return Blur;

})();
});
    
    loader.define('/model/module.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var LowresModel, Materials, Model, Texture2D,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Texture2D = require('/webgl/texture').Texture2D;

Materials = Materials = (function() {

  Materials.prototype.createTexture = function(path) {
    var image, texture;
    texture = this.texture_cache[path];
    if (!texture) {
      image = get(path);
      texture = new Texture2D(this.gl).bind().upload(image).mipmap().repeat().unbind();
      this.texture_cache[path] = texture;
    }
    return texture;
  };

  function Materials(gl) {
    var definition, diffuse, jpgbump, luma, pngbump, specular, _i, _len, _ref;
    this.gl = gl;
    this.texture_cache = {};
    this.definitions = get('materials.json');
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
    _ref = this.definitions;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      definition = _ref[_i];
      diffuse = "diffuse/" + definition.diffuse_texture;
      jpgbump = "bump/" + definition.bumpmap;
      pngbump = jpgbump.replace('.jpg', '.png');
      definition.diffuse_texture = this.createTexture(diffuse);
      specular = definition.specular_color;
      luma = (specular.r + specular.g + specular.b) / 3;
      definition.specularity = luma * definition.specularity;
      if (get.exists(pngbump)) {
        definition.bumpmap = this.createTexture(pngbump);
      } else if (get.exists(jpgbump)) {
        definition.bumpmap = this.createTexture(jpgbump);
      } else {
        definition.bumpmap = definition.diffuse_texture;
      }
    }
    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, false);
    this.diffuse_texture = this.sortById('diffuse_texture');
    this.bumpmap = this.sortById('bumpmap');
  }

  Materials.prototype.sortById = function(type) {
    var definition, result;
    result = (function() {
      var _i, _len, _ref, _results;
      _ref = this.definitions;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        definition = _ref[_i];
        _results.push(definition);
      }
      return _results;
    }).call(this);
    result.sort(function(a, b) {
      return a[type].id - b[type].id;
    });
    return result;
  };

  return Materials;

})();

exports.LowresModel = LowresModel = (function(_super) {

  __extends(LowresModel, _super);

  LowresModel.prototype.attribs = ['position', 'texcoord', 'normal'];

  LowresModel.prototype.pointers = [
    {
      name: 'position',
      size: 3,
      offset: 0,
      stride: 8
    }, {
      name: 'texcoord',
      size: 2,
      offset: 3,
      stride: 8
    }, {
      name: 'normal',
      size: 3,
      offset: 5,
      stride: 8
    }
  ];

  function LowresModel(gl) {
    this.gl = gl;
    LowresModel.__super__.constructor.call(this);
    this.vertices = new Float32Array(get('lowres.vertices'));
    this.size = this.vertices.length / 8;
    this.upload(this.vertices);
  }

  return LowresModel;

})(require('/webgl/drawable'));

exports.Model = Model = (function(_super) {

  __extends(Model, _super);

  Model.prototype.attribs = ['position', 'texcoord', 'normal'];

  Model.prototype.pointers = [
    {
      name: 'position',
      size: 3,
      offset: 0,
      stride: 8
    }, {
      name: 'texcoord',
      size: 2,
      offset: 3,
      stride: 8
    }, {
      name: 'normal',
      size: 3,
      offset: 5,
      stride: 8
    }
  ];

  function Model(gl) {
    var buffer, indices, vertices;
    this.gl = gl;
    Model.__super__.constructor.call(this);
    this.materials = new Materials(this.gl);
    indices = new Uint16Array(get('sponza.indices'));
    vertices = new Float32Array(get('sponza.vertices'));
    this.size = indices.length;
    this.max_angle = Math.cos(Math.PI * 2 * (43 / 360));
    this.computeVertexFaces(indices, vertices);
    this.computeFaceNormals(indices, vertices);
    buffer = this.calculateVertices(indices, vertices);
    this.upload(buffer);
  }

  Model.prototype.computeVertexFaces = function(indices, vertices) {
    var c1, c2, c3, count, counts, end, face_count, face_index, idx1, idx2, idx3, index, iv, max, start, vertex_count, vertex_faces, _i, _j, _k, _len, _len1;
    start = gettime();
    vertex_count = vertices.length / 5;
    counts = new Uint8Array(vertex_count);
    for (_i = 0, _len = indices.length; _i < _len; _i++) {
      index = indices[_i];
      counts[index] += 1;
    }
    max = 0;
    for (_j = 0, _len1 = counts.length; _j < _len1; _j++) {
      count = counts[_j];
      if (count > max) {
        max = count;
      }
    }
    this.max_count = max;
    vertex_faces = new Uint32Array(max * vertex_count);
    counts = new Uint8Array(vertex_count);
    face_count = indices.length / 3;
    for (face_index = _k = 0; 0 <= face_count ? _k < face_count : _k > face_count; face_index = 0 <= face_count ? ++_k : --_k) {
      iv = face_index * 3;
      idx1 = indices[iv];
      idx2 = indices[iv + 1];
      idx3 = indices[iv + 2];
      c1 = counts[idx1]++;
      c2 = counts[idx2]++;
      c3 = counts[idx3]++;
      vertex_faces[idx1 * max + c1] = face_index;
      vertex_faces[idx2 * max + c2] = face_index;
      vertex_faces[idx3 * max + c3] = face_index;
    }
    end = gettime();
    this.vertex_face_count = counts;
    return this.vertex_faces = vertex_faces;
  };

  Model.prototype.computeFaceNormals = function(indices, vertices) {
    var btx, bty, btz, end, face_count, i, i1, i2, i3, iv, l, normals, nx, ny, nz, start, tx, ty, tz, x1, x2, x3, y1, y2, y3, z1, z2, z3, _i;
    start = gettime();
    face_count = indices.length / 3;
    normals = new Float32Array(face_count * 3);
    for (i = _i = 0; 0 <= face_count ? _i < face_count : _i > face_count; i = 0 <= face_count ? ++_i : --_i) {
      iv = i * 3;
      i1 = indices[iv];
      i2 = indices[iv + 1];
      i3 = indices[iv + 2];
      x1 = vertices[i1 * 5];
      y1 = vertices[i1 * 5 + 1];
      z1 = vertices[i1 * 5 + 2];
      x2 = vertices[i2 * 5];
      y2 = vertices[i2 * 5 + 1];
      z2 = vertices[i2 * 5 + 2];
      x3 = vertices[i3 * 5];
      y3 = vertices[i3 * 5 + 1];
      z3 = vertices[i3 * 5 + 2];
      tx = x2 - x1;
      ty = y2 - y1;
      tz = z2 - z1;
      btx = x3 - x1;
      bty = y3 - y1;
      btz = z3 - z1;
      nx = ty * btz - tz * bty;
      ny = tz * btx - tx * btz;
      nz = tx * bty - ty * btx;
      l = Math.sqrt(nx * nx + ny * ny + nz * nz);
      nx /= l;
      ny /= l;
      nz /= l;
      normals[iv + 0] = nx;
      normals[iv + 1] = ny;
      normals[iv + 2] = nz;
    }
    this.normals = normals;
    return end = gettime();
  };

  Model.prototype.getNormal = function(face_index, vertex_index) {
    var c, cos, l, nx, ny, nz, rx, ry, rz, vfidx, x, y, z, _i, _ref;
    rx = this.normals[face_index * 3 + 0];
    ry = this.normals[face_index * 3 + 1];
    rz = this.normals[face_index * 3 + 2];
    nx = 0;
    ny = 0;
    nz = 0;
    for (c = _i = 0, _ref = this.vertex_face_count[vertex_index]; 0 <= _ref ? _i < _ref : _i > _ref; c = 0 <= _ref ? ++_i : --_i) {
      vfidx = this.vertex_faces[vertex_index * this.max_count + c];
      x = this.normals[vfidx * 3 + 0];
      y = this.normals[vfidx * 3 + 1];
      z = this.normals[vfidx * 3 + 2];
      cos = rx * x + ry * y + rz * z;
      if (cos > this.max_angle) {
        nx = x;
        ny = y;
        nz = z;
      }
    }
    l = Math.sqrt(nx * nx + ny * ny + nz * nz);
    return [nx / l, ny / l, nz / l];
  };

  Model.prototype.calculateVertices = function(indices, vertices, normals) {
    var end, i, i1, i2, i3, iv, nx, ny, nz, result, start, u1, u2, u3, v1, v2, v3, x1, x2, x3, y1, y2, y3, z1, z2, z3, _i, _ref, _ref1, _ref2, _ref3;
    start = gettime();
    result = new Float32Array(indices.length * 8);
    for (i = _i = 0, _ref = indices.length / 3; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      iv = i * 3;
      i1 = indices[iv];
      i2 = indices[iv + 1];
      i3 = indices[iv + 2];
      x1 = vertices[i1 * 5];
      y1 = vertices[i1 * 5 + 1];
      z1 = vertices[i1 * 5 + 2];
      u1 = vertices[i1 * 5 + 3];
      v1 = vertices[i1 * 5 + 4];
      x2 = vertices[i2 * 5];
      y2 = vertices[i2 * 5 + 1];
      z2 = vertices[i2 * 5 + 2];
      u2 = vertices[i2 * 5 + 3];
      v2 = vertices[i2 * 5 + 4];
      x3 = vertices[i3 * 5];
      y3 = vertices[i3 * 5 + 1];
      z3 = vertices[i3 * 5 + 2];
      u3 = vertices[i3 * 5 + 3];
      v3 = vertices[i3 * 5 + 4];
      _ref1 = this.getNormal(i, i1), nx = _ref1[0], ny = _ref1[1], nz = _ref1[2];
      result[(iv + 0) * 8 + 0] = x1;
      result[(iv + 0) * 8 + 1] = y1;
      result[(iv + 0) * 8 + 2] = z1;
      result[(iv + 0) * 8 + 3] = u1;
      result[(iv + 0) * 8 + 4] = v1;
      result[(iv + 0) * 8 + 5] = nx;
      result[(iv + 0) * 8 + 6] = ny;
      result[(iv + 0) * 8 + 7] = nz;
      _ref2 = this.getNormal(i, i2), nx = _ref2[0], ny = _ref2[1], nz = _ref2[2];
      result[(iv + 1) * 8 + 0] = x2;
      result[(iv + 1) * 8 + 1] = y2;
      result[(iv + 1) * 8 + 2] = z2;
      result[(iv + 1) * 8 + 3] = u2;
      result[(iv + 1) * 8 + 4] = v2;
      result[(iv + 1) * 8 + 5] = nx;
      result[(iv + 1) * 8 + 6] = ny;
      result[(iv + 1) * 8 + 7] = nz;
      _ref3 = this.getNormal(i, i3), nx = _ref3[0], ny = _ref3[1], nz = _ref3[2];
      result[(iv + 2) * 8 + 0] = x3;
      result[(iv + 2) * 8 + 1] = y3;
      result[(iv + 2) * 8 + 2] = z3;
      result[(iv + 2) * 8 + 3] = u3;
      result[(iv + 2) * 8 + 4] = v3;
      result[(iv + 2) * 8 + 5] = nx;
      result[(iv + 2) * 8 + 6] = ny;
      result[(iv + 2) * 8 + 7] = nz;
    }
    end = gettime();
    return result;
  };

  'draw: (shader) ->\n    if shader then @setPointersForShader shader\n    for material in @materials\n        #@gl.drawArrays @mode, @first, @size\n        @gl.drawArrays @mode, material.start, material.size\n    if shader then @disableAttribs shader\n    return @';


  return Model;

})(require('/webgl/drawable'));
});
    
    loader.define('/webgl-nuke-vendor-prefix.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var getExtension, getSupportedExtensions, vendorRe, vendors,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

if (window.WebGLRenderingContext != null) {
  vendors = ['WEBKIT', 'MOZ', 'MS', 'O'];
  vendorRe = /^WEBKIT_(.*)|MOZ_(.*)|MS_(.*)|O_(.*)/;
  getExtension = WebGLRenderingContext.prototype.getExtension;
  WebGLRenderingContext.prototype.getExtension = function(name) {
    var extobj, match, vendor, _i, _len;
    match = name.match(vendorRe);
    if (match !== null) {
      name = match[1];
    }
    extobj = getExtension.call(this, name);
    if (extobj === null) {
      for (_i = 0, _len = vendors.length; _i < _len; _i++) {
        vendor = vendors[_i];
        extobj = getExtension.call(this, vendor + '_' + name);
        if (extobj !== null) {
          return extobj;
        }
      }
      return null;
    } else {
      return extobj;
    }
  };
  getSupportedExtensions = WebGLRenderingContext.prototype.getSupportedExtensions;
  WebGLRenderingContext.prototype.getSupportedExtensions = function() {
    var extension, match, result, supported, _i, _len;
    supported = getSupportedExtensions.call(this);
    result = [];
    for (_i = 0, _len = supported.length; _i < _len; _i++) {
      extension = supported[_i];
      match = extension.match(vendorRe);
      if (match !== null) {
        extension = match[1];
      }
      if (__indexOf.call(result, extension) < 0) {
        result.push(extension);
      }
    }
    return result;
  };
}
});
    
    loader.define('/loading.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var bar, container, hidden, label, loading, makeBar, ui;

ui = $('#ui');

hidden = true;

container = $('<div></div>').css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: 200,
  height: 40,
  marginLeft: -100,
  marginTop: -20
});

label = $('<div></div>').appendTo(container).css({
  position: 'absolute',
  top: 0,
  left: 0,
  width: 200,
  height: 20,
  textAlign: 'center',
  color: 'white'
});

loading = $('<div></div>').appendTo(container).css({
  position: 'absolute',
  top: 20,
  left: 0,
  width: 200,
  height: 20,
  border: '1px solid white'
});

bar = null;

makeBar = function() {
  loading.empty();
  return bar = $('<div></div>').appendTo(loading).css({
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 20,
    backgroundColor: 'white',
    '-webkit-transition': 'width 0.7s'
  });
};

exports.show = function(text) {
  label.text(text);
  makeBar();
  return container.fadeIn('slow').appendTo(ui);
};

exports.hide = function() {
  return container.fadeOut('slow', function() {
    return container.detach();
  });
};

exports.progress = function(factor) {
  return bar.width(factor * 200);
};
});
    
    loader.define('/geometry.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3

exports.AABB = (function() {

  function AABB(xmin, xmax, ymin, ymax, zmin, zmax) {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
    this.zmin = zmin;
    this.zmax = zmax;
  }

  AABB.prototype.ray_intersect = function(ray) {
    var d, inv_x, inv_y, inv_z, o, tmax, tmin, ymax, ymin, zmax, zmin, _ref, _ref1, _ref2;
    o = ray.origin;
    d = ray.direction;
    inv_x = 1.0 / d.x;
    tmin = (this.xmin - o.x) * inv_x;
    tmax = (this.xmax - o.x) * inv_x;
    if (inv_x < 0) {
      _ref = [tmax, tmin], tmin = _ref[0], tmax = _ref[1];
    }
    inv_y = 1.0 / d.y;
    ymin = (this.ymin - o.y) * inv_y;
    ymax = (this.ymax - o.y) * inv_y;
    if (inv_y < 0) {
      _ref1 = [ymax, ymin], ymin = _ref1[0], ymax = _ref1[1];
    }
    if (tmin > ymax || ymin > tmax) {
      return null;
    }
    if (ymin > tmin) {
      tmin = ymin;
    }
    if (ymax < tmax) {
      tmax = ymax;
    }
    inv_z = 1.0 / d.z;
    zmin = (this.zmin - o.z) * inv_z;
    zmax = (this.zmax - o.z) * inv_z;
    if (inv_z < 0) {
      _ref2 = [zmax, zmin], zmin = _ref2[0], zmax = _ref2[1];
    }
    if (tmin > zmax || zmin > tmax) {
      return null;
    }
    if (zmin > tmin) {
      tmin = zmin;
    }
    if (zmax < tmax) {
      tmax = zmax;
    }
    return [tmin, tmax];
  };

  return AABB;

})();

exports.Ray = (function() {

  function Ray(origin, direction) {
    var _ref, _ref1;
    this.origin = origin;
    this.direction = direction;
    if ((_ref = this.origin) == null) {
      this.origin = new Vec4();
    }
    if ((_ref1 = this.direction) == null) {
      this.direction = new Vec4();
    }
  }

  Ray.prototype.interpolate = function(interval, vector) {
    var d, o, v;
    if (vector == null) {
      vector = new Vec4();
    }
    o = this.origin;
    d = this.direction;
    v = vector;
    v.x = o.x + d.x * interval;
    v.y = o.y + d.y * interval;
    v.z = o.z + d.z * interval;
    v.w = o.w + d.w * interval;
    return vector;
  };

  Ray.prototype.ray_nearest = function(ray) {
    var U, V, W, a, b, c, d, det, e, s, t;
    W = this.origin.sub(ray.origin, new Vec4);
    U = this.direction;
    V = ray.direction;
    a = U.dot(U);
    b = U.dot(V);
    c = V.dot(V);
    d = U.dot(W);
    e = V.dot(W);
    det = a * c - b * b;
    if (det === 0) {
      return null;
    }
    s = (b * e - c * d) / det;
    t = (a * e - b * d) / det;
    return [s, t];
  };

  Ray.prototype.point_distance = function(point) {
    var W, s;
    W = point.sub(this.origin, new Vec4);
    s = W.dot(this.direction) / this.direction.dot(this.direction);
    W.x -= this.direction.x * s;
    W.y -= this.direction.y * s;
    W.z -= this.direction.z * s;
    return Math.sqrt(W.dot(W));
  };

  return Ray;

})();

exports.get_mouseray = function(x, y, inv_proj, inv_view, ray) {
  if (ray == null) {
    ray = new exports.Ray;
  }
  inv_proj.mulVal4(x, y, -1, 1, ray.direction);
  inv_view.mulVec3(ray.direction);
  ray.direction.w = 0;
  inv_view.mulVal4(0, 0, 0, 1, ray.origin);
  return ray;
};
});
    
    loader.define('/keys.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var key_handlers, keymap, keys;

keymap = {
  87: 'w',
  65: 'a',
  83: 's',
  68: 'd',
  81: 'q',
  69: 'e',
  37: 'left',
  39: 'right',
  38: 'up',
  40: 'down',
  13: 'enter',
  27: 'esc',
  32: 'space',
  8: 'backspace',
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  91: 'start',
  0: 'altc',
  20: 'caps',
  9: 'tab',
  49: 'key1',
  50: 'key2',
  51: 'key3',
  52: 'key4'
};

key_handlers = {};

keys = {
  press: function(name, callback) {
    var handlers;
    handlers = key_handlers[name] = key_handlers[name] || [];
    return handlers.push(callback);
  }
};

$(document).keydown(function(event) {
  var handler, handlers, name, _i, _len, _results;
  if (event.target === document.body) {
    name = keymap[event.which];
    keys[name] = true;
    handlers = key_handlers[name];
    if (handlers) {
      _results = [];
      for (_i = 0, _len = handlers.length; _i < _len; _i++) {
        handler = handlers[_i];
        _results.push(handler());
      }
      return _results;
    }
  }
});

$(document).keyup(function(event) {
  var name;
  name = keymap[event.which];
  return keys[name] = false;
});

return keys;
});
    
    loader.define('/camera.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Camera, FlyCam, GameCam, MouseDrag, Orbit, keys,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

keys = require('keys');

MouseDrag = (function() {

  function MouseDrag(which) {
    var _this = this;
    this.which = which;
    this.x = 0;
    this.y = 0;
    this.lx = 0;
    this.ly = 0;
    this.pressed = false;
    if (navigator.appVersion.indexOf('Mac') !== -1) {
      $('#ui').bind('mousewheel', function(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        event.stopPropagation();
        _this.x += event.originalEvent.wheelDeltaX * 0.25;
        _this.y += event.originalEvent.wheelDeltaY * 0.25;
        return false;
      });
    }
    $('#ui').mousedown(function(event) {
      if (event.which === _this.which) {
        _this.lx = event.pageX;
        _this.ly = event.pageY;
        _this.pressed = true;
      }
      return void 0;
    });
    $(document).mouseup(function() {
      _this.pressed = false;
      return void 0;
    });
    $(document).mousemove(function(event) {
      var x, y;
      if (_this.pressed && event.which === _this.which) {
        x = event.pageX;
        y = event.pageY;
        _this.x += x - _this.lx;
        _this.y += y - _this.ly;
        _this.lx = x;
        _this.ly = y;
        return false;
      }
      return void 0;
    });
  }

  MouseDrag.prototype.reset = function() {
    this.x = 0;
    return this.y = 0;
  };

  return MouseDrag;

})();

Camera = (function() {

  function Camera(delta, near, far) {
    this.delta = delta != null ? delta : 1 / 180;
    this.near = near != null ? near : 0.1;
    this.far = far != null ? far : 1000;
    this.last_gui_update = gettime();
    this.time = gettime();
    this.proj = new Mat4();
    this.inv_proj = new Mat4();
    this.view = new Mat4();
    this.inv_view = new Mat4();
    this.rot = new Mat3();
    this.inv_rot = new Mat3();
    this.acc = new Vec3();
  }

  Camera.prototype.aspect = function(width, height) {
    this.proj.perspective(75, width / height, this.near, this.far);
    return this.inv_proj.inversePerspective(75, width / height, this.near, this.far);
  };

  Camera.prototype.step = function() {
    this.accelerate();
    this.limit();
    this.move();
    this.limit();
    return this.time += this.delta;
  };

  Camera.prototype.update = function() {
    var now;
    now = gettime();
    if (now - this.last_gui_update > 0.5) {
      this.guiUpdate();
      this.last_gui_update = now;
    }
    if (now - this.time > this.delta * 30) {
      this.time = now - this.delta * 30;
    }
    while (this.time < now) {
      this.step();
    }
    this.finish();
    this.view.invert(this.inv_view.identity());
    this.view.toMat3(this.rot.identity());
    return this.inv_view.toMat3(this.inv_rot.identity());
  };

  Camera.prototype.limit = function() {};

  Camera.prototype.guiUpdate = function() {};

  return Camera;

})();

exports.GameCam = GameCam = (function(_super) {

  __extends(GameCam, _super);

  function GameCam(_arg) {
    var delta, x, y, z, _ref, _ref1, _ref2,
      _this = this;
    _ref = _arg != null ? _arg : {}, this.sl = _ref.sl, this.sr = _ref.sr, delta = _ref.delta, x = _ref.x, y = _ref.y, z = _ref.z;
    GameCam.__super__.constructor.call(this, delta);
    this.realpos = new Vec4();
    if ((_ref1 = this.sl) == null) {
      this.sl = 200;
    }
    if ((_ref2 = this.sr) == null) {
      this.sr = 100;
    }
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (z == null) {
      z = 0;
    }
    this.mouse = new MouseDrag(3);
    this.target_height = 0;
    this.height = 0;
    this.x = x;
    this.lx = x;
    this.z = z;
    this.lz = z;
    this.o = 0;
    this.lo = 0;
    this.d = 0;
    this.ld = 0;
    this.ad = 0;
    $(document).bind('mousewheel', function(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      event.stopPropagation();
      _this.ad -= event.originalEvent.wheelDeltaY;
      return false;
    });
  }

  GameCam.prototype.accelerate = function() {
    var ax, az, ctrl_x, ctrl_y, ctrl_z, move, sl, sr;
    sl = this.delta * this.delta * this.sl;
    sr = this.delta * this.delta * this.sr;
    ctrl_x = keys.a ? -1 : keys.d ? 1 : 0;
    ctrl_y = keys.q ? -1 : keys.e ? 1 : 0;
    ctrl_z = keys.w ? -1 : keys.s ? 1 : 0;
    ax = ctrl_x * sl;
    az = ctrl_z * sl;
    this.rot.identity().rotatey(-this.o).mulVal3(ax, 0, az, this.acc);
    this.x += this.acc.x;
    this.z += this.acc.z;
    this.o += this.mouse.x * sr;
    this.d += this.ad * this.delta * this.delta * 20;
    move = this.delta * this.delta * 4000;
    if (move > 1) {
      move = 1;
    }
    return this.height = this.height + (this.target_height - this.height) * move;
  };

  GameCam.prototype.move = function() {
    var d, o, retl, retr, x, z;
    retl = 0.97;
    retr = 0.94;
    x = this.x + (this.x - this.lx) * retl;
    z = this.z + (this.z - this.lz) * retl;
    d = this.d + (this.d - this.ld) * retl;
    o = this.o + (this.o - this.lo) * retr;
    this.lx = this.x;
    this.x = x;
    this.lz = this.z;
    this.z = z;
    this.lo = this.o;
    this.o = o;
    this.ld = this.d;
    return this.d = d;
  };

  GameCam.prototype.limit = function() {
    var high, low;
    if (this.d < 0) {
      this.d = 0;
    } else if (this.d > 30) {
      this.d = 30;
    }
    high = 128 + 64;
    low = 128 - 64;
    if (this.x < low) {
      this.x = low;
    } else if (this.x > high) {
      this.x = high;
    }
    if (this.z < low) {
      return this.z = low;
    } else if (this.z > high) {
      return this.z = high;
    }
  };

  GameCam.prototype.finish = function() {
    this.mouse.reset();
    this.ad = 0;
    return this.view.identity().translateVal3(0, 0, -this.d - 5).rotatex(25 + (this.d / 30) * 40).rotatey(this.o).translateVal3(-this.x, -this.height, -this.z);
  };

  GameCam.prototype.update = function(picker) {
    var diff, h1, h2, real_height;
    this.view.identity().translateVal3(0, 0, -this.d - 5).rotatex(25 + (this.d / 30) * 40).rotatey(this.o).translateVal3(-this.x, 0, -this.z);
    this.view.invert(this.inv_view.identity());
    h1 = picker.getHeight(this.x, this.z);
    this.inv_view.mulVal4(0, 0, 0, 1, this.realpos);
    h2 = picker.getHeight(this.realpos.x, this.realpos.z) + 2;
    real_height = h1 + this.realpos.y;
    if (real_height < h2) {
      diff = h2 - real_height;
      this.target_height = h1 + diff;
    } else {
      this.target_height = h1;
    }
    return GameCam.__super__.update.call(this);
  };

  return GameCam;

})(Camera);

exports.Orbit = Orbit = (function(_super) {

  __extends(Orbit, _super);

  function Orbit(_arg) {
    var delta, x, y, z, _ref, _ref1, _ref2;
    _ref = _arg != null ? _arg : {}, this.sr = _ref.sr, delta = _ref.delta, x = _ref.x, y = _ref.y, z = _ref.z, this.dist = _ref.dist;
    Orbit.__super__.constructor.call(this, delta);
    if ((_ref1 = this.sr) == null) {
      this.sr = 100;
    }
    if ((_ref2 = this.dist) == null) {
      this.dist = 0.6;
    }
    this.mouse = new MouseDrag(1);
    this.o = 0;
    this.lo = 0;
    this.p = 0;
    this.lp = 0;
  }

  Orbit.prototype.accelerate = function() {
    var sr;
    sr = this.delta * this.delta * this.sr;
    this.o += this.mouse.x * sr;
    return this.p += this.mouse.y * sr;
  };

  Orbit.prototype.move = function() {
    var o, p, retr;
    retr = 0.94;
    o = this.o + (this.o - this.lo) * retr;
    p = this.p + (this.p - this.lp) * retr;
    this.lo = this.o;
    this.o = o;
    this.lp = this.p;
    return this.p = p;
  };

  Orbit.prototype.finish = function() {
    return this.mouse.reset();
  };

  Orbit.prototype.update = function() {
    this.view.identity().translateVal3(0, 0, -this.dist).rotatex(this.p).rotatey(this.o);
    this.view.invert(this.inv_view.identity());
    return Orbit.__super__.update.call(this);
  };

  return Orbit;

})(Camera);

exports.FlyCam = FlyCam = (function(_super) {

  __extends(FlyCam, _super);

  function FlyCam(_arg) {
    var delta, far, folder, lookbutton, near, o, p, x, y, z, _ref, _ref1, _ref2;
    _ref = _arg != null ? _arg : {}, this.sl = _ref.sl, this.gui = _ref.gui, this.sr = _ref.sr, delta = _ref.delta, near = _ref.near, far = _ref.far, lookbutton = _ref.lookbutton, x = _ref.x, y = _ref.y, z = _ref.z, o = _ref.o, p = _ref.p;
    this.guiChanged = __bind(this.guiChanged, this);

    FlyCam.__super__.constructor.call(this, delta, near, far);
    if ((_ref1 = this.sl) == null) {
      this.sl = 50;
    }
    if ((_ref2 = this.sr) == null) {
      this.sr = 100;
    }
    if (lookbutton == null) {
      lookbutton = 1;
    }
    if (x == null) {
      x = 0;
    }
    if (y == null) {
      y = 0;
    }
    if (z == null) {
      z = 0;
    }
    if (o == null) {
      o = 0;
    }
    if (p == null) {
      p = 0;
    }
    this.mouse = new MouseDrag(lookbutton);
    this.x = x;
    this.lx = x;
    this.y = y;
    this.ly = y;
    this.z = z;
    this.lz = z;
    this.o = o;
    this.lo = o;
    this.p = p;
    this.lp = p;
    folder = this.gui.addFolder('Camera');
    this.gui.remember(this);
    this.xgui = folder.add(this, 'x', -30.0, 30.0).onChange(this.guiChanged);
    this.ygui = folder.add(this, 'y', -30.0, 30.0).onChange(this.guiChanged);
    this.zgui = folder.add(this, 'z', -30.0, 30.0).onChange(this.guiChanged);
    this.go = this.o;
    this.ogui = folder.add(this, 'go', 0.0, 360.0).name('Orientation').onChange(this.guiChanged);
    this.pgui = folder.add(this, 'p', -80.0, 80.0).name('Pitch').onChange(this.guiChanged);
    this.guiChanged();
  }

  FlyCam.prototype.guiChanged = function() {
    this.lx = this.x;
    this.ly = this.y;
    this.lz = this.z;
    this.o = this.go;
    this.lo = this.go;
    return this.lp = this.p;
  };

  FlyCam.prototype.guiUpdate = function() {
    this.go = this.o % 360;
    this.xgui.updateDisplay();
    this.ygui.updateDisplay();
    this.zgui.updateDisplay();
    this.ogui.updateDisplay();
    return this.pgui.updateDisplay();
  };

  FlyCam.prototype.accelerate = function() {
    var ax, ay, az, ctrl_x, ctrl_y, ctrl_z, sl, sr;
    sl = this.delta * this.delta * this.sl;
    sr = this.delta * this.delta * this.sr;
    ctrl_x = keys.a ? -1 : keys.d ? 1 : 0;
    ctrl_y = keys.q ? -1 : keys.e ? 1 : 0;
    ctrl_z = keys.w ? -1 : keys.s ? 1 : 0;
    ax = ctrl_x * sl;
    ay = ctrl_y * sl;
    az = ctrl_z * sl;
    this.rot.identity().rotatey(-this.o).rotatex(-this.p).mulVal3(ax, ay, az, this.acc);
    this.x += this.acc.x;
    this.y += this.acc.y;
    this.z += this.acc.z;
    this.o += this.mouse.x * sr;
    return this.p += this.mouse.y * sr;
  };

  FlyCam.prototype.move = function() {
    var o, p, retl, retr, x, y, z;
    retl = 0.97;
    retr = 0.94;
    x = this.x + (this.x - this.lx) * retl;
    y = this.y + (this.y - this.ly) * retl;
    z = this.z + (this.z - this.lz) * retl;
    o = this.o + (this.o - this.lo) * retr;
    p = this.p + (this.p - this.lp) * retr;
    if (p > 80) {
      p = 80;
    } else if (p < -80) {
      p = -80;
    }
    this.lx = this.x;
    this.x = x;
    this.ly = this.y;
    this.y = y;
    this.lz = this.z;
    this.z = z;
    this.lo = this.o;
    this.o = o;
    this.lp = this.p;
    return this.p = p;
  };

  FlyCam.prototype.finish = function() {
    this.mouse.reset();
    return this.view.identity().rotatex(this.p).rotatey(this.o).translateVal3(-this.x, -this.y, -this.z);
  };

  return FlyCam;

})(Camera);
});
    
    loader.define('/webgl-texture-float-extension-shims.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var checkColorBuffer, checkFloatLinear, checkSupport, checkTexture, createSourceCanvas, getExtension, getSupportedExtensions, name, shimExtensions, shimLookup, unshimExtensions, unshimLookup, _i, _len,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

createSourceCanvas = function() {
  var canvas, ctx, imageData;
  canvas = document.createElement('canvas');
  canvas.width = 2;
  canvas.height = 2;
  ctx = canvas.getContext('2d');
  imageData = ctx.getImageData(0, 0, 2, 2);
  imageData.data.set(new Uint8ClampedArray([0, 0, 0, 0, 255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255]));
  ctx.putImageData(imageData, 0, 0);
  return canvas;
};

createSourceCanvas();

checkFloatLinear = function(gl, sourceType) {
  var buffer, cleanup, fragmentShader, framebuffer, positionLoc, program, readBuffer, result, source, sourceCanvas, sourceLoc, target, vertexShader, vertices;
  program = gl.createProgram();
  vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.attachShader(program, vertexShader);
  gl.shaderSource(vertexShader, 'attribute vec2 position;\nvoid main(){\n    gl_Position = vec4(position, 0.0, 1.0);\n}');
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(vertexShader);
  }
  fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.attachShader(program, fragmentShader);
  gl.shaderSource(fragmentShader, 'uniform sampler2D source;\nvoid main(){\n    gl_FragColor = texture2D(source, vec2(1.0, 1.0));\n}');
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(fragmentShader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw gl.getProgramInfoLog(program);
  }
  gl.useProgram(program);
  cleanup = function() {
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    gl.deleteProgram(program);
    gl.deleteBuffer(buffer);
    gl.deleteTexture(source);
    gl.deleteTexture(target);
    gl.deleteFramebuffer(framebuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.useProgram(null);
    gl.bindTexture(gl.TEXTURE_2D, null);
    return gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  };
  target = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, target);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target, 0);
  sourceCanvas = createSourceCanvas();
  source = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, source);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, sourceType, sourceCanvas);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  vertices = new Float32Array([1, 1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1]);
  buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  positionLoc = gl.getAttribLocation(program, 'position');
  sourceLoc = gl.getUniformLocation(program, 'source');
  gl.enableVertexAttribArray(positionLoc);
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
  gl.uniform1i(sourceLoc, 0);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  readBuffer = new Uint8Array(4 * 4);
  gl.readPixels(0, 0, 2, 2, gl.RGBA, gl.UNSIGNED_BYTE, readBuffer);
  result = Math.abs(readBuffer[0] - 127) < 10;
  cleanup();
  return result;
};

checkTexture = function(gl, targetType) {
  var target;
  target = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, target);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, targetType, null);
  if (gl.getError() === 0) {
    gl.deleteTexture(target);
    return true;
  } else {
    gl.deleteTexture(target);
    return false;
  }
};

checkColorBuffer = function(gl, targetType) {
  var check, framebuffer, target;
  target = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, target);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, targetType, null);
  framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target, 0);
  check = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  gl.deleteTexture(target);
  gl.deleteFramebuffer(framebuffer);
  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  if (check === gl.FRAMEBUFFER_COMPLETE) {
    return true;
  } else {
    return false;
  }
};

shimExtensions = [];

shimLookup = {};

unshimExtensions = [];

checkSupport = function() {
  var canvas, extobj, gl, halfFloatExt, halfFloatTexturing, singleFloatExt, singleFloatTexturing;
  canvas = document.createElement('canvas');
  gl = null;
  try {
    gl = canvas.getContext('experimental-webgl');
    if (gl === null) {
      gl = canvas.getContext('webgl');
    }
  } catch (_error) {}
  if (gl != null) {
    singleFloatExt = gl.getExtension('OES_texture_float');
    if (singleFloatExt === null) {
      if (checkTexture(gl, gl.FLOAT)) {
        singleFloatTexturing = true;
        shimExtensions.push('OES_texture_float');
        shimLookup.OES_texture_float = {
          shim: true
        };
      } else {
        singleFloatTexturing = false;
        unshimExtensions.push('OES_texture_float');
      }
    } else {
      if (checkTexture(gl, gl.FLOAT)) {
        singleFloatTexturing = true;
        shimExtensions.push('OES_texture_float');
      } else {
        singleFloatTexturing = false;
        unshimExtensions.push('OES_texture_float');
      }
    }
    if (singleFloatTexturing) {
      extobj = gl.getExtension('WEBGL_color_buffer_float');
      if (extobj === null) {
        if (checkColorBuffer(gl, gl.FLOAT)) {
          shimExtensions.push('WEBGL_color_buffer_float');
          shimLookup.WEBGL_color_buffer_float = {
            shim: true,
            RGBA32F_EXT: 0x8814,
            RGB32F_EXT: 0x8815,
            FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: 0x8211,
            UNSIGNED_NORMALIZED_EXT: 0x8C17
          };
        } else {
          unshimExtensions.push('WEBGL_color_buffer_float');
        }
      } else {
        if (checkColorBuffer(gl, gl.FLOAT)) {
          shimExtensions.push('WEBGL_color_buffer_float');
        } else {
          unshimExtensions.push('WEBGL_color_buffer_float');
        }
      }
      extobj = gl.getExtension('OES_texture_float_linear');
      if (extobj === null) {
        if (checkFloatLinear(gl, gl.FLOAT)) {
          shimExtensions.push('OES_texture_float_linear');
          shimLookup.OES_texture_float_linear = {
            shim: true
          };
        } else {
          unshimExtensions.push('OES_texture_float_linear');
        }
      } else {
        if (checkFloatLinear(gl, gl.FLOAT)) {
          shimExtensions.push('OES_texture_float_linear');
        } else {
          unshimExtensions.push('OES_texture_float_linear');
        }
      }
    }
    halfFloatExt = gl.getExtension('OES_texture_half_float');
    if (halfFloatExt === null) {
      if (checkTexture(gl, 0x8D61)) {
        halfFloatTexturing = true;
        shimExtensions.push('OES_texture_half_float');
        halfFloatExt = shimLookup.OES_texture_half_float = {
          HALF_FLOAT_OES: 0x8D61,
          shim: true
        };
      } else {
        halfFloatTexturing = false;
        unshimExtensions.push('OES_texture_half_float');
      }
    } else {
      if (checkTexture(gl, halfFloatExt.HALF_FLOAT_OES)) {
        halfFloatTexturing = true;
        shimExtensions.push('OES_texture_half_float');
      } else {
        halfFloatTexturing = false;
        unshimExtensions.push('OES_texture_half_float');
      }
    }
    if (halfFloatTexturing) {
      extobj = gl.getExtension('EXT_color_buffer_half_float');
      if (extobj === null) {
        if (checkColorBuffer(gl, halfFloatExt.HALF_FLOAT_OES)) {
          shimExtensions.push('EXT_color_buffer_half_float');
          shimLookup.EXT_color_buffer_half_float = {
            shim: true,
            RGBA16F_EXT: 0x881A,
            RGB16F_EXT: 0x881B,
            FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE_EXT: 0x8211,
            UNSIGNED_NORMALIZED_EXT: 0x8C17
          };
        } else {
          unshimExtensions.push('EXT_color_buffer_half_float');
        }
      } else {
        if (checkColorBuffer(gl, halfFloatExt.HALF_FLOAT_OES)) {
          shimExtensions.push('EXT_color_buffer_half_float');
        } else {
          unshimExtensions.push('EXT_color_buffer_half_float');
        }
      }
      extobj = gl.getExtension('OES_texture_half_float_linear');
      if (extobj === null) {
        if (checkFloatLinear(gl, halfFloatExt.HALF_FLOAT_OES)) {
          shimExtensions.push('OES_texture_half_float_linear');
          return shimLookup.OES_texture_half_float_linear = {
            shim: true
          };
        } else {
          return unshimExtensions.push('OES_texture_half_float_linear');
        }
      } else {
        if (checkFloatLinear(gl, halfFloatExt.HALF_FLOAT_OES)) {
          return shimExtensions.push('OES_texture_half_float_linear');
        } else {
          return unshimExtensions.push('OES_texture_half_float_linear');
        }
      }
    }
  }
};

if (window.WebGLRenderingContext != null) {
  checkSupport();
  unshimLookup = {};
  for (_i = 0, _len = unshimExtensions.length; _i < _len; _i++) {
    name = unshimExtensions[_i];
    unshimLookup[name] = true;
  }
  getExtension = WebGLRenderingContext.prototype.getExtension;
  WebGLRenderingContext.prototype.getExtension = function(name) {
    var extobj;
    extobj = shimLookup[name];
    if (extobj === void 0) {
      if (unshimLookup[name]) {
        return null;
      } else {
        return getExtension.call(this, name);
      }
    } else {
      return extobj;
    }
  };
  getSupportedExtensions = WebGLRenderingContext.prototype.getSupportedExtensions;
  WebGLRenderingContext.prototype.getSupportedExtensions = function() {
    var extension, result, supported, _j, _k, _len1, _len2;
    supported = getSupportedExtensions.call(this);
    result = [];
    for (_j = 0, _len1 = supported.length; _j < _len1; _j++) {
      extension = supported[_j];
      if (unshimLookup[extension] === void 0) {
        result.push(extension);
      }
    }
    for (_k = 0, _len2 = shimExtensions.length; _k < _len2; _k++) {
      extension = shimExtensions[_k];
      if (__indexOf.call(result, extension) < 0) {
        result.push(extension);
      }
    }
    return result;
  };
  WebGLRenderingContext.prototype.getFloatExtension = function(spec) {
    var candidate, candidates, half, halfFramebuffer, halfLinear, halfTexture, i, importance, preference, result, single, singleFramebuffer, singleLinear, singleTexture, use, _j, _k, _l, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
    if ((_ref = spec.prefer) == null) {
      spec.prefer = ['half'];
    }
    if ((_ref1 = spec.require) == null) {
      spec.require = [];
    }
    if ((_ref2 = spec.throws) == null) {
      spec.throws = true;
    }
    singleTexture = this.getExtension('OES_texture_float');
    halfTexture = this.getExtension('OES_texture_half_float');
    singleFramebuffer = this.getExtension('WEBGL_color_buffer_float');
    halfFramebuffer = this.getExtension('EXT_color_buffer_half_float');
    singleLinear = this.getExtension('OES_texture_float_linear');
    halfLinear = this.getExtension('OES_texture_half_float_linear');
    single = {
      texture: singleTexture !== null,
      filterable: singleLinear !== null,
      renderable: singleFramebuffer !== null,
      score: 0,
      precision: 'single',
      half: false,
      single: true,
      type: this.FLOAT
    };
    half = {
      texture: halfTexture !== null,
      filterable: halfLinear !== null,
      renderable: halfFramebuffer !== null,
      score: 0,
      precision: 'half',
      half: true,
      single: false,
      type: (_ref3 = halfTexture != null ? halfTexture.HALF_FLOAT_OES : void 0) != null ? _ref3 : null
    };
    candidates = [];
    if (single.texture) {
      candidates.push(single);
    }
    if (half.texture) {
      candidates.push(half);
    }
    result = [];
    for (_j = 0, _len1 = candidates.length; _j < _len1; _j++) {
      candidate = candidates[_j];
      use = true;
      _ref4 = spec.require;
      for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
        name = _ref4[_k];
        if (candidate[name] === false) {
          use = false;
        }
      }
      if (use) {
        result.push(candidate);
      }
    }
    for (_l = 0, _len3 = result.length; _l < _len3; _l++) {
      candidate = result[_l];
      _ref5 = spec.prefer;
      for (i = _m = 0, _len4 = _ref5.length; _m < _len4; i = ++_m) {
        preference = _ref5[i];
        importance = Math.pow(2, spec.prefer.length - i - 1);
        if (candidate[preference]) {
          candidate.score += importance;
        }
      }
    }
    result.sort(function(a, b) {
      if (a.score === b.score) {
        return 0;
      } else if (a.score < b.score) {
        return 1;
      } else if (a.score > b.score) {
        return -1;
      }
    });
    if (result.length === 0) {
      if (throws) {
        throw 'No floating point texture support that is ' + spec.require.join(', ');
      } else {
        return null;
      }
    } else {
      result = result[0];
      return {
        filterable: result.filterable,
        renderable: result.renderable,
        type: result.type,
        precision: result.precision
      };
    }
  };
}
});
    
    loader.define('/audio.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Backend, HTMLAudio, WebAudio, backend,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Backend = (function() {

  function Backend() {
    this.loading = 0;
    this.handlers = [];
  }

  Backend.prototype.loaded = function() {
    var handler, _i, _len, _ref;
    if (this.loading === 0) {
      _ref = this.handlers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        handler = _ref[_i];
        if (handler.event === 'loaded') {
          handler.callback.apply(handler);
        }
      }
    }
  };

  Backend.prototype.bind = function(event, callback) {
    var handler;
    handler = {
      event: event,
      callback: callback
    };
    this.handlers.push(handler);
    return handler;
  };

  Backend.prototype.unbind = function(handler) {
    var index;
    index = this.handlers.indexOf(handler);
    if (index >= 0) {
      return this.handlers.splice(index, 1);
    }
  };

  return Backend;

})();

HTMLAudio = (function(_super) {
  var Sample, Voice;

  __extends(HTMLAudio, _super);

  HTMLAudio.available = (window.Audio !== void 0) && (window.URL !== void 0) && (window.BlobBuilder !== void 0);

  Sample = (function() {

    function Sample(backend, data) {
      this.backend = backend;
      this.backend.loading += 1;
      this.url = blob.pack(data, 'audio/ogg');
    }

    Sample.prototype.play = function(looping) {
      var voice;
      voice = this.backend.getFree();
      if (voice) {
        return voice.play(this.url, looping);
      }
    };

    return Sample;

  })();

  Voice = (function() {

    function Voice(backend, id) {
      var self;
      this.id = id;
      self = this;
      this.audio = new Audio();
      this.audio.onended = function() {
        return backend.ended(self);
      };
    }

    Voice.prototype.play = function(url) {
      this.audio.src = url;
      return this.audio.play();
    };

    return Voice;

  })();

  function HTMLAudio() {
    this.check = __bind(this.check, this);

    var id, _i;
    this.free = {};
    this.playing = {};
    for (id = _i = 0; _i < 20; id = ++_i) {
      this.free[id] = new Voice(this, id);
    }
    setInterval(this.check, 100);
  }

  HTMLAudio.prototype.check = function() {};

  HTMLAudio.prototype.getFree = function() {
    var id, voice, _ref;
    _ref = this.free;
    for (id in _ref) {
      voice = _ref[id];
      delete this.free[id];
      this.playing[id] = voice;
      return voice;
    }
  };

  HTMLAudio.prototype.ended = function(voice) {
    this.free[voice.id] = voice;
    return delete this.playing[voice.id];
  };

  HTMLAudio.prototype.createSample = function(data) {
    this.start_time = gettime();
    return new Sample(this, data);
  };

  return HTMLAudio;

})(Backend);

WebAudio = (function(_super) {

  __extends(WebAudio, _super);

  WebAudio.available = window.webkitAudioContext !== void 0;

  function WebAudio() {
    WebAudio.__super__.constructor.call(this);
    this.ctx = new webkitAudioContext();
  }

  WebAudio.prototype.play = function(buffer, looping) {
    var source;
    if (looping == null) {
      looping = false;
    }
    source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = looping;
    source.connect(this.ctx.destination);
    return source.noteOn(this.ctx.currentTime);
  };

  WebAudio.prototype.decode = function(data, callback) {
    return this.ctx.decodeAudioData(data, function(buffer) {
      return callback(buffer);
    });
  };

  return WebAudio;

})(Backend);

if (WebAudio.available) {
  backend = new WebAudio();
  exports.decode = function(data, callback) {
    return backend.decode(data, callback);
  };
  exports.play = function(buffer) {
    return backend.play(buffer);
  };
} else {
  exports.decode = function(data, callback) {};
  exports.play = function(buffer) {};
}
});
    
    loader.define('/events.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Emitter;

return Emitter = (function() {

  function Emitter() {
    this.handlers = {};
  }

  Emitter.prototype.on = function(name, callback) {
    var handlers;
    handlers = this.handlers[name];
    if (handlers === void 0) {
      handlers = this.handlers[name] = [];
    }
    handlers.push(callback);
    return this;
  };

  Emitter.prototype.trigger = function(name, a1, a2, a3, a4, a5, a6) {
    var handler, handlers, _i, _len;
    handlers = this.handlers[name];
    if (handlers !== void 0) {
      for (_i = 0, _len = handlers.length; _i < _len; _i++) {
        handler = handlers[_i];
        handler(a1, a2, a3, a4, a5, a6);
      }
    }
    return this;
  };

  return Emitter;

})();
});
    
    loader.define('/rendernode.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Cubemap, Depthbuffer, Framebuffer, Quad, Rendernode, State, Texture2D, default_state, _ref, _ref1;

_ref = require('webgl/framebuffer'), Framebuffer = _ref.Framebuffer, Depthbuffer = _ref.Depthbuffer;

_ref1 = require('webgl/texture'), Texture2D = _ref1.Texture2D, Cubemap = _ref1.Cubemap;

Quad = require('webgl/quad');

State = (function() {

  function State(gl) {
    this.gl = gl;
    this.depthTest = false;
    this.depthWrite = false;
    this.cullFace = null;
    this.alphaToCoverage = false;
    this.blend = false;
  }

  State.prototype.setDefaults = function() {
    this.gl.disable(this.gl.DEPTH_TEST);
    this.gl.depthMask(false);
    this.gl.cullFace(this.gl.BACK);
    this.gl.disable(this.gl.CULL_FACE);
    this.gl.disable(this.gl.SAMPLE_ALPHA_TO_COVERAGE);
    this.gl.disable(this.gl.BLEND);
    return this;
  };

  State.prototype.set = function() {
    var mode;
    if (this.depthTest) {
      this.gl.enable(this.gl.DEPTH_TEST);
      mode = this.gl[this.depthTest];
      if (mode) {
        this.gl.depthFunc(mode);
      } else {
        this.gl.depthFunc(this.gl.LEQUAL);
      }
    }
    if (this.depthWrite) {
      this.gl.depthMask(true);
    }
    if (this.cullFace) {
      this.gl.enable(this.gl.CULL_FACE);
      this.gl.cullFace(this.gl[this.cullFace]);
    }
    if (this.blend) {
      this.gl.enable(this.gl.BLEND);
      if (this.blend === 'additive') {
        this.gl.blendFunc(this.gl.ONE, this.gl.ONE);
      }
    }
    if (this.alphaToCoverage) {
      this.gl.enable(this.gl.SAMPLE_ALPHA_TO_COVERAGE);
    }
    return this;
  };

  State.prototype.revert = function() {
    if (this.depthTest) {
      this.gl.disable(this.gl.DEPTH_TEST);
      this.gl.depthFunc(this.gl.LESS);
    }
    if (this.depthWrite) {
      this.gl.depthMask(false);
    }
    if (this.cullFace) {
      this.gl.disable(this.gl.CULL_FACE);
    }
    if (this.blend) {
      this.gl.disable(this.gl.BLEND);
    }
    if (this.alphaToCoverage) {
      this.gl.disable(this.gl.SAMPLE_ALPHA_TO_COVERAGE);
    }
    return this;
  };

  return State;

})();

default_state = null;

return Rendernode = (function() {

  Rendernode.stateDefaults = function(gl) {
    return default_state = new State(gl).setDefaults();
  };

  function Rendernode(gl, _arg) {
    var blend, cullFace, depthTest, depthWrite, _ref2, _ref3;
    this.gl = gl;
    this.width = _arg.width, this.height = _arg.height, this.program = _arg.program, this.drawable = _arg.drawable, this.type = _arg.type, this.front = _arg.front, depthTest = _arg.depthTest, depthWrite = _arg.depthWrite, cullFace = _arg.cullFace, this.depthBuffer = _arg.depthBuffer, blend = _arg.blend, this.filter = _arg.filter, this.channels = _arg.channels, this.format = _arg.format, this.hdrClear = _arg.hdrClear;
    this.xoff = 0;
    this.yoff = 0;
    this.state = new State(this.gl);
    this.texunit_counter = 0;
    this.texunits = {};
    if ((_ref2 = this.type) == null) {
      this.type = this.gl.UNSIGNED_BYTE;
    }
    if ((_ref3 = this.front) == null) {
      this.front = false;
    }
    if (depthTest == null) {
      depthTest = false;
    }
    this.depthTest(depthTest);
    if (depthWrite == null) {
      depthWrite = false;
    }
    this.depthWrite(depthWrite);
    if (cullFace == null) {
      cullFace = null;
    }
    this.cullFace(cullFace);
    if (blend == null) {
      blend = false;
    }
    this.state.blend = blend;
    if (!this.front) {
      this.createBuffers();
    }
    if (this.hdrClear) {
      this.clearShader = get('hdr_clear.shader');
    }
  }

  Rendernode.prototype.createBuffers = function() {
    this.output = new Texture2D(this.gl, {
      channels: this.channels,
      format: this.format,
      type: this.type
    }).bind().clampToEdge();
    if (this.filter === 'nearest') {
      this.output.nearest();
    } else {
      this.output.linear();
    }
    if (this.width && this.height) {
      this.output.setSize(this.width, this.height);
    } else {
      this.output.setSize(16, 16);
    }
    this.output.unbind();
    this.fbo = new Framebuffer(this.gl).bind().color(this.output).unbind();
    if (this.depthBuffer) {
      return this.addDepth();
    }
  };

  Rendernode.prototype.addDepth = function(buffer) {
    if (buffer == null) {
      buffer = this.depthBuffer;
    }
    if (!this.depth && !this.front) {
      if (buffer instanceof Depthbuffer) {
        this.depth = buffer;
      } else {
        this.depth = new Depthbuffer(this.gl).setSize(this.output.width, this.output.height);
      }
      this.fbo.bind().depth(this.depth).unbind();
    }
    return this;
  };

  Rendernode.prototype.cullFace = function(side) {
    if (side == null) {
      side = null;
    }
    this.state.cullFace = side;
    return this;
  };

  Rendernode.prototype.depthWrite = function(enabled) {
    if (enabled == null) {
      enabled = false;
    }
    this.state.depthWrite = enabled;
    return this;
  };

  Rendernode.prototype.depthTest = function(enabled) {
    if (enabled == null) {
      enabled = false;
    }
    this.state.depthTest = enabled;
    return this;
  };

  Rendernode.prototype.alphaToCoverage = function(enabled) {
    if (enabled == null) {
      enabled = false;
    }
    this.state.alphaToCoverage = enabled;
    return this;
  };

  Rendernode.prototype.blendAdditive = function() {
    this.state.blend = 'additive';
    return this;
  };

  Rendernode.prototype.filterNearest = function() {
    this.output.bind().nearest().unbind();
    return this;
  };

  Rendernode.prototype.start = function() {
    this.started = true;
    this.viewport();
    this.state.set();
    if (this.program) {
      this.program.use();
    }
    if (!this.front) {
      this.fbo.bind();
    }
    if (this.drawable) {
      this.setPointers(this.drawable);
    }
    return this;
  };

  Rendernode.prototype.setPointers = function(drawable) {
    if (drawable !== this.current_drawable) {
      this.current_drawable = drawable;
      return drawable.setPointersForShader(this.program);
    }
  };

  Rendernode.prototype.end = function() {
    this.started = false;
    this.current_drawable = null;
    this.state.revert();
    if (!this.front) {
      this.fbo.unbind();
    }
    return this;
  };

  Rendernode.prototype.sampler = function(name, source) {
    var texture, unit;
    if (source.output) {
      texture = source.output;
    } else {
      texture = source;
    }
    unit = this.texunits[name];
    if (unit === void 0) {
      unit = this.texunits[name] = this.texunit_counter++;
    }
    texture.bind(unit);
    this.program.i(name, unit);
    return this;
  };

  Rendernode.prototype.mat4 = function(name, value) {
    this.program.mat4(name, value);
    return this;
  };

  Rendernode.prototype.mat3 = function(name, value) {
    this.program.mat3(name, value);
    return this;
  };

  Rendernode.prototype.val3 = function(name, x, y, z) {
    this.program.val3(name, x, y, z);
    return this;
  };

  Rendernode.prototype.vec3 = function(name, value) {
    this.program.vec3(name, value);
    return this;
  };

  Rendernode.prototype.f = function(name, value) {
    this.program.f(name, value);
    return this;
  };

  Rendernode.prototype.fv = function(name, values) {
    this.program.fv(name, values);
    return this;
  };

  Rendernode.prototype.val2 = function(name, x, y) {
    this.program.val2(name, x, y);
    return this;
  };

  Rendernode.prototype.clear = function(r, g, b, a) {
    if (r == null) {
      r = 0;
    }
    if (g == null) {
      g = 0;
    }
    if (b == null) {
      b = 0;
    }
    if (a == null) {
      a = 1;
    }
    if (this.hdrClear) {
      if (!this.front) {
        this.fbo.bind();
      }
      this.clearShader.use().val4('clear_color', r, g, b, a).draw(quad);
    } else {
      this.gl.clearColor(r, g, b, a);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    }
    return this;
  };

  Rendernode.prototype.clearBoth = function(r, g, b, a, depth) {
    if (r == null) {
      r = 0;
    }
    if (g == null) {
      g = 0;
    }
    if (b == null) {
      b = 0;
    }
    if (a == null) {
      a = 1;
    }
    if (depth == null) {
      depth = 1;
    }
    this.gl.clearColor(r, g, b, a);
    this.gl.clearDepth(depth);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    return this;
  };

  Rendernode.prototype.clearDepth = function(depth) {
    if (depth == null) {
      depth = 1;
    }
    this.gl.clearDepth(depth);
    this.gl.clear(this.gl.DEPTH_BUFFER_BIT);
    return this;
  };

  Rendernode.prototype.draw = function(drawable) {
    var do_end;
    if (drawable == null) {
      drawable = this.drawable;
    }
    do_end = false;
    if (!this.started) {
      do_end = true;
      this.start();
    }
    this.program.val2('viewport', this.width, this.height);
    if (drawable !== this.current_drawable) {
      this.setPointers(drawable);
    }
    drawable.draw();
    if (do_end) {
      this.end();
    }
    return this;
  };

  Rendernode.prototype.drawModel = function(texture_type, sampler_name) {
    var c, material, _i, _len, _ref2;
    if (sampler_name == null) {
      sampler_name = texture_type;
    }
    if (texture_type) {
      _ref2 = this.drawable.materials[texture_type];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        material = _ref2[_i];
        this.f('specularity', material.specularity);
        c = material.diffuse_color;
        this.val3('diffuse_color', c.r, c.g, c.b);
        this.sampler(sampler_name, material[texture_type]);
        this.drawable.drawRange(material.start, material.size);
      }
    } else {
      this.draw();
    }
    return this;
  };

  Rendernode.prototype.resize = function(width, height) {
    this.width = Math.floor(width);
    this.height = Math.floor(height);
    if (this.output) {
      this.output.bind().setSize(this.width, this.height).unbind();
    }
    if (this.depth) {
      this.depth.setSize(this.width, this.height);
    }
    if (this.fbo) {
      return this.fbo.bind().check().unbind();
    }
  };

  Rendernode.prototype.viewport = function(x, y, width, height) {
    if (x == null) {
      x = this.xoff;
    }
    if (y == null) {
      y = this.yoff;
    }
    if (width == null) {
      width = this.width;
    }
    if (height == null) {
      height = this.height;
    }
    if (width && height) {
      this.xoff = x;
      this.yoff = y;
      this.width = width;
      this.height = height;
      if (this.started) {
        this.gl.viewport(x, y, width, height);
      }
      return this;
    }
  };

  Rendernode.prototype.bind = function(unit) {
    if (unit == null) {
      unit = 0;
    }
    return this.output.bind(unit);
  };

  return Rendernode;

})();
});
    
    loader.define('/schedule.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3

exports.run = function(callback) {
  var last, step;
  last = gettime();
  step = function() {
    var current, delta;
    current = gettime();
    delta = current - last;
    last = current;
    callback(current, delta);
    return requestAnimationFrame(step);
  };
  return requestAnimationFrame(step);
};
});
    
    loader.define('/webgl/plane.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Plane,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

return Plane = (function(_super) {

  __extends(Plane, _super);

  Plane.prototype.attribs = ['position', 'normal', 'texcoord'];

  function Plane(gl, s) {
    var vertices;
    this.gl = gl;
    if (s == null) {
      s = 1;
    }
    Plane.__super__.constructor.call(this);
    this.size = 6;
    vertices = [-s, 0, -s, 0, 1, 0, 0, 0, -s, 0, s, 0, 1, 0, 0, 1, s, 0, s, 0, 1, 0, 1, 1, s, 0, -s, 0, 1, 0, 1, 0, -s, 0, -s, 0, 1, 0, 0, 0, s, 0, s, 0, 1, 0, 1, 1];
    this.uploadList(vertices);
  }

  Plane.prototype.setPointersForShader = function(shader) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.setPointer(shader, 'position', 3, 0, 8);
    this.setPointer(shader, 'normal', 3, 3, 8);
    this.setPointer(shader, 'texcoord', 2, 6, 8);
    return this;
  };

  return Plane;

})(require('drawable'));
});
    
    loader.define('/webgl/model.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Model,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

return Model = (function(_super) {

  __extends(Model, _super);

  Model.prototype.attribs = ['position', 'normal', 'texcoord'];

  function Model(gl, data) {
    this.gl = gl;
    Model.__super__.constructor.call(this);
    this.size = data.byteLength / (8 * Float32Array.BYTES_PER_ELEMENT);
    this.upload(data);
  }

  Model.prototype.setPointersForShader = function(shader) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.setPointer(shader, 'position', 3, 0, 8);
    this.setPointer(shader, 'normal', 3, 3, 8);
    this.setPointer(shader, 'texcoord', 2, 6, 8);
    return this;
  };

  return Model;

})(require('drawable'));
});
    
    loader.define('/webgl/cube.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Cube,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

return Cube = (function(_super) {

  __extends(Cube, _super);

  Cube.prototype.attribs = ['position', 'normal', 'barycentric'];

  Cube.prototype.pointers = [
    {
      name: 'position',
      size: 3,
      offset: 0,
      stride: 9
    }, {
      name: 'normal',
      size: 3,
      offset: 3,
      stride: 9
    }, {
      name: 'barycentric',
      size: 3,
      offset: 6,
      stride: 9
    }
  ];

  function Cube(gl, s) {
    var vertices;
    this.gl = gl;
    if (s == null) {
      s = 1;
    }
    Cube.__super__.constructor.call(this);
    this.size = 6 * 6;
    vertices = [-s, -s, -s, 0, 0, -1, 1, 0, 0, -s, s, -s, 0, 0, -1, 0, 1, 0, s, s, -s, 0, 0, -1, 0, 0, 1, s, -s, -s, 0, 0, -1, 1, 0, 0, -s, -s, -s, 0, 0, -1, 0, 1, 0, s, s, -s, 0, 0, -1, 0, 0, 1, s, s, s, 0, 0, 1, 1, 0, 0, -s, s, s, 0, 0, 1, 0, 1, 0, -s, -s, s, 0, 0, 1, 0, 0, 1, s, s, s, 0, 0, 1, 1, 0, 0, -s, -s, s, 0, 0, 1, 0, 1, 0, s, -s, s, 0, 0, 1, 0, 0, 1, -s, s, -s, 0, 1, 0, 1, 0, 0, -s, s, s, 0, 1, 0, 0, 1, 0, s, s, s, 0, 1, 0, 0, 0, 1, s, s, -s, 0, 1, 0, 1, 0, 0, -s, s, -s, 0, 1, 0, 0, 1, 0, s, s, s, 0, 1, 0, 0, 0, 1, s, -s, s, 0, -1, 0, 1, 0, 0, -s, -s, s, 0, -1, 0, 0, 1, 0, -s, -s, -s, 0, -1, 0, 0, 0, 1, s, -s, s, 0, -1, 0, 1, 0, 0, -s, -s, -s, 0, -1, 0, 0, 1, 0, s, -s, -s, 0, -1, 0, 0, 0, 1, -s, -s, -s, -1, 0, 0, 1, 0, 0, -s, -s, s, -1, 0, 0, 0, 1, 0, -s, s, s, -1, 0, 0, 0, 0, 1, -s, s, -s, -1, 0, 0, 1, 0, 0, -s, -s, -s, -1, 0, 0, 0, 1, 0, -s, s, s, -1, 0, 0, 0, 0, 1, s, s, s, 1, 0, 0, 1, 0, 0, s, -s, s, 1, 0, 0, 0, 1, 0, s, -s, -s, 1, 0, 0, 0, 0, 1, s, s, s, 1, 0, 0, 1, 0, 0, s, -s, -s, 1, 0, 0, 0, 1, 0, s, s, -s, 1, 0, 0, 0, 0, 1];
    this.uploadList(vertices);
  }

  return Cube;

})(require('drawable'));
});
    
    loader.define('/webgl/framebuffer.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Framebuffer, Renderbuffer, framebufferBinding,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

framebufferBinding = null;

exports.Framebuffer = Framebuffer = (function() {

  function Framebuffer(gl) {
    this.gl = gl;
    this.buffer = this.gl.createFramebuffer();
  }

  Framebuffer.prototype.bind = function() {
    if (framebufferBinding !== this) {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffer);
      framebufferBinding = this;
    }
    return this;
  };

  Framebuffer.prototype.unbind = function() {
    if (framebufferBinding !== null) {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      framebufferBinding = null;
    }
    return this;
  };

  Framebuffer.prototype.check = function() {
    var result;
    result = this.gl.checkFramebufferStatus(this.gl.FRAMEBUFFER);
    switch (result) {
      case this.gl.FRAMEBUFFER_UNSUPPORTED:
        throw 'Framebuffer is unsupported';
        break;
      case this.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
        throw 'Framebuffer incomplete attachment';
        break;
      case this.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
        throw 'Framebuffer incomplete dimensions';
        break;
      case this.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
        throw 'Framebuffer incomplete missing attachment';
    }
    return this;
  };

  Framebuffer.prototype.color = function(texture, target) {
    if (target == null) {
      target = texture.target;
    }
    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, target, texture.handle, 0);
    this.check();
    return this;
  };

  Framebuffer.prototype.depth = function(buffer) {
    this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, buffer.id);
    this.check();
    return this;
  };

  Framebuffer.prototype.destroy = function() {
    return this.gl.deleteFramebuffer(this.buffer);
  };

  return Framebuffer;

})();

Renderbuffer = (function() {

  function Renderbuffer(gl) {
    this.gl = gl;
    this.id = this.gl.createRenderbuffer();
  }

  Renderbuffer.prototype.bind = function() {
    this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.id);
    return this;
  };

  Renderbuffer.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
    this.bind();
    this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl[this.format], this.width, this.height);
    return this.unbind();
  };

  Renderbuffer.prototype.unbind = function() {
    this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
    return this;
  };

  return Renderbuffer;

})();

exports.Depthbuffer = (function(_super) {

  __extends(_Class, _super);

  function _Class() {
    return _Class.__super__.constructor.apply(this, arguments);
  }

  _Class.prototype.format = 'DEPTH_COMPONENT16';

  return _Class;

})(Renderbuffer);
});
    
    loader.define('/webgl/quad.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Quad,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

return Quad = (function(_super) {

  __extends(Quad, _super);

  Quad.prototype.attribs = ['position'];

  Quad.prototype.pointers = [
    {
      name: 'position',
      size: 2,
      offset: 0,
      stride: 2
    }
  ];

  function Quad(gl) {
    var vertices;
    this.gl = gl;
    Quad.__super__.constructor.call(this);
    this.size = 6;
    vertices = [-1, -1, 1, -1, 1, 1, -1, -1, 1, 1, -1, 1];
    this.uploadList(vertices);
  }

  return Quad;

})(require('drawable'));
});
    
    loader.define('/webgl/hexgrid.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Hexgrid, clamp,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

clamp = function(value, left, right) {
  if (value < left) {
    return left;
  } else if (value > right) {
    return right;
  } else {
    return value;
  }
};

return Hexgrid = (function(_super) {

  __extends(Hexgrid, _super);

  Hexgrid.prototype.attribs = ['position', 'texcoord', 'barycentric'];

  function Hexgrid(gl, xsize, ysize, width, height) {
    var b, m, t, vertices, x, x1, x2, x3, x4, y, _i, _j;
    this.gl = gl;
    if (xsize == null) {
      xsize = 16;
    }
    if (ysize == null) {
      ysize = 16;
    }
    if (width == null) {
      width = 1;
    }
    if (height == null) {
      height = 1;
    }
    Hexgrid.__super__.constructor.call(this);
    vertices = [];
    for (x = _i = 0; 0 <= xsize ? _i <= xsize : _i >= xsize; x = 0 <= xsize ? ++_i : --_i) {
      x1 = clamp((x - 0.5) / xsize, 0, 1);
      x2 = clamp((x + 0.0) / xsize, 0, 1);
      x3 = clamp((x + 0.5) / xsize, 0, 1);
      x4 = clamp((x + 1.0) / xsize, 0, 1);
      for (y = _j = 0; _j < ysize; y = _j += 2) {
        t = (y + 0) / ysize;
        m = (y + 1) / ysize;
        b = (y + 2) / ysize;
        vertices.push(x2 * width, 0, m * height, x2, m, 0, 0, 1, x3 * width, 0, t * height, x3, t, 0, 1, 0, x1 * width, 0, t * height, x1, t, 1, 0, 0, x4 * width, 0, m * height, x4, m, 0, 0, 1, x3 * width, 0, t * height, x3, t, 0, 1, 0, x2 * width, 0, m * height, x2, m, 1, 0, 0, x3 * width, 0, b * height, x3, b, 0, 0, 1, x2 * width, 0, m * height, x2, m, 0, 1, 0, x1 * width, 0, b * height, x1, b, 1, 0, 0, x3 * width, 0, b * height, x3, b, 0, 0, 1, x4 * width, 0, m * height, x4, m, 0, 1, 0, x2 * width, 0, m * height, x2, m, 1, 0, 0);
      }
    }
    this.size = vertices.length / 8;
    this.uploadList(vertices);
  }

  Hexgrid.prototype.setPointersForShader = function(shader) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.setPointer(shader, 'position', 3, 0, 8);
    this.setPointer(shader, 'texcoord', 2, 3, 8);
    this.setPointer(shader, 'barycentric', 3, 5, 8);
    return this;
  };

  return Hexgrid;

})(require('drawable'));
});
    
    loader.define('/webgl/drawable.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Drawable;

return Drawable = (function() {
  var float_size;

  float_size = Float32Array.BYTES_PER_ELEMENT;

  function Drawable() {
    this.first = 0;
    this.size = 0;
    this.buffer = this.gl.createBuffer();
    this.mode = this.gl.TRIANGLES;
  }

  Drawable.prototype.setPointer = function(shader, name, size, start, stride) {
    var location;
    if (size == null) {
      size = 3;
    }
    if (start == null) {
      start = 0;
    }
    if (stride == null) {
      stride = 0;
    }
    location = shader.attribLoc(name);
    if (location >= 0) {
      this.gl.vertexAttribPointer(location, size, this.gl.FLOAT, false, stride * float_size, start * float_size);
    }
    return this;
  };

  Drawable.prototype.setPointersForShader = function(shader) {
    var pointer, _i, _len, _ref;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    _ref = this.pointers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      pointer = _ref[_i];
      this.setPointer(shader, pointer.name, pointer.size, pointer.offset, pointer.stride);
    }
    return this;
  };

  Drawable.prototype.draw = function(shader) {
    if (shader) {
      this.setPointersForShader(shader);
    }
    this.gl.drawArrays(this.mode, this.first, this.size);
    if (shader) {
      this.disableAttribs(shader);
    }
    return this;
  };

  Drawable.prototype.drawRange = function(start, size) {
    if (start == null) {
      start = this.first;
    }
    if (size == null) {
      size = this.size;
    }
    return this.gl.drawArrays(this.mode, start, size);
  };

  Drawable.prototype.disableAttribs = function(shader) {
    var location, name, _i, _len, _ref;
    _ref = this.attribs;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      name = _ref[_i];
      location = shader.attribLoc(name);
      if (location >= 0) {
        this.gl.disableVertexAttribArray(location);
      }
    }
    return this;
  };

  Drawable.prototype.uploadList = function(list) {
    var data;
    data = new Float32Array(list);
    return this.upload(data);
  };

  Drawable.prototype.upload = function(data) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
    return this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
  };

  return Drawable;

})();
});
    
    loader.define('/webgl/shader.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Shader, directives, in_use;

directives = ['#ifdef GL_FRAGMENT_PRECISION_HIGH', 'precision highp int;', 'precision highp float;', '#else', 'precision mediump int;', 'precision mediump float;', '#endif'];

in_use = null;

return Shader = (function() {

  Shader.lastError = '';

  Shader.splitLines = function(path, source) {
    var i, line, result, _i, _len, _ref;
    result = [];
    _ref = source.split('\n');
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      line = _ref[i];
      result.push({
        line: i,
        text: line,
        path: path
      });
    }
    return result;
  };

  Shader.error = 'ShaderError';

  function Shader(gl, path, source) {
    var dirname;
    this.gl = gl;
    this.path = path;
    dirname = this.path.split('/');
    dirname.pop();
    this.dirname = dirname.join('/');
    this.program = this.gl.createProgram();
    this.vs = this.gl.createShader(gl.VERTEX_SHADER);
    this.fs = this.gl.createShader(gl.FRAGMENT_SHADER);
    this.gl.attachShader(this.program, this.vs);
    this.gl.attachShader(this.program, this.fs);
    this.link(source);
  }

  Shader.prototype.preprocess = function(source) {
    var global, i, line, lines, match, shaders, type, _i, _len;
    lines = source.split('\n');
    shaders = {
      'global': [],
      'fragment': [],
      'vertex': []
    };
    type = 'global';
    for (i = _i = 0, _len = lines.length; _i < _len; i = ++_i) {
      line = lines[i];
      match = line.match(/^(\w+):$/);
      if (match) {
        type = match[1];
      } else {
        shaders[type].push({
          line: i,
          text: line,
          path: this.path
        });
      }
    }
    global = this.resolveLines(shaders.global);
    shaders.fragment = global.concat(this.resolveLines(shaders.fragment));
    shaders.vertex = global.concat(this.resolveLines(shaders.vertex));
    return shaders;
  };

  Shader.prototype.resolveLines = function(stage) {
    var abspath, lib, line, match, path, result, _i, _j, _len, _len1;
    result = [];
    for (_i = 0, _len = stage.length; _i < _len; _i++) {
      line = stage[_i];
      match = line.text.match(/^\s+#require (\S+)\s*$/);
      if (match) {
        path = "" + match[1] + ".shaderlib";
        abspath = loader.resolvePath(this.dirname, path);
        lib = get(abspath);
        for (_j = 0, _len1 = lib.length; _j < _len1; _j++) {
          line = lib[_j];
          result.push(line);
        }
      } else {
        result.push(line);
      }
    }
    return result;
  };

  Shader.prototype.concat = function(stage) {
    var line, result, _i, _j, _len, _len1;
    result = '';
    for (_i = 0, _len = directives.length; _i < _len; _i++) {
      line = directives[_i];
      result += line + '\n';
    }
    result += '#line 0\n';
    for (_j = 0, _len1 = stage.length; _j < _len1; _j++) {
      line = stage[_j];
      result += line.text + '\n';
    }
    return result;
  };

  Shader.prototype.link = function(source) {
    var error, shaders;
    shaders = this.preprocess(source);
    this.compile(this.vs, shaders.vertex);
    this.compile(this.fs, shaders.fragment);
    this.gl.linkProgram(this.program);
    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      error = "Shader Link Error for file: " + this.path + ":\n" + (this.gl.getProgramInfoLog(this.program));
      console.error(error);
      Shader.lastError = error;
      throw Shader.error;
    }
    this.attrib_cache = {};
    this.uniform_cache = {};
    return this.value_cache = {};
  };

  Shader.prototype.compile = function(shader, lines) {
    var error, group, source, text, translated;
    source = this.concat(lines);
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      error = this.gl.getShaderInfoLog(shader);
      group = "Shader Compile Error for file: " + this.path;
      translated = this.translateError(error, lines);
      text = group + '\n' + translated;
      Shader.lastError = text;
      console.group(group);
      console.warn(translated);
      console.groupEnd();
      throw Shader.error;
    }
  };

  Shader.prototype.translateError = function(error, sourcelines) {
    var i, line, lineno, match, message, result, sourceline, _i, _len, _ref;
    result = [];
    _ref = error.split('\n');
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      line = _ref[i];
      match = line.match(/ERROR: \d+:(\d+): (.*)/);
      if (match) {
        lineno = parseFloat(match[1]);
        message = match[2];
        sourceline = sourcelines[lineno - 1];
        result.push("ERROR: Line " + (sourceline.line + 1) + ": File " + sourceline.path + ": " + message + " SOURCE: " + sourceline.text);
      } else {
        result.push(line);
      }
    }
    return result.join('\n');
  };

  Shader.prototype.attribLoc = function(name) {
    var location;
    location = this.attrib_cache[name];
    if (location === void 0) {
      location = this.attrib_cache[name] = this.gl.getAttribLocation(this.program, name);
    }
    if (location >= 0) {
      this.gl.enableVertexAttribArray(location);
    }
    return location;
  };

  Shader.prototype.use = function() {
    if (this !== in_use) {
      in_use = this;
      this.gl.useProgram(this.program);
    }
    return this;
  };

  Shader.prototype.unbind = function() {
    if (in_use) {
      in_use = null;
      this.gl.useProgram(null);
    }
    return this;
  };

  Shader.prototype.loc = function(name) {
    var location;
    location = this.uniform_cache[name];
    if (location === void 0) {
      location = this.uniform_cache[name] = this.gl.getUniformLocation(this.program, name);
    }
    return location;
  };

  Shader.prototype.i = function(name, value) {
    var cached, loc;
    cached = this.value_cache[name];
    if (cached !== value) {
      this.value_cache[name] = value;
      loc = this.loc(name);
      if (loc) {
        this.gl.uniform1i(loc, value);
      }
    }
    return this;
  };

  Shader.prototype.f = function(name, value) {
    var cached, loc;
    cached = this.value_cache[name];
    if (cached !== value) {
      this.value_cache[name] = value;
      loc = this.loc(name);
      if (loc) {
        this.gl.uniform1f(loc, value);
      }
    }
    return this;
  };

  Shader.prototype.fv = function(name, values) {
    var loc;
    loc = this.loc(name);
    if (loc) {
      this.gl.uniform1fv(loc, values);
    }
    return this;
  };

  Shader.prototype.val2 = function(name, a, b) {
    var cached, loc;
    cached = this.value_cache[name];
    if (cached) {
      if (cached.a !== a || cached.b !== b) {
        cached.a = a;
        cached.b = b;
        loc = this.loc(name);
        if (loc) {
          this.gl.uniform2f(loc, a, b);
        }
      }
    } else {
      this.value_cache[name] = {
        a: a,
        b: b
      };
      loc = this.loc(name);
      if (loc) {
        this.gl.uniform2f(loc, a, b);
      }
    }
    return this;
  };

  Shader.prototype.val3 = function(name, a, b, c) {
    var cached, loc;
    cached = this.value_cache[name];
    if (cached) {
      if (cached.a !== a || cached.b !== b || cached.c !== c) {
        cached.a = a;
        cached.b = b;
        cached.c = c;
        loc = this.loc(name);
        if (loc) {
          this.gl.uniform3f(loc, a, b, c);
        }
      }
    } else {
      this.value_cache[name] = {
        a: a,
        b: b,
        c: c
      };
      loc = this.loc(name);
      if (loc) {
        this.gl.uniform3f(loc, a, b, c);
      }
    }
    return this;
  };

  Shader.prototype.vec2 = function(name, value) {
    var loc;
    loc = this.loc(name);
    if (loc) {
      this.gl.uniform2fv(loc, value);
    }
    return this;
  };

  Shader.prototype.vec3 = function(name, value) {
    var loc;
    loc = this.loc(name);
    if (loc) {
      this.gl.uniform3fv(loc, value);
    }
    return this;
  };

  Shader.prototype.val4 = function(name, a, b, c, d) {
    var loc;
    loc = this.loc(name);
    if (loc) {
      this.gl.uniform4f(loc, a, b, c, d);
    }
    return this;
  };

  Shader.prototype.vec4 = function(name, a, b, c, e) {
    var loc;
    loc = this.loc(name);
    if (loc) {
      this.gl.uniform2f(loc, a, b, c, e);
    }
    return this;
  };

  Shader.prototype.mat4 = function(name, value) {
    var loc;
    loc = this.loc(name);
    if (loc) {
      if (value instanceof Mat4) {
        this.gl.uniformMatrix4fv(loc, this.gl.FALSE, value.data);
      } else {
        this.gl.uniformMatrix4fv(loc, this.gl.FALSE, value);
      }
    }
    return this;
  };

  Shader.prototype.mat3 = function(name, value) {
    var loc;
    loc = this.loc(name);
    if (loc) {
      this.gl.uniformMatrix3fv(loc, this.gl.FALSE, value.data);
    }
    return this;
  };

  Shader.prototype.draw = function(drawable) {
    drawable.setPointersForShader(this).draw().disableAttribs(this);
    return this;
  };

  return Shader;

})();
});
    
    loader.define('/webgl/sphere.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Sphere, faces, icosahedron, midp, normalize, phi, subdivide, v1, v10, v11, v12, v2, v3, v4, v5, v6, v7, v8, v9, vertexlist,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

phi = (1 + Math.sqrt(5)) / 2;

midp = function(v1, v2) {
  var x1, x2, x3, y1, y2, y3, z1, z2, z3;
  x1 = v1[0];
  y1 = v1[1];
  z1 = v1[2];
  x2 = v2[0];
  y2 = v2[1];
  z2 = v2[2];
  x3 = (x1 + x2) / 2;
  y3 = (y1 + y2) / 2;
  z3 = (z1 + z2) / 2;
  return [x3, y3, z3];
};

normalize = function(faces, r) {
  var face, l, new_face, result, vertex, x, y, z, _i, _j, _len, _len1;
  if (r == null) {
    r = 1;
  }
  result = [];
  for (_i = 0, _len = faces.length; _i < _len; _i++) {
    face = faces[_i];
    new_face = [];
    result.push(new_face);
    for (_j = 0, _len1 = face.length; _j < _len1; _j++) {
      vertex = face[_j];
      x = vertex[0];
      y = vertex[1];
      z = vertex[2];
      l = Math.sqrt(x * x + y * y + z * z);
      new_face.push([(r * x) / l, (r * y) / l, (r * z) / l]);
    }
  }
  return result;
};

subdivide = function(faces) {
  var face, result, v0, v1, v2, va, vb, vc, _i, _len;
  result = [];
  for (_i = 0, _len = faces.length; _i < _len; _i++) {
    face = faces[_i];
    v0 = face[0];
    v1 = face[1];
    v2 = face[2];
    va = midp(v0, v1);
    vb = midp(v1, v2);
    vc = midp(v2, v0);
    result.push([v0, va, vc], [va, v1, vb], [vc, vb, v2], [va, vb, vc]);
  }
  return result;
};

v1 = [1, phi, 0];

v2 = [-1, phi, 0];

v3 = [0, 1, phi];

v4 = [0, 1, -phi];

v5 = [phi, 0, 1];

v6 = [-phi, 0, 1];

v7 = [-phi, 0, -1];

v8 = [phi, 0, -1];

v9 = [0, -1, phi];

v10 = [0, -1, -phi];

v11 = [-1, -phi, 0];

v12 = [1, -phi, 0];

faces = [[v1, v2, v3], [v2, v1, v4], [v1, v3, v5], [v2, v6, v3], [v2, v7, v6], [v2, v4, v7], [v1, v5, v8], [v1, v8, v4], [v9, v3, v6], [v3, v9, v5], [v4, v10, v7], [v4, v8, v10], [v6, v7, v11], [v6, v11, v9], [v7, v10, v11], [v5, v12, v8], [v12, v5, v9], [v12, v10, v8], [v11, v12, v9], [v12, v11, v10]];

icosahedron = normalize(faces);

vertexlist = function(faces) {
  var face, vertex, vertices, x, y, z, _i, _j, _len, _len1;
  vertices = [];
  for (_i = 0, _len = faces.length; _i < _len; _i++) {
    face = faces[_i];
    for (_j = 0, _len1 = face.length; _j < _len1; _j++) {
      vertex = face[_j];
      x = vertex[0];
      y = vertex[1];
      z = vertex[2];
      vertices.push(x, y, z);
    }
  }
  return vertices;
};

return Sphere = (function(_super) {

  __extends(Sphere, _super);

  Sphere.prototype.attribs = ['position'];

  Sphere.prototype.pointers = [
    {
      name: 'position',
      size: 3,
      offset: 0,
      stride: 3
    }
  ];

  Sphere.makeVertices = function(radius, subdivisions) {
    var i, template, vertices, _i;
    if (radius == null) {
      radius = 1;
    }
    if (subdivisions == null) {
      subdivisions = 3;
    }
    template = icosahedron;
    for (i = _i = 0; 0 <= subdivisions ? _i < subdivisions : _i > subdivisions; i = 0 <= subdivisions ? ++_i : --_i) {
      template = subdivide(template);
      template = normalize(template);
    }
    faces = normalize(template, radius);
    vertices = vertexlist(faces);
    return vertices;
  };

  function Sphere(gl, radius, subdivisions) {
    var vertices;
    this.gl = gl;
    if (radius == null) {
      radius = 1;
    }
    if (subdivisions == null) {
      subdivisions = 3;
    }
    Sphere.__super__.constructor.call(this);
    vertices = Sphere.makeVertices(radius, subdivisions);
    this.size = vertices.length / 3;
    this.uploadList(vertices);
  }

  return Sphere;

})(require('drawable'));
});
    
    loader.define('/webgl/texture.js', function(exports, require, get){
    // Generated by CoffeeScript 1.3.3
var Cubemap, Framebuffer, Texture, Texture2D,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Framebuffer = require('framebuffer').Framebuffer;

Texture = (function() {
  var bound, ids;

  bound = [];

  ids = 0;

  function Texture() {
    this.handle = this.gl.createTexture();
    this.id = ids++;
    this.unit = null;
  }

  Texture.prototype.bind = function(unit) {
    if (unit == null) {
      unit = 0;
    }
    this.unit = unit;
    if (bound[unit] !== this.id) {
      this.gl.activeTexture(this.gl.TEXTURE0 + unit);
      this.gl.bindTexture(this.target, this.handle);
      bound[unit] = this.id;
    }
    return this;
  };

  Texture.prototype.unbind = function(unit) {
    if (unit == null) {
      unit = this.unit;
    }
    if (unit && bound[unit] === this.id) {
      this.gl.activeTexture(this.gl.TEXTURE0 + unit);
      this.gl.bindTexture(this.target, null);
      bound[unit] = null;
    }
    return this;
  };

  Texture.prototype.mipmap = function() {
    this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
    this.gl.generateMipmap(this.target);
    return this;
  };

  Texture.prototype.mipmapNearest = function() {
    this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
    this.gl.generateMipmap(this.target);
    return this;
  };

  Texture.prototype.linear = function() {
    this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    return this;
  };

  Texture.prototype.nearest = function() {
    this.gl.texParameteri(this.target, this.gl.TEXTURE_MAG_FILTER, this.gl.NEAREST);
    this.gl.texParameteri(this.target, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);
    return this;
  };

  Texture.prototype.clampToEdge = function() {
    this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    return this;
  };

  Texture.prototype.repeat = function() {
    this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
    this.gl.texParameteri(this.target, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);
    return this;
  };

  Texture.prototype.anisotropy = function() {
    var ext, max;
    ext = this.gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic');
    if (ext) {
      max = this.gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
      this.gl.texParameterf(this.target, ext.TEXTURE_MAX_ANISOTROPY_EXT, max);
    }
    return this;
  };

  return Texture;

})();

exports.Texture2D = Texture2D = (function(_super) {

  __extends(Texture2D, _super);

  function Texture2D(gl, _arg) {
    var _ref, _ref1, _ref2, _ref3;
    this.gl = gl;
    _ref = _arg != null ? _arg : {}, this.channels = _ref.channels, this.format = _ref.format, this.type = _ref.type;
    Texture2D.__super__.constructor.call(this);
    if ((_ref1 = this.channels) == null) {
      this.channels = this.gl.RGBA;
    }
    if ((_ref2 = this.format) == null) {
      this.format = this.gl.RGBA;
    }
    if ((_ref3 = this.type) == null) {
      this.type = this.gl.UNSIGNED_BYTE;
    }
    this.target = this.gl.TEXTURE_2D;
  }

  Texture2D.prototype.upload = function(image) {
    this.uploadImage(image);
    return this;
  };

  Texture2D.prototype.uploadImage = function(image) {
    this.width = image.width;
    this.height = image.height;
    this.gl.texImage2D(this.target, 0, this.channels, this.format, this.type, image);
    return this;
  };

  Texture2D.prototype.uploadData = function(data, width, height) {
    this.width = width;
    this.height = height;
    this.gl.texImage2D(this.target, 0, this.channels, width, height, 0, this.format, this.type, data);
    return this;
  };

  Texture2D.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
    this.gl.texImage2D(this.target, 0, this.channels, width, height, 0, this.format, this.type, null);
    return this;
  };

  Texture2D.prototype.read = function(dst) {
    if (dst == null) {
      dst = new Uint8Array(this.width * this.height * 4);
    }
    if (this.fbo) {
      this.fbo.bind();
    } else {
      this.fbo = new Framebuffer(this.gl).bind().color(this);
    }
    this.gl.readPixels(0, 0, this.width, this.height, this.gl.RGBA, this.gl.UNSIGNED_BYTE, dst);
    this.fbo.unbind();
    return dst;
  };

  Texture2D.prototype.toPNG = function() {
    var canvas, ctx, data, i, imgdata, result, url, _i, _ref;
    canvas = document.createElement('canvas');
    canvas.height = this.height;
    canvas.width = this.width;
    ctx = canvas.getContext('2d');
    imgdata = ctx.createImageData(this.width, this.height);
    imgdata.data.set(this.read(), 0);
    ctx.putImageData(imgdata, 0, 0);
    url = canvas.toDataURL('image/png');
    data = atob(url.split(',')[1]);
    result = new Uint8Array(data.length);
    for (i = _i = 0, _ref = data.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
      result[i] = data.charCodeAt(i);
    }
    return result;
  };

  return Texture2D;

})(Texture);

exports.Cubemap = Cubemap = (function(_super) {

  __extends(Cubemap, _super);

  function Cubemap(gl) {
    this.gl = gl;
    Cubemap.__super__.constructor.call(this);
    this.target = this.gl.TEXTURE_CUBE_MAP;
    this.up = this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y;
    this.down = this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y;
    this.right = this.gl.TEXTURE_CUBE_MAP_POSITIVE_X;
    this.left = this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X;
    this.back = this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z;
    this.front = this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z;
  }

  Cubemap.prototype.uploadSide = function(name, image) {
    return this.gl.texImage2D(this.gl['TEXTURE_CUBE_MAP_' + name], 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
  };

  Cubemap.prototype.upload = function(folder, ext) {
    if (ext == null) {
      ext = 'jpg';
    }
    this.uploadSide('POSITIVE_Y', folder.get("up." + ext));
    this.uploadSide('NEGATIVE_Y', folder.get("down." + ext));
    this.uploadSide('POSITIVE_X', folder.get("right." + ext));
    this.uploadSide('NEGATIVE_X', folder.get("left." + ext));
    this.uploadSide('POSITIVE_Z', folder.get("front." + ext));
    this.uploadSide('NEGATIVE_Z', folder.get("back." + ext));
    return this;
  };

  Cubemap.prototype.setSize = function(size) {
    this.size = size;
    this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.gl.RGBA, this.size, this.size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
    this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.gl.RGBA, this.size, this.size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
    this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.gl.RGBA, this.size, this.size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
    this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.gl.RGBA, this.size, this.size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
    this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.gl.RGBA, this.size, this.size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
    this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.gl.RGBA, this.size, this.size, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);
    return this;
  };

  return Cubemap;

})(Texture);
});
    
$(function(){loader.main()});