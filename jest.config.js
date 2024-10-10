module.exports = {
  // Se algum teste falhar, interrompe os testes
  bail: true,
  coverageProvider: "v8",

  testMatch: [
    // Matcha todos os arquivos que terminam com .spec.js
    "<rootDir>/src/**/*.spec.js"
  ],
}