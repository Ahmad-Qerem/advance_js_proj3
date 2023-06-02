import Catalog from "./modules/MovieManagement/Catalog.js ";
import {
  PrintMainMenu,
  selectChoice,
  stopReadLine,
} from "./modules/MovieManagement/utils.js";

const main = async () => {
  const catalog = new Catalog();

  let choice = -1;
  while (choice) {
    PrintMainMenu();
    choice = Number(await selectChoice("select one from 1 to 7 :"));
    console.log("choice:", choice);
    switch (choice) {
      case 1:
        catalog.displayCatalog();
        break;
      case 2:
        await catalog.addMovie();
        break;
      case 3:
        await catalog.updateMovie();
        break;
      case 4:
        await catalog.deleteMovie();
        break;
      case 5:
        await catalog.searchMovies();
        break;
      case 6:
        await catalog.filterMovies();
        break;
      case 7:
        console.log("Exiting ...");
        choice = 0;
        break;
      default:
        console.log("Invalid choice. Please try again.");
    }
  }
  stopReadLine();
  process.exit();
};
main();
