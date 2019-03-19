/**
 * Othello
 * Javascript project for CIS 343.
 * Command-line version of Othello.
 */

// Import our board definitions
const board = require('./board.js');
// Import a synchronous prompt library
const prompt = require('prompt-sync')();

/**
 * saveFile
 * SYNCHRONOUS (blocking) file save function.
 * @param file - The full filename path we want to save to.
 * @param contents - The object we wish to save as a JSON file.
 */
function saveFile(file, contents){
	let fs = require('fs');
	fs.writeFileSync(file, JSON.stringify(contents));
}

/**
 * loadFile
 * SYNCHRONOUS (blocking) file read function.
 * @param file - The full filename path we wish to load an object from.
 * @return contents - The object converted from JSON.
 */
function loadFile(file){
	const fs = require('fs');

	let rawdata = fs.readFileSync(file);
	let contents = JSON.parse(rawdata);
	return contents;
}

/**
 * Driver function.  "main" method, if you will.
 */
function start(){
	// Create new board object
	let myBoard = new board(8, 8);
	let turn = 0;

	// Loop, asking user input, calling appropriate functions.
	while (!myBoard.isGameOver()) {
		//console.clear();
		console.log('Current move: ' + (turn == 0 ? 'White':'Black'))
		myBoard.printBoard();
		let menu = prompt('Enter option (1 to move, 2 to save board, 3 to load board, 4 to quit): ');
		switch(menu) {
			//move
			case '1':
				let row = parseInt(prompt('Enter row to place piece (0-7): '));
				let col = parseInt(prompt('Enter col to place piece (0-7): '));
				if(!(row<0||row>7||col<0||col>7) && myBoard.isValidMove(row, col, (turn == 0 ? 'W':'B'))) {
					myBoard.placeDiscAt(row, col, (turn == 0 ? 'W':'B'));
					console.clear();
				}
				else {
					console.clear();
					console.log('Move is invalid, try again.');
					//might not work
					continue;
				}
				break;
			//save board
			case '2':
				let fileName = prompt('Enter file name to write to: ');
				saveFile(fileName, myBoard);
				console.clear();
				continue;
			//load board
			case '3':
				let loadName = prompt('Enter file name to load: ');
				myBoard.board = loadFile(loadName).board;
				console.clear();
				continue;
			//quit game
			case '4':
				console.clear();
				return;
			//go back to menu if any other input
			default:
				console.clear();
				console.log('Command is invalid, try again.');
				continue;
		}
		turn = (turn == 0 ? 1 : 0);
	}
	
	let winner = myBoard.checkWinner();
	if (winner == 'W' || winner == 'B') {
		console.log('Game is over. The winner is ' + winner);
	}
	else {
		console.log('Game is over. No winner.');
	}
}

console.clear();
start();