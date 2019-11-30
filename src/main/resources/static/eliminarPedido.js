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
			},
			error: function(e){
				alert("ERROR: ", e);
				console.log("ERROR: ", e);
			}
		});
	});
	
	
	jQuery("#newElement").button().on("click", function(){
		console.log("adding new element");
		
		
		jQuery(`
		<div class="row">
			<div class="col-md-12">
					<p></p>
					<input type='text' name='asunto[]' /> 		
			</div>
		</div>
		`).insertBefore("#newElement");
		

	});
});
