import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'
import {
  createCycleAction,
  insertFinishedDateOnActiveCycleAction,
  interreptCurrentCycleAction,
} from '../reducers/cycles/actions'
import { differenceInSeconds } from 'date-fns'
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
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        '@ignite-pomodoro:cycles-state-1.0.0',
      )

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON)
      }

      return initialState
    },
  )

  const { activeCycleId, cycles } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-pomodoro:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

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
