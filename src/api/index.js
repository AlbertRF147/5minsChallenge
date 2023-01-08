const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_API_KEY

const getData = async (url) => {
  try {
    const res = await window.fetch(url)
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error('Error fetching')
  }
}

const getMoviesByTerm = async (term, page) => {
  const url = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${term}&page=${page}&include_adult=false`
  return await getData(url).then((data) => data.results)
}
const getPopularMovies = async (page) => {
  const url = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  return await getData(url).then((data) => data.results)
}
const getConfiguration = async () => {
  const url = `${API_URL}/configuration?api_key=${API_KEY}`
  return await getData(url)
}

export { getMoviesByTerm, getPopularMovies, getConfiguration }
