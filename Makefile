.PHONY: all cogs server watch

BIN=node_modules/.bin/
COGS=$(BIN)cogs

all: watch server

cogs:
	$(COGS) --compress

server:
	npm run start

watch:
	$(COGS) --compress --watch src
