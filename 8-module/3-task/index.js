export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

