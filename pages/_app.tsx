import type { AppContext, AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import nookie from 'nookies'
import { wrapper } from 'store'
import { getCurrentUser } from 'store/user/actions'
import { getStore } from 'store/store/actions'
import { DefaultSeo } from 'next-seo'
import { createAxiosInterceptors } from 'services/api'
import { actions as userActions } from 'store/user'
import { BaseLayout } from 'components/layouts/BaseLayout'
import { ToastProvider } from 'providers/ToastProvider'
import { ErrorBoundary } from 'components/ErrorBoundary'
import { infoSelector } from 'store/user/selectors'
import 'styles/index.scss'
import { EntityId } from '@reduxjs/toolkit'
import { seo } from 'resources/seo'

const MyApp = ({ Component, pageProps }: AppProps) => (
  <>
    <DefaultSeo {...seo} />
    <ChakraProvider>
      <CSSReset />
      <ToastProvider>
        <ErrorBoundary>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </ErrorBoundary>
      </ToastProvider>
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

        try {
          createAxiosInterceptors(store)
          await store.dispatch(getCurrentUser())
          await store.dispatch(getStore())
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
