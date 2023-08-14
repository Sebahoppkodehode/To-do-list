document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  const taskList = document.getElementById("taskList");

  let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    createTaskElement(task);
  });

  addBtn.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText.length >= 3) {
      const newTask = { text: capitalizeFirstLetter(taskText), id: Date.now() };
      savedTasks.push(newTask);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
      createTaskElement(newTask);
      taskInput.value = "";
    }
  }

  function createTaskElement(task) {
    const li = document.createElement("li");
    li.innerHTML = `
            <span>${task.text}</span>
            <button data-id="${task.id}">Remove</button>
        `;
    taskList.appendChild(li);
    const removeBtn = li.querySelector("button");
    removeBtn.addEventListener("click", function () {
      const taskId = parseInt(this.getAttribute("data-id"));
      savedTasks = savedTasks.filter((task) => task.id !== taskId);
      localStorage.setItem("tasks", JSON.stringify(savedTasks));
      li.remove();
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
