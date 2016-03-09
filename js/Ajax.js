content = "menu";
isMapEnter = 0;

//var retour = '<div id="retour"><button onclick="initMenu()" width="20" height="10">retour</button></div>';
var retour = '<img src="./img/home.gif" onClick="initMenu()" class="home">';
var CurrentPage=0;
var nbrTotal=0;
var nbr1=0;
var nbr2=40;
var rechercheTemp="";
function Status() {
	var headID = document.getElementsByTagName("head")[0];
	CurrentPage=1;
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = './js/ClassicMain.js';
	headID.appendChild(newScript);
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = './js/ClassicDashboard.js';
	headID.appendChild(newScript);
	
	
	document.getElementById(content).innerHTML = '<font size="5"><img src="./img/Fuel/0.png" id="FuelCage"><img src="./img/Fuel/LevelBar.png" id="FuelGauge">'
		+'<img src="./img/Battery.png" id="BatteryStatus"><div id="BatteryLevel"></div>'
		+'<img src= "./img/car.png" id="Car">'
		+'<img src= "./img/parkingBrake.png" id="Pbrake">'
		+'<img src= "./img/Airbag/OK.png" id="AirbagStatus" class="Airbag">'
		+'<img src= "./img/seatBelt.png" id="SeatBelt">'
		+'<img src= "./img/Brake.png" id="BrakeFluid">'
		+'<img src= "./img/coolant.png" id="Coolant" class="Coolant"><div id="Engine_Coolant_Temp"></div>'
		+'<div id="Speed" class="Speed"></div>'
		+'<div id="EngineSpeed"></div>'
		+'<div id="odometer" class="odometer"></div>'
		+'<div id="FuelLevel" ></div>'
		+'<div id="Distance" ></div>'		
		+'<div id="Seat_Belt"></div>'		
		+'<div id="Brake_Fluid_Level"></div>'		
		+'<div id="TirePressure"></div>'		
		+'<div id="Rain" ></div>'
		+'<div id="Airbag"></div></font>'
		+ retour;
}

function intiListCountryRadio(){
	var xmlhttp;
	CurrentPage=1;
	document.getElementById(content).innerHTML = retour+"<input type='text' id='rechercher' value='' size='30' class='chercher'/><img src='./img/find.gif' class='Rechercher' onclick='intiListRadio()'><br><br><br>";
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

		xmlhttp.open("GET",
				"http://jumper.olympe.in/DriverHelper/Country.php?nbr1="+nbr1+"&nbr2="+nbr2, true);
		
		xmlhttp.setRequestHeader("Content-type",
			"application/x-www-form-urlencoded");
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {

		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			xml = xmlhttp.responseXML;
			var v=1;
			$(xml).find('country')
					.each(
							function() {
								
								var name = ($(this).find("name").text());
								var id = name + ($(this).find("id").text());
								var image = "<br><div id='RadioItem"+v+"'onclick=intiListRadio1('"+name+"')><font size='5'><b>"+name+"</b></font></div>";
								if(v==2)
									v=1;
								else
									v=2;
								str = image ;
								document.getElementById(content).innerHTML += image;
							});
			$(xml)
			.find('countrynbr')
			.each(
					function() {
						nbrTotal = ($(this).find("nbr").text());
						//*/
						if(nbr1+nbr2<=nbrTotal){
							//nbr1+=nbr2+1;
							document.getElementById(content).innerHTML +="<img src='./img/suivant.gif' class='suivant' onclick='suivant1()'>"; 
							
						}
						if(nbr1>0){
							//nbr1=nbr1-nbr2-1;
							document.getElementById(content).innerHTML +="<img src='./img/retour.gif' class='retour' onclick='precedent1()'>"; 
							
						}
						//*/	
						
					});
		}

	}
}


function retourRadio(){
	nbr1=0;
	rechercheTemp="";
	intiListCountryRadio();
}

