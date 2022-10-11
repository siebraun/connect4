//declare global variables
const td = document.querySelectorAll("td");
const chip = document.querySelector(".chip");

//add listeners to every cell
for (let i = 0; i < td.length; i++) {
  //listener responsible for moving chip over column then darken column
  td[i].addEventListener("mouseover", selectColumn);
  //listener responsible for dropping chip
  td[i].addEventListener("click", dropChip);
  //listener responsible for checking for win
}

//declare selectColumn function
function selectColumn() {
  //call function to position chip over column
  displayChipAtTop(this);
  //grab current column and store it in variable

  //declare displayChipAtTop function
  function displayChipAtTop(cell) {
    //switch position given column
    switch (cell.className) {
      case "column-1":
        chip.style.left = "328px";
        break;
      case "column-2":
        chip.style.left = "425px";
        break;
      case "column-3":
        chip.style.left = "524px";
        break;
      case "column-4":
        chip.style.left = "627px";
        break;
      case "column-5":
        chip.style.left = "728px";
        break;
      case "column-6":
        chip.style.left = "826px";
        break;
      case "column-7":
        chip.style.left = "928px";
        break;
    }
  }
}

//declare dropChip function
function dropChip() {
  //create new chip to drop
  let placedChip = document.createElement("div");

  //create var to hold the amount of spots open in the column
  let spotsOpen = 0;

  //put chip together
  placedChip.classList.add("placed-chip");

  //call place chip funcion and pass it the current td
  placeChip(this);

  //call function to change chip
  changeChip();

  //declare placeChip function
  function placeChip(cell) {
    //grab current column
    let currentColumn = cell.className;
    //create array to hold each td with the currentColumn
    let filterArray = [];

    //loop through all td's
    for (let i = 0; i < td.length; i++) {
      //if td has column add td to filterArray
      if (td[i].classList.contains(currentColumn)) {
        filterArray.push(td[i]);
      }
    }
    //loop through filterArray
    for (let i = 0; i < filterArray.length; i++) {
      //create boolean var to see if td in filterArray already has chip
      let hasChip = filterArray[i].hasChildNodes();
      //if cell doesn't have div.chip then placeChip
      if (!hasChip) {
        //place chip
        //if the td below td[i] is empty, chip will be blessed in that td
        filterArray[i].appendChild(placedChip);
        // increase spotsOpen
        spotsOpen++;
      }
    }
  }

  //declare changeChip function
  function changeChip() {
    //if chip isn't yellow then chip is now yellow
    if (!chip.classList.contains("yellow")) {
      chip.classList.add("yellow");
      placedChip.classList.remove("yellow");
    }
    //else it's red
    else {
      chip.classList.remove("yellow");
      placedChip.classList.add("yellow");
    }
  }
}

//declare checkBoard function
function checkBoard() {
  //make array variable to to store every possible win combo
  const winCombos = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 7, 25, 33],
    [8, 16, 24, 32],
    [11, 7, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ];

  //now take the 4 combo values & plug them into the game board values
  for (let i = 0; i < winCombos.length; i++) {
    const i1 = td[winCombos[i][0]];
    const i2 = td[winCombos[i][1]];
    const i3 = td[winCombos[i][2]];
    const i4 = td[winCombos[i][3]];
    //now check to see if all 4 spots have a chip
    if (
      i1.hasChildNodes() === true &&
      i2.hasChildNodes() === true &&
      i3.hasChildNodes() === true &&
      i4.hasChildNodes() === true
    ) {
      //if they do now check those chips to see if they all have the class of yellow
      if (
        i1.firstChild.classList.contains("yellow") &&
        i2.firstChild.classList.contains("yellow") &&
        i3.firstChild.classList.contains("yellow") &&
        i4.firstChild.classList.contains("yellow")
      ) {
        //if they do yellow is passed as the winner as well as the chip positions
        gameOver("yellow");
      }
      //now check to see if none of them have  the yellow class
      else if (
        !i1.firstChild.classList.contains("yellow") &&
        !i2.firstChild.classList.contains("yellow") &&
        !i3.firstChild.classList.contains("yellow") &&
        !i4.firstChild.classList.contains("yellow")
      ) {
        //if they don't red is passed as the winner as well as the chip positions
        gameOver("red");
      }
    }
  }

  //delcare gameOver function
  function gameOver(winner) {}
  //declare display function
  console.log(winner);
}
