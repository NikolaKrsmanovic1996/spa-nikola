//SPA background
const app = {
    pages: [],
    show: new Event('show'),
    init: function(){
        app.pages = document.querySelectorAll('.page');
        app.pages.forEach((pg)=>{
            pg.addEventListener('show', app.pageShown);
        })
        
        document.querySelectorAll('.nav-link').forEach((link)=>{
            link.addEventListener('click', app.nav);
        })
        history.replaceState({}, 'Home', '#home');
        window.addEventListener('popstate', app.poppin);
    },
    nav: function(ev){
        ev.preventDefault();
        let currentPage = ev.target.getAttribute('data-target');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(currentPage).classList.add('active');
        console.log(currentPage)
        history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(currentPage).dispatchEvent(app.show);
    },
    pageShown: function(ev){
        console.log('Page', ev.target.id, 'just shown');
        let h1 = ev.target.querySelector('h1');
        h1.classList.add('big')
        setTimeout((h)=>{
            h.classList.remove('big');
        }, 1200, h1);
    },
    poppin: function(ev){
        console.log(location.hash, 'popstate event');
        let hash = location.hash.replace('#' ,'');
        document.querySelector('.active').classList.remove('active');
        document.getElementById(hash).classList.add('active');
        console.log(hash)
        //history.pushState({}, currentPage, `#${currentPage}`);
        document.getElementById(hash).dispatchEvent(app.show);
    }
}

document.addEventListener('DOMContentLoaded', app.init);



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
        }
      };
      request.send();
    }
    
    function getData(response, cb) {
      const data = JSON.parse(response);
      console.log(data);
    
      const {
        name: { first },
        name: { last },
        picture: { large },
        phone,
        email
      } = data.results[0];
    
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
