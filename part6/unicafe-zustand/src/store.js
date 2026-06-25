import { create } from 'zustand'

const useStatisticsStore = create(set => ({
    counter: {
        good: 0,
        neutral: 0,
        bad: 0,
    },
    actions: {
        addGood: () => set(state => ({ 
                counter: {
                    ...state.counter,
                    good: state.counter.good + 1 
                }
            })),
        addNeutral: () => set(state => ({ 
                counter: {
                    ...state.counter,
                    neutral: state.counter.neutral + 1 
                }
            })),
        addBad: () => set(state => ({ 
                counter: {
                    ...state.counter,
                    bad: state.counter.bad + 1 
                }
            })),
    }
}))

export const useStatistics = () => useStatisticsStore(state => state.counter)
export const useStatisticsControls = () => useStatisticsStore(state => state.actions)