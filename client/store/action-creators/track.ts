import {Dispatch} from 'react'
import { TrackAction, TrackActionTypes } from '../../types/trackTypes';
import axios from 'axios'

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            
            const {data} = await axios.get('http://localhost:5000/tracks/')
            console.log(data)
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR,
                payload: 'Some error happened '
            })
            console.log(error)
        }
    }
}