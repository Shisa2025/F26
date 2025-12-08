/*
Exercise 7:
Write a function checkAge() that takes "age" as a parameter.
If the age is not a number, the function should throw an error with the message "Age must be a number."
Use a try-catch block to catch the error and log the error message to the console.
*/

// Type your code here:
function checkAge(age) {
    try {
        if (typeof age !== "number") {
            throw new Error("Age must be a number.");
        }
    } catch (error) {
        console.log(error.message);
    }
}

// Do not modify:
checkAge("BuildingBloCS"); // Age must be a number.
