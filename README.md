# UberBackend
UberBackend
- Built a ride-sharing platform with role-based authentication (passenger/driver) using JWT and secure password hashing with bcrypt.
- Integrated Redis for fast, temporary storage of user sessions and real-time WebSocket connections.
- Implemented live ride booking notifications with Socket.IO, alerting nearby drivers (within a 5 km radius) when a ride request is made.
- Captured real-time geolocation data (latitude & longitude) for passengers and drivers, enabling accurate ride-matching.
- Developed an automated notification system, sending ride confirmations via email to passengers.
- Optimised event-driven communication using RabbitMQ (AMQP), enhancing messaging reliability and System scalability.
- Protected API endpoints with Express Rate Limiter and enforced robust input validation using Zod.
- Designed and optimised MongoDB schema, efficiently handling users, rides, and geolocation data for real-time queries.
- Implemented structured logging and error handling with Winston, improving monitoring and debugging.
- Architected a scalable backend with Express.js, ensuring modularity for future feature expansion.
- Technologies:  Node.js, Express.js, Redis, MongoDB, Socket.IO, AMQP (RabbitMQ), Zod, JWT, Winston, HTML, CSS, JavaScript


### Deploying to ec2
#### Installing mongodb
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

sudo apt update
sudo apt install -y mongodb-org

sudo systemctl start mongod
sudo systemctl enable mongod

#### See the system health
sudo systemctl status mongod


#### Installing Redis
sudo systemctl start redis
sudo systemctl enable redis
sudo systemctl start redis-server
sudo systemctl enable redis-server
sudo systemctl status redis-server


#### Installing rabbitMQ
sudo apt-get update
sudo apt-get install -y curl gnupg
curl -fsSL https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb -o erlang-solutions.deb
sudo dpkg -i erlang-solutions.deb
sudo apt-get update
sudo apt-get install -y erlang
sudo apt-get install -y wget
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo tee /etc/apt/trusted.gpg.d/rabbitmq.asc
echo "deb https://dl.bintray.com/rabbitmq-erlang/debian $(lsb_release -sc) erlang" | sudo tee /etc/apt/sources.list.d/rabbitmq.list
echo "deb https://dl.bintray.com/rabbitmq/debian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/rabbitmq-server.list
sudo apt-get update
sudo apt-get install -y rabbitmq-server
sudo systemctl start rabbitmq-server
sudo systemctl enable rabbitmq-server
sudo systemctl status rabbitmq-server
