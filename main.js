
let currentNum = ""
let previousNum =""
let operator = ""
// select items from DOM to manipulate 
const currentDisplayNumber = document.querySelector(".currentNumber")
const previousDisplayNumber = document.querySelector(".previousNumber")
window.addEventListener("keydown", handleKeyPress)

const equal = document.querySelector(".equal");
equal.addEventListener("click", ()=> {
    if (currentNum != "" && previousNum != ""){
        calculate();
    }
})

const decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
    addDecimal();
} )
const clear = document.querySelector(".clear")
clear.addEventListener('click', clearCalculator);

const numberButtons = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")


//add window event listener to key presses
numberButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
        handleNumber(e.target.textContent)
    })
})

function handleNumber(number){
    if (previousNum !== "" && currentNum !== "" && operator === ""){
        previousNum = ""
        currentDisplayNumber.textContent = currentNum;
    }
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
    if (previousNum === ""){
        previousNum = currentNum;
        operatorCheck(op);
    }else if (currentNum === ""){
        operatorCheck(op)
    }else {
        calculate();
        operator = op;
        currentDisplayNumber.textContent = "0"
        previousDisplayNumber.textContent = previousNum + " " + operator;
    }
    
}
function operatorCheck(text){
    operator = text;
    previousDisplayNumber.textContent = previousNum + " " + operator;
    currentDisplayNumber.textContent = "0";
    currentNum = "";
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
        if (currentNum <= 0){
            previousNum = "Error";
            displayResult();
            return;
        }
        previousNum = previousNum / currentNum;
    }
    previousNum = roundNumber(previousNum);
    previousNum = previousNum.toString();
    displayResult();
}

function roundNumber(num){
    return Math.round(num * 1000000) / 1000000;
}

function displayResult(){
    
    if (previousNum.length<=11){
        currentDisplayNumber.textContent = previousNum;
    }
    else {
        currentDisplayNumber.textContent = previousNum.slice(0,11) + "...";
    }
    previousDisplayNumber.textContent= "";
    operator = "";
    currentNum = "";
}
function clearCalculator(){
    currentNum = ""
    previousNum = ""
    operator = ""
    currentDisplayNumber.textContent = "0"
    previousDisplayNumber.textContent=""
}
function addDecimal (){
    if(!currentNum.includes(".")){
        currentNum += ".";
        currentDisplayNumber.textContent = currentNum;
    }

}
function handleKeyPress(e){
    e.preventDefault();
    if (e.key >= 0 && e.key <= 9){
        handleNumber(e.key);
    }
    if (e.key === "Enter" || 
    (e.key === "=" && currentNum != "" &&  previousNum != "")){
        calculate();
    }
    if (e.key === "+" || e.key === "-" || e.key === "/"){
        handleOperators(e.key);
    }
    if (e.key === "*"){
        handleOperators("x")
    }
    if (e.key === "."){
        addDecimal();
    }
    if (e.key === "Backspace"){
        handleDelete();
    }
}

function handleDelete(){
    if (currentNum != ""){
        currentNum = currentNum.slice(0,-1);
        currentDisplayNumber.textContent = currentNum;
        if(currentNum === ""){
            currentDisplayNumber.textContent = "0";
        }
    }
    if (currentNum === "" && previousNum !== "" && operator === ""){
        previousNum = previousNum.slice(0,-1);
        currentDisplayNumber.textContent = previousNum;
    }
}