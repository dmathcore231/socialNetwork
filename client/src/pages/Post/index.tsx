import './styles.scss'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { fetchGetUserDataByToken } from '../../redux/userSlice'
import { getDataFromLocalStorage } from '../../helpers'

export function Post(): JSX.Element {
  const dispatch = useAppDispatch()
  const token = getDataFromLocalStorage('token')

  useEffect(() => {
    if (token) {
      dispatch(fetchGetUserDataByToken())
    }
  })

  return (
    <div className="post-page content-page">
      <Outlet />
    </div>
  )
}
