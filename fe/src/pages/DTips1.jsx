import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Row, Col, Container } from "react-bootstrap";
import HeaderDetail from "../components/HeaderDetail";
import CardArtikel from "../components/CardArtikel";
import Bagikan from "../components/Bagikan";
import DesKolom from "../components/DesKolom";
import CtaBtnSmall from "../components/CtaBtnSmall";
import NavbarComponent from "../components/Navbar";
import Footer from "../components/Footer";

const DTips1 = () => {
  const [title, setTitle] = useState("");
  const [fill_content, setFillContent] = useState("");
  const [img, setImg] = useState("");
  const [created_at, setCreated] = useState();
  const [tips, setTips] = useState([]);
  const { uuid } = useParams();


  useEffect(() => {
    getSelectedTips();
    getTips();
  }, []);

  const getTips = async () => {
    try {
      axios.get(`http://localhost:5000/tips`)
      .then(res => setTips(res.data.data))
      .catch(err => console.log(err));
    } catch (error) {
      console.log(error)
    }
    
  };

  const getSelectedTips = async () => {
    const response = await axios.get(`http://localhost:5000/tips/${uuid}`);
    console.log(response.data)
    setTitle(response.data.title);
    setFillContent(response.data.fill_content);
    setImg(response.data.img);
    setCreated(response.data.createdAt)
  }

  const hari = new Date(created_at).toLocaleString('id-ID', { weekday: 'long' });
  const tanggal = new Date(created_at).toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });


  return (
    <>
      <NavbarComponent />
      <HeaderDetail
        title={title}
        date={`${hari}, ${tanggal}`}
      />

      <Container fluid className="d-flex content-detail">
        <Row>
          <DesKolom
            imgDetail={`http://localhost:5000/${img}`}
            // paragraphs={[
            //   "Dalam menjaga semangat memasak, memiliki dapur yang baik dan bersih adalah kunci utamanya. Tidaklah mudah untuk mempertahankan kebersihan dapur, namun langkah-langkah tertentu dapat membantu menjaga kebersihan setelah proses memasak. Menurut artikel yang ada di Fimela.com, salah satu aspek penting adalah cara menyimpan bumbu dapur dengan benar, sehingga dapur tetap bersih dan bumbu lebih awet.",
            //   "Berikut adalah beberapa tips yang dapat diterapkan untuk menyimpan bumbu dapur secara optimal:",
            //   " Beberapa bumbu dapur, seperti daun basil dan daun salam segar, sebaiknya disimpan dalam freezer. Rendam bumbu dalam minyak zaitun sebelum ditempatkan dalam kantong plastik, lalu simpan di freezer. Minyak zaitun akan membantu menjaga kesegaran daun basil dan daun salam.",
            //   "Untuk saos dan kecap yang belum dibuka, disarankan untuk disimpan dalam suhu ruang. Namun, setelah dibuka, segera simpan dalam lemari es. Untuk kemasan isi ulang, pastikan menuangkannya dalam botol bersih agar saos atau kecap tetap awet.",
            //   "Bumbu bubuk sebaiknya disimpan dalam suhu ruangan, namun pastikan untuk menaruhnya dalam kaleng atau wadah kedap udara. Lemari es sebaiknya dihindari karena dapat menyebabkan penggumpalan bumbu bubuk.",
            //   " Bumbu yang sudah dihaluskan dan siap digunakan sebaiknya disimpan di dalam freezer dengan kemasan kedap udara. Jika ingin menyimpan dalam jumlah besar, sebaiknya dibagi dalam beberapa bagian dan disimpan dalam kemasan sekali pakai.",
            //   "Hindari meletakkan bumbu di dekat kompor, karena suhu di sekitar kompor cenderung lebih tinggi dan dapat merusak kualitas bumbu.",
            //   "Dengan menerapkan tips ini, bumbu dapur dapat tetap awet dan membantu menciptakan lingkungan dapur yang bersih..",
            // ]}

            paragraphs={fill_content}
          />

          <Col xs={4} className="col-lg-5 col-12 text-center">
            <h2>Artikel Terkait</h2>
          {tips.map((data, i) => ( 
            <CardArtikel
              // title="Artikel Terkait"
              imgCard={`http://localhost:5000/${data.img}`}
              titleCard={data.title}
            >
              <CtaBtnSmall />
              <Bagikan />
            </CardArtikel>
            
            ))}; 
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default DTips1;
