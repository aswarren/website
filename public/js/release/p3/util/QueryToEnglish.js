define("p3/util/QueryToEnglish", [
	"dojo/_base/declare", "dojo/_base/lang",
	"rql/parser"
], function(declare, lang,
			RQLParser){

	var parseQuery = function(filter){
		try{
			var _parsed = RQLParser.parse(filter)
		}catch(err){
			console.log("Unable To Parse Query: ", filter);
			return;
		}

		function walk(term){
			console.log("Walk: ", term.name, " Args: ", term.args);
			switch(term.name){
				case "and":
				case "or":
					var out = term.args.map(function(t){
						return walk(t);
					}).join('<span class="searchOperator"> ' + term.name.toUpperCase() + " </span>");

					console.log("out: ", out);
					break;
				case "in":
					var f = decodeURIComponent(term.args[0]).replace(/_/g," ");;
					var v = term.args[1];
					var vals = v.map(function(val){
						return '<span class="searchValue">' + decodeURIComponent(val) + "</span>";
					});
					out = '<span class="searchField">' +f +' </span>' + '<span class="searchOperator"> is </span>(';

					if (vals.length<3) {
						out = out + vals.join('<span class="searchOperator"> OR </span>') + ")";
					}else{
						out = out + vals.slice(0,2).join('<span class="searchOperator"> OR </span>') + ' ... ' + (vals.length-2) + ' more ...)';
					}
					// parsed.selected.push({field: f, value: v});
					break;
				case "ne":
					var f = decodeURIComponent(term.args[0]);
					var v = decodeURIComponent(term.args[1]);
					out =  f + '<span class="searchOperator"> is not </span>' + v;
					break;
				case "eq":
					var f = decodeURIComponent(term.args[0]).replace(/_/g," ");
					var v = decodeURIComponent(term.args[1]);
					out =  '<span class="searchField">'+ f  + ' </span><span class="searchOperator"> is </span>' + '<span class="searchValue">' + v + "</span>";
					break;
				case "keyword":
					out = '<span class="searchValue"> '  +decodeURIComponent(term.args[0]) + '</span>';
					break;
				case "not":
					out = '<span class="searchOperator"> NOT </span>' + walk(term.args[0]);
					break;
				default:
					console.log("Skipping Unused term: ", term.name, term.args);
			}

			return out;
		}

		return walk(_parsed);
	};


	return function(query){
		var q = parseQuery(query);
		// q = q.substr(1, q.length-2);
		return q;
	}

});
