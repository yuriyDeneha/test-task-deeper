import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, takeUntil } from 'rxjs/operators';

import { Unsubscriber } from 'src/app/shared/helpers/unsubscriber/unsubscriber.helper';
import { ToggleTypes, TreeItem, TreeItems } from 'src/app/shared/interfaces/tree.interface';
import { getItems, SEARCH_ITEMS, State, TOGGLE_ALL_ITEMS, TOGGLE_ITEM } from 'src/app/store/items.reducer';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent extends Unsubscriber implements OnInit {

  items: TreeItems = [];
  filteredItems: TreeItems = [];
  form!: FormGroup;

  get toggleTypes(): typeof ToggleTypes {
    return ToggleTypes
  }

  constructor(private fb: FormBuilder, private store: Store<State>) {
    super();
  }

  ngOnInit(): void {
    this.get();
    this.initForm();
  }

  toggle(item: TreeItem): void {
    this.store.dispatch({ type: TOGGLE_ITEM, payload: item})
  }

  toggleAll(type: ToggleTypes): void {
    this.store.dispatch({ type: TOGGLE_ALL_ITEMS, payload: type})
  }


  get(): void {
    this.store.dispatch(getItems());
     this.store.select("items").pipe(
            map(item => item?.data),
      ).subscribe({
        next: v => {
          this.items = v
          this.filteredItems = v;
        }
      });
  }

  private initForm(): void {
    this.form = this.fb.group({
      searchInput: ''
    });
    this.subscribeOnFormChanges();
  }

  private subscribeOnFormChanges(): void {
    this.form.get('searchInput')?.valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe({
        next: (data) => this.store.dispatch({ type: SEARCH_ITEMS, payload: data }),
      })
  }

}
