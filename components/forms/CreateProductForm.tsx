import React, { useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { ProductCreationData } from 'services/models'
import { FileUpload } from 'components/common/FileUpload'

interface CreateProductFormProps {
  onSubmitCallback?: () => void
}

export const CreateProductForm: React.VFC<CreateProductFormProps> = ({
  onSubmitCallback,
}) => {
  const [image, setImage] = useState<File>()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<ProductCreationData>()

  const onSubmit = () => {
    if (onSubmitCallback) {
      onSubmitCallback()
    }
  }

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl id="name" isInvalid={errors.name && touchedFields.name}>
            <FormLabel>Название</FormLabel>
            <Input
              id="name"
              {...register('name', {
                minLength: {
                  value: 4,
                  message: 'Название должно содержать минимум 4 символа',
                },
                maxLength: {
                  value: 56,
                  message: 'Название должно содержать максимум 56 символов',
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
            <FormLabel>Описание товара</FormLabel>
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

          <FormLabel>Изображение товара</FormLabel>
          <Controller
            render={({ field: { onChange } }) => (
              <FileUpload
                maxFiles={2}
                accept="image/*"
                maxSize={12582912}
                onDrop={(acceptedFiles) => {
                  setImage(acceptedFiles[0])
                  onChange(acceptedFiles[0])
                }}
              />
            )}
            control={control}
            name="image"
          />

          <Text>{image?.name}</Text>

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
        </Stack>
      </form>
    </Box>
  )
}
