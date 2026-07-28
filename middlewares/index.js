const validateJWT = require("./validate_jwt");
const validateRoles = require("./validate_roles");
const hasRole = require("./validate_roles");
const validatedFields = require("./validate_fields");
const validateFiles = require("./files");

module.exports = {
  ...validateJWT,
  ...validateRoles,
  ...hasRole,
  ...validatedFields,
  ...validateFiles,
};
