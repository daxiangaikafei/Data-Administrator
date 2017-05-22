interface EnvValue {
    development:Function,
    production:Function,
    release:Function
}


export const envChange = function(envObj:EnvValue){
    switch (process.env.NODE_ENV){
        case "development":
           return envObj.development&&envObj.development();
        case "production":
           return envObj.production&&envObj.production();
        case "release":
          return  envObj.release&&envObj.release();
        default :
          return undefined;
    }
}

