import { Star, StarHalf, StarOutline } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useState } from 'react'

interface VotingBoxProps {
  vote: number
}

export const VotingBox = (props: VotingBoxProps) => {
  const { vote } = props

  const [hoveredStar, setHoveredStar] = useState(-1)
  const [selectedStar, setSelectedStar] = useState(vote)
  const [hoverMode, setHoverMode] = useState(false)

  return (
    <Box
      display='inline-flex'
      onMouseEnter={() => setHoverMode(true)}
      onMouseLeave={() => {
        setHoverMode(false)
        setHoveredStar(-1)
      }}
      bgcolor='blue'
    >
      {hoverMode
        ? [...Array(5)].map((_, index) => {
            if (index + 1 <= hoveredStar) {
              return (
                <Star
                  key={index}
                  htmlColor='yellow'
                  onMouseEnter={() => setHoveredStar(index + 1)}
                />
              )
            } else {
              return (
                <StarOutline
                  key={index}
                  htmlColor='yellow'
                  onMouseEnter={() => setHoveredStar(index + 1)}
                />
              )
            }
          })
        : [...Array(5)].map((_, index) => {
            if (vote > index + 1) {
              return <Star key={index} htmlColor='yellow' />
            }
            if (vote > index + 0.5 && vote < index + 1) {
              return <StarHalf key={index} htmlColor='yellow' />
            }
            return <StarOutline key={index} htmlColor='yellow' />
          })}
    </Box>
  )
}
