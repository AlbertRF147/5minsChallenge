import { useBreakpointValue } from '@chakra-ui/react'

function useMovieImage({ images, posterPath }) {
  // base size 92x100
  // md size 154x231

  const imagePaths = {
    card: {
      normal: {
        base: `${images?.base_url}${images?.poster_sizes[0]}${posterPath}`,
        md: `${images?.base_url}${images?.poster_sizes[1]}${posterPath}`
      },
      fallback: {
        base: 'https://via.placeholder.com/92x136?text=Not+found',
        md: 'https://via.placeholder.com/154x231?text=Not+found'
      }
    },
    details: {
      normal: {
        base: `${images?.base_url}${images?.poster_sizes[2]}${posterPath}`,
        md: `${images?.base_url}${images?.poster_sizes[3]}${posterPath}`
      },
      fallback: {
        base: 'https://via.placeholder.com/185?text=Not+found',
        md: 'https://via.placeholder.com/282x423?text=Not+found'
      }
    }
  }

  const cardImage = useBreakpointValue(
    posterPath ? { ...imagePaths.card.normal } : { ...imagePaths.card.fallback }
  )

  const detailsImage = useBreakpointValue(
    posterPath ? { ...imagePaths.details.normal } : { ...imagePaths.details.fallback }
  )

  return { cardImage, detailsImage }
}

export default useMovieImage
