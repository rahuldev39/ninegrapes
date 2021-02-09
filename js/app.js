
document.addEventListener('readystatechange', () => {    
  
});

$(document).ready(function () {
  // Images loaded is zero because we're going to process a new set of images.
  var imagesLoaded = 0
  // Total images is still the total number of <img> elements on the page.
  var totalImages = $("img").length

  // Step through each image in the DOM, clone it, attach an onload event
  // listener, then set its source to the source of the original image. When
  // that new image has loaded, fire the imageLoaded() callback.
  $("img").each(function (idx, img) {
    $("<img>").on("load", imageLoaded).attr("src", $(img).attr("src"))
  })

  // Do exactly as we had before -- increment the loaded count and if all are
  // loaded, call the allImagesLoaded() function.
  function imageLoaded() {
    imagesLoaded++
    if (imagesLoaded == totalImages) {
      allImagesLoaded()
    }
  }

  function allImagesLoaded() {
    $('body').addClass('page-loaded');
  loader()
  }

})

//######################---------------Page Loader-----------########################//
if ($(".transitionBars").length) {
  var loader = function(){
    var loaderTimeline = gsap.timeline()
    loaderTimeline.to(".transitionBars .bar--left", { y:'100%', duration:1, ease: "power1.out" });
    loaderTimeline.to(".transitionBars .bar--right", { y:'-100%', duration:1, ease: "power1.out" },"<");
  }
}


//####################----------Locomotive Scroll--------######################//

if($('.scrollContainer').length){
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".scrollContainer"),
    smooth: true
    }); 
  
    locoScroll.on("scroll", ScrollTrigger.update);
  
    ScrollTrigger.scrollerProxy(".scrollContainer", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) :    locoScroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
  return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector(".scrollContainer").style.transform ? "transform" : "fixed"
  });
  
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}





//#################-------Team page tiles animation--------##############//
gsap.registerPlugin(ScrollTrigger);

if($('.member-tiles').length){
    const tiles = gsap.utils.toArray('.member-tiles .tile');

  tiles.forEach(tile => {

    const tilesTimeline = gsap.timeline({
      scrollTrigger:{
        trigger: tile,
        start: "top center+=100px", 
        scroller:".scrollContainer",
      }
    });

    tilesTimeline.from(tile,{duration:.03, y:"random(-70, 70)", rotationY:'+=90'});
  })
}


//#################------career page tiles animation--------##############//

if($('.title-anim').length){

  
  
  gsap.from('.title-anim span', { y: 50, opacity:0, rotationX:'-=90',
    stagger: {each: 0.15, grid: [1, 4]},
    scrollTrigger:{
      trigger: '.title-anim',
      start:"top center+=100px",
      scroller:".scrollContainer",
    }
  })

}

if(('.opening-tiles').length){

  gsap.defaults({ease:'power3'});
  gsap.set('.opening-tiles',{y:50, opacity:0,rotationX:'-=90'});
  
  ScrollTrigger.batch('.opening-tiles',{
    scroller:".scrollContainer",
    onEnter:batch => gsap.to(batch, {y:0, opacity:1, rotationX:1, stagger:{each:0.15}, overwrite:true}),
  })


}


//##################--------Creative Item animation-------########################//
if($('.creative-item').length){
  gsap.defaults({ease: "power3"});
  gsap.set(".creative-item", {y: 100, opacity:0});
  
  ScrollTrigger.batch(".creative-item",{
    
    onEnter:batch => gsap.to(batch, {opacity: 1, y: 0, stagger: {each: 0.15, grid: [1, 4]}, overwrite: true}),
    onLeave: batch => gsap.set(batch, {opacity: 0, y: -100, overwrite: true}),
    onEnterBack: batch => gsap.to(batch, {opacity: 1, y: 0, stagger: 0.15, overwrite: true}),
    onLeaveBack: batch => gsap.set(batch, {opacity: 0, y: 100, overwrite: true})
  });
  ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".creative-item", {y: 0}));  
}



//##################--------services tile-------########################//

if($('.services-item').length){
  gsap.set('.services-item',{y:100, opacity:0});
 var abc =  function(){
    ScrollTrigger.batch('.services-item',{
      scroller:".scrollContainer",
      onEnter: batch => gsap.to(batch,{y:0, opacity:1, stagger:{each:.15, grid:[1,3]}, overwrite:true}),
      onLeave: batch => gsap.set(batch,{y:-100, opacity:0, overwrite:true}),
      onEnterBack:batch => gsap.to(batch, {y:0, opacity:1, stagger:{each:.15, grid:[1,3]}, overwrite:true}),
      onLeaveBack: batch => gsap.set(batch,{y:100, opacity:0, overwrite:true})
    })
    ScrollTrigger.addEventListener("refreshInit", () => gsap.set(".services-item", {y: 0})); 
  }

  abc();
}

//##################--------Blog Items-------########################//


if($('.blog-item').length){
  gsap.set('.blog-item',{y:100, opacity:0});

  ScrollTrigger.batch('.blog-item',{
    scroller:".scrollContainer",
    onEnter: batch => gsap.to(batch, {y:0, opacity:1, stagger:{each:.15, grid:[1,3],overwrite:true}}),
    onLeave: batch => gsap.set(batch,{y:-100, opacity:0, overwrite:true}),
    onEnterBack: batch => gsap.to(batch, {y:0, opacity:1, stagger:{each:.15, grid:[1,3],overwrite:true}}),
    onLeaveBack: batch => gsap.to(batch,{y:100, opacity:0, overwrite:true} )
  })


}


//#####################-------------CURSOR----------#########################//
if($('.cursor').length){

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
		const rect = e.target.getBoundingClientRect();
		cursor.style.width = `${rect.width + 30}px`;
		cursor.style.height = `${rect.width + 30}px`; 
	});
	links.addEventListener('mouseleave', ()=>{
		
		cursor.style.width = `40px`;
		cursor.style.height = `40px`;
	})
});
}




//###################------------Menu Obverlay Animation--------##################// 
if($('.menu').length){
  
  var t1 = gsap.timeline({paused: true});

  t1.to(".overlay", 1, { opacity: 1, ease: Expo.easeInOut });
  t1.from(".menu ul li", {y: 60, opacity: 0, ease: Expo.easeOut, stagger: 0.1});
  
  t1.reverse();
  $(document).on("click", ".menu-btn", function() {
		t1.reversed(!t1.reversed());
		$('.menu').toggleClass('show');
  });
}




//##########################--------Clock----------###############################//
if($('.time-text').length){

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

}

//##########################--------Play Pause Home Video----------###############################//
$('.play-btn').click(function () {
  var mediaVideo = $("#video-banner").get(0);
  if (mediaVideo.paused) {
      mediaVideo.play();
      $(this).removeClass('paused');
      $(this).text('Pause')
  } else {
      mediaVideo.pause();
      $(this).addClass('paused');
      $(this).text('Play')
 }
});




$(document).ready(function(){

  $(".btn-filter").click(function(){
      var value = $(this).attr('data-filter');
      
      if(value == "all")
      {
          //$('.filter').removeClass('hidden');
          $('.filter').show('1000');
      }
      else
      {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
          $(".filter").not('.'+value).hide('3000');
          $('.filter').filter('.'+value).show('3000');
          
      }
      ScrollTrigger.refresh();
      $(".btn-filter").removeClass("active");
      $(this).addClass("active");
  });
  
  
  
  
});