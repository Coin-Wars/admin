import React from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
} from '@chakra-ui/react'
import { InitialUserInfoForm } from 'components/forms/InitialUserInfoForm'

interface InitialUserInfoModalProps {
  isOpen: ReturnType<typeof useDisclosure>['isOpen']
  onClose: ReturnType<typeof useDisclosure>['onClose']
}

export const InitialUserInfoModal: React.VFC<InitialUserInfoModalProps> = ({
  isOpen,
  onClose,
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Расскажите о себе</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <InitialUserInfoForm submitCallback={onClose} />
      </ModalBody>
    </ModalContent>
  </Modal>
)
