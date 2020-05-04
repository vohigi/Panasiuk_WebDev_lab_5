function easyHTTP() {
  this.http = new XMLHttpRequest();
}

// Make an HTTP GET Request
easyHTTP.prototype.get = function(url) {
  return new Promise((resolve, reject) => {
    this.http.open("GET", url, true);
    let self = this;
    this.http.onload = () => {
      if (self.http.status === 200) {
        resolve(self.http.responseText);
      } else {
        reject("Error: " + self.http.status);
      }
    };
    this.http.onerror = () => {
      reject("Network Error");
    };
    this.http.send();
  });
};
