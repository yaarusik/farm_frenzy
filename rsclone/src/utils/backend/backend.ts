import { ResponseSign } from "../../application/types";

export default class Backend {
  url: string;

  constructor(){
    this.url = 'https://farm-frenzy.herokuapp.com/';
  }

  public async login(name: string, password: string){
    const url = this.url + '?type=signin&name=' + name + '&password=' + password;
    
    let response : ResponseSign = {
      message: 'Что-то пошло не так'
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
}