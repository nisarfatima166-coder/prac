const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");
const richestPeople=[
    "Elon Musk",
    "Larry Page",
    "Sergey Brin",
    "Jeff Bezos",
    "Mark Zuckerberg",
    "Larry Ellison",
    "Jensen Huang",
    "Bernard Arnault",
    "Rob Walton",
    "Warren Buffett",
];
const listItems = []
    let dragStartIndex;
    createList();
    function createList(){
        [...richestPeople]
        .map(a=>({value:a,sort:Math.random()}))
        .sort((a,b)=>a.sort - b.sort)
        .map((a)=>a.value)
        .forEach((person,index)=>{
            // console.log(person);
            const listItem=document.createElement("li");
             listItem.classList.add("right");
            listItem.setAttribute("data-index",index);
            listItem.innerHTML=`
            <span class ="number">${index+1}</span>
            <div class ="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fa-solid fa-grip-lines"></i>
            </div>
            `;
            listItems.push(listItem);
            draggable_list.appendChild(listItem)

        });
          addEventListener()

    }
    function dragStart() {
        dragStartIndex = this.closest('li').getAttribute('data-index');
    }
    function dragEnter() {
        this.classList.add('over');
    }
    function dragLeave() {
        this.classList.remove('over');
    }
    function dragOver() {
        
    }
    function dragDrop() {
        const dragEndIndex = +this.getAttribute('data-index');
        swapItems(dragStartIndex, dragEndIndex);
        this.classList.remove("over");
    }
    function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelectorAll(".draggable");
    const itemTwo = listItems[toIndex].querySelectorAll(".draggable");
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
    }

function checkOrder() {
    listItems.forEach((listItems, index) => {
        const personName = listItems.querySelectorAll(".draggable").innerText.trim();

        if(personName !== richestPeople[index]) {
            listItems.classList.add("wrong");
        }
        else {
            listItems.classList.remove("wrong");
            listItems.classList.add("right");
        }
    })
}

function addEventListener(){
    const draggables = document.querySelectorAll(".draggable");
    const dragListItems = document.querySelectorAll(".draggable-list li");

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragStart);
       
    });
    dragListItems.addEventListener((item) => { 
        item.addEventListener("dragover", dragOver);
         item.addEventListener("drop", dragDrop);
          item.addEventListener("dragEnter", dragEnter);
           item.addEventListener("dragLeave", dragLeave);
    });
}

check.addEventListener("click", checkOrder);