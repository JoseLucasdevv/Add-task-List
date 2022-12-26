const inputTask = document.querySelector(".input-task");
const btnAddTask = document.querySelector(".btn-add-task");
const tasks = document.querySelector(".tasks");

btnAddTask.addEventListener("click", (e) => {
  createTask();
  inputTask.value = "";
  inputTask.focus();
});

inputTask.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!inputTask.value) return;
    createTask();
    inputTask.value = "";
    inputTask.focus();
  }
});
document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("clean")) {
    el.parentElement.remove();
    saveTask();
    inputTask.focus();
  }
});

function createLi() {
  const li = document.createElement("li");
  return li;
}

function createTask() {
  if (!inputTask.value) return;
  let li = createLi();
  let btnClean = createCleanBtn();
  btnClean.innerText = "Clean";
  btnClean.setAttribute("class", "clean");
  btnClean.cl;
  li.innerHTML = inputTask.value;
  tasks.appendChild(li);
  li.appendChild(btnClean);
  saveTask();
}

function createCleanBtn() {
  const btn = document.createElement("button");
  return btn;
}

function saveTask() {
  const task = tasks.querySelectorAll("li");
  const vectorTask = [];
  for (let tasks of task) {
    vectorTask.push(tasks.innerText.replace("Apagar", "").trim());
  }
  let jsonTask = JSON.stringify(vectorTask);
  localStorage.setItem("task", jsonTask);
}
