$(document).ready(function() {
   $("#none").hide();

   $("#search").on("click", function(e) {
      $("#hasil").html(""); 
      $("#hasil").fadeIn(1000);
      if ($("#textbox").val() === "") {
         $("#none").fadeIn(500);
      } else {
         $(this).attr("disabled", true);

         $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&grnnamespace=0&prop=extracts&exlimit=max&explaintext&exintro&gsrsearch=" + $("#textbox").val() + "&callback=?", function(result) {
            $("#search").attr("disabled", false);
            if (result.hasOwnProperty("query")) {
               $.each(result.query.pages, function(key, page){
               var extract = page.extract.length > 464 ? page.extract.substring(0,464) + "..." : page.extract;
               $("#hasil").append('<li><h2><a target="_blank" href="http://en.wikipedia.org/?curid=' + page.pageid + '">' + page.title + '</a></h2>' + '<p>' + extract + '</p>' + '</li>');
               });
            }
         });
      }
      e.preventDefault();
   });
});