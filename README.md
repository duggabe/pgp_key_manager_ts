# PGP Key Manager written in TypeScript

This code allows the user to create and manage PGP keys in an Angular2 environment.

The code was originally written in JavaScript and tested in a Node.js environment. It has been partially tested in an Angular2 CLI environment. However, at the present time, there are no type definitions for the HKP functions, so complete testing is not possible.

Public and Private Keys are stored in HTML5 localStorage since the Angular2 "sandbox" does not allow access to the user's file system.

A unique feature of this package is encrypting and storing the user's passphrase. When the passphrase is needed for decrypting a message, it can be retrieved from localStorage and decrypted for use.

### Reference code

This code uses the openpgp project. See GitHub (https://github.com/openpgpjs/openpgpjs).

### Development

This code is a module to be included in a larger project such as an email client. This release is a "first cut", and will be revised as my development progresses. I am new to Angular2, TypeScript, as well as GitHub! I welcome suggestions and contributions.

### License

This package is free software: You can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
