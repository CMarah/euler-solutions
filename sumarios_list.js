const N = 8;
const L = N*4;

const printMatrix = matrix => matrix.forEach(
  r => console.log(r
    .map(x => x < 10 ? `   ${x}` :
      x < 100 ? `  ${x}` :
      x < 1000 ? ` ${x}` :
      `${x}`
    )
    .join(' '))
);

const buildMatrix = () => {
  let matrix = (new Array(L));
  for (let j = 0; j < L; ++j) {
    for (let i = 0; i < N; ++i) {
      if (i === 0) {
        matrix[j] = (j >= 9) ? [1] : [1];
      } else {
        matrix[j][i] = 0;
        for (let k = 0; k < 10 && j-k >= 0; ++k) {
          matrix[j][i] += matrix[j-k][i-1];
        } } }
  }
  return matrix;
}

const MATRIX = buildMatrix();
printMatrix(MATRIX);

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

const B = (n, m) => {
  if (n < 0 || m < 0) return 0;
  if (m === 0) return 1;
  if (n === 0) return 1;
  if (n < 9) return binom(n+m,m);
  if (n < 18) {
    const a = binom(n+m, m);
    const c = (n - 9)*B(n-9, m-1);
    return a - c;
  }
  if (n < 27) {
    const a = binom(n+m, m);
    const c = (n - 9)*B(n-9, m-1);
    const d = ((n-18)*(n-9) - binom(n-18,2))*B(n-18, m-2);
    return a - c - d;
  }
  return B(n,m-1) + B(n-1,m) - B(n-10,m-1);
}

const A2 = (n, m) => {
  if (n < 9) return binom(n+m, m);
  return Math.max(B(n,m) - binom(n+m-9, m), 0);
}


let asd = 0;
const A = (n, m) => {
  //return A2(n,m);
  if (n < 0 || m < 0) return 0;
  if (m === 0) {
    if (n < 9) return 1;
    return 0;
  }
  if (n === 0) return 1;
  if (n < 9) return binom(n+m,m);
  if (n < 18) {
    const a = binom(n+m, m);
    const b = binom(n+m-9,m);
    const c = (n - 9)*A(n-9, m-1);
    return a - b - c;
  }
  if (n < 27) {
    const a = binom(n+m, m);
    const b = binom(n+m-9, m);
    const c = (n - 9)*A(n-9, m-1);
    const d = A(n-18, m-2);
    //console.log('F', a - b - c, d);
    //if (asd === 0) asd = a - b - c;
  }
  return A(n,m-1) + A(n-1,m) - A(n-10,m-1);
}
console.log(A(19,4), A2(19,4));

const E = (k, r) => {
  if (r === 1) return A(8,k);
  if (r === 2) {
    let result = 0;
    let i = 0;
    let a = A(17, k) - A(8,k-1);
    while (a > 0) {
      console.log('a is', a, A(17+i,k), A(8+i,k-1));
      result += a;
      i = i + 9;
      a = A(17 + i, k) - A(8+i,k-1);
    }
    return result;
  }
  return 0;
};

const main = N => {
  let res = 0;
  for (i = 1; i <= N; ++i) {
    const e = E(i, N-i);
    console.log(`Step ${i}: `, e);
    res += e;
  }
  return res;
}

//console.log(E(8,2));
//console.log(main(8));
