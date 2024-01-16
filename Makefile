build:
	docker-compose -f ./srcs/docker-compose.yml up -d --build

start : 
	@docker-compose -f ./srcs/docker-compose.yml start