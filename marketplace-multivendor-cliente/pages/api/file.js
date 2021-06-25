import formidable from "formidable";
import fs from "fs";

export const config = {
    api: {
        bodyParser: false
    }
};

const post = async(req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files) {
        await saveFile(files.file, fields._name);
        return res.status(201).send("");
    });
};

const saveFile = async(file, _name) => {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/images/files/${_name}`, data);
    await fs.unlinkSync(file.path);
    return;
};

export default (req, res) => {
    req.method === "POST" ?
        post(req, res) :
        req.method === "PUT" ?
        console.log("PUT") :
        req.method === "DELETE" ?
        console.log("DELETE") :
        req.method === "GET" ?
        console.log("GET") :
        res.status(404).send("");
};