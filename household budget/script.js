const pages = {
    entry: document.querySelector("#entryPage"),
    calendar: document.querySelector("#calendarPage"),
    reports: document.querySelector("#reportsPage"),
    budget: document.querySelector("#budgetPage"),
    settings: document.querySelector("#settingsPage")
};

function showPage(pageName) {
  for (let key in pages) {
    pages[key].style.display = "none";
  }
  pages[pageName].style.display = "block";
}

document.querySelector("#entryBtn").addEventListener("click",() => {
  showPage("entry");
});
document.querySelector("#calendarBtn").addEventListener("click",() => {
  showPage("calendar");
});
document.querySelector("#reportsBtn").addEventListener("click",() => {
  showPage("reports");
});
document.querySelector("#budgetBtn").addEventListener("click",() => {
  showPage("budget");
});
document.querySelector("#settingsBtn").addEventListener("click",() => {
  showPage("settings");
});

const entryBudget = document.querySelector("#entryBudget");
const money = document.querySelector("#money");
const list = document.querySelector("#list");
const date = document.querySelector("#date");

entryBudget.addEventListener("click",() => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="left">${select} ${money.value}円</span>
    <span class="rigjt">${date.value}</span>
  `;
  list.appendChild(li);
  alert("記録が追加されました。");
});

let select = ""
const categoryBtns = document.querySelectorAll("#categoryBtns button");
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    select = btn.textContent;
    categoryBtns.forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  });
});