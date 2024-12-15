import fs from 'fs'

const minDifference = 1
const maxDifference = 3

const part1 = (document: string) => {
  const reports = document.split('\n')

  const safes = reports.map((report) => {
    const levels = report.split(' ')

    const difference = parseInt(levels[0]) - parseInt(levels[1])
    if (difference === 0) return false

    const isIncreasing = difference <= minDifference * -1

    const validSteps = levels.map((level, index) => {
      if (index >= levels.length - 1) {
        return true
      }

      const difference = parseInt(level) - parseInt(levels[index + 1])

      if (
        isIncreasing &&
        difference <= minDifference * -1 &&
        difference >= maxDifference * -1
      ) {
        return true
      } else if (
        !isIncreasing &&
        difference >= minDifference &&
        difference <= maxDifference
      ) {
        return true
      } else {
        return false
      }
    })

    return validSteps.every((step) => step === true)
  })

  const sum = safes.reduce(
    (previous, safe) => (safe === true ? previous + 1 : previous),
    0
  )

  return sum
}

const document = fs.readFileSync('2024/02/input.txt', 'utf-8')

console.log(part1(document))
