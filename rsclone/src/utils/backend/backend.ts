export default class Backend {
  url: string;

  constructor(){
    this.url = 'https://farm-frenzy.herokuapp.com/';
  }

  public async login(name: string, password: string){
    const url = this.url + '?type=signin&name=' + name + '&password=' + password;
    
    let response;
    try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors'
    }).then((res) => {return res.json()})
      .then((json) => {response = json})
    } catch (e) {
      console.log(e);
    }
    return await response;
  }
}