import readline from "readline";

const readLine = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const PrintMainMenu = () => {
  console.log("==== Movie Catalog ====");
  console.log("1) Display Movie Catalog");
  console.log("2) Add New Movie");
  console.log("3) Update Movie Details");
  console.log("4) Delete Movie");
  console.log("5) Search Movies");
  console.log("6) Filter Movies");
  console.log("7) Exit");
};

const selectChoice = (question) => {
  return new Promise((resolve) => {
    readLine.question(question, (answer) => {
      resolve(answer);
    });
  });
};
const stopReadLine = () => readLine.close;

export { PrintMainMenu, selectChoice,stopReadLine };
