//  ImportKeys.component.ts
import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component ({
    selector: 'my-app',
    templateUrl: './ImportKeys.component.html'
    })
export class AppImportKeys
    {
    msg = 'Waiting for input. All fields are required.';

    resetUserForm(userForm: NgForm)
        {
        userForm.resetForm();
        }

    onFormSubmit(userForm: NgForm)
        {
        var p_email = userForm.controls['p_email'].value;
        var pubkey = userForm.controls['p_body'].value + "\n";      // public key
        // console.log (p_email, pubkey);
        var _pubkfn = (p_email + "_public.asc");
        localStorage.setItem (_pubkfn, pubkey);
        userForm.resetForm();
        this.msg = "Complete.";
        }
    }
