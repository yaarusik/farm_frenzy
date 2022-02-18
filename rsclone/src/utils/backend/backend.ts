export default class Backend {
  url: string;

  constructor(){
    this.url = 'https://farm-frenzy.herokuapp.com/';
  }

  public async login(name: string, password: string){
    const url = this.url + '?type=signin&name=' + name + '&password=' + password;
    
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors'
    });

    return await response;
  }
}