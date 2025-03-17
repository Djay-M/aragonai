# aragonai

Task-Management-Service

# Step To start the project

1. `git clone https://github.com/Djay-M/aragonai.git`
2. `cd aragonai`
3. `npm install`

###### Note: Make Sure postgres is up and running in locally with a database name "task-management"

4. `copy paste the below example env value in .env file`
5. `npx sequelize-cli db:migrate`
6. `npm run dev`

# Example .env

```
ENV=development
PORT= 3090
DB_URL=127.0.0.1
DB_USERNAME=admin
DB_PASSWORD=admin123
DB_DATABASENAME=task-management
ACCESS_TOKEN_SECRET=3a4952f095c22d3bedceb7c6c3a37b90618feae22a5db6722f04921e1975841e4befd4035231ac8b93325e78feb9562b812de98608548651186375dfae1dc62f
REFRESH_TOKEN_SECRET=3d4e32f8d09b91790d34ae4e20648218522cf4d5133e9a540bc3b09ce2ddbbe7401d101710bff53f8c4e837503aad3065f0447fc6dfb035b3afbba7b21c0ebd5


```
