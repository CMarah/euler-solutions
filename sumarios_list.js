const N = 4;
const L = N*9;

const buildMatrix = () => {
  let matrix = (new Array(L));
  for (let j = 0; j < L; ++j) {
    for (let i = 0; i < N; ++i) {
      if (i === 0) {
        matrix[j] = (j >= 9) ? [0] : [1];
      } else {
        matrix[j][i] = 0;
        for (let k = 0; k < 10 && j-k >= 0; ++k) {
          matrix[j][i] += matrix[j-k][i-1];
        }
      }
    }
  }
  return matrix;
}

console.log(buildMatrix());
