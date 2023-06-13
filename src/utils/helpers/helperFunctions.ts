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
  vote = Math.floor(vote * 10) / 10
  //toFixed method will round the number. code above is to prevent it.
  return vote.toFixed(1)
}
