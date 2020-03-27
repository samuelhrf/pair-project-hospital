const models = require('../models');

// static getObject(dataType) {
//     switch (dataType) {
//         case 'Teacher':
//             return {
//                 first_name: undefined,
//                 last_name: undefined,
//                 email: undefined,
//                 gender: undefined
//             }
//         case 'Student':
//             return {
//                 first_name: undefined,
//                 last_name: undefined,
//                 email: undefined,
//                 gender: undefined,
//                 birthdate: undefined
//             }
//         case 'Subject':
//             return {
//                 subject_name: undefined,
//             }
//     }
// }

class Helper {
    // ==================== Constants ====================
    static get consts() {
        return {
            // Models and Includes for listview
            modelConstants: [
                {
                    page: 'wards',
                    model: models.Ward,
                    include: []
                },
                {
                    page: 'doctors',
                    model: models.Doctor,
                    include: [
                        {
                            model: models.Ward
                        },
                        {
                            model: models.Consultation
                        },
                        {
                            model: models.Info
                        }
                    ]
                },
                {
                    page: 'consultations',
                    model: models.Consultation,
                    include: [
                        {
                            model: models.Doctor,
                            include: [
                                { model: models.Info }
                            ]
                        },
                        {
                            model: models.Patient,
                            include: [
                                { model: models.Info }
                            ]
                        }
                    ]
                },
                {
                    page: 'patients',
                    model: models.Patient,
                    include: [
                        {
                            model: models.Consultation
                        },
                        {
                            model: models.Info
                        }
                    ]
                }
            ],
            // Object map for passing to add and edit
            objectMap: {
                Consultation: {
                    patient_id: undefined,
                    doctor_id: undefined,
                    diagnosis: undefined,
                    checked_out: undefined,
                    canceled: undefined
                },
                Doctor: {
                    ward_id: undefined,
                    info_id: undefined,
                    consultation_price: undefined
                },
                Info: {
                    first_name: undefined,
                    last_name: undefined,
                    address: undefined,
                    date_of_birth: undefined,
                    gender: undefined
                },
                Patient: {
                    info_id: undefined
                },
                Ward: {
                    name: undefined
                }
            },
            // Stuff to remove
            removeMap: [
                // 'ward_id',
                // 'info_id',
                // 'WardId',
                // 'InfoId',
                'createdAt',
                'updatedAt',
                // 'patient_id',
                // 'PatientId',
                // 'doctor_id',
                // 'DoctorId'
            ]
        }
    }

    // ==================== Functions ====================
    // Converts from 'first_name' to 'FirstName'
    static pascalCase(str) {
        return str
            .split('_')
            .map(function (word) {
                return word[0].toUpperCase() + word.substr(1);
            })
            .join('');
    }

    // Returns { page, model, dataType, id, search, include }
    static getParams(req) {
        const urlParams = req.originalUrl.split('/').slice(1);
        let page = urlParams[0];
        let model = Helper.getModel(page);
        let modelName = model.name;
        let id = req.params['id'];
        let search = req.query;
        let include = Helper.getInclude(page);
        return { page, model, modelName, id, search, include };
    }

    // Gets clean data to send to view
    static getCleanData(data) {
        data = JSON.parse(JSON.stringify(data));
        if (typeof data !== 'undefined') {
            if (!Array.isArray(data)) {
                data = [data];
            }
        }
        for (let i in data) {
            data[i] = Helper.removeUnneeded(data[i]);
            data[i] = Helper.appendInfo(data[i]);
        }
        // console.log(1, data[0])
        return data;
    }

    // Removes uneeded items
    static removeUnneeded(data) {
        const consts = Helper.consts;
        for (let key in data) {
            if (consts.removeMap.includes(key) && typeof data[key] !== 'object') {
                // console.log(key, data[key])
                delete data[key];
            }
            // Because we use snake_case we need to delete the 
            // PascalCase that sequelize also returns of the same data
            const pascalCased = Helper.pascalCase(key);
            if (typeof data[pascalCased] !== 'undefined' &&
                pascalCased !== key)
                delete data[pascalCased];
        }
        return data;
    }

    // Appends info where available
    static appendInfo(data) {
        const tempData = {};
        let i = 0;
        if (data['Info'] != undefined) {
            const info = data['Info'];
            for (let key in data) {
                if (i == 1) {
                    tempData['full_name'] = [info['first_name'], info['last_name']].join(' ');
                    tempData['address'] = info['address'];
                    tempData['email'] = info['email'];
                    tempData['phone_number'] = info['phone_number'];
                    tempData['date_of_birth'] = info['date_of_birth'];
                    tempData['gender'] = info['gender'];
                }
                tempData[key] = data[key];
                i++;
            }
        }
        else {
            return data;
        }
        delete tempData['Info'];
        return tempData;
    }

    // Is str a number
    static isNum(str) {
        if (Number(str))
            return true;
        else
            return false;
    }

    // Is str a boolean 
    static isBool(str) {
        if (str === 'true' || str === 'false')
            return true;
        else
            return false;
    }

    // Get the model based on page
    static getModel(page) {
        const consts = Helper.consts;
        for (let i in consts.modelConstants) {
            if (consts.modelConstants[i].page == page)
                return consts.modelConstants[i].model;
        }
        // On fail
        return null;
    }

    // Gets whats needed to be included based on page
    static getInclude(page) {
        const consts = Helper.consts;
        for (let i in consts.modelConstants) {
            if (consts.modelConstants[i].page == page)
                return consts.modelConstants[i].include;
        }
        // On fail
        return [];
    }
}

module.exports = Helper;