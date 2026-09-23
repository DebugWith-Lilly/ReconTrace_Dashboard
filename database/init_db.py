import sqlite3

connection = sqlite3.connect("instance/recon-trace.db")
with open("database/schema.sql", "r") as f:
    connection.executescript(f.read())
connection.commit()
connection.close()
print("Database created successfully.")