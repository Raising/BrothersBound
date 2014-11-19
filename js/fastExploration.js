

var BB = {Author:"Ignacio Medina Castillo AKA Raising", version:0.1};

BB.Tile = function(type){

	var tile = this;
	this.htmlDiv= $("<div class='tileDiv'></div>");
	this.htmlImg = $("<img class='tileImg' ></img>");
	

	this.htmlDiv.append(this.htmlImg);
	this.characterVector = [];

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
		TweenMax.to(tile.htmlDiv,0,{x:x,y:y,z:z ,force3D:true });
	}

	this.getTile = function(){
		return tile.htmlDiv;
	}

	this.showOff = function(){
		TweenMax.to(tile.htmlDiv.children(),1,{ rotationZ:360,repeat:1 });
	}

	this.addCharacter = function(character){
		tile.characterVector.push(character);
	}

	this.removeCharacter = function(character){
		tile.characterVector.remove(character);
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
	this.getInTile = function(x,y,character){
		grill.tileMatrix[x][y].addCharacter(character);
		return grill.tileMatrix[x][y];
	}
}

BB.Character = function(type,map){

	var character = this;
	this.htmlDiv= $("<div class='charDiv'></div>");
	this.htmlImg = $("<img class='charImg' ></img>");
	this.htmlDiv.append(this.htmlImg);
	this.htmlImg.attr("src","../resources/character/swordGreen1.png");
	this.x = 0;
	this.y = 0;
	this.weapon = new BB.Weapon("random");
	this.currentTile = null;
	this.map = map;

	this.setPosition = function(x,y){
		character.x=x;
		character.y=y;
		character.currentTile = character.map.getInTile(x,y,character);
		TweenMax.to(character.htmlDiv,1,{x:77+(x*45)+"px",y:77+((y*50)+((x%2)*25))+"px",z:0 ,force3D:true });
	}
	this.getCharacter = function(){
		return character.htmlDiv;
 	}
	this.setDragable = function(){
		Draggable.create(character.htmlDiv, {
			bounds:$("#Characters"),
			edgeResistance:0.25,
			type:"x,y",
			throwProps:true,
			zIndexBoost:false,
			onDrag:function() {
	         var xTile = Math.round((this.x-77)/45);
	         var yTile =  Math.round((this.y-77-((xTile%2)*25))/50);
	         character.map.tileMatrix[xTile][yTile].showOff();
	        },
	        onDragEnd:function(){
	         var xTile = Math.round((this.x-77)/45);
	         var yTile =  Math.round((this.y-77-((xTile%2)*25))/50);
	         TweenMax.to(character.htmlDiv,2,{x:xTile*45+77,y:yTile*50+(xTile%2)*25+77,ease:Expo.easeOut}); 	
	         character.weapon.setArea(xTile,yTile);
	        	character.weapon.putArea("Effects");	
	        },
	        onPress:function(){
	        	 var xTile = Math.round((this.x-77)/45);
	         	var yTile =  Math.round((this.y-77-((xTile%2)*25))/50);
	        	character.weapon.setArea(xTile,yTile);
	        	character.weapon.putArea("Effects");
	        }



		});
	}



}
BB.ActorsHandler = function(numCharacters,map){

	var actorsHandler = this;
	this.targetDiv = $("#Characters");
	this.topOffset = 100;
	this.leftOffset = 100;
	this.charactersArray= new Array(numCharacters);
	for (var j = 0; j<numCharacters;j++){
		actorsHandler.charactersArray[j] = new BB.Character(0,map);
		actorsHandler.charactersArray[j].setPosition(Math.floor(Math.random()*15),Math.floor(Math.random()*15));
		actorsHandler.charactersArray[j].setDragable();
		actorsHandler.targetDiv.append(actorsHandler.charactersArray[j].getCharacter());
	}
	 


}
BB.DangerZone = function(x,y,kind){
	var dangerZone = this;
	this.x = x;
	this.y = y;
	this.kind = kind;
	this.icon= $("<img class='iconImg'></img>");
	switch (kind){
		case "sword":
			this.icon.attr("src","../resources/effects/sword.png");
		break;
		case "spear":
			this.icon.attr("src","../resources/effects/spear.png");
		break;
		default:
		break;
	}
	this.setPosition = function(centerX,centerY){
		var xTile = dangerZone.x+centerX;
		var yTile = dangerZone.y+centerY+(centerX)%2*(Math.abs(xTile+1))%2;
		TweenMax.to(dangerZone.icon,0.5,{x:xTile*45+80,y:yTile*50+(Math.abs(xTile)%2)*25+80});
	}

	this.getIcon = function(){
		return dangerZone.icon;
	}
}

