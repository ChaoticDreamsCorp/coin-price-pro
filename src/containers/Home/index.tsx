import { useState, useEffect } from 'react';
import { Email } from './types';
import PriceWebSocket from '../../components/PriceWebSocket';

function HomeContainer () {

  const [emails, setEmails] = useState<Email[]>([]); 
  
  useEffect(() => {
    setEmails([{ email: 'test@gmail.com', id: '22540780-b9e0-466f-85e2-44026a7088c4' }]);
  }, []);

  return (
    <>
      <div className="container row p-3">
        <div className="col-5 mx-auto">
          <h1 className="cover-heading">
            <PriceWebSocket />
          </h1>
          <p className="lead">
          Experience the Future of Crypto Conversion! Discover the easiest way to convert cryptocurrencies with our seamless and user-friendly platform.
          Get real-time exchange rates, a wide range of supported cryptocurrencies, and a hassle-free conversion process.
          Join us today and make your crypto conversions a breeze!
          </p>
          <p className="lead">
            <a href="#" className="btn btn-lg btn-secondary">Learn more</a>
          </p>
          {emails.map((record) => {
            return (
              <div key={record.id} className="card d-none">
                <div className="card-body">
                  <b>{record.email}</b>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default HomeContainer;
