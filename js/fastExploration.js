

var BB = {Author:"Ignacio Medina Castillo AKA Raising", version:0.1};

BB.Tile = function(type){

	var tile = this;
	this.htmlDiv= $("<div class='tileDiv'></div>");
	this.htmlImg = $("<img class='tileImg'></img>");
	this.htmlDiv.append(this.htmlImg);
	this.htmlImg.attr("src","../resources/hexagonTile/hexagonBrown1.png");

	this.getTile = function(){
		return tile.htmlDiv;
	}
}


BB.Grill = function(Matrix){

	var grill = this;
	this.matrix = Matrix;
	this.targetDiv = $("#Terrain");

	this.createTileMatrix = function(){
		grill.tileMatrix = new Array(grill.matrix.length);
		

		
		for (var i = 0; i<grill.matrix.length;i++){
			grill.tileMatrix[i] = new Array(grill.matrix[i].length);
			console.log(grill.tileMatrix[i].length);

			for (var j = 0; j<grill.matrix[i].length;j++){
				grill.tileMatrix[i][j] = new BB.Tile(grill.matrix[i][j]);
				grill.targetDiv.append(grill.tileMatrix[i][j].getTile());
			}
		}
	}


}