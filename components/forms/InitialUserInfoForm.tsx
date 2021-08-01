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

interface UserInfoFormProps {
  submitCallback?: () => any
}

export const InitialUserInfoForm: React.VFC<UserInfoFormProps> = ({
  submitCallback,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<UserUpdateData>()
  const { updateUser } = useUser()

  const onSubmit = (data: UserUpdateData) =>
    updateUser(data).then(() => {
      if (submitCallback) {
        submitCallback()
      }
    })

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          id="first_name"
          isInvalid={errors.first_name && touchedFields.first_name}
        >
          <FormLabel>Имя</FormLabel>
          <Input
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
