import React from 'react'
import {
  Box,
  FormControl,
  Input,
  Button,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { UserUpdateData } from 'services/models'
import { useUser } from 'hooks/useUser'
import _ from 'lodash'

export const UserInfoForm: React.VFC = () => {
  const { updateUser, userInfo } = useUser()

  const defaultValues = {
    email: userInfo.email,
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    old_password: '',
    password: '',
  } as UserUpdateData
  const requiredFieldsWithPassword = ['email', 'password']

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, touchedFields, dirtyFields },
  } = useForm<UserUpdateData>({
    defaultValues,
  })

  const onSubmit = async (data: UserUpdateData) => {
    await updateUser(
      _.omitBy(
        data,
        (val, key) => val === defaultValues[key as keyof UserUpdateData]
      )
    )
    setValue('password', '')
    setValue('old_password', '')
  }

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          id="first_name"
          isInvalid={errors.first_name && touchedFields.first_name}
        >
          <FormLabel>Имя</FormLabel>
          <Input
            bg="white"
            id="first_name"
            {...register('first_name', {
              minLength: {
                value: 4,
                message: 'Имя должно содержать минимум 4 символов',
              },
              maxLength: {
                value: 56,
                message: 'Имя должно содержать максимум 56 символов',
              },
            })}
          />
          <FormErrorMessage>
            {errors.first_name && errors.first_name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          mt={4}
          id="last_name"
          isInvalid={errors.last_name && touchedFields.last_name}
        >
          <FormLabel>Фамилия</FormLabel>
          <Input
            bg="white"
            id="last_name"
            {...register('last_name', {
              minLength: {
                value: 4,
                message: 'Фамилия должна содержать минимум 4 символов',
              },
              maxLength: {
                value: 56,
                message: 'Фамилия должна содержать максимум 56 символов',
              },
            })}
          />
          <FormErrorMessage>
            {errors.last_name && errors.last_name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          mt={4}
          id="email"
          isInvalid={errors.email && touchedFields.email}
        >
          <FormLabel>Email</FormLabel>
          <Input
            bg="white"
            id="email"
            {...register('email', {
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
          mt={4}
          id="password"
          isInvalid={errors.password && touchedFields.password}
        >
          <FormLabel>Изменить пароль</FormLabel>
          <Input
            bg="white"
            id="password"
            type="password"
            {...register('password', {
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

        {requiredFieldsWithPassword.some(
          (field) => dirtyFields[field as keyof UserUpdateData]
        ) && (
          <FormControl
            mt={4}
            id="old_password"
            type="password"
            isInvalid={errors.old_password && touchedFields.old_password}
          >
            <FormLabel>Введите старый пароль</FormLabel>
            <Input
              bg="white"
              type="password"
              id="old_password"
              {...register('old_password', {
                required: 'Старый пароль обязательный',
                minLength: {
                  value: 8,
                  message: 'Пароль должен содержать от 8 символов',
                },
              })}
            />
            <FormErrorMessage>
              {errors.old_password && errors.old_password.message}
            </FormErrorMessage>
          </FormControl>
        )}

        <Button
          colorScheme="blue"
          mr={3}
          mt={4}
          w="100%"
          isLoading={isSubmitting}
          type="submit"
        >
          Сохранить
        </Button>
      </form>
    </Box>
  )
}
