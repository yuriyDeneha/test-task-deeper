import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";

import { ItemsService } from "../shell/services/items.service";
import { GET_ITEMS, GET_ITEMS_ERROR, GET_ITEMS_SUCCESS } from "./items.reducer";

@Injectable()
export class ItemsEffects {
    constructor(private actions: Actions,
        private service: ItemsService) {
    }

    getItems$ = createEffect(() => this.actions.pipe(
        ofType(GET_ITEMS),
        switchMap(() =>
            this.service.getItems().pipe(
                map(items => ({ type: GET_ITEMS_SUCCESS, payload: items })),
                catchError(() => of({ type: GET_ITEMS_ERROR }))))));
}