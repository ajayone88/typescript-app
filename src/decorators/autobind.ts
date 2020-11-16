namespace App {
    export function autobind(_1:any, _2: string, descriptor: PropertyDescriptor){
        const oldMethod = descriptor.value;
        const adjMethod = {
            configureable: true,
            get(){
                return oldMethod.bind(this);
            }
        }
        return adjMethod;
    }
}