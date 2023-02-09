import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { TreeItems } from "src/app/shared/interfaces/tree.interface";
import { items } from "../items";

@Injectable({
    providedIn: 'root'
})
export class ItemsService{
    getItems(): Observable<TreeItems>{
        return of(items);
    }
}