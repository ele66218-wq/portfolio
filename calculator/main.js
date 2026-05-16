const buttons = document.querySelectorAll("button");
const display = document.querySelector("#display");
let expression = "0";
const list = document.querySelector("#list");

buttons.forEach((button) => {
  button.addEventListener("click",()=>{
    const value = button.textContent; 
    let last = expression[expression.length - 1];
    if(value === "="){
      if (!("+-×÷.".includes(last))){
        try {
          const equation = expression;
          const tokens = tokenize(expression);
          const result = calculate(tokens);
          display.textContent = parseFloat(result.toFixed(12));
          expression = String(parseFloat(result.toFixed(12)));

          const li = document.createElement("li");
          const equal = document.createElement("span");
          const deleteButton = document.createElement("button");
          deleteButton.className = "deleteButton";
          equal.textContent = `${equation} = ${expression}`;
          deleteButton.textContent = "削除";
          deleteButton.addEventListener("click", () => {
            li.remove();
          });
          li.append(equal);
          li.append(deleteButton);
          list.appendChild(li);

        } catch (error) {
          console.log(error.message);
          display.textContent = "Error";
          expression = "0";
        }
      }
    } else if (value === "+/-") {
      if (expression[0] !== "-"){
        expression = "-" + expression;
        display.textContent = expression;
      } else {
        expression = expression.slice(1);
        display.textContent = expression;
      }
    } else if (value === "消"){
      expression = expression.slice(0,-1);
      if (expression === ""){
        expression = "0";
      }
      display.textContent = expression;
    } else if ("+-×÷".includes(value)){
      if (!("+-×÷.".includes(last))){
        expression += value;
        display.textContent = expression;
      }
    } else if (value === "%"){
      if (!("+-×÷.%".includes(last))){
      expression += value;
        display.textContent = expression;
      }
    } else if (value === "AC"){
      expression = "0";
      display.textContent = expression
    } else if (value === ".") {
      const parts = expression.split(/[+\-×÷]/);
      const currentNumber = parts[parts.length - 1];

      if (!(currentNumber.includes(".") || "+-×÷%".includes(last))){
        expression += value;
        display.textContent = expression;
      }
    } else {
      if (expression === "0"){
        expression = "";
      }
      expression += value;
      display.textContent = expression;
    }
  });
});

