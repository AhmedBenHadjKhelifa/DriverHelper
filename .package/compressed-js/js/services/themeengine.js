var ThemeEngine=function(){"use strict";function e(){console.info("Starting up service ThemeEngine")}return e.prototype.selectedThemeKey="selectedTheme",e.prototype._reloadCallbacks=[],e.prototype._themes=[{id:"http://com.intel.tizen/blue",name:"Blue theme",type:"user",version:"0.5.1354227499444",selected:!0,icon:"icon.png",iconUrl:"./css/user/blue/icon.png",_dir:"blue"},{id:"http://com.intel.tizen/green",name:"Green theme",type:"user",version:"0.5.0",icon:"icon.png",iconUrl:"./css/user/green/icon.png",selected:!1,_dir:"green"}],e.prototype.init=function(e){var t=this;loadScript("./css/car/components/configuration/configuration.js",function(n,r){if(r==="ok"){var i=Configuration.get("selectedTheme");t._injectHeaders(i,function(){t._updateSelectedTheme(),Configuration.addUpdateListener(function(){var e=Configuration.get("selectedTheme"),n=t.getSelectedTheme();(!n||n.id!==e)&&t._injectHeaders(e,function(){t._updateSelectedTheme(),$(t._reloadCallbacks).each(function(){this(e)})})}),e()})}else e(r)})},e.prototype.addStatusListener=function(e){this._reloadCallbacks.push(e)},e.prototype._updateSelectedTheme=function(){var e=Configuration.get(this.selectedThemeKey);for(var t=0;t<this._themes.length;t++)this._themes[t].selected=this._themes[t].id===Configuration.get(this.selectedThemeKey)},e.prototype.getUserThemes=function(e){var t=this;window.setTimeout(function(){e(t._themes)},200)},e.prototype.setUserTheme=function(e){var t=Configuration.get("selectedTheme");e=e||t,e=e||"http://com.intel.tizen/blue",t!==e&&Configuration.set(this.selectedThemeKey,e)},e.prototype.getSelectedTheme=function(){for(var e=0;e<this._themes.length;++e)if(this._themes[e].selected)return this._themes[e];return null},e.prototype._injectHeaders=function(e,t){t=t||function(){};var n=this;$(this._themes).each(function(){var n=this;$('script[src="./css/user/'+n._dir+'/user.js"]').remove(),n.id===e&&($("head > *").each(function(){$(this).data("theme")==="user"&&$(this).remove()}),$('<link data-theme="user" rel="stylesheet" href="./css/user/'+n._dir+'/user.css" />').appendTo("head"),loadScript("./css/user/"+n._dir+"/user.js",function(n,r){r==="ok"&&t(e)},!0))})},window.__themeengine=undefined===window.__themeengine?new e:window.__themeengine,window.__themeengine}()