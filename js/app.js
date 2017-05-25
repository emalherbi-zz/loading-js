// A $( document ).ready() block.
$(document).ready(function() {
  console.log("ready!");
  //
  loadingjs.start();
  //
  setTimeout(function() {
    loadingjs.done();
  }, 7000);
});
