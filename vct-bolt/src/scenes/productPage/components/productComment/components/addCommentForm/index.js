import React, { Component } from 'react';
import ReactStars from 'react-stars';

import './styles.css';

export default class AddCommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            starsValue: 1,
            checkedBuy: null
        };

        this.ratingChanged = this.ratingChanged.bind(this);
        this.toggleChange = this.toggleChange.bind(this);
        this.handleChangeField = this.handleChangeField.bind(this);
        this.changeFormField = this.changeFormField.bind(this);
    }

    handleChangeField(e) {
        this.changeFormField({[e.target.name]: e.target.value})
    }

    changeFormField(data) {
        this.props.changeFormField(data);
    }

    toggleChange(e, name) {
        e && e.preventDefault();
        const value = name ? name : e.target.id;
        this.setState({
            checkedBuy: value
        });
        this.changeFormField({ checkedBuy: value });
    }

    ratingChanged(newRating) {
        this.setState({
            starsValue: newRating
        });
        this.changeFormField({ starsValue: newRating });
    }

    render() {
        const { starsValue, checkedBuy } = this.state;
        return (
            <form className="product-comments-head-addComment">
                <div className="product-comments-head-addComment-stars">
                    <ReactStars
                        count={5}
                        value={starsValue}
                        half={false}
                        onChange={this.ratingChanged}
                        size={60}
                        color2={'#ffd700'}/>
                </div>
                <div className="product-comments-head-addComment-item">
                    <span>Ваше имя</span>
                    <input
                        name="comment-buy-name"
                        type="text"
                        placeholder="Иван Иванович"
                        onChange={this.handleChangeField}
                        required
                    />
                </div>
                <div className="product-comments-head-addComment-item">
                    <div
                        onClick={this.toggleChange.bind(null, null, 'already-buy-check')}
                        className="product-comments-head-addComment-item-radio"
                    >
                        <span
                            className={`product-comments-head-addComment-item-radio-custom ${checkedBuy === 'already-buy-check' && 'checked'}`}
                        />
                        <label>Уже купил</label>
                        <input type="radio"
                               id="already-buy-check"
                               checked={checkedBuy === 'already-buy-check' && true}
                               name="comment-buy-check"
                               onChange={this.toggleChange}
                               required
                        />
                    </div>
                    <div
                        className="product-comments-head-addComment-item-radio"
                        onClick={this.toggleChange.bind(null, null, 'not-buy-check')}
                    >
                        <span
                            className={`product-comments-head-addComment-item-radio-custom ${checkedBuy === 'not-buy-check' && 'checked'}`}
                        />
                        <label>Не купил</label>
                        <input
                            type="radio"
                            id="not-buy-check"
                            checked={checkedBuy === 'not-buy-check' && true}
                            name="comment-buy-check"
                            onChange={this.toggleChange}
                            required
                        />
                    </div>
                </div>
                <div className="product-comments-head-addComment-item">
                    <span>Комментарий</span>
                    <textarea
                        name="comment-buy-textarea"
                        cols="30"
                        rows="10"
                        placeholder="Ваш комментарий к товару"
                        onChange={this.handleChangeField}
                        required
                    />
                </div>
                <div className="product-comments-head-addComment-item">
                    <button>Отправить</button>
                </div>

            </form>
    );
    }

    }