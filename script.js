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

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        })
    render()
    }
    const removeTask = (index) => {
        tasks.splice(index, 1)
        render()
    }
    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li>
                ${task.content} \n
                <button class="js-deleteButton">X</>
                </li>
            `
        }
        document.querySelector(".js-taskList").innerHTML = htmlString;
        const removeButtons = document.querySelectorAll(".js-deleteButton");
        console.log(removeButtons)
     removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
           removeTask(index)
        })
     });
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
        form.addEventListener("submit", onFormSubmit);
    };

    init()
}