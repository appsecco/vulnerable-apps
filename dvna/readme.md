# Damn Vulnerable Node Application (DVNA) Ansible Playbook & Dockerfile

---

Ansible Playbook & Dockerfile for DVNA. This playbook is fully configured and plug-and-play for Damn Vulnerable Node Application.

More details about the project [DVNA](https://github.com/quantumfoam/DVNA)


### Pre requirements

- Vagrant 
- Ansible


### Usage

#### Docker 

- Simply run from dockerhub

```
docker run -p 3000:3000 appsecco/dvna
```


#### Ansible Playbook with Vagrant

```
git clone https://github.com/appsecco/vulnerable-apps.git
cd vulnerable-apps/dvna/ansible
vagrant up
```

- Then browse to [http://localhost:3000](http://localhost:3000)

