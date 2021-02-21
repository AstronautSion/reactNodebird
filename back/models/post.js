module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false, //필수
        },
    },{
        charset: 'utf8mb4', //한글+이모티콘
        collate: 'utf8mb4_general_ci',
    });

    Post.associate = (db) =>{
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
    };
    return Post;
};