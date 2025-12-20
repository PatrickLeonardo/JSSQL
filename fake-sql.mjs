const dbs = { MARVEL: {}, DC: {} };
var defaultDatabase = null;

export const use = (database) => {

    defaultDatabase = dbs[database];
    console.table([{DEFAULT_DATABASE: database}]);
    
}

export const create = (structure, name, ...columns) => {

    switch(structure) {

        case 'database':
            dbs[name] = {};
            break;
        
        case 'table':
            defaultDatabase[name] = {"name": name, "columns": columns[0], "values": []};
            break
        
    }

}

export const desc = (table) => {
    
    console.table(defaultDatabase[table].columns);

}

export const insert = (table, values) => {
     
    const id = table.length + 1;
    table.push([...values, id])

}

export const select = (columns, table, conditions = null) => {
    
    if(columns === '*') {

        columns = table.columns.toString();
        columns = columns.replaceAll(',', ', ');
        
    }

    const result = [];
    var values = {}; 
    
    table.values.forEach(line => {
        
        let i = 0;
        let temp = {};

        table.columns.forEach(column => {
            values[column] = line[i];
            i++
        });

        if(conditions){

            conditions = conditions.replaceAll(table.name, 'eval(values)')
            
            if(eval(conditions)) {
                
                columns.split(', ').forEach(column => {
                    temp[column] = values[column];
                })
                
            }
            
        } else {

            columns.split(', ').forEach(column => {
                temp[column] = values[column];
            })

        }
        
        (Object.entries(temp).length > 0) ? result.push(temp) : null;
        
    });

    console.table(result);

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
