const Filter = ({ search, handleSearchInput }) => {
    return (
        <div>
            filter shown with
            <input
            value={search}
            onChange={handleSearchInput}
            />
        </div>
    )
}

export default Filter