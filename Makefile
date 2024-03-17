lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	npx start-server -s ./frontend/build

build:
	rm -rf frontend/build 
	npm run build