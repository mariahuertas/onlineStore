//AJAX
jQuery(document).ready(function(){
	jQuery("#removeOrderButton").on("click", function(){
		console.log("reach remove order");

		var workingObject = $(this);
		jQuery.ajax({
			url: "/anuncio/" + workingObject.attr("anuncio_id"),
			type: 'DELETE',
			success: function(success){
				console.log("success");
				workingObject.remove();
				console.log("deleted");
				window.history.pushState("","","/");
				window.history.go(0);
				return false;
			},
			error: function(e){
				alert("ERROR: ", e);
				console.log("ERROR: ", e);
			}
		});
	});
});
