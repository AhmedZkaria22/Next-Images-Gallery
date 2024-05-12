import React from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { SearchSharp } from '@mui/icons-material'


const SearchInput = ({className, change, click}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className={className}>
          <IconButton
            sx={{
              width: '35px',
              height: '35px',
              cursor: 'pointer'
            }}
            onClick={click}
          >
            <SearchSharp />               
          </IconButton>

        <TextField id="input-with-sx" label="Search photo" variant="standard"
            onChange={change}
        />
    </Box>
  )
}

export default SearchInput