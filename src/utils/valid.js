export const checkInput = (input, type = 'text') => {
    if (type == 'email' && (!input || !input.match(/@/))) {
          return false;
    }
    if (type == 'password' && (!input || !input.match(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g))) {
        return false;
    }
    /*if (!input || !input.match(/^[\p{L}\p{M}][\p{L}\p{M}\'\-]{0,48}[\p{L}\p{M}]$/u)) {
        return false;
    }*/
    return true;
}