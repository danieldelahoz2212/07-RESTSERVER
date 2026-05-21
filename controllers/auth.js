const {response} = require("express");

const login = async (req, res = response) => {

    res.json({
        msg: "Login API - controller"
    });
};

module.exports = {
    login
}