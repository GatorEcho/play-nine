import React, { Component } from 'react';
import _ from 'lodash';
import { possibleCombinationSum } from './Helpers';

import Stars from './Stars';
import Button from './Button';
import Answer from './Answer';
import Numbers from './Numbers';
import DoneFrame from './DoneFrame';

class Game extends Component {
static randomNumber = () => 1 + Math.floor(Math.random()*9);
static initialState = () => ({
        selectedNumbers: [],
        numberOfRandomStars: Game.randomNumber(),
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: 5,
        doneStatus: null,
});
state = Game.initialState();
selectNumber = (clickedNumber) => {
    if(this.state.selectedNumbers.indexOf(clickedNumber) >=0 ) {return;}
    if(this.state.usedNumbers.indexOf(clickedNumber) >=0 ) {return;}
    this.setState(prevState => ({
        selectedNumbers: prevState.selectedNumbers.concat(clickedNumber),
        answerIsCorrect: null
    }));
}
unSelectNumber = (clickedNumber) => {
    this.setState(prevState => ({
        selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber),
        answerIsCorrect: null
    }));
}
checkAnswer = () => {
    this.setState(prevState => ({
        answerIsCorrect: prevState.numberOfRandomStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
}
acceptAnswer = () => {
    this.setState(prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        numberOfRandomStars: Game.randomNumber()
    }), this.updateDoneStatus);
}
redraw =() => {
    if(this.state.redraws === 0){ return }
    this.setState (prevState => ({
        numberOfRandomStars: Game.randomNumber(),
        answerIsCorrect: null,
        selectedNumbers: [],
        redraws: prevState.redraws - 1
    }), this.updateDoneStatus);
}
possibleSolutions = ({numberOfRandomStars, usedNumbers}) => {
    const possibleNumbers = _.range(1, 10).filter(number => 
        usedNumbers.indexOf(number) === -1
    );
    return possibleCombinationSum(possibleNumbers, numberOfRandomStars)
}
updateDoneStatus =() => {
    this.setState(prevState => {
        if(prevState.usedNumbers.length === 9){
            return {doneStatus: 'Nice Job!'}
        }
        if(prevState.redraws === 0 && !(this.possibleSolutions(prevState))){
            return {doneStatus: 'Game Over!'}
        }
    });
    
}
resetGame = () => this.setState(Game.initialState())

  render() {
      const {selectedNumbers, numberOfRandomStars, usedNumbers, answerIsCorrect, redraws, doneStatus} = this.state
    return (
      <div>
          <br/>
     
      <div className='container'>
        <h3 className='text-center'>Play Nine</h3>
        <hr />
            <div className='row'>
               <Stars numberOfStars={numberOfRandomStars} />
               <Button selectedNumbers={selectedNumbers} 
                       checkAnswer={this.checkAnswer}
                       answerIsCorrect={answerIsCorrect}
                       acceptAnswer={this.acceptAnswer} 
                       redraw={this.redraw}
                       redraws={redraws}/>
                       
               <Answer selectedNumbers={selectedNumbers}
                       unSelectNumber={this.unSelectNumber} />
            </div>
            <br />
            {doneStatus ? 
            <div>
            <Numbers selectedNumbers={selectedNumbers}
            selectNumber={this.selectNumber}
            usedNumbers={usedNumbers} />
            <DoneFrame doneStatus={doneStatus} 
                       resetGame={this.resetGame}/>
            </div> :
            <Numbers selectedNumbers={selectedNumbers}
                     selectNumber={this.selectNumber}
                     usedNumbers={usedNumbers} />
            }       
            <br/>
      </div>
      </div>
    );
  }
}

export default Game;