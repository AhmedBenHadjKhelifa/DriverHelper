Speech=function(){"use strict";function t(){console.info("Starting up service Speech"),this.vocalizeString(""),typeof tizen!="undefined"&&typeof tizen.content!="undefined"&&typeof tizen.speech.find!="undefined"&&tizen.content.find(function(e){},function(e){},null),this._initVoiceRecognition()}return t.prototype._listeners=[],t.prototype._initVoiceRecognition=function(){var e=this;console.log("Speech init voice recognition called.");if(typeof tizen.speech.setCBListener!="undefined")try{tizen.speech.setCBListener(function(t){console.log("Speech: onresult received");for(var n=0;n<t.length;n++){console.log("Speech: forloop, command = "+t[n]);var r=!1;switch(t[n].toString().trim().toLowerCase()){case"play":r=!0,e._callListener("onplay");break;case"next":e._callListener("onnext"),r=!0;break;case"previous":e._callListener("onprevious"),r=!0;break;case"stop":case"pause":e._callListener("onstop"),r=!0;break;case"launch_homescreen":case"launch_navigation":case"launch_dashboard":case"launch_store":case"launch_multimediaplayer":case"launch_phone":case"launch_hvac":case"launch_sdl":case"launch_simulator":var i=t[n].toString().trim().toLowerCase().substring(7);i==="homescreen"?i="home screen":i==="multimediaplayer"?i="multimedia player":i==="simulator"?i="amb simulator":i==="sdl"&&(i="smartdevicelink"),e._callListener("onapplicationlaunch",i),r=!0;break;case"install":e._callListener("onapplicationinstall"),r=!0;break;case"uninstall":e._callListener("onapplicationuninstall"),r=!0;break;case"call":e._callListener("oncall"),r=!0;break;default:}if(r)break}})}catch(t){console.log("Speech set callback listener FAILED + "+t.message),console.log(t)}else console.log("Speech set callback listener not supported.")},t.prototype.addVoiceRecognitionListener=function(e){this._listeners.push(e)},t.prototype._callListener=function(e,t){for(var n=0;n<this._listeners.length;++n)for(var r in this._listeners[n])if(r===e){this._listeners[n][r](t);break}},t.prototype.vocalizeString=function(e){console.log("Speech vocalize string called.");if(typeof tizen.speech.vocalizeString!="undefined")try{tizen.speech.vocalizeString(e)}catch(t){console.log("Speech vocalize string FAILED: "+t.message),console.log(t)}else console.log("Speech vocalize string not supported.")},t.prototype.readCurrentAppName=function(e){typeof tizen.application.getCurrentApplication!="undefined"&&this.vocalizeString(e)},window.__speech=undefined===window.__speech?new t:window.__speech,window.__speech}()