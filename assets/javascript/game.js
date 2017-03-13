   // Initial array of cars
      var cars = ["GTR", "240sx", "WRX", "300zx"];

       //$("button").on("click", function(displaycarInfo) {
      // Grabbing and storing the data-animal property value from the button

      // displaycarInfo function re-renders the HTML to display the appropriate content
      function displaycarInfo() {

        var car = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);




        // Creating an AJAX call for the specific food button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          //storing the data from the AJAX request in the results variable
          var results = response.data;

          //Loop through results
        for (var a = 0; a < cars.length; a++) {  

          // Creating a div to hold the car
          var carDiv = $("<div class='car-item'>");

          // Storing the rating data
          var rating = results;

          // Creating an element to have the rating displayed
          var pOne = $("<p>").text("Rating: " +results[a].rating);

          // Displaying the rating
          carDiv.append(pOne);

          // Retrieving the URL for the image
          //var imgURL = response.bitly_gif_url;

          // Creating an element to hold the image
          var image = $("<img>")
          .attr('data-still', results[a].images.fixed_height_still.url)
          .attr("data-animate", results[a].images.fixed_height.url)
          .attr('data-state', 'still')
          .attr("src", results[a].images.fixed_height.url);

          // Appending the image
          carDiv.append(image);

          // Putting the entire car above the previous cars
          $("#cars-view").prepend(carDiv);
        }
      });

      
        

        $("#cars-view").on("click", 'img', function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      console.log(state);
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  };


      // Function for displaying car data
      function renderButtons() {

        // Deleting the cars prior to adding new cars
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of cars
        for (var i = 0; i < cars.length; i++) {

          // Then dynamicaly generating buttons for each car in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of car to our button
          a.addClass("car");
          // Adding a data-attribute
          a.attr("data-name", cars[i]);
          // Providing the initial button text
          a.text(cars[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a car button is clicked
      $("#add-car").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var car = $("#car-input").val().trim();

        // Adding car from the textbox to our array
        cars.push(car);

        // Calling renderButtons which handles the processing of our car array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "car"
      $(document).on("click", ".car", displaycarInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();


      $(document).ready(function(){
      $("#buttons-view").click(function(){
      $("#cars-view").empty();
      });
    });


