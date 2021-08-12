import React, { useState } from 'react'
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  FormErrorMessage,
  useColorModeValue,
  Textarea,
  Text,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { StoreUpdateData } from 'services/models'
import { useStore } from 'hooks/useStore'
import { FileUpload } from 'components/common/FileUpload'
import { Logo } from 'components/store/Logo'
import _ from 'lodash'

export const EditStoreForm: React.FC = () => {
  const { updateStore, currentStore } = useStore()
  const [logo, setLogo] = useState<File>()

  const defaultValues = {
    telegram_token: '',
    name: currentStore.name,
    description: currentStore.description,
    logo: null,
  }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<StoreUpdateData>({ defaultValues })

  const onSubmit = (data: StoreUpdateData) =>
    updateStore(
      _.omitBy(
        data,
        (val, key) => val === defaultValues[key as keyof StoreUpdateData]
      )
    )

  return (
    <Stack my="24px" align="center">
      <Box w="2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack align="center">
            <Heading fontSize="4xl" my="24px">
              Редактировать магазин
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl
                id="name"
                isInvalid={errors.name && touchedFields.name}
              >
                <FormLabel>Название магазина</FormLabel>
                <Input
                  id="name"
                  {...register('name', {
                    required: 'Название обязательное',
                    minLength: {
                      value: 4,
                      message: 'Название должно содержать от 8 символов',
                    },
                    maxLength: {
                      value: 56,
                      message: 'Название должно содержать до 56 символов',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                id="description"
                isInvalid={errors.description && touchedFields.description}
              >
                <FormLabel>Описание магазина</FormLabel>
                <Textarea
                  id="description"
                  {...register('description', {
                    maxLength: {
                      value: 256,
                      message: 'Описание должно содержать до 256 символов',
                    },
                  })}
                  resize="vertical"
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <FormLabel>Логотип</FormLabel>
              <Controller
                render={({ field: { onChange } }) => (
                  <FileUpload
                    maxFiles={2}
                    accept="image/*"
                    maxSize={12582912}
                    onDrop={(acceptedFiles) => {
                      console.log(acceptedFiles[0])
                      setLogo(acceptedFiles[0])
                      onChange(acceptedFiles[0])
                    }}
                  />
                )}
                control={control}
                name="logo"
              />

              {currentStore.logo && <Logo src={currentStore.logo} />}

              <Text>{logo?.name}</Text>

              <FormControl
                id="telegram_token"
                isInvalid={
                  errors.telegram_token && touchedFields.telegram_token
                }
              >
                <FormLabel>Изменить существующий токен:</FormLabel>
                <Input id="telegram_token" {...register('telegram_token')} />
                <FormErrorMessage>
                  {errors.telegram_token && errors.telegram_token.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                isLoading={isSubmitting}
                type="submit"
              >
                Сохранить
              </Button>
            </Stack>
          </Box>
        </form>
      </Box>
    </Stack>
  )
}
