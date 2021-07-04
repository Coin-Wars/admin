import { useSelector, useDispatch } from 'react-redux'
import { isLoggedSelector } from 'store/user/selectors'
import { verifyToken } from 'store/user/actions'
import { Tokens } from 'services/models'

export const useAuth = () => {
  const dispatch = useDispatch()

  return {
    verifyToken: (token: Tokens['access']) => dispatch(verifyToken(token)),
    isLogged: useSelector(isLoggedSelector),
  }
}
