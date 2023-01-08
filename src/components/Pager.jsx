import { Grid, GridItem, Link, Text, Container } from '@chakra-ui/react'
import React from 'react'

function Pager({ numOfPages, setPage, page }) {
  const handleOnPageChange = (numOfPage) => {
    setPage(numOfPage)
  }

  const handleOnPageSlide = (slide) => {
    const targetPage = page + slide
    const pageIsWithinBoundaries = targetPage <= numOfPages && targetPage >= 1
    if (pageIsWithinBoundaries) setPage(targetPage)
  }

  const gridItemStyleProps = {
    w: '100%',
    h: '10',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  return (
    <Container as="nav" border="1px solid" borderColor="chakra-border-color" borderRadius="6px">
      <Grid templateColumns={`repeat(${numOfPages + 2}, 1fr)`} gap={2}>
        <GridItem {...gridItemStyleProps}>
          <Link onClick={() => handleOnPageSlide(-1)}>{'<'}</Link>
        </GridItem>
        {Boolean(numOfPages) &&
          Array(numOfPages)
            .fill()
            .map((_, index) => {
              const numOfPage = index + 1
              const isSelected = page === numOfPage
              return (
                <GridItem key={`page-${numOfPage}`} {...gridItemStyleProps}>
                  <Link onClick={() => handleOnPageChange(numOfPage)}>
                    {isSelected ? <Text>{`[${numOfPage}]`}</Text> : <Text>{numOfPage}</Text>}
                  </Link>
                </GridItem>
              )
            })}
        <GridItem {...gridItemStyleProps}>
          <Link onClick={() => handleOnPageSlide(1)}>{'>'}</Link>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default Pager
