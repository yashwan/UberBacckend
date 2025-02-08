# UberBacckend
UberBackend


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