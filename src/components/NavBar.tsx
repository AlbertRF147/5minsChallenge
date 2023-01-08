import { Box } from '@chakra-ui/layout'
import { Heading } from '@chakra-ui/react'
import React from 'react'

function NavBar() {
  return (
    <Box as="header" w="100%" h="40px" bg="tomato" display="flex" alignItems="center" p="25px 20px">
      <Heading as="h4" size="lg" color="white">
        Movies App
      </Heading>
    </Box>
  )
}

export default NavBar
