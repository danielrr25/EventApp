const { v4: uuidv4 } = require('uuid');

const genemailtoken = () => {
    const emailToken = uuidv4();
    return emailToken;
};

module.exports = {
    genemailtoken,
};
