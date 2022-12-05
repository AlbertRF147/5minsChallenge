import { Button, Container, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { MdClose } from 'react-icons/md'
import './SideWindow.css'

function SideWindow({ isOpen, handleOnClose, movie }) {
  return (
    <div style={{ display: isOpen ? 'block' : 'none' }} className='side-window'>
      <Button variant='unstyled' float='right' onClick={handleOnClose}>
        <MdClose />
      </Button>
      <Container minH='100%' padding='80px 0'>
        <Heading size={{ base: 'md', md: 'lg' }}>{movie.title}</Heading>
        <Text py={4}>{movie.overview}</Text>
      </Container>
    </div>
  )
}

export default SideWindow
