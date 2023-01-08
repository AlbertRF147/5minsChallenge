import './App.css'
import { Center, Container, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { getMoviesByTerm, getPopularMovies, getConfiguration } from './api'
import { useQuery } from 'react-query'
import MovieCard from './components/MovieCard'
import MovieCardSkeletons from './components/MovieCardSkeletons'
import { MdClear } from 'react-icons/md'
import DetailsWindow from './components/DetailsWindow'
import Pager from './components/Pager'
import NavBar from './components/NavBar'

const TOTAL_NUM_PAGES = 10 // TODO: get the max limit from api

function App() {
  const [inputSearch, setInputSearch] = useState('')
  const [search, setSearch] = useState('')
  const [detailsWindowIsOpen, setDetailsWindowIsOpen] = useState(false)
  const [movieDetails, setMovieDetails] = useState(null)
  const [movies, setMovies] = useState(null)
  const [page, setPage] = useState(1)

  const moviesQuery = useQuery(['movies', page], () => getPopularMovies(page), {
    onSuccess: (movies) => {
      setMovies(movies)
    },
    enabled: !search,
    keepPreviousData: true
  })

  const searchedMoviesQuery = useQuery(
    ['searchedMovies', search, page],
    () => getMoviesByTerm(search, page),
    {
      onSuccess: (movies) => {
        setMovies(movies)
      },
      enabled: Boolean(search)
    }
  )

  const configQuery = useQuery('configuration', getConfiguration)

  const handleOnInputChange = (event) => {
    const { target } = event
    const inputVal = target.value
    setInputSearch(inputVal)
  }

  const handleOnInputEnter = (event) => {
    const {
      target: { value: inputVal },
      keyCode
    } = event
    const isEnterKey = keyCode === 13
    if (isEnterKey) setSearch(inputVal)
  }

  const handleOnClear = () => {
    setInputSearch('')
    setSearch('')
  }

  const handleOnCardClick = (movie) => {
    setMovieDetails(movie)
    handleOnDetailsWindowOpen(true)
  }

  const handleOnDetailsWindowOpen = (isOpen) => {
    setDetailsWindowIsOpen(isOpen)
  }

  const moviesLoading = moviesQuery.isLoading || searchedMoviesQuery.isLoading
  const moviesErrored = moviesQuery.isError || searchedMoviesQuery.isError

  return (
    <div className="App">
      <NavBar />
      <Container as="main" maxW="800px" minH="100vh" p={{ base: '1rem', md: '2rem 1rem' }}>
        <InputGroup>
          <Input
            placeholder="Search movie titles"
            onChange={handleOnInputChange}
            onKeyUp={handleOnInputEnter}
            value={inputSearch}
          />
          <InputRightElement as="button" children={<MdClear onClick={handleOnClear} />} />
        </InputGroup>

        {/* Movie card skeletons */}
        {moviesLoading && <MovieCardSkeletons noOfSkeletons={6}></MovieCardSkeletons>}

        {/* No movies */}
        {(!movies || !movies.length || moviesErrored) && (
          <Center minH="400px">
            <Text>There was an error when trying to fetch the movies.</Text>
          </Center>
        )}

        {/* Movie cards */}
        {movies &&
          movies.map((movie) => (
            <MovieCard
              key={`movie-${movie.id}`}
              {...movie}
              config={configQuery.data}
              handleOnCardClick={() => handleOnCardClick(movie)}
            />
          ))}

        <Pager numOfPages={TOTAL_NUM_PAGES} setPage={setPage} page={page} />
      </Container>

      {/* Movie card details modal */}
      {movieDetails && (
        <DetailsWindow
          isOpen={detailsWindowIsOpen}
          handleOnClose={() => handleOnDetailsWindowOpen(false)}
          movie={movieDetails}
          config={configQuery.data}
        />
      )}
    </div>
  )
}

export default App
