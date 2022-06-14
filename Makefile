.PHONY: dev-setup
dev-setup:
	docker-compose up -d db

.PHONY: dev-teardown
dev-teardown:
	docker-compose down