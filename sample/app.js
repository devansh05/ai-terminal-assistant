const form = document.getElementById("form");
const input = document.getElementById("input");
const list = document.getElementById("list");
const empty = document.getElementById("empty");

let todos = JSON.parse(localStorage.getItem("todos") || "[]");

function save() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      save();
      render();
    });

    const text = document.createElement("span");
    text.textContent = todo.text;

    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "×";
    del.setAttribute("aria-label", "Delete");
    del.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      save();
      render();
    });

    li.append(checkbox, text, del);
    list.appendChild(li);
  });
  empty.style.display = todos.length ? "none" : "block";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false });
  input.value = "";
  save();
  render();
});

render();
