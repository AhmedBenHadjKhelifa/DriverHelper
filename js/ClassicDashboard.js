var looper;
var degrees = 1;
var signe=1;
var read=true;
var animation = 2;
var coolantlevelok=true;
var coolanttempok=true;
var left;
var right;
var hazard;

function ShowParkingBrakestatus(newValue){
	if(newValue=="inactive")
	$('#Pbrake').hide();
	else
	$('#Pbrake').show();
}

function ShowHighBeam(newValue){
	
	var compt=document.getElementById("compt");
	if (compt!=null)
	{
		if(newValue){
		$('#phare').show();
		}
		else{
			$('#phare').hide();
		}
	}
}

function ShowHeadLight(newValue){
	
	var compt=document.getElementById("compt");
	if (compt!=null)
	{
		if(newValue){
			compt.src="./img/compt2night.png";
			$('#code').show();
		}
		else{
			compt.src="./img/compt2.png";
			$('#code').hide();
		}
	}
}

function ShowLturnLight(newValue){
	
	var compt=document.getElementById("compt");
	if (compt!=null)
	{	
		if(newValue){
			$('#left').show();
			left=true;
		}
		else{
			left=false;
			if(!hazard)
			$('#left').hide();
			
		}
	}
}

function ShowHazard(newValue){
	
	var compt=document.getElementById("compt");
	if (compt!=null)
	{
		if(newValue){
			$('#left').show();
			$('#right').show();
			hazard=true;
		}
		else{
			hazard=false;
			if(!left)
			$('#left').hide();
			if(!right)
			$('#right').hide();
		}
	}
}

function ShowRturnLight(newValue){
	
	var compt=document.getElementById("compt");
	if (compt!=null)
	{	
		if(newValue){
			$('#right').show();
			right=true;
		}
		else{
			right=false;
			if(!hazard)
			$('#right').hide();
		}
	}
}

function ShowSeatbeltStatus(newValue){
	if(newValue)
	$('#SeatBelt').hide();
	else
	$('#SeatBelt').show();
}

function ShowBrakeFluidStatus(newValue){
	if((newValue>=90)&&(newValue<=100))
		$('#BrakeFluid').hide();
	else
		$('#BrakeFluid').show();
}

function ShowCoolantLevel(newValue){
	if(coolanttempok){
	if((newValue>=90)&&(newValue<=100))
		{
			coolantlevelok=true;
			document.getElementById("Coolant").src="./img/coolantok.png";
				
		}
	else{
		document.getElementById("Coolant").src="./img/coolant.png";
		coolantlevelok=false;
		}
	}
	
	if((newValue>=90)&&(newValue<=100))
	{
		coolantlevelok=true;
	}
else{
	coolantlevelok=false;
	}

}

function ShowCoolantTemp(newValue){
	SpeedCont=document.getElementById("Engine_Coolant_Temp");
	if(SpeedCont!=null)
	SpeedCont.innerHTML = newValue+"&deg;C";
	else
		{
		if(newValue<25)
			newValue=25;
		var angle=80+(parseInt(newValue)-30)*(200/150);
		console.log(angle);
		var elem = document.getElementById("AigTemp");
		if(navigator.userAgent.match("Chrome")){
			elem.style.WebkitTransform = "rotate("+angle+"deg)";
		} else if(navigator.userAgent.match("Firefox")){
			elem.style.MozTransform = "rotate("+angle+"deg)";
		} else if(navigator.userAgent.match("MSIE")){
			elem.style.msTransform = "rotate("+angle+"deg)";
		} else if(navigator.userAgent.match("Opera")){
			elem.style.OTransform = "rotate("+angle+"deg)";
		} else {
			elem.style.transform = "rotate("+angle+"deg)";
		}
		document.getElementById("AigTemp").innerHTML = "rotate("+angle+"deg)";
		}
		
	if((coolantlevelok)){
	if((newValue<=90))
		{
		coolanttempok=true;
		document.getElementById("Coolant").src="./img/coolantok.png";
		}
	else{
		document.getElementById("Coolant").src="./img/coolant.png";
		coolanttempok=false;
		}
	}
	
	if((newValue<=90))
	{
		coolanttempok=true;
	}
else{
	coolanttempok=false;
	}

	
	
}

function ShowSpeed(Speed){
	var SpeedCont=document.getElementById("Speed");
	if(SpeedCont!=null)
	SpeedCont.innerHTML = Speed+"Km/h";
	else{
	if(animation==2){
	if((Speed>200)&&(read==true)){
	"use strict";
	var self = this;
		loadScript('./js/services/speech.js', function(path, status) {
		Speech.readCurrentAppName("please control your speed");
		read=false;
	});	
	}
	if (Speed<200)
		read=true;
	if((Speed < 0)||(Speed>240)){
		return "Invalid Speed";
	}
	var elem = document.getElementById("Aig");
	var s=parseInt(Speed)+60;
	console.log(s.toString()+"degrés");
	if(navigator.userAgent.match("Chrome")){
		elem.style.WebkitTransform = "rotate("+s.toString()+"deg)";
	} else if(navigator.userAgent.match("Firefox")){
		elem.style.MozTransform = "rotate("+s.toString()+"deg)";
	} else if(navigator.userAgent.match("MSIE")){
		elem.style.msTransform = "rotate("+s.toString()+"deg)";
	} else if(navigator.userAgent.match("Opera")){
		elem.style.OTransform = "rotate("+s.toString()+"deg)";
	} else {
		elem.style.transform = "rotate("+s.toString()+"deg)";
	}
	document.getElementById("Aig").innerHTML = "rotate("+s.toString()+"deg)";

	}
}
}

