import { makeAutoObservable, reaction } from 'mobx';
import { Product } from '../types/ProductEntity';

class Cart {
  cartItems: Product[] = [];

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.cartItems.slice(),
      () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.totalPrice;
      },
    );
  }

  addItem(item: Product) {
    if (!this.cartItems.find((el) => el.id === item.id)) {
      this.cartItems = [...this.cartItems, item];
    }
  }

  deleteItem(item: Product) {
    this.cartItems = this.cartItems.filter((el) => el.id !== item.id);
  }

  get totalPrice() {
    return this.cartItems.reduce(
      (acc, item) => acc + (item.price || item.fullPrice),
      0,
    );
  }
}

export const shopCart = new Cart();
