const express =  require('express');
const app = express();
const PORT = 3000;

const { getAllPosts, createPost, addLike, deletePost } = require('./services/posts');

app.use(express.json()) //middleware para parsear el cuerpo de la consulta
app.use(express.static("public")); //middleware para servir archivos estáticos

app.get("/", (req, res) => {
  try {
    res.sendFile();
  } catch (error) {
    res.json({ message: "No se encuentra el recurso que estas solicitando" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const getPosts = await getAllPosts();
    res.json(getPosts);
  } catch (error) {
    console.log(error);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    await createPost(titulo, url, descripcion);
    res.send("Post creado");
  } catch (error) {
    console.log(error);
  }
});

app.put('/posts/like/:id', async (req, res) => {
  const { id } = req.params;
  await addLike(id);
  res.send('like added');
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  await deletePost(id);
  res.send('post deleted');
});

app.listen(PORT, () => {
  console.log(`Estoy escuchando el puerto ${PORT}`);
});