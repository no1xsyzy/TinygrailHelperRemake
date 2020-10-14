export function ICOStandard (lv) {
  const users = lv * 5 + 10
  let total = 100000
  let level = 1
  while (lv > level) {
    level++
    total += Math.pow(level, 2) * 100000
  }
  return {
    Users: users,
    Total: total
  }
}
