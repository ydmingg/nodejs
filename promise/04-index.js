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
    #callbacks = []

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
        
        // 当resolve方法被调用时，说明数据已经进来了，需要再次调用then的回调函数
        queueMicrotask(() => { 
            // 调用callbacks中的所有回调函数
            this.#callbacks.forEach((callback) => { 
                callback(this.#result)
            })

        })  
    }
    // then方法
    then(onFulfilled, onRejected) { 
        /* 谁将成为then返回的新的promise中的数据？？？？？？？ */
            // then中回调函数的返回值，就是新的promise 中的数据
        return new myPromise((resolve, reject) => {
            // 判断状态
            if (this.#status === PROMISE_STATE.PENDING) { 
                // 进入判断说明数据还没有进入promise，将回调函数设置为callbacks的值
                this.#callbacks.push(() => { 
                    resolve(onFulfilled(this.#result))
                })

            }else if (this.#status === PROMISE_STATE.FULFILLED) { 
                queueMicrotask(() => { 
                    resolve(onFulfilled(this.#result))
                })
            }
        });

        

        
    }

}


const promise = new myPromise((resolve, reject) => {
    // 1. 执行异步操作
    setTimeout(() => {
        resolve('调用成功');
    }, 1000);
})

const newPromise = promise.then((result) => { 
    console.log("第一次调用", result);
})
console.log(newPromise);
promise.then((result) => { 
    console.log("第二次调用", result);
    return "返回值";
}).then((result) => { 
    console.log("第三次调用", result);
})