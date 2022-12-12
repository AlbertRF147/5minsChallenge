import React from 'react'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { MdBrokenImage } from 'react-icons/md'

const CardImage = ({ images, posterPath, title }) => {
  const fallbackImage = useBreakpointValue({
    base: 'https://via.placeholder.com/92?text=Not+found',
    md: 'https://via.placeholder.com/154?text=Not+found',
  })

  return images ? (
    <Image
      objectFit='cover'
      src={`${images.base_url}${images.poster_sizes[1]}${posterPath}`}
      srcSet={`${images.base_url}${images.poster_sizes[0]}${posterPath} 92w, ${images.base_url}${images.poster_sizes[1]}${posterPath} 154w`}
      alt={title}
      sizes='(max-width: 400px) 92px, 154px'
      fallbackSrc={fallbackImage}
    />
  ) : (
    <Image
      objectFit='cover'
      src={fallbackImage}
      alt='Image not found'
      sizes='(max-width: 400px) 92px, 154px'
    />
  )
}

function MovieCard(props) {
  const {
    title,
    overview,
    poster_path: posterPath,
    config = {},
    handleOnCardClick,
  } = props

  return (
    <Card
      direction='row'
      overflow='hidden'
      variant='outline'
      maxH={{ base: '100px', md: '200px' }}
      minH={{ base: '100px', md: '200px' }}
      maxW={{ lg: '800px' }}
      m={{ base: '10px 0' }}
      onClick={handleOnCardClick}
    >
      <CardImage images={config.images} posterPath={posterPath} title={title} />
      <Stack>
        <CardBody p={{ base: '12px', md: '12px' }} textAlign='left'>
          <Heading size={{ base: 'xs', md: 'md' }} noOfLines={1}>
            {title}
          </Heading>
          <Text
            fontSize={{ base: 'xs', md: 'md' }}
            py={{ base: '1', md: '2' }}
            noOfLines={[3, 4]}
            maxHeight={{ base: '60px', md: '100px' }}
          >
            {overview}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  )
}

export default MovieCard
