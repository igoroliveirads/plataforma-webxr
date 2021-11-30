export class HttpService {
get(url) {
    console.log("url");
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(xhr.responseText);
          } else {
            reject(xhr.responseText);
          }
        }
      };
      xhr.send();
    });
  }

    post(url, data) {
        return fetch(url, {
            headers: { 'Content-Type': 'application/json'},
            method: 'post',
            body: JSON.stringify(data),
        });
    }
}