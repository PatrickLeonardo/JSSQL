import fs from 'fs';
import db from './db.json' with { type: 'json' };

class JSSQL {

    createTable(name, fields) {
           
        return new Promise((resolve, reject) => {

            try {
                
                db.push({"name": name, "fields": fields, "values": []});
                fs.writeFileSync('./db.json', JSON.stringify(db));
                
            } catch(error) { reject(error); }

            console.table(db);
            resolve("Created.");
            
        })

    }

    insertInto(table, values) {
        
        return new Promise((resolve, reject) => {

            try {

                const index = db.findIndex(obj => obj.name == table);
                db[index].values.push(values);
                fs.writeFileSync('./db.json', JSON.stringify(db));

            } catch(error) { reject(error); }

            resolve("Inserted");

        })

    }

    selectAll(table) {

        return new Promise((resolve, reject) => {

            try {
                
                const index = db.findIndex(obj => obj.name == table);
                const db2 = [];
                
                db[index].values.forEach(line => {

                    var i = 0;
                    const obj = {};
                    
                    line.forEach(value => {

                        obj[db[0].fields[i]] = value;
                        i++;

                    })

                    db2.push(obj);
                    
                })

                resolve(db2);

            } catch(error) { reject(error); }

        })

    }

    selectWhere(table, field, value) {

        return new Promise((resolve, reject) => {

            try {

                this.selectAll(table)
                .then(data => {
                    
                    const result = [];
                    
                    for(var i = 0; i< data.length; i++) { 
                        
                        const obj = Object.entries(data)[i][1]; 
                        const entries = Object.entries(obj);
                        const keys = Object.keys(obj);
                        
                        if(entries[keys.findIndex(index => index == field)][1] == value) { 
                            result.push(obj);
                        }
                        
                    }
                    
                    resolve(result);
                    
                })

            } catch(error) { reject(error); }

        })

    }

}

export default JSSQL;
