import { Star, StarHalf, StarOutline } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { MoviesContext } from '../store/contexts/MoviesContext'
import { voteCustomRound } from '../utils/helpers/helperFunctions'

export interface VoteProps {
  vote: number
  id: string
}

export const VotingBox = (props: VoteProps) => {
  const { vote, id } = props
  const { votedMovies, handleMovieVote } = useContext(MoviesContext)

  const [hoveredStar, setHoveredStar] = useState(0)
  const [hoverMode, setHoverMode] = useState(false)

  const roundedVote = voteCustomRound(vote)

  const votedMovie = votedMovies.find((movie) => movie.id === id)
  const userVote = votedMovie?.vote

  if (votedMovie) {
    return (
      <Typography padding={1} color='blue' display='flex' alignItems='center'>
        Voted: {userVote}
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
        setHoveredStar(0)
      }}
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
                    const vote = index + 1
                    handleMovieVote(id, vote)
                  }}
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
                    handleMovieVote(id, vote)
                  }}
                />
              )
            }
          })
        : [...Array(5)].map((_, index) => {
            if (roundedVote >= index + 1) {
              return (
                <Star
                  key={index}
                  htmlColor='yellow'
                  onClick={() => {
                    const vote = index + 1
                    handleMovieVote(id, vote)
                  }}
                />
              )
            }
            if (roundedVote >= index + 0.5 && roundedVote < index + 1) {
              return (
                <StarHalf
                  key={index}
                  htmlColor='yellow'
                  onClick={() => {
                    const vote = index + 1
                    handleMovieVote(id, vote)
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
                  handleMovieVote(id, vote)
                }}
              />
            )
          })}
    </Box>
  )
}
