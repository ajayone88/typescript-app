namespace App {

    export interface Dragable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }
    
    export interface DragTarget {
        dragOverHandler(event: DragEvent): void;
        dragDropHandler(event: DragEvent): void;
        dragLeaveHandler(event: DragEvent): void;
    }

    export enum Status {
        Active,
        Finished
    }
    
    export class Project {
        constructor(
            public id: string, 
            public title: string, 
            public description: string, 
            public people: number,
            public status: Status){
        }
    }
    
}