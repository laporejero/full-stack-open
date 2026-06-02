const Notification = ({ message, type }) => {
    const notifStyle = {
        backgroundColor: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        color: type === 'success' ? 'green' : type === 'error' ? 'red' : 'black'
    }

    if (message === null) {
        return null
    }

    return (
        <div style={notifStyle}>
            {message}
        </div>
    )
}

export default Notification