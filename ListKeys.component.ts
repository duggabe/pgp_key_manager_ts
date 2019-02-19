//  ListKeys.component.ts
import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component ({
    selector: 'app-root',
    templateUrl: './ListKeys.component.html'
    })
export class AppListKeys
    {
    makeKeyList ()
        {
        var i;
        var _val;
        var _pos1;
        var _pos2
        if (localStorage.length == 0)
            document.getElementById("list").innerHTML = "None";
        else
            {
            document.getElementById("list").innerHTML = "";
            for (i = 0; i < localStorage.length; i++)
                {
                _val = localStorage.key(i);
                _pos1 = _val.indexOf (".asc");
                _pos2 = _val.indexOf (".json");
                if ((_pos1 > 0) || (_pos2 > 0))
                    {
                    document.getElementById("list").innerHTML += 
                        ("<span>" + i.toString() + "&nbsp;&nbsp;&nbsp;&nbsp;"  + _val + "</span><br>\n");
                    }
                }
            }
        }

    ngOnInit()
        {
        this.makeKeyList ()
        }

    resetUserForm(userForm: NgForm)
        {
        userForm.resetForm();
        // console.log ("resetUserForm");
        }

    onFormSubmit(userForm: NgForm)
        {
        var i = Number (userForm.controls['list_index'].value);
        var _val = localStorage.key(i);
        localStorage.removeItem (_val);
        console.log ("deleted key", i, _val);
        // redraw screen
        userForm.resetForm();
        this.makeKeyList ()
        }
    }
