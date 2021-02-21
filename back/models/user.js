module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false, //필수
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true, //고유값
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },{
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    User.associate = (db) =>{
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
    };

    return User;
};