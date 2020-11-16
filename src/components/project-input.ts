/// <reference path="./component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../validations/validator.ts" />


namespace App {
    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;
    
        constructor(){
            super('project-input', 'app', true)
            this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;
            this.configure();
        }
    
        public configure(){
            this.element.addEventListener("submit", this.eventHandler);
        }
    
        public renderContent(){}
    
        private clearInput(){
            this.titleInputElement.value ="";
            this.descriptionInputElement.value ="";
            this.peopleInputElement.value ="";
        }
    
        private gatherInputValues(): [string, string, number] | void{
            const title = this.titleInputElement.value;
            const description = this.descriptionInputElement.value;
            const people = this.peopleInputElement.value;
            
            const titleInput: Validateable ={
                value: title,
                required:true
            }
            const descriptionInput: Validateable ={
                value: description,
                required:true,
                minLength:5
            }
            const peopleInput: Validateable ={
                value: +people,
                required:true,
                min:5
            }
    
            if(!validate(titleInput) ||
                !validate(descriptionInput) || 
                !validate(peopleInput)){
                  alert("Please fill in the fieds");
                  return 
              }else{
                  return [title, description, +people];
              }
        }
    
        @autobind
        private eventHandler(event: Event){
            event.preventDefault();
            const inputvalues = this.gatherInputValues();
            if(Array.isArray(inputvalues)){
                const [title, description, people] = inputvalues;
                projectState.addProject(title, description, people);
                this.clearInput();
            }
        }
    }
}