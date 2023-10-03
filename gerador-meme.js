const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');

async function gerarMeme(imagemModeloPath, textoSuperior, textoInferior) {
    const canvas = createCanvas(500, 500); // Tamanho do canvas
    const ctx = canvas.getContext('2d');

    // Registre uma fonte para uso posterior
    registerFont( { family: 'Arial' }); // Substitua pelo caminho e nome da sua fonte

    // Carregue a imagem de modelo
    const imagemModelo = await loadImage(imagemModeloPath); // Caminho para a imagem de modelo
    ctx.drawImage(imagemModelo, 0, 0, canvas.width, canvas.height);

    // Adicione o texto superior
    ctx.font = '40px Arial'; // Substitua pelo nome da fonte registrada
    ctx.fillStyle = '#ffffff'; // Cor do texto (branco)
    ctx.textAlign = 'center'; // Alinhamento central
    ctx.fillText(textoSuperior, canvas.width / 2, 50);

    // Adicione o texto inferior
    ctx.fillText(textoInferior, canvas.width / 2, canvas.height - 20);

    // Salve a imagem gerada
    const nomeDoArquivo = `meme_${Date.now()}.jpg`;
    const caminhoDoArquivo = `gerador-de-meme/frontend/images${nomeDoArquivo}`; // Substitua pelo caminho onde deseja salvar o meme

    const stream = canvas.createJPEGStream({ quality: 0.95 }); // Defina a qualidade desejada
    const out = fs.createWriteStream(caminhoDoArquivo);

    return new Promise((resolve, reject) => {
        stream.pipe(out);
        out.on('finish', () => {
            console.log(`Meme salvo em: ${caminhoDoArquivo}`);
            resolve(caminhoDoArquivo); // Retorne o caminho do arquivo gerado
        });
        out.on('error', reject);
    });
}
