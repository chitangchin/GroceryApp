
const { pool } = require('../db_config');
const { USERNAME_REGEX, BAD_REQUEST, BAD_PASSWORD, BAD_USERNAME, FIND_ALL_USERS_BY_USERNAME, USERNAME_ALREADY_EXISTS, PASSWORD_REGEX, INSERT_INTO_USERS_USERNAME_AND_PASSWORD, CONFLICT, INTERNAL_SERVER_ERROR, UNEXPECTED_ERROR, REGISTRATION_SUCCESSFUL, TOKEN, USER_DOESNT_EXIST, NOT_FOUND, UNAUTHORIZED, INVALID_CREDENTIALS, NUMBER, ERROR_LOGGING_IN, CONTENT_TYPE, TEXT_PLAIN, SUCCESSFULLY_LOGGED_IN } = require('../constants');
const express = require('express');
const userRouter = express.Router();
const auth = require('../middleware/auth');
const { hashPassword } = require('../utils/hashPassword');
const UserService = require('../service/user.service');
const logger = require('pino')()

class UserController {
    async login(req, res) {
        const {
            username,
            password, 
        } = req.body;
        const userService = new UserService(pool, auth);
        try {
            const loginResponse = await userService.login(username, password);
            if(loginResponse.status == 200) {
                res.cookie(TOKEN, loginResponse.token, {
                    httpOnly: true,
                });
            }
            res.status(loginResponse.status).json(loginResponse.message);
        } catch (err) {
            console.error(err);
            res.status(INTERNAL_SERVER_ERROR).json(UNEXPECTED_ERROR);
        }
        
        
    }
    async register(req, res) {
            const {username, password} = req.body;
            const userService = new UserService(pool, auth);
            try {
                const registrationResponse = await userService.register(username, password);
                if(registrationResponse.status == 200) {
                    res.cookie(TOKEN, registrationResponse.token, {
                        httpOnly: true,
                    });
                }
                res.status(registrationResponse.status).end(registrationResponse.message);
            } 
            catch(err) {
                logger.error(err)
                res.statusCode = INTERNAL_SERVER_ERROR;
                res.end(UNEXPECTED_ERROR);   
            }
            
    }
}
module.exports = new UserController()