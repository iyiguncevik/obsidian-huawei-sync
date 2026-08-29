.PHONY: worker-dev worker-deploy

worker-dev:
	cd worker && npm install && npm run dev

worker-deploy:
	cd worker && npm run deploy
