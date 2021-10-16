var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path')


var readHTMLFile = function(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
        if (err) {
            throw err;
            callback(err);
        } else {
            callback(null, html);
        }
    });
};


router.post('/:email', function(req, res, next) {

    const email = req.params.email
    const assunto = req.body.text_assunto
        // const categoria= req.body.sel_opcao
    const texto = req.body.text_descricao
    const emailFromUser = req.body.emailFromUser;

    // const anexo = req.body.ipt_anexo




    var remetente = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'Gmail',
        port: 587,
        secure: true,
        auth: {
            user: 'wasdenterprise6@gmail.com',
            pass: '#Gfgrupo5'
        }
    });




    readHTMLFile(path.join(__dirname, '../public/templates/message.html'), function(err, html) {

        var template = handlebars.compile(html);

        var replacements = {
            subject: assunto,
            message: texto,
            userEmail: emailFromUser,
        };

        var htmlToSend = template(replacements);

        var mailOptions = {
            to: email,
            subject: assunto,
            html: htmlToSend
        };

        remetente.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
                callback(error);
            } else {
                return res.status(200).send('Email enviado com sucesso!')
            }
        });
    });



});

module.exports = router;