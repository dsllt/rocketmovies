module.exports = {
  bail: true, //bail true faz com que os testes não continuem caso um teste falhe
  coverageProvider: "v8",

  testMatch: [ //vetor que tem uma expressão regular indicando o padrão dos arquivos de test
    "<rootDir>/src/**/*.spec.js" //<rootDir>: dentro do diretório padrão /src:inciando na pasta src -> para ignorar a pasta node_modules
    //**: dentro de qualquer pasta *: pode ter qualquer nome .spec.js: extensão dos arquivos de teste
  ],

};
