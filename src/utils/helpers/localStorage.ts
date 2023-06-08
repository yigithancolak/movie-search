import { VoteProps } from '../../components/VotingBox'

export const setVotedMoviesStorage = (votedMovies: VoteProps[]) => {
  localStorage.setItem('votedMovies', JSON.stringify(votedMovies))
}

export const getVotedMoviesStorage = () => {
  const votedMovies = localStorage.getItem('votedMovies')

  return votedMovies ? JSON.parse(votedMovies) : []
}
