import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  slides = null;
  elem = null;
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  get container() {
    if (!this.elem) {
      return null;
    }

    return this.elem;
  }

  #onBtnClick = (event) => {
    if (event.target.closest('.carousel__button')) {
      const btn = event.target.closest('.carousel__button');
      const add = new CustomEvent("product-add", {
        detail: btn.dataset.id,
        bubbles: true,
      });
      this.container.dispatchEvent(add);
    } else {
      return;
    }
  }

  render() {
    const template = `
  <div class="carousel__arrow carousel__arrow_right">
    <img src="https://course-jsbasic.javascript.ru/assets/icons/angle-icon.svg" alt="icon" />
  </div>
  <div class="carousel__arrow carousel__arrow_left">
    <img src="https://course-jsbasic.javascript.ru/assets/icons/angle-left-icon.svg" alt="icon" />
  </div>
  <div class="carousel__inner">
    ${this.slides.map(item => {
      return `
      <div class="carousel__slide">
      <img src="https://course-jsbasic.javascript.ru/assets/carousel/${item.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${item.price.toFixed(2)}</span>
        <div class="carousel__title">${item.name}</div>
        <button type="button" class="carousel__button" data-id="${item.id}">
          <img src="https://course-jsbasic.javascript.ru/assets/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `;
    }).join('')}
  
  </div>
</div>
  `;

    this.elem = document.createElement('div');
    this.elem.classList.add('carousel');
    this.elem.innerHTML = template;

    let transform = 0;
    let count = 0;

    const rightArrow = this.elem.querySelector('.carousel__arrow_right');
    const leftArrow = this.elem.querySelector('.carousel__arrow_left');
    const inner = this.elem.querySelector('.carousel__inner');

    rightArrow.addEventListener('click', () => {
      count++;
      transform += inner.offsetWidth;
      inner.style.transform = `translateX(-${transform}px)`;
      if (count > 0) {
        leftArrow.style.display = '';
      }
      if (count === this.slides.length - 1) {
        rightArrow.style.display = 'none';
      }
    });


    leftArrow.style.display = 'none';
    leftArrow.addEventListener('click', () => {
      count--;
      transform -= inner.offsetWidth;
      inner.style.transform = `translateX(-${transform}px)`;
      if (count < this.slides.length - 1) {
        rightArrow.style.display = '';
      }
      if (count === 0) {
        leftArrow.style.display = 'none';
      }
    });
    this.container.addEventListener('click', this.#onBtnClick);
  }

}