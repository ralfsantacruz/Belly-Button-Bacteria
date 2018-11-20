function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    var metadata = `/metadata/${sample}`;
    // Use d3 to select the panel with id of `#sample-metadata`
    d3.json(metadata).then(function(sample) {
      var sampleData = d3.select("#sample-metadata")    
    // Use `.html("") to clear any existing metadata
    sampleData.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(sample).forEach(function([key,value]) {
      row = sampleData.append("p")
      row.text(`${key}, ${value}`)
      console.log(`${key}, ${value}`)
      })
    });
  }

function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var metadata = `samples/${sample}`
  d3.json(metadata).then(function(sample) {
    var otuIds = sample.otu_ids;
    var sampleValues = sample.sample_values;
    var otuLabels = sample.otu_labels;
    var markerSize = sample.sample_values;
    var colors = sample.otu_ids;
  

    var bubble = [{
      x: sampleValues,
      y: otuIds,
      text: otuLabels,
      mode: 'markers',
      marker: {
        color: colors,
        size: markerSize
    }

  }]
    var layout1 = {
      title : "Belly button bacteria",
      yaxis: {
        autorange: true,
        type: "linear"
      }
    }
    var pie = [{
      type: 'pie',
      labels: otuLabels.slice(0,9),
      values: sampleValues.slice(0,9)
    }]

    var layout2 = {
      height: 600,
      width: 800,
      title: "Bacterial distribution"
    };
    

  Plotly.newPlot('pie', pie, layout2);
  Plotly.newPlot('bubble', bubble, layout1);

})


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
