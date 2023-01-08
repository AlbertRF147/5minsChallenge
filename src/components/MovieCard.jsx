import React from 'react'
import { Card, CardBody, Heading, Image, Stack, Text, useBreakpointValue } from '@chakra-ui/react'
import useMovieImage from '../hooks/useMovieImage'

const CardImage = ({ images, posterPath, title }) => {
  const { cardImage } = useMovieImage({ images, posterPath })
  return cardImage && <Image objectFit="cover" src={cardImage} alt={title} />
}

function MovieCard(props) {
  const { title, overview, poster_path: posterPath, config = {}, handleOnCardClick } = props

  return (
    <Card
      as="button"
      direction="row"
      overflow="hidden"
      variant="outline"
      maxH={{ base: '100px', md: '231px' }}
      minH={{ base: '100px', md: '231px' }}
      maxW={{ lg: '800px' }}
      minW="100%"
      m={{ base: '10px 0' }}
      onClick={handleOnCardClick}>
      <CardImage images={config.images} posterPath={posterPath} title={title} />

      <Stack>
        <CardBody p={{ base: '12px', md: '24px' }} textAlign="left">
          <Heading size={{ base: 'xs', md: 'md' }} noOfLines={1}>
            {title}
          </Heading>
          <Text
            fontSize={{ base: 'xs', md: 'md' }}
            py={{ base: '1', md: '2' }}
            noOfLines={[3, 6]}
            maxHeight={{ base: '60px', md: '150px' }}>
            {overview}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  )
}

export default MovieCard
