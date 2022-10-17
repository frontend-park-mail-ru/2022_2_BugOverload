export const setUser = (user) => {
    return {
        type: 'setUser',
        value: user,
    }
}

export const actionAuth = () => {
    return {
        type: 'auth',
    }
}

export const actionLogout = () => {
    return {
        type: 'logout',
    }
}

export const actionLogin = (user) => {
    return {
        type: 'login',
        value: user,
    }
}

export const actionRegister = (user) => {
    return {
        type: 'signup',
        value: user,
    }
}
