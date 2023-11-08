const mcpadc = require('mcp-spi-adc');

const tempSensor = mcpadc.open(0, {speedHz: 20000}, err => {
  if (err) throw err;

  setInterval(_ => {
    tempSensor.read((err, reading) => {
      if (err) throw err;

      console.log((reading.value * 3.3 - 0.5) * 100);
    });
  }, 1000);
});
