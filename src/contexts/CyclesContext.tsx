import { createContext, ReactNode, useReducer, useState } from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  createCycleAction,
  insertFinishedDateOnActiveCycleAction,
  interreptCurrentCycleAction,
} from '../reducers/cycles/actions'
interface createCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextProviderProps {
  children: ReactNode
}
interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  cycles: Cycle[]
  insertFinishedDateOnActiveCycle: () => void
  setSecondsPassed: (seconds: number) => void
  interruptedCurrentCycle: () => void
  createNewCycle: (data: createCycleData) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { activeCycleId, cycles } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function createNewCycle(data: createCycleData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      minutesAmount: data.minutesAmount,
      task: data.task,
      startDate: new Date(),
    }

    dispatch(createCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptedCurrentCycle() {
    dispatch(interreptCurrentCycleAction())
  }

  function insertFinishedDateOnActiveCycle() {
    dispatch(insertFinishedDateOnActiveCycleAction())
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        cycles,
        insertFinishedDateOnActiveCycle,
        setSecondsPassed,
        interruptedCurrentCycle,
        createNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
