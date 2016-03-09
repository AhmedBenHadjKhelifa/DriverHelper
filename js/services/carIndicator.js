/**
 * @module Services
 */

/**
 * Class provides AMB related functionality utilizing `navigator.vehicle` API for signals used in HTML applications. This component is usually initialized by {{#crossLink "Bootstrap"}}{{/crossLink}} class
 * and can be later accessed using {{#crossLink "Bootstrap/carIndicator:property"}}{{/crossLink}} property. Signals recognized by this class needs to be registered in property
 * {{#crossLink "CarIndicator/_mappingTable:property"}}{{/crossLink}}.
 *
 * To attach and detach to particular property register new callback object using {{#crossLink "Bootstrap/carIndicator:addListener"}}{{/crossLink}} method, e.g.:
 *
 *     var listenerId = bootstrap.carIndicator.addListener({
 *        onSteeringWheelAngleChanged: function(newValue){
 *           // Process new value
 *        },
 *        onWheelBrakeChanged : function(newValue){
 *           // Process new value
 *        }
 *     });
 *
 *     // Unregister listener
 *     bootstrap.carIndicator.removeListener(listenerId);
 *
 * Currently following signals are recognized:
 *
 * * SteeringWheelAngle
 *   * SteeringWheelAngle
 * * WheelBrake
 *   * Engaged
 * * TirePressure
 *   * leftFront
 *   * rightFront
 *   * leftRear
 *   * rightRear
 * * DoorStatus
 *   * ChildLockStatus
 * * WindowStatus
 *   * FrontDefrost
 *   * RearDefrost
 * * HVAC
 *   * FanSpeed
 *   * TargetTemperatureRight
 *   * TargetTemperatureLeft
 *   * SeatHeaterRight
 *   * SeatHeaterLeft
 *   * AirConditioning
 *   * AirRecirculation
 *   * AirflowDirection
 * * LightStatus
 *   * Hazard
 *   * Head
 *   * Parking
 * * BatteryStatus
 * * FullBatteryRange
 * * ExteriorTemperature
 *   * Exterior
 * * InteriorTemperature
 *   * Interior
 * * WheelInformation
 *   * FrontWheelRadius
 * * AvgKW
 *   * AvgKW
 * * VehicleSpeed
 * * Odometer
 * * Transmission
 *   * ShiftPosition
 * * ExteriorBrightness
 * * NightMode
 * * DirectionIndicationINST
 * * DirectionIndicationMS
 * * ACCommand
 * * RecircReq
 * * FrontTSetRightCmd
 * * FrontTSetLeftCmd
 * * FrontBlwrSpeedCmd
 * * HeatedSeatFRModeRequest
 * * HeatedSeatFRRequest
 * * HeatedSeatFLModeRequest
 * * HeatedSeatFLRequest
 * * FLHSDistrCmd
 * * FRHSDistrCmd
 *
 * @class CarIndicator
 * @constructor
 */
var CarIndicator = function() {
	"use strict";
	console.info("Starting up service CarIndicator");
};

if (typeof Zone !== 'function')
{
	window.Zone = function(){return undefined;};
}

function parseInteger(value) {
	"use strict";
	return parseInt(value, 10);
}
/**
 * Array of registered listeners
 * @type Object
 * @property _listeners
 * @private
 */
CarIndicator.prototype._listeners = {};

/**
 * Array of registered listener IDs.
 * @type Array
 * @property _listenerIDs
 * @private
 */
CarIndicator.prototype._listenerIDs = [];

/**
 * Signal mapping table.
 * Each entry should form an object
 * @property _mappingTable
 * @private
 * @type Object
 */
