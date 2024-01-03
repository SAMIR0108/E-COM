const { sequelizeCon, QueryTypes } = require("../init/dbconfig");
let security = require("../helper/security");

function auth(permission) {
  return async (req, res, next) => {
    let token = req.headers.token;
    if (typeof token != "string") {
      return res.status(401).send("not valid");
    }
    let decrypt = await security.decrypt(token, "<Its_?>").catch((error) => {
      return { error };
    });
    if (!decrypt || (decrypt && decrypt.error)) {
      return res
        .status(401)
        .send({ error: decrypt.error + "||" + "Unauthorized Access" });
      // return res.status(401).send("Unauthorized Access");
    }
    let Query = `select user.id,user.username,p.name as permission
    from user
    left join userpermission as up
    on user.id=up.user_id
    left join permission as p
    on up.permission_id=p.id
    where user.id='${decrypt.id}' and token='${token}'`;
    // let Query = `SELECT user.id,user.username,p.name AS permission
    // FROM user
    // LEFT JOIN userpermission AS up
    // ON user.id = up.user_id
    // LEFT JOIN permission AS p
    // ON up.permission_id = p.id
    // WHERE user.id = '${decrypt.id}' AND token = '${token}'`;
    //QueryTypes ke bad jo bhi krna hai

    let user = await sequelizeCon
      .query(Query, { type: QueryTypes.SELECT })
      .catch((error) => {
        return { error };
      });
    if (!user || (user && user.error)) {
      console.log(user.error);
      return res.status(500).send(user.error);
    }

    let permissions = {};
    for (let i of user) {
      if (i.permission) {
        permissions[i.permission] = true;
      }
    }
    if (permissions.length <= 0 || !permissions[permission]) {
      console.log("permissions");
      return res.status(401).send("Unauthorized person");
    }
    req["userData"] = {
      username: user[0].username,
      id: user[0].id,
      permissions,
    };
    console.log(req.userData);
    next();
  };
}

module.exports = {
  auth,
};
