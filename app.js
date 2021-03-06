const suralarNomlari = document.querySelector(".suralar__umum");
const oyatlarMain = document.querySelector(".right__side--main");
const suraNomi = document.querySelector(".arab__name--title");
const gif = document.querySelector(".load-gif");
const openLeftSide = document.querySelector(".response")

let arrayBig = [];

async function getFetchs() {
  let jsonData = await fetch("https://api.quran.sutanlab.id/surah");
  let datas = await jsonData.json();
  let dataNames = datas.data;
  console.log(dataNames);
  dataNames.forEach((element) => {
    renderHtml(element);
  });
}

function sortSura(array) {
  let arr = [];
  let a = 1;
  for (let i = 0; i < array.length; i++) {
    if (array[i].chapter === a) {
      arr.push(array[i]);
    } else if (array[i].chapter !== a) {
      a++;
      arrayBig.push(arr);
      i--;
      arr = [];
    }
  }
  arrayBig.push(arr);
}

function renderHtml(obj) {
  let html = `<div class="sura" id="${obj.number}">
  <div class="left__site--sura">
    <h3 class="name__sura">
      <span class="${obj.number}">${obj.number}.</span> ${obj.name.transliteration.id}
    </h3>
    <h4 class="oyatlar">${obj.revelation.id}, ${obj.numberOfVerses} oyatdan iborat</h4>
  </div>
  <div class="right__site--sura">
    <h3 class="arab__name">${obj.name.long}</h3>
  </div>
</div>`;
  suralarNomlari.insertAdjacentHTML("beforeend", html);
}

function oyatlarRenderHtml(obj, objUzb) {
  let html = `<div class="main__cart">
  <h3 class="oyat__tartib-raqam"><span>${obj.number.inSurah}.</span>Oят</h3>
  <h4 class="heading__cart">Arab</h4>
  <h1 class="arab__oyat">${obj.text.arab}</h1>
  <h4 class="heading__cart">English</h4>
  <h1 class="english__oyat">
    ${obj.translation.en}
  </h1>
  <h4 class="heading__cart">Uzbek</h4>
  <h1 class="uzbek__oyat">
    ${objUzb.text}
  </h1>
  <h4 class="heading__cart">Audio</h4>
  <audio controls>
    <source
      src="${obj.audio.primary}"
      type="audio/mpeg"
    />
    <source
      src="${obj.audio.primary}"
      type="audio/ogg"
    />
    <p>Ваш браузер не поддерживает HTML5 аудио. Вот взамен</p>
  </audio>
</div>`;
  oyatlarMain.insertAdjacentHTML("beforeend", html);
}
function clickOnSura() {
  suralarNomlari.addEventListener("click", function (e) {
    async function fetchOyatlar(number) {
      let dataJson = await fetch(
        `https://api.quran.sutanlab.id/surah/${number}`
      );
      let data = await dataJson.json();
      let datas = data.data;
      let dataVerses = data.data.verses;
      let dataUzbekcha = await fetch(
        "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/uzb-alaaudeenmansou.json"
      );
      let dataUZbek = await dataUzbekcha.json();
      let quran = dataUZbek.quran;
      sortSura(quran);
      for (let i = 0; i < dataVerses.length; i++) {
        oyatlarRenderHtml(dataVerses[i], arrayBig[number][i]);
      }
      console.log(arrayBig);
    }

    if (e.target.closest(".sura")) {
      oyatlarMain.innerHTML = "";
      const suralar = document.querySelectorAll(".sura");
      let suraNumber = e.target.closest(".sura").id;
      suralar.forEach((element) => {
        element.classList.remove("bg--color");
      });
      e.target.closest(".sura").classList.add("bg--color");
      fetchOyatlar(suraNumber);
    }
    if(document.querySelector('.left__side').classList.contains('transform')){
      document.querySelector('.left__side').classList.remove('transform')
    }
  });
}

openLeftSide.addEventListener('click',function(e){
  let left = document.querySelector('.left__side');
  left.classList.toggle('transform')
})

getFetchs();
clickOnSura();
