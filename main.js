
let currentNum = ""
let previousNum =""
let operator = ""
// select items from DOM to manipulate 
const currentDisplayNumber = document.querySelector(".currentNumber")
const previousDisplayNumber = document.querySelector(".previousNumber")
const equal = document.querySelector(".equal")
equal.addEventListener("click", calculate)
const decimal = document.querySelector(".decimal")
const clear = document.querySelector(".clear")

const numberButtons = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")


//add window event listener to key presses
numberButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent)
    })
})

function handleNumber(number){
    if (currentNum.length <= 11){
        currentNum += number;
        currentDisplayNumber.textContent = currentNum;
    }
}
operators.forEach(btn => {
    btn.addEventListener("click", (e) => {
        handleOperators(e.target.textContent)
    })
})

function handleOperators(op){
    //" " = (/,*,-,+) so operator va a tener el signo q le pases
    operator = op;
    //" " = " "
    previousNum = currentNum;
    //pasa a previous box lo q tenia la current box 
    previousDisplayNumber.textContent = previousNum + " " + operator;
    // se resetea la current number box 
    currentNum = "";
    currentDisplayNumber.textContent = "";
    
}
//function to handle = 
function calculate (){
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);

    if (operator === "+"){
        previousNum = previousNum + currentNum;
    }
    else if (operator === "-"){
        previousNum = previousNum - currentNum;
    }
    else if (operator === "x"){
        previousNum = previousNum * currentNum;
    }
    else if (operator === "/"){
        previousNum = previousNum / currentNum;
    }
    previousDisplayNumber.textContent = "";
    currentDisplayNumber.textContent = previousNum;

}
