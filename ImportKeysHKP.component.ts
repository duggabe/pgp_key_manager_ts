//  ImportKeysHKP.component.ts
import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import * as openpgp from 'openpgp';

@Component ({
    selector: 'app-root',
    templateUrl: 'app/ImportKeysHKP.component.html'
    })
export class AppImportKeysHKP
    {
    msg = 'Waiting for input.';

    resetUserForm(userForm: NgForm)
        {
        userForm.resetForm();
        }

    onFormSubmit(userForm: NgForm)
        {
        var s_email = userForm.controls['s_email'].value;
        // look up recipient's public key at 'https://pgp.mit.edu'
        this.msg = "Looking up Public Key ...";
        var hkp = new openpgp.HKP ('https://pgp.mit.edu');
        var options = {
            query: s_email
            };
        hkp.lookup (options).then (function (_resp:any)
            {
            if (_resp.status != 200)
                {
                this.msg = ("Could not find public key for " + s_email);
                }
            else
                {
                var rcvdKey = _resp + "\n";
                var _pubkfn = (s_email + "_public.asc");
                localStorage.setItem (_pubkfn, rcvdKey);
                userForm.resetForm();
                this.msg = "Complete.";
                }
            });
        }
    }
