import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  categories = null;
  elem = null;
  constructor(categories) {
    this.categories = categories;
    this.render();
  }

  onElemClick = (event) => {
    event.preventDefault();
    if (event.target.dataset.id) {
      const select = new CustomEvent("ribbon-select", {
        detail: event.target.dataset.id,
        bubbles: true,
      });
      this.elem.dispatchEvent(select);
    }
  }

  onInnerScroll(inner) {
    const ribbonRight = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonLeft = this.elem.querySelector('.ribbon__arrow_left');
    let scrollWidth = inner.scrollWidth;
    let scrollLeft = inner.scrollLeft;
    let clientWidth = inner.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;
    if (scrollRight < 1) {
      ribbonRight.classList.remove('ribbon__arrow_visible');
    } else {
      ribbonRight.classList.add('ribbon__arrow_visible');
    }
    if (scrollLeft < 1) {
      ribbonLeft.classList.remove('ribbon__arrow_visible');
    } else {
      ribbonLeft.classList.add('ribbon__arrow_visible');
    }
  }

  onRightArrowClick(inner) {
    inner.scrollBy(350, 0);
  }

  onLeftArrowClick(inner) {
    inner.scrollBy(-350, 0);
  }

  render() {
    const template = `
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>
  <nav class="ribbon__inner">
    ${this.categories.map(item => `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`).join('')}
  </nav>
  <button class="ribbon__arrow ribbon__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>
    `;

    this.elem = document.createElement('div');
    this.elem.classList.add('ribbon');
    this.elem.innerHTML = template;

    const ribbonInner = this.elem.querySelector('.ribbon__inner');
    const ribbonRight = this.elem.querySelector('.ribbon__arrow_right');
    const ribbonLeft = this.elem.querySelector('.ribbon__arrow_left');


    ribbonRight.classList.add('ribbon__arrow_visible');
    ribbonLeft.classList.remove('ribbon__arrow_visible');


    ribbonInner.addEventListener('scroll', () => {
      this.onInnerScroll(ribbonInner);
    });

    ribbonRight.addEventListener('click', () => {
      this.onRightArrowClick(ribbonInner);
    });
    ribbonLeft.addEventListener('click', () => {
      this.onLeftArrowClick(ribbonInner);
    });

    let btns = this.elem.querySelectorAll('[data-id]');
    let btnsArr = [...btns];
    btnsArr[0].classList.add('ribbon__item_active');
    for (let i = 0; i < btnsArr.length; i++) {
      btnsArr[i].addEventListener('click', () => {
        for (let i = 0; i < btnsArr.length; i++) {
          btnsArr[i].classList.remove('ribbon__item_active');
        }
        btnsArr[i].classList.add('ribbon__item_active');
      });
    }

    this.elem.addEventListener('click', this.onElemClick);
  }
}
