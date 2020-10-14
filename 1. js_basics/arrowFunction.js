const name = 'Max';
let age = 29;
const hasHobbies = true;

age = 30;

const summarizeUser = (userName, userAge, userHasHobby) => {
  return (
    'Name is ' +
    userName +
    ', age is ' +
    userAge +
    ' and the user has hobbies: ' +
    userHasHobby
  );
};
console.log(summarizeUser(name, age, hasHobbies));

const add = (a, b) => a + b;
console.log("add",add(1, 2));

const addOne = a => a + 1;
console.log("addOne",addOne(1));

const addRandom = () => 1 + 2;
console.log("addRandon",addRandom());
