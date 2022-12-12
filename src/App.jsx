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
import SideWindow from './components/SideWindow'

function App() {
  const [inputSearch, setInputSearch] = useState('')
  const [search, setSearch] = useState('')
  const [sideWindowIsOpen, setSideWindowIsOpen] = useState(false)
  const [movieDetails, setMovieDetails] = useState(null)
  const [movies, setMovies] = useState([])

  const moviesQuery = useQuery('movies', api.getPopularMovies, {
    onSuccess: (movies) => {
      setMovies(movies)
    },
    enabled: !search,
  })

  const searchedMoviesQuery = useQuery(
    ['searchedMovies', search],
    () => api.getMoviesByTerm(search),
    {
      onSuccess: (movies) => {
        setMovies(movies)
      },
      enabled: Boolean(search),
    }
  )

  const configQuery = useQuery('configuration', api.getConfiguration, {
    cacheTime: 60 * 60 * 24 * 2, // days
  })

  const handleOnInputChange = (event) => {
    const { target } = event
    const inputVal = target.value
    setInputSearch(inputVal)
  }

  const handleOnInputEnter = (event) => {
    const {
      target: { value: inputVal },
      keyCode,
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
            onChange={handleOnInputChange}
            onKeyUp={handleOnInputEnter}
            value={inputSearch}
          />
          <InputRightElement children={<MdClear onClick={handleOnClear} />} />
        </InputGroup>
        {(moviesQuery.isLoading || searchedMoviesQuery.isLoading) && (
          <MovieCardSkeletons noOfSkeletons={6}></MovieCardSkeletons>
        )}
        {(moviesQuery.isError || searchedMoviesQuery.isError) && (
          <div>There was an error when trying to fetch the movies.</div>
        )}
        {movies.map((movie) => (
          <MovieCard
            key={`movie-${movie.id}`}
            {...movie}
            config={configQuery.data}
            handleOnCardClick={() => handleOnCardClick(movie)}
          />
        ))}
      </Container>
      {movieDetails && (
        <SideWindow
          isOpen={sideWindowIsOpen}
          handleOnClose={() => handleOnSideWindowOpen(false)}
          movie={movieDetails}
          config={configQuery.data}
        />
      )}
    </div>
  )
}

export default App
