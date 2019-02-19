//  GenKeys.component.ts
import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import * as openpgp from 'openpgp';

@Component ({
    selector: 'app-root',
    templateUrl: './GenKeys.component.html'
    })
export class AppGenKeys
    {
    msg = 'Waiting for input. All fields are required.';

    dcs_encrypt (dString:string, now:number) 
        {
        var RN_table = [214, 185, 173, 88, 221, 133, 174, 198, 251, 209, 230, 26, 120, 250, 135, 58,
        75, 220, 37, 54, 89, 163, 22, 176, 62, 98, 140, 41, 11, 145, 14, 226,
        128, 148, 252, 115, 171, 85, 119, 86, 94, 205, 56, 246, 125, 234, 97, 4,
        180, 162, 240, 59, 32, 149, 84, 38, 191, 103, 106, 95, 201, 208, 45, 153,
        182, 141, 245, 102, 167, 179, 76, 44, 92, 192, 31, 83, 19, 30, 178, 223,
        165, 159, 42, 28, 52, 51, 244, 137, 142, 183, 105, 241, 25, 189, 48, 138,
        222, 67, 242, 215, 203, 116, 204, 170, 194, 224, 211, 87, 193, 206, 82, 212,
        236, 15, 225, 23, 157, 150, 147, 169, 114, 5, 80, 64, 187, 100, 112, 232,
        29, 238, 235, 96, 81, 184, 118, 124, 188, 3, 134, 200, 69, 239, 113, 143,
        0, 127, 156, 130, 72, 181, 73, 237, 79, 77, 168, 27, 132, 190, 46, 61,
        71, 123, 1, 57, 6, 101, 218, 18, 104, 47, 195, 40, 33, 136, 217, 39,
        247, 131, 16, 166, 146, 74, 34, 155, 175, 49, 144, 8, 117, 7, 160, 249,
        63, 172, 70, 255, 186, 60, 210, 107, 216, 36, 202, 122, 177, 126, 43, 111,
        90, 254, 68, 158, 13, 129, 228, 152, 91, 93, 50, 229, 248, 164, 9, 121,
        227, 53, 213, 21, 253, 196, 10, 35, 151, 24, 154, 99, 66, 161, 207, 109,
        219, 55, 78, 108, 243, 20, 65, 139, 199, 233, 110, 12, 231, 17, 2, 197];
        var aBlock = [];
        var i;
        var inByte;
        var k = now & 0xff;         // form index from time
        var len = dString.length;
        var m;
        var outByte;
        var temp;
        for (i = 0; i < len; i++) 
            {
            inByte = dString.charCodeAt(i);
            m = RN_table[k];
            temp = (inByte ^ m);
            temp &= 0x0ff;
            outByte = temp & 0x0f; // least significant nibble
            outByte |= 0x40;
            aBlock.push (String.fromCharCode(outByte));
            temp >>= 4;
            outByte = temp & 0x0f; // most significant nibble
            outByte |= 0x40;
            aBlock.push (String.fromCharCode(outByte));
            k++;
            k &= 0x0ff;
            }
        return (aBlock.join(""));
        }

    resetUserForm(userForm: NgForm)
        {
        userForm.resetForm();
        }

    onFormSubmit(userForm: NgForm)
        {
        if ((!userForm.controls['g_name'].valid) || (!userForm.controls['g_email'].valid) || (!userForm.controls['g_pass'].valid))
            {
            console.log ("input not valid");
            this.msg = "Input not valid";
            }
        else
            {
            // Initialize openpgp
            openpgp.initWorker({path: 'node_modules/openpgp/dist/openpgp.worker.min.js'});
            this.msg = "Generating keys ...";
            var g_name = userForm.controls['g_name'].value;
            var g_email = userForm.controls['g_email'].value;
            var g_pass = userForm.controls['g_pass'].value
            // store encrypted passphrase
            console.log ("Encrypting passphrase.");
            this.msg = "Encrypting passphrase.";
            var now:any = new Date();
            var _idx:number = now & 0x0ff;
            var _out:string = this.dcs_encrypt (g_pass, _idx);
            var pp:any = {
                ePassPhrase: _out,
                index: _idx
                };
            var passCreds:string = JSON.stringify(pp);
            var _pgpfn:string = g_email + "_pass.json";
            localStorage.setItem (_pgpfn, passCreds);
            console.log (passCreds);
            // generate keys
            var options =
                {
                userIds: [{ name:g_name, email:g_email }],
                numBits: 4096,                                            // RSA key size
                passphrase: g_pass
                };
            var _genKeyDone = openpgp.generateKey(options);
            _genKeyDone.then(function(key:any)
                {
                var pubkey:any = key.publicKeyArmored;   // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
                var privkey:any = key.privateKeyArmored; // '-----BEGIN PGP PRIVATE KEY BLOCK ... '
                var revocationCertificate:any = key.revocationCertificate; // '-----BEGIN PGP PUBLIC KEY BLOCK ... '
                // store public key
                var _pubkfn:string = (g_email + "_public.asc");
                localStorage.setItem (_pubkfn, pubkey);
                // store private key
                var _privkfn:string = (g_email + "_private.asc");
                localStorage.setItem (_privkfn, privkey);
                // store revocation certificate
                var _revkfn:string = (g_email + "_rev.asc");
                localStorage.setItem (_revkfn, revocationCertificate);
                // Upload to server
                console.log ("Uploading public key to HKP server ...");
                this.msg = "Uploading public key to HKP server ...";
                var hkp = new openpgp.HKP ('https://pgp.mit.edu');
                hkp.upload (pubkey).then (function (_resp:any)
                    {
                    if (_resp.status != 200)
                        {
                        this.msg = ("Could not upload public key: " + _resp.statusText);
                        }
                    else
                        {
                        this.msg = "Complete.";
                        }
                    });         // end upload
                });         // end generate .then
            _genKeyDone.catch (function (error)
                {
                console.log ("Key generation error: " + error.message);
                this.msg = "Key generation error.";
                });
            }           // end else
        }           // end if
    }           // end class
