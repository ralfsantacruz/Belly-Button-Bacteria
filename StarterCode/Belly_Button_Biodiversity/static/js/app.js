function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  var metadata = '/metadata/${sample}';
  // Use d3 to select the panel with id of `#sample-metadata`
  d3.json(metadata).then(function(sample){
    var sampleData = d3.select('#sample-metadata');
  // Use `.html("") to clear any existing metadata
  sampleData.html("");
  // Use `Object.entries` to add each key and value pair to the panel
  // Hint: Inside the loop, you will need to use d3 to append new
  // tags for each key-value in the metadata.
  Object.entries(sample).forEach(function([key,value]){
    var row = sampleData.append("p")
    row.text('${key}:${value}');
    })
  });
}

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var chartData = '/samples/${sample}';
  // @TODO: Build a Bubble Chart using the sample data
  d3.json(chartData).then(function(data) {
    var sample_data = data.sample_values;
    var id_data = data.otu_id;
    var sizes = data.sample_values;
    var colors = data.otu_ids;
    var labels = data.otu_lables;

  var data1 = [{
    x: sample_data,
    y: id_data,
    text: labels,
    mode: 'markers',
      size: sizes,
      color: colors
    }
  }];

  }

  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();