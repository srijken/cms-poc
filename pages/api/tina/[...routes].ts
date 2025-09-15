import { TinaNodeBackend, LocalBackendAuthProvider } from "@tinacms/datalayer";
import { NextApiHandler } from "next";
import databaseClient from "../../../tina/__generated__/databaseClient";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const handler: NextApiHandler = async (req, res) => {
  const backend = TinaNodeBackend({
    authProvider: LocalBackendAuthProvider(),
    databaseClient,
  });

  return backend(req, res);
};

export default handler;