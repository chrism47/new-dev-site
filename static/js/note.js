
document.addEventListener('DOMContentLoaded', () => {
// 1. Select the first <p> element on the page
const firstP = document.querySelector('p');
if (firstP) {
    // Create a new <h1> element with the same content
    const h1 = document.createElement('h1');
    h1.innerHTML = firstP.innerHTML;

    // Replace <p> with <h1>
    firstP.parentNode.replaceChild(h1, firstP);
}

// // 2. Access and modify other elements, e.g., first two <li> in a list
// const listItems = document.querySelectorAll('ul li');
// if (listItems.length >= 2) {
//     listItems[0].style.color = 'red';
//     listItems[1].textContent = 'Updated second item';
// }

// // 3. You can add more DOM manipulations here
// // e.g., toggle a class on an element with id="myDiv"
// const myDiv = document.getElementById('myDiv');
// if (myDiv) {
//     myDiv.classList.toggle('highlight');
// }
});
