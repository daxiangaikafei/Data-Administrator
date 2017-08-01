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
        findByPage: true
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
        findByPage: true
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
        findByPage: false
    },
    "auth/user": {
        name: "auth/user",
        path: "auth/user",
        prefix:"auth/user",
        add: false,
        remove: true,
        up: false,
        find: false,
        findByPage: false
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
        findByPage: true
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
        findByPage: true
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
        findByPage: true
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
        findByPage: true
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
        findByPage: true
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
        findByPage: true
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
        findByPage: true
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
        findByPage: true
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
        findByPage: true
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
        findByPage: true
    },
    
}