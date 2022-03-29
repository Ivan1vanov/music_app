import React, { useEffect } from 'react'
import { IconButton } from '@material-ui/core';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import styles from '../styles/Player.module.scss'
import { ITrack } from '../types/trackTypes';
import { Grid } from '@mui/material';
import TrackProgress from './TrackProgress';
import { useTypedSelector } from '../hooks/UseTypedSelector';
import { useActions } from '../hooks/UseAction';


let audio

const Player = () => {

    const track: ITrack =  {_id: 'qw2232f', name: 'EAS', text: 'asdasd', audio: 'http://localhost:5000/audio/b63b4209-5a56-4b57-85e0-5b546e4a755d.mp3',
    artist: 'asdasd', listens: 2, picture: 'http://localhost:5000/image/e1a4c78b-14fb-449e-ad30-62d9c83d586e.jpg'
  }

    const {volume, pause, active, duration, currentTime} = useTypedSelector(state => state.player)
    const {playTrack, pauseTrack, setVolume, setCUrrentTime, setDuration} = useActions()

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
        audio.src = 'http://localhost:5000/' + active?.audio
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
        if (pause) {
                playTrack()
                audio.play()
        } else {
                pauseTrack()
                audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
            audio.volume = Number(e.target.value) / 100
            setVolume(Number(e.target.value))
    }

   const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
            audio.currentTime = Number(e.target.value)
            setCUrrentTime(Number(e.target.value))
   }

   if(!active) {
       return null
   }

  return (
    <div className={styles.player}>
         <IconButton onClick={play}>
            {pause ? 
                  <PlayArrow/>
             : 
             <Pause/>
            }
        </IconButton>
        <Grid container direction='column' style={{width: 200, margin: '0 10px'}}>
                <div> {active?.name}</div>
                <div style={{fontSize: '12px', color: 'gray'}}>{active?.artist}</div>
        </Grid>
        <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
        <VolumeUp style={{marginLeft: 'auto'}}/>
        <TrackProgress left={volume} right={100} onChange={changeVolume}/>
    </div>
  )
}

export default Player