gsap.registerPlugin(ScrollTrigger);

$(document).ready(function(){
	$('.transitionBars').addClass('open');
	$('body').addClass('page-loaded');
})
window.addEventListener('DOMContentLoaded', (event) => {
	
});


const tiles = gsap.utils.toArray('.member-tiles .tile');

tiles.forEach(tile => {

  gsap.from(tile,{duration:.03, y:"random(-70, 70)", rotationY:'+=90', stagger: 0.1,
  scrollTrigger:{
	trigger: tile,
	start: "top center+=100px", 
}})

})


// CURSOR
var cursor = document.querySelector(".cursor") 
follower = $(".cursor-follower");

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
	 
	

  var t1 = new TimelineMax({paused: true});

  t1.to(".overlay", 1, {
		opacity: 1,
		ease: Expo.easeInOut
  });

  t1.staggerFrom(".menu ul li", 0.8, {y: 60, opacity: 0, ease: Expo.easeOut}, 0.1);

  t1.reverse();
  $(document).on("click", ".menu-btn", function() {
		t1.reversed(!t1.reversed());
		$('.menu').toggleClass('show');
  });



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