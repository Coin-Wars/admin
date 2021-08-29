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
import { CreateProductForm } from 'components/forms/CreateProductForm'

interface CreateProductModalProps {
  isOpen: boolean
  onClose: ReturnType<typeof useDisclosure>['onClose']
}

export const CreateProductModal: React.VFC<CreateProductModalProps> = ({
  isOpen,
  onClose,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Добавить товар</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <CreateProductForm onSubmitCallback={onClose} />
      </ModalBody>
    </ModalContent>
  </Modal>
)
