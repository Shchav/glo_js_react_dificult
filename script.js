const num = 266219;
let res = 1;
for (const item of num + '') {
    res *= item;
}
console.log(res);

resStr = (res ** 3) + '';
console.log(resStr[0], resStr[1]);
