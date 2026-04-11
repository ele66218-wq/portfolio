const input = document.querySelector("#taskInput");
const button = document.querySelector("#myButton");
const list = document.querySelector("#taskList");

button.addEventListener("click",()=>{
    const text = input.value;

    const li = document.createElement("li");
    li.textContent = text;

    list.appendChild(li);
});