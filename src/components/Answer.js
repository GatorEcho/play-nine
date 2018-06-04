import React from 'react';

const Answer = (props) => {
    return(
        <div className='col-3'>
        {props.selectedNumbers.map((number, i) =>
            <span key={i}
            onClick={() => props.unSelectNumber(number)}>{number}</span>
        )}
        </div>
    )
}

export default Answer;