//d = document;
c = 7500;				// Number of squares
c_ = 150;				// Squares per line
// c = 75;
// c_ = 15;
timeOut = 1;			// Tiempo de espera en algunos efectos
colorStack = [];		// Pila de valores RGB
colorRange = 0;			// Rango para el calculo de los colores aleatorios
color = "";				// Color base

// $(d).ready(function(){
// 	init();
// });

// function init(){

// };





// EVENTS

function changeColorVal(value){
    $("#options").css('background-color', value);
};

function changeRangeVal(value){

};

function go(){
	color = $("#color").val();
	colorRange = $("#range").val();

	for(i=0; i<c; i++){
		var id = "square-"+i;
		$('#content_').append('<div class="square" id="'+id+'"></div>');
		var elem = $('#'+id);
		//elem.addClass(getColor());
		elem.css('background-color', getRandomColor(i));
	};

	showIt(0);
};

function clean(){
	if(colorStack.length>0)
		hideThem();
};

function showCleanButton(){
	$('#options_').animate({
		opacity: 1
	}, timeOut, function() {
		
	});
};





// UTIL



function showIt(i){
	if(i<c){
		var id = "square-"+i;
		var elem = $('#'+id);
		// elem.addClass(getColor());

		elem.animate({
			opacity: 1
		}, timeOut, function() {
			showIt(i+1)
		});
	}
	else{
		showCleanButton();
	};
};

function changeIt(i){
	if(i<c){
		var id = "square-"+i;
		var elem = $('#'+id);
		//elem.fadeOut(timeOut*10);

		elem.animate({
			background: getRandomColor(i)
		}, timeOut, function(i) {
			changeIt(i+1)
		});
	}
	else{
		//changeIt(0);
	};
};

function hideIt(i){
	if(i<c){
		var id = "square-"+i;
		var elem = $('#'+id);
		//elem.fadeOut(timeOut*10);

		elem.animate({
			opacity: 0
		}, timeOut, function() {
			hideIt(i+1)
		});
	}
	else{
		//showIt(0);
	};
};

function hideThem(){
	$("#content_").html("");
	colorStack = [];
};

function getRandomColor(i){
	if(i==0){
		// r = Math.floor((Math.random() * 255));
		// g = Math.floor((Math.random() * 255));
		// b = Math.floor((Math.random() * 255));
		// colorStack[colorStack.length] = [r, g, b];
		// str = 'rgb('+r+','+g+','+b+')';
		rgb = hexToRGB(color);
		colorStack[colorStack.length] = [rgb[0], rgb[1], rgb[2]];
		str = color;
		//console.log(str);
		return str;
	}
	else if(i>0 && i<c_){
		r = getValueFrom(colorStack[i-1][0]);
		g = getValueFrom(colorStack[i-1][1]);
		b = getValueFrom(colorStack[i-1][2]);
		colorStack[colorStack.length] = [r, g, b];
		str = 'rgb('+r+','+g+','+b+')';
		//console.log(str);
		return str;
	}
	else{
		r = getValueFrom2(colorStack[i-1][0], colorStack[i-c_+1][0]);
		g = getValueFrom2(colorStack[i-1][1], colorStack[i-c_+1][1]);
		b = getValueFrom2(colorStack[i-1][2], colorStack[i-c_+1][2]);
		colorStack[colorStack.length] = [r, g, b];
		str = 'rgb('+r+','+g+','+b+')';
		//console.log(str);
		return str;
	}
};

function getValueFrom(x){
	rol = Math.floor((Math.random() * 2));
	val = Math.floor((Math.random() * colorRange));
	if(rol==0){
		ans = x - val;
		if(ans>=0){
			return ans;
		}
		else{
			return 0;
		};
	}
	else{
		ans = x + val;
		if(ans<=255){
			return ans;
		}
		else{
			return 255;
		};
	};
	
};

function getValueFrom2(x, y){
	rol = Math.floor((Math.random() * 2));
	val = Math.floor((Math.random() * colorRange));
	if(rol==0){
		ans = Math.floor(((x+y)/2) - val);
		if(ans>=0){
			return ans;
		}
		else{
			return 0;
		};
	}
	else{
		ans = Math.floor(((x+y)/2) + val);
		if(ans<=255){
			return ans;
		}
		else{
			return 255;
		};
	};
};

function hexToRGB(color){
	r = hexToR(color);
	g = hexToG(color);
	b = hexToB(color);
	return [r, g, b];
};

function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)};
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)};
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)};
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h};