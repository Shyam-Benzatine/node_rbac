const { registerValidation, loginValidation, addPostValidation, editPostValidation, deletePostValidation } = require('./validation/AuthValidation')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Post = require('../models/Post')
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
        const getUser = await User.findOne({ where: { email: req.body.email } })
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

                // const permissionObject = { ...RolePermissionsData };
                const permissionObject = rolePermissionKeyObject;
                // const permissionObjectKey = RolePermissionsData.reduce((acc, RolePermissionsData) => {
                //     acc[RolePermissionsData.module_id] = RolePermissionsData.toJSON();
                //     return acc;
                // }, {});
                for (const key in userPermissionKeyObject) {
                    if (userPermissionKeyObject.hasOwnProperty(key)) {
                        permissionObject[key] = { ...rolePermissionKeyObject[key], ...userPermissionKeyObject[key] };
                    }
                }
                req.session.PermissionObject = permissionObject;
                const token = jwt.sign({ id: getUser.id }, privateKey);
                return res.send({ data: { 'token': token }, message: "Successfully Logged In", code: 200 })

            } else {

                return res.send({ data: {}, message: "Please Enter Valid Email and Password", code: 200 })

            }
        }
    }
}

exports.addPost = async (req, res) => {
    const { error } = addPostValidation(req.body);

    if (error) {
        return res.send({ data: error, message: "Please enter require field", code: 200 })
    } else {
        var ins = {
            user_id: req.userData.id,
            post_title: req.body.post_title,
            post_image: req.file.filename,
            post_description: req.body.post_description,
            status: parseInt(req.body.status),
        }
        const newPost = new Post(ins);
        const post = await newPost.save();
        return res.send({ data: post, message: "Post add successfully", code: 200 })
    }
}

exports.editPost = async (req, res) => {
    const { error } = editPostValidation(req.body);

    if (error) {
        return res.send({ data: error, message: "Please enter require field", code: 200 })
    } else {
        if (req.file == undefined) {
            var upd = {
                post_title: req.body.post_title,
                post_description: req.body.post_description,
                status: parseInt(req.body.status),
            }
        } else {
            var upd = {
                post_title: req.body.post_title,
                post_image: req.file.filename,
                post_description: req.body.post_description,
                status: parseInt(req.body.status),
            }
        }
        await Post.update(upd, { where: { id: req.body.post_id } });
        return res.send({ message: "Post edit successfully", code: 200 })
    }
}

exports.deletePost = async (req, res) => {
    const { error } = deletePostValidation(req.body);

    if (error) {
        return res.send({ data: error, message: "Please enter require field", code: 200 })
    } else {
        await Post.destroy({ where: { id: req.body.post_id } });
        return res.send({ message: "Post delete successfully", code: 200 })
    }
}

exports.viewPost = async (req, res) => {
    if (req.userData.role_id == 3) {
        var where = { user_id: req.userData.id }
    } else {
        var where = {}
    }
    const getPost = await Post.findAll({ where: where })
    return res.send({ data: getPost, message: "Get post successfully", code: 200 })
}

exports.test = (req, res) => {
    console.log("Test")
    return res.send({ data: req.session.PermissionObject, message: "Successfully Logged In", code: 200 })
    // console.log('req.session.PermissionObject', req.session.PermissionObject);
}