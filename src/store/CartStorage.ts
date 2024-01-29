import { makeAutoObservable, reaction } from 'mobx';
import { Product } from '../types/ProductEntity';

class Cart {
  cartItems: Product[] = [];

  totalPrice: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.initCart();
    this.deleteItem = this.deleteItem.bind(this);

    reaction(
      () => this.cartItems.slice(),
      (cartItems: Product[]) => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        this.calculateTotalPrice();
        localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice));
      },
    );
  }

  initCart() {
    const storedCartItems = localStorage.getItem('cartItems');
    const totalPrice = localStorage.getItem('totalPrice');

    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
    }

    if (totalPrice) {
      this.totalPrice = JSON.parse(totalPrice);
    }
  }

  addItem(item: Product) {
    if (!this.cartItems.find((el) => el.id === item.id)) {
      this.cartItems = [...this.cartItems, item];
    }
  }

  deleteItem(item: Product) {
    this.cartItems = [...this.cartItems.filter((el) => el.id !== item.id)];
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce(
      (acc, item) => acc + +item.price,
      0,
    );
  }

  clearCart() {
    this.cartItems = [];
    localStorage.clear();
  }
}

export const shopCart = new Cart();
