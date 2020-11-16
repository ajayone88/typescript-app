/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

namespace App{
    const proj = new ProjectInput();
    const activeProj = new ProjectList('active');
    const finishedProj = new ProjectList('finished');
}
