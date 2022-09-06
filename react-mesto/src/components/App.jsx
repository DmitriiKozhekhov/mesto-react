import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
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

  return (
    <div className="page">
    <Header/>
    <Main onEditProfile={ handleEditProfileClick } onEditAvatar={handleEditAvatarClick} onAddPlace = {handleAddPlaceClick} onCardClick={handleCardClick}/>
    <Footer/>
    {/* компоненты и внутри пропсы */}
    <PopupWithForm  name = "edit-name" title = "Редактировать профиль" submitText = "Сохранить"  isOpen = {isEditProfilePopupOpen} onClose ={closeAllPopups} children = {
      <>
      <input type="text" name = "nameAuthor" className="form__input form__input_info_name" placeholder ="Ваше имя" required  minLength="2" maxLength="40" id="name-input"/>
      <span className="form__invalid-message name-input-error"></span>
      <input type="text" name = "infoAuthor" className="form__input form__input_info_job"  placeholder="Ваш род деятельности"  minLength="2" maxLength="200" id="job-input" required/>
      <span className="form__invalid-message job-input-error"></span>
      </>
    }/>
     <PopupWithForm  name = "edit-avatar" title = "Обновить аватар" submitText = "Сохранить" isOpen = {isEditAvatarPopupOpen} onClose ={closeAllPopups} children = {
      <>
       <input type="url" name = "link" className="form__input form__input_info_image-link"  placeholder="Ссылка на картинку" id="link-input" required/>
       <span className="form__invalid-message link-input-error">Введите адрес сайта</span>
      </>
    }/>
     <PopupWithForm  name = "create-card" title = "Новое место" submitText = "Создать" isOpen = {isAddPlacePopupOpen} onClose ={closeAllPopups} children = {
      <>
       <input type="text" name = "name" className="form__input form__input_info_card-name" placeholder ="Название" id="title-input"  minLength="2" maxLength="30" required/>
        <span className="form__invalid-message title-input-error">Вы пропустили это поле</span>
        <input type="url" name = "link" className="form__input form__input_info_image-link"  placeholder="Ссылка на картинку" id="link-input2" required/>
        <span className="form__invalid-message link-input2-error">Введите адрес сайта</span>
      </>
    }/>
     <PopupWithForm  name = "verify" title = "Вы уверены?" submitText = "Да" onClose ={closeAllPopups}/>
     <ImagePopup onClose ={closeAllPopups} isOpen = {isImagePopupOpen} card={selectedCard}/>
</div>
  );
}
export default App;
