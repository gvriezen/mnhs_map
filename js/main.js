//created by Grace Vriezen for WWI exhibit at Minnesota Historical Society
//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){

	 //map frame dimensions
    var width = window.innerWidth * 0.6,
        height = 460;

     //create new svg container for the map

    var siteTitle = d3.select("body")
        .append("text")
        .attr("class", "siteTitle")
        .html("Flow of Immigrants");

    var map = d3.select("body")
        .append("svg")
        .attr("class", "map")
        .attr("width", width)
        .attr("height", height);

    //create Albers equal area conic projection centered on France
    var projection = d3.geo.albers()
        .scale(900)
        .translate([width / 2, height / 2]);

    var path = d3.geo.path()
        .projection(projection);


	var q = d3_queue.queue();
	//queue
    //use queue.js to parallelize asynchronous data loading
    q
        // .defer(d3.csv, "data/lab2data.csv") //load attributes from csv
        // .defer(d3.json, "data/countries.json") //load background spatial data
        .defer(d3.json, "data/usa.topojson") //load background spatial data
        .await(callback);

function callback(error, csvData, states){
       //translate north america TopoJSON
       //place graticule on map
    
        //translate us topojson
       var northAmerica = topojson.feature(states, states.objects.usa).features;
}
}; //end of set map
