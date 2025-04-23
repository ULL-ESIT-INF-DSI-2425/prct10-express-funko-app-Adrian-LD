function add(firstNumber, secondNumber, ...remainingNumbers) {
    let result = firstNumber + secondNumber;
    if (remainingNumbers.length) {
        result += remainingNumbers.reduce((prev, current) => prev + current);
    }
    return result;
}
console.log(add(1, 2));
console.log(add(1, 2, 3));
console.log(add(1, 2, 4));
