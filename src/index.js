// Get React.JS, The React DOM, And get the CSS styles from index.css from the root of the src folder
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Make the "Square" function which can be reused as needed, we don't use a class since we are only using "return"
function Square(props) {
	// Create the button which has CSS attached to make it look like a square, add an onCLick listener to ckeck for a click and return that in "props" also since this is a function, we don't need () => ...() anymore inside of the "button" object
	return (
	  <button className="square" onClick={props.onClick}>
		{props.value}
	  </button>
	);
  }
  
  // Use a class here, since we are using a constructor, making a couple of functions, and rendering
  class Board extends React.Component {
	// Instead of doing garbage with trying to track the state of each "Square" component "lift" the state into the parent component
	constructor(props) {
		// If you use a constuctor, then you must make a super() call passing in the "props"
		super(props)
		// Make an array called "Squares" containing the state of each "Square", also add property that tells our code if player "X" is next or not, which since there are only 2 players, means we don't need 2 properties!
		this.state = {
			squares: Array(9).fill(null),
			xIsNext: true,
		}
	}
	
	// This function is a handler for onClick in the "Square" object
	handleClick(i) {
		// This allows for time travel using immutable code, but I'm too lazy to implement that, still a best practice! This allows for "undo" functionality.
		const squares = this.state.squares.slice();
		if (calculateWinner(squares) || squares[i]) {
			return;
		}
		// Flips "X" and "O" part 1
		squares[i] = this.state.xIsNext ? "X" : "O";
		this.setState({
			squares: squares,
			// Flips "X" and "O" part 2
			xIsNext:!this.state.xIsNext,
		});
	}

	// Render the "Square" with it's value in the "Squares" array which has it's state by it's number, convinient!
	renderSquare(i) {
	  return (<Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />);
	}
  
	render() {
	  const winner = calculateWinner(this.state.squares);
	  let status;
	  if (winner) {
		status = `Winner: ${winner}`
	  } else {
		// Return the status of the next player with a "literal format" if no one has won yet
		status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
	  }
	  return (
		<div>
		  <div className="status">{status}</div>
		  <div className="board-row">
			{this.renderSquare(0)}
			{this.renderSquare(1)}
			{this.renderSquare(2)}
		  </div>
		  <div className="board-row">
			{this.renderSquare(3)}
			{this.renderSquare(4)}
			{this.renderSquare(5)}
		  </div>
		  <div className="board-row">
			{this.renderSquare(6)}
			{this.renderSquare(7)}
			{this.renderSquare(8)}
		  </div>
		</div>
	  );
	}
  }
  
  class Game extends React.Component {
	render() {
	  return (
		<div className="game">
		  <div className="game-board">
			<Board />
		  </div>
		  <div className="game-info">
			<div>{/* status */}</div>
			<ol>{/* TODO */}</ol>
		  </div>
		</div>
	  );
	}
  }
  
  // ========================================
  
  ReactDOM.render(
	<Game />,
	document.getElementById('root')
  );
  
  // It would take WAYYYYY too long to code this myself so i got this from the React.JS website! All it does is check if there is a winning patern to the "Squares" array...
  function calculateWinner(squares) {
	const lines = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
	  const [a, b, c] = lines[i];
	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
	  }
	}
	return null;
  }