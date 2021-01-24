// Page Loader//
$(document).ready(function(){
	$('.transitionBars').addClass('open');
	$('body').addClass('page-loaded');
})


//Locomotive Scroll//
const locoScroll = new LocomotiveScroll({
	el: document.querySelector(".scrollContainer"),
	smooth: true
  }); 

  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".scrollContainer" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".scrollContainer", {
	scrollTop(value) {
	  return arguments.length ? locoScroll.scrollTo(value, 0, 0) :    locoScroll.scroll.instance.scroll.y;
}, // we don't have to define a scrollLeft because we're only scrolling vertically.
getBoundingClientRect() {
return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
},
// LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
});




//Team page tiles animation//
gsap.registerPlugin(ScrollTrigger);

const tiles = gsap.utils.toArray('.member-tiles .tile');

tiles.forEach(tile => {
  gsap.from(tile,{duration:.03, y:"random(-70, 70)", rotationY:'+=90', 
  scrollTrigger:{
	trigger: tile,
	start: "top center+=100px", 
	scroller:".scrollContainer",
}})

})

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();




// CURSOR//
var cursor = document.querySelector(".cursor") ;

function moveCircle(e) {
  gsap.to(cursor, 0.3, {
    css: {
      left: e.pageX,
      top: e.pageY
    }
  });
}

$(window).on('mousemove', moveCircle);

let hoverLinks = document.querySelectorAll('.hover');

hoverLinks.forEach( links => {
	links.addEventListener('mouseover', (e)=>{
		// cursor.addClass('link-grow');
		
		const rect = e.target.getBoundingClientRect();

		cursor.style.width = `${rect.width + 30}px`;
		cursor.style.height = `${rect.width + 30}px`;
		console.log(cursor); 
	});
	links.addEventListener('mouseleave', ()=>{
		
		cursor.style.width = `40px`;
		cursor.style.height = `40px`;
	})
});
	 
  

//Menu Obverlay Animation//
  var t1 = gsap.timeline({paused: true});

  t1.to(".overlay", 1, { opacity: 1, ease: Expo.easeInOut });
  t1.from(".menu ul li", {y: 60, opacity: 0, ease: Expo.easeOut, stagger: 0.1});
  
  t1.reverse();
  $(document).on("click", ".menu-btn", function() {
		t1.reversed(!t1.reversed());
		$('.menu').toggleClass('show');
  });

  
//Clock//
  var tick;
    function stop() {
    clearTimeout(tick);
    }
    function clock() {
    var ut=new Date();
    var h,m,s;
    var time="        ";
    h=ut.getHours();
    m=ut.getMinutes();
    s=ut.getSeconds();
    if(s<=9) s="0"+s;
    if(m<=9) m="0"+m;
    if(h<=9) h="0"+h;
    time+=h+":"+m;
    document.getElementById('clock').innerHTML=time;
    tick=setTimeout("clock()",1000); 
    }