// inventory pin
const inventory = document.getElementById('inventory');
const inventoryWrapper = document.getElementById('inventory-wrapper');
const inventoryContainer = inventoryWrapper.querySelector('.container');
const inventoryEdgar = inventoryWrapper.querySelector(
  '.inventory__inner-edgar'
);
const inventoryLine = document.getElementById('inventory-line');

gsap.set(inventoryLine, {
  width: inventoryContainer.offsetWidth + inventory.offsetWidth,
});

const calcOffset = () => {
  let offset = inventoryContainer.offsetWidth - inventoryEdgar.offsetWidth;
  offset = inventory.offsetWidth - offset + inventoryEdgar.offsetWidth / 2;

  return offset;
};
console.log({ offset: calcOffset() });
gsap.registerPlugin(ScrollTrigger);

gsap.to(inventory, {
  x: calcOffset() * -1,
  ease: 'none',
  scrollTrigger: {
    trigger: inventoryWrapper,
    pin: true,
    scrub: 1,
    snap: 1,
    start: 'top top',
    end: 'bottom-=300 top',
    // end: () => '+=' + inventory.offsetWidth,
    // markers: {
    //   startColor: 'white',
    //   endColor: 'white',
    //   fontSize: '48px',
    //   fontWeight: 'bold',
    //   indent: 20,
    // },
  },
});
