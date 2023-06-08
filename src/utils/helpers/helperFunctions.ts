export const voteCustomRound = (num: number) => {
  const integerPart = Math.floor(num)
  const decimalPart = num - integerPart

  if (decimalPart >= 0.5) {
    return integerPart + 0.5
  } else {
    return integerPart
  }
}

export const voteFixer = (vote: number) => {
  if (vote === Math.floor(vote)) {
    return vote.toString()
  }
  return (vote / 2).toFixed(1)
}
