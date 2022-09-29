{
    const tasks = [
        {
            content: "test",
            done: false
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
        document.querySelector("js-taskList").innerHTML = htmlString;
    }


    const init = () => {

    };
    render()
    init()
}