const sum_fib_even_max = max => {
  let a = 1, b = 1, sum = 0;
  while (a + b < max) {
    if (a < b) a += b;
    else b += a;
    if (Math.max(a,b)%2 === 0) sum += Math.max(a,b);
  }
  return sum;
};
console.log('Result is', sum_fib_even_max(4000000));
