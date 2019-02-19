// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';
import { AppGenKeys } from './GenKeys.component';
import { AppListKeys } from './ListKeys.component';
import { AppImportKeys } from './ImportKeys.component';
import { AppImportKeysHKP } from './ImportKeysHKP.component';
import { PageNotFoundComponent } from  './NotFound.component';
import * as openpgp from 'openpgp';

const appRoutes: Routes = [
    { path: 'GenKeys', component: AppGenKeys },
    { path: 'ListKeys', component: AppListKeys },
    { path: 'ImportKeys', component: AppImportKeys },
    { path: 'ImportKeysHKP', component: AppImportKeysHKP },
    { path: '**', component: PageNotFoundComponent } 
    ];

@NgModule({
  imports: [     
        BrowserModule,
		FormsModule,
        RouterModule.forRoot(appRoutes)
        ],
  declarations: [
        AppComponent,
        AppGenKeys,
        AppListKeys,
        AppImportKeys,
        AppImportKeysHKP,
        PageNotFoundComponent
        ],
   bootstrap: [ AppComponent ]
})
export class AppModule { }
