import xr from 'xr'
import blocksTemplate from '../templates/blocks.html'
import Mustache from 'mustache'


// load the docs data
xr.get('https://interactive.guim.co.uk/docsdata-test/1ZKNpWWWzvJv_0oD8z3k24p1YGAQVPr2eT58D21cdzgE.json').then((resp) => {
    var sheets = resp.data.sheets;
    console.log(sheets);
    // render just the html for the blocks
    var html = Mustache.render(blocksTemplate, sheets);

    // inject that rendered html into the empty div we declared in main.html
    document.querySelector(".interactive-blocks").innerHTML = html;

    var n = document.getElementsByTagName('img');
    var sectionHeader = document.getElementsByClassName('header');
    var section = document.getElementsByClassName('copy');
    var menuPlace = document.querySelector('.where-to-go--menu--placeholder')
    var menu = document.querySelector('.where-to-go--menu');
    var continent = document.querySelector('.header');
    var loaded = [];

    //checks if the image has data-lazy-img attr
    function imagesToBeLoaded(el){
      if(el.hasAttribute('data-lazy-img')){
        return true;
      }else{
        return false;
      }
    }
    function debounce(fn, delay) {
      var timer = null;
      return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }

    //to do:: check if image is already in view and load it. rather than waiting for scroll.
    function imageInView(el, len){
      window.addEventListener("scroll",function(){
        var cli = window.innerHeight;
        var pos = el.getBoundingClientRect();
        if(pos.top < (cli + 500) && pos.top > 0){
          var src = el.getAttribute("data-src");
          el.setAttribute("src", src);
          el.classList.add('inView');
        }
      });
    }
    //loops through images and checks if they are in view
    for(var i = 0; i < n.length; i++) {
      if(imagesToBeLoaded(n[i])){
        debounce(imageInView(n[i], n), 250);
      }else{
        console.log('not to be loaded');
      }
    }
    //open correct section
    for(var i=0; i < sectionHeader.length; i++) {
      sectionHeader[i].addEventListener('click', function(){
        var a = ".copy" + "." + this.dataset.id;
        var copy = document.querySelector(a);
        if(!copy.getAttribute("data-open")){
          copy.setAttribute("data-open", "true");
          this.setAttribute("data-open", "true");
        }else {
          copy.removeAttribute("data-open");
          this.removeAttribute("data-open", "true");
        }
      })
    }
    //stick menu
    window.addEventListener('scroll', function(){
      var menuPos = menuPlace.getBoundingClientRect();
      if(menuPos.top <= 0){
          menu.classList.add('sticky');
      }else if(menuPos.top > 0){
        menu.classList.remove('sticky');
      }
    });

    // add little 'read more' buttons
    var subsections = document.querySelectorAll('div.copy.desc');
    subsections.forEach(function(subsection) {
      var button = document.createElement('p');
      button.classList.add('button-wrapper');
      button.innerHTML = '<div class="little-read-more">Read more</div>';
      
      var elBefore = subsection.querySelector('p:nth-child(2)');
      subsection.insertBefore(button, elBefore);
      
      subsection.classList.add('short');
      
      var littleReadMore = button.querySelector('.little-read-more');
      littleReadMore.addEventListener('click', function() {
        subsection.classList.remove('short');
      })
    })

    setTimeout(function(){
			wantsVideo.getsVideo();
		}, 1000);
});
