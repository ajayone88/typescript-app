namespace App {
    export abstract class Component<T extends HTMLElement, U extends HTMLElement>{
        templateElement: HTMLTemplateElement;
        hostElement: T;
        element: U;
        constructor(templateId: string, hostId: string, insertAtStart: boolean, elementId?: string){
            this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
            this.hostElement = document.getElementById(hostId)! as T;
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild as U;
            if(elementId){
                this.element.id = elementId;
            }
            this.attach(insertAtStart);
        }
    
        private attach(insertAtBegining: boolean){
            this.hostElement.insertAdjacentElement(insertAtBegining ? 'afterbegin' : 'beforeend', this.element);
        }
    
        public abstract configure(): void;
        public abstract renderContent(): void;
    }
}