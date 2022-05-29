import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';



export default class ProductGrid {
  products = null;
  filters = null;
  elem = null;
  temp = [];
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }




  updateFilter(filters){
  let filteredProducts = this.products;
   for(let key in filters) {
      this.filters[key] = filters[key];
   };

   
   if(this.filters.noNuts) {
     filteredProducts = filteredProducts.filter(item => {
       return item.nuts === false || item.nuts === undefined;
     })
   }

   if(this.filters.vegeterianOnly) {
     filteredProducts = filteredProducts.filter(item => {
       return item.vegeterian === true;
     })
   }

  if(this.filters.maxSpiciness) {
    filteredProducts = filteredProducts.filter(item => {
      return item.spiciness <= this.filters.maxSpiciness;
    })
  }
  if(this.filters.category) {
  filteredProducts =  filteredProducts.filter(item => {
      return item.category === this.filters.category;
    })
  }  

console.log(this.filters);
  this.elem.querySelector('.products-grid__inner').innerHTML = this.card(filteredProducts);
  } 


  card(products) {
    const template = `
      ${products.map(item => {
        return `
        <div class="card">
        <div class="card__top">
        <img src="/assets/images/products/${item.image}" class="card__image" alt="product">
        <span class="card__price">&euro;${item.price.toFixed((2))}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${item.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
      </div>
        `;
      }).join('')}
    `;

    return template;
      
  }

  render() {
    const inner = document.createElement('div');
    inner.classList.add('products-grid__inner');
    this.elem = document.createElement('div');
    this.elem.classList.add('products-grid');
    this.elem.append(inner);
    this.elem.querySelector('.products-grid__inner').innerHTML = this.card(this.products)


      

  }

}
