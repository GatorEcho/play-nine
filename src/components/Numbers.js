import React from 'react';
import _ from 'lodash';

const Numbers = (props) => {
    const arrayOfNumbers = _.range(1, 10);
    const numberClassName = (number) => {
      if(props.usedNumbers.indexOf(number) >= 0){
          return 'col-3 used';
      }
      if(props.selectedNumbers.indexOf(number) >= 0){
        return 'col-3 selected';
      }
        return 'col-3';
    }
    return(
        <div className='card text-center'>
            <div>
                {arrayOfNumbers.map((number, i) =>
                    <span key={i} className={numberClassName(number)}                           
                          onClick={() => props.selectNumber(number)}>
                          {number}
                          </span>              
                )}
            </div>
        </div>
    )
}

export default Numbers;
