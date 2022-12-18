# #* Variables

# #* Setup

.PHONY: $(shell sed -n -e '/^$$/ { n ; /^[^ .\#][^ ]*:/ { s/:.*$$// ; p ; } ; }' $(MAKEFILE_LIST))

.DEFAULT_GOAL := help

# #* Commands

help: ## list make commands
	@echo ${MAKEFILE_LIST}
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

pc-init: ## reset pre-commit
	@python3 -m pip uninstall pre-commit
	@python3 -m pip install pre-commit
	@pre-commit clean
	@pre-commit install-hooks
	@pre-commit run --all-files

run-pc: ## git add commit run --all-files
	@git add .
	@pre-commit run --all-files
	git status
	@git commit -m "pre-commit run --all-files"
	git status

git: ## run git add commit push flow
	@git add .
	@pre-commit run --all-files
	git status
	@git commit -m "make git"
	@git push

run-es-check: ## check eslinter outputs
	@./node_modules/.bin/eslint cookiecutter/
	@./node_modules/.bin/eslint heartbeat/
	@./node_modules/.bin/eslint omni-search/
	@./node_modules/.bin/eslint tabs-to-clipboard/
	@./node_modules/.bin/eslint tracking-extension/

run-es: ## eslinter fix javascript files
	@./node_modules/.bin/eslint cookiecutter/ --fix
	@./node_modules/.bin/eslint heartbeat/ --fix
	@./node_modules/.bin/eslint omni-search/ --fix
	@./node_modules/.bin/eslint tabs-to-clipboard/ --fix
	@./node_modules/.bin/eslint tracking-extension/ --fix

install-rvm: ## install rvm then ruby -- separate from system instance
	@curl -L https://get.rvm.io | bash -s stable
	@source ~/.rvm/scripts/rvm
	@rvm install ruby
	@rvm use ruby
	@rvm install ruby
	@rvm use ruby
	@which rvm
