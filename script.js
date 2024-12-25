const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");

const getTodoListsFromLocal = () => {
  return JSON.parse(localStorage.getItem("TodoItems"));
};

const addEventListLocalStorage = (localTodoLists) => {
  return localStorage.setItem("TodoItems", JSON.stringify(localTodoLists));
};

let localTodoLists = getTodoListsFromLocal() || [];

const addTodoDynamicElement = (curElem) => {
  const divElemnt = document.createElement("div");
  divElemnt.classList.add("main_todo_div");
  divElemnt.innerHTML = `<li>${curElem}</li><button class="deleteBtn">Delete</button>`;
  mainTodoElem.append(divElemnt);
};

const addTodoList = (e) => {
  e.preventDefault();
  const todoListValue = inputValue.value.trim();
  inputValue.value = "";
  if (todoListValue != "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    localStorage.setItem("TodoItems", JSON.stringify(localTodoLists));

    addTodoDynamicElement(todoListValue);
  }
};
const showTodoList = () => {
  localTodoLists.forEach((curElem) => {
    addTodoDynamicElement(curElem);
  });
};

showTodoList();

const removeTodoElem = (e) => {
  const todoToRemove = e.target;
  let todoListContent = todoToRemove.previousElementSibling.innerText;
  // console.log(todoListContent);

  let parentElem = todoToRemove.parentElement;

  localTodoLists = localTodoLists.filter((curTOdo) => {
    return curTOdo != todoListContent.toLowerCase();
  });
  addEventListLocalStorage(localTodoLists);
  parentElem.remove();
};

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("deleteBtn")) {
    removeTodoElem(e);
  }
});
