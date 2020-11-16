/// <reference path="./component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../states/project-states.ts" />

namespace App {
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> {
        assignedProject: Project[];
    
        constructor(private type: 'active' | 'finished'){
            super('project-list', 'app', false,  `${type}-project-list`);
            this.assignedProject = [];
            this.configure();
            this.renderContent();
        }
    
        @autobind
        dragOverHandler(event: DragEvent){
            console.log("Over-handler");
            if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain'){
                event.preventDefault();
            }
        }
    
        @autobind
        dragDropHandler(event: DragEvent){
            console.log("Drop-handler");
            const projId  = event.dataTransfer!.getData('text/plain');
            const status = this.type === 'active' ? Status.Active : Status.Finished;
            projectState.moveProject(projId, status);
        }
    
        dragLeaveHandler(){
            console.log("Leave-handler");
        }
    
        public configure(){
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('drop', this.dragDropHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
    
            projectState.addListners((projects: Project[]) =>{
                const relevantProject = projects.filter(project =>{
                    if(this.type === 'active'){
                        return project.status === Status.Active;
                    }
                    return project.status === Status.Finished;
                });
                this.assignedProject = relevantProject;
                this.renderProject();
            });
        }
    
        public renderContent(){
            const listId = `${this.type}-project-ul-list`
            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + " PROJECT";
        }
    
        private renderProject(){
            const listEl= document.getElementById(`${this.type}-project-ul-list`)!;
            listEl.innerHTML = '';
            for(const projItem of this.assignedProject){
                new ProjectItem(`${this.type}-project-ul-list`, projItem);
            }
        }
    }
}