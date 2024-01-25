import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: Producto[] = [];

  addToCart(product: Producto ) {
    this.cartItems.push(product);
  }

  removeFromCart(product: Producto) {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getCartItems(): Producto[]  {
    return this.cartItems;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.precio, 0);
  }
}
