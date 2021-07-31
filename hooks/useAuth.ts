import { useSelector } from 'react-redux'
import {
  isLoggedSelector,
  tokensSelector,
  infoSelector,
  nicknameSelector,
} from 'store/user/selectors'
import {
  login,
  reenter,
  register,
  getCurrentUser,
  logout,
} from 'store/user/actions'
import { LoginData, RegisterData, Tokens } from 'services/models'
import { useAppDispatch } from 'store'

export const useAuth = () => {
  const dispatch = useAppDispatch()

  return {
    isLogged: useSelector(isLoggedSelector),
    tokens: useSelector(tokensSelector),
    login: (data: LoginData) => dispatch(login(data)).unwrap(),
    reenter: (refresh: Tokens['refresh']) =>
      dispatch(reenter({ refresh })).unwrap(),
    logout: () => dispatch(logout()).unwrap(),
    register: (data: RegisterData) => dispatch(register(data)).unwrap(),
  }
}
