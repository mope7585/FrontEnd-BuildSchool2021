

function LoginInvalidRedirect() {
    window.location.href = '/Home/Login';
}

function LoginValidRedirect() {
    window.location.href = '/Home/index';
}

function TokenSetter(value) {
    return localStorage.setItem('accessToken', value);
}

function TokenGetter() {
    return localStorage.getItem('accessToken');
}

//產生Authorize Bear 格式
function GenCurrentAuthBarerFormat() {
    return `Bearer ${TokenGetter()}`;
}