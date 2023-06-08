import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState
} from 'react'
import { VoteProps } from '../../components/VotingBox'
import {
  getVotedMoviesStorage,
  setVotedMoviesStorage
} from '../../utils/helpers/localStorage'

interface MapContextProps {
  votedMovies: VoteProps[]
  setVotedMovies: Dispatch<SetStateAction<VoteProps[]>>
  handleMovieVote: (id: number, vote: number) => void
}

export const MoviesContext = createContext<MapContextProps>({
  votedMovies: [],
  setVotedMovies: () => null,
  handleMovieVote: () => null
})

export const MovieContextProvider = (props: PropsWithChildren) => {
  const [votedMovies, setVotedMovies] = useState<VoteProps[]>(
    getVotedMoviesStorage()
  )

  const handleMovieVote = (id: number, vote: number) => {
    const newVotedMovie = { id, vote }
    setVotedMovies([...votedMovies, newVotedMovie])
    setVotedMoviesStorage([...votedMovies, newVotedMovie])
  }

  return (
    <MoviesContext.Provider
      value={{
        votedMovies,
        setVotedMovies,
        handleMovieVote
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  )
}
