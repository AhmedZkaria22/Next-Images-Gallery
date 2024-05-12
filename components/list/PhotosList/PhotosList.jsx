import React, { Fragment, useEffect, useId, useState, useTransition } from 'react'
import { Box } from '@mui/material';
import { fetchPhotos, fetchPhotosFiltered, fetchTopicPhotos } from '@/redux/store';
import { connect } from 'react-redux';
import SuspenseSkeleton from '@/components/SuspenseSkeleton/SuspenseSkeleton';
import PhotoCard from '@/components/PhotoCard/PhotoCard';
import general_styles from "@/styles/General.module.css";



const PhotosList = ({fetchPhotosFilteredCall, listType, querySearch, topicId, setTopicId, 
  imagesData, setImagesData, preventQuerySearchCall, setLovedCount, setSavedCount}) => {
    
  const [isPending, startTransition] = useTransition();
  const id = useId();
  

  useEffect(() => {
    setTimeout(() => {
      startTransition(()=>{
        fetchPhotosFilteredCall(listType, querySearch, topicId, setTopicId, setImagesData, preventQuerySearchCall)
      })
    }, 1000);
  }, [topicId, querySearch, listType])

  if(isPending){
      return(
        <Box className={general_styles.photos_skeleton_container}>
          {
            [...Array(10).keys()].map((item, index) => {
                return <Fragment key={index}>
                  <SuspenseSkeleton />
                </Fragment>
            })
          }
        </Box>
      )
  }
    
  return (
    <Box className={general_styles.photos_container}>
      {
        imagesData?.length >= 1 && imagesData.map((item, index) => {
          return <Fragment key={index}>
            <PhotoCard item={item} id={id} setLovedCount={setLovedCount} setSavedCount={setSavedCount}/>
          </Fragment>
        })
      }
  </Box>
  )
}

const mapStateToProps = state => {
  return{ photosData: state.photos }
}

const mapDispatchToProps = (dispatch) => {
  return{ fetchPhotosFilteredCall: (listType, querySearch, topicId, setTopicId, setImagesData, preventQuerySearchCall) => {
    topicId != undefined
    ? dispatch( fetchTopicPhotos((data) => {
      preventQuerySearchCall();
      setImagesData(data);
    }, topicId) ) 
    : listType === 'filtered'
    ? dispatch( fetchPhotosFiltered((data) => {
      setImagesData(data); 
      setTopicId(undefined);
    }, querySearch) ) 
    : listType === 'TypingFilter' 
    ? setImagesData(prev => prev)
    : dispatch( fetchPhotos((data) => {
      preventQuerySearchCall();
      setImagesData(data); 
      setTopicId(undefined);
    }) ) 
  }}
}

export default connect( 
  mapStateToProps, 
  mapDispatchToProps 
)( PhotosList )