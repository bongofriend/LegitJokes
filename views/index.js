// Session-Storage Elemente
localStorage.setItem('coins', coins);
localStorage.setItem('token', token);

//Host-Adressen und TOKEN,COINS variable

var hostlog = "https://legitjokes.herokuapp.com/api/user/authenticate";
var hostreg = "https://legitjokes.herokuapp.com/api/user/register";
var token;
var coins;

//Log-in Request

var loginform = new Vue({


    el: "#loginform",
    data: {

       seen:false,
       username:"",
       password:"",
       RegisterLink:"Don't have an Account? Click here to Register",
       ErrorMessage:"Username or password is wrong!",
       AnnoyingMessage:"",
       fails: false,
       failcounterLogin: 0

   },


   methods: {

login: function(e){ 
    
   e.preventDefault();
    console.log("login")
    this.$http.post(hostlog,{username: this.username,password: this.password})
    .then(function(res){

      if(res.body.Status === "Ok") 
      {

         failcounterLogin = 0;
         this.$data.fails = false;
         console.log("Success");
         token = res.body.token;  
         coins = res.body.coins;
         localStorage.setItem('coins', coins);
         localStorage.setItem('token', token);
         window.location.replace("home.html");

     }
     else if(res.body.Status === "Error") 
     {

        this.$data.failcounterLogin++;

        console.log("Number of Login fails: "+this.failcounterLogin);

        if(this.$data.failcounterLogin>1){
      
           this.$data.fails = true;

        }

        switch(this.$data.failcounterLogin){
          
          case 2: 
          this.$data.AnnoyingMessage = "Whats wrong with you ?"
           break;

          case 3: 
          this.$data.AnnoyingMessage = "If you don't have an Account click the link !!!"
           break;

          case 4: 
          this.$data.AnnoyingMessage = "Do you think this is funny ?"
           break;


          case 5: 
          this.$data.AnnoyingMessage = "OK, I have nothing to say anymore"
           break;

          default:
          this.$data.AnnoyingMessage = ""


        }

        this.username = "";
        this.password = "";
        this.$data.seen = true;

    }

})

},


toRegisterForm: function(){

this.$data.seen = false;
this.$data.failcounterLogin = 0;
this.$data.fails = false;

}

}


});


//Account-Registrieren Register-Request

var registerform = new Vue ({


    el: "#RegisterVue",
    data: {

       regdiv:true,
       seen: false,
       username:"",
       password:"" ,
       RegHeading:"Create an Account",
       ErrorMessage:"Name is already used take another one !",
       success: false

   },



   methods: {

//AJAX REQUEST

    register: function(e){ 
        
       e.preventDefault();
        this.$http.post(hostreg,{username: this.username,password: this.password})
        .then(function(res){
            if(res.body.Status === "Ok"){
                console.log("Success");
                this.$http.post(hostlog,{username:this.username,password:this.password})
                .then(function(res){
                    if(res.body.Status === "Ok"){
                        token = res.body.token;  
                        coins = res.body.coins;
                        localStorage.setItem('coins', coins);
                        localStorage.setItem('token', token);
                        if(this.$data.seen = true){
                            this.$data.seen = false; 
                        }
                        $("#register-div").animate({opacity: 0}, {duration: 500, queue:false});
                            
                    setTimeout(()=>{
                        this.$data.success= true;},700);

                    setTimeout(()=>{
                        this.$data.success= false;},3300);

                    setTimeout(()=>{
                        window.location.replace("home.html")},3500);
                    }
                }) 
               }      
                else if(res.body.Status === "Error"){
                   this.$data.seen = true;                
                   this.username = "";
                   this.password = "";
                   console.log("Error");
               }})          
    },

   // VON REGISTER ZURÜCK ZU LOGIN FORM 

    backToLogin: function(){

       this.$data.seen = false;

       

       $("#register-div").animate({opacity: 0}, {duration: 500, queue:false});
       
       setTimeout(function(){
           $(".form").fadeIn(1000);},1000);

}
}
});


// VUE für ANFANG 

var firstVue = new Vue({

 el: "#start",

 data:{

active: true,
hidden:true,
hiddenbtn:true,
loginbtn:true,
menubutton:true,

 },

 mounted: function(){


    setTimeout(function(){
         firstVue.$data.hidden = false;
     },500);


     setTimeout(function(){
         firstVue.$data.hiddenbtn = false;
     },3000);

 },



 methods:{
  
  //VERSCHWINDEN DES STARTBILDSCHIRMS UND ERSCHEINEN DER LOGINFORM

     loginform: function(){

        firstVue.$data.menubutton = false;

        setTimeout(function(){
            $("ul").fadeToggle("slow");
        },1000);

        setTimeout(function(){
            $(".form").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow')
        },2000);

        firstVue.$data.hidden = true;
     
        firstVue.$data.hiddenbtn = true;

    }
    


}


});




// JQUERY für den Wechsel von LOGIN zu REGISTER 


$(document).ready(function(){


    $("#toRegisterForm").click(function(){

        $('.form').fadeOut(1000)

        setTimeout(function(){
            $("#register-div").animate({opacity: 1}, {duration: 500, queue:false});

        },1500);

    });
  });











