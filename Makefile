.PHONY: help build dev docs docs-version docs-serve release clean install

# Default target
help:
	@echo "MangoJS Development Commands"
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Development:"
	@echo "  install      Install dependencies"
	@echo "  build        Build the project"
	@echo "  dev          Watch mode for development"
	@echo "  clean        Remove build artifacts"
	@echo ""
	@echo "Documentation:"
	@echo "  docs         Generate docs to docs-site/latest/"
	@echo "  docs-version VERSION=x.x.x  Create versioned docs snapshot"
	@echo "  docs-serve   Preview docs locally at http://localhost:3000"
	@echo ""
	@echo "Release:"
	@echo "  release      Run release-it"
	@echo "  release-docs VERSION=x.x.x  Generate versioned docs, commit, and push"
	@echo ""
	@echo "Examples:"
	@echo "  make docs-version VERSION=1.0.0"
	@echo "  make release-docs VERSION=1.0.0"

# Development
install:
	pnpm install

build:
	pnpm build

dev:
	pnpm dev

clean:
	rm -rf dist
	rm -rf docs-site

# Documentation
docs:
	pnpm docs

docs-version:
ifndef VERSION
	$(error VERSION is required. Usage: make docs-version VERSION=1.0.0)
endif
	pnpm docs:version $(VERSION)

docs-serve:
	@echo "Starting docs server at http://localhost:3000"
	pnpm docs:serve

# Release
release:
	pnpm release

release-docs:
ifndef VERSION
	$(error VERSION is required. Usage: make release-docs VERSION=1.0.0)
endif
	@echo "Generating documentation for v$(VERSION)..."
	pnpm docs:version $(VERSION)
	@echo "Committing documentation..."
	git add docs-site
	git commit -m "docs: add v$(VERSION) documentation"
	@echo "Pushing to remote..."
	git push
	@echo "Done! Documentation for v$(VERSION) has been published."
