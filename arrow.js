const CORNERS = [5,1,4,3];

for (let ka = 0; ka < 6; ++ka) {
  for (let kb = 0; kb < 6; ++kb) {
    for (let kc = 0; kc < 6; ++kc) {
      for (let kd = 0; kd < 6; ++kd) {
        const res1 = CORNERS[0] + ka + 4*kb + kd;
        const res2 = CORNERS[1] + 4*ka + 2*kb + 3*kc;
        const res3 = CORNERS[2] + 3*kb + 3*kc + 3*kd;
        const res4 = CORNERS[3] + ka + 3*kc + 5*kd;
        if (res1%6 === 1 && res2%6 === 1 && res3%6 === 1 && res4%6 === 1) {
          console.log(ka,kb,kc,kd);
        }
      }
    }
  }
}
