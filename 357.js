/*const PRIMES = (() => {
  let is_prime = (new Array(MAXIMUM)).fill(true);
  is_prime[0] = false;
  is_prime[1] = false;
  let res = [];
  for (current = 2; current < MAXIMUM; ++current) {
    if (!is_prime[current]) continue;
    for (j = 2; j*current < MAXIMUM; ++j) {
      is_prime[j*current] = false;
    }
  }
  const result = is_prime.map((x, i) => x ? i : null).filter(x => x);
  //require('fs').writeFileSync('primes.txt', JSON.stringify(result));
  return result;
})();*/
const MAXIMUM = 100000000;
const PRIMES = JSON.parse(require('fs').readFileSync('primes.txt'));
// DELIMITERS serves to index the primes array, just to save some time
const DELIMITERS = [
   1299721,  2750161,  4256249,  5800139,
   7368791,  8960467, 10570849, 12195263, 13834127,
  15485867, 17144507, 18815249, 20495861, 22182379,
  23879539, 25582163, 27290311, 29005549, 30723773,
  32452867, 34186063, 35926309, 37667713, 39410869,
  41161751, 42920209, 44680327, 46441223, 48210719,
  49979693, 51754999, 53533523, 55316939, 57099349,
  58886033, 60678109, 62473049, 64268783, 66068923,
  67867979, 69672853, 71480063, 73289717, 75103543,
  76918277, 78736487, 80556709, 82376243, 84200287,
  86028157, 87857533, 89687693, 91519081, 93354689,
  95189093, 97026263
];

const isPrime = n => {
  let index = DELIMITERS.findIndex(x => x > n)*100000;
  for (; index < PRIMES.length; ++index) {
    if (PRIMES[index] === n) return true;
    if (PRIMES[index] > n) return false;
  }
  return false;
};

const isPrimeGenerating = num => {
  let d = 0;
  let found_divisors = [];
  const initial_number = num;
  const limit = Math.sqrt(initial_number);
  while (PRIMES[d] < limit) {
    const divisor = PRIMES[d];
    if (num%divisor === 0) {
      if (!isPrime(divisor + initial_number/divisor)) return false;
      let new_divisors = [];
      for (const old_d of found_divisors) {
        if (old_d === divisor) return false;
        const new_divisor = old_d * divisor;
        if (new_divisor <= limit) {
          if (!isPrime(new_divisor + initial_number/new_divisor)) return false;
          new_divisors.push(new_divisor);
        }
      }
      new_divisors.forEach(d => found_divisors.push(d));
      found_divisors.push(divisor);
      num /= divisor;
    } else {
      ++d;
    }
  }
  return true;
};

const result = (() => {
  let sum = BigInt(0);
  for (let i = 0; i < PRIMES.length; ++i) {
    const n = PRIMES[i]-1;
    if (n%4 === 0) continue;
    if (isPrimeGenerating(n)) {
      sum += BigInt(n);
    }
  }
  return sum;
});
console.log('RESULT IS', result());
