import { openDatabase } from "react-native-sqlite-storage";
const db = openDatabase({
    name: "db",
  });

export const getRoosters = () => {
    db.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM gallos ORDER BY id DESC`,
        [],
        (sqlTxn, res) => {
          console.log("gallos retrieved successfully");
          let len = res.rows.length;
  
          if (len > 0) {
            let results = [];
            for (let i = 0; i < len; i++) {
              let item = res.rows.item(i);
              results.push({  
                              id: item.id, 
                              title: `${item.line} placa: ${item.plaque}`,  
                            });
            }
            return results
          }
        },
        error => {
          console.log("error on getting categories " + error.message);
        },
      );
    });
  };