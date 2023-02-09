import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

import { TreeItems } from '../../interfaces/tree.interface';

@Component({
  selector: 'deeper-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less']
})
export class TreeComponent {
  @Input() items: TreeItems = [];
  
  @ContentChild(TemplateRef)
  public nodeTemplate: TemplateRef<any> | null = null;
}
