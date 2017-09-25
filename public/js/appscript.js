


$(document).on("submit", "#save", function (){


	var thisArticle = $(this).attr("name_id");

   // post the selected aricles to this rout
	$.ajax({
		method:"GET",
		dataType: "json",
		url:"/save/"+thisArticle,
		data:{ 
			title:$("#link").val()

			body:$("#artid").val()

		}
	}).done(function(data){
		console.log("+++++++++++++++++")
		res.render("dashboard")
		console.log("++++++++++++++++++")
	})
})