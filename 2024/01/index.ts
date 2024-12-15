import fs from 'fs'

const part1 = (document: string) => {
  const left: string[] = []
  const right: string[] = []

  const lines = document.split('\n')
  lines.forEach((line) => {
    const values = line.split('   ')
    left.push(values[0])
    right.push(values[1])
  })

  left.sort()
  right.sort()

  const differences = left.map((value, index) => {
    return Math.abs(parseInt(value) - parseInt(right[index]))
  })

  const sum = differences.reduce((previous, current) => {
    return previous + current
  }, 0)

  return sum
}

const part2 = (document: string) => {
  const left: string[] = []
  const right: string[] = []

  const lines = document.split('\n')
  lines.forEach((line) => {
    const values = line.split('   ')
    left.push(values[0])
    right.push(values[1])
  })

  left.sort()
  right.sort()

  let sum = 0

  left.forEach((leftValue) => {
    let count = 0

    right.forEach((rightValue) => {
      if (leftValue === rightValue) {
        count++
      } else if (rightValue > leftValue) {
        return
      }
    })

    sum += parseInt(leftValue) * count
  })

  return sum
}

const document = fs.readFileSync('2024/01/input.txt', 'utf-8')

console.log(part1(document))
console.log(part2(document))
