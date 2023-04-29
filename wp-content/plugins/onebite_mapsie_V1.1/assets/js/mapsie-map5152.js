//variables
var geocoder;
var circle = null;
var map = null;
var all_markers = [];
var markers = [];
var inBounds = [];
var show_within_radius;
var geocoder = new google.maps.Geocoder();

jQuery(document).ready(function($) {


});

function validate(fields) {

	var field_array = ['title', 'description', 'address', 'telephone', 'email', 'website'];
	
	try{
		var description = document.getElementById('description').value;
	}
	catch(err){
		var description = "";
	}
	try{
		var telephone = document.getElementById('telephone').value;
	}
	catch(err){
		var telephone = "";
	}
	try{
		var email = document.getElementById('email').value;
	}
	catch(err){
		var email = "";
	}
	try{
		var website = document.getElementById('website').value;
	}
	catch(err){
		var website = "";
	}
	try{
		var number = document.getElementById('number').value;
	}
	catch(err){
		var number = "";
	}
	try{
		var postal = document.getElementById('postal').value;
	}
	catch(err){
		var postal = "";
	}
	try{
		var addition = document.getElementById('addition').value;
	}
	catch(err){
		var addition = "";
	}
	try{
		var country = document.getElementById('country').value;
	}
	catch(err){
		var country = "";
	}
		
	
	var title = document.getElementById('title').value;
	var street = document.getElementById('street').value;
	var city = document.getElementById('city').value;
	

	if (fields == 'general') {

		if (!title) {alert('Please enter a title');return false;}
		/* If you want to make the fields required, you can use the code under this sentence */
		//else if (!description) {alert('Please enter a description');return false;}
		//else if (!telephone) {alert('Please enter a telephone number');return false;}
		//else if (!email) {alert('Please enter an e-mail address');return false;}
		//else if (!website) {alert('Please enter the address to your website');return false;}
		else {return true;}
		
	} else if (fields == 'address') {

		if (!street) {alert('Please enter the name of the street');return false;}
		/* If you want to make the fields required, you can use the code under this sentence */
	//	else if (!number) {alert('Please enter a street number');return false;}
	//	else if (!postal) {alert('Please enter a postcode');return false;}
		else if (!city) {alert('Please enter the name of the city');return false;}
	//	else if (!country) {alert('Please enter the name of the country');return false;}
		else {

			var address = street + ' ' + number + ' ' + addition + ' ' + postal + ' ' + city + ', ' + country;

			return address;

		}

	// } else if (fields == 'certificate') {

	// 	if (!certificate) {alert('U bent vergeten om een certificaat te uploaden');return false;}
	// 	else {
	// 		return true;
	// 	}
	}
}

function validate_form() {

	if (!validate('general')) {
		return false;

	} else if (!validate('address')) {
		return false;

	} else {

		var submit = true;
		var result = saveMarker(submit);
		return false;
	}
}
	
google.maps.event.addDomListener(window, 'load', initialize());


//function to remove marker inserted by the user,
//this is needed to prevent placing multiple markers on the map
function clearMarker() {
	
	for (var i = 0; i < markers.length; i++ ) {

		markers[i].setMap(null);
	}
}

//function to remove all markers from the map,
//this is to show only the markers that are within a certain radius
function clearAll() {
	
	for (var i = 0; i < all_markers.length; i++ ) {
		all_markers[i].setMap(null);
	}
}

function myclick(id) {

	google.maps.event.trigger(all_markers[id], "click");
}

