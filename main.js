window.onload = () => {
  const hamburger1 = document.getElementById('menuBtn1');
  hamburger1.classList.add('fas', 'fa-bar', 'bar');
  hamburger1.addEventListener('click', () =>{
    closeSidebar();
  });
  const hamburger2 = document.getElementById('menuBtn2');
  hamburger2.classList.add('fas', 'fa-bar', 'bar');
  hamburger2.addEventListener('click', () =>{
    openSidebar();
  });
  let openSidebar = () => {
    document.getElementById('sideBarMenu').style.display = 'block';
  };

  let closeSidebar = () => {
    document.getElementById('sideBarMenu').style.display = 'none';
  };
};