CarIndicator.prototype._mappingTable = {
		"instantConsumption" : {
			attributeName : "instantConsumption",
			callBackPropertyName : "instantConsumption",
			interfaceName : "fuel",
		},
		"TirePressureLeftFront" : {
			attributeName : "pressure",
			callBackPropertyName : "tirePressureLeftFront",
			interfaceName : "tire",
			//zone : new Zone(["Front","Left"])
		},
		"HeadlightStatus" : {
			attributeName : "head",
			callBackPropertyName : "headlightStatus",
			interfaceName : "lightStatus",
			
		},
		"HighBeamStatus" : {
			attributeName : "highBeam",
			callBackPropertyName : "highBeamStatus",
			interfaceName : "lightStatus",
			
		},
		"RightIndicStatus" : {
			attributeName : "rightTurn",
			callBackPropertyName : "rightIndicStatus",
			interfaceName : "lightStatus",
			
		},
		"LeftIndicStatus" : {
			attributeName : "leftTurn",
			callBackPropertyName : "leftIndicStatus",
			interfaceName : "lightStatus",
			
		},
		"HazardStatus" : {
			attributeName : "hazard",
			callBackPropertyName : "hazardStatus",
			interfaceName : "lightStatus",
			
		},
		"ParkingBrakeState" : {
			attributeName : "status",
			callBackPropertyName : "parkingBrakestatus",
			interfaceName : "parkingBrake",
		},
		"RainLevel" : {
			attributeName : "rain",
			callBackPropertyName : "rainLevel",
			interfaceName : "rainSensor",
		},
		"SeatbeltStatus" : {
			attributeName : "seatbelt",
			callBackPropertyName : "seatbeltStatus",
			interfaceName : "seat",
		},
		"EngineOilLevel" : {
			attributeName : "remaining",
			callBackPropertyName : "engineOilLevel",
			interfaceName : "engineOil",
		},
		"EngineOilTemp" : {
			attributeName : "temperature",
			callBackPropertyName : "engineOilTemp",
			interfaceName : "engineOil",
		},
		"EngineOilPressure" : {
			attributeName : "pressure",
			callBackPropertyName : "engineOilPressure",
			interfaceName : "engineOil",
		},
		"EngineCoolantLevel" : {
			attributeName : "level",
			callBackPropertyName : "engineCoolantLevel",
			interfaceName : "engineCoolant",
		},
		"EngineCoolantTemp" : {
			attributeName : "temperature",
			callBackPropertyName : "engineCoolantTemp",
			interfaceName : "engineCoolant",
		},
		"BrakeFluidLevel" : {
			attributeName : "fluidLevel",
			callBackPropertyName : "brakeFluidLevel",
			interfaceName : "brakeMaintenance",
		},
		"Odo" : {
			attributeName : "distanceTotal",
			callBackPropertyName : "totalDistance",
			interfaceName : "odometer",
		},
		"Odo2" : {
			attributeName : "distanceSinceStart",
			callBackPropertyName : "distanceSinceStart",
			interfaceName : "odometer",
			//	zone : new Zone(["Front","Left"])
		},
		"Carburant" : {
			attributeName : "level",
			callBackPropertyName : "fuel",
			interfaceName : "fuel"
		},
		
		/* end fuel controller*/
		"EngineSpeed" : {
			attributeName : "speed",//mil help
			callBackPropertyName : "enginespeed",//perso
			interfaceName : "engineSpeed" //mil help
		},
		"BatteryVoltage" : {
			attributeName : "voltage",
			callBackPropertyName : "batteryStatus",
			interfaceName : "batteryStatus",
			conversionFunction : parseInteger
		},
		"VehicleSpeed" : {
		attributeName : "speed",
		callBackPropertyName : "speed",
		interfaceName : "vehicleSpeed",
	},"AirbagStatus" : {
		attributeName : "activated",
		callBackPropertyName : "airbagState",
		interfaceName : "airbagStatus",
	}
};

/**
 * This method adds listener object for car events. Object should define function callbacks taking signal names from mapping table, e.g.:
 * @example
 *     {
 *        onBatteryChange: function(newValue, oldValue) {}
 *     }
 * Methods are called back with new and last known values.
 * @method addListener
 * @param callback {Object} object with callback functions.
 * @return {Integer} WatchID for later removal of listener.
 */
