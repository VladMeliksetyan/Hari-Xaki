/**
 * Helper function to create response object
 *
 * @param {object} [response={}] response object
 * @param {number} [response.code = 200] response code
 * @param {string} [response.message="OK"] response message
 *
 * @returns {Object}
 */
const createResponse = ({ code = 200, message = "Ok", ...args } = {}) => {
    return { code, message, ...args };
  };
  
  module.exports = createResponse;
  