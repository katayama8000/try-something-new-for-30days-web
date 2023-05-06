```bash
curl -X GET http://localhost:3000/todos
```  
```bash
curl -X GET http://localhost:3000/todos/1
```
```bash
curl -X POST -H "Content-Type: application/json" -d '{ "title": "Wash the car", "completed": false }' http://localhost:3000/todos
```

```bash
curl -X PUT -H "Content-Type: application/json" -d '{ "title": "Buy milk", "completed": true }' http://localhost:3000/todos/1
```

```bash
curl -X DELETE http://localhost:3000/todos/1
``` 
