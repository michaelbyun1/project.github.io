//Carousel
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

//Counter!
let counter = 1;
const size = carouselImages[0].clientWidth;

carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

//Listeners
prevBtn.addEventListener('click', () => {
  if (counter <= 0) return;
  carouselSlide.style.transition = "transform 0.5s ease-in-out";
  counter--;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

nextBtn.addEventListener('click', () => {
  if (counter >= carouselImages.length - 1) return;
  carouselSlide.style.transition = "transform 0.5s ease-in-out";
  counter++;
  carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
});

carouselSlide.addEventListener('transitionend', () => {
  if (carouselImages[counter].id === 'lastSlide') {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length -2;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }

  if (carouselImages[counter].id === 'firstSlide') {
    carouselSlide.style.transition = "none";
    counter = carouselImages.length - counter;
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
  }
});


//Infinite content
let haveHitBottom = false

let theStateOfTheInterface = (event) => { 
  
  let winH = document.documentElement.clientHeight
  let winW = document.documentElement.clientWidth
  let docH = document.documentElement.scrollHeight
  let docW = document.documentElement.scrollWidth
  let winY = window.scrollY
  let winX = window.scrollX
  let maxY = docH - winH
  let maxX = docW - winW
  let pctY = Math.round(winY / Math.max(maxY, 1) * 100)
  let pctX = Math.round(winX / Math.max(maxX, 1) * 100)

  if (winY >= maxY) {
    document.querySelector('#content').innerHTML += `
      <div class="new-content">
        <h2>Thank you.</h2>
      </div>
      `
  }

  document.querySelector('.panel').innerHTML = `
    <li>The window is <strong>${winH}</strong> px tall, <strong>${winW}</strong> px wide</li>
    <li>The document is <strong>${docH}</strong> px tall, <strong>${docW}</strong> px wide</li>
    <li>The window has been scrolled vertically <strong>${winY}</strong> px of <strong>${maxY}</strong> px (<strong>${pctY}</strong> %)</li>
    <li>The window has been scrolled horizontally <strong>${winX}</strong> px of <strong>${maxX}</strong> px (<strong>${pctX}</strong> %)</li>
  `

}


window.addEventListener('load', theStateOfTheInterface)
window.addEventListener('scroll', theStateOfTheInterface)
window.addEventListener('resize', theStateOfTheInterface)