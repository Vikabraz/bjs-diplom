
const userForm = new UserForm();


userForm.loginFormCallback = (date) => {
    ApiConnector.login(date, (response) => {
        if ( response.success) {
            location.reload();
             } else {
            userForm.setLoginErrorMessage(response.error);
        }
    } );
}



serForm.registerFormCallback = (date) => {
    ApiConnector.register(date, (response) => {
        if ( response.success) {
            location.reload();
             } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    } );

}
