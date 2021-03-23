/*
ordre des messages :
A
B
C
D
E
F
G
*/
/******************* 2eme question ****************************/
console.log('******************* 2eme question ****************************');
const callPromise = 
    new Promise((resolve, reject) =>{
        resolve('ex1 : question 2 version promise :) ');
    })
        .then(() => {
            console.log('A');
        })
        .then(() => {
            setTimeout(()=>
            {
                console.log('B');
            },1000)
        })
        .then(() => {
            setTimeout(()=>
            {
                console.log('C');
            },2000)
        })
        .then(() => {
            setTimeout(()=>
            {
                console.log('D');
            },2500)
        })
        .then(() => {
            setTimeout(()=>
            {
                console.log('E');
            },3000)
        })
        .then(() => {
            setTimeout(()=>
            {
                console.log('F');
            },3500)
        })
        .then(() => {
            setTimeout(()=>
            {
                console.log('G');
            },4000)
        });
/******************* 3eme question ****************************/
setTimeout(()=>
            {
                console.log('******************* 3eme question ****************************');
                call();
            },4500)
async function call()
{
    console.log('A');
    await call1();
    console.log('G');
}
async function call1()
{
    console.log('B');
    await call2();
    console.log('F');
}
async function call2()
{
    console.log('C');
    await call3();
    console.log('E');
}
async function call3()
{
    console.log('D');
}
