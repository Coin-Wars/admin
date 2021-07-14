import { useSelector, useDispatch } from 'react-redux'
import { isLoggedSelector, tokensSelector } from 'store/user/selectors'

export const useAuth = () => {
  const dispatch = useDispatch()

  return {
    isLogged: useSelector(isLoggedSelector),
    tokens: useSelector(tokensSelector),
  }
}
