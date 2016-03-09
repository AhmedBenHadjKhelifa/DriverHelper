

/**
 * Reference to instance of dashBoardIndicator this class manage graphics elements on dasboard
 * @property dashBoardIndicator {dashBoardIndicator}
 */
//var dashBoardIndicator;

/**
 * Reference to instance of bootstrap class this class help booting  theme , config and carIndicator
 * @property bootstrap {Bootstrap}
 * @private
 */
var bootstrap=null;
/**
 * Holds map object.
 * @for NavigationGoogle
 * @private
 * @property map {Object}
 */


/**
 * Method initializes user interface and create events listeners for status indicators.
 * @method init
 */
var init = function () {
    "use strict";
   // dashBoardIndicator = new dashBoardControler();
    console.warn(bootstrap);
    bootstrap = new Bootstrap(function (status) {
			
        bootstrap.carIndicator.addListener({
        	onSpeedChanged : function(newValue) {
                ShowSpeed(newValue);
            },
            onFuelChanged : function(newValue) {
            	ShowFuelLevel(newValue);
            },
            onEnginespeedChanged : function(newValue) {
            	ShowEngineSpeed(newValue);
            },
            onFuelChanged : function(newValue) {
                ShowFuel(newValue);
            },onBatteryStatusChanged : function(newValue) {
                ShowBatteryStatus(newValue);
            },
            onTotalDistanceChanged : function(newValue) {
                ShowTotalDistance(newValue);
            },
            onParkingBrakestatusChanged : function(newValue) {
            	ShowParkingBrakestatus(newValue);
            },
            onHeadlightStatusChanged : function(newValue) {
            	ShowHeadLight(newValue);
            },
            onRightIndicStatusChanged : function(newValue) {
            	ShowRturnLight(newValue);
            },
            onHazardStatusChanged : function(newValue) {
            	ShowHazard(newValue);
            },
            onLeftIndicStatusChanged : function(newValue) {
            	ShowLturnLight(newValue);
            },
            onHighBeamStatusChanged : function(newValue) {
            	ShowHighBeam(newValue);
            },
            onSeatbeltStatusChanged : function(newValue) {
                ShowSeatbeltStatus(newValue);
            },
            onBrakeFluidLevelChanged : function(newValue) {
            	ShowBrakeFluidStatus(newValue);
            }, 
            onEngineCoolantLevelChanged : function(newValue) {
                ShowCoolantLevel(newValue);
            },
            onAirbagStateChanged : function(newValue) {
                ShowAirbagStatus(newValue);
            },
            onEngineCoolantTempChanged : function(newValue) {
            	ShowCoolantTemp(newValue);
            }
            
            
        });
        
    });
};

$(document).ready(init);
