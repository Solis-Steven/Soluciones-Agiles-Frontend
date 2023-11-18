
export const calculatePercentage = (tasks) => {

    if(tasks.length > 0) {
        const completedTasks = tasks.filter(task => task.state === "Finalizada")
        return ((completedTasks.length / tasks.length) * 100)
    }

    return(100);
}