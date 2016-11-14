var score=0;
var Life=3;
var directionEnnemy="droite";
var deplac=0;
var paddingbloc=0;
var timerInterval=1000;
var speedInterval=0;
var timer=null;
var moveMissilet=0;
var timerMiss=null;
var actionMissile=false;
var audiomenu = new Audio('music/menu.mp3');
audiomenu.play();



function startGame(){
	audiomenu.pause();
	var audiogame = new Audio('music/game.mp3');
	audiogame.play();
	score=0;
	Life=3;
	deplac=0;
	paddingbloc=0;
	speedInterval=timerInterval;
	timer=null;
	directionEnnemy="gauche";
	genEnnemy();
	element = document.getElementById("player");
	container=document.getElementById("bigdiv");
	boutonPlay=document.getElementById("accueil");
	document.getElementById('DIV1').style.top=container.offsetHeight+"px";

	boutonPlay.style.display="none";
	document.getElementById("gameOver").style.display="none";
	document.getElementById("score").style.display="initial";
	document.getElementById("vie").style.display="initial";
	document.getElementById("player").style.display="block";

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
			iDiv.style.backgroundImage = "url('img/bigmob1.png')";
			/*iDiv.style.backgroundImage = "url('img/bigmob2.png')";*/
			iDiv.style.backgroundSize = "110%";

			

		}else if (i<=36){
			iDiv.id="medmob"+i;
			iDiv.className="medennemy";
			iDiv.style.backgroundImage = "url('img/medmob1.png')";
			/*iDiv.style.backgroundImage = "url('img/medmob2.png')";*/
			iDiv.style.backgroundSize = "110%";
		}else{
			
			iDiv.id="minimob"+i;
			iDiv.className="miniennemy";
			iDiv.style.backgroundImage = "url('img/minimob1.png')";
			/*iDiv.style.backgroundImage = "url('img/minimob2.png')";*/
			iDiv.style.backgroundSize = "110%";
			
		}
		iDiv.style.width=taillecontainer+"px";
		/*iDiv.style.padding="1px";*/
		iDiv.style.margin=taillemargin+"px";
		iDiv.style.display="inline-block";
		/*iDiv.style.backgroundColor="red";*/

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
	
	elementParent=document.getElementById("container");
	element = document.getElementById("blocmob");
	elementDroite=element.offsetLeft;
	elementcompDroite=coliContainerDG("droite");
	elementcompGauche=coliContainerDG("gauche");
	elementcompBas=coliContainerDG("bas");
	
	elementcompBas=document.getElementById(elementcompBas).offsetTop;
	elementcompDroite=document.getElementById(elementcompDroite).offsetLeft;
	elementcompGauche=document.getElementById(elementcompGauche).offsetLeft;
	
	
	if ((elementcompBas)>(elementParent.offsetHeight*0.85)){
		
		gameOver();
	}
	if(elementcompGauche<deplac&& directionEnnemy=="gauche"){
		
		paddingbloc+=deplac;
		directionEnnemy="droite";		
		element.style.paddingTop=paddingbloc+"px";
	}else if (elementcompDroite>(elementParent.offsetWidth-(deplac*2))&& directionEnnemy=="droite"){
		
		paddingbloc+=deplac;		
		directionEnnemy="gauche";
		element.style.paddingTop=paddingbloc+"px";
	}
	if (directionEnnemy=="droite"){		
		
		elementDroite+=deplac;
		element.style.marginLeft=elementDroite+"px";
	}
	else
	{
		
		elementDroite-=deplac;	
		element.style.marginLeft=elementDroite+"px";		
	}
	/*GameOver*/
	


}
function coliContainerDG(DroiteGauche){
	namePourRetour="";
	
	if (DroiteGauche=="droite" || DroiteGauche=="bas"){
		tailleMax=0;
	} else if (DroiteGauche=="gauche"){
		tailleMax=20000000;	
	} 
	

	for (var i = 1; i <=60; i++) {
		
		if (i<=12){			
			var old = document.getElementById("bigmob"+i);
		}else if (i<=36){			
			var old = document.getElementById("medmob"+i);
		}else{
			var old = document.getElementById("minimob"+i);
			
		}
		
		if (old.style.visibility!="hidden"){

			if (DroiteGauche=="droite"){
				
				if (tailleMax <old.offsetLeft){
					tailleMax=old.offsetLeft;
					
					namePourRetour=old.id;
				}

			}else if (DroiteGauche=="gauche") {
				if (tailleMax >old.offsetLeft){
					tailleMax=old.offsetLeft;
					namePourRetour=old.id;
				}
			}else {
				if (tailleMax <old.offsetTop){
					tailleMax=old.offsetTop;
					namePourRetour=old.id;
				}
			}
		}
	}
	
	return namePourRetour;

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
	document.getElementById("vie").style.display="none";
	document.getElementById("player").style.display="none";


	clearInterval(timer);
	suppDiv();

}

