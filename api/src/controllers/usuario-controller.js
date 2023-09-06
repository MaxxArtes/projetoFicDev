const { UsuarioModel } = require('../models/usuario-model');
// const { UserView } = require('../views/user-view');

class UsuarioController {
  async create(req, res) {
    try {
      const { name, password, cpf, cargo, especialidade, email } = req.body;
      const usuario = await UsuarioModel.create({
        name,
        password,
        cpf,
        cargo,
        especialidade,
        email
      });
      return res.status(201).json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, password, cpf, cargo, especialidade, email } = req.body;
      const usuario = await UsuarioModel.update(
        {
          name,
          password,
          cpf,
          cargo,
          especialidade,
          email
        },
        { where: { id } }
      );
      return res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await UsuarioModel.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.status(200).json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAll(req, res) {
    try {
      const usuarios = await UsuarioModel.findAll();
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const usuario = await UsuarioModel.findOne({
        where: { email }
      });
      if (!usuario) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (!bcrypt.compareSync(password, usuario.password)) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
        expiresIn: 86400
      });
      return res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UsuarioController();
