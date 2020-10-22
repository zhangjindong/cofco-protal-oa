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