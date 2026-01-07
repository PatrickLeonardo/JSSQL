import antlr4 from 'antlr4';
import SQLiteLexer from './SQLiteLexer.js';
import SQLiteParser from './SQLiteParser.js';
import { CustomListener } from './CustomListener.js';

export var SplitQueries = (input) => {
    
    var chars = new antlr4.InputStream(input);
    var lexer = new SQLiteLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new SQLiteParser(tokens);
    
    parser.buildParseTrees = true;
    
    var tree = parser.parse();
    var result = [];
    var listener = new CustomListener(result);
    
    antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
    
    return listener.result;

}
