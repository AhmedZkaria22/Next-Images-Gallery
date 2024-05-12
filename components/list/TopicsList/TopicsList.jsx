import React, { useEffect, useState, useTransition } from 'react'
import { Box, Button } from '@mui/material';
import { fetchTopics } from '@/redux/store';
import { connect } from 'react-redux'
import general_styles from "@/styles/General.module.css";

const TopicsList = ({fetchTopicsFilteredCall, topicsData, setTopicId, preventQuerySearchCall}) => {
    const [isPending, startTransition] = useTransition();

    const [tagId, setTagId] = useState(null);
    
    useEffect(() => {
      startTransition(()=>{
          fetchTopicsFilteredCall();
      })
    }, [])    


    return (
      <Box className={general_styles.topics_container}>
        {
          topicsData?.length >= 1 && topicsData.map((item, index) => {
            return <Button key={index} 
              className={`${general_styles.small_text} ${general_styles.button_tag} ${tagId === index ? general_styles.button_tag_active : ''}`} 
              onClick={ () => {    
                setTagId(index)            ;
                setTopicId(item?.id);
                preventQuerySearchCall(false);
              }}
            >{item?.title}</Button>
          })
        }
      </Box>
    )
    
}


const mapStateToProps = state => {
  return{ topicsData: state.topics }
}

const mapDispatchToProps = (dispatch) => {
  return{ fetchTopicsFilteredCall: () => dispatch( fetchTopics(() => {}) ) }
}

export default connect( 
  mapStateToProps, 
  mapDispatchToProps 
)( TopicsList )