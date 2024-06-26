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

    constructor(executor) { 
        executor(this.#resolve.bind(this));
    }
    // resolve方法
    #resolve(value) { 
        // 判断状态是否为pending
        if (this.#status !== PROMISE_STATE.PENDING) return;
        this.#result = value
        // 将状态改为fulfilled
        this.#status = PROMISE_STATE.FULFILLED
    
    }
    // then方法
    then(onFulfilled, onRejected) { 
        if (this.#status === PROMISE_STATE.FULFILLED) { 
            /* 
            * 问题：
            * 1.此时，then只能读取已经存储进promise的结果，而不能读取异步操作存储的数据
            */

            onFulfilled(this.#result)
        }
    }

}


const promise = new myPromise((resolve, reject) => {
    // 1. 执行异步操作时，此时调用（then）不成功
    setTimeout(() => {
        resolve('调用成功');
    }, 1000);
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