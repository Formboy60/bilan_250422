const express = require("express");
const ficheModel = require("./model");
const app = express();
let cors = require('cors')
app.use(cors())
app.use(express.json())


/////////////// route POST /////////////////

app.post('/cdz/new', (req, res, next) => {
  
    const fiche = new ficheModel({
      ...req.body,
    });
    
    fiche.save()
      .then(() => res.status(201).json({ message: 'Données enregistrées !'}))
      .catch(error => res.status(400).json({ error }));
  });

/////////////////// route GET /////////////////

app.get("/cdz/", async (request, response) => {
    const fiche = await ficheModel.find({});
    
    try {
      response.send(fiche);
    } catch (error) {
      response.status(500).send(error);
    }
  });

////////////////// route get ID ////////////////

app.get("/cdz/:id", async (request, response) => {
  const fiche = await ficheModel.findOne({_id: request.params.id});
  
  try {
    response.send(fiche);
  } catch (error) {
    response.status(500).send(error);
  }
});

///////////////// route DELETE //////////////////

app.delete('/cdz/:id', (req, res, next) => {
    ficheModel.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Données supprimées'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});


//////////////// route PUT //////////////////////

app.put('/cdz/:id', (req, res, next) => {

    ficheModel.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
            .then(() => res.status(201).json({ message: 'Données modifié !'}))
            .catch(error => res.status(400).json({ error }));
        }
    );
  
  
  
    module.exports = app;