import React from 'react'
import { ITrack } from '../types/trackTypes';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import TrackItem from './TrackItem';

interface ITrackList {
    tracks: ITrack[]
}

const TrackList: React.FC<ITrackList> = ({tracks}) => {

    console.log(tracks) 
  return (
    <div>
        <Grid container direction='column'>
                <Box p={2}>
                    {tracks?.map(track => (
                        <TrackItem
                        key={track._id}
                        track={track}
                        />
                    ))}
                </Box>
        </Grid>
    </div>
  )
}

export default TrackList