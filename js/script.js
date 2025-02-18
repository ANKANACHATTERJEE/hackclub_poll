const { createClient } = supabase;

const _supabase = createClient(config.SUPABASE_URL, config.API_KEY);

async function insert() {
  const { data, error } = await _supabase.from("participants").insert([
    { name: "aadityaa", reg_no: "21BCE1964", insta_id: "._aadi2606._" },
    { name: "jack", reg_no: "21BCE1504", insta_id: "jack@19" },
  ]);
}

let buttons = document.getElementsByClassName("vote-btn");

async function dispData(nameList, instaList, regNoList) {
  const divs = document.getElementsByClassName("detail");
  for (var i = 0; i < nameList.length; i++) {
    const name = document.createElement("p");
    const reg_no = document.createElement("p");
    const insta_id = document.createElement("p");
    const name_content = document.createTextNode(nameList[i]);
    const reg_no_content = document.createTextNode(regNoList[i]);
    const insta_id_content = document.createTextNode(instaList[i]);
    name.appendChild(name_content);
    reg_no.appendChild(reg_no_content);
    insta_id.appendChild(insta_id_content);
    name.className = "participant-name";
    reg_no.className = "participant-reg-no";
    insta_id.className = "insta-id";
    divs[i].appendChild(name);
    divs[i].appendChild(reg_no);
    divs[i].appendChild(insta_id);
    buttons[i].setAttribute("data-regno", regNoList[i]);
  }
}

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    let regno = buttons[i].getAttribute("data-regno");
    let vote_status = buttons[i].getAttribute("data-voted");
    if (vote_status == 0) {
      update_votes(regno);
      buttons[i].setAttribute("data-voted", 1);
      buttons[i].textContent = "REMOVE VOTE";
    } else if (vote_status == 1) {
      remove_votes(regno);
      buttons[i].setAttribute("data-voted", 0);
      buttons[i].textContent = "VOTE";
    }
  });
}

async function remove_votes(reg_no) {
  const { data, error } = await _supabase.rpc("remove_vote", {
    quote_id: reg_no,
    increment_num: 1,
  });
}

async function update_votes(reg_no) {
  const { data, error } = await _supabase.rpc("vote", {
    quote_id: reg_no,
    increment_num: 1,
  });
}

async function getData() {
  const { data, error } = await _supabase.from("participants").select();
  console.log(data);
  var name = [];
  var insta_id = [];
  var reg_no = [];
  for (const ele in data) {
    name.push(data[ele]["name"]);
    insta_id.push(data[ele]["insta_id"]);
    reg_no.push(data[ele]["reg_no"]);
  }
  dispData(name, insta_id, reg_no);
}

getData();

async function displayImage() {
  const { data } = _supabase.storage.from("pictures").getPublicUrl("pics/2.jpg");
  for (const url in data) {
    console.log(data[url]);
    document.getElementById("img-1").src = data[url];
  }
  // const img = document.querySelector("img");
  // img.src = data
}

displayImage();

// console.log(_supabase);

// async function downloadPic() {
//   const { data, error } = await _supabase.storage
//     .from("public/pictures")
//     .download("pics/1.jpg");
//   console.log(data);
// }

// // document.createElement(img)

// function displayImage(src, width, height) {
//   var img = document.createElement("img");
//   img.src = src;
//   img.width = width;
//   img.height = height;
//   document.body.appendChild(img);
// }

// downloadPic();
// // displayImage()

// async function getDetailsOfBucket() {
//   const { data, error } = await _supabase.storage.from("pictures").list("pics");
//   console.log(data);
// }

// getDetailsOfBucket();
