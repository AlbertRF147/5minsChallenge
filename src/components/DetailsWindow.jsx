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
import './DetailsWindow.css'

function DetailsWindow({ isOpen, handleOnClose, movie, config = {} }) {
  const DetailsImage = (props) => {
    const { images, posterPath, title } = props
    const fallbackImage = useBreakpointValue({
      base: 'https://via.placeholder.com/185?text=Not+found',
      md: 'https://via.placeholder.com/342?text=Not+found'
    })

    const posterImage = useBreakpointValue({
      base: `${images.base_url}${images.poster_sizes[2]}${posterPath}`,
      md: `${images.base_url}${images.poster_sizes[3]}${posterPath}`
    })

    return images ? (
      <Image
        objectFit="cover"
        src={posterImage}
        alt={title}
        fallbackSrc={fallbackImage}
        {...props}
      />
    ) : (
      <Image
        objectFit="cover"
        src={fallbackImage}
        alt="Image not found"
        sizes="(max-width: 400px) 92px, 154px"
        {...props}
      />
    )
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
            <DetailsImage {...config} posterPath={movie.poster_path} m="auto" />
          </Box>
          <Box>
            <Heading size={{ base: 'md', md: 'lg' }}>{movie.title}</Heading>
            <Text py={4} textAlign="left">
              {movie.overview}
            </Text>
          </Box>
        </SimpleGrid>
      </Container>
    </div>
  )
}

export default DetailsWindow