function intiListRadio(){
	var xmlhttp;
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	try{
	r=document.getElementById('rechercher').value;
	}catch (e) {
		xmlhttp.open("GET",
				"http://jumper.olympe.in/DriverHelper/GetRadioList.php?nbr1="+nbr1+"&nbr2="+nbr2, true);
		r="";
		if(rechercheTemp=="")
		rechercheTemp="tunisia";
			}
	document.getElementById(content).innerHTML = "<img src='./img/retour.gif' class='retourRadio' onclick='retourRadio()'><br><br><br><br>";
	if(r!=""){
		nbr1=0;
		xmlhttp.open("GET",
				"http://jumper.olympe.in/DriverHelper/GetRadioList.php?r="+r+"&nbr1="+nbr1+"&nbr2="+nbr2, true);
		rechercheTemp=r;

	}
	if(rechercheTemp!=""&& r==""){
		xmlhttp.open("GET",
				"http://jumper.olympe.in/DriverHelper/GetRadioList.php?r="+rechercheTemp+"&nbr1="+nbr1+"&nbr2="+nbr2, true);
	}			
	xmlhttp.setRequestHeader("Content-type",
			"application/x-www-form-urlencoded");
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var radioTest = sessionStorage.getItem("change");
			var num = 1;
			var str = "";
			var v=1;
			xml = xmlhttp.responseXML;
			$(xml)
					.find('radio')
					.each(
							function() {
								var url = ($(this).find("url").text());
								var logo = ($(this).find("logo").text());
								var name = ($(this).find("name").text());
								
								var id = name + ($(this).find("id").text());
								var image = "<div id='RadioItem"+v+"'onclick=radio('"+url+"')><font size='5'><b>"+name+"</b></font></div><br>";
								str = image ;
								if(v==2)
									v=1;
								else
									v=2;
								document.getElementById(content).innerHTML += image;
							});
			$(xml)
			.find('radionbr')
			.each(
					function() {
						nbrTotal = ($(this).find("nbr").text());
						if(nbr1+nbr2<=nbrTotal){
							document.getElementById(content).innerHTML +="<img src='./img/suivant.gif' class='suivant' onclick='suivant()'>"; 
							
						}
						if(nbr1>0){
							document.getElementById(content).innerHTML +="<img src='./img/retour.gif' class='retour' onclick='precedent()'>"; 
							
						}
					});
		}
	}
}

function intiListRadio1(x){
	var xmlhttp;
	
	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	document.getElementById(content).innerHTML = "<img src='./img/retour.gif' class='retourRadio' onclick='retourRadio()'><br><br><br><br>";
	if(x!=""){
		nbr1=0;
		rechercheTemp=x;
		xmlhttp.open("GET",
				"http://jumper.olympe.in/DriverHelper/GetRadioList.php?r="+x+"&nbr1="+nbr1+"&nbr2="+nbr2, true);
		

	}
				
	xmlhttp.setRequestHeader("Content-type",
			"application/x-www-form-urlencoded");
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var radioTest = sessionStorage.getItem("change");
			var num = 1;
			var str = "";
			var v=1;
			xml = xmlhttp.responseXML;
			$(xml)
					.find('radio')
					.each(
							function() {
								var url = ($(this).find("url").text());
								var logo = ($(this).find("logo").text());
								var name = ($(this).find("name").text());
								var id = name + ($(this).find("id").text());
								var image = "<br><div id='RadioItem"+v+"'onclick=radio('"+url+"')><font size='5'><b>"+name+"</b></font></div>";
								str = image ;
								if(v==2)
									v=1;
								else
									v=2;
								document.getElementById(content).innerHTML += image;
							});
			$(xml)
			.find('radionbr')
			.each(
					function() {
						nbrTotal = ($(this).find("nbr").text());
						if(nbr1+nbr2<=nbrTotal){
							document.getElementById(content).innerHTML +="<img src='./img/suivant.gif' class='suivant' onclick='suivant()'>"; 
							
						}
						if(nbr1>0){
							document.getElementById(content).innerHTML +="<img src='./img/retour.gif' class='retour' onclick='precedent()'>"; 
							
						}
					});
		}
	}
}

function suivant(){
	nbr1+=nbr2+1;
	intiListRadio();
	
}

function precedent(){
	nbr1=nbr1-nbr2-1;
	intiListRadio();
	
}
//*/
function suivant1(){
	nbr1+=nbr2+1;
	intiListCountryRadio();
	
}

function precedent1(){
	nbr1=nbr1-nbr2-1;
	intiListCountryRadio();
	
}
//*/

function radio(src) {
	document.getElementById("radio").innerHTML = '<audio src="'+src+'"controls autoplay loop >Your device or browser cannot play this audio file</audio>';
	}

function About(){
	document.getElementById(content).innerHTML = '<img src="./img/Us.png">'
		+ retour;
	CurrentPage=1;

}

