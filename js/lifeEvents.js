function initMap() {

  // Specify where the map is centered
  // Defining this variable outside of the map optios markers
  // it easier to dynamically change if you need to recenter
  var myLatLng = {lat: 72, lng: -140};

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('lifeEvent-map'), {
    center: myLatLng,
    scrollwheel: false,
    zoom: 5,
    zoomControl: true,
    panControl: false,
    streetViewControl: false,
    // styles: MAPSTYLES,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  var infoWindow = new google.maps.InfoWindow({
      width: 150
  });

  // var styledMap = new google.maps.StyledMapType(
  //     MAPSTYLES,
  //     {name: "Custom Style"}
  // );

  updateMap();

  function updateMap() {

    LifeEvents = {"1":{"oneEventId":"1","capLat":"45.0522","capLong":"-82.4846","Year":"Great Lakes, U.S.", "Month":"24 in", "Day":"Brown", "eventType":"","members":"Brown Trout"},
                  "2":{"oneEventId":"2","capLat":"42.3173","capLong":"-71.3780","Year":"Lake Cochituate, MA", "Month":"18 in", "Day":"Green", "eventType":"","members":"Largemouth Bass"},
                  "3":{"oneEventId":"3","capLat":"42.6112","capLong":"-70.5721","Year":"Gloucester, MA", "Month":"14 ft", "Day":"Blue", "eventType":"","members":"Bluefin Tuna"},
                  "4":{"oneEventId":"4","capLat":"14.5699","capLong":"120.7233","Year":"Manila, Philippines", "Month":"12 in", "Day":"Gold", "eventType":"","members":"Tilapia"},
                  "5":{"oneEventId":"5","capLat":"2.8692","capLong":"103.6843","Year":"Kuala Rompa, Malaysia", "Month":"9 ft", "Day":"Blue", "eventType":"","members":"Sailfish"},
                  "6":{"oneEventId":"6","capLat":"59.6263","capLong":"-151.5115","Year":"Homer, Alaska", "Month":"36 in", "Day":"Red/ Silver", "eventType":"","members":"Chinook Salmon"},
                  "7":{"oneEventId":"7","capLat":"-1.2904","capLong":"-62.0011","Year":"Amazon River, Brazil", "Month":"2 ft", "Day":"Various", "eventType":"","members":"Peacock Bass"},
                  "8":{"oneEventId":"8","capLat":"59.0237","capLong":"13.6179","Year":"Lake Vanern, Sweden", "Month":"10 in", "Day":"Yellow", "eventType":"","members":"Yellow Perch"},
                  "9":{"oneEventId":"9","capLat":"-4.6373","capLong":"55.5209","Year":"Seychelles, Africa", "Month":"12 in", "Day":"Brown/White", "eventType":"Poisonous","members":"Lionfish"},
                  "10":{"oneEventId":"10","capLat":"-21.9321","capLong":"114.1551","Year":"Exmouth, Australia", "Month":"12 ft", "Day":"Black/White", "eventType":"","members":"Black Marlin"}

    }
  
      var oneEvent, marker, html;

      for (var key in LifeEvents) {
          oneEvent = LifeEvents[key];

          console.log(key);


         marker = new google.maps.Marker({
              position: new google.maps.LatLng(oneEvent.capLat, oneEvent.capLong),
              map: map,
              title: 'oneEvent ID: '
              // icon: 'static/img/corgi.png'
          });

          // console.log("post");

          // Define the content of the infoWindow
          html = (
              '<div class="window-content">' +
                  '<img src="static/img/corgi.png" alt="lifeEvent" style="width:150px;" class="thumbnail">' +
                  '<p><b>Fish Name: </b>' + oneEvent.members + '</p>' +
                  '<p><b>Location: </b>' + oneEvent.Year + '</p>' +
                  '<p><b>Length: </b>' + oneEvent.Month + '</p>' +
                  '<p><b>Color: </b>' + oneEvent.Day + '</p>' +
                  '<p><b>Fact: </b>' + oneEvent.eventType + '</p>' +
                  '<p><b>Location: </b>' + marker.position + '</p>' +
              '</div>');

          // Inside the loop we call bindInfoWindow passing it the marker,
          // map, infoWindow and contentString
          bindInfoWindow(marker, map, infoWindow, html);
      }
    };


  // This function is outside the for loop.
  // When a marker is clicked it closes any currently open infowindows
  // Sets the content for the new marker with the content passed through
  // then it open the infoWindow with the new content on the marker that's clicked
  function bindInfoWindow(marker, map, infoWindow, html) {
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.close();
          infoWindow.setContent(html);
          infoWindow.open(map, marker);
      });
  }
}

google.maps.event.addDomListener(window, 'load', initMap);
