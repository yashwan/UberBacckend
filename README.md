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