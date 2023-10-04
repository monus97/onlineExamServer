function paginateArray(array, pageNumber, itemsPerPage) {
  // Calculate the starting index and ending index for the current page
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Use the slice method to extract the data for the current page
  const currentPageData = array.slice(startIndex, endIndex);

  return currentPageData;
}
module.exports = {
  paginateArray,
};

// const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const pageNumber = 2;
// const itemsPerPage = 3;

// const currentPageData = paginateArray(myArray, pageNumber, itemsPerPage);
// console.log(currentPageData); // Output: [4, 5, 6]
