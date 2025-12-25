import { create, use, desc, insert, select, from, into, values, where, update, set, deleteFrom } from './fake-sql.mjs'

create('database', 'PK');
use('PK')

create('table', 'characters', ['name', 'age', 'city', 'id']);
//desc('characters');

insert(into('characters'), values('peter', 25, 'new york'));
insert(into('characters'), values('odin', 5000, 'asgard'));
insert(into('characters'), values('thor', 3000, 'asgard'));

//select('name, age', from('characters'), where(`characters.age == 3000 || characters.age == 5000`));
//select('name, age', from('characters'));

//select('id', from('characters'), where('characters.age >= 3000'))

//select('*', from('characters'), where('characters.age >= 0'));

//set('contact name = "Patrick", City = "SP"');

//update('characters', set(`characters.age = 3000`), where(`characters.name == 'thor'`));

deleteFrom('characters', where(`characters.age == 5000`));

select('*', from('characters'));
