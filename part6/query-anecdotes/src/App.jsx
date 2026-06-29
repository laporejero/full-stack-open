import { useAnecdotes } from './hooks/useAnecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import useNotify from './hooks/useNotify'

const App = () => {
  const { setNotification } = useNotify()

  const { 
    anecdotes, 
    isPending, 
    isError,
    addAnecdote,
    handleVote
  } = useAnecdotes()

  if (isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm addAnecdote={addAnecdote} setNotification={setNotification} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              handleVote(anecdote)
              setNotification(`anecdote '${anecdote.content}' voted`)
              setTimeout(() => {
                setNotification(null)
              }, 5000)
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

export default App