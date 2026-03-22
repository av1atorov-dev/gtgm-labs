let n = 2272545;
console.log('Початкове ', n);

let temp = n;
let max = 0;
let second = 0;

while (temp > 0) {
    let d = temp % 10;
    if (d > max) {
        second = max;
        max = d;
    } else if (d < max && d > second) {
        second = d;
    }
    temp = Math.floor(temp / 10);
}

console.log('Найбільше ', max);
console.log('Друге ', second);

let res = 0;
let pow = 1;

while (n > 0) {
    let d = n % 10;
    if (d !== second) {
        res += d * pow;
        pow *= 10;
    }
    n = Math.floor(n / 10);
}

console.log('Результат:', res);