import { FETCH_REQUEST, FETCH_PHOTOS_SUCCESS, FETCH_FAILURE, FETCH_TOPICS_SUCCESS } from "./constants"

export const fetchRequest = () => {
    return{
        type: FETCH_REQUEST
    }
}

export const fetchPhotosSuccess = (photos) => {
    return{
        type: FETCH_PHOTOS_SUCCESS,
        payload: photos
    }
}

export const fetchTopicsSuccess = (topics) => {
    return{
        type: FETCH_TOPICS_SUCCESS,
        payload: topics
    }
}

export const fetchFailure = (error) => {
    return{
        type: FETCH_FAILURE,
        payload: error
    }
}