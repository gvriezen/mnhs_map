//created by Grace Vriezen for WWI exhibit at Minnesota Historical Society
//begin script when window loads
window.onload = setMap();

//set up choropleth map
function setMap(){

	 //map frame dimensions
    var width = 960,
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
    var projection = d3.geo.mercator()
        .scale(150)
        // .translate([width / 2, height / 2])
        // .center([0,5]);
        .translate([450,400]);

    var path = d3.geo.path()
        .projection(projection);




// 	var q = d3_queue.queue();
// 	//queue
//     //use queue.js to parallelize asynchronous data loading
//     q
//         // .defer(d3.csv, "data/lab2data.csv") //load attributes from csv
//         // .defer(d3.json, "data/countries.json") //load background spatial data
//         .defer(d3.json, "data/usa.topojson") //load background spatial data
//         .await(callback);

// function callback(error, states){
//        //translate north america TopoJSON
//        //place graticule on map
      
//        console.log(states);
    
//         //translate us topojson
//        var northAmerica = topojson.feature(states, states.objects.usa).features;

// };


var q = d3_queue.queue();
    //queue
    //use queue.js to parallelize asynchronous data loading
    q
        
        .defer(d3.csv, "data/ww1_data.csv") // load immigration data
        .defer (d3.csv, "data/ww1_nodes.csv") // load nodes/centroids of countries
        .defer(d3.json, "data/world.topojson") //load background spatial data
        .await(callback);

function callback(error, csvData, nodes, world){
       //place graticule on map
       // console.log(countries);
       // console.log(csvData);
       // console.log(nodes);
    
        //translate us topojson
       var allCountries = topojson.feature(world, world.objects.collection).features;

        //add countries to map
        var countries = map.append("path")
            .datum(allCountries)
            .attr("class", "countries")
            .attr("d", path);

        var regions = map.selectAll(".regions")
        .data(allCountries)
        .enter()
        .append("path")
        .attr("class", function(d){
            return "regions" + d.properties.name;
        })
        .attr("d", path);

};


// d3.json ("data/world.topojson", function (error, world) {
//     if (error) return console.error (error);
//     console.log(world);

//     map.append("path")
//     .datum(topojson.feature(world, world.objects.collection))
//     .attr("d", path);
// });



}; //end of set map
