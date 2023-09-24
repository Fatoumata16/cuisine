const express = require('express');
const router = express.Router();
const userService = require('./service'); // Adjust the path as needed
const upload = require('./multerconfig'); 
// Create a user
router.post('/createUser', async (req, res) => {
  try {
    const { nom, prenom, tel, password, sexe } = req.body;
    await userService.creer({ nom, prenom, tel, password, sexe });
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const data = req.body;
  try {
    const resultat = await userService.connecter(data.tel,data.password);
    res.status(200).json({
     resultat
    });
  } catch (error) {
    if (error.message === 'utilisateur non trouve') {
      res.status(500).json(error.message);
    } else if (error.message === 'mot de passe incorrect') {
      res.status(401).json(error.message);
    } else {
      res.status(500).json('Erreur serveur');
    }
  }
});

// Get user by ID
router.get('/getUser', async (req, res) => {
  try {
    const  tel  = req.body.tel;
    const user = await userService.trouverClientparId(tel);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a post
router.post('/createPost',upload, async (req, res) => {
  try {
    let imageUrl="http://localhost:3000/images/openfarm3.jpg1689081448327.jpg"
    const data= JSON.parse(req.body.poste);
    if(req.file){  
         imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
   await userService.creerposte(data,imageUrl)
      res.status(200).json({ message: 'poste créé avec succès' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }


});

// List all posts
router.get('/listPosts', async (req, res) => {
  try {
    const posts = await userService.listerPoste();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a comment
router.post('/addComment', async (req, res) => {
  try {
    const { id_user, id_poste, description } = req.body;
    const comment = await userService.addComment(id_user, id_poste, description);
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// List comments for a post
router.get('/listComments/:id_poste', async (req, res) => {
  try {
    const { id_poste } = req.params;
    const comments = await userService.lister(id_poste);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/supprimer/:id', async (req, res) => {
    try {
      
          await  userService.supprimerparId(req.params.id)
                res.status(200).json({ message: 'poste supprimee avec succès' });
                
          
       } catch (error) {
        res.json(error.message)
       }
  });
  router.delete('/supprimercommentaire/:id', async (req, res) => {
    try {
      
          await  userService.supprimer(req.params.id)
                res.status(200).json({ message: 'commentaire supprimee avec succès' });
                
          
       } catch (error) {
        res.json(error.message)
       }
  });
module.exports = router;
