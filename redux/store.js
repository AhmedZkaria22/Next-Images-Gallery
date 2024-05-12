import { createApi } from "unsplash-js";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducer";
import { fetchFailure, fetchRequest, fetchPhotosSuccess, fetchTopicsSuccess } from "./actions";
import { composeWithDevTools } from "@redux-devtools/extension";

const clientId = process.env.NEXT_PUBLIC_UNSPLASH_CLIENT_ID;
const unsplash = createApi({ accessKey: clientId });

export const fetchPhotosFiltered = (successFunction, querySearch) => {
    return (dispatch) => {
        dispatch(fetchRequest());
        unsplash.search.getPhotos({
            page: 1,
            perPage: 20,
            query: querySearch
        }).then(res => {
            const photos = res.response.results;
            dispatch(fetchPhotosSuccess(photos));
            successFunction && successFunction(photos);
        }).catch( error => { dispatch(fetchFailure(error.message)); } )
    }    
}

export const fetchTopicPhotos = (successFunction, topicId) => {
    return (dispatch) => {
        dispatch(fetchRequest());
        unsplash.topics.getPhotos({
            page: 1,
            perPage: 20,
            topicIdOrSlug: topicId
        }).then(res => {
            const photos = res.response.results;
            dispatch(fetchPhotosSuccess(photos));
            successFunction && successFunction(photos);
        }).catch( error => { dispatch(fetchFailure(error.message)); } )
    }    
}

export const fetchPhotos = (successFunction) => {
    return (dispatch) => {
        dispatch(fetchRequest());
        unsplash.photos.list({
            page: 1,
            perPage: 10,
        }).then(res => {
            const photos = res.response.results;
            dispatch(fetchPhotosSuccess(photos));
            successFunction && successFunction(photos);
        }).catch( error => { dispatch(fetchFailure(error.message)); } )
    }    
}

export const fetchTopics = (successFunction) => {
    return (dispatch) => {
        dispatch(fetchRequest());
        unsplash.topics.list({
            orderBy: 'latest',
            perPage: 100,
        }).then(res => {
            const topics = res.response.results;
            dispatch(fetchTopicsSuccess(topics));
            successFunction && successFunction(topics);
        }).catch( error => { dispatch(fetchFailure(error.message)); } )
    }    
}



export const store = createStore(rootReducer, 
    composeWithDevTools(applyMiddleware(thunk))
)