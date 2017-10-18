export default {
    "auth/branch": {
        name: "branch",
        path: "auth/branch",
        prefix:"auth/branch",
        add: {
            key: "name"
        },
        remove: true,
        up: true,
        find: true,
        findByPage: true,
        like:["_id","name"]
    },
    "auth/department": {
        name: "department",
        path: "auth/department",
        prefix:"auth/department",
        add: {
            key: "name"
        },
        remove: true,
        up: true,
        find: true,
        findByPage: true,
        like:["_id","name"]
    },

    "auth/role": {
        name: "auth/role",
        path: "auth/role",
        prefix:"auth/role",
        add: {
            key: "name"
        },
        remove: true,
        up: true,
        find: true,
        findByPage: false,
        like:["_id","name"]
    },
    "auth/user": {
        name: "auth/user",
        path: "auth/user",
        prefix:"auth/user",
        add: false,
        remove: true,
        up: false,
        find: false,
        findByPage: false,
        like:["username","realName"]
    },
    "auth/userGroup": {
        name: "auth/userGroup",
        path: "auth/userGroup",
        prefix:"auth/userGroup",
        add: {
            key: "name"
        },
        remove: true,
        up: true,
        find: true,
        findByPage: true,
        like:["_id","name"]
    },
    "auth/dictionary": {
        name: "auth/dictionary",
        path: "auth/dictionary",
        prefix:"auth/dictionary",
        add: {
            key: ["name", "primarykey","value"]
        },
        remove: true,
        up: true,
        find: true,
        findByPage: true,
        like:["_id","name"]
    },
    "auth/product": {
        name: "auth/product",
        path: "auth/product",
        prefix:"auth/product",
        add: {
            key: ["name"]
        },
        remove: true,
        up: true,
        find: true,
        findByPage: true,
        like:["_id","name"]
    },
    "permission/permissions": {
        name: "permission/permissions",
        path: "permission/permissions",
        prefix:"permission/permissions",
        add: {
            key: "name"
        },
        remove: true,
        up: true,
        find: true,
        findByPage: true,
        like:["_id","name"]
    },
    "permission/todo": {
        name: "permission/todo",
        path: "permission/todo",
        prefix:"permission/todo",
        add: {
            key: "name"
        },
        remove: true,
        up: true,
        find: true,
        findByPage: true,
        like:["_id","name"]
    },
    "permission/menu": {
        name: "permission/menu",
        path: "permission/menu",
        prefix:"permission/menu",
        add: {
            key: "name"
        },
        remove: true,
        up: true,
        find: false,
        findByPage: true,
        like:["_id","name"]
    },
    "modular/modular": {
        name: "modular",
        path: "modular/modular",
        prefix:"modular/modular",
        add: {
            key: "name"
        },
        remove: true,
        up: true,
        find: true,
        findByPage: true,
        like:["_id","name"]
    },
    "modular/gateway": {
        name: "modular/gateway",
        path: "modular/gateway",
        prefix:"modular/gateway",
        add: {
            key: "url"
        },
        remove: true,
        up: true,
        find: true,
        findByPage: true,
        like:["_id","name"]
    },
    "api/api": {
        name: "api/api",
        path: "api/api",
        prefix:"api/api",
        add: {
            key: ["url","method"]
        },
        remove: true,
        up: true,
        find: true,
        findByPage: true,
        like:["_id","description"]
    },
    "api/word": {
        name: "api/word",
        path: "api/word",
        prefix:"api/word",
        add: {
            key: ["url","method"]
        },
        remove: true,
        up: true,
        find: true,
        findByPage: true,
        like:["url", "method"]
    },
    
}