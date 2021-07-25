import { NextPage } from 'next'
import { Button } from '@chakra-ui/react'
import { useAuth } from 'hooks/useAuth'
import { UnauthorizedLayout } from 'components/layouts/UnauthorizedLayout'
import { withUnAuth } from 'hocs/withUnauth'

const Home: NextPage = () => {
  const { isLogged } = useAuth()

  return (
    <UnauthorizedLayout>
      <Button>is logged - {String(isLogged)}</Button>
    </UnauthorizedLayout>
  )
}

export default withUnAuth(Home)
