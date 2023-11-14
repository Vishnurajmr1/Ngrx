import { Product } from "../product";
import { ProductPageActions,ProductApiActions } from "./actions";
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
  on(ProductPageActions.toggleProductCode, (state): ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  }),
  on(ProductPageActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ...state,
      currentProductId: action.currentProductId,
    };
  }),
  on(ProductPageActions.clearCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: null,
    };
  }),
  on(ProductPageActions.initializeCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0,
    };
  }),
  on(ProductApiActions.loadProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: '',
    };
  }),
  on(ProductApiActions.loadProductFailure, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error,
    };
  }),
  on(ProductApiActions.updateProductSuccess, (state, action): ProductState => {
    const updatedProduct = state.products.map((item) =>
      action.product.id === item.id ? action.product : item
    );
    return {
      ...state,
      products: updatedProduct,
      error: '',
    };
  }),
  on(ProductApiActions.updateProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: action.error,
    };
  }),
  on(ProductApiActions.createProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: [...state.products, action.product],
      currentProductId: action.product.id,
      error: '',
    };
  }),
  on(ProductApiActions.creatProductFailure, (state, action): ProductState => {
    return {
      ...state,
      error: state.error,
    };
  }),
  on(ProductApiActions.deleteProductSuccess,(state,action)=>{
    return{
      ...state,
      products:state.products.filter(product=>product.id!==action.productId),
      currentProductId:null,
      error:''
    }
  }),
  on(ProductApiActions.deleteProductFailure,(state,action)=>{
    return{
      ...state,
      error:state.error
    }
  })
);
