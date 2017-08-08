
import DB from "./../../model/index";

const db = new DB("auth/branch");

import {each} from "lodash";

import Error from "./../../../library/help/error";
const error = new Error("roleBiz");


export const getAll = function() {

     return db.getModel().find();
}