// GLOBAL VARIABLES

// Selects UL containing all student list items
const studentUL = document.getElementsByClassName("student-list")[0]
// Selects HTML Collection of all student list items
const studentList = studentUL.children
// Selects page div container for all single page elements
const pageDIV = document.getElementsByClassName("page")[0]
// Sets variable to select page header
const pageHeader = document.getElementsByClassName("page-header")[0]
// Creates search bar DIV element
const searchBarDIV = document.createElement("div")
// Sets variable for number of items per page
const perPageNum = 10

// ADDED JAVASSCRTIPT ELEMENTS

// Adds "sudent-search" class to search bar div
searchBarDIV.classList.add("student-search")

// Adds innerHTML to search bar div
searchBarDIV.innerHTML = `
         <input placeholder="Search for students...">
         <button>Search</button>
   `
// Appends seaerch bar div to page header
pageHeader.append(searchBarDIV)

// MAIN FUNCTIONS

// Creates function to show a 10 students on a page
const showPage = (list, page) => {

   // Loops through the selected list and sets display: none to all items
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = "none"
      // Creates the condition for the loop that if the item is in a the range of the selected page then it sets display: block
      if (i >= (page - 1) * perPageNum && i<= (page) * perPageNum - 1 ) {
         list[i].style.display = "block"
      }
   }
}

// Creates function to show page links at bottom of page
const appendPageLinks = (list) => {
   // Sets variable for the total number of pages based on list length
   let maxPageNum = Math.floor(list.length / perPageNum + 1)
   // Creates container div for page button UL
   let paginationDIV = document.createElement("div")
   //Creates UL for page button lI elements
   let paginationUL = document.createElement("ul")

   // Adds pagination glass to paginationDIV
   paginationDIV.classList.add("pagination")

   //Appends paginationDIV and UL to the page
   pageDIV.append(paginationDIV)
   paginationDIV.append(paginationUL)

   // Creates page buttons and inner HTML based on the maxPageNum variable
   for (let i = 0; i < maxPageNum; i++) {
      let pageButton = document.createElement("li")
      let pageButtonHTML = `<a>${i + 1}</a>`

      // Set sets the innerHTML of the button and then appends it to the UL
      pageButton.innerHTML = pageButtonHTML
      paginationUL.append(pageButton)

      // Creates an event listenr for each button
      pageButton.addEventListener("click", (event) => {
         // Runs the showPage funciton on the selected list
         showPage(list, i + 1)

         // Sets variable to select all page buttons internal links
         let paginationLinks = document.querySelectorAll(".pagination > ul > li > a")
         
         // Loops through page buttons and removes the "active" class
         for (let i = 0; i < paginationLinks.length; i++) {
            paginationLinks[i].classList.remove("active")
         }

         // Sets the target page button clicked to an "active" class
         event.target.classList.add("active")
      })
   
   }
   
}

// ON PAGE LOAD

showPage(studentList, 1);
appendPageLinks(studentList);

// EVENTS

// Sets variable to select search button
const searchBtn = document.querySelectorAll(".student-search > button")[0]
// Sets vairable to select search input
const searchInput = document.querySelectorAll(".student-search > input")[0]

// Creates click event listner on search button
searchBtn.addEventListener("click", () => {
   
   // Removes "no-results" LI from student list
   removeNoResults()

   // Selects value of search input
   let input = searchInput.value
   
   // Loops through full student LI list 
   for (let i = 0; i < studentList.length; i++) {
      // Selects sudent details div
      let studentDetails = studentList[i].childNodes[1]
      // Selects the text string of the student name in the student details div
      let studentName = studentDetails.childNodes[3].textContent

      // Creates condition to set LI to display "block" if included in search input and "none" if not
      if (studentName.includes(input)) {
         studentList[i].style.display = "block"
      } else {
         studentList[i].style.display = "none"
      }
   }

   // Sets variable to create an array for the sutdent List HTML collection
   let filteredArray = Array.from(studentList)
   
   // Sets variable to create a fitlered array based on the condition of items that are styled display: block"
   let filteredList = filteredArray.filter((item) => {
     return item.style.display === "block"
   })

   // Removes pagination buttons before appending new ones
   removePagination()

   if (filteredList.length > 0) {
      // Runs appendPageLinks and showPage functions on the filtered list
      appendPageLinks(filteredList)
      showPage(filteredList, 1)

   } else {
      noResults()
   }
})

// Creates keyup event listner on search input
searchInput.addEventListener("keyup", () => {
   
   // Removes "no-results" LI from student list
   removeNoResults()

   // Selects value of search input
   let input = searchInput.value

   // Loops through full student LI list 
   for (let i = 0; i < studentList.length; i++) {
      // Selects sudent details div
      let studentDetails = studentList[i].childNodes[1]
      // Selects the text string of the student name in the student details div
      let studentName = studentDetails.childNodes[3].textContent

      // Creates condition to set LI to display "block" if included in search input and "none" if not
      if (studentName.includes(input)) {
         studentList[i].style.display = "block"
      } else {
         studentList[i].style.display = "none"
      }
   }

   // Removes pagination buttons before appending new ones
   removePagination()

   // Sets variable to create an array for the sutdent List HTML collection
   let filteredArray = Array.from(studentList)
   // Sets variable to create a fitlered array based on the condition of items that are styled display: block"
   let filteredList = filteredArray.filter((item) => {
      return item.style.display === "block"
   })

   if (filteredList.length > 0) {
      // Runs appendPageLInks and showPage functions on the filtered list
      appendPageLinks(filteredList)
      showPage(filteredList, 1)
      removeNoResults()

   } else {
      noResults()
   }

})

// SUPPORT FUNCTIONS

// Creates function to create LI element to dipslay no search results notice
const noResults = () => {
   let noResultsLI = document.createElement("LI")
   noResultsLI.innerHTML = `
         <p style="font-weight: bold">We're sorry, there are no sudents with that name.</p>
         `
   studentUL.append(noResultsLI)
   noResultsLI.setAttribute("id", "no-results")
}

// Removes "no-results LI from page"
const removeNoResults = () => {
   let noResultsLI = document.getElementById("no-results")
   if(noResultsLI !== null) {
      noResultsLI.parentNode.removeChild(noResultsLI)
   }
}

// Creates funciton to remove pagination from page
const removePagination = () => {
   // Sets variable to select the pagination DIV
   let paginationDIV = document.getElementsByClassName("pagination")[0]
   // Removes the pagination DIV from the page if it exists
   if (paginationDIV) {paginationDIV.parentNode.removeChild(paginationDIV)}
}











