window.scrollTo(0, 0);

// inventory pin
const inventory = document.getElementById('inventory');
const inventoryWrapper = document.getElementById('inventory-wrapper');
const inventoryContainer = inventoryWrapper.querySelector('.inventory__inner');
const inventoryEdgar = inventoryWrapper.querySelector(
  '.inventory__inner-edgar'
);
const inventoryLine = document.getElementById('inventory-line');

gsap.set(inventoryLine, {
  width: inventoryContainer.offsetWidth + inventory.offsetWidth,
});

const calcOffset = () => {
  let gap = parseInt(getComputedStyle(inventoryContainer).gap);
  let offset =
    inventoryContainer.offsetWidth - inventoryEdgar.offsetWidth - gap;
  offset = inventory.offsetWidth - offset;
  console.log({ offset, gap });
  return offset;
};

gsap.registerPlugin(ScrollTrigger);

const pinner = gsap.to(inventory, {
  x: () => {
    return (calcOffset() + document.body.clientWidth * 0.05) * -1;
  },
  ease: 'none',
  scrollTrigger: {
    trigger: inventoryWrapper,
    pin: true,
    scrub: 1,
    snap: 1,
    start: 'top 15%',
    end: 'bottom+=200 65%',
    // markers: {
    //   startColor: 'white',
    //   endColor: 'white',
    //   fontSize: '48px',
    //   fontWeight: 'bold',
    //   indent: 20,
    // },
  },
});
