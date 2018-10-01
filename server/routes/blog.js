const router = require('express').Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogDB',{
    useNewUrlParser : true,
    useCreateIndex : true,
});

const userSchema = require('../models/user');
const userModel = mongoose.model('users', userSchema);

const articleSchema = require('../models/article');
const articleModel = mongoose.model('article', articleSchema);

const commentSchema = require('../models/comment');
const commentModel = mongoose.model('comment', commentSchema);

// add article
router.post('/article', async(req, res) => {
    const result = await articleModel.create(req.body);
    res.send(result);
});

// find article 
router.get('/article', async(req, res) => {
    const result = await articleModel.find().populate({path : 'users'}).populate({path : 'comments'});
    res.send(result)

});  

// find article 
router.get('/article/:id', async(req, res) => {
    const result = await articleModel.findById({_id : req.params.id}).populate({path : 'users'}).populate({path : 'comments'});
    res.send(result)
});

// find article by id user aussi
router.get('/users/:iduser', async(req, res) => {
    const result = await articleModel.findById({author: req.params.iduser}).populate({path : 'users'}).populate({path : 'comments'});
    res.send(result)
})

//update article with id
router.put('/article/:id', async(req, res) => {
const result = await articleModel.update({_id: req.params.id}, {$set: req.body});
res.send(result);
});

//remove article by id
router.delete('/article/:id', async(req, res) => {
    const result = await articleModel.remove({_id : req.params.id})
    res.send(result)
});

//add commentaire
router.post('/comment/:idarticle', async(req, res) =>{
    const result = await commentModel.create(req.body);
    const result2 = await articleModel.updateOne({_id: req.params.idarticle}, {$push: {comments : result._id }});
    res.send(result2);
});

//delete commentaire
router.delete('/comment/:id', async(req, res) =>{
    const result = await commentModel.remove({_id : req.params.id});
    res.send(result)
});

//find comment
router.get('/comment', async(req, res) => {
    const result = await commentModel.find();
    res.send(result);
});



module.exports = router;