(function(e){"use strict";var t={playButton:null,shuffleButton:null,repeatButton:null,nextButton:null,prevButton:null,thisObj:null,show:function(n){t.thisObj.empty();var r=t.thisObj.attr("id");t.thisObj.append('<div id="prevButton" class="button previousBtn controlsBtn" onclick="$(\'#'+r+"').buttonControls('touch','prev')\"></div>"+'<div id="playButton" class="button pauseBtn controlsBtn" onclick="'+"$('#"+r+"').buttonControls('touch','play')\"></div>"+'<div  id="nextButton" class="button nextBtn controlsBtn" onclick="'+"$('#"+r+"').buttonControls('touch','next')\"></div>"),n&&t.thisObj.append('<div id="shuffleButton" class="button shuffleBtn" onclick="$(\'#'+r+"').buttonControls('touch','shuffle')\"></div>"+'<div id="repeatButton"  class="button repeatBtn" onclick="'+"$('#"+r+"').buttonControls('touch','repeat')\"></div>"),t.playButton=e("#playButton"),t.shuffleButton=e("#shuffleButton"),t.repeatButton=e("#repeatButton"),t.nextButton=e("#nextButton"),t.prevButton=e("#prevButton"),e(document).keypress(function(e){console.log("event.keyCode = "+e.keyCode),console.log("event.which = "+e.which);switch(e.keyCode){case 103:case 60:case 44:t.prevButton.hasClass("prevBtnInactive")||t.thisObj.trigger("previousSong");break;case 106:case 62:case 46:t.nextButton.hasClass("nextBtnInactive")||t.thisObj.trigger("nextSong");break;case 104:case 63:case 47:t.thisObj.trigger("playSong");break;case 107:case 123:case 91:t.thisObj.trigger("shuffleSong");break;case 108:case 125:case 93:t.thisObj.trigger("repeatSong");break;default:}})},initAudioPlayerButtons:function(){t.thisObj=this,t.show(!0),t.buttonRepeatInactive(),t.buttonShuffleInactive(),t.buttonPreviousActive(),t.buttonNextActive(),t.buttonPlayActive()},buttonPlayActive:function(){t.playButton!==null&&(t.playButton.removeClass("pauseBtn"),t.playButton.addClass("playBtn"))},buttonPauseActive:function(){t.playButton.removeClass("playBtn"),t.playButton.addClass("pauseBtn")},buttonShuffleActive:function(){t.shuffleButton!==null&&(t.shuffleButton.removeClass("shuffleBtn"),t.shuffleButton.addClass("shuffleBtnActive"))},buttonShuffleInactive:function(){t.shuffleButton!==null&&(t.shuffleButton.removeClass("shuffleBtnActive"),t.shuffleButton.addClass("shuffleBtn"))},buttonRepeatActive:function(){t.repeatButton!==null&&(t.repeatButton.removeClass("repeatBtn"),t.repeatButton.addClass("repeatBtnActive"))},buttonRepeatInactive:function(){t.repeatButton!==null&&(t.repeatButton.removeClass("repeatBtnActive"),t.repeatButton.addClass("repeatBtn"))},buttonNextActive:function(){t.nextButton.removeClass("nextBtnInactive")},buttonNextInactive:function(){t.nextButton.addClass("nextBtnInactive")},buttonPreviousActive:function(){t.prevButton.removeClass("prevBtnInactive")},buttonPreviousInactive:function(){t.prevButton.addClass("prevBtnInactive")},touch:function(e){switch(e){case"prev":t.prevButton.hasClass("prevBtnInactive")||t.thisObj.trigger("previousSong");break;case"play":t.thisObj.trigger("playSong");break;case"next":t.nextButton.hasClass("nextBtnInactive")||t.thisObj.trigger("nextSong");break;case"shuffle":t.thisObj.trigger("shuffleSong");break;case"repeat":t.thisObj.trigger("repeatSong");break;default:}}};e.fn.buttonControls=function(n){if(t[n])return t[n].apply(this,Array.prototype.slice.call(arguments,1));if(typeof n=="object"||!n)return t.init.apply(this,arguments);e.error("Method "+n+" does not exist on jQuery.buttonControls")}})(jQuery)