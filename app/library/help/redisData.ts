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
    private forNum:number = 0;//props循环次数
    private replace:boolean = false;//是否强制替换所有
    private async saveData(data) {
        let baseData = await this.getDataAsync();
        let saveData = this.clone(baseData,data);
        // console.info("最终数据为")
        // console.log(saveData);
        return redis.set(this.key, JSON.stringify(saveData));
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
    async setProps(props = "name.sss.xx", value : any,isReplace=false) {
        let tempArray = props.split(".");
        this.forNum = tempArray.length;
        this.replace = isReplace;
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
    private clone(baseMap, newMap,isReplace = false) {
        let tempMap = {},
            temp,willRepacle = true;
        if (!_.isObject(baseMap)) {
            return newMap;
        }
        if (!_.isObject(newMap)) {
            return baseMap;
        }
        this.forNum --;
        for (let key in newMap) {
            if (baseMap[key]) {
                if(this.replace===true&&this.forNum===0){
                    tempMap = newMap;
                    break;
                }
                temp = this.clone(baseMap[key], newMap[key]);
                tempMap[key] = temp;
                willRepacle = false;
            } else {
                tempMap[key] = newMap[key];
            }

        }
        
        // if(willRepacle===true&&this.replace===true&&this.forNum){
        //     tempMap = newMap;
        // }
        return Object.assign({}, baseMap, tempMap);
    }
}


// function formate(num){
//     let date = new Date(num);
//     return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()
//     +" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
// }