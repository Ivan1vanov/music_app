import { Card, Grid } from '@mui/material'
import React from 'react'
import Layout from '../../layouts/Layout'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { ITrack } from '../../types/trackTypes';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/UseTypedSelector';
import { useActions } from '../../hooks/UseAction';
import { wrapper, NextThunkDispatch } from '../../store/index';
import { fetchTracks } from '../../store/action-creators/track';

const Tracks = () => {
  const router = useRouter()

//   const tracks: ITrack[] = [
//     {_id: 'qw2232f', name: 'EAS', text: 'asdasd', audio: 'http://localhost:5000/audio/b63b4209-5a56-4b57-85e0-5b546e4a755d.mp3',
//     artist: 'asdasd', listens: 2, picture: 'http://localhost:5000/image/e1a4c78b-14fb-449e-ad30-62d9c83d586e.jpg'
//   },
//   {_id: '213w', name: 'OXXX', text: 'asdasd', audio: 'http://localhost:5000/audio/b63b4209-5a56-4b57-85e0-5b546e4a755d.mp3',
//   artist: 'asdasd', listens: 2, picture: 'http://localhost:5000/image/e1a4c78b-14fb-449e-ad30-62d9c83d586e.jpg'
// },
// {_id: 'tyuu34', name: 'SDF', text: 'asdasd', audio: 'http://localhost:5000/audio/b63b4209-5a56-4b57-85e0-5b546e4a755d.mp3',
// artist: 'asdasd', listens: 2, picture: 'http://localhost:5000/image/e1a4c78b-14fb-449e-ad30-62d9c83d586e.jpg'
// }
//   ]

  const {tracks, error} = useTypedSelector(state => state.track)

  console.log(tracks)
  
  return (
    <>
      <Layout>
        <Grid container justifyContent='center'>
          <Card style={{width: '900px'}}>
            <Box p={3}>
              <Grid container justifyContent='space-between'>
                  <h1>Track list</h1>
                  
                  <Button onClick={() => router.push('/tracks/create')}>Upload track</Button>
              </Grid>
              </Box>
              <TrackList
              tracks={tracks}
              />
          </Card>
        </Grid>
      </Layout>
    </>
  )
}

export default Tracks

export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTracks())
})  