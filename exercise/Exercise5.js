/*
Exercise 5:
Log the first element of the array "phonetics" to the console.
Using .length, log the last element of the array "phonetics" to the console.
Replace the third element of the array "phonetics" with "Echo" and log the updated array to the console.
Use array destructuring to assign the first two elements of the array "phonetics" to variables "first" and "second" respectively, and the rest of the array "phonetics" to the array "others".
Log the variables "first" and "second", and the array "others" to the console.
*/

// Do not modify:
let phonetics = ["Alpha", "Bravo", "Charlie", "Delta"];

// Type your code here:
console.log(phonetics[0]);

console.log(phonetics[phonetics.length - 1]);

phonetics[2] = "Echo";
console.log(phonetics);

let [first, second, ...others] = phonetics;
console.log(first);
console.log(second);
console.log(others);
