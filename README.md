## JSSQL (JavaScript Structured Query Language)
### Um modelo de SQL feito com JavaScript totalmente do zero para estudos.
#### Funciona a base de um REPL que interpreta queries SQL e as executa a partir de um [fake-sql](https://github.com/PatrickLeonardo/JSSQL/blob/main/fake-sql.mjs) (comandos SQL refeitos com JavaScript).

<img width="783" height="247" alt="image" src="https://github.com/user-attachments/assets/e3f997eb-45a9-46c1-b4cc-e473249417bb" />

<hr>

### Antlr com SQLite Grammar

Com o input (uma consulta SQL) em mãos, é feita a quebra do input em um Stream de caracteres:
```js
var chars = new antlr4.InputStream(input);
```

Então, o Stream é passado para o Lexer criar uma lista de Tokens a partir desse Stream:
```js
var lexer = new SQLiteLexer(chars);
var tokens = new antlr4.CommonTokenStream(lexer);
```

Depois, os tokens são passados para o Parser, criando assim a Parse Tree:
```js
var parser = new SQLiteParser(tokens);
parser.buildParseTrees = true;
```

Então, o ANTLR passeia nó a nó pela Parse Tree com as regras de convenção (Listener) e a árvore de fato:
```js
var listener = new CustomListener(result);
antlr4.tree.ParseTreeWalker.DEFAULT.walk(listener, tree);
```
<hr>

### Alterações feitas no Lexer G4

```g4
DESCRIBE_   : 'DESCRIBE';
USE_        : 'USE';
```

### Alterações feitas no Parser G4

```g4
sql_stmt
    : (EXPLAIN_ (QUERY_ PLAN_)?)? (
        ...
        | create_database_stmt
        ...
        | describe_stmt
        ...
        | use_stmt
        ...
;

create_database_stmt
    : CREATE_ DATABASE_ (IF_ NOT_ EXISTS_)? schema_name
;

describe_stmt
    : DESCRIBE_ (schema_name DOT)? table_name
;

use_stmt
    : USE_ (IF_ EXISTS_)? schema_name
;
```
