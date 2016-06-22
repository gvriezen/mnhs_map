//created by Grace Vriezen for WWI exhibit at Minnesota Historical Society

// //global variables
// (function (){
//     var attrArray = ["1880","1881","1882","1883","1884","1885","1886","1887","1888","1889","1890","1891","1892","1893","1894","1895","1896","1897","1898","1899","1900","1901","1902","1903","1904","1905","1906","1907","1908","1909","1910","1911","1912","1913","1914","1915","1916","1917","1918","1919","1920"];
//     var expressed = attrArray[0]; // initial attribute
// })
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
       // .features /// add this to manipulate individual countries

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

        //centroids
        var centroids = map.append("g")
        .attr("class", "centroids");

        //arcs
        var arcs = map.append("g")
        .attr("class", "centroids");

};

//nodes and links 


//define colors of arcs
var colors = ["#000", "#fff"];

//define arc width 
var arcWidth = d3.scale.linear()
    .domain([1,25])
    .range([0, 35000]);

// define fill color 
var fillColor = d3.scale.linear ()
    .range(colors)
    .domain();
//d3 format decimals
var f = d3.format(".1f");
//tooltips
var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")


// d3.json ("data/world.topojson", function (error, world) {
//     if (error) return console.error (error);
//     console.log(world);

//     map.append("path")
//     .datum(topojson.feature(world, world.objects.collection))
//     .attr("d", path);
// });



}; //end of set map

function nodeCoordinates (node) {
    var long = parseFloat(node.long),
        lat = parseFloat(node.lat);
        return [long, lat];
}


// join csv to spatial data
// animate lines
// update flow arrows on click/slide
// create timeline
// add supporting info regarding legislation






