const N = 6;
const BASE = 10;

const digits = n => {
  if (n < BASE) return 1;
  return 1 + digits(parseInt(n/BASE));
};

const calcE = (K, R) => {
  let sums = [0];

  const addNextDigit = sum =>
    (new Array(BASE)).fill(0).map((x, i) => sum + i);

  for (i = 0; i < K; ++i) {
    sums = sums.map(s => addNextDigit(s))
      .reduce((acc, arr) => acc.concat(arr), [])
      .filter(s => i !== 0 || s !== 0);
  }

  console.log(sums);

  const cleanSums = sums => sums.reduce((acc, s) => ({
    ...acc,
    [s]: (acc[s] || 0) + 1,
  }), {});

  const results = cleanSums(sums);

  console.log(K, R, results);

  const e = Object.entries(results)
    .filter(([k, v]) => k.length === R)
    .reduce((acc, [k, v]) => acc + v, 0);

  console.log(e);

  return e;
};

let result = 0;
if (N <= 11) {
  result = calcE(N-1,1) + calcE(N-2,2);
} else {
  for (i = 1; i <= N-1; ++i) {
    result += calcE(i, N-i);
  }
}
console.log('R', result);
