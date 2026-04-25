import { Request, RequestHandler } from "express";
import formidable, { File } from "formidable";

export interface RequestWithFiles extends Request {
  files?: { [key: string]: File };
}

const fileParser: RequestHandler = async (req: RequestWithFiles, res, next) => {
  if (!req.headers["content-type"]?.startsWith("multipart/form-data;"))
    return res.status(422).json({ error: "Only accepts form-data!" });

  const form = formidable({ multiples: false });

  const [fields, files] = await form.parse(req);

  // ✅ Construye el objeto primero, luego asigna de una vez
  const bodyData: Record<string, any> = {};

  for (let key in fields) {
    const field = fields[key];
    if (field) {
      bodyData[key] = field[0];
    }
  }

  req.body = bodyData; // asignación única

  const parsedFiles: { [key: string]: File } = {};

  for (let key in files) {
    const file = files[key];
    if (file) {
      parsedFiles[key] = file[0];
    }
  }

  req.files = parsedFiles;
  console.log("BODY:", JSON.stringify(req.body));   // 👈
  console.log("FILES:", JSON.stringify(Object.keys(req.files))); // 👈
  next();
};

export default fileParser;