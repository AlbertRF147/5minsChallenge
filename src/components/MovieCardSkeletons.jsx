import React from 'react'
import { Skeleton } from '@chakra-ui/react'

function MovieCardSkeletons({ noOfSkeletons }) {
  return Array(noOfSkeletons)
    .fill()
    .map((_, index) => (
      <Skeleton key={`skeleton-${index}`} h={{ base: '90px', md: '200px' }} m="10px 0"></Skeleton>
    ))
}

export default MovieCardSkeletons
