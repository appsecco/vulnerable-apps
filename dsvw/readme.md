#Docker Container for DSVW
Deliberately vulnerable web application written in under 100 lines

---

### Software required to use docker container
- Docker (Tested version 1.12.1)

### Steps to use the container
- Pull the docker-dsvw image from the docker hub [https://hub.docker.com/r/appsecco/dsvw](https://hub.docker.com/r/appsecco/dsvw)

```
docker pull appsecco/dsvw
```

- Then start the docker container to access the vulnerable application

```
docker run -p 1234:8000 -it appsecco/dsvw
```

- Then start exploring vulnerable applications by navigating to [http://localhost:1234](http://localhost:1234)
