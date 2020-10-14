export function caculateICO (ico) {
  let level = 0
  let price = 0
  let amount = 0
  let next = 100000
  let nextUser = 15

  // 人数等级
  const heads = ico.Users
  let headLevel = Math.floor((heads - 10) / 5)
  if (headLevel < 0) { headLevel = 0 }

  // 资金等级
  while (ico.Total >= next && level < headLevel) {
    level += 1
    next += Math.pow(level + 1, 2) * 100000
  }
  if (level) {
    amount = 10000 + (level - 1) * 7500
    price = ico.Total / amount
  }
  nextUser = (level + 1) * 5 + 10

  return {
    Level: level,
    Next: next,
    Price: price,
    Amount: amount,
    Users: nextUser - ico.Users
  }
}
