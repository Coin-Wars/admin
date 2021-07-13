import type { AppContext, AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { wrapper } from 'store'
import { verifyToken } from 'store/user/actions'
import { actions as userActions } from 'store/user'
import { parseCookie } from 'utils/parseCookie'
import { DefaultSeo } from 'next-seo'
import { Navbar } from 'components/common/Navbar'
import 'styles/index.scss'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <DefaultSeo titleTemplate="%s | Storegram" defaultTitle="Storegram" />
    <ChakraProvider>
      <CSSReset />
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  </>
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
