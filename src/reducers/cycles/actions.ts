import { Cycle } from "./reducer";

export const enum ActionTypes {
    CREATE_CYCLE = 'CREATE_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    INSERT_FINISHED_DATE_ON_ACTIVE_CYCLE = 'INSERT_FINISHED_DATE_ON_ACTIVE_CYCLE'
}

export function createCycleAction(newCycle: Cycle){
    return {
        type: ActionTypes.CREATE_CYCLE,
        payload: {
          newCycle,
        },
      }
}

export function interreptCurrentCycleAction(){
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      }
}

export function insertFinishedDateOnActiveCycleAction(){
    return {
        type: ActionTypes.INSERT_FINISHED_DATE_ON_ACTIVE_CYCLE,
      }
}