function initialize() {

	geocoder = new google.maps.Geocoder();
	latlng_collection = [];
	var marker_ids = [];
	var selected_layer = document.getElementById('layer_switch').value;

	var mapOptions = {
		zoom: 8,
		streetViewControl: false,
		disableDefaultUI: false
	};
	
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);	
	var infowindow = new google.maps.InfoWindow();
	
	var i = 0;

	locations.forEach(function(location) {

		var latlng = new google.maps.LatLng(location.latlng_a, location.latlng_b);
		var check_array = jQuery.inArray(location.id, marker_ids);
		var setmap;

		if(check_array < 0) {

			marker_ids.push(location.id);
			latlng_collection.push(latlng);
			setmap = map;

		} else {

			setmap = null;
		}
		var markerimage = jQuery('#markerimage'+location.layer_id).text();
		if(markerimage == ""){
			markerimage = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
		}
		var marker = new google.maps.Marker({
			position: latlng,
			map: setmap,
			icon: markerimage,
			name: location.name,
			id: location.id,
			layer_id: location.layer_id,
			marker_data: location.marker_data,
		});

		var obj = marker_data[location.id];
		var info = '';

		for (var key in obj) {
		    if (obj.hasOwnProperty(key)) {
		        var val = obj[key];

		        if(val) {

		        	var key_capfirst = key.substring(0,1).toUpperCase() + key.substring(1,key.length);
					var val_capfirst = val.substring(0,1).toUpperCase() + val.substring(1,val.length);

			       	if(key == 'website') {
			       		info += '<span>' + key_capfirst + ':</span> <a href="' + val + '" target="_blank">' + val + '</a>';
					} else if(key == 'email') {
						info += '<span>' + key_capfirst + ':</span> <a href="mailto:' + val + '">' + val + '</a>';
					} else {
						info += '<span>' + key_capfirst + ':</span> ' + val_capfirst;
					}

					info += '<br />';

		        } else {

		        	continue;
		        }


		    }
		
		}

		info = info.substring(0, info.length -6);

		


		google.maps.event.addListener(marker, 'click', (function(marker, i) {

		  	return function() {

		  		var container = jQuery('#sidebar'),
    			scrollTo = jQuery('#sidebaritem_' + i);

    			container.animate({
    				scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
				});

			    infowindow.setContent(info);
			    infowindow.open(map, marker);

			    clickPanel(i);
	  		}

		})(marker, i));

		google.maps.event.addListener(map, 'click', function() {

			infowindow.close();

			jQuery('.open').html('+');
			jQuery('.showpanel').hide(250);
		
		});

		all_markers.push(marker);

		i++;

	});

	updateSidebar(all_markers);
	zoom_to_show_all(latlng_collection);
	
	var mcOptions = {gridSize: 50, maxZoom: 15};
	updateSidebar(all_markers);
	
}


function codeAddress(submit) {

	clearMarker();

	if(!validate('address')) {

		return false;

	} else {

		var address = validate('address');
	}
	
	geocoder.geocode( { 'address': address}, function(results, status) {
    
	    if (status == google.maps.GeocoderStatus.OK) {

	    	if(!submit){
	    		map.setCenter(results[0].geometry.location);
	    	}

	    	document.getElementById('address').value = address;
	    	document.getElementById('latlng').value = results[0].geometry.location;
			var selectlayer = document.getElementById('layer_switch');
			var selectedlayer = [];
			for(var i = 0; i < selectlayer.length; i++){
				if(selectlayer.options[i].selected) selectedlayer.push(selectlayer.options[i].value);
			}
			
	    	document.getElementById('layer').value = selectedlayer;
			
			var marker = new google.maps.Marker({
				
				map: map,
				position: results[0].geometry.location,
	      
	      	});

	      	marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);

		    jQuery('html, body').animate({
		        scrollTop: jQuery("#map-canvas").offset().top
		    });

		    google.maps.event.trigger(map, "click");

		    infowindow = null;

		    infowindow = new google.maps.InfoWindow();

			infowindow.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);

			var selected_layer = jQuery("#layer_switch option:selected").html();

			var info = 'Your new marker will be placed here.<br /><br /><button class="save_marker_btn" onclick="validate_form()">Click here to save your marker!</button>';

		    infowindow.setContent(info);
		    infowindow.open(map, marker);

		    markers.push(marker);
			
			
		} else if (status == "OVER_QUERY_LIMIT") {

			alert('Sorry! You\'ve made too many attempts to place a marker');
			
		} else {

			alert('Unable to find address');

		}

  	});

}

