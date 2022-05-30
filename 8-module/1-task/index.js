import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    if(this.elem.offsetWidth) {
      if(document.documentElement.clientWidth <= 767) {
        return;
      }
      let start = this.elem.getBoundingClientRect().top;
      let container = document.querySelector('.container');
      let containerWidth = container.offsetWidth;
      let containerLeft = document.documentElement.clientWidth - this.elem.offsetWidth - 10;
      let containerRight = Math.round(container.getBoundingClientRect().left + containerWidth) + 20;
      let indent = Math.min(containerRight, containerLeft) + 'px';
      console.log(containerRight);
     if(document.documentElement.scrollTop >= start) {
       this.elem.style.position = 'fixed';
       this.elem.style.left = indent;

     } else {
      this.elem.style.position = '';
      this.elem.style.left = '';
     }
    } else {
      return;
    }
  }
}
