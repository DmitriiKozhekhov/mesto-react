export default class Api {
  constructor(host, token) {
    this._host = host;
    this._token = token;
    this._profileInfoHost = `${this._host}/users/me`;
    this._cardsHost = `${this._host}/cards`;
    this._headers = {
       authorization: this._token,
      'Content-Type': 'application/json'
    }
  }
  _getResOrError(res){
    if (res.ok){
      return res.json();
    }
    throw new Error('Ошибка при загрузке');
  }
  getUserInfo() {
    return fetch(this._profileInfoHost, {
      method: 'GET',
      headers: this._headers
    })
      .then((res)=>{
        if (res.ok){
          return res.json();
        }
        throw new Error('Ошибка при загрузке');
      });
  }
  editProfileData(newName, newAbout) {
    return fetch(this._profileInfoHost, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
      })
    })
      .then((res)=>{
        if (res.ok){
          return res.json();
        }
        throw new Error('Ошибка при загрузке');
      });
  }
  editProfileAvatar(AvatarUrl) {
    return fetch(`${this._profileInfoHost}/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: AvatarUrl
      })
    })
      .then((res)=>{
        if (res.ok){
          return res.json();
        }
        throw new Error('Ошибка при загрузке');
      });
  }
  getCards() {
    return fetch(this._cardsHost, {
      method: 'GET',
      headers: this._headers
    })
      .then((res)=>{
      if (res.ok){
        return res.json();
      }
      throw new Error('Ошибка при загрузке');
    });
  }
  addCard(card) {
    return fetch(this._cardsHost, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(card)
    })
      .then((res)=>{
        if (res.ok){
          return res.json();
        }
        throw new Error('Ошибка при загрузке');
      });
  }
  removeCard(card) {
    return fetch(`${this._cardsHost}/${card._id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res)=>{
        if (res.ok){
          return res.json();
        }
        throw new Error('Ошибка при загрузке');
      });
  }
  setLike(card) {
    return fetch(`${this._cardsHost}/${card._id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res)=>{
        if (res.ok){
          return res.json();
        }
        throw new Error('Ошибка при загрузке');
      });
  }
  removeLike(card) {
    return fetch(`${this._cardsHost}/${card._id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res)=>{
        if (res.ok){
          return res.json();
        }
        throw new Error('Ошибка при загрузке');
    });
  }
}
export const api = new Api('https://mesto.nomoreparties.co/v1/cohort-47', 'ae2441a2-0fee-454f-8a62-d5dbdc72ac5d');