CarIndicator.prototype.addListener = function(aCallbackObject) {
	"use strict";
	var id = Math.floor(Math.random() * 1000000);
	var self = this;
	this._listeners[id] = aCallbackObject;
	this._listenerIDs.push(id);

	var subscribeCallback = function(data) {
		self.onDataUpdate(data, self);
	};
	for ( var i in aCallbackObject) {
		if (aCallbackObject.hasOwnProperty(i)) {
			var prop = i.replace("on", "").replace("Changed", "");

			for ( var signal in this._mappingTable) {
				if (this._mappingTable.hasOwnProperty(signal)) {
					var mapping = this._mappingTable[signal];
					var zone = mapping.zone;
					var interfaceName = signal;

					if (mapping.interfaceName !== "undefined") {
						interfaceName = mapping.interfaceName;
					}

					if (mapping.callBackPropertyName.toLowerCase() === prop.toLowerCase() && !mapping.subscribeCount) {
						mapping.subscribeCount = typeof (mapping.subscribeCount) === "undefined" ? 0 : mapping.subscribeCount++;
						if (typeof (navigator.vehicle) !== 'undefined') {
							if (typeof (navigator.vehicle[interfaceName]) !== "undefined") {
								if (!(interfaceName.toString().trim().toLowerCase() === "nightmode" && id === this._listenerIDs[0])) {
									if (navigator.vehicle[interfaceName]){
										var setUpData = navigator.vehicle[interfaceName].get(zone);
										if (setUpData !== undefined)
											self.onDataUpdate(setUpData, self, id);
									}
								}
								if (typeof (navigator.vehicle[interfaceName].subscribe) !== "undefined")
								{
									console.log("Modello: Subscribing to AMB signal - " + interfaceName);
									navigator.vehicle[interfaceName].subscribe(subscribeCallback, zone);
								}
							} else {
								if (typeof (navigator.vehicle[interfaceName]) === "undefined")
									console.warn(interfaceName + " is not available to subscribe to");
								else
									console.warn("Tizen API is not available, cannot subscribe to signal", signal);
							}
						} else {
							console.warn("Vehicle API is not available.");
						}
					}
				}
			}
		}
	}

	return id;
};
/**
 * This method is call as callback if data oon navigator.vehicle was change onDataUpdate
 * @method onDataUpdate
 * @param data {object} object whit new data.
 * @param self {object} this carIndicator Object.
 * @param lisenersID {int} id of listener.
 */
CarIndicator.prototype.onDataUpdate = function(data, self, lisenersID) {
	"use strict";
	if (data !== undefined) {
		if (data.zone !== undefined)
			var zone = data.zone.toString(2);
		else
			var zone = "0";
		var mapping;

		for ( var property in data) {
			if (data.hasOwnProperty(property)) {
				mapping = undefined;
				if (property !== "time" && property !== "zone" && property !== "interfaceName" && property.search("Sequence") === -1) {
					for ( var element in self._mappingTable) {
						if (self._mappingTable.hasOwnProperty(element) && self._mappingTable[element].interfaceName !== undefined) {
							if (self._mappingTable[element].interfaceName.toLowerCase() === data.interfaceName.toLowerCase() &&
								self._mappingTable[element].attributeName.toLowerCase() === property.toLowerCase() &&
								((!self._mappingTable[element].zone && (!data.zone || data.zone.value.length === 0)) ||
									((self._mappingTable[element].zone && data.zone) &&
										(typeof(self._mappingTable[element].zone.equals) === typeof(data.zone.equals)) &&
										self._mappingTable[element].zone.equals(data.zone)))
								) {
									mapping = self._mappingTable[element];
									break;
							}
						}
					}

					if (typeof (mapping) !== 'undefined') {
						var value = data[property];
						value = mapping.conversionFunction ? mapping.conversionFunction(value) : value;

						var oldValue = self.status[mapping.callBackPropertyName];
						if (oldValue !== value || property.toUpperCase() === "nightMode".toUpperCase()) {
							console.info(data.interfaceName+" " + property + " has changed to new value:" + value);
							self.status[mapping.callBackPropertyName] = value;

							var callbackName = "on" + mapping.callBackPropertyName[0].toUpperCase() + mapping.callBackPropertyName.substring(1) + "Changed";
							var listener;

							if (lisenersID !== undefined) {
								listener = self._listeners[lisenersID];

								if (typeof (listener[callbackName]) === 'function') {
									try {
										listener[callbackName](value, oldValue);
									} catch (ex) {
										console.error("Error occured during executing listener", ex);
									}
								}
							} else {
								for ( var i in self._listeners) {
									if (self._listeners.hasOwnProperty(i)) {
										listener = self._listeners[i];

										if (typeof (listener[callbackName]) === 'function') {
											try {
												listener[callbackName](value, oldValue);
											} catch (ex) {
												console.error("Error occured during executing listener", ex);
											}
										}
									}
								}
							}
						}

					} else {
						//console.warn("Mapping for property '" + property + "' is not defined");
					}
				}
			}
		}
	}
};

