import React from 'react'

function SuspenseSkeleton() {
    const skeleton_container = {
        backgroundColor: '#d2d2d2',
        borderRadius: '8px',
        boxSizing: 'border-box',
        marginBottom: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem'
    };
      
    const skeleton_title = {
        backgroundColor: '#d2d2d2',
        borderRadius: '8px',
        height: '24px',
        marginBottom: '5px',
        width: '100%'
    };
      
    const skeleton_img = {
        backgroundColor: '#d2d2d2',
        borderRadius: '8px',
        width: '260px',
        height: '191px'
    };
  return (
    <div className='skeleton-container' style={skeleton_container}>
        <div className='skeleton-img' style={skeleton_img} />
        <div style={{width: 'calc(100% - 166px)'}}>
            <p className='skeleton-title' style={skeleton_title}></p>
            <p className='skeleton-title' style={skeleton_title}></p>
            <p className='skeleton-title' style={skeleton_title}></p>
            <p className='skeleton-title' style={skeleton_title}></p>
        </div>
    </div>
  )
}

export default SuspenseSkeleton