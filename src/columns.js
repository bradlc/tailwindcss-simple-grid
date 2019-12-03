function getDivisors(n) {
  let v = []
  for (let i = 1; i <= parseInt(Math.sqrt(n), 10); i++) {
    if (n % i === 0) {
      v.push(i, parseInt(n, 10) / i)
    }
  }

  return v.filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => a - b)
}

function getCommonDivisors(a, b) {
  let aDivisors = getDivisors(a)
  let bDivisors = getDivisors(b)
  return aDivisors.filter(n => bDivisors.includes(n))
}

module.exports = function columns(columns, decimalPoints = 7) {
  return Array(columns - 1)
    .fill(null)
    .map((_, n) => {
      return getCommonDivisors(n + 1, columns).map(divisor => {
        return [(n + 1) / divisor, columns / divisor]
      })
    })
    .reduce((a, b) => a.concat(b), [])
    .reduce((acc, [n, d]) => {
      return {
        ...acc,
        [`${n}/${d}`]: `${((n / d) * 100)
          .toFixed(decimalPoints)
          .replace(/\.?0+$/, '')}%`
      }
    }, {})
}
