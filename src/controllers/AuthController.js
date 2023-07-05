const { registerValidation, loginValidation } = require('./validation/AuthValidation')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const RolePermission = require('../models/RolePermission')
const UserPermission = require('../models/UserPermission')
var jwt = require('jsonwebtoken');
const privateKey = "plokijuhygtfrdeswaqmnbvcxz"
exports.register = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.send({ data: error, message: "Please enter require field", code: 200 })

    } else {

        const getUser = await User.findOne({ where: { email: req.body.email } })
        if (getUser) {
            return res.send({ data: {}, message: "Email already exist", code: 200 })
        } else {
            let salt = await bcrypt.genSalt(10);

            const newUser = new User(req.body);
            newUser.password = await bcrypt.hash(newUser.password, salt)
            const user = await newUser.save();
            var userData = {};
            const token = jwt.sign({ id: user.id }, privateKey);

            userData = JSON.parse(JSON.stringify(user));
            userData.token = token;
            return res.send({ data: userData, message: "User created successfully", code: 200 })
        }
    }
}

exports.login = async (req, res) => {
    const { error } = loginValidation(req.body);

    if (error) {

        return res.send({ data: error, message: "Please enter require field", code: 200 })

    } else {

        const getUser = await User.findOne({ email: req.body.email })

        if (!getUser) {

            return res.send({ data: {}, message: "User Not Found", code: 200 })

        } else {

            const validPassword = await bcrypt.compare(req.body.password, getUser.password)

            if (validPassword) {
                const RolePermissionsData = await RolePermission.findAll({ where: { role_id: getUser.role_id } })
                const rolePermissionKeyObject = RolePermissionsData.reduce((acc, RolePermissionsData) => {
                    acc[RolePermissionsData.module_id] = RolePermissionsData.toJSON();
                    return acc;
                }, {});

                const userPermissionsData = await UserPermission.findAll({ where: { user_id: getUser.id } })
                const userPermissionKeyObject = userPermissionsData.reduce((acc, userPermissionsData) => {
                    acc[userPermissionsData.module_id] = userPermissionsData.toJSON();
                    return acc;
                }, {});

                const permissionObject = { ...RolePermissionsData };

                for (const key in userPermissionKeyObject) {
                    if (userPermissionKeyObject.hasOwnProperty(key)) {
                        permissionObject[key] = { ...rolePermissionKeyObject[key], ...userPermissionKeyObject[key] };
                    }
                }

                req.session.PermissionObject = permissionObject;
                req.session.UseName = "SHyam";
                console.log("login")

                console.log('req.session.PermissionObject',req.session.PermissionObject);
                console.log("-----------------")

                const token = jwt.sign({ id: getUser.id }, privateKey);
                return res.send({ data: { 'token': token }, message: "Successfully Logged In", code: 200 })

            } else {

                return res.send({ data: {}, message: "Please Enter Valid EMail and Password", code: 200 })

            }
        }
    }
}

exports.test = (req,res) => {
    console.log("Test")
    console.log('req.session.PermissionObject',req.session.PermissionObject);
    console.log('req.session.UseName',req.session.UseName);

}