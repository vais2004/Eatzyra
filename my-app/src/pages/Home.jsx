import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Carousal/>
      </div>
      <div className="m-4">
        <Card />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
