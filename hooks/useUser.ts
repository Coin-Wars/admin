import { useSelector } from 'react-redux'
import { infoSelector, nicknameSelector } from 'store/user/selectors'
import { getCurrentUser, update } from 'store/user/actions'
import { UserUpdateData } from 'services/models'
import { useAppDispatch } from 'store'

export const useUser = () => {
  const dispatch = useAppDispatch()

  return {
    userInfo: useSelector(infoSelector),
    nickname: useSelector(nicknameSelector),
    getCurrentUser: () => dispatch(getCurrentUser()).unwrap(),
    updateUser: (data: UserUpdateData) => dispatch(update(data)).unwrap(),
  }
}
