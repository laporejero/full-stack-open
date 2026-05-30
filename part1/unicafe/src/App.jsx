import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const totalFeedback = good + neutral + bad

  if (totalFeedback === 0) {
    return <div>No feedback given</div>
  }

  const average = (good, neutral, bad) => {
    const calcGood = good * 1
    const calcNeutral = neutral * 0
    const calcBad = bad * -1
    const sum = calcGood + calcNeutral + calcBad
    const calcAverage = sum / totalFeedback

    return calcAverage.toFixed(1)
  }

  const positive = (good, neutral, bad) => {
    const calcPosiviteFeedback = (good / totalFeedback) * 100

    return calcPosiviteFeedback.toFixed(1) + "%"
  }

  return (
    <table>
      <tbody>
        <StatisticsLine text={"good"} value={good} />
        <StatisticsLine text={"neutral"} value={neutral} />
        <StatisticsLine text={"bad"} value={bad} />
        <StatisticsLine text={"all"} value={totalFeedback} />
        <StatisticsLine text={"average"} value={average(good, neutral, bad)} />
        <StatisticsLine text={"positive"} value={positive(good, neutral, bad)} />
      </tbody>
    </table>
  )
} 

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text={'good'} />
      <Button onClick={handleNeutralClick} text={'neutral'} />
      <Button onClick={handleBadClick} text={'bad'} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
