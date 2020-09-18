export default () => ({
  // 端口
  port: parseInt(process.env.PORT, 10) || 8080,
  links: {
    coreweb:
      process.env.LINK_COREWEB || 'http://factbusicorewebnewpaas.service.sd/',
  },
  // 角色
  roles: {
    business: 'factbusicoreweb_business',
    approval: 'factbusicoreweb_approval',
    system: 'factbusicoreweb_system',
    assets: 'factbusicoreweb_assets',
    funding: 'factbusicoreweb_funding',
    banking: 'factbusicoreweb_banking',
    enterprise: 'factbusicoreweb_enterprise',
    factor: 'factbusicoreweb_factor',
    cashier: 'factbusicoreweb_cashier',
    platform: 'factbusicoreweb_platform',
  },
  // 机构用户默认角色
  customerroles: {
    factbusicorewebnewpaas: {
      'enterprise-role-coreweb-chain-cust': [
        'factbusicoreweb_business',
        'factbusicoreweb_approval',
        'LSQYSHJS',
        'LSQYYWJS',
        'cofco-enterprise-admin',
      ], //供应商
      FBLPTF: [], //平台方
      CoreEnterprise: [
        'factbusicoreweb_business',
        'factbusicoreweb_approval',
        'HXQYSHJS',
        'HXQYYWJS',
        'cofco-enterprise-admin',
      ], //核心企业
      CoreEnterpriseUnit: [
        'factbusicoreweb_business',
        'factbusicoreweb_approval',
        'HXQYSHJS',
        'HXQYYWJS',
        'cofco-enterprise-admin',
      ], //核心企业子公司
      LawFirm: [], //律所
      Club: [], //会所
      PlanManager: [], //计划管理人
      RatingAgencies: [], //评级机构
      Funder: [], //资金方
      NonGrainCreditDebtor: [], //非粮信债务人
    },
    'realm-management': {
      'enterprise-role-coreweb-chain-cust': ['realm-admin'], //供应商
      FBLPTF: ['realm-admin'], //平台方
      CoreEnterprise: ['realm-admin'], //核心企业
      CoreEnterpriseUnit: ['realm-admin'], //核心企业子公司
      LawFirm: ['realm-admin'], //律所
      Club: ['realm-admin'], //会所
      PlanManager: ['realm-admin'], //计划管理人
      RatingAgencies: ['realm-admin'], //评级机构
      Funder: ['realm-admin'], //资金方
      NonGrainCreditDebtor: ['realm-admin'], //非粮信债务人}
    },
  },
  // keycloak
  keycloak: {
    url: process.env.SERVICE_KEYCLOAK_ADDRESS || 'http://sso.qloud.io/auth',
    realmName: process.env.KEYCLOAK_REALM_NAME || 'cofco',
    client: process.env.KEYCLOAK_CLIENT || 'portal_node',
    adminUrl: process.env.KEYCLOAK_ROOTURL || 'http://portal.baoli.com:4200',
    secret:
      process.env.KEYCLOAK_SECRET || 'd94f33fb-7752-4d03-9b88-a6f1c0ed9d52',
    name: process.env.KEYCLOAK_NAME || '门户客户端',
    description: process.env.KEYCLOAK_DESCRIPTION || '门户客户端',
    admin: {
      clientId: process.env.KEYCLOAK_ADMIN_CLI_CLIENT_ID || 'admin-cli',
      username: process.env.KEYCLOAK_ADMIN_CLI_USERNAME || 'cofco_admin', //'keycloak',
      password: process.env.KEYCLOAK_ADMIN_CLI_PASSWORD || '111111',
      grantType: process.env.KEYCLOAK_ADMIN_CLI_GRANT_TYPE || 'password',
      clientSecret:
        process.env.KEYCLOAK_ADMIN_CLI_CLIENT_SECRET ||
        '73e6416a-4baa-4391-9e0c-29f16256151a',
    },
  },
  service: {
    orgAddress:
      process.env.SERVICE_ORGANIZATION_ADDRESS ||
      'http://organization.service.consul',
    messageAddress:
      process.env.SERVICE_MESSAGE_ADDRESS || 'http://message.service.consul',
  },
});
