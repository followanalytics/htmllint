var lodash = require('lodash'),
    DomUtils = require('htmlparser2').DomUtils;
var knife = require('../knife');

module.exports = {
    name: 'attr-req-value',
    description: 'If set, attribute values cannot be empty.'
};

module.exports.process = function (ele, opts) {
    var issues = [];
    if(!opts[this.name] || ele.type !== 'tag') {
        return [];
    }

    for(property in ele.attribs) {
       console.log('Property:' + property);
        if (ele.attribs[property] && ele.attribs[property].value === '') {
            console.log('working');
            //console.log('Property2:' + property);
            //just run this in this clause if you want "" to fail.
            //return issue(ele, "Attribute values cannot be empty.");

            var validateRaw = /^[a-zA-Z]+([ ]+[^ ]+[ ]*=[ ]*[^ ]+)*$/;
            if (!validateRaw.test(ele.open)) {
                console.log(ele.open);
                issues.push({
                    index: ele.index,
                    line: ele.openLineCol[0],
                    column: ele.openLineCol[1],
                    msg: 'Attribute values cannot be empty.'
                });
            }
        }
    }
    return issues;
};