import { create, desc, insert, into, use, values } from './fake-sql.mjs';

describe('create', () => {

    it('should create a database/schema', () => {

        const schemaDefinition = create('schema', 'MARVEL');
        const databaseDefinition = create('database', 'DC');
        
        expect(schemaDefinition).toBe('schema created');
        expect(databaseDefinition).toBe('database created');

    });

    it('should create a table', () => {

        create('schema', 'test');
        use('test');

        const tableDefinition = create('table', 'heroes', ['name', 'age', 'city', 'id']);

        expect(tableDefinition).toBe('table created');

    });

});

describe('use', () => {

    it('should use a database/schema', () => {

        const activeSchema = use('MARVEL');
        const activeDatabase = use('DC');

        expect(activeSchema).toEqual([{DEFAULT_DATABASE: 'MARVEL'}]);
        expect(activeDatabase).toEqual([{DEFAULT_DATABASE: 'DC'}]);

    });

});

describe('desc', () => {

    it('should describe a table', () => {
        
        create('schema', 'city');
        use('city');
        create('table', 'peoples', ['name', 'age', 'gender']);
        
        const tableDescribed = desc('peoples');
        
        expect(tableDescribed).toEqual(
            [
                { columns: 'name' },
                { columns: 'age' },
                { columns: 'gender'} 
            ]
        );
        
    });

});

describe('insert', () => {

    it('should insert data on table', () => {

        create('schema', 'AVENGERS');
        use('AVENGERS');
        create('table', 'heroes', ['name', 'city', 'id']);

        const insertion = insert(into('heroes'), values('Thor', 'asgard'));

        expect(insertion).toBeTruthy();

    });

});
