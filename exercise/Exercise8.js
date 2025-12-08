/*
Exercise 8:
Use a for loop to log all integers from 1 to N to the console in ascending order, but skip multiples of 3.
Use a while loop to log all integers from 1 to N to the console in descending order, but stop the loop if the number is divisible by 5.
*/

// Do not modify:
let N = 19;

// Type your code here:
for (let i = 1; i <= N; i++) {
    if (i % 3 === 0) {
        continue;
    }
    console.log(i);
}

let count = N;
while (count >= 1) {
    if (count % 5 === 0) {
        break;
    }
    console.log(count);
    count--;
}
