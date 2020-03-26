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
        console.log(search)
        if (Helper.isNum(search['value']) || Helper.isBool(search['value']))
            where[search['columnName']] = search['value'];
        else
            where[search['columnName']] = { [Op.iLike]: '%' + search['value'] + '%' };
        // console.log(where);
        model.findAll({ where, include })
            .then(data => {
                data = Helper.getCleanData(data);
                res.render('pages/list', { modelName, data, search })
            })
            .catch(err => {
                console.log(err);
                res.render('pages/error', { err });
            });
    }
}

module.exports = Controller;