import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'
import {
  Heading,
  Text,
  OrderedList,
  ListItem,
  Link,
  Box,
} from '@chakra-ui/react'
import { withNoStoreOwning } from 'hocs/withNoStoreOwning'
import { CreateStoreForm } from 'components/forms/CreateStoreForm'
import createStoreImage1 from 'assets/images/create-store-1.png'
import createStoreImage2 from 'assets/images/create-store-2.png'
import createStoreImage3 from 'assets/images/create-store-3.png'
import Image from 'next/image'

const CreateStore: React.VFC = () => (
  <>
    <NextSeo title={routes.createStore.name} />
    <AuthorizedLayout>
      <Heading>Создать магазин</Heading>
      <Text mt="2" mb="6">
        Чтобы создать магазин, следуйте инструкциями ниже:
      </Text>
      <OrderedList>
        <ListItem mb="6">
          <Text mb="4">
            Найдите в телеграме бота{' '}
            <Link
              href="https://telegram.me/BotFather"
              isExternal
              color="blue.400"
            >
              @BotFather
            </Link>
            , запустите его:
          </Text>
          <Box rounded={'lg'} boxShadow={'lg'}>
            <Image src={createStoreImage1} />
          </Box>
        </ListItem>
        <ListItem mb="6">
          <Text mb="4">
            Введите команду /newbot, укажите название вашего магазина, после
            этого уникальное название на английском, оканчивающиеся на Bot, или
            _bot:
          </Text>
          <Box rounded={'lg'} boxShadow={'lg'}>
            <Image src={createStoreImage2} />
          </Box>
        </ListItem>
        <ListItem>
          <Text mb="4">
            Вам станет доступен токен бота вашего магазина, скопируйте его и
            вставьте в форму ниже, чтобы мы могли его обслуживать:
          </Text>
          <Box rounded={'lg'} boxShadow={'lg'}>
            <Image src={createStoreImage3} />
          </Box>
          <CreateStoreForm />
        </ListItem>
      </OrderedList>
    </AuthorizedLayout>
  </>
)

export default withAuth(withNoStoreOwning(CreateStore))
