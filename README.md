

# 华软 新微前端开发 Todolist
- [x] 实现本地K8s，keycloak的本地化存储，和新节点的发布
- [x] 本地k8部署keycloak redis、node
- [ ] 实现Redis托管Nestjs的session。参见https://github.com/tj/connect-redis
- [ ] 实现Nestjs 的微服务，及Redis的微服务化
- [ ] 验证Nest微服务和keycloak redis 是否正常。
---
- [ ] 进一步跟踪Angular11 webpack5 实现微前端的思路。尝试基于Angular11微前端的示例，构建angular微前端。
- [ ] 思考Angualr微前端的几大要点如何满足
- - [ ] 是否足够独立
- - [ ] 是否足够快速，不冗余
- - [ ] 是否足够安全
- - [ ] 公共包、工具、公共组件的提取
- [ ] 实现keycloak端对客户端的自动化注册。
- [ ] 实现keycloak端对角色的自动化管理。
- [ ] 实现keycloak端对资源的自动化管理。
- [ ] 实现keycloak端对资源的自动化管理。
- [ ] 思考对接keycloak权限的时候，通过岗位进行配置



# 前端架构蓝图

```
graph LR
用户界面-->AngularShell
用户界面-->Keycloak
Keycloak-->用户界面
Keycloak-->NestShell
AngularShell-->ApplicationA
AngularShell-->ApplicationB
AngularShell-->ApplicationC
ApplicationA-->NestShell+Redis
ApplicationB-->NestShell+Redis
ApplicationC-->NestShell+Redis
NestShell+Redis-->NodeA
NestShell+Redis-->NodeB
NestShell+Redis-->NodeC
NodeA-->ApiServiceA
NodeB-->ApiServiceB
NodeC-->ApiServiceC
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).


## docker keycloak
docker run --name keycloak -d -p 443:443 -p 9990:9990 -p 8080:8081 \
-e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin \
--restart=always jboss/keycloak

docker cp keycloak:/opt/jboss/keycloak ./keycloak

chown 1000:1000 /root/data/keycloak -R

docker run --name keycloak -d -p 443:443 -p 9990:9990 -p 8080:8081 \
-e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin \
-v /root/data/keycloak:/opt/jboss/keycloak \
--restart=always jboss/keycloak

docker run --name keycloak -d -p 8080:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin quay.io/keycloak/keycloak:11.0.2
docker run --name keycloak -d -p 8081:8080 -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -v /root/data/keycloak:/opt/jboss/keycloak quay.io/keycloak/keycloak:11.0.2