function dashboard() {
	var headID = document.getElementsByTagName("head")[0];
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = './js/ClassicMain.js';
	headID.appendChild(newScript);
	CurrentPage=1;
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = './js/odometer/odometer.js';
	headID.appendChild(newScript);
	var headID = document.getElementsByTagName("head")[0];
	var newScript = document.createElement('script');
	newScript.type = 'text/javascript';
	newScript.src = './js/ClassicDashboard.js';
	headID.appendChild(newScript);
	document.getElementById(content).innerHTML = '<img src="./img/compt2.png" id="compt"><img src="./img/cadranG.png" id="Aig">'
		+'<img src="./img/cadranP.png" id="AigRPM">'
		+'<img src="./img/cadranP.png" id="AigFuel">'
		+'<img src= "./img/Airbag/OK.png" id="AirbagStatus" class="Airbag2">'
		+'<img src="./img/code.png" id="code">'
		+'<img src="./img/left.png" id="left">'
		+'<img src="./img/right.png" id="right">'
		+'<img src="./img/phare.png" id="phare">'
		+'<img src="./img/cadranPInv.png" id="AigTemp">'
		+'<img src="./img/gas1.png" id="Gas">'
		+'<img src= "./img/coolant.png" id="Coolant" class="Coolant2">'
		+'<font size="15"><div id="odometer" class="odometer"></div></font>'
		+'<canvas id="odoCanvas" height="50" width="300">No canvas support!</canvas>'
		+ retour;
	//rotateAnimation();
	run();
}

var odo;

function run() {
    var ctx = document.getElementById('odoCanvas').getContext('2d');
    odo = new odometer(ctx, null);
	window.addEventListener( 'tizenhwkey', function( ev ) {

		if( ev.keyName === "back" ) {
			if( CurrentPage==0 ) {
				try {
				tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
				}
			else
				initMenu();
		}
		});    

}

function map1() {
	"use strict";
	loadScript(
			'./js/map.js',
			function(path, status) {
				L.mapbox.accessToken = 'pk.eyJ1IjoiYmhrIiwiYSI6ImNpZnp1bDQ0eTAyejZ0a20wZzNkbmdiamkifQ.yEKk0o9wta9hZSl_Jc5wcA';
				if (document.getElementById("map") != null) {
					document.getElementById("map").remove();
				}
				document.getElementById(content).innerHTML = "<div id='map'>"
						+ retour + "</div>";
			});
	CurrentPage=1;
	watchFunc();
	isMapEnter = 1;
}

function initMenu() {
	CurrentPage=0;
	nbr1=0;
	document.getElementById(content).innerHTML = '<img src="./img/about.png" class="About" onclick="About()"/><img src="./img/Menu/CentralNode.png" class="CentralNode" /><img src="./img/Menu/Status.png" class="StatusB" onclick="Status()"/><img src="./img/Menu/Maps.png" class="MapB" onclick="map1()" /><img src="./img/Menu/DashBoard.png" class="DashboardB" onclick="dashboard()" /><img src="./img/Menu/Radios.png" class="RadioB" onclick="intiListCountryRadio()" />'
}

map = undefined;

function errorCallback(error) {
	var errorInfo = document.getElementById("map");

	switch (error.code) {
	case error.PERMISSION_DENIED:

		var monImg = document.createElement('img');
		monImg.src = "img/error.png";

		errorInfo.appendChild(monImg);
		break;
	case error.POSITION_UNAVAILABLE:

		break;
	case error.TIMEOUT:
		errorInfo.innerHTML = "The request to get user location timed out.";
		break;
	case error.UNKNOWN_ERROR:
		errorInfo.innerHTML = "An unknown error occurred.";
		break;
	}
}

function watchFunc() {
	navigator.geolocation.watchPosition(success, errorCallback, options);
}

var options = {
	enableHighAccuracy : true,
	
	maximumAge: 5 * 60 * 1000
};

function success(pos) {
	var lat = pos.coords.latitude;
	var long = pos.coords.longitude;
	if (map != undefined) {

		map.remove();
	}

	map = L.mapbox.map('map', 'bhk.cifzul3yz032mtcm0zox45j3l').setView(
			[ lat, long ], 18);

	var marker = L.marker([ lat, long ], {
		icon : L.mapbox.marker.icon({
			'marker-color' : '#f86767'
		})
	});
	marker.addTo(map);

}

function error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
};
