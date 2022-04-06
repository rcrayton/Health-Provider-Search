//DOM //
const searchBtn = document.getElementById('search-btn');
const drList = document.getElementById('doctor');
// const drDetailsContent = document.querySelector(".doctor-details-content");
// const drInfoCloseBtn = document.getElementById("drInfo-close-btn");

//Event Listner -- here to do SOMETHING upon user//
searchBtn.addEventListener('click', getDrList);
// drList.addEventListener("click",getDrInfo);
// drInfoCloseBtn.addEventListener("click", function() {
// drDetailsContent.parentElement.classList.remove("showDrInfo");  
// });


let photos = [

]

// get doctor list that matches with the dx or condition

function getDrList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://npiregistry.cms.hhs.gov/api/?version=2.1&taxonomy_description=${searchInputTxt}&limit=40`)
        .then(response => response.json())
        .then((data) => {
        let html = "";
        //name of the object data.[here]
        if(data.results){
            //will need to change line 27, 29 and 32 with object name from API
            data.results.forEach(doctor => {
                html += `
                    <div class = "doctor-item" data-id = "${doctor.basic.name}">
                        <div class = "doctor-name">
                            <h3>${doctor.basic.first_name} ${doctor.basic.last_name} ${doctor.basic.credential}</h3>
                            <a href = "#" class = "dr-btn">More Info</a>
                        </div>
                    </div>
                `;
            });
            drList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any physicians with your requested needs!";
            drList.classList.add('notFound');
        }
        drList.innerHTML = html;
    });
}


// get information of the doctor -- line 56 needs to have the correct object name, line 54 will need to have the correct API directory
function getDrInfo(e){
    e.preventDefault();
    if(e.target.classList.contains('dr-btn')){
        let doctorItem = e.target.parentElement.parentElement;
        fetch(`https://npiregistry.cms.hhs.gov/api/?version=2.1&taxonomy_description=${doctorItem}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);//drListModal(data.results))
    })
}
}

// // create a modal -- meal parameter will need to be changed to object name
// function drListModal(meal){
//     console.log(meal);
//     meal = meal[0];
//     let html = `
//         <h2 class = "doctor-name">${meal.strMeal}</h2>
//         <p class = "doctor-specialty">${meal.strCategory}</p>
//         <div class = "recipe-instruct">
//             <h3>Instructions:</h3>
//             <p>${meal.strInstructions}</p>
//         </div>
//         <div class = "doctor-profile-img">
//             <img src = "${meal.strMealThumb}" alt = "">
//         </div>
//         <div class = "doctor-webpage-link">
//             <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
//         </div>
//     `;
//     drDetailsContent.innerHTML = html;
//     drDetailsContent.parentElement.classList.add('showDrInfo');
// }

//}