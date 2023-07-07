{
    let tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            {content: newTaskContent, done: false}
        ]
        // tasks.push({
        //     content: newTaskContent,
        // });
        render();
    }

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    }

    const toggleDoneTasks = (index) => {
        tasks[index].done = !tasks[index].done;
        render();
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="taskList__item">
                    <button class="js-done taskList__checkbox taskList__checkbox--green ${task.done ? " taskList__checkbox--greenDone" : " "}">✔</button>
                    <div class="taskList__content ${task.done ? " taskList__content--done" : " "}">${task.content} \n </div>
                    <button class="js-deleteButton taskList__checkbox taskList__checkbox--deleteButton">🗑</button>
                </li>
            `;
        };

        document.querySelector(".js-taskList").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-deleteButton");
        const toggleDone = document.querySelectorAll(".js-done");

        toggleDone.forEach((toggleButton, index) => {
            toggleButton.addEventListener("click", () => {
                toggleDoneTasks(index);
            })
        });

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
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