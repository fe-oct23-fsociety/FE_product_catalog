import { makeAutoObservable, reaction } from 'mobx';
import { Product } from '../types/ProductEntity';

class Favourites {
  favourites: Product[] = [];

  constructor() {
    makeAutoObservable(this);
    this.initFavourites();

    reaction(
      () => this.favourites.slice(),
      (favourites: Product[]) => {
        localStorage.setItem('favourites', JSON.stringify(favourites));
      },
    );
  }

  initFavourites() {
    const storedFavourites = localStorage.getItem('favourites');

    if (storedFavourites) {
      this.favourites = JSON.parse(storedFavourites);
    }
  }

  toggleAddToFavourites(product: Product) {
    if (!this.favourites.find(el => el.id === product.id)) {
      this.favourites = [...this.favourites, product];
    } else {
      this.favourites = this.favourites.filter(el => el.id !== product.id);
    }
  }

  get itemsInFavourites() {
    return this.favourites.length;
  }
}

export const favourites = new Favourites();
