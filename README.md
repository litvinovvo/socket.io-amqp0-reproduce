# steps to reproduce

- Install dependencies: npm ci
- Run rabbitmq container: docker-compose up -d
- Start first instance: npm run start
- Start second instance: PORT=3001 npm run start
- Open localhost:3000 and localhost:3001 in two different tabs/browsers
- Message from one of opened tab/browser
- Only one tab/browser receive message, but we expect message for all tabs/browsers