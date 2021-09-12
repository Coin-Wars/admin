import React from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import { EditProductForm } from 'components/forms/EditProductForm'
import { Product } from 'services/models'

interface EditProductModalProps {
  isOpen: boolean
  onClose: ReturnType<typeof useDisclosure>['onClose']
  product: Product
}

export const EditProductModal: React.VFC<EditProductModalProps> = ({
  isOpen,
  onClose,
  product,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Изменить товар</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <EditProductForm product={product} onSubmitCallback={onClose} />
      </ModalBody>
    </ModalContent>
  </Modal>
)
