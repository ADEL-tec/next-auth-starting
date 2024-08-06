import Role from "./Role";
import User from "./User";

Role.hasMany(User);
User.belongsTo(Role);

export { Role, User };
