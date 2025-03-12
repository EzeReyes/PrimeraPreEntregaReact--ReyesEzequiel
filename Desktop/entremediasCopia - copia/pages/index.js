import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Inicio from "@/components/Inicio";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Index = () => (
  <div>
    <Layout title={'INICIO'}/>
    <Inicio />
    <Footer />
  </div>
  );

export default Index;
