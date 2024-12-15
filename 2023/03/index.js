import fs from 'fs'

const isSymbolIntersection = (box) => {
  const symbols = box.match(/([^.\d])/g)
  return symbols ? true : false
}

const getBox = (text, matchIndex, current, prev, next, raw) => {
  const index = matchIndex === 0 ? matchIndex : matchIndex - 1

  const before = current.charAt(matchIndex - 1)
  const after = current.charAt(Number(matchIndex - 1) + text.length + 1)
  const over = prev?.slice(index, Number(matchIndex) + text.length + 1) || ''
  const under = next?.slice(index, Number(matchIndex) + text.length + 1) || ''

  if (raw) return { before, after, over, under }
  return before + after + over + under
}

const part1 = (doc) => {
  const lines = doc.split('\n')

  let numbers = []

  lines.forEach((line, index) => {
    if (line.length === 0) return null
    
    const prevLine = lines[index - 1]
    const nextLine = lines[index + 1]

    for (let match of line.matchAll(/\d+/g)) {
      const number = Number(match[0])

      const box = getBox(match[0], match.index, match.input, prevLine, nextLine)

      if (isSymbolIntersection(box)) numbers = [...numbers, number]
    }
  })

  return numbers.reduce((partitialSum, currentId) => partitialSum + currentId, 0)
}

const part2 = (doc) => {
  const lines = doc.split('\n')

  let numbers = []

  lines.forEach((line, index) => {
    if (line.length === 0) return null

    const prevLine = lines[index - 1]
    const nextLine = lines[index + 1]

    for (let star of line.matchAll(/\*/g)) {
      const box = getBox('*', star.index, star.input, prevLine, nextLine, true)
      console.log(box)

      if (box.over.match(/\d+/g)) {
        let slicer = star.index - 1

        if (prevLine.slice(star.index - 1).charAt(0).match(/\d/))
        console.log()
      }
    }
  })
}

const doc = fs.readFileSync('03/input.txt', 'utf-8')

// part 1
console.log(part1(doc))

// part 2
// not finished
console.log(part2(doc))