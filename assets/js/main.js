const inputTask = document.querySelector(".input-task");
const btnAddTask = document.querySelector(".btn-add-task");
const tasks = document.querySelector(".tasks");
const container = document.querySelector(".p");

btnAddTask.addEventListener("click", (e) => {
  const inputValue = inputTask.value;
  createTask(inputValue);
  inputTask.value = "";
  inputTask.focus();
});

inputTask.addEventListener("keypress", (e) => {
  const inputValue = inputTask.value;
  if (e.keyCode === 13) {
    if (!inputTask.value) return;
    createTask(inputValue);
    inputTask.value = "";
    inputTask.focus();
  }
});
document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("Done")) {
    if (el.parentElement.style.textDecoration === "none") {
      el.parentElement.style.textDecoration = "line-through";
      el.parentElement.style.color = "red";
    } else {
      el.parentElement.style.textDecoration = "none";
      el.parentElement.style.color = "initial";
    }

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
function createSpan() {
  const span = document.createElement("span");
  return span;
}

function createTask(inputValue) {
  const spanExist = container.querySelector(".errorLength");
  if (spanExist) {
    container.removeChild(container.lastElementChild);
  }
  if (!inputValue) return;
  if (inputValue.length > 50) {
    const span = createSpan();
    span.innerText = "minimo de 50 caracteres";
    span.setAttribute("class", "errorLength");
    container.appendChild(span);
    return;
  }
  if (inputValue.startsWith(" ")) return;

  li = createLi();
  let btnClean = createBtn();
  let btnValid = createBtn();

  btnClean.innerHTML = "Clean";
  btnClean.setAttribute("class", "clean");
  btnValid.innerHTML = "Done";
  btnValid.setAttribute("class", "Done");
  li.setAttribute("class", "styleLi");
  li.style.textDecoration = "none";
  li.innerText = inputValue;
  tasks.appendChild(li);

  li.appendChild(btnValid);
  li.appendChild(btnClean);
  saveTask();
}

function createBtn() {
  const btn = document.createElement("button");
  return btn;
}

function saveTask() {
  const task = tasks.querySelectorAll("li");
  const vectorTask = [];
  for (let tasks of task) {
    vectorTask.push(tasks.innerText.replace("DoneClean", "").trim());
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