function ShowEngineSpeed(rpm){
	var ESpeedCont=document.getElementById("EngineSpeed");
	if(ESpeedCont!=null)
		ESpeedCont.innerHTML = rpm+" RPM";
	else{
	
	if((rpm < 0)){
			return "Invalid Rpm";
		}
		if((rpm > 8000)){
			rpm=8000;
		}
		var angle=((rpm*164)/8000)+16;
		var elem = document.getElementById("AigRPM");
		if(navigator.userAgent.match("Chrome")){
			elem.style.WebkitTransform = "rotate("+angle+"deg)";
		} else if(navigator.userAgent.match("Firefox")){
			elem.style.MozTransform = "rotate("+angle+"deg)";
		} else if(navigator.userAgent.match("MSIE")){
			elem.style.msTransform = "rotate("+angle+"deg)";
		} else if(navigator.userAgent.match("Opera")){
			elem.style.OTransform = "rotate("+angle+"deg)";
		} else {
			elem.style.transform = "rotate("+angle+"deg)";
		}
		document.getElementById("AigRPM").innerHTML = "rotate("+angle+"deg)";

}
}

function ShowAirbagStatus(newValue){
	
	if(newValue)
		document.getElementById("AirbagStatus").src="./img/Airbag/OK.png";
	else
		document.getElementById("AirbagStatus").src="./img/Airbag/OFF.png";
	
}

function ShowBatteryStatus(newValue){
	var newBatteryStatus = newValue.toString();
	$('#BatteryLevel').empty();
	$('#BatteryLevel').append(newBatteryStatus+" (V)");
	if(newBatteryStatus<=10)
		document.getElementById("BatteryStatus").src="./img/batcheck.png";
	if(newBatteryStatus<=2)
		document.getElementById("BatteryStatus").src="./img/BadBattery.png";
	if(newBatteryStatus>=11)
		document.getElementById("BatteryStatus").src="./img/Battery.png";
	
}

function ShowTotalDistance(newValue){
	//$('.odometer').html(newValue);
	odo.setValue(newValue);
}

function ShowFuel(newLevel){

	var Flevel=document.getElementById("FuelLevel");
	if(Flevel!=null)
		{
			TellFuelLevel(newLevel);
			s=(237/100)*newLevel;
			topValue=252-s;
			Flevel.innerHTML = newLevel+" %";
			document.getElementById("FuelGauge").style.height=s+"px";
			document.getElementById("FuelGauge").style.top=topValue+"px";
		}
	else{
		TellFuelLevel(newLevel);
	if(newLevel<=20)
		document.getElementById("Gas").src="./img/gas5.png";
	else
		if(newLevel<=40){
			document.getElementById("Gas").src="./img/gas4.png";
		}
		else
			if(newLevel<=60){
				document.getElementById("Gas").src="./img/gas3.png";
			}
			else
				if(newLevel<=80){
					document.getElementById("Gas").src="./img/gas2.png";
				}else
					document.getElementById("Gas").src="./img/gas1.png";
	
	
	var angle=newLevel*2 +80;
	console.log(angle);
	var elem = document.getElementById("AigFuel");
	if(navigator.userAgent.match("Chrome")){
		elem.style.WebkitTransform = "rotate("+angle+"deg)";
	} else if(navigator.userAgent.match("Firefox")){
		elem.style.MozTransform = "rotate("+angle+"deg)";
	} else if(navigator.userAgent.match("MSIE")){
		elem.style.msTransform = "rotate("+angle+"deg)";
	} else if(navigator.userAgent.match("Opera")){
		elem.style.OTransform = "rotate("+angle+"deg)";
	} else {
		elem.style.transform = "rotate("+angle+"deg)";
	}
	document.getElementById("AigRPM").innerHTML = "rotate("+angle+"deg)";
}
}

function TellFuelLevel(newLevel){
	if((newLevel==15)||(newLevel==10)){
		"use strict";
		var self = this;
			loadScript('./js/services/speech.js', function(path, status) {
			Speech.readCurrentAppName("Fuel level is low");
		});	
		}
	if(newLevel==0){
		"use strict";
		var self = this;
			loadScript('./js/services/speech.js', function(path, status) {
			Speech.readCurrentAppName("You ran out of fuel");
		});	
		}
		if (newLevel<= 5){
			"use strict";
			var self = this;
				loadScript('./js/services/speech.js', function(path, status) {
				Speech.readCurrentAppName("you need to refuel");
				
			});	
		}
}