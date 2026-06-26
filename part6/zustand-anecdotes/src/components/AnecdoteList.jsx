import { useAnecdotes, useAnecdoteActions, useNotificationAction } from "../store"

const AnecdoteList = () => {
    const anecdotes = useAnecdotes()
    const { vote } = useAnecdoteActions()
    const setNotification = useNotificationAction()

    const handleVote = (anecdote) => {
        setNotification(`You voted '${anecdote}'`)

        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                    has {anecdote.votes}
                    <button 
                        onClick={async () => {
                            vote(anecdote.id)
                            handleVote(anecdote.content)
                        }}
                    >
                        vote
                    </button>
                </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList