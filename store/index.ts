import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { reducer as userSliceReducer } from './user'

const reducers = combineReducers({
  user: userSliceReducer,
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

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  })

export const wrapper = createWrapper<ReturnType<typeof makeStore>>(makeStore)
