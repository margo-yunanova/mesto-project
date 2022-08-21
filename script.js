const page = document.querySelector('.page');
const placeLikeIcons = page.querySelectorAll('.place__icon-like');

function toggleLike(evt) {
  evt.target.classList.toggle('place__icon-like_active');
}

for(let i = 0; i < placeLikeIcons.length; i++) {
  placeLikeIcons[i].addEventListener('click', toggleLike);
}
