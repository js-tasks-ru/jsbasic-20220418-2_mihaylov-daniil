import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {
  carousel = null;
  ribbonMenu = null;
  stepSlider = null;
  cartIcon = null;
  cart = null;
  productsGrid = null;
  constructor() {
  }


  productAddCustomEvent(event) {
    this.productsGrid.products.forEach(item => {
      if(item.id === event.detail) {
        this.cart.addProduct(item);
      }
    })
  }

  sliderChangeCustomEvent(event) {
    this.productsGrid.updateFilter({maxSpiciness : event.detail});
  }

  ribbonSelectCustomEvent(event) {
    this.productsGrid.updateFilter({category : event.detail});
  }


  async render() {
    this.carousel = new Carousel(slides);
    document.querySelector('[data-carousel-holder]').append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem);
  
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    document.querySelector('[data-slider-holder]').append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);
    const promise = await fetch('products.json');
    const response = await promise.json();

     this.productsGrid = new ProductsGrid(response);
     document.querySelector('[data-products-grid-holder]').innerHTML = '';
    document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);


    


    document.querySelector('body').addEventListener('product-add', event => {
      this.productAddCustomEvent(event);
    })

    this.stepSlider.elem.addEventListener('slider-change', event => {
      this.sliderChangeCustomEvent(event);
    })
    this.ribbonMenu.elem.addEventListener('ribbon-select', event => {
      this.ribbonSelectCustomEvent(event);
    })

    document.querySelector('#nuts-checkbox').addEventListener('change', (event)=> {

     this.productsGrid.updateFilter({
        noNuts: event.target.checked
      }); 
    });

    document.querySelector('#vegeterian-checkbox').addEventListener('change', (event)=> {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      }); 
    });
  }
}
