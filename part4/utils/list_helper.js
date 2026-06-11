const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    const blog = blogs.reduce((favorite, current) => 
        favorite.likes > current.likes ? favorite : current
    )
    return { 'title': blog.title, 'author': blog.author, 'likes': blog.likes }
}

const mostBlogs = (blogs) => {
    const counts = blogs.reduce((count, blog)  => {
        count[blog.author] = (count[blog.author] || 0) + 1
        return count
    }, {})

    const authorWithMostBlogs = Object.keys(counts)
        .reduce((a, b) => counts[a] > counts[b] ? a : b)

    return { 
        'author': authorWithMostBlogs, 
        'blogs': counts[authorWithMostBlogs] 
    }
}

module.exports = { 
    dummy, 
    totalLikes, 
    favoriteBlog,
    mostBlogs
}