/**
 * This method removes previosly added listener object. Use WatchID returned from addListener method.
 * @method removeListener
 * @param aId {Integer} WatchID.
 */
CarIndicator.prototype.removeListener = function(aId) {
	"use strict";
	var listener = this._listeners[aId];

	for ( var i in listener) {
		if (listener.hasOwnProperty(i)) {
			var prop = i.replace("on", "").replace("Changed", "");

			for ( var signal in this._mappingTable) {
				if (this._mappingTable.hasOwnProperty(signal)) {
					var mapping = this._mappingTable[signal];

					if (mapping.subscribeCount === 0) { // Last signal, unscubscribe
						if (typeof (navigator.vehicle) !== 'undefined') {
							navigator.vehicle.unsubscribe(signal);
							mapping.subscribeCount = undefined;
						} else {
							console.warn("Vehicle API is not available.");
						}
					} else if (typeof (mapping.subscribeCount) !== 'undefined') {
						mapping.subscribeCount--;
					}
				}
			}
		}
	}

	this._listeners[aId] = undefined;
};

/**
 * status object
 * @property status
 * @type Object
 * @private
 */
CarIndicator.prototype.status = {
	fanSpeed : 0,
	targetTemperatureRight : 0,
	targetTemperatureLeft : 0,
	hazard : false,
	frontDefrost : false,
	rearDefrost : false,
	frontLeftwhell : "",
	frontRightwhell : "",
	rearLeftwhell : "",
	rearRightwhell : "",
	childLock : false,
	frontLights : false,
	rearLights : false,
	fan : false,
	seatHeaterRight : 0,
	seatHeaterLeft : 0,
	airRecirculation : false,
	airflowDirection : 0,
	batteryStatus : 58,
	fullBatteryRange : 350,
	outsideTemp : 74.2,
	insideTemp : 68.2,
	wheelAngle : 0,
	weather : 1,
	avgKW : 0.28,
	speed : 65,
	odoMeter : 75126,
	gear : "D",
	nightMode : false,
	randomize : false,
	exteriorBrightness : 1000
};

/**
 * This method return status object in callback
 * @method getStatus
 * @param callback {function} callback function.
 */
CarIndicator.prototype.getStatus = function(callback) {
	"use strict";
	callback(this.status);
};

/**
 * this method set status for property in navigator.vehicle and status object
 * @method setStatus
 * @param indicator {string} indicator name.
 * @param status {??} ??.
 * @param text_status {string} new status .
 * @param callback {function} callback function.
 */
CarIndicator.prototype.setStatus = function(indicator, newValue, zone) {
	"use strict";
	var mappingElement, mappingProperty;
	for ( var element in this._mappingTable) {
		if (this._mappingTable.hasOwnProperty(element)) {
			mappingProperty = undefined;
			if (this._mappingTable[element].callBackPropertyName.toLowerCase() === indicator.toLowerCase()) {
				mappingElement = this._mappingTable[element];
				mappingProperty = this._mappingTable[element].attributeName;
				break;
			}
		}
	}

	if (mappingProperty !== undefined) {
		var objectName = mappingElement.interfaceName;
		var zoneValue = (mappingElement.zone && mappingElement.zone.value) ? mappingElement.zone.value : undefined;

		if (typeof (navigator.vehicle) !== 'undefined') {
			if (typeof (navigator.vehicle[objectName]) !== 'undefined' && typeof (navigator.vehicle[objectName].set) !== 'undefined') {
				console.log("trying to set: " + objectName + "." + mappingProperty + " in zone " + zoneValue + " to " + newValue);
				var value = {};
				value[mappingProperty] = newValue;
				navigator.vehicle[objectName].set(value, mappingElement.zone).then(function() {
				    console.log("Set success!");
				}, function(error) {
				    console.log("Set failed! " + error.message);
				});
			}
			else
				console.error("Can't set status for " + objectName + " because it doesn't exist " + indicator);

		} else {
			console.warn("Vehicle API is not available.");
		}
	}

};
