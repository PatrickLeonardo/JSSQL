import PromptSync from 'prompt-sync';
import { SplitQueries } from './parser/SplitQueries.mjs';

import { create, use, desc, insert, select, from, into, values, where, update, set, deleteFrom } from './fake-sql.mjs'

create('database', 'PK');
use('PK')

create('table', 'characters', ['name', 'age', 'city', 'id']);

const parseScriptWithSplitQueries = (script) => {

    const splitedQuerie = SplitQueries(script); 
    console.log(`running: ${splitedQuerie}`);
    eval(splitedQuerie[0]);

    select('*', from('characters'));

    const query = prompt(' > ');
    parseScriptWithSplitQueries(query);

}

const prompt = PromptSync({sigint: true});
const query = prompt(' > ');
parseScriptWithSplitQueries(query);
