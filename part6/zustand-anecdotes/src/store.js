
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    vote: id => set(state => {
      const updatedAnecdotes = state.anecdotes.map(anecdote =>
        anecdote.id === id 
          ? { ...anecdote, votes: anecdote.votes + 1 } 
          : anecdote
      )

      return {
        anecdotes: updatedAnecdotes.toSorted((a, b) => b.votes - a.votes)
      }
    }),
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
