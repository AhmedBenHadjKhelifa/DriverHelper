this.jsviews||this.jQuery&&jQuery.views||function(global,undefined){function setDelimiters(e,t){if(!jsv.rTag||arguments.length)delimOpenChar0=e?"\\"+e.charAt(0):delimOpenChar0,delimOpenChar1=e?"\\"+e.charAt(1):delimOpenChar1,delimCloseChar0=t?"\\"+t.charAt(0):delimCloseChar0,delimCloseChar1=t?"\\"+t.charAt(0):delimCloseChar1,jsv.rTag=rTag="(?:(?:(\\w+(?=[\\/\\s"+delimCloseChar0+"]))|(?:(\\w+)?(:)|(>)|(\\*)))"+"\\s*((?:[^"+delimCloseChar0+"]|"+delimCloseChar0+"(?!"+delimCloseChar1+"))*?)",rTag=new RegExp(delimOpenChar0+delimOpenChar1+rTag+"(\\/)?|(?:\\/(\\w+)))"+delimCloseChar0+delimCloseChar1,"g"),rTmplString=new RegExp("<.*>|"+e+".*"+t);return[delimOpenChar0,delimOpenChar1,delimCloseChar0,delimCloseChar1]}function getHelper(e){var t=this,n=t.tmpl.helpers||{};return e=(t.ctx[e]!==undefined?t.ctx:n[e]!==undefined?n:helpers[e]!==undefined?helpers:{})[e],typeof e!="function"?e:function(){return e.apply(t,arguments)}}function convert(e,t,n,r){var i=n.converters;return e=i&&i[e]||converters[e],e?e.call(t,r):r}function renderTag(e,t,n,r,i,s){var o,u=n.tags,a=n.templates,f=s.props&&s.props.tmpl,l=arguments,c=u&&u[e]||tags[e];return c?(i=i&&n.tmpls[i-1],f=f||i||undefined,s.tmpl=""+f===f?a&&a[f]||templates[f]||templates(f):f,s.isTag=TRUE,s.converter=r,s.view=t,s.renderContent=renderContent,o=c.apply(s,l.length>6?slice.call(l,6):[]),o||(o==undefined?"":o.toString())):""}function View(e,t,n,r,i,s,o,u){var a,f={tmpl:i,path:t,parent:n,data:r,ctx:e,views:u?[]:{},isArray:u,_hlp:getHelper,_onRender:o};return n&&(a=n.views,n.isArray?a.splice(f.key=f.index=s!==undefined?s:a.length,0,f):(a[f.key="_"+autoViewKey++]=f,f.index=n.index)),f}function addToStore(e,t,n,r,i){var s,o;if(n&&typeof n=="object"&&!n.nodeType){for(s in n)t(s,n[s]);return e}if(!n||r===undefined)i&&(r=i(undefined,r||n));else if(""+n===n)if(r===null)delete t[n];else if(r=i?i(n,r):r)t[n]=r;return(o=sub.onStoreItem)&&o(t,n,r,i),r}function templates(e,t){return addToStore(this,templates,e,t,compile)}function tags(e,t){return addToStore(this,tags,e,t)}function helpers(e,t){return addToStore(this,helpers,e,t)}function converters(e,t){return addToStore(this,converters,e,t)}function renderContent(e,t,n,r,i,s){var o,u,a,f,l,c,h,p,d,s,v,m,g,y=this,b="";r===TRUE&&(m=TRUE,r=0),y.isTag?(d=y.tmpl,y.props&&y.ctx&&extend(y.ctx,y.props),y.ctx&&t&&(t=extend(y.ctx,t)),t=y.ctx||t,i=i||y.view,n=n||y.path,r=r||y.key,v=y.props):d=y.jquery&&y[0]||y;if(d){i?(p=i.ctx,e===i&&(e=i.data,g=TRUE),s=s||i._onRender):p=jsv.helpers,t=t&&t!==p?extend(extend({},p),t):p,d.fn||(d=templates[d]||templates(d));if(d){if($.isArray(e)&&!g){f=m?i:r!==undefined&&i||View(t,n,i,e,d,r,s,TRUE);var w=createIterator("foreach",e.length);for(o=0,u=e.length;o<u;o++)a=e[o],a.iterator=w,h=d.fn(a,View(t,n,f,a,d,(r||0)+o,s),jsv),b+=s?s(h,d,v):h,w.counter++}else f=m?i:View(t,n,i,e,d,r,s),f._onRender=s,b+=d.fn(e,f,jsv);return s?s(b,d,v,f.key,n):b}}return""}function syntaxError(e,t){throw(t?t.name+': "'+t.message+'"':"Syntax error")+(e?" \n"+e:"")}function tmplFn(e,t,n){function k(t){t-=S,t&&T.push(e.substr(S,t).replace(rNewLine,"\\n"))}function L(t,i,s,o,u,a,f,l,c,h){u&&(o=":",s="html");var p="",d="",v=!l&&!o&&!n;i=i||o,k(h),S=h+t.length;if(a)y&&T.push(["*",f.replace(rUnescapeQuotes,"$1")]);else if(i){i==="else"&&(N[5]=e.substring(N[5],h),N=x.pop(),T=N[3],v=TRUE);if(i==="set"||i==="continueIf"||i==="breakIf")v=!1;f=f?parseParams(f,n).replace(rBuildHash,function(e,t,n){return t?d+=n+",":p+=n+",",""}):"",p=p.slice(0,-1),f=f.slice(0,-1),r=[i,s||"",f,v&&[],"{"+(p?"props:{"+p+"},":"")+"path:'"+f+"'"+(d?",ctx:{"+d.slice(0,-1)+"}":"")+"}"],v&&(x.push(N),N=r,N[5]=S),T.push(r)}else c&&(N[5]=e.substring(N[5],h),N=x.pop());if(!N)throw"Expected block tag";T=N[3]}var r,i,s,o,u,a,f,l,c,h,p,d,v,m,g,y,b=t?{allowCode:y=t.allowCode,debug:t.debug}:{},w=t&&t.tmpls,E=[],S=0,x=[],T=E,N=[,,,E],C=0;e=e.replace(rEscapeQuotes,"\\$1"),e.replace(rTag,L),k(e.length),o=E.length,u=o?"":'"";';for(s=0;s<o;s++)i=E[s],""+i===i?u+='"'+i+'"+':i[0]==="*"?u=u.slice(0,s?-1:-3)+";"+i[1]+(s+1<o?"ret+=":""):(p=i[0],d=i[1],v=i[2],T=i[3],m=i[4],e=i[5],T&&(g=TmplObject(e,b,t,C++),tmplFn(e,g),w.push(g)),h=h||m.indexOf("view")>-1,u+=(p===":"?d==="html"?(f=TRUE,"e("+v):d?(c=TRUE,'c("'+d+'",view,this,'+v):(l=TRUE,"((v="+v+')!=u?v:""'):(a=TRUE,'t("'+p+'",view,this,"'+(d||"")+'",'+(T?w.length:'""')+","+m+(v?",":"")+v))+")+");u=fnDeclStr+(l?"v,":"")+(a?"t=j._tag,":"")+(c?"c=j._convert,":"")+(f?"e=j.converters.html,":"")+"ret; try{\n\n"+(b.debug?"debugger;":"")+(y?"ret=":"return ")+u.slice(0,-1)+";\n\n"+(y?"return ret;":"")+"}catch(e){return j._err(e);}";try{u=new Function("data, view, j, b, u",u)}catch(A){syntaxError("Error in compiled template code:\n"+u,A)}return t&&(t.fn=u),u}function parseParams(e,t){function u(e,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E){function x(e,t,n,r,i,s,o){if(t){var u,a=(n?'view._hlp("'+n+'")':r?"view":"data")+(o?(i?"."+i:n?"":r?"":"."+t)+(s||""):(o=n?"":r?i||"":t,""));return u=o?"."+o:"",S||(a+=u),a=a.slice(0,9)==="view.data"?a.slice(5):a,S&&(a="b("+a+',"'+o+'")'+u),a}return e}l=l||"",a=a||u||m,f=f||p,d=d||w||"",l=l||"";var S=t&&d!=="(";if(!c)return o?(o=!g,o?e:'"'):s?(s=!y,s?e:'"'):(a?(i++,a):"")+(E?i?"":n?(n=FALSE,"\b"):",":h?(i&&syntaxError(),n=TRUE,"\b"+f+":"):f?f.replace(rPath,x)+(d?(r[++i]=TRUE,d):l):l?l:b?(r[i--]=FALSE,b)+(d?(r[++i]=TRUE,d):""):v?(r[i]||syntaxError(),","):u?"":(o=g,s=y,'"'));syntaxError()}var n,r={},i=0,s=FALSE,o=FALSE;return e=(e+" ").replace(rParams,u),e}function compile(e,t,n,r){function f(t){console.log("function: tmplOrMarkupFromStr");if(""+t===t||t.nodeType>0){try{s=t.nodeType>0?t:!rTmplString.test(t)&&jQuery&&jQuery(t)[0]}catch(i){}if(s){if(!s.type)return;t=templates[s.getAttribute(tmplAttr)],console.log("tmplOrMarkupFromStr in elem"),t||(console.log("tmplOrMarkupFromStr in !value"),e=e||"_"+autoTmplName++,s.setAttribute(tmplAttr,e),t=compile(e,s.innerHTML,n,r),templates[e]=t)}return t}}console.log("function: compile(name, tmpl, parent, options) :");var i,s,o,u,a;t=t||"",i=f(t),r=r||(t.markup?t:{}),r.name=e,u=r.templates,!i&&t.markup&&(i=f(t.markup))&&i.fn&&(i.debug!==t.debug||i.allowCode!==t.allowCode)&&(i=i.markup);if(i!==undefined){e&&!n&&(render[e]=function(){return t.render.apply(t,arguments)}),i.fn||t.fn?i.fn&&(e&&e!==i.name?t=extend(extend({},i),r):t=i):(t=TmplObject(i,r,n,0),tmplFn(i,t));for(o in u)a=u[o],a.name!==o&&(console.log("nested"),u[o]=compile(o,a,t));return t}}function TmplObject(e,t,n,r){function i(e){n[e]&&(s[e]=extend(extend({},n[e]),t[e]))}t=t||{};var s={markup:e,tmpls:[],links:[],render:renderContent};return n&&(n.templates&&(s.templates=extend(extend({},n.templates),t.templates)),s.parent=n,s.name=n.name+"["+r+"]",s.key=r),extend(s,t),n&&(i("templates"),i("tags"),i("helpers"),i("converters")),s}function replacerForHtml(e){return escapeMapForHtml[e]||(escapeMapForHtml[e]="&#"+e.charCodeAt(0)+";")}function createIterator(e,t){return{counter:1,loopType:e!=undefined?e:"for",loops:t!=undefined?t:-1,isOdd:function(){return this.counter%2==1},isEven:function(){return this.counter%2==0},isFirst:function(){return this.counter==1},isLast:function(){return this.loopType!="while"&&this.counter>=this.loops}}}var versionNumber="v1.0pre",$,rTag,rTmplString,extend,delimOpenChar0="{",delimOpenChar1="{",delimCloseChar0="}",delimCloseChar1="}",sub={},FALSE=!1,TRUE=!0,jQuery=global.jQuery,rPath=/^(?:null|true|false|\d[\d.]*|([\w$]+|~([\w$]+)|#(view|([\w$]+))?)([\w$.]*?)(?:[.[]([\w$]+)\]?)?|(['"]).*\8)$/g,rParams=/(\()(?=|\s*\()|(?:([([])\s*)?(?:([#~]?[\w$.]+)?\s*((\+\+|--)|\+|-|&&|\|\||===|!==|==|!=|<=|>=|[<>%*!:?\/]|(=))\s*|([#~]?[\w$.]+)([([])?)|(,\s*)|(\(?)\\?(?:(')|("))|(?:\s*([)\]])([([]?))|(\s+)/g,rNewLine=/\r?\n/g,rUnescapeQuotes=/\\(['"])/g,rEscapeQuotes=/\\?(['"])/g,rBuildHash=/\x08(~)?([^\x08]+)\x08/g,autoViewKey=0,autoTmplName=0,escapeMapForHtml={"&":"&amp;","<":"&lt;",">":"&gt;"},tmplAttr="data-jsv-tmpl",fnDeclStr="var j=j||"+(jQuery?"jQuery.":"js")+"views,",htmlSpecialChar=/[\x00"&'<>]/g,slice=Array.prototype.slice,render={},jsv={jsviews:versionNumber,sub:sub,debugMode:TRUE,render:render,templates:templates,tags:tags,helpers:helpers,converters:converters,View:View,delimiters:setDelimiters,_convert:convert,_err:function(e){return jsv.debugMode?"<br/><b>Error:</b> <em> "+(e.message||e)+". </em>":'""'},_tmplFn:tmplFn,_tag:renderTag};jQuery?($=jQuery,$.templates=templates,$.render=render,$.views=jsv,$.fn.render=renderContent):($=global.jsviews=jsv,$.extend=function(e,t){var n;e=e||{};for(n in t)e[n]=t[n];return e},$.isArray=Array&&Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"}),extend=$.extend,tags({"if":function(){var e=this,t=e.view;return t.onElse=function(e,n){var r=0,i=n.length;while(i&&!n[r++])if(r===i)return"";return t.onElse=undefined,e.path="",e.renderContent(t)},t.onElse(this,arguments)},"else":function(){var e=this.view;return e.onElse?e.onElse(this,arguments):""},foreach:function(){var e,t=this,n="",r=arguments,i=r.length;i===0&&(i=1);for(e=0;e<i;e++)n+=t.renderContent(r[e]);return n},"while":function(){var self=this,view=this.view,data=view.data,args=this.path,returnContent="",temp="",cond=!1,iterator=createIterator("while");for(;;){view.data.iterator=iterator,returnContent=self.renderContent(data),helpers.iterator.counter++,cond=eval(args);if(!cond)break}return returnContent},"for":function(){var e=this,t=this.view,n=this.path.split(",");if((n.length!=5||n.length!=7)&&n[0].length<5&&n[1]!="data.from"&&n[3]!="data.to")return"";var r=n[0].substr(5),s=arguments[2],o=arguments[4],u=0;n.length==7&&n[5]=="data.by"&&arguments[6]>0?u=arguments[6]:u=1;var a="",f=createIterator("for",Math.floor(Math.abs(o-s)/u)+1);if(s<=o)for(i=s;i<=o;i+=u)t.data.iterator=f,t.data[r]=i,a+=e.renderContent(t.data),f.counter++;else for(i=s;i>=o;i-=u)t.data.iterator=f,t.data[r]=i,a+=e.renderContent(t.data),f.counter++;return a},set:function(){var data=this.view.data,args=this.path.split(",");eval(args[0]+"="+args[1]);return},"#":function(){return},"*":function(e){return e}}),helpers({}),converters({html:function(e){return e!=undefined?String(e).replace(htmlSpecialChar,replacerForHtml):""},encode:function(e){return e!=undefined?encodeURI(e):""},escape:function(e){return e!=undefined?escape(e):""}}),setDelimiters()}(this)