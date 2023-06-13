import { SearchOutlined } from '@mui/icons-material'
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { FormEvent, useContext, useState } from 'react'
import { MoviesContext } from '../store/contexts/MoviesContext'
import { ActionTypes } from '../store/reducer/actions'

export const MovieSearch = (props: { isFetching: boolean }) => {
  const { isFetching } = props
  const { dispatch } = useContext(MoviesContext)
  const [searchTerm, setSearchTerm] = useState('')

  const handleMovieSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (searchTerm === '') {
      return
    }

    dispatch({ type: ActionTypes.SET_SEARCHED_TERM, payload: searchTerm })
  }

  return (
    <form onSubmit={handleMovieSearch}>
      <TextField
        fullWidth
        label='Search Movie'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        data-cy='form-input'
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {!isFetching ? (
                <IconButton
                  data-cy='form-submit'
                  aria-label='search'
                  disabled={isFetching}
                  type='submit'
                >
                  <SearchOutlined />
                </IconButton>
              ) : (
                <CircularProgress size={30} data-cy='search-progress' />
              )}
            </InputAdornment>
          )
        }}
        variant='outlined'
      />
    </form>
  )
}
