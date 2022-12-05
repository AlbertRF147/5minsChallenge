import './App.css'
import {
  Container,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react'
import api from './api'
import { useQuery } from 'react-query'
import MovieCard from './components/MovieCard'
import MovieCardSkeletons from './components/MovieCardSkeletons'
import { MdClear } from 'react-icons/md'
import popularMovies from '../data/popularMovies'
import configuration from '../data/configuration'
import SideWindow from './components/SideWindow'

function App() {
  const [search, setSearch] = useState('')
  const [sideWindowIsOpen, setSideWindowIsOpen] = useState(false)
  const [movieDetails, setMovieDetails] = useState(null)

  const {
    data: movies,
    isLoading: isLoadingMovies,
    isError: isErrorMovies,
    isSuccess: isSuccessMovies,
  } = useQuery('movies', api.getPopularMovies, {
    initialData: popularMovies,
  })

  const {
    data: searchedMovies,
    isLoading: isLoadingSearchedMovies,
    isError: isErrorSearchedMovies,
    isSuccess: isSuccessSearchedMovies,
  } = useQuery(['searchedMovies', search], () => api.getMoviesByTerm(search), {
    enabled: Boolean(search),
  })

  const {
    data: config,
    isSuccess: isSuccessConfig,
    isError: isErrorConfig,
    isLoading: isLoadingConfiguration,
  } = useQuery('configuration', api.getConfiguration, {
    initialData: configuration,
    cacheTime: 60 * 60 * 24 * 2, // days
  })

  const handleOnKeyDown = (event) => {
    // Need to change to work with enter key press
    // Add a blur action on esc key press
    const { target } = event
    const inputVal = target.value
    setSearch(inputVal)
  }

  const handleOnClear = () => {
    setSearch('')
  }

  const handleOnCardClick = (movie) => {
    setMovieDetails(movie)
    handleOnSideWindowOpen(true)
  }

  const handleOnSideWindowOpen = (isOpen) => {
    setSideWindowIsOpen(isOpen)
  }

  return (
    <div className='App'>
      <Container maxW='800px' minH='100vh'>
        <InputGroup>
          <Input
            placeholder='Search movie titles'
            onKeyDown={handleOnKeyDown}
            value={search}
          />
          <InputRightElement children={<MdClear onClick={handleOnClear} />} />
        </InputGroup>
        {!search &&
          isSuccessMovies &&
          movies.results.map((movie) => (
            <MovieCard
              key={`movie-${movie.id}`}
              {...movie}
              config={config}
              handleOnCardClick={() => handleOnCardClick(movie)}
            />
          ))}
        {search && isSuccessSearchedMovies ? (
          searchedMovies.results.map((movie) => (
            <MovieCard
              key={`movie-${movie.id}`}
              {...movie}
              config={config}
              handleOnCardClick={() => handleOnCardClick(movie)}
            />
          ))
        ) : (
          <MovieCardSkeletons noOfSkeletons={6}></MovieCardSkeletons>
        )}
      </Container>
      {movieDetails && (
        <SideWindow
          isOpen={sideWindowIsOpen}
          handleOnClose={() => handleOnSideWindowOpen(false)}
          movie={movieDetails}
        />
      )}
    </div>
  )
}

export default App
