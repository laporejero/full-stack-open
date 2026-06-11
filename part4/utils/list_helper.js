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

module.exports = { 
    dummy, 
    totalLikes, 
    favoriteBlog 
}