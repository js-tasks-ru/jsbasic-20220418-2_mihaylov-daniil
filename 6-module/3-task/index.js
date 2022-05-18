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
    if (event.target.classList.contains('carousel__button')) {
      const add = new CustomEvent("product-add", {
        detail: event.target.dataset.id,
        bubbles: true,
      });
      this.container.dispatchEvent(add);
    }
  }

  render() {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');

    const rightArrow = document.createElement('div');
    rightArrow.classList.add('carousel__arrow', 'carousel__arrow_right');
    const rightImg = document.createElement('img');
    rightImg.src = '/assets/images/icons/angle-icon.svg';
    rightArrow.append(rightImg);
    carousel.append(rightArrow);

    const leftArrow = document.createElement('div');
    leftArrow.classList.add('carousel__arrow', 'carousel__arrow_left');
    const leftImg = document.createElement('img');
    leftImg.src = '/assets/images/icons/angle-left-icon.svg';
    leftArrow.append(leftImg);
    carousel.append(leftArrow);

    const inner = document.createElement('div');
    inner.classList.add('carousel__inner');
    carousel.append(inner);

    for (let i = 0; i < this.slides.length; i++) {
      const slide = document.createElement('div');
      slide.classList.add('carousel__slide');

      const img = document.createElement('img');
      img.classList.add('carousel__img');
      img.src = `/assets/images/carousel/${this.slides[i].image}`;
      slide.append(img);

      const caption = document.createElement('div');
      caption.classList.add('carousel__caption');
      slide.append(caption);

      const span = document.createElement('span');
      span.classList.add('carousel__price');
      span.innerHTML = `&euro;${this.slides[i].price.toFixed((2))}`;
      caption.append(span);

      const title = document.createElement('div');
      title.classList.add('carousel__title');
      title.innerHTML = this.slides[i].name;
      caption.append(title);

      const btn = document.createElement('button');
      btn.setAttribute("data-id", this.slides[i].id);
      btn.classList.add('carousel__button');
      const icon = document.createElement('img');
      icon.src = `/assets/images/icons/plus-icon.svg`;
      btn.append(icon);
      caption.append(btn);

      inner.append(slide);
    }

    let transform = 0;
    let count = 0;

    rightArrow.addEventListener('click', () => {
      count++;
      transform += inner.offsetWidth;
      inner.style.transform = `translateX(-${transform}px)`;
      for (let i = 0; i < this.slides.length; i++) {
        console.log();
        if (count > 0) {
          leftArrow.style.display = '';
        }
        if (count === this.slides.length - 1) {
          rightArrow.style.display = 'none';
        }

      }
    });

    leftArrow.style.display = 'none';
    leftArrow.addEventListener('click', () => {
      count--;
      transform -= inner.offsetWidth;
      inner.style.transform = `translateX(-${transform}px)`;
      for (let i = 0; i < this.slides.length; i++) {
        if (count < this.slides.length - 1) {
          rightArrow.style.display = '';
        }
        if (count === 0) {
          leftArrow.style.display = 'none';
        }
      }
    });

    this.elem = carousel;
    this.container.addEventListener('click', this.#onBtnClick);
  }

}

