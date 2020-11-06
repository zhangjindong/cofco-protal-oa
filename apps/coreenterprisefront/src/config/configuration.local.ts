import configuration from './configuration';
export default () => ({
  ...configuration(),
  
  // keycloak: {
  //   url:
  //     process.env.SERVICE_KEYCLOAK_ADDRESS ||
  //     'http://portal.baoli.com:8081/auth',
  //   realmName: 'cofco',
  //   client: process.env.KEYCLOAK_CLIENT || 'factbusicorewebnewpaas',
  //   admin: {
  //     clientId: 'admin-cli',
  //     username: 'cofco_admin', //'keycloak',
  //     password: '111111',
  //     grantType: 'password',
  //     clientSecret: 'fd9e3d3f-9111-4daf-98ab-01d514915518',
  //   },
  // },
});
