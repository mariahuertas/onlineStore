function removeOrderButton(){
	alert('El botón ha sido pulsado');
}
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
				
			},
			error: function(e){
				alert("ERROR: ", e);
				console.log("ERROR: ", e);
			}
		});
	});
});
