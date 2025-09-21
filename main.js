let tasks = []

function addTask(task){
  if(task.trim() === "") return
  tasks.push({text: task, completed: false})
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


function editTask(index) {
    if (tasks[index].completed === true) return
    const newText = prompt("Change task name", tasks[index].text)

    if (newText && newText.trim() !== "") {
        tasks[index].text = newText
    }
    renderTasks()

}





function renderTasks() {
    const taskslist = document.getElementById('taskslist')
    taskslist.innerHTML = ""
    sortCompleted()
    tasks.forEach((task, index) => {
        const li = document.createElement('li')
        li.className = task.completed ? "completed" : ""
        li.innerHTML = `<span>${task.text}</span>
         <button class = "completedbtn" onClick ="toggleTask(${index})">✅</button>
        <button class = "delete" onClick ="deleteTask(${index})">🗑️</button>
        <button class ="editbtn" onClick = "editTask(${index})">✏️</button>`

        taskslist.appendChild(li)
    }
    )
    taskCount()
    saveTasks()


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

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function loadTasks() {
    const saved = localStorage.getItem('tasks')
    if (saved) {
        const parsed = JSON.parse(saved)
        tasks.length = 0
        parsed.forEach(t => tasks.push(t))
        renderTasks()
    }
}

function sortCompleted() {
    const notCompleted = []
    const completed = []

    tasks.map(task => {
        if (task.completed) {
            completed.push(task)
        } else {
            notCompleted.push(task)
        }
    })
    tasks.length = 0
    tasks.push(...notCompleted, ...completed)
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
window.addEventListener('load', loadTasks)