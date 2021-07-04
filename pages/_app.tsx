import type { AppContext, AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UnauthorizedLayout } from 'components/layouts/UnauthorizedLayout'
import Cookies from 'js-cookie'
import { wrapper } from 'store'
import { verifyToken } from 'store/user/actions'
import { actions as userActions } from 'store/user'
import { useAuth } from 'hooks/useAuth'
import { parseCookie } from 'utils/parseCookie'
import 'styles/index.scss'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider>
    <UnauthorizedLayout>
      <Component {...pageProps} />
    </UnauthorizedLayout>
  </ChakraProvider>
)

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ Component, ctx }: AppContext) => {
      let accessToken

      if (ctx.req?.headers.cookie) {
        accessToken = parseCookie(ctx.req.headers.cookie)['access']
      } else {
        accessToken = Cookies.get('access')
      }

      if (accessToken) {
        await store.dispatch(verifyToken(accessToken))
      } else {
        store.dispatch(userActions.resetAuth())
      }

      return {
        pageProps: {
          ...(Component.getInitialProps
            ? await Component.getInitialProps({ ...ctx, store })
            : {}),
        },
      }
    }
)

export default wrapper.withRedux(MyApp)
