import { NextPage } from 'next'
import { Button } from '@chakra-ui/react'
import { useAuth } from 'hooks/useAuth'

const Home: NextPage = () => {
  const { isLogged } = useAuth()

  return <Button>is logged - {String(isLogged)}</Button>
}

export default Home
