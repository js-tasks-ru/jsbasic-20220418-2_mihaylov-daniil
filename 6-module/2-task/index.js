

// let product = {
//   name: "Laab kai chicken salad", // название товара
//   price: 10, // цена товара
//   category: "salads", // категория, к которой он относится, нам это понадобится чуть позже
//   image: "laab_kai_chicken_salad.png", // название картинки товара
//   id: "laab-kai-chicken-salad" // уникальный идентификатор товара, нужен для добавления товара в корзину
// };

console.clear();

export default class ProductCard {
  product = null;
  elem = document.createElement('div');
  constructor(product) {
    this.product = product;
    this.render();
  }


  get container() {
    if (!this.elem) {
      return null;
    }
    return this.elem;
  }

  #onBtnClick = (event) => {
    if (event.target.classList.contains('card__button')) {
      const add = new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true,
      });
      this.container.dispatchEvent(add);

    }
  }



  render() {
    const template = `  
    <div class="card__top">
      <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
      <span class="card__price">&euro;${this.product.price.toFixed((2))}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${this.product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
    `;

    this.elem.classList.add('card');
    this.elem.innerHTML = template;

    this.container.addEventListener('click', this.#onBtnClick);
  }
}

