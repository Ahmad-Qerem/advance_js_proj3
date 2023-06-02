import fs from "fs/promises"

async function readDataFromFile(filename) {
  try {
    const data = await fs.readFile(filename, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error(`Error reading data from file: ${error.message}`);
  }
}

async function writeDataToFile(filename, data) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error(`Error writing data to file: ${error.message}`);
  }
}

export {
    readDataFromFile,
    writeDataToFile
}