export default class NationalityService {  
  static getNationality(name) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nationalize.io?name=${name}`;
      request.addEventListener("loadend", function() {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          resolve([response, name]);
        } else {
          reject([this, response, name]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}