let tasks = []

function addTask(task) {

    tasks.push({ text: task, completed: false })
    renderTasks()


}

function deleteTask(index) {
    tasks.splice(index, 1)
    renderTasks()
}


function toggleTask(index) {
    tasks[index].completed =
        !tasks[index].completed
    renderTasks()
}




function renderTasks() {
    const taskslist = document.getElementById('taskslist')
    taskslist.innerHTML = ""
    tasks.forEach((task, index) => {
        const li = document.createElement('li')
        li.className = task.completed ? "completed" : ""
        li.innerHTML = `<span>${task.text}</span>
         <button class = "completedbtn" onClick ="toggleTask(${index})">✅</button>
        <button class = "delete" onClick ="deleteTask(${index})">🗑️</button`

        taskslist.appendChild(li)
    }
    )
    taskCount()


}


function taskCount() {
    let value = tasks.length;
    const countEL = document.getElementById("taskCount");
    let completedcount = 0;
    for (let i = 0; i <= value - 1; i++) {
        tasks[i].completed ? completedcount += 1 : ""
    }
    countEL.textContent = value ? `Ընդհանուր
     ${value} որից ${completedcount}  կատարված է ` : ""

}


document.getElementById('taskbtn').addEventListener('click', () => {
    const input = document.getElementById('taskinput')
    addTask(input.value)
    input.value = ""
})


document.getElementById("deleteall").addEventListener("click", () => {
    tasks.length = 0;
    renderTasks()
})
