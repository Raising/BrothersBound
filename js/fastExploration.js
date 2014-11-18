

var BB = {Author:"Ignacio Medina Castillo AKA Raising", version:0.1};

BB.Tile = function(type){

	var tile = this;
	this.htmlDiv= $("<div class='tileDiv'></div>");
	this.htmlImg = $("<img class='tileImg' ></img>");
	

	this.htmlDiv.append(this.htmlImg);
	var randcolor = Math.floor(Math.random()*3);
	switch(randcolor){
		case 0:
		this.htmlImg.attr("src","../resources/hexagonTile/hexagonBrown1.png");
		break;
	case 1:
		this.htmlImg.attr("src","../resources/hexagonTile/hexagonGrey1.png");
		break;
	case 2:
		this.htmlImg.attr("src","../resources/hexagonTile/hexagonGreen1.png");
		break;
	}
	

	this.setPosition = function(x,y,z){
		//tile.htmlDiv.css({left:x,top:y});
	//	tile.htmlDiv.css({transform:"translate3d("+x+","+y+","+z+")" }	);
		TweenMax.to(tile.htmlDiv,1,{x:x,y:y,z:z ,force3D:true });
	}

	this.getTile = function(){
		return tile.htmlDiv;
	}


}


BB.Grill = function(x,y){

	var grill = this;
	
	this.targetDiv = $("#Terrain");
	this.topOffset = 100;
	this.leftOffset = 100;
	this.createTileMatrix = function(){
		grill.tileMatrix = new Array(x);	
		for (var i = 0; i<x;i++){
			grill.tileMatrix[i] = new Array(y);
			for (var j = 0; j<y;j++){
				grill.tileMatrix[i][j] = new BB.Tile(0);
				grill.tileMatrix[i][j].setPosition(grill.leftOffset+(i*45)+"px",grill.topOffset+((j*50)+((i%2)*25))+"px",0+"px");
				grill.targetDiv.append(grill.tileMatrix[i][j].getTile());
			}
		}	
	}
}

BB.Character = function(type){

	var character = this;
	this.htmlDiv= $("<div class='charDiv'></div>");
	this.htmlImg = $("<img class='charImg' ></img>");
	this.htmlDiv.append(this.htmlImg);
	this.htmlImg.attr("src","../resources/character/swordGreen1.png");
	this.x = 0;
	this.y = 0;
	this.setPosition = function(x,y){
		character.x=x;
		character.y=y;
		TweenMax.to(character.htmlDiv,1,{x:77+(x*45)+"px",y:77+((y*50)+((x%2)*25))+"px",z:0 ,force3D:true });
	}
	this.getCharacter = function(){
		return character.htmlDiv;

	this.setOnclick = function(number){
		character.htmlImg.click(function(){
			console.log(number);
		});
	}
}

}
BB.ActorsHandler = function(numCharacters){

	var actorsHandler = this;
	this.targetDiv = $("#Characters");
	this.topOffset = 100;
	this.leftOffset = 100;
	this.charactersArray= new Array(numCharacters);
	for (var j = 0; j<numCharacters;j++){
		actorsHandler.charactersArray[j] = new BB.Character(0);
		actorsHandler.charactersArray[j].setPosition(Math.floor(Math.random()*15),Math.floor(Math.random()*15));

		actorsHandler.targetDiv.append(actorsHandler.charactersArray[j].getCharacter());
	}
	 

}