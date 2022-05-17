let addbtn=document.querySelector(".add-btn")
let modalCont=document.querySelector(".modal-cont")
let mainCont = document.querySelector(".main-cont")
let taskAreaCont=document.querySelector(".textarea-cont")
let allPriorityColor=document.querySelectorAll(".priority-color");
let addModal=true;
let removeBtn=document.querySelector(".delete-btn");
let removeFlag=false;
let colors=['pink','yellow','red','orange'];
let toolBoxColors=document.querySelectorAll(".color");
let modalPriorityColor=colors[colors.length-1];
var uid = new ShortUniqueId();
let ticketArr=[];

if(localStorage.getItem("tickets")){
    let str = localStorage.getItem("tickets");
    let arr = JSON.parse(str);
    ticketArr = arr;
    for(let i=0;i<arr.length;i++){
        let ticketObj = arr[i];
        createTicket(ticketObj.color,ticketObj.task,ticketObj.id);
    }
}


for(let i=0;i<toolBoxColors.length;i++)
{
    toolBoxColors[i].addEventListener("click",function()
    {
        let currentColor=toolBoxColors[i].classList[1];
        let filteredArr=[];
        for (let i=0;i<ticketArr.length;i++) 
        {
            if (ticketArr[i].color == currentColor) 
            {
                filteredArr.push(ticketArr[i]);
            }
        }
        let allTickets=document.querySelectorAll(".ticket-cont");
        for(let j=0;j<allTickets.length;j++)
        {
            allTickets[j].remove();
        }
        for(let j=0;j<filteredArr.length;j++)
        {
            let ticket=filteredArr[j];
            let color=ticket.color;
            let task=ticket.task;
            let id=ticket.id;
            createTicket(color,task,id);
        }
    });

    toolBoxColors[i].addEventListener("dblclick",function()
    {
        let allTickets = document.querySelectorAll(".ticket-cont");
        for (let j = 0; j < allTickets.length; j++) {
            allTickets[j].remove();
        }
        for (let i = 0; i < ticketArr.length; i++) {
            let ticket = ticketArr[i];
            let color = ticket.color;
            let task = ticket.task;
            let id = ticket.id;
            createTicket(color, task, id)
        }
    });
}

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

function createTicket(priorityColor,task,ticketId){
    let id;
    if(ticketId==undefined)
    {
        id=uid();
    }
    else
    {
        id=ticketId;
    }
    // <div class="ticket-cont">
    //         <div class="ticket-color"></div>
    //         <div class="ticket-id">#qzu03</div>
    //         <div class="task-area">some task</div>
    //     </div>
    let ticketCont = document.createElement("div");
    ticketCont.setAttribute('class','ticket-cont');
    ticketCont.innerHTML = `<div class="ticket-color ${priorityColor}"></div>
                            <div class="ticket-id"> #${id}</div>
                            <div class="task-area">${task}</div>
                            <div class="lock-unlock"><i class="fa fa-lock"></i></div>`
    mainCont.appendChild(ticketCont);
    ticketCont.addEventListener("click",function()
    {
        if(removeFlag)
        {
            // Remove from UI
            ticketCont.remove();
            // Remove from ticketArr
            let ticketIdx=getIndex(id);
            ticketArr.splice(ticketIdx,1);
            updateLocalStorage();
        }
    });
    let ticketColorBand=ticketCont.querySelector(".ticket-color")
    ticketColorBand.addEventListener("click",function()
    {
        let currentTicketColor=ticketColorBand.classList[1];
        let currentTicketColorIdx=colors.indexOf(currentTicketColor);
        let nextColorIdx=(currentTicketColorIdx+1)%colors.length;
        let nextColor=colors[nextColorIdx];
        ticketColorBand.classList.remove(currentTicketColor);
        ticketColorBand.classList.add(nextColor);
        // Update ticketArr as well
        let ticketIdx=getIndex(id);
        ticketArr[ticketIdx].color = nextColor;
        updateLocalStorage();
    });
    let lockUnlockBtn=ticketCont.querySelector(".lock-unlock i");
    let ticketTaskArea=ticketCont.querySelector(".task-area");
    lockUnlockBtn.addEventListener("click",function()
    {
        if(lockUnlockBtn.classList.contains("fa-lock"))
        {
            lockUnlockBtn.classList.remove("fa-lock");
            lockUnlockBtn.classList.add("fa-unlock");
            ticketTaskArea.setAttribute("contenteditable","true");
        }
        else
        {
            lockUnlockBtn.classList.remove("fa-unlock");
            lockUnlockBtn.classList.add("fa-lock");
            ticketTaskArea.setAttribute("contenteditable","false");
        }
        let ticketIdx=getIndex(id);
        ticketArr[ticketIdx].task=ticketTaskArea.textContent;
        updateLocalStorage();
    });
    if(ticketId==undefined)
    {
        ticketArr.push({"color":priorityColor,"task":task,"id":id});
        updateLocalStorage();
    }
    console.log(ticketArr);
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

removeBtn.addEventListener("click",function()
{
    if(removeFlag)
    {
        removeBtn.style.color='black';
    }
    else
    {
        removeBtn.style.color='red';
    }
    removeFlag=!removeFlag;
})

// Function to get the index
function getIndex(id) 
{
    for(let i=0;i<ticketArr.length;i++)
    {
        if(ticketArr[i].id==id)
        {
            return i;
        }
    }
}

// Function to update the local storage
function updateLocalStorage()
{
    let stringify=JSON.stringify(ticketArr);
    localStorage.setItem("tickets",stringify);
}