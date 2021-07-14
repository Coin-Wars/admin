import { default as axiosClient } from 'axios'
import { logout, reenter } from 'store/user/actions'
import { tokensSelector } from 'store/user/selectors'
import { Store } from 'redux'

export const axios = axiosClient.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    common: {
      Accept: 'application/json',
    },
  },
})

export const createAxiosInterceptors = (store: Store) => {
  const interceptor = axios.interceptors.response.use(
    (response) => Promise.resolve(response),
    async (error) => {
      if (error.response.status !== 401) {
        throw new Error(error)
      }

      axios.interceptors.response.eject(interceptor)

      try {
        const { refresh } = tokensSelector(store.getState())

        if (!refresh) {
          throw new Error(error)
        }

        const access = await reenter({ refresh })
        error.response.config.headers.Authorization = `Bearer ${access}`
        return axios.request(error.response.config)
      } catch (err) {
        logout()
        throw new Error(error)
      } finally {
        createAxiosInterceptors(store)
      }
    }
  )

  axios.interceptors.request.use(
    (config) => {
      const { access } = tokensSelector(store.getState())

      if (access) {
        config.headers.Authorization = `Bearer ${access}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
}
