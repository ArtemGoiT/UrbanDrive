const capitalizeFirstLetter = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const formatMeasurement = (value) => {
  return value.replace(/(\d)([a-zA-Z])/g, "$1 $2");
};

export const getCategories = (camper) => {
  const result = [];
  const { adults, transmission, engine, kitchen, AC } = camper;

  if (adults && adults > 0) {
    result.push({
      iconName: "users",
      text: `${adults} adults`,
      styles: {},
    });
  }
  if (transmission) {
    result.push({
      iconName: "automatic",
      text: capitalizeFirstLetter(transmission),
      styles: { fill: "transparent", stroke: "#101828" },
    });
  }
  if (engine) {
    result.push({
      iconName: "petrol",
      text: capitalizeFirstLetter(engine),
      styles: {},
    });
  }
  if (kitchen) {
    result.push({
      iconName: "kitchen",
      text: "Kitchen",
      styles: { fill: "transparent", stroke: "#101828" },
    });
  }
  if (AC) {
    result.push({ iconName: "ac", text: "AC", styles: {} });
  }

  return result;
};

export const formatRentPrice = (price) => {
  return `€${price},00`;
};

export const getAllDetails = (camper) => {
  const styles = { fill: "transparent", stroke: "#101828" };
  const vehicle = [
    { title: "Form", value: capitalizeFirstLetter(camper.form) },
    { title: "Length", value: formatMeasurement(camper.length) },
    { title: "Width", value: formatMeasurement(camper.width) },
    { title: "Height", value: formatMeasurement(camper.height) },
    { title: "Tank", value: formatMeasurement(camper.tank) },
    { title: "Consumption", value: camper.consumption },
  ];
  const details = [];

  const { bathroom, TV, radio, microwave, gas, water } = camper;

  if (bathroom) {
    details.push({
      iconName: "toilet",
      text: "Bathroom",
      styles: {},
    });
  }
  if (TV) {
    details.push({
      iconName: "tv",
      text: "TV",
      styles,
    });
  }
  if (radio) {
    details.push({
      iconName: "radio",
      text: "Radio",
      styles,
    });
  }
  if (microwave) {
    details.push({
      iconName: "microwave",
      text: "Microwave",
      styles,
    });
  }
  if (gas) {
    details.push({
      iconName: "gas",
      text: "Gas",
      styles: {},
    });
  }
  if (water) {
    details.push({
      iconName: "water",
      text: "Water",
      styles,
    });
  }

  return { vehicle, details };
};
