
var game;
var ScenePreload = function(){}
var SceneHome = function(){};
var SceneCocokPlay = function(){}
var SceneCocokEnd = function(){}

window.onload = function() {
	game = new Phaser.Game(800,600);


	//Register the states and start one.
	game.state.add('ScenePreload',ScenePreload);
	game.state.add('SceneHome',SceneHome);
	game.state.add('SceneCocokPlay',SceneCocokPlay);
	game.state.add('SceneCocokEnd',SceneCocokEnd);

	//Start the first scene
	game.state.start('ScenePreload');


}//End window.onload



ScenePreload.prototype={
	preload:function(){
		//Scale manager and aligments
		// game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// game.scale.pageAlignHorizontally = true;
		// game.scale.pageAlignVertically = true;

		//Load assets
		game.load.image('bg1','assets/graphics/bg1.png');
		game.load.image('cloud','assets/graphics/cloud.png');

		game.load.image('obj_apple','assets/graphics/obj_apple.png');
		game.load.image('obj_bucket','assets/graphics/obj_bucket.png');
		game.load.image('obj_elephant','assets/graphics/obj_elephant.png');
		game.load.image('obj_donut','assets/graphics/obj_donut.png');
		game.load.image('obj_guava','assets/graphics/obj_guava.png');
		game.load.image('obj_corn','assets/graphics/obj_corn.png');
		game.load.image('obj_pumpkin','assets/graphics/obj_pumpkin.png');
		game.load.image('obj_ball','assets/graphics/obj_ball.png');
		game.load.image('obj_blanket','assets/graphics/obj_blanket.png');
	},
	loadUpdate:function(){
		// this.loadingBar.scale.x = game.load.progress*0.01;
	},
	create:function(){
		game.state.start('SceneCocokPlay');
	}
}//End ScenePreload


SceneCocokPlay.prototype = {
	preload:function(){

	},
	create:function(){
		var bg1 = game.add.sprite(0, 0, 'bg1');
		this.cloud1 = game.add.sprite(100,10,'cloud');
		this.cloud2 = game.add.sprite(500,50,'cloud');

		//Populating the objects, so we don't have to create again
		var objectNames = ['obj_apple','obj_blanket','obj_bucket','obj_donut','obj_elephant', 'obj_guava','obj_ball','obj_corn','obj_pumpkin'];
		this.itemList = []; //Store the item sprites
		this.shadowList = []; //Store item silhouettes/ shadows
		this.numbers = []; //Store the number


		for(var i = 0;i< objectNames.length;i++){
			var temp;

			//Create the siluettes
			temp = game.add.sprite(10,10,objectNames[i])
			temp.tint=0x000000;
			temp.position.x = 10;
			temp.position.y = 10;
			temp.anchor.set(.5,.5);
			this.shadowList.push(temp);
			
			//Create the objects
			temp = game.add.sprite(10,10,objectNames[i]);
			temp.position.x = 10;
			temp.position.y = 10;
			temp.scale.x = .8;
			temp.scale.y = .8;
			temp.anchor.set(.5,.5);
			this.itemList.push(temp);
			

			//Populate the numbers
			this.numbers.push(i);
		}

		

		this.putSilhouette();
	},
	update:function(){
		if(this.cloud1.position.x > -200){
			this.cloud1.position.x -= .5;
		}
		else{
			this.cloud1.position.x = 800;
			this.cloud1.position.y = Math.random()*200;
		}
		if(this.cloud2.position.x > -200){
			this.cloud2.position.x -= .5;
		}
		else{
			this.cloud2.position.x = 800;
			this.cloud2.position.y = Math.random()*200;
		}
	},
	putSilhouette:function(){
		//Shuffle the numbers array:
		this.shuffleArray(this.numbers);
		//Pick 3 first numbers
		var numberOfOptions = 4;
		var currentNumbers = [];
		for(var i=0;i<numberOfOptions;i++){
			currentNumbers.push(this.numbers[i]);
		}

		//Put all items in currentNumbers in the answer area
		for(var i=0;i<numberOfOptions;i++){
			this.itemList[currentNumbers[i]].position.x = 200*i+100;
			this.itemList[currentNumbers[i]].position.y = 500;
		}
		
		//From the current numbers, pick one for the question
		var randomIndex = currentNumbers[ game.rnd.integerInRange(0,numberOfOptions-1) ];
		// Now, put the silhouette of the randomIndex in the shilhouette area
		this.shadowList[randomIndex].position.x = 400;
		this.shadowList[randomIndex].position.y = 300;
		

		



		
	},
	shuffleArray: function(a) {
	    var j, x, i;
	    for (i = a.length; i; i--) {
	        j = Math.floor(Math.random() * i);
	        x = a[i - 1];
	        a[i - 1] = a[j];
	        a[j] = x;
	    }
	}
}//End SceneCocokPlay

