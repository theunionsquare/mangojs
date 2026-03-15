.PHONY: help build dev docs docs-serve release clean install docker docker-up docker-down

# Default target
help:
	@echo "MangoJS Monorepo Commands"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Development:"
	@echo "  install      Install all dependencies"
	@echo "  build        Build @mangojs/core"
	@echo "  build-all    Build core + docs"
	@echo "  dev          Watch mode for core"
	@echo "  clean        Remove build artifacts"
	@echo ""
	@echo "Documentation:"
	@echo "  docs-build VERSION=x.x.x  Create version snapshot and build docs"
	@echo "  docs-build-latest          Build docs for the latest version"
	@echo "  docs-serve                 Preview docs locally"
	@echo ""
	@echo "Release:"
	@echo "  release VERSION=x.x.x [FLAGS=...]  Release new version"
	@echo "    FLAGS: --skip-docs --skip-publish --skip-git --dry-run"
	@echo ""
	@echo "Docker:"
	@echo "  docker       Build Docker image"
	@echo "  docker-up    Build and start with docker-compose"
	@echo "  docker-down  Stop and remove containers"
	@echo ""
	@echo "Examples:"
	@echo "  make release VERSION=1.0.0"
	@echo "  make release VERSION=1.0.0 FLAGS='--skip-docs'"
	@echo "  make docker-up"

# Development
install:
	pnpm install

build:
	pnpm build

build-all:
	pnpm build:all

dev:
	pnpm dev

clean:
	pnpm clean

# Documentation
docs-build:
ifndef VERSION
	$(error VERSION is required. Usage: make docs VERSION=1.0.0)
endif
	pnpm --filter @mangojs/docs copy:handbook
	pnpm --filter @mangojs/docs docusaurus docs:version $(VERSION)
	pnpm --filter @mangojs/docs docusaurus docs:version latest
	pnpm build:docs

docs-serve:
	pnpm dev:docs

# Release
release:
ifndef VERSION
	$(error VERSION is required. Usage: make release VERSION=1.0.0)
endif
	node scripts/release.js $(VERSION) 

# Docker
docker:
	docker build -t mangojs-web .

docker-up:
	docker-compose up -d --build

docker-down:
	docker-compose down
