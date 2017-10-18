import DB from "./../../model/index";

const db = new DB("permission/todo");

import Error from "./../../../library/help/error";
const error = new Error("roleBiz");

import {getPermissions} from "./permissionsBiz";

export const getTodos = function (userId) {
      return getPermissions(userId).then((permissions) => {
            return db.find({
                  permissions: {
                        "$in": permissions
                  },
                  isDel: 0
            }).then((todos) => {
                  return todos;
            }).catch((err) => {
                  throw error.set(1, err.message);
            });
      })
}
