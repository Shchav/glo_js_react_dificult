'use strict'

const isNumber = function (num) {
    return !!num && isFinite(num) && !num.includes(' ');
}
console.log(isNumber('aaa 123 aaa'));
console.log(isNumber(' 123 aaa '));
console.log(isNumber(' aaa 123 '));
console.log(isNumber('   123   '));
console.log(isNumber('   123'));
console.log(isNumber('123   '));
console.log(isNumber('      '));
console.log(isNumber(null));
console.log(isNumber('123'));

let arr = [];
for (let i = 0; i < 7; i++) {
    arr[i] = Math.random() * 10 + '';
}
for (let i = 0; i < 7; i++) {
    if (arr[i][0] == '2' || arr[i][0] == '4')
        console.log(arr[i])
}

for (let i = 2; i <= 100; i++) {
    for (var t = 2; t < i; t++)
        if (!(i % t)) break;
    if (t == i) console.log(i);
}
