//  ListKeys.component.ts
import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component ({
   selector: 'my-app',
    templateUrl: 'app/ListKeys.component.html'
})
export class AppListKeys
    {
    ngOnInit()
        {
        var i;
        var _val;
        if (localStorage.length == 0)
            document.getElementById("list").innerHTML = "None";
        else
            {
            document.getElementById("list").innerHTML = "";
            for (i = 0; i < localStorage.length; i++)
                {
                _val = localStorage.key(i);
                document.getElementById("list").innerHTML += 
                    ("<span>" + i.toString() + "&nbsp;&nbsp;&nbsp;&nbsp;"  + _val + "</span><br>\n");
                }
            document.getElementById("t_box").innerHTML = "";
            }
        }

    resetUserForm(userForm: NgForm)
        {
        userForm.resetForm();
        console.log ("resetUserForm");
        }

    onFormSubmit(userForm: NgForm)
        {
        var i = Number (userForm.controls['list_index'].value);
        var _val = localStorage.key(i);
        console.log (i, _val);
        localStorage.removeItem (_val);
        // redraw screen
        userForm.resetForm();
        if (localStorage.length == 0)
            document.getElementById("list").innerHTML = "None";
        else
            {
            document.getElementById("list").innerHTML = "";
            for (i = 0; i < localStorage.length; i++)
                {
                _val = localStorage.key(i);
                document.getElementById("list").innerHTML += 
                    ("<span>" + i.toString() + "&nbsp;&nbsp;&nbsp;&nbsp;"  + _val + "</span><br>\n");
                }
            }
        }
    }

