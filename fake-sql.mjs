const dbs = {};
var defaultDatabase = null;

export const create = (structure, name, ...columns) => {

    switch(structure) {

        case 'database':
        case 'schema':
            dbs[name] = {};
            break;
        
        case 'table':
            defaultDatabase[name] = {"name": name, "columns": columns[0], "values": []};
            break
        
        default:
            throw new RangeError('Structure invalid');
        
    }

    return `${structure} created`;

}

export const use = (database) => {
    
    if(dbs[database]) {
        defaultDatabase = dbs[database];
        return [{DEFAULT_DATABASE: database}];
    }

    throw new Error('Database not exists...');

}

export const desc = (table) => {
    
    const columns = [];

    defaultDatabase[table].columns.forEach(column => {
        
        columns.push({columns: column})

    })

    return columns;
    
}

export const insert = (table, values) => {
     
    const id = table.length + 1;
    table.push([...values, id])

    return true;
}

export const select = (columns, table, conditions = null) => {
    
    if(columns === '*') {

        columns = table.columns.toString();
        
    }

    columns = columns.replaceAll(', ', ',');
    

    const result = [];
    
    table.values.forEach(line => {
        
        var temp = {};
        var relationalTable = getRelationalTableLine(table, line);

        if(conditions){

            conditions = conditions.replaceAll(table.name, 'eval(relationalTable)');
            
            if(eval(conditions)) {
                
                
                columns.split(',').forEach(column => { 
                    temp[column] = relationalTable[column];
                })
                
            }
            
        } else {

            columns.split(',').forEach(column => {
                temp[column] = relationalTable[column];
            })

        }
        
        (Object.entries(temp).length > 0) ? result.push(temp) : null;
        
    });

    return console.table(result);

} 

export const update = (table, fields, conditions = null) => {

    from(table).values.forEach(line => {
        
        fields.forEach(field => {

            ((relationalTableLine) => {

                field = field.replace(table, "relationalTableLine");

                (conditions) ? conditions = conditions.replaceAll(table, 'eval(relationalTableLine)') : null;
                
                if(conditions == null || eval(conditions)) {
                    
                    eval(field);

                    const columnToUpdate = field.split(" ")[0].split(".")[1]; 
                    const indexOfLineToUpdate = from(table).columns.indexOf(columnToUpdate);
                    const valueToUpdate = field.split(" ")[2];
                    
                    line[indexOfLineToUpdate] = eval(valueToUpdate);
                    
                }
                
            }) (getRelationalTableLine(defaultDatabase[table], line)); 

        });

    });

}

export const deleteFrom = (table, condition) => {
    
    condition = condition.replaceAll(table, 'eval(relationalTableLine)');

    into(table).forEach(line => {
        
        ((relationalTableLine) => {

            if(eval(condition)) {

                delete into(table)[into(table).findIndex(i => i == line)];

            }

        }) (getRelationalTableLine(from(table), line)); 

    });

}

export const set = (...records) => {

    if(records) {
        return records[0].split(', '); 
    }

    throw new Error('');

}

export const into = (table) => {

    if(defaultDatabase[table]) {
        return defaultDatabase[table].values;
    }

    throw new Error('Table not exists...');

}

export const values = (...data) => {
    
    return data;

}

export const from = (table) => {

    if(defaultDatabase[table]) {
        return defaultDatabase[table];
    }
    
    throw new Error('Table not exists...');

}

export const where = (condition) => {

    if(condition) {
        return condition;
    }
    
}

const getRelationalTableLine = (table, line) => {

    let relationalTable = {};
    let i = 0;

    table.columns.forEach(column => {
        relationalTable[column] = line[i];
        i++
    });

    return relationalTable;

}
