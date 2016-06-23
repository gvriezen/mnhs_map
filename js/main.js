//created by Grace Vriezen for WWI exhibit at Minnesota Historical Society

// //global variables
(function (){
//     var attrArray = ["1880","1881","1882","1883","1884","1885","1886","1887","1888","1889","1890","1891","1892","1893","1894","1895","1896","1897","1898","1899","1900","1901","1902","1903","1904","1905","1906","1907","1908","1909","1910","1911","1912","1913","1914","1915","1916","1917","1918","1919","1920"];
//     var expressed = attrArray[0]; // initial attribute

var timelineWidth = window.innerWidth * 0.6,
    timelineHeight = 200,
    leftPadding = 5,
    rightPadding = 5,
    topBottomPadding = 5,
    timelineInnerWidth = timelineWidth - leftPadding,
    timelineInnerHeight = timelineHeight - topBottomPadding * 2,
    translate = "translate( " + leftPadding + "," + topBottomPadding + ")";
   
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
    var projection = d3.geo.mercator()
        .scale(150)
        // .translate([width / 2, height / 2])
        // .center([0,5]);
        .translate([450,400]);

    var path = d3.geo.path()
        .projection(projection);

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
       var allCountries = topojson.feature(world, world.objects.collection);
       // .features /// add this to manipulate individual countries

       // set to join data

       // allCountries = joinData (world, csvData);

        //add countries to map
        var countries = map.append("path")
            .datum(allCountries)
            .attr("class", "countries")
            .attr("d", path);

        // var regions = map.selectAll(".regions")
        // .data(allCountries)
        // .enter()
        // .append("path")
        // .attr("class", function(d){
        //     return "regions" + d.properties.name;
        // })
        // .attr("d", path);

        //centroids
        var centroids = map.append("g")
        .attr("class", "centroids");

        //arcs
        var arcs = map.append("g")
        .attr("class", "centroids");

        // joinData(csvData, nodes, world);
        createTimeline (csvData);

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
//g 
var g = map.append("g");

}; // end of set map 

// join csv data to json data

// function joinData (csvData, allCountries) {


//     for (var i = 0; i < csvData.length; i++) {
//         var dataName = csvData[i]; // current region
//         var csvKey = dataName.name; // csv primary key
//     // loop through to find correct country
//     for (var a=0; a<world.length; a++) {
//         var geojsonProps = world[a].properties;
//         var geojsonKey = geojsonProps.name; // geojson primary key
//     //where primary keys match, transfer csv data to geojson prop object
//     if (geojsonKey == csvKey) {
//         attrArray.forEach(function(attr) {
//             var val = parseFloat(dataName[attr]); // get csv attr value
//             geojsonProps[attr] = val; // assign attribute and value to geojson properties
//         });
//     };
// };
// };

// return allCountries; 


// };

// function nodeCoordinates (node) {
//     var long = parseFloat(node.long),
//         lat = parseFloat(node.lat);
//         return [long, lat];
// }


// join csv to spatial data
// animate lines w/ stroke dash interpolation
// update flow arrows on click/slide

// create timeline

function createTimeline () {

    var timeline = d3.select("body")
        .append("svg")
        .attr("width", timelineWidth)
        .attr("height", timelineHeight)
        .attr("class", "timeline");

    // var timelineFrame = timeline.append("rect")
    //     .attr("class", "timelineFrame")
    //     .attr("width", timelineWidth)
    //     .attr("height", timelineHeight)
    //     .attr("transform", translate);

    var timlineTitle = timeline.append("text")
        .attr("x", 40)
        .attr("y", 20)
        .attr("class", "timelinetitle")
        .html("Immigration During WWI");

    //create axis
    //create scale for axis

    var mindate = new Date("1875"),
        maxdate = new Date("1925");

    var xScale = d3.time.scale()
        .domain([mindate, maxdate])
        .range([0, timelineWidth]);

            // d3.time.scale()
    //     .domain([1800, 1920])
    //     .range([0, timelineWidth]);
     
// create axis line

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickFormat(d3.time.format("%Y"))
        .ticks(10)
        .tickSize(5);
        // .tickPadding(8);

   //create svg container

    var line = d3.select("body")
        .append("svg")
        .attr("width", timelineWidth + leftPadding * 2)
        .attr("height", timelineHeight + topBottomPadding * 2)
        .attr("transform", translate)
        .attr("class", "axis");

    timeline.append("svg")
        .attr("class", "xaxis")
        .attr("transform", "translate(0," + (timelineHeight - leftPadding )+ ")")
        .call(xAxis)
        .attr("x", 0)
        .attr("y", 0);


// add supporting info regarding legislation

        

};
})(); // end of global function







