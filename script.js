let addbtn=document.querySelector(".add-btn")
let modalCont=document.querySelector(".modal-cont")
let mainCont = document.querySelector(".main-cont")
let taskAreaCont=document.querySelector(".textarea-cont")
let allPriorityColor=document.querySelectorAll(".priority-color");
let addModal=true;
let modalPriorityColor='lightgrey'

addbtn.addEventListener("click",function()
{
    if(addModal)
    {
        modalCont.style.display="flex";
    }
    else
    {
        modalCont.style.display="none";
    }
    addModal=!addModal;
})

modalCont.addEventListener("keydown",function(e){
    if(e.key == 'Enter'){
        createTicket(modalPriorityColor,taskAreaCont.value);
        taskAreaCont.value = "";
        modalCont.style.display = "none";
        addModal = !addModal;
    }
})

function createTicket(priorityColor,task){
    // <div class="ticket-cont">
    //         <div class="ticket-color"></div>
    //         <div class="ticket-id">#qzu03</div>
    //         <div class="task-area">some task</div>
    //     </div>
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute('class','ticket-cont');
    ticketCont.innerHTML = `<div class="ticket-color ${priorityColor}"></div>
                            <div class="ticket-id">#qzu03</div>
                            <div class="task-area">${task}</div>`
    mainCont.appendChild(ticketCont);
}

for(let i=0;i<allPriorityColor.length;i++)
{
    allPriorityColor[i].addEventListener("click",function()
    {
        for(let j=0;j<allPriorityColor.length;j++)
        {
            allPriorityColor[j].classList.remove("active");
        }
        allPriorityColor[i].classList.add("active");
        modalPriorityColor=allPriorityColor[i].classList[0];
    })

}