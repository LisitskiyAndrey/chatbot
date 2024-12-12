import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { RoutPages } from '../const/routs.tsx'

interface ProtectedRouteProps {
	isAuthenticated: boolean;
	redirectPath?: string;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
													 isAuthenticated,
													 redirectPath = RoutPages.Login
												 }) => {
	return isAuthenticated ? <Outlet/> : <Navigate to={redirectPath} replace/>
}

export default ProtectedRoute
