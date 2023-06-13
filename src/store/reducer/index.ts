import { setVotedMoviesStorage } from '../../utils/helpers/localStorage'
import { InitialStateTypes } from '../contexts/MoviesContext'
import { ActionTypes } from './actions'

export type ReducerAction = { type: string; payload: any }

export const reducer = (state: InitialStateTypes, action: ReducerAction) => {
  switch (action.type) {
    case ActionTypes.SET_SEARCHED_TERM: {
      return {
        ...state,
        searchedTerm: action.payload
      }
    }

    case ActionTypes.VOTE_MOVIE: {
      const { id, vote } = action.payload
      setVotedMoviesStorage([...state.votedMovies, { id, vote }])
      return {
        ...state,
        votedMovies: [...state.votedMovies, { id, vote }]
      }
    }

    default:
      return state
  }
}
