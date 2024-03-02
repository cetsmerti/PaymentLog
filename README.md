Launch
fill in .env . There is moc data .env.exemple to help
////
Run with tests
Replace .env with
DB_HOST = host.docker.internal
Run
docker compose -f docker-compose.app.yaml up

///
Run dev mode
DB_HOST = 127.0.0.1
Launch
docker compose -f docker-compose.app.yaml up
