    let turn = "X";
    let gameOver = false;
    const gameOverMusic = new Audio("./public/audio/gameover.mp3")
    const gameMusic = new Audio("./public/audio/music.mp3")
    const gamePk = new Audio("./public/audio/ting.mp3")

    //Switch The Turn
    let switchTurn = ()=>{
      return turn === "X"? "O":"X";
    }
    

    //Check The Winner
    let checkWin = ()=>{
      let slotText = document.getElementsByClassName('slot-text');
      
      let win = [
        [0,1,2,180,1,-5], 
        [3,4,5,180,1,-15],
        [6,7,8,180,1,-25],
        [0,3,6,90,15,11],
        [1,4,7,90,15,1],
        [2,5,8,90,15,-9],
        [0,4,8,45,11,11],
        [2,4,6,135,12,-10]
      ]

      win.forEach(e =>{
         if((slotText[e[0]].innerText === slotText[e[1]].innerText) && (slotText[e[1]].innerText === slotText[e[2]].innerText)&&(slotText[e[0]].innerText !=='')){
          gameMusic.play();
          document.querySelector(".info").innerText = slot[e[0]].innerText + " is the winner !!!";
          gameOver = true;
          document.querySelector(".img-box").getElementsByTagName("img")[0].style.width = "200px";
          document.querySelector(".line").style.transform = `rotate(${e[3]}deg) translate(${e[4]}vw, ${e[5]}vw)`
          document.querySelector(".line").style.width = "32vw";
         }
      })
    }

    //Game Logic
    let slot = document.getElementsByClassName("slot");
    Array.from(slot).map((e)=>{
      let slotText = e.querySelector('.slot-text');
      e.addEventListener("click",()=>{
        if(slotText.innerHTML === ''){
          slotText.innerHTML = turn;
          turn = switchTurn();
          gamePk.play();
          checkWin();
          if(!gameOver){
            document.querySelector(".info").innerHTML = "Turn of " + turn;
          }
        }
      })
    })

    //Reset Button
    document.querySelector(".btn-reset").addEventListener("click",()=>{
      let slotText = document.getElementsByClassName('slot-text');
      Array.from(slotText).map(e =>{
        e.innerHTML = "";
      })
      gameMusic.pause();
      document.querySelector(".img-box").getElementsByTagName("img")[0].style.width = "0px";
      turn = "X";
      document.querySelector(".info").innerHTML = "Turn of " + turn;
      gameOver = false;
      document.querySelector(".line").style.width = "0";
    })