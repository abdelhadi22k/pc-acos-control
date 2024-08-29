import React from "react";


const Home_Page = () => {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "65vh",
  };

  const backgroundStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url(sources/img/home_page.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: -1,
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    zIndex: 0,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 1,
    color: "white",
    padding: "20px",
    textAlign: "center",
  };

  return (
    <div>
      <div className="Home_Page" style={containerStyle}>
        <div style={backgroundStyle}></div>
        <div style={overlayStyle}></div>
        <div style={contentStyle} className="home_page_content">
          <h1>control panel</h1>
          <p>
          Your store's control panel
          </p>
        </div>
      </div>

    </div>
  );
};

export default Home_Page;
