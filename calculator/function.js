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