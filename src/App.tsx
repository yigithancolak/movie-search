import { ThemeProvider } from '@emotion/react'
import {
  CssBaseline,
  Unstable_Grid2 as Grid,
  Pagination,
  Typography
} from '@mui/material'
import { useContext, useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { MoviesResultsData, searchMovies } from './api/apiRequests'
import { MovieCard } from './components/MovieCard'
import { MovieSearch } from './components/MovieSearch'
import { MoviesContext } from './store/contexts/MoviesContext'
import { theme } from './styles/theme'

export const App = () => {
  const {
    state: { searchedTerm }
  } = useContext(MoviesContext)
  const [selectedPage, setSelectedPage] = useState(1)

  const { isFetching, data: responseData } = useQuery({
    queryKey: ['getMovies', searchedTerm, selectedPage],
    queryFn: () => searchMovies(searchedTerm, selectedPage),
    enabled: searchedTerm !== '',
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
          <MovieSearch isFetching={isFetching} />
        </Grid>

        {/* PAGINATION */}
        {responseData?.results && (
          <Grid
            xs={12}
            display='flex'
            alignItems='center'
            flexDirection='column'
          >
            <Pagination
              count={responseData?.total_pages}
              page={selectedPage}
              onChange={(_, page) => setSelectedPage(page)}
              shape='rounded'
              data-cy='pagination'
            />
            <Typography
              borderTop={2}
              borderColor='lightgrey'
              marginTop={2}
              width='90%'
              display='block'
              data-cy='results-count'
            >
              {responseData?.total_results
                ? `${responseData?.total_results} results found`
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
          {responseData?.results.map((movie: MoviesResultsData) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              imgPath={movie.poster_path}
              voteAverage={movie.vote_average / 2}
            />
          ))}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
