import { FETCH_REQUEST, FETCH_FAILURE, FETCH_PHOTOS_SUCCESS, FETCH_TOPICS_SUCCESS } from "./constants"

const initialState = {
    loading: false,
    photos: [],
    topics: [],
    error: '',
}


const rootReducer = (state = initialState, action) => { 
    switch(action.type){

        case FETCH_REQUEST :
            return {
                ...state,
                loading: true
            }

        case FETCH_PHOTOS_SUCCESS :
            return {
                ...state,
                loading: false,
                photos: action.payload,
                error: ''
            }

        case FETCH_TOPICS_SUCCESS :
            return {
                ...state,
                loading: false,
                topics: action.payload,
                error: ''
            }

        case FETCH_FAILURE :
            return {
                ...state,
                loading: false,
                error: action.payload
            }
                
        default: return state; 
    }
}

export default rootReducer
