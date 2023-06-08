import { SearchOutlined } from '@mui/icons-material'
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material'
import { Dispatch, FormEvent, SetStateAction } from 'react'

interface MovieSearchProps {
  searchLoading: boolean
  searchTerm: string
  handleMovieSearch: (e: FormEvent<HTMLFormElement>) => void
  setSearchTerm: Dispatch<SetStateAction<string>>
}

export const MovieSearch = (props: MovieSearchProps) => {
  const { searchLoading, searchTerm, handleMovieSearch, setSearchTerm } = props
  return (
    <form onSubmit={handleMovieSearch}>
      <TextField
        fullWidth
        label='Search Movie'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              {!searchLoading ? (
                <IconButton
                  aria-label='search'
                  disabled={searchLoading}
                  type='submit'
                >
                  <SearchOutlined />
                </IconButton>
              ) : (
                <CircularProgress size={30} />
              )}
            </InputAdornment>
          )
        }}
        variant='outlined'
      />
    </form>
  )
}
