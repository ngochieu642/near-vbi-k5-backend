.PHONY: test-all
test-all: dev-setup
	npm run test:all

.PHONY: test-unit
test-unit:
	npm run test:unit

.PHONY: test-e2e
test-e2e: dev-setup
	npm run test:e2e && make dev-teardown

.PHONY: start-dev
start-dev:
	npm run start:dev

.PHONY: build
build:
	npm run build
