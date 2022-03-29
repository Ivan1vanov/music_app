import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { ITrack } from '../../types/trackTypes'
import { useRouter } from 'next/router';

const TrackPage = () => {

    const track: ITrack =  {_id: 'qw2232f', name: 'EAS', text: 'asdasd', audio: 'http://localhost:5000/audio/b63b4209-5a56-4b57-85e0-5b546e4a755d.mp3',
    artist: 'asdasd', listens: 2, picture: 'http://localhost:5000/image/e1a4c78b-14fb-449e-ad30-62d9c83d586e.jpg'
  }

  const router = useRouter()
  return (
    <div>
        <Button
        onClick={() => router.push('/tracks')}
        >
            Track List
        </Button>
        <Grid container style={{margin: '20px'}}>
            <img width={200} height={200} src={track.picture}/>
            <div style={{margin: '20px'}}> 
            <h1>Track name: {track.name}</h1>
            <h1>Artis: {track.artist}</h1>
            <h1>Listens: {track.listens}</h1>
            </div>
            <h2>Lirycs:</h2>
            <div>
                {track.text}
            </div>
            <TextField
            label='Your name'
            fullWidth
            style={{margin: '5px 0'}}
            />
            <TextField
            label='Comment'
            fullWidth
            multiline
            rows={4}
            style={{margin: '5px 0'}}
            />
            <Button
            variant='contained'
            style={{margin: '5px 0'}}
            >
                Comment
            </Button>
        </Grid>
    </div>
  )
}

export default TrackPage