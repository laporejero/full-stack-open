const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb://fullstack:${password}@ac-umezng9-shard-00-00.ms8yls1.mongodb.net:27017,ac-umezng9-shard-00-01.ms8yls1.mongodb.net:27017,ac-umezng9-shard-00-02.ms8yls1.mongodb.net:27017/phonebookApp?tls=true&replicaSet=atlas-9fcvkn-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})

// person.save().then(result => {
//     console.log(`added ${person.name} number ${person.number} to phonebook`)
//     mongoose.connection.close()
// })

Person.find({}).then(result => {
    console.log('phonebook:')

    result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    })

    mongoose.connection.close()
})