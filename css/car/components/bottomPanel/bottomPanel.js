/**
 * @module CarTheme
 **/

(function ($) {
    "use strict";
    /**
     * Class which provides methods to fill content of bottom panel for JQuery plugin. Use following snippet to include component in your `index.html` file:
     *
     *     <script type="text/javascript" src="./css/car/components/bottomPanel/bottomPanel.js"></script>
     *
     * and following code to initialize:
     *
     *     $('#bottomPanel').bottomPanel('init', true);
     *
     * @class BottomPanel
     * @constructor
     * @static
     */
    var BottomPanel = {
            /**
             * Holds current object of this JQuery plugin.
             * @property thisObj {Object}
             */
            thisObj: null,
            /**
             * Initializes bottom panel.
             * @method init
             * @param backButtonDisabled {Bool} Indicates if bottom panel should contain back button.
             */
            init: function (backButtonDisabled) {
                if (!backButtonDisabled) {
                    this.append('<div class="bottomBackButton bottomBackButtonBackgroundImg" onclick="$(\'#' +
                            this.attr('id') + '\').bottomPanel(\'onBackButtonClick\');">' +
                            '</div>' + '<div class="bottomPanelLogo bottomPanelLogoImg">' +
                            '</div>');
                } else {
                    this.append('<div class="bottomPanelLogo bottomPanelLogoImg">' + '</div>');
                }
                BottomPanel.thisObj = this;
            },
            /**
             * Method is invoked after click on back button, fires clickOnBackButton event and causes application exit.
             * @method onBackButtonClick
             */
            onBackButtonClick: function () {
                BottomPanel.thisObj.trigger("clickOnBackButton");
                if (typeof (tizen.application.getCurrentApplication) !== "undefined") {
                    tizen.application.getCurrentApplication().exit();
                }
            }
        };

    /**
     * jQuery constructor for {{#crossLink "BottomPanel"}}{{/crossLink}} plugin.
     * @param method {Object|jQuery selector} Identificator (name) of method or jQuery selector.
     * @for jQuery
     * @method bottomPanel
     * @return Result of called method.
     */
    $.fn.bottomPanel = function (method) {
        // Method calling logic
        if (BottomPanel[method]) {
            return BottomPanel[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }

        if (typeof method === 'object' || !method) {
            return BottomPanel.init.apply(this, arguments);
        }

        $.error('Method ' +  method + ' does not exist on jQuery.infoPanelAPI');
    };
}(jQuery));
