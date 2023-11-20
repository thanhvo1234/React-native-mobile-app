import * as SQLite from "expo-sqlite";

const database_name = "HikeApp.db";
const database_version = "1.0";
const database_displayname = "Hike App Database";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size
);

const initDatabase = () => {
  db.transaction((tx) => {
      tx.executeSql(
          `CREATE TABLE IF NOT EXISTS hikes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nameHike TEXT,
            locationHike TEXT,
            dateHike TEXT,
            parking TEXT,
            lengthHike TEXT,
            difficultyLevel TEXT,
            description TEXT
          );`,
          [],
          () => console.log("Database and table created successfully."),
          (err) => console.log("Error occurred while creating the table.", err)
      );
  });
};

const getHikes = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM hikes",
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const deleteHike = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM hikes WHERE id = ?",
        [id],
        () => {
          resolve();
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const addHike = (name, location, date, parking, length, difficulty, description) => {
  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
              `INSERT INTO hikes (nameHike, locationHike, dateHike, parking, lengthHike, difficultyLevel, description) VALUES (?, ?, ?, ?, ? ,? ,?)`,
              [name, location, date, parking, length, difficulty, description],
              (_, {insertId}) =>{
                  resolve(insertId);
              },
              (_, err) => {
                  reject(err);
              }
          );
      });
  });
};
const updateHike = (id, name, location, date, parking, length, difficulty, description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      const sql = 'UPDATE hikes SET nameHike = ?, locationHike = ?, dateHike = ?, parking = ?, lengthHike = ?, difficultyLevel = ?, description = ? WHERE id = ?';
      const params = [name, location, date, parking, length, difficulty, description, id];

      console.log('SQL:', sql);
      console.log('Parameters:', params);

      tx.executeSql(
        sql,
        params,
        (_, results) => {
          if (results.rowsAffected > 0) {
            resolve('Hike details updated successfully');
          } else {
            reject('Hike details update database failed');
          }
        },
        (_, error) => {
          console.error('SQL error:', error);
          reject(error);
        }
      );
    });
  });
};


const getHikeByTitle = (nameHike) => {
  return new Promise((resolve, reject) => {
      db.transaction((tx) => {
          tx.executeSql(
              "SELECT * FROM hikes WHERE nameHike LIKE ?",
               [`%${nameHike}%`],
                (_,{rows}) => {
                    resolve(rows._array);
                },
              (_, error) => {
                  reject(error);
              }
          );
      });
  });
};
const Database = {
  initDatabase,
  addHike,
  getHikes,
  deleteHike,
  updateHike,
  getHikeByTitle
};

export default Database;