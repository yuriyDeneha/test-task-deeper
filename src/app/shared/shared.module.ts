import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeComponent } from './components/tree/tree.component';


const declarations = [
  TreeComponent
]

@NgModule({
  declarations,
  exports: declarations,
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
