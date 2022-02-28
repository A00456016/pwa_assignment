
async function main() {
    
    if ('serviceWorker' in navigator) { // checking if the browser supports service workers
        window.addEventListener('load', function () { // when app loads, fire callback
            navigator.serviceWorker.register('/sw.js').then(function () { // register sw
                console.log('ServiceWorker registration successful');  // registration was successful
            }, function (err) {
                console.log('ServiceWorker registration failed', err); // registration failed
            });
        });
    }
   


const form = document.querySelector('form');
const name_in = document.querySelector("[name='taskname']");
const date_in = document.querySelector("[name='duedate']");
const assigned_in = document.querySelector("[name='assignedto']");
const tasklist = document.getElementById('tasks');

const existingTasks = await getAllTasksFromDB()

const taskData = [];

existingTasks.forEach(task => {
    addTask(task.name, task.date, task.assigned);
});

function addTask(name, date, assigned) {
    
    const ul = document.createElement('ul')
        ul.classList.add('task')
        const h1 = document.createElement('h1')
        h1.innerHTML = name;
        const h2 = document.createElement('h2')
        h2.innerHTML = date;
        const p = document.createElement('p')
        p.innerHTML = assigned;

        taskData.push({ name, date, assigned });

        ul.appendChild(h1)
        ul.appendChild(h2)
        ul.appendChild(p)
        tasklist.appendChild(ul)

        localStorage.setItem('tasks', JSON.stringify(taskData));
        addTasksToDB(name, date, assigned)
        name_in.value = ''
        date_in.value = ''
        assigned_in.value = ''
}

form.onsubmit = (event) => {
    event.preventDefault();
    addTask(name_in.value, date_in.value, assigned_in.value);
}

}

main()
