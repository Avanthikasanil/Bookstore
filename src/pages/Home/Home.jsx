import React, { useState } from "react";
import NaveBar from "../../components/FirstPage/Navebar/NaveBar";
import Footer from "../../components/FirstPage/Footer/Footer";
import Body from "../../components/FirstPage/Body/Body";
import LoginModal from "../../components/LoginModal/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home/Home.css';

function Home() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className={`Home ${modalShow ? 'white-background' : ''}`}>
      <NaveBar onLoginClick={() => setModalShow(true)} />
      <Body />
      <Footer />
      <LoginModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onLoginSuccess={() => {
          console.log("Login Success!");
          setModalShow(false);
        }}
      />
    </div>
  );
}

export default Home;
