import React from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { RegisterData } from 'services/models'
import { useAuth } from 'hooks/useAuth'
import { useRouter } from 'next/router'
import { routes } from 'resources/routes'

export const RegisterForm: React.VFC = () => {
  const { register: registerAction } = useAuth()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<RegisterData>()

  const onSubmit = (data: RegisterData) =>
    registerAction(data).then(() => router.push(routes.login.path))

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Зарегистрируйтесь</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              чтобы создать свой первый магазин 🏪️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl
                id="email"
                isInvalid={errors.email && touchedFields.email}
              >
                <FormLabel>Email</FormLabel>
                <Input
                  id="email"
                  {...register('email', {
                    required: 'Email обязательный',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Неправильно введен email',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={errors.password && touchedFields.password}
              >
                <FormLabel>Пароль</FormLabel>
                <Input
                  type="password"
                  {...register('password', {
                    required: 'Пароль обязательный',
                    minLength: {
                      value: 8,
                      message: 'Пароль должен содержать от 8 символов',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Создать аккаунт
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Box>
  )
}
