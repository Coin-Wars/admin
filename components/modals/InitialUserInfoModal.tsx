import React, { useEffect } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { UserInfoForm } from 'components/forms/UserInfoForm'

interface InitialUserInfoModalProps {
  isOpen: ReturnType<typeof useDisclosure>['isOpen']
  onClose: ReturnType<typeof useDisclosure>['onClose']
}

export const InitialUserInfoModal: React.VFC<InitialUserInfoModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    localStorage.setItem('user_info_filled', '1')
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Расскажите о себе</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <UserInfoForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
