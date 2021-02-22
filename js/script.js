//SPA background
//Created object APP
const app = { 
    pages: [],
    show: new Event('show'),//Whenere the page is shown it's gonna dispatch the event
    init: function(){//Init function is gonna be called on ('DOMContentLoaded', app.init) down below when everything is beign finished loading call this funciton down below
        app.pages = document.querySelectorAll('.page');//Grabbing all pages everyting inside page and saving them inside the property pages
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);//calling the function pageShown and adding the event listener of show of these pages
        })
        
        document.querySelectorAll('.nav-link').forEach((link)=>{
            link.addEventListener('click', app.nav);//adding click event on navigation link buttons
        })
        history.replaceState({}, 'Home', '#home');//intercepting the inital URL my page needs to know on which page im on it adds a #onto page so im switching it 
        window.addEventListener('popstate', app.poppin);//handling the back button listener on the window object and it has popstate event and calling function poppin
    },
    nav: function(ev){//this function needs to navigate button it is called up in init
        ev.preventDefault();//preventing default behavior of js
        let currentPage = ev.target.getAttribute('data-target'); //getting the targeted atribute data-target
        document.querySelector('.active').classList.remove('active'); //selecting active from up and removing that app default is home
        document.getElementById(currentPage).classList.add('active'); //and adding on current page and getting that id of page
        console.log(currentPage)//
        history.pushState({}, currentPage, `#${currentPage}`); //instead of home by default im gonna push that #currenPage link
        document.getElementById(currentPage).dispatchEvent(app.show); // we are getting the page that we clicked on link and dispatching defaulted from show
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'just shown');//which page is shown
        let h1 = ev.target.querySelector('h1'); //selecting the <h1>
        h1.classList.add('big')//adding the class big
        setTimeout((h)=>{//function timeot for adding big so that user have feeling he clicked on something
            h.classList.remove('big');//remoiving big 
        }, 1200, h1);// after 1 second removing the big Letter
    },
    poppin: function(ev){//similar with nav this is for when we hit BACK from browser to redirect us 
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');//this is the page that we are on hash is current page
        document.querySelector('.active').classList.remove('active');//same with nav
        document.getElementById(hash).classList.add('active');//same with nave
        console.log(hash)
        //history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(app.show);//same with nav dispatching the page which was in front
    }
}

document.addEventListener('DOMContentLoaded', app.init);//after 



//API getting data from Api and putted in html view
(function(){
    const btn = document.getElementById("btn");
    btn.addEventListener("click", function() {
      getPerson(getData);
    });
    
    function getPerson(cb) {
      const url = `https://randomuser.me/api/`;
      const request = new XMLHttpRequest();
      request.open("GET", url, true);
    
      request.onload = function() {
        if (this.status === 200) {
          cb(this.responseText, showData);
        } else {
          this.onerror();
        }
      };
    
      request.onerror = function() {
        console.log("there was an error");
      };
      request.send();
    }
    
    function getData(response, cb) {
      const data = JSON.parse(response);
      console.log(data);
    
      const {
        name: { first }, // like all of them bellow it is in 0 and im targeting the name Object for retreving the first Name
        name: { last },//same with this
        picture: { large },//same with this
        phone,// there is nothing in phone object i just bassicaly selected phone
        email // same for email
      } = data.results[0];// this is the array, and i'm looking for that.Because it containts an object of values
    
      cb(first, last, large,phone, email);
    }
    
    function showData(first, last, large,phone, email) {
      document.getElementById("first").textContent = first;
      document.getElementById("last").textContent = last;
      document.getElementById("phone").textContent = phone;
      document.getElementById("email").textContent = email;
      document.getElementById("photo").src = large;
    }

})();
