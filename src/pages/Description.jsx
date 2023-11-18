import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MyNavbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const Description = () => {
  const [eventData, setEventData] = useState(null);
  const { eventId } = useParams(); // Obtén el eventId de la ruta

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        // const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}.json?apikey=${apiKey}`);
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${process.env.REACT_APP_CONSUMER_KEY}`);
        const data = await response.json();

        setEventData(data);
      } catch (error) {
        console.error('Error al obtener detalles del evento:', error);
      }
    };

    fetchEventDetails();
  }, []);


  return (
    <>
    <MyNavbar />
    
    <div style={{backgroundImage: "url(../background.png)", backgroundSize: "cover", backgroundPosition: "top center"}}>
        { eventData ? 
          ( <img src={
            eventData.images.find(
              (image) => image.width === 2048 && image.height === 1152
            )?.url || eventData.images[0].url
          } className='img-fluid' alt={eventData.name}/> ) 
          : 
          ( <p>Cargando detalles del evento...</p> ) }
        <div>
          {eventData ? (
            <div className='container text-white py-5'>
              <h1 className='mb-3'>{eventData.name}</h1>
              <span className='mb-5'>{eventData.promoter.description}</span>
              <div className='row'>
                <div className="col-lg-6">
                  <h2>Rango de Precios</h2>
                  <p>${eventData.priceRanges[0].min} - ${eventData.priceRanges[0].max} {eventData.priceRanges[0].currency}</p>
                  <h2 className='mb-3'>Descripción:</h2>
                  <p>{eventData.info}</p>
                  <p>Fecha: {eventData.dates.start.localDate}</p>
                  <p>Hora: {eventData.dates.start.localTime}</p>
                  <h3>Visita nuestro apartado de </h3>
                  <Link to={"/faq"}>Preguntas Frecuentes</Link>
                </div>
                <div className="col-lg-6">
                  <h2 className='mb-3'>Escenario:</h2>
                  {eventData.seatmap.staticUrl ? <img src={eventData.seatmap.staticUrl} className='img-fluid' alt="" /> : <p>Cargando ...</p> }
                  
                  <h2 className='mb-3'>Ubicación:</h2>
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.3933781916285!2d-58.45060122346363!3d-34.594212956997666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5eb6fb40a93%3A0x1fcab11b62b55896!2sMovistar%20Arena!5e0!3m2!1ses!2sar!4v1700319943096!5m2!1ses!2sar" width="100%" height="450" style={{border:"0"}}></iframe>
                  <h2 className='mb-3'>Importante:</h2>
                  <p>
                    Se permite la compra de un máximo de 4 entradas por usuario y operación. En caso de detectar compras que no cumplan con lo establecido, las mismas serán dadas de baja.         
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>Cargando detalles del evento...</p>
          )}
        </div>

        <div className='text-black py-5' style={{backgroundColor: "#ffffff60"}}>
          <div className="container mb-5">
              <h2 className='fw-bold'>Otros eventos de interes</h2>
          </div>
          <div className="d-flex justify-content-around gap-2">
              <div className="card rounded-4" style={{width: "18rem"}}>
                <img src="https://cdn.getcrowder.com/images/8dfede87-cdef-40f8-b151-d68f24b7a443-whatsapp-image-2023-06-30-at-14.12.28.jpeg" className="card-img-top rounded-4" alt="..."/>
              </div>
              <div className="card rounded-4" style={{width: "18rem"}}>
                <img src="https://i0.wp.com/ruidomagazine.com/wp-content/uploads/2023/06/lit.jpg?resize=880%2C880&ssl=1" className="card-img-top rounded-4" alt="..."/>
              </div>
              <div className="card rounded-4" style={{width: "18rem"}}>
                <img src="https://cdn.eldestapeweb.com/eldestape/102023/1697129731746.webp?cw=1080&ch=1080&extw=jpg" className="card-img-top rounded-4" alt="..."/>
              </div>
              <div className="card rounded-4" style={{width: "18rem"}}>
                <img src="https://www.movistararena.cl/wp-content/uploads/2023/02/movistar-arena-arena-news-nickinicole1-1024x1024.webp" className="card-img-top rounded-4" alt="..."/>
              </div>
          </div>
        </div>
    </div>

    <Footer />
    </>
  );
};

export default Description;
