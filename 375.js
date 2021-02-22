const STARTING_SEED = BigInt(290797);
const MODULO = BigInt(50515093);
const PERIOD = 6308948; // Precalculated
// The sequence repeats with a period of 6308948 elements. We use this fact to drastically
// reduce execution time.
// We first calculate M for just the first period (block), obtaining first_block.
// We then calculate M for the first two blocks, obtaining what we will call delta.
// For the rest of the blocks, the difference between each step will be delta plus
// a multiple of the minimum in the sequence. This multiple is, in particular,
// the period length squared times the step nº.
//
// To arrive to this fact, this a good starting point:
// Form a triangle where each row is built from the previous one by
// calculating the minimum of two adjacent numbers. The first row would be our sequence.
// An example could be:
//
// 3 4 1 5 2 ...
//  3 1 1 2 ...
//   1 1 1 ...
//    1 1 ...
//     1 ...
//
// The sum of all these numbers will be M for that sequence. By considering how the cycle
// will affect the total sum you can arrive to the formula.
//
// Finally, we iterate normally the remaining elements of the last period.
//
//
// It is still possible to bruteforce this problem without using this, given a decent
// algorithm, a first iteration took me about 30 minutes.


// Generating function for the sequence
const next_number = x => (x*x)%MODULO;

// minimums is an array where the relavant minimums of the sequence thus far are stored.
// We only care about the smallest & closest ones, so for example we don't want to store a
// 5 if it came before a 3.
// Every time we generate a number, we check to see if any old minimums are now
// irrelevant, and remove them if so.
const updateMinimums = (minimums, num, pos) => {
  let i = 0;
  while (i < minimums.length) {
    if (minimums[i].value >= num) minimums.splice(i, 1);
    else i += 1;
  }
  minimums.push({ value: num, position: pos });
  return minimums;
};

const M = n => {
  let sum = BigInt(0);
  let num;
  let minimums = [];
  let first_block;
  let delta;
  for (i = 1; i <= n; ++i) {
    if (i%100000 === 0) console.log('Step', i);
    num = (i%PERIOD === 1) ? next_number(STARTING_SEED) : next_number(num);
    minimums = updateMinimums(minimums, num, i);
    if (i === PERIOD+1) first_block = sum;
    if (i === PERIOD*2+1) delta = sum - first_block;

    if (i%PERIOD === 1 && i > PERIOD*2 && (i + PERIOD - 1 <= n)) {
      const times_to_skip = parseInt((n + 1 - i)/PERIOD);
      console.log('Skipping', times_to_skip, 'periods!');
      // Skip iterations
      i += times_to_skip*PERIOD - 1;
      // Add basic difference between blocks
      sum += delta * BigInt(times_to_skip);
      // Move all minimums' positions
      for (let k = 0; k < minimums.length; ++k) {
        minimums[k].position += PERIOD * times_to_skip;
      }
      // Add multiple of global minimum
      sum += minimums.reduce((min, x) => !min || x.value < min ? x.value : min, null)
        * BigInt(PERIOD * PERIOD)
        * BigInt(times_to_skip*(times_to_skip+1)/2);
    } else {
      // Basic cycle
      for (j = minimums.length-1; j >= 0; --j) {
        if (j === 0) {
          sum += BigInt(minimums[j].position) * minimums[j].value;
        } else {
          sum += BigInt(minimums[j].position - minimums[j-1].position) * minimums[j].value;
        }
      }
    }
  }
  return sum;
};

const N = 2000000000;
console.log('Result is', M(N));
