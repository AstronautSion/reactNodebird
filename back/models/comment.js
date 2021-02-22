module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false, //필수
        },
    },{
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });

    Comment.associate = (db) =>{
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    };
    return Comment;
};