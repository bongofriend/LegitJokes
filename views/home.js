var categries_link = 'https://legitjokes.herokuapp.com/api//categories';
var random_joke_link = 'https://legitjokes.herokuapp.com/api/joke/random';
var joke_in_category_link = 'https://legitjokes.herokuapp.com/api/joke?category='; //missing: example_category
var submit_joke_link = 'https://legitjokes.herokuapp.com/api//joke/submit'; //missig: examplejoke$category=example_category
var joke_vote_link = 'https://legitjokes.herokuapp.com/api/vote?id='; //missing: example_id(&vote=up or &vote=down)
var change_coins_link = 'https://legitjokes.herokuapp.com/api/user/coins?type='; //missing: up or down



var lustig = new Vue({
	el: ".witzspalte",
	data: {
		witze: [],
		token: null,
		active: true,
		no_connection_vid: false,
	},

	mounted: function(){

		//Speichert Token vom Benutzer

		this.$data.token = "Bearer "

				//get Token from login
				this.$data.token += localStorage.getItem("token"); 
				

			},

			methods:{

				//Wenn ein Witz Positiv bewertet wird

				upvote(witz){
					this.$http.get(joke_vote_link + witz.JokeID + '&vote=up',
					{
						headers: {
							'Authorization': this.$data.token,
						}
					})
					.then(function(resp){


						if(resp.body.Status == "Ok"){
							this.$refs.coin_sound.play();
							witz.Upvotes += 1;

						//Um die Anzahl der Coins für einen User zu erhöhen für die Bewertung

						automat.$data.coins += 1;
						this.$http.get(change_coins_link + 'up',
						{
							headers: {
								'Authorization': this.$data.token,

							}
						})
						.then(function(resp){
							
						})
						.catch(function(err){
							this.$refs.fail_sound.play();
						})


						 

					}

				})
					.catch(function(err){
						this.$refs.fail_sound.play();
						
					})

				},

				//Wenn der Witz negativ bewertet wird

				downvote(witz){
					this.$http.get(joke_vote_link + witz.JokeID + '&vote=down',
					{
						headers: {
							'Authorization': this.$data.token,

						}
					})
					.then(function(resp){

						if(resp.body.Status == "Ok"){
							this.$refs.coin_sound.play();

							witz.Downvotes += 1;

						//Um die Anzahl der Coins für einen User zu erhöhen für die Bewertung

						automat.$data.coins += 1;
						this.$http.get(change_coins_link + 'up',
						{
							headers: {
								'Authorization': this.$data.token,

							}
						})
						.then(function(resp){
							
						})
						.catch(function(err){
							this.$refs.fail_sound.play();
						})


						

					}
				})
					.catch(function(err){
						this.$refs.fail_sound.play();
						
					})
				},	
			},			
		});


//Vue für die Navigationsleiste

var category = new Vue({
	el: ".navigation",

	data: {
		categories: [], 
		rechteSeite: true,
	},

	//Kategorien werden vom Datenbank geladen

	mounted: function() {
		this.$http.get(categries_link)
		.then(function(resp) {
			this.$data.categories = resp.body.data;
			automat.$data.categories = resp.body.data;
		})
		.catch(function(err) {
			
		})		
	},
	methods: {

		show_us(){
			lustig.$data.active = true;
		},

		//Wechsel zum Feld "Witz schreiben" auf der Rechten seite beim Klick auf den Button in der Menüleiste

		switching(){
			automat.$data.rechteSeite = false;
			this.$data.rechteSeite = false;

		},

		//Wechsel zurück auf den Automaten durck Klicken auf den Button in der Menüleiste

		back_switching(){
			automat.$data.rechteSeite = true;
			this.$data.rechteSeite = true;


		},

		//Wechselt in die jeweilige Kategorie druch klicken auf das entsprechende Feld!

		wechsel(id){


			this.$http.get(joke_in_category_link + id )
			.then(function(resp) {

				lustig.$data.witze = resp.body.data;
				lustig.$data.active = false;
				lustig.$data.no_connection_vid = false;

			})
			.catch(function(resp){

				//witze entfernen und video anzeigen das man keine Verbindung hat
				lustig.$data.no_connection_vid = true;
				lustig.$data.active = false;
				lustig.$data.witze = null;

			})
		},

		logout(){
			localStorage.removeItem("coins");
			localStorage.removeItem("token");
		},

	}




});

var trial_counter = 1;

//Vue für den Automaten und Textfeld auf der rechten Seite

var automat = new Vue({
	el: ".rechts",

	data: {
		zeit: 0,
		coins: 0, 
		random_witz: "Schau in einen Spiegel, da kannst du auch lachen",
		rechteSeite: true,
		categories: [],
		joke: "", //Witz den man selber eintippt
		selected_category: "Kategorie auswählen",
		active: false,
		letter_movement: false,
	},


	mounted: function(){

		
		this.$data.coins = parseInt( localStorage.getItem('coins')); //Coins vom User

	},

	
	methods: {

		//Zufälliger Witz im Automaten wird von Datenbank ausgewählt


		zufall(){
			//movement of the machine
			this.$data.zeit = 1;

			if(this.$data.coins == 1){
				ruecksetzung_short();
			} else {
				ruecksetzung_long();
			}
			

			//check if the user has enough coins
			if(this.$data.coins > 0){

				this.$http.get(random_joke_link)
				.then(function(resp) {
      				//show the joke on the screen
      				this.$data.random_witz = resp.body.data.Content
      				//decrease coin on screen
      				this.$data.coins -= 1;
      				//decrease coin in database
      				this.$http.get(change_coins_link + 'down',{
      					headers: {
      						'Authorization': lustig.$data.token,
      					}
      				})
					localStorage.setItem('coins', 'this.$data.coins');
				})

				//Failure
				.catch(function(err) {
					this.$data.random_witz = "Something went wrong: " + err
				})		
			}
		},

		submit_joke(){

			if(this.selected_category == "Kategorie auswählen"){
				this.$data.active = true;
				setTimeout(function(){automat.$data.active = false; }, 500);

			}
			else {
				if(this.$data.joke.length <= 15 ){ //if the "joke" is too short
					if(trial_counter == 1){
						trial_counter += 1;
						this.$data.joke = "Das ist kein Witz";
					} else{
						this.$data.joke = "IMMER NOCH KEIN WITZ!!!";
					}

				} else{

				

					this.$http.post(submit_joke_link,
					{
						content: this.$data.joke,
						category: this.$data.selected_category,

					},{
						headers: {
							'Authorization': lustig.$data.token,
						}
					}
					)
					.then(function(resp){

						this.$data.joke = "";

						//small letter
						this.$data.letter_movement = true;
						setTimeout(function(){
							automat.$data.letter_movement = false;
						}, 1200);
						setTimeout(function(){
						}, 1500);


					})
					.catch(function(err){
					alert("No Connection to the server :(");

					})

				}
			}


		},
	}

});


var timer;

//Der Timer für die Zeit in der der Automat seinen Hebel nach unten bewegt!

function ruecksetzung_long() {
	timer = setTimeout(change_back, 1300);
}

function ruecksetzung_short() {
	timer = setTimeout(change_back, 900);
}

//Die Zeit wird zurück gesetz, damit der Automat sich nicht bewegt!

function change_back(){
	automat.$data.zeit = 0;
}


