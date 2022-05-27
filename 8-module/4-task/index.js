import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if(product === null || !product) {
      return;
    }
      let cartItem = this.cartItems.find(item => {
        return item.product === product;
      })
      if(cartItem) {
        cartItem.count++;
      } else {
        this.cartItems.push({product, count: 1});
      }

      if(this.cartItems.length < 1) {
        this.cartItems.push({product, count: 1});
   
      } 

      this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = null;
    for(let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].product.id === productId) {
        this.cartItems[i].count += amount;
        cartItem = this.cartItems[i];
        if(this.cartItems[i].count < 1) {
          this.cartItems.splice(i, 1);
        }
      }
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if(this.cartItems.length < 1) {
      return true;
    }
    return false;
  }

  getTotalCount() {
    let totalCount = 0;
    for(let i = 0; i < this.cartItems.length; i++) {
      totalCount += this.cartItems[i].count;
    }
    return totalCount;
  }

  getTotalPrice() {
    let totalPrice = 0;
    for(let i = 0; i < this.cartItems.length; i++) {
      totalPrice += this.cartItems[i].count * this.cartItems[i].product.price;
    }
    return totalPrice
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
   const modal = new Modal();
    modal.open();
    modal.setTitle('Your order');
    const wrapper = document.createElement('div');
    this.cartItems.map(item => {
      wrapper.append(this.renderProduct(item.product, item.count));
    })
    wrapper.append(this.renderOrderForm());
    modal.setBody(wrapper)


    modal.elem.addEventListener('click', this.onPlusProduct, true);
    modal.elem.addEventListener('click', this.onMinusProduct);
    modal.elem.querySelector('form').addEventListener('submit', (event) => {
      this.onSubmit(event);
    })
  }

  onPlusProduct = (event) => {
    if(event.target.closest('button').classList.contains('cart-counter__button_plus')) {
      let product = event.target.closest('[data-product-id]');
      let productId = product.dataset.productId;
      this.updateProductCount(productId, 1);

    } 
  }

  onMinusProduct = (event) => {
    if(event.target.closest('button').classList.contains('cart-counter__button_minus')) {
      let product = event.target.closest('[data-product-id]');
 
      let productId = product.dataset.productId;
      this.updateProductCount(productId, -1);

    } 
    
  }

  onProductUpdate(cartItem) {
   if(document.querySelector('body').classList.contains('is-modal-open')) {
     console.log(cartItem);
    let productId = cartItem.product.id;
    let modalBody = document.querySelector('.modal__body');
    let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
    let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);
    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed((2))}`
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed((2))}`;
    if(productCount.innerHTML < 1) {
      modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
    }
    if(this.isEmpty() === true) {
      document.querySelector('body').classList.remove('is-modal-open');
      document.querySelector('.modal').remove();
    }
   }

    this.cartIcon.update(this);
  }



  onSubmit(event) {
   event.preventDefault();
   let modalBody = document.querySelector('.modal__body');
   modalBody.querySelector('button[type="submit"]').classList.add('is-loading');
  const form = modalBody.querySelector('.cart-form');
  const formData = new FormData(form);
  console.log(formData);
  const response = fetch('https://httpbin.org/post', {
      method: 'POST',
      body: formData,
    })

    response
      .then(data => {
        if(data.status === 200) {
          document.querySelector('.modal__title').innerHTML = 'Success!';
          this.cartItems.length = 0;
          document.querySelector('.modal__body').innerHTML = `
          <div class="modal__body-inner">
  <p>
    Order successful! Your order is being cooked :) <br>
    We’ll notify you about delivery time shortly.<br>
    <img src="/assets/images/delivery.gif">
  </p>
</div>
          `;
        }
      })
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

