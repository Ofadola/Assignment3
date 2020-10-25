import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = (props) => {
    return (
        <div className={`user-card ${props.isCurrent ? 'current' : ''}`}>
            <div className="user-name" style={{
                fontWeight: props.isCurrent ? 'bold' : 'normal',
            }}>{props.username}</div>
            <div className="user-image">
                <img src={props.avatarSrc}/>
                <div className="user-score">{props.score}</div>
            </div>
        </div>
    )
}

User.propTypes = {
    username: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    avatarSrc: PropTypes.string.isRequired,
    isCurrent: PropTypes.bool,
}

export default User