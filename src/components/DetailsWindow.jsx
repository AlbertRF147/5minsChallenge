import {
  Button,
  Container,
  Heading,
  Text,
  useBreakpointValue,
  Image,
  SimpleGrid,
  Box
} from '@chakra-ui/react'
import React from 'react'
import { MdClose } from 'react-icons/md'
import useMovieImage from '../hooks/useMovieImage'
import './DetailsWindow.css'

function DetailsWindow({ isOpen, handleOnClose, movie, config = {} }) {
  const DetailsImage = ({ images, posterPath }) => {
    const { detailsImage } = useMovieImage({
      images,
      posterPath
    })
    return <Image objectFit="cover" src={detailsImage} alt={movie.title} />
  }

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }} className="side-window">
      <Button
        variant="unstyled"
        top={0}
        right={0}
        position="absolute"
        zIndex={10002}
        display="flex"
        m="10px"
        onClick={handleOnClose}>
        <MdClose />
      </Button>
      <Container minH="100%" padding={{ base: '20px 0', md: '40px 0' }}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing="40px">
          <Box>
            <DetailsImage {...config} posterPath={movie?.poster_path} m="auto" />
          </Box>
          <Box>
            <Heading size={{ base: 'md', md: 'lg' }}>{movie?.title}</Heading>
            <Text py={4} textAlign="left">
              {movie?.overview}
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </div>
  )
}

export default DetailsWindow
