import { Dispatch, PropsWithChildren, createContext, useReducer } from 'react'
import { VoteProps } from '../../components/VotingBox'
import { getVotedMoviesStorage } from '../../utils/helpers/localStorage'
import { reducer } from '../reducer'
import { ActionTypes } from '../reducer/actions'

export interface InitialStateTypes {
  votedMovies: VoteProps[]
  searchedTerm: string
}

interface MovieContextProps {
  state: InitialStateTypes
  dispatch: Dispatch<{ type: ActionTypes; payload: any }>
}

export const initialState = {
  votedMovies: getVotedMoviesStorage(),
  searchedTerm: ''
}

export const MoviesContext = createContext<MovieContextProps>({
  state: initialState,
  dispatch: () => null
})

export const MovieContextProvider = (props: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <MoviesContext.Provider
      value={
        {
          state,
          dispatch
        } as MovieContextProps
      }
    >
      {props.children}
    </MoviesContext.Provider>
  )
}
