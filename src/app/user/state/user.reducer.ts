import { createAction, createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../user';

export interface UserState{
  maskUsername:boolean;
  currentUser:User|null;
}

const initialState:UserState={
  maskUsername:true,
  currentUser:null
}

export const getUserFeatureState=createFeatureSelector<UserState>('users');

export const getMaskUserName=createSelector(
  getUserFeatureState,
  state=>state.maskUsername
)
export const getCurrentUser=createSelector(
  getUserFeatureState,
  state=>state.currentUser
)
export const userReducer = createReducer(
  initialState,
  on(createAction('[User]Mask User Name'), (state) => {
    return { ...state, maskUsername: !state.maskUsername };
  })
);
