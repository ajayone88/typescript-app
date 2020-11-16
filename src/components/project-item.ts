/// <reference path="./component.ts" />
/// <reference path="../decorators/autobind.ts" />

namespace App {
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Dragable{
    
        constructor(private hostId : string, private project:Project){
            super('single-project', hostId, false, project.id);
            this.configure();
            this.renderContent();
        }  
    
        get getPersonString(){
            if(this.project.people === 1){
                return '1 person assigned'
            }else{
                return `${this.project.people} persons assigned`
            }
        }
    
        @autobind
        dragStartHandler(event: DragEvent){
            event.dataTransfer!.setData('text/plain', this.project.id);
            event.dataTransfer!.effectAllowed = 'move';
        }
    
        dragEndHandler(event: DragEvent){
            console.log("End-Handler");
        }
    
        public configure(){
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragend', this.dragEndHandler);
        }
    
        public renderContent(){
            this.element.querySelector('h3')!.innerText = this.project.title;
            this.element.querySelector('h4')!.innerText = this.getPersonString;
            this.element.querySelector('p')!.innerText = this.project.description;
        }
    }
}