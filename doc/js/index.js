//  http://localhost:3000/transactions
// http://localhost:3000/transactions?transactionid_like=123

//----------------------------------------------------------------SELECT FOR SEARCH BOX:
const tableSearch = document.querySelector(".table__search");

//---------------------------------------------------------------SELECT FOR CREATE HTML:
const tableBody = document.querySelector(".table__body");

//----------------------------------------------------------------SELECT FOR SORT PRICE:
const tablePrice = document.querySelector(".table__price");

//-----------------------------------------------------------------SELECT FOR SORT DATE:
const tableDate = document.querySelector(".table__date");

//------------------------------------------------SELECT TD FOR CHANGE COLOR TEXT IN TD:


//----------------------------------------------------------------------GLOBAL VARIABLE:
let filters = {
  refIds: "",
};
let transactionPrice =[];
let allTransaction =[];
//------------------EVENT FOR GET ALL TRANSACTION FOR FIRST TIME LOADED(first function):
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/transactions")
    .then((response) => {
      // allTransaction = response.data;

      //render transaction on Dom:
     
      renderTransaction(response.data , filters)
    })
    .catch((error) => {
      console.log(error);
    });

});

//----------------------------FUNCTION FOR RENDER TRANSACTION:(FILTER)=>(second function)
function renderTransaction(transaction, _filters) {
  const filterTransaction = transaction.filter((trans) => {
    if (!_filters.refIds) return true; // اگر نوار جستجو خالی بود همه تراکنش ها رو نشون بده
    return String(trans.refId).includes(_filters.refIds);
  });
  tableBody.innerHTML = "";
  console.log(filterTransaction);

  //render to dom:
  filterTransaction.forEach((transaction) => {
    //creat
    //content
    //append to transaction
    const transactionTr = document.createElement("tr");
    transactionTr.classList.add("table__tr");
    transactionTr.innerHTML = `
                <td class="row__id">${new Intl.NumberFormat("fa-IR").format(
                  Number(transaction.id)
                )}</td>
                <td class="table__status">${transaction.type}</td>
                <td>${new Intl.NumberFormat("fa-IR").format(
                  Number(transaction.price)
                )}</td>
                <td>${new Intl.NumberFormat("fa-IR").format(
                  Number(transaction.refId)
                )}</td>
                <td>${new Date(transaction.date).toLocaleDateString(
                  "fa-IR"
                )}</td>
                <td>${new Date(transaction.date).toLocaleDateString("fa-IR", {
                  weekday: "short",
                })}</td>
                <td>${new Date(transaction.date).toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}</td>
    `;
    //for change color in td:
    const statusColor = transactionTr.querySelector(".table__status")
       setTextColor(statusColor,transaction.type);  
    //append:           
    tableBody.appendChild(transactionTr);
  });
}

//----------------------------------------------EVENT FOR INPUT(SEARCH)=>(third function):
tableSearch.addEventListener("input", (e) => {
  filters.refIds = e.target.value.trim();

  const app = filters.refIds
    ? `http://localhost:3000/transactions?refId_like=${filters.refIds}`
    : "http://localhost:3000/transactions";

  axios
    .get(app)
    .then((response) => {
      renderTransaction(response.data, filters);
    })
    .catch((error) => {
      console.log(error);
    });
});

//----------------------------------------------------------------- EVENT FOR SORT PRICE:
let currentSort = "asc";

tablePrice.addEventListener("click",()=>{
   currentSort = currentSort === "asc" ? "desc" : "asc";
  sortPrice(currentSort);

  const icon = tablePrice.querySelector("i");
  if(icon){
    icon.classList.toggle("chevron-up");
  }
});


//----------------------------------------------------------------FUNCTION FOR SORT PRICE:
function sortPrice( sort = "asc") {

  const appSort = `http://localhost:3000/transactions?_sort=price&_order=${sort}`;

  axios
  .get(appSort)
  .then((response) => {
    console.log(response.data);
      renderTransaction(response.data, filters);
  })
  .catch((error) => {
    console.log(error);
  });
}

//---------------------------------------------------------------------EVENT FOR SORT DATE:
let currentSortDate = "asc";

tableDate.addEventListener("click",()=>{
 currentSortDate = currentSortDate==="asc"?"desc":"asc";
  sortDate(currentSortDate);

  const icon = tableDate.querySelector("i");
  if(icon){
    icon.classList.toggle("chevron-up");
  }
  
});
//----------------------------------------------------------------FUNCTION FOR SORT DATE:
function sortDate(sort = "asc"){

  const appSortDate = `http://localhost:3000/transactions?_sort=date&_order=${sort}`;

  axios
  .get(appSortDate)
  .then((response)=>{
    console.log(response.data);
    renderTransaction(response.data, filters);
  })
  .catch((error)=>{
    console.log(error);
    
  })
}

//-------------------------------------------------------------- CHANGE COLOR TEXT IN TD:

function setTextColor(tdTag, text){
  tdTag.textContent = text;
  if(text.includes("برداشت از حساب")){
    tdTag.style.color = "var(--color-success)";
  }
  else if(text.includes("افزایش اعتبار")){
    tdTag.style.color = "var(--color-red-800)";
  }
}
