gsap.registerPlugin(Draggable, InertiaPlugin);

Draggable.create(".flower-01", {
  bounds: ".container",
  inertia: true,
});
