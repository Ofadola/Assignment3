import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const LoadingSpinner = () => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
        }}>
            <ClipLoader
                size={150}
                color={'red'}
                loading={true}
            />
        </div>
    )
}

export default LoadingSpinner
