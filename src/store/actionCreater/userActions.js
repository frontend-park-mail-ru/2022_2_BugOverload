export const setUser = (user) => ({
    type: 'setUser',
    value: user,
});

export const actionAuth = () => ({
    type: 'auth',
});

export const actionLogout = () => ({
    type: 'logout',
});

export const actionLogin = (user) => ({
    type: 'login',
    value: user,
});

export const actionRegister = (user) => ({
    type: 'signup',
    value: user,
});

export const actionGetSettings = () => ({
    type: 'getSettings',
});

export const actionPutSettings = (user) => ({
    type: 'putSettings',
    value: user,
});
