//o(n/2)
export const removeValueFromArray = (arr, value) => {
    if(!Array.isArray(arr)){
        throw new Error(`1 st argument should be an array`)
    }

    if(value.length === 0 && typeof value !== 'string'){
        throw new Error(`2nd argument should be a string`)
    }

    const tempArray = []

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];

        if(element !== value){
            tempArray.push(element)
        }
        
    }

    return tempArray
}


export const updateValueFromArray = (arr, value, updatedValue) => {
    if(!Array.isArray(arr)){
        throw new Error(`1 st argument should be an array`)
    }

    if(value.length === 0 && typeof value !== 'string'){
        throw new Error(`2nd argument should be a string`)
    }


    if(updatedValue.length === 0 && typeof value !== 'string'){
        throw new Error(`3rd argument should be a string`)
    }

    const tempArray = []

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];

        if(element === value){
            tempArray.push(updatedValue)
        }else{
            tempArray.push(element)
        }
        
    }

    return tempArray
}