down:
	docker-compose down --remove-orphans -v

up:
	docker-compose up -d

start: down up shell

stop: down
	
launch:
	docker-compose down --remove-orphans -v
	docker-compose up -d
	@$(call exec,yarn install,server)
	@$(call exec,yarn start,server)

shell:
	@$(call exec,sh,server)
	
define exec
docker-compose exec $(2) $(1)
endef
