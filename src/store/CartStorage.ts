import { makeAutoObservable, reaction } from 'mobx';
import { Product } from '../types/ProductEntity';

class Cart {
  cartItems: Product[] = [];

  totalPrice: number = 0;

  constructor() {
    makeAutoObservable(this);
    this.deleteItem = this.deleteItem.bind(this);

    reaction(
      () => this.cartItems.slice(),
      () => {
        this.calculateTotalPrice();
      },
    );
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
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + (+item.price), 0);
  }

  clearCart() {
    this.cartItems = [];
  }
}

export const shopCart = new Cart();
