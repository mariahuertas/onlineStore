//AJAX
jQuery(document).ready(function(){
	jQuery("#removeOrderButton").on("click", function(){
		console.log("reach remove order");

		var workingObject = jQuery(this);
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
					<input type="hidden" class="testNameHidden{{-index}}" name="checked[]" value="false" id="todo">
					<input type="checkbox" class="checkbox" name="checked[]" value="true" id="todo" index={{-index}}>
					<input type='text' name='asunto[]' required />
					<a class="btn btn-sm btn-secondary element">Delete element</a> 
		</div>
		</div>
		`).insertBefore("#newElement").find("a").on("click", deleteElement);
		enableOrderButton();
		
	});
	
	jQuery("#newElementNewOrder").button().on("click", function(){
		console.log("adding new element");
		
		jQuery(`
		<div class="element" id="element">
		<div class="form-check-inline">
					<p></p>
					<input type='text' name='asunto[]' required />
					<a class="btn btn-sm btn-secondary element">Delete element</a> 
		</div>
		</div>
		`).insertBefore("#newElementNewOrder").find("a").on("click", deleteNewOrderElement);
	});
	
	jQuery("#editOrder").on("click", function(){
		console.log("edit order");

		var workingObject = jQuery(this);
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
		
		removeOrderButton();
	});
	
	
	jQuery('input:checkbox').change(function() {
		if(jQuery(this).is(':checked')){
			jQuery(this).attr("value", "true");
			
			var disable = ".testNameHidden" + jQuery(this).attr("index");
			console.log(disable);
			jQuery(disable).prop('disabled', true);
		}
		else{
			jQuery(this).attr("value", "false");
			var disable = ".testNameHidden" + jQuery(this).attr("index");
			console.log(disable);
			jQuery(disable).prop('disabled', false);
		}
	});
	
	
	jQuery("#form-show-order .show_order").each(function() {
		 console.log("adding strike");
		 
		 let showChecked_array =  jQuery(this).find(".showChecked");
		 var idChecked = showChecked_array.attr("value"); //true false
		 var indexChecked = showChecked_array.attr("index");
		 console.log(indexChecked);
		 
		 let list =  jQuery(this).find(".list");
		 var index = list.attr("index");
		 
		 if(idChecked == "true"){
			 jQuery('li[index=' + indexChecked + ']').addClass( "checked" );
			 console.log("it is true");
		 }
		 console.log("strike ended");
	    });
	
});

function deleteElement(event){
	console.log("deleting element");
	event.preventDefault();
	jQuery(this).parent().remove();
	
	removeOrderButton();
}

function deleteNewOrderElement(event){
	console.log("deleting element in new order");
	event.preventDefault();
	jQuery(this).parent().remove();
}

function removeOrderButton() {
    if(jQuery("#elementList").find("a").length < 2) {
    	 jQuery("#elementList").find("a").addClass("d-none");
    }
}

function enableOrderButton() {
    if(jQuery("#elementList").find("a").length > 1) {
    	 jQuery("#elementList").find("a").removeClass("d-none");
    }
}

