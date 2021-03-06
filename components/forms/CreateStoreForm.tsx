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
import { StoreCreationData } from 'services/models'
import { useStore } from 'hooks/useStore'
import { FileUpload } from 'components/common/FileUpload'

export const CreateStoreForm: React.FC = () => {
  const { createStore } = useStore()
  const [logo, setLogo] = useState<File>()

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<StoreCreationData>()

  const onSubmit = (data: StoreCreationData) => createStore(data)

  return (
    <Stack my="24px" align="center">
      <Box w="2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack align="center">
            <Heading fontSize="4xl" my="24px">
              Создание магазина
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
                    maxFiles={1}
                    accept="image/*"
                    maxSize={12582912}
                    onDrop={(acceptedFiles) => {
                      setLogo(acceptedFiles[0])
                      onChange(acceptedFiles[0])
                    }}
                  />
                )}
                control={control}
                name="logo"
              />

              <Text>{logo?.name}</Text>

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
