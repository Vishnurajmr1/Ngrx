import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { User } from '../user';
import * as UserActions from './user.actions';

export interface UserState{
  maskUsername:boolean;
  currentUser:User|null;
  error:string;
}

const initialState:UserState={
  maskUsername:true,
  currentUser:null,
  error:''
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

export const getError=createSelector(
  getUserFeatureState,
  state=>state.error
)
export const userReducer = createReducer(
  initialState,
  on(UserActions.maskUserName, (state) => {
    return { ...state, maskUsername: !state.maskUsername };
  })
);
