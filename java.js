var score=0;
var Life=3;
var directionEnnemy="droite";
var deplac=0;
var paddingbloc=0;
var timerInterval=1000;
var timer=null;


function startGame(){
	score=0;
	Life=3;
	directionEnnemy="droite";
	deplac=0;
	paddingbloc=0;
	timer=null;
	directionEnnemy="droite";
	genEnnemy();
	element = document.getElementById("player");

	container=document.getElementById("bigdiv");
	boutonPlay=document.getElementById("accueil");
	boutonPlay.style.display="none";
	document.getElementById("gameOver").style.display="none";

	taillecontainer=container.offsetWidth;
	taillecontainer=taillecontainer/2;
	element.style.left=taillecontainer+"px";
	TimerGame()


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
		
		console.log(iDiv);
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
		console.log("gameOver");
		console.log(elementParent.offsetHeight);
		console.log(element.offsetHeight);
		
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

 console.log(e);
 console.log(marge);

 if(e.keyCode == 37)
    {
  console.log(div);
      
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
 }
   
}, false);