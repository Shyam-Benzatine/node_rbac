const privateKey = "plokijuhygtfrdeswaqmnbvcxz";
const User = require('../models/User')
const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    if (req.headers["authorization"]) {
        let token = req.headers["authorization"];
        token = token.split(" ");
        token = token[1];

        jwt.verify(token, privateKey, async (err, verifyUser) => {
            if (err) {
                return res.status(400).json({ data: {}, message: "unothorize user", ResponseCode: 400 });
            } else {
                const userData = await User.findOne({ where: { id: verifyUser.id } });
                if (!userData) {
                    return res
                        .status(400)
                        .json({ data: {}, message: "unothorize user", ResponseCode: 400 });
                }

                req.token = token;
                req.userData = userData;
                next();
            }
        })
    } else {
        return res.status(400).json({ data: {}, message: "unothorize user", ResponseCode: 400 });
    }
};

exports.checkDeletePermition = async (req, res, next) => {
    var PermissionObject = req.session.PermissionObject;
    if (PermissionObject[1].delete == false) {
        return res
            .status(401)
            .json({ data: {}, message: "access denied", ResponseCode: 401 });
    } else {
        next();
    }
};

exports.checkAddPermition = async (req, res, next) => {
    var PermissionObject = req.session.PermissionObject;
    if (PermissionObject[1].create == false) {
        return res
            .status(401)
            .json({ data: {}, message: "access denied", ResponseCode: 401 });
    } else {
        next();
    }
};

exports.checkEditPermition = async (req, res, next) => {
    var PermissionObject = req.session.PermissionObject;
    if (PermissionObject[1].create == false) {
        return res
            .status(401)
            .json({ data: {}, message: "access denied", ResponseCode: 401 });
    } else {
        next();
    }
};

exports.checkViewPermition = async (req, res, next) => {
    var PermissionObject = req.session.PermissionObject;
    if (PermissionObject[1].view == false) {
        return res
            .status(401)
            .json({ data: {}, message: "access denied", ResponseCode: 401 });
    } else {
        next();
    }
};
