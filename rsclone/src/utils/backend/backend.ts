import { LevelInfo, MapInfo, ResponseSign } from "../../application/types";
import { levelFinish } from "../gameData/mapData";
import { aside, Engineering, houses, Pets } from "../shopPageData";
import { setMoney, startMoney } from "../shopPageMoney";
import { userInfo } from "../userData";

export default class Backend {
  url: string;

  constructor(){
    this.url = 'https://farm-frenzy.herokuapp.com/';
  }

  public async login(name: string, password: string){
    const url = this.url + '?type=signin&name=' + name + '&password=' + password;
    
    let response : ResponseSign = {
      message: 'Что-то пошло не так',
      levelInfo: [],
      mapInfo: [],
      moneyInfo: '0'
    };

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors'
      }).then((res) => {console.log('Begin: ', res); return res.json()})
        .then((json : ResponseSign) => {console.log('Convert: ', json); response = json})
    } catch (e) {
      console.log('Request error: ', e);
    }

    return await response;
  }

  public async register(name: string, password: string){
    const url = this.url + '?type=signup&name=' + name + '&password=' + password;
    
    let response : ResponseSign = {
      message: 'Что-то пошло не так',
      levelInfo: [],
      mapInfo: [],
      moneyInfo: '0'
    };

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors'
      }).then((res) => {console.log('Begin: ', res); return res.json()})
        .then((json : ResponseSign) => {console.log('Convert: ', json); response = json})
    } catch (e) {
      console.log('Request error: ', e);
    }

    return await response;
  }

  public async put(name: string, password: string){
    let levelInfo: LevelInfo = [];
    for (const [key, value] of Object.entries(levelFinish))
      levelInfo.push({num: Number.parseInt(key), state: value});

    let mapInfo: MapInfo = [];
    for (const [key, value] of Object.entries(houses))
      mapInfo.push({categoryName: 'houses', name: key, stage: value.currentStage});
    for (const [key, value] of Object.entries(aside))
      mapInfo.push({categoryName: 'aside', name: key, stage: value.currentStage});
    for (const [key, value] of Object.entries(Engineering))
      mapInfo.push({categoryName: 'Engineering', name: key, stage: value.currentStage});
    for (const [key, value] of Object.entries(Pets))
      mapInfo.push({categoryName: 'Pets', name: key, stage: value.currentStage});

    let moneyInfo = startMoney;
      
    const url = this.url + '?type=put&name=' + name + '&password=' + password +  '&level=' + JSON.stringify(levelInfo) + '&map=' + JSON.stringify(mapInfo) + '&money=' + moneyInfo;
    console.log(levelInfo, mapInfo, url);
      
    let response : ResponseSign = {
      message: 'Что-то пошло не так',
      levelInfo: [],
      mapInfo: [],
      moneyInfo: '0'
    };

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors'
      }).then((res) => {console.log('Begin: ', res); return res.json()})
        .then((json : ResponseSign) => {console.log('Convert: ', json); response = json})
    } catch (e) {
      console.log('Request error: ', e);
    }

    return await response;
  }

  public updateUser(name: string, password: string){
    userInfo.name = name;
    userInfo.password = password;
    userInfo.logged = true;
  }

  public updateFrom(levelInfo: LevelInfo, mapInfo: MapInfo, moneyInfo: string){
    if (!userInfo.logged)
      return;
    levelInfo.forEach((item) => {levelFinish[item.num.toString()] = item.state});
    mapInfo.forEach((item) => {
      if (item.categoryName === 'houses')
        houses[item.name].currentStage = item.stage;
      if (item.categoryName === 'aside')
        aside[item.name].currentStage = item.stage;
      if (item.categoryName === 'Engineering')
        Engineering[item.name].currentStage = item.stage;
      if (item.categoryName === 'Pets')
        Pets[item.name].currentStage = item.stage;
    });

    if (typeof moneyInfo === 'string' && +moneyInfo >= 0)
      setMoney(moneyInfo);
  }
}