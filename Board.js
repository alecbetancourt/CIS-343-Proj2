import createContext from 'gl-context';
import GLGeometry from 'gl-geometry';
import createShader from 'gl-shader-core';
import { mat4, glMatrix } from 'gl-matrix';
import fsOne from './shaders/fs_onecolor.glsl';
import vsOne from './shaders/vs_onecolor.glsl';
import vsMulti from './shaders/vs_vertexcolor.glsl';
import fsMulti from './shaders/fs_vertexcolor.glsl';
import Cone from './geometry/Cone';
import Polygonal from './geometry/Polygonal';
import Sphere from  './geometry/Sphere';
import Arrow from './model/Arrow';
import Axes from './model/Axes';


function createBoard(x, y) {
  var board = new Array(x);
  for (var i = 0; i < x; i++) {
  board[i] = new Array(y);
}
  return board;   // The function returns the board
}

function printBoard(x, y, board) {
  
  for (var i = 0; i < x; i++) {
			console.log(board[i]); //prints out ever element of arra
}
}

function mutate(x, y, board) {
  
  var hap = 1;
	var unhap = 0;
	var hold = createBoard(x, y);
	var i;
	var j;
	for (i = 0; i<x; i++) {
		var temp = board[i];
		for (j = 0; j<y; j++) {
			var num = get_neighbors(i, j, x, y, board);
			if (temp[j] == unhap) {
				if (num == 3) {
					hold[x][y] = hap;
				}
				else {
					hold[x][y] = unhap;
				}
			}
			else {
				if (num == 3 || num ==2) {
					hold[x][y] = hap;
				}
				else {
					hold[x][y] = unhap;
				}

			}

		}
	}
	return hold;
}

function getNeighbors(i, j, x, y, board) {
  
  var hap = 1;
		var num = 0;
		if (j == 0 && i == 0) {
			if (board[j + 1][i] == hap) {
				num++;
			}
			if (board[j + 1][i+1] == hap) {
				num++;
			}
			if (board[j][i + 1] == hap) {
				num++;
			}

		}
		else if (j == 0 && i == x - 1) {
			if (board[j + 1][i] == hap) {
				num++;
			}
			if (board[j + 1][i - 1] == hap) {
				num++;
			}
			if (board[j][i - 1] == hap) {
				num++;
			}

		}
		else if (j == y - 1 && i == x - 1) {
			if (board[j - 1][i] == hap) {
				num++;
			}
			if (board[j - 1][i - 1] == hap) {
				num++;
			}
			if (board[j][i - 1] == hap) {
				num++;
			}

		}
		else if (j == y - 1 && i == 0) {
			if (board[j - 1][i] == hap) {
				num++;
			}
			if (board[j - 1][i + 1] == hap) {
				num++;
			}
			if (board[j][i + 1] == hap) {
				num++;
			}

		}
		else if (j == 0) {
			if (board[j + 1][i] == hap) {
				num++;
			}
			if (board[j + 1][i + 1] == hap) {
				num++;
			}
			if (board[j][i + 1] == hap) {
				num++;
			}
			if (board[j + 1][i - 1] == hap) {
				num++;
			}
			if (board[j][i - 1] == hap) {
				num++;
			}

		}
		else if (j == y - 1) {
			if (board[j - 1][i] == hap) {
				num++;
			}
			if (board[j - 1][i + 1] == hap) {
				num++;
			}
			if (board[j][i + 1] == hap) {
				num++;
			}
			if (board[j - 1][i - 1] == hap) {
				num++;
			}
			if (board[j][i - 1] == hap) {
				num++;
			}

		}
		else if (i == x - 1) {
			if (board[j + 1][i] == hap) {
				num++;
			}
			if (board[j + 1][i - 1] == hap) {
				num++;
			}
			if (board[j-1][i] == hap) {
				num++;
			}
			if (board[j - 1][i - 1] == hap) {
				num++;
			}
			if (board[j][i - 1] == hap) {
				num++;
			}

		}
		else if (i == 0) {
			if (board[j + 1][i] == hap) {
				num++;
			}
			if (board[j + 1][i + 1] == hap) {
				num++;
			}
			if (board[j - 1][i] == hap) {
				num++;
			}
			if (board[j - 1][i + 1] == hap) {
				num++;
			}
			if (board[j][i + 1] == hap) {
				num++;
			}

		}
		else {
			if (board[j + 1][i] == hap) {
				num++;
			}
			if (board[j + 1][i + 1] == hap) {
				num++;
			}
			if (board[j - 1][i] == hap) {
				num++;
			}
			if (board[j - 1][i + 1] == hap) {
				num++;
			}
			if (board[j][i + 1] == hap) {
				num++;
			}
			//
			if (board[j - 1][i-1] == hap) {
				num++;
			}
			if (board[j][i - 1] == hap) {
				num++;
			}
			if (board[j+1][i - 1] == hap) {
				num++;
			}
			

		}
		return num;
}

