var createScene = function () {
  // This creates a basic Babylon Scene object (non-mesh)
  var scene = new BABYLON.Scene(engine);

  // This creates and positions a free camera (non-mesh)
  var camera = new BABYLON.ArcRotateCamera(
    "Camera",
    0,
    1,
    10,
    new BABYLON.Vector3(0, 3, 0),
    scene
  );

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'ground' shape.
  var ground = BABYLON.MeshBuilder.CreateGround(
    "ground",
    { width: 6, height: 6 },
    scene
  );
  BABYLON.SceneLoader.ImportMesh(
    "",
    "https://raw.githubusercontent.com/jrsanchezalcala/babylonexample/main/assets/",
    "ninja_in_place.glb",
    scene,
    function (...ninja) {
      const animationGroups = ninja[3];
      animationGroups.find((item) => item.name == "idle").play(true);

      BABYLON.SceneLoader.ImportMesh(
        "",
        "https://raw.githubusercontent.com/jrsanchezalcala/babylonexample/main/assets/weapons/",
        "katana.glb",
        scene,
        function (...weapon) {
          console.log({ weapon });
          const rightHand = scene.transformNodes.find(
            (node) => node.name === "mixamorig:RightHand"
          );
          const handleSword = scene.transformNodes.find(
            (item) => item.name == "same1_low"
          );
          console.log({ rightHand, handleSword });
          const transformNode = new BABYLON.TransformNode("nodehandle", scene);

          handleSword.parent = transformNode;
          transformNode.parent = rightHand;
          transformNode.scaling.setAll(0.01);
        }
      );
    }
  );

  return scene;
};
