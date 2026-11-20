// Practice To-Do: a small app with no libraries and no build step.
// Tasks are saved in the browser (localStorage), so they survive a refresh.

const STORAGE_KEY = "practice-todo-tasks";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const countLabel = document.getElementById("count");
const clearDoneButton = document.getElementById("clear-done");

let tasks = loadTasks();

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function addTask(text) {
  tasks.push({ id: Date.now(), text: text, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
    render();
  }
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

function clearFinished() {
  tasks = tasks.filter((t) => !t.done);
  saveTasks();
  render();
}

function render() {
  list.innerHTML = "";

  tasks.forEach((task) => {
    const item = document.createElement("li");
    if (task.done) item.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark finished: " + task.text);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const label = document.createElement("span");
    label.textContent = task.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => deleteTask(task.id));

    item.append(checkbox, label, remove);
    list.append(item);
  });

  const remaining = tasks.filter((t) => !t.done).length;
  countLabel.textContent = remaining + (remaining === 1 ? " task left" : " tasks left");
  emptyMessage.hidden = tasks.length > 0;
  clearDoneButton.disabled = !tasks.some((t) => t.done);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text) {
    addTask(text);
    input.value = "";
    input.focus();
  }
});

clearDoneButton.addEventListener("click", clearFinished);

// Apply the values from settings.js
document.title = APP_NAME;
document.getElementById("app-title").textContent = APP_NAME;
document.getElementById("app-subtitle").textContent = APP_SUBTITLE;

render();
