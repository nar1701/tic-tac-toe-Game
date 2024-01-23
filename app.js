var boxes = document.querySelectorAll(".box");
var resetBtn=document.querySelector("#reset-btn");
var newGameBtn=document.querySelector("#new-game-btn");
var msgContainer=document.querySelector(".msg-container");
var msg=document.querySelector("#msg");


var turnO=true; //playerX ->false playerO ->true;
var pressedButtonCount=0;
var winnerFound=false;
const winningPatterns=[
     [0,1,2],
     [0,3,6],
     [0,4,8],
     [1,4,7],
     [2,5,8],
     [2,4,6],
     [3,4,5],
     [6,7,8],
];
boxes.forEach((box)=>{
     box.addEventListener("click",()=>{
        if(turnO){
          box.innerHTML="O";
          turnO=!turnO;
        }else {
          box.innerHTML="X";
          turnO=!turnO;
        }
        box.disabled=true;
        pressedButtonCount++;
        let isWinner = checkWinner();
        if(pressedButtonCount === 9 && !isWinner){
          gameDraw();
        }
     })
});
const gameDraw = ()=>{
     msg.innerHTML = "Game was a draw";
     msgContainer.classList.remove("hide");
     disableBtns();
}
 const showWinner = (winner)=>{
     msg.innerHTML=`Congratulations,Winner is ${winner}`;
     msgContainer.classList.remove("hide");

}
const checkWinner = () =>{
     // traversing the winningPattern 
     for(let pattern of winningPatterns){
          let pos1val=boxes[pattern[0]].innerHTML;
          let pos2val=boxes[pattern[1]].innerHTML;
          let pos3val=boxes[pattern[2]].innerHTML;
          if(pos1val != "" && pos2val != "" && pos3val != ""){
               if(pos1val===pos2val && pos2val===pos3val){
                    showWinner(pos1val);
                    return true;
               }
          }

     }
}
const disableBtns = ()=>{
     for(box of boxes){
          box.disabled=true;
     }
}
const enableBtns=()=>{
     for(box of boxes){
          box.disabled=false;
          box.innerHTML="";
     }
}
const resetGame=()=>{
      turnO=true;
      enableBtns();
      msgContainer.classList.add("hide");
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
