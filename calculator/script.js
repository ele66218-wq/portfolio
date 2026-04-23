const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");
let expression = "";
function tokenize(expression){
  let tokens = []; //tokensは[23,"+",9]が具体例
  let currentNumber = "";
  if (expression[0] === "-"){
    expression = "0" + expression;
  }
  for(let char of expression){ 
    if("0123456789.%".includes(char)){
      currentNumber += char;
    } else if("+-×÷".includes(char)) {
      if(currentNumber === ""){
        throw new Error("数字がありません");
      } else {
      tokens.push(Number(currentNumber));
      tokens.push(char);
      currentNumber = "";
      }
    } else {
      throw new Error("使えない文字です");
    }
    if (char === "%"){
      if (currentNumber === "%"){
        throw new Error("エラー");
      }
      currentNumber = currentNumber.slice(0,-1);
      currentNumber = String(0.01*Number(currentNumber));
    }
  }
  if(currentNumber !== ""){
    tokens.push(Number(currentNumber));
  }
  return tokens;
}
function calculate(tokens){
  let temp = [tokens[0]];
  for(let i = 1; i < tokens.length; i += 2){
    let op = tokens[i];
    let num = tokens[i + 1];
    if(op === "×"){
      temp[temp.length - 1] *= num;
    } else if(op === "÷"){
      temp[temp.length - 1] /= num;
    } else {
      temp.push(op);
      temp.push(num);
    }
  }

  let result = temp[0];

  for(let i = 1; i < temp.length; i += 2){
    let op = temp[i];
    let num = temp[i + 1];
    if (op === "+") {
      result += num;
    } else if (op === "-") {
      result -= num;
    }
  }
  return result;
}
buttons.forEach((button) => {
  button.addEventListener("click",()=>{
    const value = button.textContent;
    if(value === "="){
      try {
        const tokens = tokenize(expression);
        const result = calculate(tokens);
        display.textContent = result;
        expression = String(result);
      } catch {
        display.textContent = "Error";
        expression = "";
      }
    } else if (value === "+/-") {
      expression = "-" + expression;
      display.textContent = expression;
    } else if (value === "消"){
      expression = expression.slice(0,-1);
      if (expression === ""){
        expression = "0";
      }
      display.textContent = expression;
    } else if ("+-×÷%.".includes(value)){
      expression += value;
      display.textContent = expression;
    } else {
      if (expression === "0"){
        expression = "";
      }
      expression += value;
      display.textContent = expression;
    }
  });
});
