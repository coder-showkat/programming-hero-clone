document.addEventListener('contextmenu', event => event.preventDefault());
const milestonesData = JSON.parse(data).data;

function milestoneLoaded() {
    const milestones = document.querySelector('.milestones');
    milestones.innerHTML = `
    <div class="incompleteTask">
    <h1>Incomplete Modules</h1>
    <hr>
    </div>
    ${milestonesData.map((milestone) => {
        return `
        <div class="milestone border-b"  id="${milestone._id}">
            <div class="flex">
              <div class="checkbox"><input type="checkbox" onclick="markComplete(this, ${milestone._id})"/></div>
              <div onclick="openModule(this, ${milestone._id})">
              <p class="milestoneName">
                  ${milestone.name}
                  <span><i class="fas fa-chevron-down"></i></span>
                </p>
              </div>
            </div>
            <div class="hidden_panel">
            ${milestone.modules.map((module)=>{
                return `
                <div class="module border-b">
                <p>
                ${module.name}
                </p>
              </div>
                `
            }).join("")}
              
            </div>
          </div>
          `
    }).join("")}`
}

    function openModule(element, id) {
        // Text bold
        const milestoneName = element.querySelector('p');
        const boldText = document.querySelector('active');
        if (boldText && !milestoneName.classList.contains('active')) {
            boldText.classList.remove('active');
        }

        // release module
        milestoneName.classList.toggle('active');
        const module = element.parentNode.nextElementSibling;
        const showEl = document.querySelector('.show');
        if (showEl && !module.classList.contains('show')) {
            showEl.classList.remove('show');
        }
        module.classList.toggle('show');

        // rotate icon
        element.querySelector('.fa-chevron-down').classList.toggle('rotate');

        //change title, description and  image
        const milestoneImage = document.querySelector('.milestoneImage');
        const title = document.querySelector('.title');
        const description = document.querySelector('.details');
        title.innerText = milestonesData[id].name;
        description.innerText = milestonesData[id].description;
        milestoneImage.src = milestonesData[id].image;
        milestoneImage.style.opacity = '0';
    }

    function markComplete(event, id) {
        const milestones = document.querySelector('.milestones');
        const doneList = document.querySelector('.doneList');
        const element = document.getElementById(id);
        if (event.checked) {
            milestones.removeChild(element);
            doneList.appendChild(element);
            Array.from(doneList.querySelectorAll('.milestone')).sort((a,b)=>{
                return Number(a.id) - Number(b.id);
            }).forEach((el)=>{
                doneList.appendChild(el);
            })
        } else {
            doneList.removeChild(element);
            milestones.appendChild(element);
            Array.from(milestones.querySelectorAll('.milestone')).sort((a,b)=>{
                return Number(a.id) - Number(b.id);
            }).forEach((el)=>{
                milestones.appendChild(el);
            })
        }
    }

    document.querySelector('.milestoneImage').onload = function (){
        this.style.opacity = '1';
    }

milestoneLoaded();