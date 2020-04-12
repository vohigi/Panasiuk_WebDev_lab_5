(()=>{
  const http = new easyHTTP();
  let imageList = [];
  const container = document.querySelector(".container");
  const loader = document.getElementById("loader");
  const overlay = document.getElementById("overlay");
  const body = document.querySelector("body");
  window.onbeforeunload = function() {
    window.scrollTo(0, 0);
  };
  const toMatrix = (arr, width) =>
    arr.reduce(
      (rows, key, index) =>
        (index % width == 0
          ? rows.push([key.picture.large])
          : rows[rows.length - 1].push(key.picture.large)) && rows,
      []
    );
  disableScroll();
  body.classList.toggle(".disable-scroll");
  function noscroll() {
    window.scrollTo(0, 0);
  }

  // add listener to disable scroll

  // Remove listener to disable scroll

  http
    .get("https://randomuser.me/api/?results=50")
    .then(res => {
      const json = JSON.parse(res);
      imageList = toMatrix(json.results, 5);
      // json.results.forEach(element => {
      //   imageList.push(element.picture.medium);
      // });
      loader.style.display = "none";
      overlay.style.display = "none";
      enableScroll();
      body.classList.toggle(".disable-scroll");
      imageList.forEach(element => {
        createRow(element, container);
      });
      console.log(imageList);
    })
    .catch(err => {
      console.log(err);
    });

  document.addEventListener("scroll", () => {
    if (
      document.documentElement.scrollTop + window.innerHeight ==
      document.documentElement.scrollHeight
    ) {
      disableScroll();
      loader.style.display = "block";
      overlay.style.display = "block";
      http
        .get("https://randomuser.me/api/?results=25")
        .then(res => {
          let i = imageList.length;
          const json = JSON.parse(res);
          const array = toMatrix(json.results, 5);
          // const arrConcat = imageList.concat(array);
          imageList = imageList.concat(array);
          console.log(imageList);
          loader.style.display = "none";
          overlay.style.display = "none";
          enableScroll();
          for (i < imageList.length; i++; ) {
            createRow(imageList[i], container);
          }
        })
        .catch(err => {});
    }
  });
  function createRow(arr, container) {
    const row = document.createElement("div");
    row.className = "row";
    arr.forEach(element => {
      const img = document.createElement("img");
      img.setAttribute("src", element);
      img.className = "picture";
      row.appendChild(img);
    });
    container.appendChild(row);
  }

  const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault) e.preventDefault();
    e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  function disableScroll() {
    window.onwheel = preventDefault; // modern standard
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
  }

  function enableScroll() {
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
  }
})();