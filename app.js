fetch(
  "https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/uzb-alaaudeenmansou.json"
)
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
  });

fetch("https://api.quran.sutanlab.id/surah/1")
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
  });
