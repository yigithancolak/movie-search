import { ThemeProvider } from '@emotion/react'
import {
  CssBaseline,
  Unstable_Grid2 as Grid,
  Pagination,
  Typography
} from '@mui/material'
import { FormEvent, useEffect, useState } from 'react'

import { MoviesResultsData, searchMovies } from './api/apiRequests'
import { MovieCard } from './components/MovieCard'
import { MovieSearch } from './components/MovieSearch'
import { MovieContextProvider } from './store/contexts/MoviesContext'
import { theme } from './styles/theme'

export const App = () => {
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState<MoviesResultsData[]>([])
  const [selectedPage, setSelectedPage] = useState(1)
  const [searchedName, setSearchedName] = useState('')
  const [maxPageNumber, setMaxPageNumber] = useState(0)
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    searchMovies(searchedName, selectedPage)
      .then((data) => {
        setMaxPageNumber(data.total_pages)
        setTotalResults(data.total_results)
        setMovies(data.results)
      })
      .catch((err) => console.log(err))
      .finally(() => setSearchLoading(false))
  }, [selectedPage, searchedName])

  const handleMovieSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm === '') return

    setSearchLoading(true)
    setSearchedName(searchTerm)
    setSelectedPage(1)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieContextProvider>
        {/* SEARCH FIELD */}
        <Grid
          container
          paddingTop={10}
          display='flex'
          alignItems='center'
          flexDirection='column'
          spacing={2}
        >
          <Grid xs={8} md={3}>
            <MovieSearch
              searchLoading={searchLoading}
              searchTerm={searchTerm}
              handleMovieSearch={handleMovieSearch}
              setSearchTerm={setSearchTerm}
            />
          </Grid>

          {/* PAGINATION */}
          {searchedName && (
            <Grid
              xs={12}
              display='flex'
              alignItems='center'
              flexDirection='column'
            >
              <Pagination
                count={maxPageNumber}
                page={selectedPage}
                onChange={(_, page) => setSelectedPage(page)}
                shape='rounded'
              />
              <Typography
                borderTop={2}
                borderColor='lightgrey'
                marginTop={2}
                width='90%'
                display='block'
              >
                {totalResults > 0
                  ? `${totalResults} results found`
                  : 'No matching results found'}
              </Typography>
            </Grid>
          )}

          {/* SEARCH RESULTS */}
          <Grid
            xs={12}
            md={10}
            display='flex'
            flexWrap='wrap'
            justifyContent='center'
          >
            {movies &&
              movies.map((movie: MoviesResultsData) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  imgPath={movie.poster_path}
                  voteAverage={movie.vote_average}
                />
              ))}
          </Grid>
        </Grid>
      </MovieContextProvider>
    </ThemeProvider>
  )
}