BB.Weapon = function(kind){

	var weapon =this;
	this.area = [];
	if(kind === "random"){
		var posiblities = ["espadaChustosa","dualKnife","lanza","pilum"];
		kind = posiblities[Math.floor(Math.random()*posiblities.length)];
	}
	switch (kind){
		case "espadaChustosa":
			this.area.push(new BB.DangerZone(0,-1,"sword"));
			this.area.push(new BB.DangerZone(0,1,"sword"));
			this.area.push(new BB.DangerZone(-1,-1,"sword"));
			this.area.push(new BB.DangerZone(-1,0,"sword"));
			this.area.push(new BB.DangerZone(-2,0,"sword"));
			this.area.push(new BB.DangerZone(1,-2,"sword"));
			this.area.push(new BB.DangerZone(1,-1,"sword"));
			this.area.push(new BB.DangerZone(1,0,"sword"));
			this.area.push(new BB.DangerZone(1,1,"sword"));
		break;
		case "dualKnife":
			this.area.push(new BB.DangerZone(0,-1,"sword"));
			this.area.push(new BB.DangerZone(0,-2,"sword"));
			this.area.push(new BB.DangerZone(1,-1,"sword"));
			this.area.push(new BB.DangerZone(1,-2,"sword"));
			this.area.push(new BB.DangerZone(2,-1,"sword"));
			this.area.push(new BB.DangerZone(-1,0,"sword"));
			this.area.push(new BB.DangerZone(0,1,"sword"));
			this.area.push(new BB.DangerZone(0,2,"sword"));
			this.area.push(new BB.DangerZone(-1,1,"sword"));
			this.area.push(new BB.DangerZone(-2,1,"sword"));
		break;
		case "lanza":
			this.area.push(new BB.DangerZone(0,-2,"spear"));
			this.area.push(new BB.DangerZone(0,2,"spear"));
			this.area.push(new BB.DangerZone(-2,-1,"spear"));
			this.area.push(new BB.DangerZone(-2,0,"spear"));
			this.area.push(new BB.DangerZone(-2,1,"spear"));
			this.area.push(new BB.DangerZone(2,-1,"spear"));
			this.area.push(new BB.DangerZone(1,-2,"spear"));
			this.area.push(new BB.DangerZone(2,1,"spear"));
			this.area.push(new BB.DangerZone(1,1,"spear"));
		break;
		case "pilum":
			this.area.push(new BB.DangerZone(-3,0,"spear"));
			this.area.push(new BB.DangerZone(-3,-1,"spear"));
			this.area.push(new BB.DangerZone(-4,0,"spear"));
			this.area.push(new BB.DangerZone(2,2,"spear"));
			this.area.push(new BB.DangerZone(2,3,"spear"));
			this.area.push(new BB.DangerZone(1,2,"spear"));
			this.area.push(new BB.DangerZone(2,-2,"spear"));
			this.area.push(new BB.DangerZone(2,-3,"spear"));
			this.area.push(new BB.DangerZone(1,-3,"spear"));
			
		break;
		default:
		break;
	}

	this.getArea = function(){
		return weapon.area;
	}
	this.putArea = function(elementoPadre){
		for (var i = 0;i< weapon.area.length;i++){
			$("#"+elementoPadre).append(weapon.area[i].getIcon());
		 }
	}

	this.removeArea = function(elementoPadre){
			for (var i = 0;i< weapon.area.length;i++){
			$("#"+elementoPadre).remove(weapon.area[i].getIcon());
		 }
	}

	this.setArea = function(x,y){
		for (var i = 0;i< weapon.area.length;i++){
			weapon.area[i].setPosition(x,y);
		}
	}

}





