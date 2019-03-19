/**
 * Board
 * Defines a board "class" for an Othello game.
 */

module.exports = class Board {
	/**
	 * Construct the object with required state
	 */
	constructor(height, width){
		this.height = height;
		this.width = width;
		this.board = [];
		for(let i=0; i<this.height; ++i){
			let tmp = [];
			for(let j=0; j<this.width; ++j){
				tmp.push(-1);
			}
			this.board.push(tmp);
		}
		this.board[3][3] = 'B';
		this.board[4][4] = 'B';
		this.board[4][3] = 'W';
		this.board[3][4] = 'W';
	}

	/**
	 * Print a representation of the board to the terminal.
	 */
	printBoard(){
		for(let i=0; i<this.height; ++i){
			for(let j=0; j<this.width; ++j){
				if(this.board[i][j] == -1){
					process.stdout.write('.\t');
				} else {
					process.stdout.write(this.board[i][j] + "\t");
				}
			}
			console.log();
		}
	}

	/**
	 * isValidMove
	 * @param row An integer row number.
	 * @param col An integer column number.
	 * @param disc A character for the disc color.
	 * @return A boolean indicating whether the move is valid.
	 */
	
	isValidMove(row, col, disc){
		//console.log('rct' + row + col + disc);
		//piece must be placed in -1 location
		if(this.board[row][col] != -1) {
			return false;
		}
		//console.log('empty space' + row + ' ' + col);
		//check in all directions
		for(let rowOffset=-1;rowOffset<=1;rowOffset++) {
			for(let colOffset=-1;colOffset<=1;colOffset++) {
				//console.log('offsets' + rowOffset + ' ' + colOffset);
				let enemyDisc = false, teamDisc = false;
				
				//row and col offset are either -1, 0, or 1
				//if (row == 2 && col == 3) {
				//	let tempa = row+1*rowOffset
				//	let tempb = col+1*colOffset
				//	console.log(tempa + ' ' + tempb);
				//}
				for(let offset=1; row+offset*rowOffset>=0 && row+offset*rowOffset<=7 &&
								  col+offset*colOffset>=0 && col+offset*colOffset<=7; offset++) {					  
					//find checkRow/Col using offset for magnitude and row/colOffset for direction
					let checkRow = row+offset*rowOffset, checkCol = col+offset*colOffset;
					//console.log('CHECKROWCOL' + checkRow + ' ' + checkCol);
					//pieces must be continuous to be flipped
					if(this.board[checkRow][checkCol] == -1) {
						break;
					}
					
					//enemy piece must be bracketed for a move to be valid
					if(this.board[checkRow][checkCol] != -1 && this.board[checkRow][checkCol] != disc) {
						enemyDisc = true;
					}
					
					//bracketed pieces are only flipped up to the first friendly piece encountered in othello
					if(this.board[checkRow][checkCol] == disc) {
						teamDisc = true;
						break;
					}
				}
				
				//if a piece is bracketed, the move is valid
				if(enemyDisc && teamDisc) {
					return true;
				}
			}
		}
		//default case
		return false;
	}

	/**
	 * placeDiscAt
	 * @param row An integer number for row.
	 * @param col An integer number for column.
	 * @param disc A character standing for disc color.
	 */
	placeDiscAt(row, col, disc){
		let offset;
		//place piece
		this.board[row][col] = disc;
		
		//check in all directions
		for(let rowOffset=-1;rowOffset<=1;rowOffset++) {
			for(let colOffset=-1;colOffset<=1;colOffset++) {
				let enemyDisc = false, teamDisc = false;
				
				//row and col offset are either -1, 0, or 1
				for(offset=1; row+offset*rowOffset>=0 && row+offset*rowOffset<=7 &&
								  col+offset*colOffset>=0 && col+offset*colOffset<=7; offset++) {
					//find checkRow/Col using offset for magnitude and row/colOffset for direction
					let checkRow = row+offset*rowOffset, checkCol = col+offset*colOffset;
					
					//pieces must be continuous to be flipped
					if(this.board[checkRow][checkCol] == -1) {
						break;
					}
					
					//enemy piece has to be bracketed for a flip to be needed
					if(this.board[checkRow][checkCol] != -1 && this.board[checkRow][checkCol] != disc) {
						enemyDisc = true;
					}
					
					//bracketed pieces are only flipped up to the first friendly piece encountered in othello
					if(this.board[checkRow][checkCol] == disc) {
						teamDisc = true;
						break;
					}
				}
				
				//if pieces are bracketed, iterate thru and capture
				if(enemyDisc && teamDisc) {
					for(let cycle=1;cycle<offset;cycle++) {
						
						let flipRow = row+cycle*rowOffset, flipCol = col+cycle*colOffset;
						this.board[flipRow][flipCol] = disc;
					}
				}
			}
		}
	}

	/**
	 * isValidMoveAvailable
	 * @param disc A character pertaining to a disc color.
	 * @return bool A boolean telling the user whether there are
	 *	 	valid moves availabe for that disc.
	 */
	isValidMoveAvailable(disc){
		for(let row=0;row<this.height;row++) {
			for(let col=0;col<this.width;col++) {
				if(this.isValidMove(row, col, disc)) {
					return true;
				}
			}	
		}
		return false;
	}

	/**
	 * isBoardFull
	 * @return boolean Whether or not the board is full.
	 */
	isBoardFull(){
		let isFull = true;
		for(let row=0;row<this.height;row++) {
			for(let col=0;col<this.width;col++) {
				if(this.board[row][col] == -1) {
					isFull = false;
				}
			}	
		}
		return isFull;
	}

	/**
	 * isGameOver
	 * @return bool Whether or not the game is over.
	 */
	isGameOver(){
		return (!this.isValidMoveAvailable('W') || !this.isValidMoveAvailable('B')) || this.isBoardFull();
	}
	
	/**
	 * checkWinner
	 * @return char Which player has won.  Return null if
	 * 		a tie exists.
	 */
	checkWinner(){
		let whiteScore = 0;
		let blackScore = 0;
		for(let row=0;row<this.height;row++) {
			for(let col=0;col<this.width;col++) {
				if(this.board[row][col] == 'W') {
					whiteScore++;
				}
				if(this.board[row][col] == 'B') {
					blackScore++;
				}
			}	
		}
		console.log('WB' + whiteScore + ' ' + blackScore);
		if (whiteScore > blackScore) {
			return 'W';
		}
		if (blackScore > whiteScore) {
			return 'B';
		}
		return null;
	}
}

//let board = new Board(10, 10);
//board.printBoard();