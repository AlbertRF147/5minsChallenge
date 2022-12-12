const API_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_API_KEY

const getData = async (url) => {
  try {
    const res = await window.fetch(url)
    const data = await res.json()
    return data
  } catch (error) {
    throw new Error('Error fecthing movies by term')
  }
}

export default {
  getMoviesByTerm: async (term) => {
    const url = `${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${term}&page=1&include_adult=false`
    return await getData(url).then((data) => data.results)
  },
  getPopularMovies: async () => {
    const url = `${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    return await getData(url).then((data) => data.results)
  },
  getConfiguration: async () => {
    const url = `${API_URL}/configuration?api_key=${API_KEY}`
    return await getData(url)
  }
}
