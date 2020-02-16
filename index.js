const grid = (n => [...new Array(n)].map(x => x = new Array(n).fill(0)))(7);


function isValid(grid){
    return grid.flat(Infinity).filter(n => n==1).length == grid.length;
}

function canPlace(y, x, grid){

    const xValid = !grid[y].includes(1);
    const yValid = (_ =>{
        for(let i = 0; i < grid.length; i++){
            if(grid[i][x] == 1){
                return false;
            }
        }
        return true;
    })();
    const lDiagValid = (_ => {

        const min = Math.min(x,y);

        for(let _x = x-min, _y = y-min;_x < grid.length && _y < grid.length; _x++, _y++){
        
            if(grid[_y][_x] == 1){
                return false;
            }
        }
        return true;

    })();
    const rDiagValid = (_ =>{

        let xOrigin = x, yOrigin = y;

        while(xOrigin < grid.length && yOrigin > 0){
            yOrigin--;
            xOrigin++;
          }

        for(; xOrigin >= 0 && yOrigin < grid.length; xOrigin--, yOrigin++){

            if(grid[yOrigin][xOrigin] == 1){
                return false;
            }
        }
        return true;
    })();

    return xValid & yValid & lDiagValid & rDiagValid;
}

let solutions=[];
function solve(y,x,grid){

    if(isValid(grid)){
        solutions.push(JSON.parse(JSON.stringify(grid)));
    }

    const nextX = (x+1)%grid.length; 
    const nextY = x > nextX ? y+1 : y;

    for(let _y = y; _y < grid.length; _y++){

        for(let _x = x; _x < grid.length; _x++){

            if(canPlace(_y,_x,grid)){
                grid[_y][_x] = 1;
                solve(nextY, nextX, grid);
                grid[_y][_x] = 0;
            }
        }
    }
}

function print(grid){

    grid.forEach(y =>{
        let toPrint="";
        y.forEach(x =>{
            toPrint+=`${x}\t`;
        });
        console.log(toPrint);
        console.log("-".repeat(grid.length * 6.5));
    });
}

solve(0,0,grid);
for(g of solutions){
    print(g)
    console.log("\n\n\n")
}
console.log(solutions.length);
