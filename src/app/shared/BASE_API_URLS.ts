export enum AUTH_API_PATHS {
    authenticate = 'api/authenticate/oauth/token',
    logout = 'api/authenticate/logout',
    login_configuration = '/api/portal/generale/configuration'
}

export const AUTH_API_URLS = {

    /**
     * URL di autenticazione dell'api server
     * @returns URL per l'autenticazione
     */
    getAuthenticationURL: () => {
        return AUTH_API_PATHS.authenticate;
    },

    getLogoutURL : () => {
        return AUTH_API_PATHS.logout;
    },

    getLoginConfigurationURL : () => {
        return AUTH_API_PATHS.login_configuration;
    }

}