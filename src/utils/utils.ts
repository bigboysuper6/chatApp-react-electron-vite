const convertToFormData = (data: data) => {
    const formData = new FormData();
    for (let key in data) {
        formData.append(key, data[key]);
    }
    return formData;
};

const convertToUrlParams = (args: data) => {
    const params = new URLSearchParams();
    for (let key in args) {
        params.append(key, args[key]);
    }
    return params;
};

/**
 * @param {function} func: the function need to use debounce
 * @param {Number} delay: the time to wait when triggering the function
 * @return {Function} function;
 * @description: when func is triggered ,wait delay time to execute it;if this function is triggered at the delay time again,reset delay time;
 */
function debounce(func: Function, delay: number) {
    let timer: NodeJS.Timeout | undefined;
    return function (this: any, ...rest: any[]) {
        clearInterval(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    };
}

/**
 * @param {function} func: the function need to use throttle
 * @param {Number} delay: the time to wait when triggering the function
 * @return {Function} function;
 * @description: when func is triggered ,wait delay time to execute it;if this function is triggered at the delay time again,not do anything;
 */
function throttle(func: Function, delay: number) {
    let timer: NodeJS.Timeout | null | undefined = null;
    return function (this: any, ...rest: any[]) {
        if (!timer)
            timer = setTimeout(() => {
                func.apply(this, arguments);
                timer = null;
            }, delay);
    };
}

const extractAttributes = (object: data, name: any[]) => {
    const newObject: data = {};
    for (let value of name) {
        try {
            if (typeof object !== "object") {
                throw new Error(
                    `typeof the value input  is not a object,its type is ${typeof object}`
                );
            }
            if (Object.hasOwnProperty.apply(object, [String(value)]) === false)
                throw new Error(
                    `A parameter that needs to be extracted "${value}" is undefined`
                );
        } catch (error: any) {
            console.log(`there is a error:${error.message}`);
        } finally {
            newObject[value] = object[value];
        }
    }
    return newObject;
};

const deduplicatedArray = (array: any[], updateData: any[]) => {
    const newArray = [...array, ...updateData];
    const result = Array.from(new Set(newArray));
    return result;
};
const deteleAttributes = (object: data, name: any[]) => {
    const newObject: data = {};
    for (let value of Object.keys(object)) {
        try {
            if (typeof object !== "object") {
                throw new Error(
                    `typeof the value input  is not a object,its type is ${typeof object}`
                );
            }
            if (Object.hasOwnProperty.apply(object, [String(value)]) === false)
                throw new Error(
                    `A parameter that needs to be deleted "${value}" is undefined`
                );
        } catch (error: any) {
            console.log(`there is a error:${error.message}`);
        } finally {
            if (name.indexOf(value) === -1) newObject[value] = object[value];
        }
    }
    return newObject;
};
export {
    convertToFormData,
    convertToUrlParams,
    debounce,
    throttle,
    extractAttributes,
    deduplicatedArray,
    deteleAttributes,
};
