var score=0;
var Life=3;

function startGame(){
	score=0;
	Life=3;
	genEnnemy();
	element = document.getElementById("player");

	container=document.getElementById("bigdiv");
	boutonPlay=document.getElementById("accueil");
	boutonPlay.style.display="none";

	taillecontainer=container.offsetWidth;
	taillecontainer=taillecontainer/2;
	element.style.left=taillecontainer+"px";


}

function genEnnemy(){
	var iDiv=document.createElement("div");
	container=document.getElementById("blocmob");
	contain=""
	taillecontainer=container.offsetWidth;
	taillecontainer=taillecontainer/13;
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
		iDiv.c
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