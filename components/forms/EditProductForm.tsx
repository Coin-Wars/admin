import React, { useState, useEffect, useMemo } from 'react'
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
  CloseButton,
  HStack,
  Select,
} from '@chakra-ui/react'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import { Product, ProductImage, ProductUpdateData } from 'services/models'
import { FileUpload } from 'components/common/FileUpload'
import { useProducts } from 'hooks/useProducts'
import { EditProductImage } from 'components/product/EditProductImage'
import { EntityId } from '@reduxjs/toolkit'
import { currencies } from 'currency-formatter'

interface EditProductFormProps {
  onSubmitCallback?: () => void
  product: Product
}

export const EditProductForm: React.VFC<EditProductFormProps> = ({
  onSubmitCallback,
  product,
}) => {
  const [images, setImages] = useState<File[]>([])
  const [uploadedImages, setUploadedImages] = useState<ProductImage[]>([])

  const {
    updateProduct,
    getProducts,
    deleteProductImage,
    deleteProductOption,
  } = useProducts()
  const { refetch: refetchProducts } = getProducts()

  const defaultValues = {
    options: product.options,
    name: product.name,
    description: product.description,
    price: product.price,
    price_currency: product.price_currency,
    is_shipping_required: product.is_shipping_required,
  } as ProductUpdateData

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<ProductUpdateData>({ defaultValues })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'options',
  })

  useEffect(() => {
    setUploadedImages(product.images)
  }, [product])

  const onImageDelete = async (imageId: EntityId) => {
    await deleteProductImage.mutateAsync({ imageId, productId: product.id })
    setUploadedImages((images) =>
      images.filter((image) => image.id !== imageId)
    )
  }

  const onOptionDelete = async (optionId: EntityId) => {
    await deleteProductOption.mutateAsync({ optionId, productId: product.id })
  }

  const onSubmit = async (data: ProductUpdateData) => {
    await updateProduct.mutateAsync({ ...data, id: product.id })
    await refetchProducts()

    if (onSubmitCallback) {
      onSubmitCallback()
    }
  }

  const currencyCodes = useMemo(
    () => currencies.map((currency) => currency.code),
    []
  )

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl id="name" isInvalid={errors.name && touchedFields.name}>
            <FormLabel>Название</FormLabel>
            <Input
              id="name"
              {...register('name', {
                required: 'Название обязательно',
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

          <Flex>
            <FormControl
              id="price"
              isInvalid={errors.price && touchedFields.price}
            >
              <FormLabel>Цена</FormLabel>
              <Input type="number" id="price" {...register('price')} />
            </FormControl>
            <FormControl
              w="150px"
              id="price_currency"
              ml={3}
              isInvalid={errors.price_currency && touchedFields.price_currency}
            >
              <FormLabel>Валюта</FormLabel>
              <Select
                type="number"
                id="price_currency"
                defaultValue="RUB"
                {...register('price_currency')}
              >
                {currencyCodes.map((code) => (
                  <option key={code}>{code}</option>
                ))}
              </Select>
            </FormControl>
          </Flex>

          <FormErrorMessage>
            {errors.price && errors.price.message}
          </FormErrorMessage>
          <FormErrorMessage>
            {errors.price_currency && errors.price_currency.message}
          </FormErrorMessage>

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

          <Table size="sm">
            <TableCaption>
              <Button onClick={() => append({ key: '', value: '' })}>
                Добавить свойство
              </Button>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Свойство</Th>
                <Th>Значение</Th>
              </Tr>
            </Thead>
            <Tbody>
              {fields.map((item, index) => (
                <Tr key={item.id}>
                  <Td>
                    <Input
                      {...register(`options.${index}.key` as const, {
                        required: 'Свойство обязательно',
                      })}
                    />
                  </Td>
                  <Td>
                    <Flex justifyContent="space-between">
                      <Box w="100%">
                        <Input
                          {...register(`options.${index}.value` as const, {
                            required: 'Свойство обязательно',
                          })}
                        />
                      </Box>
                      <CloseButton
                        onClick={() => {
                          remove(index)
                          onOptionDelete(item.id)
                        }}
                        size="sm"
                        my="auto"
                        ml="1"
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          <HStack spacing="10px">
            {uploadedImages.map((image) => (
              <Box
                key={image.id}
                w="100px"
                h="100px"
                overflow="hidden"
                borderRadius="lg"
              >
                <EditProductImage image={image} onDelete={onImageDelete} />
              </Box>
            ))}
          </HStack>

          <FormLabel>Добавить изображения</FormLabel>
          <Controller
            render={({ field: { onChange } }) => (
              <FileUpload
                maxFiles={2}
                accept="image/*"
                maxSize={12582912}
                onDrop={(acceptedFiles) => {
                  setImages((files) => [...files, ...acceptedFiles])
                  onChange([...images, ...acceptedFiles])
                }}
              />
            )}
            defaultValue={[]}
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
            Сохранить
          </Button>
        </Stack>
      </form>
    </Box>
  )
}
