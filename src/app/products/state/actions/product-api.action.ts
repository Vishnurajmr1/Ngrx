import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';
export const loadProductSuccess = createAction(
  '[Product API] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductFailure = createAction(
  '[Product API] Load Fail',
  props<{ error: string }>()
);
export const updateProductSuccess = createAction(
  '[Product API] Update Product Success',
  props<{ product: Product }>()
);

export const updateProductFailure = createAction(
  '[Product API] Update Product Fail',
  props<{ error: string }>()
);
export const createProductSuccess = createAction(
  '[Product API] Create Product Success',
  props<{ product: Product }>()
);
export const creatProductFailure = createAction(
  '[Product API] Create Fail',
  props<{ error: string }>()
);
export const deleteProductSuccess = createAction(
  '[Product API] Delete Product Success',
  props<{ productId: number }>()
);

export const deleteProductFailure = createAction(
  '[Product API] Delete Product Fail',
  props<{ error: string }>()
);
