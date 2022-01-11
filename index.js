require ('dotenv').config();
const {Sequelize, DataTypes, Op} = require('sequelize');
const connection = new Sequelize (process.env.CC_DB);



// const test = async () => {
//     try {
//         await connection.authenticate();
//         await Test.sync({alter: true})
//         await Test.create({name: "bob"});


//     } catch (err) {
//         console.log(err);
//     }
// }

// // test();

const Card = connection.define("Card", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    indexed: [{unique: true, fields: ["name"]}] // constraint called unique. Only one of each name in the table. Only one record that matches a certain name
});



const main = async() => {
    try {
        await connection.authenticate();
        await Card.sync({alter: true}); // module communicates with db / in sync.. Similar to create table card. 
        // BUILD: Create and save in 2 steps
        const stuffy_doll = Card.build({
            name: "Stuffy Doll",
            cost: 5,
            description: "Indestructibleeeeeeeee. "
        
        });
         await stuffy_doll.save(); // commits the record

                // create then save in 1 step; 
        await Card.create({
            name: "Meteor GOLEM",
            cost: 7,
            description: "Another indestructible"
        });
        

        // SELECT name, description FROM cards WHERE name = "Stuffy Doll" OR cost = 7;
        const results = await Card.findAll({
            attributes: ["name", "description"], // names of columns in the table = attribute
            where: { // acts like a filter
                [Op.or]: [ // rich comparison operators
                    {name: "Stuffy Doll"},
                    {cost: 7}
                ]
            }
        });

        for(let card of results) { // SELECT * FROM cards WHERE name = "Stuffy Doll"
            console.log(`Card: ${card.name} -> ${card.description}`);
        }


        //update method
        await Card.update({name: "Precursor Golem"}, {
            where: {
                name: "Meteor GOLEM"
            }
        });

        for(let card of await Card.findAll()) {
            console.log(`Card: ${card.name} -> ${card.description}`)
        }
        // // destroy function
        // await Card.destroy({
        //     where: {
        //         [Op.or]: [
        //             {name: "Stuffy Doll"},
        //             {name: "Precursor Golem"}
        //         ]
        //     }
        // })
    

    } catch(err) {
        console.error("unable to connect to database", err)
    }

    await connection.close();
    process.exit();

}

main()

//______________________________________________________________________

