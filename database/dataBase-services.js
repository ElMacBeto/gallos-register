import {openDatabase, enablePromise} from 'react-native-sqlite-storage';
enablePromise(true);

const tableName = 'gallosV1';

export const getDBConnection = async () => {
    return openDatabase({
        name: "db-gallos",
        location: 'default'
      })
};

export const createTable = async (db) => {
    
        await db.transaction( async  (txn) => {
            await txn.executeSql(
                `CREATE TABLE IF NOT EXISTS ${tableName} (id INTEGER PRIMARY KEY AUTOINCREMENT, line VARCHAR(40), year INTEGER, gender VARCHAR(25), plaque INTEGER, ring INTEGER, leftLeg VARCHAR(25), rightLeg VARCHAR(25), noise VARCHAR(25));`,
                [],
                (sqlTxn, res) => {
                  console.log("table created successfully");
                },
                error => {
                  console.log("error on creating table " + error.message);
                },
              );
        });
}

export const getRoosterItems = async (db) => {
    
    try {
        await db.transaction( async (txn) => {
            return await txn.executeSql(
             `SELECT * FROM ${tableName} ORDER BY id DESC`,
             [],
             (sqlTxn, res) => {
                 
                 let len = res.rows.length;
                 if (len > 0) {
                     let results = [];
                     console.log("gallos retrieved successfully");    
                     for (let i = 0; i < len; i++) {
                         let item = res.rows.item(i);
                         results.push(item);
                     }
                     //console.log(results)
                     return results
                 }else{
                     console.log('base de datos vacia')
                 }
           },
           error => {
             console.log("error on getting categories " + error.message);
             throw error;
           },
         );
       });
    } catch (error) {
        console.error(error);
    }
  
}

export const saveRoosterItems = async (db, dataItem) => {
    db.transaction(txn => {
        txn.executeSql(
          `INSERT INTO ${tableName} (line, year, gender, plaque, ring, leftLeg, rightLeg, noise) VALUES (?,?,?,?,?,?,?,?)`,
          [ 
            dataItem.line, 
            dataItem.year, 
            dataItem.gender, 
            dataItem.plaque, 
            dataItem.ring,
            dataItem.leftLeg,
            dataItem.rightLeg,
            dataItem.noise
          ],
          (sqlTxn, res) => {
            console.log(`${dataItem.line} category added successfully`);
          },
          error => {
            console.log("error on adding rooster " + error.message);
          },
        );
      });
}