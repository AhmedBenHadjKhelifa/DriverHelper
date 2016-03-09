function parseInteger(e){"use strict";return parseInt(e,10)}var CarIndicator=function(){"use strict";console.info("Starting up service CarIndicator")};typeof Zone!="function"&&(window.Zone=function(){return undefined}),CarIndicator.prototype._listeners={},CarIndicator.prototype._listenerIDs=[],CarIndicator.prototype._mappingTable={instantConsumption:{attributeName:"instantConsumption",callBackPropertyName:"instantConsumption",interfaceName:"fuel"},TirePressureLeftFront:{attributeName:"pressure",callBackPropertyName:"tirePressureLeftFront",interfaceName:"tire"},HeadlightStatus:{attributeName:"head",callBackPropertyName:"headlightStatus",interfaceName:"lightStatus"},HighBeamStatus:{attributeName:"highBeam",callBackPropertyName:"highBeamStatus",interfaceName:"lightStatus"},RightIndicStatus:{attributeName:"rightTurn",callBackPropertyName:"rightIndicStatus",interfaceName:"lightStatus"},LeftIndicStatus:{attributeName:"leftTurn",callBackPropertyName:"leftIndicStatus",interfaceName:"lightStatus"},HazardStatus:{attributeName:"hazard",callBackPropertyName:"hazardStatus",interfaceName:"lightStatus"},ParkingBrakeState:{attributeName:"status",callBackPropertyName:"parkingBrakestatus",interfaceName:"parkingBrake"},RainLevel:{attributeName:"rain",callBackPropertyName:"rainLevel",interfaceName:"rainSensor"},SeatbeltStatus:{attributeName:"seatbelt",callBackPropertyName:"seatbeltStatus",interfaceName:"seat"},EngineOilLevel:{attributeName:"remaining",callBackPropertyName:"engineOilLevel",interfaceName:"engineOil"},EngineOilTemp:{attributeName:"temperature",callBackPropertyName:"engineOilTemp",interfaceName:"engineOil"},EngineOilPressure:{attributeName:"pressure",callBackPropertyName:"engineOilPressure",interfaceName:"engineOil"},EngineCoolantLevel:{attributeName:"level",callBackPropertyName:"engineCoolantLevel",interfaceName:"engineCoolant"},EngineCoolantTemp:{attributeName:"temperature",callBackPropertyName:"engineCoolantTemp",interfaceName:"engineCoolant"},BrakeFluidLevel:{attributeName:"fluidLevel",callBackPropertyName:"brakeFluidLevel",interfaceName:"brakeMaintenance"},Odo:{attributeName:"distanceTotal",callBackPropertyName:"totalDistance",interfaceName:"odometer"},Odo2:{attributeName:"distanceSinceStart",callBackPropertyName:"distanceSinceStart",interfaceName:"odometer"},Carburant:{attributeName:"level",callBackPropertyName:"fuel",interfaceName:"fuel"},EngineSpeed:{attributeName:"speed",callBackPropertyName:"enginespeed",interfaceName:"engineSpeed"},BatteryVoltage:{attributeName:"voltage",callBackPropertyName:"batteryStatus",interfaceName:"batteryStatus",conversionFunction:parseInteger},VehicleSpeed:{attributeName:"speed",callBackPropertyName:"speed",interfaceName:"vehicleSpeed"},AirbagStatus:{attributeName:"activated",callBackPropertyName:"airbagState",interfaceName:"airbagStatus"}},CarIndicator.prototype.addListener=function(e){"use strict";var t=Math.floor(Math.random()*1e6),n=this;this._listeners[t]=e,this._listenerIDs.push(t);var r=function(e){n.onDataUpdate(e,n)};for(var i in e)if(e.hasOwnProperty(i)){var s=i.replace("on","").replace("Changed","");for(var o in this._mappingTable)if(this._mappingTable.hasOwnProperty(o)){var u=this._mappingTable[o],a=u.zone,f=o;u.interfaceName!=="undefined"&&(f=u.interfaceName);if(u.callBackPropertyName.toLowerCase()===s.toLowerCase()&&!u.subscribeCount){u.subscribeCount=typeof u.subscribeCount=="undefined"?0:u.subscribeCount++;if(typeof navigator.vehicle!="undefined")if(typeof navigator.vehicle[f]!="undefined"){if(f.toString().trim().toLowerCase()!=="nightmode"||t!==this._listenerIDs[0])if(navigator.vehicle[f]){var l=navigator.vehicle[f].get(a);l!==undefined&&n.onDataUpdate(l,n,t)}typeof navigator.vehicle[f].subscribe!="undefined"&&(console.log("Modello: Subscribing to AMB signal - "+f),navigator.vehicle[f].subscribe(r,a))}else typeof navigator.vehicle[f]=="undefined"?console.warn(f+" is not available to subscribe to"):console.warn("Tizen API is not available, cannot subscribe to signal",o);else console.warn("Vehicle API is not available.")}}}return t},CarIndicator.prototype.onDataUpdate=function(e,t,n){"use strict";if(e!==undefined){if(e.zone!==undefined)var r=e.zone.toString(2);else var r="0";var i;for(var s in e)if(e.hasOwnProperty(s)){i=undefined;if(s!=="time"&&s!=="zone"&&s!=="interfaceName"&&s.search("Sequence")===-1){for(var o in t._mappingTable)if(t._mappingTable.hasOwnProperty(o)&&t._mappingTable[o].interfaceName!==undefined&&t._mappingTable[o].interfaceName.toLowerCase()===e.interfaceName.toLowerCase()&&t._mappingTable[o].attributeName.toLowerCase()===s.toLowerCase()&&(!t._mappingTable[o].zone&&(!e.zone||e.zone.value.length===0)||t._mappingTable[o].zone&&e.zone&&typeof t._mappingTable[o].zone.equals==typeof e.zone.equals&&t._mappingTable[o].zone.equals(e.zone))){i=t._mappingTable[o];break}if(typeof i!="undefined"){var u=e[s];u=i.conversionFunction?i.conversionFunction(u):u;var a=t.status[i.callBackPropertyName];if(a!==u||s.toUpperCase()==="nightMode".toUpperCase()){console.info(e.interfaceName+" "+s+" has changed to new value:"+u),t.status[i.callBackPropertyName]=u;var f="on"+i.callBackPropertyName[0].toUpperCase()+i.callBackPropertyName.substring(1)+"Changed",l;if(n!==undefined){l=t._listeners[n];if(typeof l[f]=="function")try{l[f](u,a)}catch(c){console.error("Error occured during executing listener",c)}}else for(var h in t._listeners)if(t._listeners.hasOwnProperty(h)){l=t._listeners[h];if(typeof l[f]=="function")try{l[f](u,a)}catch(c){console.error("Error occured during executing listener",c)}}}}}}}},CarIndicator.prototype.removeListener=function(e){"use strict";var t=this._listeners[e];for(var n in t)if(t.hasOwnProperty(n)){var r=n.replace("on","").replace("Changed","");for(var i in this._mappingTable)if(this._mappingTable.hasOwnProperty(i)){var s=this._mappingTable[i];s.subscribeCount===0?typeof navigator.vehicle!="undefined"?(navigator.vehicle.unsubscribe(i),s.subscribeCount=undefined):console.warn("Vehicle API is not available."):typeof s.subscribeCount!="undefined"&&s.subscribeCount--}}this._listeners[e]=undefined},CarIndicator.prototype.status={fanSpeed:0,targetTemperatureRight:0,targetTemperatureLeft:0,hazard:!1,frontDefrost:!1,rearDefrost:!1,frontLeftwhell:"",frontRightwhell:"",rearLeftwhell:"",rearRightwhell:"",childLock:!1,frontLights:!1,rearLights:!1,fan:!1,seatHeaterRight:0,seatHeaterLeft:0,airRecirculation:!1,airflowDirection:0,batteryStatus:58,fullBatteryRange:350,outsideTemp:74.2,insideTemp:68.2,wheelAngle:0,weather:1,avgKW:.28,speed:65,odoMeter:75126,gear:"D",nightMode:!1,randomize:!1,exteriorBrightness:1e3},CarIndicator.prototype.getStatus=function(e){"use strict";e(this.status)},CarIndicator.prototype.setStatus=function(e,t,n){"use strict";var r,i;for(var s in this._mappingTable)if(this._mappingTable.hasOwnProperty(s)){i=undefined;if(this._mappingTable[s].callBackPropertyName.toLowerCase()===e.toLowerCase()){r=this._mappingTable[s],i=this._mappingTable[s].attributeName;break}}if(i!==undefined){var o=r.interfaceName,u=r.zone&&r.zone.value?r.zone.value:undefined;if(typeof navigator.vehicle!="undefined")if(typeof navigator.vehicle[o]!="undefined"&&typeof navigator.vehicle[o].set!="undefined"){console.log("trying to set: "+o+"."+i+" in zone "+u+" to "+t);var a={};a[i]=t,navigator.vehicle[o].set(a,r.zone).then(function(){console.log("Set success!")},function(e){console.log("Set failed! "+e.message)})}else console.error("Can't set status for "+o+" because it doesn't exist "+e);else console.warn("Vehicle API is not available.")}}