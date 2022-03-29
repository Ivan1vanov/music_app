import React, { useEffect } from 'react'
import { ITrack } from '../types/trackTypes'
import styles from '../styles/TrackItem.module.scss'
import { Card, Grid } from '@mui/material';
import { IconButton } from '@material-ui/core';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useActions } from '../hooks/UseAction';
import { useTypedSelector } from '../hooks/UseTypedSelector';

interface ITrackOne {
    track: ITrack,
    active?: boolean
} 

let audio

const TrackItem: React.FC<ITrackOne> = ({track, active = false}) => {

    const router = useRouter()
    const {volume} = useTypedSelector(state => state.player)
    const {playTrack, pauseTrack, setCUrrentTime, setDuration, setActiveTrack} = useActions()

 

    
    

    useEffect(() => {
        if(!audio) {
            audio = new Audio()
        } else {
            setAudio()
            play()
        }
    }, [active])

    const setAudio = () => {
       if(active) {
        audio.src = 'http://localhost:5000/' + track?.audio
        audio.volume = volume / 100
        audio.onloadedmetadata = () => {
            setDuration(Math.ceil(audio.duration))
        }
        audio.ontimeupdate = () => {
            setCUrrentTime(Math.ceil(audio.currentTime))
        }
       }
    }

    const play = () => {
        setActiveTrack(track)
        // playTrack()
        if(active) {
            playTrack()
            audio.play()
        } else {
                pauseTrack()
                audio.pause()
        }
    }

 
  return ( 
    <Card className={styles.track}>
        
        <IconButton onClick={play}>
            {active ? 
                <Pause/>
             : 
             <PlayArrow/>
            }
        </IconButton>
        <img width={50} height={50} src={'http://localhost:5000/' + track.picture}
        style={{cursor: 'pointer'}}
        onClick={() => router.push('/tracks/' + track._id)}
        />
        <Grid container direction='column' style={{width: 200, margin: '0 10px'}}>
                <div> {track.name}</div>
                <div style={{fontSize: '12px', color: 'gray'}}>{track.artist}</div>
        </Grid>
        {active && <div>1.34/2.48</div>}
        <IconButton style={{marginLeft: 'auto'}}> 
            <Delete/>
        </IconButton>
    </Card> 
  )
}

export default TrackItem