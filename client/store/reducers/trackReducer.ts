import { TrackState, TrackAction, TrackActionTypes } from '../../types/trackTypes';


const initialState: TrackState = {
    tracks: [],
    error: ''
}

export const trackReducer = (state = initialState, action: TrackAction): TrackState => {
        switch (action.type) {
            case TrackActionTypes.FETCH_TRACKS:
                console.log(action.payload)
                return {error: '', tracks: action.payload}
            
            case TrackActionTypes.FETCH_TRACKS_ERROR:
                return {...state, error: action.payload}
            default:
                return state
        }
}