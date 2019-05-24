import React, { Component } from 'react';
import ReactStars from 'react-stars';

import './styles.css';

export default class AddCommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            starsValue: 1,
            checkedBuy: 'already-buy-check'
        };

        this.ratingChanged = this.ratingChanged.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
    }

    toggleChange(e, name) {
        const value = e ? e.target.id : name;
        this.setState({
            checkedBuy: value
        });
    }

    ratingChanged(newRating) {
        this.setState({
            starsValue: newRating
        });
    }

    render() {
        const { starsValue, checkedBuy } = this.state;
        console.log(checkedBuy);
        return (
            <form className="product-comments-head-addComment">
                <div className="product-comments-head-addComment-stars">
                    <ReactStars
                        count={5}
                        value={starsValue}
                        onChange={this.ratingChanged}
                        size={60}
                        color2={'#ffd700'}/>
                </div>
                <div className="product-comments-head-addComment-item">
                    <span>Ваше имя</span>
                    <input type="text" placeholder="Иван Иванович"/>
                </div>
                <div className="product-comments-head-addComment-item">
                    <div className="product-comments-head-addComment-item-radio">
                        <span
                            onClick={this.toggleChange.bind(null, null, 'already-buy-check')}
                            className={`product-comments-head-addComment-item-radio-custom ${checkedBuy === 'already-buy-check' && 'checked'}`}
                        />
                        <input type="radio"
                               id="already-buy-check"
                               checked={checkedBuy === 'already-buy-check' && true}
                               name="comment-buy-check"
                               onChange={this.toggleChange}/>
                        <label htmlFor="already-buy-check">Уже купил</label>
                    </div>
                    <div className="product-comments-head-addComment-item-radio">
                        <span
                            onClick={this.toggleChange.bind(null, null, 'not-buy-check')}
                            className={`product-comments-head-addComment-item-radio-custom ${checkedBuy === 'not-buy-check' && 'checked'}`}
                        />
                        <input
                            type="radio"
                            id="not-buy-check"
                            checked={checkedBuy === 'not-buy-check' && true}
                            name="comment-buy-check"
                            onChange={this.toggleChange}/>
                        <label htmlFor="not-buy-check">Не купил</label>
                    </div>
                </div>
                <div className="product-comments-head-addComment-item">
                    <span>Комментарий</span>
                    <textarea name="" id="" cols="30" rows="10" placeholder="Ваш комментарий к товару"/>
                </div>
                <div className="product-comments-head-addComment-item">
                    <button>Отправить</button>
                </div>

            </form>
        );
    }

}