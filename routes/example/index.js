'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return 'this is an example'
  })

  const todos = [
    {
      id: 1,
      title: 'Buy milk',
      completed: false,
    },
    {
      id: 2,
      title: 'Wash the car',
      completed: true,
    },
  ];

  // Create a GET route to list all todos
  fastify.get('/todos', (req, res) => {
    res.send(todos);
  });

  // Create a POST route to create a new todo
  fastify.post('/todos', async (req, res) => {
    const newTodo = req.body;
    newTodo.id = todos.length + 1;
    todos.push(newTodo);
    res.send(newTodo);
  });

  // Create a GET route to get a specific todo
  fastify.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    console.log('----------------', typeof id, id, '----------------')
    const todo = todos.find(todo => todo.id === Number(id));
    if (!todo) {
      res.status(404).send('Todo not found');
    } else {
      res.send(todo);
    }
  });

  // Create a PUT route to update a todo
  fastify.put('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todo = todos.find(todo => todo.id === Number(id));
    if (!todo) {
      res.status(404).send('Todo not found');
    } else {
      todo.title = req.body.title;
      todo.completed = req.body.completed;
      res.send(todo);
    }
  });

  // Create a DELETE route to delete a todo
  fastify.delete('/todos/:id', async (req, res) => {
    const id = req.params.id;
    const index = todos.findIndex(todo => todo.id === Number(id));
    if (index === -1) {
      res.status(404).send('Todo not found');
    } else {
      todos.splice(index, 1);
      res.send('Todo deleted');
    }
  });

}
