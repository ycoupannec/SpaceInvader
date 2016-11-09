var score=0;
var Life=3;
var directionEnnemy="droite";
var deplac=0;
var paddingbloc=0;
var timerInterval=2000;
var speedInterval=0;
var timer=null;
var moveMissilet=0;
var timerMiss=null;
var actionMissile=false;



function startGame(){
	score=0;
	Life=3;
	deplac=0;
	paddingbloc=0;
	speedInterval=timerInterval;
	timer=null;
	directionEnnemy="droite";
	genEnnemy();
	element = document.getElementById("player");
	container=document.getElementById("bigdiv");
	boutonPlay=document.getElementById("accueil");
	document.getElementById('DIV1').style.top=container.offsetHeight+"px";

	boutonPlay.style.display="none";
	document.getElementById("gameOver").style.display="none";

	taillecontainer=container.offsetWidth;
	taillecontainer=taillecontainer/2;
	element.style.marginLeft=((document.getElementById("player").offsetWidth/2))+"px";
	document.getElementById("DIV1").style.marginLeft=(taillecontainer-(document.getElementById("DIV1").offsetWidth/2))+"px";
	
	
	TimerGame();
	changScore()



}

function genEnnemy(){
	var iDiv=document.createElement("div");
	container=document.getElementById("blocmob");
	contain=""
	taillecontainer=container.offsetWidth;
	taillecontainer=taillecontainer/13;
	deplac=taillecontainer;
	taillemargin=taillecontainer/24;
	
	for (var i = 1; i <=60; i++) {
		var iDiv=document.createElement("div");
		if (i<=12){
			iDiv.id="bigmob"+i;
			iDiv.className="bigennemy";

			

		}else if (i<=36){
			iDiv.id="medmob"+i;
			iDiv.className="medennemy";
		}else{
			
			iDiv.id="minimob"+i;
			iDiv.className="miniennemy";
			
		}
		iDiv.style.width=taillecontainer+"px";
		/*iDiv.style.padding="1px";*/
		iDiv.style.margin=taillemargin+"px";
		iDiv.style.display="inline-block";
		iDiv.style.backgroundColor="red";

		iDiv.style.height=taillecontainer+"px";
		
		
		document.getElementById("blocmob").appendChild(iDiv);
	
	}
}

function movePlayer(direction){
	element = document.getElementById("player");
	positionElement=element.offsetleft;
	if (direction=="droite"){
		positionElement++;
		element.style.left=positionElement+"px";
	}
	else
	{
		positionElement--;
		element.style.left=positionElement+"px";	
	}


}

function moveEnnemy(){
	
	element = document.getElementById("blocmob");
	elementParent=document.getElementById("container");
	margeDroite=elementParent.offsetWidth-element.offsetWidth;
	elementDroite=element.offsetLeft;
	margeDroite-=deplac;
	if (directionEnnemy=="droite"){		
		elementDroite+=deplac;	
		element.style.marginLeft=elementDroite+"px";
	}
	else
	{
		elementDroite-=deplac;		
		element.style.marginLeft=elementDroite+"px";		
	}
	if (elementDroite<deplac){
		paddingbloc+=deplac;
		directionEnnemy="droite";		
		element.style.paddingTop=paddingbloc+"px";
	}else if (elementDroite>margeDroite){
		paddingbloc+=deplac;		
		directionEnnemy="gauche";
		element.style.paddingTop=paddingbloc+"px";
	}
	if (element.offsetHeight>=elementParent.offsetHeight){
		
		gameOver();
	}

}

function TimerGame(){
	timer=setInterval(moveEnnemy, timerInterval);		
 
}

function gameOver(){
	document.getElementById("accueil").style.display="block";
	document.getElementById("gameOver").style.display="block";
	document.getElementById("bigdiv").style.display="hidden";
	document.getElementById("blocmob").style.paddingTop="0px";
	document.getElementById("blocmob").style.marginLeft="20px";



	clearInterval(timer);
	suppDiv();
}

function suppDiv(){

	for (var i = 1; i <=60; i++) {
		var obj = document.getElementById("blocmob");
		if (i<=12){			
			var old = document.getElementById("bigmob"+i);
		}else if (i<=36){			
			var old = document.getElementById("medmob"+i);
		}else{
			var old = document.getElementById("minimob"+i);
			
		}
		obj.removeChild(old);	
	}
}

