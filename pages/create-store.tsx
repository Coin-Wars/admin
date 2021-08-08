import React from 'react'
import { AuthorizedLayout } from 'components/layouts/AuthorizedLayout'
import { withAuth } from 'hocs/withAuth'
import { NextSeo } from 'next-seo'
import { routes } from 'resources/routes'
import { Heading, Text, OrderedList, ListItem, Link } from '@chakra-ui/react'
import { CreateStoreForm } from 'components/forms/CreateStoreForm'
import createStoreImage1 from 'assets/images/create-store-1.png'
import createStoreImage2 from 'assets/images/create-store-2.png'
import createStoreImage3 from 'assets/images/create-store-3.png'
import Image from 'next/image'

const CreateStore: React.VFC = () => (
  <>
    <NextSeo title={routes.create_store.name} />
    <AuthorizedLayout>
      <Heading>Создать магазин</Heading>
      <Text mt="2" mb="4">
        Чтобы создать магазин, следуйте инструкциями ниже:
      </Text>
      <OrderedList>
        <ListItem>
          Найдите в телеграме бота{' '}
          <Link href="https://telegram.me/BotFather" isExternal>
            @BotFather
          </Link>
          , запустите его:
          <Image src={createStoreImage1} />
        </ListItem>
        <ListItem>
          Введите команду /newbot, укажите название вашего магазина, после этого
          уникальное название на английском, оканчивающиеся на Bot, или _bot:
          <Image src={createStoreImage2} />
        </ListItem>
        <ListItem>
          Вам станет доступен токен бота вашего магазина, скопируйте его и
          вставьте в форму ниже, чтобы мы могли его обслуживать:
          <Image src={createStoreImage3} />
          <CreateStoreForm />
        </ListItem>
      </OrderedList>
    </AuthorizedLayout>
  </>
)

export default withAuth(CreateStore)
