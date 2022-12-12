import './App.css'
import { Center, Container, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useState } from 'react'
import api from './api'
import { useQuery } from 'react-query'
import MovieCard from './components/MovieCard'
import MovieCardSkeletons from './components/MovieCardSkeletons'
import { MdClear } from 'react-icons/md'
import DetailsWindow from './components/DetailsWindow'

function App() {
  const [inputSearch, setInputSearch] = useState('')
  const [search, setSearch] = useState('')
  const [detailsWindowIsOpen, setDetailsWindowIsOpen] = useState(false)
  const [movieDetails, setMovieDetails] = useState(null)
  const [movies, setMovies] = useState(null)

  const moviesQuery = useQuery('movies', api.getPopularMovies, {
    onSuccess: (movies) => {
      setMovies(movies)
    },
    enabled: !search
  })

  const searchedMoviesQuery = useQuery(
    ['searchedMovies', search],
    () => api.getMoviesByTerm(search),
    {
      onSuccess: (movies) => {
        setMovies(movies)
      },
      enabled: Boolean(search)
    }
  )

  const configQuery = useQuery('configuration', api.getConfiguration)

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

  return (
    <div className="App">
      <Container maxW="800px" minH="100vh">
        <InputGroup>
          <Input
            placeholder="Search movie titles"
            onChange={handleOnInputChange}
            onKeyUp={handleOnInputEnter}
            value={inputSearch}
          />
          <InputRightElement children={<MdClear onClick={handleOnClear} />} />
        </InputGroup>
        {(moviesQuery.isLoading || searchedMoviesQuery.isLoading) && (
          <MovieCardSkeletons noOfSkeletons={6}></MovieCardSkeletons>
        )}
        {(!movies || moviesQuery.isError || searchedMoviesQuery.isError) && (
          <Center minH="400px" centerContent alignContent>
            <Text>There was an error when trying to fetch the movies.</Text>
          </Center>
        )}
        {movies &&
          movies.map((movie) => (
            <MovieCard
              key={`movie-${movie.id}`}
              {...movie}
              config={configQuery.data}
              handleOnCardClick={() => handleOnCardClick(movie)}
            />
          ))}
      </Container>
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
