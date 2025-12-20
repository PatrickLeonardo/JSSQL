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
            console.error(`err:// ${query} is not interpretable`);
        
    }
    
    repl();

}

repl();
