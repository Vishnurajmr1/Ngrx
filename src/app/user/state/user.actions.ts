import { createAction } from "@ngrx/store";

export const maskUserName=createAction(
    '[User] Mask User Name'
)

export const maskUserNameSuccess=createAction(
    '[User] Mask User Name Success'
)

export const maskUserNameFail=createAction(
    '[User] Mask User Name Fail'
)