// cursor

let follower = document.querySelector('.cursor');

let hoverLinks = document.querySelectorAll('.hover');


const windowW = window.innerWidth;
const windowH = window.innerHeight;
const maxLength = Math.max(windowW, windowH);

const cursorWidth = 40;
const cursorR = cursorWidth >> 1;
const cursorDelay = 3;

const buttons = Array.from(document.querySelectorAll('.hover'));

const cursor = {
	el: document.querySelector('.js-cursor'),
	x: windowW >> 1,
	y: windowH >> 1,
	scaleX: 1,
	scaleY: 1,
};

const target = {
	x: windowW >> 1,
	y: windowH >> 1,
	width: cursorWidth,
	followMouse: true,
};

const norm = (val, max, min) => (val - min) / (max - min);
const distanceBetween = (v1, v2) => Math.sqrt((v1.x - v2.x) * (v1.x - v2.x) + (v1.y - v2.y) * (v1.y - v2.y));

const loop = () => {
	const destX = target.x - cursorR;
	const destY = target.y - cursorR;

	const newX = cursor.x + ((destX - cursor.x) / cursorDelay);
	const newY = cursor.y + ((destY - cursor.y) / cursorDelay);

	if (target.followMouse) {
		const distance = Math.abs(distanceBetween(target, cursor));
		const scale = norm(distance, maxLength, cursorR);
		cursor.scaleX = 1 + scale;
		cursor.scaleY = 1 - scale;
	} else {
		const targetScale = target.width / cursorWidth;

		cursor.scaleX += (targetScale - cursor.scaleX) / (cursorDelay / 2);
		cursor.scaleY = cursor.scaleX;
	}

	cursor.x = newX;
	cursor.y = newY;

	cursor.el.style.transform = `translate(${cursor.x}px, ${cursor.y}px) scale(${cursor.scaleX}, ${cursor.scaleY})`;

	requestAnimationFrame(loop);
};



const onPointerMove = (e) => {
	if (!target.followMouse) {
		return;
	}

	const pointer = (e.touches && e.touches.length) ? e.touches[0] : e;
	const { clientX: x, clientY: y } = pointer;

	target.x = x;
	target.y = y;
};

const onPointerOver = (e) => {
	const btn = e.target;
	const rect = btn.getBoundingClientRect();

	target.followMouse = false;
	target.x = rect.left + (rect.width >> 1);
	target.y = rect.top + (rect.height >> 1);

	target.width = Math.max(rect.width, rect.height) + 30;
};

const onPointerOut = () => {
	target.followMouse = true;
	target.width = cursorWidth;
};

document.body.addEventListener('mousemove', onPointerMove);
document.body.addEventListener('touchmove', onPointerMove);

buttons.forEach((btn) => {
	btn.addEventListener('touchstart', onPointerOver);
	btn.addEventListener('mouseover', onPointerOver);

	btn.addEventListener('touchend', onPointerOut);
	btn.addEventListener('mouseout', onPointerOut);
});

loop();



     hoverLinks.forEach( links => {
          links.addEventListener('mouseover', ()=>{
               follower.classList.add('link-grow');
          });
          links.addEventListener('mouseleave', ()=>{
               follower.classList.remove('link-grow');
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