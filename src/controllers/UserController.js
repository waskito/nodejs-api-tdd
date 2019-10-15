const User = require('../models/User')

class UserController{
    async index(req, res) {
        try {
            const users = await User.find()
            res.status(200).send({ users })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    async store(req, res) {
        try {
            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.statusCode = 201;
            res.send({ user, token })
        } catch (error) {
            res.statusCode = 422;
            res.send(error)
        }
    }

    async update(req, res) {
        try {
            const user = req.user
            await user.update(req.body)
            res.statusCode = 201;
            res.send({ user })
        } catch (error) {
            res.statusCode = 400;
            res.send(error)
        }
    }

    async delete(req, res) {
        try {
            await User.deleteOne({ _id: req.params.id });

            res.statusCode = 204;
            res.send()
        } catch (error) {
            res.status(400).send(error)
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findByCredentials(email, password)
            if (!user) {
                return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
            }
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (error) {
            res.status(400).send(error)
        }
    }

    async me(req, res) {
        res.send(req.user)
    }

    async logout(req, res) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token != req.token
            })
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = new UserController