function initCarousel() {
  const carouselArrow = [...document.querySelectorAll('.carousel__arrow')];
  const inner = document.querySelector('.carousel__inner');
  let transform = 0;
  let count = 0;
  let left;
  let right;
  carouselArrow.forEach(arrow => {
    if (arrow.classList.contains('carousel__arrow_right')) {
      right = arrow;
    } else {
      left = arrow;
    }
  });

  right.addEventListener('click', () => {
    transform += inner.offsetWidth;
    inner.style.transform = `translateX(-${transform}px)`;
  });

  right.addEventListener('click', () => {
    count++;
    if (count > 0) {
      left.style.display = '';
    }
    if (count === 3) {
      right.style.display = 'none';
    }

  });

  left.style.display = 'none';
  left.addEventListener('click', () => {
    transform -= inner.offsetWidth;
    inner.style.transform = `translateX(-${transform}px)`;
  });

  left.addEventListener('click', () => {
    count--;
    if (count < 3) {
      right.style.display = '';
    }
    if (count === 0) {
      left.style.display = 'none';
    }
  });
}








