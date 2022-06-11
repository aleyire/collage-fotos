const fs = require("fs")
const bodyParser = require("body-parser")
const path = require("path")
const expressFileUpload = require("express-fileupload")
const express = require("express")
const app = express()

app.listen(3000, console.log("Server on"))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(
  expressFileUpload({
    limits: { fileSize: 5000000 }, // límite de 5MB
    abortOnLimit: true,
    responseOnLimit:
      "El peso del archivo que intentas subir supera el limite permitido",
  })
)

app.use(express.static("public")) // para que se pueda acceder a los archivos estaticos

app.get("/", (req, res) => { // devuelve el formulario.html
  res.sendFile(__dirname + "/public/formulario.html")
})

app.post("/imagen", (req, res) => {
  // recibir y almacenar la foto
  const { foto } = req.files
  const { name } = foto 
  const ruta = path.join(`${__dirname}/public/imagen/${name}`)
  foto.mv(ruta, (err) => {
    res.send("Archivo cargado con éxito")
  })
})

app.get("/collage", (req, res) => { // devuelve el collage.html
  res.sendFile(__dirname + "/public/collage.html")
})
app.delete("/deleteImg/:nombre", (req, res) => {
  const { nombre } = req.params
  const ruta = path.join(__dirname, `collage/${nombre}.jpg`)
  fs.unlink(ruta, (err) => {
    res.send(`Imagen ${nombre} fue eliminada con éxito`)
  })
})
