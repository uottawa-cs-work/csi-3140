document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  const loadButton = document.getElementById("loadButton");
  const form = document.getElementById("createShapeForm");

  let shapes = [];

  loadButton.addEventListener("click", loadShapesFromXML);
  form.addEventListener("submit", handleCreateShape);

  async function loadShapesFromXML() {
    try {
      const response = await fetch("shapes.xml");
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");

      shapes = []; // Reset shapes
      const shapeElements = xmlDoc.getElementsByTagName("shape");

      for (let shapeEl of shapeElements) {
        const shape = {
          type: shapeEl.getElementsByTagName("type")[0].textContent,
          color: shapeEl.getElementsByTagName("color")[0].textContent,
          x: parseInt(shapeEl.getElementsByTagName("x")[0].textContent),
          y: parseInt(shapeEl.getElementsByTagName("y")[0].textContent),
          width: parseInt(shapeEl.getElementsByTagName("width")[0].textContent),
          height: parseInt(shapeEl.getElementsByTagName("height")[0].textContent),
        };
        shapes.push(shape);
      }

      drawAllShapes();
    } catch (err) {
      console.error("Error loading XML:", err);
    }
  }

  function handleCreateShape(event) {
    event.preventDefault();

    const newShape = {
      type: document.getElementById("shapeType").value,
      color: document.getElementById("shapeColor").value,
      x: parseInt(document.getElementById("shapeX").value),
      y: parseInt(document.getElementById("shapeY").value),
      width: parseInt(document.getElementById("shapeWidth").value),
      height: parseInt(document.getElementById("shapeHeight").value),
    };

    shapes.push(newShape);
    drawAllShapes();
  }

  function drawAllShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const shape of shapes) {
      ctx.fillStyle = shape.color;

      if (shape.type === "rectangle") {
        ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
      } else if (shape.type === "circle") {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.height, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
});