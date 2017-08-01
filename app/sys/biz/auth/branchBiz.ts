
import Result from "./../../../library/help/result";
import DB from "./../../model/index";

const db = new DB("auth/branch");

import {each} from "lodash";




export const getAll = function() {

     return db.getModel().find();
}