import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { useState } from 'react'
import { VotingBox } from './VotingBox'

interface MovieCardProps {
  title: string
  imgPath: string
  voteAverage: string
}

export const MovieCard = (props: MovieCardProps) => {
  const { imgPath, title, voteAverage } = props
  const [isHovered, setIsHovered] = useState(false)

  if (!imgPath || !title) {
    return null
  }

  const voteStars = Number((Number(voteAverage) / 2).toFixed(1))

  return (
    <Card
      sx={{ width: 250, position: 'relative', margin: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        >
          <Typography variant='body2' textAlign='center' color='white'>
            {title}
          </Typography>
          <VotingBox vote={voteStars} />
          <Typography variant='body2' textAlign='center' color='white'>
            Vote Average: {voteStars}
          </Typography>
        </CardContent>
      }
    </Card>
  )
}
