const fs = require('fs').promises;
// 

const readJsonData = async (path) => {
    try {
        const fileContent = await fs.readFile(path, 'utf-8');
        const response = await JSON.parse(fileContent);
        return response;
    } catch (error) {
        console.error('O arquivo não pode ser lido!');
    }   
};

// 

// readJsonData(moviesPath);

module.exports = readJsonData;