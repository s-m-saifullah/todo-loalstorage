const getElement = (id) => {
  const element = document.getElementById(id);
  return element;
};

const handleSubmit = () => {
  const inputText = getElement("todo-text").value;
  const todoList = localStorage.getItem("TODOS");
  let countId = parseInt(localStorage.getItem("ID"));

  if (!countId) {
    countId = 1;
    localStorage.setItem("ID", countId);
  } else {
    countId++;
    localStorage.setItem("ID", countId);
  }

  if (inputText) {
    if (!todoList) {
      const todos = [
        {
          id: countId,
          title: inputText,
          completed: false,
        },
      ];

      localStorage.setItem("TODOS", JSON.stringify(todos));
    } else {
      let todos = JSON.parse(localStorage.getItem("TODOS"));
      todos = [
        ...todos,
        {
          id: countId,
          title: inputText,
          completed: false,
        },
      ];
      localStorage.setItem("TODOS", JSON.stringify(todos));
    }
  } else {
    alert("You haven't write anything");
  }

  getElement("todo-text").value = "";

  render();
};

const render = () => {
  const todos = JSON.parse(localStorage.getItem("TODOS"));
  const todosUI = getElement("todo-list");
  todosUI.textContent = "";

  if (!todos) {
    todosUI.classList.add("text-center");
    todosUI.innerText = "No Task Found";
  } else {
    todos.forEach((item) => {
      if (item.completed === false) {
        const li = document.createElement("li");
        li.classList.add("py-3");
        li.classList.add("flex");
        li.classList.add("justify-between");
        li.innerHTML = `
      <p>${item.title}</p>
      <button onclick="deleteItem(${item.id})" class="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      `;
        todosUI.appendChild(li);
      }
    });
  }
};

const handleClearAll = () => {
  localStorage.removeItem("TODOS");
  localStorage.removeItem("ID");
  render();
};

const deleteItem = (id) => {
  let todos = JSON.parse(localStorage.getItem("TODOS"));
  completedItem = todos.find((item) => item.id === id);
  const indexofCompletedItem = todos.indexOf(completedItem);

  todos.splice(indexofCompletedItem, 1);

  completedItem.completed = true;
  todos = [...todos, completedItem];
  localStorage.setItem("TODOS", JSON.stringify(todos));

  const todosUI = getElement("todo-list");
  render();

  if (todosUI.innerHTML === "") {
    todosUI.classList.add("text-center");
    todosUI.innerText = "No Task Found";
  }
};

render();
