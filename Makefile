.PHONY: run start stop restart

run: 
	npm run prod
	npm run back 80

start:
	docker-compose up -d

stop:
	docker-compose kill
	docker-compose down

restart:
	docker-compose restart
