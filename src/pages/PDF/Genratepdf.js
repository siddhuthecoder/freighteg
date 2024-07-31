// const generatePDF = async (id) => {
//   try {
//     const pod = await getPodById(id);
//     const {
//       lrNumber,
//       vehicleNumber,
//       vendorCode,
//       loadingDate,
//       submitted,
//       createdAt,
//       updatedAt,
//       documents,
//     } = pod;

//     const doc = new jsPDF();

//     doc.setFontSize(16);
//     doc.text("POD Details", 20, 20);

//     doc.setFontSize(12);
//     doc.text(`LR Number: ${lrNumber}`, 20, 30);
//     doc.text(`Vehicle Number: ${vehicleNumber}`, 20, 40);
//     doc.text(`Vendor Code: ${vendorCode}`, 20, 50);
//     doc.text(`Loading Date: ${formatDate(loadingDate)}`, 20, 60);
//     doc.text(`Submitted: ${submitted ? "Yes" : "No"}`, 20, 70);
//     doc.text(`Created At: ${formatDate(createdAt)}`, 20, 80);
//     doc.text(`Updated At: ${formatDate(updatedAt)}`, 20, 90);

//     if (documents && documents.length > 0) {
//       doc.text(`Documents:`, 20, 100);
//       documents.forEach((docUrl, index) => {
//         doc.text(`- ${docUrl}`, 20, 110 + index * 10);
//       });
//     }

//     doc.save("pod_details.pdf");
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//   }
// };
