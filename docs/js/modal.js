//select:
const buttonLoading = document.querySelector(".container__button");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const tableCloseBtn = document.querySelector(".table__closeBtn")

const darkMood = document.querySelector(".dark__mood");


//event:
buttonLoading.addEventListener("click",showModal);
backdrop.addEventListener("click", closeModal);
tableCloseBtn.addEventListener("click", closeModal);

darkMood.addEventListener("click",myFunction);
darkMood.addEventListener("click",switchBtn);

//function:
function showModal(){
  backdrop.classList.remove("hidden");
  modal.classList.remove("hidden");
}

function closeModal(){
  console.log("close");
  
  backdrop.classList.add("hidden");
  modal.classList.add("hidden");
}


//dark mood
function myFunction() {
   const element = document.querySelector(".modal");
   element.classList.toggle("dark");
}

function switchBtn(){
  const darkMoodInner = document.querySelector(".dark__mood--inner");
  darkMoodInner.classList.toggle("switch");
}


