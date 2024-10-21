/*
Los helpers son funciones que nos ayudan a realizar tareas específicas. En este caso, el helper de bcrypt
nos ayuda a encriptar y comparar contraseñas.
*/

"use strict";
import bcrypt from "bcryptjs"; //* bcrypt is a password-hashing function.

export async function encryptPassword(password){
    const salt = await bcrypt.genSalt(10); //* salt es un valor aleatorio que se añade a la contraseña antes de realizar el hash.
    return await bcrypt.hash(password, salt); //* El método bcrypt.hash() se utiliza para generar un hash de la contraseña.
}

export async function comparePassword(password, receivedPassword){
    return await bcrypt.compare(password, receivedPassword); //* El método bcrypt.compare() se utiliza para comparar la contraseña con el hash.
}

/*
La función encryptPassword() se utiliza para encriptar la contraseña del usuario. En la función, se genera un salt aleatorio.
El salt es un valor aleatorio que se añade a la contraseña antes de realizar el hash. Luego, se utiliza el método bcrypt.hash(),
este método se utiliza para generar un hash de la contraseña. Finalmente, se retorna el hash de la contraseña.

La función comparePassword() se utiliza para comparar la contraseña con el hash. En la función, se utiliza el método
bcrypt.compare(), este método se utiliza para comparar la contraseña con el hash. Finalmente, se retorna el resultado de
la comparación.

Definiciones:
- bcrypt: bcrypt es una función de hash de contraseña.
- salt: salt es un valor aleatorio que se añade a la contraseña antes de realizar el hash.
- hash: hash es una cadena de caracteres generada a partir de la contraseña original.
*/