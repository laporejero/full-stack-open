const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Total = ({ total }) => {
    const sumOfExercises = total.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises
    }, 0)

    return (
        <div><strong>total of {sumOfExercises} exercises</strong></div>
    )
}

const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts} />
        </>
    )
}

export default Course