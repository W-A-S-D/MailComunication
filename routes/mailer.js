var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");



router.post('/:email', function (req, res, next) {

    const email= req.params.email
    const assunto= req.body.text_assunto
    // const categoria= req.body.sel_opcao
    const texto = req.body.text_descricao
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
    var emailASerEnviado = {
        to: email,
        subject: assunto,
        text: texto,
        // attachments: [
        //     {   // file on disk as an attachment
        //         filename: 'text3.txt',
        //         path: '/path/to/file.txt' // stream this file
        //     },
        //   ]
    };

    remetente.sendMail(emailASerEnviado, function (error) {
        if (error) {
            console.log(error);
        } else {

            console.log('Email enviado com sucesso.');
            return res.status(200).json({
                success: true
            });
        }
    });
res.send('OK')
});

module.exports = router;