function victoire(){
	document.getElementById("accueil").style.display="block";
	document.getElementById("victoire").style.display="block";
	document.getElementById("bigdiv").style.display="hidden";
	document.getElementById("blocmob").style.paddingTop="0px";
	document.getElementById("blocmob").style.marginLeft="20px";
	document.getElementById("vie").style.display="none";
	document.getElementById("player").style.display="none";


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
 var monMiss=document.getElementById('DIV1');
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

	monMiss.style.display="block";

		document.getElementById('DIV1').style.top=document.getElementById('container').offsetHeight+"px";
		console.log(document.getElementById('player').offsetWidth/2);
		document.getElementById('DIV1').style.marginLeft=parseInt(document.getElementById('player').style.marginLeft)+(document.getElementById('imgPlayer').offsetWidth/2)+"px";
		TimerMoveMiss(); 
	 	

}


/*if (actionMissile==false){

  	if (i>=0){
        i-=10;
        monMiss.style.marginLeft = i + "px";
	}

  	if (i <= elementParent.offsetWidth) {
        i+=10;
        monMiss.style.marginLeft = i + "px"; 
	}
}*/
   
}, false);

function TimerMoveMiss(){

	timerMiss=setInterval(MoveMissi, 20);

}
function colliMissi(){
	var monMiss=document.getElementById('DIV1');
	console.log("toto");
	if (parseInt(monMiss.style.top)<=0){
		monMiss.style.display="none";
		actionMissile=false;
		console.log("toto");
		clearInterval(timerMiss);
	}

}
function MoveMissi(){

	moveMissilet=parseInt(document.getElementById('DIV1').style.top);
	moveMissilet-=10;
	actionMissile=true;
	document.getElementById('DIV1').style.top =moveMissilet+"px";
	colliMissi();
	if (testCollision()==true){
		
		document.getElementById('DIV1').style.display="none";
		actionMissile=false;
		console.log("toto");
		clearInterval(timerMiss);
	}
	testVictoire();
	
}

function crashMiss(nameChamp){
	var masqueChamp=document.getElementById(nameChamp);
	if (nameChamp.startsWith("bigmob")){
		score+=150;

	} else if (nameChamp.startsWith("medmob")){
		score+=100;
		
	}else if (nameChamp.startsWith("minimob")){
		score+=50;
		
	}
	
	masqueChamp.style.visibility="hidden";
	



	
	changScore();



	
}

function changScore(){
	document.getElementById("score").innerHTML="Ton score est de : "+score;
	if (score<2000) {
		document.getElementById("score").style.color="red";
	}
	if (score>2000) {
		document.getElementById("score").style.color="yellow";
	}
	if (score>4000) {
		document.getElementById("score").style.color="green";
	}
	

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
function testVictoire(){
	nbHidden=0;
	for (var i = 1; i <=60; i++) {

		if (i<=12){
			nameMob="bigmob"+i;
		}else if (i<=36){
			nameMob="medmob"+i;
		}else{
			nameMob="minimob"+i;
			
		}
		if(document.getElementById(nameMob).style.visibility=="hidden"){
			nbHidden++;
		}
	
	}
	if (nbHidden==59){
		victoire();
	}
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

	if (ennemyMob.offsetLeft<=MissDroit && ennemyMob.offsetLeft+ennemyMob.offsetWidth>=MissDroit && ennemyMob.style.visibility!="hidden"){
		/*console.log("ok");*/
		if ((ennemyMob.offsetLeft+ennemyMob.offsetWidth)>=MissGauche){
			
			if ((ennemyMob.offsetTop+ennemyMob.offsetHeight)>=MissTop){

				return true;

			}
		}
	}
	return false;
	



}