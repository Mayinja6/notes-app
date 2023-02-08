let ADD_TODO_BTN_EL = document.querySelector("[data-add_todo_btn]"),
  TODOS_LIST_EL = document.querySelector("[data-todos_list]"),
  TODO_TEMPLATE_EL = document.querySelector("[data-todo_templates]");

document.addEventListener("DOMContentLoaded", onFilterEmptyOnLoad);
ADD_TODO_BTN_EL.addEventListener("click", addABoilerTodo);

function loadTodosIntoUI() {
  let theTodos = JSON.parse(localStorage.getItem("todos"));

  if (!theTodos || theTodos.length <= 0) {
    let emptyTodosUI = TODO_TEMPLATE_EL.content.cloneNode(true).children[0];
    return TODOS_LIST_EL.append(emptyTodosUI);
  }

  theTodos.sort((a, b) => (a.completed ? 1 : -1));

  TODOS_LIST_EL.innerHTML = "";
  for (let i = 0; i < theTodos.length; i++) {
    let todo = theTodos[i];
    let TodoEl = TODO_TEMPLATE_EL.content.cloneNode(true).children[1];

    let TodoCompleted = TodoEl.querySelector(".todo_completed");
    let TodoText = TodoEl.querySelector(".todo_text");
    TodoCompleted.checked = todo.completed;
    TodoText.value = todo.todo;

    TodoText.addEventListener("change", saveTodosToLS);
    TodoCompleted.addEventListener("click", saveTodosToLS);

    TODOS_LIST_EL.append(TodoEl);
  }
}

function saveTodosToLS() {
  let theTodosInfo = TODOS_LIST_EL.querySelectorAll("li");

  let theNewTodosArray = [];
  for (let i = 0; i < theTodosInfo.length; i++) {
    const newTodo = theTodosInfo[i];
    theNewTodosArray.push({
      todo: newTodo.querySelector(".todo_text").value,
      completed: newTodo.querySelector(".todo_completed").checked,
    });
  }

  localStorage.setItem("todos", JSON.stringify(theNewTodosArray));

  return loadTodosIntoUI();
}

function addABoilerTodo() {
  let TodoEl = TODO_TEMPLATE_EL.content.cloneNode(true).children[1];
  TODOS_LIST_EL.append(TodoEl);
  saveTodosToLS();
  loadTodosIntoUI();
}

function onFilterEmptyOnLoad() {
  let theTodos = JSON.parse(localStorage.getItem("todos"));

  if (!theTodos || theTodos.length <= 0) {
    let emptyTodosUI = TODO_TEMPLATE_EL.content.cloneNode(true).children[0];
    return TODOS_LIST_EL.append(emptyTodosUI);
  }

  localStorage.setItem(
    "todos",
    JSON.stringify(theTodos.filter((todo) => todo.todo.length > 0))
  );

  loadTodosIntoUI();
}
