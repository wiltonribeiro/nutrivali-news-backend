
export default class ScheduleCore {

    inLoop(interval : number, task: () => void){
        setInterval(task,interval);
    }

}