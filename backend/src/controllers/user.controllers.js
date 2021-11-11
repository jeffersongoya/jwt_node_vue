const User = require('../models/user.model');

exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({ email: req.body.email });
    console.log(isUser);

    if (isUser.length >= 1) {
      return res.status(409).json({ message: 'E-amil já registrado!' });
    }

    const newUser = await User(req.body);
    const user = await newUser.save();
    const token = await newUser.generateAuthToken();
    res.status(201).json({
      message: 'Usuário criado com sucesso!', user, token
    });
  } catch (err) {
    res.status(400).json({ error: `${err}` });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const user = await User.findByCredentials(email, password);
    if (!user) {
      return res.status(401).json({
        error: "Erro ao Logar! Verifique as suas credenciais de autenticação!",
      });
    }
    const token = await user.generateAuthToken();
    return res
      .status(201)
      .json({ message: "Usuário(a) logado com sucesso!", user, token });
  } catch (err) {
    return res.status(400).json({ err });
  }
};

exports.returnUserProfile = async (req, res) => {
  await res.json(req.userData);
};