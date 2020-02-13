// //Async Code
// const fetchData = (callBack) => {
//     setTimeout(() => {
//         callBack("Four")
//     }, 1500)
// }

// setTimeout(() => {
//     console.log("One")
//     fetchData(res => {
//         console.log(res)
//     })
// }, 2000)

// //Sync Code
// console.log("Two")
// console.log("Three")

//Using Promise Constructor
const fetchDataPromise = () => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Five")
        }, 1500)  
    });
    return promise;
}

setTimeout(() => {
    console.log("Six")
    fetchDataPromise()
    .then(res => {
        console.log(res);
        return fetchDataPromise();
    })
    .then(res2 => {
        console.log(res2);
    });
}, 2000)

//Sync Code
console.log("Two")
console.log("Three")