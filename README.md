RUN:
```bash
$ sudo docker-compose up
```

After call the API:
```bash
POST http://localhost:3000/users
```
with body:
```bash
{
  "name": "username"
}
```