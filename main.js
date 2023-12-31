
// Block Puzzle Game Functionality

let block = [
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0],
              [0, 0, 0, 0, 0, 0]
            ];
let button = "up";
let grabbedBlock = 0;
let reservedBlockNumber = 0;
let moves = 0;
let time = 0;

function startGame() {
    time = 0;
    setInterval(function() {
        time++;
    }, 1000);
    document.querySelector(".starter").style.opacity = "0";
    document.querySelectorAll(".place").forEach(element => {
        element.style.display = "block";
    });
}

function randomSeries() {

    block = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
            ];


    stick1 = 0;
    stick2 = 0;
    stick3 = 0;
    
    for(let i = 1; i <= 6; i++) {
        let random = Math.floor(Math.random() * 3);
        if(random == 1) {
            block[random][stick1] = i;
            stick1++;
        } else if(random == 2) {
            block[random][stick2] = i;
            stick2++;
        } else {
            block[random][stick3] = i;
            stick3++;
        }
    }
}

function refreshBlock() {

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 6; j++) {
            let series = document.querySelector("#stick"+(i+1)+"-block"+(j+1));
            switch(block[i][j]) {
                case 0 : {
                    series.className = "block0";
                } break;
                case 1 : {
                    series.className = "block1";
                } break;
                case 2 : {
                    series.className = "block2";
                } break;
                case 3 : {
                    series.className = "block3";
                } break;
                case 4 : {
                    series.className = "block4";
                } break;
                case 5 : {
                    series.className = "block5";
                } break;
                case 6 : {
                    series.className = "block6";
                } break;
            }
        }
    }
}

function refreshDisplay() {

    let display = ["", "", ""];

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 6; j++) {
            if(block[i][j] != 0) {
                display[i] = display[i] + block[i][j] + " ";
            }
        }
    }

    for(let i = 0; i < 3; i++) {
        let show = document.querySelector(".display"+(i+1));
        display[i] = display[i].substring(0, display[i].length-1);
        show.innerHTML = display[i];
        if(display[i] == "1 2 3 4 5 6") {
            document.querySelector(".starter").style.opacity = "1";
            document.querySelector(".starter").innerHTML = "Moves : "+moves+"\nTime : "+time+"s";
            document.querySelector(".display"+(i+1)).style.backgroundColor = "#00ff0090";
        }
    }

    button = "up";

}

function grabUp(stickNumber, blockPosition, blockNumber) {

    console.log(stickNumber+" - "+blockPosition+" - "+blockNumber);
    block[stickNumber][blockPosition-1] = 0;
    reservedBlockNumber = blockNumber;
    refreshBlock();
    refreshDisplay();

    
    document.querySelector(".float"+(stickNumber+1)).className = "float"+(stickNumber+1)+" block"+blockNumber;
    document.querySelector(".place"+(stickNumber+1)).style.boxShadow = "inset 0px 0px 10px 5px #00000050";
    document.querySelector(".place1 a").className = "fa-solid fa-angles-down";
    document.querySelector(".place2 a").className = "fa-solid fa-angles-down";
    document.querySelector(".place3 a").className = "fa-solid fa-angles-down";
}

function grabDown(stickNumber, blockPosition, blockNumber) {

    console.log(stickNumber+" - "+blockPosition+" - "+blockNumber);
    block[stickNumber][blockPosition] = blockNumber;
    moves++;
    refreshBlock();
    refreshDisplay();

    document.querySelector(".float1").className = "float float1";
    document.querySelector(".float2").className = "float float2";
    document.querySelector(".float3").className = "float float3";
    document.querySelector(".place1").style.boxShadow = "0px 0px 10px 2px #00000050";
    document.querySelector(".place2").style.boxShadow = "0px 0px 10px 2px #00000050";
    document.querySelector(".place3").style.boxShadow = "0px 0px 10px 2px #00000050";
    document.querySelector(".place1 a").className = "fa-solid fa-angles-up";
    document.querySelector(".place2 a").className = "fa-solid fa-angles-up";
    document.querySelector(".place3 a").className = "fa-solid fa-angles-up";
    
}

document.querySelector(".starter").addEventListener(
    "click",
    function() {
        startGame();
    }
);

document.querySelector(".loader").addEventListener(
    "click",
    function() {
        document.querySelector(".starter").style.opacity = "1";
        document.querySelector(".starter").innerHTML = "START";
        document.querySelector(".starter").style.fontSize = "40px";
        document.querySelectorAll(".place").forEach(element => {
            element.style.display = "none";
        });
        randomSeries();
        refreshBlock();
        refreshDisplay();
    }
);

document.querySelectorAll(".place").forEach(element => {
        element.addEventListener(
        "click",
        function() {

            let blockNumber = 0;
            let blockPosition = 0;
            let stickNumber = element.className.substring(element.className.length-1, element.className.length)
            stickNumber--;

            for(let j = 5; j > -1; j--) {
                if(block[stickNumber][j] != 0) {
                    blockNumber = block[stickNumber][j];
                    blockPosition = j + 1;
                    break;
                }
            }

            if(button == "up") {
                if(blockPosition != 0) {
                    grabUp(stickNumber, blockPosition, blockNumber);
                    button = "down";
                }
            } else if(button == "down") {
                grabDown(stickNumber, blockPosition, reservedBlockNumber);
                button = "up";
            }
        }
    )}
);

randomSeries();
refreshBlock();
refreshDisplay();
