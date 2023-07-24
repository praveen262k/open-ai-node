import weather from "./getWeather";
// Step #1 import xxx from "./xxx";

// Step #2 Keep adding the meta to the array
const registry = {
  meta: [weather.meta, /* xxx.meta */],
};

registry.fn = [];

registry.fn[weather.meta.name] = weather.fn;

//  Step #3 add new function to named array, uncomment
// registry.fn[xxx.meta.name] = xxx.fn;

export default registry;
