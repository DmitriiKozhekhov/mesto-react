function Card (props) {
    function handleClick () {
        props.stretchImage(props.card);
    }
    return (
        <article className="element">
        <img className="element__image" style={{ backgroundImage: `url(${props.card.link})` }}  onClick={handleClick}  alt="изображение"/>
        <button className="element__remove" aria-label="Удалить изображение" type ="button"></button>
        <div className = "element__btm">
         <h2 className = "element__title">{props.card.name}</h2>
         <div className="element__like-container">
           <button className="element__like-button" aria-label="Мне нравится" type="button"></button>
           <span className="element__like-counter">{props.card.likes.length}</span>
         </div>
       </div>
       </article>
    )
}
export default Card;
