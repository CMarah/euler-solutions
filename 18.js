const str =
`3
7 4
2 4 6
8 5 9 3`;
const data = str.split('\n').map(x => x.split(' ').map(x => parseInt(x)));
const res = data.reduce((acc, row, i, arr) => {
  acc[i] = i === 0 ? row : row.map(
    (x, j) => j === 0 ? x + acc[i-1][0] :
      j === (row.length-1) ? x + acc[i-1][j-1] :
      x + Math.max(acc[i-1][j-1], acc[i-1][j])
  );
  return acc;
}, []);
console.log('The answer is:', res.slice(-1)[0].reduce((acc, x) => x > acc ? x : acc,
  0));
