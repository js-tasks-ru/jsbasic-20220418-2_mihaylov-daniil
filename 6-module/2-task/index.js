

// let product = {
//   name: "Laab kai chicken salad", // название товара
//   price: 10, // цена товара
//   category: "salads", // категория, к которой он относится, нам это понадобится чуть позже
//   image: "laab_kai_chicken_salad.png", // название картинки товара
//   id: "laab-kai-chicken-salad" // уникальный идентификатор товара, нужен для добавления товара в корзину
// };


export default class ProductCard {
  product = null;
  elem = null;
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
    const card = document.createElement('div');
    card.classList.add('card');

    const cardTop = document.createElement('div');
    cardTop.classList.add('card__top');
    card.append(cardTop);

    const img = document.createElement('img');
    img.classList.add('card__image');
    img.src = `/assets/images/products/${this.product.image}`;
    cardTop.append(img);

    const span = document.createElement('span');
    span.classList.add('card__price');
    span.innerHTML = `&euro;${this.product.price.toFixed((2))}`;
    cardTop.append(span);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card__body');
    card.append(cardBody);

    const title = document.createElement('div');
    title.classList.add('card__title');
    title.innerHTML = this.product.name;
    cardBody.append(title);

    const btn = document.createElement('button');
    btn.classList.add('card__button');


    const icon = document.createElement('img');
    icon.src = `/assets/images/icons/plus-icon.svg`;
    btn.append(icon);


    cardBody.append(btn);

    this.elem = card;

    this.container.addEventListener('click', this.#onBtnClick);
  }
}

