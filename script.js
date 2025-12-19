import JSSQL from './main.js';

const jssql1 = new JSSQL();

//jsqla.createTable("Personagens", ["nome", "idade", "cidade", 'id'])
//.then(data => {
//    console.log(data)
//});

//jssql1.insertInto('Personagens2', ["Peter Quill", 35, "Terra", 4])
//.then(data => {
//    console.log(data);
//});

//jssql1.selectAll("Personagens2")
//.then(data => {
//    console.table(data);
//})

//jssql1.selectWhere("Personagens2", "id", 4)
//.then(data => {
//    console.table(data);
//})

import PromptSync from 'prompt-sync';

const prompt = PromptSync({sigint: true});

function repl() {

    var query = prompt('> ');

    switch(query) {

        case 'clear':
            console.clear();
            break;

        case 'ping':
            console.log('pong');
            break;

        case 'exit':
            console.clear();
            return 0;
            
        default:
            console.error(`err:// ${query} is not interpretable`)
        
    }
    
    repl()

}

repl()
