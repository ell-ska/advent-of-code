import fs from 'fs'

const calibrate = (doc) => {
  const lines = doc.split('\n')

  const digits = lines.map(line => {
    const lineDigits = line.match(/\d/g)
    if (!lineDigits) return null
    console.log(lineDigits)

    const first = lineDigits[0].toString()
    const last = lineDigits[lineDigits.length - 1]?.toString()

    return Number(first + last)
  })

  const answer = digits.reduce((partitialSum, currentDigit) => partitialSum + currentDigit, 0)

  return answer
}

const replaceWords = (doc) => {
  return doc
    .toLowerCase()
    .replace(/one/g, 'one1one')
    .replace(/two/g, 'two2two')
    .replace(/three/g, 'three3three')
    .replace(/four/g, 'four4four')
    .replace(/five/g, 'five5five')
    .replace(/six/g, 'six6six')
    .replace(/seven/g, 'seven7seven')
    .replace(/eight/g, 'eight8eight')
    .replace(/nine/g, 'nine9nine')
}

const doc = fs.readFileSync('01/input.txt', 'utf-8')

// part 1
console.log(calibrate(doc))

// part 2
console.log(calibrate(replaceWords(doc)))