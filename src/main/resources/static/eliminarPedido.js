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
		<div class="element" id="element">
		<div class="form-check-inline">
					<p></p>
					<input type='text' name='asunto[]' required />
					<a class="btn btn-sm btn-secondary element">Delete element</a> 
		</div>
		</div>
		`).insertBefore("#newElement").find("a").on("click", deleteElement);
		
		//Check if >2 elements
	});
	
	jQuery("#editOrder").on("click", function(){
		console.log("edit order");

		var workingObject = $(this);
		jQuery.ajax({
			url: "/anuncio/" + workingObject.attr("anuncio_id"),
			type: 'PUT',
			success: function(success){
			},
			error: function(e){
				alert("ERROR: ", e);
				console.log("ERROR: ", e);
			}
		});
	});
	
	jQuery('div.element a').click(function(event){
		console.log("deleting element");
		event.preventDefault();
		jQuery(this).parent().remove();
		
		//Check if >2 elements
	});
	
	
	jQuery('input:checkbox').change(function() {
		if($(this).is(':checked')){
			$(this).val(true);
		}
		else{
			$(this).val(false);
		}
	});
});

function deleteElement(event){
	console.log("deleting element");
	event.preventDefault();
	jQuery(this).parent().remove();
	
	//Check if >2 elements
}

function hola(index){
	
	console.log(index);
}
