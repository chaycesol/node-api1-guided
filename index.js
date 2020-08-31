// import express from 'express'; ES2015 Modules

const express = require('express'); //CommonJS modules, similar to above

//define server as express
const server = express();

//teaches express how to read JSON from req.body
server.use(express.json()); //needed for post and put

//HUBS ENDPOINTS
let hubs = [
    // data object that changes - USE LET
        {
            id: 1,
            name: "node 33 api intro",
            lessonId: 1,
            cohort: "node 33",
        },
        {
            id: 2,
            name: "node 33 server side routing ",
            lessonId: 2,
            cohort: "node 33",
        }
]

server.get('/', (req, res) => {
    res.status(200).json({ hello: `Success! You Got Me!`})
})


//list of hubs
server.get('/hubs', (req,res) => {
    res.status(200).json({ data: hubs })
})
// add a hub
server.post('/hubs', (req, res) => {
    // i can read data from the body
    const hub  = req.body;

    // i can push this to the array
    hubs.push(hub);

    // return success message with new object in hubs array
    res.status(201).json(hubs);

})
//delete a hub
server.delete('/hubs/:id', (req, res) => {
    
    const id = Number(req.params.id);

    // all values coming from URL are strings
    hubs = hubs.filter(hub => hub.id !== id);

    // res.status(204).end();
    res.status(200).json(hubs);
});
// edit a hub
server.put("/hubs/:id", (req, res) => {
    const changes = req.body;
    const id = Number(req.params.id);
    
    let found = hubs.find(h => h.id === id);

    if(found) {
        Object.assign(found, changes);

        res.status(200).json(found);
    } else {
        res.status(404).json({ message: 'not found'})
    }
})

//LESSONS
let lessons = [
    // data object that changes - USE LET
        {
            id: 1,
            name: "Unit 4 lesson 1",
        },
        {
            id: 2,
            name: "Unit 4 lesson 2 ",
        }
]

// GET LESSONS
//view list of lessons
server.get('/lessons', (req,res) => {
    res.status(200).json({ data: lessons })
});
// Get lesson details
server.get('/lessons/:id', (req,res) => {
    const id = Number(req.params.id);
    
    let found = lessons.find(l => l.id === id);

    if(found) {

        res.status(200).json(found);
    } else {
        res.status(404).json({ message: 'not found'})
    }
});

//POST LESSONS
server.post('/lessons/', (req, res) => {
    const lesson  = req.body;

    // i can push this to the array
    lessons.push(lesson);

    // return success message with new object in hubs array
    res.status(201).json(lessons);
})

//PUT LESSONS
server.put('/lessons/:id', (req,res) => {
    const changes = req.body;
    const id = Number(req.params.id);
    
    let found = lessons.find(l => l.id === id);

    if(found) {
        Object.assign(found, changes)
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: 'not found'})
    }
 
});

//DELETE LESSONS
server.delete('/lessons/:id', (req, res) => {
    
    const id = Number(req.params.id);

    // all values coming from URL are strings
    lessons = lessons.filter(lesson => lesson.id !== id);

    // res.status(204).end();
    res.status(200).json(lessons);
});

// list lessons 
/* A Lesson has:

- a unique `id`.
- a `name`.
 */



//define port name
const port = 8000

//server listen
server.listen(port, () => console.log("server up and reporting for duty..."));