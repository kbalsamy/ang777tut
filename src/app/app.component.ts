import { Component, ViewChild } from '@angular/core';
import { FCanvasComponent, EFMarkerType } from '@foblex/flow';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
  
})
export class AppComponent {
  title = 'dag-visualizer';
//  @ViewChild(FCanvasComponent, { static: true })
//   public fCanvas!: FCanvasComponent;
//   public onLoaded(): void {
//     this.fCanvas.resetScaleAndCenter(false);
//   }
protected readonly eMarkerType = EFMarkerType;
nodes = [
  { id: 'task1', label: 'Task1', x: 100, y: 50 },
  { id: 'task2', label: 'Task2', x: 100, y: 200 },
  { id: 'task3', label: 'Task 3', x: 100, y: 350 }
];

connections = [
  { from: 'task1', to: 'task2' },
  { from: 'task2', to: 'task3' }
];

ob1 = {
    name:"foo",
    description:"foo description",
    config:[
        {
            name:"taskA",            
            depends:[],
            config:{
                section:["foo", "bar"],
            }
            
        }
    ]
}

ob2 = {
    name:"bar",
    description:"bar description",
    config:[
        {
            name:"taskB",        
            depends:[],
            config:{
                type:'dd',
                version:'1.0.0',
            }
            
        },
        {
            name:"taskC",            
            depends:['taskB'],
            config:{
                section:["foo", "bar"],
            }
            
        }
    ]
}
}
