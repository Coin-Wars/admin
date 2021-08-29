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
  Switch,
  Flex,
  Table,
  Tbody,
  Thead,
  TableCaption,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { ProductCreationData } from 'services/models'
import { FileUpload } from 'components/common/FileUpload'
import { useProducts } from 'hooks/useProducts'

interface CreateProductFormProps {
  onSubmitCallback?: () => void
}

export const CreateProductForm: React.VFC<CreateProductFormProps> = ({
  onSubmitCallback,
}) => {
  const [images, setImages] = useState<File[]>([])
  const { createProduct } = useProducts()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<ProductCreationData>()

  const onSubmit = async (data: ProductCreationData) => {
    await createProduct(data)

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

          <FormControl
            id="price"
            isInvalid={errors.price && touchedFields.price}
          >
            <FormLabel>Цена</FormLabel>
            <Input type="number" id="price" {...register('price')} />
            <FormErrorMessage>
              {errors.price && errors.price.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            id="is_shipping_required"
            isInvalid={
              errors.is_shipping_required && touchedFields.is_shipping_required
            }
          >
            <Flex alignItems="center">
              <Switch
                id="is_shipping_required"
                {...register('is_shipping_required')}
              />
              <FormLabel ml="2" mb={0}>
                Обязательна ли доставка
              </FormLabel>
            </Flex>
            <FormErrorMessage>
              {errors.is_shipping_required &&
                errors.is_shipping_required.message}
            </FormErrorMessage>
          </FormControl>

          <Table variant="simple">
            <TableCaption>
              <Button>Добавить опцию</Button>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Свойство</Th>
                <Th>Значение</Th>
              </Tr>
            </Thead>
            <Tbody></Tbody>
          </Table>

          <FormLabel>Изображения товара</FormLabel>
          <Controller
            render={({ field: { onChange } }) => (
              <FileUpload
                maxFiles={2}
                accept="image/*"
                maxSize={12582912}
                onDrop={(acceptedFiles) => {
                  setImages((files) => [...files, ...acceptedFiles])
                  onChange(acceptedFiles)
                }}
              />
            )}
            control={control}
            name="images"
          />

          {images.map((image) => (
            <Text key={image.name}>{image.name}</Text>
          ))}

          <Button
            colorScheme="blue"
            mr={3}
            mt={4}
            w="100%"
            isLoading={isSubmitting}
            type="submit"
          >
            Добавить
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
