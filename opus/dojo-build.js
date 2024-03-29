
(function(){if(typeof this["loadFirebugConsole"]=="function"){this["loadFirebugConsole"]();}else{this.console=this.console||{};var cn=["assert","count","debug","dir","dirxml","error","group","groupEnd","info","profile","profileEnd","time","timeEnd","trace","warn","log"];var i=0,tn;while((tn=cn[i++])){if(!console[tn]){(function(){var tcn=tn+"";console[tcn]=('log'in console)?function(){var a=Array.apply({},arguments);a.unshift(tcn+":");console["log"](a.join(" "));}:function(){}
console[tcn]._fake=true;})();}}}
if(typeof dojo=="undefined"){this.dojo={_scopeName:"dojo",_scopePrefix:"",_scopePrefixArgs:"",_scopeSuffix:"",_scopeMap:{},_scopeMapRev:{}};}
var d=dojo;if(typeof dijit=="undefined"){this.dijit={_scopeName:"dijit"};}
if(typeof dojox=="undefined"){this.dojox={_scopeName:"dojox"};}
if(!d._scopeArgs){d._scopeArgs=[dojo,dijit,dojox];}
d.global=this;d.config={isDebug:false,debugAtAllCosts:false};if(typeof djConfig!="undefined"){for(var opt in djConfig){d.config[opt]=djConfig[opt];}}
dojo.locale=d.config.locale;var rev="$Rev: 20518 $".match(/\d+/);dojo.version={major:1,minor:4,patch:0,flag:"dev",revision:rev?+rev[0]:NaN,toString:function(){with(d.version){return major+"."+minor+"."+patch+flag+" ("+revision+")";}}}
if(typeof OpenAjax!="undefined"){OpenAjax.hub.registerLibrary(dojo._scopeName,"http://dojotoolkit.org",d.version.toString());}
var extraNames,extraLen,empty={};for(var i in{toString:1}){extraNames=[];break;}
dojo._extraNames=extraNames=extraNames||["hasOwnProperty","valueOf","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","constructor"];extraLen=extraNames.length;dojo._mixin=function(target,source){var name,s,i;for(name in source){s=source[name];if(!(name in target)||(target[name]!==s&&(!(name in empty)||empty[name]!==s))){target[name]=s;}}
if(extraLen&&source){for(i=0;i<extraLen;++i){name=extraNames[i];s=source[name];if(!(name in target)||(target[name]!==s&&(!(name in empty)||empty[name]!==s))){target[name]=s;}}}
return target;}
dojo.mixin=function(obj,props){if(!obj){obj={};}
for(var i=1,l=arguments.length;i<l;i++){d._mixin(obj,arguments[i]);}
return obj;}
dojo._getProp=function(parts,create,context){var obj=context||d.global;for(var i=0,p;obj&&(p=parts[i]);i++){if(i==0&&d._scopeMap[p]){p=d._scopeMap[p];}
obj=(p in obj?obj[p]:(create?obj[p]={}:undefined));}
return obj;}
dojo.setObject=function(name,value,context){var parts=name.split("."),p=parts.pop(),obj=d._getProp(parts,true,context);return obj&&p?(obj[p]=value):undefined;}
dojo.getObject=function(name,create,context){return d._getProp(name.split("."),create,context);}
dojo.exists=function(name,obj){return!!d.getObject(name,false,obj);}
dojo["eval"]=function(scriptFragment){return d.global.eval?d.global.eval(scriptFragment):eval(scriptFragment);}
d.deprecated=d.experimental=function(){};})();
(function(){var d=dojo;d.mixin(d,{_loadedModules:{},_inFlightCount:0,_hasResource:{},_modulePrefixes:{dojo:{name:"dojo",value:"."},doh:{name:"doh",value:"../util/doh"},tests:{name:"tests",value:"tests"}},_moduleHasPrefix:function(module){var mp=d._modulePrefixes;return!!(mp[module]&&mp[module].value);},_getModulePrefix:function(module){var mp=d._modulePrefixes;if(d._moduleHasPrefix(module)){return mp[module].value;}
return module;},_loadedUrls:[],_postLoad:false,_loaders:[],_unloaders:[],_loadNotifying:false});dojo._loadPath=function(relpath,module,cb){var uri=((relpath.charAt(0)=='/'||relpath.match(/^\w+:/))?"":d.baseUrl)+relpath;try{return!module?d._loadUri(uri,cb):d._loadUriAndCheck(uri,module,cb);}catch(e){console.error(e);return false;}}
dojo._loadUri=function(uri,cb){if(d._loadedUrls[uri]){return true;}
d._inFlightCount++;var contents=d._getText(uri,true);if(contents){d._loadedUrls[uri]=true;d._loadedUrls.push(uri);if(cb){contents='('+contents+')';}else{contents=d._scopePrefix+contents+d._scopeSuffix;}
if(!d.isIE){contents+="\r\n//@ sourceURL="+uri;}
var value=d["eval"](contents);if(cb){cb(value);}}
if(--d._inFlightCount==0&&d._postLoad&&d._loaders.length){setTimeout(function(){if(d._inFlightCount==0){d._callLoaded();}},0);}
return!!contents;}
dojo._loadUriAndCheck=function(uri,moduleName,cb){var ok=false;try{ok=d._loadUri(uri,cb);}catch(e){console.error("failed loading "+uri+" with error: "+e);}
return!!(ok&&d._loadedModules[moduleName]);}
dojo.loaded=function(){d._loadNotifying=true;d._postLoad=true;var mll=d._loaders;d._loaders=[];for(var x=0;x<mll.length;x++){mll[x]();}
d._loadNotifying=false;if(d._postLoad&&d._inFlightCount==0&&mll.length){d._callLoaded();}}
dojo.unloaded=function(){var mll=d._unloaders;while(mll.length){(mll.pop())();}}
d._onto=function(arr,obj,fn){if(!fn){arr.push(obj);}else if(fn){var func=(typeof fn=="string")?obj[fn]:fn;arr.push(function(){func.call(obj);});}}
dojo.ready=dojo.addOnLoad=function(obj,functionName){d._onto(d._loaders,obj,functionName);if(d._postLoad&&d._inFlightCount==0&&!d._loadNotifying){d._callLoaded();}}
var dca=d.config.addOnLoad;if(dca){d.addOnLoad[(dca instanceof Array?"apply":"call")](d,dca);}
dojo._modulesLoaded=function(){if(d._postLoad){return;}
if(d._inFlightCount>0){console.warn("files still in flight!");return;}
d._callLoaded();}
dojo._callLoaded=function(){if(typeof setTimeout=="object"||(d.config.useXDomain&&d.isOpera)){setTimeout(d.isAIR?function(){d.loaded();}:d._scopeName+".loaded();",0);}else{d.loaded();}}
dojo._getModuleSymbols=function(modulename){var syms=modulename.split(".");for(var i=syms.length;i>0;i--){var parentModule=syms.slice(0,i).join(".");if(i==1&&!d._moduleHasPrefix(parentModule)){syms[0]="../"+syms[0];}else{var parentModulePath=d._getModulePrefix(parentModule);if(parentModulePath!=parentModule){syms.splice(0,i,parentModulePath);break;}}}
return syms;}
dojo._global_omit_module_check=false;dojo.loadInit=function(init){init();}
dojo._loadModule=dojo.require=function(moduleName,omitModuleCheck){omitModuleCheck=d._global_omit_module_check||omitModuleCheck;var module=d._loadedModules[moduleName];if(module){return module;}
var relpath=d._getModuleSymbols(moduleName).join("/")+'.js';var modArg=!omitModuleCheck?moduleName:null;var ok=d._loadPath(relpath,modArg);if(!ok&&!omitModuleCheck){throw new Error("Could not load '"+moduleName+"'; last tried '"+relpath+"'");}
if(!omitModuleCheck&&!d._isXDomain){module=d._loadedModules[moduleName];if(!module){throw new Error("symbol '"+moduleName+"' is not defined after loading '"+relpath+"'");}}
return module;}
dojo.provide=function(resourceName){resourceName=resourceName+"";return(d._loadedModules[resourceName]=d.getObject(resourceName,true));}
dojo.platformRequire=function(modMap){var common=modMap.common||[];var result=common.concat(modMap[d._name]||modMap["default"]||[]);for(var x=0;x<result.length;x++){var curr=result[x];if(curr.constructor==Array){d._loadModule.apply(d,curr);}else{d._loadModule(curr);}}}
dojo.requireIf=function(condition,resourceName){if(condition===true){var args=[];for(var i=1;i<arguments.length;i++){args.push(arguments[i]);}
d.require.apply(d,args);}}
dojo.requireAfterIf=d.requireIf;dojo.registerModulePath=function(module,prefix){d._modulePrefixes[module]={name:module,value:prefix};}
dojo.requireLocalization=function(moduleName,bundleName,locale,availableFlatLocales){d.require("dojo.i18n");d.i18n._requireLocalization.apply(d.hostenv,arguments);};var ore=new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),ire=new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$");dojo._Url=function(){var n=null,_a=arguments,uri=[_a[0]];for(var i=1;i<_a.length;i++){if(!_a[i]){continue;}
var relobj=new d._Url(_a[i]+""),uriobj=new d._Url(uri[0]+"");if(relobj.path==""&&!relobj.scheme&&!relobj.authority&&!relobj.query){if(relobj.fragment!=n){uriobj.fragment=relobj.fragment;}
relobj=uriobj;}else if(!relobj.scheme){relobj.scheme=uriobj.scheme;if(!relobj.authority){relobj.authority=uriobj.authority;if(relobj.path.charAt(0)!="/"){var path=uriobj.path.substring(0,uriobj.path.lastIndexOf("/")+1)+relobj.path;var segs=path.split("/");for(var j=0;j<segs.length;j++){if(segs[j]=="."){if(j==segs.length-1){segs[j]="";}else{segs.splice(j,1);j--;}}else if(j>0&&!(j==1&&segs[0]=="")&&segs[j]==".."&&segs[j-1]!=".."){if(j==(segs.length-1)){segs.splice(j,1);segs[j-1]="";}else{segs.splice(j-1,2);j-=2;}}}
relobj.path=segs.join("/");}}}
uri=[];if(relobj.scheme){uri.push(relobj.scheme,":");}
if(relobj.authority){uri.push("//",relobj.authority);}
uri.push(relobj.path);if(relobj.query){uri.push("?",relobj.query);}
if(relobj.fragment){uri.push("#",relobj.fragment);}}
this.uri=uri.join("");var r=this.uri.match(ore);this.scheme=r[2]||(r[1]?"":n);this.authority=r[4]||(r[3]?"":n);this.path=r[5];this.query=r[7]||(r[6]?"":n);this.fragment=r[9]||(r[8]?"":n);if(this.authority!=n){r=this.authority.match(ire);this.user=r[3]||n;this.password=r[4]||n;this.host=r[6]||r[7];this.port=r[9]||n;}}
dojo._Url.prototype.toString=function(){return this.uri;};dojo.moduleUrl=function(module,url){var loc=d._getModuleSymbols(module).join('/');if(!loc){return null;}
if(loc.lastIndexOf("/")!=loc.length-1){loc+="/";}
var colonIndex=loc.indexOf(":");if(loc.charAt(0)!="/"&&(colonIndex==-1||colonIndex>loc.indexOf("/"))){loc=d.baseUrl+loc;}
return new d._Url(loc,url);}})();
if(typeof window!='undefined'){dojo.isBrowser=true;dojo._name="browser";(function(){var d=dojo;if(document&&document.getElementsByTagName){var scripts=document.getElementsByTagName("script");var rePkg=/dojo(\.xd)?\.js(\W|$)/i;for(var i=0;i<scripts.length;i++){var src=scripts[i].getAttribute("src");if(!src){continue;}
var m=src.match(rePkg);if(m){if(!d.config.baseUrl){d.config.baseUrl=src.substring(0,m.index);}
var cfg=scripts[i].getAttribute("djConfig");if(cfg){var cfgo=eval("({ "+cfg+" })");for(var x in cfgo){dojo.config[x]=cfgo[x];}}
break;}}}
d.baseUrl=d.config.baseUrl;var n=navigator;var dua=n.userAgent,dav=n.appVersion,tv=parseFloat(dav);if(dua.indexOf("Opera")>=0){d.isOpera=tv;}
if(dua.indexOf("AdobeAIR")>=0){d.isAIR=1;}
d.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:0;d.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;d.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;d.isMac=dav.indexOf("Macintosh")>=0;var index=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);if(index&&!dojo.isChrome){d.isSafari=parseFloat(dav.split("Version/")[1]);if(!d.isSafari||parseFloat(dav.substr(index+7))<=419.3){d.isSafari=2;}}
if(dua.indexOf("Gecko")>=0&&!d.isKhtml&&!d.isWebKit){d.isMozilla=d.isMoz=tv;}
if(d.isMoz){d.isFF=parseFloat(dua.split("Firefox/")[1]||dua.split("Minefield/")[1])||undefined;}
if(document.all&&!d.isOpera){d.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;var mode=document.documentMode;if(mode&&mode!=5&&Math.floor(d.isIE)!=mode){d.isIE=mode;}}
if(dojo.isIE&&window.location.protocol==="file:"){dojo.config.ieForceActiveXXhr=true;}
d.isQuirks=document.compatMode=="BackCompat";d.locale=dojo.config.locale||(d.isIE?n.userLanguage:n.language).toLowerCase();d._XMLHTTP_PROGIDS=['Msxml2.XMLHTTP','Microsoft.XMLHTTP','Msxml2.XMLHTTP.4.0'];d._xhrObj=function(){var http,last_e;if(!dojo.isIE||!dojo.config.ieForceActiveXXhr){try{http=new XMLHttpRequest();}catch(e){}}
if(!http){for(var i=0;i<3;++i){var progid=d._XMLHTTP_PROGIDS[i];try{http=new ActiveXObject(progid);}catch(e){last_e=e;}
if(http){d._XMLHTTP_PROGIDS=[progid];break;}}}
if(!http){throw new Error("XMLHTTP not available: "+last_e);}
return http;}
d._isDocumentOk=function(http){var stat=http.status||0,lp=location.protocol;return(stat>=200&&stat<300)||stat==304||stat==1223||(!stat&&(lp=="file:"||lp=="chrome:"||lp=="app:"));}
var owloc=window.location+"";var base=document.getElementsByTagName("base");var hasBase=(base&&base.length>0);d._getText=function(uri,fail_ok){var http=d._xhrObj();if(!hasBase&&dojo._Url){uri=(new dojo._Url(owloc,uri)).toString();}
if(d.config.cacheBust){uri+="";uri+=(uri.indexOf("?")==-1?"?":"&")+String(d.config.cacheBust).replace(/\W+/g,"");}
http.open('GET',uri,false);try{http.send(null);if(!d._isDocumentOk(http)){var err=Error("Unable to load "+uri+" status:"+http.status);err.status=http.status;err.responseText=http.responseText;throw err;}}catch(e){if(fail_ok){return null;}
throw e;}
return http.responseText;}
var _w=window;var _handleNodeEvent=function(evtName,fp){var _a=_w.attachEvent||_w.addEventListener;evtName=_w.attachEvent?evtName:evtName.substring(2);_a(evtName,function(){fp.apply(_w,arguments);},false);};d._windowUnloaders=[];d.windowUnloaded=function(){var mll=d._windowUnloaders;while(mll.length){(mll.pop())();}};var _onWindowUnloadAttached=0;d.addOnWindowUnload=function(obj,functionName){d._onto(d._windowUnloaders,obj,functionName);if(!_onWindowUnloadAttached){_onWindowUnloadAttached=1;_handleNodeEvent("onunload",d.windowUnloaded);}};var _onUnloadAttached=0;d.addOnUnload=function(obj,functionName){d._onto(d._unloaders,obj,functionName);if(!_onUnloadAttached){_onUnloadAttached=1;_handleNodeEvent("onbeforeunload",dojo.unloaded);}};})();dojo._initFired=false;dojo._loadInit=function(e){if(!dojo._initFired){dojo._initFired=true;if(dojo._inFlightCount==0){dojo._modulesLoaded();}}}
if(!dojo.config.afterOnLoad){if(document.addEventListener){document.addEventListener("DOMContentLoaded",dojo._loadInit,false);window.addEventListener("load",dojo._loadInit,false);}else if(window.attachEvent){window.attachEvent("onload",dojo._loadInit);}}
if(dojo.isIE){if(!dojo.config.afterOnLoad){document.write('<scr'+'ipt defer src="//:" '
+'onreadystatechange="if(this.readyState==\'complete\'){'+dojo._scopeName+'._loadInit();}">'
+'</scr'+'ipt>');}
try{document.namespaces.add("v","urn:schemas-microsoft-com:vml");document.createStyleSheet().addRule("v\\:*","behavior:url(#default#VML);  display:inline-block");}catch(e){}}}
(function(){var mp=dojo.config["modulePaths"];if(mp){for(var param in mp){dojo.registerModulePath(param,mp[param]);}}})();if(dojo.config.isDebug){dojo.require("dojo._firebug.firebug");}
if(dojo.config.debugAtAllCosts){dojo.config.useXDomain=true;dojo.require("dojo._base._loader.loader_xd");dojo.require("dojo._base._loader.loader_debug");dojo.require("dojo.i18n");}
dojo.provide("dojo._base.lang");(function(){var d=dojo;dojo.isString=function(it){return(typeof it=="string"||it instanceof String);}
dojo.isArray=function(it){return it&&(it instanceof Array||typeof it=="array");}
dojo.isFunction=(function(){var _isFunction=function(it){var t=typeof it;return it&&(t=="function"||it instanceof Function)&&!it.nodeType;};return d.isSafari?function(it){if(typeof it=="function"&&it=="[object NodeList]"){return false;}
return _isFunction(it);}:_isFunction;})();dojo.isObject=function(it){return it!==undefined&&(it===null||typeof it=="object"||d.isArray(it)||d.isFunction(it));}
dojo.isArrayLike=function(it){return it&&it!==undefined&&!d.isString(it)&&!d.isFunction(it)&&!(it.tagName&&it.tagName.toLowerCase()=='form')&&(d.isArray(it)||isFinite(it.length));}
dojo.isAlien=function(it){return it&&!d.isFunction(it)&&/\{\s*\[native code\]\s*\}/.test(String(it));}
dojo.extend=function(constructor,props){for(var i=1,l=arguments.length;i<l;i++){d._mixin(constructor.prototype,arguments[i]);}
return constructor;}
dojo._hitchArgs=function(scope,method){var pre=d._toArray(arguments,2);var named=d.isString(method);return function(){var args=d._toArray(arguments);var f=named?(scope||d.global)[method]:method;return f&&f.apply(scope||this,pre.concat(args));}}
dojo.hitch=function(scope,method){if(arguments.length>2){return d._hitchArgs.apply(d,arguments);}
if(!method){method=scope;scope=null;}
if(d.isString(method)){scope=scope||d.global;if(!scope[method]){throw(['dojo.hitch: scope["',method,'"] is null (scope="',scope,'")'].join(''));}
return function(){return scope[method].apply(scope,arguments||[]);};}
return!scope?method:function(){return method.apply(scope,arguments||[]);};}
dojo.delegate=dojo._delegate=(function(){function TMP(){}
return function(obj,props){TMP.prototype=obj;var tmp=new TMP();TMP.prototype=null;if(props){d._mixin(tmp,props);}
return tmp;}})();var efficient=function(obj,offset,startWith){return(startWith||[]).concat(Array.prototype.slice.call(obj,offset||0));};var slow=function(obj,offset,startWith){var arr=startWith||[];for(var x=offset||0;x<obj.length;x++){arr.push(obj[x]);}
return arr;};dojo._toArray=d.isIE?function(obj){return((obj.item)?slow:efficient).apply(this,arguments);}:efficient;dojo.partial=function(method){var arr=[null];return d.hitch.apply(d,arr.concat(d._toArray(arguments)));}
var extraNames=d._extraNames,extraLen=extraNames.length,empty={};dojo.clone=function(o){if(!o||typeof o!="object"||d.isFunction(o)){return o;}
if(o.nodeType&&o.cloneNode){return o.cloneNode(true);}
if(o instanceof Date){return new Date(o.getTime());}
var r,i,l,s,name;if(d.isArray(o)){r=[];for(i=0,l=o.length;i<l;++i){if(i in o){r.push(d.clone(o[i]));}}}else{r=o.constructor?new o.constructor():{};}
for(name in o){s=o[name];if(!(name in r)||(r[name]!==s&&(!(name in empty)||empty[name]!==s))){r[name]=d.clone(s);}}
if(extraLen){for(i=0;i<extraLen;++i){name=extraNames[i];s=o[name];if(!(name in r)||(r[name]!==s&&(!(name in empty)||empty[name]!==s))){r[name]=s;}}}
return r;}
dojo.trim=String.prototype.trim?function(str){return str.trim();}:function(str){return str.replace(/^\s\s*/,'').replace(/\s\s*$/,'');};})();
dojo.require("dojo._base.lang");dojo.provide("dojo._base.array");(function(){var _getParts=function(arr,obj,cb){return[(typeof arr=="string")?arr.split(""):arr,obj||dojo.global,(typeof cb=="string")?new Function("item","index","array",cb):cb];};var everyOrSome=function(every,arr,callback,thisObject){var _p=_getParts(arr,thisObject,callback);arr=_p[0];for(var i=0,l=arr.length;i<l;++i){var result=!!_p[2].call(_p[1],arr[i],i,arr);if(every^result){return result;}}
return every;};dojo.mixin(dojo,{indexOf:function(array,value,fromIndex,findLast){var step=1,end=array.length||0,i=0;if(findLast){i=end-1;step=end=-1;}
if(fromIndex!=undefined){i=fromIndex;}
if((findLast&&i>end)||i<end){for(;i!=end;i+=step){if(array[i]==value){return i;}}}
return-1;},lastIndexOf:function(array,value,fromIndex){return dojo.indexOf(array,value,fromIndex,true);},forEach:function(arr,callback,thisObject){if(!arr||!arr.length){return;}
var _p=_getParts(arr,thisObject,callback);arr=_p[0];for(var i=0,l=arr.length;i<l;++i){_p[2].call(_p[1],arr[i],i,arr);}},every:function(arr,callback,thisObject){return everyOrSome(true,arr,callback,thisObject);},some:function(arr,callback,thisObject){return everyOrSome(false,arr,callback,thisObject);},map:function(arr,callback,thisObject){var _p=_getParts(arr,thisObject,callback);arr=_p[0];var outArr=(arguments[3]?(new arguments[3]()):[]);for(var i=0,l=arr.length;i<l;++i){outArr.push(_p[2].call(_p[1],arr[i],i,arr));}
return outArr;},filter:function(arr,callback,thisObject){var _p=_getParts(arr,thisObject,callback);arr=_p[0];var outArr=[];for(var i=0,l=arr.length;i<l;++i){if(_p[2].call(_p[1],arr[i],i,arr)){outArr.push(arr[i]);}}
return outArr;}});})();
dojo.provide("dojo._base.declare");dojo.require("dojo._base.lang");dojo.require("dojo._base.array");(function(){var d=dojo,op=Object.prototype,isF=d.isFunction,mix=d._mixin,xtor=new Function,counter=0;function err(msg){throw new Error("declare: "+msg);}
function c3mro(bases){var result=[],roots=[{cls:0,refs:[]}],nameMap={},clsCount=1,l=bases.length,i=0,j,lin,base,top,proto,rec,name,refs;for(;i<l;++i){base=bases[i];if(!base){err("mixin #"+i+" is null");}
lin=base._meta?base._meta.bases:[base];top=0;for(j=lin.length-1;j>=0;--j){proto=lin[j].prototype;if(!proto.hasOwnProperty("declaredClass")){proto.declaredClass="uniqName_"+(counter++);}
name=proto.declaredClass;if(!nameMap.hasOwnProperty(name)){nameMap[name]={count:0,refs:[],cls:lin[j]};++clsCount;}
rec=nameMap[name];if(top&&top!==rec){rec.refs.push(top);++top.count;}
top=rec;}
++top.count;roots[0].refs.push(top);}
while(roots.length){top=roots.pop();result.push(top.cls);--clsCount;while(refs=top.refs,refs.length==1){top=refs[0];if(!top||--top.count){top=0;break;}
result.push(top.cls);--clsCount;}
if(top){for(i=0,l=refs.length;i<l;++i){top=refs[i];if(!--top.count){roots.push(top);}}}}
if(clsCount){err("can't build consistent linearization");}
result[0]=base?base._meta&&base===result[result.length-base._meta.bases.length]?base._meta.bases.length:1:0;return result;}
function findInherited(self,caller,name){var meta=self.constructor._meta,bases=meta.bases,l=bases.length,i,f,opf,cache,currentBase,proto;name=name||caller.nom;if(!name){err("can't deduce a name to call inherited()");}
if(name=="constructor"?meta.chains.constructor!=="manual":meta.chains.hasOwnProperty(name)){err("calling chained method as inherited: "+name);}
cache=self._inherited;currentBase=bases[cache.pos];meta=currentBase&&currentBase._meta;proto=currentBase&&currentBase.prototype;if(!currentBase||cache.name!=name||!(meta?(meta.hidden[name]===caller||proto.hasOwnProperty(name)&&proto[name]===caller):(proto[name]===caller))){for(i=0;i<l;++i){currentBase=bases[i];meta=currentBase._meta;proto=currentBase.prototype;if(meta?(meta.hidden[name]===caller||proto.hasOwnProperty(name)&&proto[name]===caller):(proto[name]===caller)){break;}}
cache.name=name;cache.pos=i<l?i:-1;}
i=cache.pos;opf=op[name];while(++i<l){currentBase=bases[i];proto=currentBase.prototype;if(currentBase._meta){if(proto.hasOwnProperty(name)){f=proto[name];break;}}else{f=proto[name];if(f&&f!==opf){break;}}}
cache.pos=i;return i<l&&f||name!="constructor"&&opf;}
function getInherited(args,a){var name;if(typeof args=="string"){name=args;args=a;}
return findInherited(this,args.callee,name);}
function inherited(args,a,f){var name;if(typeof args=="string"){name=args;args=a;a=f;}
f=findInherited(this,args.callee,name);return f?f.apply(this,a||args):undefined;}
function isInstanceOf(cls){var bases=this.constructor._meta.bases;for(var i=0,l=bases.length;i<l;++i){if(bases[i]===cls){return true;}}
return this instanceof cls;}
function safeMixin(target,source){var name,t,i=0,l=d._extraNames.length;for(name in source){t=source[name];if((t!==op[name]||!(name in op))&&name!="constructor"){if(isF(t)){t.nom=name;}
target[name]=t;}}
for(;i<l;++i){name=d._extraNames[i];t=source[name];if((t!==op[name]||!(name in op))&&name!="constructor"){if(isF(t)){t.nom=name;}
target[name]=t;}}}
function extend(source){safeMixin(this.prototype,source);}
function chainedConstructor(bases,ctorSpecial){return function(){var a=arguments,args=a,a0=a[0],f,i,m,h,l=bases.length,preArgs;this._inherited={};if(ctorSpecial&&(a0&&a0.preamble||this.preamble)){preArgs=new Array(bases.length);preArgs[0]=a;for(i=0;;){a0=a[0];if(a0){f=a0.preamble;if(f){a=f.apply(this,a)||a;}}
f=bases[i].prototype;f=f.hasOwnProperty("preamble")&&f.preamble;if(f){a=f.apply(this,a)||a;}
if(++i==l){break;}
preArgs[i]=a;}}
for(i=l-1;i>=0;--i){f=bases[i];m=f._meta;if(m){h=m.hidden;f=h.hasOwnProperty("constructor")&&h.constructor;}
if(f){f.apply(this,preArgs?preArgs[i]:a);}}
f=this.postscript;if(f){f.apply(this,args);}};}
function simpleConstructor(bases){return function(){var a=arguments,f,i=0,l=bases.length;this._inherited={};for(;i<l;++i){f=bases[i];m=f._meta;if(m){h=m.hidden;f=h.hasOwnProperty("constructor")&&h.constructor;}
if(f){f.apply(this,a);break;}}
f=this.postscript;if(f){f.apply(this,a);}};}
function chain(name,bases,reversed){return function(){var b,m,h,f,i=0,l=bases.length,step=1;if(reversed){i=l-1;step=l=-1;}
for(;i!=l;i+=step){f=0;b=bases[i];m=b._meta;if(m){h=m.hidden;f=h.hasOwnProperty(name)&&h[name];}else{f=b.prototype[name];}
if(f){f.apply(this,arguments);}}};}
d.declare=function(className,superclass,props){var proto,i,t,ctor,name,bases,mixins=1,chains={};if(typeof className!="string"){props=superclass;superclass=className;className="";}
props=props||{};if(d.isArray(superclass)){bases=c3mro(superclass);t=bases[0];mixins=bases.length-t;superclass=bases[mixins];}else{bases=[0];if(superclass){t=superclass._meta;bases=bases.concat(t?t.bases:superclass);}}
if(superclass){if(superclass._meta){xtor.prototype=superclass._meta.chains;chains=new xtor;}
for(i=mixins-1;;--i){xtor.prototype=superclass.prototype;proto=new xtor;if(!i){break;}
t=bases[i];if(t._meta){mix(chains,t._meta.chains);mix(proto,t._meta.hidden);}else{mix(proto,t.prototype);}
ctor=new Function;ctor.superclass=superclass;ctor.prototype=proto;superclass=proto.constructor=ctor;}}else{proto={};}
safeMixin(proto,props);t=props.constructor;if(t!==op.constructor){t.nom="constructor";proto.constructor=t;}
xtor.prototype=0;if(proto.hasOwnProperty("-chains-")){mix(chains,proto["-chains-"]);}
bases[0]=ctor=chains.constructor==="manual"?simpleConstructor(bases):chainedConstructor(bases,!chains.hasOwnProperty("constructor"));ctor._meta={bases:bases,hidden:props,chains:chains};ctor.superclass=superclass&&superclass.prototype;ctor.extend=extend;ctor.prototype=proto;proto.constructor=ctor;proto.getInherited=getInherited;proto.inherited=inherited;proto.isInstanceOf=isInstanceOf;if(className){proto.declaredClass=className;d.setObject(className,ctor);}
for(name in chains){if(proto[name]&&typeof chains[name]=="string"&&name!="constructor"){t=proto[name]=chain(name,bases,chains[name]==="after");t.nom=name;}}
return ctor;};d.safeMixin=safeMixin;})();
dojo.provide("dojo._base.connect");dojo.require("dojo._base.lang");dojo._listener={getDispatcher:function(){return function(){var ap=Array.prototype,c=arguments.callee,ls=c._listeners,t=c.target;var r=t&&t.apply(this,arguments);var lls;if(!dojo.isRhino){lls=[].concat(ls);}else{lls=[];for(var i in ls){lls[i]=ls[i];}}
for(var i in lls){if(!(i in ap)){lls[i].apply(this,arguments);}}
return r;}},add:function(source,method,listener){source=source||dojo.global;var f=source[method];if(!f||!f._listeners){var d=dojo._listener.getDispatcher();d.target=f;d._listeners=[];f=source[method]=d;}
return f._listeners.push(listener);},remove:function(source,method,handle){var f=(source||dojo.global)[method];if(f&&f._listeners&&handle--){delete f._listeners[handle];}}};dojo.connect=function(obj,event,context,method,dontFix){var a=arguments,args=[],i=0;args.push(dojo.isString(a[0])?null:a[i++],a[i++]);var a1=a[i+1];args.push(dojo.isString(a1)||dojo.isFunction(a1)?a[i++]:null,a[i++]);for(var l=a.length;i<l;i++){args.push(a[i]);}
return dojo._connect.apply(this,args);}
dojo._connect=function(obj,event,context,method){var l=dojo._listener,h=l.add(obj,event,dojo.hitch(context,method));return[obj,event,h,l];}
dojo.disconnect=function(handle){if(handle&&handle[0]!==undefined){dojo._disconnect.apply(this,handle);delete handle[0];}}
dojo._disconnect=function(obj,event,handle,listener){listener.remove(obj,event,handle);}
dojo._topics={};dojo.subscribe=function(topic,context,method){return[topic,dojo._listener.add(dojo._topics,topic,dojo.hitch(context,method))];}
dojo.unsubscribe=function(handle){if(handle){dojo._listener.remove(dojo._topics,handle[0],handle[1]);}}
dojo.publish=function(topic,args){var f=dojo._topics[topic];if(f){f.apply(this,args||[]);}}
dojo.connectPublisher=function(topic,obj,event){var pf=function(){dojo.publish(topic,arguments);}
return(event)?dojo.connect(obj,event,pf):dojo.connect(obj,pf);};
dojo.provide("dojo._base.Deferred");dojo.require("dojo._base.lang");dojo.Deferred=function(canceller){this.chain=[];this.id=this._nextId();this.fired=-1;this.paused=0;this.results=[null,null];this.canceller=canceller;this.silentlyCancelled=false;this.isFiring=false;};dojo.extend(dojo.Deferred,{_nextId:(function(){var n=1;return function(){return n++;};})(),cancel:function(){var err;if(this.fired==-1){if(this.canceller){err=this.canceller(this);}else{this.silentlyCancelled=true;}
if(this.fired==-1){if(!(err instanceof Error)){var res=err;var msg="Deferred Cancelled";if(err&&err.toString){msg+=": "+err.toString();}
err=new Error(msg);err.dojoType="cancel";err.cancelResult=res;}
this.errback(err);}}else if((this.fired==0)&&(this.results[0]instanceof dojo.Deferred)){this.results[0].cancel();}},_resback:function(res){this.fired=((res instanceof Error)?1:0);this.results[this.fired]=res;this._fire();},_check:function(){if(this.fired!=-1){if(!this.silentlyCancelled){throw new Error("already called!");}
this.silentlyCancelled=false;return;}},callback:function(res){this._check();this._resback(res);},errback:function(res){this._check();if(!(res instanceof Error)){res=new Error(res);}
this._resback(res);},addBoth:function(cb,cbfn){var enclosed=dojo.hitch.apply(dojo,arguments);return this.addCallbacks(enclosed,enclosed);},addCallback:function(cb,cbfn){return this.addCallbacks(dojo.hitch.apply(dojo,arguments));},addErrback:function(cb,cbfn){return this.addCallbacks(null,dojo.hitch.apply(dojo,arguments));},addCallbacks:function(cb,eb){this.chain.push([cb,eb])
if(this.fired>=0&&!this.isFiring){this._fire();}
return this;},_fire:function(){this.isFiring=true;var chain=this.chain;var fired=this.fired;var res=this.results[fired];var self=this;var cb=null;while((chain.length>0)&&(this.paused==0)){var f=chain.shift()[fired];if(!f){continue;}
var func=function(){var ret=f(res);if(typeof ret!="undefined"){res=ret;}
fired=((res instanceof Error)?1:0);if(res instanceof dojo.Deferred){cb=function(res){self._resback(res);self.paused--;if((self.paused==0)&&(self.fired>=0)){self._fire();}}
this.paused++;}};if(dojo.config.debugAtAllCosts){func.call(this);}else{try{func.call(this);}catch(err){fired=1;res=err;}}}
this.fired=fired;this.results[fired]=res;this.isFiring=false;if((cb)&&(this.paused)){res.addBoth(cb);}}});
dojo.provide("dojo._base.json");dojo.fromJson=function(json){return eval("("+json+")");}
dojo._escapeString=function(str){return('"'+str.replace(/(["\\])/g,'\\$1')+'"').replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r");}
dojo.toJsonIndentStr="\t";dojo.toJson=function(it,prettyPrint,_indentStr){if(it===undefined){return"undefined";}
var objtype=typeof it;if(objtype=="number"||objtype=="boolean"){return it+"";}
if(it===null){return"null";}
if(dojo.isString(it)){return dojo._escapeString(it);}
var recurse=arguments.callee;var newObj;_indentStr=_indentStr||"";var nextIndent=prettyPrint?_indentStr+dojo.toJsonIndentStr:"";var tf=it.__json__||it.json;if(dojo.isFunction(tf)){newObj=tf.call(it);if(it!==newObj){return recurse(newObj,prettyPrint,nextIndent);}}
if(it.nodeType&&it.cloneNode){throw new Error("Can't serialize DOM nodes");}
var sep=prettyPrint?" ":"";var newLine=prettyPrint?"\n":"";if(dojo.isArray(it)){var res=dojo.map(it,function(obj){var val=recurse(obj,prettyPrint,nextIndent);if(typeof val!="string"){val="undefined";}
return newLine+nextIndent+val;});return"["+res.join(","+sep)+newLine+_indentStr+"]";}
if(objtype=="function"){return null;}
var output=[],key;for(key in it){var keyStr,val;if(typeof key=="number"){keyStr='"'+key+'"';}else if(typeof key=="string"){keyStr=dojo._escapeString(key);}else{continue;}
val=recurse(it[key],prettyPrint,nextIndent);if(typeof val!="string"){continue;}
output.push(newLine+nextIndent+keyStr+":"+sep+val);}
return"{"+output.join(","+sep)+newLine+_indentStr+"}";}
dojo.provide("dojo._base.Color");dojo.require("dojo._base.array");dojo.require("dojo._base.lang");(function(){var d=dojo;dojo.Color=function(color){if(color){this.setColor(color);}};dojo.Color.named={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:d.config.transparentColor||[255,255,255]};dojo.extend(dojo.Color,{r:255,g:255,b:255,a:1,_set:function(r,g,b,a){var t=this;t.r=r;t.g=g;t.b=b;t.a=a;},setColor:function(color){if(d.isString(color)){d.colorFromString(color,this);}else if(d.isArray(color)){d.colorFromArray(color,this);}else{this._set(color.r,color.g,color.b,color.a);if(!(color instanceof d.Color)){this.sanitize();}}
return this;},sanitize:function(){return this;},toRgb:function(){var t=this;return[t.r,t.g,t.b];},toRgba:function(){var t=this;return[t.r,t.g,t.b,t.a];},toHex:function(){var arr=d.map(["r","g","b"],function(x){var s=this[x].toString(16);return s.length<2?"0"+s:s;},this);return"#"+arr.join("");},toCss:function(includeAlpha){var t=this,rgb=t.r+", "+t.g+", "+t.b;return(includeAlpha?"rgba("+rgb+", "+t.a:"rgb("+rgb)+")";},toString:function(){return this.toCss(true);}});dojo.blendColors=function(start,end,weight,obj){var t=obj||new d.Color();d.forEach(["r","g","b","a"],function(x){t[x]=start[x]+(end[x]-start[x])*weight;if(x!="a"){t[x]=Math.round(t[x]);}});return t.sanitize();};dojo.colorFromRgb=function(color,obj){var m=color.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);return m&&dojo.colorFromArray(m[1].split(/\s*,\s*/),obj);};dojo.colorFromHex=function(color,obj){var t=obj||new d.Color(),bits=(color.length==4)?4:8,mask=(1<<bits)-1;color=Number("0x"+color.substr(1));if(isNaN(color)){return null;}
d.forEach(["b","g","r"],function(x){var c=color&mask;color>>=bits;t[x]=bits==4?17*c:c;});t.a=1;return t;};dojo.colorFromArray=function(a,obj){var t=obj||new d.Color();t._set(Number(a[0]),Number(a[1]),Number(a[2]),Number(a[3]));if(isNaN(t.a)){t.a=1;}
return t.sanitize();};dojo.colorFromString=function(str,obj){var a=d.Color.named[str];return a&&d.colorFromArray(a,obj)||d.colorFromRgb(str,obj)||d.colorFromHex(str,obj);};})();
dojo.provide("dojo._base.window");dojo.doc=window["document"]||null;dojo.body=function(){return dojo.doc.body||dojo.doc.getElementsByTagName("body")[0];}
dojo.setContext=function(globalObject,globalDocument){dojo.global=globalObject;dojo.doc=globalDocument;};dojo.withGlobal=function(globalObject,callback,thisObject,cbArguments){var oldGlob=dojo.global;try{dojo.global=globalObject;return dojo.withDoc.call(null,globalObject.document,callback,thisObject,cbArguments);}finally{dojo.global=oldGlob;}}
dojo.withDoc=function(documentObject,callback,thisObject,cbArguments){var oldDoc=dojo.doc,oldLtr=dojo._bodyLtr,oldQ=dojo.isQuirks;try{dojo.doc=documentObject;delete dojo._bodyLtr;dojo.isQuirks=dojo.doc.compatMode=="BackCompat";if(thisObject&&typeof callback=="string"){callback=thisObject[callback];}
return callback.apply(thisObject,cbArguments||[]);}finally{dojo.doc=oldDoc;delete dojo._bodyLtr;if(oldLtr!==undefined){dojo._bodyLtr=oldLtr;}
dojo.isQuirks=oldQ;}};
dojo.provide("dojo._base.event");dojo.require("dojo._base.connect");(function(){var del=(dojo._event_listener={add:function(node,name,fp){if(!node){return;}
name=del._normalizeEventName(name);fp=del._fixCallback(name,fp);var oname=name;if(!dojo.isIE&&(name=="mouseenter"||name=="mouseleave")){var ofp=fp;name=(name=="mouseenter")?"mouseover":"mouseout";fp=function(e){if(!dojo.isDescendant(e.relatedTarget,node)){return ofp.call(this,e);}}}
node.addEventListener(name,fp,false);return fp;},remove:function(node,event,handle){if(node){event=del._normalizeEventName(event);if(!dojo.isIE&&(event=="mouseenter"||event=="mouseleave")){event=(event=="mouseenter")?"mouseover":"mouseout";}
node.removeEventListener(event,handle,false);}},_normalizeEventName:function(name){return name.slice(0,2)=="on"?name.slice(2):name;},_fixCallback:function(name,fp){return name!="keypress"?fp:function(e){return fp.call(this,del._fixEvent(e,this));};},_fixEvent:function(evt,sender){switch(evt.type){case"keypress":del._setKeyChar(evt);break;}
return evt;},_setKeyChar:function(evt){evt.keyChar=evt.charCode?String.fromCharCode(evt.charCode):'';evt.charOrCode=evt.keyChar||evt.keyCode;},_punctMap:{106:42,111:47,186:59,187:43,188:44,189:45,190:46,191:47,192:96,219:91,220:92,221:93,222:39}});dojo.fixEvent=function(evt,sender){return del._fixEvent(evt,sender);}
dojo.stopEvent=function(evt){evt.preventDefault();evt.stopPropagation();}
var node_listener=dojo._listener;dojo._connect=function(obj,event,context,method,dontFix){var isNode=obj&&(obj.nodeType||obj.attachEvent||obj.addEventListener);var lid=isNode?(dontFix?2:1):0,l=[dojo._listener,del,node_listener][lid];var h=l.add(obj,event,dojo.hitch(context,method));return[obj,event,h,lid];}
dojo._disconnect=function(obj,event,handle,listener){([dojo._listener,del,node_listener][listener]).remove(obj,event,handle);}
dojo.keys={BACKSPACE:8,TAB:9,CLEAR:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,META:dojo.isSafari?91:224,PAUSE:19,CAPS_LOCK:20,ESCAPE:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT_ARROW:37,UP_ARROW:38,RIGHT_ARROW:39,DOWN_ARROW:40,INSERT:45,DELETE:46,HELP:47,LEFT_WINDOW:91,RIGHT_WINDOW:92,SELECT:93,NUMPAD_0:96,NUMPAD_1:97,NUMPAD_2:98,NUMPAD_3:99,NUMPAD_4:100,NUMPAD_5:101,NUMPAD_6:102,NUMPAD_7:103,NUMPAD_8:104,NUMPAD_9:105,NUMPAD_MULTIPLY:106,NUMPAD_PLUS:107,NUMPAD_ENTER:108,NUMPAD_MINUS:109,NUMPAD_PERIOD:110,NUMPAD_DIVIDE:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,F13:124,F14:125,F15:126,NUM_LOCK:144,SCROLL_LOCK:145,copyKey:dojo.isMac&&!dojo.isAIR?(dojo.isSafari?91:224):17};var evtCopyKey=dojo.isMac?"metaKey":"ctrlKey";dojo.isCopyKey=function(e){return e[evtCopyKey];};if(dojo.isIE){dojo.mouseButtons={LEFT:1,MIDDLE:4,RIGHT:2,isButton:function(e,button){return e.button&button;},isLeft:function(e){return e.button&1;},isMiddle:function(e){return e.button&4;},isRight:function(e){return e.button&2;}};}else{dojo.mouseButtons={LEFT:0,MIDDLE:1,RIGHT:2,isButton:function(e,button){return e.button==button;},isLeft:function(e){return e.button==0;},isMiddle:function(e){return e.button==1;},isRight:function(e){return e.button==2;}};}
if(dojo.isIE){var _trySetKeyCode=function(e,code){try{return(e.keyCode=code);}catch(e){return 0;}}
var iel=dojo._listener;var listenersName=(dojo._ieListenersName="_"+dojo._scopeName+"_listeners");if(!dojo.config._allow_leaks){node_listener=iel=dojo._ie_listener={handlers:[],add:function(source,method,listener){source=source||dojo.global;var f=source[method];if(!f||!f[listenersName]){var d=dojo._getIeDispatcher();d.target=f&&(ieh.push(f)-1);d[listenersName]=[];f=source[method]=d;}
return f[listenersName].push(ieh.push(listener)-1);},remove:function(source,method,handle){var f=(source||dojo.global)[method],l=f&&f[listenersName];if(f&&l&&handle--){delete ieh[l[handle]];delete l[handle];}}};var ieh=iel.handlers;}
dojo.mixin(del,{add:function(node,event,fp){if(!node){return;}
event=del._normalizeEventName(event);if(event=="onkeypress"){var kd=node.onkeydown;if(!kd||!kd[listenersName]||!kd._stealthKeydownHandle){var h=del.add(node,"onkeydown",del._stealthKeyDown);kd=node.onkeydown;kd._stealthKeydownHandle=h;kd._stealthKeydownRefs=1;}else{kd._stealthKeydownRefs++;}}
return iel.add(node,event,del._fixCallback(fp));},remove:function(node,event,handle){event=del._normalizeEventName(event);iel.remove(node,event,handle);if(event=="onkeypress"){var kd=node.onkeydown;if(--kd._stealthKeydownRefs<=0){iel.remove(node,"onkeydown",kd._stealthKeydownHandle);delete kd._stealthKeydownHandle;}}},_normalizeEventName:function(eventName){return eventName.slice(0,2)!="on"?"on"+eventName:eventName;},_nop:function(){},_fixEvent:function(evt,sender){if(!evt){var w=sender&&(sender.ownerDocument||sender.document||sender).parentWindow||window;evt=w.event;}
if(!evt){return(evt);}
evt.target=evt.srcElement;evt.currentTarget=(sender||evt.srcElement);evt.layerX=evt.offsetX;evt.layerY=evt.offsetY;var se=evt.srcElement,doc=(se&&se.ownerDocument)||document;var docBody=((dojo.isIE<6)||(doc["compatMode"]=="BackCompat"))?doc.body:doc.documentElement;var offset=dojo._getIeDocumentElementOffset();evt.pageX=evt.clientX+dojo._fixIeBiDiScrollLeft(docBody.scrollLeft||0)-offset.x;evt.pageY=evt.clientY+(docBody.scrollTop||0)-offset.y;if(evt.type=="mouseover"){evt.relatedTarget=evt.fromElement;}
if(evt.type=="mouseout"){evt.relatedTarget=evt.toElement;}
evt.stopPropagation=del._stopPropagation;evt.preventDefault=del._preventDefault;return del._fixKeys(evt);},_fixKeys:function(evt){switch(evt.type){case"keypress":var c=("charCode"in evt?evt.charCode:evt.keyCode);if(c==10){c=0;evt.keyCode=13;}else if(c==13||c==27){c=0;}else if(c==3){c=99;}
evt.charCode=c;del._setKeyChar(evt);break;}
return evt;},_stealthKeyDown:function(evt){var kp=evt.currentTarget.onkeypress;if(!kp||!kp[listenersName]){return;}
var k=evt.keyCode;var unprintable=k!=13&&k!=32&&k!=27&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(unprintable||evt.ctrlKey){var c=unprintable?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else if(c>95&&c<106){c-=48;}else if((!evt.shiftKey)&&(c>=65&&c<=90)){c+=32;}else{c=del._punctMap[c]||c;}}
var faux=del._synthesizeEvent(evt,{type:'keypress',faux:true,charCode:c});kp.call(evt.currentTarget,faux);evt.cancelBubble=faux.cancelBubble;evt.returnValue=faux.returnValue;_trySetKeyCode(evt,faux.keyCode);}},_stopPropagation:function(){this.cancelBubble=true;},_preventDefault:function(){this.bubbledKeyCode=this.keyCode;if(this.ctrlKey){_trySetKeyCode(this,0);}
this.returnValue=false;}});dojo.stopEvent=function(evt){evt=evt||window.event;del._stopPropagation.call(evt);del._preventDefault.call(evt);}}
del._synthesizeEvent=function(evt,props){var faux=dojo.mixin({},evt,props);del._setKeyChar(faux);faux.preventDefault=function(){evt.preventDefault();};faux.stopPropagation=function(){evt.stopPropagation();};return faux;}
if(dojo.isOpera){dojo.mixin(del,{_fixEvent:function(evt,sender){switch(evt.type){case"keypress":var c=evt.which;if(c==3){c=99;}
c=c<41&&!evt.shiftKey?0:c;if(evt.ctrlKey&&!evt.shiftKey&&c>=65&&c<=90){c+=32;}
return del._synthesizeEvent(evt,{charCode:c});}
return evt;}});}
if(dojo.isWebKit){del._add=del.add;del._remove=del.remove;dojo.mixin(del,{add:function(node,event,fp){if(!node){return;}
var handle=del._add(node,event,fp);if(del._normalizeEventName(event)=="keypress"){handle._stealthKeyDownHandle=del._add(node,"keydown",function(evt){var k=evt.keyCode;var unprintable=k!=13&&k!=32&&(k<48||k>90)&&(k<96||k>111)&&(k<186||k>192)&&(k<219||k>222);if(unprintable||evt.ctrlKey){var c=unprintable?0:k;if(evt.ctrlKey){if(k==3||k==13){return;}else if(c>95&&c<106){c-=48;}else if(!evt.shiftKey&&c>=65&&c<=90){c+=32;}else{c=del._punctMap[c]||c;}}
var faux=del._synthesizeEvent(evt,{type:'keypress',faux:true,charCode:c});fp.call(evt.currentTarget,faux);}});}
return handle;},remove:function(node,event,handle){if(node){if(handle._stealthKeyDownHandle){del._remove(node,"keydown",handle._stealthKeyDownHandle);}
del._remove(node,event,handle);}},_fixEvent:function(evt,sender){switch(evt.type){case"keypress":if(evt.faux){return evt;}
var c=evt.charCode;c=c>=32?c:0;return del._synthesizeEvent(evt,{charCode:c,faux:true});}
return evt;}});}})();if(dojo.isIE){dojo._ieDispatcher=function(args,sender){var ap=Array.prototype,h=dojo._ie_listener.handlers,c=args.callee,ls=c[dojo._ieListenersName],t=h[c.target];var r=t&&t.apply(sender,args);var lls=[].concat(ls);for(var i in lls){var f=h[lls[i]];if(!(i in ap)&&f){f.apply(sender,args);}}
return r;}
dojo._getIeDispatcher=function(){return new Function(dojo._scopeName+"._ieDispatcher(arguments, this)");}
dojo._event_listener._fixCallback=function(fp){var f=dojo._event_listener._fixEvent;return function(e){return fp.call(this,f(e,this));};}}
dojo.require("dojo._base.lang");dojo.provide("dojo._base.html");try{document.execCommand("BackgroundImageCache",false,true);}catch(e){}
if(dojo.isIE||dojo.isOpera){dojo.byId=function(id,doc){if(typeof id!="string"){return id;}
var _d=doc||dojo.doc,te=_d.getElementById(id);if(te&&(te.attributes.id.value==id||te.id==id)){return te;}else{var eles=_d.all[id];if(!eles||eles.nodeName){eles=[eles];}
var i=0;while((te=eles[i++])){if((te.attributes&&te.attributes.id&&te.attributes.id.value==id)||te.id==id){return te;}}}};}else{dojo.byId=function(id,doc){return(typeof id=="string")?(doc||dojo.doc).getElementById(id):id;};}
(function(){var d=dojo;var byId=d.byId;var _destroyContainer=null,_destroyDoc;d.addOnWindowUnload(function(){_destroyContainer=null;});dojo._destroyElement=dojo.destroy=function(node){node=byId(node);try{var doc=node.ownerDocument;if(!_destroyContainer||_destroyDoc!=doc){_destroyContainer=doc.createElement("div");_destroyDoc=doc;}
_destroyContainer.appendChild(node.parentNode?node.parentNode.removeChild(node):node);_destroyContainer.innerHTML="";}catch(e){}};dojo.isDescendant=function(node,ancestor){try{node=byId(node);ancestor=byId(ancestor);while(node){if(node==ancestor){return true;}
node=node.parentNode;}}catch(e){}
return false;};dojo.setSelectable=function(node,selectable){node=byId(node);if(d.isMozilla){node.style.MozUserSelect=selectable?"":"none";}else if(d.isKhtml||d.isWebKit){node.style.KhtmlUserSelect=selectable?"auto":"none";}else if(d.isIE){var v=(node.unselectable=selectable?"":"on");d.query("*",node).forEach("item.unselectable = '"+v+"'");}};var _insertBefore=function(node,ref){var parent=ref.parentNode;if(parent){parent.insertBefore(node,ref);}};var _insertAfter=function(node,ref){var parent=ref.parentNode;if(parent){if(parent.lastChild==ref){parent.appendChild(node);}else{parent.insertBefore(node,ref.nextSibling);}}};dojo.place=function(node,refNode,position){refNode=byId(refNode);if(typeof node=="string"){node=node.charAt(0)=="<"?d._toDom(node,refNode.ownerDocument):byId(node);}
if(typeof position=="number"){var cn=refNode.childNodes;if(!cn.length||cn.length<=position){refNode.appendChild(node);}else{_insertBefore(node,cn[position<0?0:position]);}}else{switch(position){case"before":_insertBefore(node,refNode);break;case"after":_insertAfter(node,refNode);break;case"replace":refNode.parentNode.replaceChild(node,refNode);break;case"only":d.empty(refNode);refNode.appendChild(node);break;case"first":if(refNode.firstChild){_insertBefore(node,refNode.firstChild);break;}
default:refNode.appendChild(node);}}
return node;}
dojo.boxModel="content-box";if(d.isIE){d.boxModel=document.compatMode=="BackCompat"?"border-box":"content-box";}
var gcs;if(d.isWebKit){gcs=function(node){var s;if(node.nodeType==1){var dv=node.ownerDocument.defaultView;s=dv.getComputedStyle(node,null);if(!s&&node.style){node.style.display="";s=dv.getComputedStyle(node,null);}}
return s||{};};}else if(d.isIE){gcs=function(node){return node.nodeType==1?node.currentStyle:{};};}else{gcs=function(node){return node.nodeType==1?node.ownerDocument.defaultView.getComputedStyle(node,null):{};};}
dojo.getComputedStyle=gcs;if(!d.isIE){d._toPixelValue=function(element,value){return parseFloat(value)||0;};}else{d._toPixelValue=function(element,avalue){if(!avalue){return 0;}
if(avalue=="medium"){return 4;}
if(avalue.slice&&avalue.slice(-2)=='px'){return parseFloat(avalue);}
with(element){var sLeft=style.left;var rsLeft=runtimeStyle.left;runtimeStyle.left=currentStyle.left;try{style.left=avalue;avalue=style.pixelLeft;}catch(e){avalue=0;}
style.left=sLeft;runtimeStyle.left=rsLeft;}
return avalue;}}
var px=d._toPixelValue;var astr="DXImageTransform.Microsoft.Alpha";var af=function(n,f){try{return n.filters.item(astr);}catch(e){return f?{}:null;}};dojo._getOpacity=d.isIE?function(node){try{return af(node).Opacity/100;}catch(e){return 1;}}:function(node){return gcs(node).opacity;};dojo._setOpacity=d.isIE?function(node,opacity){var ov=opacity*100;node.style.zoom=1.0;af(node,1).Enabled=!(opacity==1);if(!af(node)){node.style.filter+=" progid:"+astr+"(Opacity="+ov+")";}else{af(node,1).Opacity=ov;}
if(node.nodeName.toLowerCase()=="tr"){d.query("> td",node).forEach(function(i){d._setOpacity(i,opacity);});}
return opacity;}:function(node,opacity){return node.style.opacity=opacity;};var _pixelNamesCache={left:true,top:true};var _pixelRegExp=/margin|padding|width|height|max|min|offset/;var _toStyleValue=function(node,type,value){type=type.toLowerCase();if(d.isIE){if(value=="auto"){if(type=="height"){return node.offsetHeight;}
if(type=="width"){return node.offsetWidth;}}
if(type=="fontweight"){switch(value){case 700:return"bold";case 400:default:return"normal";}}}
if(!(type in _pixelNamesCache)){_pixelNamesCache[type]=_pixelRegExp.test(type);}
return _pixelNamesCache[type]?px(node,value):value;};var _floatStyle=d.isIE?"styleFloat":"cssFloat",_floatAliases={"cssFloat":_floatStyle,"styleFloat":_floatStyle,"float":_floatStyle};dojo.style=function(node,style,value){var n=byId(node),args=arguments.length,op=(style=="opacity");style=_floatAliases[style]||style;if(args==3){return op?d._setOpacity(n,value):n.style[style]=value;}
if(args==2&&op){return d._getOpacity(n);}
var s=gcs(n);if(args==2&&typeof style!="string"){for(var x in style){d.style(node,x,style[x]);}
return s;}
return(args==1)?s:_toStyleValue(n,style,s[style]||n.style[style]);}
dojo._getPadExtents=function(n,computedStyle){var
s=computedStyle||gcs(n),l=px(n,s.paddingLeft),t=px(n,s.paddingTop);return{l:l,t:t,w:l+px(n,s.paddingRight),h:t+px(n,s.paddingBottom)};}
dojo._getBorderExtents=function(n,computedStyle){var
ne="none",s=computedStyle||gcs(n),bl=(s.borderLeftStyle!=ne?px(n,s.borderLeftWidth):0),bt=(s.borderTopStyle!=ne?px(n,s.borderTopWidth):0);return{l:bl,t:bt,w:bl+(s.borderRightStyle!=ne?px(n,s.borderRightWidth):0),h:bt+(s.borderBottomStyle!=ne?px(n,s.borderBottomWidth):0)};}
dojo._getPadBorderExtents=function(n,computedStyle){var
s=computedStyle||gcs(n),p=d._getPadExtents(n,s),b=d._getBorderExtents(n,s);return{l:p.l+b.l,t:p.t+b.t,w:p.w+b.w,h:p.h+b.h};}
dojo._getMarginExtents=function(n,computedStyle){var
s=computedStyle||gcs(n),l=px(n,s.marginLeft),t=px(n,s.marginTop),r=px(n,s.marginRight),b=px(n,s.marginBottom);if(d.isWebKit&&(s.position!="absolute")){r=l;}
return{l:l,t:t,w:l+r,h:t+b};}
dojo._getMarginBox=function(node,computedStyle){var s=computedStyle||gcs(node),me=d._getMarginExtents(node,s);var l=node.offsetLeft-me.l,t=node.offsetTop-me.t,p=node.parentNode;if(d.isMoz){var sl=parseFloat(s.left),st=parseFloat(s.top);if(!isNaN(sl)&&!isNaN(st)){l=sl,t=st;}else{if(p&&p.style){var pcs=gcs(p);if(pcs.overflow!="visible"){var be=d._getBorderExtents(p,pcs);l+=be.l,t+=be.t;}}}}else if(d.isOpera||(d.isIE>7&&!d.isQuirks)){if(p){be=d._getBorderExtents(p);l-=be.l;t-=be.t;}}
return{l:l,t:t,w:node.offsetWidth+me.w,h:node.offsetHeight+me.h};}
dojo._getContentBox=function(node,computedStyle){var s=computedStyle||gcs(node),pe=d._getPadExtents(node,s),be=d._getBorderExtents(node,s),w=node.clientWidth,h;if(!w){w=node.offsetWidth,h=node.offsetHeight;}else{h=node.clientHeight,be.w=be.h=0;}
if(d.isOpera){pe.l+=be.l;pe.t+=be.t;};return{l:pe.l,t:pe.t,w:w-pe.w-be.w,h:h-pe.h-be.h};}
dojo._getBorderBox=function(node,computedStyle){var s=computedStyle||gcs(node),pe=d._getPadExtents(node,s),cb=d._getContentBox(node,s);return{l:cb.l-pe.l,t:cb.t-pe.t,w:cb.w+pe.w,h:cb.h+pe.h};}
dojo._setBox=function(node,l,t,w,h,u){u=u||"px";var s=node.style;if(!isNaN(l)){s.left=l+u;}
if(!isNaN(t)){s.top=t+u;}
if(w>=0){s.width=w+u;}
if(h>=0){s.height=h+u;}}
dojo._isButtonTag=function(node){return node.tagName=="BUTTON"||node.tagName=="INPUT"&&(node.getAttribute("type")||'').toUpperCase()=="BUTTON";}
dojo._usesBorderBox=function(node){var n=node.tagName;return d.boxModel=="border-box"||n=="TABLE"||d._isButtonTag(node);}
dojo._setContentSize=function(node,widthPx,heightPx,computedStyle){if(d._usesBorderBox(node)){var pb=d._getPadBorderExtents(node,computedStyle);if(widthPx>=0){widthPx+=pb.w;}
if(heightPx>=0){heightPx+=pb.h;}}
d._setBox(node,NaN,NaN,widthPx,heightPx);}
dojo._setMarginBox=function(node,leftPx,topPx,widthPx,heightPx,computedStyle){var s=computedStyle||gcs(node),bb=d._usesBorderBox(node),pb=bb?_nilExtents:d._getPadBorderExtents(node,s);if(d.isWebKit){if(d._isButtonTag(node)){var ns=node.style;if(widthPx>=0&&!ns.width){ns.width="4px";}
if(heightPx>=0&&!ns.height){ns.height="4px";}}}
var mb=d._getMarginExtents(node,s);if(widthPx>=0){widthPx=Math.max(widthPx-pb.w-mb.w,0);}
if(heightPx>=0){heightPx=Math.max(heightPx-pb.h-mb.h,0);}
d._setBox(node,leftPx,topPx,widthPx,heightPx);}
var _nilExtents={l:0,t:0,w:0,h:0};dojo.marginBox=function(node,box){var n=byId(node),s=gcs(n),b=box;return!b?d._getMarginBox(n,s):d._setMarginBox(n,b.l,b.t,b.w,b.h,s);}
dojo.contentBox=function(node,box){var n=byId(node),s=gcs(n),b=box;return!b?d._getContentBox(n,s):d._setContentSize(n,b.w,b.h,s);}
var _sumAncestorProperties=function(node,prop){if(!(node=(node||0).parentNode)){return 0}
var val,retVal=0,_b=d.body();while(node&&node.style){if(gcs(node).position=="fixed"){return 0;}
val=node[prop];if(val){retVal+=val-0;if(node==_b){break;}}
node=node.parentNode;}
return retVal;}
dojo._docScroll=function(){var n=d.global;return"pageXOffset"in n?{x:n.pageXOffset,y:n.pageYOffset}:(n=d.doc.documentElement,n.clientHeight?{x:d._fixIeBiDiScrollLeft(n.scrollLeft),y:n.scrollTop}:(n=d.body(),{x:n.scrollLeft||0,y:n.scrollTop||0}));};dojo._isBodyLtr=function(){return"_bodyLtr"in d?d._bodyLtr:d._bodyLtr=(d.body().dir||d.doc.documentElement.dir||"ltr").toLowerCase()=="ltr";}
dojo._getIeDocumentElementOffset=function(){var de=d.doc.documentElement;if(d.isIE<8){var r=de.getBoundingClientRect();var l=r.left,t=r.top;if(d.isIE<7){l+=de.clientLeft;t+=de.clientTop;}
return{x:l<0?0:l,y:t<0?0:t};}else{return{x:0,y:0};}};dojo._fixIeBiDiScrollLeft=function(scrollLeft){var dd=d.doc;if(d.isIE<8&&!d._isBodyLtr()){var de=d.isQuirks?dd.body:dd.documentElement;return scrollLeft+de.clientWidth-de.scrollWidth;}
return scrollLeft;}
dojo._abs=dojo.position=function(node,includeScroll){var db=d.body(),dh=db.parentNode,ret;node=byId(node);if(node["getBoundingClientRect"]){ret=node.getBoundingClientRect();ret={x:ret.left,y:ret.top,w:ret.right-ret.left,h:ret.bottom-ret.top};if(d.isIE){var offset=d._getIeDocumentElementOffset();ret.x-=offset.x+(d.isQuirks?db.clientLeft+db.offsetLeft:0);ret.y-=offset.y+(d.isQuirks?db.clientTop+db.offsetTop:0);}else if(d.isFF==3){var cs=gcs(dh);ret.x-=px(dh,cs.marginLeft)+px(dh,cs.borderLeftWidth);ret.y-=px(dh,cs.marginTop)+px(dh,cs.borderTopWidth);}}else{ret={x:0,y:0,w:node.offsetWidth,h:node.offsetHeight};if(node["offsetParent"]){ret.x-=_sumAncestorProperties(node,"scrollLeft");ret.y-=_sumAncestorProperties(node,"scrollTop");var curnode=node;do{var n=curnode.offsetLeft,t=curnode.offsetTop;ret.x+=isNaN(n)?0:n;ret.y+=isNaN(t)?0:t;cs=gcs(curnode);if(curnode!=node){if(d.isMoz){ret.x+=2*px(curnode,cs.borderLeftWidth);ret.y+=2*px(curnode,cs.borderTopWidth);}else{ret.x+=px(curnode,cs.borderLeftWidth);ret.y+=px(curnode,cs.borderTopWidth);}}
if(d.isMoz&&cs.position=="static"){var parent=curnode.parentNode;while(parent!=curnode.offsetParent){var pcs=gcs(parent);if(pcs.position=="static"){ret.x+=px(curnode,pcs.borderLeftWidth);ret.y+=px(curnode,pcs.borderTopWidth);}
parent=parent.parentNode;}}
curnode=curnode.offsetParent;}while((curnode!=dh)&&curnode);}else if(node.x&&node.y){ret.x+=isNaN(node.x)?0:node.x;ret.y+=isNaN(node.y)?0:node.y;}}
if(includeScroll){var scroll=d._docScroll();ret.x+=scroll.x;ret.y+=scroll.y;}
return ret;}
dojo.coords=function(node,includeScroll){var n=byId(node),s=gcs(n),mb=d._getMarginBox(n,s);var abs=d.position(n,includeScroll);mb.x=abs.x;mb.y=abs.y;return mb;}
var _propNames={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"},_attrNames={classname:"class",htmlfor:"for",tabindex:"tabIndex",readonly:"readOnly"},_forcePropNames={innerHTML:1,className:1,htmlFor:d.isIE,value:1};var _fixAttrName=function(name){return _attrNames[name.toLowerCase()]||name;};var _hasAttr=function(node,name){var attr=node.getAttributeNode&&node.getAttributeNode(name);return attr&&attr.specified;};dojo.hasAttr=function(node,name){var lc=name.toLowerCase();return _forcePropNames[_propNames[lc]||name]||_hasAttr(byId(node),_attrNames[lc]||name);}
var _evtHdlrMap={},_ctr=0,_attrId=dojo._scopeName+"attrid",_roInnerHtml={col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1};dojo.attr=function(node,name,value){node=byId(node);var args=arguments.length,prop;if(args==2&&typeof name!="string"){for(var x in name){d.attr(node,x,name[x]);}
return node;}
var lc=name.toLowerCase(),propName=_propNames[lc]||name,forceProp=_forcePropNames[propName],attrName=_attrNames[lc]||name;if(args==3){do{if(propName=="style"&&typeof value!="string"){d.style(node,value);break;}
if(propName=="innerHTML"){if(d.isIE&&node.tagName.toLowerCase()in _roInnerHtml){d.empty(node);node.appendChild(d._toDom(value,node.ownerDocument));}else{node[propName]=value;}
break;}
if(d.isFunction(value)){var attrId=d.attr(node,_attrId);if(!attrId){attrId=_ctr++;d.attr(node,_attrId,attrId);}
if(!_evtHdlrMap[attrId]){_evtHdlrMap[attrId]={};}
var h=_evtHdlrMap[attrId][propName];if(h){d.disconnect(h);}else{try{delete node[propName];}catch(e){}}
_evtHdlrMap[attrId][propName]=d.connect(node,propName,value);break;}
if(forceProp||typeof value=="boolean"){node[propName]=value;break;}
node.setAttribute(attrName,value);}while(false);return node;}
value=node[propName];if(forceProp&&typeof value!="undefined"){return value;}
if(propName!="href"&&(typeof value=="boolean"||d.isFunction(value))){return value;}
return _hasAttr(node,attrName)?node.getAttribute(attrName):null;}
dojo.removeAttr=function(node,name){byId(node).removeAttribute(_fixAttrName(name));}
dojo.getEffectiveAttrValue=function(node,name){node=byId(node);var lc=name.toLowerCase(),propName=_propNames[lc]||name;if((propName in node)&&propName!="href"){return node[propName];}
var attrName=_attrNames[lc]||name;return _hasAttr(node,attrName)?node.getAttribute(attrName):null;}
dojo.create=function(tag,attrs,refNode,pos){var doc=d.doc;if(refNode){refNode=byId(refNode);doc=refNode.ownerDocument;}
if(typeof tag=="string"){tag=doc.createElement(tag);}
if(attrs){d.attr(tag,attrs);}
if(refNode){d.place(tag,refNode,pos);}
return tag;}
d.empty=d.isIE?function(node){node=byId(node);for(var c;c=node.lastChild;){d.destroy(c);}}:function(node){byId(node).innerHTML="";};var tagWrap={option:["select"],tbody:["table"],thead:["table"],tfoot:["table"],tr:["table","tbody"],td:["table","tbody","tr"],th:["table","thead","tr"],legend:["fieldset"],caption:["table"],colgroup:["table"],col:["table","colgroup"],li:["ul"]},reTag=/<\s*([\w\:]+)/,masterNode={},masterNum=0,masterName="__"+d._scopeName+"ToDomId";for(var param in tagWrap){var tw=tagWrap[param];tw.pre=param=="option"?'<select multiple="multiple">':"<"+tw.join("><")+">";tw.post="</"+tw.reverse().join("></")+">";}
d._toDom=function(frag,doc){doc=doc||d.doc;var masterId=doc[masterName];if(!masterId){doc[masterName]=masterId=++masterNum+"";masterNode[masterId]=doc.createElement("div");}
frag+="";var match=frag.match(reTag),tag=match?match[1].toLowerCase():"",master=masterNode[masterId],wrap,i,fc,df;if(match&&tagWrap[tag]){wrap=tagWrap[tag];master.innerHTML=wrap.pre+frag+wrap.post;for(i=wrap.length;i;--i){master=master.firstChild;}}else{master.innerHTML=frag;}
if(master.childNodes.length==1){return master.removeChild(master.firstChild);}
df=doc.createDocumentFragment();while(fc=master.firstChild){df.appendChild(fc);}
return df;}
var _className="className";dojo.hasClass=function(node,classStr){return((" "+byId(node)[_className]+" ").indexOf(" "+classStr+" ")>=0);};var spaces=/\s+/,a1=[""],str2array=function(s){if(typeof s=="string"||s instanceof String){if(s.indexOf(" ")<0){a1[0]=s;return a1;}else{return s.split(spaces);}}
return s;};dojo.addClass=function(node,classStr){node=byId(node);classStr=str2array(classStr);var cls=" "+node[_className]+" ";for(var i=0,len=classStr.length,c;i<len;++i){c=classStr[i];if(c&&cls.indexOf(" "+c+" ")<0){cls+=c+" ";}}
node[_className]=d.trim(cls);};dojo.removeClass=function(node,classStr){node=byId(node);var cls;if(classStr!==undefined){classStr=str2array(classStr);cls=" "+node[_className]+" ";for(var i=0,len=classStr.length;i<len;++i){cls=cls.replace(" "+classStr[i]+" "," ");}
cls=d.trim(cls);}else{cls="";}
if(node[_className]!=cls){node[_className]=cls;}};dojo.toggleClass=function(node,classStr,condition){if(condition===undefined){condition=!d.hasClass(node,classStr);}
d[condition?"addClass":"removeClass"](node,classStr);};})();
dojo.provide("dojo._base.NodeList");dojo.require("dojo._base.lang");dojo.require("dojo._base.array");(function(){var d=dojo;var ap=Array.prototype,aps=ap.slice,apc=ap.concat;var tnl=function(a,parent,NodeListCtor){if(!a.sort){a=aps.call(a,0);}
var ctor=NodeListCtor||this._NodeListCtor||d._NodeListCtor;a.constructor=ctor;dojo._mixin(a,ctor.prototype);a._NodeListCtor=ctor;return parent?a._stash(parent):a;};var loopBody=function(f,a,o){a=[0].concat(aps.call(a,0));o=o||d.global;return function(node){a[0]=node;return f.apply(o,a);};};var adaptAsForEach=function(f,o){return function(){this.forEach(loopBody(f,arguments,o));return this;};};var adaptAsMap=function(f,o){return function(){return this.map(loopBody(f,arguments,o));};};var adaptAsFilter=function(f,o){return function(){return this.filter(loopBody(f,arguments,o));};};var adaptWithCondition=function(f,g,o){return function(){var a=arguments,body=loopBody(f,a,o);if(g.call(o||d.global,a)){return this.map(body);}
this.forEach(body);return this;};};var magicGuard=function(a){return a.length==1&&(typeof a[0]=="string");};var orphan=function(node){var p=node.parentNode;if(p){p.removeChild(node);}};dojo.NodeList=function(){return tnl(Array.apply(null,arguments));};d._NodeListCtor=d.NodeList;var nl=d.NodeList,nlp=nl.prototype;nl._wrap=nlp._wrap=tnl;nl._adaptAsMap=adaptAsMap;nl._adaptAsForEach=adaptAsForEach;nl._adaptAsFilter=adaptAsFilter;nl._adaptWithCondition=adaptWithCondition;d.forEach(["slice","splice"],function(name){var f=ap[name];nlp[name]=function(){return this._wrap(f.apply(this,arguments),name=="slice"?this:null);};});d.forEach(["indexOf","lastIndexOf","every","some"],function(name){var f=d[name];nlp[name]=function(){return f.apply(d,[this].concat(aps.call(arguments,0)));};});d.forEach(["attr","style"],function(name){nlp[name]=adaptWithCondition(d[name],magicGuard);});d.forEach(["connect","addClass","removeClass","toggleClass","empty","removeAttr"],function(name){nlp[name]=adaptAsForEach(d[name]);});dojo.extend(dojo.NodeList,{_normalize:function(content,refNode){var parse=content.parse===true?true:false;if(typeof content.template=="string"){var templateFunc=content.templateFunc||(dojo.string&&dojo.string.substitute);content=templateFunc?templateFunc(content.template,content):content;}
var type=(typeof content);if(type=="string"||type=="number"){content=dojo._toDom(content,(refNode&&refNode.ownerDocument));if(content.nodeType==11){content=dojo._toArray(content.childNodes);}else{content=[content];}}else if(!dojo.isArrayLike(content)){content=[content];}else if(!dojo.isArray(content)){content=dojo._toArray(content);}
if(parse){content._runParse=true;}
return content;},_cloneNode:function(node){return node.cloneNode(true);},_place:function(ary,refNode,position,useClone){if(refNode.nodeType!=1&&position=="only"){return;}
var rNode=refNode,tempNode;var length=ary.length;for(var i=length-1;i>=0;i--){var node=(useClone?this._cloneNode(ary[i]):ary[i]);if(ary._runParse&&dojo.parser&&dojo.parser.parse){if(!tempNode){tempNode=rNode.ownerDocument.createElement("div");}
tempNode.appendChild(node);dojo.parser.parse(tempNode);node=tempNode.firstChild;while(tempNode.firstChild){tempNode.removeChild(tempNode.firstChild);}}
if(i==length-1){dojo.place(node,rNode,position);}else{rNode.parentNode.insertBefore(node,rNode);}
rNode=node;}},_stash:function(parent){this._parent=parent;return this;},end:function(){if(this._parent){return this._parent;}else{return new this._NodeListCtor();}},concat:function(item){var t=d.isArray(this)?this:aps.call(this,0),m=d.map(arguments,function(a){return a&&!d.isArray(a)&&(a.constructor===NodeList||a.constructor==this._NodeListCtor)?aps.call(a,0):a;});return this._wrap(apc.apply(t,m),this);},map:function(func,obj){return this._wrap(d.map(this,func,obj),this);},forEach:function(callback,thisObj){d.forEach(this,callback,thisObj);return this;},coords:adaptAsMap(d.coords),position:adaptAsMap(d.position),place:function(queryOrNode,position){var item=d.query(queryOrNode)[0];return this.forEach(function(node){d.place(node,item,position);});},orphan:function(simpleFilter){return(simpleFilter?d._filterQueryResult(this,simpleFilter):this).forEach(orphan);},adopt:function(queryOrListOrNode,position){return d.query(queryOrListOrNode).place(this[0],position)._stash(this);},query:function(queryStr){if(!queryStr){return this;}
var ret=this.map(function(node){return d.query(queryStr,node).filter(function(subNode){return subNode!==undefined;});});return this._wrap(apc.apply([],ret),this);},filter:function(simpleFilter){var a=arguments,items=this,start=0;if(typeof simpleFilter=="string"){items=d._filterQueryResult(this,a[0]);if(a.length==1){return items._stash(this);}
start=1;}
return this._wrap(d.filter(items,a[start],a[start+1]),this);},addContent:function(content,position){content=this._normalize(content,this[0]);for(var i=0,node;node=this[i];i++){this._place(content,node,position,i>0);}
return this;},instantiate:function(declaredClass,properties){var c=d.isFunction(declaredClass)?declaredClass:d.getObject(declaredClass);properties=properties||{};return this.forEach(function(node){new c(properties,node);});},at:function(){var t=new this._NodeListCtor();d.forEach(arguments,function(i){if(this[i]){t.push(this[i]);}},this);return t._stash(this);}});nl.events=["blur","focus","change","click","error","keydown","keypress","keyup","load","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","submit"];d.forEach(nl.events,function(evt){var _oe="on"+evt;nlp[_oe]=function(a,b){return this.connect(_oe,a,b);}});})();
if(typeof dojo!="undefined"){dojo.provide("dojo._base.query");dojo.require("dojo._base.NodeList");dojo.require("dojo._base.lang");}else if(!this["acme"]&&!this["queryPortability"]){(function(){acme={trim:function(str){str=str.replace(/^\s+/,'');for(var i=str.length-1;i>=0;i--){if(/\S/.test(str.charAt(i))){str=str.substring(0,i+1);break;}}
return str;},forEach:function(arr,callback,thisObject){if(!arr||!arr.length){return;}
for(var i=0,l=arr.length;i<l;++i){callback.call(thisObject||window,arr[i],i,arr);}},byId:function(id,doc){if(typeof id=="string"){return(doc||document).getElementById(id);}else{return id;}},doc:document,NodeList:Array};var n=navigator;var dua=n.userAgent;var dav=n.appVersion;var tv=parseFloat(dav);acme.isOpera=(dua.indexOf("Opera")>=0)?tv:undefined;acme.isKhtml=(dav.indexOf("Konqueror")>=0)?tv:undefined;acme.isWebKit=parseFloat(dua.split("WebKit/")[1])||undefined;acme.isChrome=parseFloat(dua.split("Chrome/")[1])||undefined;var index=Math.max(dav.indexOf("WebKit"),dav.indexOf("Safari"),0);if(index&&!acme.isChrome){acme.isSafari=parseFloat(dav.split("Version/")[1]);if(!acme.isSafari||parseFloat(dav.substr(index+7))<=419.3){acme.isSafari=2;}}
if(document.all&&!acme.isOpera){acme.isIE=parseFloat(dav.split("MSIE ")[1])||undefined;}
Array._wrap=function(arr){return arr;};})();};(function(d){var trim=d.trim;var each=d.forEach;var qlc=d._NodeListCtor=d.NodeList;var getDoc=function(){return d.doc;};var cssCaseBug=((d.isWebKit||d.isMozilla)&&((getDoc().compatMode)=="BackCompat"));var childNodesName=!!getDoc().firstChild["children"]?"children":"childNodes";var specials=">~+";var caseSensitive=false;var yesman=function(){return true;};var getQueryParts=function(query){if(specials.indexOf(query.slice(-1))>=0){query+=" * "}else{query+=" ";}
var ts=function(s,e){return trim(query.slice(s,e));}
var queryParts=[];var inBrackets=-1,inParens=-1,inMatchFor=-1,inPseudo=-1,inClass=-1,inId=-1,inTag=-1,lc="",cc="",pStart;var x=0,ql=query.length,currentPart=null,_cp=null;var endTag=function(){if(inTag>=0){var tv=(inTag==x)?null:ts(inTag,x);currentPart[(specials.indexOf(tv)<0)?"tag":"oper"]=tv;inTag=-1;}}
var endId=function(){if(inId>=0){currentPart.id=ts(inId,x).replace(/\\/g,"");inId=-1;}}
var endClass=function(){if(inClass>=0){currentPart.classes.push(ts(inClass+1,x).replace(/\\/g,""));inClass=-1;}}
var endAll=function(){endId();endTag();endClass();}
var endPart=function(){endAll();if(inPseudo>=0){currentPart.pseudos.push({name:ts(inPseudo+1,x)});}
currentPart.loops=(currentPart.pseudos.length||currentPart.attrs.length||currentPart.classes.length);currentPart.oquery=currentPart.query=ts(pStart,x);currentPart.otag=currentPart.tag=(currentPart["oper"])?null:(currentPart.tag||"*");if(currentPart.tag){currentPart.tag=currentPart.tag.toUpperCase();}
if(queryParts.length&&(queryParts[queryParts.length-1].oper)){currentPart.infixOper=queryParts.pop();currentPart.query=currentPart.infixOper.query+" "+currentPart.query;}
queryParts.push(currentPart);currentPart=null;}
for(;lc=cc,cc=query.charAt(x),x<ql;x++){if(lc=="\\"){continue;}
if(!currentPart){pStart=x;currentPart={query:null,pseudos:[],attrs:[],classes:[],tag:null,oper:null,id:null,getTag:function(){return(caseSensitive)?this.otag:this.tag;}};inTag=x;}
if(inBrackets>=0){if(cc=="]"){if(!_cp.attr){_cp.attr=ts(inBrackets+1,x);}else{_cp.matchFor=ts((inMatchFor||inBrackets+1),x);}
var cmf=_cp.matchFor;if(cmf){if((cmf.charAt(0)=='"')||(cmf.charAt(0)=="'")){_cp.matchFor=cmf.slice(1,-1);}}
currentPart.attrs.push(_cp);_cp=null;inBrackets=inMatchFor=-1;}else if(cc=="="){var addToCc=("|~^$*".indexOf(lc)>=0)?lc:"";_cp.type=addToCc+cc;_cp.attr=ts(inBrackets+1,x-addToCc.length);inMatchFor=x+1;}}else if(inParens>=0){if(cc==")"){if(inPseudo>=0){_cp.value=ts(inParens+1,x);}
inPseudo=inParens=-1;}}else if(cc=="#"){endAll();inId=x+1;}else if(cc=="."){endAll();inClass=x;}else if(cc==":"){endAll();inPseudo=x;}else if(cc=="["){endAll();inBrackets=x;_cp={};}else if(cc=="("){if(inPseudo>=0){_cp={name:ts(inPseudo+1,x),value:null}
currentPart.pseudos.push(_cp);}
inParens=x;}else if((cc==" ")&&(lc!=cc)){endPart();}}
return queryParts;};var agree=function(first,second){if(!first){return second;}
if(!second){return first;}
return function(){return first.apply(window,arguments)&&second.apply(window,arguments);}};var getArr=function(i,arr){var r=arr||[];if(i){r.push(i);}
return r;};var _isElement=function(n){return(1==n.nodeType);};var blank="";var _getAttr=function(elem,attr){if(!elem){return blank;}
if(attr=="class"){return elem.className||blank;}
if(attr=="for"){return elem.htmlFor||blank;}
if(attr=="style"){return elem.style.cssText||blank;}
return(caseSensitive?elem.getAttribute(attr):elem.getAttribute(attr,2))||blank;};var attrs={"*=":function(attr,value){return function(elem){return(_getAttr(elem,attr).indexOf(value)>=0);}},"^=":function(attr,value){return function(elem){return(_getAttr(elem,attr).indexOf(value)==0);}},"$=":function(attr,value){var tval=" "+value;return function(elem){var ea=" "+_getAttr(elem,attr);return(ea.lastIndexOf(value)==(ea.length-value.length));}},"~=":function(attr,value){var tval=" "+value+" ";return function(elem){var ea=" "+_getAttr(elem,attr)+" ";return(ea.indexOf(tval)>=0);}},"|=":function(attr,value){var valueDash=" "+value+"-";return function(elem){var ea=" "+_getAttr(elem,attr);return((ea==value)||(ea.indexOf(valueDash)==0));}},"=":function(attr,value){return function(elem){return(_getAttr(elem,attr)==value);}}};var _noNES=(typeof getDoc().firstChild.nextElementSibling=="undefined");var _ns=!_noNES?"nextElementSibling":"nextSibling";var _ps=!_noNES?"previousElementSibling":"previousSibling";var _simpleNodeTest=(_noNES?_isElement:yesman);var _lookLeft=function(node){while(node=node[_ps]){if(_simpleNodeTest(node)){return false;}}
return true;};var _lookRight=function(node){while(node=node[_ns]){if(_simpleNodeTest(node)){return false;}}
return true;};var getNodeIndex=function(node){var root=node.parentNode;var i=0,tret=root[childNodesName],ci=(node["_i"]||-1),cl=(root["_l"]||-1);if(!tret){return-1;}
var l=tret.length;if(cl==l&&ci>=0&&cl>=0){return ci;}
root["_l"]=l;ci=-1;for(var te=root["firstElementChild"]||root["firstChild"];te;te=te[_ns]){if(_simpleNodeTest(te)){te["_i"]=++i;if(node===te){ci=i;}}}
return ci;};var isEven=function(elem){return!((getNodeIndex(elem))%2);};var isOdd=function(elem){return((getNodeIndex(elem))%2);};var pseudos={"checked":function(name,condition){return function(elem){return!!d.attr(elem,"checked");}},"first-child":function(){return _lookLeft;},"last-child":function(){return _lookRight;},"only-child":function(name,condition){return function(node){if(!_lookLeft(node)){return false;}
if(!_lookRight(node)){return false;}
return true;};},"empty":function(name,condition){return function(elem){var cn=elem.childNodes;var cnl=elem.childNodes.length;for(var x=cnl-1;x>=0;x--){var nt=cn[x].nodeType;if((nt===1)||(nt==3)){return false;}}
return true;}},"contains":function(name,condition){var cz=condition.charAt(0);if(cz=='"'||cz=="'"){condition=condition.slice(1,-1);}
return function(elem){return(elem.innerHTML.indexOf(condition)>=0);}},"not":function(name,condition){var p=getQueryParts(condition)[0];var ignores={el:1};if(p.tag!="*"){ignores.tag=1;}
if(!p.classes.length){ignores.classes=1;}
var ntf=getSimpleFilterFunc(p,ignores);return function(elem){return(!ntf(elem));}},"nth-child":function(name,condition){var pi=parseInt;if(condition=="odd"){return isOdd;}else if(condition=="even"){return isEven;}
if(condition.indexOf("n")!=-1){var tparts=condition.split("n",2);var pred=tparts[0]?((tparts[0]=='-')?-1:pi(tparts[0])):1;var idx=tparts[1]?pi(tparts[1]):0;var lb=0,ub=-1;if(pred>0){if(idx<0){idx=(idx%pred)&&(pred+(idx%pred));}else if(idx>0){if(idx>=pred){lb=idx-idx%pred;}
idx=idx%pred;}}else if(pred<0){pred*=-1;if(idx>0){ub=idx;idx=idx%pred;}}
if(pred>0){return function(elem){var i=getNodeIndex(elem);return(i>=lb)&&(ub<0||i<=ub)&&((i%pred)==idx);}}else{condition=idx;}}
var ncount=pi(condition);return function(elem){return(getNodeIndex(elem)==ncount);}}};var defaultGetter=(d.isIE)?function(cond){var clc=cond.toLowerCase();if(clc=="class"){cond="className";}
return function(elem){return(caseSensitive?elem.getAttribute(cond):elem[cond]||elem[clc]);}}:function(cond){return function(elem){return(elem&&elem.getAttribute&&elem.hasAttribute(cond));}};var getSimpleFilterFunc=function(query,ignores){if(!query){return yesman;}
ignores=ignores||{};var ff=null;if(!("el"in ignores)){ff=agree(ff,_isElement);}
if(!("tag"in ignores)){if(query.tag!="*"){ff=agree(ff,function(elem){return(elem&&(elem.tagName==query.getTag()));});}}
if(!("classes"in ignores)){each(query.classes,function(cname,idx,arr){var re=new RegExp("(?:^|\\s)"+cname+"(?:\\s|$)");ff=agree(ff,function(elem){return re.test(elem.className);});ff.count=idx;});}
if(!("pseudos"in ignores)){each(query.pseudos,function(pseudo){var pn=pseudo.name;if(pseudos[pn]){ff=agree(ff,pseudos[pn](pn,pseudo.value));}});}
if(!("attrs"in ignores)){each(query.attrs,function(attr){var matcher;var a=attr.attr;if(attr.type&&attrs[attr.type]){matcher=attrs[attr.type](a,attr.matchFor);}else if(a.length){matcher=defaultGetter(a);}
if(matcher){ff=agree(ff,matcher);}});}
if(!("id"in ignores)){if(query.id){ff=agree(ff,function(elem){return(!!elem&&(elem.id==query.id));});}}
if(!ff){if(!("default"in ignores)){ff=yesman;}}
return ff;};var _nextSibling=function(filterFunc){return function(node,ret,bag){while(node=node[_ns]){if(_noNES&&(!_isElement(node))){continue;}
if((!bag||_isUnique(node,bag))&&filterFunc(node)){ret.push(node);}
break;}
return ret;}};var _nextSiblings=function(filterFunc){return function(root,ret,bag){var te=root[_ns];while(te){if(_simpleNodeTest(te)){if(bag&&!_isUnique(te,bag)){break;}
if(filterFunc(te)){ret.push(te);}}
te=te[_ns];}
return ret;}};var _childElements=function(filterFunc){filterFunc=filterFunc||yesman;return function(root,ret,bag){var te,x=0,tret=root[childNodesName];while(te=tret[x++]){if(_simpleNodeTest(te)&&(!bag||_isUnique(te,bag))&&(filterFunc(te,x))){ret.push(te);}}
return ret;};};var _isDescendant=function(node,root){var pn=node.parentNode;while(pn){if(pn==root){break;}
pn=pn.parentNode;}
return!!pn;};var _getElementsFuncCache={};var getElementsFunc=function(query){var retFunc=_getElementsFuncCache[query.query];if(retFunc){return retFunc;}
var io=query.infixOper;var oper=(io?io.oper:"");var filterFunc=getSimpleFilterFunc(query,{el:1});var qt=query.tag;var wildcardTag=("*"==qt);var ecs=getDoc()["getElementsByClassName"];if(!oper){if(query.id){filterFunc=(!query.loops&&wildcardTag)?yesman:getSimpleFilterFunc(query,{el:1,id:1});retFunc=function(root,arr){var te=d.byId(query.id,(root.ownerDocument||root));if(!te||!filterFunc(te)){return;}
if(9==root.nodeType){return getArr(te,arr);}else{if(_isDescendant(te,root)){return getArr(te,arr);}}}}else if(ecs&&/\{\s*\[native code\]\s*\}/.test(String(ecs))&&query.classes.length&&!cssCaseBug){filterFunc=getSimpleFilterFunc(query,{el:1,classes:1,id:1});var classesString=query.classes.join(" ");retFunc=function(root,arr,bag){var ret=getArr(0,arr),te,x=0;var tret=root.getElementsByClassName(classesString);while((te=tret[x++])){if(filterFunc(te,root)&&_isUnique(te,bag)){ret.push(te);}}
return ret;};}else if(!wildcardTag&&!query.loops){retFunc=function(root,arr,bag){var ret=getArr(0,arr),te,x=0;var tret=root.getElementsByTagName(query.getTag());while((te=tret[x++])){if(_isUnique(te,bag)){ret.push(te);}}
return ret;};}else{filterFunc=getSimpleFilterFunc(query,{el:1,tag:1,id:1});retFunc=function(root,arr,bag){var ret=getArr(0,arr),te,x=0;var tret=root.getElementsByTagName(query.getTag());while((te=tret[x++])){if(filterFunc(te,root)&&_isUnique(te,bag)){ret.push(te);}}
return ret;};}}else{var skipFilters={el:1};if(wildcardTag){skipFilters.tag=1;}
filterFunc=getSimpleFilterFunc(query,skipFilters);if("+"==oper){retFunc=_nextSibling(filterFunc);}else if("~"==oper){retFunc=_nextSiblings(filterFunc);}else if(">"==oper){retFunc=_childElements(filterFunc);}}
return _getElementsFuncCache[query.query]=retFunc;};var filterDown=function(root,queryParts){var candidates=getArr(root),qp,x,te,qpl=queryParts.length,bag,ret;for(var i=0;i<qpl;i++){ret=[];qp=queryParts[i];x=candidates.length-1;if(x>0){bag={};ret.nozip=true;}
var gef=getElementsFunc(qp);while(te=candidates[x--]){gef(te,ret,bag);}
if(!ret.length){break;}
candidates=ret;}
return ret;};var _queryFuncCacheDOM={},_queryFuncCacheQSA={};var getStepQueryFunc=function(query){var qparts=getQueryParts(trim(query));if(qparts.length==1){var tef=getElementsFunc(qparts[0]);return function(root){var r=tef(root,new qlc());if(r){r.nozip=true;}
return r;}}
return function(root){return filterDown(root,qparts);}};var nua=navigator.userAgent;var wk="WebKit/";var is525=(d.isWebKit&&(nua.indexOf(wk)>0)&&(parseFloat(nua.split(wk)[1])>528));var noZip=d.isIE?"commentStrip":"nozip";var qsa="querySelectorAll";var qsaAvail=(!!getDoc()[qsa]&&(!d.isSafari||(d.isSafari>3.1)||is525));var getQueryFunc=function(query,forceDOM){if(qsaAvail){var qsaCached=_queryFuncCacheQSA[query];if(qsaCached&&!forceDOM){return qsaCached;}}
var domCached=_queryFuncCacheDOM[query];if(domCached){return domCached;}
var qcz=query.charAt(0);var nospace=(-1==query.indexOf(" "));if((query.indexOf("#")>=0)&&(nospace)){forceDOM=true;}
var useQSA=(qsaAvail&&(!forceDOM)&&(specials.indexOf(qcz)==-1)&&(!d.isIE||(query.indexOf(":")==-1))&&(!(cssCaseBug&&(query.indexOf(".")>=0)))&&(query.indexOf(":contains")==-1)&&(query.indexOf("|=")==-1));if(useQSA){var tq=(specials.indexOf(query.charAt(query.length-1))>=0)?(query+" *"):query;return _queryFuncCacheQSA[query]=function(root){try{if(!((9==root.nodeType)||nospace)){throw"";}
var r=root[qsa](tq);r[noZip]=true;return r;}catch(e){return getQueryFunc(query,true)(root);}}}else{var parts=query.split(/\s*,\s*/);return _queryFuncCacheDOM[query]=((parts.length<2)?getStepQueryFunc(query):function(root){var pindex=0,ret=[],tp;while((tp=parts[pindex++])){ret=ret.concat(getStepQueryFunc(tp)(root));}
return ret;});}};var _zipIdx=0;var _nodeUID=d.isIE?function(node){if(caseSensitive){return(node.getAttribute("_uid")||node.setAttribute("_uid",++_zipIdx)||_zipIdx);}else{return node.uniqueID;}}:function(node){return(node._uid||(node._uid=++_zipIdx));};var _isUnique=function(node,bag){if(!bag){return 1;}
var id=_nodeUID(node);if(!bag[id]){return bag[id]=1;}
return 0;};var _zipIdxName="_zipIdx";var _zip=function(arr){if(arr&&arr.nozip){return(qlc._wrap)?qlc._wrap(arr):arr;}
var ret=new qlc();if(!arr||!arr.length){return ret;}
if(arr[0]){ret.push(arr[0]);}
if(arr.length<2){return ret;}
_zipIdx++;if(d.isIE&&caseSensitive){var szidx=_zipIdx+"";arr[0].setAttribute(_zipIdxName,szidx);for(var x=1,te;te=arr[x];x++){if(arr[x].getAttribute(_zipIdxName)!=szidx){ret.push(te);}
te.setAttribute(_zipIdxName,szidx);}}else if(d.isIE&&arr.commentStrip){try{for(var x=1,te;te=arr[x];x++){if(_isElement(te)){ret.push(te);}}}catch(e){}}else{if(arr[0]){arr[0][_zipIdxName]=_zipIdx;}
for(var x=1,te;te=arr[x];x++){if(arr[x][_zipIdxName]!=_zipIdx){ret.push(te);}
te[_zipIdxName]=_zipIdx;}}
return ret;};d.query=function(query,root){qlc=d._NodeListCtor;if(!query){return new qlc();}
if(query.constructor==qlc){return query;}
if(typeof query!="string"){return new qlc(query);}
if(typeof root=="string"){root=d.byId(root);if(!root){return new qlc();}}
root=root||getDoc();var od=root.ownerDocument||root.documentElement;caseSensitive=(root.contentType&&root.contentType=="application/xml")||(d.isOpera&&(root.doctype||od.toString()=="[object XMLDocument]"))||(!!od)&&(d.isIE?od.xml:(root.xmlVersion||od.xmlVersion));var r=getQueryFunc(query)(root);if(r&&r.nozip&&!qlc._wrap){return r;}
return _zip(r);}
d.query.pseudos=pseudos;d._filterQueryResult=function(nodeList,simpleFilter){var tmpNodeList=new d._NodeListCtor();var filterFunc=getSimpleFilterFunc(getQueryParts(simpleFilter)[0]);for(var x=0,te;te=nodeList[x];x++){if(filterFunc(te)){tmpNodeList.push(te);}}
return tmpNodeList;}})(this["queryPortability"]||this["acme"]||dojo);
dojo.provide("dojo._base.xhr");dojo.require("dojo._base.Deferred");dojo.require("dojo._base.json");dojo.require("dojo._base.lang");dojo.require("dojo._base.query");(function(){var _d=dojo,cfg=_d.config;function setValue(obj,name,value){if(value===null){return;}
var val=obj[name];if(typeof val=="string"){obj[name]=[val,value];}else if(_d.isArray(val)){val.push(value);}else{obj[name]=value;}}
dojo.fieldToObject=function(inputNode){var ret=null;var item=_d.byId(inputNode);if(item){var _in=item.name;var type=(item.type||"").toLowerCase();if(_in&&type&&!item.disabled){if(type=="radio"||type=="checkbox"){if(item.checked){ret=item.value}}else if(item.multiple){ret=[];_d.query("option",item).forEach(function(opt){if(opt.selected){ret.push(opt.value);}});}else{ret=item.value;}}}
return ret;}
dojo.formToObject=function(formNode){var ret={};var exclude="file|submit|image|reset|button|";_d.forEach(dojo.byId(formNode).elements,function(item){var _in=item.name;var type=(item.type||"").toLowerCase();if(_in&&type&&exclude.indexOf(type)==-1&&!item.disabled){setValue(ret,_in,_d.fieldToObject(item));if(type=="image"){ret[_in+".x"]=ret[_in+".y"]=ret[_in].x=ret[_in].y=0;}}});return ret;}
dojo.objectToQuery=function(map){var enc=encodeURIComponent;var pairs=[];var backstop={};for(var name in map){var value=map[name];if(value!=backstop[name]){var assign=enc(name)+"=";if(_d.isArray(value)){for(var i=0;i<value.length;i++){pairs.push(assign+enc(value[i]));}}else{pairs.push(assign+enc(value));}}}
return pairs.join("&");}
dojo.formToQuery=function(formNode){return _d.objectToQuery(_d.formToObject(formNode));}
dojo.formToJson=function(formNode,prettyPrint){return _d.toJson(_d.formToObject(formNode),prettyPrint);}
dojo.queryToObject=function(str){var ret={};var qp=str.split("&");var dec=decodeURIComponent;_d.forEach(qp,function(item){if(item.length){var parts=item.split("=");var name=dec(parts.shift());var val=dec(parts.join("="));if(typeof ret[name]=="string"){ret[name]=[ret[name]];}
if(_d.isArray(ret[name])){ret[name].push(val);}else{ret[name]=val;}}});return ret;}
dojo._blockAsync=false;var handlers=_d._contentHandlers=dojo.contentHandlers={text:function(xhr){return xhr.responseText;},json:function(xhr){return _d.fromJson(xhr.responseText||null);},"json-comment-filtered":function(xhr){if(!dojo.config.useCommentedJson){console.warn("Consider using the standard mimetype:application/json."
+" json-commenting can introduce security issues. To"
+" decrease the chances of hijacking, use the standard the 'json' handler and"
+" prefix your json with: {}&&\n"
+"Use djConfig.useCommentedJson=true to turn off this message.");}
var value=xhr.responseText;var cStartIdx=value.indexOf("\/*");var cEndIdx=value.lastIndexOf("*\/");if(cStartIdx==-1||cEndIdx==-1){throw new Error("JSON was not comment filtered");}
return _d.fromJson(value.substring(cStartIdx+2,cEndIdx));},javascript:function(xhr){return _d.eval(xhr.responseText);},xml:function(xhr){var result=xhr.responseXML;if(_d.isIE&&(!result||!result.documentElement)){var ms=function(n){return"MSXML"+n+".DOMDocument";}
var dp=["Microsoft.XMLDOM",ms(6),ms(4),ms(3),ms(2)];_d.some(dp,function(p){try{var dom=new ActiveXObject(p);dom.async=false;dom.loadXML(xhr.responseText);result=dom;}catch(e){return false;}
return true;});}
return result;},"json-comment-optional":function(xhr){if(xhr.responseText&&/^[^{\[]*\/\*/.test(xhr.responseText)){return handlers["json-comment-filtered"](xhr);}else{return handlers["json"](xhr);}}};dojo._ioSetArgs=function(args,canceller,okHandler,errHandler){var ioArgs={args:args,url:args.url};var formObject=null;if(args.form){var form=_d.byId(args.form);var actnNode=form.getAttributeNode("action");ioArgs.url=ioArgs.url||(actnNode?actnNode.value:null);formObject=_d.formToObject(form);}
var miArgs=[{}];if(formObject){miArgs.push(formObject);}
if(args.content){miArgs.push(args.content);}
if(args.preventCache){miArgs.push({"dojo.preventCache":new Date().valueOf()});}
ioArgs.query=_d.objectToQuery(_d.mixin.apply(null,miArgs));ioArgs.handleAs=args.handleAs||"text";var d=new _d.Deferred(canceller);d.addCallbacks(okHandler,function(error){return errHandler(error,d);});var ld=args.load;if(ld&&_d.isFunction(ld)){d.addCallback(function(value){return ld.call(args,value,ioArgs);});}
var err=args.error;if(err&&_d.isFunction(err)){d.addErrback(function(value){return err.call(args,value,ioArgs);});}
var handle=args.handle;if(handle&&_d.isFunction(handle)){d.addBoth(function(value){return handle.call(args,value,ioArgs);});}
if(cfg.ioPublish&&_d.publish&&ioArgs.args.ioPublish!==false){d.addCallbacks(function(res){_d.publish("/dojo/io/load",[d,res]);return res;},function(res){_d.publish("/dojo/io/error",[d,res]);return res;});d.addBoth(function(res){_d.publish("/dojo/io/done",[d,res]);return res;});}
d.ioArgs=ioArgs;return d;}
var _deferredCancel=function(dfd){dfd.canceled=true;var xhr=dfd.ioArgs.xhr;var _at=typeof xhr.abort;if(_at=="function"||_at=="object"||_at=="unknown"){xhr.abort();}
var err=dfd.ioArgs.error;if(!err){err=new Error("xhr cancelled");err.dojoType="cancel";}
return err;}
var _deferredOk=function(dfd){var ret=handlers[dfd.ioArgs.handleAs](dfd.ioArgs.xhr);return ret===undefined?null:ret;}
var _deferError=function(error,dfd){if(!dfd.ioArgs.args.failOk){console.error(error);}
return error;}
var _inFlightIntvl=null;var _inFlight=[];var _pubCount=0;var _checkPubCount=function(dfd){if(_pubCount<=0){_pubCount=0;if(cfg.ioPublish&&_d.publish&&(!dfd||dfd&&dfd.ioArgs.args.ioPublish!==false)){_d.publish("/dojo/io/stop");}}};var _watchInFlight=function(){var now=(new Date()).getTime();if(!_d._blockAsync){for(var i=0,tif;i<_inFlight.length&&(tif=_inFlight[i]);i++){var dfd=tif.dfd;var func=function(){if(!dfd||dfd.canceled||!tif.validCheck(dfd)){_inFlight.splice(i--,1);_pubCount-=1;}else if(tif.ioCheck(dfd)){_inFlight.splice(i--,1);tif.resHandle(dfd);_pubCount-=1;}else if(dfd.startTime){if(dfd.startTime+(dfd.ioArgs.args.timeout||0)<now){_inFlight.splice(i--,1);var err=new Error("timeout exceeded");err.dojoType="timeout";dfd.errback(err);dfd.cancel();_pubCount-=1;}}};if(dojo.config.debugAtAllCosts){func.call(this);}else{try{func.call(this);}catch(e){dfd.errback(e);}}}}
_checkPubCount(dfd);if(!_inFlight.length){clearInterval(_inFlightIntvl);_inFlightIntvl=null;return;}}
dojo._ioCancelAll=function(){try{_d.forEach(_inFlight,function(i){try{i.dfd.cancel();}catch(e){}});}catch(e){}}
if(_d.isIE){_d.addOnWindowUnload(_d._ioCancelAll);}
_d._ioNotifyStart=function(dfd){if(cfg.ioPublish&&_d.publish&&dfd.ioArgs.args.ioPublish!==false){if(!_pubCount){_d.publish("/dojo/io/start");}
_pubCount+=1;_d.publish("/dojo/io/send",[dfd]);}}
_d._ioWatch=function(dfd,validCheck,ioCheck,resHandle){var args=dfd.ioArgs.args;if(args.timeout){dfd.startTime=(new Date()).getTime();}
_inFlight.push({dfd:dfd,validCheck:validCheck,ioCheck:ioCheck,resHandle:resHandle});if(!_inFlightIntvl){_inFlightIntvl=setInterval(_watchInFlight,50);}
if(args.sync){_watchInFlight();}}
var _defaultContentType="application/x-www-form-urlencoded";var _validCheck=function(dfd){return dfd.ioArgs.xhr.readyState;}
var _ioCheck=function(dfd){return 4==dfd.ioArgs.xhr.readyState;}
var _resHandle=function(dfd){var xhr=dfd.ioArgs.xhr;if(_d._isDocumentOk(xhr)){dfd.callback(dfd);}else{var err=new Error("Unable to load "+dfd.ioArgs.url+" status:"+xhr.status);err.status=xhr.status;err.responseText=xhr.responseText;dfd.errback(err);}}
dojo._ioAddQueryToUrl=function(ioArgs){if(ioArgs.query.length){ioArgs.url+=(ioArgs.url.indexOf("?")==-1?"?":"&")+ioArgs.query;ioArgs.query=null;}}
dojo.xhr=function(method,args,hasBody){var dfd=_d._ioSetArgs(args,_deferredCancel,_deferredOk,_deferError);var ioArgs=dfd.ioArgs;var xhr=dfd.ioArgs.xhr=_d._xhrObj(dfd.ioArgs.args);if(!xhr){dfd.cancel();return dfd;}
if("postData"in args){ioArgs.query=args.postData;}else if("putData"in args){ioArgs.query=args.putData;}else if("rawBody"in args){ioArgs.query=args.rawBody;}else if((arguments.length>2&&!hasBody)||"POST|PUT".indexOf(method.toUpperCase())==-1){_d._ioAddQueryToUrl(dfd.ioArgs);}
xhr.open(method,ioArgs.url,args.sync!==true,args.user||undefined,args.password||undefined);if(args.headers){for(var hdr in args.headers){if(hdr.toLowerCase()==="content-type"&&!args.contentType){args.contentType=args.headers[hdr];}else if(args.headers[hdr]){xhr.setRequestHeader(hdr,args.headers[hdr]);}}}
xhr.setRequestHeader("Content-Type",args.contentType||_defaultContentType);if(!args.headers||!("X-Requested-With"in args.headers)){xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");}
_d._ioNotifyStart(dfd);if(dojo.config.debugAtAllCosts){xhr.send(ioArgs.query);}else{try{xhr.send(ioArgs.query);}catch(e){dfd.ioArgs.error=e;dfd.cancel();}}
_d._ioWatch(dfd,_validCheck,_ioCheck,_resHandle);xhr=null;return dfd;}
dojo.xhrGet=function(args){return _d.xhr("GET",args);}
dojo.rawXhrPost=dojo.xhrPost=function(args){return _d.xhr("POST",args,true);}
dojo.rawXhrPut=dojo.xhrPut=function(args){return _d.xhr("PUT",args,true);}
dojo.xhrDelete=function(args){return _d.xhr("DELETE",args);}})();
dojo.provide("dojo._base.fx");dojo.require("dojo._base.Color");dojo.require("dojo._base.connect");dojo.require("dojo._base.lang");dojo.require("dojo._base.html");(function(){var d=dojo;var _mixin=d._mixin;dojo._Line=function(start,end){this.start=start;this.end=end;};dojo._Line.prototype.getValue=function(n){return((this.end-this.start)*n)+this.start;};dojo.Animation=function(args){_mixin(this,args);if(d.isArray(this.curve)){this.curve=new d._Line(this.curve[0],this.curve[1]);}};d._Animation=d.Animation;d.extend(dojo.Animation,{duration:350,repeat:0,rate:20,_percent:0,_startRepeatCount:0,_getStep:function(){var _p=this._percent,_e=this.easing;return _e?_e(_p):_p;},_fire:function(evt,args){var a=args||[];if(this[evt]){if(d.config.debugAtAllCosts){this[evt].apply(this,a);}else{try{this[evt].apply(this,a);}catch(e){console.error("exception in animation handler for:",evt);console.error(e);}}}
return this;},play:function(delay,gotoStart){var _t=this;if(_t._delayTimer){_t._clearTimer();}
if(gotoStart){_t._stopTimer();_t._active=_t._paused=false;_t._percent=0;}else if(_t._active&&!_t._paused){return _t;}
_t._fire("beforeBegin",[_t.node]);var de=delay||_t.delay,_p=dojo.hitch(_t,"_play",gotoStart);if(de>0){_t._delayTimer=setTimeout(_p,de);return _t;}
_p();return _t;},_play:function(gotoStart){var _t=this;if(_t._delayTimer){_t._clearTimer();}
_t._startTime=new Date().valueOf();if(_t._paused){_t._startTime-=_t.duration*_t._percent;}
_t._endTime=_t._startTime+_t.duration;_t._active=true;_t._paused=false;var value=_t.curve.getValue(_t._getStep());if(!_t._percent){if(!_t._startRepeatCount){_t._startRepeatCount=_t.repeat;}
_t._fire("onBegin",[value]);}
_t._fire("onPlay",[value]);_t._cycle();return _t;},pause:function(){var _t=this;if(_t._delayTimer){_t._clearTimer();}
_t._stopTimer();if(!_t._active){return _t;}
_t._paused=true;_t._fire("onPause",[_t.curve.getValue(_t._getStep())]);return _t;},gotoPercent:function(percent,andPlay){var _t=this;_t._stopTimer();_t._active=_t._paused=true;_t._percent=percent;if(andPlay){_t.play();}
return _t;},stop:function(gotoEnd){var _t=this;if(_t._delayTimer){_t._clearTimer();}
if(!_t._timer){return _t;}
_t._stopTimer();if(gotoEnd){_t._percent=1;}
_t._fire("onStop",[_t.curve.getValue(_t._getStep())]);_t._active=_t._paused=false;return _t;},status:function(){if(this._active){return this._paused?"paused":"playing";}
return"stopped";},_cycle:function(){var _t=this;if(_t._active){var curr=new Date().valueOf();var step=(curr-_t._startTime)/(_t._endTime-_t._startTime);if(step>=1){step=1;}
_t._percent=step;if(_t.easing){step=_t.easing(step);}
_t._fire("onAnimate",[_t.curve.getValue(step)]);if(_t._percent<1){_t._startTimer();}else{_t._active=false;if(_t.repeat>0){_t.repeat--;_t.play(null,true);}else if(_t.repeat==-1){_t.play(null,true);}else{if(_t._startRepeatCount){_t.repeat=_t._startRepeatCount;_t._startRepeatCount=0;}}
_t._percent=0;_t._fire("onEnd",[_t.node]);!_t.repeat&&_t._stopTimer();}}
return _t;},_clearTimer:function(){clearTimeout(this._delayTimer);delete this._delayTimer;}});var ctr=0,_globalTimerList=[],timer=null,runner={run:function(){}};d.extend(d.Animation,{_startTimer:function(){if(!this._timer){this._timer=d.connect(runner,"run",this,"_cycle");ctr++;}
if(!timer){timer=setInterval(d.hitch(runner,"run"),this.rate);}},_stopTimer:function(){if(this._timer){d.disconnect(this._timer);this._timer=null;ctr--;}
if(ctr<=0){clearInterval(timer);timer=null;ctr=0;}}});var _makeFadeable=d.isIE?function(node){var ns=node.style;if(!ns.width.length&&d.style(node,"width")=="auto"){ns.width="auto";}}:function(){};dojo._fade=function(args){args.node=d.byId(args.node);var fArgs=_mixin({properties:{}},args),props=(fArgs.properties.opacity={});props.start=!("start"in fArgs)?function(){return+d.style(fArgs.node,"opacity")||0;}:fArgs.start;props.end=fArgs.end;var anim=d.animateProperty(fArgs);d.connect(anim,"beforeBegin",d.partial(_makeFadeable,fArgs.node));return anim;};dojo.fadeIn=function(args){return d._fade(_mixin({end:1},args));};dojo.fadeOut=function(args){return d._fade(_mixin({end:0},args));};dojo._defaultEasing=function(n){return 0.5+((Math.sin((n+1.5)*Math.PI))/2);};var PropLine=function(properties){this._properties=properties;for(var p in properties){var prop=properties[p];if(prop.start instanceof d.Color){prop.tempColor=new d.Color();}}};PropLine.prototype.getValue=function(r){var ret={};for(var p in this._properties){var prop=this._properties[p],start=prop.start;if(start instanceof d.Color){ret[p]=d.blendColors(start,prop.end,r,prop.tempColor).toCss();}else if(!d.isArray(start)){ret[p]=((prop.end-start)*r)+start+(p!="opacity"?prop.units||"px":0);}}
return ret;};dojo.animateProperty=function(args){var n=args.node=d.byId(args.node);if(!args.easing){args.easing=d._defaultEasing;}
var anim=new d.Animation(args);d.connect(anim,"beforeBegin",anim,function(){var pm={};for(var p in this.properties){if(p=="width"||p=="height"){this.node.display="block";}
var prop=this.properties[p];if(d.isFunction(prop)){prop=prop(n);}
prop=pm[p]=_mixin({},(d.isObject(prop)?prop:{end:prop}));if(d.isFunction(prop.start)){prop.start=prop.start(n);}
if(d.isFunction(prop.end)){prop.end=prop.end(n);}
var isColor=(p.toLowerCase().indexOf("color")>=0);function getStyle(node,p){var v={height:node.offsetHeight,width:node.offsetWidth}[p];if(v!==undefined){return v;}
v=d.style(node,p);return(p=="opacity")?+v:(isColor?v:parseFloat(v));}
if(!("end"in prop)){prop.end=getStyle(n,p);}else if(!("start"in prop)){prop.start=getStyle(n,p);}
if(isColor){prop.start=new d.Color(prop.start);prop.end=new d.Color(prop.end);}else{prop.start=(p=="opacity")?+prop.start:parseFloat(prop.start);}}
this.curve=new PropLine(pm);});d.connect(anim,"onAnimate",d.hitch(d,"style",anim.node));return anim;};dojo.anim=function(node,properties,duration,easing,onEnd,delay){return d.animateProperty({node:node,duration:duration||d.Animation.prototype.duration,properties:properties,easing:easing,onEnd:onEnd}).play(delay||0);};})();
dojo.provide("dojo._base.browser");dojo.require("dojo._base.window");dojo.require("dojo._base.connect");dojo.require("dojo._base.event");dojo.require("dojo._base.html");dojo.require("dojo._base.NodeList");dojo.require("dojo._base.query");dojo.require("dojo._base.xhr");dojo.require("dojo._base.fx");dojo.forEach(dojo.config.require,function(i){dojo["require"](i);});
dojo.provide("dojo.fx.easing");dojo.fx.easing={linear:function(n){return n;},quadIn:function(n){return Math.pow(n,2);},quadOut:function(n){return n*(n-2)*-1;},quadInOut:function(n){n=n*2;if(n<1){return Math.pow(n,2)/2;}
return-1*((--n)*(n-2)-1)/2;},cubicIn:function(n){return Math.pow(n,3);},cubicOut:function(n){return Math.pow(n-1,3)+1;},cubicInOut:function(n){n=n*2;if(n<1){return Math.pow(n,3)/2;}
n-=2;return(Math.pow(n,3)+2)/2;},quartIn:function(n){return Math.pow(n,4);},quartOut:function(n){return-1*(Math.pow(n-1,4)-1);},quartInOut:function(n){n=n*2;if(n<1){return Math.pow(n,4)/2;}
n-=2;return-1/2*(Math.pow(n,4)-2);},quintIn:function(n){return Math.pow(n,5);},quintOut:function(n){return Math.pow(n-1,5)+1;},quintInOut:function(n){n=n*2;if(n<1){return Math.pow(n,5)/2;};n-=2;return(Math.pow(n,5)+2)/2;},sineIn:function(n){return-1*Math.cos(n*(Math.PI/2))+1;},sineOut:function(n){return Math.sin(n*(Math.PI/2));},sineInOut:function(n){return-1*(Math.cos(Math.PI*n)-1)/2;},expoIn:function(n){return(n==0)?0:Math.pow(2,10*(n-1));},expoOut:function(n){return(n==1)?1:(-1*Math.pow(2,-10*n)+1);},expoInOut:function(n){if(n==0){return 0;}
if(n==1){return 1;}
n=n*2;if(n<1){return Math.pow(2,10*(n-1))/2;}
--n;return(-1*Math.pow(2,-10*n)+2)/2;},circIn:function(n){return-1*(Math.sqrt(1-Math.pow(n,2))-1);},circOut:function(n){n=n-1;return Math.sqrt(1-Math.pow(n,2));},circInOut:function(n){n=n*2;if(n<1){return-1/2*(Math.sqrt(1-Math.pow(n,2))-1);}
n-=2;return 1/2*(Math.sqrt(1-Math.pow(n,2))+1);},backIn:function(n){var s=1.70158;return Math.pow(n,2)*((s+1)*n-s);},backOut:function(n){n=n-1;var s=1.70158;return Math.pow(n,2)*((s+1)*n+s)+1;},backInOut:function(n){var s=1.70158*1.525;n=n*2;if(n<1){return(Math.pow(n,2)*((s+1)*n-s))/2;}
n-=2;return(Math.pow(n,2)*((s+1)*n+s)+2)/2;},elasticIn:function(n){if(n==0||n==1){return n;}
var p=.3;var s=p/4;n=n-1;return-1*Math.pow(2,10*n)*Math.sin((n-s)*(2*Math.PI)/p);},elasticOut:function(n){if(n==0||n==1){return n;}
var p=.3;var s=p/4;return Math.pow(2,-10*n)*Math.sin((n-s)*(2*Math.PI)/p)+1;},elasticInOut:function(n){if(n==0)return 0;n=n*2;if(n==2)return 1;var p=.3*1.5;var s=p/4;if(n<1){n-=1;return-.5*(Math.pow(2,10*n)*Math.sin((n-s)*(2*Math.PI)/p));}
n-=1;return.5*(Math.pow(2,-10*n)*Math.sin((n-s)*(2*Math.PI)/p))+1;},bounceIn:function(n){return(1-dojo.fx.easing.bounceOut(1-n));},bounceOut:function(n){var s=7.5625;var p=2.75;var l;if(n<(1/p)){l=s*Math.pow(n,2);}else if(n<(2/p)){n-=(1.5/p);l=s*Math.pow(n,2)+.75;}else if(n<(2.5/p)){n-=(2.25/p);l=s*Math.pow(n,2)+.9375;}else{n-=(2.625/p);l=s*Math.pow(n,2)+.984375;}
return l;},bounceInOut:function(n){if(n<0.5){return dojo.fx.easing.bounceIn(n*2)/2;}
return(dojo.fx.easing.bounceOut(n*2-1)/2)+0.5;}};
dojo.provide("dojo.string");dojo.string.rep=function(str,num){if(num<=0||!str){return"";}
var buf=[];for(;;){if(num&1){buf.push(str);}
if(!(num>>=1)){break;}
str+=str;}
return buf.join("");};dojo.string.pad=function(text,size,ch,end){if(!ch){ch='0';}
var out=String(text),pad=dojo.string.rep(ch,Math.ceil((size-out.length)/ch.length));return end?out+pad:pad+out;};dojo.string.substitute=function(template,map,transform,thisObject){thisObject=thisObject||dojo.global;transform=transform?dojo.hitch(thisObject,transform):function(v){return v;};return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(match,key,format){var value=dojo.getObject(key,false,map);if(format){value=dojo.getObject(format,false,thisObject).call(thisObject,value,key);}
return transform(value,key).toString();});};dojo.string.trim=String.prototype.trim?dojo.trim:function(str){str=str.replace(/^\s+/,'');for(var i=str.length-1;i>=0;i--){if(/\S/.test(str.charAt(i))){str=str.substring(0,i+1);break;}}
return str;};
dojo.provide("dojo.regexp");dojo.regexp.escapeString=function(str,except){return str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,function(ch){if(except&&except.indexOf(ch)!=-1){return ch;}
return"\\"+ch;});}
dojo.regexp.buildGroupRE=function(arr,re,nonCapture){if(!(arr instanceof Array)){return re(arr);}
var b=[];for(var i=0;i<arr.length;i++){b.push(re(arr[i]));}
return dojo.regexp.group(b.join("|"),nonCapture);}
dojo.regexp.group=function(expression,nonCapture){return"("+(nonCapture?"?:":"")+expression+")";}
dojo.provide("dojo.cookie");dojo.require("dojo.regexp");dojo.cookie=function(name,value,props){var c=document.cookie;if(arguments.length==1){var matches=c.match(new RegExp("(?:^|; )"+dojo.regexp.escapeString(name)+"=([^;]*)"));return matches?decodeURIComponent(matches[1]):undefined;}else{props=props||{};var exp=props.expires;if(typeof exp=="number"){var d=new Date();d.setTime(d.getTime()+exp*24*60*60*1000);exp=props.expires=d;}
if(exp&&exp.toUTCString){props.expires=exp.toUTCString();}
value=encodeURIComponent(value);var updatedCookie=name+"="+value,propName;for(propName in props){updatedCookie+="; "+propName;var propValue=props[propName];if(propValue!==true){updatedCookie+="="+propValue;}}
document.cookie=updatedCookie;}};dojo.cookie.isSupported=function(){if(!("cookieEnabled"in navigator)){this("__djCookieTest__","CookiesAllowed");navigator.cookieEnabled=this("__djCookieTest__")=="CookiesAllowed";if(navigator.cookieEnabled){this("__djCookieTest__","",{expires:-1});}}
return navigator.cookieEnabled;};
dojo.provide("dojo.AdapterRegistry");dojo.AdapterRegistry=function(returnWrappers){this.pairs=[];this.returnWrappers=returnWrappers||false;}
dojo.extend(dojo.AdapterRegistry,{register:function(name,check,wrap,directReturn,override){this.pairs[((override)?"unshift":"push")]([name,check,wrap,directReturn]);},match:function(){for(var i=0;i<this.pairs.length;i++){var pair=this.pairs[i];if(pair[1].apply(this,arguments)){if((pair[3])||(this.returnWrappers)){return pair[2];}else{return pair[2].apply(this,arguments);}}}
throw new Error("No match found");},unregister:function(name){for(var i=0;i<this.pairs.length;i++){var pair=this.pairs[i];if(pair[0]==name){this.pairs.splice(i,1);return true;}}
return false;}});
dojo.provide("dojo.io.iframe");dojo.io.iframe={create:function(fname,onloadstr,uri){if(window[fname]){return window[fname];}
if(window.frames[fname]){return window.frames[fname];}
var cframe=null;var turi=uri;if(!turi){if(dojo.config["useXDomain"]&&!dojo.config["dojoBlankHtmlUrl"]){console.warn("dojo.io.iframe.create: When using cross-domain Dojo builds,"
+" please save dojo/resources/blank.html to your domain and set djConfig.dojoBlankHtmlUrl"
+" to the path on your domain to blank.html");}
turi=(dojo.config["dojoBlankHtmlUrl"]||dojo.moduleUrl("dojo","resources/blank.html"));}
var ifrstr=dojo.isIE?'<iframe name="'+fname+'" src="'+turi+'" onload="'+onloadstr+'">':'iframe';cframe=dojo.doc.createElement(ifrstr);with(cframe){name=fname;setAttribute("name",fname);id=fname;}
dojo.body().appendChild(cframe);window[fname]=cframe;with(cframe.style){if(!(dojo.isSafari<3)){position="absolute";}
left=top="1px";height=width="1px";visibility="hidden";}
if(!dojo.isIE){this.setSrc(cframe,turi,true);cframe.onload=new Function(onloadstr);}
return cframe;},setSrc:function(iframe,src,replace){try{if(!replace){if(dojo.isWebKit){iframe.location=src;}else{frames[iframe.name].location=src;}}else{var idoc;if(dojo.isIE||dojo.isWebKit>521){idoc=iframe.contentWindow.document;}else if(dojo.isSafari){idoc=iframe.document;}else{idoc=iframe.contentWindow;}
if(!idoc){iframe.location=src;return;}else{idoc.location.replace(src);}}}catch(e){console.log("dojo.io.iframe.setSrc: ",e);}},doc:function(iframeNode){var doc=iframeNode.contentDocument||(((iframeNode.name)&&(iframeNode.document)&&(dojo.doc.getElementsByTagName("iframe")[iframeNode.name].contentWindow)&&(dojo.doc.getElementsByTagName("iframe")[iframeNode.name].contentWindow.document)))||((iframeNode.name)&&(dojo.doc.frames[iframeNode.name])&&(dojo.doc.frames[iframeNode.name].document))||null;return doc;},send:function(args){if(!this["_frame"]){this._frame=this.create(this._iframeName,dojo._scopeName+".io.iframe._iframeOnload();");}
var dfd=dojo._ioSetArgs(args,function(dfd){dfd.canceled=true;dfd.ioArgs._callNext();},function(dfd){var value=null;try{var ioArgs=dfd.ioArgs;var dii=dojo.io.iframe;var ifd=dii.doc(dii._frame);var handleAs=ioArgs.handleAs;value=ifd;if(handleAs!="html"){if(handleAs=="xml"){if(dojo.isIE){dojo.query("a",dii._frame.contentWindow.document.documentElement).orphan();var xmlText=(dii._frame.contentWindow.document).documentElement.innerText;xmlText=xmlText.replace(/>\s+</g,"><");xmlText=dojo.trim(xmlText);var fauxXhr={responseText:xmlText};value=dojo._contentHandlers["xml"](fauxXhr);}}else{value=ifd.getElementsByTagName("textarea")[0].value;if(handleAs=="json"){value=dojo.fromJson(value);}else if(handleAs=="javascript"){value=dojo.eval(value);}}}}catch(e){value=e;}finally{ioArgs._callNext();}
return value;},function(error,dfd){dfd.ioArgs._hasError=true;dfd.ioArgs._callNext();return error;});dfd.ioArgs._callNext=function(){if(!this["_calledNext"]){this._calledNext=true;dojo.io.iframe._currentDfd=null;dojo.io.iframe._fireNextRequest();}}
this._dfdQueue.push(dfd);this._fireNextRequest();dojo._ioWatch(dfd,function(dfd){return!dfd.ioArgs["_hasError"];},function(dfd){return(!!dfd.ioArgs["_finished"]);},function(dfd){if(dfd.ioArgs._finished){dfd.callback(dfd);}else{dfd.errback(new Error("Invalid dojo.io.iframe request state"));}});return dfd;},_currentDfd:null,_dfdQueue:[],_iframeName:dojo._scopeName+"IoIframe",_fireNextRequest:function(){try{if((this._currentDfd)||(this._dfdQueue.length==0)){return;}
do{var dfd=this._currentDfd=this._dfdQueue.shift();}while(dfd&&dfd.canceled&&this._dfdQueue.length);if(!dfd||dfd.canceled){this._currentDfd=null;return;}
var ioArgs=dfd.ioArgs;var args=ioArgs.args;ioArgs._contentToClean=[];var fn=dojo.byId(args["form"]);var content=args["content"]||{};if(fn){if(content){var pHandler=function(name,value){var tn;if(dojo.isIE){tn=dojo.doc.createElement("<input type='hidden' name='"+name+"'>");}else{tn=dojo.doc.createElement("input");tn.type="hidden";tn.name=name;}
tn.value=value;fn.appendChild(tn);ioArgs._contentToClean.push(name);};for(var x in content){var val=content[x];if(dojo.isArray(val)&&val.length>1){var i;for(i=0;i<val.length;i++){pHandler(x,val[i]);}}else{if(!fn[x]){pHandler(x,val);}else{fn[x].value=val;}}}}
var actnNode=fn.getAttributeNode("action");var mthdNode=fn.getAttributeNode("method");var trgtNode=fn.getAttributeNode("target");if(args["url"]){ioArgs._originalAction=actnNode?actnNode.value:null;if(actnNode){actnNode.value=args.url;}else{fn.setAttribute("action",args.url);}}
if(!mthdNode||!mthdNode.value){if(mthdNode){mthdNode.value=(args["method"])?args["method"]:"post";}else{fn.setAttribute("method",(args["method"])?args["method"]:"post");}}
ioArgs._originalTarget=trgtNode?trgtNode.value:null;if(trgtNode){trgtNode.value=this._iframeName;}else{fn.setAttribute("target",this._iframeName);}
fn.target=this._iframeName;dojo._ioNotifyStart(dfd);fn.submit();}else{var tmpUrl=args.url+(args.url.indexOf("?")>-1?"&":"?")+ioArgs.query;dojo._ioNotifyStart(dfd);this.setSrc(this._frame,tmpUrl,true);}}catch(e){dfd.errback(e);}},_iframeOnload:function(){var dfd=this._currentDfd;if(!dfd){this._fireNextRequest();return;}
var ioArgs=dfd.ioArgs;var args=ioArgs.args;var fNode=dojo.byId(args.form);if(fNode){var toClean=ioArgs._contentToClean;for(var i=0;i<toClean.length;i++){var key=toClean[i];for(var j=0;j<fNode.childNodes.length;j++){var chNode=fNode.childNodes[j];if(chNode.name==key){dojo.destroy(chNode);break;}}}
if(ioArgs["_originalAction"]){fNode.setAttribute("action",ioArgs._originalAction);}
if(ioArgs["_originalTarget"]){fNode.setAttribute("target",ioArgs._originalTarget);fNode.target=ioArgs._originalTarget;}}
ioArgs._finished=true;}}
dojo.provide("dijit._base.place");dojo.require("dojo.AdapterRegistry");dijit.getViewport=function(){var scrollRoot=(dojo.doc.compatMode=='BackCompat')?dojo.body():dojo.doc.documentElement;var scroll=dojo._docScroll();return{w:scrollRoot.clientWidth,h:scrollRoot.clientHeight,l:scroll.x,t:scroll.y};};dijit.placeOnScreen=function(node,pos,corners,padding){var choices=dojo.map(corners,function(corner){var c={corner:corner,pos:{x:pos.x,y:pos.y}};if(padding){c.pos.x+=corner.charAt(1)=='L'?padding.x:-padding.x;c.pos.y+=corner.charAt(0)=='T'?padding.y:-padding.y;}
return c;});return dijit._place(node,choices);}
dijit._place=function(node,choices,layoutNode){var view=dijit.getViewport();if(!node.parentNode||String(node.parentNode.tagName).toLowerCase()!="body"){dojo.body().appendChild(node);}
var best=null;dojo.some(choices,function(choice){var corner=choice.corner;var pos=choice.pos;if(layoutNode){layoutNode(node,choice.aroundCorner,corner);}
var style=node.style;var oldDisplay=style.display;var oldVis=style.visibility;style.visibility="hidden";style.display="";var mb=dojo.marginBox(node);style.display=oldDisplay;style.visibility=oldVis;var startX=(corner.charAt(1)=='L'?pos.x:Math.max(view.l,pos.x-mb.w)),startY=(corner.charAt(0)=='T'?pos.y:Math.max(view.t,pos.y-mb.h)),endX=(corner.charAt(1)=='L'?Math.min(view.l+view.w,startX+mb.w):pos.x),endY=(corner.charAt(0)=='T'?Math.min(view.t+view.h,startY+mb.h):pos.y),width=endX-startX,height=endY-startY,overflow=(mb.w-width)+(mb.h-height);if(best==null||overflow<best.overflow){best={corner:corner,aroundCorner:choice.aroundCorner,x:startX,y:startY,w:width,h:height,overflow:overflow};}
return!overflow;});node.style.left=best.x+"px";node.style.top=best.y+"px";if(best.overflow&&layoutNode){layoutNode(node,best.aroundCorner,best.corner);}
return best;}
dijit.placeOnScreenAroundNode=function(node,aroundNode,aroundCorners,layoutNode){aroundNode=dojo.byId(aroundNode);var oldDisplay=aroundNode.style.display;aroundNode.style.display="";var aroundNodePos=dojo.position(aroundNode,true);aroundNode.style.display=oldDisplay;return dijit._placeOnScreenAroundRect(node,aroundNodePos.x,aroundNodePos.y,aroundNodePos.w,aroundNodePos.h,aroundCorners,layoutNode);};dijit.placeOnScreenAroundRectangle=function(node,aroundRect,aroundCorners,layoutNode){return dijit._placeOnScreenAroundRect(node,aroundRect.x,aroundRect.y,aroundRect.width,aroundRect.height,aroundCorners,layoutNode);};dijit._placeOnScreenAroundRect=function(node,x,y,width,height,aroundCorners,layoutNode){var choices=[];for(var nodeCorner in aroundCorners){choices.push({aroundCorner:nodeCorner,corner:aroundCorners[nodeCorner],pos:{x:x+(nodeCorner.charAt(1)=='L'?0:width),y:y+(nodeCorner.charAt(0)=='T'?0:height)}});}
return dijit._place(node,choices,layoutNode);};dijit.placementRegistry=new dojo.AdapterRegistry();dijit.placementRegistry.register("node",function(n,x){return typeof x=="object"&&typeof x.offsetWidth!="undefined"&&typeof x.offsetHeight!="undefined";},dijit.placeOnScreenAroundNode);dijit.placementRegistry.register("rect",function(n,x){return typeof x=="object"&&"x"in x&&"y"in x&&"width"in x&&"height"in x;},dijit.placeOnScreenAroundRectangle);dijit.placeOnScreenAroundElement=function(node,aroundElement,aroundCorners,layoutNode){return dijit.placementRegistry.match.apply(dijit.placementRegistry,arguments);};dijit.getPopupAlignment=function(position,leftToRight){var align={};dojo.forEach(position,function(pos){switch(pos){case"after":align[leftToRight?"BR":"BL"]=leftToRight?"BL":"BR";break;case"before":align[leftToRight?"BL":"BR"]=leftToRight?"BR":"BL";break;case"below":align[leftToRight?"BL":"BR"]=leftToRight?"TL":"TR";align[leftToRight?"BR":"BL"]=leftToRight?"TR":"TL";break;case"above":default:align[leftToRight?"TL":"TR"]=leftToRight?"BL":"BR";align[leftToRight?"TR":"TL"]=leftToRight?"BR":"BL";break;}});return align;};dijit.getPopupAroundAlignment=function(position,leftToRight){var align={};dojo.forEach(position,function(pos){switch(pos){case"after":align[leftToRight?"BR":"BL"]=leftToRight?"BL":"BR";break;case"before":align[leftToRight?"BL":"BR"]=leftToRight?"BR":"BL";break;case"below":align[leftToRight?"BL":"BR"]=leftToRight?"TL":"TR";align[leftToRight?"BR":"BL"]=leftToRight?"TR":"TL";break;case"above":default:align[leftToRight?"TL":"TR"]=leftToRight?"BL":"BR";align[leftToRight?"TR":"TL"]=leftToRight?"BR":"BL";break;}});return align;};