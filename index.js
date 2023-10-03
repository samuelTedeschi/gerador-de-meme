const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const gerarMeme = require('./gerador-meme'); // Importe a função gerarMeme

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/gerar-meme', async (req, res) => {
  const { imagemModeloPath, textoSuperior, textoInferior } = req.body;

  try {
    const caminhoDoMemeGerado = await gerarMeme(imagemModeloPath, textoSuperior, textoInferior);
    res.json({ url: caminhoDoMemeGerado }); // Retorne a URL ou caminho do meme gerado
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Ocorreu um erro ao gerar o meme.' });
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});