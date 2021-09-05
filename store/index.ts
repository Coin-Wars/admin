import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { reducer as userSliceReducer } from './user'
import { reducer as storeSliceReducer } from './store'
import { useDispatch } from 'react-redux'

const reducers = combineReducers({
  user: userSliceReducer,
  store: storeSliceReducer,
})

const rootReducer = (state: RootState, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    }
  } else {
    return reducers(state, action)
  }
}

export type RootState = ReturnType<typeof reducers>

export const makeStore = () =>
  configureStore<ReturnType<typeof rootReducer>>({
    reducer: rootReducer,
  })

export const wrapper = createWrapper<ReturnType<typeof makeStore>>(makeStore)

export type storeType = ReturnType<typeof makeStore>

export type AppDispatch = storeType['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
