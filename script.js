import JSSQL from './main.js';

const jssql1 = new JSSQL();

//jsqla.createTable("Personagens", ["nome", "idade", "cidade", 'id'])
//.then(data => {
//    console.log(data)
//});

//jssql1.insertInto('Personagens', ["Peter Quill", 35, "Terra", 4])
//.then(data => {
//    console.log(data);
//});

//jssql1.selectAll("Personagens2")
//.then(data => {
//    console.table(data);
//})

jssql1.selectWhere("Personagens2", "id", 1)
.then(data => {
    console.table(data);
})
