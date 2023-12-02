import fs from 'fs'

const getRegex = (color) => {
  return color === 'red' ? /\d+.red/g
    : color === 'green' ? /\d+.green/g
    : /\d+.blue/g
}

const isImpossible = (game, color) => {
  const maxReds = 12
  const maxGreens = 13
  const maxBlues = 14

  const max =
    color === 'red' ? maxReds
    : color === 'green' ? maxGreens
    : maxBlues

  const regex = getRegex(color)

  return !!game.match(regex)?.find(round => {
    const amount = round.match(/\d+/)
    return amount > max
  })
}

const getPossibleGamesSum = (doc) => {
  const games = doc.split('\n')

  const possibleGames = games.map(game => {
    const id = game.match(/\d+/)?.[0]
    if (!id) return null

    const impossibleReds = isImpossible(game, 'red')
    const impossibleGreens = isImpossible(game, 'green')
    const impossibleBlues = isImpossible(game, 'blue')

    if (impossibleReds || impossibleGreens || impossibleBlues) return null

    return Number(id)
  })

  return possibleGames.reduce((partitialSum, currentId) => partitialSum + currentId, 0)
}

const getHighest = (game, color) => {
  const regex = getRegex(color)
  const rounds = game.match(regex)?.map(round => Number(round.match(/\d+/)?.[0]))
  return rounds?.reduce((prev, current) => Math.max(prev, current), 0)
}

const getMinimumSetPowerSum = (doc) => {
  const games = doc.split('\n')

  const powers = games.map(game => {
    const highestRed = getHighest(game, 'red')
    const highestGreen = getHighest(game, 'green')
    const highestBlue = getHighest(game, 'blue')

    if (!highestRed || !highestGreen || !highestBlue) return null
  
    return highestRed * highestGreen * highestBlue
  })

  return powers.reduce((partitialSum, currentId) => partitialSum + currentId, 0)
}

const doc = fs.readFileSync('02/input.txt', 'utf-8')

// part 1
console.log(getPossibleGamesSum(doc))

// part 2
console.log(getMinimumSetPowerSum(doc))