const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();

app.use(bodyParser.json());


let users = {
    'teste@example.com': {
        email: 'teste@example.com',
        password: 'senhaantiga'
    }
};


app.post('/recuperar-senha', (req, res) => {
    const email = req.body.email;

    if (!users[email]) {
        users[email] = { email: email }; 
    }

    const token = crypto.randomBytes(20).toString('hex');
    users[email].resetPasswordToken = token;
    users[email].resetPasswordExpires = Date.now() + 3600000; 

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'email@gmail.com',
            pass: 'senha'
        }
    });

    const mailOptions = {
        to: email,
        from: 'passwordreset@demo.com',
        subject: 'Redefinição de senha',
        text: `Você está recebendo isso porque você (ou outra pessoa) solicitou a redefinição da senha da sua conta.\n\n` +
              `Por favor, clique no seguinte link, ou cole no seu navegador para completar o processo:\n\n` +
              `http://${req.headers.host}/resetar-senha/${token}\n\n` +
              `Se você não solicitou isso, por favor, ignore este e-mail e sua senha permanecerá inalterada.\n`
    };

    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            return res.status(500).send('Erro ao enviar e-mail');
        }
        res.status(200).send('E-mail de recuperação enviado com sucesso');
    });
});


app.post('/resetar-senha/:token', (req, res) => {
    const token = req.params.token;
    const password = req.body.password;
    let user;

  
    for (let email in users) {
        if (users[email].resetPasswordToken === token && users[email].resetPasswordExpires > Date.now()) {
            user = users[email];
            break;
        }
    }

    if (!user) {
        return res.status(400).send('Token inválido ou expirado');
    }

    
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    res.status(200).send('Senha redefinida com sucesso');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});