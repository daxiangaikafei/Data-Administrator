import * as path from "path";
import redis from './../help/redis';


const env = process.env.NODE_ENV || 'development';
const configName = "localConfig"

class Config{
    constructor(){

    }
    error:any;
    routes:{
        qbii: RouterConfig;
        good: RouterConfig;
        sys: RouterConfig;
        weixin: RouterConfig;
        item: RouterConfig;
    };
    ignoreUrls:any;
    redis:any;
    cookie:any;
    SSO:boolean;
    weixins:any;
    gateway:any;
    private config:LocalConfig;
    private configName = configName;
    public init = async () =>{
        let data:LocalConfig = await this.getRedisData()
        this.initConfig(data)
        console.log("config 数据初始化成功")
        this.IntervalUpdate(1000*60)
    }

    private initConfig = (redisConfig:LocalConfig)=>{
        this.config = redisConfig;
        this.error = redisConfig.error;
        this.routes = redisConfig.routes;
        this.ignoreUrls = redisConfig.ignoreUrls;
        this.redis = redisConfig.redis;
        this.cookie = redisConfig.cookie;
        this.SSO = redisConfig.SSO;
        this.weixins = redisConfig.weixins;
    }

    getRedisData = async ()=>{
        let data = await redis.get(this.configName)
        let result:LocalConfig
        if(data){
            result = JSON.parse(data);
        }
        return result
    }

    private update = async () =>{
        let result:LocalConfig = await this.getRedisData()
        return result
    }

    private IntervalUpdate = (times) => {
        setInterval(async ()=>{
            let data:LocalConfig = await this.update()
            this.initConfig(data)
            console.log("redis 配置文件已更新")
        }, times)
    }


    /**
     * 添加修改数据
     * @param routerName 
     * @param routerData 
     */
    setRouterData = async (routerName, routerData:RouterConfig) => {
        let result:LocalConfig = await this.getRedisData()
        if(result){
            result.routes[routerName] = routerData
            redis.set(this.configName, result)
            this.initConfig(result)
        }
    }
}

let c  = new Config()

export default c;
