let login = new Vue({
    el: '#login',
    data: {
        inputData: {
            account: '',
            password: '',
        },
        inputDataCheck: {
            account: { error: true, errorMsg: '' },
            password: { error: true, errorMsg: '' },
        },
        isbusy: false,
        loginErrorMsg: '',
    },
    methods: {
        loginHandler(e) {
            e.preventDefault();

            if (!this.AccountValidation(this.inputData.account) || !this.PasswordValidation(this.inputData.password)) {
                return;
            }
            isbusy = true;
            axios({
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                url: '/api/Login',
                data: this.inputData
            }).then(res => {
                if (res.status === 200) {
                    TokenSetter(res.data.accessToken);
                    LoginValidRedirect();
                } else {
                    throw new UserException('Unknown Error');
                }

            }).catch(err => {
                this.loginErrorMsg = '帳號或密碼錯誤';
            }).finally(() => {
                isbusy = false;
            });
        },
        AccountValidation(account) {
            if (account) {
                this.inputDataCheck.account.error = false;
                this.inputDataCheck.account.errorMsg = '';
                valid = true;
            } else {
                this.inputDataCheck.account.error = true;
                this.inputDataCheck.account.errorMsg = '帳號不能為空';
            }
            return !this.inputDataCheck.account.error;
        },
        PasswordValidation(password) {
            if (password) {
                this.inputDataCheck.password.error = false;
                this.inputDataCheck.password.errorMsg = '';
            } else {
                this.inputDataCheck.password.error = true;
                this.inputDataCheck.password.errorMsg = '密碼不能為空';
            }
            return !this.inputDataCheck.password.error;
        }
    }
});