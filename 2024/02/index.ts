import fs from 'fs'

const minDifference = 1
const maxDifference = 3

const getDifference = (current: number, next: number) => current - next

const validateReport = (levels: number[], isIncreasing: boolean) => {
  return levels.every((_, index) => {
    // last level, no next step
    if (index >= levels.length - 1) {
      return true
    }

    const difference = getDifference(levels[index], levels[index + 1])

    return isIncreasing
      ? difference <= -minDifference && difference >= -maxDifference
      : difference >= minDifference && difference <= maxDifference
  })
}

const part1 = (document: string) => {
  const reports = document.split('\n')

  return reports.reduce((safeReportCount, report) => {
    const levels = report.split(' ').map(Number)

    const difference = getDifference(levels[0], levels[1])
    // if there is no difference between the first to levels the report is invalid
    if (difference === 0) return safeReportCount

    const isIncreasing = difference < 0
    const isSafeReport = validateReport(levels, isIncreasing)

    return isSafeReport ? safeReportCount + 1 : safeReportCount
  }, 0)
}

const document = fs.readFileSync('2024/02/input.txt', 'utf-8')

console.log(part1(document))
