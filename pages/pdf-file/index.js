import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import css from "./style.module.css";
const pdfFile = () => {
  const generatePDF = () => {
    // var doc = new jsPDF("p", "pt", "a4");
    // doc.html(<div> hello</div>);
    // doc.text(20, 30, "aaaaa");
    // doc.save("generate");
    // doc.html(document.querySelector("#contentuuud"), {
    //   callback: function (pdf) {
    //     doc.addImage(imgData, "JPEG", 0, 0);
    //     doc.output("dataurlnewwindow");
    //     pdf.save("mypdf.pdf");
    //   },
    // });
    const input = document.getElementById("contentuuud");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    });
  };
  return (
    <div>
      {" "}
      <div style={{}} id="contentuuud">
        <div
          style={{
            width: "593px",
            textAlign: "center",
            background: "green",
            borderBottom: "3px solid yellow",
          }}
        >
          {" "}
          adasjkdhajkshd{" "}
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              border: "1px solid red",
              width: "593px",
              height: "200px",
              background: "red",
            }}
          >
            <div style={{ borderBottom: "2px solid green" }}> amraa</div>
            <div style={{ borderBottom: "2px solid green" }}> amraa</div>
            <div> amraa</div>
          </div>
          <div style={{ width: "300px" }}>
            {" "}
            <div> test2 </div>
          </div>
        </div>
      </div>
      <button onClick={generatePDF} type="primary">
        {" "}
        download
      </button>
    </div>
  );
};
export default pdfFile;
