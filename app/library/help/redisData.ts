import redis from "./redis";
import * as _ from "lodash";
/**
 * create by tp
 * data : 2017年06月28日
 * for  : 存储和取出redis数据
 */
export default class RedisData {
    /**
     * 初始化类 需要传入redis key
     * @param key redis key
     */
    constructor(key) {
        this.key = key;
    }
    private key : string;
    private async saveData(data) {
        let baseData = await this.getDataAsync();
        let saveData = this.clone(baseData,data);
        return redis.set(this.key, JSON.stringify(data));
        // redis.expire(key,config.redis.expiration);
    }
    /**
     * 获取数据
     */
    async getDataAsync() {
        let result = JSON.parse(await redis.get(this.key))||{};
        return result;
    }
    /**
     * 根据字符串设定数据
     * @param props "name.xx.sss" 
     * @param value any {name:{xxx:{ss}}}
     */
    async setProps(props = "name.sss.xx", value : any) {
        let tempArray = props.split(".");
        let newMap : any = {},
            temp,
            length = tempArray.length;

        for (let i = length - 1; i >= 0; i--) {
            temp = tempArray[i];
            newMap = (i === length - 1)
                ? value
                : newMap;
            newMap = Object.assign({}, {[temp]: newMap});
        }
        return this.saveData(newMap);

    }
    /**
     * 根据data设定数据
     * @param data 
     */
    async setData(data){
        return this.saveData(data);
    }
    /**
     * 数据复制
     * @param baseMap 
     * @param newMap 
     */
    private clone(baseMap, newMap) {
        let tempMap = {},
            temp;
        if (!_.isObject(baseMap)) {
            return newMap;
        }
        if (!_.isObject(newMap)) {
            return baseMap;
        }
        for (let key in newMap) {
            if (baseMap[key]) {
                temp = this.clone(baseMap[key], newMap[key]);
                tempMap[key] = temp;
            } else {
                tempMap[key] = newMap[key];
            }

        }
        return Object.assign({}, baseMap, tempMap);
    }
}
