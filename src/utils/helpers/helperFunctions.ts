export const voteCustomRound = (num: number) => {
  const integerPart = Math.floor(num)
  const decimalPart = num - integerPart

  if (decimalPart >= 0.5) {
    return integerPart + 0.5
  } else {
    return integerPart
  }
}
