import { EActions } from '../const/context.tsx'

type AddAuthTokenAction = { type: EActions.AddAuth; payload: string }
type AddRefreshTokenAction = { type: EActions.AddRefresh; payload: string }
type DeleteAuthTokenAction = { type: EActions.DeleteAuth; payload: string | null }
type DeleteRefreshTokenAction = { type: EActions.DeleteRefresh; payload: string | null }

export type Action = AddAuthTokenAction | AddRefreshTokenAction | DeleteAuthTokenAction | DeleteRefreshTokenAction
