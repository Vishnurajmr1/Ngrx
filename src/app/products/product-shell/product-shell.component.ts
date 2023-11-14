import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  State,
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
} from '../state';
import { ProductPageActions } from '../state/actions';
@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
  // Used to highlight the selected product in the list
  displayCode$!: Observable<boolean>;
  products$!: Observable<Product[]>;
  selectedProduct$!: Observable<Product | null | undefined>;
  errorMessage$!: Observable<string>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.products$ = this.store.select(getProducts);
    this.errorMessage$ = this.store.select(getError);
    this.store.dispatch(ProductPageActions.loadProducts());
    this.selectedProduct$ = this.store.select(getCurrentProduct);
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(
      ProductPageActions.setCurrentProduct({ currentProductId: product.id })
    );
  }
}
