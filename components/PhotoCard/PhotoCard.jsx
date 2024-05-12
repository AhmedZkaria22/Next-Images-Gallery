import React, { useId, useState } from 'react'
import { Box, Button, Card, CardActions, CardMedia, Chip, IconButton } from '@mui/material'
import { useRouter } from 'next/router';
import general_styles from '@/styles/General.module.css';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';

const PhotoCard = ({item, id, setLovedCount, setSavedCount}) => {
    const router = useRouter();
    const ComId = useId();

    const [loveActive, setLoveActive] = useState(false);
    const [saveActive, setSaveActive] = useState(false);

  return (
    <Card className={general_styles.photo_card}>
        <CardMedia
            component={'img'}
            image={item?.urls?.regular} alt="img" width={'276'} height={'207'}
        />
        <Box className={general_styles.photo_card_content}>
            <Button
                onClick={()=> {
                router.push({
                    pathname: `/photos/${ComId}`,
                    query: { 
                    src: item?.links?.download,
                    slug: item.slug,
                    width: item.width,
                    height: item.height,
                    id: ComId,
                    user_name: item?.user?.name,
                    user_total_photos: item?.user?.total_photos,
                    user_avatar: item?.user?.profile_image?.large
                    },
                })
                }}
            >
                <Chip
                    sx={{
                        height: 'auto',
                        '& .MuiChip-label': {
                        display: 'block',
                        padding: '0px 5px',
                        borderRadius: '4px',
                        backgroundColor: '#0288d1',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '700',
                        lineHeight: '22px',
                        textTransform: 'none'
                        },
                    }}
                    label={`Click id: ${ComId}`}
                />
            </Button>

            
            <CardActions className={general_styles.photo_card_actions}>
                <IconButton 
                    color={loveActive ?'error' :'default'}
                    onClick={() => {
                        setLoveActive(prev => !prev);
                        setLovedCount(prev => !loveActive ?prev+1 :prev-1);
                    }}
                > 
                    { loveActive ? <FavoriteIcon /> : <FavoriteBorderIcon /> }
                </IconButton>

                <IconButton 
                    color={saveActive ?'secondary' :'default'}
                    onClick={() => {
                        setSaveActive(prev => !prev);
                        setSavedCount(prev => !saveActive ?prev+1 :prev-1);
                    }}>
                    { saveActive ? <TurnedInIcon /> : <TurnedInNotIcon /> }                  
                </IconButton>
            </CardActions>
        </Box>
    </Card>
  )
}

export default PhotoCard