import sqlite3

# Create/connect to the database
conn = sqlite3.connect('entroPass.db')
c = conn.cursor()

# Create table
c.execute('''CREATE TABLE IF NOT EXISTS items
             (id INTEGER PRIMARY KEY, name TEXT, description TEXT)''')

# Insert data
c.execute("INSERT INTO items (name, description) VALUES (?, ?)", ('Item 1', 'Description of Item 1'))
conn.commit()

# Close connection
conn.close()
