/* global ThemeEngine, Settings, ko, $, loadTemplate */

/**
 * @module Settings
 */
/**
 * Themes class provides grid view of available themes, detection of theme changes and method of updating selected theme.
 *
 * This class requires following components:
 *
 * * {{#crossLink "Tabs"}}{{/crossLink}} component
 * * {{#crossLink "ThemeEngine"}}{{/crossLink}} component
 * * {{#crossLink "Settings"}}{{/crossLink}} component
 *
 * @class Themes
 * @constructor
 */
var Themes = function() {
	"use strict";
	var self = this;

	/**
	 * Marks a given user theme as selected.
	 *
	 * @method setTheme
	 * @param theme {Object} Object representing theme's information.
	 */
	this.setTheme = function(theme) {
		if (typeof ThemeEngine !== 'undefined') {
			ThemeEngine.setUserTheme(theme.id);
		}
	};

	this.toggleAnimation = function() {
		var animation = Configuration.get("animationEnabled");
		Configuration.set("animationEnabled", !animation);
		animation = Configuration.get("animationEnabled");
		self.animationEnabled(animation);
	}

	this.init();
};

/**
 * Contains array of available user themes.
 *
 * @property themes
 * @public
 * @type ko.observableArray
 * @default []
 */
Themes.prototype.themes = ko.observableArray([]);

/**
 * Adds a listener to receive notifications about theme changes and updates the list of available user themes.
 *
 * @method init
 */
Themes.prototype.init = function() {
	"use strict";
	var self = this;
	if (typeof ThemeEngine !== 'undefined') {
		ThemeEngine.addStatusListener(function(themeId) {
			self.loadThemes();
		});
	} else {
		console.error("ThemeEngine API is not available.");
	}
};

/**
 * Shows grid view of available user themes and allows to change theme.
 *
 * @method show
 */
Themes.prototype.show = function() {
	"use strict";
	var self = this;
	var subpanelModel = {
		textTitle : "SETTINGS",
		textSubtitle : "THEMES",
		actionName : "BACK",
		action : function() {
			Settings.renderSettingsView();
		}
	};
	var loadThemesUI = function() {
		if (!$("#themeList").length) {
			var themeList = '<div id="themeList" data-bind="template: { name: \'';
			themeList += templateName;
			themeList += '\', foreach: Settings.Theme.themes }"></div>';
			$(themeList).appendTo($('.' + themesContent));

			var animation = Configuration.get("animationEnabled");
			if (animation === undefined) {
				animation = true;
			}
			Configuration.set("animationEnabled", animation);
			self.animationEnabled(animation);

			var button = "";
			button = '<div id="animationButton" class="toggleButton subPanelToggleButton subPanelToggleButtonExtraWide" data-bind="click: Settings.Theme.toggleAnimation">';
			button += '<div class="bgColorThemeTransparent boxShadowInset toggleButtonBackground"></div>';
			button += '<div class="fontColorNormal fontSizeMedium fontWeightBold toggleButtonText" data-bind="text: Settings.Theme.animationEnabled() ? \'TURN OFF ANIMATION\' : \'TURN ON ANIMATION\'"></div>';
			button += '</div>';
			$(button).appendTo($('.tabsTopSubPanel'));

			ko.applyBindings(window.Settings);
		}
	};
	var themesContent = "themesContent";
	var templateName = "template-themes";
	Settings.domElement.tabs("clearContent");
	Settings.domElement.tabs("changeContentClass", themesContent);
	Settings.domElement.tabs("subpanelContentTemplateCompile", subpanelModel, function() {
		loadTemplate(Settings.SETTINGS_TEMPLATES_PATH, templateName, loadThemesUI);
	});
	self.loadThemes();
};

/**
 * Loads available user themes from ThemeEngine service.
 *
 * @method loadThemes
 */
Themes.prototype.loadThemes = function(successCallback) {
	"use strict";
	console.log("updateThemes called");
	var self = this;
	if (typeof ThemeEngine !== 'undefined') {
		ThemeEngine.getUserThemes(function(newThemes) {
			self.themes.removeAll();
			self.themes([]);
			for ( var i = 0; i < newThemes.length; ++i) {
				self.themes.push(newThemes[i]);
			}
		});
	}

/**
 * Indicates if animation is enabled
 *
 * @property animationEnabled
 * @public
 * @type ko.observable
 * @default true
 */
Themes.prototype.animationEnabled = ko.observable(true);
};