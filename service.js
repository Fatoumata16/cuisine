// user.service.js
// const user = require('../modeles/user'); // Adjust the path as needed
const user=require('./modeleuser')
const bcrypt = require('bcrypt');
const poste=require('./post')
const commentaire=require('./commentaire')
user.sync();
class userService {
    async creer(clien){
    const  {nom,prenom,tel,password,sexe}=clien;
    try {
      let hashe = await bcrypt.hash(password, 10);
      
      await user.create({nom,prenom,tel,password: hashe,sexe})
    } catch (error) {
       throw error
    }
    }
    async  connecter(tel,password){
      try {
        const resultat=await user.findOne({where:{tel:tel}})
        if (resultat === null) {
          throw new Error('utilisateur non trouve');
        } else {
       const result=      await   bcrypt.compare(password, resultat.password)
            if (!result) {
              throw new Error('mot de passe incorrect');
            } else {
              return resultat;
            }
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    }
    async trouverClientparId(tel) {
      try {
        return await user.findOne({where:{tel:tel}});
      } catch (error) {
        throw error;
      }
    }
    async creerposte(pharmacieee, path){
        try {
          await poste.create({nom:pharmacieee.nom,description:pharmacieee.description,path})
        } catch (error) {
          throw new Error(error)
        }
      }
      async listerPoste() {
        try {
        const tout= await poste.findAll()
        if(tout.length===0){
          return 'le tableau est vide'
        }
         return tout
        } catch (error) {
          throw new Error(error);
        }
      }
      async  addComment(id_user, id_post, description) {
        try {
          const comment = await commentaire.create({
            description,date:new Date(),
            id_user,
            id_post
          });
          return comment;
        } catch (error) {
          throw new Error(`Erreur lors de l'ajout du commentaire : ${error.message}`);
        }
      }
      async lister(id_poste) {
        try {
        const tout= await commentaire.findAll({
          include: [
            {
              model: user,
              attributes: ["nom","prenom","tel"], 
            },
            {
              model: poste,
              attributes: ["nom","description"], 
            },
          ],
          where:{id_post:id_poste}})
        if(tout.length===0){
          return 'le tableau est vide'
        }
         return tout
        } catch (error) {
          throw new Error(error);
        }
      }

      async supprimerparId(id_post){
        try {
         return await  poste.destroy({where:{id_post}})
        } catch (error) {
          throw new Error(error)
        }
      }
      async supprimer(id){
        try {
         return await  commentaire.destroy({where:{id}})
        } catch (error) {
          throw new Error(error)
        }
      }


}
module.exports = new userService();