import { default as axiosClient } from 'axios'
import { logout, reenter } from 'store/user/actions'
import { storeType } from 'store'
import { tokensSelector } from 'store/user/selectors'

export const axios = axiosClient.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    common: {
      Accept: 'application/json',
    },
  },
})

export const createAxiosInterceptors = (store: storeType) => {
  const { access, refresh } = tokensSelector(store.getState())

  console.log(access)

  const interceptor = axios.interceptors.response.use(
    (response) => Promise.resolve(response),
    async (error) => {
      if (error.response.status !== 401) {
        throw new Error(error)
      }

      axios.interceptors.response.eject(interceptor)

      try {
        if (!refresh) {
          throw new Error(error)
        }

        await store.dispatch(reenter({ refresh }))
        const { access } = tokensSelector(store.getState())

        error.response.config.headers.Authorization = `Bearer ${access}`
        await axios.request(error.response.config)
      } catch (err) {
        store.dispatch(logout())
        throw new Error(error)
      } finally {
        createAxiosInterceptors(store)
      }
    }
  )

  axios.interceptors.request.use(
    (config) => {
      if (access) {
        config.headers.Authorization = `Bearer ${access}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
}
