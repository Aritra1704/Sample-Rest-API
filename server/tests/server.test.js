const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//Dummy TODOS
const todos = [{ 
    _id: new ObjectId(),
    text: 'First text todo'
}, {
    _id: new ObjectId(),
    text: 'Second text todo'
}]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());


});

// describe('POST /todos', () => {
//     it('Should create a new Todo', (done) => {
//         var text = 'Text todo text';

//         request(app)
//         .post('/todos')
//         .send({text})
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.text).toBe(text);
//         })
//         .end((err, res) => {
//             if(err) {
//                 return done(err);
//             }

//             Todo.find({text}).then((todos) => {
//                 expect(todos.length).toBe(1);
//                 expect(todos[0].text).toBe(text);
//                 done();
//             }).catch((e) => done(e));
//         })
//     });

//     it('Should not create todo with invalide body data', (done) => {
//         request(app)
//         .post('/todos')
//         .send({})
//         .expect(400)
//         .end((err, res) => {
//             if(err)
//             return done(err);
//         })

//         Todo.find().then((todos) => {
//             expect(todos.length).toBe(2);
//             done();
//         }).catch((e) => done(e));
//     })
// });

// describe('GET /todos', () => {
//     it('Should get all todod', (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.todos.length).toBe(2);
//             })
//             .end(done);
//     })
// });

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);

    });

    it('should return a 404 if todo not found', (done) => {
        var hexId = new ObjectId().toHexString();
        request(app)
        .get(`/todos/$}hes!d`)
        .expect(404)
        .end(done);

    });

    it('should return a 404 for non object ids', (done) => {
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
        // expect((res) =>{
        //         expect(res.body,todo.text).toBe(todos[0].text.toHexString());
        // });

    });
});