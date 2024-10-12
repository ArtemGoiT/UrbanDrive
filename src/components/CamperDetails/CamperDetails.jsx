import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatRentPrice } from '../../helpers';
import { fetchCamper } from '../../api/catalog';
import { useSelector } from 'react-redux';

import css from './CamperDetails.module.css';
import Rating from '../MIU/Rating/Raiting';
import Location from '../MIU/Location/Location';
import CamperImage from '../MIU/CamperImage/CamperImage';
import NavRadioButton from '../MIU/NavRadioButton/NavRadioButton';
import Features from '../Features/Features';
import Reviews from '../Reviews/Reviews';
import BookForm from '../BookForm/BookForm';
import Loader from '../Loader/Loader';
import { selectError } from '../../redux/campers/selectors';

const navList = ['features', 'reviews'];

const CamperDetails = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedNav, setSelectedNav] = useState(navList[0]);

  const errorMessage = useSelector(selectError); // Получаем сообщение об ошибке из Redux

  useEffect(() => {
    const getCamperDetails = async () => {
      setLoading(true); 
      try {
        const data = await fetchCamper(id);
        setCamper(data);
      } catch (err) {
        console.error(err.message); // Логируем ошибку в консоль
      } finally {
        setLoading(false); 
      }
    };

    getCamperDetails();
  }, [id]);

  const handleChangeNav = (e) => {
    setSelectedNav(e.target.value);
  };

  if (loading) return <Loader />; // Показываем лоадер
  if (errorMessage) return <p>Error: {errorMessage}</p>; // Показываем ошибку из Redux

  if (!camper) return <p>No camper found.</p>;

  return (
    <div className={css.container}>
      <h3>{camper.name}</h3>
      <div className={css.header}>
        <p className={css.price}>{formatRentPrice(camper.price)}</p>
        <div className={css.rating}>
          <Rating rating={camper.rating} countReviews={camper.reviews.length} />
          <Location>{camper.location}</Location>
        </div>
      </div>
      <div className={css.imageGallery}>
        {camper.gallery.map((image, index) => (
          <CamperImage key={index} src={image.original} alt={camper.name} />
        ))}
      </div>
      <p className={css.description}>{camper.description}</p>
      <ul className={css.navList}>
        {navList.map((nav) => (
          <li className={css.navItem} key={nav}>
            <NavRadioButton
              value={nav}
              name="nav"
              isChecked={nav === selectedNav}
              onChange={handleChangeNav}
            >
              {nav}
            </NavRadioButton>
          </li>
        ))}
      </ul>
      <div className={css.footerWrapper}>
        {selectedNav === navList[0] && <Features camper={camper} />}
        {selectedNav === navList[1] && <Reviews reviews={camper.reviews} />}
        <BookForm />
      </div>
    </div>
  );
};

export default CamperDetails;
