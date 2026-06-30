import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'
import { useContext } from 'react'
import { AnecdoteContext } from '../contexts/AnecdoteContext'

export const useAnecdotes = () => {
  const { anecdotes, addAnecdote, deleteAnecdote } = useContext(AnecdoteContext)

  return { anecdotes, addAnecdote, deleteAnecdote }
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}