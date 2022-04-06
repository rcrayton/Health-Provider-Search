//DOM //
const searchBtn = document.getElementById('search-btn');
const drList = document.getElementById('doctor');
const drDetailsContent = document.querySelector(".doctor-details-content");
const drInfoCloseBtn = document.getElementById("drInfo-close-btn");

//Event Listner -- here to do SOMETHING upon user//
searchBtn.addEventListener('click', getDrList);
//drList.addEventListener("click",getDrInfo);
// drInfoCloseBtn.addEventListener("click", function() {
//   drDetailsContent.parentElement.classList.remove("showDrInfo");  
// });


// get doctor list that matches with the dx or condition

function getDrList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://randomuser.me/api/?inc=name,location,picture,cell&results=20${searchInputTxt}`)
        .then(response => response.json())
        .then((data) => {
        let html = "";
        //name of the object data.[here]
        if(data.results){
            //will need to change line 27, 29 and 32 with object name from API
            data.results.forEach(doctor => {
                html += `
                    <div class = "doctor-item" data-id = "${doctor.name.first}">
                        <div class = "dr-img">
                            <img src = "${doctor.picture.large}" alt = "Doctor">
                        </div>
                        <div class = "doctor-name">
                            <h3>Dr. ${doctor.name.first} ${doctor.name.last}</h3>
                            <a href = "#" class = "dr-btn">Get Additional Info</a>
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


// // get information of the doctor -- line 56 needs to have the correct object name, line 54 will need to have the correct API directory
// function getDrInfo(e){
//     e.preventDefault();
//     if(e.target.classList.contains('dr-btn')){
//         let doctorItem = e.target.parentElement.parentElement;
//         fetch(//`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
//         .then(response => response.json())
//         .then(data => drListModal(data.meals))
//     }
// }

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