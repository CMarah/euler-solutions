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
  console.log(Object.values(results).map((v, i) => [
    i, v, binom(i + R + K - 3, i), binom(i+R +K- 3,i) - v
  ]));

  const e = Object.entries(results)
    .filter(([k, v]) => k.length === R)
    .reduce((acc, [k, v]) => acc + v, 0);

  return e;
};

const A = (n, m) => {
  if (n < 0 || m < 0) return 0;
  return binom(n,n-m) -
    binom(n-9, m-9) -
    (n-10)*A(n-11,m-10);
}

const binom = (n, k) => {
  if (n < 0 || k < 0) return 0;
  //TODO optimize
  if (k === 0) return 1;
  if (n === k) return 1;
  let result = 1;
  for (j = 0; j < k; ++j) {
    result *= (n-j);
  }
  for (j = 1; j <= k; ++j) {
    result /= j;
  }
  return result;
};

const A2 = (n, m) => {
  if (m === 9) return binom(n,m) - 1;
  if (n === m && n < 9) return 1;
  if (n === m && n >= 9) return 0;
  if (m < 9) return binom(n, m);
  return A2(n-1,m-1) + A2(n-1,m) - A2(n-11,m-10);
}

const E = (k, r) => {
  if (r === 1) return binom(7 + r + k, k);
  if (r === 2) {
    let result = 0;
    let a = A2(8 + k, 9);
    //let a = A2(10 + 8 + k, 18) - A2(k + 8 - 1, 8);
    let i = 0;
    let w = 0;
    while (a > 0) {
      console.log('a is', a);
      result += a;
      i = i + 1;
      a = A2(8 + k + i, 9 + i);

      w += a;
      if (i%9 === 0) {
        console.log('K', w);
        w = 0;
      }
      //a = A2(10 + 8 + k + i, 18 + i) - A2(k + 8 + i - 1, 8 + i);
    }
    return result;
  }
  return 0;
};
console.log('E', E(4,2));
const n = 3;
const m = 2;
//console.log('a', A2(10 + 3 + 8, 18) - A2(2 + 8, 8));
//console.log('b', A2(10 + 3 + 8, 18), A2(2+8,8));
console.log('c', A2(29,26) - A2(18,16));
console.log('d', A2(29,26), A2(28,26), A2(20,18));

console.log('------------------');
//console.log('Es', calcE(5, 2), E(4,2));

const N = 8;
let res = 0;
for (i = 1; i <= N; ++i) {
  const e = E(i, N-i);
  console.log(`Step ${i}: `, e);
  res += e;
}
console.log('Res', res);
