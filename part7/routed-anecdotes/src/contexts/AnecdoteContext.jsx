import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'
import { createContext } from 'react'
import anecdotes from '../services/anecdotes'

export const AnecdoteContext = createContext()

export const AnecdoteProvider = ({ children }) => {
    const [anecdotes, setAnecdotes] = useState([])
      
    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])

    const addAnecdote = async (anecdote) => {
        const createdAnecdote = await anecdoteService.createNew(anecdote)
        setAnecdotes(prev => prev.concat(createdAnecdote))
    }

    const deleteAnecdote = async (id) => {
        await anecdoteService.remove(id)
        const updated = await anecdoteService.getAll()
        setAnecdotes(updated)
    }

    return (
        <AnecdoteContext.Provider value={{ anecdotes, addAnecdote, deleteAnecdote }}>
            {children}
        </AnecdoteContext.Provider>
    )
}