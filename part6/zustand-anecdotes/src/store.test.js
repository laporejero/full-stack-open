import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('./services/anecdotes', () => ({
    default: {
        getAll: vi.fn(),
        createNew: vi.fn(),
        update: vi.fn(),
        remove: vi.fn(),
    }
}))

import anecdoteService from './services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './store'
import anecdotes from './services/anecdotes'

beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
    vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
    it('initialize with anecdotes from backend', async () => {
        const mockAnecdotes = [{ id: 1, content: 'test', votes: 0 }]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual(mockAnecdotes)
    })

    it('stores anecdotes sorted by votes after initialization', async () => {
        const mockAnecdotes = [
            { id: 1, content: 'first', votes: 2 },
            { id: 2, content: 'second', votes: 8 },
            { id: 3, content: 'third', votes: 5 },
        ]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual([
            { id: 2, content: 'second', votes: 8 },
            { id: 3, content: 'third', votes: 5 },
            { id: 1, content: 'first', votes: 2 },
        ])
    })

    it('renders anecdotes matching the filter ', async () => {
        const mockAnecdotes = [
            { id: 1, content: 'first', votes: 2 },
            { id: 2, content: 'second', votes: 8 },
            { id: 3, content: 'third', votes: 5 },
        ]
        anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

        const { result } = renderHook(() => useAnecdoteActions())

        await act(async () => {
            await result.current.initialize()
        })

        act(() => {
            useAnecdoteStore.setState({ filter: 'third' })
        })

        const { result: anecdotesResult } = renderHook(() => useAnecdotes())
        expect(anecdotesResult.current).toEqual([{ id: 3, content: 'third', votes: 5 }])
    })
})