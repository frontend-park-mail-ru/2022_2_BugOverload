export const setUser = (user: user) => ({
    type: 'setUser',
    value: user,
});

export const actionAuth = () => ({
    type: 'auth',
});

export const actionLogout = () => ({
    type: 'logout',
});

export const actionLogin = (user: user) => ({
    type: 'login',
    value: user,
});

export const actionRegister = (user :user) => ({
    type: 'signup',
    value: user,
});

export const actionGetSettings = () => ({
    type: 'getSettings',
});

export const actionPutSettings = (user: user) => ({
    type: 'putSettings',
    value: user,
});

export const actionPutAvatar = (formDataAvatar: FormData) => ({
    type: 'putAvatar',
    value: formDataAvatar,
});

export const actionGetPublicProfile = (userId: number) => ({
    type: 'getPublicProfile',
    value: userId,
});

export const actionGetUserCollections = (userCollsParams: userCollsParams) => ({
    type: 'getUserCollections',
    value: userCollsParams,
});
