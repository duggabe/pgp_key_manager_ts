// app.component.ts
import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
//  this is the top level navigation panel

@Component({
    selector: 'app-root',
    styleUrls: ['./dcsmail.css'],
    template: `
    <p class="bl_strip">Runbox 7&nbsp;&nbsp;&nbsp;&nbsp;PGP Key Manager</p><br>
    <a [routerLink] = "['/GenKeys']">PGP Key Generation</a>&nbsp;&nbsp;&nbsp;
    <a [routerLink] = "['/ListKeys']">List or Delete PGP Keys</a>&nbsp;&nbsp;&nbsp;
    <a [routerLink] = "['/ImportKeys']">Import PGP Public Key from screen</a>&nbsp;&nbsp;&nbsp;
    <a [routerLink] = "['/ImportKeysHKP']">Import PGP Public Key from HKP server</a>
    <br><br>
    <hr>
    <router-outlet></router-outlet>`
    })

export class AppComponent
    {
    }
