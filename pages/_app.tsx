import type { AppContext, AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { wrapper } from 'store'
import { getCurrentUser } from 'store/user/actions'
import { parseCookie } from 'utils/parseCookie'
import { DefaultSeo } from 'next-seo'
import { Navbar } from 'components/common/Navbar'
import { createAxiosInterceptors } from 'services/api'
import { actions as userActions } from 'store/user'
import { tokensSelector } from 'store/user/selectors'
import { BaseLayout } from 'components/layouts/BaseLayout'
import 'styles/index.scss'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <DefaultSeo titleTemplate="%s | Storegram" defaultTitle="Storegram" />
    <ChakraProvider>
      <CSSReset />
      <BaseLayout>
        <Navbar />
        <Component {...pageProps} />
      </BaseLayout>
    </ChakraProvider>
  </>
)

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ Component, ctx }: AppContext) => {
      let access, refresh

      if (ctx.req?.headers.cookie) {
        access = parseCookie(ctx.req.headers.cookie)['access_token']
        refresh = parseCookie(ctx.req.headers.cookie)['refresh_token']
      } else {
        access = Cookies.get('access_token')
        refresh = Cookies.get('refresh_token')
      }

      if (access && refresh) {
        store.dispatch(userActions.setAuth({ access, refresh }))
        createAxiosInterceptors(tokensSelector(store.getState()))
        await store.dispatch(getCurrentUser())
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
