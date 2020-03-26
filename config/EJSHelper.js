class Helper {
    // ================= Constants =================
    static get consts() {
        return {
            inputMap: {
                date: '',
                text: '',

            },
            reqInputsMap: {
                Ward: ['name'],
                Doctor: ['ward_id', 'consultation_price',]
            },
            displayMap: {
                Doctor: `<a href="/doctors/search?columnName={{COLUMN_NAME}}&value={{ID}}">{{FULL_NAME}}</a>`,
                name: `<a href='/doctors/search?columnName={{COLUMN_NAME}}&value={{ID}}'>{{WARD_NAME}} Ward's Doctors</a>`,
                Patient: `<a href="/patients/search?columnName={{COLUMN_NAME}}&value={{ID}}">{{FULL_NAME}}</a>`,
                Ward: `<a href="/doctors/search?columnName={{COLUMN_NAME}}&value={{ID}}">{{WARD_NAME}} Ward's Doctors</a>`,
                Consultations: `<a href='/consultations/search?columnName={{COLUMN_NAME}}&value={{ID}}'>{{FULL_NAME}}'s Consultations</a>`,
                checked_out: `{{CHECKED_OUT}}`
            },
            displayLinkOverrides: {
                Doctor: {
                    Ward: {
                        thisId: false,
                        id: '$Ward.id$'
                    },
                    Consultations: {
                        thisId: true,
                        id: '$Doctor.id$'
                    }
                },
                Patient: {
                    Consultations: {
                        thisId: true,
                        id: '$Patient.id$'
                    }
                },
                Ward: {
                    name: {
                        thisId: true,
                        id: '$Ward.id$'
                    }
                }
            },
            optionMap: {
                Ward: ['edit', 'delete', 'add'],
                Doctor: ['edit', 'delete', 'add'],
                Patient: ['edit', 'delete', 'add'],
                Consultation: ['edit', 'add', 'checked_out']
            },
            hideMap: [
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
        }
    }
    // ================= Helpers =================
    // Converts from 'first_name' to 'First Name'
    static processTitles(str) {
        return str
            .split('_')
            .map(function (word) {
                return word[0].toUpperCase() + word.substr(1);
            })
            .join(' ');
    }

    static isHidden(data, key) {
        const consts = Helper.consts;
        if (consts.hideMap.includes(key) && typeof data[key] !== 'object')
            return true;
        return false;
    }

    // If a number is > 9 then it adds 0
    // Ex: 7 -> 07 
    static formatDateNum(num) {
        if (num < 10)
            return `0${num}`;
        else
            return num;
    }

    // Gets date where available
    static getDate(dateStr) {
        if (isNaN(dateStr)) { //Checked for numeric
            let date = new Date(dateStr);
            if (isNaN(date.getTime())) { //Checked for date
                return dateStr; //Return string if not date.
            } else {
                return date; //Return date **Can do further operations here.
            }
        } else {
            return dateStr; //Return string as it is number
        }
    }

    // Converts a date to DD/MM/YYYY format where available
    static dateToString(date) {
        // console.log(date, Object.prototype.toString.call(JSON.parse(`"${date}"`)))
        if (Object.prototype.toString.call(date) === '[object Date]')
            return `${Helper.formatDateNum(date.getDate())}/${Helper.formatDateNum(date.getMonth() + 1)}/${date.getFullYear()}`;
        else
            return date;
    }

    // Converts a date to YYYY-MM-DD format
    static dateToPicker(date) {
        if (Object.prototype.toString.call(date) === '[object Date]')
            return `${date.getFullYear()}-${formatDateNum(date.getMonth() + 1)}-${formatDateNum(date.getDate())}`;
        else
            return ``;
    }

    static getFormInput(array, key, modelName) {
        if (Object.prototype.toString.call(date) === '[object Object]') array[key] = undefined;
        switch (key) {
            case 'genre':
                return `<select class="custom-select custom-select mt-3" name="genre">
                        ${ Helper.getGenreDropdown(array, key)};
                    </select>`;
            case 'ProductionHouseId':
                return `<select class="custom-select custom-select mt-3" name="ProductionHouseId">
                        ${ Helper.getProdHouseDropdown(array, key)};
                    </select>`;
            case 'released_year':
                return `<input id="${key}" ${isNullAllowed(modelName, key)} name="${key}" type="number" class="form-control mt-3" 
                    min="1900" max="${ new Date().getFullYear() + 5}" step="1" placeholder="${Helper.processTitles(key)}" value="${Helper.getValue(array, key)}">`
            default:
                return `<input id="${key}" ${Helper.isNullAllowed(modelName, key)} name="${key}" type="text" class="form-control mt-3"
                    placeholder="${ Helper.processTitles(key)}" value="${Helper.getValue(array, key)}">`
        }
    }

    static isNullAllowed(modelName, key) {
        const map = {
            'ProductionHouse': ['name_prodHouse', 'headquarters'],
            'Movie': ['name', 'released_year']
        }
        for (let i in map)
            if (i == modelName)
                for (let j in map[i])
                    if (map[i][j] == key)
                        return 'required="required"';
        return '';
    }

    // Returns 'N/A' if null/''/[]/{}
    static unknownIfEmpty(value) {
        let result = value;
        if (value == null || value == '' || typeof value === 'undefined' ||
            JSON.stringify(value) == '[]' || JSON.stringify(value) == '{}')
            result = 'N/A';
        return result;
    }

    static getGenreDropdown(array, key, choices) {
        // const choices = [
        //     'animation',
        //     'comedy',
        //     'drama',
        //     'horor',
        //     'religius',
        //     'thriller'
        // ]
        let htmlResult = '';
        for (let i in choices) {
            if (choices[i] == array[key])
                htmlResult += `<option selected="selected" value="${choices[i]}">${Helper.processTitles(choices[i])}</option>\n`;
            else
                htmlResult += `<option value="${choices[i]}">${Helper.processTitles(choices[i])}</option>\n`;
        }
        return htmlResult;
    }

    static getValue(array, key) {
        if (array[key] == undefined)
            array[key] = '';
        return array[key];
    }


    // Formats the table items
    static formatDisplay(data, key, modelName) {
        const consts = Helper.consts;
        // console.log(data, key, modelName)
        let arr = [];
        // console.log(key, consts.displayMap[key])
        if (typeof data[key] !== 'undefined' &&
            typeof consts.displayMap[key] !== 'undefined') {
            if (!Array.isArray(data[key])) {
                arr = [data[key]];
            }
            else {
                arr = data[key]
            }
        }
        else
            return Helper.unknownIfEmpty(Helper.dateToString(Helper.getDate(data[key])));
        const result = [];
        for (let i in arr) {
            let columnName = 'id';
            let id = arr[i]['id'];
            if (typeof consts.displayLinkOverrides[modelName] !== 'undefined') {
                if (typeof consts.displayLinkOverrides[modelName][key] !== 'undefined') {
                    if (typeof consts.displayLinkOverrides[modelName][key]['id'] !== 'undefined') {
                        if (consts.displayLinkOverrides[modelName][key]['thisId'])
                            id = data['id'];
                        columnName = consts.displayLinkOverrides[modelName][key]['id'];
                    }
                }
            }
            // console.log(key, arr[i]['Info']['last_name']);
            // console.log(key, consts.displayMap[key], arr[i])
            // console.log(key, arr[i], arr)
            // console.log(typeof arr[i]['id']);
            result.push(consts.displayMap[key]
                .replace(/{{ID}}/, id)
                .replace(/{{COLUMN_NAME}}/, columnName)
                // .replace(/{{LAST_NAME}}/, key == 'Info' ? arr[i]['Info']['last_name'] : null)
                // .replace(/{{FIRST_NAME}}/, key == 'Info' ? arr[i]['Info']['first_name'] : null)
                .replace(/{{FULL_NAME}}/, key == 'Doctor' ? [arr[i]['Info']['first_name'], arr[i]['Info']['last_name']].join(' ') : '{{FULL_NAME}}')
                .replace(/{{FULL_NAME}}/, key == 'Patient' ? [arr[i]['Info']['first_name'], arr[i]['Info']['last_name']].join(' ') : '{{FULL_NAME}}')
                .replace(/{{WARD_NAME}}/, key == 'Ward' ? arr[i]['name'] : '{{WARD_NAME}}')
                .replace(/{{WARD_NAME}}/, key == 'name' && modelName == 'Ward' ? data['name'] : '{{WARD_NAME}}')
                .replace(/{{FULL_NAME}}/, key == 'Consultations' ? data['full_name'] : '{{FULL_NAME}}')
                .replace(/{{CHECKED_OUT}}/, key == 'checked_out' ? data['checked_out'] : '{{CHECKED_OUT}}')
            );
            // console.log(consts.displayMap[key], result)
        }
        return Helper.unknownIfEmpty(result.join(','));
    }

    // Returns html for options eg: (edit, delete) based on page
    static getOptions(data, key, modelName, isBody) {
        const consts = Helper.consts;
        let resultHtml = '';
        if (isBody == false) {
            if (typeof consts.optionMap[modelName] !== 'undefined')
                resultHtml += '<th>Options</th>';
        }
        else {
            if (typeof consts.optionMap[modelName] !== 'undefined') {
                resultHtml += '<td>';
                if (consts.optionMap[modelName].includes('edit'))
                    resultHtml += `<a href="/${modelName.toLowerCase()}s/edit/${data[key].id}"
                        class="btn btn-info btn-xs ml-1" role="button">Edit</a>`;
                if (consts.optionMap[modelName].includes('delete'))
                    resultHtml += `<a href="/${modelName.toLowerCase()}s/delete/${data[key].id}"
                                class="btn btn-danger btn-xs ml-1" role="button">Delete</a>`;
                if (consts.optionMap[modelName].includes('checked_out') && !data[key].checked_out)
                    resultHtml += `<a href="/checkout/${data[key].id}"
                                        class="btn btn-primary btn-xs ml-1" role="button">Checkout</a>`;
                resultHtml += '</td>';
            }
        }
        return resultHtml;
    }

    // Returns html for display items eg: (first name, last name) based on page
    static getDisplayItems(data, key, modelName, isBody) {
        // console.log(data[key])
        let resultHtml = '';
        if (!isBody) {
            if (!Helper.isHidden(data, key)) {
                resultHtml += `<th>${Helper.processTitles(key)}</th>`;
            }
        }
        else {
            if (!Helper.isHidden(data, key)) {
                resultHtml += `<td>${Helper.formatDisplay(data, key, modelName)}</td>`
            }
        }
        // console.log(resultHtml);
        return resultHtml;
    }
}

// <%- helper.getDisplayItems(data[0], key, modelName, false) %>
// <%- helper.getDisplayItems(data[i], key, modelName, true) %>
module.exports = Helper;