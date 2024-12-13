import { IState } from './AuthContext.tsx'
import { Action } from './Actions.tsx'
import { EActions } from '../const/context.tsx'

export const authReducer = (state: IState, action: Action): IState => {
	switch (action.type) {

		case EActions.AddAuth:
			addSessionStorage('authToken', action.payload)
			return { ...state, auth: { authToken: action.payload } }

		case EActions.AddRefresh:
			addSessionStorage('refreshToken', action.payload)
			return { ...state, auth: { refreshToken: action.payload } }
		case EActions.DeleteAuth:
			deleteSessionStorage('authToken')
			return { ...state, auth: { authToken: action.payload } }
		case EActions.DeleteRefresh:
			deleteSessionStorage('refreshToken')
			return { ...state, auth: { refreshToken: action.payload } }
		default:
			return state
	}
}
const addSessionStorage = (key: string, payload: string) => {
	sessionStorage.setItem(key, payload)
}
const deleteSessionStorage = (key: string) => {
	sessionStorage.removeItem(key)
}
