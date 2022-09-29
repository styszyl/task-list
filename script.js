{
    const tasks = [
        {
            content: "test",
            done: false
        },
        {
            content: "test-zrobione",
            done: true
        },
    ]

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li>
                ${task.content}
                </li>
            `
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;
    }

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        })
    render()
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-addTask").value.trim()
        if (newTaskContent === "") {
            return
        }
        addNewTask(newTaskContent);
    };


    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit)
    };

    init()
}