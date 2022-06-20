.PHONY: dev-setup
dev-setup:
	docker-compose up -d db adminer

.PHONY: dev-teardown
dev-teardown:
	docker-compose down -v

.PHONY: deploy
deploy:
	docker-compose up --build -d frontend backend db

.PHONY: stop-deploy
stop-deploy:
	docker-compose down

.PHONY: destroy-deploy
destroy-deploy:
	docker-compose down -v

.PHONY: ssh-dev
ssh-dev:
	ssh -i personal-simple-shoot-server.pem ec2-user@54.254.178.184

