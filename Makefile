.PHONY: dev-up 	
dev-up:
	@echo "Starting development environment..."
	docker compose -f docker/development/compose.yaml up -d --remove-orphans

.PHONY: dev-down
dev-down:
	@echo "Stopping development environment..."
	docker compose -f docker/development/compose.yaml down --remove-orphans

.PHONY: dev-logs-browserless
dev-logs-browserless:
	docker compose -f docker/development/compose.yaml logs -f browserless-dev

.PHONY: dev-logs-db
dev-logs-db:
	docker compose -f docker/development/compose.yaml logs -f mongodb-primary

.PHONY: staging-up
staging-up:
	@echo "Starting staging environment..."
	docker compose -f docker/staging/compose.yaml --progress=plain build
	docker compose -f docker/staging/compose.yaml up -d --remove-orphans

.PHONY: staging-down
staging-down:
	@echo "Stopping staging environment..."
	docker compose -f docker/staging/compose.yaml down --remove-orphans

.PHONY: staging-logs-browserless
staging-logs-browserless:
	docker compose -f docker/staging/compose.yaml logs -f browserless

.PHONY: staging-logs-db
staging-logs-db:
	docker compose -f docker/staging/compose.yaml logs -f mongodb-primary

.PHONY: staging-logs-app
staging-logs-app:
	docker compose -f docker/staging/compose.yaml logs -f app
