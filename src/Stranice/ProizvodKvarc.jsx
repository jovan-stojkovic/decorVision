import "../Stilovi/Stranica.scss";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import KontaktInfo from "../Komponente/KontaktInfo";


const ProizvodKvarc = ({ noIMG }) => {
const location = useLocation();
const { ime, slike, dimenzije, debljine, proizvodjac } =
  location.state.proizvod;

const [selectedIMG, setSelectedIMG] = useState(null);

const openIMG = (src) => setSelectedIMG(src);
const closeIMG = () => setSelectedIMG(null);

const [subject, setSubject] = useState("");

useEffect(() => {
  setSubject(`${proizvodjac}, ${ime}`);
}, [proizvodjac, ime]);

  // ESC za zatvaranje velike slike
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        closeIMG();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

return (
  <div className="coante proizvod page">
    {/* NASLOV */}
    <div className="proizvod-head">
      <img src={slike?.[0] || noIMG} alt={ime} />
      <div className="proizvod-naslov">
        <h5>{ime}</h5>
        <h6>{proizvodjac}</h6>
      </div>
    </div>

    <div className="container">
      {/* INFO */}
      <div className="text">
        <p className="opis">
          Kvarc je sve zastuljeniji zbog svoje izdržljivosti, estetike i
          praktičnosti. Kvarc se sastoji od prirodnog minerala kvarca koji se
          kombinuje sa polimerima i pigmentima kako bi se stvorila čvrsta i
          otporna površina.
        </p>
        <p className="key">
        Dimenzije ploča: <span>310cm x 152cm i 330cm x 164cm</span>
          </p>
          <p className="key">
            Debljine ploča: <span>1,5cm, 2cm i 3cm</span>
        </p>
      </div>

      <div className="big-pic">
        <img src={slike[2]} alt="slika" />
      </div>

      {/* GRID SLIKA */}
      <div className="proizvod-grid">
        <div className="galerija">
          {slike.map((src, i) => (
            <div
              className="grid-img-container dynamic"
              key={i}
              onClick={() => openIMG(src)}
            >
              <img src={src} alt={`${ime} - slika ${i + 1}`} />
            </div>
          ))}
        </div>

        {/* LARGE IMAGE PREVIEW */}
        {selectedIMG && (
          <div className="large-image open">
            <img src={selectedIMG} alt="Large Preview" onClick={closeIMG} />
          </div>
        )}
      </div>
    <KontaktInfo />
    </div>
  </div>
);
};

export default ProizvodKvarc;
