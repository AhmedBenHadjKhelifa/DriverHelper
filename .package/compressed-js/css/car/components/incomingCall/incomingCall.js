var IncomingCall=function(){"use strict";var e=this;if(!$("#incomingCall").length){var t='<div id="incomingCall" class="incomingCall incomingCallHide ">',n='<div class = "pageBgColorNormalTransparent" style ="width:100%; height: 100%"></div>',r='<div id = "incomingCallTopPanel" class="tabsTopPanel"></div>';r+='<div id = "incomingCallTabs" class="tabsTab"></div>',r+='<div id ="incomingCallTitle" class="TopPanelTitle"></div>';var i='<div class = "callInfoBox">';i+='<div class = "callPhotoBox noContactPhoto">',i+='<img id = "incomingCallPhoto" class="callPhoto"></div>',i+="</div>",i+='<div id = "incomingCallName" class="callName fontSizeXLarge fontWeightBold fontColorNormal">unknown</div>',i+='<div id = "incomingCallNumber" class="callNumber fontSizeXLarge fontWeightBold fontColorTheme">unknown</div>';var s='<div id="incomingCallAccept" class="incomingCallAccept button callButton callingFalse boxShadow4Active" onClick = "bootstrap.incomingCall.acceptIncommingCall()"></div>';s+='<div id="incomingCallDeny" class="incomingCallDeny button callButton callingTrue boxShadow4Active" onClick = "bootstrap.incomingCall.denyCall()"></div>',t+=n+r+i+s,t+="</div></div>",$(t).appendTo("body"),$("#incomingCall .TopPanelTitle").boxCaptionPlugin("init","Incoming Call")}};IncomingCall.prototype.show=function(e){"use strict";if(e){if(e.name){var t=e.name.firstName||"";t+=e.name.lastName?" "+e.name.lastName:"",$("#incomingCallName").html(t)}e.phoneNumbers&&$("#incomingCallNumber").html(e.phoneNumbers[0]&&e.phoneNumbers[0].number?e.phoneNumbers[0].number:""),e.photoURI&&$("#incomingCallPhoto").attr("src",e.photoURI)}$("#incomingCall").hasClass("incomingCallHide")&&($("#incomingCall").removeClass("incomingCallHide"),$("#incomingCall").addClass("incomingCallShow"))},IncomingCall.prototype.hide=function(){"use strict";$("#incomingCall").hasClass("incomingCallShow")&&($("#incomingCall").removeClass("incomingCallShow"),$("#incomingCall").addClass("incomingCallHide"))},IncomingCall.prototype.acceptIncommingCall=function(){"use strict";this.hide();var e=getAppByID("Modello009.Phone");if(!e.running)launchApplication("Modello009.Phone");else if(typeof tizen!="undefined"&&tizen.phone){var t=tizen.phone.activeCall();acceptCall(t.contact)}},IncomingCall.prototype.denyCall=function(){"use strict";this.hide(),typeof tizen!="undefined"&&tizen.phone&&tizen.phone.hangupCall(function(e){console.log(e.message)})}