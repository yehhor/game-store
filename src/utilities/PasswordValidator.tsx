const passwordValidator = require('password-validator');
const schema = new passwordValidator();

export type ValidationMessage = {
    message: string,
}

// Add properties to it
schema
    .is().min(1)                                    // Minimum length 8
    .is().max(5)                                  // Maximum length 100
    // .has().uppercase()                              // Must have uppercase letters
    // .has().lowercase()                              // Must have lowercase letters
    // .has().digits(2)                                // Must have at least 2 digits
    // .has().not().spaces()                           // Should not have spaces
    // .is().not().oneOf(['Passw0rd', 'Password123']);

export const validate = (pw: string) => schema.validate(pw, {details: true})