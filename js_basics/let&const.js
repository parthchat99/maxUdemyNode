const name = 'Max'; // If you define const the value of that variable will be Constant
let age = 29;       // Value of let can be changed
const hasHobbies = true;

age = 30;
// name = "mam" //Not possible

function summarizeUser(userName, userAge, userHasHobby) {
  return (
    'Name is ' +
    userName +
    ', age is ' +
    userAge +
    ' and the user has hobbies: ' +
    userHasHobby
  );
}

console.log(summarizeUser(name, age, hasHobbies));
