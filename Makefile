.PHONY: dev-setup
dev-setup:
	docker-compose up -d db adminer

.PHONY: dev-teardown
dev-teardown:
	docker-compose down -v