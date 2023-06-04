{
    const tasks = [
    ]

    const addNewTask = (newTaskContent) => {
        let taskInput = document.querySelector(".js-addTask");
        taskInput.focus();
        tasks.push({
            content: newTaskContent,
        })
        taskInput.value = "";
        render()
    }

    const removeTask = (index) => {
        tasks.splice(index, 1)
        render()
    }

    const toggleDoneTasks = (index) => {
        tasks[index].done = !tasks[index].done;
        render()
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="taskList__item">
                <button class="js-done taskList__checkbox ${task.done ? " taskList__checkbox--done" : " "}">✔</button>
                <div class="${task.done ? " taskList__content--done" : " "}">${task.content} \n </div>
                <button class="js-deleteButton taskList__deleteButton">🗑
                </li>
                <hr class="taskList__hrItem">
            `
        }

        document.querySelector(".js-taskList").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-deleteButton");
        const toggleDone = document.querySelectorAll(".js-done");

        toggleDone.forEach((toggleButton, index) => {
            toggleButton.addEventListener("click", () => {
                toggleDoneTasks(index)
            })
        })

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index)
            })
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-addTask")
        const newTaskContentTrimmed = newTaskContent.value.trim()
        if (newTaskContentTrimmed === "") {
            newTaskContent.focus();
            return
        }
        addNewTask(newTaskContentTrimmed);
    };


    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init()
}