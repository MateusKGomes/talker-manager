const fs = require('fs').promises;

const readJsonData = async (path) => {
    try {
        const fileContent = await fs.readFile(path, 'utf-8');
        const response = await JSON.parse(fileContent);
        return response;
    } catch (error) {
        console.error('O arquivo não pode ser lido!');
    }   
};

const writeJson = async (path, data) => {
    const updateData = JSON.stringify(data);
    const result = await fs.writeFile(path, updateData);
    return result;
};

module.exports = { readJsonData, writeJson };