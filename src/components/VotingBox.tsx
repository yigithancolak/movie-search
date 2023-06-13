import { Star, StarHalf, StarOutline } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { MoviesContext } from '../store/contexts/MoviesContext'
import { ActionTypes } from '../store/reducer/actions'
import { voteCustomRound } from '../utils/helpers/helperFunctions'

export interface VoteProps {
  vote: number
  id: number
}

export const VotingBox = (props: VoteProps) => {
  const { vote, id } = props
  const {
    state: { votedMovies },
    dispatch
  } = useContext(MoviesContext)
  const [hoveredStar, setHoveredStar] = useState(voteCustomRound(vote))
  const [hoverMode, setHoverMode] = useState(false)

  const votedMovie = votedMovies.find((movie) => movie.id === id)

  if (votedMovie) {
    return (
      <Typography
        padding={1}
        color='blue'
        display='flex'
        alignItems='center'
        data-cy='user-vote'
      >
        Voted: {votedMovie?.vote}
        <Star htmlColor='yellow' />
      </Typography>
    )
  }

  return (
    <Box
      padding={1}
      display='inline-flex'
      onMouseEnter={() => {
        setHoverMode(true)
      }}
      onMouseLeave={() => {
        setHoverMode(false)
        setHoveredStar(vote)
      }}
      data-cy='voting-box'
    >
      {hoverMode
        ? [...Array(5)].map((_, index) => {
            if (hoveredStar >= index + 1) {
              return (
                <Star
                  key={index}
                  htmlColor='yellow'
                  onMouseEnter={() => setHoveredStar(index + 1)}
                  onClick={() => {
                    const userVote = index + 1
                    dispatch({
                      type: ActionTypes.VOTE_MOVIE,
                      payload: { id, vote: userVote }
                    })
                  }}
                  data-cy='filled-stars'
                />
              )
            } else {
              return (
                <StarOutline
                  key={index}
                  htmlColor='yellow'
                  onMouseEnter={() => setHoveredStar(index + 1)}
                  onClick={() => {
                    const vote = index + 1
                    dispatch({
                      type: ActionTypes.VOTE_MOVIE,
                      payload: { id, vote }
                    })
                  }}
                  data-cy='empty-stars'
                />
              )
            }
          })
        : [...Array(5)].map((_, index) => {
            if (voteCustomRound(vote) >= index + 1) {
              return (
                <Star
                  key={index}
                  htmlColor='yellow'
                  onClick={() => {
                    const vote = index + 1
                    dispatch({
                      type: ActionTypes.VOTE_MOVIE,
                      payload: { id, vote }
                    })
                  }}
                />
              )
            }
            if (
              voteCustomRound(vote) >= index + 0.5 &&
              voteCustomRound(vote) < index + 1
            ) {
              return (
                <StarHalf
                  key={index}
                  htmlColor='yellow'
                  onClick={() => {
                    const vote = index + 1
                    dispatch({
                      type: ActionTypes.VOTE_MOVIE,
                      payload: { id, vote }
                    })
                  }}
                />
              )
            }
            return (
              <StarOutline
                key={index}
                htmlColor='yellow'
                onClick={() => {
                  const vote = index + 1
                  dispatch({
                    type: ActionTypes.VOTE_MOVIE,
                    payload: { id, vote }
                  })
                }}
              />
            )
          })}
    </Box>
  )
}