function saveMarker(submit) {


	if(submit) {

		var selected_layer = jQuery("#layer_switch option:selected").html();
		var selected_layer_items = jQuery("#layer_switch option:selected").length;

		if(selected_layer_items > 1){
			var notification = 'You are about to add a marker to multiple selected layers. Do you want to continue?';
		}
		else{
			if(selected_layer == 'All') {

				var notification = 'You are about to add a marker to all layers. Do you want to continue?';

			} else {

				var notification = 'You are about to add a marker to the "' + selected_layer +'" layer. Do you want to continue?';
			}
		}

		if(!confirm(notification)) {
		
			return false;

		} else {

			codeAddress(submit);

			document.getElementById('markerform').submit();
			alert('Your marker is saved successfully');
		}

	}

}

function resetMap() {

		google.maps.event.trigger(map, "click");

		document.getElementById('rad_address').value = '';
		document.getElementById('radius').value = '5';
		document.getElementById('layer_switch').value = '0';
		//layer_switch

		clearAll();

		if(circle) {circle.setMap(null);}

		show_within_radius = false;

		// var latlng = new google.maps.LatLng(52.132633, 5.2912659999999505);

		// map.setCenter(latlng);

		// map.setZoom(8);

		set_layer(0);

		zoom_to_show_all(latlng_collection);

}

	
function showWithinRadius(radius, address) {

	if (radius && address) {
		
		var radius = parseInt(radius, 10)*1000;
		var address = address;

	} else {
		
		var radius = parseInt(document.getElementById('radius').value, 10)*1000;
		var address = document.getElementById('rad_address').value;

	}

	var layer_id = parseInt(document.getElementById('layer_switch').value);

	if (address == '') {
		alert("Please enter an address");
		return false;
	}

	geocoder.geocode( { 'address': address}, function(results, status) {
					
		if (status == google.maps.GeocoderStatus.OK) {

			document.getElementById('rad_address').value = results[0].formatted_address;
			
			map.setCenter(results[0].geometry.location);
			
			var searchCenter = results[0].geometry.location;

			if (circle) circle.setMap(null);
			
			circle = new google.maps.Circle({

				center:searchCenter,
				radius: radius,
				fillOpacity: 0.35,
				fillColor: "#FF0000",
				map: map,
				visible: false
			
			});
			

            var bounds = new google.maps.LatLngBounds();

			var foundMarkers = 0;
		
			if (foundMarkers > 0) {
			
				map.fitBounds(bounds);
			
			} else {
			
				map.fitBounds(circle.getBounds());
			
			}
			
			inBounds = [];
								
			google.maps.event.addListenerOnce(map, 'bounds_changed', function() {

				var marker_ids = [];

				for (var i=0; i<all_markers.length; i++) {

					if(circle.getBounds().contains(all_markers[i].getPosition()) /*&& (all_markers[i].layer_id == layer_id || layer_id == 0)*/) {

						var check_array = jQuery.inArray(all_markers[i].id, marker_ids);

						if(check_array < 0) {

							marker_ids.push(all_markers[i].id);
							all_markers[i].setMap(map);

						}

						inBounds.push(all_markers[i]);
				
					} else {

						all_markers[i].setMap(null);
					}

				}

				updateSidebar(all_markers);

			});

			show_within_radius = true;

		} else {

			alert("Invalid address");
		}
		
	});

}

jQuery('#layer_switchs').on('change', function() {

	jQuery("#layer_switchs").val(this.value);

	set_layer(this.value);

});
jQuery('#close_marker').on('click', function() {
	jQuery("#toggle").hide('slow');
});

jQuery('#add_marker').on('click', function() {

	if(jQuery('#toggle').is(':hidden')) {

		jQuery("#toggle").show('slow');

	}
	else{
		jQuery("#toggle").hide('slow');
	}

	jQuery('html, body').animate({
        scrollTop: jQuery("#bottom-controls").offset().top
    }, 475);


});

