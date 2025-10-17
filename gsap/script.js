gsap.registerPlugin(Draggable, InertiaPlugin);

Draggable.create(".flair--1", {
  type: "x",
  bounds: ".container"
});

Draggable.create(".flair--3b", {
  type: "rotation",
  inertia: true
});

Draggable.create(".flair--4b", {
  bounds: ".container",
  inertia: true
});