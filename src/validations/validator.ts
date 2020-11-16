namespace App {
    export interface Validateable {
        value: number | string;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }
    
    export function validate(validateValue: Validateable){
        let isValid = true;
        if(validateValue.required){
            isValid = isValid && validateValue.value.toString().trim().length !==0;
        }
        if(validateValue.minLength != null && typeof validateValue.value  === 'string'){
            isValid = isValid && validateValue.value.trim().length >= validateValue.minLength;
        }
        if(validateValue.maxLength != null && typeof validateValue.value  === 'string'){
            isValid = isValid && validateValue.value.length <= validateValue.maxLength;
        }
        if(validateValue.min != null && typeof validateValue.value  === 'number'){
            isValid = isValid && validateValue.value >= validateValue.min;
        }
        if(validateValue.max != null && typeof validateValue.value  === 'number'){
            isValid = isValid && validateValue.value <= validateValue.max;
        }
        return isValid;
    }
}