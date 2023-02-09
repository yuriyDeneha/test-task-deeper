import { Component, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: 'unsubscriber',
  template: ''
})
export class Unsubscriber implements OnDestroy {
  destroy: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}