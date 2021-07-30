import React from 'react'
import { Box, FormControl, Input, Button, FormLabel } from '@chakra-ui/react'

export const UserInfoForm: React.VFC = () => {
  return (
    <Box w="100%">
      <form action="">
        <FormControl>
          <FormLabel>Имя</FormLabel>
          <Input placeholder="First name" />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Фамилия</FormLabel>
          <Input placeholder="Last name" />
        </FormControl>

        <Button colorScheme="blue" mr={3} mt={4} w="100%">
          Save
        </Button>
      </form>
    </Box>
  )
}
