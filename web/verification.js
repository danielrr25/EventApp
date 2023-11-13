const { v4: uuidv4 } = require('uuid');

const gentoken = () => {
    const emailToken = uuidv4();
    return emailToken;
};

module.exports = {
    gentoken,
};
