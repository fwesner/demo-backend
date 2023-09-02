const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Conectar a la base de datos SQLite (o crea una si no existe)
const db = new sqlite3.Database('mydb.db');

// Crear una tabla y agregar algunos datos de ejemplo
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INT, name TEXT)");
  const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
  stmt.run(1, "Usuario 1");
  stmt.run(2, "Usuario 2");
  stmt.finalize();
});

// Endpoint para obtener todos los usuarios
app.get('/api/users', (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Backend en ejecución en http://localhost:${port}`);
});
