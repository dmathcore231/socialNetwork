import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "../hooks"
import { PrivateRouterProps } from "../types/interfaces/PrivateRouterProps"

export function PrivateRouter({ children, redirectTo }: PrivateRouterProps): JSX.Element {
  const { user, ResponseState: { loading } } = useAppSelector(state => state.user)
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (!user && !loading) {
      setRedirect(true)
    } else {
      setRedirect(false)
    }
  }, [user, loading])

  if (redirect) {
    return <Navigate to={redirectTo} />
  } else {
    return children
  }
}
