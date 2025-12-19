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

export const into = (table) => {

    return defaultDatabase[table].values;

}

export const values = (...data) => {

    return data;

}

export const from = (table) => {

    return defaultDatabase[table];

}

create('database', 'PK');
use('PK')

create('table', 'characters', ['name', 'age', 'city', 'id']);
desc('characters');

insert(into('characters'), values('peter', 25, 'new york'));
insert(into('characters'), values('thor', 3000, 'asgard'));
