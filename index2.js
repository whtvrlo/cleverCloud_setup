const { Sequelize } = require("require");

const connection = new Sequelize("master32", "root", "password", {
    host: "localhost",
    dialect: "mysql",

});

const Test = connection.define("tests",
{
    name:{
        type: DataTypes.STRING
    }
})

const main = async() => {
    try {
        await connection.authenticate();
        console.log('Connection has been succesfully established')

    } catch(err) {
        console.error("unable to connect to database", err)
    }

    await connection.close();
    process.exit();

}

main()