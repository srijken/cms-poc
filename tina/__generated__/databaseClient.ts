import { createDatabase } from "@tinacms/datalayer";

export default createDatabase({
  gitProvider: {
    type: "git",
  },
});