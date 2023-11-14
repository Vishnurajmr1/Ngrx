import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { ProductPageActions,ProductApiActions} from './actions'
import { catchError, concatMap, map, mergeMap, of } from 'rxjs';
@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductApiActions.loadProductSuccess({ products })),
          catchError((error) =>
            of(ProductApiActions.loadProductFailure({ error }))
          )
        )
      )
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      concatMap((action) =>
        this.productService.updateProduct(action.product).pipe(
          map((product) => ProductApiActions.updateProductSuccess({ product })),
          catchError((error) =>
            of(ProductApiActions.updateProductFailure({ error }))
          )
        )
      )
    );
  });
  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.createProduct),
      concatMap((action) =>
        this.productService.createProduct(action.product).pipe(
          map((product) => ProductApiActions.createProductSuccess({ product })),
          catchError((error) =>
            of(ProductApiActions.creatProductFailure({ error }))
          )
        )
      )
    );
  });
  deleteProduct$=createEffect(()=>{
    return this.actions$.pipe(
      ofType(ProductPageActions.deleteProduct),
      mergeMap(action=>this.productService.deleteProduct(action.productId).pipe(
        map(()=>ProductApiActions.deleteProductSuccess({productId:action.productId})),
        catchError(error=>of(ProductApiActions.deleteProductFailure({error})))
      ))
    )
  })
}
