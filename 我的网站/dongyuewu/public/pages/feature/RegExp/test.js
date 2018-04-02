function isPrimeSqrtN(x)
{
    if (x < 2) return false;
    for (var i = 2; i * i <= x; ++i)
        if (x % i == 0)
            return false;
    return true;
}
function isPrimeRegex(x)
{
    return !/^1?$|^(11+?)\1+$/.test(Array(x+1).join('1'));
}

console.error(isPrimeSqrtN(9));
console.error(isPrimeSqrtN(7));
console.error(isPrimeRegex(9));
console.error(isPrimeRegex(7));

console.time('isPrimeSqrtN(19)');
console.error(isPrimeSqrtN(19));
console.timeEnd('isPrimeSqrtN(19)');
console.time('isPrimeRegex(19)');
console.error(isPrimeRegex(19));
console.timeEnd('isPrimeRegex(19)');

console.time('isPrimeSqrtN(123456)');
console.error(isPrimeSqrtN(123456));
console.timeEnd('isPrimeSqrtN(123456)');
console.time('isPrimeRegex(123456)');
console.error(isPrimeRegex(123456));
console.timeEnd('isPrimeRegex(123456)');

console.time('isPrimeSqrtN(347*347)');
console.error(isPrimeSqrtN(347*347));
console.timeEnd('isPrimeSqrtN(347*347)');
console.time('isPrimeRegex(347*347)');
console.error(isPrimeRegex(347*347));
console.timeEnd('isPrimeRegex(347*347)');