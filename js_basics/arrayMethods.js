const hobbies = ["Skipping","sleeping"]
console.log("hobbies",hobbies)

//For Loop
for(let hobby of hobbies){
    console.log("hobby for: ",hobby);
    // hobby for:  Skipping
    // hobby for:  sleeping
}

//Built in methods for arrays
console.log(hobbies.map(hobby => "hobby map: " +hobby)); // [ 'hobby map: Skipping', 'hobby map: sleeping' ]
console.log(hobbies.filter(hobby => "hobby filter: " +hobby));// [ 'Skipping', 'sleeping' ]