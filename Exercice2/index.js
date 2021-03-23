const express = require('express');
const Joi = require('joi');
const app = express();
app.use(express.json());

const port = 3000;

app.listen(port,()=> console.log(`Server running on ${port}...`));


var films = [
    {id : 1, nom : "film 1", acteurs : ["acteur1","acteur2"], seances : [{id_seance : 1, date : "20/04/2021", temps : "21h", nbr_disponible : 50}, {id_seance : 2, date : "20/04/2021", temps : "20h", nbr_disponible : 100}, {id_seance : 3, date : "30/04/2021", temps : "17h", nbr_disponible : 30}]},
    {id : 2, nom : "film 2", acteurs : ["acteur1","acteur2"], seances : [{id_seance : 1, date : "12/04/2021", temps : "18h", nbr_disponible : 50}, {id_seance : 2, date : "18/04/2021", temps : "20h", nbr_disponible : 80}, {id_seance : 3, date : "30/04/2021", temps : "16h", nbr_disponible : 12}]},
    {id : 3, nom : "film 3", acteurs : ["acteur1","acteur2"], seances : [{id_seance : 1, date : "08/05/2021", temps : "13h", nbr_disponible : 250}, {id_seance : 2, date : "09/04/2021", temps : "11h", nbr_disponible : 60}, {id_seance : 3, date : "30/03/2021", temps : "17h", nbr_disponible : 3}]}
]

/********************************   Partie CRUD *******************************************/
app.get('/api/films',(req,res) => {
    res.send(films)
});

app.get('/api/films/:id',(req,res) =>
{
    let film = films.find(f => f.id === parseInt(req.params.id))
    if(!film) 
        return res.status(404).send(`film avec id : ${req.params.id} introuvable`);
    res.send(film);
})

const validation_schema = {
    nom : Joi.string().min(3).max(50).required(),
    acteurs : Joi.array().min(1).required(),
    seances : Joi.array().min(1).required()
}

app.post('/api/films', (req,res)=> {
    let valid_res = Joi.validate(req.body,validation_schema);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    let film = {
        id: films.length + 1,
        nom : req.body.nom,
        acteurs : req.body.acteurs,
        seances : req.body.seances
    };
    films.push(film);
    res.send(film);
});

const validation_id_schema = {
    id : Joi.number().min(1)
}

const validation_maj_schema = {
    nom : Joi.string().min(3).max(50).required(),
    acteurs : Joi.array().min(1),
    seances : Joi.array().min(1)
}

app.put('/api/films/:id',(req,res) => {
    let valid_res = Joi.validate(req.params,validation_id_schema);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    let film = films.find(f => f.id === parseInt(req.params.id))
    if(!film) 
        return res.status(404).send(`film avec id : ${req.params.id} introuvable`);
    valid_res = Joi.validate(req.body,validation_maj_schema);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)

    film.nom = req.body.nom
    
    if(req.body.acteurs)
        film.acteurs = req.body.acteurs;
    if (req.body.seances)
        film.seances = req.body.seances;
    res.send(film);
});

app.delete('/api/films/:id',(req,res) => {
    let valid_res = Joi.validate(req.params,validation_id_schema);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    let film = films.find(f => f.id === parseInt(req.params.id))
    if(!film) 
        return res.status(404).send(`film avec id : ${req.params.id} introuvable`);
        films = films.filter(f => f.id !== parseInt(req.params.id))
    res.send(film);
});

/*******************************************************************************************/

const validation_reservation_schema = {
    id: Joi.number().min(1),
    id_seance : Joi.number().min(1),
    nbr : Joi.number().min(1)
}
app.post('/api/films/reservation/:id/:id_seance/:nbr', (req,res)=> {
    let valid_res = Joi.validate(req.params,validation_reservation_schema);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)

    let film = films.find(f => f.id === parseInt(req.params.id))
    if(!film) 
        return res.status(404).send(`film avec id : ${req.params.id} introuvable`);
    
    let seance = film.seances.find(s => s.id_seance === parseInt(req.params.id_seance))
    if(!seance) 
        return res.status(404).send(`seance avec id : ${req.params.id} introuvable`);

    nbr_dePlace_aReserve = parseInt(req.params.nbr);
    if (seance.nbr_disponible >= parseInt(req.params.nbr))
        seance.nbr_disponible = seance.nbr_disponible - nbr_dePlace_aReserve;
    else
        return res.status(405).send(`nombre de places à reservé demandé est superieur au nombre disponible pour cette seance`);
    res.send(seance);
});