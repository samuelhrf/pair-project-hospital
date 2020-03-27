const models = require('../models');
const Op = require('sequelize').Op;
const Helper = require('../config/Helper'); // Helper functions

class Controller {
    // Renders page list based on page
    static pageList(req, res) {
        const { model, modelName, include } = Helper.getParams(req)
        model.findAll({ include })
            .then(data => {
                data = Helper.getCleanData(data);
                res.render('pages/list', { modelName, data })
            })
            .catch(err => {
                console.log(err);
                res.render('pages/error', { err });
            });
    }

    static search(req, res) {
        const { model, modelName, search, include } = Helper.getParams(req)
        const where = {};
        // console.log(search)
        if (Helper.isNum(search['value']) || Helper.isBool(search['value']))
            where[search['columnName']] = search['value'];
        else
            where[search['columnName']] = { [Op.iLike]: '%' + search['value'] + '%' };
        // console.log(where);
        model.findAll({ where, include })
            .catch(err => {
                const newColName = `$Info.${search['columnName']}$`;
                where[newColName] = where[search['columnName']];
                delete where[search['columnName']];
                return model.findAll({ where, include });
            })
            .then(data => {
                data = Helper.getCleanData(data);
                res.render('pages/list', { modelName, data, search })
            })
            .catch(err => {
                console.log(err);
                res.render('pages/error', { err });
            });
    }

    static delete(req, res) {
        const { model, modelName, id } = Helper.getParams(req)
        model.destroy({ where: { id } })
            .then(data => {
                res.redirect(`/${modelName.toLowerCase()}s`)
            })
            .catch(err => {
                res.render('pages/error', { err });
            });
    }

    static pageAdd(req, res) {
        const { modelName } = Helper.getParams(req)
        const data = Helper.consts.objectMap[modelName];
        res.render('pages/add', { modelName, data })
    }

    static pageEdit(req, res) {
        const { model, modelName, id } = Helper.getParams(req)
        model.findOne({ where: { id } })
            .then(data => {
                data = Helper.getCleanData(data)[0];
                console.log(data)
                res.render('pages/edit', { modelName, data })
            })
            .catch(err => {
                res.render('pages/error', { err });
            });
    }
    // ========================================================


    static add(req, res) {
        const { model, modelName } = Helper.getParams(req)
        const newObj = Object(req.body);
        model.build(newObj)
            .save()
            .then(data => {
                res.redirect(`/${modelName.toLowerCase()}s`)
            })
            .catch(err => {
                res.render('pages/error', { err });
                console.log(err);
            })
    }

    static edit(req, res) {
        const { model, modelName, id } = Helper.getParams(req)
        model.update(Object(req.body), { where: { id } })
            .then(data => {
                res.redirect(`/${modelName.toLowerCase()}s`)
            })
            .catch(err => {
                res.render('pages/error', { err });
                console.log(err);
            })
    }

}

module.exports = Controller;