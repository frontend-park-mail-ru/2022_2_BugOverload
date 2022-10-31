.PHONY: run start stop restart

all: start run

run:
	npm run back 3000

start:
	docker-compose up -d

stop:
	docker-compose kill
	docker-compose down

restart:
	docker-compose restart
