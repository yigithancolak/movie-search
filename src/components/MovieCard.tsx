import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useState } from 'react'
import { voteFixer } from '../utils/helpers/helperFunctions'
import { VotingBox } from './VotingBox'

interface MovieCardProps {
  title: string
  imgPath: string
  voteAverage: number
  id: number
}

export const MovieCard = (props: MovieCardProps) => {
  const { imgPath, title, voteAverage, id } = props
  const [isHovered, setIsHovered] = useState(false)

  if (!imgPath || !title) {
    return null
  }

  return (
    <Card
      sx={{
        width: 150,
        position: 'relative',
        margin: 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cy='movie-card'
    >
      <CardMedia
        sx={{ objectFit: 'fill' }}
        component='img'
        height='194'
        image={`https://image.tmdb.org/t/p/original${imgPath}`}
        alt={title}
      />
      {
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            bgcolor: 'rgba(0,0,0,0.7)',
            width: '100%',
            height: '100%',
            opacity: isHovered ? 1 : 0,
            overflow: 'hidden',
            transform: isHovered ? 'translateY(0%)' : 'translateY(100%)',
            transition: 'all .3s ease-in-out'
          }}
          data-cy='card-content'
        >
          <Typography variant='body2' textAlign='center' color='white'>
            {title}
          </Typography>
          <VotingBox vote={voteAverage} id={id} />
          <Typography variant='body2' textAlign='center' color='white'>
            Vote Average: {voteFixer(voteAverage)}
          </Typography>
        </CardContent>
      }
    </Card>
  )
}
