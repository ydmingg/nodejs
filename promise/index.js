// 三个状态值：表示存值前，存值中，存值后
const PROMISE_STATE = {
    PENDING: 'PENDING',
    FULFILLED: "FULFILLED",
    REJECTED: "REJECTED",
}

class myPromise { 
    // 创建一个变量用来存储promise的结果 
    #result; 
    // 创建一个变量用来记录promise的状态
    #status = PROMISE_STATE.PENDING; 
    // 创建一个数组用来存储回调函数
    #callbacks

    constructor(executor) { 
        executor(this.#resolve.bind(this));
    }

    #resolve(value) { 
        this.#result = value
    }

    then(onFulfilled, onRejected) { 
        onFulfilled(this.#result)
    }

}


const promise = new myPromise((resolve, reject) => {
    resolve('调用成功111111');
    resolve('调用成功222222');
})

promise.then((result) => { 
    console.log(result);
})


// const promise1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('调用成功');
//     }, 1000);
// });

// const newPromise = promise1.then((value) => {
//     console.log(value);
// });

// console.log(newPromise);