import PromptSync from 'prompt-sync';

const prompt = PromptSync({sigint: true});

function repl() {

    var query = prompt('> ').toLowerCase();

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
            //console.error(`err:// ${query} is not interpretable`);

            query = query.split(" ");
            var obj = ''

            if(query[0] == 'create') {
                
                obj = `create('${query[1]}', '${query[2]}'`;

                if(query[1] == 'table') {

                    obj = `${obj}, [${query[3]}]`

                    
                } else {

                    obj = obj + ')'

                }

            }
            
            console.log(obj)
    }
    
    repl();

}

repl();
