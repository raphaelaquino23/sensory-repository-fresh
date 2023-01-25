
import { Post, PostInformation, PostCategory, PostStats } from './PostModel'

PostInformation.hasOne(Post, {
  onUpdate: 'CASCADE',
});

PostStats.hasOne(Post, {
  onUpdate: 'CASCADE',
});

PostCategory.hasOne(PostInformation, {
  onUpdate: 'CASCADE',
});

Post.belongsTo(PostInformation, { foreignKey: "PostInformation_Id"});
Post.belongsTo(PostStats, { foreignKey: "PostStats_Id"});
PostInformation.belongsTo(PostCategory, { foreignKey: "PostCategory_Id"});

export { Post, PostInformation, PostCategory, PostStats};


