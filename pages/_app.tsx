import type { AppContext, AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import nookie from 'nookies'
import { wrapper } from 'store'
import { getCurrentUser } from 'store/user/actions'
import { DefaultSeo } from 'next-seo'
import { createAxiosInterceptors } from 'services/api'
import { actions as userActions } from 'store/user'
import { BaseLayout } from 'components/layouts/BaseLayout'
import 'styles/index.scss'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <DefaultSeo titleTemplate="%s | Storegram" defaultTitle="Storegram" />
    <ChakraProvider>
      <CSSReset />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ChakraProvider>
  </>
)

MyApp.getInitialProps = wrapper.getInitialAppProps(
  (store) =>
    async ({ Component, ctx }: AppContext) => {
      let access, refresh

      access = nookie.get(ctx)['access_token']
      refresh = nookie.get(ctx)['refresh_token']

      if (access) {
        store.dispatch(userActions.setAuth({ access, refresh }))
        createAxiosInterceptors(store)

        try {
          await store.dispatch(getCurrentUser())
        } catch (e) {
          nookie.destroy(ctx, 'access_token')
          nookie.destroy(ctx, 'refresh_token')
          store.dispatch(userActions.resetAuth())
        }
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
