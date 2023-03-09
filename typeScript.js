// javascript code goes here
let bombArray= [13, 8, 29, 5, 91, 83, 53, 41, 60, 84];
function fillCells(){
    const allcells= document.querySelector('#grid')
    for(let i=0;i<100;i++){
    allcells.innerHTML+=`<div id=${i} class="valid"></div>`;
    }
    bombArray.forEach(bmb=>{   
        document.getElementById(`${bmb}`).setAttribute('class', 'bomb');
    });
    // console.log(allcells);
}
fillCells();

let gameUp = false;
let scoreSecured =0;
const shuffledArr = bombArray.sort( function(){ return Math.random()-0.5});
const cellElems=document.querySelectorAll('#grid div');
cellElems.forEach((el)=>{
    el.addEventListener('click', (e)=>{
        if(gameUp){
            return;
        }
        let clicked_cell = parseInt(e.target.id);
        let selectCell=document.getElementById(`${clicked_cell}`);
        let finalResult=document.querySelector("#result");
        let allPossibleSlect= new Set();
        if(scoreSecured>=89 || indicateBomb>9){
            finalResult.innerText="YOU WIN!"
            gameUp = true;
            return;
        }
        scoreSecured++;
        shuffledArr.map(ele=>{
            if(ele===clicked_cell){
                bombArray.map(bm=>{
                    document.getElementById(`${bm}`).classList.add('bomber');
                })
                finalResult.innerText="YOU LOSE!";
                gameUp=true;
                return;
            }
        })
        let inner_points=0;
        if(!gameUp){
        if(clicked_cell%10===0){
            allPossibleSlect.add(clicked_cell+1);
            allPossibleSlect.add(clicked_cell+10);
            allPossibleSlect.add(clicked_cell+11);
            shuffledArr.map(el=>{
                if(allPossibleSlect.has(el)){
                    inner_points++;
                }
            })
            selectCell.classList.add('checked');
            selectCell.innerText=inner_points;
            pointsObtained(inner_points, selectCell);
        }
        else if(clicked_cell%10===9){
            allPossibleSlect.add(clicked_cell-1);
            allPossibleSlect.add(clicked_cell-10);
            allPossibleSlect.add(clicked_cell-11);
            shuffledArr.map(el=>{
                if(allPossibleSlect.has(el)){
                    inner_points++;
                }
            })
            selectCell.classList.add('checked');
            selectCell.innerText=inner_points;
            pointsObtained(inner_points, selectCell);
        }
        else if(clicked_cell>0 && clicked_cell<9){
            allPossibleSlect.add(clicked_cell-1);
            allPossibleSlect.add(clicked_cell+1);
            allPossibleSlect.add(clicked_cell+9);
            allPossibleSlect.add(clicked_cell+10);
            allPossibleSlect.add(clicked_cell+11);
            shuffledArr.map(el=>{
                if(allPossibleSlect.has(el)){
                    inner_points++;
                }
            })
            selectCell.classList.add('checked');
            selectCell.innerText=inner_points;
            pointsObtained(inner_points, selectCell);
        }
        else if(clicked_cell>90 && clicked_cell<99){
            allPossibleSlect.add(clicked_cell-1);
            allPossibleSlect.add(clicked_cell+1);
            allPossibleSlect.add(clicked_cell-9);
            allPossibleSlect.add(clicked_cell-10);
            allPossibleSlect.add(clicked_cell-11);
            shuffledArr.map(el=>{
                if(allPossibleSlect.has(el)){
                    inner_points++;
                }
            })
            selectCell.classList.add('checked');
            selectCell.innerText=inner_points;
            pointsObtained(inner_points, selectCell);
        }
        else {
            allPossibleSlect.add(clicked_cell-1);
            allPossibleSlect.add(clicked_cell+1);
            allPossibleSlect.add(clicked_cell-9);
            allPossibleSlect.add(clicked_cell-10);
            allPossibleSlect.add(clicked_cell-11);
            allPossibleSlect.add(clicked_cell+9);
            allPossibleSlect.add(clicked_cell+10);
            allPossibleSlect.add(clicked_cell+11);
            shuffledArr.map(el=>{
                if(allPossibleSlect.has(el)){
                    inner_points++;
                }
            })
            selectCell.classList.add('checked');
            selectCell.innerText=inner_points;
            pointsObtained(inner_points, selectCell);
        }
        }
    })
})
function pointsObtained(point, cellReq){
    switch(point){
        case 1:
        cellReq.classList.add('one');
        break;
        case 2:
        cellReq.classList.add('two');
        break;
        case 3:
        cellReq.classList.add('three');
        break;
        case 4:
        cellReq.classList.add('four');
        break;
        default:
        break;
    }
}
let flagsUsed = 0;
let flaggedSet=new Set();
const cellArray=document.querySelectorAll('#grid div');
cellArray.forEach(el=>{
    el.addEventListener('contextmenu', (ev)=>{
        ev.preventDefault();
        if(flagsUsed>=10 || gameUp){
            return;
        }
        flaggedSet.add(ev.target.id);
        flagsUsed++;
        document.querySelector('#flagsLeft').innerText=10-flagsUsed;
        let flagCell = document.getElementById(ev.target.id);
        flagCell.innerText= "!";
        flagCell.classList.add('flag');
    })
})
let indicateBomb=0;
function flaggedAll(){
    bombArray.map(el=>{
        if(flaggedSet.has(el)){
           indicateBomb++;
        }
    })
}