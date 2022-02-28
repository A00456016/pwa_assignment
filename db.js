var db = new Dexie("TaskDatabase");

db.version(1).stores({
    tasks: `
        ++id,
        taskname,
        duedate,
        assignedto`,
});

function getAllTasksFromDB() {
    return db.tasks.toArray().then((data) => {
        return data
    })

}

function addTasksToDB(taskname, duedate, assignedto) {
    db.tasks.put({ taskname, duedate, assignedto })
        .then(() => true)
        .catch(err => {
            alert("Error... " + err);
        });
}
