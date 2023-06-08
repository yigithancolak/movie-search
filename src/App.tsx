import { ThemeProvider } from '@emotion/react'
import { SearchOutlined } from '@mui/icons-material'
import {
  CssBaseline,
  Unstable_Grid2 as Grid,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { FormEvent, useState } from 'react'

import { searchMovies } from './api/apiRequests'
import { MovieCard } from './components/MovieCard'
import { MovieContextProvider } from './store/contexts/MoviesContext'
import { theme } from './styles/theme'

export const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState<any>([])
  // console.log(fetchSearchApi('new', '2'))

  const handleMovieSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm === '') return

    searchMovies(searchTerm, '1').then((data) => setMovies(data.results))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieContextProvider>
        <Grid
          container
          paddingTop={10}
          display='flex'
          alignItems='center'
          flexDirection='column'
          spacing={2}
        >
          <Grid xs={8} md={3}>
            <form onSubmit={handleMovieSearch}>
              <TextField
                fullWidth
                label='Search Movie'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton aria-label='delete'>
                        <SearchOutlined />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                variant='outlined'
              />
            </form>
          </Grid>
          <Grid
            xs={10}
            md={10}
            display='flex'
            flexWrap='wrap'
            justifyContent='center'
          >
            {movies &&
              movies.map((movie: any) => (
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
