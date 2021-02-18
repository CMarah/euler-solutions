// This algorithm definitely doesn't find the global maximum, but just a local one given a starting
// position. I just provide multiple starts and find the best among them, so I'm cheating.
// I just wanted to test if this procedure would work.

const MATRIX_2 =
   `7  53 183 439 863
  497 383 563  79 973
  287  63 343 169 583
  627 343 773 959 943
  767 473 103 699 303`
.split('\n').map(l => l.split(' ').filter(x => x).map(x => parseInt(x)));
const MATRIX =
  `7  53 183 439 863 497 383 563  79 973 287  63 343 169 583
 627 343 773 959 943 767 473 103 699 303 957 703 583 639 913
 447 283 463  29  23 487 463 993 119 883 327 493 423 159 743
 217 623   3 399 853 407 103 983  89 463 290 516 212 462 350
 960 376 682 962 300 780 486 502 912 800 250 346 172 812 350
 870 456 192 162 593 473 915  45 989 873 823 965 425 329 803
 973 965 905 919 133 673 665 235 509 613 673 815 165 992 326
 322 148 972 962 286 255 941 541 265 323 925 281 601  95 973
 445 721  11 525 473  65 511 164 138 672  18 428 154 448 848
 414 456 310 312 798 104 566 520 302 248 694 976 430 392 198
 184 829 373 181 631 101 969 613 840 740 778 458 284 760 390
 821 461 843 513  17 901 711 993 293 157 274  94 192 156 574
  34 124   4 878 450 476 712 914 838 669 875 299 823 329 699
 815 559 813 459 522 788 168 586 966 232 308 833 251 631 107
 813 883 451 509 615  77 281 613 459 205 380 274 302  35 805`
.split('\n').map(l => l.split(' ').filter(x => x).map(x => parseInt(x)));

const findSwap = selected => selected.reduce((acc, s, i) => {
  if (acc) return acc;
  return selected.slice(i+1).reduce((acc2, s2, j) => {
    if (acc2) return acc2;
    const current_sum = MATRIX[s[0]][s[1]] + MATRIX[s2[0]][s2[1]];
    const new_sum_1 = MATRIX[s[0]][s2[1]] + MATRIX[s2[0]][s[1]];
    if (new_sum_1 > current_sum) {

      return [i, j+i+1, [s[0],s2[1]],[s2[0],s[1]]];
    }
    const new_sum_2 = MATRIX[s2[0]][s[1]] + MATRIX[s[0]][s2[1]];
    if (new_sum_2 > current_sum) return [i, j, [s2[0],s[1]],[s[0],s2[1]]];
    return null;
  }, null);
}, null);

const findMaxWithStart = starting_selected => {
  let selected = starting_selected;
  let swap = findSwap(selected);
  while (swap) {
    selected[swap[0]] = swap[2];
    selected[swap[1]] = swap[3];
    swap = findSwap(selected);
  }
  return selected.reduce((acc, [si,sj]) => acc + MATRIX[si][sj], 0);
};

const result = (new Array(MATRIX.length)).fill(0).reduce((max, d) => {
  const selected = (new Array(MATRIX.length)).fill(0).map((x,i) => [i,(i+7)%MATRIX.length]);
  const v = findMaxWithStart(selected);
  return v > max ? v : max;
}, 0);

console.log('Result is', result);
