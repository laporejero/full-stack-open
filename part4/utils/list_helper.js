const _ = require('lodash')

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
    const authorCounts = _.countBy(blogs, 'author')

    const authorWithMostBlogs = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author]);

    return {
        author: authorWithMostBlogs,
        blogs: authorCounts[authorWithMostBlogs]
    }
}

const mostLikes = (blogs) => {
    const totalLikesByAuthors = _.mapValues(_.groupBy(blogs, 'author'), (authorBlogs) => {
        return _.sumBy(authorBlogs, 'likes');
    })

    const authorWithMostLikes = _.maxBy(_.keys(totalLikesByAuthors), (author) => totalLikesByAuthors[author])

    return {
        author: authorWithMostLikes,
        likes: totalLikesByAuthors[authorWithMostLikes]
    }
}

module.exports = { 
    dummy, 
    totalLikes, 
    favoriteBlog,
    mostBlogs,
    mostLikes
}