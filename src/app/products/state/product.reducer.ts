import { Product } from "../product";
import * as ProductActions from './product.actions'
import { createReducer,on } from "@ngrx/store";
export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
};
export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductActions.loadProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductActions.loadProductFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(ProductActions.updateProductSuccess, (state, action): ProductState => {
    const updatedProduct = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      products: updatedProduct,
      error: '',
    };
  }),
  on(ProductActions.updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductActions.createProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductActions.creatProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: state.error,
    };
  }),
  on(ProductActions.deleteProductSuccess,(state,action)=>{
    return{
      ...state,
      products:state.products.filter(product=>product.id!==action.productId),
      currentProductId:null,
      error:''
    }
  }),
  on(ProductActions.deleteProductFailure,(state,action)=>{
    return{
      ...state,
      error:state.error
    }
  })
);
