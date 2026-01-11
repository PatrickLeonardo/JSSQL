import PromptSync from 'prompt-sync';
import { SplitQueries } from './parser/SplitQueries.mjs';

import { 
    create, use, desc, insert,
    select, update, deleteFrom,
    set, into, values, from, where 
} from './fake-sql.mjs'

const parseScriptWithSplitQueries = (script) => {

    const splitedQuerie = SplitQueries(script); 
    console.log(`running: ${splitedQuerie}\n`);
    eval(splitedQuerie[0]);

    const query = prompt('> ');
    parseScriptWithSplitQueries(query);

}

const prompt = PromptSync({sigint: true});
const query = prompt('> ');
parseScriptWithSplitQueries(query);