document.addEventListener('keydown',
function(e)
{
 var div = document.getElementById('player');
 var elementParent=document.getElementById("blocplayer");
    var marge =elementParent.offsetWidth-div.offsetLeft;

 if(e.keyCode == 37)
    {
  
      
        var i = div.offsetLeft;
  			if (i>=0){
        i-=10;
        div.style.marginLeft = i + "px";
    }
  }

    else if(e.keyCode == 39)

    {
        var i = div.offsetLeft;
  			if (i <= elementParent.offsetWidth) {

        i+=10;
        div.style.marginLeft = i + "px";

    }
 }else if (e.keyCode==32 && actionMissile==false){
 	var monMiss=document.getElementById('DIV1');
	monMiss.style.display="block";

		document.getElementById('DIV1').style.top=document.getElementById("bigdiv").offsetHeight+"px";
		TimerMoveMiss();

		}
   
}, false);

function TimerMoveMiss(){

	timerMiss=setInterval(MoveMissi, 50);

}
function colliMissi(){
	var monMiss=document.getElementById('DIV1');
	if (parseInt(monMiss.style.top)<=0){
		monMiss.style.display="none";
		actionMissile=false;
		clearInterval(timerMiss);
	}

}
function MoveMissi(){

	moveMissilet=parseInt(document.getElementById('DIV1').style.top);
	moveMissilet-=10;
	actionMissile=true;
	document.getElementById('DIV1').style.top =moveMissilet+"px";
	if (testCollision()==true){
		colliMissi();
	}
	
}

function crashMiss(nameChamp){
	var obj = document.getElementById("blocmob");
	console.log(nameChamp);
	var old=document.getElementById(nameChamp);
	if (nameChamp.startsWith("bigmob")){
		score+=150;

	} else if (nameChamp.startsWith("medmob")){
		score+=100;
		
	}else if (nameChamp.startsWith("minimob")){
		score+=50;
		
	}
	obj.removeChild(old);
	



	
	changScore();



	
}

function changScore(){

	document.getElementById("score").innerHTML="Score : "+score;
	

}

function changVie(){
	document.getElementById("vie").innerHTML="Vie : "+Life;
}

function testCollision(){
	missileMob=document.getElementById("DIV1");
	positionMissMobGauche=missileMob.offsetLeft;
	positionMissMobDroit=missileMob.offsetLeft+missileMob.offsetWidth;
	positionMissMobTop=missileMob.offsetTop;

	for (var i = 1; i <=60; i++) {
		if (i<=12){
			nameMob="bigmob"+i;
		}else if (i<=36){
			nameMob="medmob"+i;
		}else{
			nameMob="minimob"+i;
			
		}

		if (positionMob(positionMissMobGauche,positionMissMobDroit,positionMissMobTop,nameMob)==true){
			crashMiss(nameMob);
			missileMob.style.display="none";
			actionMissile=false;
			clearInterval(timerMiss);
			return true;
		}
	
	}
	return false;

}

function positionMob(MissGauche,MissDroit,MissTop,nameMobtest){

	ennemyMob=document.getElementById(nameMobtest);
	/*console.log(ennemyMob.offsetTop);*/
	/*ennemyMob.offsetWidth;
	ennemyMob.offsetHeight;*/
	/*console.log("ennemyMob.offsetLeft : "+ennemyMob.offsetLeft+"<= MissDroit :"+MissDroit);*/
	/*if (ennemyMob.offsetLeft<=MissDroit && (ennemyMob.offsetTop+ennemyMob.offsetHeight)>=MissTop && (ennemyMob.offsetLeft+ennemyMob.offsetWidth)>=MissGauche){
		console.log(nameMob);
		return true;

	}
	return false;
*/
	/*console.log(MissDroit);*/

	if (ennemyMob.offsetLeft<=MissDroit && ennemyMob.offsetLeft+ennemyMob.offsetWidth>=MissDroit){
		/*console.log("ok");*/
		if ((ennemyMob.offsetLeft+ennemyMob.offsetWidth)>=MissGauche){
			
			if ((ennemyMob.offsetTop+ennemyMob.offsetHeight)>=MissTop){
				
				console.log("nnemyMob.offsetTop : "+ennemyMob.offsetTop+" ennemyMob.offsetHeight : ");
				console.log(ennemyMob.offsetHeight+" MissTop : "+MissTop+" ennemyMob.offsetLeft : " + ennemyMob.offsetLeft+ " ennemyMob.offsetWidth : "+ennemyMob.offsetWidth+" MissDroit : "+MissDroit);
				console.log(nameMob);
				console.log("ennemyMob.style.left : "+ennemyMob.style.Left);

				return true;

			}
		}
	}
	return false;
	



}