import { default as axiosClient } from 'axios'
import { logout, reenter } from 'store/user/actions'
import { UserAuthState } from 'store/user'

export const axios = axiosClient.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    common: {
      Accept: 'application/json',
    },
  },
})

export const createAxiosInterceptors = (tokens: UserAuthState) => {
  const { access, refresh } = tokens

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

        const access = await reenter({ refresh })
        error.response.config.headers.Authorization = `Bearer ${access}`
        return axios.request(error.response.config)
      } catch (err) {
        logout()
        throw new Error(error)
      } finally {
        createAxiosInterceptors({ access, refresh })
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
