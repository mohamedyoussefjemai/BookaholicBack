const express = require('express');
const mysql = require('mysql2');
const bodyparser = require('body-parser');
const multer = require("multer")
const crypto = require("crypto")
const path = require("path")
const app = express();
app.use(bodyparser.json());
db = require('../Bookaholic/config/db.config');


//create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE bookaholic';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('DataBase Created ');
    });
});

//Create Table
app.get('/createUserTab', (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT,username VARCHAR (255) NOT NULL,birthdate DATE NOT NULL ,email VARCHAR(255) NOT NULL,\
	hash VARCHAR(255) NOT NULL, salt VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, phone INT(8) NOT NULL, sale INT DEFAULT 0 NOT NULL, trade INT DEFAULT 0 NOT NULL, image VARCHAR(255) NULL, PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Users Table created');
    });
});
//storage engine

// Include the node file module
var fs = require('fs');

storage = multer.diskStorage({
    destination: './uploads/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
//upload image
const upload = multer({
    storage: storage,
    limits: {
        filesize: 1000000
    }
})
app.post(
    "/upload",
    multer({
        storage: storage
    }).single('upload'), function (req, res) {
        console.log(req.file);
        console.log(req.body);
        res.redirect("/uploads/" + req.file.filename);
        console.log(req.file.filename);

        return req.file.filename;
    });
app.use("/get/image", express.static("uploads/images"))


///// multer ios
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload2 = multer({storage: storage2, fileFilter: fileFilter});
//Upload route
app.post(
    "/upload/ios",
    multer({
        storage: storage2
    }).single('upload'), function (req, res) {
        // console.log(req.file);
        // console.log(req.body);
        //res.redirect("/uploads/" + req.file.filename);
        console.log(req.file.filename);
        return res.status(200).end();
    });

app.get('/uploads/:upload', function (req, res) {
    file = req.params.upload;
    console.log(req.params.upload);
    var img = fs.readFileSync(__dirname + "/uploads/images/" + file);
    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(img, 'binary');

});

const SocketServer = require('websocket').server
const http = require('http')

const server = http.createServer((req, res) => {
})
const server2 = http.createServer((req, res) => {
})
const server3 = http.createServer((req, res) => {
})
const server4 = http.createServer((req, res) => {
})
const server5 = http.createServer((req, res) => {
})
const server6 = http.createServer((req, res) => {
})
const server7 = http.createServer((req, res) => {
})
const server8 = http.createServer((req, res) => {
})
const server9 = http.createServer((req, res) => {
})
const server10 = http.createServer((req, res) => {
})
const server11 = http.createServer((req, res) => {
})
const server12 = http.createServer((req, res) => {
})
const server13 = http.createServer((req, res) => {
})
const server14 = http.createServer((req, res) => {
})
const server15 = http.createServer((req, res) => {
})
const server16 = http.createServer((req, res) => {
})
const server17 = http.createServer((req, res) => {
})
const server18 = http.createServer((req, res) => {
})


// socket connexion general 
server.listen(3001, () => {
    console.log("Listening to websocket too.....")
})
wsServer = new SocketServer({httpServer: server})
const connections = []

wsServer.on('request', (req) => {
    const connection = req.accept()
    console.log("new connection")
    connections.push(connection)

    connection.on('message', (mes) => {
        connections.forEach(element => {
            if (element != connection)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection.on('close', (resCode, des) => {
        console.log("connection closed")
        connections.splice(connections.indexOf(connection), 1)
    })

})
////// end socket connexion general

// socket connexion comic & mangas 
server2.listen(3002, () => {
    console.log("Listening to websocket too.....")
})

wsServer2 = new SocketServer({httpServer: server2})

const connections2 = []

wsServer2.on('request', (req) => {
    const connection2 = req.accept()
    console.log("new connection comic & mangas")
    connections2.push(connection2)

    connection2.on('message', (mes) => {
        connections2.forEach(element => {
            if (element != connection2)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection2.on('close', (resCode, des) => {
        console.log("connection closed")
        connections2.splice(connections2.indexOf(connection2), 1)
    })

})
////// end socket connexion comic & mangas 

// socket health & cooking
server3.listen(3003, () => {
    console.log("Listening to websocket too.....")
})

wsServer3 = new SocketServer({httpServer: server3})

const connections3 = []

wsServer3.on('request', (req) => {
    const connection3 = req.accept()
    console.log("new connection health & cooking")
    connections3.push(connection3)

    connection3.on('message', (mes) => {
        connections3.forEach(element => {
            if (element != connection3)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection3.on('close', (resCode, des) => {
        console.log("connection closed")
        connections3.splice(connections3.indexOf(connection3), 1)
    })

})
////// end socket connexion health & cooking

// socket romance & new adult
server4.listen(3004, () => {
    console.log("Listening to websocket too.....")
})

wsServer4 = new SocketServer({httpServer: server4})

const connections4 = []

wsServer4.on('request', (req) => {
    const connection4 = req.accept()
    console.log("new connection romance & new adult")
    connections4.push(connection4)

    connection4.on('message', (mes) => {
        connections4.forEach(element => {
            if (element != connection4)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection4.on('close', (resCode, des) => {
        console.log("connection closed")
        connections4.splice(connections4.indexOf(connection4), 1)
    })

})
////// end socket connexion romance & new adult

// socket romance & new adult
server5.listen(3005, () => {
    console.log("Listening to websocket too.....")
})

wsServer5 = new SocketServer({httpServer: server5})

const connections5 = []

wsServer5.on('request', (req) => {
    const connection5 = req.accept()
    console.log("new connection tourism & travel")
    connections5.push(connection5)

    connection5.on('message', (mes) => {
        connections5.forEach(element => {
            if (element != connection5)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection5.on('close', (resCode, des) => {
        console.log("connection closed")
        connections5.splice(connections5.indexOf(connection5), 1)
    })

})
////// end socket connexion tourism & travel

// socket adventure
server6.listen(3006, () => {
    console.log("Listening to websocket too.....")
})

wsServer6 = new SocketServer({httpServer: server6})

const connections6 = []

wsServer6.on('request', (req) => {
    const connection6 = req.accept()
    console.log("new connection adventure")
    connections6.push(connection6)

    connection6.on('message', (mes) => {
        connections6.forEach(element => {
            if (element != connection6)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection6.on('close', (resCode, des) => {
        console.log("connection closed")
        connections6.splice(connections6.indexOf(connection6), 1)
    })

})
////// end socket connexion adventure

// socket literature
server7.listen(3007, () => {
    console.log("Listening to websocket too.....")
})

wsServer7 = new SocketServer({httpServer: server7})

const connections7 = []

wsServer7.on('request', (req) => {
    const connection7 = req.accept()
    console.log("new connection literature")
    connections7.push(connection7)

    connection7.on('message', (mes) => {
        connections7.forEach(element => {
            if (element != connection7)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection7.on('close', (resCode, des) => {
        console.log("connection closed")
        connections7.splice(connections7.indexOf(connection7), 1)
    })

})
////// end socket connexion literature 

// socket personal devloppement
server8.listen(3008, () => {
    console.log("Listening to websocket too.....")
})

wsServer8 = new SocketServer({httpServer: server8})

const connections8 = []

wsServer8.on('request', (req) => {
    const connection8 = req.accept()
    console.log("new connection personal devloppement")
    connections8.push(connection8)

    connection8.on('message', (mes) => {
        connections8.forEach(element => {
            if (element != connection8)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection8.on('close', (resCode, des) => {
        console.log("connection closed")
        connections8.splice(connections8.indexOf(connection8), 1)
    })

})
////// end socket connexion personal devloppement

// socket history
server9.listen(3009, () => {
    console.log("Listening to websocket too.....")
})

wsServer9 = new SocketServer({httpServer: server9})

const connections9 = []

wsServer9.on('request', (req) => {
    const connection9 = req.accept()
    console.log("new connection history")
    connections9.push(connection9)

    connection9.on('message', (mes) => {
        connections9.forEach(element => {
            if (element != connection9)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection9.on('close', (resCode, des) => {
        console.log("connection closed")
        connections9.splice(connections9.indexOf(connection9), 1)
    })

})
////// end socket connexion history

// socket youth
server10.listen(3010, () => {
    console.log("Listening to websocket too.....")
})

wsServer10 = new SocketServer({httpServer: server10})

const connections10 = []

wsServer10.on('request', (req) => {
    const connection10 = req.accept()
    console.log("new connection youth")
    connections10.push(connection10)

    connection10.on('message', (mes) => {
        connections10.forEach(element => {
            if (element != connection10)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection10.on('close', (resCode, des) => {
        console.log("connection closed")
        connections10.splice(connections10.indexOf(connection10), 1)
    })

})
////// end socket connexion youth

// socket social science
server11.listen(3011, () => {
    console.log("Listening to websocket too.....")
})

wsServer11 = new SocketServer({httpServer: server11})

const connections11 = []

wsServer11.on('request', (req) => {
    const connection11 = req.accept()
    console.log("new connection social science")
    connections11.push(connection11)

    connection11.on('message', (mes) => {
        connections11.forEach(element => {
            if (element != connection11)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection11.on('close', (resCode, des) => {
        console.log("connection closed")
        connections11.splice(connections11.indexOf(connection11), 1)
    })

})
////// end socket connexion social science

// socket art music & cinema
server12.listen(3012, () => {
    console.log("Listening to websocket too.....")
})

wsServer12 = new SocketServer({httpServer: server12})

const connections12 = []

wsServer12.on('request', (req) => {
    const connection12 = req.accept()
    console.log("new connection art music & cinema")
    connections12.push(connection12)

    connection12.on('message', (mes) => {
        connections12.forEach(element => {
            if (element != connection12)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection12.on('close', (resCode, des) => {
        console.log("connection closed")
        connections12.splice(connections12.indexOf(connection12), 1)
    })

})
////// end socket connexion art music & cinema

// socket humor
server13.listen(3013, () => {
    console.log("Listening to websocket too.....")
})

wsServer13 = new SocketServer({httpServer: server13})

const connections13 = []

wsServer13.on('request', (req) => {
    const connection13 = req.accept()
    console.log("new connection humor")
    connections13.push(connection13)

    connection13.on('message', (mes) => {
        connections13.forEach(element => {
            if (element != connection13)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection13.on('close', (resCode, des) => {
        console.log("connection closed")
        connections13.splice(connections13.indexOf(connection13), 1)
    })

})
////// end socket connexion humor

// socket police & thrillers
server14.listen(3014, () => {
    console.log("Listening to websocket too.....")
})

wsServer14 = new SocketServer({httpServer: server14})

const connections14 = []

wsServer14.on('request', (req) => {
    const connection14 = req.accept()
    console.log("new connection police & thrillers")
    connections14.push(connection14)

    connection14.on('message', (mes) => {
        connections14.forEach(element => {
            if (element != connection14)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection14.on('close', (resCode, des) => {
        console.log("connection closed")
        connections14.splice(connections14.indexOf(connection14), 1)
    })

})
////// end socket connexion police & thrillers

// socket religion & spirituality
server15.listen(3015, () => {
    console.log("Listening to websocket too.....")
})

wsServer15 = new SocketServer({httpServer: server15})

const connections15 = []

wsServer15.on('request', (req) => {
    const connection15 = req.accept()
    console.log("new connection religion & spirituality")
    connections15.push(connection15)

    connection15.on('message', (mes) => {
        connections15.forEach(element => {
            if (element != connection15)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection15.on('close', (resCode, des) => {
        console.log("connection closed")
        connections15.splice(connections15.indexOf(connection15), 1)
    })

})
////// end socket connexion religion & spirituality

// socket school
server16.listen(3016, () => {
    console.log("Listening to websocket too.....")
})

wsServer16 = new SocketServer({httpServer: server16})

const connections16 = []

wsServer16.on('request', (req) => {
    const connection16 = req.accept()
    console.log("new connection school")
    connections16.push(connection16)

    connection16.on('message', (mes) => {
        connections16.forEach(element => {
            if (element != connection16)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection16.on('close', (resCode, des) => {
        console.log("connection closed")
        connections16.splice(connections16.indexOf(connection16), 1)
    })

})
////// end socket connexion school

// socket sport & leisure
server17.listen(3017, () => {
    console.log("Listening to websocket too.....")
})

wsServer17 = new SocketServer({httpServer: server17})

const connections17 = []

wsServer17.on('request', (req) => {
    const connection17 = req.accept()
    console.log("new connection sport & leisure")
    connections17.push(connection17)

    connection17.on('message', (mes) => {
        connections17.forEach(element => {
            if (element != connection17)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection17.on('close', (resCode, des) => {
        console.log("connection closed")
        connections17.splice(connections17.indexOf(connection17), 1)
    })

})
////// end socket connexion sport & leisure

// socket theater
server18.listen(3018, () => {
    console.log("Listening to websocket too.....")
})

wsServer18 = new SocketServer({httpServer: server18})

const connections18 = []

wsServer18.on('request', (req) => {
    const connection18 = req.accept()
    console.log("new connection theater")
    connections18.push(connection18)

    connection18.on('message', (mes) => {
        connections18.forEach(element => {
            if (element != connection18)
                element.sendUTF(mes.utf8Data)
        })
        //  connection.broadcast.emit("message",mes);

    })

    connection18.on('close', (resCode, des) => {
        console.log("connection closed")
        connections18.splice(connections18.indexOf(connection18), 1)
    })

})
////// end socket connexion theater

//get id with email and username
app.get('/users/read-user-id/:email/:username', (req, res) => {
    db.query(
        'SELECT id FROM users WHERE email = ? AND username = ?',
        [req.params.email, req.params.username],
        function (err, results) {
            console.log(results);
            res.send(results)
        }
    );
});
// Require user routes
const userRoutes = require('../Bookaholic/Routes/user.routes')
// using as middleware
app.use('/users', userRoutes)

// Require user routes
const bookRoutes = require('../Bookaholic/Routes/book.routes')
// using as middleware
app.use('/books', bookRoutes)

// Require favoris routes
const favorisRoutes = require('../Bookaholic/Routes/favoris.routes')
// using as middleware
app.use('/favoris', favorisRoutes)
// listen for requests

// Require user routes
const requestsRoutes = require('../Bookaholic/Routes/requests.routes')
// using as middleware
app.use('/requests', requestsRoutes)

app.listen('3000', () => {
    console.log('server started on 3000');
});
