var canvas,ctx;
var locales = JSON.parse(locations);
var muteAll = false;
var pointCount = 0;
//songs & sounds
var title = new Image();
title.src = "http://i.imgur.com/uLNsyrs.png";
var map = new Image();
var gamedone = new Image();
gamedone.src = "http://i.imgur.com/xRKzy3p.png";
map.src = "http://i.imgur.com/oXswcwf.png";
var pichuImg = new Image();
pichuImg.src = "http://i.imgur.com/1UrQLBG.png";
var pokeImg = new Image();
pokeImg.src = "http://i.imgur.com/B4UKWbl.png";
var pichuX, pichuY;
var newItem = false;
var spot;
var itemx;
var itemy;
var first = true;
var playbtn = document.getElementById("startgame");
var help = false;

window.addEventListener('load',setup,false);

function setup(){
	canvas = document.getElementById("gameCanvas");
	ctx = canvas.getContext("2d");
	title.onload = ctx.drawImage(title,0,0);
}

function startGame(){
	playbtn.disabled = true;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	map.onload = ctx.drawImage(map,0,0);
	console.log("Hey.");
	timer();
	pichuX = 90;
	pichuY = 0;
	pokeImg.onload = drawItem();
	pichuImg.onload = drawPichu();
}

function showHelp(){
	console.log("Help.");
	if (help == false){
		help = true;
		document.getElementById("helptext").style.visibility = "visible";
	}
	else  {
		help = false;
		document.getElementById("helptext").style.visibility = "hidden";
	}
}

function redraw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(map,0,0);
	drawItem();
	drawPichu();
}

function drawPichu(){
	checkBorders();
	checkItemBord();
	ctx.drawImage(pichuImg,pichuX,pichuY);
}

function drawItem(){
	//places to put item....
	//save in a JSON.
	if(first == true || newItem == true){
		spot = Math.floor(Math.random()*((locales.length) + 0));
		itemx = parseInt(locales[spot].x);
		itemy = parseInt(locales[spot].y);
		first = false;
		newItem = false;
	}
	ctx.drawImage(pokeImg,itemx,itemy);
}

function checkBorders(){
	if(pichuX<0) {pichuX+=5;}
	if((pichuX+pichuImg.width)>canvas.width) pichuX-=5;
	if(pichuY<0) pichuY+=5;
	if((pichuY+pichuImg.height)>canvas.height) pichuY-=5;
}

function checkItemBord(){
	//pichu center x
	var pcx = ((pichuX+pichuImg.width)/2);
	//pichu center y
	var pcy = ((pichuY+pichuImg.height)/2);
	//pichu x radius
	var pxr = (pichuImg.width/2);
	//pichu y radius
	var pyr = pichuImg.height/2;
	//item center x
	var icx = ((itemx+pokeImg.width)/2);
	//item center y
	var icy = ((itemy+pokeImg.height)/2);
	//item x radius
	var ixr = pokeImg.width/2;
	//item y radius
	var iyr = pokeImg.height/2;
	if(Math.abs(pcx-icx)<((pxr+ixr)/3) && Math.abs(pcy-icy)<((pyr+iyr)/3)){
		console.log("they touched.");
		newItem = true;
		pointCount++;
		document.getElementById("points").textContent = pointCount;
	}

}

function timer(){
	var timeleft = 30;
    var timer = setInterval(function(){
    timeleft--;
    document.getElementById("timer").textContent = timeleft;
    if(timeleft == 0){
            clearInterval(timer);
         	document.getElementById("help").textContent = "Times Up";
         	gameOver();
    }
    },1000);
}

function gameOver(){
	console.log("game over man");
	playbtn.value = "Play Again";
	playbtn.disabled = false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	gamedone.onload = ctx.drawImage(gamedone,0,0);
}

window.addEventListener('keydown', keyDown, false);

function keyDown(e) {
 if (e.keyCode === 39) {
 	pichuX += 10;
 	redraw();
 }
 else if (e.keyCode === 37) {
 	pichuX -= 10;
 	redraw();
 }
 else if (e.keyCode === 38) {
 	pichuY -= 10;
 	redraw();
 }
 else if (e.keyCode === 40) {
 	pichuY += 10;
 	redraw();
 }
}

