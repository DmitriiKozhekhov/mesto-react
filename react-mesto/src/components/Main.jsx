import React from "react";
import {api} from "../utils/Api";
import Card from "./Card";
// прокидываю пропсы
class Main extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      userName:'',
      userDescription:'',
      userAvatar:'',
      cards: []
    }
  }
  componentDidMount () {
    const user = api.getUserInfo();
    const cardsData = api.getCards();

    Promise.all([user,cardsData])
      .then((values) => {
        const userData = values[0];
        this.setState({
          userName: userData.name,
          userDescription: userData.about,
          userAvatar: userData.avatar
    })
    const cardsArray = values[1];
    this.state.cards = cardsArray;
  })
  .catch((err) => {
    console.log(err);
  });
  }
  render() {
  return (
         <main className="content">
    <section className="profile">
      <div className="profile__avatar-div">
        <img className="profile__avatar" style={{ backgroundImage: `url(${this.state.userAvatar})` }}/>
        <button type="button" className="profile__ToAvatarButton" onClick={this.props.onEditAvatar}></button>
     </div>
      <div className="profile__info">
        <div className="profile__box">
          <h1 className="profile__name">{this.state.userName}</h1>
          <button className="profile__edit-button" onClick={this.props.onEditProfile} aria-label="Редактирование" type="button"></button>
        </div>
        <p className="profile__job">{this.state.userDescription}</p>
      </div>
      <button className="profile__add-button" onClick={this.props.onAddPlace} aria-label="Добавление новой карточки" type="button"></button>
     </section>
     <section className="elements">
      {this.state.cards.map((item)=> (
        <Card key={item._id} card={item} stretchImage = {this.props.onCardClick}/>
      ))}
      </section>
    </main>
    )
  }
}
  export default Main;