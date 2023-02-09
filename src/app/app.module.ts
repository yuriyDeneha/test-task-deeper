import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { IndexComponent } from './shell/components/index/index.component';
import { ItemsEffects } from './store/items.effects';
import { items } from './store/items.reducer';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot({ items }),
    EffectsModule.forRoot([ItemsEffects])
  ],
  providers: [Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
