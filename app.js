let allFetchData = [];
const loadData = () => {
  document.getElementById('spinner').classList.remove('d-none')
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showLoadData(data.data.tools.slice(0, 6));
    });
};

//load all data
let fetchAllData = [];
const loadAllData = async () => {

  document.getElementById('spinner').classList.remove('d-none')
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  showLoadData(data.data.tools);
  fetchAllData=data.data.tools;
  // hide show all button when load all data
  document.getElementById("btn-show-all").classList.add("d-none");
};


document.getElementById("btn-show-all").addEventListener("click", function () {
  document.getElementById("card-container").innerHTML = "";
  loadAllData();
});

const showLoadData = (allData) => {
  //   console.log(allData);
  document.getElementById('spinner').classList.add('d-none')
  const cardContainer = document.getElementById("card-container");

  allData.forEach((data) => {
    const { image, name, features, published_in,id } = data;
    allFetchData.push(data);
    //   console.log(image);
    cardContainer.innerHTML += `
    
                <div class="col">
                  <div class="card h-100 p-3">
                    <img src="${image}" class="card-img-top " height="200px" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Features</h5>
                        <ol>   
                        ${
                          features
                            ? features
                                .map((feature) => {
                                  return `<li>${feature}</li>`;
                                })
                                .join("")
                            : "No Data"
                        }
                        <ol>                
                    </div>
                    <div class="card-footer">
                    <h4 class="card-title mb-4">${name}</h4>
                        <div class="d-flex justify-content-between align-items-center">
                            <div><i class="fa-regular fa-calendar-days fa-lg me-2"></i><span>${published_in}</span></div>
                            <i onclick="loadSingleData('${id}')" class="fa-solid fa-arrow-right fa-lg text-danger" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                        </div>
                    </div>
                  </div>
                </div>
    
    `;
    document.getElementById("btn-show-all").classList.remove("d-none");
  });
};
// fetch single data 
const loadSingleData = (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showModalData(data.data);
      // console.log(data);
    });
};

const showModalData = (data) =>{
 const modalContainer =  document.getElementById('modal-container')
 modalContainer.innerHTML='';
 const {description,pricing,features,integrations,image_link,input_output_examples,accuracy} = data;
 modalContainer.innerHTML = `

          
          <div class="d-md-flex gap-3 mx-md-5 mx-2 mt-4 mb-5">
          <div class="col-md-6 border border-danger p-md-4 p-2 rounded ">
            <h4>${description}</h4>
            <div class="d-flex justify-content-between my-4 gap-2">
              ${pricing ? pricing.map(element =>{
                return `<p>${element.price} ${element.plan}</p>`; 
              }).join(''):Array(3).fill("<p>Free of cost</p>").join('')}
              <p></p>
              <p></p>
            </div>
            <div class="d-flex justify-content-between ">
              <div class="col-md-8">
                <h4>Features</h4>
                <ul>
                ${Object.keys(features).map(key => {
                  const feature = features[key];
                  const featureName = feature.feature_name ? feature.feature_name : "No feature name provided";
                  return `<li>${featureName}</li>`;
                }).join('')}
                </ul>
              </div>
              <div class="col-md-4">
                <h4>Integrations</h4>
                <ul>
                ${integrations ? integrations.map(element =>{
                  return `<li>${element}</li>`; 
                }).join(''):"No Data Found"}
                  
                </ul>
              </div>
            </div>
          </div>
          
          <div class="col-md-6 p-3">
            <div class="position-relative d-flex justify-content-end">
            <p class="accuracy px-2 bg-danger rounded me-0 text-white  position-absolute me-2 mt-2 ${accuracy.score ? 'd-block': 'd-none'} ">${accuracy.score *100}% accuracy</p>

            <img class="img-fluid rounded h-100" src="${image_link[0]}" alt="">
            </div>
                <div class="mt-4">
                  <h5 class="fw-medium text-center">${input_output_examples == null? 'Can you give any example?' : input_output_examples[0].input}</h5>
                  <p class="text-secondary text-center">${input_output_examples == null? 'No! Not Yet! Take a break!!!':input_output_examples[0].output}</p>
                </div>
          </div>

          </div>
 
 `
}

//sort by date
let isSortExecuted = false;
document.getElementById("sort-by-date").addEventListener("click", function () {
    if(!isSortExecuted){
      isSortExecuted=true
      document.getElementById("card-container").innerHTML='';
  const sort = allFetchData.sort((a,b) => Date.parse(b.published_in) - Date.parse(a.published_in))
  showLoadData(sort)
    }
  });


loadData();
