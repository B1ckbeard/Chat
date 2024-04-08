const path = 'api/v1';

export default {
  signup: () => [path, 'signup'].join('/'),
  login: () => [path, 'login'].join('/'),
  data: () => [path, 'data'].join('/'),
  loginPage: () => '/login',
  signupPage: () => '/signup',
  mainPage: () => '/',
};
