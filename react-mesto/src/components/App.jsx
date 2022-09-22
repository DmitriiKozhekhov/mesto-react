import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect (()=>{
    api.getUserInfo()
      .then((res)=>{
        setCurrentUser(res);
      })
      .catch((err)=>{
        console.log(err);
      });
  }, []);
  // пустой массив зависимостей нужен, чтобы цикл закончился строго на монтировании элемента;
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen]=React.useState(false); 
  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true);
  };
  const [isEditProfilePopupOpen, setEditProfilePopupOpen]=React.useState(false);
  function handleEditProfileClick () {
    setEditProfilePopupOpen (true);
  };
  const [isAddPlacePopupOpen, setAddPlacePopupOpen]=React.useState(false);
  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true);
   };
  const [selectedCard, stretchSelectedCard] = React.useState({});
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
   function handleCardClick (elem) {
    setImagePopupOpen (true);
    stretchSelectedCard(elem);
   }
   function closeAllPopups () {
    setEditAvatarPopupOpen (false);
    setEditProfilePopupOpen (false);
    setAddPlacePopupOpen (false);
    setImagePopupOpen (false);
    stretchSelectedCard({});
   }
   function handleUpdateUser (userData) {
    api.editProfileData(userData.name, userData.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err)=>{
        console.log(err);
      });
   }
   function handleUpdateAvatar (avatarData) {
    api.editProfileAvatar(avatarData.avatar)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err)=>{
      console.log(err);
    });
   }
   const [cardsData, setCardsData] = React.useState([]);
   React.useEffect(()=>{
     api.getCards()
       .then((res)=>{
         setCardsData(res);
       })
       .catch((err)=>{
         console.log(err);
       });
   }, []);
   function handleCardLike(card) {
     // Снова проверяем, есть ли уже лайк на этой карточке
     const isLiked = card.likes.some(i => i._id === currentUser._id);
     // Отправляем запрос в API и получаем обновлённые данные карточки
     api.changeLikeCardStatus(card, !isLiked).then((newCard) => {
         setCardsData((state) => state.map((c) => c._id === card._id ? newCard : c));
     });
 }
 function handleCardDelete(card) {
   api.removeCard(card)
     .then(()=> {
       setCardsData ((state) => state.filter((c) =>c._id !== card._id));
     })  
 }
 function handleAddPlaceSubmit (card) {
  api.addCard(card)
  .then((res)=>{
    setCardsData([res, ...cardsData]);
    closeAllPopups();
  })
  .catch((err)=>{
    console.log(err);
  });
 }
  return (
  <CurrentUserContext.Provider value= {currentUser}>
    <div className="page">
    <Header/>
    <Main cards = {cardsData} onCardLike = {handleCardLike} onCardDelete = {handleCardDelete} onEditProfile={ handleEditProfileClick } onEditAvatar={handleEditAvatarClick} onAddPlace = {handleAddPlaceClick} onCardClick={handleCardClick}/>
    <Footer/>
    {/* компоненты и внутри пропсы */}
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser = {handleUpdateUser} />
    <EditAvatarPopup onUpdateAvatar = {handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
    <AddPlacePopup onAddPlace = {handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
    <PopupWithForm  name = "verify" title = "Вы уверены?" submitText = "Да" onClose ={closeAllPopups}/>
    <ImagePopup onClose ={closeAllPopups} isOpen = {isImagePopupOpen} card={selectedCard}/>
    </div>
</CurrentUserContext.Provider>
  );
}
export default App;
