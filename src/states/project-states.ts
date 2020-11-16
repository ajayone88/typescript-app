namespace App{
    type Listener<T> = (items: T[]) => void;

    class State<T> {

        protected listeners: Listener<T>[] = [];
        
        addListners(listnerFn: Listener<T>){
            this.listeners.push(listnerFn);
        }
    }

    export class ProjectState extends State<Project> {
        private projects: Project[] = [];
        private static instance: ProjectState;
        private constructor(){
            super();
        }

        static getInstance(){
            if(this.instance){
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }

        addProject(title: string, description: string, people:number){
            const newProject: Project = new Project(
                Math.random().toString(),
                title,
                description,
                people,
                Status.Active   
            )
            this.projects.push(newProject);
            this.updateListener();
        }

        moveProject(projId: string, newStatus: Status){
            const project = this.projects.filter((proj: Project) => proj.id === projId)[0];     
            if(project && project.status !== newStatus){
                project.status = newStatus;
                this.updateListener(); 
            }   
        }
    
        private updateListener(){
            for(const listenrFn of this.listeners){
                listenrFn(this.projects.slice());
            }
        }
    }

    export const projectState = ProjectState.getInstance();
}