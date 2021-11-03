const userInfo = {
    name: 'jack',
}

userInfo.getName = function () {
    return this.name;
}
