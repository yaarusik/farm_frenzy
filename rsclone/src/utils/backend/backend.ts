export default class Backend {
  url: string;

  constructor(){
    this.url = window.location.href + '/';
  }

  public async login(name: string, password: string){
    const responce = await fetch(this.url, {
      method: 'POST'
    });

    return await responce.json();
  }
}