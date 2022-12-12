import React from 'react'
import { Card, CardBody, Heading, Image, Stack, Text, useBreakpointValue } from '@chakra-ui/react'

const CardImage = ({ images, posterPath, title }) => {
  const fallbackImage = useBreakpointValue({
    base: 'https://via.placeholder.com/92x136?text=Not+found',
    md: 'https://via.placeholder.com/154x231?text=Not+found'
  })

  const image = useBreakpointValue({
    base: `${images?.base_url}${images?.poster_sizes[0]}${posterPath}`,
    md: `${images?.base_url}${images?.poster_sizes[1]}${posterPath}`
  })

  return images ? (
    <Image objectFit="cover" src={image} alt={title} fallbackSrc={fallbackImage} />
  ) : (
    <Image
      objectFit="cover"
      src={fallbackImage}
      alt="Image not found"
      sizes="(max-width: 400px) 92px, 154px"
    />
  )
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
