/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const studentList = document.getElementsByClassName("student-list")[0].children
const pageDIV = document.getElementsByClassName("page")[0]

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
const showPage = (list, page) => {
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = "none"
      if (i >= (page - 1) * 10 && i<= (page) * 10 - 1 ) {
         list[i].style.display = "block"
      }
   }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {
   let maxPageNum = Math.floor(list.length / 10 + 1)
   let paginationDIV = document.createElement("div")
   let paginationUL = document.createElement("ul")

   paginationDIV.classList.add("pagination")
   pageDIV.append(paginationDIV)
   paginationDIV.append(paginationUL)

   for (let i = 0; i < maxPageNum; i++) {
      let pageButton = document.createElement("li")
      let pageButtonHTML = `<a>${i + 1}</a>`

      pageButton.innerHTML = pageButtonHTML
      paginationUL.append(pageButton)

      pageButton.addEventListener("click", (event) => {
         showPage(studentList, i + 1)

         let paginationLinks = document.querySelectorAll(".pagination > ul > li > a")
         for (let i = 0; i < paginationLinks.length; i++) {
            paginationLinks[i].classList.remove("active")
         }

         event.target.classList.add("active")
      })
   
   }

   

   
}


appendPageLinks(studentList)
showPage(studentList, 1)

// Remember to delete the comments that came with this file, and replace them with your own code comments.