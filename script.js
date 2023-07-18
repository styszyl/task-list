{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];
    render();
  };

  const removeTask = (index) => {
    tasks = [...tasks.filter((task, i) => i != index)];
    render();
  };

  const toggleDoneTasks = (index) => {
    tasks = tasks.map((task, i) => {
      return i == index ? { ...task, done: !task.done } : task;
    });
    render();
  };

  const bindEvents = () => {
    const toggleDone = document.querySelectorAll(".js-done");
    toggleDone.forEach((toggleButton, index) => {
      toggleButton.addEventListener("click", () => {
        toggleDoneTasks(index);
      });
    });

    const removeButtons = document.querySelectorAll(".js-deleteButton");
    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };

  const markDoneAllTasks = () => {
    tasks = tasks.map((task) => {
      return { ...task, done: true };
    });
    render();
  };

  const bindButtonsEvents = () => {
    const markDoneAllTasksButton = document.querySelector(
      ".markAllDoneTasksButton"
    );
    if (markDoneAllTasksButton != null) {
      markDoneAllTasksButton.addEventListener("click", () => {
        markDoneAllTasks();
      });
    }
  };

  const isTaskDone = (task) => (task.done ? true : false);

  const isEveryTaskDone = () => {
    const markDoneAllTasksButton = document.querySelector(
      ".markAllDoneTasksButton"
    );
    if (markDoneAllTasksButton != null) {
      if (tasks.every((task) => isTaskDone(task))) {
        markDoneAllTasksButton.toggleAttribute("disabled");
      }
    }
  };

  const togglehideDoneTasksStatus = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const togglehideDoneTasks = () => {
    for (const task of tasks) {
      if (task.done) {
        const doneTask = document.querySelectorAll(".taskList__content--done");
        console.log(doneTask);
        doneTask.forEach(element => {
          element.classList.toggle("hidden")
        })
      }
    }
    render();
  }

  const hideAllDoneTasks = () => {
    const hideDoneTasksButton = document.querySelector(".hideDoneTasksButton");
    hideDoneTasksButton != null ? hideDoneTasksButton.addEventListener("click", () => {console.log("Odpalam togglehideDoneTasks "), togglehideDoneTasks(), togglehideDoneTasksStatus() }) : renderButtons();
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
                <li class="taskList__item">
                    <button class="js-done taskList__checkbox taskList__checkbox--green ${
                      task.done ? " taskList__checkbox--greenDone" : " "
                    }">✔</button>
                    <div class="taskList__content ${
                      task.done ? " taskList__content--done" : " "
                    }">${task.content} \n </div>
                    <button class="js-deleteButton taskList__checkbox taskList__checkbox--deleteButton">🗑</button>
                </li>
            `;
    }
    document.querySelector(".js-taskList").innerHTML = htmlString;
  };

  const renderButtons = () => {
    let buttonsHTML = " ";

    if (tasks.length >= 1) {
      buttonsHTML += ` 
      <button class="tasklistButton hideDoneTasksButton">${
        hideDoneTasks ? "Odkryj ukończone" : "Ukryj ukończone"
      }</button>
      <button class="tasklistButton markAllDoneTasksButton">Ukończ wszystkie</button>
    `;
    }
    document.querySelector(".js-tasklistButtons").innerHTML = buttonsHTML;
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindEvents();
    bindButtonsEvents();
    isEveryTaskDone();
    hideAllDoneTasks();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    const newTaskContent = document.querySelector(".js-addTask");
    const newTaskContentTrimmed = newTaskContent.value.trim();
    if (newTaskContentTrimmed === "") {
      newTaskContent.focus();
      return;
    }
    addNewTask(newTaskContentTrimmed);
    newTaskContent.value = "";
    newTaskContent.focus();
  };

  const init = () => {
    render();
    const form = document.querySelector(".js-form");
    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