function set_layer(id) {

	var text_value = jQuery("#layer_switchs option:selected").text();
	document.getElementById('layer_name').value = text_value;

	clearAll();

	var marker_ids = [];

	var selected_layer = parseInt(document.getElementById('layer_switchs').value);

	var latlng_col_setlayer = [];

	if(show_within_radius) {

		for (var i=0; i<inBounds.length; i++) {

			if(selected_layer == 0) {

				var check_array = jQuery.inArray(inBounds[i].id, marker_ids);

				if(check_array < 0) {

					marker_ids.push(inBounds[i].id);
					inBounds[i].setMap(map);
					//latlng_col_setlayer.push(inBounds[i].position);

				}

			} else {
			
				if(inBounds[i].layer_id == selected_layer) {

					inBounds[i].setMap(map);
					//latlng_col_setlayer.push(all_markers[i].position);
				
				} else {

					inBounds[i].setMap(null);

				}				
			}
		}

	} else {

		for (var i=0; i<all_markers.length; i++) {

			if(selected_layer == 0) {

				var check_array = jQuery.inArray(all_markers[i].id, marker_ids);

				if(check_array < 0) {

					marker_ids.push(all_markers[i].id);
					all_markers[i].setMap(map);
					//latlng_col_setlayer.push(all_markers[i].position);

				}

			} else {
			
				if(all_markers[i].layer_id == selected_layer){
					
					all_markers[i].setMap(map);
					//latlng_col_setlayer.push(all_markers[i].position);
				
				} else {

					all_markers[i].setMap(null);

				}				
			}
		}

	}

	updateSidebar(all_markers);
	//zoom_to_show_all(latlng_col_setlayer);
	
}

function zoom_to_show_all(LatLngList) {

	//console.log(LatLngList);

	//  Make an array of the LatLng's of the markers you want to show
	//var LatLngList = new Array (new google.maps.LatLng (52.537,-2.061), new google.maps.LatLng (52.564,-2.017));
	
	//  Create a new viewpoint bound
	var bounds = new google.maps.LatLngBounds();
	//  Go through each...
	for (var i = 0, LtLgLen = LatLngList.length; i < LtLgLen; i++) {
	  //  And increase the bounds to take this point
	  bounds.extend (LatLngList[i]);
	}
	//  Fit these bounds to the map
	map.fitBounds (bounds);

}

function clickPanel(id) {

	if(jQuery('div#' + id + '.showpanel').is(':hidden')) {

		jQuery('.open').html('+');

		jQuery('div#' + id + '.open').html('-');

		jQuery('.showpanel').hide(250);

		jQuery('div#' + id + '.showpanel').toggle(250);

	} else {

		jQuery('div#' + id + '.open').html('+');

		jQuery('div#' + id + '.showpanel').toggle(250);

	}

}

function updateSidebar(markers) {

	var sidebar = jQuery("#sidebar");
	sidebar.empty();

	for (var i = 0; i < markers.length; i++) {

		if(markers[i].map != null) {

			var array = [];

			for (var key in locations[i].marker_data) {

				if (markers[i].marker_data.hasOwnProperty(key)) {

			        var val = locations[i].marker_data[key];

		        	var key_capfirst = key.substring(0,1).toUpperCase() + key.substring(1,key.length);
					var val_capfirst = val.substring(0,1).toUpperCase() + val.substring(1,val.length);

					if(val) {

				       	if(key == 'website') {
				       		stuff = '<span>' + key_capfirst + ':</span> <a href="' + val + '" target="_blank">' + val + '</a>';
						} else if(key == 'email') {
							stuff = '<span>' + key_capfirst + ':</span> <a href="mailto:' + val + '">' + val + '</a>';
						} else {
							stuff = '<span>' + key_capfirst + ':</span> ' + val_capfirst + '';
						}

					} else {
						
						continue;
					}				

					// if(key == 'website') {

					// 	stuff = '<span>' + key + ':</span> <a href="' + locations[i].marker_data[key] + '">' + locations[i].marker_data[key] + '</a>';

					// } else {

					// 	stuff = '<span>' + key + ':</span> ' + locations[i].marker_data[key];

					// }					

					array.push(stuff);
				
				}

			}

			var joined = array.join('<br />');

			var marker_data = '<div class="showpanel" id="'+ i +'">' + joined + '</div>';

			var li = jQuery('<li class="sidebaritem" id="sidebaritem_' + i + '"><div class="open" id="' + i + '" onclick="myclick(' + i + ')">+</div><h3>' + '<a href="javascript:myclick(' + i + ')">' + locations[i].name + '<\/a>' + '</h3>' + marker_data + '</li>');
			sidebar.append(li);

		}

	}

}
