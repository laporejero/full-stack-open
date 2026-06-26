
import { create } from 'zustand'
import anecdoteService from './services/anecdotes'
import anecdotes from './services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    vote: async (id) => {
      const anecdote = get().anecdotes.find(anecdote => anecdote.id === id)
      const updated = await anecdoteService.update(
        id, { ...anecdote, votes: anecdote.votes + 1 }
      )
      set(state => ({
        anecdotes: state.anecdotes
          .map(anecdote => anecdote.id === id ? updated : anecdote)
          .toSorted((a, b) => b.votes - a.votes)
      }))
    },
    remove: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({ anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id) }))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes: anecdotes.toSorted((a, b) => b.votes - a.votes) }))
    }
  },
}))

const useNotificationStore = create((set) => ({
  notification: null,
  setNotification: async (message) => {
    set({ notification: message })
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)

// Notification
export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationAction = () => useNotificationStore((state) => state.setNotification)