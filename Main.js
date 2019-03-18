/*
 * Game of Life
 * 
 * A version of John Conway's classic Game of Life, written in C.
 * CIS 343 - Winter 2019
 * 
 * Author:  Hayden Townley Alec
 *
 * This program saves and loads games using the following format:
 * The first byte of the file is the height.
 * The second byte of the file is the width.
 * The remaining bytes of the file are either zeros or ones,
 * where a one is a live cell and a zero is no cell.
 * Unlike some versions we will not keep track of where a cell
 * was when it died; i.e. when a cell dies it is just gone.
 * If the height of the file is h and the width is w, the
 * total size of the file in bytes would then be (h x w) + 2.
 */

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
  
  
  
  
  
  
  
  
  while(1){
		var fn ;
		console.log("Press q to quit, w to save to disk,\n");
		console.log("n to iterate multple times, or any other\n");
		console.log("key to continue to the next generation.\n");
		fn.scan();
		printf("-------------------------\n");

		
		
			if(fn == "q"){
				// Case 'q' results in exiting the game.  We must free
				// our memory here.
				return 0;
			}else if(fn == "w"){

			
				// Case 'w' writes the current board to disk.  Since
				// a file is just a string of bytes, we must first
				// convert our grid to some representation that is
				// a string of bytes.  We will use the representation
				// described in the top of this file.
				printf("Enter a filename: ");
				char filename[254];
				fgets(filename, 254, stdin);

				// Convert our board to a string of bytes
				char* contents = (char*) malloc( sizeof(char) * ((x*y)+2));
				for(int i=0;i<x;++i){
					for(int j=0; j<y; ++j){
						contents[i*y+j] = grid[i][j];
					}
				}
				for(int i=(x*y)+2; i>1; --i){
					contents[i] = contents[i-2];
				}
				// Make sure the first two bytes are the
				// height and width.
				contents[0] = x;
				contents[1] = y;
				write_file(filename, contents, bytes_read); 
				break;
			}
			else if(fn == "n"){
			
				// 'n' causes us to ask the user how
				// many evolutions to perform in a row,
				// then executes them in a loop.
				var iter ;
				console.log("How many iterations? ");
				iter.scan();
				

				console.log("Iterating ", iter, " times.");
				for(var i=0; i<iter; ++i){
					grid = mutate(x, y, grid);
					print_grid(x, y, grid);
				}	
				break;
			}

			else{
				// Any other key and we evolve one iteration,
				// print, and keep going.
				board = mutate(x, y, grid);
				print_grid(x, y, grid);
			}
		
}
