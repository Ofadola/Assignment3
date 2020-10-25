import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = (props) => {
    return (
        <div className={`dixit-card ${props.scaled ? 'scaled' : ''}`} style={{
            backgroundImage: `url(/images/cards/${props.card}.jpg)`,
        }}
        onClick={props.onClick}>
            {props.circleChar && <div className="card-circle">{props.circleChar}</div>}
        </div>
    )
}

Card.propTypes = {
    card: PropTypes.number,
    circleChar: PropTypes.string,
    onClick: PropTypes.func,
    scaled: PropTypes.bool,
}

export default Card;
