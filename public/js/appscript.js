


$(document).on("click", "#save", function (){


	var thisArticle = $(this).attr("name_id");

   // post the selected aricles to this rout
	$.ajax({
		method:"POST",
		url:"/articles/"+thisArticle,
		data:{ 
			title:$("#link").val()

			body:$("#artid").val()

		}
	}).done(function(data){
		console.log("+++++++++++++++++")
		console.log("data")
		console.log("++++++++++++++++++")
	})
})