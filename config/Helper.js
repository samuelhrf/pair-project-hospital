const models = require('../models');

// ========== Constants ==========
const modelConstants = [
    {
        page: 'wards',
        model: models.Ward,
        include: [
            {
                model: models.Doctor, include: [
                    { model: models.Info }
                ]
            }
        ]
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
]

// // Menu Includes
// const menuIncludes = [
//     {
//         model: models.Doctor, include: [
//             { model: models.Info }
//         ]
//     }
// ]

// Stuff to remove
const removeMap = [
    'ward_id',
    'info_id',
    'WardId',
    'InfoId',
    'createdAt',
    'updatedAt',
    'patient_id',
    'PatientId',
    'doctor_id',
    'DoctorId'
]

// ========== Functions ==========
class Helper {
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
            // data[i] = Helper.removeUnneeded(data[i]);
            data[i] = Helper.appendInfo(data[i]);
        }
        // console.log(1, data[0])
        return data;
    }

    // Removes uneeded items
    static removeUnneeded(data) {
        for (let key in data) {
            if (removeMap.includes(key) && typeof data[key] !== 'object') {
                console.log(key, data[key])
                delete data[key];
            }
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
        for (let i in modelConstants) {
            if (modelConstants[i].page == page)
                return modelConstants[i].model;
        }
        // On fail
        return null;
    }

    // Gets whats needed to be included based on page
    static getInclude(page) {
        for (let i in modelConstants) {
            if (modelConstants[i].page == page)
                return modelConstants[i].include;
        }
        // On fail
        return [];
    }
}

module.exports = Helper;