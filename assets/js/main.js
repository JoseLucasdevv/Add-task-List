const inputTask = document.querySelector(".input-task");
const btnAddTask = document.querySelector(".btn-add-task");
const tasks = document.querySelector(".tasks");

btnAddTask.addEventListener("click", (e) => {
  const inputValue = inputTask.value;
  console.log(inputValue);
  createTask(inputValue);
  inputTask.value = "";
  inputTask.focus();
});

inputTask.addEventListener("keypress", (e) => {
  const inputValue = inputTask.value;
  if (e.keyCode === 13) {
    if (!inputTask.value) return;
    createTask(inputValue);
    inputTask.value = " ";
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

function createTask(inputValue) {
  if (!inputValue) return;
  li = createLi();
  let btnClean = createCleanBtn();
  btnClean.innerText = "Clean";
  btnClean.setAttribute("class", "clean");
  li.innerHTML = inputValue;
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
    vectorTask.push(tasks.innerText.replace("Clean", "").trim());
  }
  const jsonTask = JSON.stringify(vectorTask);
  localStorage.setItem("task", jsonTask);
}

function getTask() {
  const task = localStorage.getItem("task");
  const listOfTask = JSON.parse(task);
  for (let tasks of listOfTask) {
    createTask(tasks);
  }
}
getTask();
