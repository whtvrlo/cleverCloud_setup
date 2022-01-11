require ('dotenv').config();
const {Sequelize, DataTypes} = require('sequelize');

const connection = new Sequelize (process.env.CC_DB);

const Test = connection.define("tests",
{
    name:{
        type: DataTypes.STRING
    }
})

const test = async () => {
    try {
        await connection.authenticate();
        await Test.sync({alter: true})
        await Test.create({name: "bob"});


    } catch (err) {
        console.log(err);
    }
}

test();