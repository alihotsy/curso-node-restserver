const inquirer = require('inquirer');
const giphy = require('./endpoints');

const inquirerQuestion = async() => {
    const question = [
        {
            type:'input',
            name: 'opt',
            message: 'Ingresa una serie:',
            validate(value){
             if(value.length <= 2){
               return 'La búsqueda debe contener más de 2 caracteres'
             } 
               return true;
            }
        }
    ];
    const {opt} = await inquirer.prompt(question);
    giphy(opt.trim());
}
inquirerQuestion();