const AnecdoteForm = ({ addAnecdote, setNotification }) => {
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    addAnecdote(content)

    setNotification(`anecdote '${content}' is added`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm